import { NextResponse } from 'next/server';
import { getCurrentDbUser } from '@/lib/auth';

export const runtime = 'nodejs';

const TYPES = [
  'RESTAURANT',
  'RESTAURATION_RAPIDE',
  'DARK_KITCHEN',
  'BOULANGERIE',
  'TRAITEUR',
  'HOTEL_RESTAURANT',
  'BAR',
  'AUTRE',
];

/**
 * Création rapide d'un établissement depuis l'espace auditeur.
 * Crée le client porteur s'il n'est pas fourni (cas terrain : on saisit vite l'établissement).
 */
export async function POST(request: Request) {
  const user = await getCurrentDbUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  let b: {
    nom?: string;
    type?: string;
    ville?: string;
    codePostal?: string;
    departement?: string;
    adresse?: string;
    clientNom?: string;
  };
  try {
    b = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const nom = (b.nom ?? '').trim();
  if (!nom) return NextResponse.json({ error: 'Nom de l’établissement requis.' }, { status: 400 });

  const type = TYPES.includes(b.type ?? '') ? (b.type as string) : 'RESTAURANT';
  const { prisma } = await import('@/lib/prisma');

  const client = await prisma.client.create({
    data: { nom: (b.clientNom ?? '').trim() || nom },
  });

  const etab = await prisma.establishment.create({
    data: {
      clientId: client.id,
      nom,
      type: type as never,
      ville: b.ville?.trim() || null,
      codePostal: b.codePostal?.trim() || null,
      departement: b.departement?.trim() || null,
      adresse: b.adresse?.trim() || null,
    },
  });

  return NextResponse.json({ id: etab.id, nom: etab.nom });
}
