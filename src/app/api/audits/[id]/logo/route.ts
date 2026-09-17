import { NextResponse } from 'next/server';
import { getCurrentDbUser, auditAccessWhere } from '@/lib/auth';
import { uploadLogoEtablissement, supprimerLogoEtablissement } from '@/lib/supabase';

export const runtime = 'nodejs';

/**
 * Logo du client sur la couverture du rapport.
 *
 * Il peut être posé à la création de l'audit, mais rarement : sur place,
 * l'auditeur a autre chose à faire. Cette route permet de l'ajouter ou de le
 * remplacer plus tard, depuis l'écran du rapport, avant de générer le PDF.
 *
 * L'accès passe par l'audit : un auditeur ne touche qu'aux établissements de ses
 * propres audits, un admin à tous.
 */

async function etablissementDeLAudit(auditId: string) {
  const user = await getCurrentDbUser();
  if (!user) return { erreur: NextResponse.json({ error: 'Non authentifié.' }, { status: 401 }) };

  const { prisma } = await import('@/lib/prisma');
  const audit = await prisma.audit.findFirst({
    where: auditAccessWhere(auditId, user),
    select: { establishment: { select: { id: true, logoUrl: true } } },
  });
  if (!audit) return { erreur: NextResponse.json({ error: 'Audit introuvable.' }, { status: 404 }) };
  return { etablissement: audit.establishment, prisma };
}

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const acces = await etablissementDeLAudit(id);
  if (acces.erreur) return acces.erreur;
  const { etablissement, prisma } = acces;

  let corps: { logo?: string };
  try {
    corps = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête illisible.' }, { status: 400 });
  }
  if (!corps.logo) return NextResponse.json({ error: 'Aucune image reçue.' }, { status: 400 });

  const chemin = await uploadLogoEtablissement(etablissement.id, corps.logo);
  if (!chemin) {
    return NextResponse.json(
      { error: "Image refusée. Formats acceptés : PNG, JPG ou WebP, 2 Mo maximum." },
      { status: 400 }
    );
  }

  await prisma.establishment.update({
    where: { id: etablissement.id },
    data: { logoUrl: chemin },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const acces = await etablissementDeLAudit(id);
  if (acces.erreur) return acces.erreur;
  const { etablissement, prisma } = acces;

  if (etablissement.logoUrl) await supprimerLogoEtablissement(etablissement.logoUrl);
  await prisma.establishment.update({
    where: { id: etablissement.id },
    data: { logoUrl: null },
  });
  return NextResponse.json({ ok: true });
}
