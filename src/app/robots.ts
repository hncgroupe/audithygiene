import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

/**
 * Crawlers de moteurs génératifs (GEO) que l'on autorise explicitement à indexer
 * le contenu public, pour favoriser la citation par les IA (ChatGPT, Claude,
 * Perplexity, Google AI Overviews, Copilot/Bing, etc.).
 */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'Claude-Web',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'Bingbot',
  'CCBot',
  'cohere-ai',
  'Meta-ExternalAgent',
  'DuckAssistBot',
  'YouBot',
];

export default function robots(): MetadataRoute.Robots {
  const publicAccess = { allow: '/', disallow: ['/app', '/api/'] };
  return {
    rules: [
      { userAgent: '*', ...publicAccess },
      // Autorisation explicite des crawlers IA (signal GEO clair).
      ...AI_AGENTS.map((userAgent) => ({ userAgent, ...publicAccess })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
