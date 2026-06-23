import { NextResponse } from 'next/server';
import { getCurrentDbUser, auditAccessWhere } from '@/lib/auth';
import {
  GRILLE_RESTO360,
  resolveCritere,
  scorePilier,
  scoreGlobalResto,
  type NoteResto,
} from '@/lib/grille-resto360';

export const runtime = 'nodejs';

interface ItemPatch {
  code: string;
  note?: number | null; // 1 à 5
  commentaire?: string | null;
  meta?: Record<string, unknown> | null; // checklist cochée, etc.
}

/**
 * Autosave d'un audit resto360.
 * - Met à jour la note (1 à 5) et le commentaire des critères transmis.
 * - Recalcule le score de chaque pilier (/100) et le score global.
 * - finalize=true -> statut TERMINE.
 */
export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDbUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  const { id } = await ctx.params;

  let body: { items?: ItemPatch[]; finalize?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const { prisma } = await import('@/lib/prisma');

  const audit = await prisma.audit.findFirst({
    where: auditAccessWhere(id, user),
    include: { items: true },
  });
  if (!audit) return NextResponse.json({ error: 'Audit introuvable.' }, { status: 404 });

  const finalize = body.finalize === true;
  // Un rapport déjà envoyé ne se réécrit pas par une autosave tardive (réseau en
  // retard) : on accepte seulement la finalisation explicite, jamais l'autosave.
  if (audit.statut === 'RAPPORT_ENVOYE' && !finalize) {
    return NextResponse.json({ ok: true, locked: true, scoreGlobal: audit.scoreGlobal });
  }

  const patches = body.items ?? [];
  const byCode = new Map(patches.map((p) => [p.code, p]));
  const existingCodes = new Set(audit.items.map((it) => it.code));

  // Critères à mettre à jour / à créer, préparés EN MÉMOIRE avant toute écriture.
  const aMettreAJour = audit.items
    .filter((it) => byCode.has(it.code))
    .map((it) => {
      const p = byCode.get(it.code)!;
      const note = typeof p.note === 'number' && p.note >= 1 && p.note <= 5 ? p.note : null;
      return {
        id: it.id,
        data: {
          note,
          commentaire: p.commentaire?.trim() || null,
          ...('meta' in p ? { meta: (p.meta ?? undefined) as never } : {}),
        },
      };
    });

  // Création des critères de grille absents (audit démarré avant l'ajout de la
  // question), pour que rien ne soit perdu.
  const aCreer = patches
    .filter((p) => !existingCodes.has(p.code))
    .map((p) => {
      const g = resolveCritere(p.code);
      if (!g) return null;
      const note = typeof p.note === 'number' && p.note >= 1 && p.note <= 5 ? p.note : null;
      return {
        auditId: id,
        theme: g.theme,
        groupe: g.groupe,
        code: p.code,
        intitule: g.intitule,
        conformite: 'NON_EVALUE' as const,
        note,
        commentaire: p.commentaire?.trim() || null,
        ...('meta' in p ? { meta: (p.meta ?? undefined) as never } : {}),
      };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  // Carte des notes à jour (code -> note), items existants + nouveaux patchés
  const notes: Record<string, NoteResto | undefined> = {};
  for (const it of audit.items) {
    const p = byCode.get(it.code);
    const n = p ? p.note : it.note;
    if (typeof n === 'number' && n >= 1 && n <= 5) notes[it.code] = n as NoteResto;
  }
  for (const p of patches) {
    if (existingCodes.has(p.code)) continue;
    if (typeof p.note === 'number' && p.note >= 1 && p.note <= 5) notes[p.code] = p.note as NoteResto;
  }

  // Scores par pilier (theme = nom du pilier)
  const scoresData = GRILLE_RESTO360.filter((p) => p.noteAuRadar)
    .map((p) => ({ pilier: p, valeur: scorePilier(notes, p) }))
    .filter((s) => s.valeur !== null)
    .map((s) => ({ auditId: id, theme: s.pilier.nom, valeur: s.valeur as number }));

  const scoreGlobal = scoreGlobalResto(notes);

  // ÉCRITURE : tout dans UNE seule transaction = UNE seule connexion par requête.
  // L'ancienne version lançait une requête par critère en parallèle (Promise.all) :
  // avec ~50 critères + uploads photo simultanés, le pool de connexions Postgres
  // (limite 5) saturait et l'autosave renvoyait 500 (P2024). Ici, les écritures
  // sont séquentielles sur une connexion unique : aucune saturation possible.
  await prisma.$transaction(
    async (tx) => {
      for (const u of aMettreAJour) {
        await tx.auditItem.update({ where: { id: u.id }, data: u.data });
      }
      for (const c of aCreer) {
        await tx.auditItem.create({ data: c });
      }
      await tx.score.deleteMany({ where: { auditId: id } });
      if (scoresData.length > 0) await tx.score.createMany({ data: scoresData });
      await tx.audit.update({
        where: { id },
        data: {
          scoreGlobal: scoreGlobal ?? null,
          ...(finalize ? { statut: 'TERMINE' } : {}),
        },
      });
    },
    { timeout: 20000, maxWait: 15000 }
  );

  return NextResponse.json({
    ok: true,
    scoreGlobal,
    scoresParPilier: Object.fromEntries(scoresData.map((s) => [s.theme, s.valeur])),
    finalized: finalize,
  });
}
