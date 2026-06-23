import { NextResponse } from 'next/server';
import { getCurrentDbUser, auditAccessWhere } from '@/lib/auth';
import { calculerNotation, type Conformite } from '@/lib/notation';
import { grilleByCode } from '@/lib/grille-audit';

export const runtime = 'nodejs';

const CONFORMITES: ReadonlySet<string> = new Set([
  'CONFORME',
  'NC_MINEURE',
  'NC_MAJEURE',
  'NON_APPLICABLE',
  'NON_EVALUE',
]);

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

  const audit = await prisma.audit.findFirst({
    where: auditAccessWhere(id, user),
    include: { items: true },
  });
  if (!audit) return NextResponse.json({ error: 'Audit introuvable.' }, { status: 404 });

  const finalize = body.finalize === true;
  if (audit.statut === 'RAPPORT_ENVOYE' && !finalize) {
    return NextResponse.json({ ok: true, locked: true, scoreGlobal: audit.scoreGlobal });
  }

  // On ignore tout patch dont la conformité n'est pas une valeur connue de l'enum
  // (sinon Prisma renvoie un 500 sur une valeur arbitraire envoyée par le client).
  const patches = (body.items ?? []).filter((p) => p && CONFORMITES.has(p.conformite));
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

  // 3-5. Scores, non-conformités et en-tête réécrits dans une seule transaction :
  // pas de fenêtre où les scores/NC sont supprimés sans être recréés.
  const scoresData = Object.entries(notation.scoresParTheme).map(([theme, valeur]) => ({
    auditId: id,
    theme,
    valeur,
  }));
  const ncItems = merged.filter(
    (m) => m.conformite === 'NC_MINEURE' || m.conformite === 'NC_MAJEURE'
  );
  const grille = grilleByCode();
  const ncData = ncItems.map((m) => {
    const critique = m.conformite === 'NC_MAJEURE';
    const constat = grille.get(m.code)?.constats.find((c) => c.conformite === m.conformite);
    return {
      auditId: id,
      theme: m.theme,
      description: m.commentaire || constat?.pourquoi || m.intitule,
      critique,
      actionCorrective: constat?.correctif ?? null,
      priorite: (critique ? 'HAUTE' : 'MOYENNE') as 'HAUTE' | 'MOYENNE',
      delaiJours: critique ? 7 : 30,
    };
  });

  await prisma.$transaction([
    prisma.score.deleteMany({ where: { auditId: id } }),
    ...(scoresData.length > 0 ? [prisma.score.createMany({ data: scoresData })] : []),
    prisma.nonConformity.deleteMany({ where: { auditId: id } }),
    ...(ncData.length > 0 ? [prisma.nonConformity.createMany({ data: ncData })] : []),
    prisma.audit.update({
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
    }),
  ]);

  return NextResponse.json({
    ok: true,
    scoreGlobal: notation.scoreGlobal,
    nbCasCritiques: notation.nbCasCritiques,
    scoresParTheme: notation.scoresParTheme,
    finalized: finalize,
  });
}
