/** Constantes de marque et de zone - audit hygiène. */

export const MARQUE = {
  nom: 'audit hygiène',
  baseline: 'Le tiers de confiance qui valide votre hygiène.',
  vert: '#10B981',
  ink: '#0C1B17',
  gris: '#6B7D77',
  email: 'contact@audithygiene.fr',
} as const;

export const MENTION_LABEL_PRIVE =
  "audit hygiène est un label privé de qualité, indépendant. Il ne constitue ni une certification officielle, ni un agrément d'État, ni un contrôle des services vétérinaires/DDPP.";

export interface Departement {
  code: string;
  nom: string;
  slug: string;
  villes: string[];
}

/** Île-de-France - zone de couverture. Villes prioritaires (à enrichir). */
export const DEPARTEMENTS: Departement[] = [
  { code: '75', nom: 'Paris', slug: 'paris', villes: ['Paris 1er', 'Paris 11e', 'Paris 18e'] },
  { code: '92', nom: 'Hauts-de-Seine', slug: 'hauts-de-seine', villes: ['Boulogne-Billancourt', 'Nanterre', 'Courbevoie', 'Neuilly-sur-Seine'] },
  { code: '93', nom: 'Seine-Saint-Denis', slug: 'seine-saint-denis', villes: ['Saint-Denis', 'Montreuil', 'Aubervilliers', 'Pantin'] },
  { code: '94', nom: 'Val-de-Marne', slug: 'val-de-marne', villes: ['Créteil', 'Vitry-sur-Seine', 'Ivry-sur-Seine', 'Maisons-Alfort'] },
  { code: '77', nom: 'Seine-et-Marne', slug: 'seine-et-marne', villes: ['Meaux', 'Chelles', 'Melun', 'Pontault-Combault'] },
  { code: '78', nom: 'Yvelines', slug: 'yvelines', villes: ['Versailles', 'Sartrouville', 'Mantes-la-Jolie', 'Poissy'] },
  { code: '91', nom: 'Essonne', slug: 'essonne', villes: ['Évry-Courcouronnes', 'Massy', 'Corbeil-Essonnes', 'Savigny-sur-Orge'] },
  { code: '95', nom: "Val-d'Oise", slug: 'val-d-oise', villes: ['Argenteuil', 'Cergy', 'Sarcelles', 'Garges-lès-Gonesse'] },
];

/**
 * Formules - TODO : noms, contenu, durée, prix à valider (voir docs/BUSINESS_MODEL.md).
 * Les prix sont des placeholders, à ne pas afficher comme définitifs.
 */
export interface Formule {
  id: string;
  nom: string;
  description: string;
  inclus: string[];
  duree: string;
  prix: string; // TODO
  recurrent: boolean;
  populaire?: boolean;
}

export const FORMULES: Formule[] = [
  {
    id: 'decouverte',
    nom: 'Audit Découverte',
    description: 'Premier diagnostic pour faire le point sur vos pratiques.', // TODO valider
    inclus: ['Visite sur place', 'Contrôle des points essentiels', 'Synthèse des priorités'],
    duree: 'TODO',
    prix: 'TODO',
    recurrent: false,
  },
  {
    id: 'complet',
    nom: 'Audit Complet',
    description: 'Audit approfondi sur l’ensemble des thèmes réglementaires.', // TODO valider
    inclus: ['Visite sur place', 'Grille complète HACCP', 'Rapport PDF détaillé', 'Plan correctif', 'Cas critiques signalés'],
    duree: 'TODO',
    prix: 'TODO',
    recurrent: false,
    populaire: true,
  },
  {
    id: 'abonnement',
    nom: 'Auto-contrôle mensuel',
    description: 'Suivi régulier pour maintenir votre conformité dans le temps.', // TODO valider
    inclus: ['Audits récurrents', 'Suivi du plan correctif', 'Rappels automatiques', 'Historique par établissement'],
    duree: 'récurrent',
    prix: 'TODO',
    recurrent: true,
  },
];
