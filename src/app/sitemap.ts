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
import { familleHorsIndex } from '@/lib/indexation';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* Les pages legales portent `index: false` dans leur propre metadata : les
     declarer ici reviendrait a demander l'indexation de pages qu'on interdit
     d'indexer, et Search Console le compte comme une erreur. Elles restent
     liees depuis le pied de page. */
  const staticPages = ['', '/methode', '/a-propos', '/contact', '/faq', '/prix-audit-hygiene-restaurant', '/blog', '/zones', '/points-de-controle', '/themes', '/questions', '/dossiers', '/audit-hygiene'].map(
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

  /* Les familles hors index ne sont pas declarees : elles portent un noindex
     assume, elles restent explorables et maillees, mais on ne demande pas leur
     classement. Voir src/lib/indexation.ts pour le raisonnement. */
  const grillePages = [
    ...(familleHorsIndex('themes') ? [] : THEMES_OUVERTS.map((t) => `/themes/${t.slug}`)),
    ...(familleHorsIndex('points-de-controle')
      ? []
      : POINTS_OUVERTS.map((p) => `/points-de-controle/${p.slug}`)),
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
