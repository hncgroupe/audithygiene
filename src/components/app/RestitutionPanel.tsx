'use client';

import { useState } from 'react';
import type { RestitutionIA } from '@/lib/restitution';

const ORANGE = '#F97316';

function Liste({ titre, items, couleur }: { titre: string; items: string[]; couleur?: string }) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="text-sm font-bold text-ink">{titre}</h3>
      <ul className="mt-2 space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm text-ink/80">
            <span
              aria-hidden
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: couleur ?? ORANGE }}
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RestitutionPanel({
  auditId,
  initial,
}: {
  auditId: string;
  initial: RestitutionIA | null;
}) {
  const [data, setData] = useState<RestitutionIA | null>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generer() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/audits/${auditId}/restitution`, { method: 'POST' });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? 'Échec de la génération.');
      setData(body.restitution as RestitutionIA);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Échec de la génération.');
    } finally {
      setLoading(false);
    }
  }

  if (!data) {
    return (
      <section className="rounded-3xl border border-dashed border-[#F97316]/40 bg-orange-50/40 p-6 text-center sm:p-8 print:hidden">
        <h2 className="text-lg font-bold text-ink">Restitution du consultant (IA)</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink/70">
          Génère une analyse rédigée à partir des notes, commentaires et échanges : synthèse, points
          forts, axes, feuille de route 30/60/90 jours, gains potentiels et risques.
        </p>
        <button
          onClick={generer}
          disabled={loading}
          className="mt-4 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-60"
          style={{ backgroundColor: ORANGE }}
        >
          {loading ? 'Génération en cours…' : 'Générer la restitution'}
        </button>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-bold text-ink">Restitution du consultant</h2>
        <button
          onClick={generer}
          disabled={loading}
          className="text-xs font-medium text-gris hover:text-[#F97316] disabled:opacity-50 print:hidden"
        >
          {loading ? '…' : 'Régénérer'}
        </button>
      </div>

      {data.synthese && <p className="mt-3 text-[15px] leading-relaxed text-ink/85">{data.synthese}</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Liste titre="Points forts" items={data.pointsForts} couleur="#16A34A" />
        <Liste titre="Axes d'amélioration" items={data.axes} couleur={ORANGE} />
      </div>

      {(data.roadmap.j30.length || data.roadmap.j60.length || data.roadmap.j90.length) > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-bold text-ink">Feuille de route</h3>
          <div className="mt-2 grid gap-4 sm:grid-cols-3">
            <Liste titre="30 jours" items={data.roadmap.j30} />
            <Liste titre="60 jours" items={data.roadmap.j60} />
            <Liste titre="90 jours" items={data.roadmap.j90} />
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {data.gains && (
          <div className="rounded-2xl bg-vert-50 p-4">
            <h3 className="text-sm font-bold text-ink">Gains potentiels</h3>
            <p className="mt-1 text-sm text-ink/80">{data.gains}</p>
          </div>
        )}
        {data.risques && (
          <div className="rounded-2xl bg-red-50 p-4">
            <h3 className="text-sm font-bold text-ink">Risques si rien n'est fait</h3>
            <p className="mt-1 text-sm text-ink/80">{data.risques}</p>
          </div>
        )}
      </div>

      <p className="mt-4 text-[11px] text-gris">
        Analyse générée automatiquement à partir des constats de l'audit. À relire par l'auditeur
        avant transmission. auditresto360 est un label privé indépendant.
      </p>
    </section>
  );
}
