/**
 * Backfill / consolidation Drive pour un audit existant.
 * - Crée le dossier "audit - NOM - DATE" / "photos" si besoin et y copie les
 *   photos de Supabase, nommées d'après la QUESTION (intitulé), numérotées à
 *   partir de la 2e photo d'une même question.
 * - Avec --reset : met d'abord à la corbeille TOUS les dossiers Drive
 *   "audit - NOM ..." (utile pour fusionner des doublons) et repart à zéro.
 * Sûr : n'agit que si UN seul audit correspond au nom.
 *
 * Usage : npx tsx scripts/backfill-drive.ts "Bistrot M" [--reset]
 */
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { google } from 'googleapis';
import { Readable } from 'node:stream';

const NAME = process.argv[2] ?? '';
const RESET = process.argv.includes('--reset');
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'rapports';
const FOLDER_MIME = 'application/vnd.google-apps.folder';
const prisma = new PrismaClient();

function folderLabel(nom: string, date: Date | null) {
  const d = (date ?? new Date()).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return `audit - ${(nom || 'Restaurant').replace(/[\\/]/g, '-').trim()} - ${d}`;
}
function photoName(intitule: string, index: number) {
  const base = (intitule || 'photo').replace(/[\\/:*?"<>|\n\r\t]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 90) || 'photo';
  return `${base}${index > 0 ? ` - ${index + 1}` : ''}.jpg`;
}

async function main() {
  if (!NAME) { console.log('Donne un nom : npx tsx scripts/backfill-drive.ts "NOM" [--reset]'); return; }

  const audits = await prisma.audit.findMany({
    where: { establishment: { is: { nom: { contains: NAME, mode: 'insensitive' } } } },
    select: {
      id: true, driveFolderId: true, dateAudit: true,
      establishment: { select: { nom: true } },
      items: { select: { code: true, intitule: true, photoUrls: true }, orderBy: { createdAt: 'asc' } },
    },
    orderBy: { createdAt: 'desc' },
  });
  if (audits.length !== 1) {
    console.log(`Audits correspondant à "${NAME}" : ${audits.length}. Il en faut exactement 1. Aucune action.`);
    audits.forEach((a) => console.log(`  - ${a.id} | ${a.establishment.nom}`));
    await prisma.$disconnect();
    return;
  }
  const audit = audits[0];

  const json = JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64!, 'base64').toString('utf8'));
  const auth = new google.auth.JWT({ email: json.client_email, key: json.private_key, scopes: ['https://www.googleapis.com/auth/drive'] });
  const drive = google.drive({ version: 'v3', auth });
  const supa = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  if (RESET) {
    const wanted = folderLabel(audit.establishment.nom, audit.dateAudit);
    // On liste tous les dossiers d'audit et on filtre en JS (évite les soucis
    // d'échappement quand le nom contient une apostrophe, ex. Auber'zinc).
    const res = await drive.files.list({
      q: `mimeType='${FOLDER_MIME}' and trashed=false and name contains 'audit - '`,
      fields: 'files(id,name)', pageSize: 1000, supportsAllDrives: true, includeItemsFromAllDrives: true, corpora: 'allDrives',
    });
    for (const f of (res.data.files ?? []).filter((x) => x.name === wanted)) {
      await drive.files.update({ fileId: f.id!, requestBody: { trashed: true }, supportsAllDrives: true });
      console.log('Corbeille (reset):', f.name, f.id);
    }
    await prisma.audit.update({ where: { id: audit.id }, data: { driveFolderId: null } });
    audit.driveFolderId = null;
  }

  // Dossier photos.
  let photosFolder = audit.driveFolderId;
  if (!photosFolder) {
    const root = process.env.GOOGLE_DRIVE_PARENT_ID || process.env.GOOGLE_DRIVE_ID!;
    const af = await drive.files.create({ requestBody: { name: folderLabel(audit.establishment.nom, audit.dateAudit), mimeType: FOLDER_MIME, parents: [root] }, fields: 'id', supportsAllDrives: true });
    const pf = await drive.files.create({ requestBody: { name: 'photos', mimeType: FOLDER_MIME, parents: [af.data.id!] }, fields: 'id', supportsAllDrives: true });
    photosFolder = pf.data.id!;
    await prisma.audit.update({ where: { id: audit.id }, data: { driveFolderId: photosFolder } });
    console.log('Dossier créé. photosFolder =', photosFolder);
  } else {
    console.log('Dossier réutilisé. photosFolder =', photosFolder);
  }

  let ok = 0, fail = 0, total = 0;
  for (const it of audit.items) {
    for (let j = 0; j < it.photoUrls.length; j++) {
      total++;
      const path = it.photoUrls[j];
      try {
        const { data, error } = await supa.storage.from(BUCKET).download(path);
        if (error || !data) { console.log('  download KO', path, error?.message); fail++; continue; }
        const buffer = Buffer.from(await data.arrayBuffer());
        await drive.files.create({
          requestBody: { name: photoName(it.intitule, j), parents: [photosFolder] },
          media: { mimeType: 'image/jpeg', body: Readable.from(buffer) },
          fields: 'id', supportsAllDrives: true,
        });
        ok++;
      } catch (e: any) { console.log('  upload KO', path, e?.message); fail++; }
    }
  }
  console.log(`\nAudit ${audit.id} (${audit.establishment.nom}) — ${ok}/${total} copiées, ${fail} échec(s).`);
  await prisma.$disconnect();
}
main().catch(async (e) => { console.error('ERREUR', e?.message ?? e); await prisma.$disconnect(); process.exit(1); });
