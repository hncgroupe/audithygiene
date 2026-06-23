import type { Article } from './types';

export const article: Article = {
  slug: 'checklist-controle-sanitaire',
  title: 'Checklist complète avant un contrôle sanitaire en restaurant',
  metaTitle: 'Checklist contrôle sanitaire restaurant',
  description:
    "Checklist d'autodiagnostic thème par thème avant un contrôle sanitaire : froid, traçabilité, PMS, hygiène, nettoyage, nuisibles, allergènes. Documents et pièges.",
  excerpt:
    "Un autodiagnostic concret, thème par thème, pour préparer un contrôle sanitaire : ce que l'inspecteur regarde, les documents à présenter, les non-conformités classiques.",
  category: 'Pratique',
  datePublished: '2026-06-14',
  dateModified: '2026-06-14',
  readingMinutes: 15,
  answer:
    "Pour préparer un contrôle sanitaire en restaurant, passez votre établissement au crible thème par thème : chaîne du froid et relevés de températures, traçabilité et DLC, plan de maîtrise sanitaire et documents, hygiène du personnel, nettoyage, lutte contre les nuisibles, allergènes, marche en avant, eau, déchets et formation. Pour chacun, vérifiez trois choses : la conformité réelle sur le terrain, la présence des documents que l'inspecteur demandera, et l'absence des non-conformités classiques (relevés manquants, étiquettes absentes, PMS jamais mis à jour). Cet autodiagnostic ne remplace pas un contrôle officiel de la DDPP, mais il révèle la plupart des écarts avant que l'inspecteur ne les voie.",
  blocks: [
    {
      type: 'p',
      text: "La plupart des non-conformités relevées en restauration ne sont pas des fautes graves. Ce sont des oublis : un relevé de température sauté pendant trois semaines, une étiquette de produit ouvert qui manque, un plan de nettoyage affiché mais jamais signé. Pris isolément, chaque écart paraît mineur. Accumulés sous l'oeil d'un inspecteur, ils dessinent un établissement qui ne maîtrise pas ses process. Cette checklist sert exactement à ça : repérer ces écarts vous-même, avant la visite.",
    },
    {
      type: 'p',
      text: "Elle est organisée comme le ferait un auditeur en déplacement, thème par thème. Pour chaque bloc, vous trouverez ce que l'inspecteur observe concrètement, les documents qu'il va réclamer, et les pièges qui reviennent le plus souvent. Prenez-la en main un service calme, idéalement le matin avant l'ouverture, papier en main ou tablette, et cochez sans complaisance. Un écart noté est un écart corrigeable. Un écart ignoré reviendra.",
    },
    {
      type: 'callout',
      title: 'Cadre de cette checklist',
      text: "audit hygiène est un label privé indépendant. Cet autodiagnostic s'appuie sur la réglementation hygiène en vigueur (Paquet hygiène, règlement CE 852/2004, arrêté du 21 décembre 2009), mais il ne constitue ni une certification d'État, ni un contrôle des services vétérinaires ou de la DDPP. Il vous aide à préparer un contrôle officiel, il ne garantit pas son résultat.",
    },
    {
      type: 'h2',
      id: 'comment-utiliser-cette-checklist',
      text: 'Comment utiliser cette checklist',
    },
    {
      type: 'p',
      text: "L'inspecteur d'un contrôle sanitaire ne note pas une intention, il constate un état de fait à l'instant T, doublé d'un examen documentaire. Votre autodiagnostic doit donc combiner les deux : le terrain et le papier. Un frigo propre avec une bonne température ne vaut rien si vous ne pouvez pas montrer un mois de relevés. À l'inverse, des classeurs parfaits ne sauvent pas une plonge encrassée.",
    },
    {
      type: 'p',
      text: "Travaillez dans l'ordre de circulation des denrées : réception, stockage, préparation, service, déchets. C'est la logique de la marche en avant, et c'est aussi souvent l'ordre dans lequel l'agent visite. Pour chaque thème, posez-vous la question simple : si l'inspecteur me demandait la preuve maintenant, l'aurais-je sous la main en moins de deux minutes ? Si la réponse est non, c'est une ligne à corriger.",
    },
    {
      type: 'h2',
      id: 'chaine-du-froid-et-releves-de-temperatures',
      text: 'Chaîne du froid et relevés de températures',
    },
    {
      type: 'p',
      text: "C'est le premier réflexe de l'inspecteur, et souvent le plus révélateur. Le règlement CE 852/2004 impose que les denrées soient maintenues à des températures empêchant la multiplication microbienne, et l'arrêté du 21 décembre 2009 fixe les températures réglementaires par catégorie de produit. L'agent ouvre une enceinte froide, pose son thermomètre étalonné, et compare avec ce que vos relevés affichent. Un écart entre la réalité et le papier est très mal vu.",
    },
    {
      type: 'h3',
      text: "Ce que l'inspecteur regarde",
    },
    {
      type: 'ul',
      items: [
        "La température affichée par chaque enceinte (chambre froide positive autour de 0 à 3 °C, négative à -18 °C, vitrines réfrigérées).",
        "La température à coeur de produits sensibles, parfois sondés directement.",
        "L'absence de rupture de charge : produits laissés à température ambiante, refroidissement de plats chauds trop lent.",
        "L'état des joints, le givrage, le rangement (pas de denrées posées à même le sol, pas de surcharge bloquant la circulation d'air).",
      ],
    },
    {
      type: 'h3',
      text: 'Documents à présenter',
    },
    {
      type: 'ul',
      items: [
        "Relevés de températures des enceintes (au minimum quotidiens, datés et signés ou horodatés).",
        "Procédure de refroidissement rapide et de remise en température, avec relevés associés.",
        "Justificatif d'étalonnage ou de vérification des sondes et thermomètres.",
        "Procédure de gestion des non-conformités de température (que fait-on quand un frigo monte à 8 °C).",
      ],
    },
    {
      type: 'h3',
      text: 'Non-conformités classiques',
    },
    {
      type: 'ul',
      items: [
        "Relevés interrompus pendant des jours, ou tous remplis d'un coup à la même encre (l'inspecteur le repère).",
        "Aucune trace de ce qui a été décidé quand une température était hors limite.",
        "Refroidissement de plats chauds à l'air libre au lieu d'une cellule, sans suivi du temps de passage.",
        "Congélation maison de produits frais sans procédure ni étiquetage de la date de congélation.",
      ],
    },
    {
      type: 'callout',
      title: 'Le piège du relevé trop parfait',
      text: "Des relevés identiques tous les jours, sans la moindre variation, signalent souvent un remplissage routinier déconnecté du terrain. Un froid réel fluctue légèrement (ouverture des portes, dégivrage). Mieux vaut un relevé honnête avec une anomalie tracée et corrigée qu'une colonne de chiffres parfaits qui sent le rattrapage. Pour aller plus loin, voir notre article dédié à la chaîne du froid.",
    },
    {
      type: 'h2',
      id: 'tracabilite-et-dlc',
      text: 'Traçabilité et DLC',
    },
    {
      type: 'p',
      text: "La traçabilité découle du règlement 178/2002 : tout exploitant doit pouvoir identifier ses fournisseurs et, en cas d'alerte, savoir quel lot a été utilisé. En restauration, cela se traduit par la conservation des preuves d'origine et par une gestion rigoureuse des dates. L'inspecteur teste souvent la traçabilité par un produit pris au hasard dans un frigo : d'où vient-il, quel lot, quelle date de réception.",
    },
    {
      type: 'h3',
      text: "Ce que l'inspecteur regarde",
    },
    {
      type: 'ul',
      items: [
        "Les DLC des produits ouverts ou stockés (rien de périmé, même au fond de la réserve).",
        "L'étiquetage des produits décongelés, déconditionnés ou transvasés (date d'ouverture, date limite d'utilisation interne).",
        "La cohérence entre les denrées présentes et les achats récents.",
        "Le sort des produits dont la DLC approche : zone dédiée, écoulement prioritaire, retrait.",
      ],
    },
    {
      type: 'h3',
      text: 'Documents à présenter',
    },
    {
      type: 'ul',
      items: [
        "Factures et bons de livraison récents, conservés et classés.",
        "Étiquettes d'origine des produits (notamment viandes, produits de la mer), gardées le temps d'utilisation du lot.",
        "Procédure de gestion des DLC et des produits non conformes.",
        "Le cas échéant, registre de retrait ou de destruction des denrées impropres.",
      ],
    },
    {
      type: 'h3',
      text: 'Non-conformités classiques',
    },
    {
      type: 'ul',
      items: [
        "Produits ouverts sans étiquette de date, le grand classique de la non-conformité.",
        "Boîtes de conserve déconditionnées dans des bacs anonymes, impossibles à tracer.",
        "DLC dépassées planquées derrière des produits frais.",
        "Décongélation au fil de l'eau sans aucune date ni délai de consommation interne.",
      ],
    },
    {
      type: 'p',
      text: "Une astuce simple change la donne : un système d'étiquetage daté systématique sur tout produit ouvert ou transformé. Couleur par jour, date d'ouverture, date limite interne. C'est peu coûteux et c'est l'un des premiers signaux de maîtrise qu'un inspecteur enregistre. Notre article sur la traçabilité et les DLC détaille la méthode.",
    },
    {
      type: 'h2',
      id: 'plan-de-maitrise-sanitaire-et-documents',
      text: 'Plan de maîtrise sanitaire et documents',
    },
    {
      type: 'p',
      text: "Le plan de maîtrise sanitaire (PMS) est l'ossature documentaire de votre établissement. Il rassemble les bonnes pratiques d'hygiène, le système fondé sur les principes HACCP et la traçabilité avec gestion des alertes. Tout exploitant doit pouvoir le présenter. Un PMS absent, ou présent mais visiblement jamais vécu, est l'un des constats les plus lourds qu'un contrôle puisse poser.",
    },
    {
      type: 'h3',
      text: "Ce que l'inspecteur regarde",
    },
    {
      type: 'ul',
      items: [
        "L'existence d'un PMS complet et son adéquation avec l'activité réelle (un PMS générique acheté en ligne et jamais adapté saute aux yeux).",
        "La cohérence entre les procédures écrites et ce qu'il observe en cuisine.",
        "Les enregistrements qui prouvent que le PMS vit : relevés, plans de nettoyage signés, suivi des actions correctives.",
        "L'analyse des dangers et l'identification des points à maîtriser propres à vos process.",
      ],
    },
    {
      type: 'h3',
      text: 'Documents à présenter',
    },
    {
      type: 'ul',
      items: [
        "Le PMS dans son ensemble : bonnes pratiques d'hygiène, plan HACCP, procédures de traçabilité et de retrait/rappel.",
        "Les fiches de poste et procédures spécifiques à vos plats sensibles.",
        "Les enregistrements à jour rattachés à chaque procédure.",
        "L'historique des mises à jour du PMS (un PMS daté de l'ouverture, jamais revu, interroge).",
      ],
    },
    {
      type: 'h3',
      text: 'Non-conformités classiques',
    },
    {
      type: 'ul',
      items: [
        "PMS introuvable, ou cartonné neuf jamais ouvert.",
        "Procédures décrivant un fonctionnement qui n'a rien à voir avec la cuisine observée.",
        "Aucun enregistrement, donc impossible de prouver que les procédures sont appliquées.",
        "Analyse HACCP copiée d'un modèle, sans lien avec les vrais dangers de l'établissement.",
      ],
    },
    {
      type: 'quote',
      text: "Un bon PMS ne se reconnaît pas à son épaisseur, mais aux traces qu'il laisse au quotidien. Un classeur fin, vivant et tenu vaut mieux qu'un volume parfait que personne n'ouvre.",
    },
    {
      type: 'p',
      text: "Si votre PMS date et ne ressemble plus à votre activité, c'est la priorité avant toute autre ligne de cette checklist. Notre guide complet du plan de maîtrise sanitaire explique comment le construire ou le remettre à niveau.",
    },
    {
      type: 'h2',
      id: 'hygiene-du-personnel-et-vestiaires',
      text: 'Hygiène du personnel et vestiaires',
    },
    {
      type: 'p',
      text: "Le personnel est à la fois le premier rempart et le premier vecteur de contamination. L'inspecteur observe les gestes pendant le service, regarde les tenues, et vérifie les installations dédiées au personnel. Beaucoup d'écarts ici relèvent de l'aménagement (pas de point de lavage des mains accessible) autant que du comportement.",
    },
    {
      type: 'h3',
      text: "Ce que l'inspecteur regarde",
    },
    {
      type: 'ul',
      items: [
        "Les tenues : propres, dédiées à la cuisine, changées régulièrement, coiffe si nécessaire.",
        "Le lavage des mains : lave-mains à commande non manuelle, savon, essuie-mains à usage unique, et surtout des mains effectivement lavées au bon moment.",
        "L'absence de bijoux, de vernis, le port correct des protections sur les plaies.",
        "Les vestiaires séparés des zones de denrées, les effets personnels rangés à l'écart.",
      ],
    },
    {
      type: 'h3',
      text: 'Documents à présenter',
    },
    {
      type: 'ul',
      items: [
        "Procédure de lavage des mains affichée et appliquée.",
        "Suivi médical et instructions sur l'éviction en cas de maladie transmissible.",
        "Tenue et entretien du linge professionnel (qui lave, comment, à quelle fréquence).",
      ],
    },
    {
      type: 'h3',
      text: 'Non-conformités classiques',
    },
    {
      type: 'ul',
      items: [
        "Lave-mains servant d'égouttoir ou encombré de matériel, donc inutilisable.",
        "Effets personnels (sacs, manteaux, téléphone) posés sur des plans de travail.",
        "Vestiaire inexistant ou ouvrant directement sur la zone de préparation.",
        "Tenues de ville portées en cuisine.",
      ],
    },
    {
      type: 'h2',
      id: 'nettoyage-et-plan-de-nettoyage',
      text: 'Nettoyage et plan de nettoyage',
    },
    {
      type: 'p',
      text: "La propreté visible compte, mais l'inspecteur cherche surtout un système. Un plan de nettoyage formalise qui nettoie quoi, avec quel produit, à quelle dilution, à quelle fréquence, et comment on vérifie. C'est une pièce attendue du PMS. La propreté d'un jour ne prouve rien sans la preuve d'une routine.",
    },
    {
      type: 'h3',
      text: "Ce que l'inspecteur regarde",
    },
    {
      type: 'ul',
      items: [
        "L'état réel des surfaces, du matériel, des recoins (dessous des plans, siphons, joints, hottes).",
        "L'existence d'un plan de nettoyage et de désinfection couvrant tous les postes.",
        "Les produits utilisés : adaptés au contact alimentaire, rangés à l'écart des denrées, fiches techniques disponibles.",
        "Le respect des dilutions et des temps d'action (un désinfectant mal dosé ne désinfecte pas).",
      ],
    },
    {
      type: 'h3',
      text: 'Documents à présenter',
    },
    {
      type: 'ul',
      items: [
        "Le plan de nettoyage et de désinfection détaillé par zone et par fréquence.",
        "Les fiches techniques et fiches de données de sécurité des produits.",
        "Les enregistrements de réalisation (planning signé, traçabilité du nettoyage approfondi).",
      ],
    },
    {
      type: 'h3',
      text: 'Non-conformités classiques',
    },
    {
      type: 'ul',
      items: [
        "Plan de nettoyage affiché mais jamais émargé.",
        "Produits sans étiquette, transvasés dans des bouteilles anonymes.",
        "Désinfectant utilisé comme un simple nettoyant, sans respect du temps de contact.",
        "Zones oubliées récurrentes : dessous des équipements, évacuations, joints noircis.",
      ],
    },
    {
      type: 'p',
      text: "Si vos plans de nettoyage existent mais ne sont jamais signés, commencez par là : un planning émargé est l'une des preuves les plus faciles à fournir et les plus regardées. Notre article sur le nettoyage et la désinfection en cuisine détaille les bonnes pratiques produit par produit.",
    },
    {
      type: 'h2',
      id: 'lutte-contre-les-nuisibles',
      text: 'Lutte contre les nuisibles',
    },
    {
      type: 'p',
      text: "La présence de nuisibles, ou de traces de leur présence, est un constat lourd. L'inspecteur cherche les indices autant que les bêtes : déjections, traces de rongement, insectes morts dans les pièges, denrées attaquées. La maîtrise repose sur un plan de lutte, le plus souvent confié à un prestataire spécialisé, mais l'exploitant reste responsable.",
    },
    {
      type: 'h3',
      text: "Ce que l'inspecteur regarde",
    },
    {
      type: 'ul',
      items: [
        "Les indices de présence dans les réserves, sous les équipements, dans les zones sombres.",
        "Le dispositif de protection : grilles d'aération, bas de portes, moustiquaires, absence de points d'entrée.",
        "Les appâts et pièges en place, leur positionnement, leur état.",
        "Le rangement qui ne favorise pas les nids (cartons au sol, denrées contre les murs).",
      ],
    },
    {
      type: 'h3',
      text: 'Documents à présenter',
    },
    {
      type: 'ul',
      items: [
        "Le contrat de dératisation/désinsectisation et le plan de positionnement des appâts.",
        "Les rapports de passage du prestataire, datés et signés.",
        "Le suivi des actions correctives après un signalement de présence.",
      ],
    },
    {
      type: 'h3',
      text: 'Non-conformités classiques',
    },
    {
      type: 'ul',
      items: [
        "Contrat de lutte signé mais aucun rapport de passage récent.",
        "Pièges présents mais jamais relevés, parfois pleins.",
        "Points d'entrée évidents : bas de porte rongé, grille manquante, fenêtre sans protection.",
        "Stockage au sol qui crée des abris pour les rongeurs.",
      ],
    },
    {
      type: 'h2',
      id: 'allergenes',
      text: 'Allergènes',
    },
    {
      type: 'p',
      text: "L'information sur les allergènes est une obligation issue du règlement INCO 1169/2011, précisée en France par le décret 2011-731 pour les denrées non préemballées servies en restauration. Le client doit pouvoir connaître la présence des quatorze allergènes à déclaration obligatoire dans les plats. L'inspecteur vérifie que l'information existe, qu'elle est accessible, et qu'elle est exacte.",
    },
    {
      type: 'h3',
      text: "Ce que l'inspecteur regarde",
    },
    {
      type: 'ul',
      items: [
        "L'existence d'une information allergènes accessible au client (support écrit, affichage, ou information disponible sur demande clairement indiquée).",
        "La cohérence entre l'information affichée et les recettes réelles.",
        "La maîtrise des contaminations croisées en cuisine (ustensiles, plans, huiles de friture).",
        "La connaissance du personnel : qui sait répondre si un client demande.",
      ],
    },
    {
      type: 'h3',
      text: 'Documents à présenter',
    },
    {
      type: 'ul',
      items: [
        "La fiche ou le support recensant les allergènes par plat, tenu à jour à chaque changement de carte.",
        "Les recettes ou fiches techniques permettant de justifier l'information.",
        "La procédure d'information du client et de gestion des demandes spécifiques.",
      ],
    },
    {
      type: 'h3',
      text: 'Non-conformités classiques',
    },
    {
      type: 'ul',
      items: [
        "Aucune information allergènes disponible, ni écrite ni signalée.",
        "Fiche allergènes qui ne correspond plus à la carte du moment.",
        "Personnel incapable de renseigner un client en l'absence du responsable.",
        "Aucune gestion des contaminations croisées pour les plats sans allergène annoncés.",
      ],
    },
    {
      type: 'p',
      text: "Notre article sur les obligations allergènes en restaurant détaille la liste des quatorze allergènes et les façons admises d'informer le client.",
    },
    {
      type: 'h2',
      id: 'marche-en-avant-et-organisation-des-locaux',
      text: 'Marche en avant et organisation des locaux',
    },
    {
      type: 'p',
      text: "La marche en avant est le principe qui évite que le propre croise le sale et que le cru contamine le cuit. Dans l'idéal, les denrées avancent dans un seul sens, de la réception vers le service, sans retour en arrière. Quand l'espace ne le permet pas (et c'est fréquent en restauration parisienne contrainte), on parle de marche en avant dans le temps : on sépare les opérations par des étapes de nettoyage.",
    },
    {
      type: 'h3',
      text: "Ce que l'inspecteur regarde",
    },
    {
      type: 'ul',
      items: [
        "La séparation des secteurs propre et souillé, du cru et du cuit.",
        "Le circuit des déchets qui ne croise pas le circuit des denrées propres.",
        "L'organisation de la plonge et le retour de la vaisselle.",
        "Le stockage qui respecte les familles de produits (pas de cru au-dessus de produits prêts à consommer).",
      ],
    },
    {
      type: 'h3',
      text: 'Documents à présenter',
    },
    {
      type: 'ul',
      items: [
        "Le plan des locaux montrant les flux, intégré au PMS.",
        "La procédure de marche en avant dans le temps si l'espace est partagé.",
        "Les horaires et séquences de nettoyage entre opérations sales et propres.",
      ],
    },
    {
      type: 'h3',
      text: 'Non-conformités classiques',
    },
    {
      type: 'ul',
      items: [
        "Vaisselle sale et denrées propres qui se croisent sur le même plan.",
        "Cru posé au-dessus du cuit dans une chambre froide.",
        "Aucune logique de flux dans un espace pourtant suffisant.",
        "Déchets qui traversent la zone de préparation pour sortir.",
      ],
    },
    {
      type: 'h2',
      id: 'eau-glace-et-equipements',
      text: 'Eau, glace et équipements',
    },
    {
      type: 'p',
      text: "L'eau utilisée doit être potable, et tout ce qui entre en contact avec elle suit le même régime de vigilance. La glace, souvent négligée, est une denrée à part entière : sa machine se nettoie, son stockage se protège, et la pelle ne reste pas plongée dedans. Les équipements et matériaux au contact des aliments doivent être adaptés, en bon état et faciles à nettoyer.",
    },
    {
      type: 'h3',
      text: "Ce que l'inspecteur regarde",
    },
    {
      type: 'ul',
      items: [
        "L'état de la machine à glace : propreté, absence de moisissures, protection du bac.",
        "Les matériaux au contact alimentaire : plans de travail, planches, ustensiles non détériorés.",
        "L'entretien des équipements froids et chauds, l'absence de matériel hors service stocké en cuisine.",
        "Les points d'eau en état de fonctionner.",
      ],
    },
    {
      type: 'h3',
      text: 'Documents à présenter',
    },
    {
      type: 'ul',
      items: [
        "L'intégration de la machine à glace au plan de nettoyage.",
        "Les justificatifs d'aptitude au contact alimentaire des matériaux (le cas échéant).",
        "Le suivi de maintenance des équipements.",
      ],
    },
    {
      type: 'h3',
      text: 'Non-conformités classiques',
    },
    {
      type: 'ul',
      items: [
        "Machine à glace encrassée, bac jamais nettoyé, pelle laissée à l'intérieur.",
        "Planches à découper entaillées et impossibles à désinfecter.",
        "Matériel cassé entreposé en cuisine.",
      ],
    },
    {
      type: 'h2',
      id: 'gestion-des-dechets',
      text: 'Gestion des déchets',
    },
    {
      type: 'p',
      text: "Les déchets attirent les nuisibles et sont une source de contamination s'ils stagnent près des denrées. L'inspecteur regarde leur stockage, leur évacuation et la propreté du local poubelles. Le principe est simple : les déchets sortent vite, dans des contenants fermés et nettoyables, sans croiser les denrées propres.",
    },
    {
      type: 'h3',
      text: "Ce que l'inspecteur regarde",
    },
    {
      type: 'ul',
      items: [
        "Des poubelles à ouverture non manuelle, fermées, vidées régulièrement.",
        "Un local ou une zone déchets propre, à l'écart des denrées, nettoyable.",
        "L'évacuation des huiles usagées via une filière dédiée.",
        "La fréquence de sortie qui évite l'accumulation en cuisine.",
      ],
    },
    {
      type: 'h3',
      text: 'Documents à présenter',
    },
    {
      type: 'ul',
      items: [
        "Le contrat ou bordereau d'enlèvement des huiles alimentaires usagées.",
        "Le cas échéant, les justificatifs de collecte des biodéchets selon vos volumes.",
        "L'intégration du local déchets au plan de nettoyage.",
      ],
    },
    {
      type: 'h3',
      text: 'Non-conformités classiques',
    },
    {
      type: 'ul',
      items: [
        "Poubelles ouvertes et débordantes en pleine zone de préparation.",
        "Huiles usagées stockées sans filière d'évacuation justifiée.",
        "Local poubelles sale, source de nuisibles.",
      ],
    },
    {
      type: 'h2',
      id: 'formation-du-personnel',
      text: 'Formation du personnel',
    },
    {
      type: 'p',
      text: "Tout établissement de restauration commerciale doit compter dans son effectif au moins une personne ayant suivi une formation spécifique en matière d'hygiène alimentaire, conformément au décret 2011-731. Au-delà de cette obligation formelle, l'inspecteur évalue la culture hygiène de l'équipe : un personnel qui connaît les gestes et les raisons derrière les gestes rassure bien plus qu'un diplôme isolé.",
    },
    {
      type: 'h3',
      text: 'Documents à présenter',
    },
    {
      type: 'ul',
      items: [
        "L'attestation de formation en hygiène alimentaire d'au moins une personne de l'équipe.",
        "Le suivi des formations internes et des consignes transmises aux nouveaux arrivants.",
        "Les preuves de sensibilisation continue (affichages, points d'équipe).",
      ],
    },
    {
      type: 'h3',
      text: 'Non-conformités classiques',
    },
    {
      type: 'ul',
      items: [
        "Aucune attestation de formation hygiène présentable.",
        "Personnel récent jamais sensibilisé aux procédures internes.",
        "Décalage net entre les procédures écrites et les gestes observés.",
      ],
    },
    {
      type: 'callout',
      title: 'Le test de cohérence',
      text: "L'inspecteur croise toujours le papier et le terrain. Si votre PMS dit que les mains se lavent toutes les heures mais que personne ne le fait, le constat porte sur l'écart, pas sur le document. La meilleure préparation n'est donc pas de gonfler les classeurs, mais d'aligner ce que vous écrivez sur ce que vous faites vraiment.",
    },
    {
      type: 'h2',
      id: 'apres-l-autodiagnostic',
      text: "Après l'autodiagnostic : prioriser et corriger",
    },
    {
      type: 'p',
      text: "Une fois la checklist passée, vous aurez une liste d'écarts. Tous ne se valent pas. Certains touchent directement la sécurité du consommateur, d'autres relèvent du formalisme documentaire. Hiérarchisez avant de vous disperser.",
    },
    {
      type: 'ol',
      items: [
        "Traitez d'abord les écarts à risque sanitaire direct : rupture de chaîne du froid, contamination croisée cru/cuit, présence de nuisibles, denrées périmées en service.",
        "Réglez ensuite les manques documentaires majeurs : PMS absent ou obsolète, aucune traçabilité, pas de plan de nettoyage.",
        "Corrigez enfin le formalisme : relevés à reprendre proprement, plannings à émarger, fiches allergènes à mettre à jour.",
        "Fixez une date de re-contrôle interne pour vérifier que les corrections tiennent dans le temps, et pas seulement le jour J.",
      ],
    },
    {
      type: 'p',
      text: "Un autodiagnostic honnête fait par l'équipe vaut déjà beaucoup. Un regard extérieur, lui, voit ce que l'habitude rend invisible : le joint noirci qu'on ne remarque plus, le frigo qu'on ouvre vingt fois par jour sans penser à sa température. C'est précisément le rôle d'un audit hygiène réalisé sur place par un auditeur, avec une grille complète et un rapport qui priorise les actions. Pour comprendre comment se déroule un contrôle officiel et mieux vous y préparer, lisez aussi notre article dédié au contrôle sanitaire en restaurant.",
    },
    {
      type: 'callout',
      title: 'Anticiper plutôt que subir',
      text: "Les résultats des contrôles officiels sont publiés sur la plateforme Alim'confiance et visibles par vos clients. Un niveau d'hygiène satisfaisant se construit toute l'année, pas la veille d'une visite. Un audit blanc avant un contrôle attendu, ou simplement pour faire le point, vous donne la liste exacte des points à reprendre. Prendre rendez-vous pour un audit sur site, c'est transformer l'incertitude en plan d'action.",
    },
  ],
  faq: [
    {
      q: "Combien de temps avant un contrôle faut-il faire cette checklist ?",
      a: "Idéalement, cette checklist doit faire partie de votre routine et pas seulement d'une préparation ponctuelle, car la majorité des contrôles sanitaires sont inopinés. Si vous attendez un contrôle de suivi ou souhaitez faire le point, passez-la au minimum deux à trois semaines avant pour avoir le temps de corriger les écarts documentaires, notamment les relevés et le plan de nettoyage qui doivent montrer une régularité dans la durée.",
    },
    {
      q: "Quels sont les documents que l'inspecteur demande systématiquement ?",
      a: "Le plan de maîtrise sanitaire, les relevés de températures, la traçabilité (factures, étiquettes d'origine), le plan de nettoyage et de désinfection, l'attestation de formation en hygiène alimentaire, le contrat de lutte contre les nuisibles avec ses rapports de passage, et l'information allergènes. Tout doit être présentable rapidement et correspondre à la réalité de l'établissement.",
    },
    {
      q: "Quelle est la non-conformité la plus fréquente en restauration ?",
      a: "Les écarts de traçabilité et de date arrivent en tête : produits ouverts sans étiquette de date, DLC dépassées en réserve, denrées décongelées non datées. Viennent ensuite les relevés de températures incomplets et les plans de nettoyage jamais émargés. Ces écarts sont faciles à corriger, mais ils donnent à l'inspecteur le signal d'un établissement qui ne suit pas ses process.",
    },
    {
      q: "Un PMS générique acheté en ligne suffit-il ?",
      a: "Non. Un PMS doit refléter votre activité réelle, vos plats, vos process et vos dangers spécifiques. Un modèle générique jamais adapté se repère immédiatement, et surtout il ne sera pas appliqué car il ne correspond à rien de concret. L'inspecteur cherche la cohérence entre les procédures écrites et ce qu'il observe en cuisine, ainsi que les enregistrements qui prouvent que le PMS vit.",
    },
    {
      q: "Faut-il une formation hygiène obligatoire pour tout le personnel ?",
      a: "Le décret 2011-731 impose qu'au moins une personne de l'effectif d'un établissement de restauration commerciale ait suivi une formation spécifique en hygiène alimentaire. Ce n'est pas une obligation pour chaque salarié, mais l'esprit de la réglementation suppose que l'ensemble de l'équipe soit sensibilisé aux bonnes pratiques. Un personnel formé et informé est un signal fort lors d'un contrôle.",
    },
    {
      q: "Comment gérer l'information allergènes en restauration ?",
      a: "Le règlement INCO 1169/2011 et le décret 2011-731 imposent d'informer le consommateur sur la présence des quatorze allergènes à déclaration obligatoire dans les plats servis. L'information peut être écrite sur un support disponible ou indiquée comme accessible sur demande, à condition d'être exacte et tenue à jour à chaque changement de carte. Le personnel doit pouvoir renseigner un client.",
    },
    {
      q: "Cet autodiagnostic remplace-t-il un contrôle officiel ?",
      a: "Non. audit hygiène est un label privé indépendant. Cette checklist et un audit sur site vous aident à préparer et anticiper un contrôle sanitaire officiel mené par la DDPP, mais ils ne constituent ni une certification d'État, ni un contrôle des services vétérinaires, et ne garantissent aucun résultat lors d'une inspection officielle.",
    },
    {
      q: "Où voir les résultats des contrôles sanitaires ?",
      a: "Les résultats des contrôles officiels de sécurité sanitaire des aliments sont publiés sur la plateforme Alim'confiance, accessible au public. Chaque établissement contrôlé y reçoit un niveau d'hygiène, du plus satisfaisant au plus préoccupant. C'est une raison de plus de tenir un établissement irréprochable toute l'année, car ce niveau est visible par vos clients.",
    },
    {
      q: "Que faire si je trouve beaucoup d'écarts en passant la checklist ?",
      a: "Hiérarchisez. Traitez d'abord les écarts à risque sanitaire direct (chaîne du froid, contamination croisée, nuisibles, denrées périmées), puis les manques documentaires majeurs (PMS, traçabilité), enfin le formalisme. Un grand nombre d'écarts mineurs se corrige vite avec un peu de méthode. Un regard extérieur, comme un audit sur site, aide à prioriser et à ne rien oublier.",
    },
  ],
  sources: [
    {
      label: "Règlement (CE) 852/2004 relatif à l'hygiène des denrées alimentaires",
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004R0852',
    },
    {
      label: "Règlement (UE) 1169/2011 (INCO) sur l'information des consommateurs sur les denrées",
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32011R1169',
    },
    {
      label: "Règlement (CE) 178/2002 (traçabilité et sécurité des aliments)",
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32002R0178',
    },
    {
      label: "Arrêté du 21 décembre 2009 (températures, remise directe et restauration)",
      url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000021629599',
    },
    {
      label: "Décret n° 2011-731 (formation hygiène et information allergènes en restauration)",
      url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000024226657',
    },
    {
      label: "Ministère de l'Agriculture et de la Souveraineté alimentaire",
      url: 'https://agriculture.gouv.fr/',
    },
    {
      label: 'DGCCRF (Direction générale de la concurrence, de la consommation et de la répression des fraudes)',
      url: 'https://www.economie.gouv.fr/dgccrf',
    },
    {
      label: "Alim'confiance (résultats des contrôles sanitaires officiels)",
      url: 'https://www.alim-confiance.gouv.fr/',
    },
  ],
  related: [
    'controle-sanitaire-restaurant',
    'plan-maitrise-sanitaire-pms',
    'nettoyage-desinfection-cuisine',
  ],
  relatedZones: ['paris', 'hauts-de-seine', 'seine-saint-denis'],
};
