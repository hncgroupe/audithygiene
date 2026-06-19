'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { calculerNotation, type Conformite } from '@/lib/notation';
import { enqueuePhoto, removePhoto, pendingForAudit } from '@/lib/photo-queue';

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
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  /**
   * Moteur de sync : vide la file IndexedDB. Tolérant aux pannes, idempotent,
   * relancé à l'ouverture, au retour du réseau et toutes les 20 s.
   */
  const syncQueue = useCallback(async () => {
    if (syncing.current) return;
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
    syncing.current = true;
    try {
      const pending = await pendingForAudit(auditId);
      for (const rec of pending) {
        const fd = new FormData();
        fd.append('file', rec.blob, `${rec.localId}.${(rec.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg')}`);
        fd.append('code', rec.code);
        try {
          const res = await fetch(`/api/audits/${auditId}/photo`, { method: 'POST', body: fd });
          if (!res.ok) throw new Error();
          const data = await res.json();
          await removePhoto(rec.localId);
          setItems((prev) =>
            prev.map((i) =>
              i.code === rec.code
                ? {
                    ...i,
                    photos: i.photos.map((p) =>
                      p.localId === rec.localId
                        ? { path: data.path, url: data.url, status: 'done' as const }
                        : p
                    ),
                  }
                : i
            )
          );
        } catch {
          /* échec (hors-ligne / serveur) : la photo reste en file, retry plus tard */
        }
      }
    } finally {
      syncing.current = false;
    }
  }, [auditId]);

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
    patchItem(current.code, { conformite: c.conformite, commentaire: c.label });
  };

  // Sauvegarde instantanée (locale) puis tentative d'upload.
  const onUpload = async (files: FileList | null) => {
    if (!files || !current) return;
    setUploading(true);
    const code = current.code;
    for (const file of Array.from(files)) {
      const localId =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const objectUrl = URL.createObjectURL(file);
      // 1. Persistance locale immédiate (survit reload / hors-ligne)
      await enqueuePhoto({ localId, auditId, code, blob: file, type: file.type, createdAt: Date.now() });
      // 2. Aperçu instantané
      setItems((prev) =>
        prev.map((i) =>
          i.code === code
            ? { ...i, photos: [...i.photos, { localId, url: objectUrl, status: 'pending' as const }] }
            : i
        )
      );
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
    // 3. Upload en arrière-plan
    syncQueue();
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

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-vert-50/30">
      {/* En-tête de pilotage (épinglé) */}
      <div className="shrink-0 border-b border-ink/10 bg-white/95 backdrop-blur">
        <div className="container-ah flex items-center gap-3 py-2.5">
          <Link href="/app/audits" className="text-sm text-gris hover:text-ink" aria-label="Retour">
            ←
          </Link>
          <ScoreRing score={notation.scoreGlobal} evalues={evalues} />
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <div className="truncate font-semibold text-ink">{etablissement.nom}</div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gris sm:justify-start">
              <span className="tabular-nums">
                {isRecap ? 'Récapitulatif' : `Point ${step + 1}/${total}`}
              </span>
              {notation.nbCasCritiques > 0 && (
                <span className="rounded-full bg-red-50 px-2 py-0.5 font-semibold text-red-700">
                  {notation.nbCasCritiques} critique{notation.nbCasCritiques > 1 ? 's' : ''}
                </span>
              )}
              {saveLabel && (
                <span className={save === 'error' ? 'text-red-600' : save === 'saved' ? 'text-vert-700' : ''}>
                  {saveLabel}
                </span>
              )}
              {!online && (
                <span className="rounded-full bg-ink px-2 py-0.5 font-semibold text-white">Hors-ligne</span>
              )}
              {pendingCount > 0 && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-800">
                  ⏳ {pendingCount} photo{pendingCount > 1 ? 's' : ''} en attente
                </span>
              )}
            </div>
          </div>
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
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-vert-700 sm:justify-start">
              <span className={`h-2 w-2 rounded-full ${CONF_STYLE[current.conformite].dot}`} />
              {current.theme}
              <span className="rounded-md bg-ink/5 px-2 py-0.5 font-medium normal-case tracking-normal text-gris sm:ml-auto">
                {current.code}
              </span>
            </div>

            <h1 className="mt-2 text-center text-xl font-bold tracking-tight text-ink sm:text-left">
              {current.intitule}
            </h1>
            <p className="mt-1.5 text-center text-[15px] leading-relaxed text-ink/60 sm:text-left">
              {current.explication}
            </p>

            {/* Encart à lire au client présent */}
            <div className="mt-3 rounded-xl border border-vert-200 bg-vert-50/70 p-3 text-center sm:text-left">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide text-vert-800 sm:justify-start">
                À expliquer au client
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink/80">{current.pedagogie}</p>
            </div>

            {/* Photos */}
            <div className="mt-5">
              <div className="mb-2 flex flex-col items-center gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-semibold text-ink">
                  Photos{current.photoConseillee ? ' (conseillé)' : ''}
                </span>
                <span className="text-xs text-gris">{current.photos.length} ajoutée(s)</span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
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
                        p.status === 'done'
                          ? 'bg-vert text-white'
                          : 'bg-amber-400 text-ink'
                      }`}
                      title={p.status === 'done' ? 'Enregistrée' : 'En attente (sera envoyée au retour du réseau)'}
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
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-ink/15 text-sm font-medium text-gris transition-colors hover:border-vert hover:text-vert-700 disabled:opacity-50"
                >
                  {uploading ? '…' : '+ Photo'}
                </button>
              </div>
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

            {/* Constats pré-remplis */}
            <div className="mt-4">
              <span className="block text-center text-sm font-semibold text-ink sm:text-left">Constat</span>
              <div className="mt-2 space-y-2">
                {current.constats.map((c) => {
                  const on = current.conformite === c.conformite && current.commentaire === c.label;
                  return (
                    <button
                      key={c.label}
                      onClick={() => onPickConstat(c)}
                      className={`flex w-full items-center justify-center gap-3 rounded-xl border px-4 py-3 text-center text-sm font-medium transition-all active:scale-[0.99] sm:justify-start sm:text-left ${
                        on
                          ? `border-transparent ${CONF_STYLE[c.conformite].chip}`
                          : 'border-ink/10 bg-white text-ink hover:border-ink/25'
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${on ? 'bg-white/80' : CONF_STYLE[c.conformite].dot}`}
                      />
                      {c.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => current && patchItem(current.code, { conformite: 'NON_APPLICABLE', commentaire: 'Non applicable' })}
                  className={`block w-full text-center text-xs font-medium sm:w-auto ${
                    current.conformite === 'NON_APPLICABLE' ? 'text-ink' : 'text-gris hover:text-ink'
                  }`}
                >
                  Non applicable ici
                </button>
              </div>
            </div>

            {/* Synthèse NC : pourquoi + correctif */}
            {activeNc && (
              <div className="mt-4 overflow-hidden rounded-xl border border-red-200">
                <div className="bg-red-50 px-4 py-3">
                  <div className="text-xs font-bold uppercase tracking-wide text-red-700">
                    {current.conformite === 'NC_MAJEURE' ? 'Cas critique : pourquoi' : 'Non-conformité : pourquoi'}
                  </div>
                  <p className="mt-1 text-sm text-ink/80">{activeNc.pourquoi}</p>
                </div>
                {activeNc.correctif && (
                  <div className="border-t border-red-100 bg-white px-4 py-3">
                    <div className="text-xs font-bold uppercase tracking-wide text-vert-700">Correctif</div>
                    <p className="mt-1 text-sm text-ink/80">{activeNc.correctif}</p>
                  </div>
                )}
              </div>
            )}

            {/* Notes */}
            <div className="mt-5">
              <label className="mb-1.5 block text-center text-sm font-semibold text-ink sm:text-left">
                Notes de l’auditeur
              </label>
              <textarea
                value={current.commentaire ?? ''}
                onChange={(e) => patchItem(current.code, { commentaire: e.target.value })}
                rows={2}
                placeholder="Précisez le constat (ou choisissez un bouton ci-dessus)…"
                className="w-full rounded-xl border border-ink/15 px-3.5 py-2.5 text-sm focus:border-vert focus:outline-none focus:ring-2 focus:ring-vert/20"
              />
            </div>

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
        <div className="container-ah flex items-center gap-3 py-3">
          {!isRecap ? (
            <>
              <button
                onClick={() => goto(step - 1)}
                disabled={step === 0}
                className="btn-ghost flex-1 disabled:opacity-40"
              >
                Précédent
              </button>
              <button onClick={() => goto(step + 1)} className="btn-primary flex-1">
                {step === total - 1 ? 'Voir le récap' : 'Suivant'}
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
