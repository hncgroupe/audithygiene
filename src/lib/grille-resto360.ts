/**
 * Grille auditresto360 - audit 360 du restaurant.
 * 10 piliers, chacun noté sur 100. Chaque critère est noté de 1 à 5.
 * Score d'un pilier = (somme des notes / (nombre de critères notés x 5)) x 100.
 * Le pilier "Dirigeant" repose sur des questions ouvertes (non noté au radar).
 *
 * Chaque critère porte :
 *  - label : intitulé court ;
 *  - aide  : une ligne « ce qu'on doit voir » (repère terrain pour l'auditeur) ;
 *  - checklist (optionnel) : sous-points à cocher au fur et à mesure. Ce qui
 *    reste décoché peut être basculé dans la note (= ce qui manque).
 *
 * Source : cadrage client (spec auditresto360). Structure validée par le client.
 */

export type NoteResto = 1 | 2 | 3 | 4 | 5;

/** Échelle de notation auditresto360 (1 à 5), avec libellé et couleur. */
export const NOTATION_RESTO = [
  { note: 5, label: 'Excellent', couleur: '#16A34A' },
  { note: 4, label: 'Conforme', couleur: '#22C55E' },
  { note: 3, label: 'À améliorer', couleur: '#EAB308' },
  { note: 2, label: 'Non conforme', couleur: '#F97316' },
  { note: 1, label: 'Critique', couleur: '#DC2626' },
] as const;

/** Un critère noté : intitulé + repère terrain + checklist optionnelle. */
export interface CritereResto {
  label: string;
  /** Une ligne : ce que l'auditeur doit voir / vérifier. */
  aide: string;
  /** Sous-points à cocher. Les décochés = ce qui manque (à basculer en note). */
  checklist?: string[];
}

/** On accepte string (legacy) ou objet enrichi. */
export type CritereInput = string | CritereResto;

export function critereLabel(c: CritereInput): string {
  return typeof c === 'string' ? c : c.label;
}
export function critereAide(c: CritereInput): string {
  return typeof c === 'string' ? '' : c.aide ?? '';
}
export function critereChecklist(c: CritereInput): string[] | undefined {
  return typeof c === 'string' ? undefined : c.checklist;
}

export interface GroupeResto {
  nom: string;
  /** Libellés des critères, notés chacun de 1 à 5. */
  criteres: CritereInput[];
}

export interface PilierResto {
  /** Code court stable (P1...P10). */
  code: string;
  /** Numéro d'affichage. */
  numero: number;
  /** Nom complet du pilier. */
  nom: string;
  /** Libellé court pour le radar. */
  radar: string;
  /** Sous-groupes de critères. Vide si pilier à questions ouvertes. */
  groupes: GroupeResto[];
  /** Questions ouvertes (pilier Dirigeant). Non noté. */
  questionsOuvertes?: string[];
  /** true si le pilier entre dans le radar et le score global. */
  noteAuRadar: boolean;
}

export const GRILLE_RESTO360_VERSION = 'v2';

const c = (label: string, aide: string, checklist?: string[]): CritereResto => ({
  label,
  aide,
  ...(checklist ? { checklist } : {}),
});

