/**
 * Calcul du rapport auditresto360 à partir des critères notés (1 à 5).
 * Produit : score global, étoiles, radar par pilier, top urgences, quick wins,
 * plan d'action priorisé (Urgence / Important / Confort), réponses du dirigeant.
 */
import {
  GRILLE_RESTO360,
  critereId,
  critereLabel,
  critereAide,
  critereInfo,
  CRITIQUE_IDS,
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
  photos?: string[]; // URLs (signées) des photos du critère
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
  casCritiques: LigneRapport[]; // critères critiques (sanitaires) notés 1 ou 2
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
  photos: string[];
  /** Description « version client » de ce qui est évalué sur ce point (repère grille). */
  description: string | null;
  /** Base réglementaire du critère (points sanitaires/critiques), si renseignée. */
  regle: string | null;
  /** Ce qui rend le point conforme (repère grille, langage clair), si renseigné. */
  conforme: string | null;
  /** Ce qui rend le point non conforme (repère grille), si renseigné. */
  nonConforme: string | null;
  /** true si critère sanitaire/réglementaire (compte double). */
  critique: boolean;
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
        const id = critereId(p.code, gi, ci);
        const it = byCode.get(id);
        const info = critereInfo(crit);
        return {
          intitule: critereLabel(crit),
          note: it?.note ?? null,
          commentaire: it?.commentaire ?? null,
          photos: it?.photos ?? [],
          description: critereAide(crit) || null,
          regle: info?.regle ?? null,
          conforme: info?.conforme ?? null,
          nonConforme: info?.nonConforme ?? null,
          critique: CRITIQUE_IDS.has(id),
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

/** Libellé de maturité à partir du score global. */
export function maturiteResto(score: number): string {
  if (score >= 85) return 'Maîtrisé';
  if (score >= 70) return 'Satisfaisant';
  if (score >= 50) return 'À consolider';
  return 'Sous surveillance';
}

const DELAI_RESTO: Record<string, string> = {
  Urgence: 'sous 7 jours',
  Important: 'sous 30 jours',
  Confort: 'sous 90 jours',
};

/**
 * Assemble les données du PDF auditresto360 (récap première page).
 * Type de retour aligné sur Resto360ReportData (import type only).
 */
export function assembleResto360Report(args: {
  etablissement: string;
  ville?: string | null;
  type?: string | null;
  date: string;
  ref: string;
  items: ItemNote[];
  photos: { intitule: string; url: string }[];
  restitution?: {
    synthese: string;
    pointsForts: string[];
    axes: string[];
    roadmap: { j30: string[]; j60: string[]; j90: string[] };
    gains: string;
    risques: string;
  };
}) {
  const r = calculerRapportResto360(args.items);
  const score = r.scoreGlobal ?? 0;
  // Détail complet par pilier (groupes, critères + photos, risques, points forts).
  const piliers = detailPiliers(args.items);
  // Détail compact (critères notés ou avec photos), usage interne éventuel.
  const details = piliers.map((d) => ({
    nom: d.nom,
    numero: d.numero,
    score: d.score,
    criteres: d.groupes
      .flatMap((g) => g.criteres)
      .filter((cdt) => typeof cdt.note === 'number' || cdt.photos.length > 0)
      .map((cdt) => ({
        intitule: cdt.intitule,
        note: cdt.note,
        commentaire: cdt.commentaire,
        photos: cdt.photos,
      })),
  }));
  const plan = [
    ...r.plan.urgence.map((l) => ({ priorite: 'Urgence', l })),
    ...r.plan.important.map((l) => ({ priorite: 'Important', l })),
    ...r.plan.confort.map((l) => ({ priorite: 'Confort', l })),
  ].map(({ priorite, l }) => ({
    priorite,
    intitule: l.intitule,
    pilier: l.pilier,
    commentaire: l.commentaire,
    delai: DELAI_RESTO[priorite],
  }));

  return {
    etablissement: args.etablissement,
    ville: args.ville ?? undefined,
    type: args.type ?? undefined,
    date: args.date,
    ref: args.ref,
    scoreGlobal: score,
    etoiles: r.etoiles,
    maturite: maturiteResto(score),
    nbCriteresNotes: r.nbCriteresNotes,
    nbCriteresTotal: r.nbCriteresTotal,
    radar: r.radar.map((p) => ({ radar: p.radar, score: p.score })),
    casCritiques: r.casCritiques.map((c) => ({
      intitule: c.intitule,
      pilier: c.pilier,
      note: c.note,
      commentaire: c.commentaire,
    })),
    plan,
    quickWins: r.quickWins.map((q) => ({ intitule: q.intitule, pilier: q.pilier })),
    details,
    piliers,
    restitution: args.restitution ?? null,
    dirigeant: r.dirigeant
      .filter((d) => d.reponse)
      .map((d) => ({ question: d.question, reponse: d.reponse as string })),
    photos: args.photos,
  };
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
  const casCritiques = lignes(
    notables.filter((i) => CRITIQUE_IDS.has(i.code)),
    (n) => n <= 2
  );

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
    casCritiques,
    plan,
    dirigeant,
    nbCriteresNotes: notables.filter((i) => typeof i.note === 'number').length,
    nbCriteresTotal: notables.length,
  };
}
