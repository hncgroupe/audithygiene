/**
 * La page d'un dossier de fond.
 *
 * C'est la page de référence sur un sujet : celle qui doit tenir seule, sans
 * que le lecteur ait besoin d'ouvrir autre chose, et celle vers laquelle
 * pointent les questions et les pages de commune.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DOSSIERS, dossierParSlug } from '@/data/dossiers';
import { DOSSIERS_OUVERTS, dossierOuvert, COMMUNES_OUVERTES } from '@/lib/vagues';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';
import { combinaison, graine, urlCommune } from '@/lib/communes';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export function generateStaticParams() {
  return DOSSIERS_OUVERTS.map((d) => ({ dossier: d.slug }));
}

function trouver(slug: string) {
  const d = dossierParSlug(slug);
  return d && dossierOuvert(d.slug) ? d : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dossier: string }>;
}): Promise<Metadata> {
  const { dossier } = await params;
  const d = trouver(dossier);
  if (!d) return {};
  return {
    title: d.titreSeo,
    description: d.description,
    alternates: { canonical: `/dossiers/${d.slug}` },
    openGraph: {
      title: d.titre,
      description: d.description,
      url: `${siteUrl}/dossiers/${d.slug}`,
      type: 'article',
    },
  };
}

export default async function DossierPage({
  params,
}: {
  params: Promise<{ dossier: string }>;
}) {
  const { dossier } = await params;
  const d = trouver(dossier);
  if (!d) notFound();

  const url = `${siteUrl}/dossiers/${d.slug}`;
  const autres = combinaison(
    DOSSIERS_OUVERTS.filter((x) => x.slug !== d.slug),
    6,
    graine(d.slug, 'autres')
  );
  const villes = COMMUNES_OUVERTES.slice(0, 5);
  /* Le corpus cite des chemins reels, mais une page hors vague repondrait 404 :
     on ne garde que ce qui existe aujourd'hui. */
  const liens = (d.liens || []).filter(
    (l) => !l.startsWith('/dossiers/') || DOSSIERS_OUVERTS.some((x) => `/dossiers/${x.slug}` === l)
  );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Dossiers', url: `${siteUrl}/dossiers` },
          { name: d.titre, url },
        ])}
      />
      <JsonLd data={faqSchema(d.faq.map((f) => ({ q: f.question, a: f.reponse })))} />

      <section className="bg-gradient-to-b from-vert-50 to-white">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            /{' '}
            <Link href="/dossiers" className="hover:text-vert-700">
              Dossiers
            </Link>{' '}
            / <span className="text-ink/70">{d.titre}</span>
          </nav>
          <p className="eyebrow mt-6">Dossier de fond</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {d.titre}
          </h1>
          {/* La reponse directe, avant tout developpement. */}
          <p className="mt-6 max-w-3xl border-l-4 border-vert-500 pl-5 text-lg leading-relaxed text-ink/85">
            {d.reponse}
          </p>
          <p className="mt-4 max-w-3xl text-ink/70">{d.ouverture}</p>
        </div>
      </section>

      {/* Le sommaire : sur une page de trois mille mots, il fait la difference
          entre une lecture et un rebond. */}
      <section className="container-ah py-10">
        <nav aria-label="Sommaire" className="max-w-3xl rounded-2xl border border-ink/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-gris">Au sommaire</p>
          <ol className="mt-3 space-y-1.5 text-ink/80">
            {d.sections.map((s, i) => (
              <li key={s.titre}>
                <a
                  href={`#section-${i}`}
                  className="underline decoration-ink/20 underline-offset-4 hover:text-vert-700"
                >
                  {s.titre}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {d.sections.map((s, i) => (
        <section key={s.titre} id={`section-${i}`} className="container-ah scroll-mt-24 py-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">{s.titre}</h2>
          {s.paragraphes.map((p) => (
            <p key={p.slice(0, 40)} className="mt-4 max-w-3xl leading-relaxed text-ink/70">
              {p}
            </p>
          ))}
          {s.sous && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {s.sous.map((x) => (
                <div key={x.titre} className="rounded-xl border border-ink/10 bg-white p-6">
                  <h3 className="font-semibold text-ink">{x.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{x.texte}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      <section className="container-ah py-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Questions fréquentes</h2>
        <dl className="mt-6 max-w-3xl divide-y divide-ink/10">
          {d.faq.map((f) => (
            <div key={f.question} className="py-5">
              <dt className="font-semibold text-ink">{f.question}</dt>
              <dd className="mt-2 text-ink/70">{f.reponse}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-ah py-8">
        <div className="rounded-2xl bg-vert-50 p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Faire le point sur votre établissement
          </h2>
          <p className="mt-3 max-w-3xl text-ink/70">
            Un auditeur se déplace, contrôle les 27 points de la grille en toute discrétion, et
            vous remet un rapport complet avec son plan d&apos;action. Chaque écart y porte le
            correctif attendu et la preuve à constituer, pour que vous puissiez le traiter
            vous-même.
          </p>
          <Link href="/#rdv" className="btn-primary mt-6">
            Demander un audit
          </Link>
        </div>
      </section>

      {liens.length > 0 && (
        <section className="container-ah py-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Pour aller plus loin</h2>
          <ul className="mt-4 space-y-2">
            {liens.map((l) => (
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
        <h2 className="text-2xl font-bold tracking-tight text-ink">Les autres dossiers</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {autres.map((x) => (
            <li key={x.slug}>
              <Link
                href={`/dossiers/${x.slug}`}
                className="inline-block rounded-full border border-ink/10 px-4 py-2 text-sm text-ink/80 hover:border-vert-700 hover:text-vert-700"
              >
                {x.titre}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-ink/70">
          Nous auditons les établissements partout en Île-de-France, à{' '}
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
