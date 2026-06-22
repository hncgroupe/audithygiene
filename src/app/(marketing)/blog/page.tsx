import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/content/blog';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export const metadata: Metadata = {
  title: 'Blog hygiène & HACCP en restauration',
  description:
    "Conseils, réglementation et méthode pour l'hygiène en restauration : contrôle sanitaire, HACCP, plan de maîtrise sanitaire, chaîne du froid, allergènes. Le blog d'audit hygiène.",
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog hygiène & HACCP en restauration | audit hygiène',
    description:
      "Réglementation et méthode pour l'hygiène en restauration : contrôle sanitaire, HACCP, PMS, chaîne du froid, allergènes.",
    url: `${siteUrl}/blog`,
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogIndexPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Blog hygiène & HACCP en restauration',
    itemListElement: ARTICLES.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteUrl}/blog/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Blog', url: `${siteUrl}/blog` },
        ])}
      />
      <JsonLd data={itemListSchema} />

      <section className="aurora">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            / <span className="text-ink/70">Blog</span>
          </nav>
          <p className="eyebrow mt-6">Ressources</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Le blog hygiène &amp; HACCP en restauration
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            Réglementation, méthode et bonnes pratiques pour tenir votre établissement conforme et
            aborder sereinement un contrôle sanitaire. Des réponses claires, basées sur les textes
            en vigueur.
          </p>
        </div>
      </section>

      <section className="container-ah py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <article
              key={a.slug}
              className="card-hover flex flex-col rounded-2xl border border-ink/8 bg-white p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-vert-700">
                {a.category}
              </p>
              <h2 className="mt-3 text-lg font-bold leading-snug text-ink">
                <Link href={`/blog/${a.slug}`} className="hover:text-vert-700">
                  {a.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{a.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-gris">
                <time dateTime={a.datePublished}>{formatDate(a.datePublished)}</time>
                <span>{a.readingMinutes} min de lecture</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-ah pb-20">
        <div className="rounded-2xl bg-vert-50 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-ink">
            Besoin d&apos;un état des lieux concret de votre établissement ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/70">
            Un auditeur se déplace, contrôle chaque thème et vous remet un rapport avec un plan
            d&apos;action priorisé.
          </p>
          <Link href="/#rdv" className="btn-primary mt-6">
            Réserver un audit
          </Link>
        </div>
      </section>
    </>
  );
}
