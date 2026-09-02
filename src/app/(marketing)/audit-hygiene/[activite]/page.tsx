/**
 * La page d'un type d'établissement.
 *
 * Ce que cherche un exploitant, ce n'est pas « l'hygiène en restauration »,
 * c'est ce qui coince chez lui : la liaison froide chez un traiteur, les
 * allergènes en boulangerie, la glace dans un bar. Ces pages partent donc du
 * métier, et rattachent chaque risque au point de la grille qui le couvre.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ACTIVITES_PSEO } from '@/data/activites-pseo';
import { POINTS } from '@/lib/familles';
import { ACTIVITES_OUVERTES, activiteOuverte, COMMUNES_OUVERTES } from '@/lib/vagues';
import { poidsEnMots } from '@/lib/contenu-grille';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';
import { urlCommune } from '@/lib/communes';
import { JsonLd } from '@/components/site/JsonLd';
import { DevisRapide } from '@/components/marketing/DevisRapide';
import { breadcrumbSchema, faqSchema, localBusinessSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export function generateStaticParams() {
  return ACTIVITES_OUVERTES.map((a) => ({ activite: a.slug }));
}

function trouver(slug: string) {
  const a = ACTIVITES_PSEO.find((x) => x.slug === slug);
  return a && activiteOuverte(a.slug) ? a : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ activite: string }>;
}): Promise<Metadata> {
  const { activite } = await params;
  const a = trouver(activite);
  if (!a) return {};
  return {
    title: a.titreSeo,
    description: a.description,
    alternates: { canonical: `/audit-hygiene/${a.slug}` },
    openGraph: {
      title: a.titre,
      description: a.description,
      url: `${siteUrl}/audit-hygiene/${a.slug}`,
    },
  };
}

export default async function ActivitePage({
  params,
}: {
  params: Promise<{ activite: string }>;
}) {
  const { activite } = await params;
  const a = trouver(activite);
  if (!a) notFound();

  const url = `${siteUrl}/audit-hygiene/${a.slug}`;
  /* Un code de point inexistant casserait la carte : on ne rend que ceux que la
     grille connait vraiment. */
  const sensibles = a.pointsSensibles
    .map((p) => ({ ...p, point: POINTS.find((x) => x.code === p.code) }))
    .filter((p) => p.point);
  const villes = COMMUNES_OUVERTES.slice(0, 6);
  const autres = ACTIVITES_OUVERTES.filter((x) => x.slug !== a.slug);

  return (
    <>
      <JsonLd data={localBusinessSchema({ areaServed: 'Île-de-France, France', url })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: "Audit par type d'établissement", url: `${siteUrl}/audit-hygiene` },
          { name: a.nom, url },
        ])}
      />
      <JsonLd data={faqSchema(a.faq.map((f) => ({ q: f.question, a: f.reponse })))} />

      <section className="bg-gradient-to-b from-vert-50 to-white">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            /{' '}
            <Link href="/audit-hygiene" className="hover:text-vert-700">
              Par type d&apos;établissement
            </Link>{' '}
            / <span className="text-ink/70">{a.nom}</span>
          </nav>
          <p className="eyebrow mt-6">{a.nomPluriel}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {a.titre}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/85">
            {a.reponse}
          </p>
          <p className="mt-4 max-w-3xl text-ink/70">{a.ouverture}</p>
          <div className="mt-8">
            <Link href="/#rdv" className="btn-primary">
              Faire auditer mon {a.nom}
            </Link>
          </div>
        </div>
      </section>

      <DevisRapide
        contexte={`La visite est la même quel que soit l'établissement : un auditeur passe, contrôle les points de la grille, et vous remet le rapport. Ce qui change en ${a.nom}, c'est le temps passé sur les points ci-dessous.`}
      />

      {sensibles.length > 0 && (
        <section className="container-ah py-12">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Les points qui pèsent le plus dans ce type d&apos;établissement
          </h2>
          <p className="mt-3 max-w-3xl text-ink/70">
            Les {POINTS.length} points de la grille sont tous vérifiés. Ceux-ci demandent
            simplement plus de temps ici qu&apos;ailleurs.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {sensibles.map((p) => (
              <div key={p.code} className="rounded-xl border border-ink/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gris">
                  {p.point!.theme} · {poidsEnMots(p.point!.ponderation)}
                </p>
                <h3 className="mt-2 font-semibold text-ink">
                  <Link
                    href={`/points-de-controle/${p.point!.slug}`}
                    className="hover:text-vert-700"
                  >
                    {p.point!.intitule}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.pourquoi}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {a.sections.map((s) => (
        <section key={s.titre} className="container-ah py-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">{s.titre}</h2>
          {s.paragraphes.map((p) => (
            <p key={p.slice(0, 40)} className="mt-4 max-w-3xl leading-relaxed text-ink/70">
              {p}
            </p>
          ))}
        </section>
      ))}

      <section className="container-ah py-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          Questions fréquentes, {a.nomPluriel}
        </h2>
        <dl className="mt-6 max-w-3xl divide-y divide-ink/10">
          {a.faq.map((f) => (
            <div key={f.question} className="py-5">
              <dt className="font-semibold text-ink">{f.question}</dt>
              <dd className="mt-2 text-ink/70">{f.reponse}</dd>
            </div>
          ))}
        </dl>
      </section>

      {a.liens.length > 0 && (
        <section className="container-ah py-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Pour aller plus loin</h2>
          <ul className="mt-4 space-y-2">
            {a.liens.map((l) => (
              <li key={l}>
                <Link
                  href={l}
                  className="text-ink/80 underline decoration-ink/20 underline-offset-4 hover:text-vert-700"
                >
                  {l === '/contact' ? 'Nous écrire' : l.split('/').pop()?.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container-ah py-8">
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          Les autres types d&apos;établissement
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {autres.map((x) => (
            <li key={x.slug}>
              <Link
                href={`/audit-hygiene/${x.slug}`}
                className="inline-block rounded-full border border-ink/10 px-4 py-2 text-sm text-ink/80 hover:border-vert-700 hover:text-vert-700"
              >
                {x.nom}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-ink/70">
          Nous auditons les {a.nomPluriel} partout en Île-de-France, à{' '}
          {villes.map((v, i) => (
            <span key={v.slug}>
              {i > 0 && ', '}
              <Link
                href={urlCommune(v)}
                className="underline decoration-ink/20 underline-offset-4 hover:text-vert-700"
              >
                {v.nom}
              </Link>
            </span>
          ))}
          , et dans les huit départements de la région.
        </p>
      </section>

      <section className="container-ah pb-16">
        <p className="max-w-3xl text-sm text-gris">{MENTION_LABEL_PRIVE}</p>
      </section>
    </>
  );
}
