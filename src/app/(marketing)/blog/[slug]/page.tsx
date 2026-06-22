import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ARTICLES, getArticle, getRelated } from '@/content/blog';
import { DEPARTEMENTS } from '@/lib/constants';
import { JsonLd } from '@/components/site/JsonLd';
import { ArticleBody } from '@/components/marketing/ArticleBody';
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const url = `${siteUrl}/blog/${article.slug}`;
  return {
    title: article.metaTitle,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.metaTitle,
      description: article.description,
      url,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = `${siteUrl}/blog/${article.slug}`;
  const headings = article.blocks.filter(
    (b): b is { type: 'h2'; id: string; text: string } => b.type === 'h2'
  );
  const related = getRelated(article);
  const zones = (article.relatedZones ?? [])
    .map((s) => DEPARTEMENTS.find((d) => d.slug === s))
    .filter((d): d is (typeof DEPARTEMENTS)[number] => Boolean(d));

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: article.title,
          description: article.description,
          url,
          datePublished: article.datePublished,
          dateModified: article.dateModified,
          section: article.category,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Blog', url: `${siteUrl}/blog` },
          { name: article.title, url },
        ])}
      />
      {article.faq.length > 0 && (
        <JsonLd data={faqSchema(article.faq.map((f) => ({ q: f.q, a: f.a })))} />
      )}

      <article>
        <header className="aurora">
          <div className="container-ah py-14">
            <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
              <Link href="/" className="hover:text-vert-700">
                Accueil
              </Link>{' '}
              /{' '}
              <Link href="/blog" className="hover:text-vert-700">
                Blog
              </Link>{' '}
              / <span className="text-ink/70">{article.category}</span>
            </nav>
            <p className="eyebrow mt-6">{article.category}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-[1.1]">
              {article.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gris">
              <time dateTime={article.datePublished}>
                Publié le {formatDate(article.datePublished)}
              </time>
              {article.dateModified !== article.datePublished && (
                <span>· Mis à jour le {formatDate(article.dateModified)}</span>
              )}
              <span>· {article.readingMinutes} min de lecture</span>
            </div>
          </div>
        </header>

        <div className="container-ah grid gap-12 py-12 lg:grid-cols-[1fr_260px]">
          <div className="min-w-0 max-w-2xl">
            {/* Réponse directe (answer-first, optimisée citation IA) */}
            <div className="rounded-2xl border border-vert/20 bg-vert-50/60 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-vert-700">
                En bref
              </p>
              <p className="mt-2 text-lg leading-relaxed text-ink/85">{article.answer}</p>
            </div>

            <div className="mt-10">
              <ArticleBody blocks={article.blocks} />
            </div>

            {/* FAQ */}
            {article.faq.length > 0 && (
              <section className="mt-14">
                <h2 className="text-2xl font-bold tracking-tight text-ink">Questions fréquentes</h2>
                <dl className="mt-6 space-y-5">
                  {article.faq.map((f) => (
                    <div key={f.q} className="rounded-2xl border border-ink/8 bg-white p-5">
                      <dt className="font-semibold text-ink">{f.q}</dt>
                      <dd className="mt-2 text-[1.0625rem] leading-relaxed text-ink/80">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {/* Sources */}
            {article.sources.length > 0 && (
              <section className="mt-12 rounded-2xl bg-ink/[0.03] p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/70">
                  Sources
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-ink/70">
                  {article.sources.map((s) => (
                    <li key={s.label}>
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-vert/40 underline-offset-2 hover:text-vert-700"
                        >
                          {s.label}
                        </a>
                      ) : (
                        s.label
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* CTA */}
            <div className="mt-12 rounded-2xl bg-vert-50 p-8 text-center">
              <h2 className="text-xl font-bold text-ink">
                Vérifiez votre conformité avant qu&apos;un contrôle ne le fasse
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-ink/70">
                Un auditeur se déplace dans votre établissement, contrôle chaque thème et vous remet
                un rapport clair avec un plan d&apos;action priorisé.
              </p>
              <Link href="/#rdv" className="btn-primary mt-6">
                Réserver un audit
              </Link>
            </div>
          </div>

          {/* Sommaire + maillage */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {headings.length > 0 && (
                <nav aria-label="Sommaire">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">
                    Sommaire
                  </p>
                  <ul className="mt-3 space-y-2 border-l border-ink/10 text-sm">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="-ml-px block border-l-2 border-transparent pl-3 text-ink/60 hover:border-vert hover:text-vert-700"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {zones.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">
                    Audit près de chez vous
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {zones.map((z) => (
                      <li key={z.slug}>
                        <Link
                          href={`/zones/${z.slug}`}
                          className="rounded-full bg-vert-50 px-3 py-1 text-xs font-medium text-vert-700 hover:bg-vert-100"
                        >
                          {z.nom}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Articles liés */}
        {related.length > 0 && (
          <section className="border-t border-ink/8 bg-white">
            <div className="container-ah py-14">
              <h2 className="text-2xl font-bold tracking-tight text-ink">À lire aussi</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {related.map((r) => (
                  <article
                    key={r.slug}
                    className="card-hover flex flex-col rounded-2xl border border-ink/8 bg-white p-6"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-vert-700">
                      {r.category}
                    </p>
                    <h3 className="mt-3 text-base font-bold leading-snug text-ink">
                      <Link href={`/blog/${r.slug}`} className="hover:text-vert-700">
                        {r.title}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{r.excerpt}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
