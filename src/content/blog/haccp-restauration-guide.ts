import type { Article } from './types';

export const article: Article = {
  slug: 'haccp-restauration-guide',
  title: 'HACCP en restauration : le guide complet',
  metaTitle: 'HACCP en restauration : le guide complet',
  description:
    'HACCP en restauration : définition, les 7 principes, les 12 étapes, formation obligatoire et lien avec le plan de maîtrise sanitaire. Le guide pour appliquer en cuisine.',
  excerpt:
    "Définition, 7 principes, 12 étapes, formation et plan de maîtrise sanitaire : tout ce qu'un restaurateur doit savoir pour appliquer la méthode HACCP en cuisine.",
  category: 'Méthode',
  datePublished: '2026-06-12',
  dateModified: '2026-06-12',
  readingMinutes: 9,
  answer:
    "Le HACCP (Hazard Analysis Critical Control Point) est une méthode d'analyse des dangers et de maîtrise des points critiques pour la sécurité des aliments. En restauration, tout établissement qui manipule des denrées doit fonder son hygiène sur les principes HACCP : c'est une obligation issue du règlement européen 852/2004. Concrètement, le restaurateur identifie les dangers (microbiologiques, chimiques, physiques), détermine les points où il doit les maîtriser, fixe des limites et tient des enregistrements. Au moins une personne de l'établissement doit avoir suivi la formation hygiène alimentaire.",
  blocks: [
    {
      type: 'p',
      text: "Derrière l'acronyme HACCP se cache la colonne vertébrale de toute cuisine professionnelle. Ce n'est pas un document à ranger dans un classeur, mais une façon de raisonner : où mon produit peut-il devenir dangereux, et qu'est-ce que je fais pour l'éviter. Ce guide reprend la définition, les 7 principes, les 12 étapes de mise en place, l'obligation de formation et le lien avec le plan de maîtrise sanitaire, avec une lecture orientée terrain.",
    },
    {
      type: 'h2',
      id: 'definition-haccp',
      text: 'HACCP : définition et origine',
    },
    {
      type: 'p',
      text: "HACCP signifie Hazard Analysis Critical Control Point, soit en français analyse des dangers et maîtrise des points critiques. La méthode est née dans les années 1960 pour sécuriser l'alimentation des astronautes de la NASA, l'idée étant de garantir un produit sain sans pouvoir tester chaque portion. Elle a ensuite été codifiée par le Codex Alimentarius, l'instance de référence FAO/OMS, qui en a fixé les principes reconnus dans le monde entier.",
    },
    {
      type: 'p',
      text: "Le principe est préventif. Plutôt que de contrôler le plat fini, on maîtrise le processus à chaque étape sensible : réception, stockage, préparation, cuisson, refroidissement, service. On agit avant que le danger n'apparaisse, pas après.",
    },
    {
      type: 'h2',
      id: 'obligation-restauration',
      text: 'Le HACCP est-il obligatoire en restauration ?',
    },
    {
      type: 'p',
      text: "Oui. Le règlement (CE) 852/2004 relatif à l'hygiène des denrées alimentaires impose à tout exploitant du secteur alimentaire de mettre en place, appliquer et maintenir des procédures fondées sur les principes HACCP. Cela vaut pour les restaurants, les traiteurs, la vente à emporter, les food trucks et la restauration collective. La taille de l'établissement ne dispense pas de l'obligation : elle module seulement la souplesse de mise en oeuvre.",
    },
    {
      type: 'p',
      text: "Pour les très petites structures, le règlement admet une approche allégée et l'appui sur un guide de bonnes pratiques d'hygiène (GBPH) validé pour le secteur. Le GBPH traduit les principes HACCP en consignes concrètes adaptées au métier, ce qui simplifie la démarche sans la supprimer.",
    },
    {
      type: 'callout',
      title: 'HACCP, PMS, GBPH : trois mots, une seule logique',
      text: "Le HACCP est la méthode. Le plan de maîtrise sanitaire (PMS) est le document qui formalise tout ce que vous faites pour garantir la sécurité des aliments, dont la démarche HACCP. Le GBPH est l'aide sectorielle qui propose des mesures déjà cadrées. Les trois se complètent : la méthode pense, le PMS écrit, le GBPH guide.",
    },
    {
      type: 'h2',
      id: 'les-7-principes',
      text: 'Les 7 principes du HACCP',
    },
    {
      type: 'p',
      text: 'Le Codex Alimentarius définit sept principes. Ils forment le coeur de la méthode et structurent toute démarche, quelle que soit la cuisine.',
    },
    {
      type: 'ol',
      items: [
        'Procéder à une analyse des dangers : identifier les dangers biologiques, chimiques et physiques associés à chaque étape, et les mesures pour les maîtriser.',
        'Déterminer les points critiques pour la maîtrise (CCP) : les étapes où un contrôle est indispensable pour éliminer un danger ou le ramener à un niveau acceptable, par exemple la cuisson ou le refroidissement.',
        'Fixer des limites critiques : définir pour chaque CCP un seuil mesurable (une température, une durée) qui sépare le conforme du non conforme.',
        "Mettre en place une surveillance des CCP : prévoir comment et quand on contrôle chaque point critique, par exemple relever la température d'une enceinte froide.",
        'Définir les actions correctives : décider à l\'avance quoi faire quand une limite est dépassée (jeter, recuire, isoler, régler l\'équipement).',
        'Vérifier le système : contrôler régulièrement que la méthode fonctionne, par étalonnage des sondes, relecture des relevés ou analyses.',
        "Tenir des enregistrements : conserver les preuves écrites (relevés de température, traçabilité, plan de nettoyage) qui montrent que la maîtrise est réelle.",
      ],
    },
    {
      type: 'h2',
      id: 'les-12-etapes',
      text: 'Les 12 étapes de mise en place',
    },
    {
      type: 'p',
      text: "Le Codex Alimentarius décline ces principes en une démarche en douze étapes. Les cinq premières sont préparatoires, les sept suivantes correspondent aux sept principes. C'est la feuille de route concrète pour bâtir un système HACCP.",
    },
    {
      type: 'ol',
      items: [
        "Constituer l'équipe HACCP : réunir les personnes qui connaissent les produits et les process (chef, second, responsable).",
        'Décrire le produit : matières premières, mode de conservation, conditionnement.',
        "Identifier l'utilisation prévue : qui consomme, y compris les publics sensibles (enfants, personnes âgées).",
        'Établir le diagramme de fabrication : représenter le parcours réel de chaque préparation, de la réception au service.',
        'Vérifier le diagramme sur le terrain : confronter le schéma à la pratique en cuisine.',
        'Analyser les dangers (principe 1).',
        'Déterminer les points critiques (principe 2).',
        'Fixer les limites critiques (principe 3).',
        'Mettre en place la surveillance (principe 4).',
        'Définir les actions correctives (principe 5).',
        'Vérifier le système (principe 6).',
        'Documenter et enregistrer (principe 7).',
      ],
    },
    {
      type: 'h2',
      id: 'formation-hygiene',
      text: 'La formation hygiène alimentaire : qui, quoi, comment',
    },
    {
      type: 'p',
      text: "Tout établissement de restauration commerciale doit compter dans son effectif au moins une personne ayant suivi une formation spécifique en matière d'hygiène alimentaire. Cette obligation est fixée par le décret et l'arrêté du 5 octobre 2011 relatifs à cette formation. Le programme couvre les aliments et les risques pour le consommateur, les fondamentaux de la réglementation, et le plan de maîtrise sanitaire.",
    },
    {
      type: 'h3',
      text: 'Qui peut être dispensé ?',
    },
    {
      type: 'p',
      text: "La personne titulaire de certains diplômes du secteur ou justifiant d'une expérience professionnelle suffisante dans la restauration peut être réputée satisfaire à l'obligation, selon les conditions prévues par les textes. En dehors de ces cas, la formation reste requise. Au-delà de cette obligation formelle, former l'ensemble de l'équipe aux gestes de base reste la meilleure garantie d'une cuisine maîtrisée au quotidien.",
    },
    {
      type: 'h2',
      id: 'appliquer-en-cuisine',
      text: 'Appliquer le HACCP concrètement en cuisine',
    },
    {
      type: 'p',
      text: "La théorie ne sert à rien si elle ne se traduit pas en gestes quotidiens. Voici les points sur lesquels la méthode se joue réellement, jour après jour, dans une cuisine de restaurant.",
    },
    {
      type: 'ul',
      items: [
        "Chaîne du froid : enceintes froides relevées et tracées, produits sensibles maintenus aux températures réglementaires, pas de rupture entre réception et stockage.",
        'Cuisson et refroidissement : atteindre les températures à coeur visées, refroidir rapidement les préparations chaudes pour traverser vite la zone de danger microbien.',
        "Traçabilité et DLC : étiquetage des produits ouverts ou transformés, gestion des dates, premier entré premier sorti, conservation des étiquettes des matières premières.",
        "Marche en avant : organiser les flux pour que le propre et le sale, le cru et le cuit ne se croisent pas, dans l'espace ou dans le temps.",
        "Nettoyage et désinfection : un plan écrit (quoi, quand, avec quoi, par qui) et des enregistrements qui prouvent qu'il est suivi.",
        'Hygiène du personnel : tenue propre, lavage des mains aux moments clés, gestion des plaies et des arrêts en cas de maladie.',
      ],
    },
    {
      type: 'quote',
      text: "Un système HACCP n'a de valeur que s'il est vivant : appliqué chaque service, contrôlé, et corrigé quand un relevé sort des clous.",
    },
    {
      type: 'p',
      text: "C'est précisément ce qu'un audit hygiène vient vérifier sur le terrain : non pas la présence d'un classeur, mais la réalité des gestes et la cohérence entre ce qui est écrit et ce qui est fait. audit hygiène est un label privé indépendant, fondé sur la réglementation en vigueur. Un audit aide à anticiper et à préparer un contrôle officiel, sans en garantir l'issue : il pointe les écarts, les hiérarchise et propose un plan correctif actionnable.",
    },
    {
      type: 'h2',
      id: 'erreurs-frequentes',
      text: 'Les erreurs fréquentes à éviter',
    },
    {
      type: 'p',
      text: "Beaucoup d'établissements disposent d'un système HACCP sur le papier mais le laissent se vider de son contenu. Les écarts les plus courants se ressemblent d'une cuisine à l'autre.",
    },
    {
      type: 'ul',
      items: [
        'Des relevés de température remplis à la chaîne en fin de service, voire à l\'avance : un enregistrement qui ne reflète pas la réalité ne maîtrise rien.',
        "Un diagramme de fabrication générique, copié sans tenir compte des plats réellement produits.",
        "Aucune action corrective définie : quand une sonde affiche un écart, personne ne sait quoi faire ni qui décide.",
        'Des sondes jamais étalonnées, qui mesurent faux sans que personne ne le voie.',
        'Un plan de maîtrise sanitaire jamais relu depuis son achat, sans lien avec la carte actuelle.',
      ],
    },
    {
      type: 'p',
      text: "La parade tient en une phrase : un système simple, compris par l'équipe et réellement appliqué vaut mieux qu'un classeur épais que personne n'ouvre.",
    },
  ],
  faq: [
    {
      q: 'Que signifie HACCP ?',
      a: "HACCP signifie Hazard Analysis Critical Control Point, soit analyse des dangers et maîtrise des points critiques. C'est une méthode préventive de sécurité des aliments codifiée par le Codex Alimentarius.",
    },
    {
      q: 'Le HACCP est-il obligatoire pour un restaurant ?',
      a: "Oui. Le règlement (CE) 852/2004 impose à tout exploitant alimentaire de mettre en place des procédures fondées sur les principes HACCP. Les petites structures peuvent s'appuyer sur un guide de bonnes pratiques d'hygiène validé.",
    },
    {
      q: 'Quels sont les 7 principes du HACCP ?',
      a: "Analyse des dangers, détermination des points critiques (CCP), fixation des limites critiques, surveillance des CCP, actions correctives, vérification du système et tenue des enregistrements.",
    },
    {
      q: 'Faut-il une formation HACCP pour ouvrir un restaurant ?',
      a: "Un établissement de restauration commerciale doit compter au moins une personne formée à l'hygiène alimentaire, selon le décret et l'arrêté du 5 octobre 2011. Certains diplômes ou une expérience suffisante peuvent en dispenser.",
    },
    {
      q: 'Quelle différence entre HACCP et plan de maîtrise sanitaire ?',
      a: "Le HACCP est la méthode d'analyse et de maîtrise des dangers. Le plan de maîtrise sanitaire (PMS) est le document qui formalise l'ensemble des mesures de sécurité des aliments de l'établissement, dont la démarche HACCP.",
    },
    {
      q: 'Combien de temps faut-il pour mettre en place le HACCP ?',
      a: "Cela dépend de la taille et de la complexité de la carte. La démarche suit douze étapes : constituer l'équipe, décrire les produits et les process, analyser les dangers, puis surveiller et enregistrer. L'essentiel est ensuite de la faire vivre au quotidien.",
    },
  ],
  sources: [
    {
      label: "Règlement (CE) n° 852/2004 relatif à l'hygiène des denrées alimentaires",
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004R0852',
    },
    {
      label: 'Codex Alimentarius - Principes généraux d\'hygiène alimentaire et système HACCP (CXC 1-1969)',
      url: 'https://www.fao.org/fao-who-codexalimentarius/fr/',
    },
    {
      label: "Arrêté du 5 octobre 2011 relatif au cahier des charges de la formation spécifique en matière d'hygiène alimentaire",
      url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000024665545/',
    },
    {
      label: "Guides de bonnes pratiques d'hygiène (GBPH) - Ministère de l'Agriculture",
      url: 'https://agriculture.gouv.fr/le-guide-des-bonnes-pratiques-dhygiene-gbph',
    },
  ],
  related: [
    'plan-maitrise-sanitaire-pms',
    'chaine-du-froid-restauration',
    'tracabilite-dlc-restaurant',
  ],
};
