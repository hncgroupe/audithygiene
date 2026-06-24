import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { ContactForm } from '@/components/marketing/ContactForm';
import { MARQUE } from '@/lib/constants';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez audit hygiène : un formulaire simple et rapide pour un devis, une question ou une demande d'audit. Réponse rapide, sans engagement. Label privé indépendant.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | audit hygiène',
    description:
      "Un formulaire simple et rapide pour un devis, une question ou une demande d'audit hygiène. Réponse rapide, sans engagement.",
    url: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Contact', url: `${siteUrl}/contact` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact - audit hygiène',
          url: `${siteUrl}/contact`,
          mainEntity: {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            email: MARQUE.email,
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              email: MARQUE.email,
              availableLanguage: ['French'],
              areaServed: 'FR',
            },
          },
        }}
      />

      <section className="aurora">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            / <span className="text-ink/70">Contact</span>
          </nav>
          <p className="eyebrow mt-6">Contact</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Parlons de votre établissement
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            Une question, un devis, une demande d'audit ? Remplissez le formulaire ci-dessous ou
            ouvrez le chat en bas à droite : on vous répond rapidement. Simple et sans engagement.
          </p>
        </div>
      </section>

      <section className="container-ah py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <ContactForm />
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-ink/8 bg-white p-6">
              <h2 className="text-lg font-semibold text-ink">Par chat</h2>
              <p className="mt-2 text-sm text-ink/75">
                Une question rapide ? Ouvrez le chat en bas à droite de votre écran : on vous répond
                directement. Si nous ne sommes pas en ligne, laissez votre email, nous revenons vers
                vous au plus vite.
              </p>
            </div>

            <div className="rounded-2xl border border-ink/8 bg-white p-6">
              <h2 className="text-lg font-semibold text-ink">Par email</h2>
              <p className="mt-2 text-sm text-ink/75">
                Vous préférez écrire directement ?
              </p>
              <a
                href={`mailto:${MARQUE.email}`}
                className="mt-2 inline-block font-medium text-vert-700 underline decoration-vert/40 underline-offset-2"
              >
                {MARQUE.email}
              </a>
            </div>

            <div className="rounded-2xl border border-ink/8 bg-white p-6">
              <h2 className="text-lg font-semibold text-ink">Besoin urgent ?</h2>
              <p className="mt-2 text-sm text-ink/75">
                Contrôle imminent, ouverture proche ou suite de contrôle : un rendez-vous express
                est possible sous 48 h. Précisez-le dans votre message.
              </p>
            </div>

            <div className="rounded-2xl bg-vert-50 p-6">
              <h2 className="text-lg font-semibold text-ink">Configurer votre audit</h2>
              <p className="mt-2 text-sm text-ink/75">
                Vous savez déjà ce que vous voulez ? Configurez votre audit et recevez une
                proposition.
              </p>
              <Link href="/#configurateur" className="btn-ghost mt-4 text-sm">
                Configurer mon audit
              </Link>
            </div>

            <p className="px-1 text-xs leading-relaxed text-gris">
              Vos données servent uniquement à traiter votre demande. Elles sont conservées de façon
              sécurisée et ne sont jamais cédées. Voir la{' '}
              <Link href="/confidentialite" className="underline">
                politique de confidentialité
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
