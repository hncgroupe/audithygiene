'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  GRILLE_RESTO360,
  NOTATION_RESTO,
  critereId,
  critereLabel,
  critereAide,
  critereChecklist,
  critereInfo,
  scorePilier,
  scoreGlobalResto,
  totalCriteres,
  type NoteResto,
  type CritereInfo,
} from '@/lib/grille-resto360';
import {
  compressImage,
  enqueuePhoto,
  removePhoto as dequeuePhoto,
  pendingForAudit,
} from '@/lib/photo-queue';

export interface Resto360Photo {
  path: string;
  url: string;
  /** true dès que le serveur a confirmé l'enregistrement (coche verte). */
  saved?: boolean;
  /** upload échoué : la photo reste en file locale et sera renvoyée. */
  error?: boolean;
}

export interface Resto360Item {
  code: string;
  theme: string;
  groupe: string | null;
  intitule: string;
  note: number | null;
  commentaire: string | null;
  meta: Record<string, unknown> | null;
  photos: Resto360Photo[];
}

interface CustomItem {
  code: string;
  theme: string;
  groupe: string | null;
  intitule: string;
}

interface Props {
  auditId: string;
  etablissement: { nom: string; ville: string | null; type: string };
  items: Resto360Item[];
  statutInitial: string;
}

const ORANGE = '#F97316';
const CUSTOM_PREFIX = 'CUSTOM-';

