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
import { detailCorrectif } from './correctifs-detail';

export interface RapportPhoto {
  url: string;
  legende?: string;
  /** Date et heure du cliche, au format court, lues sur le nom du fichier. */
  prise?: string;
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
  /** Matériel à acheter, noté par l'auditeur pendant la visite. */
  materiel?: string | null;
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
  /** Ce à quoi ressemble le point quand il est tenu. */
  attendu?: string;
  /** Les suites que ce type d'écart appelle, selon sa nature. */
  suites?: string;
  /** Le moyen de correction concret, issu de la grille. */
  correctif: string;
  /** Les gestes à faire, dans l'ordre. */
  etapes: string[];
  /** Ce qu'il faut acheter ou avoir sous la main. */
  materiel: string[];
  /** Ce qui prouvera que le point a été traité. */
  preuve?: string;
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
  cle: 'TRES_SATISFAISANT' | 'SATISFAISANT' | 'A_AMELIORER' | 'A_CORRIGER';
  titre: string;
  couleur: string;
  /** Phrase de lecture du score, sans promesse de résultat à un contrôle officiel. */
  phrase: string;
}

/** Une ligne du récapitulatif du matériel, avec les points qui le réclament. */
export interface MaterielRecap {
  intitule: string;
  points: string[];
  /** Rangs des points du plan qui reclament ce materiel, dans l'ordre du plan. */
  rangs: number[];
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
  /** Tout le matériel des actions, sans doublon, avec les points concernés. */
  materielAPrevoir: MaterielRecap[];
}

/** Ordre de gravité décroissante, pour trier le plan d'action. */
const GRAVITE: Record<string, number> = {
  NC_MAJEURE: 0,
  NC_MINEURE: 1,
  NON_EVALUE: 2,
  NON_APPLICABLE: 3,
  CONFORME: 4,
};

/**
 * Les quatre niveaux repris de la grille de lecture publique des controles
 * officiels (Alim'confiance) : tres satisfaisant, satisfaisant, a ameliorer,
 * a corriger de maniere urgente. On garde les memes mots pour que le client
 * lise son audit dans le meme referentiel que celui qui lui sera applique.
 *
 * ATTENTION : le classement ci-dessous est notre lecture, a valider (rule
 * methodology-guard). L'administration, elle, ne classe pas sur un score mais
 * sur la nature des non-conformites et les suites qu'elles appellent. Et ce
 * rapport reste un audit prive : il ne prejuge d'aucun resultat de controle.
 */
/**
 * Nature d'un point : ce qui decide des suites qu'un ecart appelle. Un defaut de
 * document ne se traite pas comme une denree en danger.
 *
 * À VALIDER (rule methodology-guard). Ces phrases decrivent ce que la
 * reglementation permet a l'administration, jamais ce qu'un agent decidera : le
 * rapport reste un audit prive et ne prejuge d'aucun controle.
 */
type Nature = 'DENREE' | 'DOCUMENT' | 'LOCAL' | 'PERSONNEL';

function natureDuPoint(code: string): Nature {
  const base = code.replace(/-[A-Z0-9]{4}$/, '');
  if (base.startsWith('PMS') || base.startsWith('TRAC') || base === 'NETT-03') return 'DOCUMENT';
  if (base.startsWith('LOC') || base === 'DECH-02') return 'LOCAL';
  if (base.startsWith('PERS')) return 'PERSONNEL';
  return 'DENREE';
}

const SUITES_CRITIQUE: Record<Nature, string> = {
  DENREE:
    'Correction exigée sous délai, retrait ou destruction des denrées en cause, et fermeture administrative, totale ou partielle, si le danger est jugé immédiat.',
  DOCUMENT:
    'Mise en demeure de produire les pièces sous délai, puis amende administrative ou procès-verbal si le manquement persiste. La fermeture n’est pas la suite ordinaire d’un défaut de document.',
  LOCAL:
    'Travaux exigés sous délai, avec contre-visite. La zone concernée peut être interdite d’usage tant qu’elle n’est pas remise en état.',
  PERSONNEL:
    'Mise en conformité sous délai et preuve de la formation ou de l’équipement manquant. L’amende administrative sanctionne la persistance.',
};

const SUITES_MINEURE: Record<Nature, string> = {
  DENREE:
    'Écart noté au rapport de visite, régularisation attendue et vérifiée à la visite suivante, sans acte particulier.',
  DOCUMENT:
    'Écart noté au rapport de visite, mise à jour attendue et contrôlée au prochain passage.',
  LOCAL:
    'Dégradation notée au rapport de visite, remise en état attendue dans un délai raisonnable.',
  PERSONNEL:
    'Écart de pratique noté au rapport de visite, correction attendue et vérifiée à la visite suivante.',
};

