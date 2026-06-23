import Image from 'next/image';
import { GRILLE_RESTO360, NOTATION_RESTO } from '@/lib/grille-resto360';
import type { RapportResto360, PilierDetail, LigneRapport, CritereDetail } from '@/lib/rapport-resto360';
import type { RestitutionIA } from '@/lib/restitution';
import { RadarResto } from './RadarResto';
import { RestitutionView } from './RestitutionView';

const ORANGE = '#F97316';
const INK = '#0C1B17';

// Police Apple (système) : rendu sobre, lisible, « non IA ». S'applique à tout
// le document de rapport et prime sur la Poppins de la marque, par demande client.
const APPLE_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif';

function couleurNote(n: number): string {
  return NOTATION_RESTO.find((x) => x.note === n)?.couleur ?? '#6B7D77';
}
function labelNote(n: number): string {
  return NOTATION_RESTO.find((x) => x.note === n)?.label ?? '';
}
function maturite(score: number): string {
  if (score >= 85) return 'Maîtrisé';
  if (score >= 70) return 'Satisfaisant';
  if (score >= 50) return 'À consolider';
  return 'Sous surveillance';
}
function couleurScore(score: number): string {
  if (score >= 85) return '#16A34A';
  if (score >= 70) return '#22C55E';
  if (score >= 50) return ORANGE;
  return '#DC2626';
}

function NoteBadge({ note }: { note: number | null }) {
  if (note === null) {
    return <span className="rounded px-1.5 py-0.5 text-[11px] font-semibold text-gris ring-1 ring-ink/10">n/e</span>;
  }
  return (
    <span
      className="inline-grid h-6 w-6 shrink-0 place-items-center rounded-md text-xs font-bold text-white"
      style={{ backgroundColor: couleurNote(note) }}
      title={labelNote(note)}
    >
      {note}
    </span>
  );
}

/** Note mise en évidence : pastille colorée « 3 / 5 · Libellé » (pas un n° de question). */
function NoteTag({ note }: { note: number | null }) {
  if (note === null) {
    return (
      <span className="inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold text-gris ring-1 ring-ink/15">
        Non évalué
      </span>
    );
  }
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-white"
      style={{ backgroundColor: couleurNote(note) }}
    >
      <span className="text-sm font-extrabold leading-none">
        {note}
        <span className="text-[11px] font-semibold opacity-80">/5</span>
      </span>
      <span className="text-xs font-semibold leading-none">{labelNote(note)}</span>
    </span>
  );
}

/** Rappel de l'échelle de notation, en tête des résultats. */
function LegendeNotation() {
  return (
    <div className="mb-7 rounded-2xl border border-ink/10 bg-ink/[0.015] p-4">
      <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-gris">Comment lire les notes</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {NOTATION_RESTO.slice()
          .reverse()
          .map((n) => (
            <span
              key={n.note}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: n.couleur }}
            >
              <span className="font-extrabold">{n.note}/5</span>
              {n.label}
            </span>
          ))}
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-ink/70">
        Chaque point est noté de <span className="font-semibold text-ink">1 (critique)</span> à{' '}
        <span className="font-semibold text-ink">5 (excellent)</span>. Les points sanitaires et
        réglementaires comptent double dans la note du pilier.
      </p>
    </div>
  );
}

/** Jauge circulaire du score global (SVG pur). */
function ScoreGauge({ score }: { score: number | null }) {
  const val = score ?? 0;
  const R = 54;
  const C = 2 * Math.PI * R;
  const couleur = score === null ? '#6B7D77' : couleurScore(val);
  const offset = C * (1 - val / 100);
  return (
    <svg viewBox="0 0 140 140" className="h-36 w-36" role="img" aria-label={`Score ${val} sur 100`}>
      <circle cx="70" cy="70" r={R} fill="none" stroke="#0C1B17" strokeOpacity={0.08} strokeWidth={12} />
      <circle
        cx="70"
        cy="70"
        r={R}
        fill="none"
        stroke={couleur}
        strokeWidth={12}
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={offset}
        transform="rotate(-90 70 70)"
      />
      <text x="70" y="66" textAnchor="middle" fontSize="34" fontWeight={800} fill={INK}>
        {score ?? '--'}
      </text>
      <text x="70" y="88" textAnchor="middle" fontSize="11" fontWeight={600} fill="#6B7D77" letterSpacing="1">
        / 100
      </text>
    </svg>
  );
}

