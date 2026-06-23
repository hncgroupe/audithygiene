/**
 * Sauvegarde des photos d'audit sur un Shared Drive Google (Workspace).
 *
 * Entièrement DORMANT tant que `env.isDriveBackupEnabled` est faux (pas de clé) :
 * toutes les fonctions renvoient null/false sans rien faire. La sauvegarde est un
 * filet en plus de Supabase : un échec Drive ne doit jamais casser un audit.
 *
 * Auth : compte de service (clé JSON en base64) membre du Shared Drive.
 */
import { google, type drive_v3 } from 'googleapis';
import { Readable } from 'node:stream';
import { env } from './env';

const FOLDER_MIME = 'application/vnd.google-apps.folder';

let cached: drive_v3.Drive | null = null;

function getDrive(): drive_v3.Drive | null {
  if (!env.isDriveBackupEnabled) return null;
  if (cached) return cached;
  try {
    const json = JSON.parse(
      Buffer.from(env.googleServiceAccountB64!, 'base64').toString('utf8')
    );
    const auth = new google.auth.JWT({
      email: json.client_email,
      key: json.private_key,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    cached = google.drive({ version: 'v3', auth });
    return cached;
  } catch (e) {
    console.error('[drive] init', e);
    return null;
  }
}

export function isDriveEnabled(): boolean {
  return env.isDriveBackupEnabled;
}

async function createFolder(
  drive: drive_v3.Drive,
  name: string,
  parentId: string
): Promise<string | null> {
  const res = await drive.files.create({
    requestBody: { name, mimeType: FOLDER_MIME, parents: [parentId] },
    fields: 'id',
    supportsAllDrives: true,
  });
  return res.data.id ?? null;
}

/** Libellé du dossier d'audit : "audit - NOM - JJ/MM/AAAA". */
export function auditFolderLabel(nomEtablissement: string, date: Date): string {
  const d = date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const nom = (nomEtablissement || 'Restaurant').replace(/[\\/]/g, '-').trim();
  return `audit - ${nom} - ${d}`;
}

/**
 * Crée le dossier "audit - NOM - DATE" puis le sous-dossier "photos".
 * Renvoie l'id du sous-dossier "photos" (où les photos seront déposées), ou null.
 */
export async function createAuditDriveFolder(label: string): Promise<string | null> {
  const drive = getDrive();
  if (!drive) return null;
  try {
    const root = env.googleDriveParentId || env.googleDriveId!;
    const auditFolderId = await createFolder(drive, label, root);
    if (!auditFolderId) return null;
    return await createFolder(drive, 'photos', auditFolderId);
  } catch (e) {
    console.error('[drive] createAuditDriveFolder', e);
    return null;
  }
}

/** Dépose une photo dans le dossier "photos" de l'audit. Best-effort. */
export async function uploadPhotoToDrive(
  folderId: string,
  fileName: string,
  buffer: Buffer,
  mimeType: string
): Promise<boolean> {
  const drive = getDrive();
  if (!drive || !folderId) return false;
  try {
    await drive.files.create({
      requestBody: { name: fileName, parents: [folderId] },
      media: { mimeType: mimeType || 'image/jpeg', body: Readable.from(buffer) },
      fields: 'id',
      supportsAllDrives: true,
    });
    return true;
  } catch (e) {
    console.error('[drive] uploadPhotoToDrive', e);
    return false;
  }
}
