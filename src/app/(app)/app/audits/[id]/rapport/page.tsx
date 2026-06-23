import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCurrentDbUser } from '@/lib/auth';
import { getSignedUrl } from '@/lib/supabase';
import { GRILLE_RESTO360, NOTATION_RESTO } from '@/lib/grille-resto360';
import {
  calculerRapportResto360,
  detailPiliers,
  type ItemNote,
  type LigneRapport,
  type CritereDetail,
} from '@/lib/rapport-resto360';
import { genererRestitutionTemplate } from '@/lib/restitution-template';
import { RadarResto } from '@/components/app/RadarResto';
import { RestitutionView } from '@/components/app/RestitutionView';
import { PrintButton } from '@/components/app/PrintButton';
import { SendReportButton } from '@/components/app/SendReportButton';

export const dynamic = 'force-dynamic';

const ORANGE = '#F97316';
const INK = '#0C1B17';

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

function NoteBadge({ note }: { note: number | null }) {
  if (note === null) {
    return <span className="rounded px-1.5 py-0.5 text-[11px] font-semibold text-gris ring-1 ring-ink/10">n/e</span>;
  }
  return (
    <span
      className="inline-grid h-6 w-6 place-items-center rounded-md text-xs font-bold text-white"
      style={{ backgroundColor: couleurNote(note) }}
      title={labelNote(note)}
    >
      {note}
    </span>
  );
}

function Section({
  num,
  titre,
  children,
}: {
  num: string;
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-8 py-8 print:break-before-page sm:px-12">
      <div className="mb-5 flex items-center gap-3 border-b-2 pb-2" style={{ borderColor: ORANGE }}>
        <span
          className="grid h-8 w-8 place-items-center rounded-lg text-sm font-extrabold text-white"
          style={{ backgroundColor: ORANGE }}
        >
          {num}
        </span>
        <h2 className="text-xl font-bold tracking-tight" style={{ color: INK }}>
          {titre}
        </h2>
      </div>
      {children}
    </section>
  );
}

const DELAI: Record<string, string> = { Urgence: 'sous 7 jours', Important: 'sous 30 jours', Confort: 'sous 90 jours' };

