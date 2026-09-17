import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NextResponse } from 'next/server';
import { createElement } from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { getCurrentDbUser, auditAccessWhere } from '@/lib/auth';
import { getDataUri } from '@/lib/supabase';
import {
  assemblerRapportHygiene,
  LIBELLE_TYPE_ETABLISSEMENT,
  type RapportItemEntree,
} from '@/lib/rapport-hygiene';
import { HygieneDocument, type HygienePdfData } from '@/lib/pdf/HygieneDocument';
import type { Conformite } from '@/lib/notation';

export const runtime = 'nodejs';
export const maxDuration = 60;

/** Images de marque, lues une fois puis gardées en mémoire. */
const cacheImages = new Map<string, string | null>();
async function imageMarque(fichier: string): Promise<string | null> {
  const connu = cacheImages.get(fichier);
  if (connu !== undefined) return connu;
  let uri: string | null = null;
  try {
    const buf = await readFile(join(process.cwd(), 'public', fichier));
    uri = `data:image/png;base64,${buf.toString('base64')}`;
  } catch {
    uri = null; // le document retombe sur le nom en toutes lettres
  }
  cacheImages.set(fichier, uri);
  return uri;
}

/** Nom de fichier lisible et sans accent, pour tous les systèmes. */
function slug(s: string): string {
  return (
    s
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase() || 'etablissement'
  );
}

/**
 * Télécharge le rapport d'audit hygiène en PDF.
 * Les photos sont intégrées en base64 : le fichier reste lisible hors ligne,
 * même après expiration des URL signées.
 */
export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDbUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  const { id } = await ctx.params;
  const { prisma } = await import('@/lib/prisma');
  const audit = await prisma.audit.findFirst({
    where: auditAccessWhere(id, user),
    include: { establishment: true, items: true, auditeur: true },
  });
  if (!audit) return NextResponse.json({ error: 'Audit introuvable.' }, { status: 404 });
  if (audit.marque !== 'AUDIT_HYGIENE') {
    return NextResponse.json({ error: 'Rapport indisponible pour cette marque.' }, { status: 400 });
  }

  const sorted = audit.items.slice().sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const entrees: RapportItemEntree[] = await Promise.all(
    sorted.map(async (it) => ({
      code: it.code,
      theme: it.theme,
      intitule: it.intitule,
      referenceRegl: it.referenceRegl,
      conformite: it.conformite as Conformite,
      ponderation: it.ponderation,
      commentaire: it.commentaire,
      photos: (await Promise.all(it.photoUrls.map((p) => getDataUri(p))))
        .filter((u): u is string => Boolean(u))
        .map((url) => ({ url })),
    }))
  );

  const dateStr = (audit.dateAudit ?? audit.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const data: HygienePdfData = {
    etablissement: audit.establishment.nom,
    adresse: audit.establishment.adresse,
    ville: audit.establishment.ville,
    type: LIBELLE_TYPE_ETABLISSEMENT[audit.establishment.type] ?? null,
    date: dateStr,
    reference: `AH-${audit.id.slice(-6).toUpperCase()}`,
    auditeur: audit.auditeur.name,
    grilleVersion: audit.grilleVersion,
    logoBlanc: await imageMarque('logo-blanc.png'),
    logoMarque: await imageMarque('logo-wordmark.png'),
    logoClient: audit.establishment.logoUrl ? await getDataUri(audit.establishment.logoUrl) : null,
    rapport: assemblerRapportHygiene(entrees),
  };

  const element = createElement(HygieneDocument, { data });
  const pdf = await renderToBuffer(element as Parameters<typeof renderToBuffer>[0]);
  const nom = `rapport-audit-hygiene-${slug(audit.establishment.nom)}.pdf`;

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${nom}"`,
      'Cache-Control': 'no-store',
    },
  });
}
