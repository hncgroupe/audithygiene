/** Contenus partagés du site (FAQ, déroulé) - réutilisés pour l'UI et le schema.org. */

export const FAQ_ITEMS: { q: string; a: string }[] = [
  // Comprendre l'audit
  {
    q: "Qu'est-ce qu'un audit hygiène ?",
    a: "Un audit hygiène est un contrôle complet de votre établissement, réalisé sur place par un auditeur, sur la base de la réglementation hygiène et des principes HACCP. Il aboutit à un rapport : notation, non-conformités (dont les cas critiques) et plan d'action correctif.",
  },
  {
    q: "À quoi sert concrètement un audit hygiène ?",
    a: "Il vous donne une photographie objective de votre conformité avant qu'une inspection ne le fasse. Vous savez où vous en êtes, ce qui doit être corrigé en priorité, et comment vous y prendre. C'est un outil de préparation et de mise en conformité, pas une sanction.",
  },
  {
    q: "Combien de temps dure un audit sur place ?",
    a: "Environ 2 heures pour un établissement standard, davantage pour un grand établissement. L'audit se déroule en conditions réelles, sans interrompre votre service.",
  },
  {
    q: "Que contrôle exactement l'auditeur ?",
    a: "L'ensemble des thèmes de la réglementation : chaîne du froid, cuisson et températures, refroidissement, traçabilité et DLC, hygiène du personnel, nettoyage et désinfection, lutte contre les nuisibles, stockage et marche en avant, locaux et équipements, gestion des déchets, Plan de Maîtrise Sanitaire, allergènes, eau et glace.",
  },
  {
    q: "L'audit va-t-il perturber mon service ?",
    a: "Non. L'auditeur observe en conditions réelles et s'adapte à votre activité. L'objectif est de voir l'établissement tel qu'il fonctionne vraiment, sans le bloquer.",
  },
  {
    q: "Dois-je être présent pendant l'audit ?",
    a: "Votre présence ou celle d'un responsable est utile pour accéder aux documents et échanger, mais l'auditeur peut intervenir même sans présence permanente du gérant. On s'adapte à votre organisation.",
  },
  {
    q: "Un passage inopiné est-il possible ?",
    a: "Oui, sur demande. Un passage non annoncé reflète davantage les conditions réelles d'un contrôle officiel. À défaut, on convient d'un créneau ensemble.",
  },

  // Le rapport
  {
    q: "Que contient le rapport remis ?",
    a: "Une notation globale et par thème, les cas critiques signalés distinctement, chaque non-conformité décrite et photographiée, un plan d'action (action corrective, priorité, délai conseillé) et la date du prochain audit recommandé. Le tout en PDF, partageable avec votre équipe.",
  },
  {
    q: "Sous combien de temps je reçois le rapport ?",
    a: "Le rapport vous est transmis rapidement après la visite, par email. Le délai précis est confirmé lors de la prise de rendez-vous.",
  },
  {
    q: "Qu'est-ce qu'un cas critique ?",
    a: "Une non-conformité à impact sanitaire direct (par exemple une rupture de la chaîne du froid ou des produits périmés en service). Les cas critiques sont isolés et mis en avant, jamais noyés dans la note globale.",
  },
  {
    q: "Qu'est-ce que le plan d'action correctif ?",
    a: "Pour chaque écart constaté, nous indiquons l'action concrète à mener, sa priorité (haute, moyenne, basse) et un délai conseillé. Vous repartez avec une feuille de route claire, du plus urgent au moins urgent.",
  },
  {
    q: "Les écarts mineurs et majeurs sont-ils distingués ?",
    a: "Oui. Le rapport distingue clairement les écarts mineurs (à améliorer) des non-conformités majeures (cas critiques, à traiter en priorité).",
  },

  // Prix et formules
  {
    q: "Combien coûte un audit ?",
    a: "À partir de 690 € pour l'Audit Essentiel et 990 € pour l'Audit Complet (tarifs indicatifs, précisés selon la taille de l'établissement). Le devis est gratuit et sans engagement.",
  },
  {
    q: "Quelle est la différence entre Essentiel et Complet ?",
    a: "L'Essentiel (20 points de contrôle) est un diagnostic rapide des points clés. Le Complet (50 points, grille HACCP complète) couvre tous les thèmes avec un plan d'action détaillé et chaque non-conformité photographiée. Nous recommandons le Complet pour une vraie mise en conformité.",
  },
  {
    q: "Y a-t-il un engagement ?",
    a: "Aucun. Le devis est gratuit et sans engagement. Vous réservez quand vous êtes prêt.",
  },

  // Logistique
  {
    q: "Intervenez-vous partout en France ?",
    a: "Oui, nous intervenons partout en France. Indiquez votre adresse lors de la demande, nous organisons la visite d'un auditeur.",
  },
  {
    q: "Proposez-vous des interventions en urgence ?",
    a: "Oui. Pour un contrôle imminent, une ouverture proche ou une suite de contrôle, nous proposons un rendez-vous express sous 48 h (supplément urgence appliqué).",
  },
  {
    q: "Comment réserver un audit ?",
    a: "Configurez votre audit en quelques clics sur le site, laissez vos coordonnées, et un auditeur vous recontacte pour convenir d'un créneau.",
  },
  {
    q: "À quelle fréquence faut-il faire un audit ?",
    a: "Cela dépend de votre activité et de vos résultats. Le rapport indique une date de prochain audit recommandé pour maintenir votre conformité dans le temps.",
  },

  // Cas de figure
  {
    q: "Je viens d'avoir un contrôle avec des remarques, que faire ?",
    a: "Nous intervenons en priorité (express possible sous 48 h). L'auditeur identifie chaque écart et vous remet un plan d'action concret pour vous remettre en conformité rapidement et reprendre sereinement.",
  },
  {
    q: "J'ouvre bientôt mon établissement, pouvez-vous m'aider ?",
    a: "Oui. Un audit avant ouverture vous permet de partir conforme : on vérifie l'ensemble des points et on corrige avant l'accueil des premiers clients et avant tout contrôle.",
  },
  {
    q: "Je gère déjà bien, mais je veux m'améliorer. C'est pertinent ?",
    a: "Tout à fait. Un regard externe et objectif révèle les angles morts, sécurise vos pratiques et vous donne une longueur d'avance. Même un établissement bien tenu y gagne.",
  },
  {
    q: "Je reprends un établissement existant, que vérifiez-vous ?",
    a: "Un audit de reprise fait le point complet sur l'état réel de l'établissement : conformité, documents en place, pratiques. Vous savez exactement ce dont vous héritez et ce qu'il faut corriger.",
  },

  // Méthode et expertise
  {
    q: "Sur quelle réglementation vous basez-vous ?",
    a: "Sur le Paquet hygiène européen (notamment le règlement CE 852/2004), les principes HACCP du Codex Alimentarius, votre Plan de Maîtrise Sanitaire et, pour les allergènes, le règlement INCO 1169/2011.",
  },
  {
    q: "Qu'est-ce que le HACCP ?",
    a: "Le HACCP (Hazard Analysis Critical Control Point) est une méthode d'analyse des dangers et de maîtrise des points critiques. C'est le socle de la sécurité sanitaire en restauration : identifier les risques, les maîtriser, le prouver.",
  },
  {
    q: "Qu'est-ce que le Plan de Maîtrise Sanitaire (PMS) ?",
    a: "Le PMS est le document qui regroupe vos bonnes pratiques d'hygiène, votre démarche HACCP, votre traçabilité et la gestion des non-conformités. C'est lui que l'on vous demande en contrôle. L'audit vérifie qu'il existe, qu'il est complet et appliqué.",
  },
  {
    q: "Qui réalise l'audit ?",
    a: "Un auditeur formé à la réglementation hygiène et à la méthode HACCP, qui sait observer sans déranger votre activité et traduire les constats en actions concrètes.",
  },
  {
    q: "Dois-je préparer des documents avant la visite ?",
    a: "Idéalement, ayez à disposition votre PMS, vos relevés de température, votre plan de nettoyage, vos justificatifs de formation et votre contrat de lutte contre les nuisibles. Si certains manquent, ce n'est pas bloquant : l'audit le notera comme point à corriger.",
  },

  // Cadre, confiance, confidentialité
  {
    q: "audit hygiène est-il une certification officielle ?",
    a: "Non. audit hygiène est un label privé de qualité, indépendant. Il ne constitue ni une certification officielle, ni un agrément d'État, ni un contrôle des services vétérinaires ou de la DDPP.",
  },
  {
    q: "Garantissez-vous la réussite à un contrôle officiel ?",
    a: "Non, aucune garantie de résultat à un contrôle officiel ne peut être promise. Notre audit vous aide à anticiper et à corriger les écarts, mais la décision relève des autorités compétentes.",
  },
  {
    q: "Êtes-vous certifiés ?",
    a: "Nous sommes certifiés Qualiopi au titre de la catégorie « actions de formation ». L'audit hygiène, lui, est un label privé indépendant : c'est une démarche volontaire de mise en conformité, distincte d'un contrôle officiel.",
  },
  {
    q: "Mes données et mon rapport restent-ils confidentiels ?",
    a: "Oui. Votre rapport et vos données ne sont partagés qu'avec vous. Ils sont traités conformément au RGPD et stockés de façon sécurisée.",
  },
  {
    q: "Que puis-je faire après l'audit ?",
    a: "Vous appliquez le plan d'action, à votre rythme et selon les priorités indiquées. Une contre-visite peut être organisée pour valider les corrections, et un suivi régulier permet de rester conforme dans la durée.",
  },
];

export const DEROULE_ETAPES = [
  {
    titre: 'Prise de rendez-vous',
    texte: "Vous décrivez votre établissement et votre besoin. On convient d'un créneau de visite.",
  },
  {
    titre: 'Audit sur place, environ 2h',
    texte: "En conditions réelles, sans interrompre votre service. L'auditeur contrôle chaque thème : froid, cuisson, traçabilité, hygiène, nettoyage, nuisibles, PMS, allergènes.",
  },
  {
    titre: 'Notation & cas critiques',
    texte: 'Chaque point est évalué. Les non-conformités majeures (cas critiques) sont identifiées clairement.',
  },
  {
    titre: 'Rapport & plan correctif',
    texte: 'Vous recevez un rapport PDF complet avec un plan d’action priorisé et la date du prochain audit recommandé.',
  },
];