function KpiCard({
  valeur,
  label,
  couleur = INK,
  hint,
}: {
  valeur: React.ReactNode;
  label: string;
  couleur?: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white px-4 py-3">
      <p className="text-[1.75rem] font-extrabold leading-none" style={{ color: couleur }}>
        {valeur}
      </p>
      <p className="mt-1.5 text-[13px] font-semibold uppercase tracking-wide text-ink/70">{label}</p>
      {hint && <p className="mt-0.5 text-xs leading-tight text-gris">{hint}</p>}
    </div>
  );
}

function Section({ num, titre, children }: { num: string; titre: string; children: React.ReactNode }) {
  return (
    <section className="px-8 py-9 print:break-before-page sm:px-12">
      <div className="mb-6 flex items-center gap-3">
        <span
          className="grid h-8 w-8 place-items-center rounded-lg text-sm font-extrabold text-white"
          style={{ backgroundColor: ORANGE }}
        >
          {num}
        </span>
        <h2 className="text-xl font-bold tracking-tight" style={{ color: INK }}>
          {titre}
        </h2>
        <span className="ml-2 h-px flex-1 bg-ink/10" />
      </div>
      {children}
    </section>
  );
}

const DELAI: Record<string, string> = { Urgence: 'sous 7 jours', Important: 'sous 30 jours', Confort: 'sous 90 jours' };

export interface Resto360RapportDocumentProps {
  etablissement: { nom: string; adresse?: string | null; ville?: string | null; type: string };
  dateStr: string;
  reference: string;
  auditeur?: string;
  r: RapportResto360;
  restitution: RestitutionIA;
  details: PilierDetail[];
}

/**
 * Document de rapport auditresto360 (couverture → annexe).
 * Composant présentationnel pur : toutes les données sont calculées en amont
 * (page serveur réelle ou page de prévisualisation). Source unique de la mise en
 * page du rapport, partagée entre /app/audits/[id]/rapport et /preview-rapport.
 */
