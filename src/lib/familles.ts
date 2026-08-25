/**
 * Le registre des familles de pages programmatiques.
 *
 * Un seul endroit declare ce qui existe. Les vagues d'ouverture s'appuient
 * dessus, le sitemap aussi, et la barriere de qualite compte a partir d'ici.
 *
 * Ce fichier se remplit au fur et a mesure que les familles arrivent. Une
 * famille absente rend simplement une liste vide : elle ne casse ni le calcul
 * des vagues, ni le maillage.
 */

import { GRILLE_AUDIT } from './grille-audit';
import { GRILLE_AFFICHAGE } from './grille-affichage';
import { QUESTIONS_PSEO } from '@/data/questions-pseo';
import { DOSSIERS as DOSSIERS_DE_FOND } from '@/data/dossiers';
import { ACTIVITES_PSEO } from '@/data/activites-pseo';

const slugifier = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/['’]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Le volet dont releve un point.
 *
 * « hygiene » : la DDPP, les services veterinaires, l'hygiene des denrees et
 * des locaux. « affichage » : la DGCCRF, la loyaute de l'information donnee au
 * consommateur. Deux administrations, deux visites possibles, et un
 * etablissement irreprochable en cuisine peut etre repris sur sa carte.
 */
export type Volet = 'hygiene' | 'affichage';

export const VOLETS: Record<Volet, { nom: string; service: string; court: string }> = {
  hygiene: {
    nom: "Hygiène des denrées et des locaux",
    service: 'les services vétérinaires (DDPP)',
    court: 'hygiène',
  },
  affichage: {
    nom: "Affichage et information du consommateur",
    service: 'la DGCCRF',
    court: 'affichage',
  },
};

/** Les themes des deux grilles, un par page. */
export const THEMES = [
  ...GRILLE_AUDIT.map((t) => ({ ...t, volet: 'hygiene' as Volet })),
  ...GRILLE_AFFICHAGE.map((t) => ({ ...t, volet: 'affichage' as Volet })),
].map((t) => ({
  theme: t.theme,
  slug: slugifier(t.theme),
  items: t.items,
  volet: t.volet,
}));

/**
 * Les points de controle, un par page.
 *
 * Le slug vient de l'intitule, jamais du code : personne ne cherche
 * « froid-01 », et « temperatures-des-enceintes-froides-positives » porte les
 * mots que l'on tape.
 */
export const POINTS = [
  ...GRILLE_AUDIT.map((t) => ({ ...t, volet: 'hygiene' as Volet })),
  ...GRILLE_AFFICHAGE.map((t) => ({ ...t, volet: 'affichage' as Volet })),
].flatMap((t) =>
  t.items.map((i) => ({
    ...i,
    theme: t.theme,
    themeSlug: slugifier(t.theme),
    slug: slugifier(i.intitule),
    volet: t.volet,
  }))
);

/** Les points d'un volet, pour compter sans se tromper de perimetre. */
export const pointsDuVolet = (v: Volet) => POINTS.filter((p) => p.volet === v);
export const NB_HYGIENE = GRILLE_AUDIT.reduce((a, t) => a + t.items.length, 0);
export const NB_AFFICHAGE = GRILLE_AFFICHAGE.reduce((a, t) => a + t.items.length, 0);

export const pointParSlug = (slug: string) => POINTS.find((p) => p.slug === slug);
export const themeParSlug = (slug: string) => THEMES.find((t) => t.slug === slug);

/** Les questions autonomes, une par page. */
export const QUESTIONS = QUESTIONS_PSEO;
export const questionParSlug = (slug: string) => QUESTIONS_PSEO.find((q) => q.slug === slug);

/** Les types d'etablissement, une page chacun. */
export const ACTIVITES_PAGES = ACTIVITES_PSEO;
export const activiteParSlug = (slug: string) => ACTIVITES_PSEO.find((a) => a.slug === slug);

/** Les dossiers de fond, une page chacun. */
export const DOSSIERS = DOSSIERS_DE_FOND;
export const dossierParSlug = (slug: string) => DOSSIERS.find((d) => d.slug === slug);
