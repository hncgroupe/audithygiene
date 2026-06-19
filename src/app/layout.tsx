import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'audit hygiène - Audit hygiène & HACCP pour restaurants en Île-de-France',
    template: '%s | audit hygiène',
  },
  description:
    "Cabinet d'audit hygiène et HACCP pour restaurants et CHR en Île-de-France. Un auditeur contrôle votre établissement et vous remet un rapport complet : notation, cas critiques, plan correctif. Label privé indépendant.",
  applicationName: 'audit hygiène',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'audit hygiène',
    title: 'audit hygiène - Audit hygiène & HACCP pour restaurants en Île-de-France',
    description:
      "Anticipez le contrôle sanitaire : audit complet, rapport clair, plan d'action. Label privé indépendant, partout en Île-de-France.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'audit hygiène - Audit hygiène & HACCP restaurants IDF',
    description:
      "Audit hygiène et HACCP pour restaurants en Île-de-France. Notation, cas critiques, plan correctif.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#10B981',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
