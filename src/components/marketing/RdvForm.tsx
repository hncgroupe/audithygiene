'use client';

import { useRef, useState } from 'react';

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

const SITUATIONS = [
  'Ouverture d’établissement',
  'Préparation d’un contrôle',
  'Correction après un contrôle',
  'Audit de routine',
  'Reprise d’établissement',
  'Doute sur mes pratiques',
];

interface BanFeature {
  properties: { label: string; name: string; postcode: string; city: string };
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export function RdvForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [sugg, setSugg] = useState<BanFeature[]>([]);
  const [openSug, setOpenSug] = useState(false);
  const [situations, setSituations] = useState<string[]>([]);
  const sugTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onAdresse = (v: string) => {
    setAdresse(v);
    if (sugTimer.current) clearTimeout(sugTimer.current);
    if (v.trim().length < 3) return setSugg([]);
    sugTimer.current = setTimeout(async () => {
      try {
        const r = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(v)}&limit=5`);
        const d = await r.json();
        setSugg(d.features ?? []);
        setOpenSug(true);
      } catch {
        setSugg([]);
      }
    }, 250);
  };

  const pick = (s: BanFeature) => {
    setAdresse(s.properties.name || s.properties.label);
    setVille(s.properties.city);
    setCodePostal(s.properties.postcode);
    setSugg([]);
    setOpenSug(false);
  };

  const toggleSituation = (s: string) =>
    setSituations((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (!data.consentementRGPD) {
      setStatus('error');
      setError('Merci de cocher le consentement pour être recontacté.');
      return;
    }

    // Adresse + situations consolidées dans le message (rien de perdu)
    const entete = [
      adresse ? `Adresse : ${[adresse, codePostal, ville].filter(Boolean).join(' ')}` : '',
      situations.length ? `Situation : ${situations.join(', ')}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    const payload = {
      ...data,
      ville,
      departement: /^\d{2}/.test(codePostal) ? codePostal.slice(0, 2) : '',
      message: [entete, data.message].filter(Boolean).join('\n\n'),
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Une erreur est survenue.');
      }
      setStatus('success');
      form.reset();
      setAdresse('');
      setVille('');
      setCodePostal('');
      setSituations([]);
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
        <h3 className="mt-4 text-xl font-bold text-ink">Demande envoyée</h3>
        <p className="mt-2 text-ink/70">
          Merci. Nous vous recontactons très rapidement pour convenir d'un créneau d'audit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Type d'établissement" htmlFor="typeEtablissement">
          <select id="typeEtablissement" name="typeEtablissement" className={inputCls} required>
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

      {/* Situations (cases à cocher) */}
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink/80">Votre situation</legend>
        <div className="flex flex-wrap gap-2">
          {SITUATIONS.map((s) => {
            const on = situations.includes(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => toggleSituation(s)}
                className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                  on
                    ? 'border-transparent bg-vert text-white'
                    : 'border-ink/15 bg-white text-ink/75 hover:border-vert/40'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Adresse complète autocomplétée */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink/80">Adresse de l'établissement</label>
        <div className="relative">
          <input
            value={adresse}
            onChange={(e) => onAdresse(e.target.value)}
            onFocus={() => sugg.length && setOpenSug(true)}
            onBlur={() => setTimeout(() => setOpenSug(false), 150)}
            placeholder="Commencez à taper l'adresse…"
            autoComplete="off"
            className={inputCls}
          />
          {openSug && sugg.length > 0 && (
            <ul className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-ink/10 bg-white shadow-soft">
              {sugg.map((s, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pick(s)}
                    className="block w-full px-3.5 py-2.5 text-left text-sm hover:bg-vert-50"
                  >
                    <span className="font-medium text-ink">{s.properties.name}</span>
                    <span className="text-gris"> · {s.properties.postcode} {s.properties.city}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
          <input value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Ville" className={inputCls} />
          <input
            value={codePostal}
            onChange={(e) => setCodePostal(e.target.value)}
            placeholder="Code postal"
            inputMode="numeric"
            className={`${inputCls} w-28`}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Nom" htmlFor="nom">
          <input id="nom" name="nom" type="text" required className={inputCls} placeholder="Votre nom" />
        </Field>
        <Field label="Email" htmlFor="email">
          <input id="email" name="email" type="email" required className={inputCls} placeholder="vous@exemple.fr" />
        </Field>
        <Field label="Téléphone" htmlFor="telephone">
          <input id="telephone" name="telephone" type="tel" className={inputCls} placeholder="06 12 34 56 78" />
        </Field>
      </div>

      <Field label="Message (facultatif)" htmlFor="message">
        <textarea id="message" name="message" rows={2} className={inputCls} placeholder="Quelques mots sur votre établissement…" />
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
      <p className="text-center text-xs text-gris">Réponse rapide. Sans engagement. Label privé indépendant.</p>
    </form>
  );
}

const inputCls =
  'w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-gris/70 focus:border-vert focus:outline-none focus:ring-2 focus:ring-vert/20';

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink/80">{label}</label>
      {children}
    </div>
  );
}
