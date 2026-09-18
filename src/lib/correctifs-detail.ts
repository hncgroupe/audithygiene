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
  /** Ce que l'écart produit concrètement, en deux ou trois phrases. */
  consequence?: string;
  /** À quoi ressemble ce point quand il est tenu. */
  attendu?: string;
  /** Ce qu'il faut acheter ou avoir sous la main. Vide si rien à acheter. */
  materiel?: string[];
  /** Ce qui prouvera, plus tard, que le point a été traité. */
  preuve?: string;
}

export const CORRECTIFS_DETAIL: Record<string, CorrectifDetail> = {
  /* ------------------------------------------------------- Chaîne du froid */
  'FROID-01': {
    consequence:
      'Au-dessus des températures de conservation, les germes présents sur les denrées se multiplient d’heure en heure, sans que rien ne se voie ni ne se sente. Le produit garde son apparence normale alors que sa charge microbienne a déjà augmenté, et la durée de vie annoncée sur l’étiquette ne vaut plus.',
    attendu: 'Chaque enceinte positive tient sa température de consigne, porte fermée, en plein service.',
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
    consequence:
      'Un congélateur qui remonte fait décongeler la surface des produits, puis les regèle dès que la température redescend. Ce cycle abîme la denrée et permet aux germes de repartir à chaque passage. Le produit ne revient jamais à son état initial.',
    attendu: 'Les enceintes négatives tiennent leur consigne et rien n’y montre de trace de décongélation.',
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
    consequence:
      'Sans relevé écrit, rien ne prouve que le froid a été tenu entre deux visites. En cas de doute sur un produit ou de plainte d’un client, l’établissement n’a aucun élément à opposer, et la charge de la preuve se retourne contre lui.',
    attendu: 'Un relevé daté par enceinte, tenu chaque jour de service et conservé dans le classeur.',
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
    consequence:
      'Une décongélation à l’air libre ou dans l’évier laisse la surface du produit remonter en température pendant des heures, alors que le cœur est encore pris. C’est sur cette surface tiède et humide que les germes se développent le plus vite.',
    attendu: 'La décongélation se fait en enceinte froide, sur bac, produit couvert et daté.',
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
    consequence:
      'Une cuisson menée sans contrôle de la température à cœur laisse passer des produits insuffisamment cuits. Le danger porte surtout sur les viandes hachées, les volailles et les préparations à base d’œuf, où le germe se trouve dans toute la masse et pas seulement en surface.',
    attendu: 'Chaque cuisson sensible est contrôlée à cœur à la sonde, et la valeur est notée.',
    etapes: [
      'Sonder à cœur les pièces les plus épaisses, en fin de cuisson.',
      'Écrire les couples temps et température retenus par plat dans le plan de maîtrise sanitaire.',
      'Former le cuisinier au bon usage de la sonde, et à sa désinfection entre deux mesures.',
    ],
    materiel: ['Sonde à cœur', 'Lingettes désinfectantes pour sonde'],
    preuve: 'Fiche de cuisson remplie sur une semaine.',
  },
  'TEMP-02': {
    consequence:
      'Un refroidissement lent fait stagner la préparation dans la plage de température où les germes se multiplient le plus vite. Une marmite laissée à l’air libre y reste plusieurs heures : le produit sort de cette phase déjà chargé, quelle que soit la suite de la conservation.',
    attendu: 'Toute préparation chaude destinée au froid descend rapidement, couverte et datée.',
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
    consequence:
      'Une remise en température trop lente, ou répétée sur le même produit, ramène la préparation dans la zone à risque à chaque service. Le danger augmente à chaque passage, et plus rien ne permet de savoir combien de fois le produit a été réchauffé.',
    attendu: 'La remise en température se fait en une fois, contrôlée à cœur avant l’envoi.',
    etapes: [
      'Remettre en température en une fois, sans passage prolongé en zone tiède.',
      'Vérifier la température à cœur avant d’envoyer en salle.',
      'Écrire la consigne et l’afficher au poste concerné.',
    ],
    materiel: ['Matériel de remise en température adapté au volume', 'Sonde à cœur'],
    preuve: 'Consigne affichée et relevés de remise en température.',
  },
  'TEMP-04': {
    consequence:
      'Un bain de friture usé ne se repère pas seulement à sa couleur : il transmet aux aliments des composés issus de la dégradation de l’huile. Sans contrôle ni suivi de vidange, personne ne sait depuis combien de services le bain tourne.',
    attendu: 'L’état du bain est contrôlé avant le service, la vidange tracée sur une fiche de suivi.',
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
    consequence:
      'Sans date d’ouverture ni étiquetage lisible, la durée de vie d’un produit entamé n’est plus connue de personne. L’équipe travaille alors à l’estime, et un produit dépassé peut partir en service sans que rien ne l’arrête.',
    attendu: 'Chaque produit entamé porte sa date d’ouverture et sa durée de vie, de façon lisible.',
    etapes: [
      'Retirer immédiatement les produits dont la date est dépassée et tracer la destruction.',
      'Étiqueter tout produit entamé avec la date d’ouverture et la durée de vie retenue.',
      'Contrôler les dates à chaque réception et une fois par semaine en réserve.',
    ],
    materiel: ['Rouleaux d’étiquettes de datage', 'Marqueur indélébile'],
    preuve: 'Photos de produits étiquetés, registre des destructions.',
  },
  'TRAC-02': {
    consequence:
      'Sans étiquettes ni numéros de lot conservés, l’établissement ne peut pas dire d’où vient un produit. En cas de rappel ou de suspicion sur une denrée, impossible de savoir ce qui a été servi : le retrait porte alors sur tout le stock.',
    attendu: 'Les étiquettes des produits sensibles sont conservées et classées par date de réception.',
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
    consequence:
      'Une tenue de ville ou un vêtement de travail sale transporte en cuisine ce qui vient de l’extérieur et des zones souillées. Le contact avec les denrées se fait par le vêtement, les manches et les cheveux, sans que personne ne le remarque.',
    attendu: 'Tenue propre et dédiée, changée chaque jour, coiffe portée en zone de production.',
    etapes: [
      'Fournir des tenues propres en nombre suffisant, changées chaque jour.',
      'Interdire les tenues de ville en zone de production, prévoir un vestiaire séparé.',
      'Couvrir les cheveux et retirer bijoux et montres avant le service.',
    ],
    materiel: ['Vestes et tabliers de cuisine', 'Charlottes', 'Casier ou vestiaire'],
    preuve: 'Photo des vestiaires et de la dotation de tenues.',
  },
  'PERS-02': {
    consequence:
      'Le lavage des mains est la barrière la plus efficace contre les contaminations croisées, et la première à tomber quand le poste n’est pas équipé. Un lave-mains sans savon ni essuie-mains n’est pas utilisé, quelle que soit la bonne volonté de l’équipe.',
    attendu: 'Chaque lave-mains est approvisionné en savon et en essuie-mains à usage unique.',
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
    consequence:
      'Un personnel qui n’a pas été formé applique des règles qu’il n’a pas comprises, donc il les abandonne dès que le service s’accélère. Les écarts reviennent au même endroit après chaque correction tant que la formation n’est pas faite.',
    attendu: 'Le personnel qui manipule des denrées est formé, et les attestations sont conservées.',
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
    consequence:
      'Sans plan de nettoyage écrit, chacun nettoie ce qu’il voit, avec ce qu’il trouve. Les zones difficiles, siphons, dessous d’équipements, joints, passent à la trappe pendant des semaines et deviennent le réservoir permanent de la cuisine.',
    attendu: 'Un plan affiché dit quoi nettoyer, à quelle fréquence, avec quel produit et par qui.',
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
    consequence:
      'Un produit d’entretien stocké près des denrées ou transvasé dans un contenant alimentaire finit par se retrouver là où il ne faut pas. Le risque n’est plus microbien mais chimique, et il touche directement l’assiette.',
    attendu: 'Produits d’entretien rangés à part, dans leur contenant d’origine, dosage affiché.',
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
    consequence:
      'Un nettoyage non enregistré est un nettoyage qui ne peut pas être prouvé. Devant un contrôle ou après une plainte, l’établissement n’a rien à montrer, même quand le travail a bien été fait tous les jours.',
    attendu: 'Les fiches de nettoyage sont remplies, datées et signées par ceux qui ont fait le travail.',
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
    consequence:
      'Sans plan de lutte ni contrat, la présence de nuisibles ne se découvre qu’une fois l’installation faite. Les postes d’appâts et les passages ne sont pas suivis, et rien ne permet de dire si la situation s’améliore ou s’aggrave.',
    attendu: 'Un plan de lutte à jour, avec rapports de passage classés et postes repérés.',
    etapes: [
      'Faire établir un plan de lutte par une société spécialisée, avec plan des appâts.',
      'Conserver les rapports de passage dans le classeur sanitaire.',
      'Vérifier les postes d’appâtage entre deux passages.',
    ],
    materiel: ['Contrat de dératisation et désinsectisation', 'Plan de pose des appâts'],
    preuve: 'Contrat et derniers rapports de passage.',
  },
  'NUIS-02': {
    consequence:
      'Insectes et rongeurs circulent entre les déchets, les sols et les denrées, et transportent sur leurs pattes ce qu’ils ont touché avant. Les traces vues en cuisine signalent une population déjà installée, pas un passage isolé.',
    attendu: 'Aucune trace, aucun passage, denrées et surfaces protégées.',
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
    consequence:
      'Quand le cru et le prêt à consommer se croisent, le germe passe du produit qui sera cuit vers celui qui ne le sera pas. Le jus d’une viande crue qui goutte sur une préparation finie suffit, et plus rien ensuite ne détruira ce qui a été transmis.',
    attendu: 'Cru et prêt à consommer séparés, en enceintes ou en étages distincts, matériel dédié.',
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
    consequence:
      'Des denrées posées au sol ou stockées sans rotation prennent l’humidité, la poussière et les passages de nuisibles. Sans premier entré premier sorti, les plus anciennes restent au fond et se perdent, ou partent en service après leur date.',
    attendu: 'Tout est rangé hors sol, protégé, avec une rotation par date visible.',
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
    consequence:
      'Un carrelage fissuré, un joint noirci ou une peinture écaillée ne se nettoient plus : la salissure s’installe dans le support lui-même. La zone redevient sale quelques heures après chaque nettoyage, quel que soit le produit utilisé.',
    attendu: 'Sols, murs et plafonds en bon état, lisses et lavables, sans zone impossible à nettoyer.',
    etapes: [
      'Reprendre les surfaces abîmées : carrelage fissuré, joints noircis, peinture écaillée.',
      'Remettre en état ce qui empêche un nettoyage correct, en priorité.',
      'Planifier les travaux qui demandent une fermeture sur une période creuse.',
    ],
    materiel: ['Joints et carrelage de remplacement', 'Peinture lessivable alimentaire'],
    preuve: 'Photos avant et après travaux, facture de l’artisan.',
  },
  'LOC-02': {
    consequence:
      'Un équipement abîmé ou un matériau inadapté relargue dans l’aliment, ou retient la salissure dans ses fissures. Le plan de travail et les contenants touchent directement les denrées : ce sont eux qui transmettent le plus vite.',
    attendu: 'Matériels et surfaces aptes au contact alimentaire, entretenus, sans partie dégradée.',
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
    consequence:
      'Des déchets accumulés en zone de production attirent les nuisibles et mélangent le propre et le sale sur les mêmes trajets. L’odeur et les jus signalent une charge microbienne élevée à quelques mètres des denrées.',
    attendu: 'Les déchets sortent régulièrement, en contenants fermés, sur un circuit séparé.',
    etapes: [
      'Équiper la cuisine de poubelles à couvercle et à commande non manuelle.',
      'Sortir les déchets à chaque service, sans traverser une zone propre.',
      'Nettoyer et désinfecter les poubelles après chaque vidage.',
    ],
    materiel: ['Poubelles à pédale avec couvercle', 'Sacs adaptés'],
    preuve: 'Photo des poubelles en place et fiche de nettoyage.',
  },
  'DECH-02': {
    consequence:
      'Un local à déchets mal tenu devient le foyer permanent de la cuisine : c’est de là que repartent les nuisibles et les odeurs. Le problème revient au même endroit tant que le local n’est pas nettoyable.',
    attendu: 'Local à déchets fermé, lavable, nettoyé, avec un point d’eau à proximité.',
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
    consequence:
      'Sans plan de maîtrise sanitaire, les règles de la maison n’existent que dans la tête de ceux qui sont là ce jour-là. Un départ, un remplaçant, un coup de feu, et la pratique se perd sans que personne ne s’en aperçoive.',
    attendu: 'Un plan de maîtrise sanitaire écrit, adapté à l’activité réelle, connu de l’équipe.',
    etapes: [
      'Rédiger le plan de maîtrise sanitaire adapté à l’activité : bonnes pratiques, analyse des dangers, traçabilité.',
      'Le faire connaître à l’équipe et le tenir accessible en cuisine.',
      'Le relire à chaque changement de carte, de matériel ou d’organisation.',
    ],
    materiel: ['Classeur du plan de maîtrise sanitaire', 'Guide de bonnes pratiques du secteur'],
    preuve: 'Le plan de maîtrise sanitaire daté, consultable sur place.',
  },
  'PMS-02': {
    consequence:
      'Sans autocontrôles, un écart n’est repéré qu’une fois ses effets produits. La surveillance sert précisément à corriger avant le service, pas à constater après coup.',
    attendu: 'Les points sensibles sont surveillés, les valeurs notées, les écarts corrigés et tracés.',
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
    consequence:
      'Un client allergique décide à partir de ce qu’on lui dit. Une information absente ou approximative sur un plat peut déclencher une réaction grave chez une personne qui a fait confiance à la carte ou au personnel.',
    attendu: 'L’information sur les allergènes est disponible, exacte et accessible au consommateur.',
    etapes: [
      'Établir la liste des allergènes plat par plat, à partir des recettes et des étiquettes fournisseurs.',
      'Informer le consommateur, par la carte ou par un document consultable sur place.',
      'Mettre à jour à chaque changement de recette ou de fournisseur.',
    ],
    materiel: ['Classeur allergènes', 'Étiquettes fournisseurs conservées'],
    preuve: 'Le document allergènes à jour, montrable en salle.',
  },
  'ALL-02': {
    consequence:
      'Un allergène se transmet par une trace : une planche, un ustensile, une huile de friture partagée. Le plat annoncé sans l’ingrédient en contient alors réellement, et la personne allergique n’a aucun moyen de le savoir.',
    attendu: 'Matériel et plans de travail dédiés, production organisée pour éviter tout contact croisé.',
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
    consequence:
      'L’eau et la glace touchent directement les denrées et les mains. Une machine à glaçons mal entretenue diffuse dans toute la cuisine ce qu’elle contient, sans que rien ne se voie dans le verre.',
    attendu: 'Eau potable au poste, machine à glaçons entretenue et entretien tracé.',
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
