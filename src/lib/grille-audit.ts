/**
 * Grille d'audit initiale - SQUELETTE À VALIDER (rule methodology-guard).
 * Chaque item DOIT être rattaché à un point réglementaire précis, validé par
 * le client/expert avant usage en production. Les références ci-dessous sont
 * indicatives (TODO) et ne doivent pas être présentées comme officielles.
 * Voir skill haccp-audit-methodology et docs/REFERENCE.md.
 */

export interface GrilleItem {
  code: string;
  intitule: string;
  referenceRegl?: string; // TODO à valider
  ponderation: number;
  photoConseillee?: boolean;
}

export interface GrilleTheme {
  theme: string;
  items: GrilleItem[];
}

export const GRILLE_VERSION = 'v0-draft'; // non validée

export const GRILLE_AUDIT: GrilleTheme[] = [
  {
    theme: 'Chaîne du froid',
    items: [
      { code: 'FROID-01', intitule: 'Températures des enceintes froides positives conformes (relevés)', referenceRegl: 'TODO', ponderation: 3, photoConseillee: true },
      { code: 'FROID-02', intitule: 'Températures des enceintes négatives conformes', referenceRegl: 'TODO', ponderation: 3 },
      { code: 'FROID-03', intitule: 'Relevés de température tenus et archivés', referenceRegl: 'TODO', ponderation: 2 },
    ],
  },
  {
    theme: 'Températures & cuisson',
    items: [
      { code: 'TEMP-01', intitule: 'Barèmes de cuisson respectés', referenceRegl: 'TODO', ponderation: 2 },
      { code: 'TEMP-02', intitule: 'Refroidissement rapide maîtrisé', referenceRegl: 'TODO', ponderation: 3 },
      { code: 'TEMP-03', intitule: 'Remise en température maîtrisée', referenceRegl: 'TODO', ponderation: 2 },
    ],
  },
  {
    theme: 'Traçabilité & DLC',
    items: [
      { code: 'TRAC-01', intitule: 'Étiquetage et DLC/DLUO respectés', referenceRegl: 'TODO', ponderation: 3, photoConseillee: true },
      { code: 'TRAC-02', intitule: 'Conservation des étiquettes / n° de lot', referenceRegl: 'TODO', ponderation: 2 },
    ],
  },
  {
    theme: 'Hygiène du personnel',
    items: [
      { code: 'PERS-01', intitule: 'Tenue de travail propre et adaptée', referenceRegl: 'TODO', ponderation: 2 },
      { code: 'PERS-02', intitule: 'Lavage des mains : équipement et pratique', referenceRegl: 'TODO', ponderation: 3 },
      { code: 'PERS-03', intitule: 'Formation hygiène du personnel', referenceRegl: 'TODO', ponderation: 2 },
    ],
  },
  {
    theme: 'Nettoyage & désinfection',
    items: [
      { code: 'NETT-01', intitule: 'Plan de nettoyage présent et appliqué', referenceRegl: 'TODO', ponderation: 2 },
      { code: 'NETT-02', intitule: 'Produits adaptés et correctement stockés', referenceRegl: 'TODO', ponderation: 2 },
      { code: 'NETT-03', intitule: 'Preuves de réalisation (enregistrements)', referenceRegl: 'TODO', ponderation: 1 },
    ],
  },
  {
    theme: 'Lutte contre les nuisibles',
    items: [
      { code: 'NUIS-01', intitule: 'Plan de lutte / contrat de dératisation', referenceRegl: 'TODO', ponderation: 2, photoConseillee: true },
      { code: 'NUIS-02', intitule: 'Absence de traces de nuisibles', referenceRegl: 'TODO', ponderation: 3 },
    ],
  },
  {
    theme: 'Stockage & marche en avant',
    items: [
      { code: 'STOCK-01', intitule: 'Séparation cru/cuit respectée', referenceRegl: 'TODO', ponderation: 3 },
      { code: 'STOCK-02', intitule: 'Organisation des stocks (rotation, sol)', referenceRegl: 'TODO', ponderation: 2 },
    ],
  },
  {
    theme: 'Locaux & équipements',
    items: [
      { code: 'LOC-01', intitule: 'État et entretien des locaux', referenceRegl: 'TODO', ponderation: 2 },
      { code: 'LOC-02', intitule: 'Matériaux et équipements conformes', referenceRegl: 'TODO', ponderation: 2 },
    ],
  },
  {
    theme: 'Gestion des déchets',
    items: [
      { code: 'DECH-01', intitule: 'Tri et évacuation des déchets', referenceRegl: 'TODO', ponderation: 1 },
      { code: 'DECH-02', intitule: 'Local poubelles entretenu', referenceRegl: 'TODO', ponderation: 1 },
    ],
  },
  {
    theme: 'Plan de Maîtrise Sanitaire (PMS)',
    items: [
      { code: 'PMS-01', intitule: 'PMS documenté et à jour', referenceRegl: 'TODO', ponderation: 3 },
      { code: 'PMS-02', intitule: 'Autocontrôles réalisés et tracés', referenceRegl: 'TODO', ponderation: 2 },
    ],
  },
  {
    theme: 'Allergènes',
    items: [
      { code: 'ALL-01', intitule: 'Information allergènes consommateur', referenceRegl: 'TODO', ponderation: 2 },
      { code: 'ALL-02', intitule: 'Prévention contamination croisée', referenceRegl: 'TODO', ponderation: 2 },
    ],
  },
  {
    theme: 'Eau & glace',
    items: [
      { code: 'EAU-01', intitule: 'Potabilité de l’eau / entretien machine à glaçons', referenceRegl: 'TODO', ponderation: 1 },
    ],
  },
];

/** Liste plate de tous les items (utile pour instancier un audit). */
export function flattenGrille(): Array<GrilleItem & { theme: string }> {
  return GRILLE_AUDIT.flatMap((t) => t.items.map((i) => ({ ...i, theme: t.theme })));
}
