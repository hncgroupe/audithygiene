import Link from 'next/link';
import Image from 'next/image';
import { ScoreCard } from './ScoreCard';

export function Hero() {
  return (
    <section className="relative -mt-[72px] overflow-hidden aurora">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-faint opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="container-ah relative grid items-center gap-14 pb-20 pt-[7rem] md:grid-cols-[1.05fr_0.95fr] md:pb-28 md:pt-[9rem]">
        <div>
          <h1 className="text-5xl font-bold leading-[1.03] tracking-tightest text-ink sm:text-[4rem] sm:leading-[0.98] animate-fade-up">
            Le contrôle d'hygiène ne devrait plus vous{' '}
            <span className="text-gradient-vert">faire peur.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80 animate-fade-up [animation-delay:80ms]">
            Mettez-vous en conformité avant lui. Un auditeur se déplace partout en France, vérifie
            chaque point sur la base de la réglementation hygiène et HACCP, puis vous remet un rapport
            détaillé : chaque non-conformité, la correction à apporter, sa priorité et son délai.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 animate-fade-up [animation-delay:160ms]">
            <Link href="/#configurateur" className="btn-primary text-base">
              Configurer mon audit
              <Arrow />
            </Link>
            <Link href="/#rapport" className="btn-ghost text-base">
              Voir un exemple de rapport
            </Link>
          </div>
          <p className="mt-4 text-sm font-medium text-ink/70 animate-fade-up [animation-delay:200ms]">
            Devis en 30 secondes · à partir de 690 € · sans engagement
          </p>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-ink/8 pt-7 animate-fade-up [animation-delay:240ms]">
            <Stat k="2h" l="audit sur place" />
            <Stat k="50" l="points de contrôle" />
            <Stat k="PDF" l="rapport + plan d'action" />
          </dl>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-ink/5">
            <Image
              src="https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?auto=format&fit=crop&w=1200&q=80"
              alt="Cuisine professionnelle d'un restaurant en service"
              width={1200}
              height={1400}
              priority
              className="h-[400px] w-full object-cover sm:h-[520px]"
            />
          </div>
          <div className="mx-auto -mt-16 w-[290px] sm:absolute sm:-bottom-6 sm:-left-6 sm:mx-0 sm:mt-0">
            <ScoreCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, l }: { k: string; l: string }) {
  return (
    <div>
      <dt className="text-2xl font-bold tracking-tight text-ink">{k}</dt>
      <dd className="mt-0.5 text-xs leading-snug text-ink/75">{l}</dd>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
