import type { MetadataRoute } from 'next';
import { DEPARTEMENTS } from '@/lib/constants';
import { ARTICLES } from '@/content/blog';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = ['', '/methode', '/a-propos', '/contact', '/faq', '/blog', '/zones', '/mentions-legales', '/confidentialite', '/cgv'].map(
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

  return [...staticPages, ...deptPages, ...blogPages];
}
