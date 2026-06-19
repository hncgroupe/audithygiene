import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Logo } from '@/components/site/Logo';

/**
 * Shell de l'espace opérationnel (app.audithygiene.fr).
 * Protégé : si aucun utilisateur authentifié, redirection vers /login.
 * Indexation interdite (voir robots.ts disallow /app).
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen bg-vert-50/30">
      <header className="border-b border-ink/10 bg-white">
        <div className="container-ah flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden items-center gap-6 text-sm font-medium text-ink/70 md:flex">
              <Link href="/app" className="hover:text-vert-700">Tableau de bord</Link>
              <Link href="/app/leads" className="hover:text-vert-700">Leads</Link>
              <Link href="/app/audits" className="hover:text-vert-700">Audits</Link>
              <Link href="/app/etablissements" className="hover:text-vert-700">Établissements</Link>
            </nav>
          </div>
          <span className="text-sm text-gris">{user.email}</span>
        </div>
      </header>
      <main className="container-ah py-10">{children}</main>
    </div>
  );
}
