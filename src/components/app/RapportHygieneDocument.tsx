/**
 * Rapport d'audit hygiène, version écran.
 *
 * Même structure que le PDF téléchargeable : synthèse en tête (anneau de score,
 * état des lieux, notation par thème), puis les points à corriger avec leurs
 * photos sous le texte, le détail de tous les points, et la portée du rapport.
 * Chaque section se ferme sur le bandeau de pied de page.
 */

import { MENTION_LABEL_PRIVE } from '@/lib/constants';
import {
  LIBELLE_CONFORMITE,
  COULEUR_CONFORMITE,
  type RapportHygiene,
  type ActionCorrective,
} from '@/lib/rapport-hygiene';

export interface RapportHygieneProps {
  etablissement: string;
  adresse?: string | null;
  ville?: string | null;
  type?: string | null;
  date: string;
  reference: string;
  auditeur: string;
  grilleVersion: string;
  rapport: RapportHygiene;
}

const ROUGE = '#DC2626';
const AMBRE = '#B45309';

function couleurScore(score: number | null): string {
  if (score === null) return '#D7DEDB';
  if (score >= 80) return '#10B981';
  if (score >= 60) return '#F59E0B';
  return ROUGE;
}

function Cle({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] uppercase tracking-[0.12em] text-gris-light">{children}</div>;
}

function Ligne({ cle, valeur }: { cle: string; valeur: string }) {
  return (
    <div className="flex border-t border-ink/[0.07] py-2.5 text-[14px]">
      <div className="w-40 shrink-0 text-gris">{cle}</div>
      <div>{valeur}</div>
    </div>
  );
}

