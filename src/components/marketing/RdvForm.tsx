'use client';

import { useEffect, useRef, useState } from 'react';
import { TYPES, SITUATIONS, DELAIS, FORMULE, recommander, label } from '@/lib/audit-config';

const TYPE_TO_ENUM: Record<string, string> = {
  RESTAURANT: 'RESTAURANT',
  RAPIDE: 'RESTAURATION_RAPIDE',
  DARK: 'DARK_KITCHEN',
  BOULANGERIE: 'BOULANGERIE',
  TRAITEUR: 'TRAITEUR',
  BAR: 'BAR',
  HOTEL: 'HOTEL_RESTAURANT',
  AUTRE: 'AUTRE',
};

interface BanFeature {
  properties: { label: string; name: string; postcode: string; city: string };
}
type Status = 'idle' | 'loading' | 'success' | 'error';

const inputCls =
  'w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-gris/70 focus:border-vert focus:outline-none focus:ring-2 focus:ring-vert/20';

function Chip({ on, onClick, title, desc, check = false }: { on: boolean; onClick: () => void; title: string; desc?: string; check?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-2 rounded-xl border px-3.5 py-2.5 text-left transition-all active:scale-[0.98] ${
        on ? 'border-vert bg-vert-50 ring-1 ring-vert/40' : 'border-ink/12 bg-white hover:border-vert/40'
      }`}
    >
      {check && (
        <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border ${on ? 'border-vert bg-vert text-white' : 'border-ink/25 bg-white'}`}>
          {on && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      )}
      <span>
        <span className="block text-sm font-medium text-ink">{title}</span>
        {desc && <span className="mt-0.5 block text-xs text-ink/70">{desc}</span>}
      </span>
    </button>
  );
}

