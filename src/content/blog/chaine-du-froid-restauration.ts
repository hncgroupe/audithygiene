import type { Article } from './types';

export const article: Article = {
  slug: 'chaine-du-froid-restauration',
  title: 'Chaîne du froid en restauration : températures, relevés et ruptures',
  metaTitle: 'Chaîne du froid restauration : températures clés',
  description:
    'Températures réglementaires de la chaîne du froid en restauration : réfrigération, congélation, liaison froide et chaude, relevés et que faire en cas de rupture.',
  excerpt:
    'Réfrigération, congélation, liaison chaude ou froide : les températures à tenir, les relevés à consigner et la conduite à suivre quand la chaîne du froid est rompue.',
  category: 'Pratique',
  datePublished: '2026-06-08',
  dateModified: '2026-06-08',
  readingMinutes: 8,
  answer:
    "La chaîne du froid est le maintien continu du froid sur une denrée, du fournisseur jusqu'à l'assiette. En restauration, les denrées surgelées se conservent à -18°C, un plat maintenu chaud en liaison chaude doit rester à +63°C au minimum, et un plat cuit destiné à être servi froid doit passer de +63°C à +10°C en moins de deux heures. Pour les produits réfrigérés (viandes, produits laitiers, plats préparés), les températures sont fixées par l'arrêté du 21 décembre 2009 et complétées par les indications du fabricant sur l'étiquette.",
  blocks: [
    {
      type: 'p',
      text: "La chaîne du froid est l'un des points les plus surveillés lors d'un contrôle sanitaire, et l'une des premières causes de non-conformité en restauration. Une rupture passe souvent inaperçue, mais elle suffit à transformer un produit sain en danger pour le consommateur. Comprendre les températures à tenir, savoir les relever et réagir vite en cas d'écart fait partie du socle de base de tout établissement.",
    },
    {
      type: 'h2',
      id: 'definition',
      text: "Qu'est-ce que la chaîne du froid en restauration",
    },
    {
      type: 'p',
      text: "La chaîne du froid désigne le maintien ininterrompu d'une température basse sur une denrée périssable, depuis sa production jusqu'à sa consommation. Réception, transport, stockage, préparation, service : chaque maillon doit conserver le produit dans sa plage de température. Le froid ne détruit pas les micro-organismes, il ralentit leur multiplication. Dès qu'un produit se réchauffe au-delà de sa plage, les bactéries reprennent leur croissance, et ce qui a été gagné est perdu.",
    },
    {
      type: 'p',
      text: "Le règlement (CE) 852/2004 impose à chaque exploitant de maîtriser ses températures par une démarche fondée sur les principes HACCP. Le règlement (CE) 853/2004 fixe des règles spécifiques pour les denrées d'origine animale. En France, l'arrêté du 21 décembre 2009 précise les températures de conservation applicables aux produits réfrigérés et congelés.",
    },
    {
      type: 'h2',
      id: 'temperatures-reglementaires',
      text: 'Les températures réglementaires à connaître',
    },
    {
      type: 'p',
      text: "Les valeurs ci-dessous sont des repères courants. La température exacte d'un produit réfrigéré dépend de sa catégorie (fixée par l'arrêté du 21 décembre 2009) et, le cas échéant, de l'indication portée par le fabricant sur l'étiquette, qui prime lorsqu'elle est plus stricte.",
    },
    {
      type: 'h3',
      text: 'Produits congelés et surgelés',
    },
    {
      type: 'ul',
      items: [
        'Denrées surgelées : -18°C à coeur, sans interruption.',
        "Crèmes glacées et glaces : se référer à l'étiquetage et à l'arrêté du 21 décembre 2009.",
        'Produits congelés : température conforme à celle fixée par la réglementation et le fabricant.',
      ],
    },
    {
      type: 'h3',
      text: 'Produits réfrigérés',
    },
    {
      type: 'p',
      text: "Les denrées réfrigérées (viandes, charcuteries, produits laitiers, plats préparés, produits de la pêche, etc.) relèvent de plages de température distinctes selon leur nature. Ces plages sont définies par l'arrêté du 21 décembre 2009. À titre d'exemple, les viandes hachées et préparations de viande fraîche sont soumises à des températures particulièrement basses. Plutôt que de mémoriser une valeur unique, il faut se reporter au tableau de l'arrêté et respecter l'étiquette du produit.",
    },
    {
      type: 'h3',
      text: 'Liaison chaude et liaison froide',
    },
    {
      type: 'ul',
      items: [
        'Liaison chaude (maintien au chaud avant service) : température à coeur maintenue à +63°C minimum.',
        'Refroidissement rapide (plat cuit destiné à être servi froid ou conservé) : passage de +63°C à +10°C en moins de deux heures.',
        'Liaison froide (conservation après refroidissement) : conservation au froid jusqu\'à la remise en température ou le service.',
        'Remise en température : montée rapide jusqu\'à +63°C avant service.',
      ],
    },
    {
      type: 'callout',
      title: 'Le seuil des deux heures',
      text: "Le refroidissement d'un plat chaud de +63°C à +10°C doit s'effectuer en moins de deux heures. C'est dans cette plage de température, dite zone de danger, que les bactéries se multiplient le plus vite. Un refroidissement lent à température ambiante est l'une des erreurs les plus fréquentes et les plus risquées. Une cellule de refroidissement rapide est l'équipement adapté.",
    },
    {
      type: 'h2',
      id: 'releves',
      text: 'Relevés de température : quoi consigner et à quelle fréquence',
    },
    {
      type: 'p',
      text: "La maîtrise des températures doit être démontrable. Un contrôle ne se contente pas de constater qu'un frigo affiche la bonne valeur : il vérifie que vous suivez et tracez vos températures dans la durée. Les relevés font partie intégrante du plan de maîtrise sanitaire.",
    },
    {
      type: 'ul',
      items: [
        "Réception : contrôle de la température des produits à la livraison, avec refus consigné si écart.",
        "Enceintes froides : relevé régulier des chambres froides, réfrigérateurs et congélateurs (au moins une fois par jour est une pratique courante).",
        "Liaison chaude : contrôle de la température de maintien avant service.",
        "Refroidissement : suivi de la descente en température des plats refroidis.",
        "Conservation des enregistrements : sur une durée permettant de retrouver l'historique en cas de contrôle ou d'incident.",
      ],
    },
    {
      type: 'p',
      text: "Le moyen de mesure compte autant que la mesure : thermomètre étalonné, sonde désinfectée entre deux produits, affichage des enceintes vérifié. Un relevé non daté, non signé ou illisible n'apporte aucune preuve.",
    },
    {
      type: 'h2',
      id: 'erreurs-frequentes',
      text: 'Les erreurs fréquentes qui rompent la chaîne du froid',
    },
    {
      type: 'ul',
      items: [
        'Laisser refroidir un plat chaud à température ambiante au lieu d\'utiliser une cellule de refroidissement rapide.',
        'Surcharger une chambre froide, ce qui empêche l\'air froid de circuler et crée des zones tièdes.',
        'Laisser des produits trop longtemps en zone de préparation, hors froid, pendant le service.',
        'Recongeler un produit décongelé, ce qui est interdit pour la sécurité du consommateur.',
        'Ne pas contrôler la température à la réception et accepter une livraison déjà hors plage.',
        'Stocker des denrées chaudes dans une enceinte froide, ce qui fait remonter la température de l\'ensemble.',
        'Négliger l\'entretien des enceintes : givre, joints abîmés, dégivrage non fait.',
      ],
    },
    {
      type: 'h2',
      id: 'rupture',
      text: 'Que faire en cas de rupture de la chaîne du froid',
    },
    {
      type: 'p',
      text: "Une rupture est constatée quand un produit est resté hors de sa plage de température (panne, porte restée ouverte, livraison non conforme, oubli en zone de préparation). La conduite à tenir doit être anticipée dans le plan de maîtrise sanitaire et appliquée sans improvisation.",
    },
    {
      type: 'ol',
      items: [
        "Identifier les produits concernés et estimer la durée et le niveau d'exposition au-delà de la plage.",
        "Isoler immédiatement les denrées suspectes pour éviter qu'elles soient utilisées ou servies.",
        "Mesurer la température réelle des produits avec un thermomètre étalonné.",
        "Décider du sort des denrées selon des critères définis à l'avance : maintien, consommation rapide ou retrait, en privilégiant toujours la sécurité du consommateur.",
        "Retirer et tracer la destruction des produits jugés dangereux, sans les remettre en circuit.",
        "Identifier la cause (panne, erreur de manipulation, équipement) et engager l'action corrective.",
        "Consigner l'incident par écrit : date, produits, températures, décision, mesure corrective.",
      ],
    },
    {
      type: 'callout',
      title: 'En cas de doute, on retire',
      text: "La règle de prudence prime sur la perte économique. Un produit dont l'exposition au chaud ne peut pas être maîtrisée ni justifiée ne doit pas être servi. La traçabilité de la décision protège l'établissement autant que le consommateur.",
    },
    {
      type: 'h2',
      id: 'controle',
      text: 'Chaîne du froid et contrôle sanitaire',
    },
    {
      type: 'p',
      text: "Lors d'un contrôle, l'inspecteur vérifie à la fois la situation instantanée (températures affichées, état des enceintes, organisation du stockage) et la démonstration de la maîtrise dans le temps (relevés, procédures de refroidissement, gestion des ruptures). Une enceinte conforme le jour du contrôle ne suffit pas si aucun relevé ne prouve que la température est tenue au quotidien.",
    },
    {
      type: 'p',
      text: "Préparer ce volet en amont fait partie de ce que vérifie un audit hygiène. audit hygiène est un label privé indépendant, fondé sur la réglementation en vigueur. L'audit passe en revue les enceintes, les relevés, les procédures de liaison chaude et froide et la gestion des ruptures, puis remet un rapport avec les écarts constatés et un plan correctif priorisé. Cette démarche volontaire aide à anticiper un contrôle officiel, sans s'y substituer ni en garantir le résultat.",
    },
    {
      type: 'quote',
      text: "Une chaîne du froid maîtrisée ne se prouve pas par un thermomètre le jour J, mais par des relevés tenus chaque jour.",
    },
  ],
  faq: [
    {
      q: 'À quelle température conserver les produits surgelés en restauration ?',
      a: "Les denrées surgelées se conservent à -18°C à coeur, sans rupture. Cette valeur est un repère réglementaire largement appliqué, à compléter par les indications du fabricant figurant sur l'emballage.",
    },
    {
      q: 'Quelle température pour le maintien au chaud avant le service ?',
      a: "En liaison chaude, un plat maintenu au chaud avant le service doit conserver une température à coeur d'au moins +63°C. En dessous, le plat entre dans la zone où les bactéries se multiplient.",
    },
    {
      q: 'Combien de temps pour refroidir un plat cuit ?',
      a: "Un plat cuit destiné à être servi froid ou conservé doit passer de +63°C à +10°C en moins de deux heures, idéalement à l'aide d'une cellule de refroidissement rapide. Un refroidissement lent à l'air libre est une erreur fréquente et risquée.",
    },
    {
      q: 'Peut-on recongeler un produit décongelé ?',
      a: "Non. Recongeler une denrée décongelée est interdit, car la décongélation favorise la croissance bactérienne et un nouveau cycle de congélation ne supprime pas ce risque pour le consommateur.",
    },
    {
      q: 'À quelle fréquence faut-il relever les températures des frigos ?',
      a: "La réglementation impose de maîtriser et de tracer les températures, sans toujours fixer une fréquence unique. Un relevé quotidien des enceintes froides, plus un contrôle à la réception et lors des opérations sensibles, est une pratique courante et attendue lors d'un contrôle.",
    },
    {
      q: 'Que faire si une chambre froide tombe en panne ?',
      a: "Isolez les produits concernés, mesurez leur température réelle, décidez de leur sort selon des critères définis à l'avance en privilégiant la sécurité, retirez et tracez la destruction des denrées dangereuses, traitez la cause de la panne et consignez l'incident par écrit.",
    },
    {
      q: 'Où trouver les températures réglementaires précises par type de produit ?',
      a: "Les températures de conservation des produits réfrigérés et congelés sont fixées par l'arrêté du 21 décembre 2009, consultable sur Legifrance. Les règlements (CE) 852/2004 et 853/2004 fixent le cadre européen. L'étiquette du fabricant complète ces valeurs.",
    },
  ],
  sources: [
    {
      label: 'Règlement (CE) n° 852/2004 relatif à l\'hygiène des denrées alimentaires',
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004R0852',
    },
    {
      label: 'Règlement (CE) n° 853/2004 fixant des règles spécifiques d\'hygiène pour les denrées animales',
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004R0853',
    },
    {
      label: 'Arrêté du 21 décembre 2009 relatif aux règles sanitaires applicables aux activités de commerce de détail',
      url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000021583709/',
    },
    {
      label: 'Ministère de l\'Agriculture et de la Souveraineté alimentaire : hygiène alimentaire',
      url: 'https://agriculture.gouv.fr/securite-sanitaire-des-aliments',
    },
  ],
  related: ['tracabilite-dlc-restaurant', 'haccp-restauration-guide', 'nettoyage-desinfection-cuisine'],
};