export default async function RapportResto360Page({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDbUser();
  if (!user) redirect('/login');

  const { id } = await params;
  const { prisma } = await import('@/lib/prisma');
  const audit = await prisma.audit.findUnique({
    where: { id },
    include: { establishment: true, items: true },
  });
  if (!audit) notFound();
  if (audit.marque !== 'AUDITRESTO360') redirect(`/app/audits/${id}`);

  const items: ItemNote[] = audit.items.map((it) => ({
    code: it.code,
    theme: it.theme,
    groupe: it.groupe,
    intitule: it.intitule,
    note: it.note,
    commentaire: it.commentaire,
  }));
  const r = calculerRapportResto360(items);
  const restitution = genererRestitutionTemplate(audit.establishment.nom, items);
  const details = detailPiliers(items);

  const photos = (
    await Promise.all(
      audit.items.flatMap((it) =>
        it.photoUrls.map(async (path) => ({ intitule: it.intitule, url: await getSignedUrl(path, 60 * 60 * 8) }))
      )
    )
  ).filter((p): p is { intitule: string; url: string } => Boolean(p.url));

  const dateStr = audit.dateAudit
    ? new Date(audit.dateAudit).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const ref = `R360-${audit.id.slice(-6).toUpperCase()}`;
  const planRows = [
    ...r.plan.urgence.map((l) => ({ p: 'Urgence', l })),
    ...r.plan.important.map((l) => ({ p: 'Important', l })),
    ...r.plan.confort.map((l) => ({ p: 'Confort', l })),
  ];

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto bg-ink/10 print:static print:overflow-visible print:bg-white">
      {/* Barre d'actions (écran seulement) */}
      <div className="sticky top-0 z-10 border-b border-ink/10 bg-white px-4 py-2.5 print:hidden">
        <div className="mx-auto flex max-w-[820px] items-center justify-between">
          <Link href="/app/audits" className="text-sm text-gris hover:text-ink">
            ← Tous les audits
          </Link>
          <div className="flex gap-2">
            <Link href={`/app/audits/${id}`} className="btn-ghost text-sm">
              Modifier
            </Link>
            <SendReportButton
              auditId={id}
              className="rounded-full border border-[#F97316] px-5 py-2.5 text-sm font-semibold text-[#F97316] transition-all hover:bg-orange-50 active:scale-[0.98] disabled:opacity-60"
            />
            <PrintButton className="rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]" />
          </div>
        </div>
      </div>

      {/* Document */}
      <div className="mx-auto my-6 max-w-[820px] bg-white shadow-xl print:my-0 print:max-w-none print:shadow-none">
        {/* COUVERTURE */}
        <div
          className="flex min-h-[60vh] flex-col justify-between px-8 py-12 text-white sm:px-12 print:min-h-screen"
          style={{ background: `linear-gradient(160deg, ${INK} 0%, #16322a 100%)` }}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-lg bg-white px-3 py-2">
              <Image src="/logo-auditresto360.png" alt="auditresto360" width={170} height={44} className="h-8 w-auto" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">Confidentiel</span>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: ORANGE }}>
              Rapport d&apos;audit 360
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight">{audit.establishment.nom}</h1>
            <p className="mt-2 text-white/70">
              {[audit.establishment.adresse, audit.establishment.ville].filter(Boolean).join(', ')}
            </p>

            <div className="mt-8 flex items-center gap-6">
              <div className="grid h-28 w-28 place-items-center rounded-2xl" style={{ backgroundColor: ORANGE }}>
                <span className="text-4xl font-extrabold leading-none">{r.scoreGlobal ?? '--'}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wide opacity-90">/ 100</span>
              </div>
              <div>
                <div className="text-2xl" style={{ color: ORANGE }}>
                  {'★'.repeat(r.etoiles)}
                  <span className="text-white/20">{'★'.repeat(5 - r.etoiles)}</span>
                </div>
                <p className="mt-1 text-sm text-white/80">
                  {r.scoreGlobal !== null ? maturite(r.scoreGlobal) : 'Audit en cours'}
                </p>
                <p className="text-xs text-white/50">{r.nbCriteresNotes}/{r.nbCriteresTotal} critères évalués</p>
              </div>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-2 border-t border-white/15 pt-5 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-white/40">Date</dt>
              <dd className="font-medium">{dateStr || 'n/d'}</dd>
            </div>
            <div>
              <dt className="text-white/40">Référence</dt>
              <dd className="font-medium">{ref}</dd>
            </div>
            <div>
              <dt className="text-white/40">Auditeur</dt>
              <dd className="font-medium">auditresto360</dd>
            </div>
            <div>
              <dt className="text-white/40">Type</dt>
              <dd className="font-medium">{audit.establishment.type}</dd>
            </div>
          </dl>
        </div>

        {/* CAS CRITIQUES (points sanitaires notés 1 ou 2) */}
        {r.casCritiques.length > 0 && (
          <div className="border-b border-red-100 bg-red-50/60 px-8 py-6 sm:px-12">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-red-600 text-sm font-extrabold text-white">
                !
              </span>
              <h2 className="text-lg font-bold text-red-700">
                Cas critiques à traiter en priorité ({r.casCritiques.length})
              </h2>
            </div>
            <p className="mt-1 text-xs text-red-700/80">
              Points sanitaires ou réglementaires notés 1 ou 2. Ils pèsent doublement dans la note et
              abaissent le score global.
            </p>
            <ul className="mt-3 space-y-1.5">
              {r.casCritiques.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink/85">
                  <NoteBadge note={c.note} />
                  <span>
                    <span className="font-semibold">{c.intitule}</span>
                    <span className="text-gris"> · {c.pilier}</span>
                    {c.commentaire ? ` : ${c.commentaire}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SOMMAIRE */}
        <div className="px-8 py-8 sm:px-12">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gris">Sommaire</h2>
          <ol className="mt-4 space-y-2 text-sm">
            {[
              'Contexte et méthodologie',
              'Synthèse exécutive',
              'Résultats détaillés par pilier',
              'Synthèse et recommandations',
              "Plan d'action priorisé",
              'Échanges avec le dirigeant',
              'Annexe : photos',
            ].map((t, i) => (
              <li key={t} className="flex items-baseline gap-3">
                <span className="font-bold" style={{ color: ORANGE }}>
                  {i + 1 <= 5 ? i + 1 : i === 5 ? '6' : 'A'}
                </span>
                <span className="text-ink/80">{t}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* 1. CONTEXTE & MÉTHODOLOGIE */}
        <Section num="1" titre="Contexte et méthodologie">
          <p className="text-sm leading-relaxed text-ink/80">
            Cet audit 360 passe en revue l&apos;établissement sur dix piliers couvrant l&apos;exploitation,
            l&apos;hygiène, l&apos;organisation, la gestion et l&apos;expérience client. Chaque critère est
            évalué sur place par l&apos;auditeur selon une échelle de 1 à 5. Le score de chaque pilier est
            ramené sur 100. Les points sanitaires et réglementaires (températures, traçabilité, PMS,
            affichages, stockage du cru...) comptent double et sont notés plus sévèrement : un point
            critique noté 1 ou 2 abaisse le score global, et un point critique noté 1 plafonne ce score.
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
            auditresto360 est un label privé indépendant. Ce rapport est un outil de conseil et de
            progrès. Il ne constitue ni une certification officielle, ni un agrément d&apos;État, ni un
            contrôle des services vétérinaires, et ne garantit pas le résultat d&apos;un contrôle officiel.
          </p>
        </Section>

        {/* 2. SYNTHÈSE EXÉCUTIVE */}
        <Section num="2" titre="Synthèse exécutive">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <RadarResto points={r.radar} />
            <ul className="space-y-2">
              {r.radar.map((p) => (
                <li key={p.pilier} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-sm text-ink/80">{p.radar}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink/5">
                    <span className="block h-2 rounded-full" style={{ width: `${p.score}%`, backgroundColor: ORANGE }} />
                  </span>
                  <span className="w-10 text-right text-sm font-bold text-ink">{p.score}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-ink/80">{restitution.synthese}</p>
        </Section>

        {/* 3. RÉSULTATS PAR PILIER */}
        <Section num="3" titre="Résultats détaillés par pilier">
          <div className="space-y-7">
            {details.map((d) => (
              <article key={d.code} className="break-inside-avoid">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold text-ink">
                    {d.numero}. {d.nom}
                  </h3>
                  <span className="text-sm font-bold" style={{ color: ORANGE }}>
                    {d.score ?? '--'}/100
                  </span>
                </div>
                <span className="mt-1 block h-1.5 w-full overflow-hidden rounded-full bg-ink/5">
                  <span className="block h-1.5 rounded-full" style={{ width: `${d.score ?? 0}%`, backgroundColor: ORANGE }} />
                </span>

                {(d.risques.length > 0 || d.forts.length > 0) && (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {d.risques.length > 0 && (
                      <div className="rounded-xl bg-red-50 p-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-red-700">Risques</p>
                        <ul className="mt-1 space-y-1 text-xs text-ink/80">
                          {d.risques.map((c, i) => (
                            <li key={i}>{c.intitule}{c.commentaire ? ` : ${c.commentaire}` : ''}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {d.forts.length > 0 && (
                      <div className="rounded-xl bg-vert-50 p-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-vert-700">Points forts</p>
                        <ul className="mt-1 space-y-1 text-xs text-ink/80">
                          {d.forts.slice(0, 6).map((c, i) => (
                            <li key={i}>{c.intitule}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-3 space-y-3">
                  {d.groupes.map((g) => (
                    <div key={g.nom}>
                      <p className="text-xs font-bold uppercase tracking-wide text-ink/60">{g.nom}</p>
                      <ul className="mt-1.5 divide-y divide-ink/5">
                        {g.criteres.map((c: CritereDetail, i) => (
                          <li key={i} className="flex items-start gap-3 py-1.5">
                            <NoteBadge note={c.note} />
                            <div className="min-w-0">
                              <p className="text-sm text-ink">{c.intitule}</p>
                              {c.commentaire && <p className="text-xs text-gris">{c.commentaire}</p>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* 4. SYNTHÈSE & RECOMMANDATIONS */}
        <Section num="4" titre="Synthèse et recommandations">
          <RestitutionView data={restitution} bare />
        </Section>

        {/* 5. PLAN D'ACTION */}
        <Section num="5" titre="Plan d'action priorisé">
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

        {/* 6. DIRIGEANT */}
        {r.dirigeant.some((d) => d.reponse) && (
          <Section num="6" titre="Échanges avec le dirigeant">
            <dl className="space-y-4">
              {r.dirigeant
                .filter((d) => d.reponse)
                .map((d, i) => (
                  <div key={i}>
                    <dt className="text-sm font-semibold text-ink">{d.question}</dt>
                    <dd className="mt-1 text-sm text-ink/75">{d.reponse}</dd>
                  </div>
                ))}
            </dl>
          </Section>
        )}

        {/* ANNEXE PHOTOS */}
        {photos.length > 0 && (
          <Section num="A" titre="Annexe : photos">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {photos.map((p, i) => (
                <figure key={i} className="overflow-hidden rounded-xl border border-ink/8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={p.intitule} className="h-32 w-full object-cover" />
                  <figcaption className="px-2 py-1.5 text-[11px] text-gris">{p.intitule}</figcaption>
                </figure>
              ))}
            </div>
          </Section>
        )}

        {/* PIED */}
        <footer className="border-t border-ink/10 px-8 py-6 text-center text-[11px] text-gris sm:px-12">
          <p>
            {audit.establishment.nom} · Rapport {ref} · {dateStr}
          </p>
          <p className="mt-1">
            auditresto360, label privé indépendant. Document confidentiel destiné à l&apos;établissement audité.
          </p>
        </footer>
      </div>
    </div>
  );
}
