/**
 * Le sommaire des dossiers de fond.
 *
 * Sans cette page, chaque dossier n'aurait qu'un lien entrant depuis ses
 * voisins, et Google laisserait la famille en « détectée, non indexée ».
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { DOSSIERS_OUVERTS } from '@/lib/vagues';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export const metadata: Metadata = {
  title: "Dossiers hygiène et HACCP en restauration",
  description:
    "Les pages de référence sur l'hygiène en restauration : plan de maîtrise sanitaire, chaîne du froid, traçabilité, nettoyage, nuisibles, allergènes. Ce que le texte impose, et ce qu'il n'impose pas.",
  alternates: { canonical: '/dossiers' },
};

export default function DossiersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Dossiers', url: `${siteUrl}/dossiers` },
        ])}
      />

      <section className="bg-gradient-to-b from-vert-50 to-white">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            / <span className="text-ink/70">Dossiers</span>
          </nav>
          <p className="eyebrow mt-6">{DOSSIERS_OUVERTS.length} dossiers</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Les dossiers de l&apos;hygiène en restauration
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-ink/80">
            Des pages de référence, écrites pour tenir seules. Chacune dit ce que le texte impose
            exactement, ce qu&apos;il n&apos;impose pas, et ce qu&apos;un agent regarde en
            pratique. Cette distinction est la partie que presque personne ne publie, et c&apos;est
            celle qui évite de dépenser pour une exigence qui n&apos;existe pas.
          </p>
        </div>
      </section>

      <section className="container-ah py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {DOSSIERS_OUVERTS.map((d) => (
            <article
              key={d.slug}
              className="rounded-xl border border-ink/10 bg-white p-6 transition hover:border-vert-300"
            >
              <h2 className="text-lg font-semibold text-ink">
                <Link href={`/dossiers/${d.slug}`} className="hover:text-vert-700">
                  {d.titre}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{d.description}</p>
              <p className="mt-3 text-sm text-gris">{d.sections.length} sections</p>
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
