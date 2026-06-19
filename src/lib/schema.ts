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
    areaServed: opts?.areaServed ?? 'Île-de-France, France',
    serviceType: "Audit d'hygiène et HACCP pour la restauration",
    knowsAbout: ['HACCP', 'Plan de Maîtrise Sanitaire', "Hygiène alimentaire", 'Restauration'],
  };
}

export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: "Audit d'hygiène et HACCP",
    provider: { '@type': 'ProfessionalService', name: MARQUE.nom, url: siteUrl },
    areaServed: 'Île-de-France, France',
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