export function Resto360Wizard({ auditId, etablissement, items, statutInitial }: Props) {
  const router = useRouter();

  // Clés de persistance locale (résilience hors-ligne).
  const dataKey = `r360-data-${auditId}`;
  const dirtyKey = `r360-dirty-${auditId}`;

  // Cache local : ce qui a été saisi sur l'appareil. Il ne PRIME sur le serveur
  // que pour les codes encore "dirty" (non synchronisés). Un cache déjà confirmé
  // ne doit pas écraser une version serveur plus récente (ex. autre appareil).
  const cached: { notes?: Record<string, number>; comments?: Record<string, string>; checks?: Record<string, string[]> } | null =
    (() => {
      if (typeof window === 'undefined') return null;
      try {
        return JSON.parse(window.localStorage.getItem(dataKey) ?? 'null');
      } catch {
        return null;
      }
    })();

  const cachedDirty: Set<string> = (() => {
    if (typeof window === 'undefined') return new Set();
    try {
      return new Set(JSON.parse(window.localStorage.getItem(dirtyKey) ?? '[]') as string[]);
    } catch {
      return new Set();
    }
  })();

  // Fusion serveur + cache, où le cache ne gagne que pour une saisie non synchronisée.
  function mergeCached<T>(server: Record<string, T>, cachedVals?: Record<string, T>): Record<string, T> {
    if (!cachedVals) return server;
    const out = { ...server };
    for (const [code, val] of Object.entries(cachedVals)) {
      if (cachedDirty.has(code)) out[code] = val;
    }
    return out;
  }

  const [notes, setNotes] = useState<Record<string, number>>(() => {
    const o: Record<string, number> = {};
    for (const it of items) if (typeof it.note === 'number') o[it.code] = it.note;
    return mergeCached(o, cached?.notes);
  });
  const [comments, setComments] = useState<Record<string, string>>(() => {
    const o: Record<string, string> = {};
    for (const it of items) if (it.commentaire) o[it.code] = it.commentaire;
    return mergeCached(o, cached?.comments);
  });
  const [checks, setChecks] = useState<Record<string, string[]>>(() => {
    const o: Record<string, string[]> = {};
    for (const it of items) {
      const cl = (it.meta as { checklist?: unknown } | null)?.checklist;
      if (Array.isArray(cl)) o[it.code] = cl.filter((x): x is string => typeof x === 'string');
    }
    return mergeCached(o, cached?.checks);
  });
  const [photos, setPhotos] = useState<Record<string, Resto360Photo[]>>(() => {
    const o: Record<string, Resto360Photo[]> = {};
    // Photos déjà en base = déjà enregistrées (coche verte, pas de sablier).
    for (const it of items)
      if (it.photos?.length) o[it.code] = it.photos.map((ph) => ({ ...ph, saved: true }));
    return o;
  });
  const [customItems, setCustomItems] = useState<CustomItem[]>(() =>
    items
      .filter((i) => i.code.startsWith(CUSTOM_PREFIX))
      .map((i) => ({ code: i.code, theme: i.theme, groupe: i.groupe, intitule: i.intitule }))
  );

  const stepKey = `r360-step-${auditId}`;
  const [step, setStep] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const saved = Number(window.localStorage.getItem(stepKey));
    return Number.isInteger(saved) && saved >= 0 && saved < GRILLE_RESTO360.length ? saved : 0;
  });
  const [openComment, setOpenComment] = useState<string | null>(null);
  const [openCheck, setOpenCheck] = useState<string | null>(null);
  const [openInfo, setOpenInfo] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [pending, setPending] = useState(0);
  const [online, setOnline] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newQ, setNewQ] = useState('');

  const dirty = useRef<Set<string>>(new Set());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draining = useRef(false);
  // Sérialise les flush réseau (un seul à la fois) et garde une trace si une
  // nouvelle modif arrive pendant un flush en cours.
  const flushing = useRef(false);
  const flushAgain = useRef(false);
  // localId des photos en cours d'upload direct, pour que le drainer ne les
  // ré-uploade pas en parallèle (évite les doublons).
  const uploadingIds = useRef<Set<string>>(new Set());

  // Miroirs des saisies, lus par flush pour toujours envoyer la dernière valeur
  // (et non une valeur figée par une closure périmée d'un setTimeout / d'un goTo).
  const notesRef = useRef(notes);
  const commentsRef = useRef(comments);
  const checksRef = useRef(checks);
  notesRef.current = notes;
  commentsRef.current = comments;
  checksRef.current = checks;

  // fetch avec délai max : sur réseau faible, on échoue proprement au lieu de figer.
  async function fetchWithTimeout(url: string, init: RequestInit, ms: number): Promise<Response> {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    try {
      return await fetch(url, { ...init, signal: ctrl.signal });
    } finally {
      clearTimeout(t);
    }
  }

  /**
   * Vide la file de photos locale (IndexedDB) : renvoie au serveur toute photo
   * dont l'upload avait échoué (hors-ligne, coupure). Appelé au montage et à
   * chaque retour de connexion. Une photo confirmée passe en "enregistré".
   */
  async function drainPhotos() {
    if (draining.current) return;
    if (typeof navigator !== 'undefined' && !navigator.onLine) return;
    draining.current = true;
    try {
      const queued = await pendingForAudit(auditId);
      for (const q of queued) {
        // Déjà en cours d'upload direct (addPhoto) : on ne double pas.
        if (uploadingIds.current.has(q.localId)) continue;
        try {
          uploadingIds.current.add(q.localId);
          const fd = new FormData();
          fd.append('file', q.blob, 'photo.jpg');
          fd.append('code', q.code);
          const res = await fetchWithTimeout(
            `/api/audits/${auditId}/photo`,
            { method: 'POST', body: fd },
            20000
          );
          const data = await res.json().catch(() => ({}));
          if (!res.ok || !data.url) continue;
          setPhotos((p) => ({
            ...p,
            [q.code]: (p[q.code] ?? []).map((ph) =>
              ph.path === q.localId ? { path: data.path, url: data.url, saved: true } : ph
            ),
          }));
          void dequeuePhoto(q.localId);
        } catch {
          /* connexion encore instable : on réessaiera au prochain passage */
        } finally {
          uploadingIds.current.delete(q.localId);
        }
      }
    } finally {
      draining.current = false;
    }
  }

  /**
   * Au montage / après un rechargement (ou si la tablette a tué l'app), réaffiche
   * les photos encore en file IndexedDB (prises hors-ligne, jamais confirmées).
   * Sans ça, leur aperçu mémoire est perdu et l'auditeur croit la photo disparue.
   */
  async function hydratePendingPhotos() {
    const queued = await pendingForAudit(auditId);
    if (!queued.length) return;
    const previews = queued.map((q) => ({ ...q, url: URL.createObjectURL(q.blob) }));
    setPhotos((p) => {
      const next = { ...p };
      for (const q of previews) {
        const arr = next[q.code] ?? [];
        if (arr.some((ph) => ph.path === q.localId)) {
          URL.revokeObjectURL(q.url);
          continue;
        }
        next[q.code] = [...arr, { path: q.localId, url: q.url, saved: false, error: true }];
      }
      return next;
    });
  }

  const pilier = GRILLE_RESTO360[step];
  const isDirigeant = (pilier.questionsOuvertes?.length ?? 0) > 0;

  const totalNotables = useMemo(() => totalCriteres() + customItems.length, [customItems.length]);
  const nbNotes = Object.keys(notes).length;
  const scoreGlobal = scoreGlobalResto(notes as Record<string, NoteResto>);
  const scorePil = scorePilier(notes as Record<string, NoteResto>, pilier);

  const customForPilier = customItems.filter((ci) => ci.theme === pilier.nom);

  // Référence vers le flush courant (évite les closures périmées dans les listeners).
  const flushRef = useRef<((finalize?: boolean, beacon?: boolean) => Promise<void>) | null>(null);
  useEffect(() => {
    flushRef.current = flush;
  });

  // Mémorise le pilier en cours pour reprendre au même endroit.
  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem(stepKey, String(step));
  }, [step, stepKey]);

  // Cache local complet des réponses (survit à un rechargement hors-ligne).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(dataKey, JSON.stringify({ notes, comments, checks }));
    } catch {
      /* quota : ignore */
    }
  }, [notes, comments, checks, dataKey]);

  // Au montage : reprend la file d'envoi en attente et tente une synchro.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved: string[] = JSON.parse(window.localStorage.getItem(dirtyKey) ?? '[]');
        saved.forEach((c) => dirty.current.add(c));
      } catch {
        /* ignore */
      }
      setOnline(window.navigator.onLine);
      setPending(dirty.current.size);
      if (dirty.current.size > 0) void flushRef.current?.();
      // Réaffiche les photos hors-ligne en attente, puis tente de les renvoyer.
      void hydratePendingPhotos().then(() => drainPhotos());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-synchronise dès le retour de connexion + filet toutes les 20 s.
  useEffect(() => {
    const retry = () => {
      setOnline(typeof navigator === 'undefined' ? true : navigator.onLine);
      if (dirty.current.size > 0) void flushRef.current?.();
      void drainPhotos();
    };
    const onOnline = () => {
      setOnline(true);
      retry();
    };
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    const iv = setInterval(retry, 20000);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      clearInterval(iv);
    };
  }, []);

  // Enregistre tout dès que l'onglet se ferme ou que l'app passe en arrière-plan.
  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === 'hidden') void flushRef.current?.(false, true);
    };
    const onPageHide = () => void flushRef.current?.(false, true);
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onPageHide);
    return () => {
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, []);

  function persistDirty() {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(dirtyKey, JSON.stringify(Array.from(dirty.current)));
    } catch {
      /* quota : ignore */
    }
    setPending(dirty.current.size);
  }

  function queueSave(code: string) {
    dirty.current.add(code);
    persistDirty();
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => flush(), 900);
  }

  function buildPayload(codes: string[]) {
    return codes.map((code) => ({
      code,
      note: typeof notesRef.current[code] === 'number' ? notesRef.current[code] : null,
      commentaire: commentsRef.current[code] ?? null,
      meta: checksRef.current[code]?.length ? { checklist: checksRef.current[code] } : null,
    }));
  }

  async function flush(finalize = false, beacon = false) {
    if (dirty.current.size === 0 && !finalize) return;

    // Chemin "beacon" (onglet qui se ferme / arrière-plan) : envoi best-effort
    // SANS vider la file. Si la page est tuée avant la fin, les codes restent en
    // attente et repartent à la réouverture. Aucune perte de saisie.
    if (beacon) {
      const codes = Array.from(dirty.current);
      try {
        await fetch(`/api/audits/${auditId}/resto360`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: buildPayload(codes), finalize }),
          keepalive: true,
        });
      } catch {
        /* ignoré : la file reste pleine, on resync plus tard */
      }
      return;
    }

    // Un seul flush réseau à la fois ; si une modif arrive entre-temps, on relance.
    if (flushing.current) {
      flushAgain.current = true;
      return;
    }
    flushing.current = true;

    const codes = Array.from(dirty.current);
    dirty.current.clear();
    setSaving(true);
    try {
      const res = await fetchWithTimeout(
        `/api/audits/${auditId}/resto360`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: buildPayload(codes), finalize }),
        },
        8000
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setOnline(true);
    } catch {
      // hors-ligne / timeout : on remet les codes en file pour un prochain essai
      codes.forEach((c) => dirty.current.add(c));
      setOnline(false);
    } finally {
      persistDirty();
      setSaving(false);
      flushing.current = false;
      if (flushAgain.current) {
        flushAgain.current = false;
        void flush();
      }
    }
  }

  function setNote(code: string, note: number) {
    setNotes((p) => ({ ...p, [code]: note }));
    queueSave(code);
  }
  function setComment(code: string, val: string) {
    setComments((p) => ({ ...p, [code]: val }));
    queueSave(code);
  }
  function toggleCheck(code: string, label: string) {
    setChecks((p) => {
      const cur = p[code] ?? [];
      const next = cur.includes(label) ? cur.filter((x) => x !== label) : [...cur, label];
      return { ...p, [code]: next };
    });
    queueSave(code);
  }

  /** Bascule les sous-points décochés (= ce qui manque) dans la note du critère. */
  function pushManquantsToNote(code: string, all: string[]) {
    const done = checks[code] ?? [];
    const manquants = all.filter((l) => !done.includes(l));
    const base = (comments[code] ?? '').replace(/(^|\n)À régulariser\s?:.*$/m, '').trim();
    const txt = manquants.length
      ? `${base ? base + '\n' : ''}À régulariser : ${manquants.join(', ')}`
      : base;
    setComment(code, txt);
    setOpenComment(code);
  }

  /**
   * Prise de photo "instantanée" : on affiche tout de suite un aperçu (image
   * compressée locale) et on dépose le blob dans IndexedDB. L'upload réseau se
   * fait en arrière-plan sans bloquer l'auditeur. À la confirmation serveur, la
   * vignette passe en "enregistré" (coche verte). En cas d'échec, la photo reste
   * visible et en file locale : rien n'est perdu, pas besoin de la reprendre.
   */
  async function addPhoto(code: string, file: File) {
    const localId = `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    // 1) Compression côté client (plusieurs Mo -> ~200-500 Ko) = upload rapide.
    const blob = await compressImage(file).catch(() => file);
    // 2) Aperçu immédiat, sans attendre le réseau.
    const previewUrl = URL.createObjectURL(blob);
    setPhotos((p) => ({
      ...p,
      [code]: [...(p[code] ?? []), { path: localId, url: previewUrl, saved: false }],
    }));
    // 3) Filet de sécurité : le blob survit au rechargement / hors-ligne.
    void enqueuePhoto({
      localId,
      auditId,
      code,
      blob,
      type: blob.type || 'image/jpeg',
      createdAt: Date.now(),
    });
    // 4) Upload en arrière-plan. Marqué "en cours" pour que le drainer ne double pas.
    uploadingIds.current.add(localId);
    try {
      const fd = new FormData();
      fd.append('file', blob, 'photo.jpg');
      fd.append('code', code);
      const res = await fetchWithTimeout(
        `/api/audits/${auditId}/photo`,
        { method: 'POST', body: fd },
        20000
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error('upload');
      // Remplace l'entrée locale par la version serveur, marquée enregistrée.
      setPhotos((p) => ({
        ...p,
        [code]: (p[code] ?? []).map((ph) =>
          ph.path === localId ? { path: data.path, url: data.url, saved: true } : ph
        ),
      }));
      URL.revokeObjectURL(previewUrl);
      void dequeuePhoto(localId);
    } catch {
      // Hors-ligne / timeout : on garde l'aperçu marqué "à renvoyer". Le blob reste
      // dans IndexedDB et sera renvoyé par le drainer au retour réseau.
      setPhotos((p) => ({
        ...p,
        [code]: (p[code] ?? []).map((ph) =>
          ph.path === localId ? { ...ph, saved: false, error: true } : ph
        ),
      }));
    } finally {
      uploadingIds.current.delete(localId);
    }
  }

  async function removePhoto(code: string, path: string) {
    setPhotos((p) => ({ ...p, [code]: (p[code] ?? []).filter((x) => x.path !== path) }));
    // Photo pas encore montée sur le serveur : on la retire juste de la file locale.
    if (path.startsWith('local-')) {
      void dequeuePhoto(path);
      return;
    }
    await fetch(`/api/audits/${auditId}/photo`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, path }),
    }).catch(() => {});
  }

  async function addCustom() {
    const intitule = newQ.trim();
    if (!intitule) return;
    setAdding(false);
    setNewQ('');
    try {
      const res = await fetch(`/api/audits/${auditId}/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intitule, theme: pilier.nom, groupe: 'Sur mesure' }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.code) {
        setCustomItems((p) => [
          ...p,
          { code: data.code, theme: pilier.nom, groupe: 'Sur mesure', intitule },
        ]);
      }
    } catch {
      /* ignore */
    }
  }

  async function removeCustom(code: string) {
    setCustomItems((p) => p.filter((c) => c.code !== code));
    setNotes((p) => {
      const n = { ...p };
      delete n[code];
      return n;
    });
    await fetch(`/api/audits/${auditId}/item`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    }).catch(() => {});
  }

  function quitter() {
    if (timer.current) clearTimeout(timer.current);
    void flush(); // sauvegarde en arrière-plan, on ne bloque pas la sortie sur le réseau
    router.push('/app/audits');
  }

  function goTo(next: number) {
    if (timer.current) clearTimeout(timer.current);
    void flush(); // fire-and-forget : la saisie est déjà en cache + file, navigation instantanée
    setOpenComment(null);
    setOpenCheck(null);
    setOpenInfo(null);
    setAdding(false);
    setStep(Math.max(0, Math.min(GRILLE_RESTO360.length - 1, next)));
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
  }

  async function terminer() {
    setFinishing(true);
    if (timer.current) clearTimeout(timer.current);
    items.forEach((i) => dirty.current.add(i.code));
    customItems.forEach((i) => dirty.current.add(i.code));
    await flush(true);
    // On envoie les photos encore en attente AVANT de purger quoi que ce soit.
    await drainPhotos();
    const photosEnAttente = (await pendingForAudit(auditId)).length;
    if (
      typeof window !== 'undefined' &&
      dirty.current.size === 0 &&
      photosEnAttente === 0
    ) {
      // tout est synchronisé (réponses ET photos) : on purge le cache local
      window.localStorage.removeItem(dataKey);
      window.localStorage.removeItem(dirtyKey);
      window.localStorage.removeItem(stepKey);
    }
    router.push(`/app/audits/${auditId}/rapport`);
  }

  /**
   * Bloc d'un critère notable (grille ou sur mesure).
   * IMPORTANT : c'est une fonction de rendu appelée en ligne `renderCritere({...})`,
   * et NON un composant `<CritereRow/>`. Déclaré dans le corps du wizard, un
   * composant imbriqué changerait d'identité à chaque rendu : React démonterait
   * puis remonterait le sous-arbre à chaque frappe, le curseur du textarea
   * reviendrait au début et la saisie partirait à l'envers. En appelant la
   * fonction, on produit directement des éléments hôtes stables (réconciliés).
   */
  function renderCritere(props: {
    code: string;
    label: string;
    aide?: string;
    checklist?: string[];
    info?: CritereInfo;
    onRemove?: () => void;
  }) {
    const { code, label, aide, checklist, info, onRemove } = props;
    const val = notes[code];
    const commentOpen = openComment === code;
    const checkOpen = openCheck === code;
    const infoOpen = openInfo === code;
    const done = checks[code] ?? [];
    const manquants = checklist ? checklist.filter((l) => !done.includes(l)).length : 0;

    return (
      <div key={code} className="border-b border-ink/5 pb-3 last:border-0 last:pb-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[15px] font-medium text-ink">
              <span>{label}</span>
              {info && (
                <button
                  type="button"
                  onClick={() => setOpenInfo(infoOpen ? null : code)}
                  title="Règle : conforme / non conforme"
                  aria-label="Information conformité"
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] font-bold ${
                    infoOpen
                      ? 'border-[#F97316] bg-[#F97316] text-white'
                      : 'border-[#F97316]/50 text-[#F97316] hover:bg-orange-50'
                  }`}
                >
                  i
                </button>
              )}
            </p>
            {aide && <p className="mt-0.5 text-xs leading-snug text-gris">{aide}</p>}
          </div>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="shrink-0 rounded-lg px-2 py-1 text-xs text-gris hover:bg-ink/5"
              aria-label="Retirer ce point"
            >
              Retirer
            </button>
          )}
        </div>

        {/* Bulle info conformité */}
        {info && infoOpen && (
          <div className="mt-2 space-y-1.5 rounded-xl border border-[#F97316]/30 bg-orange-50/60 p-3 text-xs leading-snug">
            <p className="text-ink">
              <span className="font-bold text-green-700">Conforme :</span> {info.conforme}
            </p>
            <p className="text-ink">
              <span className="font-bold text-red-600">Non conforme :</span> {info.nonConforme}
            </p>
            {info.regle && (
              <p className="text-gris">
                <span className="font-semibold">Règle :</span> {info.regle}
              </p>
            )}
          </div>
        )}

        {/* Notation + actions (note / photo) nettement séparées à droite */}
        <div className="mt-2 flex items-stretch gap-1.5">
          {/* Boutons de notation 1 à 5 */}
          <div className="flex flex-1 gap-1.5">
            {NOTATION_RESTO.slice()
              .reverse()
              .map((n) => {
                const active = val === n.note;
                return (
                  <button
                    key={n.note}
                    type="button"
                    onClick={() => setNote(code, n.note)}
                    title={n.label}
                    className="flex h-10 flex-1 items-center justify-center rounded-lg text-sm font-bold transition-all active:scale-95"
                    style={{
                      backgroundColor: active ? n.couleur : '#fff',
                      color: active ? '#fff' : n.couleur,
                      border: `1.5px solid ${n.couleur}`,
                    }}
                  >
                    {n.note}
                  </button>
                );
              })}
          </div>
          {/* Actions : ronds, décollés des notations */}
          <div className="ml-2 flex shrink-0 items-center gap-2 border-l border-ink/10 pl-3">
            {/* Téléverser une image de la tablette (galerie / fichiers), sans capture. */}
            <label
              title="Téléverser une image de la tablette"
              aria-label="Téléverser une image de la tablette"
              className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-ink/20 text-gris hover:border-[#F97316] hover:text-[#F97316]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M12 4v11m0-11 -4 4m4-4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) addPhoto(code, f);
                  e.target.value = '';
                }}
              />
            </label>
            {/* Note libre */}
            <button
              type="button"
              onClick={() => setOpenComment(commentOpen ? null : code)}
              title="Ajouter une note"
              aria-label="Ajouter une note"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/20 text-gris hover:border-[#F97316] hover:text-[#F97316]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M13.5 6.5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            {/* Appareil photo (capture). Label natif = ouverture fiable sur iOS. */}
            <label
              title="Prendre une photo"
              aria-label="Prendre une photo"
              className="relative grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-ink/20 text-gris hover:border-[#F97316] hover:text-[#F97316]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 8h3l1.5-2h7L17 8h3v11H4V8Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              {(photos[code]?.length ?? 0) > 0 && (
                <span
                  className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold text-white"
                  style={{ backgroundColor: ORANGE }}
                >
                  {photos[code]!.length}
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) addPhoto(code, f);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        </div>

        {/* Checklist */}
        {checklist && checklist.length > 0 && (
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setOpenCheck(checkOpen ? null : code)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-ink/70 hover:bg-ink/5"
            >
              <span>Checklist ({done.length}/{checklist.length})</span>
              {manquants > 0 && (
                <span className="rounded-full bg-orange-100 px-1.5 py-0.5 text-[10px] text-[#F97316]">
                  {manquants} manquant{manquants > 1 ? 's' : ''}
                </span>
              )}
              <span className="text-gris">{checkOpen ? '▾' : '▸'}</span>
            </button>
            {checkOpen && (
              <div className="mt-2 rounded-xl border border-ink/10 bg-ink/[0.02] p-3">
                <ul className="space-y-1.5">
                  {checklist.map((l) => {
                    const on = done.includes(l);
                    return (
                      <li key={l}>
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => toggleCheck(code, l)}
                            className="h-4 w-4 accent-[#F97316]"
                          />
                          <span className={on ? 'text-ink' : 'text-ink/70'}>{l}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  onClick={() => pushManquantsToNote(code, checklist)}
                  className="mt-2 text-xs font-semibold text-[#F97316] hover:underline"
                >
                  Reporter les manquants dans la note
                </button>
              </div>
            )}
          </div>
        )}

        {/* Note libre */}
        {commentOpen && (
          <textarea
            value={comments[code] ?? ''}
            onChange={(e) => setComment(code, e.target.value)}
            rows={2}
            autoFocus
            placeholder="Observation, contexte, action conseillée…"
            className="mt-2 w-full rounded-xl border border-ink/15 px-3 py-2 text-sm focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20"
          />
        )}

        {/* Liste des photos du critère */}
        {(photos[code]?.length ?? 0) > 0 && (
          <div className="mt-2">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gris">
              Photos ({photos[code]!.length})
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {photos[code]!.map((ph) => {
                const pending = !ph.saved && !ph.error;
                return (
                  <span key={ph.path} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ph.url}
                      alt=""
                      className={`h-14 w-14 rounded-lg object-cover ${pending ? 'opacity-70' : ''}`}
                    />
                    {/* Statut d'enregistrement, en bas à gauche de la vignette */}
                    {ph.saved ? (
                      <span
                        className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-[#10B981] text-[9px] font-bold leading-none text-white"
                        title="Photo enregistrée"
                        aria-label="Photo enregistrée"
                      >
                        ✓
                      </span>
                    ) : ph.error ? (
                      <span
                        className="absolute -bottom-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-amber-500 px-1 text-[8px] font-bold leading-none text-white"
                        title="En attente de connexion, renvoi automatique"
                        aria-label="Photo en attente d'envoi"
                      >
                        ↻
                      </span>
                    ) : (
                      <span
                        className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-white/90 text-[9px] leading-none"
                        title="Enregistrement en cours"
                        aria-label="Enregistrement en cours"
                      >
                        <span className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-[#F97316] border-t-transparent" />
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removePhoto(code, ph.path)}
                      className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-ink text-[10px] leading-none text-white"
                      aria-label="Retirer la photo"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-orange-50/40">
      {/* En-tête marque */}
      <header className="shrink-0 border-b border-ink/10 bg-white">
        <div className="container-ah flex items-center justify-between gap-3 py-2.5">
          <div className="flex items-center gap-3">
            <button
              onClick={quitter}
              className="text-sm text-gris hover:text-ink"
              aria-label="Quitter"
            >
              ←
            </button>
            <Image
              src="/logo-auditresto360.png"
              alt="auditresto360"
              width={150}
              height={40}
              className="h-7 w-auto"
              priority
            />
          </div>
          {/* Indicateur de pilier (déplacé du bas vers le header) */}
          <div className="hidden flex-col items-center leading-tight sm:flex">
            <span className="text-sm font-bold text-ink">
              Pilier {step + 1} / {GRILLE_RESTO360.length}
            </span>
            <span className="text-xs text-gris">{pilier.nom}</span>
          </div>
          <div className="flex items-center gap-3 text-right">
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">{etablissement.nom}</p>
              <p className="text-xs text-gris">
                {!online
                  ? `Hors ligne${pending ? ` · ${pending} à synchroniser` : ''}`
                  : saving
                    ? 'Enregistrement…'
                    : pending
                      ? `${pending} à synchroniser`
                      : statutInitial === 'TERMINE'
                        ? 'Terminé'
                        : 'Enregistré'}
              </p>
            </div>
            <div
              className="grid h-11 w-11 place-items-center rounded-xl text-white"
              style={{ backgroundColor: ORANGE }}
            >
              <span className="text-base font-extrabold">{scoreGlobal ?? '--'}</span>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-ink/5">
          <div
            className="h-1 transition-all"
            style={{
              width: `${totalNotables ? Math.round((nbNotes / totalNotables) * 100) : 0}%`,
              backgroundColor: ORANGE,
            }}
          />
        </div>
      </header>

      {/* Bandeau d'état permanent et coloré : l'auditeur voit clairement si tout
          est synchronisé, en attente, ou hors-ligne (pour les réponses ET photos). */}
      {(!online || pending > 0) && (
        <div
          className="shrink-0 px-3 py-1.5 text-center text-xs font-semibold text-white"
          style={{ backgroundColor: !online ? '#DC2626' : '#F59E0B' }}
        >
          {!online
            ? `Hors ligne${pending ? ` · ${pending} réponse(s) à synchroniser` : ''}. Vos saisies sont conservées et repartiront au retour du réseau.`
            : `Synchronisation… ${pending} réponse(s) en attente.`}
        </div>
      )}

      {/* Corps */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="container-ah mx-auto max-w-2xl py-5">
          {/* Stepper piliers */}
          <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1">
            {GRILLE_RESTO360.map((p, i) => {
              const on = i === step;
              const sc = scorePilier(notes as Record<string, NoteResto>, p);
              return (
                <button
                  key={p.code}
                  onClick={() => goTo(i)}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    on ? 'text-white' : 'bg-white text-ink/60 ring-1 ring-ink/10'
                  }`}
                  style={on ? { backgroundColor: ORANGE } : undefined}
                >
                  {i + 1}. {p.radar}
                  {sc !== null && <span className="ml-1 opacity-80">({sc})</span>}
                </button>
              );
            })}
          </div>

          {/* Titre pilier */}
          <div className="mb-4 flex items-baseline justify-between">
            <h1 className="text-xl font-bold tracking-tight text-ink">
              {step + 1}. {pilier.nom}
            </h1>
            {scorePil !== null && (
              <span className="text-sm font-bold" style={{ color: ORANGE }}>
                {scorePil}/100
              </span>
            )}
          </div>

          {isDirigeant ? (
            <div className="space-y-4">
              <p className="text-sm text-ink/70">
                Échange avec le dirigeant. Notez ses réponses, elles nourrissent la restitution.
              </p>
              {items
                .filter((i) => i.theme === pilier.nom && i.groupe === 'Questions ouvertes')
                .map((q) => (
                  <div key={q.code} className="rounded-2xl border border-ink/10 bg-white p-4">
                    <label className="block text-sm font-semibold text-ink">{q.intitule}</label>
                    <textarea
                      value={comments[q.code] ?? ''}
                      onChange={(e) => setComment(q.code, e.target.value)}
                      rows={3}
                      placeholder="Réponse du dirigeant…"
                      className="mt-2 w-full rounded-xl border border-ink/15 px-3 py-2 text-sm focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20"
                    />
                  </div>
                ))}
            </div>
          ) : (
            <div className="space-y-5">
              {pilier.groupes.map((g, gi) => (
                <section key={g.nom} className="rounded-2xl border border-ink/10 bg-white p-4">
                  <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink/70">
                    {g.nom}
                  </h2>
                  <div className="space-y-3">
                    {g.criteres.map((crit, ci) => {
                      const code = critereId(pilier.code, gi, ci);
                      return renderCritere({
                        code,
                        label: critereLabel(crit),
                        aide: critereAide(crit),
                        checklist: critereChecklist(crit),
                        info: critereInfo(crit),
                      });
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* Points sur mesure du pilier */}
          {customForPilier.length > 0 && (
            <section className="mt-5 rounded-2xl border border-dashed border-[#F97316]/40 bg-white p-4">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#F97316]">
                Points ajoutés
              </h2>
              <div className="space-y-3">
                {customForPilier.map((ci) =>
                  renderCritere({
                    code: ci.code,
                    label: ci.intitule,
                    onRemove: () => removeCustom(ci.code),
                  })
                )}
              </div>
            </section>
          )}

          {/* Saisie d'une question ajoutée (déclenchée depuis la barre du bas) */}
          {adding && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#F97316]/40 bg-white p-2">
              <input
                value={newQ}
                onChange={(e) => setNewQ(e.target.value)}
                autoFocus
                placeholder="Intitulé du point à ajouter…"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addCustom();
                  if (e.key === 'Escape') {
                    setAdding(false);
                    setNewQ('');
                  }
                }}
                className="flex-1 rounded-lg border border-ink/15 px-3 py-2 text-sm focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20"
              />
              <button
                type="button"
                onClick={addCustom}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: ORANGE }}
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdding(false);
                  setNewQ('');
                }}
                className="text-sm text-gris hover:text-ink"
              >
                Annuler
              </button>
            </div>
          )}

          {/* Légende notation */}
          {!isDirigeant && (
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/60">
              {NOTATION_RESTO.map((n) => (
                <span key={n.note} className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: n.couleur }} />
                  {n.note} {n.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <footer className="shrink-0 border-t border-ink/10 bg-white">
        <div className="container-ah mx-auto flex max-w-2xl items-center justify-between gap-3 py-3">
          <button
            onClick={() => goTo(step - 1)}
            disabled={step === 0}
            className="btn-ghost text-sm disabled:opacity-40"
          >
            Précédent
          </button>
          <button
            type="button"
            onClick={() => {
              setAdding(true);
              if (typeof window !== 'undefined')
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#F97316]/40 px-3 py-2 text-xs font-semibold text-[#F97316] hover:bg-orange-50 sm:text-sm"
          >
            <span
              className="grid h-5 w-5 place-items-center rounded-full text-white"
              style={{ backgroundColor: ORANGE }}
            >
              +
            </span>
            <span className="hidden sm:inline">Ajouter une question</span>
            <span className="sm:hidden">Question</span>
          </button>
          {step < GRILLE_RESTO360.length - 1 ? (
            <button
              onClick={() => goTo(step + 1)}
              className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-all active:scale-[0.98]"
              style={{ backgroundColor: ORANGE }}
            >
              Suivant
            </button>
          ) : (
            <button
              onClick={terminer}
              disabled={finishing}
              className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-60"
              style={{ backgroundColor: ORANGE }}
            >
              {finishing ? 'Finalisation…' : "Terminer l'audit"}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
