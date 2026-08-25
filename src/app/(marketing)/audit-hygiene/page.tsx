/**
 * Le sommaire des pages par type d'établissement.
 *
 * Elle sert de hub à la famille et de porte d'entrée pour qui cherche
 * « audit hygiène boulangerie » plutôt que « audit hygiène ».
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ACTIVITES_OUVERTES } from '@/lib/vagues';
import { POINTS } from '@/lib/familles';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export const metadata: Metadata = {
  title: "Audit hygiène par type d'établissement",
  description:
    "Restaurant, boulangerie, boucherie, traiteur, bar, dark kitchen, food truck : les points d'hygiène qui pèsent le plus dans votre métier, et les textes qui s'y appliquent vraiment.",
  alternates: { canonical: '/audit-hygiene' },
};

export default function ActivitesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: "Audit par type d'établissement", url: `${siteUrl}/audit-hygiene` },
        ])}
      />

      <section className="bg-gradient-to-b from-vert-50 to-white">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            / <span className="text-ink/70">Par type d&apos;établissement</span>
          </nav>
          <p className="eyebrow mt-6">{ACTIVITES_OUVERTES.length} métiers</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            L&apos;audit d&apos;hygiène, métier par métier
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-ink/80">
            Les {POINTS.length} points de la grille sont vérifiés partout. Ce qui change, c&apos;est
            le temps passé sur chacun : la liaison froide chez un traiteur, les allergènes en
            boulangerie, la glace dans un bar, l&apos;eau dans un food truck. Chaque page part du
            métier et rattache ses risques réels aux points qui les couvrent.
          </p>
        </div>
      </section>

      <section className="container-ah py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ACTIVITES_OUVERTES.map((a) => (
            <article
              key={a.slug}
              className="rounded-xl border border-ink/10 bg-white p-6 transition hover:border-vert-300"
            >
              <h2 className="text-lg font-semibold text-ink">
                <Link href={`/audit-hygiene/${a.slug}`} className="hover:text-vert-700">
                  {a.titre}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{a.description}</p>
              <p className="mt-3 text-sm text-gris">
                {a.pointsSensibles.length} points sensibles identifiés
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-ah pb-16">
        <p className="max-w-3xl text-sm text-gris">{MENTION_LABEL_PRIVE}</p>
      </section>
    </>
  );
}
