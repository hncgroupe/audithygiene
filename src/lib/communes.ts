/**
 * Les communes d'Île-de-France, et ce qu'on peut honnêtement en dire.
 *
 * Une page de commune n'existe que si elle porte des chiffres qu'aucune autre
 * page ne porte : le nombre d'établissements de bouche réellement recensés dans
 * la base SIRENE, activité par activité, la population, et le rang de la
 * commune dans son département. Sans eux, ce serait la même page avec un nom de
 * ville échangé, et cela se verrait.
 *
 * Ce que ces pages ne disent jamais : qu'un auditeur est installé dans la
 * commune, ni le moindre chiffre de contrôle ou de sanction. Le cabinet se
 * déplace depuis l'Île-de-France, et c'est tout ce qu'on affirme.
 */

import brut from '@/data/communes-idf.json';
import parisBrut from '@/data/paris-arrondissements.json';
import { DEPARTEMENTS } from './constants';

type ChiffresBruts = {
  restaurants?: number;
  rapide?: number;
  bars?: number;
  boulangeries?: number;
  boucheries?: number;
  traiteurs?: number;
  cafeterias?: number;
  autresRestauration?: number;
  collectiveSousContrat?: number;
  detailPain?: number;
};

type CommuneBrute = {
  code: string;
  nom: string;
  population: number;
  departement: string;
  codesPostaux: string[];
  centre: number[] | null;
  chiffres: ChiffresBruts;
  voisines?: { code: string; nom: string; km: number }[];
  total?: number;
  publiable?: boolean;
};

export type Commune = CommuneBrute & {
  slug: string;
  codePostal: string;
  total: number;
  /** L'activité la plus représentée, celle qui donne le ton des contrôles. */
  dominante: {
    cle: keyof ChiffresBruts;
    libelle: string;
    singulier: string;
    genre: string;
    nombre: number;
  };
  rang: number;
  classees: number;
};

/**
 * Les activités visées par le contrôle sanitaire en restauration commerciale.
 *
 * La restauration collective sous contrat et le commerce de détail de pain
 * relèvent d'un autre régime : ils sont recensés mais jamais additionnés au
 * total, sans quoi la phrase « ces établissements sont contrôlés sur les mêmes
 * points » deviendrait fausse.
 */
export const ACTIVITES = [
  { cle: 'restaurants', libelle: 'restaurants traditionnels', singulier: 'restaurant traditionnel', genre: 'm', slug: 'restaurant' },
  { cle: 'rapide', libelle: 'établissements de restauration rapide', singulier: 'établissement de restauration rapide', genre: 'm', slug: 'restauration-rapide' },
  { cle: 'bars', libelle: 'débits de boissons', singulier: 'débit de boissons', genre: 'm', slug: 'bar' },
  { cle: 'boulangeries', libelle: 'boulangeries', singulier: 'boulangerie', genre: 'f', slug: 'boulangerie' },
  { cle: 'boucheries', libelle: 'boucheries et charcuteries', singulier: 'boucherie ou charcuterie', genre: 'f', slug: 'boucherie' },
  { cle: 'traiteurs', libelle: 'traiteurs', singulier: 'traiteur', genre: 'm', slug: 'traiteur' },
  { cle: 'cafeterias', libelle: 'cafétérias et libres-services', singulier: 'cafétéria ou libre-service', genre: 'f', slug: 'cafeteria' },
  { cle: 'autresRestauration', libelle: 'autres services de restauration', singulier: 'autre service de restauration', genre: 'm', slug: 'autre-restauration' },
] as const;

/**
 * L'accord au singulier.
 *
 * Une commune sur trois en Ile-de-France ne compte qu'un ou deux
 * etablissements. Sans ces trois fonctions, ces pages afficheraient « 1
 * adresses » et « debits de boissons donnent le ton », ce qui suffit a faire
 * refermer la page.
 */
