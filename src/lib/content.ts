/** Contenus partagés du site (FAQ, déroulé) - réutilisés pour l'UI et le schema.org. */

export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Qu'est-ce qu'un audit hygiène ?",
    a: "Un audit hygiène est un contrôle complet de votre établissement réalisé sur place par un auditeur, sur la base de la réglementation hygiène et des principes HACCP. Il aboutit à un rapport : notation, non-conformités (dont les cas critiques) et plan correctif.",
  },
  {
    q: "audit hygiène est-il une certification officielle ?",
    a: "Non. audit hygiène est un label privé de qualité, indépendant. Il ne constitue ni une certification officielle, ni un agrément d'État, ni un contrôle des services vétérinaires ou de la DDPP. Notre rôle est de vous aider à évaluer et améliorer votre conformité.",
  },
  {
    q: "Dans quelles zones intervenez-vous ?",
    a: "Nous intervenons dans toute l'Île-de-France : Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Seine-et-Marne (77), Yvelines (78), Essonne (91) et Val-d'Oise (95).",
  },
  {
    q: "Combien de temps dure un audit ?",
    a: "La durée dépend de la taille de l'établissement et de la formule choisie. Le détail est précisé lors de la prise de rendez-vous.",
  },
  {
    q: "Que contient le rapport ?",
    a: "Le rapport reprend la notation globale et par thème, les cas critiques signalés distinctement, les non-conformités, un plan correctif (action, priorité, délai conseillé) et la date du prochain audit recommandé.",
  },
  {
    q: "Garantissez-vous la réussite à un contrôle sanitaire ?",
    a: "Non, aucune garantie de résultat à un contrôle officiel ne peut être promise. Notre audit vous aide à anticiper et à corriger les écarts, mais la décision d'un contrôle officiel relève des autorités compétentes.",
  },
];

export const DEROULE_ETAPES = [
  {
    titre: 'Prise de rendez-vous',
    texte: "Vous décrivez votre établissement et votre besoin. On convient d'un créneau de visite.",
  },
  {
    titre: 'Audit sur place',
    texte: "Un auditeur contrôle l'ensemble des thèmes : chaîne du froid, traçabilité, hygiène, nettoyage, nuisibles, PMS…",
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
