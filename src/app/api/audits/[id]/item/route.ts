import { NextResponse } from 'next/server';
import { getCurrentDbUser } from '@/lib/auth';
import { grilleByCode } from '@/lib/grille-audit';

export const runtime = 'nodejs';

/**
 * Ajoute un point à un audit en cours :
 * - depuis la bibliothèque (fromCode) : reprend l'intitulé/pondération/thème de la grille,
 * - ou sur mesure (intitule libre) : point « Sur mesure », pondération moyenne.
 * Permet aussi les doublons (ex. plusieurs frigos) en suffixant le code.
 */
export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDbUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  const { id } = await ctx.params;
  let body: { fromCode?: string; intitule?: string; theme?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const { prisma } = await import('@/lib/prisma');
  const audit = await prisma.audit.findUnique({ where: { id }, select: { id: true } });
  if (!audit) return NextResponse.json({ error: 'Audit introuvable.' }, { status: 404 });

  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  let theme: string;
  let intitule: string;
  let ponderation = 2;
  let referenceRegl: string | null = null;

  const g = body.fromCode ? grilleByCode().get(body.fromCode) : undefined;
  if (g) {
    theme = g.theme;
    intitule = g.intitule;
    ponderation = g.ponderation;
    referenceRegl = g.referenceRegl ?? null;
  } else {
    intitule = (body.intitule ?? '').trim();
    if (!intitule) return NextResponse.json({ error: 'Intitulé requis.' }, { status: 400 });
    theme = (body.theme ?? '').trim() || 'Sur mesure';
  }

  const code = g ? `${body.fromCode}-${rand}` : `CUSTOM-${rand}`;

  const item = await prisma.auditItem.create({
    data: {
      auditId: id,
      theme,
      code,
      intitule,
      referenceRegl,
      ponderation,
      conformite: 'NON_EVALUE',
    },
  });

  return NextResponse.json({
    code: item.code,
    theme: item.theme,
    intitule: item.intitule,
    ponderation: item.ponderation,
    fromCode: body.fromCode ?? null,
  });
}
