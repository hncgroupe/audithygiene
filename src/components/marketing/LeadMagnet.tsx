'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const POINTS = [
  'Un vrai modèle de rapport, anonymisé',
  'Notation, cas critiques et plan d’action',
  'Pour voir exactement ce que vous recevez',
];

/**
 * Lead magnet : capture email contre un exemple de rapport PDF.
 * Crée un lead (source dédiée) ; l'envoi de l'exemple se fait ensuite (Brevo).
 */
export function LeadMagnet() {
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    if (!consent) {
      setStatus('error');
      setError('Merci de cocher le consentement.');
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: email.split('@')[0] || 'Prospect',
          email: email.trim(),
          source: 'lead-magnet-rapport-exemple',
          message: 'Demande d’un exemple de rapport PDF',
          consentementRGPD: 'true',
          consentementMarketing: 'true',
        }),
      });
      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error(b.error ?? 'Une erreur est survenue.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  }

  return (
    <section className="container-ah py-24">
      <div className="overflow-hidden rounded-3xl border border-ink/8 bg-ink text-white">
        <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="section-title !text-white">Recevez un exemple de rapport</h2>
            <p className="mt-4 max-w-md text-white/65">
              Voyez à quoi ressemble notre rapport PDF avant même de réserver : notation, non-conformités
              et plan d'action. On vous l'envoie par email.
            </p>
            <ul className="mt-6 space-y-2.5">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-white/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-vert text-white">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5l4 4L19 7" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 sm:p-7">
            {status === 'success' ? (
              <div className="py-6 text-center text-ink">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-vert text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5l4.2 4.2L19 7" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-bold">C'est noté</h3>
                <p className="mt-1.5 text-sm text-ink/80">
                  Nous vous envoyons l'exemple de rapport par email très vite.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-3">
                <label className="block text-sm font-medium text-ink/80">Votre email professionnel</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@restaurant.fr"
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-3 text-sm text-ink placeholder:text-gris/70 focus:border-vert focus:outline-none focus:ring-2 focus:ring-vert/20"
                />
                <label className="flex items-start gap-2.5 text-xs text-ink/80">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-ink/30 text-vert focus:ring-vert"
                  />
                  <span>
                    J'accepte de recevoir l'exemple et d'être recontacté(e). Voir la{' '}
                    <a href="/confidentialite" className="text-vert-700 underline">politique de confidentialité</a>.
                  </span>
                </label>
                {status === 'error' && <p className="text-sm font-medium text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {status === 'loading' ? 'Envoi…' : 'Recevoir l’exemple de rapport'}
                </button>
                <p className="text-center text-xs text-ink/70">Gratuit. Sans engagement.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
