import { redirect } from 'next/navigation';
import { getCurrentDbUser } from '@/lib/auth';
import { AppHeader } from '@/components/app/AppHeader';
import { ServiceWorkerCleanup } from '@/components/app/ServiceWorkerCleanup';

/**
 * Shell de l'espace opérationnel (app.audithygiene.fr).
 * Protégé : si aucun utilisateur authentifié, redirection vers /login.
 * Indexation interdite (voir robots.ts disallow /app).
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentDbUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen bg-vert-50/30">
      <ServiceWorkerCleanup />
      <AppHeader email={user.email ?? ''} isAdmin={user.role === 'ADMIN'} />
      <main className="container-ah py-10">{children}</main>
    </div>
  );
}