/** Les suites qu'un ecart de ce type appelle, selon sa gravite et sa nature. */
export function suitesDuPoint(code: string, critique: boolean): string {
  const nature = natureDuPoint(code);
  return critique ? SUITES_CRITIQUE[nature] : SUITES_MINEURE[nature];
}

export function niveauDe(score: number, ncMajeures: number, ncMineures = 0): NiveauMaitrise {
  if (ncMajeures > 0)
    return {
      cle: 'A_CORRIGER',
      titre: 'À corriger de manière urgente',
      couleur: '#DC2626',
      phrase:
        'Des points mettent les denrées en danger. À traiter avant le prochain service, le reste attendra.',
    };
  if (score < 80)
    return {
      cle: 'A_AMELIORER',
      titre: 'À améliorer',
      couleur: '#F59E0B',
      phrase:
        'Aucun danger immédiat relevé, mais des écarts à reprendre et à vérifier lors de la prochaine visite.',
    };
  if (ncMineures > 0)
    return {
      cle: 'SATISFAISANT',
      titre: 'Satisfaisant',
      couleur: '#10B981',
      phrase:
        'Les points vus sont tenus, à quelques écarts mineurs près. Gardez vos relevés écrits, ce sont eux qui le prouveront.',
    };
  return {
    cle: 'TRES_SATISFAISANT',
    titre: 'Très satisfaisant',
    couleur: '#10B981',
    phrase:
      'Aucun écart relevé sur les points audités. Gardez vos relevés écrits, ce sont eux qui le prouveront dans la durée.',
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
    /* La conséquence détaillée du point prime sur la phrase courte de la grille :
       le client a besoin de comprendre le mécanisme, pas d'un mot-clé. */
    risque: detailCorrectif(i.code)?.consequence ?? i.risque ?? 'Écart relevé sur ce point.',
    attendu: detailCorrectif(i.code)?.attendu,
    suites: suitesDuPoint(i.code, i.conformite === 'NC_MAJEURE'),
    correctif: i.correctif ?? "Corriger l'écart, puis garder une trace écrite ou photo.",
    etapes: detailCorrectif(i.code)?.etapes ?? [],
    /* Ce que l'auditeur a noté sur place passe devant le matériel courant du point,
       et on ne répète pas deux fois la même chose. */
    materiel: (() => {
      const notes = (i.materiel ?? '')
        .split(/[,;]+/)
        .map((x) => x.trim())
        .filter(Boolean);
      const courant = (detailCorrectif(i.code)?.materiel ?? []).filter(
        (m) => !notes.some((n) => n.toLowerCase() === m.toLowerCase())
      );
      return [...notes, ...courant];
    })(),
    preuve: detailCorrectif(i.code)?.preuve,
    constat: i.commentaire?.trim() || null,
    referenceRegl: i.referenceRegl ?? null,
    photos: i.photos,
  });

  const actionsImmediates = items.filter((i) => i.conformite === 'NC_MAJEURE').map(enAction);
  const actionsTrente = items.filter((i) => i.conformite === 'NC_MINEURE').map(enAction);

  const compteGlobal = (c: Conformite) => items.filter((i) => i.conformite === c).length;
  const ncMajeures = compteGlobal('NC_MAJEURE');
  const ncMineuresTotal = compteGlobal('NC_MINEURE');

  return {
    scoreGlobal: notation.scoreGlobal,
    niveau: niveauDe(notation.scoreGlobal, ncMajeures, ncMineuresTotal),
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
    materielAPrevoir: recapMateriel([...actionsImmediates, ...actionsTrente]),
  };
}

/**
 * Rassemble le matériel de toutes les actions en une seule liste. Deux points qui
 * réclament la même sonde ne la font pas acheter deux fois : on la cite une fois,
 * avec les points qui la demandent.
 */
function recapMateriel(actions: ActionCorrective[]): MaterielRecap[] {
  const parIntitule = new Map<string, MaterielRecap>();
  actions.forEach((a, i) => {
    for (const m of a.materiel) {
      const cle = m.toLowerCase();
      const deja = parIntitule.get(cle);
      if (deja) {
        if (!deja.points.includes(a.intitule)) deja.points.push(a.intitule);
        if (!deja.rangs.includes(i + 1)) deja.rangs.push(i + 1);
      } else {
        parIntitule.set(cle, { intitule: m, points: [a.intitule], rangs: [i + 1] });
      }
    }
  });
  /* On suit l'ordre du plan : le client remonte du materiel a la fiche du point
     sans avoir a chercher. */
  return [...parIntitule.values()].sort((x, y) => x.rangs[0] - y.rangs[0]);
}

export const LIBELLE_CONFORMITE: Record<Conformite, string> = {
  CONFORME: 'Conforme',
  NC_MINEURE: 'Non conforme',
  NC_MAJEURE: 'Critique',
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