export function RdvForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  // Questions audit (préremplies depuis le configurateur)
  const [type, setType] = useState('');
  const [situations, setSituations] = useState<string[]>([]);
  const [delai, setDelai] = useState('');
  const [formule, setFormule] = useState(''); // choix manuel (sinon = reco)

  // Coordonnées
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [sugg, setSugg] = useState<BanFeature[]>([]);
  const [openSug, setOpenSug] = useState(false);
  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const sugTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('ah_config');
      if (!raw) return;
      const c = JSON.parse(raw);
      if (c?.ids) {
        setType(c.ids.type ?? '');
        setSituations(Array.isArray(c.ids.situations) ? c.ids.situations : []);
        setDelai(c.ids.delai ?? '');
      }
    } catch {
      /* ignore */
    }
  }, []);

  const toggleSituation = (id: string) =>
    setSituations((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const recoKey = recommander(situations, '', '');
  const formuleKey = (formule || recoKey) as 'ESSENTIEL' | 'COMPLET';
  const reco = FORMULE[formuleKey];
  const express = delai === 'SUPER_URGENT';

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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nom.trim() || !email.trim() || !telephone.trim() || !adresse.trim()) {
      setStatus('error');
      setError('Nom, email, téléphone et adresse sont obligatoires.');
      return;
    }
    if (!consent) {
      setStatus('error');
      setError('Merci de cocher le consentement pour être recontacté.');
      return;
    }
    setStatus('loading');
    setError('');

    const message = [
      `Formule choisie : ${reco.nom} (${reco.prix})`,
      type ? `Type : ${label(TYPES, type)}` : '',
      situations.length ? `Situation : ${situations.map((id) => label(SITUATIONS, id)).join(', ')}` : '',
      delai ? `Délai : ${label(DELAIS, delai)}` : '',
      express ? 'Express 48 h demandé' : '',
      adresse ? `Adresse : ${[adresse, codePostal, ville].filter(Boolean).join(' ')}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom,
          email,
          telephone,
          ville,
          departement: /^\d{2}/.test(codePostal) ? codePostal.slice(0, 2) : '',
          typeEtablissement: TYPE_TO_ENUM[type] ?? '',
          besoin: express ? 'URGENT' : 'PREVENTIF',
          formule: reco.nom,
          message,
          source: 'rdv',
          consentementRGPD: 'true',
          consentementMarketing: marketing ? 'true' : '',
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Une erreur est survenue.');
      }
      setStatus('success');
      try {
        sessionStorage.removeItem('ah_config');
      } catch {
        /* ignore */
      }
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
        <p className="mt-2 text-ink/80">Merci. Nous vous recontactons très vite pour convenir d'un créneau.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
      {/* Choix de la formule */}
      <Block n="1" title="Votre formule" hint="(recommandée selon vos réponses, modifiable)">
        <div className="grid gap-2 sm:grid-cols-2">
          {(['ESSENTIEL', 'COMPLET'] as const).map((k) => {
            const f = FORMULE[k];
            const on = formuleKey === k;
            return (
              <button
                type="button"
                key={k}
                onClick={() => setFormule(k)}
                className={`rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.99] ${
                  on ? 'border-vert bg-vert-50 ring-1 ring-vert/30' : 'border-ink/12 bg-white hover:border-vert/40'
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-ink">{f.nom}</span>
                  <span className="text-lg font-extrabold text-ink">{f.prix}</span>
                </div>
                <p className="mt-1 text-xs text-ink/80">{f.points}</p>
                {recoKey === k && (
                  <span className="mt-2 inline-flex rounded-full bg-vert px-2 py-0.5 text-[10px] font-semibold text-white">
                    Recommandé
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Block>

      <div className="grid gap-6 lg:grid-cols-2">
        <Block n="2" title="Type d'établissement">
          <div className="grid grid-cols-2 gap-2">
            {TYPES.map((t) => (
              <Chip key={t.id} on={type === t.id} onClick={() => setType(t.id)} title={t.label} />
            ))}
          </div>
        </Block>

        <Block n="3" title="Votre situation" hint="(plusieurs possibles)">
          <div className="grid gap-2 sm:grid-cols-2">
            {SITUATIONS.map((s) => (
              <Chip key={s.id} check on={situations.includes(s.id)} onClick={() => toggleSituation(s.id)} title={s.label} />
            ))}
          </div>
        </Block>

        <Block n="4" title="Délai souhaité">
          <div className="grid grid-cols-3 gap-2">
            {DELAIS.map((d) => (
              <Chip key={d.id} on={delai === d.id} onClick={() => setDelai(d.id)} title={d.label} desc={d.desc} />
            ))}
          </div>
        </Block>
      </div>

      {/* Coordonnées */}
      <Block n="5" title="Vos coordonnées">
        <div className="grid gap-3 sm:grid-cols-3">
          <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom *" className={inputCls} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email *" className={inputCls} />
          <input value={telephone} onChange={(e) => setTelephone(e.target.value)} type="tel" placeholder="Téléphone *" className={inputCls} />
        </div>
        <div className="relative mt-3">
          <input
            value={adresse}
            onChange={(e) => onAdresse(e.target.value)}
            onFocus={() => sugg.length && setOpenSug(true)}
            onBlur={() => setTimeout(() => setOpenSug(false), 150)}
            placeholder="Adresse de l'établissement *"
            autoComplete="off"
            className={inputCls}
          />
          {openSug && sugg.length > 0 && (
            <ul className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-ink/10 bg-white shadow-soft">
              {sugg.map((s, i) => (
                <li key={i}>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => pick(s)} className="block w-full px-3.5 py-2.5 text-left text-sm hover:bg-vert-50">
                    <span className="font-medium text-ink">{s.properties.name}</span>
                    <span className="text-ink/70"> · {s.properties.postcode} {s.properties.city}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
          <input value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Ville" className={inputCls} />
          <input value={codePostal} onChange={(e) => setCodePostal(e.target.value)} placeholder="Code postal" inputMode="numeric" className={`${inputCls} w-28`} />
        </div>
      </Block>

      <label className="flex items-start gap-3 text-sm text-ink/80">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 rounded border-ink/30 text-vert focus:ring-vert" />
        <span>
          J'accepte d'être recontacté(e) par audit hygiène. Voir la{' '}
          <a href="/confidentialite" className="text-vert-700 underline">politique de confidentialité</a>.
        </span>
      </label>
      <label className="flex items-start gap-3 text-sm text-ink/80">
        <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1 h-4 w-4 rounded border-ink/30 text-vert focus:ring-vert" />
        <span>J'accepte de recevoir des conseils et actualités (facultatif).</span>
      </label>

      {status === 'error' && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-60">
        {status === 'loading' ? 'Envoi…' : 'Demander mon audit'}
      </button>
      <p className="text-center text-xs text-ink/70">Réponse rapide. Sans engagement. Label privé indépendant.</p>
    </form>
  );
}

function Block({ n, title, hint, children }: { n: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-vert text-xs font-bold text-white">
          {n}
        </span>
        <p className="text-base font-semibold text-ink">
          {title} {hint && <span className="text-sm font-normal text-ink/60">{hint}</span>}
        </p>
      </div>
      {children}
    </div>
  );
}
