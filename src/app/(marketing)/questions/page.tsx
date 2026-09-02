/**
 * Le sommaire des questions autonomes.
 *
 * Il manquait aussi. Soixante-dix pages vivaient sous /questions/ et l'adresse
 * /questions repondait 404. Le seul endroit qui les listait etait la FAQ, ce
 * qui suffisait a leur donner un lien entrant mais laissait le segment
 * d'URL sans sommaire, et le fil d'Ariane de chaque question renvoyait vers
 * /faq plutot que vers sa propre famille.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { RUBRIQUES } from '@/data/questions-pseo';
import { QUESTIONS_OUVERTES } from '@/lib/vagues';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export const metadata: Metadata = {
  title: `Contrôle sanitaire : les ${QUESTIONS_OUVERTES.length} questions posées`,
  description: `Les questions que se posent les restaurateurs sur le contrôle sanitaire et l'hygiène : déroulé, non-conformités, documents, suites, Alim'confiance. Une réponse directe par question.`,
  alternates: { canonical: '/questions' },
};

export default function QuestionsPage() {
  const rubriques = RUBRIQUES.filter((r) => QUESTIONS_OUVERTES.some((q) => q.rubrique === r));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Questions', url: `${siteUrl}/questions` },
        ])}
      />

      <section className="bg-gradient-to-b from-vert-50 to-white">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            / <span className="text-ink/70">Questions</span>
          </nav>
          <p className="eyebrow mt-6">
            {QUESTIONS_OUVERTES.length} questions · {rubriques.length} rubriques
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Ce que les restaurateurs demandent avant, pendant et après un contrôle
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-ink/80">
            Chaque question porte sa réponse en tête, lisible seule et sans contexte, puis le détail
            et le texte applicable quand il y en a un. Ce sont les questions qui reviennent
            réellement, pas une liste construite pour occuper la page.
          </p>
          <div className="mt-8">
            <Link href="/#rdv" className="btn-primary">
              Faire auditer mon établissement
            </Link>
          </div>
        </div>
      </section>

      {rubriques.map((r) => (
        <section key={r} className="container-ah py-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">{r}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {QUESTIONS_OUVERTES.filter((q) => q.rubrique === r).map((q) => (
              <li key={q.slug}>
                <Link
                  href={`/questions/${q.slug}`}
                  className="text-ink/80 underline decoration-ink/20 underline-offset-4 hover:text-vert-700"
                >
                  {q.question}
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