export const GRILLE_RESTO360: PilierResto[] = [
  {
    code: 'P1',
    numero: 1,
    nom: 'Accueil & expérience client',
    radar: 'Expérience client',
    noteAuRadar: true,
    groupes: [
      {
        nom: 'Extérieur',
        criteres: [
          c('Enseigne propre', 'Enseigne lisible, allumée, sans saleté ni élément cassé.'),
          c('Vitrine propre', 'Vitres nettoyées, sans traces, affichage à jour et ordonné.'),
          c('Terrasse propre', 'Sol, tables et chaises propres, mobilier en bon état.'),
          c('Accessibilité', 'Entrée dégagée, accès PMR (Personne à Mobilité Réduite) possible.'),
          c('Signalétique', 'Horaires, menu et nom du restaurant visibles depuis la rue.'),
        ],
      },
      {
        nom: 'Salle',
        criteres: [
          c('Propreté générale', 'Sols, tables, banquettes et sanitaires propres.'),
          c('Température', 'Salle ni trop chaude ni trop froide, confort thermique correct.'),
          c('Ambiance sonore', 'Niveau sonore et musique adaptés au type de service.'),
          c('Éclairage', 'Éclairage suffisant et homogène, aucune ampoule grillée.'),
          c('Mobilier', 'Tables et chaises stables, propres, sans usure marquée.'),
        ],
      },
      {
        nom: 'Service',
        criteres: [
          c('Accueil client', 'Client accueilli rapidement, salué, orienté vers une table.'),
          c("Temps d'attente", 'Prise de commande et envoi des plats dans des délais raisonnables.'),
          c('Présentation des équipes', 'Personnel identifiable, posture professionnelle.'),
          c('Tenue vestimentaire', 'Tenue propre, adaptée, cohérente avec l\'image du lieu.'),
          c('Qualité du service', 'Service attentif, conseils, suivi de table jusqu\'à l\'addition.'),
        ],
      },
    ],
  },
  {
    code: 'P2',
    numero: 2,
    nom: 'Cuisine',
    radar: 'Cuisine',
    noteAuRadar: true,
    groupes: [
      {
        nom: 'Organisation',
        criteres: [
          c('Organisation des postes', 'Chaque poste est défini, équipé et tenu propre.'),
          c('Ergonomie', 'Distances de travail courtes, matériel à portée de main.'),
          c('Circulation', 'Marche en avant respectée, pas de croisement propre / sale.'),
          c('Gestion des rushs', 'Mise en place suffisante pour absorber le coup de feu.'),
          c('Répartition des tâches', 'Rôles clairs, personne en surcharge ou inactif.'),
        ],
      },
      {
        nom: 'Production',
        criteres: [
          c('Anticipation', 'Préparations lancées à l\'avance, pas de production à chaud.'),
          c('Plan de préparation', 'Liste de mise en place suivie et à jour.'),
          c('Respect des recettes', 'Plats conformes à la fiche technique du restaurant.'),
          c('Respect des grammages', 'Portions pesées ou calibrées, régulières d\'une assiette à l\'autre.'),
          c('Présentation des plats', 'Dressage soigné, conforme au standard de la maison.'),
        ],
      },
      {
        nom: 'Management',
        criteres: [
          c('Leadership du chef', 'Le chef pilote le service, donne le tempo et corrige.'),
          c('Communication', 'Annonces claires entre cuisine et salle (le « passe »).'),
          c('Réactivité', 'Aléas (retour, erreur, rupture) traités vite et calmement.'),
          c('Contrôle qualité', 'Goût et dressage vérifiés avant l\'envoi en salle.'),
        ],
      },
    ],
  },
  {
    code: 'P3',
    numero: 3,
    nom: 'Réserve',
    radar: 'Réserve',
    noteAuRadar: true,
    groupes: [
      {
        nom: 'Organisation',
        criteres: [
          c('Stockage logique', 'Produits rangés par famille, faciles à retrouver.'),
          c('Identification', 'Contenants étiquetés (nom + date), aucun produit anonyme.'),
          c('Décartonnage', 'Cartons retirés avant entrée en zone de stockage.'),
          c('Rotation FIFO (Premier Entré, Premier Sorti)', 'Les plus anciens devant, consommés en premier.'),
          c('DLC (Date Limite de Consommation) visibles', 'Dates lisibles sans manipuler chaque produit, aucun produit périmé.'),
        ],
      },
      {
        nom: 'Sécurité',
        criteres: [
          c('Produits au sol', 'Rien stocké à même le sol, tout sur étagère ou palette.'),
          c('Produits chimiques séparés', 'Détergents isolés des denrées, zone dédiée et fermée.'),
          c('Emballages bien rangés', 'Pas d\'encombrement, emballages vides évacués.'),
          c('Circulation libre', 'Allées dégagées, accès aux étagères et aux issues possible.'),
        ],
      },
      {
        nom: 'Hygiène',
        criteres: [
          c('Sol propre', 'Sol balayé et lavé, sans déchet ni écoulement.'),
          c('Murs propres', 'Murs et plinthes sans projection ni moisissure.'),
          c('Rayonnages propres', 'Étagères nettoyées, sans résidu collant ni poussière.'),
          c('Absence de nuisibles', 'Aucune trace (déjections, rongé), pièges en place.'),
        ],
      },
    ],
  },
  {
    code: 'P4',
    numero: 4,
    nom: 'HACCP & conformité',
    radar: 'HACCP',
    noteAuRadar: true,
    groupes: [
      {
        nom: 'Températures',
        criteres: [
          c('Chambres froides', 'Froid positif entre 0 et 3 °C, relevés tracés.'),
          c('Congélateurs', 'Froid négatif à -18 °C ou moins, pas de givre excessif.'),
          c('Produits chauds', 'Maintien au chaud à 63 °C minimum jusqu\'au service.'),
        ],
      },
      {
        nom: 'Traçabilité',
        criteres: [
          c('DLC (Date Limite de Consommation)', 'Produits frais dans leur date, aucun dépassement.'),
          c('DDM (Date de Durabilité Minimale)', 'Anciennes DLUO, contrôlées, produits encore exploitables.'),
          c('Étiquetage', 'Préparations maison datées (fabrication + limite de consommation).'),
          c('Ouvertures des produits', 'Date d\'ouverture notée, délai d\'utilisation après ouverture respecté.'),
        ],
      },
      {
        nom: 'Nettoyage',
        criteres: [
          c('Plan de nettoyage', 'Plan affiché : quoi, qui, quand, avec quel produit.'),
          c('Respect', 'Fréquences réellement tenues, fiches de suivi remplies.'),
          c('Matériel', 'Produits homologués, dosés, matériel de nettoyage propre et rangé.'),
        ],
      },
      {
        nom: 'Documents',
        criteres: [
          c('PMS (Plan de Maîtrise Sanitaire)', 'Classeur PMS présent, complet et à jour.'),
          c(
            'Affichages obligatoires',
            'Vérifier la présence de tous les affichages réglementaires en salle et cuisine.',
            [
              'Interdiction de fumer',
              'Interdiction de vapoter',
              'Information allergènes à disposition',
              'Origine des viandes',
              'Prix affichés (carte / menu)',
              'Mention « fait maison » si concerné',
              'Licence débit de boissons (si alcool)',
              'Consignes de sécurité / plan d\'évacuation',
              'Coordonnées de réclamation / médiateur',
            ]
          ),
          c('Registre HACCP', 'Relevés de température, nettoyage, huiles, réceptions consignés.'),
          c('Plan de lutte nuisibles', 'Contrat dératisation / désinsectisation et plan des appâts.'),
        ],
      },
    ],
  },
  {
    code: 'P5',
    numero: 5,
    nom: 'Ressources humaines',
    radar: 'RH',
    noteAuRadar: true,
    groupes: [
      {
        nom: 'Organisation',
        criteres: [
          c('Répartition des équipes', 'Effectif réparti selon les services, rôles attribués.'),
          c('Effectifs adaptés', 'Nombre de personnes cohérent avec l\'activité réelle.'),
        ],
      },
      {
        nom: 'Management',
        criteres: [
          c('Communication', 'Consignes passées clairement, équipe informée des priorités.'),
          c('Briefs', 'Brief avant service (plats du jour, ruptures, objectifs).'),
          c('Contrôle', 'Le responsable suit le travail et recadre si besoin.'),
        ],
      },
      {
        nom: 'Formation',
        criteres: [
          c('Intégration', 'Nouveaux accompagnés, parcours d\'arrivée structuré.'),
          c('HACCP (méthode d\'analyse des dangers)', 'Au moins une personne formée hygiène alimentaire (attestation).'),
          c('Polyvalence', 'Plusieurs personnes capables de tenir un même poste.'),
        ],
      },
      {
        nom: 'Climat',
        criteres: [
          c('Cohésion', 'Entente d\'équipe visible, entraide pendant le service.'),
          c('Motivation', 'Implication et énergie du personnel.'),
          c('Implication', 'Initiative, soin du détail, appropriation du lieu.'),
        ],
      },
      {
        nom: 'Cadre social & terrain',
        criteres: [
          c(
            'Gestion sociale & plannings',
            'Vérifier le suivi RH concret : plannings, tenues, social et contrats.',
            [
              'Planning communiqué à l\'avance',
              'Tenue d\'équipe fournie',
              'Vestiaire dédié au personnel',
              'Nettoyage des tenues assuré',
              'Temps de pause respecté',
              'Contrats de travail signés',
              'DPAE (Déclaration Préalable À l\'Embauche) effectuée',
              'Journée test / procédure d\'essai cadrée',
            ]
          ),
        ],
      },
    ],
  },
  {
    code: 'P6',
    numero: 6,
    nom: 'Performance opérationnelle',
    radar: 'Performance',
    noteAuRadar: true,
    groupes: [
      {
        nom: 'Productivité',
        criteres: [
          c('Temps de production', 'Délai d\'envoi des plats maîtrisé, sans goulot.'),
          c('Temps morts', 'Peu d\'attente improductive entre les tâches.'),
          c('Déplacements inutiles', 'Postes agencés pour limiter les allers-retours.'),
        ],
      },
      {
        nom: 'Organisation',
        criteres: [
          c('Fluidité', 'Le service s\'enchaîne sans à-coups ni embouteillage.'),
          c('Coordination', 'Cuisine et salle synchronisées sur le rythme des envois.'),
          c('Anticipation', 'Mise en place et réassorts prévus avant le rush.'),
        ],
      },
      {
        nom: 'Qualité',
        criteres: [
          c('Contrôle avant envoi', 'Chaque assiette vérifiée au passe avant de partir.'),
          c('Gestion des erreurs', 'Retours et erreurs traités vite, sans tension.'),
        ],
      },
    ],
  },
  {
    code: 'P7',
    numero: 7,
    nom: 'Gestion',
    radar: 'Gestion',
    noteAuRadar: true,
    groupes: [
      {
        nom: 'Stocks',
        criteres: [
          c('Inventaires', 'Inventaires réguliers, datés et exploités.'),
          c('Fiabilité', 'Stock théorique proche du stock réel.'),
          c('Ruptures', 'Peu de ruptures en service, réassort anticipé.'),
        ],
      },
      {
        nom: 'Achats',
        criteres: [
          c('Fournisseurs', 'Fournisseurs identifiés, agréés, comparés sur le prix.'),
          c('Commandes', 'Commandes calées sur les besoins réels, sans surstock.'),
          c('Fréquence', 'Rythme de livraison adapté à la rotation des produits.'),
        ],
      },
      {
        nom: 'Food Cost (coût matière)',
        criteres: [
          c('Respect des portions', 'Grammages tenus pour maîtriser le coût par plat.'),
          c('Gaspillage', 'Pertes et jetés limités, restes valorisés.'),
          c('Coût matière', 'Ratio coût matière / chiffre d\'affaires suivi et sous contrôle.'),
        ],
      },
    ],
  },
  {
    code: 'P8',
    numero: 8,
    nom: 'Développement commercial',
    radar: 'Commercial',
    noteAuRadar: true,
    groupes: [
      {
        nom: 'Carte',
        criteres: [
          c('Lisibilité', 'Carte claire, structurée, facile à lire pour le client.'),
          c('Cohérence', 'Offre cohérente avec le positionnement et la cible.'),
          c('Rentabilité', 'Plats à forte marge mis en avant, carte raisonnée.'),
        ],
      },
      {
        nom: 'Plateformes (Uber Eats, Deliveroo, Just Eat)',
        criteres: [
          c('Photos', 'Visuels nets, appétissants, à jour sur chaque plateforme.'),
          c('Menus', 'Cartes en ligne complètes et synchronisées avec la salle.'),
          c('Descriptions', 'Descriptifs vendeurs, allergènes et options indiqués.'),
          c('Upselling (vente additionnelle)', 'Suppléments, menus et boissons proposés en ligne.'),
        ],
      },
      {
        nom: 'Expérience',
        criteres: [
          c('Ticket moyen', 'Niveau de panier moyen suivi et travaillé.'),
          c('Menus', 'Formules et menus qui augmentent le panier.'),
          c('Offres', 'Offres et temps forts pour relancer la fréquentation.'),
        ],
      },
    ],
  },
  {
    code: 'P9',
    numero: 9,
    nom: 'Outils',
    radar: 'Outils',
    noteAuRadar: true,
    groupes: [
      {
        nom: 'Logiciels',
        criteres: [
          c('Caisse', 'Système de caisse conforme et réellement utilisé.'),
          c('Stocks', 'Outil de gestion de stock en place et tenu à jour.'),
          c('HACCP (méthode d\'analyse des dangers)', 'Relevés hygiène digitalisés ou classeur tenu rigoureusement.'),
          c('Planning', 'Outil de planning du personnel utilisé.'),
        ],
      },
      {
        nom: 'Pilotage',
        criteres: [
          c('Tableaux de bord', 'Suivi d\'activité visible (CA, couverts, marge).'),
          c('KPI (indicateurs clés de performance)', 'Indicateurs définis et suivis dans le temps.'),
          c('Reporting', 'Points réguliers chiffrés pour décider.'),
        ],
      },
    ],
  },
  {
    code: 'P10',
    numero: 10,
    nom: 'Dirigeant',
    radar: 'Dirigeant',
    noteAuRadar: false,
    groupes: [],
    questionsOuvertes: [
      'Quels sont vos 3 principaux problèmes ?',
      'Quelles sont vos priorités ?',
      'Quels sont vos objectifs ?',
      'Que souhaiteriez-vous améliorer ?',
      'Quels sont vos freins ?',
    ],
  },
];

