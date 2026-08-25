/**
 * Le sommaire de la grille : tous les thèmes, tous les points.
 *
 * C'est la page qui distribue le maillage vers les deux familles, et celle que
 * l'on envoie à un exploitant qui demande « vous regardez quoi, exactement ? ».
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { NB_AFFICHAGE, NB_HYGIENE, POINTS, VOLETS } from '@/lib/familles';
import { THEMES_OUVERTS, POINTS_OUVERTS } from '@/lib/vagues';
import { poidsEnMots } from '@/lib/contenu-grille';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export const metadata: Metadata = {
  title: `La grille d'audit : les ${POINTS.length} points de contrôle`,
  description: `Le détail complet de notre grille d'audit hygiène : ${POINTS.length} points de contrôle répartis en thèmes, chacun avec le texte réglementaire applicable et le correctif attendu.`,
  alternates: { canonical: '/points-de-controle' },
};

export default function GrillePage() {
  const ouverts = new Set(POINTS_OUVERTS.map((p) => p.slug));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Points de contrôle', url: `${siteUrl}/points-de-controle` },
        ])}
      />

      <section className="bg-gradient-to-b from-vert-50 to-white">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            / <span className="text-ink/70">Points de contrôle</span>
          </nav>
          <p className="eyebrow mt-6">
            {POINTS.length} points · {THEMES_OUVERTS.length} thèmes · 2 volets
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            La grille d&apos;audit, point par point
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-ink/80">
            Voici exactement ce qui est vérifié lors d&apos;une visite. Chaque point renvoie à sa
            page : ce que l&apos;auditeur regarde, le texte réglementaire qui le fonde, ce que ce
            texte n&apos;impose pas, les écarts les plus fréquents et le correctif attendu.
          </p>
          <p className="mt-4 max-w-3xl text-ink/70">
            Elle se lit en deux volets, parce qu&apos;un établissement relève de deux
            administrations. {NB_HYGIENE} points pour l&apos;hygiène des denrées et des locaux, que
            contrôlent {VOLETS.hygiene.service}. {NB_AFFICHAGE} points pour l&apos;information
            donnée au consommateur, que contrôle {VOLETS.affichage.service}. Les deux services
            passent indépendamment l&apos;un de l&apos;autre, et une cuisine irréprochable ne
            protège de rien sur une carte incomplète.
          </p>
          <p className="mt-4 max-w-3xl text-ink/70">
            Nous publions cette grille en entier parce qu&apos;un audit ne doit rien avoir de
            mystérieux. Un exploitant qui sait ce qui va être regardé travaille mieux, et la visite
            sert alors à corriger plutôt qu&apos;à découvrir.
          </p>
          <div className="mt-8">
            <Link href="/#rdv" className="btn-primary">
              Faire auditer mon établissement
            </Link>
          </div>
        </div>
      </section>

      {THEMES_OUVERTS.map((t) => (
        <section key={t.slug} className="container-ah py-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-gris">
            {VOLETS[t.volet].nom}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink">
            <Link href={`/themes/${t.slug}`} className="hover:text-vert-700">
              {t.theme}
            </Link>
          </h2>
          <ul className="mt-4 space-y-3">
            {t.items.map((i) => {
              const p = POINTS.find((x) => x.code === i.code);
              const lisible = p && ouverts.has(p.slug);
              return (
                <li key={i.code} className="border-l-2 border-vert-200 pl-4">
                  <p className="font-medium text-ink">
                    {lisible ? (
                      <Link href={`/points-de-controle/${p.slug}`} className="hover:text-vert-700">
                        {i.intitule}
                      </Link>
                    ) : (
                      i.intitule
                    )}
                  </p>
                  <p className="mt-1 text-sm text-gris">
                    {poidsEnMots(i.ponderation)} · {i.explication}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <section className="container-ah pb-16 pt-8">
        <p className="max-w-3xl text-sm text-gris">{MENTION_LABEL_PRIVE}</p>
      </section>
    </>
  );
}
