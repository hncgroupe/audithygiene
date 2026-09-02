/**
 * Le sommaire des themes de la grille.
 *
 * Il manquait. Dix-sept pages vivaient sous /themes/ et l'adresse /themes
 * repondait 404 : aucune page ne les listait, et les liens qui les citaient
 * partaient des pages de points de controle, elles-memes enfouies. Un sommaire
 * absent, c'est une famille entiere que rien ne rassemble, et Google ne
 * rassemble pas a notre place.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { NB_AFFICHAGE, NB_HYGIENE, VOLETS, type Volet } from '@/lib/familles';
import { THEMES_OUVERTS, POINTS_OUVERTS } from '@/lib/vagues';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export const metadata: Metadata = {
  title: `Les ${THEMES_OUVERTS.length} thèmes de la grille d'audit hygiène`,
  description: `Les ${THEMES_OUVERTS.length} thèmes vérifiés lors d'un audit hygiène : chaîne du froid, traçabilité, nettoyage, nuisibles, allergènes, affichages. Le texte applicable pour chacun.`,
  alternates: { canonical: '/themes' },
};

export default function ThemesPage() {
  const parVolet = (v: Volet) => THEMES_OUVERTS.filter((t) => t.volet === v);
  const nbPoints = (slug: string) => POINTS_OUVERTS.filter((p) => p.themeSlug === slug).length;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Thèmes', url: `${siteUrl}/themes` },
        ])}
      />

      <section className="bg-gradient-to-b from-vert-50 to-white">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            / <span className="text-ink/70">Thèmes</span>
          </nav>
          <p className="eyebrow mt-6">
            {THEMES_OUVERTS.length} thèmes · {POINTS_OUVERTS.length} points · 2 volets
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Les thèmes vérifiés pendant un audit d&apos;hygiène
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-ink/80">
            Un audit ne se promène pas dans la cuisine au hasard. Il suit une grille, et cette
            grille se lit par thèmes. Chaque thème regroupe les points qui se contrôlent ensemble,
            parce qu&apos;ils partagent le même texte ou le même geste de travail.
          </p>
          <p className="mt-4 max-w-3xl text-ink/70">
            Deux volets, parce que deux administrations passent indépendamment l&apos;une de
            l&apos;autre. {NB_HYGIENE} points pour l&apos;hygiène des denrées et des locaux, que
            contrôlent {VOLETS.hygiene.service}. {NB_AFFICHAGE} points pour l&apos;information
            donnée au consommateur, que contrôle {VOLETS.affichage.service}. Une cuisine
            irréprochable peut être reprise sur sa carte.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#rdv" className="btn-primary">
              Faire auditer mon établissement
            </Link>
            <Link href="/points-de-controle" className="btn-ghost">
              Voir le détail des {POINTS_OUVERTS.length} points
            </Link>
          </div>
        </div>
      </section>

      {(['hygiene', 'affichage'] as Volet[]).map((v) => (
        <section key={v} className="container-ah py-10">
          <h2 className="text-2xl font-bold tracking-tight text-ink">{VOLETS[v].nom}</h2>
          <p className="mt-2 max-w-3xl text-ink/70">
            Contrôlé par {VOLETS[v].service}.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {parVolet(v).map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/themes/${t.slug}`}
                  className="block h-full rounded-2xl border border-ink/10 p-5 transition hover:border-vert-700"
                >
                  <span className="font-semibold text-ink">{t.theme}</span>
                  <span className="mt-1 block text-sm text-gris">
                    {nbPoints(t.slug)} point{nbPoints(t.slug) > 1 ? 's' : ''} de contrôle
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="container-ah pb-16">
        <p className="max-w-3xl text-sm text-gris">{MENTION_LABEL_PRIVE}</p>
      </section>
    </>
  );
}