/** Identifiant stable d'un critère : code-pilier . index-groupe . index-critère. */
export function critereId(pilierCode: string, groupeIndex: number, critereIndex: number): string {
  return `${pilierCode}-${groupeIndex + 1}-${critereIndex + 1}`;
}

/** Nombre total de critères notés (hors questions ouvertes). */
export function totalCriteres(): number {
  return GRILLE_RESTO360.reduce(
    (acc, p) => acc + p.groupes.reduce((a, g) => a + g.criteres.length, 0),
    0
  );
}

/** Score d'un pilier sur 100 à partir des notes (1 à 5) de ses critères. */
export function scorePilier(notes: Record<string, NoteResto | undefined>, pilier: PilierResto): number | null {
  const ids: string[] = [];
  pilier.groupes.forEach((g, gi) => g.criteres.forEach((_, ci) => ids.push(critereId(pilier.code, gi, ci))));
  const valeurs = ids.map((id) => notes[id]).filter((n): n is NoteResto => Boolean(n));
  if (valeurs.length === 0) return null;
  const somme = valeurs.reduce((a, n) => a + n, 0);
  return Math.round((somme / (valeurs.length * 5)) * 100);
}

/** Score global sur 100 : moyenne des piliers notés au radar. */
export function scoreGlobalResto(notes: Record<string, NoteResto | undefined>): number | null {
  const scores = GRILLE_RESTO360.filter((p) => p.noteAuRadar)
    .map((p) => scorePilier(notes, p))
    .filter((s): s is number => s !== null);
  if (scores.length === 0) return null;
  return Math.round(scores.reduce((a, s) => a + s, 0) / scores.length);
}
