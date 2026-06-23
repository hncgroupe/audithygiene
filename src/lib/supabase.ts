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
