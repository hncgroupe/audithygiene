/**
 * Le hero.
 *
 * Centré, et une seule action. La version précédente coupait la page en deux
 * colonnes, proposait deux boutons concurrents et affichait trois chiffres dont
 * un faux. Un visiteur qui arrive inquiet n'a pas besoin d'un choix, il a
 * besoin de savoir ce qu'on fait et combien ça coûte.
 */
import Link from 'next/link';
import Image from 'next/image';
import { FORMULES } from '@/lib/constants';
import { GRILLE_AUDIT } from '@/lib/grille-audit';

const NB_POINTS = GRILLE_AUDIT.reduce((a, t) => a + t.items.length, 0);
const PRIX = FORMULES.find((f) => f.id === 'essentiel')?.prix || '';

export function Hero() {
  return (
    <section className="relative -mt-[72px] overflow-hidden aurora">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-faint opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="container-ah relative pb-20 pt-[7rem] md:pb-24 md:pt-[9rem]">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold leading-[1.03] tracking-tightest text-ink sm:text-[4rem] sm:leading-[1] animate-fade-up">
            Savoir où vous en êtes,{' '}
            <span className="text-gradient-vert">avant le contrôle.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/80 animate-fade-up [animation-delay:80ms]">
            Un auditeur se déplace dans votre établissement, en Île-de-France, et contrôle les{' '}
            {NB_POINTS} points d&apos;une visite sanitaire. Vous recevez un rapport : chaque écart,
            la correction à apporter, sa priorité. C&apos;est tout, et ça suffit.
          </p>

          <div className="mt-9 flex justify-center animate-fade-up [animation-delay:160ms]">
            <Link href="/#rdv" className="btn-primary text-base">
              Demander mon audit
              <Arrow />
            </Link>
          </div>
          <p className="mt-4 text-sm font-medium text-ink/70 animate-fade-up [animation-delay:200ms]">
            {PRIX} · déplacement compris · devis avant intervention
          </p>

          <dl className="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/8 pt-7 animate-fade-up [animation-delay:240ms]">
            <Stat k={String(NB_POINTS)} l="points contrôlés" />
            <Stat k="2 h" l="sur place" />
            <Stat k="PDF" l="rapport et plan d’action" />
          </dl>
        </div>

        <div className="mx-auto mt-14 max-w-4xl animate-fade-up [animation-delay:120ms]">
          <div className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-ink/5">
            <Image
              src="/img/audit-tablette.jpg"
              alt="Auditrice contrôlant une cuisine professionnelle avec une tablette"
              width={1200}
              height={600}
              priority
              className="h-[240px] w-full object-cover sm:h-[340px]"
            />
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
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
