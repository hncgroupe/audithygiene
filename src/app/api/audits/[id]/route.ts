import { NextResponse } from 'next/server';
import { getCurrentDbUser } from '@/lib/auth';
import { calculerNotation, type Conformite } from '@/lib/notation';
import { grilleByCode } from '@/lib/grille-audit';

export const runtime = 'nodejs';

interface ItemPatch {
  code: string;
  conformite: Conformite;
  commentaire?: string | null;
}

/**
 * Enregistre la progression d'un audit (autosave) et recalcule la notation.
 * - Met à jour la conformité + commentaire de chaque item transmis.
 * - Recalcule scores par thème + score global + nb de cas critiques (notation.ts).
 * - Régénère les non-conformités (NC mineures + cas critiques) avec plan correctif amorcé.
 * - finalize=true → statut TERMINE + date prochain audit.
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

  // 1. Mise à jour des items modifiés
  await Promise.all(
    audit.items
      .filter((it) => byCode.has(it.code))
      .map((it) => {
        const p = byCode.get(it.code)!;
        return prisma.auditItem.update({
          where: { id: it.id },
          data: {
            conformite: p.conformite,
            commentaire: p.commentaire?.trim() || null,
          },
        });
      })
  );

  // 2. Recalcul de la notation sur l'état complet à jour
  const merged = audit.items.map((it) => {
    const p = byCode.get(it.code);
    return {
      theme: it.theme,
      code: it.code,
      intitule: it.intitule,
      ponderation: it.ponderation,
      conformite: (p?.conformite ?? it.conformite) as Conformite,
      commentaire: p ? p.commentaire?.trim() || null : it.commentaire,
    };
  });

  const notation = calculerNotation(
    merged.map((m) => ({ theme: m.theme, ponderation: m.ponderation, conformite: m.conformite }))
  );

  // 3. Réécriture des scores par thème
  await prisma.score.deleteMany({ where: { auditId: id } });
  await prisma.score.createMany({
    data: Object.entries(notation.scoresParTheme).map(([theme, valeur]) => ({
      auditId: id,
      theme,
      valeur,
    })),
  });

  // 4. Régénération des non-conformités (plan correctif amorcé)
  await prisma.nonConformity.deleteMany({ where: { auditId: id } });
  const ncItems = merged.filter(
    (m) => m.conformite === 'NC_MINEURE' || m.conformite === 'NC_MAJEURE'
  );
  if (ncItems.length > 0) {
    const grille = grilleByCode();
    await prisma.nonConformity.createMany({
      data: ncItems.map((m) => {
        const critique = m.conformite === 'NC_MAJEURE';
        const constat = grille
          .get(m.code)
          ?.constats.find((c) => c.conformite === m.conformite);
        return {
          auditId: id,
          theme: m.theme,
          description: m.commentaire || constat?.pourquoi || m.intitule,
          critique,
          actionCorrective: constat?.correctif ?? null,
          priorite: critique ? 'HAUTE' : 'MOYENNE',
          delaiJours: critique ? 7 : 30,
        };
      }),
    });
  }

  // 5. Mise à jour de l'en-tête d'audit
  const finalize = body.finalize === true;
  await prisma.audit.update({
    where: { id },
    data: {
      scoreGlobal: notation.scoreGlobal,
      nbCasCritiques: notation.nbCasCritiques,
      ...(finalize
        ? {
            statut: 'TERMINE',
            prochainAuditLe: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          }
        : {}),
    },
  });

  return NextResponse.json({
    ok: true,
    scoreGlobal: notation.scoreGlobal,
    nbCasCritiques: notation.nbCasCritiques,
    scoresParTheme: notation.scoresParTheme,
    finalized: finalize,
  });
}
