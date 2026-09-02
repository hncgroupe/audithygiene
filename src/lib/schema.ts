/** Générateurs de données structurées schema.org (rule no-fake-content : pas d'AggregateRating sans vrais avis). */
import { DEPARTEMENTS, FORMULES, MARQUE } from './constants';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

/**
 * La zone reellement desservie, en donnees et pas seulement en prose.
 *
 * Un moteur de reponse a qui on demande « qui fait un audit hygiene a Paris »
 * lit `areaServed` avant de lire un paragraphe. Ecrire « France » quand le
 * cabinet ne se deplace qu'en Ile-de-France est a la fois faux et inutile : le
 * moteur ne peut pas rapprocher la reponse d'une ville.
 */
export const ZONE_DESSERVIE = DEPARTEMENTS.map((d) => ({
  '@type': 'AdministrativeArea' as const,
  name: `${d.nom} (${d.code})`,
  containedInPlace: { '@type': 'AdministrativeArea', name: 'Île-de-France' },
}));

/**
 * Les formules publiees, en `Offer`.
 *
 * Prix valides par le client le 2 septembre 2026, voir src/lib/constants.ts.
 * Les montants viennent de FORMULES, jamais recopies : ce sont exactement ceux
 * qu'affichent la page d'accueil et la page prix.
 *
 * `valueAddedTaxIncluded: false` n'est pas un detail : les deux tarifs sont
 * hors taxes, et un moteur de reponse qui reprend le chiffre sans la mention
 * ferait dire au site un prix qu'il ne pratique pas. `priceSpecification`
 * porte la meme information en clair.
 */
export const OFFRES_PUBLIEES = FORMULES.map((f) => ({
  '@type': 'Offer' as const,
  name: f.nom,
  description: f.description,
  price: f.prix.replace(/[^0-9]/g, ''),
  priceCurrency: 'EUR',
  valueAddedTaxIncluded: false,
  priceSpecification: {
    '@type': 'PriceSpecification',
    price: f.prix.replace(/[^0-9]/g, ''),
    priceCurrency: 'EUR',
    valueAddedTaxIncluded: false,
  },
  availability: 'https://schema.org/InStock',
  url: `${siteUrl}/prix-audit-hygiene-restaurant`,
  seller: { '@id': `${siteUrl}/#organization` },
}));

export function localBusinessSchema(opts?: { areaServed?: string; name?: string; url?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: opts?.name ?? MARQUE.nom,
    description:
      "Audit hygiène et HACCP pour restaurants et CHR. Label privé indépendant. Notation, cas critiques, plan correctif.",
    url: opts?.url ?? siteUrl,
    email: MARQUE.email,
    /* Une page de commune passe sa propre zone : c'est elle qui compte pour une
       requete locale. Sinon, les huit departements franciliens. */
    areaServed: opts?.areaServed
      ? [{ '@type': 'Place', name: opts.areaServed }, ...ZONE_DESSERVIE]
      : ZONE_DESSERVIE,
    provider: { '@id': `${siteUrl}/#organization` },
    serviceType: "Audit d'hygiène et HACCP pour la restauration",
    makesOffer: OFFRES_PUBLIEES,
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
    areaServed: ZONE_DESSERVIE,
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
    '@id': `${siteUrl}/#service`,
    name: "Audit d'hygiène et HACCP en restaurant",
    serviceType: "Audit d'hygiène et HACCP",
    provider: { '@type': 'ProfessionalService', name: MARQUE.nom, url: siteUrl, email: MARQUE.email },
    areaServed: ZONE_DESSERVIE,
    audience: {
      '@type': 'BusinessAudience',
      name: 'Restaurants, restauration rapide, dark kitchens, boulangeries, traiteurs, bars, hôtels-restaurants',
    },
    description:
      "Un auditeur contrôle votre établissement sur la base de la réglementation hygiène/HACCP et vous remet un rapport : notation, cas critiques, plan correctif.",
    offers: OFFRES_PUBLIEES,
    termsOfService: `${siteUrl}/cgv`,
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
