import type { MetadataRoute } from 'next';
import { DEPARTEMENTS } from '@/lib/constants';
import { ARTICLES } from '@/content/blog';
import { urlCommune } from '@/lib/communes';
import {
  ACTIVITES_OUVERTES,
  COMMUNES_OUVERTES,
  DOSSIERS_OUVERTS,
  POINTS_OUVERTS,
  QUESTIONS_OUVERTES,
  THEMES_OUVERTS,
} from '@/lib/vagues';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = ['', '/methode', '/a-propos', '/contact', '/faq', '/blog', '/zones', '/points-de-controle', '/dossiers', '/audit-hygiene', '/mentions-legales', '/confidentialite', '/cgv'].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority:
        path === ''
          ? 1
          : path === '/methode' || path === '/faq' || path === '/blog' || path === '/a-propos'
            ? 0.8
            : 0.6,
    })
  );

  const deptPages = DEPARTEMENTS.map((d) => ({
    url: `${siteUrl}/zones/${d.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogPages = ARTICLES.map((a) => ({
    url: `${siteUrl}/blog/${a.slug}`,
    lastModified: new Date(a.dateModified),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  /* Seules les communes de la vague ouverte entrent au sitemap : les autres ne
     sont pas generees et repondraient 404. */
  const communePages = COMMUNES_OUVERTES.map((c) => ({
    url: `${siteUrl}${urlCommune(c)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const grillePages = [
    ...THEMES_OUVERTS.map((t) => `/themes/${t.slug}`),
    ...POINTS_OUVERTS.map((p) => `/points-de-controle/${p.slug}`),
    ...QUESTIONS_OUVERTES.map((q) => `/questions/${q.slug}`),
    ...DOSSIERS_OUVERTS.map((d) => `/dossiers/${d.slug}`),
    ...ACTIVITES_OUVERTES.map((a) => `/audit-hygiene/${a.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...deptPages, ...grillePages, ...communePages, ...blogPages];
}
