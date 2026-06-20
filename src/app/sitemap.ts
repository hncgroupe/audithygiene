import type { MetadataRoute } from 'next';
import { DEPARTEMENTS } from '@/lib/constants';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/faq', '/zones', '/mentions-legales', '/confidentialite', '/cgv'].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : path === '/faq' ? 0.8 : 0.6,
    })
  );

  const deptPages = DEPARTEMENTS.map((d) => ({
    url: `${siteUrl}/zones/${d.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...deptPages];
}
