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

  // 1. Mise à jour des critères existants
  await Promise.all(
    audit.items
      .filter((it) => byCode.has(it.code))
      .map((it) => {
        const p = byCode.get(it.code)!;
        const note = typeof p.note === 'number' && p.note >= 1 && p.note <= 5 ? p.note : null;
        return prisma.auditItem.update({
          where: { id: it.id },
          data: {
            note,
            commentaire: p.commentaire?.trim() || null,
            ...('meta' in p ? { meta: (p.meta ?? undefined) as never } : {}),
          },
        });
      })
  );

  // 1bis. Création des critères de grille absents (audit démarré avant l'ajout
  // de la question), pour que rien ne soit perdu.
  await Promise.all(
    patches
      .filter((p) => !existingCodes.has(p.code))
      .map((p) => {
        const g = resolveCritere(p.code);
        if (!g) return Promise.resolve(null);
        const note = typeof p.note === 'number' && p.note >= 1 && p.note <= 5 ? p.note : null;
        return prisma.auditItem.create({
          data: {
            auditId: id,
            theme: g.theme,
            groupe: g.groupe,
            code: p.code,
            intitule: g.intitule,
            conformite: 'NON_EVALUE',
            note,
            commentaire: p.commentaire?.trim() || null,
            ...('meta' in p ? { meta: (p.meta ?? undefined) as never } : {}),
          },
        });
      })
  );

  // 2. Carte des notes à jour (code -> note), items existants + nouveaux patchés
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

  // 3. Scores par pilier (theme = nom du pilier)
  const scoresData = GRILLE_RESTO360.filter((p) => p.noteAuRadar)
    .map((p) => ({ pilier: p, valeur: scorePilier(notes, p) }))
    .filter((s) => s.valeur !== null)
    .map((s) => ({ auditId: id, theme: s.pilier.nom, valeur: s.valeur as number }));

  const scoreGlobal = scoreGlobalResto(notes);

  // 4. Scores + en-tête dans une seule transaction : on ne peut pas se retrouver
  // avec les scores supprimés mais non recréés si la requête échoue en cours.
  await prisma.$transaction([
    prisma.score.deleteMany({ where: { auditId: id } }),
    ...(scoresData.length > 0 ? [prisma.score.createMany({ data: scoresData })] : []),
    prisma.audit.update({
      where: { id },
      data: {
        scoreGlobal: scoreGlobal ?? null,
        ...(finalize ? { statut: 'TERMINE' } : {}),
      },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    scoreGlobal,
    scoresParPilier: Object.fromEntries(scoresData.map((s) => [s.theme, s.valeur])),
    finalized: finalize,
  });
}
