import type { Article } from './types';

export const article: Article = {
  slug: 'haccp-restauration-guide',
  title: 'HACCP en restauration : le guide complet',
  metaTitle: 'HACCP en restauration : le guide complet',
  description:
    "HACCP en restauration : les 7 principes détaillés, les 12 étapes, CCP, formation obligatoire et lien avec le plan de maîtrise sanitaire. À appliquer en cuisine.",
  excerpt:
    "Les 7 principes détaillés, les 12 étapes, CCP et PrPo, formation et plan de maîtrise sanitaire : tout pour appliquer réellement la méthode HACCP en cuisine.",
  category: 'Méthode',
  datePublished: '2026-06-12',
  dateModified: '2026-06-22',
  readingMinutes: 14,
  answer:
    "Le HACCP (Hazard Analysis Critical Control Point) est une méthode d'analyse des dangers et de maîtrise des points critiques pour la sécurité des aliments. En restauration, tout établissement qui manipule des denrées doit fonder son hygiène sur les principes HACCP : c'est une obligation issue du règlement européen (CE) 852/2004. Concrètement, le restaurateur identifie les dangers biologiques, chimiques et physiques, détermine les étapes où il doit les maîtriser, fixe des limites mesurables et tient des enregistrements. Au moins une personne de l'établissement doit avoir suivi la formation hygiène alimentaire.",
  blocks: [
    {
      type: 'p',
      text: "Derrière l'acronyme HACCP se cache la colonne vertébrale de toute cuisine professionnelle. Ce n'est pas un document à ranger dans un classeur. C'est une façon de raisonner : à quel moment mon produit peut-il devenir dangereux, et qu'est-ce que je fais pour l'éviter avant qu'il n'arrive dans l'assiette. La méthode paraît technique vue de loin. En cuisine, elle se résume à quelques gestes répétés à chaque service, soutenus par des repères écrits.",
    },
    {
      type: 'p',
      text: "Ce guide reprend la définition, l'origine, les sept principes détaillés un par un avec des exemples concrets, les douze étapes de mise en oeuvre, la distinction entre CCP et programmes prérequis opérationnels, l'obligation de formation et le lien avec le plan de maîtrise sanitaire. L'objectif est de passer de la théorie réglementaire à ce qui se joue réellement sur le passe, jour après jour.",
    },
    {
      type: 'h2',
      id: 'definition-haccp',
      text: 'HACCP : définition et origine',
    },
    {
      type: 'p',
      text: "HACCP signifie Hazard Analysis Critical Control Point, soit en français analyse des dangers et maîtrise des points critiques. La méthode est née dans les années 1960, fruit d'un travail entre la NASA, l'armée américaine et l'industriel Pillsbury. L'enjeu : garantir une alimentation saine aux astronautes sans pouvoir tester chaque portion une fois en orbite. Tester le produit fini était insuffisant et destructif. Il fallait donc maîtriser le processus à chaque étape sensible, en amont, pour que le danger n'apparaisse jamais.",
    },
    {
      type: 'p',
      text: "Cette logique a ensuite été formalisée par le Codex Alimentarius, l'instance de référence conjointe FAO/OMS, dans son texte sur les principes généraux d'hygiène alimentaire (référence CXC 1-1969, régulièrement révisé). C'est ce document qui fixe les sept principes et les douze étapes reconnus dans le monde entier. Le droit européen s'y adosse directement : le règlement (CE) 852/2004 impose une démarche fondée sur ces principes, sans recopier la méthode, en renvoyant à ce socle international.",
    },
    {
      type: 'p',
      text: "Le coeur de l'approche tient en un mot : prévention. On ne contrôle pas le plat terminé pour décider s'il est consommable. On maîtrise le parcours du produit, de la réception au service, en agissant aux moments où un contrôle change vraiment quelque chose. Une cuisson bien menée détruit la majorité des bactéries pathogènes. Un refroidissement trop lent les laisse proliférer. Le HACCP cible précisément ces bascules.",
    },
    {
      type: 'h2',
      id: 'obligation-restauration',
      text: 'Le HACCP est-il obligatoire en restauration ?',
    },
    {
      type: 'p',
      text: "Oui, sans ambiguïté. L'article 5 du règlement (CE) 852/2004 relatif à l'hygiène des denrées alimentaires impose à tout exploitant du secteur alimentaire de mettre en place, d'appliquer et de maintenir une ou plusieurs procédures fondées sur les principes HACCP. Cela couvre les restaurants traditionnels, les traiteurs, la vente à emporter, les food trucks, les dark kitchens et la restauration collective. La taille de l'établissement ne dispense jamais de l'obligation. Elle module seulement la souplesse de mise en oeuvre.",
    },
    {
      type: 'p',
      text: "Pour les structures modestes, le règlement admet une approche proportionnée et l'appui sur un guide de bonnes pratiques d'hygiène (GBPH) validé pour le secteur. Ces guides, dont la liste est publiée par le ministère de l'Agriculture, traduisent les principes HACCP en consignes concrètes déjà calibrées pour un métier donné. Un restaurateur qui suit un GBPH adapté à son activité remplit une grande partie de son obligation sans repartir d'une page blanche. La démarche reste vivante, mais elle est cadrée.",
    },
    {
      type: 'callout',
      title: 'HACCP, PMS, GBPH : trois mots, une seule logique',
      text: "Le HACCP est la méthode de raisonnement. Le plan de maîtrise sanitaire (PMS) est le document qui formalise tout ce que vous faites pour garantir la sécurité des aliments, dont la démarche HACCP, les bonnes pratiques d'hygiène et la traçabilité. Le GBPH est l'aide sectorielle qui propose des mesures déjà cadrées. La méthode pense, le PMS écrit, le GBPH guide. En contrôle sanitaire, c'est le PMS qui est demandé, et le HACCP en constitue la pièce maîtresse.",
    },
    {
      type: 'h2',
      id: 'les-7-principes',
      text: 'Les 7 principes du HACCP, détaillés',
    },
    {
      type: 'p',
      text: "Le Codex Alimentarius définit sept principes. Ils forment le coeur de la méthode et structurent toute démarche, de la sandwicherie au restaurant gastronomique. Voici l'énoncé, puis une lecture détaillée de chacun avec ce qu'il signifie réellement en cuisine.",
    },
    {
      type: 'ol',
      items: [
        "Procéder à une analyse des dangers, en identifiant les dangers à maîtriser et les mesures pour les contrôler.",
        "Déterminer les points critiques pour la maîtrise (CCP).",
        "Fixer le ou les seuils critiques pour chaque CCP.",
        "Mettre en place un système de surveillance des CCP.",
        "Déterminer les actions correctives à appliquer en cas de dépassement d'un seuil.",
        "Appliquer des procédures de vérification pour confirmer que le système fonctionne.",
        "Constituer un dossier et tenir des enregistrements.",
      ],
    },
    {
      type: 'h3',
      text: 'Principe 1 : analyser les dangers',
    },
    {
      type: 'p',
      text: "On passe en revue chaque étape de fabrication et on liste les dangers possibles, en distinguant trois familles. Les dangers biologiques d'abord : salmonelles sur la volaille crue, Listeria sur les produits laitiers ou les charcuteries, E. coli, staphylocoques transmis par les mains. Les dangers chimiques ensuite : résidus de produit de nettoyage mal rincé, présence d'un allergène non déclaré, migration d'un contenant non alimentaire. Les dangers physiques enfin : éclat de verre, morceau d'os, agrafe, fragment de plastique. Pour chaque danger, on évalue sa gravité et sa probabilité, puis on note la mesure de maîtrise associée. Cette étape conditionne tout le reste : un danger oublié ici ne sera jamais maîtrisé plus loin.",
    },
    {
      type: 'h3',
      text: 'Principe 2 : déterminer les points critiques (CCP)',
    },
    {
      type: 'p',
      text: "Un CCP est une étape où un contrôle est indispensable, et où c'est la dernière occasion d'éliminer un danger ou de le ramener à un niveau acceptable. En restauration, la cuisson est le CCP le plus emblématique : c'est elle qui détruit les bactéries pathogènes d'une viande hachée ou d'une volaille. Le refroidissement rapide d'une préparation cuite à l'avance en est souvent un autre. Tous les points de contrôle ne sont pas des CCP. Le lavage des mains compte énormément, mais on le classe généralement en bonne pratique ou en prérequis opérationnel, pas en CCP, car aucune limite mesurable unique ne le définit. Un système crédible compte peu de CCP, bien choisis, pas une liste interminable.",
    },
    {
      type: 'h3',
      text: 'Principe 3 : fixer les seuils critiques',
    },
    {
      type: 'p',
      text: "Pour chaque CCP, on définit un seuil mesurable qui sépare le conforme du non conforme. Une température à coeur, une durée, parfois une combinaison des deux. Par exemple une cuisson menant à une température à coeur suffisante pendant un temps donné, ou un refroidissement qui fait passer une préparation d'une zone chaude à une zone froide en un délai maximal. Le seuil doit être chiffré, vérifiable avec une sonde, et connu de l'équipe. Un seuil flou (cuire bien, refroidir vite) ne maîtrise rien.",
    },
    {
      type: 'h3',
      text: 'Principe 4 : surveiller les CCP',
    },
    {
      type: 'p',
      text: "On prévoit comment, quand et par qui chaque CCP est contrôlé. Relever la température à coeur d'une viande en fin de cuisson avec une sonde étalonnée. Tracer la température des enceintes froides matin et soir. Vérifier la durée d'une cellule de refroidissement. La surveillance doit être simple et réellement faisable en plein service, sinon elle ne sera pas faite. Un relevé manquant est un trou dans la chaîne de preuve.",
    },
    {
      type: 'h3',
      text: 'Principe 5 : définir les actions correctives',
    },
    {
      type: 'p',
      text: "On décide à l'avance quoi faire quand un seuil est dépassé, pour ne pas improviser au pire moment. Si une volaille n'atteint pas la température à coeur visée, on prolonge la cuisson. Si un frigo affiche une température trop haute, on isole les produits, on évalue leur état, on règle ou on répare l'enceinte, et on jette si le doute persiste. L'action corrective traite à la fois le produit concerné et la cause de l'écart. Sans ce réflexe écrit, un dépassement reste sans suite.",
    },
    {
      type: 'h3',
      text: 'Principe 6 : vérifier le système',
    },
    {
      type: 'p',
      text: "La vérification confirme que la méthode fonctionne, au-delà de la surveillance quotidienne. Étalonner les sondes régulièrement, relire les relevés pour repérer des anomalies, faire des analyses microbiologiques ponctuelles, revoir le diagramme quand la carte change. C'est l'étape que les cuisines négligent le plus : on surveille sans jamais vérifier que la surveillance elle-même est fiable. Une sonde décalibrée mesure faux en silence.",
    },
    {
      type: 'h3',
      text: 'Principe 7 : tenir les enregistrements',
    },
    {
      type: 'p',
      text: "On conserve les preuves écrites : relevés de température, plan et suivi de nettoyage, traçabilité des matières premières, fiches d'actions correctives. Ce sont ces documents qui démontrent, lors d'un contrôle sanitaire, que la maîtrise est réelle et continue. Un enregistrement honnête, même imparfait, vaut mieux qu'un cahier impeccable rempli à l'avance. L'inspecteur sait lire la différence.",
    },
    {
      type: 'h2',
      id: 'ccp-prpo',
      text: 'CCP, PrP et PrPo : ne pas tout confondre',
    },
    {
      type: 'p',
      text: "Une source fréquente de confusion mérite d'être clarifiée, car elle pèse sur la qualité d'un système HACCP. Les programmes prérequis (PrP) sont les conditions et activités de base qui maintiennent un environnement hygiénique : nettoyage des locaux, lutte contre les nuisibles, hygiène du personnel, maintenance, gestion des déchets. Ils ne ciblent pas un danger précis à une étape donnée, ils créent le terrain sain sur lequel tout repose.",
    },
    {
      type: 'p',
      text: "Le programme prérequis opérationnel (PrPo) est un cran au-dessus : c'est une mesure de maîtrise identifiée par l'analyse des dangers comme essentielle pour contrôler un danger, mais qui ne correspond pas à un seuil critique mesurable comme un CCP. La maîtrise des allergènes par séparation des ustensiles, ou le respect strict de la marche en avant, relèvent souvent du PrPo. Le CCP, lui, se distingue par un seuil chiffré et une surveillance qui déclenche une action immédiate en cas de dépassement.",
    },
    {
      type: 'callout',
      title: 'Un repère simple pour trancher',
      text: "Posez-vous trois questions. Le danger peut-il être maîtrisé par une bonne pratique générale ? Alors c'est un PrP. Faut-il une mesure ciblée mais sans seuil mesurable à surveiller en continu ? C'est plutôt un PrPo. Existe-t-il une limite chiffrée dont le dépassement impose une action corrective immédiate sur le produit ? Alors vous tenez un CCP. La cuisson et le refroidissement cochent cette dernière case dans presque toutes les cuisines.",
    },
    {
      type: 'h2',
      id: 'arbre-de-decision',
      text: "L'arbre de décision pour identifier un CCP",
    },
    {
      type: 'p',
      text: "Pour éviter de classer en CCP tout et n'importe quoi, le Codex propose un arbre de décision : une série de questions posées pour chaque danger à chaque étape. La démarche se suit dans l'ordre.",
    },
    {
      type: 'ol',
      items: [
        "Existe-t-il une mesure de maîtrise à cette étape pour le danger considéré ? Si non, et que la maîtrise est nécessaire pour la sécurité, il faut modifier l'étape ou le process.",
        "Cette étape est-elle spécifiquement conçue pour éliminer le danger ou le ramener à un niveau acceptable ? Si oui, c'est un CCP, par exemple la cuisson.",
        "Le danger peut-il atteindre un niveau inacceptable ou augmenter à cette étape ? Si non, ce n'est pas un CCP.",
        "Une étape ultérieure éliminera-t-elle le danger ou le ramènera-t-elle à un niveau acceptable ? Si oui, l'étape actuelle n'est pas un CCP. Si non, l'étape actuelle est un CCP.",
      ],
    },
    {
      type: 'p',
      text: "Cet outil n'est pas une formalité administrative. Il force à raisonner produit par produit, sans recopier le diagramme du voisin. Une terrine cuite puis tranchée à froid n'a pas les mêmes points critiques qu'une cuisson minute à la commande.",
    },
    {
      type: 'h2',
      id: 'les-12-etapes',
      text: 'Les 12 étapes de mise en oeuvre',
    },
    {
      type: 'p',
      text: "Le Codex Alimentarius décline ces principes en une démarche en douze étapes. Les cinq premières sont préparatoires : elles posent le terrain. Les sept suivantes correspondent aux sept principes. C'est la feuille de route concrète pour bâtir un système HACCP qui tient debout.",
    },
    {
      type: 'ol',
      items: [
        "Constituer l'équipe HACCP : réunir les personnes qui connaissent les produits et les process (chef, second, responsable de salle si pertinent), au besoin avec un appui extérieur.",
        "Décrire le produit : matières premières, mode de conservation, conditionnement, durée de vie, conditions de distribution.",
        "Identifier l'utilisation prévue : qui consomme, avec une attention aux publics sensibles comme les jeunes enfants, les personnes âgées ou immunodéprimées.",
        "Établir le diagramme de fabrication : représenter le parcours réel de chaque préparation, de la réception au service, étape par étape.",
        "Vérifier le diagramme sur le terrain : confronter le schéma à la pratique en cuisine, en suivant un produit du frigo à l'assiette.",
        "Analyser les dangers (principe 1).",
        "Déterminer les points critiques (principe 2), en s'appuyant sur l'arbre de décision.",
        "Fixer les seuils critiques (principe 3).",
        "Mettre en place la surveillance (principe 4).",
        "Définir les actions correctives (principe 5).",
        "Vérifier le système (principe 6).",
        "Documenter et enregistrer (principe 7).",
      ],
    },
    {
      type: 'p',
      text: "Les étapes 4 et 5 sont souvent bâclées. Pourtant un diagramme faux fausse toute l'analyse qui suit : on cherche les dangers aux mauvais endroits. Prendre une heure pour suivre physiquement le parcours d'un plat phare évite des semaines de travail bâti sur du sable.",
    },
    {
      type: 'h2',
      id: 'lien-pms',
      text: 'Le lien avec le plan de maîtrise sanitaire',
    },
    {
      type: 'p',
      text: "Le HACCP ne vit pas seul. Il s'inscrit dans le plan de maîtrise sanitaire, le document de référence que l'inspecteur demande lors d'un contrôle. Le PMS regroupe trois grands volets : les bonnes pratiques d'hygiène et les prérequis (nettoyage, lutte contre les nuisibles, hygiène du personnel, maintenance, eau, formation), la démarche HACCP proprement dite, et le système de traçabilité avec la gestion des produits non conformes et le retrait-rappel.",
    },
    {
      type: 'p',
      text: "Autrement dit, le HACCP est la pièce centrale du PMS, mais pas le tout. Un PMS sans HACCP est creux. Un HACCP sans PMS manque de son cadre documentaire et des prérequis qui le rendent applicable. Les deux se construisent ensemble et se relisent ensemble, en particulier quand la carte évolue ou quand un nouvel équipement entre en cuisine.",
    },
    {
      type: 'h2',
      id: 'formation-hygiene',
      text: "La formation hygiène alimentaire : qui, quoi, comment",
    },
    {
      type: 'p',
      text: "Tout établissement de restauration commerciale doit compter dans son effectif au moins une personne ayant suivi une formation spécifique en matière d'hygiène alimentaire. Cette obligation est posée par le décret n° 2011-731 du 24 juin 2011 et précisée par l'arrêté du 5 octobre 2011 qui en fixe le cahier des charges. La formation dure quatorze heures et couvre trois grands thèmes : les aliments et les risques pour le consommateur, les fondamentaux de la réglementation, et le plan de maîtrise sanitaire.",
    },
    {
      type: 'p',
      text: "Le contenu n'est pas anecdotique. On y apprend les dangers microbiologiques, les conditions de multiplication des bactéries, les obligations issues du Paquet hygiène, et la façon de bâtir et faire vivre un PMS. C'est le bagage minimal pour comprendre pourquoi on relève une température plutôt que de la cocher machinalement.",
    },
    {
      type: 'h3',
      text: 'Qui peut être dispensé ?',
    },
    {
      type: 'p',
      text: "La personne titulaire de certains diplômes ou titres du secteur de la restauration, ou justifiant d'une expérience professionnelle d'au moins trois ans comme gestionnaire ou exploitant dans le secteur alimentaire, peut être réputée satisfaire à l'obligation, selon les conditions fixées par les textes. En dehors de ces cas, la formation reste requise. Et au-delà de l'obligation formelle portée par une seule personne, former l'ensemble de l'équipe aux gestes de base reste la meilleure garantie d'une cuisine maîtrisée chaque jour, pas seulement le jour du contrôle.",
    },
    {
      type: 'h2',
      id: 'appliquer-en-cuisine',
      text: 'Appliquer le HACCP concrètement en cuisine',
    },
    {
      type: 'p',
      text: "La théorie ne sert à rien si elle ne se traduit pas en gestes quotidiens. Voici les terrains sur lesquels la méthode se joue réellement, service après service, dans une cuisine de restaurant. Chacun se rattache à un ou plusieurs principes vus plus haut.",
    },
    {
      type: 'ul',
      items: [
        "Chaîne du froid : enceintes froides relevées et tracées au moins matin et soir, produits sensibles maintenus aux températures réglementaires, aucune rupture entre la réception et le stockage.",
        "Cuisson et refroidissement : atteindre la température à coeur visée, puis refroidir rapidement les préparations chaudes pour traverser vite la zone de danger où les bactéries prolifèrent, idéalement en cellule.",
        "Traçabilité et DLC : étiquetage des produits ouverts ou transformés, gestion des dates, principe du premier entré premier sorti, conservation des étiquettes des matières premières pour le retrait-rappel.",
        "Marche en avant : organiser les flux pour que le propre et le sale, le cru et le cuit ne se croisent jamais, dans l'espace ou à défaut dans le temps.",
        "Nettoyage et désinfection : un plan écrit (quoi, quand, avec quel produit, par qui) et des enregistrements qui prouvent qu'il est réellement suivi.",
        "Hygiène du personnel : tenue propre, lavage des mains aux moments clés, gestion des plaies, des bijoux et des arrêts en cas de maladie transmissible.",
        "Allergènes : séparation des ustensiles et plans de travail, information du client, vigilance sur les contaminations croisées lors du dressage.",
      ],
    },
    {
      type: 'quote',
      text: "Un système HACCP n'a de valeur que s'il est vivant : appliqué à chaque service, contrôlé, et corrigé dès qu'un relevé sort des clous.",
    },
    {
      type: 'p',
      text: "C'est précisément ce qu'un audit hygiène vient vérifier sur le terrain : non pas la présence d'un classeur, mais la réalité des gestes et la cohérence entre ce qui est écrit et ce qui est fait. audit hygiène est un label privé indépendant, fondé sur la réglementation en vigueur. Un audit aide à anticiper et à préparer un contrôle officiel, sans en garantir l'issue : il pointe les écarts, les hiérarchise, signale distinctement les cas critiques et propose un plan correctif actionnable, avec une priorité et un délai pour chaque action.",
    },
    {
      type: 'h2',
      id: 'erreurs-frequentes',
      text: 'Les dérives et erreurs fréquentes',
    },
    {
      type: 'p',
      text: "Beaucoup d'établissements disposent d'un système HACCP sur le papier mais le laissent se vider de son contenu. Les écarts les plus courants se ressemblent d'une cuisine à l'autre, et un inspecteur les repère vite.",
    },
    {
      type: 'ul',
      items: [
        "Des relevés de température remplis à la chaîne en fin de service, voire à l'avance : un enregistrement qui ne reflète pas la réalité ne maîtrise rien et fragilise toute la démarche.",
        "Un diagramme de fabrication générique, copié sans tenir compte des plats réellement produits, ce qui place les CCP au mauvais endroit.",
        "Aucune action corrective définie : quand une sonde affiche un écart, personne ne sait quoi faire ni qui décide, et le produit douteux part quand même.",
        "Des sondes jamais étalonnées, qui mesurent faux sans que personne ne le voie : la surveillance devient une illusion.",
        "Une confusion entre CCP et bonnes pratiques, avec dix CCP factices qui noient les deux ou trois qui comptent vraiment.",
        "Un plan de maîtrise sanitaire jamais relu depuis son achat, sans lien avec la carte actuelle ni avec le matériel réellement utilisé.",
      ],
    },
    {
      type: 'p',
      text: "La parade tient en une phrase : un système simple, compris par l'équipe et réellement appliqué vaut mieux qu'un classeur épais que personne n'ouvre. Mieux vaut trois CCP suivis sérieusement que quinze items cochés sans regarder. Le contrôle sanitaire ne juge pas l'épaisseur du dossier, il juge la cohérence entre vos écrits et vos gestes.",
    },
  ],
  faq: [
    {
      q: 'Que signifie HACCP ?',
      a: "HACCP signifie Hazard Analysis Critical Control Point, soit analyse des dangers et maîtrise des points critiques. C'est une méthode préventive de sécurité des aliments codifiée par le Codex Alimentarius, née dans les années 1960 pour l'alimentation des astronautes.",
    },
    {
      q: 'Le HACCP est-il obligatoire pour un restaurant ?',
      a: "Oui. Le règlement (CE) 852/2004 impose à tout exploitant alimentaire de mettre en place des procédures fondées sur les principes HACCP. Les petites structures peuvent s'appuyer sur un guide de bonnes pratiques d'hygiène validé pour leur secteur, mais l'obligation demeure.",
    },
    {
      q: 'Quels sont les 7 principes du HACCP ?',
      a: "Analyse des dangers, détermination des points critiques (CCP), fixation des seuils critiques, surveillance des CCP, actions correctives, vérification du système et tenue des enregistrements. Ces sept principes sont définis par le Codex Alimentarius.",
    },
    {
      q: 'Quelle différence entre un CCP et un PrPo ?',
      a: "Un CCP (point critique) se distingue par un seuil mesurable dont le dépassement impose une action corrective immédiate, comme la cuisson. Un PrPo (prérequis opérationnel) est une mesure de maîtrise essentielle mais sans seuil chiffré à surveiller en continu, comme la séparation des allergènes.",
    },
    {
      q: 'Faut-il une formation HACCP pour ouvrir un restaurant ?',
      a: "Un établissement de restauration commerciale doit compter au moins une personne formée à l'hygiène alimentaire, selon le décret n° 2011-731 du 24 juin 2011 et l'arrêté du 5 octobre 2011. Certains diplômes ou une expérience de trois ans dans le secteur peuvent en dispenser.",
    },
    {
      q: 'Quelle différence entre HACCP et plan de maîtrise sanitaire ?',
      a: "Le HACCP est la méthode d'analyse et de maîtrise des dangers. Le plan de maîtrise sanitaire (PMS) est le document qui formalise l'ensemble des mesures de sécurité des aliments de l'établissement : bonnes pratiques d'hygiène, démarche HACCP et traçabilité. Le HACCP en est la pièce centrale.",
    },
    {
      q: "Qu'est-ce que l'arbre de décision HACCP ?",
      a: "C'est une suite de questions proposée par le Codex pour déterminer si une étape est un point critique (CCP). On l'applique danger par danger, étape par étape, pour éviter de classer en CCP des points qui relèvent en réalité des bonnes pratiques.",
    },
    {
      q: 'Combien de temps faut-il pour mettre en place le HACCP ?',
      a: "Cela dépend de la taille et de la complexité de la carte. La démarche suit douze étapes : constituer l'équipe, décrire les produits et process, établir et vérifier le diagramme, analyser les dangers, puis surveiller et enregistrer. L'essentiel est ensuite de la faire vivre au quotidien.",
    },
  ],
  sources: [
    {
      label: "Règlement (CE) n° 852/2004 relatif à l'hygiène des denrées alimentaires",
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004R0852',
    },
    {
      label: "Codex Alimentarius - Principes généraux d'hygiène alimentaire et système HACCP (CXC 1-1969)",
      url: 'https://www.fao.org/fao-who-codexalimentarius/',
    },
    {
      label: "Décret n° 2011-731 du 24 juin 2011 relatif à l'obligation de formation en hygiène alimentaire",
      url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000024226657',
    },
    {
      label: "Arrêté du 5 octobre 2011 relatif au cahier des charges de la formation spécifique en hygiène alimentaire",
      url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000024670229',
    },
    {
      label: "Arrêté du 21 décembre 2009 relatif aux températures de conservation des denrées d'origine animale",
      url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000021629599',
    },
    {
      label: "Guides de bonnes pratiques d'hygiène (GBPH) - Ministère de l'Agriculture",
      url: 'https://agriculture.gouv.fr/',
    },
  ],
  related: [
    'plan-maitrise-sanitaire-pms',
    'chaine-du-froid-restauration',
    'tracabilite-dlc-restaurant',
  ],
};
