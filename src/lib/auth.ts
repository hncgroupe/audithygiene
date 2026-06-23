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
 * Récupère le record Prisma User (id, role, nom) de l'auditeur connecté.
 *
 * Sécurité : on résout d'abord par `authId` (lien fort Supabase). On ne tombe
 * sur l'email QUE pour lier un compte jamais relié (authId null), et on écrit
 * alors l'authId. On exige `active = true` : un compte désactivé perd l'accès.
 * Cela évite l'usurpation par simple coïncidence d'email.
 */
export async function getCurrentDbUser() {
  const authUser = await getCurrentUser();
  if (!authUser) return null;
  try {
    const { prisma } = await import('./prisma');

    // 1) Lien fort par authId.
    const linked = await prisma.user.findFirst({ where: { authId: authUser.id, active: true } });
    if (linked) return linked;

    // 2) Premier login : on lie un compte existant non encore relié (authId null).
    const email = authUser.email?.trim().toLowerCase();
    if (email) {
      const byEmail = await prisma.user.findFirst({
        where: { email, active: true, authId: null },
      });
      if (byEmail) {
        return prisma.user.update({ where: { id: byEmail.id }, data: { authId: authUser.id } });
      }
    }
    return null;
  } catch (e) {
    console.warn('[auth] getCurrentDbUser indisponible', e);
    return null;
  }
}

export type SessionUser = NonNullable<Awaited<ReturnType<typeof getCurrentDbUser>>>;

/**
 * Clause `where` Prisma garantissant qu'un audit appartient bien à l'auditeur
 * connecté. Un ADMIN voit tous les audits. À utiliser dans CHAQUE route qui
 * lit/modifie un audit (sinon n'importe quel compte connecté pourrait agir sur
 * l'audit d'un autre établissement).
 */
export function auditAccessWhere(id: string, user: SessionUser) {
  return user.role === 'ADMIN' ? { id } : { id, auditeurId: user.id };
}

/**
 * Vérifie l'accès à l'audit et renvoie son id, ou null si l'utilisateur n'y a
 * pas droit (ou s'il n'existe pas). Pour les routes qui ne chargent pas l'audit
 * complet (item, photo) mais doivent quand même contrôler la propriété.
 */
export async function assertAuditAccess(id: string, user: SessionUser): Promise<boolean> {
  const { prisma } = await import('./prisma');
  const found = await prisma.audit.findFirst({
    where: auditAccessWhere(id, user),
    select: { id: true },
  });
  return Boolean(found);
}