export function Resto360RapportDocument({
  etablissement,
  dateStr,
  reference,
  auditeur = 'auditresto360',
  r,
  restitution,
  details,
}: Resto360RapportDocumentProps) {
  const planRows = [
    ...r.plan.urgence.map((l) => ({ p: 'Urgence', l })),
    ...r.plan.important.map((l) => ({ p: 'Important', l })),
    ...r.plan.confort.map((l) => ({ p: 'Confort', l })),
  ];

  const radarTrie = [...r.radar].sort((a, b) => b.score - a.score);
  const meilleur = radarTrie[0] ?? null;
  const faible = radarTrie.length ? radarTrie[radarTrie.length - 1] : null;
  const score = r.scoreGlobal;

  const sommaire = [
    'Synthèse exécutive',
    'Résultats détaillés par pilier',
    'Synthèse et recommandations',
    "Plan d'action priorisé",
    'Échanges avec le dirigeant',
    'Annexe : méthodologie et notation',
  ];

  return (
    <div
      className="mx-auto my-6 max-w-[820px] bg-white shadow-xl antialiased print:my-0 print:max-w-none print:shadow-none"
      style={{ fontFamily: APPLE_FONT }}
    >
      {/* COUVERTURE (fond blanc) */}
      <div className="flex min-h-[68vh] flex-col justify-between border-b border-ink/10 px-8 py-12 sm:px-12 print:min-h-screen">
        <div className="flex items-center justify-between">
          <Image src="/logo-auditresto360.png" alt="auditresto360" width={170} height={44} className="h-8 w-auto" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gris">Confidentiel</span>
        </div>

        <div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.05]" style={{ color: INK }}>
            {etablissement.nom}
          </h1>
          <p className="mt-2 text-gris">
            {[etablissement.adresse, etablissement.ville].filter(Boolean).join(', ')}
          </p>

          <div className="mt-9 flex items-center gap-6">
            <div
              className="grid h-28 w-28 place-items-center rounded-2xl text-white"
              style={{ backgroundColor: score === null ? '#6B7D77' : couleurScore(score) }}
            >
              <span className="text-[2.75rem] font-extrabold leading-none">{score ?? '--'}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wide opacity-90">/ 100</span>
            </div>
            <div>
              <div className="text-2xl" style={{ color: ORANGE }}>
                {'★'.repeat(r.etoiles)}
                <span className="text-ink/15">{'★'.repeat(5 - r.etoiles)}</span>
              </div>
              <p className="mt-1 text-lg font-semibold" style={{ color: INK }}>
                {score !== null ? maturite(score) : 'Audit en cours'}
              </p>
              <p className="text-xs text-gris">{r.nbCriteresNotes}/{r.nbCriteresTotal} critères évalués</p>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-2 border-t border-ink/10 pt-5 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-gris">Date</dt>
            <dd className="font-medium text-ink">{dateStr || 'n/d'}</dd>
          </div>
          <div>
            <dt className="text-gris">Référence</dt>
            <dd className="font-medium text-ink">{reference}</dd>
          </div>
          <div>
            <dt className="text-gris">Auditeur</dt>
            <dd className="font-medium text-ink">{auditeur}</dd>
          </div>
          <div>
            <dt className="text-gris">Type</dt>
            <dd className="font-medium text-ink">{etablissement.type}</dd>
          </div>
        </dl>
      </div>

      {/* SOMMAIRE */}
      <div className="border-b border-ink/10 px-8 py-7 sm:px-12">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-gris">Sommaire</h2>
        <ol className="mt-4 grid gap-x-10 gap-y-3 text-base sm:grid-cols-2">
          {sommaire.map((t, i) => (
            <li key={t} className="flex items-baseline gap-3 border-b border-dashed border-ink/10 pb-2">
              <span className="text-lg font-bold tabular-nums" style={{ color: ORANGE }}>
                {i < 5 ? `0${i + 1}` : 'A'}
              </span>
              <span className="font-medium text-ink/85">{t}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* 1. SYNTHÈSE EXÉCUTIVE */}
      <Section num="1" titre="Synthèse exécutive">
        {/* Tableau de bord : jauge + KPI */}
        <div className="grid items-stretch gap-5 sm:grid-cols-[auto,1fr]">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-ink/10 bg-ink/[0.02] px-8 py-5">
            <ScoreGauge score={score} />
            <p className="mt-1 text-sm font-bold" style={{ color: score === null ? '#6B7D77' : couleurScore(score ?? 0) }}>
              {score !== null ? maturite(score) : 'En cours'}
            </p>
            <div className="text-lg leading-none" style={{ color: ORANGE }}>
              {'★'.repeat(r.etoiles)}
              <span className="text-ink/15">{'★'.repeat(5 - r.etoiles)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <KpiCard valeur={`${r.nbCriteresNotes}`} label="Critères évalués" hint={`sur ${r.nbCriteresTotal}`} />
            <KpiCard
              valeur={r.casCritiques.length}
              label="Cas critiques"
              couleur={r.casCritiques.length ? '#DC2626' : '#16A34A'}
              hint="points sanitaires"
            />
            <KpiCard
              valeur={r.urgences.length}
              label="À corriger"
              couleur={r.urgences.length ? ORANGE : '#16A34A'}
              hint="notes 1 et 2"
            />
            <KpiCard valeur={r.quickWins.length} label="À améliorer" couleur="#EAB308" hint="notes à 3" />
            {meilleur && (
              <KpiCard valeur={`${meilleur.score}`} label="Pilier le plus fort" couleur="#16A34A" hint={meilleur.radar} />
            )}
            {faible && (
              <KpiCard valeur={`${faible.score}`} label="Pilier le plus faible" couleur="#DC2626" hint={faible.radar} />
            )}
          </div>
        </div>

        {/* Radar + barres par pilier */}
        <div className="mt-7 grid gap-6 lg:grid-cols-2 lg:items-center">
          <RadarResto points={r.radar} />
          <ul className="space-y-2">
            {r.radar.map((p) => (
              <li key={p.pilier} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm text-ink/80">{p.radar}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink/5">
                  <span
                    className="block h-2 rounded-full"
                    style={{ width: `${p.score}%`, backgroundColor: couleurScore(p.score) }}
                  />
                </span>
                <span className="w-9 text-right text-sm font-bold text-ink">{p.score}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Synthèse rédigée */}
        <p className="mt-7 border-l-2 pl-4 text-[15px] leading-relaxed text-ink/85" style={{ borderColor: ORANGE }}>
          {restitution.synthese}
        </p>

        {/* Cas critiques */}
        {r.casCritiques.length > 0 && (
          <div className="mt-7 rounded-2xl border border-red-200 bg-red-50/70 p-5">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-red-600 text-sm font-extrabold text-white">
                !
              </span>
              <h3 className="text-base font-bold text-red-700">
                Cas critiques à traiter en priorité ({r.casCritiques.length})
              </h3>
            </div>
            <p className="mt-1 text-xs text-red-700/80">
              Points sanitaires ou réglementaires notés 1 ou 2. Ils pèsent double dans la note et abaissent le score global.
            </p>
            <ul className="mt-3 space-y-1.5">
              {r.casCritiques.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink/85">
                  <NoteBadge note={c.note} />
                  <span>
                    <span className="font-semibold">{c.intitule}</span>
                    <span className="text-gris"> · {c.pilier}</span>
                    {c.commentaire ? <span className="text-ink/70"> : {c.commentaire}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* 2. RÉSULTATS PAR PILIER */}
      <Section num="2" titre="Résultats détaillés par pilier">
        <LegendeNotation />
        <div className="space-y-9">
          {details.map((d) => (
              <article key={d.code} className="break-inside-avoid">
                {/* Bandeau pilier : fond orange, texte blanc */}
                <div
                  className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
                  style={{ backgroundColor: ORANGE }}
                >
                  <h3 className="text-xl font-bold text-white">
                    {d.numero}. {d.nom}
                  </h3>
                  <span className="shrink-0 text-base font-extrabold text-white">
                    {d.score ?? '--'}/100
                  </span>
                </div>

                {(d.risques.length > 0 || d.forts.length > 0) && (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {d.risques.length > 0 && (
                      <div className="rounded-xl border border-red-100 bg-red-50/60 p-3">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-red-700">À corriger</p>
                        <ul className="mt-1 space-y-0.5 text-xs text-ink/80">
                          {d.risques.map((c, i) => (
                            <li key={i}>· {c.intitule}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {d.forts.length > 0 && (
                      <div className="rounded-xl border border-vert-100 bg-vert-50 p-3">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-vert-700">Points forts</p>
                        <ul className="mt-1 space-y-0.5 text-xs text-ink/80">
                          {d.forts.slice(0, 6).map((c, i) => (
                            <li key={i}>· {c.intitule}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Détail des critères : une carte par point (note, explication
                    claire, règle, action, photo). La carte sépare visuellement
                    chaque question. */}
                <div className="mt-5 space-y-6">
                  {d.groupes.map((g) => (
                    <div key={g.nom} className="break-inside-avoid">
                      <p className="mb-2.5 text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink">{g.nom}</p>
                      <ul className="space-y-3">
                        {g.criteres.map((c: CritereDetail, i) => {
                          const anomalie = c.note !== null && c.note <= 3;
                          return (
                            <li
                              key={i}
                              className="break-inside-avoid overflow-hidden rounded-2xl border border-ink/10 bg-white"
                            >
                              {/* En-tête encadré : le titre ressort, la note à droite */}
                              <div className="flex items-start justify-between gap-3 border-b border-ink/10 bg-ink/[0.07] px-4 py-3 sm:px-5">
                                <h4 className="text-[15px] font-bold text-ink">{c.intitule}</h4>
                                <NoteTag note={c.note} />
                              </div>
                              <div className="p-4 sm:p-5">
                                {/* Ce qui est vérifié : une ligne sobre, pour comprendre le point */}
                                {c.description && (
                                  <p className="text-[13px] leading-relaxed text-gris">{c.description}</p>
                                )}

                                {/* Uniquement si le point est à corriger : le problème puis l'action */}
                                {anomalie && (c.nonConforme || c.commentaire || c.regle) && (
                                  <div className="mt-3 space-y-2 border-t border-ink/10 pt-3">
                                    {c.nonConforme && (
                                      <p className="text-[13.5px] leading-relaxed text-ink/75">
                                        <span className="font-semibold text-ink">Ce qui ne va pas. </span>
                                        {c.nonConforme}
                                      </p>
                                    )}
                                    {c.commentaire && (
                                      <p className="text-[15px] leading-relaxed text-ink">
                                        <span className="font-bold">À faire. </span>
                                        {c.commentaire}
                                      </p>
                                    )}
                                    {c.regle && (
                                      <p className="text-[12px] leading-relaxed text-gris">Réglementation : {c.regle}</p>
                                    )}
                                  </div>
                                )}

                                {/* Point conforme avec une note libre de l'auditeur */}
                                {!anomalie && c.commentaire && (
                                  <p className="mt-1.5 text-[13px] leading-relaxed text-gris">{c.commentaire}</p>
                                )}

                                {/* Photos, dans la carte */}
                                {c.photos.length > 0 && (
                                  <div className="mt-3.5 flex flex-wrap gap-2">
                                    {c.photos.map((u, k) => (
                                      <a key={k} href={u} target="_blank" rel="noopener noreferrer" title={c.intitule}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                          src={u}
                                          alt={c.intitule}
                                          className="h-24 w-32 rounded-lg border border-ink/10 object-cover"
                                        />
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
          ))}
        </div>
      </Section>

      {/* 3. SYNTHÈSE & RECOMMANDATIONS */}
      <Section num="3" titre="Synthèse et recommandations">
        <RestitutionView data={restitution} bare />
      </Section>

      {/* 4. PLAN D'ACTION */}
      <Section num="4" titre="Plan d'action priorisé">
        {planRows.length ? (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-ink/10 text-left text-xs uppercase tracking-wide text-gris">
                <th className="py-2 pr-3">Priorité</th>
                <th className="py-2 pr-3">Action</th>
                <th className="py-2 pr-3">Pilier</th>
                <th className="py-2">Délai conseillé</th>
              </tr>
            </thead>
            <tbody>
              {planRows.map(({ p, l }: { p: string; l: LigneRapport }, i) => (
                <tr key={i} className="border-b border-ink/5 align-top">
                  <td className="py-2 pr-3">
                    <span
                      className="inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold text-white"
                      style={{ backgroundColor: p === 'Urgence' ? '#DC2626' : p === 'Important' ? ORANGE : '#EAB308' }}
                    >
                      {p}
                    </span>
                  </td>
                  <td className="py-2 pr-3 text-ink">{l.commentaire?.trim() || l.intitule}</td>
                  <td className="py-2 pr-3 text-gris">{l.pilier}</td>
                  <td className="py-2 text-ink/80">{DELAI[p]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-gris">Aucune action corrective requise. Planifier un audit de suivi.</p>
        )}
      </Section>

      {/* 5. DIRIGEANT */}
      {r.dirigeant.some((d) => d.reponse) && (
        <Section num="5" titre="Échanges avec le dirigeant">
          <dl className="space-y-4">
            {r.dirigeant
              .filter((d) => d.reponse)
              .map((d, i) => (
                <div key={i} className="rounded-xl border border-ink/10 bg-ink/[0.02] p-4">
                  <dt className="text-sm font-semibold text-ink">{d.question}</dt>
                  <dd className="mt-1 text-sm text-ink/75">{d.reponse}</dd>
                </div>
              ))}
          </dl>
        </Section>
      )}

      {/* ANNEXE : MÉTHODOLOGIE & NOTATION */}
      <Section num="A" titre="Annexe : méthodologie et notation">
        <p className="text-sm leading-relaxed text-ink/80">
          Cet audit 360 passe en revue l&apos;établissement sur dix piliers couvrant l&apos;exploitation,
          l&apos;hygiène, l&apos;organisation, la gestion et l&apos;expérience client. Chaque critère est
          évalué sur place selon une échelle de 1 à 5. Le score de chaque pilier est ramené sur 100. Les
          points sanitaires et réglementaires (températures, traçabilité, PMS, affichages, stockage du
          cru...) comptent double et sont notés plus sévèrement : un point critique noté 1 ou 2 abaisse le
          score global, et un point critique noté 1 plafonne ce score.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold text-ink">Les dix piliers</h3>
            <ul className="mt-2 grid grid-cols-2 gap-1 text-sm text-ink/75">
              {GRILLE_RESTO360.map((p) => (
                <li key={p.code}>
                  {p.numero}. {p.radar}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-ink">Échelle de notation</h3>
            <ul className="mt-2 space-y-1.5 text-sm">
              {NOTATION_RESTO.map((n) => (
                <li key={n.note} className="flex items-center gap-2">
                  <NoteBadge note={n.note} />
                  <span className="text-ink/75">{n.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-5 rounded-xl bg-ink/[0.03] p-3 text-xs text-gris">
          auditresto360 est un label privé indépendant. Ce rapport est un outil de conseil et de progrès.
          Il ne constitue ni une certification officielle, ni un agrément d&apos;État, ni un contrôle des
          services vétérinaires, et ne garantit pas le résultat d&apos;un contrôle officiel.
        </p>
      </Section>

      {/* PIED */}
      <footer className="border-t border-ink/10 px-8 py-6 text-center text-[11px] text-gris sm:px-12">
        <p>
          {etablissement.nom} · Rapport {reference} · {dateStr}
        </p>
        <p className="mt-1">
          auditresto360, label privé indépendant. Document confidentiel destiné à l&apos;établissement audité.
        </p>
      </footer>
    </div>
  );
}
