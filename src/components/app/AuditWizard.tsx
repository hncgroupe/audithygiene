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

export interface LibraryEntry {
  code: string;
  theme: string;
  intitule: string;
  explication: string;
  pedagogie: string;
  ponderation: number;
  photoConseillee: boolean;
  constats: WizardConstat[];
  motifs: string[];
}

interface Props {
  auditId: string;
  etablissement: { nom: string; ville: string | null; type: string };
  statutInitial: string;
  items: WizardItem[];
  library: LibraryEntry[];
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

export function AuditWizard({ auditId, etablissement, statutInitial, items: initial, library }: Props) {
  const router = useRouter();
  const [items, setItems] = useState<WizardItem[]>(initial);
  const [addOpen, setAddOpen] = useState(false);
  const [addQuery, setAddQuery] = useState('');
  const [adding, setAdding] = useState(false);
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

  // Ajout d'un point (bibliothèque ou sur mesure)
  const appendItem = (item: WizardItem) => {
    const idx = items.length;
    setItems((prev) => [...prev, item]);
    setStep(idx);
    setAddOpen(false);
    setAddQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addFromLibrary = async (entry: LibraryEntry) => {
    setAdding(true);
    try {
      const res = await fetch(`/api/audits/${auditId}/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromCode: entry.code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      appendItem({
        code: data.code,
        theme: data.theme,
        intitule: data.intitule,
        explication: entry.explication,
        pedagogie: entry.pedagogie,
        ponderation: data.ponderation,
        photoConseillee: entry.photoConseillee,
        conformite: 'NON_EVALUE',
        commentaire: null,
        constats: entry.constats,
        motifs: entry.motifs,
        photos: [],
      });
    } catch {
      /* ignore */
    } finally {
      setAdding(false);
    }
  };

  const addCustom = async (text: string) => {
    const intitule = text.trim();
    if (!intitule) return;
    setAdding(true);
    try {
      const res = await fetch(`/api/audits/${auditId}/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intitule }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      appendItem({
        code: data.code,
        theme: data.theme,
        intitule: data.intitule,
        explication: '',
        pedagogie: '',
        ponderation: data.ponderation,
        photoConseillee: false,
        conformite: 'NON_EVALUE',
        commentaire: null,
        constats: [],
        motifs: [],
        photos: [],
      });
    } catch {
      /* ignore */
    } finally {
      setAdding(false);
    }
  };

  const suggestions =
    addQuery.trim().length >= 2
      ? library
          .filter((l) => l.intitule.toLowerCase().includes(addQuery.trim().toLowerCase()))
          .slice(0, 6)
      : [];

  const saveLabel = { idle: '', saving: 'Enregistrement…', saved: '✓ Enregistré', error: 'Échec' }[save];

  // Bloc « Ajouter un point » (réutilisé sur le récap mobile et la barre latérale tablette)
  const renderAdd = () =>
    !addOpen ? (
      <button onClick={() => setAddOpen(true)} className="btn-primary w-full">
        + Ajouter un point
      </button>
    ) : (
      <div className="rounded-xl border border-ink/10 bg-white p-3 text-left">
        <input
          autoFocus
          value={addQuery}
          onChange={(e) => setAddQuery(e.target.value)}
          placeholder="Rechercher ou créer un point…"
          className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm focus:border-vert focus:outline-none focus:ring-2 focus:ring-vert/20"
        />
        {suggestions.length > 0 && (
          <ul className="mt-2 overflow-hidden rounded-lg border border-ink/10">
            {suggestions.map((s) => (
              <li key={s.code} className="border-b border-ink/5 last:border-0">
                <button
                  disabled={adding}
                  onClick={() => addFromLibrary(s)}
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-vert-50 disabled:opacity-50"
                >
                  <span className="font-medium text-ink">{s.intitule}</span>
                  <span className="text-gris"> · {s.theme}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {addQuery.trim().length >= 2 && (
          <button
            disabled={adding}
            onClick={() => addCustom(addQuery)}
            className="mt-2 w-full rounded-lg border border-dashed border-ink/25 px-3 py-2 text-sm font-medium text-ink/70 hover:border-vert hover:text-vert-700 disabled:opacity-50"
          >
            + Créer « {addQuery.trim()} » (sur mesure)
          </button>
        )}
        <button
          onClick={() => {
            setAddOpen(false);
            setAddQuery('');
          }}
          className="mt-2 w-full text-center text-xs text-gris hover:text-ink"
        >
          Annuler
        </button>
      </div>
    );

  // Checklist par thème (tap un point pour l'ouvrir)
  const renderChecklist = () => (
    <div className="space-y-4">
      {Array.from(new Set(items.map((i) => i.theme))).map((theme) => (
        <div key={theme}>
          <h3 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-gris">{theme}</h3>
          <ul className="overflow-hidden rounded-xl border border-ink/10 bg-white">
            {items.map((it, idx) =>
              it.theme !== theme ? null : (
                <li key={it.code} className="border-b border-ink/5 last:border-0">
                  <button
                    onClick={() => {
                      setStep(idx);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-left hover:bg-vert-50/50 lg:py-1.5 ${
                      idx === step ? 'bg-vert-50' : ''
                    }`}
                  >
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${CONF_STYLE[it.conformite].dot}`} />
                    <span className="flex-1 text-sm text-ink">{it.intitule}</span>
                    {it.photos.length > 0 && (
                      <span className="rounded bg-ink/5 px-1.5 text-[10px] font-medium text-gris">
                        {it.photos.length}
                      </span>
                    )}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      ))}
    </div>
  );

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

  // Suivant cliquable si constat + photo (obligatoires sur chaque point). Note/motif optionnels.
  const hasConstat = !!current && current.conformite !== 'NON_EVALUE';
  const hasPhoto = !!current && current.photos.length > 0;
  const isNc = !!current && (current.conformite === 'NC_MINEURE' || current.conformite === 'NC_MAJEURE');
  const canAdvance = !current || (hasConstat && hasPhoto);

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

  // ---- Blocs réutilisés (mobile empilé + tablette 3 colonnes) ----

  // Repère compact + titre + aide repliée
  const repereTitre = () =>
    current && (
      <>
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

        <h1 className="mt-1.5 text-center text-lg font-bold leading-tight tracking-tight text-ink lg:text-xl">
          {current.intitule}
        </h1>

        {(current.explication || current.pedagogie) && (
          <>
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
          </>
        )}
      </>
    );

  // 3 gros boutons constat empilés
  const constatButtons = () =>
    current && (
      <div className="mt-5 space-y-3 lg:mt-4">
        {(['CONFORME', 'NC_MINEURE', 'NC_MAJEURE'] as const).map((lvl) => {
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
          const c =
            current.constats.find((x) => x.conformite === lvl) ?? { label: cfg.label, conformite: lvl };
          return (
            <button
              key={lvl}
              onClick={() => onPickConstat(c)}
              className={`w-full rounded-2xl border-2 py-5 text-base font-bold transition-all active:scale-[0.99] ${
                on ? cfg.on : cfg.off
              }`}
            >
              {cfg.label}
            </button>
          );
        })}
      </div>
    );

  // Synthèse NC + motifs + note libre (contexte non-conformité)
  const contexteNc = () =>
    current && isNc ? (
      <div className="text-left">
        {activeNc && (
          <div className="overflow-hidden rounded-xl border border-red-200">
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
        <label className="mt-3 mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/60">
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
    ) : null;

  // Vignettes photos
  const photoThumbs = () =>
    current && current.photos.length > 0 ? (
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-3">
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
    ) : null;

  // Bouton capture photo rond (tablette : épinglé en bas-droite, à portée du pouce)
  const photoButton = () =>
    current && (
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        aria-label={hasPhoto ? 'Ajouter une photo' : 'Prendre une photo'}
        className={`grid h-16 w-16 shrink-0 place-items-center rounded-full shadow-lg transition-all active:scale-95 disabled:opacity-60 ${
          hasPhoto
            ? 'border-2 border-vert/50 bg-white text-vert-700'
            : 'bg-vert text-white hover:bg-vert-600'
        }`}
      >
        {uploading ? (
          <span className="text-lg">…</span>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        )}
      </button>
    );

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-vert-50/30">
      {/* En-tête : retour + logo + nom du client (épinglé) */}
      <div className="shrink-0 border-b border-ink/10 bg-white">
        <div className="container-ah relative flex h-12 items-center">
          <button
            onClick={quitter}
            className="flex items-center text-xl leading-none text-gris hover:text-ink"
            aria-label="Enregistrer et quitter"
          >
            ‹
          </button>
          <Logo className="ml-1.5 shrink-0" />
          <div className="absolute left-1/2 max-w-[55%] -translate-x-1/2 text-center">
            <div className="truncate text-sm font-semibold leading-tight text-ink">
              {etablissement.nom}
            </div>
            {etablissement.ville && (
              <div className="truncate text-[11px] leading-tight text-gris">{etablissement.ville}</div>
            )}
          </div>
        </div>
        <div className="h-1 w-full bg-ink/5">
          <div
            className="h-full bg-vert transition-all duration-500"
            style={{ width: `${total ? (Math.min(step, total) / total) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Contenu : barre latérale checklist (tablette) + point courant */}
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="container-ah flex h-full gap-6 py-4">
          <aside className="hidden w-56 shrink-0 flex-col pr-1 lg:flex xl:w-72">
            <div className="min-h-0 flex-1 overflow-y-auto">{renderChecklist()}</div>
            <div className="mt-3 shrink-0">{renderAdd()}</div>
          </aside>
          {/* Input photo unique (déclenché depuis le footer mobile et la colonne contexte tablette) */}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={(e) => onUpload(e.target.files)}
            className="hidden"
          />

          {!isRecap && current && (
            <>
              {/* Mobile / portrait : une seule colonne scrollable */}
              <div className="min-h-0 flex-1 overflow-y-auto lg:hidden">
                <div className="mx-auto max-w-2xl">
                  {repereTitre()}
                  {constatButtons()}
                  {isNc && <div className="mt-3">{contexteNc()}</div>}
                  {photoThumbs() && <div className="mt-3">{photoThumbs()}</div>}
                </div>
              </div>

              {/* Tablette paysage : centre (constat) + colonne contexte, zéro scroll */}
              <div className="hidden min-h-0 flex-1 gap-6 pt-2 lg:flex">
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                  <div className="mx-auto w-full max-w-md">
                    {repereTitre()}
                    {constatButtons()}
                  </div>
                </div>
                <div className="flex w-80 shrink-0 flex-col gap-3">
                  <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-0.5">
                    {photoThumbs()}
                    {contexteNc()}
                    {!isNc && (
                      <p className="rounded-xl border border-dashed border-ink/15 px-3 py-4 text-center text-[12px] leading-snug text-gris">
                        {!hasConstat
                          ? 'Choisis un constat à gauche, puis prends une photo.'
                          : hasPhoto
                            ? 'Point validé. Tu peux passer au suivant.'
                            : 'Prends une photo pour valider ce point.'}
                      </p>
                    )}
                  </div>
                  {/* Bouton photo rond épinglé en bas-droite : à portée du pouce */}
                  <div className="flex shrink-0 justify-end">{photoButton()}</div>
                </div>
              </div>
            </>
          )}

          {/* Récapitulatif */}
          {isRecap && (
            <div className="min-h-0 flex-1 overflow-y-auto">
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

                {/* Sur mobile : ajout + checklist sous le score (sur tablette : barre latérale) */}
                <div className="mt-5 lg:hidden">{renderAdd()}</div>
                <div className="mt-6 lg:hidden">{renderChecklist()}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Barre d'action épinglée en bas : jamais besoin de scroller pour avancer */}
      <div className="shrink-0 border-t border-ink/10 bg-white">
        <div className="container-ah py-2.5">
          {!isRecap ? (
            <>
              {/* Gros bouton photo (mobile seulement : sur tablette il est en colonne contexte) */}
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="mb-2 w-full rounded-full bg-vert py-3.5 text-base font-semibold text-white transition-all hover:bg-vert-600 active:scale-[0.99] disabled:opacity-60 lg:hidden"
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
