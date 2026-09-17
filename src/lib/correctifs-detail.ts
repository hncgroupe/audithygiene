/**
 * Ce qu'il faut faire, en détail, pour chaque point de la grille.
 *
 * SQUELETTE À VALIDER (rule methodology-guard). Le `correctif` de la grille dit
 * quoi faire en une phrase ; ici on dit comment le faire, avec quoi, et ce qu'il
 * faut garder comme preuve. Rien de tout cela n'est une obligation chiffrée :
 * ce sont des façons de faire courantes, à confirmer par le client ou l'expert
 * avant d'être présentées comme la méthode de la maison.
 *
 * Aucune marque, aucun fournisseur, aucun prix : le matériel est nommé par sa
 * fonction, le restaurateur choisit ce qu'il veut.
 */

export interface CorrectifDetail {
  /** Les gestes à faire, dans l'ordre. */
  etapes: string[];
  /** Ce qu'il faut acheter ou avoir sous la main. Vide si rien à acheter. */
  materiel?: string[];
  /** Ce qui prouvera, plus tard, que le point a été traité. */
  preuve?: string;
}

export const CORRECTIFS_DETAIL: Record<string, CorrectifDetail> = {
  /* ------------------------------------------------------- Chaîne du froid */
  'FROID-01': {
    etapes: [
      'Relever la température de chaque enceinte positive, afficheur et sonde indépendante.',
      'Baisser le thermostat, dégager les grilles de ventilation, ne pas surcharger.',
      'Contrôler le joint de porte : s’il ne retient plus une feuille de papier, le remplacer.',
      'Recontrôler après 24 h. Si la température ne redescend pas, appeler le frigoriste.',
    ],
    materiel: ['Thermomètre sonde étalonné', 'Joints de porte de rechange'],
    preuve: 'Deux relevés datés, avant et après correction.',
  },
  'FROID-02': {
    etapes: [
      'Vérifier la température à cœur d’un produit témoin, pas seulement l’afficheur.',
      'Dégivrer si la couche de givre dépasse quelques millimètres.',
      'Abaisser la consigne et limiter les ouvertures en regroupant les sorties.',
      'Écarter et tracer la destruction de tout produit ayant commencé à décongeler.',
    ],
    materiel: ['Thermomètre sonde', 'Sacs et étiquettes pour la mise à l’écart'],
    preuve: 'Relevé de température après dégivrage, bon de destruction s’il y a eu perte.',
  },
  'FROID-03': {
    etapes: [
      'Imprimer une feuille de relevé par enceinte, ou activer l’enregistrement automatique.',
      'Fixer la fréquence dans le plan de maîtrise sanitaire, puis s’y tenir.',
      'Désigner qui relève, matin et soir, et faire signer.',
      'Classer les feuilles par mois dans le classeur sanitaire.',
    ],
    materiel: ['Feuilles de relevé ou enregistreurs de température', 'Classeur sanitaire'],
    preuve: 'Le classeur avec les relevés signés depuis la date de l’audit.',
  },
  'FROID-04': {
    etapes: [
      'Décongeler uniquement en enceinte froide, jamais à l’air libre ni sous l’eau.',
      'Étiqueter chaque produit sorti du congélateur avec la date et l’heure de sortie.',
      'Fixer la durée de vie après décongélation dans le plan de maîtrise sanitaire.',
      'Ne jamais recongeler un produit décongelé, et tracer les destructions.',
    ],
    materiel: ['Étiquettes de décongélation', 'Bac de récupération des jus'],
    preuve: 'Photos de produits étiquetés en décongélation, procédure écrite.',
  },

  /* -------------------------------------------------- Températures & cuisson */
  'TEMP-01': {
    etapes: [
      'Sonder à cœur les pièces les plus épaisses, en fin de cuisson.',
      'Écrire les couples temps et température retenus par plat dans le plan de maîtrise sanitaire.',
      'Former le cuisinier au bon usage de la sonde, et à sa désinfection entre deux mesures.',
    ],
    materiel: ['Sonde à cœur', 'Lingettes désinfectantes pour sonde'],
    preuve: 'Fiche de cuisson remplie sur une semaine.',
  },
  'TEMP-02': {
    etapes: [
      'Arrêter tout refroidissement à l’air libre en cuisine.',
      'Refroidir en cellule, ou par une méthode écrite et validée dans le plan de maîtrise sanitaire.',
      'Fractionner en petites portions et couvrir dès la fin du refroidissement.',
      'Noter l’heure de début, l’heure de fin et la température atteinte.',
    ],
    materiel: ['Cellule de refroidissement rapide', 'Bacs plats de faible hauteur', 'Sonde à cœur'],
    preuve: 'Fiches de refroidissement avec heures et températures.',
  },
  'TEMP-03': {
    etapes: [
      'Remettre en température en une fois, sans passage prolongé en zone tiède.',
      'Vérifier la température à cœur avant d’envoyer en salle.',
      'Écrire la consigne et l’afficher au poste concerné.',
    ],
    materiel: ['Matériel de remise en température adapté au volume', 'Sonde à cœur'],
    preuve: 'Consigne affichée et relevés de remise en température.',
  },
  'TEMP-04': {
    etapes: [
      'Contrôler l’état du bain avant le service, à froid puis à chaud.',
      'Filtrer chaque jour, vidanger dès que le bain fonce, fume ou mousse.',
      'Noter chaque contrôle et chaque vidange sur une fiche de suivi de friteuse.',
      'Nettoyer la cuve et les paniers au changement d’huile.',
    ],
    materiel: ['Bandelettes ou testeur d’huile de friture', 'Filtre à huile', 'Fiche de suivi friteuse'],
    preuve: 'Fiche de suivi de friteuse renseignée sur un mois.',
  },

  /* ------------------------------------------------------- Traçabilité & DLC */
  'TRAC-01': {
    etapes: [
      'Retirer immédiatement les produits dont la date est dépassée et tracer la destruction.',
      'Étiqueter tout produit entamé avec la date d’ouverture et la durée de vie retenue.',
      'Contrôler les dates à chaque réception et une fois par semaine en réserve.',
    ],
    materiel: ['Rouleaux d’étiquettes de datage', 'Marqueur indélébile'],
    preuve: 'Photos de produits étiquetés, registre des destructions.',
  },
  'TRAC-02': {
    etapes: [
      'Conserver les étiquettes des produits d’origine animale au moins le temps de leur consommation.',
      'Agrafer les étiquettes sur une feuille datée, ou les photographier et les classer.',
      'Garder les bons de livraison avec les étiquettes.',
    ],
    materiel: ['Classeur de traçabilité', 'Pochettes plastiques'],
    preuve: 'Le classeur de traçabilité du mois en cours.',
  },

  /* --------------------------------------------------- Hygiène du personnel */
  'PERS-01': {
    etapes: [
      'Fournir des tenues propres en nombre suffisant, changées chaque jour.',
      'Interdire les tenues de ville en zone de production, prévoir un vestiaire séparé.',
      'Couvrir les cheveux et retirer bijoux et montres avant le service.',
    ],
    materiel: ['Vestes et tabliers de cuisine', 'Charlottes', 'Casier ou vestiaire'],
    preuve: 'Photo des vestiaires et de la dotation de tenues.',
  },
  'PERS-02': {
    etapes: [
      'Remettre en service le lave-mains, avec eau chaude, savon et essuie-mains à usage unique.',
      'Le réserver au lavage des mains, jamais à la plonge ni au rinçage des légumes.',
      'Afficher la méthode de lavage au-dessus du poste.',
      'Rappeler les moments de lavage obligatoires à l’équipe.',
    ],
    materiel: [
      'Savon bactéricide',
      'Essuie-mains à usage unique',
      'Commande fémorale ou non manuelle',
      'Affiche de lavage des mains',
    ],
    preuve: 'Photo du poste de lavage complet et en service.',
  },
  'PERS-03': {
    etapes: [
      'Faire suivre une formation hygiène à au moins une personne de l’équipe.',
      'Organiser un rappel interne pour les autres, sur les gestes du poste.',
      'Conserver les attestations dans le classeur sanitaire.',
    ],
    materiel: ['Inscription à une formation hygiène alimentaire'],
    preuve: 'Attestations de formation au nom de l’établissement.',
  },

  /* ------------------------------------------------- Nettoyage & désinfection */
  'NETT-01': {
    etapes: [
      'Écrire le plan de nettoyage : quoi, qui, quand, avec quel produit et à quelle dilution.',
      'L’afficher en cuisine, à hauteur des yeux.',
      'Reprendre les zones oubliées : dessous et arrières de matériel, siphons, joints.',
      'Faire signer le plan chaque jour par la personne qui nettoie.',
    ],
    materiel: ['Plan de nettoyage imprimé et plastifié', 'Produits adaptés aux surfaces alimentaires'],
    preuve: 'Le plan affiché et signé sur deux semaines.',
  },
  'NETT-02': {
    etapes: [
      'Stocker les produits d’entretien dans un local ou une armoire séparée des denrées.',
      'Garder les produits dans leur emballage d’origine, jamais dans une bouteille alimentaire.',
      'Respecter les dilutions indiquées et le temps de contact.',
      'Tenir les fiches de données de sécurité à disposition.',
    ],
    materiel: ['Armoire ou local produits', 'Doseur ou centrale de dilution'],
    preuve: 'Photo du rangement et fiches de données de sécurité classées.',
  },
  'NETT-03': {
    etapes: [
      'Mettre en place une fiche de suivi datée et signée par zone.',
      'Vérifier le remplissage une fois par semaine.',
      'Classer les fiches avec les relevés de température.',
    ],
    materiel: ['Fiches de suivi de nettoyage', 'Classeur sanitaire'],
    preuve: 'Fiches remplies et signées depuis la date de l’audit.',
  },

  /* ----------------------------------------------- Lutte contre les nuisibles */
  'NUIS-01': {
    etapes: [
      'Faire établir un plan de lutte par une société spécialisée, avec plan des appâts.',
      'Conserver les rapports de passage dans le classeur sanitaire.',
      'Vérifier les postes d’appâtage entre deux passages.',
    ],
    materiel: ['Contrat de dératisation et désinsectisation', 'Plan de pose des appâts'],
    preuve: 'Contrat et derniers rapports de passage.',
  },
  'NUIS-02': {
    etapes: [
      'Faire intervenir en urgence une société spécialisée.',
      'Écarter et détruire les denrées exposées, tracer la destruction.',
      'Boucher les points d’entrée : bas de portes, gaines, siphons, fenêtres sans moustiquaire.',
      'Nettoyer à fond les zones touchées et recontrôler après intervention.',
    ],
    materiel: ['Intervention de désinsectisation', 'Bas de porte, grilles, moustiquaires'],
    preuve: 'Rapport d’intervention et photos après traitement.',
  },

  /* ---------------------------------------------- Stockage & marche en avant */
  'STOCK-01': {
    etapes: [
      'Séparer physiquement le cru du prêt à manger, par enceinte ou par étage.',
      'Ranger le prêt à manger en haut, les crus bruts en bas.',
      'Dédier planches et couteaux par usage, couleurs différentes si possible.',
      'Nettoyer et désinfecter les plans entre deux préparations.',
    ],
    materiel: ['Planches de couleurs', 'Bacs gastronormes avec couvercles', 'Étagères supplémentaires'],
    preuve: 'Photo des enceintes rangées dans le bon ordre.',
  },
  'STOCK-02': {
    etapes: [
      'Sortir tout ce qui est posé à même le sol, poser sur étagères ou palettes.',
      'Appliquer le premier entré, premier sorti à chaque réception.',
      'Dégager un passage et laisser un espace derrière les étagères pour le nettoyage.',
    ],
    materiel: ['Étagères inox ou rayonnage alimentaire', 'Bacs de rangement fermés'],
    preuve: 'Photo de la réserve après rangement.',
  },

  /* -------------------------------------------------- Locaux & équipements */
  'LOC-01': {
    etapes: [
      'Reprendre les surfaces abîmées : carrelage fissuré, joints noircis, peinture écaillée.',
      'Remettre en état ce qui empêche un nettoyage correct, en priorité.',
      'Planifier les travaux qui demandent une fermeture sur une période creuse.',
    ],
    materiel: ['Joints et carrelage de remplacement', 'Peinture lessivable alimentaire'],
    preuve: 'Photos avant et après travaux, facture de l’artisan.',
  },
  'LOC-02': {
    etapes: [
      'Remplacer les matériaux poreux ou fissurés en contact avec les denrées.',
      'Vérifier que les plans de travail et les bacs sont lisses et nettoyables.',
      'Écarter le matériel qui ne peut plus être désinfecté.',
    ],
    materiel: ['Plans de travail inox', 'Bacs et contenants de qualité alimentaire'],
    preuve: 'Photos du matériel remplacé, factures.',
  },

  /* ---------------------------------------------------- Gestion des déchets */
  'DECH-01': {
    etapes: [
      'Équiper la cuisine de poubelles à couvercle et à commande non manuelle.',
      'Sortir les déchets à chaque service, sans traverser une zone propre.',
      'Nettoyer et désinfecter les poubelles après chaque vidage.',
    ],
    materiel: ['Poubelles à pédale avec couvercle', 'Sacs adaptés'],
    preuve: 'Photo des poubelles en place et fiche de nettoyage.',
  },
  'DECH-02': {
    etapes: [
      'Nettoyer le local poubelles et le désinfecter.',
      'Le tenir fermé, ventilé et éloigné des zones de production.',
      'Prévoir un point d’eau pour le lavage des bacs.',
    ],
    materiel: ['Nettoyant désinfectant', 'Fermeture du local'],
    preuve: 'Photo du local après remise en état.',
  },

  /* ------------------------------------------- Plan de Maîtrise Sanitaire */
  'PMS-01': {
    etapes: [
      'Rédiger le plan de maîtrise sanitaire adapté à l’activité : bonnes pratiques, analyse des dangers, traçabilité.',
      'Le faire connaître à l’équipe et le tenir accessible en cuisine.',
      'Le relire à chaque changement de carte, de matériel ou d’organisation.',
    ],
    materiel: ['Classeur du plan de maîtrise sanitaire', 'Guide de bonnes pratiques du secteur'],
    preuve: 'Le plan de maîtrise sanitaire daté, consultable sur place.',
  },
  'PMS-02': {
    etapes: [
      'Définir quels autocontrôles sont faits, par qui et à quelle fréquence.',
      'Les réaliser et les noter, même quand tout est conforme.',
      'Traiter et noter chaque anomalie, avec l’action corrective prise.',
    ],
    materiel: ['Fiches d’autocontrôle', 'Thermomètre sonde'],
    preuve: 'Fiches d’autocontrôle remplies depuis la date de l’audit.',
  },

  /* ------------------------------------------------------------ Allergènes */
  'ALL-01': {
    etapes: [
      'Établir la liste des allergènes plat par plat, à partir des recettes et des étiquettes fournisseurs.',
      'Informer le consommateur, par la carte ou par un document consultable sur place.',
      'Mettre à jour à chaque changement de recette ou de fournisseur.',
    ],
    materiel: ['Classeur allergènes', 'Étiquettes fournisseurs conservées'],
    preuve: 'Le document allergènes à jour, montrable en salle.',
  },
  'ALL-02': {
    etapes: [
      'Dédier du matériel et un plan de travail aux préparations sans allergène.',
      'Organiser la production : les préparations à risque en dernier, sur plan nettoyé.',
      'Former l’équipe à répondre à une question client sans improviser.',
    ],
    materiel: ['Ustensiles dédiés, repérés par une couleur', 'Bacs fermés pour le stockage séparé'],
    preuve: 'Photo du matériel dédié et procédure écrite.',
  },

  /* ---------------------------------------------------------- Eau & glace */
  'EAU-01': {
    etapes: [
      'Entretenir et détartrer la machine à glaçons selon la notice.',
      'Nettoyer le bac et la pelle à glaçons, ranger la pelle hors du bac.',
      'Faire contrôler l’eau en cas de doute, et garder le résultat.',
    ],
    materiel: ['Produit de détartrage alimentaire', 'Pelle à glaçons avec support'],
    preuve: 'Fiche d’entretien de la machine et résultat d’analyse s’il y en a eu un.',
  },
};

/** Retrouve le détail d'un point, suffixe d'ajout compris. */
export function detailCorrectif(code: string): CorrectifDetail | undefined {
  return CORRECTIFS_DETAIL[code] ?? CORRECTIFS_DETAIL[code.replace(/-[A-Z0-9]{4}$/, '')];
}
