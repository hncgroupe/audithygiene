'use client';

import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  GRILLE_RESTO360,
  NOTATION_RESTO,
  critereId,
  critereLabel,
  critereAide,
  critereChecklist,
  scorePilier,
  scoreGlobalResto,
  totalCriteres,
  type NoteResto,
} from '@/lib/grille-resto360';

export interface Resto360Photo {
  path: string;
  url: string;
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

  const [notes, setNotes] = useState<Record<string, number>>(() => {
    const o: Record<string, number> = {};
    for (const it of items) if (typeof it.note === 'number') o[it.code] = it.note;
    return o;
  });
  const [comments, setComments] = useState<Record<string, string>>(() => {
    const o: Record<string, string> = {};
    for (const it of items) if (it.commentaire) o[it.code] = it.commentaire;
    return o;
  });
  const [checks, setChecks] = useState<Record<string, string[]>>(() => {
    const o: Record<string, string[]> = {};
    for (const it of items) {
      const cl = (it.meta as { checklist?: unknown } | null)?.checklist;
      if (Array.isArray(cl)) o[it.code] = cl.filter((x): x is string => typeof x === 'string');
    }
    return o;
  });
  const [photos, setPhotos] = useState<Record<string, Resto360Photo[]>>(() => {
    const o: Record<string, Resto360Photo[]> = {};
    for (const it of items) if (it.photos?.length) o[it.code] = it.photos;
    return o;
  });
  const [customItems, setCustomItems] = useState<CustomItem[]>(() =>
    items
      .filter((i) => i.code.startsWith(CUSTOM_PREFIX))
      .map((i) => ({ code: i.code, theme: i.theme, groupe: i.groupe, intitule: i.intitule }))
  );

  const [step, setStep] = useState(0);
  const [openComment, setOpenComment] = useState<string | null>(null);
  const [openCheck, setOpenCheck] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [finishing, setFinishing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newQ, setNewQ] = useState('');

  const dirty = useRef<Set<string>>(new Set());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pilier = GRILLE_RESTO360[step];
  const isDirigeant = (pilier.questionsOuvertes?.length ?? 0) > 0;

  const totalNotables = useMemo(() => totalCriteres() + customItems.length, [customItems.length]);
  const nbNotes = Object.keys(notes).length;
  const scoreGlobal = scoreGlobalResto(notes as Record<string, NoteResto>);
  const scorePil = scorePilier(notes as Record<string, NoteResto>, pilier);

  const customForPilier = customItems.filter((ci) => ci.theme === pilier.nom);

  function queueSave(code: string) {
    dirty.current.add(code);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => flush(), 900);
  }

  async function flush(finalize = false) {
    if (dirty.current.size === 0 && !finalize) return;
    const codes = Array.from(dirty.current);
    dirty.current.clear();
    const payload = codes.map((code) => ({
      code,
      note: typeof notes[code] === 'number' ? notes[code] : null,
      commentaire: comments[code] ?? null,
      meta: checks[code]?.length ? { checklist: checks[code] } : null,
    }));
    setSaving(true);
    try {
      await fetch(`/api/audits/${auditId}/resto360`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: payload, finalize }),
      });
    } catch {
      codes.forEach((c) => dirty.current.add(c));
    } finally {
      setSaving(false);
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

  async function addPhoto(code: string, file: File) {
    setUploading(code);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('code', code);
      const res = await fetch(`/api/audits/${auditId}/photo`, { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        setPhotos((p) => ({ ...p, [code]: [...(p[code] ?? []), { path: data.path, url: data.url }] }));
      }
    } finally {
      setUploading(null);
    }
  }

  async function removePhoto(code: string, path: string) {
    setPhotos((p) => ({ ...p, [code]: (p[code] ?? []).filter((x) => x.path !== path) }));
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

  async function goTo(next: number) {
    if (timer.current) clearTimeout(timer.current);
    await flush();
    setOpenComment(null);
    setOpenCheck(null);
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
    router.push(`/app/audits/${auditId}/rapport`);
  }

  /** Bloc d'un critère notable (grille ou sur mesure). */
  function CritereRow(props: {
    code: string;
    label: string;
    aide?: string;
    checklist?: string[];
    onRemove?: () => void;
  }) {
    const { code, label, aide, checklist, onRemove } = props;
    const val = notes[code];
    const commentOpen = openComment === code;
    const checkOpen = openCheck === code;
    const done = checks[code] ?? [];
    const manquants = checklist ? checklist.filter((l) => !done.includes(l)).length : 0;

    return (
      <div className="border-b border-ink/5 pb-3 last:border-0 last:pb-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[15px] font-medium text-ink">{label}</p>
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
            {/* Note libre */}
            <button
              type="button"
              onClick={() => setOpenComment(commentOpen ? null : code)}
              title="Ajouter une note"
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border text-[11px] font-semibold ${
                comments[code]
                  ? 'border-[#F97316] bg-orange-50 text-[#F97316]'
                  : 'border-ink/20 text-gris hover:border-[#F97316] hover:text-[#F97316]'
              }`}
            >
              note
            </button>
            {/* Photo */}
            <label
              className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-ink/20 text-gris hover:border-[#F97316] hover:text-[#F97316]"
              title="Ajouter une photo"
            >
              {uploading === code ? (
                <span className="text-[10px]">…</span>
              ) : (
                <span className="relative">
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
                      className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold text-white"
                      style={{ backgroundColor: ORANGE }}
                    >
                      {photos[code]!.length}
                    </span>
                  )}
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

        {/* Photos */}
        {(photos[code]?.length ?? 0) > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {photos[code]!.map((ph) => (
              <span key={ph.path} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ph.url} alt="" className="h-12 w-12 rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(code, ph.path)}
                  className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-ink text-[10px] leading-none text-white"
                  aria-label="Retirer la photo"
                >
                  ×
                </button>
              </span>
            ))}
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
              onClick={() => router.push('/app/audits')}
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
                {saving ? 'Enregistrement…' : statutInitial === 'TERMINE' ? 'Terminé' : 'En cours'}
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
                  {p.numero}. {p.radar}
                  {sc !== null && <span className="ml-1 opacity-80">({sc})</span>}
                </button>
              );
            })}
          </div>

          {/* Titre pilier */}
          <div className="mb-4 flex items-baseline justify-between">
            <h1 className="text-xl font-bold tracking-tight text-ink">
              {pilier.numero}. {pilier.nom}
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
                      return (
                        <CritereRow
                          key={code}
                          code={code}
                          label={critereLabel(crit)}
                          aide={critereAide(crit)}
                          checklist={critereChecklist(crit)}
                        />
                      );
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
                {customForPilier.map((ci) => (
                  <CritereRow
                    key={ci.code}
                    code={ci.code}
                    label={ci.intitule}
                    onRemove={() => removeCustom(ci.code)}
                  />
                ))}
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
