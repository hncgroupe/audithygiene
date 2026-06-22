import type { Article } from './types';

export const article: Article = {
  slug: 'tracabilite-dlc-restaurant',
  title: 'Traçabilité, DLC et DDM en restaurant : le guide pratique',
  metaTitle: 'Traçabilité, DLC et DDM en restaurant : le guide',
  description:
    'DLC ou DDM, étiquetage des produits décongelés et ouverts, règle PEPS/FIFO, conservation des étiquettes : ce que vérifie un contrôle en restauration.',
  excerpt:
    'Comment distinguer DLC et DDM, étiqueter les produits ouverts ou décongelés et tenir une traçabilité solide face à un contrôle.',
  category: 'Pratique',
  datePublished: '2026-06-05',
  dateModified: '2026-06-05',
  readingMinutes: 8,
  answer:
    "En restauration, la DLC (date limite de consommation, mention « à consommer jusqu'au ») marque une limite sanitaire stricte : un produit dépassé doit être jeté. La DDM (date de durabilité minimale, « à consommer de préférence avant ») concerne la qualité, pas la sécurité. La traçabilité, imposée par le règlement (CE) 178/2002, oblige à savoir d'où vient chaque denrée et où elle est allée. En pratique, vous conservez les étiquettes et bons de livraison, et vous ré-étiquetez les produits ouverts, décongelés ou déconditionnés avec une date interne.",
  blocks: [
    {
      type: 'p',
      text: "La gestion des dates et la traçabilité font partie des points les plus regardés lors d'un contrôle sanitaire. Ce sont aussi des sources fréquentes de non-conformités, souvent par méconnaissance plutôt que par négligence. Cet article clarifie la différence entre DLC et DDM, explique comment étiqueter un produit une fois ouvert ou décongelé, et détaille ce qu'un inspecteur cherche réellement à vérifier.",
    },
    {
      type: 'h2',
      id: 'dlc-ddm-difference',
      text: 'DLC et DDM : deux dates, deux logiques',
    },
    {
      type: 'p',
      text: "La confusion entre ces deux mentions est courante en cuisine. Elle n'est pourtant pas anodine : l'une touche à la sécurité du consommateur, l'autre seulement à la qualité du produit. Le règlement (UE) 1169/2011, dit règlement INCO, fixe ces définitions au niveau européen.",
    },
    {
      type: 'h3',
      text: "DLC : « à consommer jusqu'au »",
    },
    {
      type: 'p',
      text: "La date limite de consommation s'applique aux denrées microbiologiquement très périssables : viandes hachées, charcuteries, produits laitiers frais, plats préparés réfrigérés, poissons. Au-delà de cette date, le produit présente un risque sanitaire et ne doit plus être ni servi, ni utilisé en préparation. Une DLC dépassée trouvée en cuisine est systématiquement relevée par un contrôle.",
    },
    {
      type: 'h3',
      text: "DDM : « à consommer de préférence avant »",
    },
    {
      type: 'p',
      text: "La date de durabilité minimale concerne des produits stables : conserves, pâtes, riz, épices, café, produits secs. Passée cette date, le produit peut perdre en goût, en texture ou en valeur nutritionnelle, mais reste consommable s'il a été correctement stocké. Servir un produit après sa DDM n'est pas interdit en soi, à condition qu'il soit sain. Il faut toutefois pouvoir le justifier et l'évaluer au cas par cas.",
    },
    {
      type: 'callout',
      title: 'Le réflexe à retenir',
      text: "DLC = sécurité. Si la DLC est dépassée, on jette, sans discussion. DDM = qualité. Si la DDM est dépassée, on évalue l'état réel du produit avant de décider. En cas de doute sur une denrée, la prudence prime : on ne sert pas.",
    },
    {
      type: 'h2',
      id: 'tracabilite-obligation',
      text: "La traçabilité : une obligation, pas une option",
    },
    {
      type: 'p',
      text: "Le règlement (CE) 178/2002 impose à tout exploitant du secteur alimentaire de pouvoir identifier ses fournisseurs et les denrées reçues. C'est le principe dit « une étape en amont, une étape en aval » : vous devez savoir de qui vous avez reçu un produit, et être capable de le retrouver. En cas d'alerte sanitaire ou de retrait de lot, cette information permet de réagir vite et de cibler les produits concernés.",
    },
    {
      type: 'p',
      text: "Concrètement, en restauration, la traçabilité repose sur des documents simples à conserver :",
    },
    {
      type: 'ul',
      items: [
        'Les bons de livraison et factures fournisseurs, qui identifient le produit, le lot et la date de réception.',
        "Les étiquettes d'origine des denrées, en particulier pour les produits d'origine animale (numéro de lot, estampille sanitaire).",
        "Les enregistrements internes de réception (contrôle des températures à réception, état des emballages).",
        'Les étiquettes internes apposées sur les produits ouverts, décongelés ou transformés.',
      ],
    },
    {
      type: 'p',
      text: "Il n'existe pas de durée de conservation universelle pour ces documents : elle dépend de la nature des produits et de leur durée de vie. L'usage est de garder les justificatifs au moins le temps de pouvoir relier un produit servi à sa réception. Conservez les étiquettes des produits d'origine animale au minimum jusqu'à l'écoulement complet du lot.",
    },
    {
      type: 'h2',
      id: 'etiquetage-produits-ouverts',
      text: "Étiqueter les produits ouverts et déconditionnés",
    },
    {
      type: 'p',
      text: "Dès qu'un produit est sorti de son emballage d'origine, sa DLC fournisseur ne s'applique plus telle quelle. Une fois ouvert, le produit est exposé à l'air et aux manipulations : sa durée de conservation se réduit. Vous devez alors apposer une étiquette interne mentionnant la date d'ouverture ou de fabrication, et la nouvelle date limite d'utilisation que vous avez fixée.",
    },
    {
      type: 'p',
      text: "Cette date interne se définit selon les recommandations du fabricant (souvent indiquées sur l'emballage, par exemple « à consommer dans les 3 jours après ouverture »), votre plan de maîtrise sanitaire et le guide de bonnes pratiques d'hygiène de votre secteur. L'étiquette interne doit rester lisible et solidaire du contenant.",
    },
    {
      type: 'h3',
      text: 'Le déconditionnement',
    },
    {
      type: 'p',
      text: "Transvaser une denrée de son emballage d'origine vers un autre contenant (bac, boîte hermétique) est un déconditionnement. Le nouveau contenant doit porter le nom du produit et la date limite d'utilisation interne. Sans étiquette, un produit déconditionné devient non identifiable : c'est une non-conformité fréquente, car l'auditeur ne peut ni dater le produit, ni en vérifier l'origine.",
    },
    {
      type: 'h2',
      id: 'decongelation',
      text: 'Le cas particulier des produits décongelés',
    },
    {
      type: 'p',
      text: "La décongélation est un point sensible. Un produit décongelé ne doit jamais être recongelé. Dès la sortie du congélateur, vous fixez une date limite d'utilisation courte et vous l'inscrivez sur une étiquette. La DLC ou la DDM d'origine du produit surgelé ne s'applique plus une fois la décongélation lancée.",
    },
    {
      type: 'p',
      text: "L'étiquette d'un produit décongelé indique au minimum la dénomination, la date de mise en décongélation et la date limite d'utilisation. C'est l'un des éléments qu'un inspecteur regarde de près, car l'absence de date sur un produit décongelé empêche de savoir depuis combien de temps il est mobilisable.",
    },
    {
      type: 'h2',
      id: 'peps-fifo',
      text: "La règle d'antériorité : PEPS (FIFO)",
    },
    {
      type: 'p',
      text: "PEPS signifie « premier entré, premier sorti » (en anglais FIFO, first in first out). C'est la règle de rotation des stocks : on utilise en priorité les produits dont la date limite est la plus proche. Bien appliquée, elle évite que des denrées dorment au fond d'une chambre froide jusqu'à dépassement de leur date.",
    },
    {
      type: 'p',
      text: "Pour la mettre en pratique au quotidien :",
    },
    {
      type: 'ol',
      items: [
        "À la réception, contrôlez les dates et placez les produits les plus anciens devant, les nouveaux derrière.",
        'Avant chaque service, repérez les produits dont la date approche et planifiez leur utilisation en priorité.',
        "Étiquetez tout produit ouvert, décongelé ou déconditionné avec sa date interne, dès l'opération.",
        'Sortez et écartez immédiatement toute denrée à DLC dépassée pour éviter qu\'elle ne reparte en production.',
        "Notez les pertes et les retraits pour suivre les écarts et ajuster vos commandes.",
      ],
    },
    {
      type: 'h2',
      id: 'controle-verification',
      text: 'Ce que vérifie un contrôle',
    },
    {
      type: 'p',
      text: "Lors d'un contrôle officiel, l'inspecteur s'assure que le système de traçabilité et de gestion des dates est cohérent et appliqué, pas seulement formalisé sur le papier. Les points classiquement examinés :",
    },
    {
      type: 'ul',
      items: [
        'Présence et lisibilité des étiquettes internes sur les produits ouverts, décongelés et déconditionnés.',
        "Absence de denrées à DLC dépassée en stock ou en zone de préparation.",
        "Cohérence entre les dates internes affichées et vos procédures écrites (PMS).",
        "Conservation des étiquettes d'origine et des bons de livraison, notamment pour les produits d'origine animale.",
        "Capacité à retrouver l'origine d'un produit servi (le « une étape en amont »).",
        "Application visible de la règle PEPS dans l'organisation des stocks.",
      ],
    },
    {
      type: 'p',
      text: "Une traçabilité défaillante n'est pas qu'une formalité administrative : en cas de toxi-infection alimentaire ou d'alerte sur un lot, c'est elle qui permet d'identifier et de retirer les produits concernés. C'est pourquoi elle pèse lourd dans l'appréciation d'un établissement.",
    },
    {
      type: 'h2',
      id: 'audit-prive',
      text: "Préparer ces points avec un audit hygiène",
    },
    {
      type: 'p',
      text: "audit hygiène est un label privé indépendant, basé sur la réglementation hygiène et HACCP en vigueur. Ce n'est ni une certification d'État, ni un contrôle des services vétérinaires, et il ne garantit aucun résultat à un contrôle officiel. Notre rôle est de vous aider à anticiper : un auditeur passe en revue votre traçabilité, vos étiquetages internes et votre rotation des stocks, identifie les écarts et vous remet un plan correctif concret. Vous avancez ainsi vers un contrôle officiel avec une organisation déjà cadrée.",
    },
    {
      type: 'quote',
      text: "Une cuisine bien tracée n'est pas une cuisine sans erreur, c'est une cuisine où chaque produit peut être daté et retrouvé en quelques secondes.",
    },
  ],
  faq: [
    {
      q: 'Quelle est la différence entre DLC et DDM ?',
      a: "La DLC (« à consommer jusqu'au ») est une limite sanitaire : au-delà, le produit présente un risque et doit être jeté. La DDM (« à consommer de préférence avant ») concerne la qualité gustative ou nutritionnelle : passée cette date, un produit correctement conservé reste consommable, à évaluer au cas par cas.",
    },
    {
      q: "Peut-on utiliser un produit dont la DDM est dépassée en restaurant ?",
      a: "Oui, ce n'est pas interdit tant que le produit a été stocké correctement et reste sain. Il faut toutefois vérifier son état (aspect, odeur, intégrité de l'emballage) et pouvoir justifier ce choix. À la moindre altération, on l'écarte.",
    },
    {
      q: "Faut-il ré-étiqueter un produit une fois ouvert ?",
      a: "Oui. Dès l'ouverture, la DLC fournisseur ne s'applique plus telle quelle. Vous apposez une étiquette interne avec la date d'ouverture et la date limite d'utilisation interne, définie selon les recommandations du fabricant et votre plan de maîtrise sanitaire.",
    },
    {
      q: "Comment étiqueter un produit décongelé ?",
      a: "Dès la sortie du congélateur, l'étiquette indique la dénomination, la date de mise en décongélation et la date limite d'utilisation interne, qui est courte. Un produit décongelé ne se recongèle jamais.",
    },
    {
      q: "Que signifie la règle PEPS (FIFO) ?",
      a: "PEPS veut dire « premier entré, premier sorti » (FIFO en anglais). On utilise en priorité les produits dont la date limite est la plus proche, en plaçant les plus anciens devant. Cela limite les pertes et les dépassements de date.",
    },
    {
      q: "Combien de temps conserver les étiquettes et bons de livraison ?",
      a: "Il n'y a pas de durée universelle : elle dépend de la nature et de la durée de vie des produits. L'usage est de garder les justificatifs au moins le temps de relier un produit servi à sa réception, et de conserver les étiquettes des produits d'origine animale jusqu'à écoulement complet du lot.",
    },
    {
      q: "Pourquoi la traçabilité est-elle si importante lors d'un contrôle ?",
      a: "Parce qu'elle permet, en cas d'alerte ou de retrait de lot, d'identifier et de retirer rapidement les produits concernés. Le règlement (CE) 178/2002 l'impose à tout exploitant : savoir d'où vient chaque denrée et où elle est allée.",
    },
  ],
  sources: [
    {
      label: 'Règlement (CE) n° 178/2002 (principes généraux, traçabilité) - EUR-Lex',
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32002R0178',
    },
    {
      label: "Règlement (UE) n° 1169/2011 (information des consommateurs, DLC/DDM) - EUR-Lex",
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32011R1169',
    },
    {
      label: 'Date limite de consommation (DLC) et date de durabilité minimale (DDM) - DGCCRF, economie.gouv.fr',
      url: 'https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/dates-limites-de-consommation',
    },
    {
      label: 'Code de la consommation (étiquetage et information du consommateur) - Legifrance',
      url: 'https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565/',
    },
  ],
  related: [
    'chaine-du-froid-restauration',
    'plan-maitrise-sanitaire-pms',
    'controle-sanitaire-restaurant',
  ],
  relatedZones: ['paris', 'hauts-de-seine', 'seine-saint-denis'],
};
