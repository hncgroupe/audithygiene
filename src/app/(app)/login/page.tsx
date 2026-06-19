import type { Metadata } from 'next';
import { Logo } from '@/components/site/Logo';

export const metadata: Metadata = {
  title: 'Connexion',
  robots: { index: false, follow: false },
};

/**
 * Écran de connexion auditeurs (Supabase Auth, email + mot de passe).
 * Le formulaire poste vers /api/auth/login qui ouvre la session.
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const messages: Record<string, string> = {
    invalid: 'Email ou mot de passe incorrect.',
    missing: 'Renseignez votre email et votre mot de passe.',
    config: 'Authentification indisponible (configuration Supabase manquante).',
  };
  const errorMessage = error ? messages[error] ?? 'Connexion impossible.' : null;

  return (
    <div className="grid min-h-screen place-items-center bg-vert-50/40 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-8 shadow-soft">
        <Logo />
        <h1 className="mt-6 text-xl font-bold text-ink">Espace auditeurs</h1>
        <p className="mt-1 text-sm text-ink/60">Connectez-vous pour accéder à l'outil d'audit.</p>

        {errorMessage && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
        )}

        <form className="mt-6 space-y-4" action="/api/auth/login" method="post">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink/80">Email</label>
            <input id="email" name="email" type="email" required
              className="w-full rounded-xl border border-ink/15 px-3.5 py-2.5 text-sm focus:border-vert focus:outline-none focus:ring-2 focus:ring-vert/20"
              placeholder="auditeur@audithygiene.fr" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink/80">Mot de passe</label>
            <input id="password" name="password" type="password" required
              className="w-full rounded-xl border border-ink/15 px-3.5 py-2.5 text-sm focus:border-vert focus:outline-none focus:ring-2 focus:ring-vert/20" />
          </div>
          <button type="submit" className="btn-primary w-full">Se connecter</button>
        </form>

        <p className="mt-4 text-center text-xs text-gris">
          Accès réservé aux auditeurs habilités.
        </p>
      </div>
    </div>
  );
}
