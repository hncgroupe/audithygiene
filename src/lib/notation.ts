/**
 * Logique de notation de l'audit (rule methodology-guard : transparente et reproductible).
 * - Score par thème = (points obtenus / points possibles) * 100, sur les items évalués.
 * - Score global = moyenne pondérée des items évalués, /100.
 * - Cas critique = tout item en NC_MAJEURE. Non compensable : listé à part.
 */

export type Conformite = 'CONFORME' | 'NC_MINEURE' | 'NC_MAJEURE' | 'NON_APPLICABLE' | 'NON_EVALUE';

export interface ItemEvalue {
  theme: string;
  ponderation: number;
  conformite: Conformite;
}

/** Valeur de conformité (0 à 1) utilisée pour le score. */
function valeurConformite(c: Conformite): number | null {
  switch (c) {
    case 'CONFORME':
      return 1;
    case 'NC_MINEURE':
      return 0.5;
    case 'NC_MAJEURE':
      return 0;
    case 'NON_APPLICABLE':
    case 'NON_EVALUE':
      return null; // exclu du calcul
  }
}

export interface ResultatNotation {
  scoreGlobal: number; // /100
  scoresParTheme: Record<string, number>; // /100
  nbCasCritiques: number;
}

export function calculerNotation(items: ItemEvalue[]): ResultatNotation {
  const parTheme: Record<string, { obtenu: number; possible: number }> = {};
  let globalObtenu = 0;
  let globalPossible = 0;
  let nbCasCritiques = 0;

  for (const item of items) {
    if (item.conformite === 'NC_MAJEURE') nbCasCritiques++;
    const v = valeurConformite(item.conformite);
    if (v === null) continue; // exclu (NA / non évalué)

    const obtenu = v * item.ponderation;
    const possible = item.ponderation;

    globalObtenu += obtenu;
    globalPossible += possible;

    parTheme[item.theme] ??= { obtenu: 0, possible: 0 };
    parTheme[item.theme].obtenu += obtenu;
    parTheme[item.theme].possible += possible;
  }

  const scoresParTheme: Record<string, number> = {};
  for (const [theme, { obtenu, possible }] of Object.entries(parTheme)) {
    scoresParTheme[theme] = possible > 0 ? round1((obtenu / possible) * 100) : 0;
  }

  return {
    scoreGlobal: globalPossible > 0 ? round1((globalObtenu / globalPossible) * 100) : 0,
    scoresParTheme,
    nbCasCritiques,
  };
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
