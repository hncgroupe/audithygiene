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

/** France - zone de couverture. Villes prioritaires (à enrichir). */
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
  prix: string;
  recurrent: boolean;
  populaire?: boolean;
}

export const FORMULES: Formule[] = [
  {
    id: 'essentiel',
    nom: 'Audit Essentiel',
    description: "L'état des lieux complet de votre hygiène, sur les 27 points de la grille.",
    inclus: [
      'Visite sur place, environ 2 h',
      'Les 27 points de contrôle, 12 thèmes',
      'Chaque écart photographié',
      'Note globale et note par thème',
      "Rapport PDF avec plan d'action priorisé",
      'Pour chaque écart : le correctif attendu et la preuve à constituer',
    ],
    duree: 'environ 2 h sur place',
    prix: '490 € HT',
    recurrent: false,
  },
  {
    id: 'conformite',
    nom: 'Audit Conformité',
    description:
      "L'hygiène et l'affichage réunis : deux administrations contrôlent, deux risques à couvrir.",
    inclus: [
      "Tout l'Audit Essentiel, soit les 27 points d'hygiène",
      '17 points de plus : prix, allergènes, origine des viandes, mentions, affichages en salle',
      'Les documents examinés un par un : PMS, relevés, traçabilité, plan de nettoyage',
      'Visite sur place, environ 3 h 30',
      'Rapport PDF détaillé, les deux volets notés séparément',
      "Plan d'action priorisé, avec la preuve attendue pour chaque point",
    ],
    duree: 'environ 3 h 30 sur place',
    prix: '890 € HT',
    recurrent: false,
    populaire: true,
  },
];
