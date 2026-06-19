'use client';

import { useState } from 'react';

const TYPES = [
  { value: 'RESTAURANT', label: 'Restaurant' },
  { value: 'RESTAURATION_RAPIDE', label: 'Restauration rapide' },
  { value: 'DARK_KITCHEN', label: 'Dark kitchen' },
  { value: 'BOULANGERIE', label: 'Boulangerie / snacking' },
  { value: 'TRAITEUR', label: 'Traiteur' },
  { value: 'HOTEL_RESTAURANT', label: 'Hôtel-restaurant' },
  { value: 'BAR', label: 'Bar' },
  { value: 'AUTRE', label: 'Autre' },
];

const DEPTS = ['75', '92', '93', '94', '77', '78', '91', '95'];

type Status = 'idle' | 'loading' | 'success' | 'error';

export function RdvForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.consentementRGPD) {
      setStatus('error');
      setError('Merci de cocher le consentement pour être recontacté.');
      return;
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Une erreur est survenue.');
      }
      setStatus('success');
      form.reset();
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
            <path d="M5 12.5l4.2 4.2L19 7" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink">Demande envoyée 🎉</h3>
        <p className="mt-2 text-ink/70">
          Merci ! Nous vous recontactons très rapidement pour convenir d'un créneau d'audit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
      {/* Qualification */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Type d'établissement" htmlFor="typeEtablissement">
          <select id="typeEtablissement" name="typeEtablissement" className={selectCls} required>
            <option value="">Sélectionner…</option>
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Nombre de couverts" htmlFor="nombreCouverts">
          <input id="nombreCouverts" name="nombreCouverts" type="number" min={0} placeholder="ex : 60" className={inputCls} />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink/80">Votre besoin</legend>
        <div className="flex gap-3">
          <Radio name="besoin" value="URGENT" label="Urgent" />
          <Radio name="besoin" value="PREVENTIF" label="Préventif" />
        </div>
      </fieldset>

      {/* Coordonnées */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nom" htmlFor="nom">
          <input id="nom" name="nom" type="text" required className={inputCls} placeholder="Votre nom" />
        </Field>
        <Field label="Email" htmlFor="email">
          <input id="email" name="email" type="email" required className={inputCls} placeholder="vous@exemple.fr" />
        </Field>
        <Field label="Téléphone" htmlFor="telephone">
          <input id="telephone" name="telephone" type="tel" className={inputCls} placeholder="06 12 34 56 78" />
        </Field>
        <Field label="Département" htmlFor="departement">
          <select id="departement" name="departement" className={selectCls}>
            <option value="">Sélectionner…</option>
            {DEPTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Ville" htmlFor="ville">
        <input id="ville" name="ville" type="text" className={inputCls} placeholder="ex : Paris 11e" />
      </Field>

      <Field label="Message (facultatif)" htmlFor="message">
        <textarea id="message" name="message" rows={3} className={inputCls} placeholder="Quelques mots sur votre situation…" />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink/70">
        <input type="checkbox" name="consentementRGPD" value="true" className="mt-1 h-4 w-4 rounded border-ink/30 text-vert focus:ring-vert" />
        <span>
          J'accepte d'être recontacté(e) par audit hygiène concernant ma demande. Mes données sont
          traitées conformément à la{' '}
          <a href="/confidentialite" className="text-vert-700 underline">politique de confidentialité</a>.
        </span>
      </label>

      <label className="flex items-start gap-3 text-sm text-ink/60">
        <input type="checkbox" name="consentementMarketing" value="true" className="mt-1 h-4 w-4 rounded border-ink/30 text-vert focus:ring-vert" />
        <span>J'accepte de recevoir des conseils et actualités (facultatif, désinscription à tout moment).</span>
      </label>

      {status === 'error' && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-60">
        {status === 'loading' ? 'Envoi…' : 'Demander mon audit'}
      </button>
      <p className="text-center text-xs text-gris">
        Réponse rapide. Sans engagement. Label privé indépendant.
      </p>
    </form>
  );
}

const inputCls =
  'w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-gris/70 focus:border-vert focus:outline-none focus:ring-2 focus:ring-vert/20';
const selectCls = inputCls;

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink/80">{label}</label>
      {children}
    </div>
  );
}

function Radio({ name, value, label }: { name: string; value: string; label: string }) {
  return (
    <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-ink/15 px-4 py-2.5 text-sm font-medium text-ink/80 transition has-[:checked]:border-vert has-[:checked]:bg-vert-50 has-[:checked]:text-vert-700">
      <input type="radio" name={name} value={value} className="sr-only" />
      {label}
    </label>
  );
}
