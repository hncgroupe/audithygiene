'use client';

import { useEffect, useRef, useState } from 'react';

const THEMES = [
  { nom: 'Chaîne du froid', val: 92 },
  { nom: 'Traçabilité', val: 78 },
  { nom: 'Nettoyage', val: 85 },
  { nom: 'PMS', val: 70 },
];
const SCORE = 84;

/**
 * Élément signature : aperçu de rapport avec score qui s'incrémente et barres
 * qui se remplissent au montage. Respecte prefers-reduced-motion (état final direct).
 */
export function ScoreCard() {
  const [progress, setProgress] = useState(0); // 0 -> 1
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const score = Math.round(SCORE * progress);

  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink/70">Aperçu de rapport</span>
        <span className="rounded-full bg-vert-50 px-3 py-1 text-xs font-semibold text-vert-700">Exemple</span>
      </div>
      <div className="mt-4 flex items-end gap-4">
        <div>
          <div className="text-5xl font-extrabold tabular-nums text-ink">
            {score}
            <span className="text-2xl text-ink/70">/100</span>
          </div>
          <div className="text-sm text-ink/70">Score global</div>
        </div>
        <div className="ml-auto rounded-xl bg-amber-50 px-3 py-2 text-right">
          <div className="text-lg font-bold text-amber-700">1</div>
          <div className="text-xs text-amber-700/80">cas critique</div>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {THEMES.map((t) => (
          <div key={t.nom}>
            <div className="flex justify-between text-sm">
              <span className="text-ink/80">{t.nom}</span>
              <span className="font-semibold tabular-nums text-ink">{Math.round(t.val * progress)}</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-ink/5">
              <div
                className="h-2 rounded-full bg-vert"
                style={{ width: `${t.val * progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[11px] leading-snug text-ink/70">
        Exemple. Les valeurs réelles proviennent de l'audit de votre établissement.
      </p>
    </div>
  );
}
