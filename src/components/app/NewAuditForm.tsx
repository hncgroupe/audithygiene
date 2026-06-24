'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { compressImage } from '@/lib/photo-queue';

/** Blob -> dataURL base64, pour transmettre le logo dans le corps JSON. */
function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(blob);
  });
}

const TYPES = [
  ['RESTAURANT', 'Restaurant'],
  ['RESTAURATION_RAPIDE', 'Restauration rapide'],
  ['DARK_KITCHEN', 'Dark kitchen'],
  ['BOULANGERIE', 'Boulangerie'],
  ['TRAITEUR', 'Traiteur'],
  ['HOTEL_RESTAURANT', 'Hôtel-restaurant'],
  ['BAR', 'Bar'],
  ['AUTRE', 'Autre'],
] as const;

const field =
  'w-full rounded-xl border border-ink/15 px-3.5 py-2.5 text-[15px] focus:border-vert focus:outline-none focus:ring-2 focus:ring-vert/20';

interface BanFeature {
  properties: { label: string; name: string; postcode: string; city: string; context: string };
}

export function NewAuditForm() {
  const router = useRouter();
  const [marque, setMarque] = useState<'AUDIT_HYGIENE' | 'AUDITRESTO360'>('AUDIT_HYGIENE');
  const [f, setF] = useState({
    nom: '',
    adresse: '',
    ville: '',
    codePostal: '',
    type: 'RESTAURANT',
    dateHeure: '',
  });
  const [emails, setEmails] = useState<string[]>(['']);
  const [logo, setLogo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLogo = async (file: File | undefined) => {
    if (!file) return;
    try {
      // Compression légère (logo petit) avant envoi en base64.
      const blob = await compressImage(file, 600, 0.85).catch(() => file);
      setLogo(await blobToDataUrl(blob));
    } catch {
      setError('Logo illisible, réessayez avec une autre image.');
    }
  };

  // Autocomplétion adresse (Base Adresse Nationale - gratuit, sans clé)
  const [suggestions, setSuggestions] = useState<BanFeature[]>([]);
  const [openSug, setOpenSug] = useState(false);
  const sugTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    setF((p) => ({ ...p, dateHeure: d.toISOString().slice(0, 16) }));
  }, []);

  useEffect(
    () => () => {
      if (sugTimer.current) clearTimeout(sugTimer.current);
      if (blurTimer.current) clearTimeout(blurTimer.current);
    },
    []
  );

  const onAdresseChange = (value: string) => {
    setF((p) => ({ ...p, adresse: value }));
    if (sugTimer.current) clearTimeout(sugTimer.current);
    if (value.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    sugTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(value)}&limit=5`
        );
        const data = await res.json();
        setSuggestions(data.features ?? []);
        setOpenSug(true);
      } catch {
        setSuggestions([]);
      }
    }, 250);
  };

  const pickSuggestion = (s: BanFeature) => {
    const p = s.properties;
    setF((prev) => ({
      ...prev,
      adresse: p.name || p.label,
      ville: p.city,
      codePostal: p.postcode,
    }));
    setSuggestions([]);
    setOpenSug(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.nom.trim()) return setError('Le nom du restaurant est requis.');
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, marque, logo, emails: emails.map((e) => e.trim()).filter(Boolean) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erreur');
      router.push(`/app/audits/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de démarrer.');
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="fixed inset-0 z-40 flex flex-col bg-vert-50/30">
      {/* En-tête épinglé */}
      <div className="shrink-0 border-b border-ink/10 bg-white">
        <div className="container-ah flex items-center gap-3 py-2.5">
          <Link href="/app/audits" className="text-sm text-gris hover:text-ink" aria-label="Retour">
            ←
          </Link>
          <div>
            <h1 className="text-base font-bold tracking-tight text-ink">Démarrer un audit</h1>
            <p className="text-xs text-gris">Renseignez l’établissement, puis lancez le contrôle.</p>
          </div>
        </div>
      </div>

      {/* Champs (page fixe, bouton toujours visible en bas) */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="container-ah mx-auto max-w-lg space-y-3 py-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Type d&apos;audit</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMarque('AUDIT_HYGIENE')}
              className={`rounded-xl border-2 p-3 text-left transition-all active:scale-[0.99] ${
                marque === 'AUDIT_HYGIENE'
                  ? 'border-vert bg-vert-50 ring-1 ring-vert/30'
                  : 'border-ink/12 bg-white hover:border-vert/40'
              }`}
            >
              <span className="block text-sm font-bold text-ink">audit hygiène</span>
              <span className="mt-0.5 block text-xs text-ink/70">Hygiène &amp; HACCP, notation conformité</span>
            </button>
            <button
              type="button"
              onClick={() => setMarque('AUDITRESTO360')}
              className={`rounded-xl border-2 p-3 text-left transition-all active:scale-[0.99] ${
                marque === 'AUDITRESTO360'
                  ? 'border-[#F97316] bg-orange-50 ring-1 ring-[#F97316]/30'
                  : 'border-ink/12 bg-white hover:border-[#F97316]/40'
              }`}
            >
              <span className="block text-sm font-bold text-ink">auditresto360</span>
              <span className="mt-0.5 block text-xs text-ink/70">Audit 360, 10 piliers notés /100</span>
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Nom du restaurant</label>
          <input
            autoFocus
            value={f.nom}
            onChange={(e) => setF({ ...f, nom: e.target.value })}
            placeholder="Ex. Le Bistrot du Marché"
            className={field}
          />
        </div>

        {/* Bandeau adresse : recherche autocomplétée + ville/CP remplis automatiquement */}
        <div className="rounded-xl border border-ink/10 bg-vert-50/30 p-3">
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Adresse</label>
          <div className="relative">
            <input
              value={f.adresse}
              onChange={(e) => onAdresseChange(e.target.value)}
              onFocus={() => suggestions.length && setOpenSug(true)}
              onBlur={() => {
                blurTimer.current = setTimeout(() => setOpenSug(false), 150);
              }}
              placeholder="Commencez à taper l’adresse…"
              autoComplete="off"
              className={field}
            />
            {openSug && suggestions.length > 0 && (
              <ul className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-ink/10 bg-white shadow-soft">
                {suggestions.map((s, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => pickSuggestion(s)}
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
            <div>
              <label className="mb-1 block text-xs font-medium text-gris">Ville</label>
              <input
                value={f.ville}
                onChange={(e) => setF({ ...f, ville: e.target.value })}
                placeholder="Ville"
                className={field}
              />
            </div>
            <div className="w-28">
              <label className="mb-1 block text-xs font-medium text-gris">Code postal</label>
              <input
                value={f.codePostal}
                onChange={(e) => setF({ ...f, codePostal: e.target.value })}
                placeholder="75000"
                inputMode="numeric"
                className={field}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Logo du client (optionnel)</label>
          <p className="mb-2 text-xs text-gris">Il apparaîtra sur la couverture du rapport.</p>
          <div className="flex items-center gap-3">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt="Logo client"
                className="h-14 w-14 rounded-lg border border-ink/10 bg-white object-contain p-1"
              />
            ) : (
              <div className="grid h-14 w-14 place-items-center rounded-lg border border-dashed border-ink/20 text-xs text-gris">
                Logo
              </div>
            )}
            <label className="cursor-pointer rounded-xl border border-ink/15 px-3.5 py-2 text-sm font-medium text-ink/80 hover:border-vert hover:text-vert">
              {logo ? 'Changer' : 'Ajouter un logo'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onLogo(e.target.files?.[0])}
              />
            </label>
            {logo && (
              <button
                type="button"
                onClick={() => setLogo(null)}
                className="text-sm text-gris hover:text-red-600"
              >
                Retirer
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Type d’établissement</label>
          <select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })} className={field}>
            {TYPES.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Date et heure</label>
          <input
            type="datetime-local"
            value={f.dateHeure}
            onChange={(e) => setF({ ...f, dateHeure: e.target.value })}
            className={field}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Emails de réception du rapport</label>
          <div className="space-y-2">
            {emails.map((em, i) => {
              const isLast = i === emails.length - 1;
              return (
                <div key={i} className="flex gap-2">
                  <input
                    type="email"
                    value={em}
                    onChange={(e) => setEmails(emails.map((v, j) => (j === i ? e.target.value : v)))}
                    placeholder={i === 0 ? 'gerant@restaurant.fr' : 'autre@email.fr'}
                    className={field}
                  />
                  {emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setEmails(emails.filter((_, j) => j !== i))}
                      className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-ink/15 text-lg text-gris hover:border-red-300 hover:text-red-600"
                      aria-label="Retirer cet email"
                    >
                      ×
                    </button>
                  )}
                  {isLast && (
                    <button
                      type="button"
                      onClick={() => setEmails([...emails, ''])}
                      className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-vert/30 bg-vert-50 text-lg font-semibold text-vert-700 hover:bg-vert-100"
                      aria-label="Ajouter un email"
                    >
                      +
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-1.5 text-xs text-gris">Le rapport PDF sera envoyé à toutes ces adresses.</p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>

      {/* Barre d'action épinglée */}
      <div className="shrink-0 border-t border-ink/10 bg-white">
        <div className="container-ah mx-auto max-w-lg py-3">
          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
            {busy ? 'Démarrage…' : 'Commencer l’audit'}
          </button>
        </div>
      </div>
    </form>
  );
}
