import Link from 'next/link';
import { ScoreCard } from './ScoreCard';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-vert-50 to-white">
      {/* Détail ambiant discret : halo vert très léger derrière la jauge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-vert/10 blur-3xl"
      />
      <div className="container-ah relative grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="animate-fade-up">
          <p className="eyebrow">Label privé · Île-de-France</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Anticipez le contrôle sanitaire,{' '}
            <span className="text-vert">ne le subissez pas.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink/70">
            Un auditeur passe dans votre restaurant, contrôle chaque point d'hygiène et vous laisse
            un rapport sans jargon : ce qui va, ce qui bloque, et quoi corriger en premier. Partout
            en Île-de-France.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#rdv" className="btn-primary">
              Réserver un audit
            </Link>
            <Link href="/#deroule" className="btn-ghost">
              Voir comment ça se passe
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink/70">
            <li className="flex items-center gap-2"><Check /> Auditeur sur place</li>
            <li className="flex items-center gap-2"><Check /> Rapport PDF complet</li>
            <li className="flex items-center gap-2"><Check /> Plan d'action priorisé</li>
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
