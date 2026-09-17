/**
 * Assemblage du rapport d'audit hygiène (marque AUDIT_HYGIENE).
 *
 * Deux usages côté restaurateur : préparer un contrôle officiel, ou montrer après
 * coup une démarche datée et tracée, photos à l'appui.
 *
 * Rien n'est inventé ici. Tout vient des points saisis pendant l'audit et de la
 * grille, qui porte le risque et le moyen de correction de chaque constat.
 * Cadre juridique : label privé, jamais une certification d'État.
 */

import { calculerNotation, type Conformite } from './notation';
import { grilleByCode, CONSTATS_GENERIQUES } from './grille-audit';

export interface RapportPhoto {
  url: string;
  legende?: string;
}

/** Item d'audit tel qu'il sort de la base. */
export interface RapportItemEntree {
  code: string;
  theme: string;
  intitule: string;
  referenceRegl?: string | null;
  conformite: Conformite;
  ponderation: number;
  commentaire?: string | null;
  photos: RapportPhoto[];
}

export type Priorite = 'IMMEDIAT' | 'SOUS_30_JOURS';

export interface ActionCorrective {
  code: string;
  theme: string;
  intitule: string;
  priorite: Priorite;
  delai: string;
  /** Pourquoi c'est un problème (risque sanitaire), issu de la grille. */
  risque: string;
  /** Le moyen de correction concret, issu de la grille. */
  correctif: string;
  /** Ce que l'auditeur a observé sur place. */
  constat: string | null;
  referenceRegl?: string | null;
  photos: RapportPhoto[];
}

export interface RapportItem extends RapportItemEntree {
  risque?: string;
  correctif?: string;
}

export interface RapportTheme {
  theme: string;
  score: number | null; // null = aucun point évalué sur ce thème
  conformes: number;
  ncMineures: number;
  ncMajeures: number;
  nonEvalues: number;
  items: RapportItem[];
}

export interface NiveauMaitrise {
  cle: 'MAITRISE' | 'A_CONSOLIDER' | 'A_REDRESSER';
  titre: string;
  couleur: string;
  /** Phrase de lecture du score, sans promesse de résultat à un contrôle officiel. */
  phrase: string;
}

export interface RapportHygiene {
  scoreGlobal: number;
  niveau: NiveauMaitrise;
  totalPoints: number;
  evalues: number;
  conformes: number;
  ncMineures: number;
  ncMajeures: number;
  nonApplicables: number;
  nonEvalues: number;
  nbPhotos: number;
  themes: RapportTheme[];
  actions: ActionCorrective[];
  actionsImmediates: ActionCorrective[];
  actionsTrente: ActionCorrective[];
  pointsForts: RapportItem[];
}

/** Ordre de gravité décroissante, pour trier le plan d'action. */
const GRAVITE: Record<string, number> = {
  NC_MAJEURE: 0,
  NC_MINEURE: 1,
  NON_EVALUE: 2,
  NON_APPLICABLE: 3,
  CONFORME: 4,
};

export function niveauDe(score: number, ncMajeures: number): NiveauMaitrise {
  if (ncMajeures > 0)
    return {
      cle: 'A_REDRESSER',
      titre: 'À redresser',
      couleur: '#DC2626',
      phrase: 'Un ou plusieurs points critiques ont été relevés. Ils passent avant le reste.',
    };
  if (score >= 80)
    return {
      cle: 'MAITRISE',
      titre: 'Maîtrisé',
      couleur: '#10B981',
      phrase: 'Les points audités sont tenus. Il reste à conserver les traces écrites.',
    };
  return {
    cle: 'A_CONSOLIDER',
    titre: 'À consolider',
    couleur: '#F59E0B',
    phrase: 'Aucun point critique. Des écarts mineurs restent à corriger.',
  };
}

/** Retrouve le couple risque / moyen de correction de la grille pour ce constat. */
function grilleCorrectif(code: string, conformite: Conformite, grille: ReturnType<typeof grilleByCode>) {
  const base = code.replace(/-[A-Z0-9]{4}$/, '');
  const g = grille.get(code) ?? grille.get(base);
  const c =
    g?.constats.find((x) => x.conformite === conformite) ??
    CONSTATS_GENERIQUES.find((x) => x.conformite === conformite);
  return { risque: c?.pourquoi, correctif: c?.correctif, reference: g?.referenceRegl };
}

