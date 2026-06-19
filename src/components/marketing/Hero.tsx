import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-vert-50 to-white">
      <div className="container-ah grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="animate-fade-up">
          <p className="eyebrow">Label privé · Île-de-France</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Anticipez le contrôle sanitaire,{' '}
            <span className="text-vert">ne le subissez pas.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink/70">
            audit hygiène contrôle votre restaurant sur la base de la réglementation HACCP et vous
            remet un rapport clair : notation, cas critiques et plan d'action. Partout en
            Île-de-France.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#rdv" className="btn-primary">
              Réserver un audit
            </Link>
            <Link href="/#deroule" className="btn-ghost">
              Voir comment ça marche
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink/70">
            <li className="flex items-center gap-2"><Check /> Auditeur sur place</li>
            <li className="flex items-center gap-2"><Check /> Rapport PDF complet</li>
            <li className="flex items-center gap-2"><Check /> Plan correctif priorisé</li>
          </ul>
        </div>

        <div className="animate-fade-up [animation-delay:120ms]">
          <ScoreCard />
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#D1FAE5" />
      <path d="M7 12.5l3.2 3.2L17 9" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Aperçu visuel d'un rapport - illustratif, données fictives marquées comme exemple. */
function ScoreCard() {
  const themes = [
    { nom: 'Chaîne du froid', val: 92 },
    { nom: 'Traçabilité', val: 78 },
    { nom: 'Nettoyage', val: 85 },
    { nom: 'PMS', val: 70 },
  ];
  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gris">Exemple de rapport</span>
        <span className="rounded-full bg-vert-50 px-3 py-1 text-xs font-semibold text-vert-700">Aperçu</span>
      </div>
      <div className="mt-4 flex items-end gap-4">
        <div>
          <div className="text-5xl font-extrabold text-ink">84<span className="text-2xl text-gris">/100</span></div>
          <div className="text-sm text-gris">Score global</div>
        </div>
        <div className="ml-auto rounded-xl bg-amber-50 px-3 py-2 text-right">
          <div className="text-lg font-bold text-amber-700">1</div>
          <div className="text-xs text-amber-700/80">cas critique</div>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {themes.map((t) => (
          <div key={t.nom}>
            <div className="flex justify-between text-sm">
              <span className="text-ink/70">{t.nom}</span>
              <span className="font-semibold text-ink">{t.val}</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-ink/5">
              <div className="h-2 rounded-full bg-vert" style={{ width: `${t.val}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[11px] leading-snug text-gris">
        Exemple illustratif. Les valeurs réelles proviennent de l'audit de votre établissement.
      </p>
    </div>
  );
}
