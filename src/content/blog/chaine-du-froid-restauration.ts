import type { Article } from './types';

export const article: Article = {
  slug: 'chaine-du-froid-restauration',
  title: 'Chaîne du froid en restauration : températures, relevés et ruptures',
  metaTitle: 'Chaîne du froid restauration : températures clés',
  description:
    'Températures de la chaîne du froid en restauration : réfrigération, surgelés, liaison chaude, refroidissement rapide, relevés, sondes et conduite en cas de rupture.',
  excerpt:
    'Réfrigération, surgelés, liaison chaude, refroidissement rapide : les températures à tenir, les relevés à consigner, l\'étalonnage des sondes et la conduite à suivre quand le froid est rompu.',
  category: 'Pratique',
  datePublished: '2026-06-08',
  dateModified: '2026-06-22',
  readingMinutes: 14,
  answer:
    "La chaîne du froid est le maintien continu du froid sur une denrée, du fournisseur jusqu'à l'assiette. Les denrées surgelées se conservent à -18°C à coeur, un plat tenu chaud en liaison chaude reste à +63°C minimum, et un plat cuit destiné au froid passe de +63°C à +10°C en moins de deux heures. Pour les produits réfrigérés (viandes, produits laitiers, plats préparés), les températures relèvent de l'arrêté du 21 décembre 2009 et de l'étiquette du fabricant, qui prime si elle est plus stricte. Toute la difficulté tient moins à connaître ces valeurs qu'à les tenir sans interruption et à le prouver par des relevés.",
  blocks: [
    {
      type: 'p',
      text: "La chaîne du froid figure parmi les premiers points qu'un inspecteur regarde lors d'un contrôle, et parmi les premières causes de non-conformité relevées en restauration. Une rupture passe souvent inaperçue sur le moment. Un produit qui revient dans sa plage de température après un écart paraît normal, alors que le mal est déjà fait : les bactéries ont eu le temps de se multiplier. Connaître les températures à tenir ne suffit pas. Il faut aussi savoir les mesurer avec un instrument fiable, les consigner dans la durée et réagir vite quand un écart se produit. C'est cet ensemble, et non le seul affichage d'un frigo le jour J, qui constitue la maîtrise attendue.",
    },
    {
      type: 'h2',
      id: 'definition',
      text: "Ce que recouvre la chaîne du froid en restauration",
    },
    {
      type: 'p',
      text: "La chaîne du froid désigne le maintien ininterrompu d'une température basse sur une denrée périssable, depuis sa production jusqu'à sa consommation. Réception, transport, stockage, préparation, service : chaque maillon doit conserver le produit dans sa plage. Le terme de chaîne n'est pas une image. Il suffit qu'un seul maillon cède, par exemple une livraison restée trop longtemps sur un quai au soleil, pour que tout le reste de l'effort soit annulé. Le froid ne tue pas les micro-organismes. Il ralentit leur multiplication. Dès qu'un produit se réchauffe au-delà de sa plage, la croissance bactérienne reprend, et ce qui a été gagné est perdu sans retour possible.",
    },
    {
      type: 'p',
      text: "Le règlement (CE) n° 852/2004 impose à chaque exploitant de maîtriser ses températures par une démarche fondée sur les principes HACCP, et de pouvoir le démontrer. Le règlement (CE) n° 853/2004 ajoute des règles spécifiques pour les denrées d'origine animale, plus sensibles. En France, l'arrêté du 21 décembre 2009 précise les températures de conservation applicables aux produits réfrigérés et congelés au stade du commerce de détail, ce qui couvre la restauration. Ces trois textes forment le socle réglementaire. Tout le reste, fréquence des relevés, choix des équipements, organisation du stockage, en découle.",
    },
    {
      type: 'p',
      text: "Un point mérite d'être posé d'emblée, car il revient sans cesse. La réglementation n'attend pas que vous récitiez une température. Elle attend que vous prouviez que la denrée a été tenue à la bonne température en continu. La nuance est de taille : un établissement peut connaître toutes les valeurs par coeur et rester en non-conformité parce qu'il ne trace rien.",
    },
    {
      type: 'h2',
      id: 'temperatures-reglementaires',
      text: 'Les températures de référence à connaître',
    },
    {
      type: 'p',
      text: "Les valeurs qui suivent sont des repères de travail. La température exacte d'un produit réfrigéré dépend de sa catégorie, fixée par l'arrêté du 21 décembre 2009, et de l'indication portée par le fabricant sur l'étiquette. Cette dernière prime dès lors qu'elle est plus stricte que le minimum réglementaire. Une règle simple à retenir : en cas de divergence, on retient toujours la valeur la plus basse. Mieux vaut un produit un peu plus froid que prévu qu'un produit à la limite de sa plage.",
    },
    {
      type: 'h3',
      text: 'Produits congelés et surgelés',
    },
    {
      type: 'ul',
      items: [
        'Denrées surgelées : -18°C à coeur, sans interruption sur toute la chaîne.',
        "Crèmes glacées et glaces : se reporter à l'étiquetage et à l'arrêté du 21 décembre 2009 selon la nature du produit.",
        "Produits simplement congelés : température conforme à celle fixée par la réglementation et par l'étiquette du fabricant.",
      ],
    },
    {
      type: 'p',
      text: "Le -18°C des surgelés est l'une des rares valeurs réellement universelles et facile à retenir. La vigilance porte surtout sur les transitions : transfert du camion à la chambre froide négative, ouverture répétée des portes, dégivrage. C'est là que la température remonte, parfois nettement, sans que l'écran de l'enceinte le montre tout de suite.",
    },
    {
      type: 'h3',
      text: 'Produits réfrigérés',
    },
    {
      type: 'p',
      text: "Les denrées réfrigérées relèvent de plages distinctes selon leur nature : viandes, charcuteries, produits laitiers, plats préparés, produits de la pêche, oeufs et ovoproduits ne partagent pas les mêmes seuils. Ces plages sont définies dans le tableau de l'arrêté du 21 décembre 2009. À titre indicatif, les viandes hachées et les préparations de viande fraîche comptent parmi les produits soumis aux températures les plus basses, parce qu'ils présentent une surface d'exposition microbienne importante. Les produits de la pêche frais ont eux aussi des exigences strictes, proches de la fonte de la glace.",
    },
    {
      type: 'p',
      text: "Plutôt que de mémoriser une valeur unique qui serait fausse pour la moitié des produits, l'attitude juste consiste à se reporter au tableau de l'arrêté et à respecter l'étiquette. Afficher ce tableau dans la zone de stockage est une pratique simple et efficace. Cela évite les approximations et donne un repère commun à toute l'équipe, y compris aux extras et aux nouveaux arrivants.",
    },
    {
      type: 'callout',
      title: 'La réfrigération n\'a pas de valeur unique',
      text: "Se méfier des chiffres ronds entendus en cuisine, du type \"tout à +4°C\". C'est un repère pratique pour beaucoup de produits, mais ce n'est pas la règle pour tous. Plusieurs catégories ont des seuils plus bas. En cas de doute, on consulte le tableau de l'arrêté du 21 décembre 2009 et l'étiquette, et on retient la valeur la plus stricte.",
    },
    {
      type: 'h3',
      text: 'Liaison chaude, refroidissement et liaison froide',
    },
    {
      type: 'p',
      text: "Le froid n'est qu'une moitié de l'histoire. Les denrées cuites passent par des phases chaudes, et c'est souvent là, dans le passage du chaud au froid, que se jouent les vrais risques. Trois situations reviennent en restauration.",
    },
    {
      type: 'ul',
      items: [
        'Liaison chaude (maintien au chaud avant service) : température à coeur tenue à +63°C minimum, sans descendre sous ce seuil pendant le service.',
        'Refroidissement rapide (plat cuit destiné à être servi froid ou conservé) : passage de +63°C à +10°C en moins de deux heures.',
        "Liaison froide (conservation après refroidissement) : maintien au froid réfrigéré jusqu'à la remise en température ou le service.",
        'Remise en température : montée rapide jusqu\'à +63°C à coeur avant de servir, sans étape tiède prolongée.',
      ],
    },
    {
      type: 'callout',
      title: 'Le seuil des deux heures',
      text: "Le refroidissement d'un plat chaud de +63°C à +10°C doit s'effectuer en moins de deux heures. C'est précisément dans cette tranche, entre +10°C et +63°C, dite zone de danger, que les bactéries se multiplient le plus vite. Un plat laissé refroidir à température ambiante, par exemple un grand volume de sauce ou de riz posé sur un plan de travail, traverse cette zone trop lentement. La cellule de refroidissement rapide n'est pas un luxe : c'est l'équipement conçu pour franchir cette plage assez vite. Sans elle, le refroidissement de gros volumes devient très difficile à maîtriser.",
    },
    {
      type: 'h2',
      id: 'reception',
      text: 'Le contrôle à réception, premier maillon',
    },
    {
      type: 'p',
      text: "Tout l'effort de stockage et de service ne sert à rien si la denrée arrive déjà hors plage. La réception est le premier point où la chaîne du froid peut casser, et le seul où l'on peut encore refuser le produit sans assumer le risque. Un contrôle à réception sérieux ne se limite pas à signer un bon de livraison.",
    },
    {
      type: 'ul',
      items: [
        "Mesurer la température des produits sensibles à la livraison, idéalement entre deux unités ou avec une sonde adaptée, sans percer inutilement les emballages.",
        "Vérifier l'intégrité des emballages, l'absence de décongélation visible (givre anormal, traces de liquide, croûte de glace sur les surgelés).",
        "Contrôler les DLC et l'étiquetage, refuser une denrée déjà proche de sa limite.",
        "Consigner un refus par écrit avec le motif (température, emballage, date) en cas d'écart, et ne pas stocker un produit douteux \"en attendant\".",
        "Ranger sans délai les produits acceptés dans la bonne enceinte, le froid attendant rarement la fin du déballage.",
      ],
    },
    {
      type: 'p',
      text: "Un point souvent négligé : la rapidité du rangement. Une palette de produits frais conforme à l'arrivée mais laissée trente minutes sur le quai pendant qu'on traite la paperasse subit déjà une montée en température. Le contrôle à réception et la mise au froid forment un seul geste, pas deux étapes séparées dans le temps.",
    },
    {
      type: 'h2',
      id: 'stockage',
      text: 'Stockage : organiser le froid pour qu\'il circule',
    },
    {
      type: 'p',
      text: "Une enceinte froide ne refroidit correctement que si l'air froid circule. C'est la cause la plus banale et la plus fréquente des écarts de stockage : une chambre froide surchargée, des denrées plaquées contre l'évaporateur ou empilées jusqu'au plafond, et des poches d'air tiède se forment là où le thermomètre de l'enceinte ne mesure rien. L'écran affiche une valeur correcte au point de sonde, tandis qu'un carton dans un coin reste plusieurs degrés au-dessus.",
    },
    {
      type: 'p',
      text: "Quelques principes tiennent toute l'organisation du stockage au froid :",
    },
    {
      type: 'ul',
      items: [
        "Ne pas surcharger : laisser l'air circuler autour et au-dessus des denrées, ne pas obstruer l'évaporateur ni la grille de ventilation.",
        "Respecter la marche en avant et le rangement par niveau de risque, produits crus et produits prêts à consommer séparés, jamais le cru au-dessus du prêt à consommer.",
        "Ne jamais introduire de denrées chaudes dans une enceinte de réfrigération : elles font remonter la température de l'ensemble et sollicitent le groupe au-delà de sa capacité.",
        "Couvrir, dater et protéger les produits entamés pour éviter contaminations croisées et dessèchement.",
        "Entretenir les enceintes : dégivrage régulier, joints de porte en bon état, condenseur propre, fermeture effective des portes.",
      ],
    },
    {
      type: 'p',
      text: "Le givre mérite une mention à part. Une couche de givre épaisse sur l'évaporateur isole le froid au lieu de le diffuser, dégrade le rendement et finit par faire dériver la température sans panne apparente. Un dégivrage négligé est une cause lente et silencieuse de perte de chaîne du froid, plus insidieuse qu'une panne franche qui, au moins, se voit.",
    },
    {
      type: 'h2',
      id: 'releves',
      text: 'Relevés de température : quoi consigner et à quelle fréquence',
    },
    {
      type: 'p',
      text: "La maîtrise des températures doit être démontrable. Un contrôle ne se contente jamais de constater qu'un frigo affiche la bonne valeur à l'instant T. Il cherche la preuve que vous suivez et tracez vos températures dans la durée. Les relevés font partie intégrante du plan de maîtrise sanitaire, au même titre que les procédures de nettoyage ou le suivi des nuisibles. Sans eux, la maîtrise reste une affirmation, pas une démonstration.",
    },
    {
      type: 'ul',
      items: [
        "Réception : température des produits sensibles à la livraison, refus consigné en cas d'écart.",
        "Enceintes froides : relevé régulier des chambres froides, réfrigérateurs et congélateurs. Un relevé au moins quotidien des enceintes est une pratique courante et attendue.",
        "Liaison chaude : contrôle de la température de maintien avant et pendant le service.",
        "Refroidissement : suivi de la descente en température des plats refroidis, avec heure de début et de fin pour vérifier le respect des deux heures.",
        "Conservation des enregistrements : sur une durée permettant de retrouver l'historique en cas de contrôle ou d'incident sanitaire.",
      ],
    },
    {
      type: 'p',
      text: "La réglementation impose de maîtriser et de tracer, sans toujours fixer une fréquence unique gravée dans le marbre pour chaque opération. C'est à l'exploitant de définir, dans son plan de maîtrise sanitaire, une fréquence adaptée à son activité et de s'y tenir. Une fréquence affichée mais jamais respectée est pire que pas de fréquence du tout : elle révèle un écart entre le procédé écrit et la réalité, ce qu'un inspecteur repère vite.",
    },
    {
      type: 'p',
      text: "Le moyen de mesure compte autant que la mesure. Un relevé n'a de valeur que s'il est daté, identifiable (qui l'a fait), lisible et conservé. Un cahier de relevés rempli à la va-vite en fin de semaine, avec des valeurs trop régulières pour être vraies, n'apporte aucune preuve et peut même se retourner contre l'établissement. Les enregistreurs automatiques de température, qui tracent en continu et alertent en cas de dérive, lèvent une partie de cette difficulté, mais ils ne dispensent pas d'une vérification humaine régulière des sondes.",
    },
    {
      type: 'h2',
      id: 'etalonnage-sondes',
      text: 'Étalonnage et vérification des sondes',
    },
    {
      type: 'p',
      text: "Une mesure ne vaut que ce que vaut l'instrument qui la produit. Une sonde dérive avec le temps, les chocs, l'usure de la batterie. Un thermomètre qui affiche +2°C alors que le produit est à +6°C donne une fausse assurance et masque un écart réel. La fiabilité de tous vos relevés repose sur ce maillon discret : la vérification régulière des sondes.",
    },
    {
      type: 'p',
      text: "Deux repères simples permettent de vérifier une sonde à moindre frais, sans matériel de laboratoire :",
    },
    {
      type: 'ul',
      items: [
        "Le point de fusion de la glace : un mélange d'eau et de glace pilée bien remué se stabilise autour de 0°C. Une sonde correcte doit afficher une valeur très proche de zéro.",
        "Le point d'ébullition de l'eau : autour de +100°C à l'altitude des plaines, utile surtout pour les sondes de cuisson et de liaison chaude.",
      ],
    },
    {
      type: 'p',
      text: "Ces vérifications maison servent à détecter une dérive, à consigner que la sonde a été contrôlée et, le cas échéant, à la retirer du service. Elles ne remplacent pas un étalonnage formel par un prestataire pour les instruments critiques, lorsque l'activité le justifie. L'essentiel est de tracer ces vérifications : noter la date, la valeur lue dans la glace fondante, la décision prise. Une sonde jamais vérifiée jette un doute sur tout l'historique de relevés qu'elle a produit.",
    },
    {
      type: 'p',
      text: "Côté hygiène, la sonde elle-même peut devenir un vecteur de contamination. On la désinfecte entre deux produits, en particulier entre un produit cru et un produit prêt à consommer, sous peine de transporter des bactéries d'une denrée à l'autre par le geste même censé garantir leur sécurité.",
    },
    {
      type: 'h2',
      id: 'erreurs-frequentes',
      text: 'Les erreurs fréquentes qui rompent la chaîne du froid',
    },
    {
      type: 'p',
      text: "La plupart des ruptures ne viennent pas d'une panne spectaculaire mais d'habitudes prises sous la pression du service. Les écarts qui reviennent le plus souvent en audit sont rarement des surprises pour qui les commet, et c'est ce qui les rend tenaces.",
    },
    {
      type: 'ul',
      items: [
        "Laisser refroidir un plat chaud à température ambiante au lieu d'utiliser une cellule de refroidissement rapide.",
        "Surcharger une chambre froide, ce qui empêche l'air froid de circuler et crée des zones tièdes invisibles au thermomètre de l'enceinte.",
        "Laisser des produits trop longtemps en zone de préparation, hors froid, pendant un service prolongé.",
        "Recongeler un produit décongelé, ce qui est interdit et augmente nettement le risque pour le consommateur.",
        "Ne pas contrôler la température à la réception et accepter une livraison déjà hors plage.",
        "Introduire des denrées chaudes dans une enceinte froide, ce qui fait remonter la température de tout le contenu.",
        "Négliger l'entretien : givre épais, joints abîmés, portes mal fermées, dégivrage repoussé.",
        "Tenir des relevés trop réguliers pour être crédibles, ou les remplir après coup au lieu de mesurer réellement.",
      ],
    },
    {
      type: 'h2',
      id: 'rupture',
      text: 'Que faire en cas de rupture de la chaîne du froid',
    },
    {
      type: 'p',
      text: "Une rupture est constatée quand un produit est resté hors de sa plage de température : panne d'une enceinte, porte restée ouverte une nuit, livraison non conforme acceptée par erreur, bac oublié en zone de préparation. La conduite à tenir doit être anticipée dans le plan de maîtrise sanitaire et appliquée sans improvisation, parce qu'une décision prise dans l'urgence et sans repère penche presque toujours du mauvais côté, celui de la perte économique évitée au détriment de la sécurité.",
    },
    {
      type: 'ol',
      items: [
        "Identifier les produits concernés et estimer la durée et le niveau d'exposition au-delà de la plage, en cherchant l'heure probable du début de l'écart.",
        "Isoler immédiatement les denrées suspectes, les marquer ou les déplacer pour éviter qu'elles soient utilisées ou servies par mégarde.",
        "Mesurer la température réelle des produits avec une sonde vérifiée, et non se fier au seul affichage de l'enceinte.",
        "Décider du sort des denrées selon des critères définis à l'avance dans le plan de maîtrise sanitaire (maintien, consommation rapide encadrée ou retrait), en privilégiant toujours la sécurité du consommateur.",
        "Retirer et tracer la destruction des produits jugés dangereux, sans les remettre dans le circuit ni les reverser dans un autre lot.",
        "Identifier la cause (panne technique, erreur de manipulation, équipement sous-dimensionné) et engager l'action corrective adaptée.",
        "Consigner l'incident par écrit : date, heure, produits, températures relevées, décision prise, mesure corrective et nom du responsable.",
      ],
    },
    {
      type: 'callout',
      title: 'En cas de doute, on retire',
      text: "La règle de prudence prime sur la perte économique. Un produit dont l'exposition au chaud ne peut être ni mesurée ni justifiée ne doit pas être servi. La traçabilité de la décision protège l'établissement autant que le consommateur : en cas de contrôle ou d'incident ultérieur, une rupture gérée et documentée vaut mieux qu'une rupture cachée. Détruire un lot et le tracer est un acte de maîtrise, pas un aveu de faute.",
    },
    {
      type: 'quote',
      text: "Une chaîne du froid maîtrisée ne se prouve pas par un thermomètre le jour J, mais par des relevés tenus chaque jour et des ruptures assumées par écrit.",
    },
    {
      type: 'h2',
      id: 'controle',
      text: 'Chaîne du froid et contrôle sanitaire',
    },
    {
      type: 'p',
      text: "Lors d'un contrôle, l'inspecteur croise deux regards. Le premier porte sur la situation instantanée : températures affichées, état des enceintes, propreté, organisation du stockage, absence de denrées chaudes au froid. Le second, plus exigeant, porte sur la démonstration de la maîtrise dans le temps : relevés tenus, procédure de refroidissement écrite et appliquée, vérification des sondes, gestion documentée des ruptures passées. Une enceinte parfaitement conforme le jour du contrôle ne suffit pas si rien ne prouve que cette température est tenue au quotidien.",
    },
    {
      type: 'p',
      text: "C'est ce double niveau qui désarçonne le plus d'établissements. Beaucoup soignent le visible, le matériel, la propreté apparente, et négligent la trace écrite, qui pèse pourtant lourd dans l'appréciation. La DGCCRF et les services de contrôle officiels évaluent la maîtrise globale du procédé, pas une photographie figée. Un cahier de relevés cohérent, des sondes vérifiées et une fiche d'incident bien remplie racontent une histoire crédible de maîtrise. Leur absence raconte l'inverse.",
    },
    {
      type: 'p',
      text: "Préparer ce volet en amont fait partie de ce que vérifie un audit hygiène. audit hygiène est un label privé indépendant, fondé sur la réglementation en vigueur. L'audit passe en revue les enceintes, les relevés, l'étalonnage des sondes, les procédures de liaison chaude et de refroidissement et la gestion des ruptures, puis remet un rapport listant les écarts constatés et un plan correctif priorisé. Cette démarche volontaire aide à anticiper un contrôle officiel. Elle ne s'y substitue pas et n'en garantit pas le résultat : aucun audit privé ne peut promettre l'issue d'un contrôle des services de l'État.",
    },
    {
      type: 'p',
      text: "Pour aller au-delà des seules températures, la chaîne du froid se rattache à d'autres maillons du plan de maîtrise sanitaire : la traçabilité et la gestion des DLC, le nettoyage et la désinfection des enceintes et des plans de travail, et la démarche HACCP dans son ensemble. Travailler ces volets de façon cohérente vaut mieux que d'empiler des relevés sans procédure d'arrière-plan.",
    },
  ],
  faq: [
    {
      q: 'À quelle température conserver les produits surgelés en restauration ?',
      a: "Les denrées surgelées se conservent à -18°C à coeur, sans rupture sur toute la chaîne. Cette valeur est un repère réglementaire largement appliqué, à compléter par les indications du fabricant figurant sur l'emballage. La vigilance porte surtout sur les transitions, transferts et ouvertures de porte, où la température peut remonter sans alerte immédiate.",
    },
    {
      q: 'Quelle température pour le maintien au chaud avant le service ?',
      a: "En liaison chaude, un plat maintenu au chaud avant le service doit conserver une température à coeur d'au moins +63°C. En dessous, le plat entre dans la zone de danger où les bactéries se multiplient rapidement. La température se contrôle à coeur avec une sonde, pas au feeling.",
    },
    {
      q: 'Combien de temps pour refroidir un plat cuit ?',
      a: "Un plat cuit destiné à être servi froid ou conservé doit passer de +63°C à +10°C en moins de deux heures, à l'aide d'une cellule de refroidissement rapide. Le refroidissement lent à l'air libre, surtout sur de gros volumes, est une erreur fréquente et risquée, car le plat traverse trop longtemps la zone de danger.",
    },
    {
      q: 'Peut-on recongeler un produit décongelé ?',
      a: "Non. Recongeler une denrée décongelée est interdit. La décongélation favorise la croissance bactérienne, et un nouveau cycle de congélation ne supprime pas ce risque pour le consommateur. Une fois décongelé, un produit doit être utilisé dans le délai prévu, puis jeté s'il n'est pas consommé.",
    },
    {
      q: 'À quelle fréquence faut-il relever les températures des frigos ?',
      a: "La réglementation impose de maîtriser et de tracer les températures, sans toujours fixer une fréquence unique pour chaque opération. Un relevé au moins quotidien des enceintes froides, plus un contrôle à la réception et lors des opérations sensibles comme le refroidissement, est une pratique courante et attendue lors d'un contrôle. La fréquence retenue doit figurer dans le plan de maîtrise sanitaire et être réellement respectée.",
    },
    {
      q: 'Comment vérifier qu\'une sonde de température est fiable ?',
      a: "On peut vérifier une sonde avec deux repères simples : le point de fusion de la glace, autour de 0°C avec un mélange eau et glace pilée bien remué, et le point d'ébullition de l'eau, autour de +100°C en plaine. La sonde doit afficher une valeur proche de ces repères. Ces vérifications se tracent par écrit et ne dispensent pas d'un étalonnage formel pour les instruments critiques.",
    },
    {
      q: 'Que faire si une chambre froide tombe en panne ?',
      a: "Isolez les produits concernés, mesurez leur température réelle avec une sonde vérifiée, décidez de leur sort selon des critères définis à l'avance en privilégiant la sécurité, retirez et tracez la destruction des denrées dangereuses, traitez la cause de la panne et consignez l'incident par écrit avec date, températures, décision et mesure corrective.",
    },
    {
      q: 'Que contrôler à la réception d\'une livraison ?',
      a: "Mesurez la température des produits sensibles, vérifiez l'intégrité des emballages et l'absence de décongélation visible, contrôlez les DLC et l'étiquetage, puis rangez sans délai dans la bonne enceinte. En cas d'écart de température ou d'emballage, refusez la livraison et consignez le motif par écrit, sans stocker un produit douteux en attendant.",
    },
    {
      q: 'Où trouver les températures réglementaires précises par type de produit ?',
      a: "Les températures de conservation des produits réfrigérés et congelés sont fixées par l'arrêté du 21 décembre 2009, consultable sur Legifrance. Les règlements (CE) n° 852/2004 et n° 853/2004 fixent le cadre européen. L'étiquette du fabricant complète ces valeurs et prime lorsqu'elle est plus stricte.",
    },
  ],
  sources: [
    {
      label: "Règlement (CE) n° 852/2004 relatif à l'hygiène des denrées alimentaires",
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004R0852',
    },
    {
      label: "Règlement (CE) n° 853/2004 fixant des règles spécifiques d'hygiène pour les denrées d'origine animale",
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004R0853',
    },
    {
      label: 'Arrêté du 21 décembre 2009 relatif aux règles sanitaires applicables aux activités de commerce de détail',
      url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000021629599',
    },
    {
      label: "Ministère de l'Agriculture et de la Souveraineté alimentaire",
      url: 'https://agriculture.gouv.fr/',
    },
    {
      label: "ANSES : agence nationale de sécurité sanitaire de l'alimentation",
      url: 'https://www.anses.fr/',
    },
    {
      label: 'DGCCRF : direction générale de la concurrence, de la consommation et de la répression des fraudes',
      url: 'https://www.economie.gouv.fr/dgccrf',
    },
  ],
  related: ['tracabilite-dlc-restaurant', 'haccp-restauration-guide', 'nettoyage-desinfection-cuisine'],
};
