import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from './env';

/**
 * Client Supabase côté serveur (service role) - usage : Storage, opérations privilégiées.
 * NE JAMAIS exposer la service role key au client.
 */
let serviceClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    console.warn('[supabase] URL ou service role key manquante - client admin indisponible.');
    return null;
  }
  if (!serviceClient) {
    serviceClient = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });
  }
  return serviceClient;
}

/**
 * Génère une URL signée à durée limitée pour un fichier privé (ex. rapport PDF).
 */
export async function getSignedUrl(path: string, expiresInSec = 3600): Promise<string | null> {
  const client = getSupabaseAdmin();
  if (!client) return null;
  const { data, error } = await client.storage
    .from(env.storageBucket)
    .createSignedUrl(path, expiresInSec);
  if (error) {
    console.error('[supabase] createSignedUrl', error.message);
    return null;
  }
  return data.signedUrl;
}

/**
 * Télécharge un fichier du bucket privé et le renvoie en data URI (base64).
 * Utile pour embarquer une image dans un PDF (aucune dépendance réseau au rendu).
 */
export async function getDataUri(path: string): Promise<string | null> {
  const client = getSupabaseAdmin();
  if (!client) return null;
  const { data, error } = await client.storage.from(env.storageBucket).download(path);
  if (error || !data) {
    console.error('[supabase] download', error?.message);
    return null;
  }
  const buffer = Buffer.from(await data.arrayBuffer());
  const type = data.type || 'image/jpeg';
  return `data:${type};base64,${buffer.toString('base64')}`;
}

/**
 * Enregistre le logo d'un établissement (dataURL base64) dans le bucket privé et
 * renvoie son chemin de stockage. Le même chemin est réécrit à chaque fois, donc
 * remplacer un logo ne laisse pas de fichier orphelin derrière lui.
 * Renvoie null si l'image est absente, illisible ou trop lourde.
 */
export async function uploadLogoEtablissement(
  estabId: string,
  dataUrl: string
): Promise<string | null> {
  const admin = getSupabaseAdmin();
  if (!admin) return null;
  const m = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i.exec(dataUrl.trim());
  if (!m) return null;
  const mime = m[1].toLowerCase();
  const ext = (mime.split('/')[1] || 'png').replace('jpeg', 'jpg').replace('svg+xml', 'svg');
  const buffer = Buffer.from(m[2], 'base64');
  if (buffer.length === 0 || buffer.length > 2_000_000) return null; // garde-fou taille
  const path = `etablissements/${estabId}/logo.${ext}`;
  const { error } = await admin.storage
    .from(env.storageBucket)
    .upload(path, buffer, { contentType: mime, upsert: true });
  if (error) {
    console.error('[supabase] upload logo', error.message);
    return null;
  }
  return path;
}

/**
 * Supprime le logo d'un établissement du bucket.
 */
export async function supprimerLogoEtablissement(path: string): Promise<boolean> {
  const admin = getSupabaseAdmin();
  if (!admin) return false;
  const { error } = await admin.storage.from(env.storageBucket).remove([path]);
  if (error) {
    console.error('[supabase] remove logo', error.message);
    return false;
  }
  return true;
}

/**
 * Upload d'un buffer PDF dans le bucket privé "rapports".
 */
export async function uploadReport(path: string, buffer: Buffer): Promise<boolean> {
  const client = getSupabaseAdmin();
  if (!client) return false;
  const { error } = await client.storage
    .from(env.storageBucket)
    .upload(path, buffer, { contentType: 'application/pdf', upsert: true });
  if (error) {
    console.error('[supabase] uploadReport', error.message);
    return false;
  }
  return true;
}
