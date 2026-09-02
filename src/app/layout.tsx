import type { Metadata, Viewport } from 'next';
import { Hanken_Grotesk } from 'next/font/google';
import '@/styles/globals.css';
import { env } from '@/lib/env';
import { JsonLd } from '@/components/site/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/schema';

// Style Stripe : grotesk propre, identique sur tous les appareils (une seule webfont).
const display = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-stripe',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    /* TODO prix a confirmer : pas de montant dans la balise title tant que
       FORMULES porte la mention « a valider ». */
    default: 'Audit hygiène restaurant Île-de-France : rapport et devis',
    /*
      Pas de suffixe de marque.

      « | audit hygiène » ajoutait seize caracteres a chaque titre du site :
      330 pages sur 351 depassaient la soixantaine de caracteres et se
      faisaient couper, ou pire, reecrire par Google. Un suffixe de marque ne
      se paie que quand la marque est deja cherchee, ce qui n'est pas encore le
      cas ici. Chaque page reprend donc les mots de sa requete, et rien
      d'autre.
    */
    template: '%s',
  },
  description:
    "Cabinet d'audit hygiène et HACCP pour restaurants et CHR en Île-de-France. Un auditeur contrôle votre établissement et vous remet un rapport complet : notation, cas critiques, plan correctif. Label privé indépendant.",
  applicationName: 'audit hygiène',
  authors: [{ name: 'audit hygiène' }],
  creator: 'audit hygiène',
  publisher: 'audit hygiène',
  category: 'Hygiène alimentaire et HACCP en restauration',
  keywords: [
    'audit hygiène restaurant',
    'audit HACCP',
    'contrôle sanitaire restaurant',
    'plan de maîtrise sanitaire',
    'hygiène alimentaire restauration',
    'mise en conformité restaurant',
  ],
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'audit hygiène',
    title: 'audit hygiène - Audit hygiène & HACCP pour restaurants en Île-de-France',
    description:
      "Anticipez le contrôle sanitaire : audit sur place, rapport clair, plan d'action. Label privé indépendant, dans les huit départements franciliens.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'audit hygiène - Audit hygiène & HACCP restaurants en Île-de-France',
    description:
      "Audit hygiène et HACCP pour restaurants en Île-de-France. Notation, cas critiques, plan correctif.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: env.googleSiteVerification,
    other: env.bingSiteVerification
      ? { 'msvalidate.01': env.bingSiteVerification }
      : {},
  },
};

export const viewport: Viewport = {
  themeColor: '#10B981',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={display.variable}>
      <body className="font-sans antialiased">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {children}
      </body>
    </html>
  );
}
