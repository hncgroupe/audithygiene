'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TYPES, SITUATIONS, DELAIS, FORMULE, recommander } from '@/lib/audit-config';

function Card({
  selected,
  onClick,
  title,
  desc,
  check = false,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  desc?: string;
  check?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-left transition-all active:scale-[0.98] ${
        selected ? 'border-vert bg-vert-50 ring-1 ring-vert/40' : 'border-ink/12 bg-white hover:border-vert/40'
      }`}
    >
      {check && (
        <span
          className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border ${
            selected ? 'border-vert bg-vert text-white' : 'border-ink/25 bg-white'
          }`}
        >
          {selected && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      )}
      <span>
        <span className="block text-[13px] font-semibold leading-tight text-ink">{title}</span>
        {desc && <span className="mt-0.5 block text-[11px] leading-tight text-ink/70">{desc}</span>}
      </span>
    </button>
  );
}

function Step({ n, title, hint, children }: { n: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-vert text-[11px] font-bold text-white">
          {n}
        </span>
        <p className="text-sm font-semibold text-ink">
          {title} {hint && <span className="text-xs font-normal text-ink/60">{hint}</span>}
        </p>
      </div>
      {children}
    </div>
  );
}

export function Configurateur() {
  const [type, setType] = useState('');
  const [situations, setSituations] = useState<string[]>([]);
  const [delai, setDelai] = useState('');

  const toggleSituation = (id: string) =>
    setSituations((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const typeObj = TYPES.find((t) => t.id === type);
  const delaiObj = DELAIS.find((d) => d.id === delai);
  const selSituations = SITUATIONS.filter((s) => situations.includes(s.id));

  const reco = FORMULE[recommander(situations, '', '')];
  const express = delai === 'SUPER_URGENT';
  const ready = Boolean(type && situations.length && delai);

  const saveConfig = () => {
    const summary = {
      formule: reco.nom,
      prix: reco.prix,
      express,
      type: typeObj?.label,
      situations: selSituations.map((s) => s.label),
      delai: delaiObj ? `${delaiObj.label} (${delaiObj.desc})` : undefined,
      ids: { type, situations, delai },
    };
    try {
      sessionStorage.setItem('ah_config', JSON.stringify(summary));
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="configurateur" className="container-ah scroll-mt-24 py-14">
      <div className="max-w-3xl">
        <h2 className="section-title">Choisissez votre audit</h2>
        <p className="mt-3 text-lg text-ink/80">Trois questions, votre devis s'affiche en direct.</p>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Sélections */}
        <div className="space-y-5 rounded-2xl border border-ink/8 bg-white p-5 shadow-card">
          <Step n="1" title="Type d'établissement">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TYPES.map((t) => (
                <Card key={t.id} selected={type === t.id} onClick={() => setType(t.id)} title={t.label} desc={t.desc} />
              ))}
            </div>
          </Step>

          <Step n="2" title="Votre situation" hint="(plusieurs possibles)">
            <div className="grid gap-2 sm:grid-cols-2">
              {SITUATIONS.map((s) => (
                <Card key={s.id} check selected={situations.includes(s.id)} onClick={() => toggleSituation(s.id)} title={s.label} />
              ))}
            </div>
          </Step>

          <Step n="3" title="Délai souhaité">
            <div className="grid grid-cols-3 gap-2">
              {DELAIS.map((d) => (
                <Card key={d.id} selected={delai === d.id} onClick={() => setDelai(d.id)} title={d.label} desc={d.desc} />
              ))}
            </div>
          </Step>
        </div>

        {/* Récap live */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-ink/10 bg-ink text-white shadow-soft">
            <div className="border-b border-white/10 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-vert-300">Votre audit</p>
              <h3 className="mt-2 text-2xl font-bold">{reco.nom}</h3>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold">{reco.prix}</span>
                <span className="text-sm text-white/50">à partir de</span>
              </div>
            </div>

            <dl className="space-y-3 px-6 py-5 text-sm">
              <Row label="Établissement" value={typeObj?.label} />
              <Row
                label="Situation"
                value={selSituations.length ? selSituations.map((s) => s.label).join(', ') : undefined}
              />
              <Row label="Délai" value={delaiObj ? `${delaiObj.label} (${delaiObj.desc})` : undefined} />
              <Row label="Audit" value={reco.points} />
            </dl>

            {express && (
              <div className="mx-6 mb-4 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-vert-300">
                Intervention express sous 48 h, supplément urgence appliqué
              </div>
            )}

            <div className="space-y-2 px-6 pb-6">
              <Link
                href="/#rdv"
                onClick={saveConfig}
                className={`block w-full rounded-full px-5 py-3 text-center text-sm font-semibold transition-all ${
                  ready ? 'bg-vert text-white hover:bg-vert-600' : 'pointer-events-none bg-white/15 text-white/50'
                }`}
              >
                {ready ? 'Réserver cet audit' : 'Complétez la configuration'}
              </Link>
              <Link
                href="/#formules"
                className="block w-full rounded-full border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white/85 hover:border-white/30"
              >
                Comparer les formules
              </Link>
            </div>
          </div>
          <p className="mt-3 px-1 text-xs text-ink/70">
            Estimation indicative. Tarif final selon l'établissement. Label privé indépendant.
          </p>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-white/50">{label}</dt>
      <dd className={`text-right font-medium ${value ? 'text-white' : 'text-white/30'}`}>{value ?? 'À choisir'}</dd>
    </div>
  );
}
