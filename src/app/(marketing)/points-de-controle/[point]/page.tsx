/**
 * La page d'un point de contrôle.
 *
 * Elle existe pour une raison précise : sur ces sujets, le web francophone
 * recopie des check-lists sans jamais citer le texte, ni dire où le texte
 * s'arrête. Cette page fait les deux.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { POINTS, pointParSlug, THEMES } from '@/lib/familles';
import { contenuPoint, libelleGravite, poidsEnMots } from '@/lib/contenu-grille';
import { pointOuvert, POINTS_OUVERTS, COMMUNES_OUVERTES } from '@/lib/vagues';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';
import { urlCommune } from '@/lib/communes';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export function generateStaticParams() {
  return POINTS_OUVERTS.map((p) => ({ point: p.slug }));
}

function trouver(slug: string) {
  const p = pointParSlug(slug);
  return p && pointOuvert(p.slug) ? p : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ point: string }>;
}): Promise<Metadata> {
  const { point } = await params;
  const p = trouver(point);
  if (!p) return {};
  return {
    title: `${p.intitule} : ce que vérifie un contrôle`,
    description: `${p.explication} Le texte applicable, les écarts les plus fréquents et le correctif attendu, dans le thème ${p.theme}.`,
    alternates: { canonical: `/points-de-controle/${p.slug}` },
    openGraph: {
      title: p.intitule,
      description: p.pedagogie,
      url: `${siteUrl}/points-de-controle/${p.slug}`,
    },
  };
}

export default async function PointPage({ params }: { params: Promise<{ point: string }> }) {
  const { point } = await params;
  const p = trouver(point);
  if (!p) notFound();

  const contenu = contenuPoint(p);
  const theme = THEMES.find((t) => t.slug === p.themeSlug);
  const url = `${siteUrl}/points-de-controle/${p.slug}`;
  /* Quelques communes ouvertes, pour que le maillage descende du sujet vers le
     local et pas seulement l'inverse. */
  const villes = COMMUNES_OUVERTES.slice(0, 6);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Points de contrôle', url: `${siteUrl}/points-de-controle` },
          { name: p.intitule, url },
        ])}
      />
      <JsonLd
        data={faqSchema(
          contenu.blocs.slice(0, 4).map((b) => ({ q: b.titre, a: b.paragraphes.join(' ') }))
        )}
      />

      <section className="bg-gradient-to-b from-vert-50 to-white">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            /{' '}
            <Link href="/methode" className="hover:text-vert-700">
              La méthode
            </Link>{' '}
            /{' '}
            {theme && (
              <>
                <Link href={`/themes/${theme.slug}`} className="hover:text-vert-700">
                  {theme.theme}
                </Link>{' '}
                /{' '}
              </>
            )}
            <span className="text-ink/70">{p.intitule}</span>
          </nav>

          <p className="eyebrow mt-6">
            {p.theme} · {poidsEnMots(p.ponderation)}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {p.intitule}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-ink/80">{contenu.ouverture}</p>
          <div className="mt-8">
            <Link href="/#rdv" className="btn-primary">
              Faire vérifier ce point chez moi
            </Link>
          </div>
        </div>
      </section>

      {contenu.blocs.map((b) => (
        <section key={b.titre} className="container-ah py-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">{b.titre}</h2>
          {b.paragraphes.map((t) => (
            <p key={t.slice(0, 40)} className="mt-4 max-w-3xl text-ink/70">
              {t}
            </p>
          ))}
        </section>
      ))}

      <section className="container-ah py-8">
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          Les constats possibles, et ce qu&apos;ils entraînent
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {contenu.constats.map((cs) => {
            const g = libelleGravite(cs.conformite);
            return (
              <div key={cs.label} className="rounded-xl border border-ink/10 bg-white p-6">
                <p
                  className={
                    cs.conformite === 'NC_MAJEURE'
                      ? 'text-sm font-semibold uppercase tracking-wide text-red-600'
                      : cs.conformite === 'NC_MINEURE'
                        ? 'text-sm font-semibold uppercase tracking-wide text-amber-600'
                        : 'text-sm font-semibold uppercase tracking-wide text-vert-700'
                  }
                >
                  {g.mot}
                </p>
                <p className="mt-2 font-semibold text-ink">{cs.label}</p>
                {cs.pourquoi && <p className="mt-2 text-sm text-ink/70">{cs.pourquoi}</p>}
                {cs.correctif && (
                  <p className="mt-3 border-t border-ink/10 pt-3 text-sm text-ink/70">
                    <span className="font-medium text-ink">Correctif : </span>
                    {cs.correctif}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {contenu.voisins.length > 0 && theme && (
        <section className="container-ah py-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Les autres points du thème {theme.theme}
          </h2>
          <ul className="mt-4 space-y-2">
            {contenu.voisins.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/points-de-controle/${v.slug}`}
                  className="text-ink/80 underline decoration-ink/20 underline-offset-4 hover:text-vert-700"
                >
                  {v.intitule}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container-ah py-8">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Ailleurs dans la grille</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {contenu.ailleurs.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/points-de-controle/${a.slug}`}
                className="inline-block rounded-full border border-ink/10 px-4 py-2 text-sm text-ink/80 hover:border-vert-700 hover:text-vert-700"
              >
                {a.intitule}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-ink/70">
          Ce point est vérifié lors de chaque audit, dans toutes les communes que nous couvrons :{' '}
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
          , et partout ailleurs en Île-de-France.
        </p>
      </section>

      <section className="container-ah pb-16">
        <p className="max-w-3xl text-sm text-gris">{MENTION_LABEL_PRIVE}</p>
      </section>
    </>
  );
}
