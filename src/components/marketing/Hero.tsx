import Link from 'next/link';
import { ScoreCard } from './ScoreCard';

export function Hero() {
  return (
    <section className="relative overflow-hidden aurora">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-faint opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="container-ah relative grid items-center gap-14 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28">
        <div>
          <span className="eyebrow animate-fade-up">
            <Pulse /> Label privé · France
          </span>
          <h1 className="mt-5 text-5xl font-bold leading-[1.03] tracking-tightest text-ink sm:text-[4rem] sm:leading-[0.98] animate-fade-up">
            Le contrôle d'hygiène ne devrait plus vous{' '}
            <span className="text-gradient-vert">faire peur.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65 animate-fade-up [animation-delay:80ms]">
            Mettez-vous en conformité avant lui. Un auditeur passe dans votre établissement, vérifie
            chaque point sur la base de la réglementation hygiène et HACCP, puis vous remet un rapport
            détaillé : chaque non-conformité, la correction à apporter, sa priorité et son délai.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 animate-fade-up [animation-delay:160ms]">
            <Link href="/#rdv" className="btn-primary text-base">
              Réserver un audit
              <Arrow />
            </Link>
            <Link href="/#deroule" className="btn-ghost text-base">
              Voir comment ça se passe
            </Link>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-ink/8 pt-7 animate-fade-up [animation-delay:240ms]">
            <Stat k="8" l="départements couverts" />
            <Stat k="12" l="thèmes d'audit" />
            <Stat k="PDF" l="rapport complet" />
          </dl>
        </div>

        <div className="animate-fade-up [animation-delay:120ms]">
          <ScoreCard />
        </div>
      </div>
    </section>
  );
}

function Stat({ k, l }: { k: string; l: string }) {
  return (
    <div>
      <dt className="text-2xl font-bold tracking-tight text-ink">{k}</dt>
      <dd className="mt-0.5 text-xs leading-snug text-ink/55">{l}</dd>
    </div>
  );
}

function Pulse() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vert opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-vert" />
    </span>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
