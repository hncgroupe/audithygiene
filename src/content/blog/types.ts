/**
 * Modèle de contenu du blog audit hygiène.
 * Data-driven (pas de MDX) : chaque article est un objet typé, réutilisé pour
 * l'UI, le schema.org (BlogPosting + FAQPage), le sommaire et le maillage interne.
 *
 * Règles à respecter dans tout article (voir .claude/rules) :
 * - Français correct, ton sérieux/rassurant, métier.
 * - JAMAIS de tiret long ni demi-cadratin (signature IA). Utiliser virgule, deux-points,
 *   parenthèses ou tiret court avec espaces.
 * - Aucune statistique inventée. Toute donnée chiffrée renvoie à une source réelle.
 * - audit hygiène = label privé indépendant, jamais une certification d'État.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; title: string; text: string }
  | { type: 'quote'; text: string };

export interface BlogSource {
  /** Intitulé lisible de la source (texte réglementaire, autorité, etc.). */
  label: string;
  /** URL officielle si disponible (Legifrance, EUR-Lex, ministère...). */
  url?: string;
}

export interface BlogFaqItem {
  q: string;
  a: string;
}

export interface Article {
  /** Identifiant d'URL : /blog/<slug>. kebab-case, sans accent. */
  slug: string;
  /** Titre H1 affiché en tête d'article. */
  title: string;
  /** Balise <title> (≤ 60 caractères idéalement). */
  metaTitle: string;
  /** Meta description (150-160 caractères). */
  description: string;
  /** Accroche courte pour la carte de la liste blog. */
  excerpt: string;
  /** Catégorie éditoriale (ex. "Réglementation", "Méthode", "Pratique"). */
  category: string;
  /** Date de publication ISO (AAAA-MM-JJ). */
  datePublished: string;
  /** Date de dernière mise à jour ISO. */
  dateModified: string;
  /** Temps de lecture estimé en minutes. */
  readingMinutes: number;
  /**
   * Réponse directe "answer-first" (2 à 4 phrases) placée en haut d'article.
   * Optimisée GEO : doit pouvoir être citée telle quelle par une IA.
   */
  answer: string;
  /** Corps de l'article en blocs structurés. */
  blocks: Block[];
  /** FAQ de fin d'article (alimente aussi le schema FAQPage). */
  faq: BlogFaqItem[];
  /** Sources réelles citées. */
  sources: BlogSource[];
  /** Slugs d'articles liés (maillage interne). */
  related: string[];
  /** Slugs de départements liés (maillage vers /zones/<slug>). */
  relatedZones?: string[];
}
