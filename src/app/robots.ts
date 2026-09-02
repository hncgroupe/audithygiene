import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

/**
 * Crawlers de moteurs génératifs (GEO) que l'on autorise explicitement à indexer
 * le contenu public, pour favoriser la citation par les IA (ChatGPT, Claude,
 * Perplexity, Google AI Overviews, Copilot/Bing, etc.).
 */
const AI_AGENTS = [
  // OpenAI : entrainement, recherche, et recuperation a la demande.
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic. `Claude-User` et `Claude-SearchBot` sont les agents recents,
  // distincts de `ClaudeBot` : les omettre revient a les laisser hors regle.
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'Claude-Web',
  // Perplexity.
  'PerplexityBot',
  'Perplexity-User',
  // Google : `Google-Extended` gouverne Gemini et les AI Overviews.
  'Google-Extended',
  // Apple, Amazon, Meta.
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'Meta-ExternalAgent',
  // Bing et Copilot.
  'Bingbot',
  // Corpus ouverts et agregateurs.
  'CCBot',
  'cohere-ai',
  'Bytespider',
  'Diffbot',
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
