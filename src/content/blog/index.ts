/** Registre des articles du blog. Chaque article vit dans son propre fichier. */
import type { Article } from './types';

import { article as controleSanitaire } from './controle-sanitaire-restaurant';
import { article as haccpGuide } from './haccp-restauration-guide';
import { article as pms } from './plan-maitrise-sanitaire-pms';
import { article as chaineFroid } from './chaine-du-froid-restauration';
import { article as tracabilite } from './tracabilite-dlc-restaurant';
import { article as allergenes } from './allergenes-restaurant-obligations';
import { article as fermeture } from './fermeture-administrative-restaurant';
import { article as nettoyage } from './nettoyage-desinfection-cuisine';
import { article as ouverture } from './ouvrir-restaurant-obligations-hygiene';
import { article as alimConfiance } from './note-alim-confiance';

/** Ordre d'affichage = du plus récent au plus ancien (datePublished décroissant). */
export const ARTICLES: Article[] = [
  controleSanitaire,
  haccpGuide,
  pms,
  chaineFroid,
  tracabilite,
  allergenes,
  fermeture,
  nettoyage,
  ouverture,
  alimConfiance,
].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelated(article: Article, limit = 3): Article[] {
  const bySlug = article.related
    .map((slug) => ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a));
  if (bySlug.length >= limit) return bySlug.slice(0, limit);
  // Complète avec d'autres articles de la même catégorie si besoin.
  const fillers = ARTICLES.filter(
    (a) => a.slug !== article.slug && !bySlug.includes(a) && a.category === article.category
  );
  return [...bySlug, ...fillers].slice(0, limit);
}

export type { Article } from './types';
