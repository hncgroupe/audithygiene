/**
 * Les dossiers de fond, rassemblés.
 *
 * Ils sont écrits par lots, dans des fichiers séparés, parce qu'un seul fichier
 * de plusieurs centaines de kilo-octets se relit mal et se réécrit encore plus
 * mal. Ce module est le seul point d'entrée : le reste du site ne connaît que
 * `DOSSIERS`.
 */

import type { Dossier } from './type';
import { DOSSIERS_A } from './lot-a';
import { DOSSIERS_B } from './lot-b';

export type { Dossier } from './type';

export const DOSSIERS: Dossier[] = [...DOSSIERS_A, ...DOSSIERS_B];

export const dossierParSlug = (slug: string) => DOSSIERS.find((d) => d.slug === slug);
