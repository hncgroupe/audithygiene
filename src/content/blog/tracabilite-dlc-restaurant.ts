import type { Article } from './types';

export const article: Article = {
  slug: 'tracabilite-dlc-restaurant',
  title: 'Traçabilité, DLC et DDM en restaurant : le guide pratique',
  metaTitle: 'Traçabilité, DLC et DDM en restaurant : le guide',
  description:
    'DLC ou DDM, étiquetage des produits décongelés et ouverts, règle PEPS/FIFO, conservation des étiquettes, retraits et rappels : ce que vérifie un contrôle.',
  excerpt:
    'Comment distinguer DLC et DDM, étiqueter les produits ouverts ou décongelés et tenir une traçabilité solide face à un contrôle.',
  category: 'Pratique',
  datePublished: '2026-06-05',
  dateModified: '2026-06-22',
  readingMinutes: 14,
  answer:
    "En restauration, la DLC (date limite de consommation, mention « à consommer jusqu'au ») marque une limite sanitaire stricte : un produit dépassé doit être jeté. La DDM (date de durabilité minimale, « à consommer de préférence avant ») concerne la qualité, pas la sécurité, et un produit sain reste consommable au-delà. La traçabilité, imposée par le règlement (CE) 178/2002, oblige à savoir d'où vient chaque denrée et où elle est allée, une étape en amont et une étape en aval. En pratique, vous conservez étiquettes d'origine et bons de livraison, et vous ré-étiquetez les produits ouverts, décongelés ou déconditionnés avec une date interne lisible.",
  blocks: [
    {
      type: 'p',
      text: "La gestion des dates et la traçabilité figurent parmi les points les plus scrutés lors d'un contrôle sanitaire. Ce sont aussi des sources fréquentes de non-conformités, souvent par méconnaissance des règles plutôt que par négligence réelle. Un bac de sauce transvasé sans étiquette, une barquette de jambon ouverte trois jours plus tôt sans date, un saumon décongelé impossible à dater : ces situations banales en coup de feu deviennent des observations sur un rapport d'inspection. Cet article clarifie la frontière entre DLC et DDM, explique comment étiqueter un produit une fois ouvert ou décongelé, détaille la durée de vie secondaire, la rotation PEPS, la conservation des justificatifs, la gestion des produits non conformes et des rappels, et ce qu'un inspecteur cherche réellement à vérifier.",
    },
    {
      type: 'h2',
      id: 'dlc-ddm-difference',
      text: 'DLC et DDM : deux dates, deux logiques',
    },
    {
      type: 'p',
      text: "La confusion entre ces deux mentions reste courante en cuisine, et elle n'a rien d'anodin. L'une touche à la sécurité du consommateur, l'autre seulement à la qualité du produit. Traiter une DLC comme une simple indication de fraîcheur, ou jeter par excès de prudence des conserves dont la DDM est passée, traduisent la même confusion de fond. Le règlement (UE) 1169/2011, dit règlement INCO, fixe ces définitions au niveau européen et harmonise les mentions portées sur les emballages.",
    },
    {
      type: 'h3',
      text: "DLC : « à consommer jusqu'au »",
    },
    {
      type: 'p',
      text: "La date limite de consommation s'applique aux denrées microbiologiquement très périssables : viandes hachées, charcuteries à la coupe, produits laitiers frais, plats préparés réfrigérés, poissons et produits de la mer. Au-delà de cette date, le produit est réputé présenter un danger pour la santé et ne doit plus être ni servi, ni utilisé en préparation, ni recongelé pour gagner du temps. La réglementation européenne, reprise en droit français, interdit la commercialisation d'une denrée dont la DLC est dépassée. Une DLC dépassée trouvée en chambre froide ou en zone de préparation est systématiquement relevée, et selon la nature du produit, elle peut basculer d'une simple observation à un constat lourd.",
    },
    {
      type: 'p',
      text: "Un point souvent négligé : la DLC fixée par le fabricant suppose une conservation dans les conditions qu'il indique, en général une température de réfrigération précise. Une denrée qui a séjourné hors du froid, même avant sa date, peut déjà être compromise. La date imprimée n'est valable que si la chaîne du froid a tenu jusque-là.",
    },
    {
      type: 'h3',
      text: "DDM : « à consommer de préférence avant »",
    },
    {
      type: 'p',
      text: "La date de durabilité minimale concerne des produits stables : conserves, pâtes, riz, légumes secs, épices, café, farine, produits déshydratés. Passé ce repère, le produit peut perdre en goût, en texture, en couleur ou en valeur nutritionnelle, mais il reste consommable s'il a été correctement stocké et que son emballage est intact. Servir un produit après sa DDM n'est pas interdit en soi. Encore faut-il pouvoir le justifier, vérifier l'absence de gonflement, de rouille, de moisissure ou d'odeur anormale, et trancher au cas par cas. Une conserve bombée ou une boîte fuyante part à la poubelle, peu importe la date.",
    },
    {
      type: 'callout',
      title: 'Le réflexe à retenir',
      text: "DLC égale sécurité. Si la DLC est dépassée, on jette, sans discussion et sans compensation. DDM égale qualité. Si la DDM est dépassée, on évalue l'état réel du produit avant de décider. En cas de doute sur une denrée, quelle que soit la date affichée, la prudence prime : on ne sert pas.",
    },
    {
      type: 'h2',
      id: 'tracabilite-obligation',
      text: "La traçabilité : une obligation, pas une option",
    },
    {
      type: 'p',
      text: "Le règlement (CE) 178/2002 pose les principes généraux de la législation alimentaire et impose, à son article 18, la traçabilité à tous les stades de la chaîne. Tout exploitant du secteur alimentaire doit pouvoir identifier ses fournisseurs et, lorsque c'est pertinent, ses clients professionnels. C'est le principe dit « une étape en amont, une étape en aval » : vous devez savoir de qui vous avez reçu une denrée et, le cas échéant, à qui vous l'avez livrée. Pour un restaurant qui sert directement le consommateur final, l'aval s'arrête à l'assiette, mais l'amont reste pleinement exigible.",
    },
    {
      type: 'p',
      text: "L'objet de cette obligation n'est pas administratif. En cas d'alerte sanitaire, de toxi-infection ou de retrait d'un lot par un fournisseur, la traçabilité est ce qui permet de réagir vite, de cibler les produits concernés et d'éviter qu'une denrée suspecte ne soit servie. Sans elle, un établissement est aveugle au moment précis où il devrait agir.",
    },
    {
      type: 'h3',
      text: 'Les documents à conserver',
    },
    {
      type: 'p',
      text: "En restauration, la traçabilité amont repose sur des documents simples, à condition de les garder et de pouvoir les retrouver :",
    },
    {
      type: 'ul',
      items: [
        'Les bons de livraison et factures fournisseurs, qui identifient le produit, le lot, la quantité et la date de réception.',
        "Les étiquettes d'origine des denrées, en particulier les produits d'origine animale, qui portent un numéro de lot et une estampille sanitaire ovale.",
        "Les enregistrements internes de réception : contrôle des températures à l'arrivée, état des emballages, refus éventuels.",
        "Les étiquettes internes apposées sur les produits ouverts, décongelés ou transformés en cuisine.",
      ],
    },
    {
      type: 'p',
      text: "Il n'existe pas de durée de conservation universelle imposée pour ces justificatifs : elle dépend de la nature des produits et de leur durée de vie. L'usage raisonnable consiste à garder les documents au moins le temps de pouvoir relier un produit servi à sa réception. Pour les produits d'origine animale, conservez l'étiquette ou l'estampille au minimum jusqu'à l'écoulement complet du lot, et de préférence un peu au-delà. Un classeur de bons de livraison rangé par date, complété par les étiquettes décollées des cartons et glissées dans une pochette, suffit dans la plupart des cuisines.",
    },
    {
      type: 'h2',
      id: 'etiquetage-produits-ouverts',
      text: "Étiqueter les produits ouverts et déconditionnés",
    },
    {
      type: 'p',
      text: "Dès qu'un produit est sorti de son emballage d'origine, la DLC du fournisseur ne s'applique plus telle quelle. Cette date a été calculée pour un produit fermé, sous atmosphère contrôlée ou sous vide. Une fois ouvert, le produit est exposé à l'air, aux manipulations et aux contaminations de la cuisine : sa durée de conservation se réduit, parfois fortement. Vous devez alors apposer une étiquette interne mentionnant la date d'ouverture ou de fabrication, et la nouvelle date limite d'utilisation que vous avez fixée. C'est ce qu'on appelle la durée de vie secondaire.",
    },
    {
      type: 'h3',
      text: "Comment fixer la durée de vie secondaire",
    },
    {
      type: 'p',
      text: "Cette date interne ne se devine pas, elle se justifie. Elle se définit à partir de trois sources convergentes : les recommandations du fabricant, souvent imprimées sur l'emballage sous la forme « à consommer dans les 3 jours après ouverture » ou « 48 heures après ouverture » ; votre plan de maîtrise sanitaire, qui formalise vos propres durées par famille de produits ; et le guide de bonnes pratiques d'hygiène de votre secteur d'activité. Quand le fabricant donne une indication, elle prime et fixe le plafond. En l'absence d'indication, votre PMS doit documenter le raisonnement et, idéalement, s'appuyer sur des durées prudentes validées par l'expérience du secteur.",
    },
    {
      type: 'p',
      text: "L'étiquette interne doit rester lisible, solidaire du contenant et compréhensible par n'importe quel membre de l'équipe, pas seulement par celui qui l'a posée. Une date au feutre effacé sur un film alimentaire ne vaut rien le jour du contrôle.",
    },
    {
      type: 'h3',
      text: 'Le déconditionnement',
    },
    {
      type: 'p',
      text: "Transvaser une denrée de son emballage d'origine vers un autre contenant, bac gastronome, boîte hermétique, seau, est un déconditionnement. Le nouveau contenant doit porter au minimum le nom du produit et la date limite d'utilisation interne. Sans cette étiquette, un produit déconditionné devient anonyme : impossible de le dater, impossible d'en retrouver l'origine, impossible de savoir s'il faut le servir ou le jeter. C'est l'une des non-conformités les plus fréquentes relevées en cuisine, parce qu'elle se produit dans le feu de la production, quand on vide une grosse boîte de cornichons dans un bac de service sans prendre la seconde nécessaire pour étiqueter.",
    },
    {
      type: 'callout',
      title: 'Exemple de non-conformité courante',
      text: "Un bac de crème pâtissière maison sans aucune indication, posé en chambre froide. L'auditeur ne peut ni le dater, ni savoir s'il s'agit d'une préparation du jour ou de la veille. En l'absence de date de fabrication et de date limite d'utilisation, le produit est traité comme non maîtrisé. La règle est simple : pas d'étiquette, pas de date, donc produit à écarter.",
    },
    {
      type: 'h2',
      id: 'decongelation',
      text: 'Le cas particulier des produits décongelés',
    },
    {
      type: 'p',
      text: "La décongélation est un point sensible, parce qu'elle relance l'activité microbienne suspendue par le froid négatif. Un produit décongelé ne doit jamais être recongelé : un cycle de recongélation multiplie les paliers de température favorables aux bactéries et fait perdre toute maîtrise sur l'historique du produit. Dès la sortie du congélateur, vous fixez une date limite d'utilisation courte et vous l'inscrivez sur une étiquette. La DLC ou la DDM d'origine du produit surgelé ne s'applique plus une fois la décongélation engagée, elle visait l'état congelé.",
    },
    {
      type: 'p',
      text: "L'étiquette d'un produit décongelé indique au minimum la dénomination, la date de mise en décongélation et la date limite d'utilisation interne. La décongélation se fait au froid positif, en chambre froide, et non à température ambiante, ce qui rallongerait le temps passé dans la zone de danger. L'absence de date sur un produit décongelé empêche de savoir depuis combien de temps il est mobilisable, et c'est précisément ce qu'un inspecteur regarde de près. Un filet de poisson décongelé non daté, posé sur une grille en chambre froide, est un constat classique.",
    },
    {
      type: 'quote',
      text: "Une cuisine bien tracée n'est pas une cuisine sans erreur, c'est une cuisine où chaque produit peut être daté et retrouvé en quelques secondes.",
    },
    {
      type: 'h2',
      id: 'peps-fifo',
      text: "La règle d'antériorité : PEPS (FIFO)",
    },
    {
      type: 'p',
      text: "PEPS signifie « premier entré, premier sorti », traduction française de l'anglais FIFO, first in first out. C'est la règle de rotation des stocks : on utilise en priorité les produits dont la date limite est la plus proche, et l'on range les denrées de façon à ce que les plus anciennes restent accessibles. Bien appliquée, cette règle évite que des produits dorment au fond d'une chambre froide ou d'une étagère jusqu'au dépassement de leur date, ce qui génère à la fois des pertes financières et des non-conformités.",
    },
    {
      type: 'p',
      text: "Une variante existe pour certaines denrées, le PDPS, « premier dépassé, premier sorti », qui se cale sur la date limite plutôt que sur la date d'entrée. Les deux logiques visent le même objectif : faire tourner le stock avant que le temps ne joue contre vous.",
    },
    {
      type: 'p',
      text: "Pour mettre la rotation en pratique au quotidien :",
    },
    {
      type: 'ol',
      items: [
        "À la réception, contrôlez les dates, puis placez les produits les plus anciens devant et les nouveaux derrière.",
        'Avant chaque service, repérez les denrées dont la date approche et planifiez leur utilisation en priorité.',
        "Étiquetez tout produit ouvert, décongelé ou déconditionné avec sa date interne, dès l'opération et non plus tard.",
        "Sortez et écartez immédiatement toute denrée à DLC dépassée pour éviter qu'elle ne reparte vers la production.",
        'Notez les pertes et les retraits pour suivre les écarts, ajuster vos commandes et limiter le gaspillage.',
      ],
    },
    {
      type: 'h2',
      id: 'produits-non-conformes',
      text: 'Gérer les produits non conformes, retraits et rappels',
    },
    {
      type: 'p',
      text: "La traçabilité ne sert pleinement que le jour où quelque chose tourne mal. Lorsqu'un produit se révèle non conforme, DLC dépassée, denrée altérée, lot signalé par un fournisseur, il ne suffit pas de le retirer du service : il faut l'isoler physiquement pour éviter toute utilisation accidentelle. La pratique consiste à placer le produit dans une zone identifiée, séparée des denrées saines, avec une mention claire du type « ne pas utiliser », en attendant son élimination ou son traitement.",
    },
    {
      type: 'h3',
      text: 'Retrait et rappel : deux niveaux',
    },
    {
      type: 'p',
      text: "Un retrait vise à empêcher la distribution d'un produit dangereux qui n'est pas encore parvenu au consommateur final. Un rappel intervient quand le produit a déjà pu être consommé : il s'accompagne alors d'une information du public. Pour un restaurant, l'enjeu est surtout de savoir réagir vite quand un fournisseur ou une plateforme officielle signale un lot. C'est là que les bons de livraison et les étiquettes conservées prennent tout leur sens : ils permettent de vérifier en quelques minutes si le lot incriminé est passé par vos cuisines, et si oui, en quelle quantité.",
    },
    {
      type: 'p',
      text: "Lorsqu'un exploitant constate qu'une denrée qu'il a mise sur le marché peut être préjudiciable à la santé, le règlement (CE) 178/2002 lui impose d'engager les procédures de retrait et d'informer les autorités compétentes. Le site officiel RappelConso recense les rappels de produits en France et constitue une source à surveiller. La direction générale de la concurrence, de la consommation et de la répression des fraudes (DGCCRF) publie également des consignes en la matière.",
    },
    {
      type: 'callout',
      title: 'Réflexe en cas d alerte sur un lot',
      text: "À la réception d'une information de rappel, identifiez le numéro de lot concerné, croisez-le avec vos bons de livraison et vos étiquettes conservées, isolez immédiatement tout produit correspondant encore en stock, et conservez la trace écrite de votre vérification. Même si rien ne correspond, gardez la preuve d'avoir contrôlé : c'est ce qui démontre un système actif.",
    },
    {
      type: 'h2',
      id: 'controle-verification',
      text: 'Ce que vérifie un contrôle',
    },
    {
      type: 'p',
      text: "Lors d'un contrôle officiel, conduit par les services compétents au titre du règlement (CE) 852/2004 sur l'hygiène des denrées, l'inspecteur s'assure que le système de traçabilité et de gestion des dates est cohérent et réellement appliqué, pas seulement formalisé sur le papier. Un PMS impeccable dans un classeur ne pèse rien si la cuisine raconte une autre histoire. Les points classiquement examinés :",
    },
    {
      type: 'ul',
      items: [
        'Présence et lisibilité des étiquettes internes sur les produits ouverts, décongelés et déconditionnés.',
        "Absence de denrées à DLC dépassée en stock, en réserve ou en zone de préparation.",
        "Cohérence entre les dates internes affichées et les procédures écrites du plan de maîtrise sanitaire.",
        "Conservation des étiquettes d'origine et des bons de livraison, notamment pour les produits d'origine animale.",
        "Capacité à retrouver l'origine d'un produit servi, le fameux « une étape en amont ».",
        "Application visible de la règle PEPS dans l'organisation physique des stocks.",
        "Bonne séparation et identification des produits non conformes en attente d'élimination.",
      ],
    },
    {
      type: 'p',
      text: "Une traçabilité défaillante n'est jamais une simple formalité administrative. En cas de toxi-infection alimentaire ou d'alerte sur un lot, c'est elle qui permet d'identifier et de retirer les produits concernés avant qu'ils ne fassent d'autres victimes. Voilà pourquoi elle pèse lourd dans l'appréciation d'un établissement, et pourquoi un inspecteur insiste autant sur la capacité concrète à dater et à retrouver un produit, plutôt que sur l'existence formelle de documents.",
    },
    {
      type: 'h3',
      text: 'Exemples de non-conformités fréquentes',
    },
    {
      type: 'ul',
      items: [
        "Bac de denrée déconditionnée sans nom ni date, impossible à identifier.",
        "Produit décongelé posé en chambre froide sans date de mise en décongélation.",
        "Charcuterie ou produit laitier frais à DLC dépassée encore en service.",
        "Étiquette interne illisible ou décollée, date au feutre effacé.",
        "Aucune conservation des bons de livraison ou des étiquettes des produits d'origine animale.",
        "Produit recongelé après décongélation, en infraction avec la règle de base.",
      ],
    },
    {
      type: 'h2',
      id: 'audit-prive',
      text: "Préparer ces points avec un audit hygiène",
    },
    {
      type: 'p',
      text: "audit hygiène est un label privé indépendant, fondé sur la réglementation hygiène et HACCP en vigueur. Ce n'est ni une certification d'État, ni un agrément réglementaire, ni un contrôle des services vétérinaires ou de la DDPP, et il ne garantit aucun résultat à un contrôle officiel. Notre rôle est de vous aider à anticiper. Un auditeur passe en revue votre traçabilité amont, vos étiquetages internes, votre durée de vie secondaire, la gestion de vos décongélations et votre rotation des stocks, repère les écarts et vous remet un plan correctif concret, hiérarchisé par priorité. Vous abordez ainsi un éventuel contrôle officiel avec une organisation déjà cadrée et des réflexes installés en cuisine.",
    },
  ],
  faq: [
    {
      q: 'Quelle est la différence entre DLC et DDM ?',
      a: "La DLC (« à consommer jusqu'au ») est une limite sanitaire : au-delà, le produit présente un risque et doit être jeté. La DDM (« à consommer de préférence avant ») concerne la qualité gustative ou nutritionnelle : passée cette date, un produit correctement conservé et à l'emballage intact reste consommable, à évaluer au cas par cas.",
    },
    {
      q: "Peut-on utiliser un produit dont la DDM est dépassée en restaurant ?",
      a: "Oui, ce n'est pas interdit tant que le produit a été stocké correctement et reste sain. Vous devez vérifier son état (aspect, odeur, intégrité de l'emballage, absence de gonflement ou de fuite) et pouvoir justifier votre choix. À la moindre altération, on l'écarte sans hésiter.",
    },
    {
      q: "Faut-il ré-étiqueter un produit une fois ouvert ?",
      a: "Oui. Dès l'ouverture, la DLC du fournisseur ne s'applique plus telle quelle, car elle visait le produit fermé. Vous apposez une étiquette interne avec la date d'ouverture et la date limite d'utilisation interne, définie selon les recommandations du fabricant, votre plan de maîtrise sanitaire et le guide de bonnes pratiques de votre secteur.",
    },
    {
      q: "Comment étiqueter un produit décongelé ?",
      a: "Dès la sortie du congélateur, l'étiquette indique la dénomination, la date de mise en décongélation et la date limite d'utilisation interne, qui est courte. La décongélation se fait au froid positif. Un produit décongelé ne se recongèle jamais.",
    },
    {
      q: "Que signifie la règle PEPS (FIFO) ?",
      a: "PEPS veut dire « premier entré, premier sorti » (FIFO en anglais). On utilise en priorité les produits dont la date limite est la plus proche, en plaçant les plus anciens devant et les nouveaux derrière. Cela limite les pertes, le gaspillage et les dépassements de date.",
    },
    {
      q: "Combien de temps conserver les étiquettes et bons de livraison ?",
      a: "Il n'y a pas de durée universelle imposée : elle dépend de la nature et de la durée de vie des produits. L'usage est de garder les justificatifs au moins le temps de relier un produit servi à sa réception, et de conserver les étiquettes des produits d'origine animale jusqu'à l'écoulement complet du lot, voire un peu au-delà.",
    },
    {
      q: "Pourquoi la traçabilité est-elle si importante lors d'un contrôle ?",
      a: "Parce qu'elle permet, en cas d'alerte ou de retrait de lot, d'identifier et de retirer rapidement les produits concernés. Le règlement (CE) 178/2002 l'impose à tout exploitant : savoir d'où vient chaque denrée et, le cas échéant, où elle est allée, une étape en amont et une étape en aval.",
    },
    {
      q: "Que faire d'un produit non conforme ou d'un lot rappelé ?",
      a: "Isolez physiquement le produit dans une zone séparée et identifiée, avec une mention claire interdisant son usage, en attendant son élimination. Pour un lot rappelé, croisez le numéro de lot avec vos bons de livraison et vos étiquettes conservées, retirez tout produit correspondant et gardez la trace écrite de votre vérification.",
    },
    {
      q: "Peut-on recongeler un produit décongelé ?",
      a: "Non. Recongeler un produit décongelé relance et amplifie l'activité microbienne, fait perdre la maîtrise de son historique de température et expose à un risque sanitaire. La règle est constante en cuisine : un produit décongelé se consomme dans un délai court, jamais après une nouvelle congélation.",
    },
  ],
  sources: [
    {
      label: 'Règlement (CE) n° 178/2002 (principes généraux, traçabilité, retraits) - EUR-Lex',
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32002R0178',
    },
    {
      label: "Règlement (UE) n° 1169/2011 (information des consommateurs, DLC/DDM) - EUR-Lex",
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32011R1169',
    },
    {
      label: "Règlement (CE) n° 852/2004 (hygiène des denrées alimentaires) - EUR-Lex",
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004R0852',
    },
    {
      label: 'Code de la consommation (étiquetage et information du consommateur) - Legifrance',
      url: 'https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565/',
    },
    {
      label: 'DGCCRF (dates de consommation, retraits et rappels) - economie.gouv.fr',
      url: 'https://www.economie.gouv.fr/dgccrf',
    },
    {
      label: "Ministère de l'Agriculture et de la Souveraineté alimentaire (sécurité sanitaire) - agriculture.gouv.fr",
      url: 'https://agriculture.gouv.fr/',
    },
  ],
  related: [
    'chaine-du-froid-restauration',
    'plan-maitrise-sanitaire-pms',
    'controle-sanitaire-restaurant',
  ],
  relatedZones: ['paris', 'hauts-de-seine', 'seine-saint-denis'],
};
