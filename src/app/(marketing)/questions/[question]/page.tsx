/**
 * La page d'une question.
 *
 * Ces pages visent une intention précise et une seule : quelqu'un qui tape sa
 * question telle qu'il se la pose. La réponse directe est donc en tête, avant
 * tout développement, parce que c'est elle que les moteurs reprennent et parce
 * que faire attendre un lecteur inquiet est un mauvais calcul.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { QUESTIONS, questionParSlug } from '@/lib/familles';
import { QUESTIONS_OUVERTES, questionOuverte, COMMUNES_OUVERTES } from '@/lib/vagues';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';
import { combinaison, graine, urlCommune } from '@/lib/communes';
import { JsonLd } from '@/components/site/JsonLd';
import { DevisRapide } from '@/components/marketing/DevisRapide';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export function generateStaticParams() {
  return QUESTIONS_OUVERTES.map((q) => ({ question: q.slug }));
}

function trouver(slug: string) {
  const q = questionParSlug(slug);
  return q && questionOuverte(q.slug) ? q : undefined;
}

/**
 * Les mots sur lesquels une question ne peut pas se terminer.
 *
 * Couper au mot pres ne suffit pas : « Papier ou numérique, qu'est-ce qui est
 * accepté pour mes ? » est une phrase cassee, et une phrase cassee dans un
 * resultat de recherche coute plus cher qu'un titre un peu plus court. On
 * retire donc les mots outils tant que la fin reste bancale.
 */
const MOTS_SUSPENDUS = new Set([
  'a', 'à', 'au', 'aux', 'avec', 'dans', 'de', 'des', 'du', 'en', 'et', 'la',
  'le', 'les', 'ma', 'mes', 'mon', 'ou', 'par', 'pour', 'que', 'qui', 'sans',
  'ses', 'son', 'sur', 'un', 'une', "d'", "l'", 'est', "s'est", 'ne', 'plus',
]);

/** Une balise title trop longue est coupée par Google, au mot près. */
function titreCourt(question: string) {
  const nu = question.replace(/\s*\?$/, '');
  if (nu.length <= 58) return `${nu} ?`;
  const mots = nu.split(' ');
  const gardes: string[] = [];
  for (const m of mots) {
    if ([...gardes, m].join(' ').length > 56) break;
    gardes.push(m);
  }
  while (gardes.length > 3 && MOTS_SUSPENDUS.has(gardes[gardes.length - 1].toLowerCase())) {
    gardes.pop();
  }
  return `${gardes.join(' ')} ?`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ question: string }>;
}): Promise<Metadata> {
  const { question } = await params;
  const q = trouver(question);
  if (!q) return {};
  return {
    title: titreCourt(q.question),
    description: q.reponse.slice(0, 158).replace(/\s+\S*$/, ''),
    alternates: { canonical: `/questions/${q.slug}` },
    openGraph: {
      title: q.question,
      description: q.reponse.slice(0, 200),
      url: `${siteUrl}/questions/${q.slug}`,
    },
  };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ question: string }>;
}) {
  const { question } = await params;
  const q = trouver(question);
  if (!q) notFound();

  const url = `${siteUrl}/questions/${q.slug}`;
  /* Les voisines de rubrique d'abord : c'est le lien le plus utile au lecteur,
     et le plus lisible pour un moteur. */
  const memeRubrique = QUESTIONS_OUVERTES.filter(
    (x) => x.rubrique === q.rubrique && x.slug !== q.slug
  ).slice(0, 6);
  const ailleurs = combinaison(
    QUESTIONS_OUVERTES.filter((x) => x.rubrique !== q.rubrique),
    5,
    graine(q.slug, 'ailleurs')
  );
  const villes = COMMUNES_OUVERTES.slice(0, 5);
  /* Un chemin cite dans le corpus peut pointer vers une page hors vague : on
     ne garde que ceux qui existent reellement aujourd'hui. */
  const liens = (q.liens || []).filter(
    (l) => !l.startsWith('/questions/') || QUESTIONS.some((x) => `/questions/${x.slug}` === l)
  );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Questions', url: `${siteUrl}/faq` },
          { name: q.question, url },
        ])}
      />
      <JsonLd data={faqSchema([{ q: q.question, a: q.reponse }])} />

      <section className="bg-gradient-to-b from-vert-50 to-white">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            /{' '}
            <Link href="/faq" className="hover:text-vert-700">
              Questions
            </Link>{' '}
            / <span className="text-ink/70">{q.rubrique}</span>
          </nav>
          <p className="eyebrow mt-6">{q.rubrique}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {q.question}
          </h1>
          {/* La reponse directe, avant tout developpement. */}
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/85">
            {q.reponse}
          </p>
          <div className="mt-8">
            <Link href="/#rdv" className="btn-primary">
              Faire auditer mon établissement
            </Link>
          </div>
        </div>
      </section>

      {/* Une reponse qui rassure et s'arrete la ne rapporte rien. Le prix et la
          demande de devis suivent immediatement la reponse. */}
      <DevisRapide contexte="Vous avez la réponse. Si vous voulez savoir où en est réellement votre établissement, un auditeur passe et vous le dit par écrit." />

      <section className="container-ah py-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Le détail</h2>
        {q.precisions.map((p) => (
          <p key={p.slice(0, 40)} className="mt-5 max-w-3xl leading-relaxed text-ink/70">
            {p}
          </p>
        ))}
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

      {memeRubrique.length > 0 && (
        <section className="container-ah py-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Les autres questions sur « {q.rubrique.toLowerCase()} »
          </h2>
          <ul className="mt-4 space-y-2">
            {memeRubrique.map((x) => (
              <li key={x.slug}>
                <Link
                  href={`/questions/${x.slug}`}
                  className="text-ink/80 underline decoration-ink/20 underline-offset-4 hover:text-vert-700"
                >
                  {x.question}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container-ah py-8">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Ailleurs dans la FAQ</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {ailleurs.map((x) => (
            <li key={x.slug}>
              <Link
                href={`/questions/${x.slug}`}
                className="inline-block rounded-full border border-ink/10 px-4 py-2 text-sm text-ink/80 hover:border-vert-700 hover:text-vert-700"
              >
                {x.question}
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
