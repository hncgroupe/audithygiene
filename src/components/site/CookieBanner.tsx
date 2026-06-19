'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Bandeau cookies conforme CNIL : aucun cookie/tag non essentiel avant consentement.
 * Le refus est aussi simple que l'acceptation. Le choix est stocké en localStorage.
 * Aucun script analytics/marketing n'est chargé tant que `consent !== 'accepted'`.
 */
const KEY = 'ah-cookie-consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function decide(choice: 'accepted' | 'refused') {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
    // Les tags marketing/analytics ne sont initialisés qu'ici si 'accepted'.
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-ink/10 bg-white p-5 shadow-card"
    >
      <p className="text-sm text-ink/80">
        Nous utilisons des cookies de mesure d'audience uniquement avec votre accord. Aucun cookie non
        essentiel n'est déposé sans consentement.{' '}
        <Link href="/confidentialite" className="font-medium text-vert-700 underline">
          En savoir plus
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={() => decide('accepted')} className="btn-primary text-sm">
          Accepter
        </button>
        <button onClick={() => decide('refused')} className="btn-ghost text-sm">
          Refuser
        </button>
      </div>
    </div>
  );
}
