import { NextResponse, after } from 'next/server';
import { getCurrentDbUser, assertAuditAccess } from '@/lib/auth';
import { getSupabaseAdmin, getSignedUrl } from '@/lib/supabase';
import { env } from '@/lib/env';
import {
  isDriveEnabled,
  auditFolderLabel,
  createAuditDriveFolder,
  uploadPhotoToDrive,
  drivePhotoName,
} from '@/lib/drive';

export const runtime = 'nodejs';

/**
 * Sauvegarde best-effort d'une photo sur le Shared Drive, APRÈS la réponse
 * (via after()) : aucun impact sur la vitesse d'affichage du ✓ côté auditeur.
 * Crée le dossier de l'audit à la volée s'il n'existe pas encore.
 */
async function backupPhotoToDrive(
  auditId: string,
  fileName: string,
  buffer: Buffer,
  mimeType: string
) {
  if (!isDriveEnabled()) return;
  try {
    const { prisma } = await import('@/lib/prisma');
    const audit = await prisma.audit.findUnique({
      where: { id: auditId },
      select: { driveFolderId: true, dateAudit: true, establishment: { select: { nom: true } } },
    });
    if (!audit) return;
    let folderId = audit.driveFolderId;
    if (!folderId) {
      const label = auditFolderLabel(audit.establishment.nom, audit.dateAudit ?? new Date());
      const created = await createAuditDriveFolder(label);
      if (created) {
        // Anti-course : on ne pose l'id que si aucun autre n'a déjà créé le dossier.
        const upd = await prisma.audit.updateMany({
          where: { id: auditId, driveFolderId: null },
          data: { driveFolderId: created },
        });
        if (upd.count === 0) {
          // Un autre upload a gagné : on réutilise son dossier (le nôtre restera vide).
          const fresh = await prisma.audit.findUnique({
            where: { id: auditId },
            select: { driveFolderId: true },
          });
          folderId = fresh?.driveFolderId ?? created;
        } else {
          folderId = created;
        }
      }
    }
    if (folderId) await uploadPhotoToDrive(folderId, fileName, buffer, mimeType);
  } catch (e) {
    console.error('[photo] backup Drive', e);
  }
}

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

  // Sauvegarde Drive APRÈS la réponse (ne ralentit pas l'auditeur). Le fichier
  // est nommé d'après la question, avec un numéro à partir de la 2e photo.
  if (isDriveEnabled()) {
    const fileName = drivePhotoName(item.intitule, item.photoUrls.length);
    after(() => backupPhotoToDrive(id, fileName, buffer, file.type || 'image/jpeg'));
  }

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
