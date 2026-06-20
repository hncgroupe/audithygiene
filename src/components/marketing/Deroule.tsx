import { DEROULE_ETAPES } from '@/lib/content';
import { Reveal } from '@/components/site/Reveal';

export function Deroule() {
  return (
    <section id="deroule" className="container-ah py-24 scroll-mt-20">
      <div className="max-w-3xl">
        <h2 className="section-title">Audit, rapport, plan d'action</h2>
        <p className="mt-4 text-lg text-ink/80">
          Un audit d'environ 2 heures sur place, sans interrompre votre service. De la prise de
          rendez-vous à la remise du rapport, une méthode structurée.
        </p>
      </div>

      <ol className="relative mt-12 grid gap-6 md:grid-cols-4">
        {/* Ligne de liaison sur desktop */}
        <div aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-vert/0 via-vert/30 to-vert/0 md:block" />
        {DEROULE_ETAPES.map((etape, i) => (
          <Reveal as="li" key={etape.titre} delay={i * 90} className="relative rounded-2xl border border-ink/8 bg-white p-6 card-hover">
            <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-vert text-base font-bold text-white shadow-[0_4px_12px_-2px_rgba(16,185,129,0.5)]">
              {i + 1}
            </span>
            <h3 className="mt-5 font-semibold tracking-tight text-ink">{etape.titre}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{etape.texte}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
