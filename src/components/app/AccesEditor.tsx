'use client';

import { useState } from 'react';

type Acces = 'HYGIENE' | 'RESTO360' | 'LES_DEUX';

const OPTIONS: { v: Acces; label: string }[] = [
  { v: 'HYGIENE', label: 'audit hygiène' },
  { v: 'RESTO360', label: 'auditresto360' },
  { v: 'LES_DEUX', label: 'les deux' },
];

export function AccesEditor({ userId, initial }: { userId: string; initial: Acces }) {
  const [acces, setAcces] = useState<Acces>(initial);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  async function choose(v: Acces) {
    if (v === acces || busy) return;
    const prev = acces;
    setAcces(v);
    setBusy(true);
    setError(false);
    setSaved(false);
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, acces: v }),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {
      setAcces(prev);
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex overflow-hidden rounded-lg border border-ink/12">
        {OPTIONS.map((o) => (
          <button
            key={o.v}
            type="button"
            disabled={busy}
            onClick={() => choose(o.v)}
            className={`px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-60 ${
              acces === o.v ? 'bg-vert text-white' : 'bg-white text-ink/70 hover:bg-vert-50'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {saved && <span className="text-xs font-medium text-vert-700">enregistré</span>}
      {error && <span className="text-xs font-medium text-red-600">erreur</span>}
    </div>
  );
}
