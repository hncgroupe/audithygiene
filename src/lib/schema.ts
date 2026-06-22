/** Générateurs de données structurées schema.org (rule no-fake-content : pas d'AggregateRating sans vrais avis). */
import { MARQUE } from './constants';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export function localBusinessSchema(opts?: { areaServed?: string; name?: string; url?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: opts?.name ?? MARQUE.nom,
    description:
      "Audit hygiène et HACCP pour restaurants et CHR. Label privé indépendant. Notation, cas critiques, plan correctif.",
    url: opts?.url ?? siteUrl,
    email: MARQUE.email,
    areaServed: opts?.areaServed ?? 'France',
    serviceType: "Audit d'hygiène et HACCP pour la restauration",
    knowsAbout: ['HACCP', 'Plan de Maîtrise Sanitaire', "Hygiène alimentaire", 'Restauration'],
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: MARQUE.nom,
    url: siteUrl,
    email: MARQUE.email,
    logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    description:
      "Cabinet d'audit hygiène et HACCP pour restaurants et CHR. Label privé indépendant : notation, cas critiques, plan correctif.",
    areaServed: { '@type': 'Country', name: 'France' },
    knowsAbout: [
      'HACCP',
      'Plan de Maîtrise Sanitaire',
      'Hygiène alimentaire',
      'Réglementation hygiène en restauration',
      'Allergènes alimentaires',
      'Chaîne du froid',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: MARQUE.nom,
    url: siteUrl,
    inLanguage: 'fr-FR',
    publisher: { '@id': `${siteUrl}/#organization` },
  };
}

export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: "Audit d'hygiène et HACCP",
    provider: { '@type': 'ProfessionalService', name: MARQUE.nom, url: siteUrl },
    areaServed: 'France',
    description:
      "Un auditeur contrôle votre établissement sur la base de la réglementation hygiène/HACCP et vous remet un rapport : notation, cas critiques, plan correctif.",
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  section?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    url: opts.url,
    image: opts.image ?? `${siteUrl}/opengraph-image`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: 'fr-FR',
    articleSection: opts.section,
    isPartOf: { '@id': `${siteUrl}/#website` },
    author: { '@id': `${siteUrl}/#organization` },
    publisher: { '@id': `${siteUrl}/#organization` },
  };
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}
