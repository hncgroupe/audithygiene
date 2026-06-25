import { NextResponse } from 'next/server';
import { getCurrentDbUser } from '@/lib/auth';

export const runtime = 'nodejs';

const ACCES = ['HYGIENE', 'RESTO360', 'LES_DEUX'] as const;

/** Met à jour le périmètre d'accès d'un auditeur. Réservé aux ADMIN. */
export async function PATCH(request: Request) {
  const me = await getCurrentDbUser();
  if (!me) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  if (me.role !== 'ADMIN') return NextResponse.json({ error: 'Réservé aux administrateurs.' }, { status: 403 });

  let body: { userId?: string; acces?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const acces = ACCES.find((a) => a === body.acces);
  if (!body.userId || !acces) {
    return NextResponse.json({ error: 'Paramètres invalides.' }, { status: 400 });
  }

  try {
    const { prisma } = await import('@/lib/prisma');
    await prisma.user.update({ where: { id: body.userId }, data: { acces } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[users] échec mise à jour acces', e);
    return NextResponse.json({ error: 'Échec de la mise à jour.' }, { status: 500 });
  }
}
