/**
 * Les vagues d'ouverture.
 *
 * Un site qui passe de douze pages a neuf cents en une nuit n'a pas l'air d'un
 * site qui grandit, il a l'air d'un site qui deverse. Google traite les deux
 * differemment, et le second attend des mois. On ouvre donc par paliers, et
 * c'est la vitesse qui compte, pas le volume total.
 *
 * Une page hors vague n'est pas seulement absente du sitemap : elle n'est pas
 * generee du tout, elle repond 404, et surtout aucun lien interne ne pointe
 * vers elle. Un maillage qui renvoie vers du 404 fait plus de degats qu'une
 * page manquante.
 *
 * Pour ouvrir la vague suivante : passer VAGUE a 2, rebatir, redeployer,
 * pousser le sitemap.
 */

import { COMMUNES } from './communes';
import { ACTIVITES_PAGES, DOSSIERS, POINTS, QUESTIONS, THEMES } from './familles';

export const VAGUE = 1;
export const PAR_VAGUE = 300;

/**
 * L'ordre d'ouverture, calcule une fois pour toutes.
 *
 * Les pages de methode sortent en premier : elles expliquent le metier, elles
 * recoivent les liens des autres familles, et elles n'ont besoin de rien pour
 * exister. Les communes suivent, des plus denses aux plus petites, parce
 * qu'une commune a deux mille etablissements amene plus de monde qu'un village
 * a quatre.
 */
const ORDRE: string[] = [
  ...THEMES.map((t) => `theme:${t.slug}`),
  ...POINTS.map((p) => `point:${p.slug}`),
  ...ACTIVITES_PAGES.map((a) => `activite:${a.slug}`),
  ...DOSSIERS.map((d) => `dossier:${d.slug}`),
  ...QUESTIONS.map((q) => `question:${q.slug}`),
  /* COMMUNES est deja trie par nombre d'etablissements decroissant. */
  ...COMMUNES.map((c) => `commune:${c.slug}`),
];

export const TOTAL_PAGES = ORDRE.length;

const OUVERTES = new Set(ORDRE.slice(0, VAGUE * PAR_VAGUE));

export const estOuverte = (cle: string) => OUVERTES.has(cle);
export const communeOuverte = (slug: string) => OUVERTES.has(`commune:${slug}`);
export const themeOuvert = (slug: string) => OUVERTES.has(`theme:${slug}`);
export const pointOuvert = (slug: string) => OUVERTES.has(`point:${slug}`);
export const questionOuverte = (slug: string) => OUVERTES.has(`question:${slug}`);
export const dossierOuvert = (slug: string) => OUVERTES.has(`dossier:${slug}`);
export const activiteOuverte = (slug: string) => OUVERTES.has(`activite:${slug}`);

/** Les communes de la vague, dans l'ordre, pour le sitemap et les hubs. */
export const COMMUNES_OUVERTES = COMMUNES.filter((c) => communeOuverte(c.slug));
export const THEMES_OUVERTS = THEMES.filter((t) => themeOuvert(t.slug));
export const POINTS_OUVERTS = POINTS.filter((p) => pointOuvert(p.slug));
export const QUESTIONS_OUVERTES = QUESTIONS.filter((q) => questionOuverte(q.slug));
export const DOSSIERS_OUVERTS = DOSSIERS.filter((d) => dossierOuvert(d.slug));
export const ACTIVITES_OUVERTES = ACTIVITES_PAGES.filter((a) => activiteOuverte(a.slug));
