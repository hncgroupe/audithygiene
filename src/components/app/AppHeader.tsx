'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/site/Logo';

const NAV = [
  ['/app', 'Tableau de bord'],
  ['/app/leads', 'Leads'],
  ['/app/audits', 'Audits'],
  ['/app/etablissements', 'Établissements'],
] as const;

/**
 * En-tête de l'espace auditeur.
 * - Desktop : logo + navigation à gauche, email + déconnexion à droite.
 * - Mobile : logo centré, bouton menu à droite ouvrant un panneau simple.
 */
export function AppHeader({ email }: { email: string }) {
  const [open, setOpen] = useState(false);

  const Logout = (
    <form action="/api/auth/logout" method="post">
      <button type="submit" className="text-sm font-medium text-ink/60 hover:text-vert-700">
        Déconnexion
      </button>
    </form>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-white">
      <div className="container-ah">
        {/* Desktop */}
        <div className="hidden h-16 items-center justify-between md:flex">
          <div className="flex items-center gap-8">
            <Logo className="shrink-0" />
            <nav className="flex items-center gap-6 text-sm font-medium text-ink/70">
              {NAV.map(([href, label]) => (
                <Link key={href} href={href} className="hover:text-vert-700">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gris">{email}</span>
            {Logout}
          </div>
        </div>

        {/* Mobile : logo centré, bouton menu à droite */}
        <div className="grid h-14 grid-cols-3 items-center md:hidden">
          <span />
          <div className="flex justify-center">
            <Logo className="shrink-0" />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-ink/5"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-0.5 w-5 rounded bg-ink" />
                <span className="block h-0.5 w-5 rounded bg-ink" />
                <span className="block h-0.5 w-5 rounded bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Panneau mobile */}
      {open && (
        <div className="border-t border-ink/10 bg-white md:hidden">
          <nav className="container-ah flex flex-col py-2">
            {NAV.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-[15px] font-medium text-ink hover:bg-vert-50"
              >
                {label}
              </Link>
            ))}
            <div className="mt-1 flex items-center justify-between border-t border-ink/10 px-2 pt-3">
              <span className="text-sm text-gris">{email}</span>
              {Logout}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
