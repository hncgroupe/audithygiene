/** Registre des articles du blog. Chaque article vit dans son propre fichier. */
import type { Article } from './types';

// Lot national / réglementaire
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

// Lot Île-de-France / contrôle / audit
import { article as controleParis } from './controle-sanitaire-paris';
import { article as auditIdf } from './audit-hygiene-restaurant-ile-de-france';
import { article as controle93 } from './controle-sanitaire-seine-saint-denis';
import { article as snackingParis } from './hygiene-restauration-rapide-paris';
import { article as darkKitchen } from './hygiene-dark-kitchen-ile-de-france';
import { article as auditAvantOuvertureParis } from './audit-avant-ouverture-restaurant-paris';
import { article as controle92 } from './controle-hygiene-hauts-de-seine';
import { article as checklist } from './checklist-controle-sanitaire';
import { article as foodTruck } from './hygiene-food-truck-marche-ile-de-france';
import { article as traiteurEvenementiel } from './audit-hygiene-traiteur-evenementiel-idf';
import { article as auditAvantControle } from './audit-hygiene-avant-controle';
import { article as auditBlanc } from './audit-blanc-restaurant';
import { article as franchiseReseau } from './audit-hygiene-franchise-reseau';
import { article as auditReprise } from './audit-reprise-restaurant';
import { article as auditPriveVsControle } from './audit-prive-vs-controle-officiel';
import { article as auditApresControle } from './audit-hygiene-apres-controle';
import { article as contreVisite } from './contre-visite-audit-hygiene';
import { article as frequenceAudit } from './frequence-audit-hygiene';
import { article as comprendreRapport } from './comprendre-rapport-audit-hygiene';
import { article as casCritique } from './cas-critique-non-conformite-majeure';

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
  controleParis,
  auditIdf,
  controle93,
  snackingParis,
  darkKitchen,
  auditAvantOuvertureParis,
  controle92,
  checklist,
  foodTruck,
  traiteurEvenementiel,
  auditAvantControle,
  auditBlanc,
  franchiseReseau,
  auditReprise,
  auditPriveVsControle,
  auditApresControle,
  contreVisite,
  frequenceAudit,
  comprendreRapport,
  casCritique,
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