export const pluriel = (n: number, singulier: string, plurielMot?: string) =>
  n > 1 ? plurielMot || `${singulier}s` : singulier;

/** « 1 etablissement » ou « 412 etablissements ». */
export const etabs = (n: number) => `${nombre(n)} ${pluriel(n, 'établissement')}`;

/** « 1 debit de boissons » ou « 147 debits de boissons ». */
export const quantite = (n: number, a: { libelle: string; singulier: string }) =>
  `${nombre(n)} ${n > 1 ? a.libelle : a.singulier}`;

/** L'activite en sujet de phrase : « les boulangeries », « le debit de boissons ». */
export const sujetActivite = (
  n: number,
  a: { libelle: string; singulier: string; genre: string }
) => (n > 1 ? `les ${a.libelle}` : `${a.genre === 'f' ? 'la' : 'le'} ${a.singulier}`);

export const DEPARTEMENTS_NOMS: Record<string, string> = {
  '75': 'Paris',
  '77': 'Seine-et-Marne',
  '78': 'Yvelines',
  '91': 'Essonne',
  '92': 'Hauts-de-Seine',
  '93': 'Seine-Saint-Denis',
  '94': 'Val-de-Marne',
  '95': "Val-d'Oise",
};

/**
 * Le département dans une phrase.
 *
 * « du Seine-Saint-Denis » est une faute que six cents pages répéteraient. Le
 * genre et le nombre changent d'un département à l'autre et aucune règle ne les
 * devine : ils sont écrits une fois ici.
 */
const ARTICLES: Record<string, { de: string; dans: string; le: string }> = {
  '75': { de: 'de Paris', dans: 'à Paris', le: 'Paris' },
  '77': { de: 'de la Seine-et-Marne', dans: 'en Seine-et-Marne', le: 'la Seine-et-Marne' },
  '78': { de: 'des Yvelines', dans: 'dans les Yvelines', le: 'les Yvelines' },
  '91': { de: "de l'Essonne", dans: "dans l'Essonne", le: "l'Essonne" },
  '92': { de: 'des Hauts-de-Seine', dans: 'dans les Hauts-de-Seine', le: 'les Hauts-de-Seine' },
  '93': { de: 'de la Seine-Saint-Denis', dans: 'en Seine-Saint-Denis', le: 'la Seine-Saint-Denis' },
  '94': { de: 'du Val-de-Marne', dans: 'dans le Val-de-Marne', le: 'le Val-de-Marne' },
  '95': { de: "du Val-d'Oise", dans: "dans le Val-d'Oise", le: "le Val-d'Oise" },
};

export const dep = (code: string, forme: 'de' | 'dans' | 'le' = 'de') =>
  (ARTICLES[code] || {})[forme] || DEPARTEMENTS_NOMS[code] || code;

/** Le segment d'URL du departement, tel que /zones l'utilise deja. */
export const depSlug = (code: string) =>
  (DEPARTEMENTS.find((d) => d.code === code) || {}).slug || code;

/** L'adresse d'une page de commune, ecrite ici et nulle part ailleurs. */
export const urlCommune = (c: { departement: string; slug: string }) =>
  `/zones/${depSlug(c.departement)}/${c.slug}`;

