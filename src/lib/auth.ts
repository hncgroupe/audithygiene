import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { env } from './env';

/**
 * Récupère l'utilisateur authentifié (Supabase Auth) côté serveur.
 * Retourne null si non connecté ou si Supabase n'est pas configuré.
 *
 * NB : nécessite @supabase/ssr (à ajouter) pour la gestion des cookies de session.
 * Tant que l'auth n'est pas branchée, l'espace /app affiche l'écran de connexion.
 */
export async function getCurrentUser() {
  if (!env.supabaseUrl || !env.supabaseAnonKey) return null;

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {
          /* lecture seule dans les Server Components */
        },
      },
    });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (e) {
    console.warn('[auth] getCurrentUser indisponible', e);
    return null;
  }
}

/**
 * Récupère le record Prisma User (id, role, nom) de l'auditeur connecté,
 * via le lien authId ↔ Supabase Auth. Retourne null si non connecté.
 */
export async function getCurrentDbUser() {
  const authUser = await getCurrentUser();
  if (!authUser) return null;
  try {
    const { prisma } = await import('./prisma');
    return prisma.user.findFirst({
      where: { OR: [{ authId: authUser.id }, { email: authUser.email ?? '' }] },
    });
  } catch (e) {
    console.warn('[auth] getCurrentDbUser indisponible', e);
    return null;
  }
}
