import { NextResponse } from 'next/server';
import { getCurrentDbUser, auditAccessWhere } from '@/lib/auth';
import { env } from '@/lib/env';
import { genererRestitution } from '@/lib/restitution';
import type { ItemNote } from '@/lib/rapport-resto360';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Génère (ou régénère) la restitution IA d'un audit auditresto360 et la stocke.
 */
export async function POST(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDbUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  if (!env.anthropicApiKey) {
    return NextResponse.json(
      { error: 'IA non configurée. Ajoutez ANTHROPIC_API_KEY dans les variables d\'environnement.' },
      { status: 503 }
    );
  }

  const { id } = await ctx.params;
  const { prisma } = await import('@/lib/prisma');
  const audit = await prisma.audit.findFirst({
    where: auditAccessWhere(id, user),
    include: { establishment: true, items: true },
  });
  if (!audit) return NextResponse.json({ error: 'Audit introuvable.' }, { status: 404 });
  if (audit.marque !== 'AUDITRESTO360') {
    return NextResponse.json({ error: 'Restitution réservée aux audits resto360.' }, { status: 400 });
  }

  const items: ItemNote[] = audit.items.map((it) => ({
    code: it.code,
    theme: it.theme,
    groupe: it.groupe,
    intitule: it.intitule,
    note: it.note,
    commentaire: it.commentaire,
  }));

  try {
    const restitution = await genererRestitution(audit.establishment.nom, items);
    await prisma.audit.update({
      where: { id },
      data: { syntheseIA: restitution as unknown as object },
    });
    return NextResponse.json({ ok: true, restitution });
  } catch (e) {
    console.error('[restitution]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Échec de la génération.' },
      { status: 500 }
    );
  }
}
