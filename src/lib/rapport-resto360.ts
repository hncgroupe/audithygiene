/**
 * Calcul du rapport auditresto360 à partir des critères notés (1 à 5).
 * Produit : score global, étoiles, radar par pilier, top urgences, quick wins,
 * plan d'action priorisé (Urgence / Important / Confort), réponses du dirigeant.
 */
import {
  GRILLE_RESTO360,
  critereId,
  critereLabel,
  scorePilier,
  scoreGlobalResto,
  type NoteResto,
  type PilierResto,
} from './grille-resto360';

export interface ItemNote {
  code: string;
  theme: string; // pilier
  groupe: string | null;
  intitule: string;
  note: number | null; // 1 à 5
  commentaire: string | null;
}

export interface LigneRapport {
  pilier: string;
  groupe: string | null;
  intitule: string;
  note: number;
  commentaire: string | null;
}

export interface RadarPoint {
  pilier: string;
  radar: string; // libellé court
  score: number; // /100
}

export interface RapportResto360 {
  scoreGlobal: number | null;
  etoiles: number; // 0 à 5 (pas de 0.5)
  radar: RadarPoint[];
  urgences: LigneRapport[]; // notes 1 et 2
  quickWins: LigneRapport[]; // note 3 (à améliorer)
  plan: { urgence: LigneRapport[]; important: LigneRapport[]; confort: LigneRapport[] };
  dirigeant: { question: string; reponse: string | null }[];
  nbCriteresNotes: number;
  nbCriteresTotal: number;
}

function notesMap(items: ItemNote[]): Record<string, NoteResto | undefined> {
  const m: Record<string, NoteResto | undefined> = {};
  for (const it of items) {
    if (typeof it.note === 'number' && it.note >= 1 && it.note <= 5) {
      m[it.code] = it.note as NoteResto;
    }
  }
  return m;
}

function lignes(items: ItemNote[], predicate: (n: number) => boolean): LigneRapport[] {
  return items
    .filter((i) => typeof i.note === 'number' && predicate(i.note))
    .sort((a, b) => (a.note ?? 5) - (b.note ?? 5))
    .map((i) => ({
      pilier: i.theme,
      groupe: i.groupe,
      intitule: i.intitule,
      note: i.note as number,
      commentaire: i.commentaire,
    }));
}

export interface CritereDetail {
  intitule: string;
  note: number | null;
  commentaire: string | null;
}
export interface PilierDetail {
  code: string;
  numero: number;
  nom: string;
  radar: string;
  score: number | null;
  groupes: { nom: string; criteres: CritereDetail[] }[];
  risques: CritereDetail[]; // notes 1 et 2
  forts: CritereDetail[]; // notes 4 et 5
}

/** Détail structuré par pilier (pour le rapport document : analyse thématique). */
export function detailPiliers(items: ItemNote[]): PilierDetail[] {
  const byCode = new Map(items.map((i) => [i.code, i]));
  const notes = notesMap(items);
  return GRILLE_RESTO360.filter((p) => p.noteAuRadar).map((p) => {
    const groupes = p.groupes.map((g, gi) => ({
      nom: g.nom,
      criteres: g.criteres.map((crit, ci) => {
        const it = byCode.get(critereId(p.code, gi, ci));
        return {
          intitule: critereLabel(crit),
          note: it?.note ?? null,
          commentaire: it?.commentaire ?? null,
        };
      }),
    }));
    const tous = groupes.flatMap((g) => g.criteres);
    return {
      code: p.code,
      numero: p.numero,
      nom: p.nom,
      radar: p.radar,
      score: scorePilier(notes, p),
      groupes,
      risques: tous.filter((c) => typeof c.note === 'number' && c.note <= 2),
      forts: tous.filter((c) => typeof c.note === 'number' && c.note >= 4),
    };
  });
}

export function calculerRapportResto360(items: ItemNote[]): RapportResto360 {
  const notes = notesMap(items);
  const scoreGlobal = scoreGlobalResto(notes);

  const radar: RadarPoint[] = GRILLE_RESTO360.filter((p) => p.noteAuRadar)
    .map((p: PilierResto) => {
      const s = scorePilier(notes, p);
      return s === null ? null : { pilier: p.nom, radar: p.radar, score: s };
    })
    .filter((r): r is RadarPoint => r !== null);

  const notables = items.filter((i) => i.groupe !== 'Questions ouvertes');
  const urgences = lignes(notables, (n) => n <= 2).slice(0, 10);
  const quickWins = lignes(notables, (n) => n === 3).slice(0, 10);

  const plan = {
    urgence: lignes(notables, (n) => n === 1),
    important: lignes(notables, (n) => n === 2),
    confort: lignes(notables, (n) => n === 3),
  };

  // Réponses du dirigeant (pilier à questions ouvertes)
  const dirigeant = items
    .filter((i) => i.groupe === 'Questions ouvertes')
    .map((i) => ({ question: i.intitule, reponse: i.commentaire }));

  return {
    scoreGlobal,
    etoiles: scoreGlobal === null ? 0 : Math.max(0, Math.min(5, Math.round(scoreGlobal / 20))),
    radar,
    urgences,
    quickWins,
    plan,
    dirigeant,
    nbCriteresNotes: notables.filter((i) => typeof i.note === 'number').length,
    nbCriteresTotal: notables.length,
  };
}
