'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputCls =
  'w-full rounded-xl border border-ink/15 bg-white px-3.5 py-3 text-sm text-ink placeholder:text-gris/70 focus:border-vert focus:outline-none focus:ring-2 focus:ring-vert/20';

/* Limite de longueur du message, en miroir de MESSAGE_MAX dans
   src/lib/validation.ts. Volontairement recopiée plutôt qu'importée : importer
   le schéma ici embarquerait Zod dans le bundle client pour un seul nombre.

   Pas de `maxLength` sur le textarea : l'attribut tronque un collage SANS rien
   dire, et le visiteur envoie un message amputé en croyant l'avoir écrit en
   entier. On préfère un compteur visible, et un serveur qui tronque en le
   signalant plutôt que de refuser. */
const MESSAGE_MAX = 2000;

const TYPES = [
  { v: '', label: 'Type d\'établissement (facultatif)' },
  { v: 'RESTAURANT', label: 'Restaurant' },
  { v: 'RESTAURATION_RAPIDE', label: 'Restauration rapide' },
  { v: 'DARK_KITCHEN', label: 'Dark kitchen' },
  { v: 'BOULANGERIE', label: 'Boulangerie' },
  { v: 'TRAITEUR', label: 'Traiteur' },
  { v: 'HOTEL_RESTAURANT', label: 'Hôtel-restaurant' },
  { v: 'BAR', label: 'Bar' },
  { v: 'AUTRE', label: 'Autre' },
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    /* Un message qui liste plusieurs champs oblige le visiteur à deviner lequel
       pose problème. On nomme celui qui manque, et un seul à la fois. */
    if (!nom.trim()) {
      setStatus('error');
      setError('Merci d’indiquer votre nom : c’est ainsi que nous vous appellerons.');
      return;
    }
    if (!email.trim()) {
      setStatus('error');
      setError('Merci d’indiquer votre email : c’est là que part notre réponse.');
      return;
    }
    if (!consent) {
      setStatus('error');
      setError('Merci de cocher le consentement pour être recontacté.');
      return;
    }
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom,
          email,
          telephone,
          typeEtablissement: type,
          message,
          source: 'contact',
          consentementRGPD: 'true',
          website,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Une erreur est survenue.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-vert/30 bg-vert-50 p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-vert text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12.5l4.2 4.2L19 7"
              stroke="white"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink">Message envoyé</h3>
        <p className="mt-2 text-ink/80">
          Merci. Votre demande nous est parvenue, nous vous recontactons très vite.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom *"
          autoComplete="name"
          className={inputCls}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email *"
          autoComplete="email"
          className={inputCls}
        />
        <input
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          type="tel"
          placeholder="Téléphone"
          autoComplete="tel"
          className={inputCls}
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
          {TYPES.map((t) => (
            <option key={t.v} value={t.v}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Votre message (votre besoin, votre établissement, votre ville)"
          rows={4}
          className={inputCls}
        />
        {message.length > MESSAGE_MAX - 300 && (
          <p className={`mt-1 text-xs ${message.length > MESSAGE_MAX ? 'text-red-600' : 'text-ink/60'}`}>
            {message.length > MESSAGE_MAX
              ? `Message très long : seuls les ${MESSAGE_MAX} premiers caractères seront transmis. Votre demande part quand même.`
              : `${MESSAGE_MAX - message.length} caractères restants.`}
          </p>
        )}
      </div>

      {/* Honeypot anti-spam : champ caché, doit rester vide */}
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="flex items-start gap-3 text-sm text-ink/80">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-ink/30 text-vert focus:ring-vert"
        />
        <span>
          J'accepte d'être recontacté(e) par audit hygiène au sujet de ma demande. Voir la{' '}
          <a href="/confidentialite" className="text-vert-700 underline">
            politique de confidentialité
          </a>
          .
        </span>
      </label>

      {status === 'error' && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === 'loading' ? 'Envoi…' : 'Envoyer ma demande'}
      </button>
      <p className="text-center text-xs text-ink/70">
        Réponse rapide. Sans engagement. Label privé indépendant.
      </p>
    </form>
  );
}
