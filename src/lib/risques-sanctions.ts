/**
 * Risques et suites possibles, volet client du rapport d'audit hygiène.
 *
 * SQUELETTE À VALIDER (rule methodology-guard). Le contenu ci-dessous reprend le
 * cadre déjà publié sur le site (suites d'un contrôle officiel, publication du
 * résultat, responsabilité) sans citer d'article de code : aucune référence n'est
 * inventée ici, et rien ne doit partir en production sans relecture client/expert.
 *
 * Deux règles tiennent tout ce fichier :
 *  - jamais de promesse de résultat à un contrôle officiel (rule label-prive-cadre-juridique) ;
 *  - jamais de minimisation d'un cas critique (rule no-fake-content).
 * Les suites sont donc écrites au conditionnel : ce sont des possibilités connues,
 * pas un pronostic sur cet établissement.
 */

import type { RapportHygiene } from './rapport-hygiene';

export interface SuiteControle {
  /** Gravité croissante, de 1 à 4. */
  rang: number;
  titre: string;
  /** Le cas de figure qui ouvre cette suite. */
  quand: string;
  texte: string;
  couleur: string;
}

/** Échelle des suites d'un contrôle officiel, de la simple observation à la fermeture. */
export const SUITES_CONTROLE: SuiteControle[] = [
  {
    rang: 1,
    titre: 'Observation au rapport de visite',
    quand: 'Écart mineur, sans danger pour le consommateur',
    texte:
      "Le point est noté, la régularisation est attendue sans acte particulier. C'est la suite la plus fréquente pour les écarts de tenue documentaire.",
    couleur: '#6B7D77',
  },
  {
    rang: 2,
    titre: 'Mise en demeure assortie d’un délai',
    quand: 'Manquements précis à régulariser',
    texte:
      "L'administration ordonne de corriger des manquements nommés dans un délai déterminé, le cas échéant avec contre-visite pour vérifier la remise en état.",
    couleur: '#B45309',
  },
  {
    rang: 3,
    titre: 'Amende administrative ou procès-verbal',
    quand: 'Manquement caractérisé',
    texte:
      'Selon les faits et leur gravité, la suite peut être financière, et dans les cas les plus sérieux relever du procès-verbal.',
    couleur: '#B45309',
  },
  {
    rang: 4,
    titre: 'Fermeture administrative, totale ou partielle',
    quand: 'Danger grave et imminent pour la santé du consommateur',
    texte:
      "Mesure de police décidée par le préfet de département, jusqu'à la levée des non-conformités. Elle vise à faire cesser un danger immédiat, pas à sanctionner une négligence de forme.",
    couleur: '#DC2626',
  },
];

export interface RisqueLigne {
  titre: string;
  texte: string;
}

/** Ce que l'écart fait peser sur le consommateur. */
export const RISQUES_SANITAIRES: RisqueLigne[] = [
  {
    titre: 'Toxi-infection alimentaire collective',
    texte:
      "Plusieurs convives malades après un même service. L'enquête remonte aux denrées, aux températures et aux relevés : sans traces écrites, l'établissement n'a rien à opposer.",
  },
  {
    titre: 'Denrées à écarter',
    texte:
      "Une rupture de la chaîne du froid ou une contamination oblige à détruire des stocks, souvent bien au-delà du seul produit en cause, et à tracer cette destruction.",
  },
  {
    titre: 'Allergène non maîtrisé',
    texte:
      "Une information erronée au client ou une contamination croisée en cuisine peut déclencher une réaction grave chez une personne allergique.",
  },
];

/** Ce que l'écart fait peser sur l'établissement. */
export const RISQUES_ETABLISSEMENT: RisqueLigne[] = [
  {
    titre: "Arrêt d'exploitation",
    texte:
      "Une fermeture, même partielle et courte, coupe le chiffre d'affaires pendant que les charges et les salaires continuent de courir.",
  },
  {
    titre: 'Résultat rendu public',
    texte:
      "Le résultat des contrôles officiels est publié et consultable par le public. Une note dégradée reste visible bien après la remise en conformité.",
  },
  {
    titre: 'Réputation',
    texte:
      "Un avis client, une photo de cuisine ou une vidéo qui circule pèsent aussi lourd que le contrôle lui-même, et se corrigent beaucoup plus lentement.",
  },
  {
    titre: 'Responsabilité',
    texte:
      "En cas de dommage, la responsabilité de l'exploitant peut être recherchée. Les preuves d'une démarche suivie comptent alors autant que l'état constaté le jour J.",
  },
];

/** Fourchette de suites plausibles selon la gravité du constat, pour la fiche d'action. */
export function suitesProbables(priorite: 'IMMEDIAT' | 'SOUS_30_JOURS'): SuiteControle[] {
  return priorite === 'IMMEDIAT'
    ? SUITES_CONTROLE.filter((x) => x.rang >= 2)
    : SUITES_CONTROLE.filter((x) => x.rang <= 2);
}

/** Phrase d'ouverture de la page risques, lue sur l'état réel de l'audit. */
export function lectureDuRisque(r: RapportHygiene): string {
  if (r.ncMajeures > 0)
    return `${r.ncMajeures} ${r.ncMajeures > 1 ? 'points critiques ont' : 'point critique a'} été relevé${
      r.ncMajeures > 1 ? 's' : ''
    } sur cet audit. Ce sont ceux qui, retrouvés en contrôle, ouvrent les suites les plus lourdes du tableau ci-dessous. Ils passent avant tout le reste.`;
  if (r.ncMineures > 0)
    return `Aucun point critique sur cet audit. Les ${r.ncMineures} écart${
      r.ncMineures > 1 ? 's' : ''
    } mineur${r.ncMineures > 1 ? 's' : ''} relevé${
      r.ncMineures > 1 ? 's' : ''
    } relèvent du haut du tableau : observation, ou régularisation dans un délai. Ils se corrigent sans difficulté.`;
  return "Aucun écart n'a été relevé sur les points audités. Ce tableau reste utile comme repère : il dit ce qu'un écart peut déclencher, et pourquoi la tenue des relevés compte autant que l'état des locaux.";
}

/** Avertissement de cadre, à garder collé au tableau des suites. */
export const AVERTISSEMENT_SUITES =
  "Ce tableau décrit des suites possibles d'un contrôle officiel, dans l'ordre de gravité. Il ne préjuge ni de la décision des services de contrôle, ni du résultat d'une visite à venir : la suite retenue dépend des constats faits ce jour-là par l'agent, et de lui seul.";
