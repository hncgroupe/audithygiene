import { NextResponse } from 'next/server';
import { getCurrentDbUser } from '@/lib/auth';
import {
  GRILLE_RESTO360,
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

  const audit = await prisma.audit.findUnique({ where: { id }, include: { items: true } });
  if (!audit) return NextResponse.json({ error: 'Audit introuvable.' }, { status: 404 });

  const patches = body.items ?? [];
  const byCode = new Map(patches.map((p) => [p.code, p]));

  // 1. Mise à jour des critères modifiés
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

  // 2. Carte des notes à jour (code -> note)
  const notes: Record<string, NoteResto | undefined> = {};
  for (const it of audit.items) {
    const p = byCode.get(it.code);
    const n = p ? p.note : it.note;
    if (typeof n === 'number' && n >= 1 && n <= 5) notes[it.code] = n as NoteResto;
  }

  // 3. Scores par pilier (theme = nom du pilier)
  await prisma.score.deleteMany({ where: { auditId: id } });
  const scoresData = GRILLE_RESTO360.filter((p) => p.noteAuRadar)
    .map((p) => ({ pilier: p, valeur: scorePilier(notes, p) }))
    .filter((s) => s.valeur !== null)
    .map((s) => ({ auditId: id, theme: s.pilier.nom, valeur: s.valeur as number }));
  if (scoresData.length > 0) {
    await prisma.score.createMany({ data: scoresData });
  }

  const scoreGlobal = scoreGlobalResto(notes);

  // 4. En-tête d'audit
  const finalize = body.finalize === true;
  await prisma.audit.update({
    where: { id },
    data: {
      scoreGlobal: scoreGlobal ?? null,
      ...(finalize ? { statut: 'TERMINE' } : {}),
    },
  });

  return NextResponse.json({
    ok: true,
    scoreGlobal,
    scoresParPilier: Object.fromEntries(scoresData.map((s) => [s.theme, s.valeur])),
    finalized: finalize,
  });
}