const sansAccent = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Empreinte stable : la même commune rend la même page demain qu'aujourd'hui. */
export function condensat(texte: string): number {
  let h = 2166136261;
  for (let i = 0; i < texte.length; i += 1) {
    h ^= texte.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** Une graine par pot de formulation, jamais une graine pour toutes. */
export const graine = (cle: string, etiquette: string) => condensat(`${cle}|${etiquette}`);

export const tirer = <T>(liste: readonly T[], g: number, sel: number): T =>
  liste[(g * sel + sel * sel + 5) % liste.length];

/** Combinaison de k éléments : un ensemble distinct, pas un ordre différent. */
export function combinaison<T>(liste: readonly T[], k: number, g: number): T[] {
  const reste = liste.slice();
  const choisis: T[] = [];
  let local = g;
  while (choisis.length < Math.min(k, liste.length)) {
    local = (local * 1103515245 + 12345) >>> 0;
    choisis.push(reste.splice(local % reste.length, 1)[0]);
  }
  return choisis;
}

export const nombre = (n: number) => new Intl.NumberFormat('fr-FR').format(n);

const donnees = brut as unknown as { communes: Record<string, CommuneBrute> };
const paris = parisBrut as unknown as {
  arrondissements: Record<
    string,
    {
      code: string;
      numero: number;
      nom: string;
      codePostal: string;
      population: number;
      chiffres: Record<string, number>;
      voisines?: { code: string; nom: string; km: number }[];
    }
  >;
};

const brutes: CommuneBrute[] = [
  ...Object.values(donnees.communes || {}).filter((c) => c.publiable),
  /* Paris ne répond pas sur son code commune : ses vingt arrondissements
     portent les chiffres, et ce sont eux que cherchent les restaurateurs. */
  ...Object.values(paris.arrondissements || {}).map((a) => ({
    code: a.code,
    nom: a.nom,
    population: a.population,
    departement: '75',
    codesPostaux: [a.codePostal],
    centre: null,
    chiffres: a.chiffres as ChiffresBruts,
    voisines: a.voisines || [],
    publiable: true,
  })),
];

function preparer(liste: CommuneBrute[]): Commune[] {
  const avecTotal = liste.map((c) => ({
    c,
    total: ACTIVITES.reduce((a, x) => a + (c.chiffres[x.cle] || 0), 0),
  }));

  /* Le rang se calcule dans le département : dire qu'une commune est douzième
     d'Île-de-France n'aide personne, dire qu'elle est douzième de son
     département situe vraiment le tissu. */
  const parDepartement = new Map<string, typeof avecTotal>();
  for (const e of avecTotal) {
    const l = parDepartement.get(e.c.departement) || [];
    l.push(e);
    parDepartement.set(e.c.departement, l);
  }
  for (const l of parDepartement.values()) l.sort((a, b) => b.total - a.total);

  const rangs = new Map<string, { rang: number; classees: number }>();
  for (const [, l] of parDepartement) {
    l.forEach((e, i) => rangs.set(e.c.code, { rang: i + 1, classees: l.length }));
  }

  return avecTotal
    .filter((e) => e.total > 0)
    .map(({ c, total }) => {
      const dominanteBrute = ACTIVITES.slice().sort(
        (x, y) => (c.chiffres[y.cle] || 0) - (c.chiffres[x.cle] || 0)
      )[0];
      const r = rangs.get(c.code) || { rang: 0, classees: 0 };
      const codePostal = (c.codesPostaux && c.codesPostaux[0]) || '';
      return {
        ...c,
        total,
        codePostal,
        slug: `${sansAccent(c.nom)}-${codePostal}`,
        rang: r.rang,
        classees: r.classees,
        dominante: {
          cle: dominanteBrute.cle,
          libelle: dominanteBrute.libelle,
          singulier: dominanteBrute.singulier,
          genre: dominanteBrute.genre,
          nombre: c.chiffres[dominanteBrute.cle] || 0,
        },
      };
    })
    .sort((a, b) => b.total - a.total);
}

export const COMMUNES: Commune[] = preparer(brutes);

const parSlug = new Map(COMMUNES.map((c) => [c.slug, c]));
const parCode = new Map(COMMUNES.map((c) => [c.code, c]));

export const commune = (slug: string) => parSlug.get(slug);
export const communeParCode = (code: string) => parCode.get(code);

/** Médiane du nombre d'établissements, pour situer sans flatter. */
export const MEDIANE = (() => {
  const t = COMMUNES.map((c) => c.total).sort((a, b) => a - b);
  return t[Math.floor(t.length / 2)] || 0;
})();
