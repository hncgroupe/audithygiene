import { NextResponse } from 'next/server';
import { getCurrentDbUser, assertAuditAccess } from '@/lib/auth';
import { getSupabaseAdmin, getSignedUrl } from '@/lib/supabase';
import { env } from '@/lib/env';

export const runtime = 'nodejs';

/**
 * Ajoute une photo à un item d'audit : upload dans le bucket privé puis
 * enregistrement du chemin dans AuditItem.photoUrls. Renvoie une URL signée
 * pour l'aperçu immédiat côté auditeur.
 */
export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDbUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  const { id } = await ctx.params;
  const admin = getSupabaseAdmin();
  if (!admin) return NextResponse.json({ error: 'Stockage indisponible.' }, { status: 503 });

  const form = await request.formData();
  const file = form.get('file');
  const code = String(form.get('code') ?? '');
  if (!(file instanceof Blob) || !code) {
    return NextResponse.json({ error: 'Fichier et item requis.' }, { status: 400 });
  }

  const { prisma } = await import('@/lib/prisma');
  if (!(await assertAuditAccess(id, user))) {
    return NextResponse.json({ error: 'Audit introuvable.' }, { status: 404 });
  }
  const item = await prisma.auditItem.findFirst({ where: { auditId: id, code } });
  if (!item) return NextResponse.json({ error: 'Item introuvable.' }, { status: 404 });

  const ext = (file.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg');
  const rand = Math.random().toString(36).slice(2, 8);
  const path = `audits/${id}/${code}/${Date.now()}-${rand}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await admin.storage
    .from(env.storageBucket)
    .upload(path, buffer, { contentType: file.type || 'image/jpeg', upsert: false });
  if (error) {
    console.error('[photo] upload', error.message);
    return NextResponse.json({ error: 'Échec de l’upload.' }, { status: 500 });
  }

  // Ajout ATOMIQUE au tableau : deux photos uploadées en parallèle ne s'écrasent
  // plus (le read-modify-write précédent perdait l'une des deux).
  await prisma.$executeRaw`UPDATE "audit_items" SET "photoUrls" = array_append("photoUrls", ${path}) WHERE "id" = ${item.id}`;

  const url = await getSignedUrl(path, 60 * 60 * 8);
  return NextResponse.json({ path, url });
}

/** Supprime une photo d'un item (storage + référence). */
export async function DELETE(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDbUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  const { id } = await ctx.params;
  const admin = getSupabaseAdmin();
  if (!admin) return NextResponse.json({ error: 'Stockage indisponible.' }, { status: 503 });

  let body: { code?: string; path?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }
  if (!body.code || !body.path) {
    return NextResponse.json({ error: 'Paramètres manquants.' }, { status: 400 });
  }

  const { prisma } = await import('@/lib/prisma');
  if (!(await assertAuditAccess(id, user))) {
    return NextResponse.json({ error: 'Audit introuvable.' }, { status: 404 });
  }
  const item = await prisma.auditItem.findFirst({ where: { auditId: id, code: body.code } });
  if (!item) return NextResponse.json({ error: 'Item introuvable.' }, { status: 404 });

  await admin.storage.from(env.storageBucket).remove([body.path]).catch(() => null);
  // Retrait atomique (cohérent avec l'ajout array_append).
  await prisma.$executeRaw`UPDATE "audit_items" SET "photoUrls" = array_remove("photoUrls", ${body.path}) WHERE "id" = ${item.id}`;

  return NextResponse.json({ ok: true });
}