/** Bandeau de pied de page : logo blanc, établissement, numéro de page. */
function Bandeau({ nom, page, total }: { nom: string; page: number; total: number }) {
  return (
    <div
      className="mt-12 flex items-center gap-4 px-8 py-3 print:mt-8"
      style={{ background: 'linear-gradient(90deg, #10B981 0%, #047857 55%, #065F46 100%)' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-blanc.png" alt="audit hygiène" className="h-4 w-auto shrink-0" />
      <span className="min-w-0 flex-1 truncate text-center text-[12px] text-white/90">{nom}</span>
      <span className="shrink-0 text-[12px] tabular-nums text-white/90">
        {page} / {total}
      </span>
    </div>
  );
}

function Anneau({ score, couleur, evalues }: { score: number; couleur: string; evalues: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const part = Math.max(0, Math.min(100, score)) / 100;
  return (
    <svg
      width="104"
      height="104"
      viewBox="0 0 104 104"
      role="img"
      aria-label={`Score global ${Math.round(score)} sur 100`}
      className="shrink-0"
    >
      <circle cx="52" cy="52" r={r} fill="none" stroke="#EEF2F0" strokeWidth="7" />
      {evalues > 0 && (
        <circle
          cx="52"
          cy="52"
          r={r}
          fill="none"
          stroke={couleur}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - part)}
          transform="rotate(-90 52 52)"
        />
      )}
      <text
        x="52"
        y="57"
        textAnchor="middle"
        fontSize="27"
        fontWeight="600"
        fill="#0C1B17"
        style={{ letterSpacing: '-0.03em' }}
      >
        {evalues === 0 ? '·' : Math.round(score)}
      </text>
      <text x="52" y="72" textAnchor="middle" fontSize="9" fill="#6B7D77">
        sur 100
      </text>
    </svg>
  );
}

function Theme({ nom, score }: { nom: string; score: number | null }) {
  return (
    <div className="flex items-center gap-3 border-t border-ink/[0.07] py-2 text-[14px]">
      <span className="min-w-0 flex-1 truncate">{nom}</span>
      <span className="hidden h-[3px] w-16 shrink-0 bg-ink/[0.07] sm:block">
        <span
          className="block h-[3px]"
          style={{
            width: `${Math.max(0, Math.min(100, score ?? 0))}%`,
            backgroundColor: couleurScore(score),
          }}
        />
      </span>
      <span className="w-8 shrink-0 text-right font-semibold tabular-nums">
        {score === null ? '·' : Math.round(score)}
      </span>
    </div>
  );
}

function Fiche({ a }: { a: ActionCorrective }) {
  const critique = a.priorite === 'IMMEDIAT';
  return (
    <div className="break-inside-avoid border-t border-ink/[0.07] pt-5">
      <div className="flex items-start gap-4">
        <span className="w-16 shrink-0 pt-1 text-[12px] tabular-nums text-gris-light">{a.code}</span>
        <div className="min-w-0 flex-1">
          <h4 className="text-[17px] font-semibold leading-snug tracking-tight">{a.intitule}</h4>
          <div className="mt-0.5 text-[12px] text-gris">
            {a.theme} · {a.delai}
          </div>
        </div>
        <span
          className="shrink-0 pt-1 text-[10px] font-semibold uppercase tracking-[0.1em]"
          style={{ color: critique ? ROUGE : AMBRE }}
        >
          {critique ? 'Critique' : 'Écart mineur'}
        </span>
      </div>

      <div className="mt-4 space-y-4 pb-1 pl-0 sm:pl-20">
        {a.constat && (
          <div>
            <Cle>Constaté sur place</Cle>
            <p className="mt-1 text-[15px] leading-relaxed">{a.constat}</p>
          </div>
        )}
        <div>
          <Cle>Risque</Cle>
          <p className="mt-1 text-[15px] leading-relaxed">{a.risque}</p>
        </div>
        <div>
          <Cle>Moyen de correction</Cle>
          <p className="mt-1 text-[15px] leading-relaxed">{a.correctif}</p>
        </div>

        {a.photos.length > 0 && (
          <div>
            <Cle>Photos</Cle>
            <div className="mt-2 flex flex-wrap gap-2">
              {a.photos.map((p, i) => (
                // eslint-disable-next-line @next/next/no-img-element, react/no-array-index-key
                <img key={i} src={p.url} alt="" className="h-[108px] w-[150px] rounded-lg object-cover" />
              ))}
            </div>
          </div>
        )}

        {a.referenceRegl && (
          <div>
            <Cle>Référence</Cle>
            <p className="mt-1 text-[12px] leading-relaxed text-gris">{a.referenceRegl}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function RapportHygieneDocument(p: RapportHygieneProps) {
  const r = p.rapport;
  const moitie = Math.ceil(r.themes.length / 2);
  const lieu = [p.type, p.adresse ?? p.ville].filter(Boolean).join(', ');
  const total = r.actions.length > 0 ? 4 : 3;
  let page = 0;

  return (
    <article className="mx-auto max-w-[820px] bg-white text-ink">
      {/* Synthèse */}
      <section>
        <div className="px-7 pt-12 sm:px-14">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <span className="text-[14px] font-semibold tracking-tight">
              audit <span className="text-vert">hygiène</span>
            </span>
            <Cle>
              {p.date} · {p.reference}
            </Cle>
          </div>

          <h1 className="mt-6 text-[34px] font-semibold leading-tight tracking-tighter sm:text-[40px]">
            {p.etablissement}
          </h1>
          <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-gris">
            {lieu ? `${lieu}. ` : ''}Audit conduit par {p.auditeur}, grille {p.grilleVersion},{' '}
            {r.evalues} points examinés sur {r.totalPoints}.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-6">
            <Anneau score={r.scoreGlobal} couleur={r.niveau.couleur} evalues={r.evalues} />
            <div className="min-w-[240px] flex-1">
              <h2 className="text-[17px] font-semibold" style={{ color: r.niveau.couleur }}>
                {r.niveau.titre}
              </h2>
              <p className="mt-1 max-w-[46ch] text-[15px] leading-relaxed text-gris">
                {r.niveau.phrase}
              </p>
              <div className="mt-3.5 flex flex-wrap gap-2">
                <span className="rounded-full border border-ink/15 px-2.5 py-1 text-[12px] text-gris">
                  <b className="font-semibold text-ink">{r.conformes}</b> conformes
                </span>
                <span
                  className="rounded-full border px-2.5 py-1 text-[12px] text-gris"
                  style={{ borderColor: r.ncMineures ? '#F0C68A' : 'rgba(12,27,23,0.15)' }}
                >
                  <b className="font-semibold" style={{ color: r.ncMineures ? AMBRE : '#0C1B17' }}>
                    {r.ncMineures}
                  </b>{' '}
                  écarts mineurs
                </span>
                <span
                  className="rounded-full border px-2.5 py-1 text-[12px] text-gris"
                  style={{ borderColor: r.ncMajeures ? '#F2B1B1' : 'rgba(12,27,23,0.15)' }}
                >
                  <b className="font-semibold" style={{ color: r.ncMajeures ? ROUGE : '#0C1B17' }}>
                    {r.ncMajeures}
                  </b>{' '}
                  critiques
                </span>
                <span className="rounded-full border border-ink/15 px-2.5 py-1 text-[12px] text-gris">
                  <b className="font-semibold text-ink">{r.nbPhotos}</b> photos
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-[19px] font-semibold tracking-tight">Notation par thème</h3>
            <div className="mt-3 grid gap-x-10 sm:grid-cols-2">
              <div>
                {r.themes.slice(0, moitie).map((t) => (
                  <Theme key={t.theme} nom={t.theme} score={t.score} />
                ))}
                <div className="border-t border-ink/[0.07]" />
              </div>
              <div>
                {r.themes.slice(moitie).map((t) => (
                  <Theme key={t.theme} nom={t.theme} score={t.score} />
                ))}
                <div className="border-t border-ink/[0.07]" />
              </div>
            </div>
          </div>

          <div className="mt-9">
            <h3 className="text-[16px] font-semibold">Comment lire ce score</h3>
            <p className="mt-1.5 max-w-[60ch] text-[14px] leading-relaxed text-gris">
              Chaque point vaut un poids de 1 à 3 selon son impact sanitaire. Un point conforme rapporte
              la totalité de son poids, un écart mineur la moitié, un point critique rien. Les points non
              applicables et non évalués sortent du calcul.
            </p>
            <p className="mt-4 max-w-[72ch] text-[12px] leading-relaxed text-gris">
              {MENTION_LABEL_PRIVE}
            </p>
          </div>
        </div>
        <Bandeau nom={p.etablissement} page={++page} total={total} />
      </section>

      {/* Points à corriger */}
      {r.actions.length > 0 && (
        <section className="break-before-page">
          <div className="px-7 pt-12 sm:px-14">
            <Cle>À corriger</Cle>
            <h2 className="mt-2 text-[28px] font-semibold tracking-tight">
              {r.actions.length} {r.actions.length > 1 ? 'points à traiter' : 'point à traiter'}
            </h2>
            <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-gris">
              Classés par gravité. Pour chaque point : ce qui a été vu, le risque, le moyen de
              correction, et les photos prises sur place. Gardez une photo après correction, c&apos;est
              la preuve la plus simple à présenter.
            </p>

            {r.actionsImmediates.length > 0 && (
              <div className="mt-9">
                <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#DC2626]">
                  Sous 48 heures
                </h3>
                {r.actionsImmediates.map((a) => (
                  <Fiche key={a.code} a={a} />
                ))}
                <div className="border-t border-ink/[0.07]" />
              </div>
            )}

            {r.actionsTrente.length > 0 && (
              <div className="mt-11">
                <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#B45309]">
                  Sous 30 jours
                </h3>
                {r.actionsTrente.map((a) => (
                  <Fiche key={a.code} a={a} />
                ))}
                <div className="border-t border-ink/[0.07]" />
              </div>
            )}
          </div>
          <Bandeau nom={p.etablissement} page={++page} total={total} />
        </section>
      )}

      {/* Détail */}
      <section className="break-before-page">
        <div className="px-7 pt-12 sm:px-14">
          <Cle>Détail</Cle>
          <h2 className="mt-2 text-[28px] font-semibold tracking-tight">
            Tous les points, thème par thème
          </h2>
          <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-gris">
            Les {r.totalPoints} points de la grille, dans l&apos;ordre de l&apos;audit. Un point non
            applicable ou non évalué ne compte pas dans la note.
          </p>

          {r.themes.map((t) => (
            <div key={t.theme} className="mt-8 break-inside-avoid">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[17px] font-semibold tracking-tight">{t.theme}</h3>
                <span className="text-[12px] text-gris">
                  {t.score === null ? 'non évalué' : `${Math.round(t.score)} / 100`}
                </span>
              </div>
              <div className="mt-2.5">
                {t.items.map((i) => (
                  <div
                    key={i.code}
                    className="flex items-start gap-3 border-t border-ink/[0.07] py-2.5 text-[15px]"
                  >
                    <span
                      className="mt-[8px] h-[6px] w-[6px] shrink-0 rounded-full"
                      style={{ backgroundColor: COULEUR_CONFORMITE[i.conformite] }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="leading-snug">{i.intitule}</div>
                      <div className="mt-0.5 text-[12.5px] leading-relaxed text-gris">
                        {i.code}
                        {i.commentaire ? ` · ${i.commentaire}` : ''}
                      </div>
                    </div>
                    <span className="w-12 shrink-0 text-right text-[11px] tabular-nums text-gris-light">
                      {i.photos.length ? `${i.photos.length} ph.` : ''}
                    </span>
                    <span className="hidden w-36 shrink-0 text-right text-[12px] text-gris sm:block">
                      {LIBELLE_CONFORMITE[i.conformite]}
                    </span>
                  </div>
                ))}
                <div className="border-t border-ink/[0.07]" />
              </div>
            </div>
          ))}
        </div>
        <Bandeau nom={p.etablissement} page={++page} total={total} />
      </section>

      {/* Portée */}
      <section className="break-before-page">
        <div className="px-7 pt-12 sm:px-14">
          <Cle>Portée du rapport</Cle>
          <h2 className="mt-2 text-[28px] font-semibold tracking-tight">
            Ce que dit, et ne dit pas, ce document
          </h2>

          <div className="mt-8 max-w-[62ch] space-y-7">
            <div>
              <h3 className="text-[16px] font-semibold">Ce qu&apos;il contient</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-gris">
                L&apos;état constaté le {p.date} sur {r.totalPoints} points de la grille{' '}
                {p.grilleVersion}, par {p.auditeur}. Les constats reposent sur ce qui était observable ce
                jour-là, dans les zones ouvertes à l&apos;auditeur.
              </p>
            </div>
            <div>
              <h3 className="text-[16px] font-semibold">Ce qu&apos;il n&apos;est pas</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-gris">
                {MENTION_LABEL_PRIVE} Ce rapport ne garantit pas le résultat d&apos;un contrôle officiel
                et ne remplace ni le plan de maîtrise sanitaire, ni les analyses, ni la formation
                obligatoire du personnel.
              </p>
            </div>
            <div>
              <h3 className="text-[16px] font-semibold">Conservation</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-gris">
                Gardez ce rapport avec vos relevés de températures et votre plan de nettoyage. Daté et
                photographié, il montre une démarche suivie.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Ligne cle="Établissement" valeur={[p.etablissement, p.ville].filter(Boolean).join(', ')} />
            {p.adresse ? <Ligne cle="Adresse" valeur={p.adresse} /> : null}
            <Ligne cle="Référence" valeur={p.reference} />
            <Ligne cle="Auditeur" valeur={p.auditeur} />
            <Ligne cle="Date" valeur={p.date} />
            <Ligne cle="Grille" valeur={p.grilleVersion} />
            <div className="border-t border-ink/[0.07]" />
          </div>
        </div>
        <Bandeau nom={p.etablissement} page={++page} total={total} />
      </section>
    </article>
  );
}
