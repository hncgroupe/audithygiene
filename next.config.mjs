/*
  Les quatorze pages d'auto-audit absorbées par
  /questions/auto-audit-vs-audit-externe.

  Cette liste double celle de src/lib/fusion-questions.ts, et c'est volontaire :
  un fichier de configuration Next chargé par Node ne peut pas importer un
  module TypeScript. Les deux listes doivent rester identiques ; le script
  scripts/check-fusion.mjs échoue si elles divergent.
*/
const AUTO_AUDIT_ABSORBEES = [
  'par-ou-commencer-auto-audit',
  'checklist-tour-de-cuisine-30-minutes',
  'auto-audit-frigo',
  'auto-audit-reserve-seche',
  'auto-audit-plonge-laverie',
  'auto-audit-marche-en-avant',
  'auto-audit-service-du-soir',
  'qui-doit-faire-auto-audit-equipe',
  'frequence-auto-audit',
  'noter-son-etablissement-objectivement',
  'hierarchiser-corrections-auto-audit',
  'auto-audit-apres-changement-carte',
  'auto-audit-reprise-fonds',
  'auto-audit-plusieurs-etablissements',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  async redirects() {
    return [
      // audithygiene.com → audithygiene.fr (301)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'audithygiene.com' }],
        destination: 'https://audithygiene.fr/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.audithygiene.com' }],
        destination: 'https://audithygiene.fr/:path*',
        permanent: true,
      },
      // Article renommé : la contre-visite ne fait plus partie de l'offre (301)
      {
        source: '/blog/contre-visite-audit-hygiene',
        destination: '/blog/traiter-son-plan-d-action-apres-un-audit',
        permanent: true,
      },
      /*
        Les quinze pages d'auto-audit fusionnées en une seule (301).

        Elles apprenaient au lecteur à se passer de nous, quinze fois, en se
        disputant la même requête. Elles répondent désormais ensemble à la
        seule question qui compte : ce qui se vérifie seul, et ce qui exige un
        tiers. Voir src/lib/fusion-questions.ts.
      */
      ...AUTO_AUDIT_ABSORBEES.map((slug) => ({
        source: `/questions/${slug}`,
        destination: '/questions/auto-audit-vs-audit-externe',
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
