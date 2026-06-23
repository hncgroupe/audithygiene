import type { Article } from './types';

export const article: Article = {
  slug: 'nettoyage-desinfection-cuisine',
  title: 'Nettoyage et désinfection en cuisine professionnelle : protocole, plan et traçabilité',
  metaTitle: 'Nettoyage désinfection cuisine pro : le guide',
  description:
    "Nettoyer n'est pas désinfecter. Protocole en 5 étapes, cercle de Sinner (TACT), plan de nettoyage, fréquences, fiches techniques, FDS et traçabilité en cuisine professionnelle.",
  excerpt:
    "Différence nettoyage/désinfection, protocole en 5 étapes, méthode TACT (cercle de Sinner), plan de nettoyage, choix des produits et traçabilité : la base d'une cuisine maîtrisée.",
  category: 'Pratique',
  datePublished: '2026-05-28',
  dateModified: '2026-06-22',
  readingMinutes: 14,
  answer:
    "Nettoyer et désinfecter sont deux opérations distinctes. Le nettoyage élimine les salissures visibles (graisses, résidus, dépôts) grâce à un détergent, tandis que la désinfection réduit le nombre de micro-organismes vivants grâce à un désinfectant. On ne désinfecte jamais efficacement une surface sale, car la matière organique neutralise le produit, d'où un protocole complet qui enchaîne prélavage, nettoyage au détergent, rinçage intermédiaire, désinfection puis rinçage final et séchage. Le règlement (CE) 852/2004 impose de tenir locaux, matériel et surfaces propres et bien entretenus dans le cadre du plan de maîtrise sanitaire.",
  blocks: [
    {
      type: 'p',
      text: "Le nettoyage et la désinfection forment l'un des piliers de l'hygiène en cuisine professionnelle, et l'un des thèmes les plus scrutés lors d'un contrôle sanitaire. Une surface mal nettoyée se transforme en réservoir à bactéries. Un plan de travail désinfecté trop vite reste dangereux malgré une apparence impeccable. Un plan de nettoyage incomplet laisse des zones que personne ne traite, jusqu'à ce qu'un biofilm s'y installe. Derrière des gestes qui semblent banals se cache une logique précise, où l'ordre des étapes, le choix des produits et le respect des conditions d'emploi décident du résultat réel. Ce guide détaille cette logique, du protocole de base à la construction du plan de nettoyage, jusqu'à la traçabilité qui permet de prouver le travail accompli.",
    },
    {
      type: 'p',
      text: "Le cadre réglementaire est posé par le règlement (CE) 852/2004, dont l'annexe II exige que les locaux, les équipements et les surfaces en contact avec les denrées soient maintenus propres et en bon état d'entretien. Le texte ne dicte pas le détail des gestes, il fixe une obligation de résultat que chaque établissement traduit dans son plan de maîtrise sanitaire. C'est cette articulation entre une exigence générale et des procédures concrètes que comprend mal une partie des professionnels, et c'est précisément là que naissent les non-conformités.",
    },
    {
      type: 'h2',
      id: 'nettoyage-vs-desinfection',
      text: 'Nettoyage et désinfection : deux opérations qui ne se confondent pas',
    },
    {
      type: 'p',
      text: "Le nettoyage a pour objectif d'éliminer les salissures visibles : graisses, résidus alimentaires, dépôts de calcaire, traces de manipulation. Il repose sur un détergent, dont les tensioactifs décollent et mettent en suspension les souillures pour qu'elles partent au rinçage. Un nettoyage bien mené améliore nettement l'aspect et l'hygiène d'une surface, et il retire au passage une grande partie des micro-organismes accrochés aux salissures. Mais il ne les détruit pas. Une planche visuellement propre peut héberger une flore microbienne importante.",
    },
    {
      type: 'p',
      text: "La désinfection vise à réduire le nombre de micro-organismes vivants, bactéries, levures, moisissures et virus, jusqu'à un niveau qui ne présente plus de risque sanitaire. Elle s'appuie sur un désinfectant, dont l'efficacité ne tient pas seulement à sa formule. Elle dépend du respect d'une concentration, d'un temps de contact et parfois d'une température, tous indiqués par le fabricant. Un désinfectant appliqué sur une surface encore grasse perd l'essentiel de son pouvoir, car la matière organique le consomme avant qu'il n'atteigne les micro-organismes ciblés.",
    },
    {
      type: 'p',
      text: "La conséquence pratique est sans ambiguïté : on nettoie d'abord, on désinfecte ensuite. Inverser l'ordre ou sauter le nettoyage revient à gaspiller le désinfectant tout en croyant la surface assainie. Certains produits dits détergents-désinfectants combinent les deux fonctions dans une même application. Ils font gagner du temps sur les surfaces peu souillées, mais ils n'exonèrent ni d'un prélavage ni du respect du temps de contact, et ils restent moins performants qu'un protocole en deux temps sur une surface fortement encrassée.",
    },
    {
      type: 'h3',
      text: 'Pourquoi une surface propre peut rester contaminée',
    },
    {
      type: 'p',
      text: "L'œil ne perçoit que les salissures macroscopiques. Les micro-organismes, eux, restent invisibles, et certains s'organisent en biofilms, des couches adhérentes qui résistent au simple essuyage. Les siphons, les joints de chambre froide, l'intérieur d'un trancheur ou les recoins d'un batteur sont des sites privilégiés pour ces installations. Une cuisine qui paraît nickel au premier regard peut donc présenter une charge microbienne élevée sur des points précis. C'est pour cette raison que la désinfection ne se décide pas à l'œil, mais s'inscrit dans un protocole appliqué de façon systématique.",
    },
    {
      type: 'h2',
      id: 'cercle-de-sinner',
      text: 'La méthode TACT, ou cercle de Sinner',
    },
    {
      type: 'p',
      text: "L'efficacité d'un nettoyage ne se résume pas au produit employé. Elle découle de la combinaison de quatre facteurs, réunis dans la méthode TACT, aussi connue sous le nom de cercle de Sinner. L'idée centrale est qu'ils se compensent : quand on diminue l'un, il faut renforcer un autre pour conserver le même niveau de résultat.",
    },
    {
      type: 'ul',
      items: [
        "Action chimique : la nature et la concentration du produit, détergent ou désinfectant. Trop dilué, il n'agit pas ; trop concentré, il coûte cher, peut laisser des résidus et endommager certaines surfaces.",
        "Action mécanique : le frottement, le brossage, la pression du jet. C'est souvent le facteur négligé, lorsqu'on se contente de vaporiser et d'essuyer sans frotter.",
        "Température : la chaleur accélère la dissolution des graisses et renforce l'action de la plupart des produits, dans les limites fixées par le fabricant, certains désinfectants perdant en efficacité au-delà d'un seuil.",
        "Temps : la durée pendant laquelle le produit reste au contact de la surface. Un désinfectant a besoin d'un temps d'action minimal pour agir, précisé sur sa fiche technique.",
      ],
    },
    {
      type: 'p',
      text: "Cette logique de compensation a des applications très concrètes. Une plonge manuelle à l'eau tiède exige plus de frottement et un meilleur produit qu'un lave-vaisselle qui monte en température. À l'inverse, un appareil qui chauffe fort peut réduire la quantité de chimie nécessaire. Comprendre le cercle de Sinner, c'est arrêter de croire qu'un produit miracle suffit, et raisonner sur l'équilibre des quatre leviers.",
    },
    {
      type: 'callout',
      title: 'Le piège classique du temps de contact',
      text: "Vaporiser un désinfectant puis essuyer dans la foulée annule presque entièrement son effet. Le produit doit rester sur la surface pendant le temps de contact indiqué par le fabricant, souvent plusieurs minutes, avant tout rinçage ou séchage. Sans ce délai, la désinfection n'a pas réellement eu lieu, même si la surface paraît propre. C'est l'une des erreurs les plus répandues et les plus invisibles.",
    },
    {
      type: 'h2',
      id: 'protocole-en-5-etapes',
      text: 'Le protocole de nettoyage et désinfection en cinq étapes',
    },
    {
      type: 'p',
      text: "Pour une surface en contact direct avec les denrées, plan de travail, planche, lame de trancheur, cuve de batteur, le protocole de référence enchaîne cinq étapes. Chacune prépare la suivante, et en sauter une compromet le résultat final. L'ordre n'a rien d'arbitraire : il suit la logique physique de la décontamination.",
    },
    {
      type: 'ol',
      items: [
        "Prélavage : retirer les déchets et les gros résidus, puis rincer à l'eau pour éliminer le plus gros des salissures. La surface est débarrassée du visible, mais elle n'est pas encore propre au sens microbiologique.",
        "Nettoyage au détergent : appliquer le détergent à la dilution prescrite, puis frotter ou brosser pour apporter l'action mécanique, en laissant agir le temps indiqué. C'est l'étape qui décolle les graisses et les souillures incrustées.",
        "Rinçage intermédiaire : rincer abondamment à l'eau potable pour évacuer le détergent et les salissures décollées. Un résidu de détergent neutraliserait le désinfectant appliqué ensuite, par incompatibilité chimique fréquente entre tensioactifs et désinfectants.",
        "Désinfection : appliquer le désinfectant à la concentration prescrite et respecter le temps de contact figurant sur sa fiche technique. C'est l'étape qui réduit la charge en micro-organismes vivants.",
        "Rinçage final et séchage : rincer à l'eau potable si la fiche technique du désinfectant l'exige, puis laisser sécher à l'air libre ou avec un matériel propre à usage unique. L'humidité résiduelle favorise la reprise microbienne, donc le séchage fait partie intégrante du protocole.",
      ],
    },
    {
      type: 'p',
      text: "Sur les surfaces qui ne touchent pas directement les aliments, sols, murs, poignées, le protocole peut être allégé, mais le principe nettoyer avant désinfecter reste valable dès qu'il existe un enjeu sanitaire. La nuance porte sur la fréquence et le niveau d'exigence, pas sur la logique de fond. Le détail des étapes, des produits et des fréquences par zone se formalise dans le plan de nettoyage, qui transforme ce protocole théorique en consignes applicables au quotidien.",
    },
    {
      type: 'h3',
      text: 'Le cas particulier du rinçage final',
    },
    {
      type: 'p',
      text: "Le rinçage après désinfection dépend du produit. Certains désinfectants agréés pour le contact alimentaire ne nécessitent pas de rinçage final dès lors que la concentration d'emploi est respectée, ce qui simplifie le geste. D'autres l'imposent. La seule source fiable reste la fiche technique du produit utilisé. Appliquer un protocole standardisé sans lire cette fiche conduit soit à un rinçage inutile qui peut recontaminer, soit à l'absence d'un rinçage pourtant requis qui laisse des résidus sur une surface alimentaire.",
    },
    {
      type: 'h2',
      id: 'plan-de-nettoyage',
      text: 'Construire un plan de nettoyage : quoi, qui, quand, comment, avec quoi',
    },
    {
      type: 'p',
      text: "Le plan de nettoyage est l'une des composantes documentaires du plan de maîtrise sanitaire. Il décrit, pour chaque zone et chaque équipement, comment et quand le nettoyage et la désinfection sont réalisés. Loin d'être une formalité administrative, c'est l'outil qui garantit qu'aucune surface n'est oubliée et que chaque opération est faite selon une méthode reproductible, quelle que soit la personne en poste. Il répond à cinq questions.",
    },
    {
      type: 'ul',
      items: [
        "Quoi : la liste exhaustive des surfaces, équipements et zones à traiter, des plans de travail aux siphons en passant par les chambres froides, le trancheur, la hotte et les poubelles.",
        "Qui : la personne ou le poste responsable de chaque opération, pour qu'aucune zone ne reste orpheline parce que chacun pense qu'un autre s'en occupe.",
        "Quand : la fréquence de chaque opération, après chaque usage, quotidienne, hebdomadaire, périodique ou mensuelle.",
        "Comment : le mode opératoire étape par étape, en précisant le temps de contact et la dilution, afin que la procédure soit identique d'un jour à l'autre.",
        "Avec quoi : le produit employé, son dosage et le matériel associé, brosse, lavette, raclette dédiée à la zone concernée.",
      ],
    },
    {
      type: 'p',
      text: "Un plan de nettoyage bien construit anticipe aussi les rotations de personnel. Un nouvel arrivant doit pouvoir comprendre, sans formation longue, quelle surface il traite, avec quel produit et selon quelle séquence. C'est pourquoi les meilleurs plans s'accompagnent d'affichages au poste, à proximité de la plonge ou de la zone de stockage des produits, qui rappellent dilutions et temps de contact sans qu'il faille consulter un classeur.",
    },
    {
      type: 'h3',
      text: 'Exemples de fréquences courantes',
    },
    {
      type: 'p',
      text: "Les repères ci-dessous sont des fréquences usuelles en restauration. Chaque établissement les adapte à son activité et à son analyse des dangers. Un atelier traiteur, une cuisine de collectivité ou une activité manipulant des produits sensibles aura des exigences plus poussées qu'un petit service à faible volume. La fréquence n'est jamais une norme figée : elle découle du risque propre à l'établissement.",
    },
    {
      type: 'ul',
      items: [
        "Après chaque usage : plans de travail, planches, ustensiles, lames et matériel de découpe en contact avec les denrées, en particulier lors d'un changement de type de produit pour éviter les contaminations croisées.",
        "Quotidienne : sols de cuisine, plonge, poignées, interrupteurs et points de contact fréquents, poubelles et leurs couvercles.",
        "Hebdomadaire : étagères, parois et joints de chambre froide, dessous et arrière des équipements, zones moins exposées mais propices aux dépôts.",
        "Périodique ou mensuelle : hotte et filtres, murs et plafonds, siphons et grilles d'évacuation, dégivrage des enceintes froides et nettoyage en profondeur des appareils.",
      ],
    },
    {
      type: 'callout',
      title: 'Les zones que tout le monde oublie',
      text: "Siphons, joints de portes de chambre froide, dessous des équipements lourds, lames internes de trancheur, intérieur des distributeurs de boissons, poignées et écrans tactiles. Ces points concentrent souvent la charge microbienne la plus élevée parce qu'ils échappent au nettoyage de routine. Les inscrire nommément dans le plan de nettoyage, avec une fréquence dédiée, vaut mieux que de compter sur la vigilance spontanée du personnel.",
    },
    {
      type: 'h2',
      id: 'produits-et-fiches-techniques',
      text: 'Produits, fiches techniques et fiches de données de sécurité',
    },
    {
      type: 'p',
      text: "Les produits utilisés au contact de surfaces alimentaires doivent être adaptés à cet usage. Pour chaque produit, deux documents distincts doivent rester accessibles au personnel. La fiche technique indique le dosage, le temps de contact, la température d'emploi, les surfaces compatibles et la nécessité éventuelle d'un rinçage. La fiche de données de sécurité, ou FDS, porte sur la protection des utilisateurs : composition, dangers, équipements de protection à porter, conduite en cas de projection ou d'ingestion. Ces deux documents ne se substituent pas l'un à l'autre, et l'INRS rappelle l'importance de la FDS dans la prévention des risques chimiques pour les salariés.",
    },
    {
      type: 'p',
      text: "Les désinfectants destinés à l'agroalimentaire font l'objet de normes d'efficacité. La norme NF EN 1276 évalue par exemple l'activité bactéricide des antiseptiques et désinfectants chimiques dans des conditions représentatives du secteur agroalimentaire, industriel, domestique et des collectivités. Vérifier qu'un produit revendique la conformité à la norme pertinente pour l'usage visé, puis respecter scrupuleusement les conditions d'emploi qu'elle suppose, concentration et temps de contact en tête, fait partie d'un choix de produit sérieux. La conformité à une norme ne vaut que si les conditions d'essai sont reproduites sur le terrain.",
    },
    {
      type: 'p',
      text: "La traçabilité de ce qui est employé compte autant que le produit lui-même. En cas de question lors d'un contrôle, ou d'un signalement par la DGCCRF dans le cadre de ses missions de surveillance, pouvoir présenter les fiches techniques et la FDS des produits utilisés démontre une démarche structurée. À l'inverse, un produit décanté dans un flacon non étiqueté, sans documentation, signale une maîtrise insuffisante et un risque pour la sécurité du personnel.",
    },
    {
      type: 'h3',
      text: 'Bonnes pratiques sur le matériel',
    },
    {
      type: 'ul',
      items: [
        "Séparer le matériel par zone ou par usage, souvent via un code couleur, pour éviter qu'une lavette des sanitaires ne se retrouve sur un plan de travail.",
        "Entretenir et remplacer régulièrement lavettes, brosses et raclettes : un matériel sale recontamine ce qu'il est censé nettoyer, et une éponge usagée est un véritable nid bactérien.",
        "Stocker les produits dans un local ou une zone dédiée, à l'écart des denrées, dans leur contenant d'origine étiqueté, et fermé hors des heures d'usage.",
        "Ne jamais mélanger deux produits : certaines associations, comme eau de Javel et détartrant acide, dégagent des gaz toxiques tout en annulant l'efficacité recherchée.",
      ],
    },
    {
      type: 'h2',
      id: 'plonge-et-lave-vaisselle',
      text: 'Plonge et lave-vaisselle : un protocole à part entière',
    },
    {
      type: 'p',
      text: "La vaisselle, les ustensiles et le petit matériel suivent leur propre logique de nettoyage et de désinfection, qu'elle soit manuelle ou mécanisée. En plonge manuelle, le principe reste celui du protocole complet : débarrasser, laver au détergent dans une eau renouvelée régulièrement, rincer, puis désinfecter ou tremper dans une solution adaptée, avant un séchage à l'air. L'eau de lavage sale finit par recontaminer ce qu'on y plonge, d'où l'importance de la changer dès qu'elle se charge.",
    },
    {
      type: 'p',
      text: "Le lave-vaisselle professionnel combine action chimique et température élevée, ce qui en fait un outil de désinfection thermique efficace quand il est correctement réglé et entretenu. Encore faut-il que les températures de lavage et de rinçage soient atteintes, que les produits soient correctement dosés et que les bras de lavage ne soient pas obstrués. Un appareil entartré ou mal alimenté en produit donne une vaisselle qui paraît propre mais reste insuffisamment assainie. Le détartrage périodique et le contrôle des températures de cycle font donc partie du plan de nettoyage au même titre que les surfaces.",
    },
    {
      type: 'h2',
      id: 'tracabilite',
      text: 'La traçabilité du nettoyage',
    },
    {
      type: 'p',
      text: "Réaliser le nettoyage ne suffit pas : encore faut-il pouvoir le prouver. La traçabilité repose sur deux éléments complémentaires. D'abord le plan de nettoyage écrit, qui décrit ce qui doit être fait. Ensuite l'enregistrement des opérations, le plus souvent un planning daté et renseigné indiquant ce qui a été fait, par qui et quand. Ce suivi permet de vérifier que les fréquences sont tenues dans la durée, et il constitue un élément concret à présenter lors d'un contrôle, où l'absence de tout enregistrement pèse autant qu'un défaut de propreté visible.",
    },
    {
      type: 'p',
      text: "Au-delà du papier ou du tableur, des contrôles ponctuels d'efficacité permettent de confirmer que le protocole fonctionne réellement. Inspection visuelle attentive, contrôle du toucher pour les surfaces grasses, et dans les structures les plus exigeantes prélèvements de surface analysés en laboratoire. L'ANSES, dans ses travaux d'évaluation des risques alimentaires, rappelle le rôle des surfaces et des manuportages dans les contaminations, ce qui justifie ces vérifications. Un plan de nettoyage qui n'est jamais contrôlé finit toujours par se relâcher, parce que la routine émousse la rigueur.",
    },
    {
      type: 'quote',
      text: "Un plan de nettoyage n'a de valeur que s'il est renseigné et vérifié. Sur le terrain, un classeur impeccable mais jamais rempli pèse moins lourd qu'un planning simple, daté et tenu chaque jour.",
    },
    {
      type: 'h2',
      id: 'organisation-dans-le-temps',
      text: 'Organiser le nettoyage sans contaminer les denrées',
    },
    {
      type: 'p',
      text: "Le nettoyage et la désinfection ne se font pas n'importe quand. Pulvériser un produit au-dessus d'un plan de travail où sont posées des denrées, ou nettoyer un sol en pleine production, projette des micro-gouttelettes et des salissures sur les aliments. La règle de bon sens consiste à séparer dans le temps et dans l'espace les opérations de nettoyage et la manipulation des denrées. On nettoie une zone quand elle est vide, on protège ou on évacue ce qui doit l'être, et on attend que les surfaces soient sèches avant d'y reposer des produits.",
    },
    {
      type: 'p',
      text: "Cette séparation rejoint la logique de marche en avant des locaux. Les produits de nettoyage, leur stockage et le matériel associé restent à l'écart des zones de stockage et de préparation des denrées. Un bidon de désinfectant rangé au-dessus d'une étagère de produits secs, ou une projection de détergent qui retombe dans une bassine de légumes, sont des contaminations chimiques évitables. Penser le moment et l'endroit du nettoyage fait partie du protocole autant que le choix du produit.",
    },
    {
      type: 'h2',
      id: 'erreurs-frequentes',
      text: 'Les erreurs fréquentes et les non-conformités observées',
    },
    {
      type: 'p',
      text: "La plupart des écarts relevés sur ce thème reviennent à quelques causes récurrentes, qui tiennent moins à la mauvaise volonté qu'à une méconnaissance de la logique du protocole ou à un relâchement progressif. Les identifier permet de les corriger avant qu'elles ne deviennent un point de blocage.",
    },
    {
      type: 'ul',
      items: [
        "Désinfecter sans avoir nettoyé : le désinfectant est consommé par les salissures et la matière grasse avant d'atteindre les micro-organismes.",
        "Ne pas respecter le temps de contact : essuyer ou rincer trop tôt annule la désinfection, même si le bon produit a été utilisé.",
        "Mauvais dosage : un produit trop dilué est inefficace, trop concentré il coûte cher, peut laisser des résidus et abîmer les surfaces.",
        "Oublier le rinçage intermédiaire : les résidus de détergent réduisent l'action du désinfectant appliqué ensuite.",
        "Laisser des zones sans protocole : siphons, joints, dessous d'équipements, poignées, là où les bactéries s'installent durablement.",
        "Stocker des produits décantés dans des flacons non étiquetés, sans fiche technique ni FDS accessibles.",
        "Plan de nettoyage absent ou jamais renseigné : impossible de démontrer ce qui a été fait, ni de tenir les fréquences dans la durée.",
      ],
    },
    {
      type: 'h3',
      text: 'Exemples de non-conformités relevées en audit',
    },
    {
      type: 'p',
      text: "Quelques situations concrètes illustrent ce que repère un audit sur ce thème. Un trancheur à jambon nettoyé en surface mais dont la lame interne et le poussoir n'ont jamais été démontés, avec des dépôts anciens. Un siphon de plonge jamais inscrit au plan de nettoyage, dégageant une odeur révélatrice d'un biofilm installé. Des lavettes uniques utilisées indifféremment sur les plans de travail et les sols. Un bidon de désinfectant transvasé dans une bouteille d'eau, sans étiquette, posé près des denrées. Un planning de nettoyage vierge depuis plusieurs semaines, alors que les surfaces sont propres, ce qui rend impossible toute preuve de régularité.",
    },
    {
      type: 'p',
      text: "Lors d'un audit, ces points sont vérifiés concrètement : présence d'un plan de nettoyage à jour, cohérence des fréquences avec l'activité réelle, disponibilité des fiches techniques et des FDS, état du matériel, séparation des produits et des denrées, et propreté effective des surfaces, y compris les zones difficiles d'accès. audit hygiène, label privé indépendant, accompagne les restaurateurs pour repérer ces écarts et structurer un plan de nettoyage solide en vue d'un contrôle officiel. Cette démarche volontaire ne se substitue ni aux services de l'État ni à un agrément réglementaire, et elle ne garantit aucun résultat à un contrôle officiel : elle aide à anticiper et à mettre en conformité.",
    },
    {
      type: 'p',
      text: "Maîtriser le nettoyage et la désinfection, ce n'est pas multiplier les produits ni nettoyer plus longtemps. C'est appliquer le bon protocole, dans le bon ordre, avec le bon produit, en respectant ses conditions d'emploi, et garder une trace écrite de tout cela. Une cuisine qui tient cette ligne réduit fortement son risque sanitaire et aborde un contrôle avec sérénité, parce qu'elle peut montrer non seulement des surfaces propres, mais aussi la méthode qui les rend telles jour après jour.",
    },
  ],
  faq: [
    {
      q: 'Quelle est la différence entre nettoyer et désinfecter ?',
      a: "Nettoyer élimine les salissures visibles, graisses et résidus, à l'aide d'un détergent. Désinfecter réduit le nombre de micro-organismes vivants à l'aide d'un désinfectant. Les deux sont complémentaires : on ne désinfecte pas efficacement une surface qui n'a pas été nettoyée au préalable, car la matière organique neutralise le désinfectant.",
    },
    {
      q: 'Quelles sont les 5 étapes du protocole de nettoyage-désinfection ?',
      a: "Prélavage pour retirer les gros résidus, nettoyage au détergent avec action mécanique, rinçage intermédiaire à l'eau potable, désinfection en respectant le temps de contact, puis rinçage final si requis et séchage. Chaque étape prépare la suivante et aucune ne peut être supprimée sans compromettre le résultat.",
    },
    {
      q: "Qu'est-ce que le cercle de Sinner ou méthode TACT ?",
      a: "C'est la combinaison de quatre facteurs qui déterminent l'efficacité d'un nettoyage : action chimique (le produit), action mécanique (le frottement), température et temps. Si l'on réduit l'un de ces facteurs, il faut compenser par un autre pour garder le même résultat. Par exemple, moins de température en plonge manuelle exige plus de frottement.",
    },
    {
      q: "Pourquoi faut-il respecter le temps de contact d'un désinfectant ?",
      a: "Un désinfectant a besoin d'un temps d'action minimal, indiqué sur sa fiche technique, pour réduire réellement les micro-organismes. Si l'on essuie ou rince trop tôt, la désinfection n'a pas eu lieu, même si la surface paraît propre. C'est l'une des erreurs les plus fréquentes et les plus difficiles à détecter à l'œil.",
    },
    {
      q: "Que doit contenir un plan de nettoyage ?",
      a: "Il précise, pour chaque zone et chaque équipement : quoi nettoyer, qui en est responsable, quand selon la fréquence, comment via le mode opératoire avec temps de contact et dilution, et avec quoi en termes de produit, dosage et matériel. C'est un document du plan de maîtrise sanitaire qui doit rester à jour et accessible.",
    },
    {
      q: "Quelle différence entre une fiche technique et une fiche de données de sécurité ?",
      a: "La fiche technique porte sur l'usage du produit : dosage, temps de contact, température, surfaces compatibles, rinçage éventuel. La fiche de données de sécurité (FDS) porte sur la protection des utilisateurs : composition, dangers, équipements de protection, conduite en cas d'incident. Les deux doivent rester accessibles au personnel.",
    },
    {
      q: "Comment prouver que le nettoyage est bien fait lors d'un contrôle ?",
      a: "En présentant un plan de nettoyage écrit et un enregistrement des opérations, généralement un planning daté et renseigné indiquant ce qui a été fait, par qui et quand, complétés par les fiches techniques et les FDS des produits utilisés. L'absence d'enregistrement pèse autant qu'un défaut de propreté visible.",
    },
    {
      q: "Un produit détergent-désinfectant suffit-il ?",
      a: "Il combine les deux fonctions et fait gagner du temps sur des surfaces peu souillées, mais il reste moins efficace qu'un protocole en deux temps sur une surface très encrassée. Un prélavage demeure nécessaire, et le temps de contact pour la fonction désinfectante doit toujours être respecté.",
    },
    {
      q: "Le lave-vaisselle professionnel désinfecte-t-il vraiment ?",
      a: "Oui, quand il est bien réglé et entretenu : il combine action chimique et température élevée, ce qui assure une désinfection thermique. Encore faut-il que les températures de lavage et de rinçage soient atteintes, que les produits soient dosés correctement et que l'appareil soit détartré régulièrement. Un lave-vaisselle entartré rend une vaisselle propre en apparence mais mal assainie.",
    },
  ],
  sources: [
    {
      label: "Règlement (CE) 852/2004 relatif à l'hygiène des denrées alimentaires, annexe II (locaux, équipements, propreté)",
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004R0852',
    },
    {
      label: "Hygiène alimentaire et plan de maîtrise sanitaire - ministère de l'Agriculture et de la Souveraineté alimentaire",
      url: 'https://agriculture.gouv.fr/',
    },
    {
      label: "ANSES - évaluation des risques liés aux aliments et aux contaminations de surface",
      url: 'https://www.anses.fr/',
    },
    {
      label: "INRS - prévention du risque chimique et fiches de données de sécurité (FDS)",
      url: 'https://www.inrs.fr/',
    },
    {
      label: "DGCCRF - sécurité et conformité des produits, surveillance du marché",
      url: 'https://www.economie.gouv.fr/dgccrf',
    },
    {
      label: "Arrêté du 21 décembre 2009 relatif aux règles sanitaires applicables aux activités de commerce de détail",
      url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000021629599',
    },
    {
      label: "NF EN 1276 - Antiseptiques et désinfectants chimiques : essai de l'activité bactéricide en agroalimentaire, industriel, domestique et collectivités",
    },
  ],
  related: [
    'chaine-du-froid-restauration',
    'plan-maitrise-sanitaire-pms',
    'haccp-restauration-guide',
  ],
  relatedZones: ['paris', 'hauts-de-seine'],
};
