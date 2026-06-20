'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculerNotation, type Conformite } from '@/lib/notation';
import { Logo } from '@/components/site/Logo';
import { enqueuePhoto, removePhoto, pendingForAudit, compressImage } from '@/lib/photo-queue';

export interface WizardConstat {
  label: string;
  conformite: Conformite;
  pourquoi?: string;
  correctif?: string;
}
export interface WizardPhoto {
  localId?: string; // présent tant que la photo n'est pas uploadée (file IndexedDB)
  path?: string | null; // chemin serveur une fois uploadée
  url: string | null; // aperçu (objectURL local ou URL signée)
  status: 'pending' | 'done';
}
export interface WizardItem {
  code: string;
  theme: string;
  intitule: string;
  explication: string;
  pedagogie: string;
  ponderation: number;
  photoConseillee?: boolean;
  conformite: Conformite;
  commentaire: string | null;
  constats: WizardConstat[];
  motifs: string[];
  photos: WizardPhoto[];
}

interface Props {
  auditId: string;
  etablissement: { nom: string; ville: string | null; type: string };
  statutInitial: string;
  items: WizardItem[];
}

const CONF_STYLE: Record<string, { dot: string; chip: string }> = {
  CONFORME: { dot: 'bg-vert', chip: 'bg-vert text-white' },
  NC_MINEURE: { dot: 'bg-amber-400', chip: 'bg-amber-500 text-white' },
  NC_MAJEURE: { dot: 'bg-red-500', chip: 'bg-red-600 text-white' },
  NON_APPLICABLE: { dot: 'bg-ink/30', chip: 'bg-ink text-white' },
  NON_EVALUE: { dot: 'bg-ink/15', chip: '' },
};

function bandColor(score: number): string {
  if (score >= 80) return '#10B981';
  if (score >= 60) return '#F59E0B';
  return '#DC2626';
}

function ScoreRing({ score, evalues, size = 56 }: { score: number; evalues: number; size?: number }) {
  const r = size / 2 - 5;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score)) / 100;
  const color = evalues === 0 ? '#D1D5DB' : bandColor(score);
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF2F0" strokeWidth="5" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease' }}
        />
      </svg>
      <span className="absolute text-sm font-bold tabular-nums text-ink">
        {evalues === 0 ? '-' : Math.round(score)}
      </span>
    </div>
  );
}

