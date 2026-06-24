/**
 * Note : les textes conforme/nonConforme des critères opérationnels (sans base
 * réglementaire `regle`) sont des repères terrain à faire valider par
 * l'expert/client avant usage en production (rule methodology-guard). Seuls les
 * critères portant une `regle` sourçable sont traités comme « critiques ».
 *
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

/** Repère de conformité : pourquoi c'est conforme / non conforme + base de règle. */
export interface CritereInfo {
  /** Ce qui rend le point conforme. */
  conforme: string;
  /** Ce qui le rend non conforme. */
  nonConforme: string;
  /** Base réglementaire (sourçable). */
  regle?: string;
}

/** Un critère noté : intitulé + repère terrain + checklist + info conformité. */
export interface CritereResto {
  label: string;
  /** Une ligne : ce que l'auditeur doit voir / vérifier. */
  aide: string;
  /** Sous-points à cocher. Les décochés = ce qui manque (à basculer en note). */
  checklist?: string[];
  /** Bulle d'information conformité (icône i). */
  info?: CritereInfo;
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
export function critereInfo(c: CritereInput): CritereInfo | undefined {
  return typeof c === 'string' ? undefined : c.info;
}

/** Résout un critereId (P4-2-1...) vers son thème / groupe / intitulé via la grille. */
export function resolveCritere(
  id: string
): { theme: string; groupe: string; intitule: string } | null {
  for (const p of GRILLE_RESTO360) {
    for (let gi = 0; gi < p.groupes.length; gi++) {
      const g = p.groupes[gi];
      for (let ci = 0; ci < g.criteres.length; ci++) {
        if (critereId(p.code, gi, ci) === id) {
          return { theme: p.nom, groupe: g.nom, intitule: critereLabel(g.criteres[ci]) };
        }
      }
    }
  }
  return null;
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

export const GRILLE_RESTO360_VERSION = 'v3';

const c = (
  label: string,
  aide: string,
  checklist?: string[],
  info?: CritereInfo
): CritereResto => ({
  label,
  aide,
  ...(checklist ? { checklist } : {}),
  ...(info ? { info } : {}),
});

const GRILLE_RESTO360_RAW: PilierResto[] = [
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
          c('Enseigne propre', 'Enseigne lisible, allumée, sans saleté ni élément cassé.', undefined, {
            conforme: 'Enseigne lisible et allumée, propre, sans lettre cassée ni partie qui pend.',
            nonConforme: 'Enseigne sale, éteinte, partiellement illisible ou abîmée.',
          }),
          c('Vitrine propre', 'Vitres nettoyées, sans traces, affichage à jour et ordonné.', undefined, {
            conforme: 'Vitres nettoyées sans traces, affichage rangé et à jour (horaires, menu).',
            nonConforme: 'Vitres sales ou pleines de traces, affichage dépassé ou en désordre.',
          }),
          c('Terrasse propre', 'Sol, tables et chaises propres, mobilier en bon état.', undefined, {
            conforme: 'Sol balayé, tables et chaises propres, mobilier stable et en bon état.',
            nonConforme: 'Sol sale, mobilier taché, cassé ou bancal sur la terrasse.',
          }),
          c('Accessibilité', 'Entrée dégagée, accès PMR (Personne à Mobilité Réduite) possible.', undefined, {
            conforme: 'Entrée dégagée et accès possible pour une personne à mobilité réduite.',
            nonConforme: 'Entrée encombrée ou marche/obstacle qui bloque l\'accès PMR.',
          }),
          c('Signalétique', 'Horaires, menu et nom du restaurant visibles depuis la rue.', undefined, {
            conforme: 'Nom, horaires et menu visibles et lisibles depuis la rue.',
            nonConforme: 'Horaires, menu ou nom du restaurant absents ou illisibles depuis l\'extérieur.',
          }),
        ],
      },
      {
        nom: 'Salle',
        criteres: [
          c('Propreté générale', 'Sols, tables, banquettes et sanitaires propres.', undefined, {
            conforme: 'Sols, tables, banquettes et sanitaires propres et entretenus.',
            nonConforme: 'Sol collant, tables non essuyées, banquettes tachées ou sanitaires sales.',
          }),
          c('Température', 'Salle ni trop chaude ni trop froide, confort thermique correct.', undefined, {
            conforme: 'Salle à une température agréable, ni étouffante ni glaciale.',
            nonConforme: 'Salle trop chaude ou trop froide, inconfort thermique pour les clients.',
          }),
          c('Ambiance sonore', 'Niveau sonore et musique adaptés au type de service.', undefined, {
            conforme: 'Niveau sonore et musique adaptés, on peut converser sans forcer la voix.',
            nonConforme: 'Musique trop forte ou bruit ambiant qui gêne la conversation.',
          }),
          c('Éclairage', 'Éclairage suffisant et homogène, aucune ampoule grillée.', undefined, {
            conforme: 'Éclairage suffisant et homogène, aucune ampoule grillée.',
            nonConforme: 'Zones dans le noir, lumière inégale ou ampoules hors service.',
          }),
          c('Mobilier', 'Tables et chaises stables, propres, sans usure marquée.', undefined, {
            conforme: 'Tables et chaises stables, propres et sans usure marquée.',
            nonConforme: 'Mobilier bancal, abîmé ou visiblement usé.',
          }),
        ],
      },
      {
        nom: 'Service',
        criteres: [
          c('Accueil client', 'Client accueilli rapidement, salué, orienté vers une table.', undefined, {
            conforme: 'Client salué et pris en charge rapidement, orienté vers une table.',
            nonConforme: 'Client qui attend sans être accueilli, ni salué ni orienté.',
          }),
          c("Temps d'attente", 'Prise de commande et envoi des plats dans des délais raisonnables.', undefined, {
            conforme: 'Prise de commande et envoi des plats dans des délais raisonnables.',
            nonConforme: 'Attente excessive pour commander ou pour être servi.',
          }),
          c('Présentation des équipes', 'Personnel identifiable, posture professionnelle.', undefined, {
            conforme: 'Personnel identifiable et posture professionnelle face au client.',
            nonConforme: 'Personnel difficile à repérer ou attitude négligée en salle.',
          }),
          c('Tenue vestimentaire', 'Tenue propre, adaptée, cohérente avec l\'image du lieu.', undefined, {
            conforme: 'Tenue propre, adaptée au service et cohérente avec l\'image du lieu.',
            nonConforme: 'Tenue sale, négligée ou inadaptée au type de restaurant.',
          }),
          c('Qualité du service', 'Service attentif, conseils, suivi de table jusqu\'à l\'addition.', undefined, {
            conforme: 'Service attentif : conseils, suivi de table et accompagnement jusqu\'à l\'addition.',
            nonConforme: 'Service expédié, sans suivi de table ni attention au client.',
          }),
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
          c('Organisation des postes', 'Chaque poste est défini, équipé et tenu propre.', undefined, {
            conforme: 'Chaque poste est défini, équipé du nécessaire et tenu propre.',
            nonConforme: 'Postes mal délimités, matériel qui manque ou plan de travail en désordre.',
          }),
          c('Ergonomie', 'Distances de travail courtes, matériel à portée de main.', undefined, {
            conforme: 'Matériel à portée de main, déplacements courts pour travailler.',
            nonConforme: 'Trajets longs et répétés pour aller chercher le matériel.',
          }),
          c('Circulation', 'Marche en avant respectée, pas de croisement propre / sale.', undefined, {
            conforme: 'Marche en avant respectée : le propre et le sale ne se croisent pas.',
            nonConforme: 'Croisement des flux propre et sale, risque de contamination en cuisine.',
          }),
          c('Gestion des rushs', 'Mise en place suffisante pour absorber le coup de feu.', undefined, {
            conforme: 'Mise en place suffisante pour tenir le coup de feu sans décrocher.',
            nonConforme: 'Mise en place insuffisante, la cuisine est débordée au rush.',
          }),
          c('Répartition des tâches', 'Rôles clairs, personne en surcharge ou inactif.', undefined, {
            conforme: 'Rôles clairs et charge équilibrée, personne surchargé ni inactif.',
            nonConforme: 'Rôles flous, une personne débordée pendant qu\'une autre attend.',
          }),
        ],
      },
      {
        nom: 'Production',
        criteres: [
          c('Anticipation', 'Préparations lancées à l\'avance, pas de production à chaud.', undefined, {
            conforme: 'Préparations lancées à l\'avance, pas de production faite dans l\'urgence.',
            nonConforme: 'Tout préparé à la minute pendant le service, dans la précipitation.',
          }),
          c('Plan de préparation', 'Liste de mise en place suivie et à jour.', undefined, {
            conforme: 'Liste de mise en place écrite, suivie et tenue à jour.',
            nonConforme: 'Pas de liste de mise en place, organisation de mémoire.',
          }),
          c('Respect des recettes', 'Plats conformes à la fiche technique du restaurant.', undefined, {
            conforme: 'Plats préparés conformément aux fiches techniques du restaurant.',
            nonConforme: 'Recettes faites au jugé, résultat variable d\'une fois à l\'autre.',
          }),
          c('Respect des grammages', 'Portions pesées ou calibrées, régulières d\'une assiette à l\'autre.', undefined, {
            conforme: 'Portions pesées ou calibrées, régulières d\'une assiette à l\'autre.',
            nonConforme: 'Portions « à la louche », quantités qui varient selon qui dresse.',
          }),
          c('Présentation des plats', 'Dressage soigné, conforme au standard de la maison.', undefined, {
            conforme: 'Dressage soigné et conforme au standard de présentation de la maison.',
            nonConforme: 'Dressage négligé ou différent d\'une assiette à l\'autre.',
          }),
          c('Fiches recettes / fiches techniques', 'Existence de fiches recettes (grammages, étapes, coût) réellement utilisées.', undefined, {
            conforme: 'Fiches recettes existantes (grammages, étapes, coût) et réellement utilisées.',
            nonConforme: 'Aucune fiche recette, ou des fiches qui ne servent jamais.',
          }),
        ],
      },
      {
        nom: 'Management',
        criteres: [
          c('Leadership du chef', 'Le chef pilote le service, donne le tempo et corrige.', undefined, {
            conforme: 'Le chef pilote le service, donne le tempo et corrige au fil de l\'eau.',
            nonConforme: 'Service sans pilote clair, chacun avance sans cadence commune.',
          }),
          c('Communication', 'Annonces claires entre cuisine et salle (le « passe »).', undefined, {
            conforme: 'Annonces claires au passe entre cuisine et salle, tout le monde suit.',
            nonConforme: 'Communication confuse au passe, plats oubliés ou envoyés en désordre.',
          }),
          c('Réactivité', 'Aléas (retour, erreur, rupture) traités vite et calmement.', undefined, {
            conforme: 'Aléas (retour, erreur, rupture) traités vite et sans panique.',
            nonConforme: 'Le moindre imprévu fait perdre le contrôle du service.',
          }),
          c('Contrôle qualité', 'Goût et dressage vérifiés avant l\'envoi en salle.', undefined, {
            conforme: 'Goût et dressage vérifiés au passe avant l\'envoi en salle.',
            nonConforme: 'Plats envoyés sans contrôle, défauts découverts par le client.',
          }),
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
          c('Stockage logique', 'Produits rangés par famille, faciles à retrouver.', undefined, {
            conforme: 'Produits rangés par famille, faciles à localiser dans la réserve.',
            nonConforme: 'Rangement au hasard, produits difficiles à retrouver.',
          }),
          c('Identification', 'Contenants étiquetés (nom + date), aucun produit anonyme.', undefined, {
            conforme: 'Contenants étiquetés (nom et date), aucun produit anonyme.',
            nonConforme: 'Contenants sans étiquette, impossible de savoir quoi et depuis quand.',
          }),
          c('Décartonnage', 'Cartons retirés avant entrée en zone de stockage.', undefined, {
            conforme: 'Cartons retirés avant l\'entrée des produits en zone de stockage.',
            nonConforme: 'Cartons de livraison gardés en réserve, risque de souillure et de nuisibles.',
          }),
          c('Rotation FIFO (Premier Entré, Premier Sorti)', 'Les plus anciens devant, consommés en premier.', undefined, {
            conforme: 'Produits les plus anciens placés devant et consommés en premier.',
            nonConforme: 'Nouveaux produits posés devant, les anciens oubliés au fond.',
          }),
          c('DLC (Date Limite de Consommation) visibles', 'Dates lisibles sans manipuler chaque produit, aucun produit périmé.', undefined, {
            conforme: 'Dates lisibles d\'un coup d\'œil et aucun produit périmé en rayon.',
            nonConforme: 'Dates cachées ou effacées, présence de produits périmés.',
          }),
        ],
      },
      {
        nom: 'Sécurité',
        criteres: [
          c('Produits au sol', 'Rien stocké à même le sol, tout sur étagère ou palette.', undefined, {
            conforme: 'Tout est sur étagère ou palette, rien posé directement à même le sol.',
            nonConforme: 'Denrées ou cartons stockés à même le sol.',
          }),
          c('Produits chimiques séparés', 'Détergents isolés des denrées, zone dédiée et fermée.', undefined, {
            conforme: 'Détergents et désinfectants stockés à l\'écart des denrées, dans une zone ou un local dédié.',
            nonConforme: 'Produits chimiques au-dessus, à côté ou mélangés aux aliments.',
            regle: 'Règlement CE 852/2004, annexe II.',
          }),
          c('Emballages bien rangés', 'Pas d\'encombrement, emballages vides évacués.', undefined, {
            conforme: 'Réserve sans encombrement, emballages vides évacués régulièrement.',
            nonConforme: 'Emballages vides entassés qui encombrent la réserve.',
          }),
          c('Circulation libre', 'Allées dégagées, accès aux étagères et aux issues possible.', undefined, {
            conforme: 'Allées dégagées, accès aux étagères et aux issues de secours possible.',
            nonConforme: 'Allées encombrées qui bloquent l\'accès aux étagères ou aux issues.',
          }),
        ],
      },
      {
        nom: 'Hygiène',
        criteres: [
          c('Sol propre', 'Sol balayé et lavé, sans déchet ni écoulement.', undefined, {
            conforme: 'Sol de réserve balayé et lavé, sans déchet ni écoulement.',
            nonConforme: 'Sol sale, déchets au sol ou liquide qui stagne.',
          }),
          c('Murs propres', 'Murs et plinthes sans projection ni moisissure.', undefined, {
            conforme: 'Murs et plinthes propres, sans projection ni moisissure.',
            nonConforme: 'Murs tachés, traces de projections ou moisissure visible.',
          }),
          c('Rayonnages propres', 'Étagères nettoyées, sans résidu collant ni poussière.', undefined, {
            conforme: 'Étagères nettoyées, sans résidu collant ni poussière.',
            nonConforme: 'Étagères poussiéreuses ou avec des résidus collants.',
          }),
          c('Absence de nuisibles', 'Aucune trace (déjections, rongé), pièges en place.', undefined, {
            conforme: 'Aucune trace de nuisibles (déjections, emballages rongés), pièges en place.',
            nonConforme: 'Traces de rongeurs ou d\'insectes, dispositifs de lutte absents.',
          }),
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
          c('Chambres froides', 'Froid positif entre 0 et 3 °C, relevés tracés.', undefined, {
            conforme: 'Denrées réfrigérées à +3 °C ou moins (ou la température de l\'étiquette), relevés notés 1 à 2 fois par jour.',
            nonConforme: 'Température au-dessus de +4 °C, sonde en panne, aucun relevé tracé.',
            regle: 'Paquet hygiène (Règlement CE 852/2004) et arrêté du 21/12/2009 sur les températures.',
          }),
          c('Congélateurs', 'Froid négatif à -18 °C ou moins, pas de givre excessif.', undefined, {
            conforme: 'Produits congelés à -18 °C ou plus froid, chaîne du froid jamais rompue.',
            nonConforme: 'Température au-dessus de -18 °C, givre épais, produits recongelés.',
            regle: 'Arrêté du 21/12/2009.',
          }),
          c('Produits chauds', 'Maintien au chaud à 63 °C minimum jusqu\'au service.', undefined, {
            conforme: 'Maintien au chaud à +63 °C minimum jusqu\'au service.',
            nonConforme: 'Plats sous +63 °C hors service, stationnement prolongé entre +10 et +63 °C.',
            regle: 'Arrêté du 21/12/2009.',
          }),
        ],
      },
      {
        nom: 'Traçabilité',
        criteres: [
          c('DLC (Date Limite de Consommation)', 'Produits frais dans leur date, aucun dépassement.', undefined, {
            conforme: 'Aucun produit dépassé, DLC lisibles, produits périmés retirés.',
            nonConforme: 'Produit utilisé après sa DLC, dates effacées ou illisibles.',
            regle: 'Règlement INCO (UE) 1169/2011, Règlement CE 852/2004.',
          }),
          c('DDM (Date de Durabilité Minimale)', 'Anciennes DLUO, contrôlées, produits encore exploitables.', undefined, {
            conforme: 'DDM dépassée tolérée seulement si la qualité est vérifiée et le produit sain.',
            nonConforme: 'Produit altéré conservé, confusion entre DDM et DLC.',
            regle: 'Règlement INCO (UE) 1169/2011.',
          }),
          c('Étiquetage', 'Préparations maison datées (fabrication + limite de consommation).', undefined, {
            conforme: 'Chaque préparation maison porte la date de fabrication et la date limite d\'utilisation.',
            nonConforme: 'Contenants non datés, impossible de tracer la fabrication.',
            regle: 'Règlement CE 852/2004 (traçabilité interne).',
          }),
          c('Ouvertures des produits', 'Date d\'ouverture notée, délai d\'utilisation après ouverture respecté.', undefined, {
            conforme: 'Date d\'ouverture notée, délai après ouverture respecté (J+3 type, selon produit).',
            nonConforme: 'Produit entamé non daté, conservé au-delà du délai.',
            regle: 'Bonnes pratiques d\'hygiène, Règlement CE 852/2004.',
          }),
        ],
      },
      {
        nom: 'Nettoyage',
        criteres: [
          c('Plan de nettoyage', 'Plan affiché : quoi, qui, quand, avec quel produit.', undefined, {
            conforme: 'Plan de nettoyage affiché et clair : quoi nettoyer, qui, quand et avec quel produit.',
            nonConforme: 'Pas de plan de nettoyage, ou un plan jamais affiché ni suivi.',
          }),
          c('Respect', 'Fréquences réellement tenues, fiches de suivi remplies.', undefined, {
            conforme: 'Fréquences de nettoyage réellement tenues, fiches de suivi remplies au fur et à mesure.',
            nonConforme: 'Fréquences non tenues ou fiches de suivi vides, remplies après coup.',
          }),
          c('Matériel', 'Produits homologués, dosés, matériel de nettoyage propre et rangé.', undefined, {
            conforme: 'Produits homologués et dosés correctement, matériel de nettoyage propre et rangé.',
            nonConforme: 'Produits inadaptés ou mal dosés, matériel de nettoyage sale ou en vrac.',
          }),
        ],
      },
      {
        nom: 'Documents',
        criteres: [
          c('PMS (Plan de Maîtrise Sanitaire)', 'Classeur PMS présent, complet et à jour.', undefined, {
            conforme: 'Classeur PMS présent et à jour : analyse des dangers, bonnes pratiques d\'hygiène, traçabilité, plan de nettoyage.',
            nonConforme: 'Pas de PMS, classeur vide ou jamais mis à jour.',
            regle: 'Règlement CE 852/2004 (plan de maîtrise sanitaire fondé sur les principes HACCP).',
          }),
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
            ],
            {
              conforme: 'Tous les affichages réglementaires sont présents, lisibles et à jour (voir checklist).',
              nonConforme: 'Affichage manquant : interdiction de fumer, prix, allergènes ou origine des viandes.',
              regle: 'Code de la consommation, Règlement INCO 1169/2011 (allergènes), décret 2006-1386 (tabac), décret 2002-1465 (origine des viandes).',
            }
          ),
          c('Registre HACCP', 'Relevés de température, nettoyage, huiles, réceptions consignés.', undefined, {
            conforme: 'Relevés de température, nettoyage, huiles de friture et réceptions consignés et tenus à jour.',
            nonConforme: 'Pas de relevés, fiches vierges ou remplies a posteriori.',
            regle: 'Règlement CE 852/2004 (autocontrôles).',
          }),
          c('Plan de lutte nuisibles', 'Contrat dératisation / désinsectisation et plan des appâts.', undefined, {
            conforme: 'Contrat de dératisation/désinsectisation, plan des appâts et passages tracés.',
            nonConforme: 'Aucun dispositif, traces de nuisibles, plan absent.',
            regle: 'Règlement CE 852/2004 (lutte contre les nuisibles).',
          }),
        ],
      },
      {
        nom: 'Stockage au froid (organisation)',
        criteres: [
          c(
            'Rangement des denrées au froid',
            'Ordre du frigo : prêt à consommer en haut, viandes/poissons crus en bas.',
            undefined,
            {
              conforme: 'Produits prêts à consommer et cuits en haut, viandes et poissons crus en bas, légumes séparés ; rien à même le sol ; cru et cuit jamais en contact.',
              nonConforme: 'Viande crue au-dessus de produits prêts à consommer, mélange cru/cuit, jus qui s\'écoule sur d\'autres denrées.',
              regle: 'Principe de non contamination croisée, Règlement CE 852/2004 (annexe II) ; bonnes pratiques GBPH.',
            }
          ),
          c('Stockage viande & volaille', 'Viande hachée ≤ +2 °C, volaille ≤ +4 °C, séparées et emballées.', undefined, {
            conforme: 'Viande hachée à +2 °C maximum, volaille à +4 °C maximum, emballées, datées et séparées du prêt à consommer.',
            nonConforme: 'Viande à température trop haute, au contact d\'autres aliments, non datée.',
            regle: 'Arrêté du 21/12/2009 (températures par catégorie de denrée).',
          }),
          c('Stockage poisson & produits de la mer', 'Poisson frais sur glace fondante, 0 à +2 °C.', undefined, {
            conforme: 'Poisson frais sous glace ou à 0-2 °C, eau de fonte évacuée, fraîcheur vérifiée (œil, branchies, odeur).',
            nonConforme: 'Poisson hors glace, température trop haute, eau de fonte stagnante.',
            regle: 'Règlement CE 853/2004 (produits de la pêche), arrêté du 21/12/2009.',
          }),
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
          c('Répartition des équipes', 'Effectif réparti selon les services, rôles attribués.', undefined, {
            conforme: 'Effectif réparti selon les services, chacun avec un rôle attribué.',
            nonConforme: 'Répartition floue, personne ne sait clairement qui fait quoi.',
          }),
          c('Effectifs adaptés', 'Nombre de personnes cohérent avec l\'activité réelle.', undefined, {
            conforme: 'Nombre de personnes cohérent avec l\'activité réelle du service.',
            nonConforme: 'Trop ou pas assez de personnel par rapport à la charge réelle.',
          }),
        ],
      },
      {
        nom: 'Management',
        criteres: [
          c('Communication', 'Consignes passées clairement, équipe informée des priorités.', undefined, {
            conforme: 'Consignes passées clairement, équipe informée des priorités du service.',
            nonConforme: 'Consignes floues ou non transmises, équipe qui découvre au dernier moment.',
          }),
          c('Briefs', 'Brief avant service (plats du jour, ruptures, objectifs).', undefined, {
            conforme: 'Brief tenu avant le service : plats du jour, ruptures et objectifs partagés.',
            nonConforme: 'Aucun brief avant le service, chacun démarre sans les infos clés.',
          }),
          c('Contrôle', 'Le responsable suit le travail et recadre si besoin.', undefined, {
            conforme: 'Le responsable suit le travail pendant le service et recadre si besoin.',
            nonConforme: 'Aucun suivi du travail, les écarts ne sont jamais repris.',
          }),
        ],
      },
      {
        nom: 'Formation',
        criteres: [
          c('Intégration', 'Nouveaux accompagnés, parcours d\'arrivée structuré.', undefined, {
            conforme: 'Nouveaux arrivants accompagnés avec un parcours d\'arrivée structuré.',
            nonConforme: 'Nouveaux laissés livrés à eux-mêmes, sans accompagnement.',
          }),
          c('HACCP (méthode d\'analyse des dangers)', 'Au moins une personne formée hygiène alimentaire (attestation).', undefined, {
            conforme: 'Au moins une personne formée à l\'hygiène alimentaire, attestation à l\'appui.',
            nonConforme: 'Personne de formé à l\'hygiène alimentaire, aucune attestation disponible.',
          }),
          c('Polyvalence', 'Plusieurs personnes capables de tenir un même poste.', undefined, {
            conforme: 'Plusieurs personnes capables de tenir un même poste en cas d\'absence.',
            nonConforme: 'Un seul sachant par poste, tout s\'arrête s\'il est absent.',
          }),
        ],
      },
      {
        nom: 'Climat',
        criteres: [
          c('Cohésion', 'Entente d\'équipe visible, entraide pendant le service.', undefined, {
            conforme: 'Bonne entente visible et entraide réelle pendant le service.',
            nonConforme: 'Tensions dans l\'équipe ou chacun pour soi pendant le service.',
          }),
          c('Motivation', 'Implication et énergie du personnel.', undefined, {
            conforme: 'Personnel impliqué et énergique pendant le service.',
            nonConforme: 'Personnel passif ou démotivé, énergie en berne.',
          }),
          c('Implication', 'Initiative, soin du détail, appropriation du lieu.', undefined, {
            conforme: 'Équipe qui prend des initiatives, soigne les détails et s\'approprie le lieu.',
            nonConforme: 'Aucune initiative, détails négligés, personne ne se sent concerné.',
          }),
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
            ],
            {
              conforme: 'Suivi RH en place : plannings communiqués à l\'avance, tenues fournies et entretenues, vestiaire dédié, pauses respectées, contrats signés (voir checklist).',
              nonConforme: 'Plannings de dernière minute, tenues ou vestiaire manquants, ou contrats et déclarations d\'embauche non réglés.',
            }
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
          c('Temps de production', 'Délai d\'envoi des plats maîtrisé, sans goulot.', undefined, {
            conforme: 'Délai d\'envoi des plats maîtrisé, sans goulot d\'étranglement.',
            nonConforme: 'Plats qui tardent à sortir, un poste qui bloque toute la chaîne.',
          }),
          c('Temps morts', 'Peu d\'attente improductive entre les tâches.', undefined, {
            conforme: 'Peu de temps morts, l\'activité s\'enchaîne sans attente inutile.',
            nonConforme: 'Beaucoup d\'attente improductive entre les tâches.',
          }),
          c('Déplacements inutiles', 'Postes agencés pour limiter les allers-retours.', undefined, {
            conforme: 'Postes agencés pour limiter les allers-retours pendant le service.',
            nonConforme: 'Trajets répétés et inutiles à cause d\'un agencement mal pensé.',
          }),
        ],
      },
      {
        nom: 'Organisation',
        criteres: [
          c('Fluidité', 'Le service s\'enchaîne sans à-coups ni embouteillage.', undefined, {
            conforme: 'Service fluide qui s\'enchaîne sans à-coups ni embouteillage.',
            nonConforme: 'Service haché, avec des embouteillages au passe ou en salle.',
          }),
          c('Coordination', 'Cuisine et salle synchronisées sur le rythme des envois.', undefined, {
            conforme: 'Cuisine et salle synchronisées sur le rythme des envois.',
            nonConforme: 'Cuisine et salle désynchronisées, plats prêts mais non servis (ou l\'inverse).',
          }),
          c('Anticipation', 'Mise en place et réassorts prévus avant le rush.', undefined, {
            conforme: 'Mise en place et réassorts prévus avant le rush.',
            nonConforme: 'Réassorts faits en pleine charge, mise en place prise de court.',
          }),
        ],
      },
      {
        nom: 'Qualité',
        criteres: [
          c('Contrôle avant envoi', 'Chaque assiette vérifiée au passe avant de partir.', undefined, {
            conforme: 'Chaque assiette vérifiée au passe avant de partir en salle.',
            nonConforme: 'Assiettes envoyées sans contrôle, défauts vus par le client.',
          }),
          c('Gestion des erreurs', 'Retours et erreurs traités vite, sans tension.', undefined, {
            conforme: 'Retours et erreurs traités vite et sans tension.',
            nonConforme: 'Erreurs mal gérées, qui s\'accumulent ou créent des tensions.',
          }),
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
          c('Inventaires', 'Inventaires réguliers, datés et exploités.', undefined, {
            conforme: 'Inventaires réalisés régulièrement, datés et réellement exploités.',
            nonConforme: 'Inventaires rares, non datés ou jamais utilisés pour décider.',
          }),
          c('Fiabilité', 'Stock théorique proche du stock réel.', undefined, {
            conforme: 'Stock théorique proche du stock réellement compté.',
            nonConforme: 'Gros écarts entre le stock affiché et le stock réel.',
          }),
          c('Ruptures', 'Peu de ruptures en service, réassort anticipé.', undefined, {
            conforme: 'Peu de ruptures en service, réassort anticipé.',
            nonConforme: 'Ruptures fréquentes en plein service faute d\'anticipation.',
          }),
        ],
      },
      {
        nom: 'Achats',
        criteres: [
          c('Fournisseurs', 'Fournisseurs identifiés, agréés, comparés sur le prix.', undefined, {
            conforme: 'Fournisseurs identifiés et agréés, comparés sur les prix.',
            nonConforme: 'Fournisseurs non identifiés ou jamais comparés, aucun suivi.',
          }),
          c('Commandes', 'Commandes calées sur les besoins réels, sans surstock.', undefined, {
            conforme: 'Commandes calées sur les besoins réels, sans surstock.',
            nonConforme: 'Commandes au jugé qui créent du surstock ou des manques.',
          }),
          c('Fréquence', 'Rythme de livraison adapté à la rotation des produits.', undefined, {
            conforme: 'Rythme de livraison adapté à la rotation des produits.',
            nonConforme: 'Livraisons mal cadencées, produits livrés trop tôt ou trop tard.',
          }),
        ],
      },
      {
        nom: 'Food Cost (coût matière)',
        criteres: [
          c('Respect des portions', 'Grammages tenus pour maîtriser le coût par plat.', undefined, {
            conforme: 'Grammages tenus, ce qui maîtrise le coût matière par plat.',
            nonConforme: 'Portions non tenues, coût par plat qui dérape.',
          }),
          c('Gaspillage', 'Pertes et jetés limités, restes valorisés.', undefined, {
            conforme: 'Pertes et jetés limités, restes valorisés quand c\'est possible.',
            nonConforme: 'Gaspillage important, produits jetés faute de gestion.',
          }),
          c('Coût matière', 'Ratio coût matière / chiffre d\'affaires suivi et sous contrôle.', undefined, {
            conforme: 'Ratio coût matière sur chiffre d\'affaires suivi et sous contrôle.',
            nonConforme: 'Coût matière non suivi, on ignore la marge réelle des plats.',
          }),
        ],
      },
      {
        nom: 'Caisse & clôtures',
        criteres: [
          c('Gestion du fond de caisse', 'Fond de caisse défini, compté en début et en fin de service.', undefined, {
            conforme: 'Fond de caisse défini et compté en début et en fin de service.',
            nonConforme: 'Fond de caisse jamais compté, montant flou d\'un service à l\'autre.',
          }),
          c('Clôtures de caisse', 'Clôture quotidienne, écarts justifiés, ticket Z conservé.', undefined, {
            conforme: 'Clôture quotidienne, écarts justifiés et ticket Z conservé.',
            nonConforme: 'Pas de clôture quotidienne, écarts non expliqués, tickets Z manquants.',
          }),
          c('Organisation des encaissements', 'Procédure claire : enveloppes préparées, remises en banque tracées.', undefined, {
            conforme: 'Procédure claire d\'encaissement : enveloppes préparées, remises en banque tracées.',
            nonConforme: 'Encaissements peu cadrés, remises en banque non tracées.',
          }),
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
          c('Lisibilité', 'Carte claire, structurée, facile à lire pour le client.', undefined, {
            conforme: 'Carte claire et structurée, facile à lire pour le client.',
            nonConforme: 'Carte confuse, surchargée ou difficile à parcourir.',
          }),
          c('Cohérence', 'Offre cohérente avec le positionnement et la cible.', undefined, {
            conforme: 'Offre cohérente avec le positionnement du restaurant et sa clientèle.',
            nonConforme: 'Carte décalée du positionnement ou de la cible visée.',
          }),
          c('Rentabilité', 'Plats à forte marge mis en avant, carte raisonnée.', undefined, {
            conforme: 'Plats à forte marge mis en avant, carte raisonnée.',
            nonConforme: 'Carte non travaillée sur la marge, plats peu rentables en avant.',
          }),
        ],
      },
      {
        nom: 'Plateformes (Uber Eats, Deliveroo, Just Eat)',
        criteres: [
          c('Photos', 'Visuels nets, appétissants, à jour sur chaque plateforme.', undefined, {
            conforme: 'Visuels nets, appétissants et à jour sur chaque plateforme.',
            nonConforme: 'Photos floues, anciennes ou peu appétissantes en ligne.',
          }),
          c('Menus', 'Cartes en ligne complètes et synchronisées avec la salle.', undefined, {
            conforme: 'Cartes en ligne complètes et synchronisées avec la carte en salle.',
            nonConforme: 'Cartes en ligne incomplètes ou différentes de celle de la salle.',
          }),
          c('Descriptions', 'Descriptifs vendeurs, allergènes et options indiqués.', undefined, {
            conforme: 'Descriptifs vendeurs avec allergènes et options clairement indiqués.',
            nonConforme: 'Descriptions absentes ou pauvres, allergènes et options manquants.',
          }),
          c('Upselling (vente additionnelle)', 'Suppléments, menus et boissons proposés en ligne.', undefined, {
            conforme: 'Suppléments, menus et boissons proposés en ligne pour augmenter le panier.',
            nonConforme: 'Aucune vente additionnelle proposée en ligne.',
          }),
          c('Optimisation en ligne', 'Fiches Uber Eats / Deliveroo optimisées : photos, prix, disponibilité, avis suivis.', undefined, {
            conforme: 'Fiches Uber Eats / Deliveroo optimisées : photos, prix, disponibilité à jour et avis suivis.',
            nonConforme: 'Fiches plateformes négligées : prix ou disponibilités faux, avis sans réponse.',
          }),
        ],
      },
      {
        nom: 'Expérience',
        criteres: [
          c('Ticket moyen', 'Niveau de panier moyen suivi et travaillé.', undefined, {
            conforme: 'Niveau de panier moyen suivi dans le temps et travaillé activement.',
            nonConforme: 'Ticket moyen ni suivi ni travaillé, on subit le panier.',
          }),
          c('Menus', 'Formules et menus qui augmentent le panier.', undefined, {
            conforme: 'Formules et menus pensés pour augmenter le panier moyen.',
            nonConforme: 'Pas de formule ou de menu pour faire monter le panier.',
          }),
          c('Offres', 'Offres et temps forts pour relancer la fréquentation.', undefined, {
            conforme: 'Offres et temps forts utilisés pour relancer la fréquentation.',
            nonConforme: 'Aucune offre ni temps fort pour relancer la clientèle.',
          }),
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
          c('Caisse', 'Système de caisse conforme et réellement utilisé.', undefined, {
            conforme: 'Système de caisse conforme et réellement utilisé au quotidien.',
            nonConforme: 'Caisse non conforme ou contournée dans la pratique.',
          }),
          c('Stocks', 'Outil de gestion de stock en place et tenu à jour.', undefined, {
            conforme: 'Outil de gestion de stock en place et tenu à jour.',
            nonConforme: 'Aucun outil de stock, ou un outil installé mais jamais mis à jour.',
          }),
          c('HACCP (méthode d\'analyse des dangers)', 'Relevés hygiène digitalisés ou classeur tenu rigoureusement.', undefined, {
            conforme: 'Relevés hygiène digitalisés ou classeur tenu avec rigueur.',
            nonConforme: 'Relevés hygiène absents ou tenus de façon irrégulière.',
          }),
          c('Planning', 'Outil de planning du personnel utilisé.', undefined, {
            conforme: 'Outil de planning du personnel en place et utilisé.',
            nonConforme: 'Pas d\'outil de planning, organisation du personnel improvisée.',
          }),
        ],
      },
      {
        nom: 'Pilotage',
        criteres: [
          c('Tableaux de bord', 'Suivi d\'activité visible (CA, couverts, marge).', undefined, {
            conforme: 'Suivi d\'activité visible et tenu (chiffre d\'affaires, couverts, marge).',
            nonConforme: 'Aucun tableau de bord, activité pilotée au ressenti.',
          }),
          c('KPI (indicateurs clés de performance)', 'Indicateurs définis et suivis dans le temps.', undefined, {
            conforme: 'Indicateurs clés définis et suivis dans le temps.',
            nonConforme: 'Aucun indicateur défini, rien à comparer d\'une période à l\'autre.',
          }),
          c('Reporting', 'Points réguliers chiffrés pour décider.', undefined, {
            conforme: 'Points réguliers et chiffrés qui servent vraiment à décider.',
            nonConforme: 'Pas de point chiffré régulier, décisions prises sans données.',
          }),
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

/**
 * Le pilier Dirigeant (questions ouvertes, non noté) passe en PREMIÈRE étape du
 * parcours d'audit : on échange d'abord avec le dirigeant, puis on note les
 * piliers. Les codes des critères restent inchangés (basés sur le code pilier,
 * pas sur la position), donc les audits déjà en cours ne sont pas impactés.
 */
export const GRILLE_RESTO360: PilierResto[] = [
  ...GRILLE_RESTO360_RAW.filter((p) => !p.noteAuRadar),
  ...GRILLE_RESTO360_RAW.filter((p) => p.noteAuRadar),
];

/** Identifiant stable d'un critère : code-pilier . index-groupe . index-critère. */
export function critereId(pilierCode: string, groupeIndex: number, critereIndex: number): string {
  return `${pilierCode}-${groupeIndex + 1}-${critereIndex + 1}`;
}

/**
 * Un critère est « critique » seulement s'il porte une base réglementaire
 * sourçable (`regle`) : températures, traçabilité, PMS, affichages obligatoires,
 * stockage du cru, produits chimiques... Ces points sont notés plus sévèrement
 * et comptent double. Un critère opérationnel peut porter une explication
 * conforme/nonConforme (sans `regle`) pour aider le restaurateur, sans pour
 * autant devenir critique ni peser double dans la note.
 */
export function critereEstCritique(c: CritereInput): boolean {
  return critereInfo(c)?.regle != null;
}

/** Ensemble des identifiants de critères critiques (calculé une fois). */
export const CRITIQUE_IDS: ReadonlySet<string> = (() => {
  const s = new Set<string>();
  for (const p of GRILLE_RESTO360) {
    p.groupes.forEach((g, gi) =>
      g.criteres.forEach((cr, ci) => {
        if (critereEstCritique(cr)) s.add(critereId(p.code, gi, ci));
      })
    );
  }
  return s;
})();

/** Poids d'un critère dans la note du pilier : critique = 2, sinon 1. */
function poids(id: string): number {
  return CRITIQUE_IDS.has(id) ? 2 : 1;
}

/** Cas critiques relevés : critères critiques notés 1 ou 2. */
export function casCritiquesResto(
  notes: Record<string, NoteResto | undefined>
): { code: string; note: NoteResto }[] {
  const out: { code: string; note: NoteResto }[] = [];
  for (const id of CRITIQUE_IDS) {
    const n = notes[id];
    if (n === 1 || n === 2) out.push({ code: id, note: n });
  }
  return out;
}

/** Nombre total de critères notés (hors questions ouvertes). */
export function totalCriteres(): number {
  return GRILLE_RESTO360.reduce(
    (acc, p) => acc + p.groupes.reduce((a, g) => a + g.criteres.length, 0),
    0
  );
}

/**
 * Score d'un pilier sur 100. Moyenne pondérée des notes (1 à 5) : les critères
 * critiques (sanitaires/réglementaires) comptent double.
 */
export function scorePilier(notes: Record<string, NoteResto | undefined>, pilier: PilierResto): number | null {
  const ids: string[] = [];
  pilier.groupes.forEach((g, gi) => g.criteres.forEach((_, ci) => ids.push(critereId(pilier.code, gi, ci))));
  const notes_ = ids
    .map((id) => ({ id, n: notes[id] }))
    .filter((x): x is { id: string; n: NoteResto } => Boolean(x.n));
  if (notes_.length === 0) return null;
  const sommePond = notes_.reduce((a, x) => a + x.n * poids(x.id), 0);
  const poidsTotal = notes_.reduce((a, x) => a + poids(x.id), 0);
  return Math.round((sommePond / (poidsTotal * 5)) * 100);
}

/**
 * Score global sur 100, sévère sur les points critiques :
 *  - base = moyenne des piliers notés au radar ;
 *  - malus par cas critique : critère critique noté 1 = -6, noté 2 = -3 ;
 *  - si au moins un critère critique est noté 1, le score est plafonné à 49
 *    (« sous surveillance »).
 * Méthode documentée (rule methodology-guard).
 */
export function scoreGlobalResto(notes: Record<string, NoteResto | undefined>): number | null {
  const scores = GRILLE_RESTO360.filter((p) => p.noteAuRadar)
    .map((p) => scorePilier(notes, p))
    .filter((s): s is number => s !== null);
  if (scores.length === 0) return null;
  const base = scores.reduce((a, s) => a + s, 0) / scores.length;

  const cas = casCritiquesResto(notes);
  const malus = cas.reduce((a, x) => a + (x.note === 1 ? 6 : 3), 0);
  let score = Math.round(base - malus);
  if (cas.some((x) => x.note === 1)) score = Math.min(score, 49);
  return Math.max(0, Math.min(100, score));
}
