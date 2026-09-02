/**
 * La page d'un thème de la grille.
 *
 * Elle sert de palier entre la méthode et les points de contrôle : c'est elle
 * qui donne à chaque point son lien entrant, et au lecteur une vue d'ensemble
 * avant le détail.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { POINTS, THEMES, themeParSlug } from '@/lib/familles';
import { contenuTheme, poidsEnMots } from '@/lib/contenu-grille';
import { themeOuvert, THEMES_OUVERTS, COMMUNES_OUVERTES } from '@/lib/vagues';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';
import { urlCommune } from '@/lib/communes';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { ROBOTS_HORS_INDEX } from '@/lib/indexation';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export function generateStaticParams() {
  return THEMES_OUVERTS.map((t) => ({ theme: t.slug }));
}

function trouver(slug: string) {
  const t = themeParSlug(slug);
  return t && themeOuvert(t.slug) ? t : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ theme: string }>;
}): Promise<Metadata> {
  const { theme } = await params;
  const t = trouver(theme);
  if (!t) return {};
  return {
    title: `${t.theme} : les points vérifiés`.slice(0, 60),
    description: `Les ${t.items.length} points de contrôle du thème ${t.theme} : ce que l'auditeur vérifie, le texte applicable, les écarts fréquents et le correctif attendu.`,
    alternates: { canonical: `/themes/${t.slug}` },
    /* Meme raisonnement que les points de controle : un intitule de grille
       n'est pas une requete. Voir src/lib/indexation.ts. */
    robots: ROBOTS_HORS_INDEX,
    openGraph: {
      title: `${t.theme} en audit d'hygiène`,
      description: `Les ${t.items.length} points vérifiés, texte réglementaire à l'appui.`,
      url: `${siteUrl}/themes/${t.slug}`,
    },
  };
}

export default async function ThemePage({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  const t = trouver(theme);
  if (!t) notFound();

  const contenu = contenuTheme(t);
  const url = `${siteUrl}/themes/${t.slug}`;
  const villes = COMMUNES_OUVERTES.slice(0, 6);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Thèmes', url: `${siteUrl}/themes` },
          { name: t.theme, url },
        ])}
      />
      <JsonLd
        data={faqSchema(contenu.blocs.map((b) => ({ q: b.titre, a: b.paragraphes.join(' ') })))}
      />

      <section className="bg-gradient-to-b from-vert-50 to-white">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            /{' '}
            <Link href="/themes" className="hover:text-vert-700">
              Thèmes
            </Link>{' '}
            / <span className="text-ink/70">{t.theme}</span>
          </nav>
          <p className="eyebrow mt-6">
            {t.items.length} point{t.items.length > 1 ? 's' : ''} sur {POINTS.length}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t.theme} : ce qui est vérifié pendant l&apos;audit
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-ink/80">{contenu.reponse}</p>
          <div className="mt-8">
            <Link href="/#rdv" className="btn-primary">
              Faire auditer mon établissement
            </Link>
          </div>
        </div>
      </section>

      <section className="container-ah py-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          Les points de contrôle de ce thème
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {contenu.items.map((i) => {
            const p = POINTS.find((x) => x.code === i.code);
            return (
              <div key={i.code} className="rounded-xl border border-ink/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gris">
                  {poidsEnMots(i.ponderation)}
                </p>
                <h3 className="mt-2 font-semibold text-ink">
                  {p ? (
                    <Link href={`/points-de-controle/${p.slug}`} className="hover:text-vert-700">
                      {i.intitule}
                    </Link>
                  ) : (
                    i.intitule
                  )}
                </h3>
                <p className="mt-2 text-sm text-ink/70">{i.explication}</p>
                <p className="mt-3 text-sm italic text-ink/60">{i.pedagogie}</p>
              </div>
            );
          })}
        </div>
      </section>

      {contenu.blocs.map((b) => (
        <section key={b.titre} className="container-ah py-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">{b.titre}</h2>
          {b.paragraphes.map((x) => (
            <p key={x.slice(0, 40)} className="mt-4 max-w-3xl text-ink/70">
              {x}
            </p>
          ))}
        </section>
      ))}

      <section className="container-ah py-8">
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          Les autres thèmes de la grille
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {contenu.autres.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/themes/${a.slug}`}
                className="inline-block rounded-full border border-ink/10 px-4 py-2 text-sm text-ink/80 hover:border-vert-700 hover:text-vert-700"
              >
                {a.theme}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-ink/70">
          Ce thème est vérifié dans chaque audit, partout en Île-de-France :{' '}
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
          , et dans les autres communes des huit départements.
        </p>
      </section>

      <section className="container-ah pb-16">
        <p className="max-w-3xl text-sm text-gris">{MENTION_LABEL_PRIVE}</p>
      </section>
    </>
  );
}