export function AuditWizard({ auditId, etablissement, statutInitial, items: initial }: Props) {
  const router = useRouter();
  const [items, setItems] = useState<WizardItem[]>(initial);
  const [step, setStep] = useState(0); // 0..n-1 = items, n = récap
  const [save, setSave] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [uploading, setUploading] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [done, setDone] = useState(statutInitial === 'TERMINE');
  const [online, setOnline] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const [holdingNext, setHoldingNext] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const syncing = useRef(false);

  const total = items.length;
  const isRecap = step >= total;
  const current = items[step];

  const notation = useMemo(
    () =>
      calculerNotation(
        items.map((i) => ({ theme: i.theme, ponderation: i.ponderation, conformite: i.conformite }))
      ),
    [items]
  );
  const evalues = items.filter((i) => i.conformite !== 'NON_EVALUE').length;

  const persist = useCallback(
    async (next: WizardItem[], finalize = false) => {
      setSave('saving');
      try {
        const res = await fetch(`/api/audits/${auditId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: next
              .filter((i) => i.conformite !== 'NON_EVALUE' || i.commentaire)
              .map((i) => ({ code: i.code, conformite: i.conformite, commentaire: i.commentaire })),
            finalize,
          }),
        });
        if (!res.ok) throw new Error();
        setSave('saved');
        return true;
      } catch {
        setSave('error');
        return false;
      }
    },
    [auditId]
  );

  const scheduleSave = useCallback(
    (next: WizardItem[]) => {
      if (timer.current) clearTimeout(timer.current);
      setSave('saving');
      timer.current = setTimeout(() => persist(next), 600);
    },
    [persist]
  );

  const patchItem = (code: string, patch: Partial<WizardItem>) => {
    setItems((prev) => {
      const next = prev.map((i) => (i.code === code ? { ...i, ...patch } : i));
      scheduleSave(next);
      return next;
    });
  };

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (holdTimer.current) clearTimeout(holdTimer.current);
    },
    []
  );

  /** Upload d'une photo (direct ou depuis la file). Marque ✓ en cas de succès. */
  const uploadOne = useCallback(
    async (localId: string, code: string, blob: Blob, type: string) => {
      const fd = new FormData();
      fd.append('file', blob, `${localId}.${(type.split('/')[1] || 'jpg').replace('jpeg', 'jpg')}`);
      fd.append('code', code);
      try {
        const res = await fetch(`/api/audits/${auditId}/photo`, { method: 'POST', body: fd });
        if (!res.ok) throw new Error();
        const data = await res.json();
        await removePhoto(localId);
        setItems((prev) =>
          prev.map((i) =>
            i.code === code
              ? {
                  ...i,
                  photos: i.photos.map((p) =>
                    p.localId === localId
                      ? { path: data.path, url: data.url, status: 'done' as const }
                      : p
                  ),
                }
              : i
          )
        );
        return true;
      } catch {
        return false;
      }
    },
    [auditId]
  );

  /**
   * Moteur de sync : vide la file IndexedDB (photos prises hors-ligne ou dont
   * l'upload direct a échoué). Relancé à l'ouverture, au retour du réseau et toutes les 20 s.
   */
  const syncQueue = useCallback(async () => {
    if (syncing.current) return;
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
    syncing.current = true;
    try {
      const pending = await pendingForAudit(auditId);
      for (const rec of pending) {
        await uploadOne(rec.localId, rec.code, rec.blob, rec.type);
      }
    } finally {
      syncing.current = false;
    }
  }, [auditId, uploadOne]);

  // Réhydratation + moteur de sync : récupère les photos en file (reload/hors-ligne),
  // suit l'état réseau et relance la sync au retour de connexion et toutes les 20 s.
  useEffect(() => {
    setOnline(navigator.onLine);

    let cancelled = false;
    (async () => {
      const pending = await pendingForAudit(auditId);
      if (cancelled || pending.length === 0) return;
      setItems((prev) =>
        prev.map((i) => {
          const recs = pending.filter((r) => r.code === i.code);
          const knownLocal = new Set(i.photos.map((p) => p.localId).filter(Boolean));
          const toAdd = recs
            .filter((r) => !knownLocal.has(r.localId))
            .map((r) => ({
              localId: r.localId,
              url: URL.createObjectURL(r.blob),
              status: 'pending' as const,
            }));
          return toAdd.length ? { ...i, photos: [...i.photos, ...toAdd] } : i;
        })
      );
      syncQueue();
    })();

    const onUp = () => {
      setOnline(true);
      syncQueue();
    };
    const onDown = () => setOnline(false);
    window.addEventListener('online', onUp);
    window.addEventListener('offline', onDown);
    const id = setInterval(syncQueue, 20000);

    return () => {
      cancelled = true;
      window.removeEventListener('online', onUp);
      window.removeEventListener('offline', onDown);
      clearInterval(id);
    };
  }, [auditId, syncQueue]);

  const pendingCount = items.reduce(
    (n, i) => n + i.photos.filter((p) => p.status === 'pending').length,
    0
  );

  const goto = (s: number) => {
    if (timer.current) clearTimeout(timer.current);
    persist(items);
    setStep(Math.max(0, Math.min(total, s)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onPickConstat = (c: WizardConstat) => {
    if (!current) return;
    if (c.conformite === 'CONFORME') {
      patchItem(current.code, { conformite: c.conformite, commentaire: c.label });
    } else {
      // Non conforme : on garde la note existante, construite via les motifs ci-dessous
      patchItem(current.code, { conformite: c.conformite });
    }
  };

  // Ajoute/retire un motif prédéfini dans la note
  const toggleMotif = (m: string) => {
    if (!current) return;
    const cur = current.commentaire ?? '';
    if (cur.includes(m)) {
      const cleaned = cur
        .split(' · ')
        .map((s) => s.trim())
        .filter((x) => x && x !== m)
        .join(' · ');
      patchItem(current.code, { commentaire: cleaned });
    } else {
      patchItem(current.code, { commentaire: cur.trim() ? `${cur.trim()} · ${m}` : m });
    }
  };

  // Enregistrement immédiat : aperçu instant, persistance locale, puis upload direct.
  const onUpload = async (files: FileList | null) => {
    if (!files || !current) return;
    setUploading(true);
    const code = current.code;
    for (const file of Array.from(files)) {
      const localId =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      // 1. Aperçu instantané (sur l'original, immédiat)
      const objectUrl = URL.createObjectURL(file);
      setItems((prev) =>
        prev.map((i) =>
          i.code === code
            ? { ...i, photos: [...i.photos, { localId, url: objectUrl, status: 'pending' as const }] }
            : i
        )
      );
      // 2. Compression (allège ~10-20×, upload bien plus rapide)
      const blob = await compressImage(file);
      const type = blob.type || 'image/jpeg';
      // 3. Persistance locale (secours hors-ligne, survit reload)
      await enqueuePhoto({ localId, auditId, code, blob, type, createdAt: Date.now() });
      // 4. Upload direct immédiat ; si échec (hors-ligne), la file prend le relais
      const ok = await uploadOne(localId, code, blob, type);
      if (!ok) syncQueue();
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const onDeletePhoto = async (photo: WizardPhoto) => {
    if (!current) return;
    const code = current.code;
    setItems((prev) =>
      prev.map((i) =>
        i.code === code
          ? {
              ...i,
              photos: i.photos.filter((p) =>
                photo.localId ? p.localId !== photo.localId : p.path !== photo.path
              ),
            }
          : i
      )
    );
    if (photo.localId) await removePhoto(photo.localId);
    if (photo.path) {
      await fetch(`/api/audits/${auditId}/photo`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, path: photo.path }),
      }).catch(() => null);
    }
  };

  const finir = async () => {
    if (pendingCount > 0) {
      const ok = window.confirm(
        `${pendingCount} photo(s) ne sont pas encore enregistrées sur le serveur (réseau). ` +
          `Elles seront envoyées automatiquement dès le retour de la connexion et ajoutées au rapport. ` +
          `Terminer quand même ?`
      );
      if (!ok) return;
      syncQueue();
    }
    setFinishing(true);
    if (timer.current) clearTimeout(timer.current);
    const ok = await persist(items, true);
    setFinishing(false);
    if (ok) {
      setDone(true);
      router.refresh();
    }
  };

  const ncList = items.filter((i) => i.conformite === 'NC_MINEURE' || i.conformite === 'NC_MAJEURE');
  const saveLabel = { idle: '', saving: 'Enregistrement…', saved: '✓ Enregistré', error: 'Échec' }[save];

  // Synthèse de la NC sélectionnée sur l'item courant
  const activeNc =
    current && (current.conformite === 'NC_MINEURE' || current.conformite === 'NC_MAJEURE')
      ? current.constats.find((c) => c.conformite === current.conformite)
      : null;

  // Enregistrer et reprendre plus tard (l'audit reste EN_COURS, déjà sauvegardé)
  const quitter = async () => {
    if (timer.current) clearTimeout(timer.current);
    await persist(items);
    router.push('/app/audits');
  };

  // Suivant cliquable uniquement si photo + constat + note (le constat remplit la note).
  const hasConstat = !!current && current.conformite !== 'NON_EVALUE';
  const hasPhoto = !!current && current.photos.length > 0;
  const hasNote = !!current?.commentaire?.trim();
  const canAdvance = !current || (hasConstat && hasPhoto && hasNote);

  // Tap = avancer si complet. Sinon, maintenir 3 s pour passer la question.
  const HOLD_MS = 3000;
  const onNext = () => {
    if (canAdvance) goto(step + 1);
  };
  const startHold = () => {
    if (canAdvance) return; // déjà complet : le tap suffit
    setHoldingNext(true);
    holdTimer.current = setTimeout(() => {
      setHoldingNext(false);
      goto(step + 1);
    }, HOLD_MS);
  };
  const cancelHold = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    setHoldingNext(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-vert-50/30">
      {/* En-tête minimal : logo seul (épinglé) */}
      <div className="shrink-0 border-b border-ink/10 bg-white">
        <div className="container-ah relative flex h-12 items-center justify-center">
          <button
            onClick={quitter}
            className="absolute left-0 flex items-center text-xl leading-none text-gris hover:text-ink"
            aria-label="Enregistrer et quitter"
          >
            ‹
          </button>
          <Logo className="shrink-0" />
        </div>
        <div className="h-1 w-full bg-ink/5">
          <div
            className="h-full bg-vert transition-all duration-500"
            style={{ width: `${total ? (Math.min(step, total) / total) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Contenu : page fixe, action toujours visible en bas */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="container-ah py-4">
        {!isRecap && current && (
          <div className="mx-auto max-w-2xl">
            {/* Repère compact : thème · point · score */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-gris">
              <span className={`h-2 w-2 rounded-full ${CONF_STYLE[current.conformite].dot}`} />
              <span className="uppercase tracking-wide text-vert-700">{current.theme}</span>
              <span>·</span>
              <span className="tabular-nums">
                {step + 1}/{total}
              </span>
              <span>·</span>
              <span
                className="tabular-nums font-semibold"
                style={{ color: evalues === 0 ? undefined : bandColor(notation.scoreGlobal) }}
              >
                {evalues === 0 ? '-' : Math.round(notation.scoreGlobal)}/100
              </span>
            </div>

            <h1 className="mt-1.5 text-center text-lg font-bold leading-tight tracking-tight text-ink">
              {current.intitule}
            </h1>

            {/* Aide repliée par défaut : explication + à expliquer au client */}
            <div className="mt-1.5 text-center">
              <button
                type="button"
                onClick={() => setInfoOpen((v) => !v)}
                className="inline-flex items-center gap-1 text-[12px] font-medium text-vert-700"
              >
                {infoOpen ? 'Masquer l’aide' : 'Aide & à expliquer au client'}
                <span className="text-[9px]">{infoOpen ? '▲' : '▼'}</span>
              </button>
            </div>
            {infoOpen && (
              <div className="mt-2 space-y-2 rounded-xl border border-ink/10 bg-white p-3 text-left">
                <p className="text-[13px] leading-snug text-ink/70">{current.explication}</p>
                <div className="rounded-lg border border-vert-200 bg-vert-50/70 p-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-vert-800">
                    À expliquer au client
                  </div>
                  <p className="mt-0.5 text-[13px] leading-snug text-ink/80">{current.pedagogie}</p>
                </div>
              </div>
            )}

            {/* Constat : 3 gros boutons empilés, code couleur vert / jaune / rouge */}
            <div className="mt-5 space-y-3">
              {(['CONFORME', 'NC_MINEURE', 'NC_MAJEURE'] as const).map((lvl) => {
                const c = current.constats.find((x) => x.conformite === lvl);
                const on = current.conformite === lvl;
                const cfg = {
                  CONFORME: {
                    label: 'Conforme',
                    on: 'border-transparent bg-vert text-white shadow-[0_6px_18px_-6px_rgba(16,185,129,0.6)]',
                    off: 'border-vert/40 bg-white text-vert-800 hover:bg-vert-50',
                  },
                  NC_MINEURE: {
                    label: 'Non-conformité mineure',
                    on: 'border-transparent bg-amber-500 text-white shadow-[0_6px_18px_-6px_rgba(245,158,11,0.6)]',
                    off: 'border-amber-400/60 bg-white text-amber-700 hover:bg-amber-50',
                  },
                  NC_MAJEURE: {
                    label: 'Cas critique',
                    on: 'border-transparent bg-red-600 text-white shadow-[0_6px_18px_-6px_rgba(220,38,38,0.6)]',
                    off: 'border-red-400/60 bg-white text-red-700 hover:bg-red-50',
                  },
                }[lvl];
                return (
                  <button
                    key={lvl}
                    disabled={!c}
                    onClick={() => c && onPickConstat(c)}
                    className={`w-full rounded-2xl border-2 py-5 text-base font-bold transition-all active:scale-[0.99] disabled:opacity-40 ${
                      on ? cfg.on : cfg.off
                    }`}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>

            {/* Synthèse NC : pourquoi + correctif */}
            {activeNc && (
              <div className="mt-3 overflow-hidden rounded-xl border border-red-200 text-left">
                <div className="bg-red-50 px-3 py-2">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-red-700">
                    {current.conformite === 'NC_MAJEURE' ? 'Cas critique : pourquoi' : 'Non-conformité : pourquoi'}
                  </div>
                  <p className="mt-0.5 text-[13px] leading-snug text-ink/80">{activeNc.pourquoi}</p>
                </div>
                {activeNc.correctif && (
                  <div className="border-t border-red-100 bg-white px-3 py-2">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-vert-700">Correctif</div>
                    <p className="mt-0.5 text-[13px] leading-snug text-ink/80">{activeNc.correctif}</p>
                  </div>
                )}
              </div>
            )}

            {/* Motifs + note libre quand non conforme */}
            {(current.conformite === 'NC_MINEURE' || current.conformite === 'NC_MAJEURE') && (
              <div className="mt-3 text-left">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/60">
                  Motifs
                </label>
                {current.motifs.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {current.motifs.map((m) => {
                      const on = (current.commentaire ?? '').includes(m);
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => toggleMotif(m)}
                          className={`rounded-full border px-2.5 py-1 text-[12px] font-medium transition-colors ${
                            on
                              ? 'border-transparent bg-ink text-white'
                              : 'border-ink/15 bg-white text-ink/70 hover:border-ink/30'
                          }`}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                )}
                <textarea
                  value={current.commentaire ?? ''}
                  onChange={(e) => patchItem(current.code, { commentaire: e.target.value })}
                  rows={2}
                  placeholder="Détail libre (optionnel)…"
                  className="w-full rounded-xl border border-ink/15 px-3 py-2 text-[13px] focus:border-vert focus:outline-none focus:ring-2 focus:ring-vert/20"
                />
              </div>
            )}

            {/* Photos (optionnel) : vignettes si présentes */}
            {current.photos.length > 0 && (
              <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
                {current.photos.map((p, idx) => (
                  <div
                    key={p.localId ?? p.path ?? idx}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-ink/10 bg-ink/5"
                  >
                    {p.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full place-items-center text-xs text-gris">photo</div>
                    )}
                    <span
                      className={`absolute bottom-1 left-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                        p.status === 'done' ? 'bg-vert text-white' : 'bg-amber-400 text-ink'
                      }`}
                    >
                      {p.status === 'done' ? '✓' : '⏳'}
                    </span>
                    <button
                      onClick={() => onDeletePhoto(p)}
                      className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-ink/70 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="Supprimer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              onChange={(e) => onUpload(e.target.files)}
              className="hidden"
            />

          </div>
        )}

        {/* Récapitulatif */}
        {isRecap && (
          <div className="mx-auto max-w-2xl">
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-ink/10 bg-white p-6 text-center shadow-card sm:flex-row sm:text-left">
              <ScoreRing score={notation.scoreGlobal} evalues={evalues} size={88} />
              <div>
                <div className="text-sm text-gris">Score global</div>
                <div className="text-3xl font-bold tabular-nums text-ink">
                  {evalues === 0 ? '-' : Math.round(notation.scoreGlobal)}
                  <span className="text-lg text-gris">/100</span>
                </div>
                <div className="mt-1 text-sm text-gris">
                  {evalues}/{total} points évalués
                  {notation.nbCasCritiques > 0 && (
                    <span className="ml-2 font-semibold text-red-700">
                      · {notation.nbCasCritiques} cas critique{notation.nbCasCritiques > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <h2 className="mt-7 font-semibold text-ink">Non-conformités & plan correctif</h2>
            {ncList.length === 0 ? (
              <p className="mt-2 rounded-xl bg-vert-50 px-4 py-3 text-sm text-vert-800">
                Aucune non-conformité relevée.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {ncList.map((i) => {
                  const c = i.constats.find((x) => x.conformite === i.conformite);
                  const crit = i.conformite === 'NC_MAJEURE';
                  return (
                    <li
                      key={i.code}
                      className={`rounded-xl border p-4 ${crit ? 'border-red-200 bg-red-50/40' : 'border-amber-200 bg-amber-50/30'}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-ink">{i.intitule}</span>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${crit ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'}`}
                        >
                          {crit ? 'Critique' : 'Mineure'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-ink/70">{i.commentaire || c?.pourquoi}</p>
                      {c?.correctif && (
                        <p className="mt-1.5 text-sm text-vert-800">
                          <span className="font-semibold">Correctif : </span>
                          {c.correctif}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

          </div>
        )}
        </div>
      </div>

      {/* Barre d'action épinglée en bas : jamais besoin de scroller pour avancer */}
      <div className="shrink-0 border-t border-ink/10 bg-white">
        <div className="container-ah py-2.5">
          {!isRecap ? (
            <>
              {/* Gros bouton photo, pleine largeur, juste au-dessus de la navigation */}
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="mb-2 w-full rounded-full bg-vert py-3.5 text-base font-semibold text-white transition-all hover:bg-vert-600 active:scale-[0.99] disabled:opacity-60"
              >
                {uploading
                  ? 'Ajout…'
                  : current?.photos.length
                    ? 'Ajouter une photo'
                    : 'Prendre une photo'}
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goto(step - 1)}
                  disabled={step === 0}
                  className="btn-ghost flex-1 disabled:opacity-40"
                >
                  Précédent
                </button>
                <button
                  onClick={onNext}
                  onPointerDown={startHold}
                  onPointerUp={cancelHold}
                  onPointerLeave={cancelHold}
                  onPointerCancel={cancelHold}
                  className={`relative flex-1 select-none overflow-hidden rounded-full px-5 py-2.5 font-semibold text-white transition-all active:scale-[0.98] ${
                    canAdvance ? 'bg-ink' : 'bg-ink/40'
                  }`}
                >
                  <span
                    className="absolute inset-y-0 left-0 bg-vert"
                    style={{
                      width: holdingNext ? '100%' : '0%',
                      transition: holdingNext ? `width ${HOLD_MS}ms linear` : 'width 150ms ease-out',
                    }}
                  />
                  <span className="relative">{step === total - 1 ? 'Récap' : 'Suivant'}</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button onClick={() => goto(total - 1)} className="btn-ghost flex-1">
                Revenir
              </button>
              {done ? (
                <span className="flex-1 rounded-full bg-vert-50 px-4 py-3 text-center text-sm font-semibold text-vert-700">
                  ✓ Audit terminé
                </span>
              ) : (
                <button onClick={finir} disabled={finishing} className="btn-primary flex-1 disabled:opacity-60">
                  {finishing ? 'Finalisation…' : 'Terminer'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