export function assemblerRapportHygiene(entrees: RapportItemEntree[]): RapportHygiene {
  const notation = calculerNotation(
    entrees.map((i) => ({ theme: i.theme, ponderation: i.ponderation, conformite: i.conformite }))
  );

  const grille = grilleByCode();
  const items: RapportItem[] = entrees.map((i) => {
    const { risque, correctif, reference } = grilleCorrectif(i.code, i.conformite, grille);
    return { ...i, risque, correctif, referenceRegl: i.referenceRegl ?? reference ?? null };
  });

  // Regroupement par thème, dans l'ordre d'apparition des points.
  const ordre: string[] = [];
  const parTheme = new Map<string, RapportItem[]>();
  for (const it of items) {
    if (!parTheme.has(it.theme)) {
      parTheme.set(it.theme, []);
      ordre.push(it.theme);
    }
    parTheme.get(it.theme)!.push(it);
  }

  const themes: RapportTheme[] = ordre.map((theme) => {
    const list = parTheme.get(theme)!;
    const compte = (c: Conformite) => list.filter((i) => i.conformite === c).length;
    const evalues = list.filter(
      (i) => i.conformite !== 'NON_EVALUE' && i.conformite !== 'NON_APPLICABLE'
    ).length;
    return {
      theme,
      score: evalues > 0 ? (notation.scoresParTheme[theme] ?? 0) : null,
      conformes: compte('CONFORME'),
      ncMineures: compte('NC_MINEURE'),
      ncMajeures: compte('NC_MAJEURE'),
      nonEvalues: compte('NON_EVALUE'),
      items: list.slice().sort((a, b) => GRAVITE[a.conformite] - GRAVITE[b.conformite]),
    };
  });

  const enAction = (i: RapportItem): ActionCorrective => ({
    code: i.code,
    theme: i.theme,
    intitule: i.intitule,
    priorite: i.conformite === 'NC_MAJEURE' ? 'IMMEDIAT' : 'SOUS_30_JOURS',
    delai: i.conformite === 'NC_MAJEURE' ? 'Sous 48 heures' : 'Sous 30 jours',
    risque: i.risque ?? 'Écart relevé sur ce point.',
    correctif: i.correctif ?? "Corriger l'écart, puis garder une trace écrite ou photo.",
    constat: i.commentaire?.trim() || null,
    referenceRegl: i.referenceRegl ?? null,
    photos: i.photos,
  });

  const actionsImmediates = items.filter((i) => i.conformite === 'NC_MAJEURE').map(enAction);
  const actionsTrente = items.filter((i) => i.conformite === 'NC_MINEURE').map(enAction);

  const compteGlobal = (c: Conformite) => items.filter((i) => i.conformite === c).length;
  const ncMajeures = compteGlobal('NC_MAJEURE');

  return {
    scoreGlobal: notation.scoreGlobal,
    niveau: niveauDe(notation.scoreGlobal, ncMajeures),
    totalPoints: items.length,
    evalues: items.filter(
      (i) => i.conformite !== 'NON_EVALUE' && i.conformite !== 'NON_APPLICABLE'
    ).length,
    conformes: compteGlobal('CONFORME'),
    ncMineures: compteGlobal('NC_MINEURE'),
    ncMajeures,
    nonApplicables: compteGlobal('NON_APPLICABLE'),
    nonEvalues: compteGlobal('NON_EVALUE'),
    nbPhotos: items.reduce((n, i) => n + i.photos.length, 0),
    themes,
    actions: [...actionsImmediates, ...actionsTrente],
    actionsImmediates,
    actionsTrente,
    pointsForts: items.filter((i) => i.conformite === 'CONFORME'),
  };
}

export const LIBELLE_CONFORMITE: Record<Conformite, string> = {
  CONFORME: 'Conforme',
  NC_MINEURE: 'Non-conformité mineure',
  NC_MAJEURE: 'Non-conformité majeure',
  NON_APPLICABLE: 'Non applicable',
  NON_EVALUE: 'Non évalué',
};

export const COULEUR_CONFORMITE: Record<Conformite, string> = {
  CONFORME: '#10B981',
  NC_MINEURE: '#F59E0B',
  NC_MAJEURE: '#DC2626',
  NON_APPLICABLE: '#6B7D77',
  NON_EVALUE: '#9AA8A3',
};

/** Libellés lisibles des types d'établissement (enum Prisma EstablishmentType). */
export const LIBELLE_TYPE_ETABLISSEMENT: Record<string, string> = {
  RESTAURANT: 'Restaurant',
  RESTAURATION_RAPIDE: 'Restauration rapide',
  DARK_KITCHEN: 'Dark kitchen',
  BOULANGERIE: 'Boulangerie',
  TRAITEUR: 'Traiteur',
  HOTEL_RESTAURANT: 'Hôtel-restaurant',
  BAR: 'Bar, café',
  AUTRE: 'Métier de bouche',
};
