/**
 * Multi-marque de l'outil auditeur.
 * Au démarrage d'un audit, l'auditeur choisit la marque. Elle détermine :
 * le logo affiché (header app + rapport PDF), la couleur d'accent, et la grille utilisée.
 *
 * - AUDIT_HYGIENE : audit hygiène & HACCP (label privé). Grille hygiène existante. Vert.
 * - AUDITRESTO360 : audit 360 du restaurant (10 piliers notés sur 100). Orange.
 */

export type Marque = 'AUDIT_HYGIENE' | 'AUDITRESTO360';

export interface MarqueConfig {
  id: Marque;
  nom: string;
  baseline: string;
  /** Logo wordmark sur fond clair (header app, en-tête PDF). */
  logo: string;
  /** Logo sur fond sombre si disponible. */
  logoBlanc?: string;
  /** Couleur d'accent de la marque. */
  accent: string;
  /** Moteur d'audit utilisé. */
  moteur: 'CONFORMITE' | 'PILIERS_100';
}

export const MARQUES: Record<Marque, MarqueConfig> = {
  AUDIT_HYGIENE: {
    id: 'AUDIT_HYGIENE',
    nom: 'audit hygiène',
    baseline: 'Audit hygiène & HACCP',
    logo: '/logo-wordmark.png',
    logoBlanc: '/logo-blanc.png',
    accent: '#10B981',
    moteur: 'CONFORMITE',
  },
  AUDITRESTO360: {
    id: 'AUDITRESTO360',
    nom: 'auditresto360',
    baseline: 'Audit 360 du restaurant',
    logo: '/logo-auditresto360.png',
    accent: '#F97316',
    moteur: 'PILIERS_100',
  },
};

export const MARQUE_DEFAUT: Marque = 'AUDIT_HYGIENE';

export function getMarque(id: string | null | undefined): MarqueConfig {
  if (id && id in MARQUES) return MARQUES[id as Marque];
  return MARQUES[MARQUE_DEFAUT];
}
