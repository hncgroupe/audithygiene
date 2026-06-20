import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQ_ITEMS } from '@/lib/content';
import { JsonLd } from '@/components/site/JsonLd';
import { faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'FAQ audit hygiène restaurant : toutes vos questions',
  description:
    "Audit hygiène, durée, prix, déroulé, rapport, contrôle sanitaire, HACCP, PMS, urgence : toutes les réponses pour préparer et réussir votre mise en conformité.",
  alternates: { canonical: 'https://audithygiene.fr/faq' },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ_ITEMS)} />
      <section className="container-ah py-20">
        <div className="max-w-3xl">
          <h1 className="section-title">Questions fréquentes</h1>
          <p className="mt-4 text-lg text-ink/80">
            Tout ce qu'un restaurateur doit savoir avant un audit hygiène : déroulé, durée, prix,
            rapport, contrôle sanitaire, urgence, cadre réglementaire. Une question sans réponse ?
            Contactez-nous.
          </p>
        </div>

        <dl className="mt-10 max-w-3xl divide-y divide-ink/10">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <dt className="font-semibold text-ink">{item.q}</dt>
                <span className="text-vert transition group-open:rotate-45" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <dd className="mt-3 text-ink/80">{item.a}</dd>
            </details>
          ))}
        </dl>

        <div className="mt-12 max-w-3xl rounded-2xl border border-vert/30 bg-vert-50/60 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-ink">Prêt à savoir où vous en êtes ?</h2>
          <p className="mt-2 text-ink/80">
            Configurez votre audit en 30 secondes et recevez votre devis. Sans engagement.
          </p>
          <Link href="/#configurateur" className="btn-primary mt-5">
            Configurer mon audit
          </Link>
        </div>
      </section>
    </>
  );
}
