import { DEROULE_ETAPES } from '@/lib/content';

export function Deroule() {
  return (
    <section id="deroule" className="container-ah py-20 scroll-mt-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Le déroulé</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Un audit, un rapport clair, un plan d'action
        </h2>
        <p className="mt-4 text-lg text-ink/70">
          De la prise de rendez-vous à la remise du rapport, une méthode structurée et transparente.
        </p>
      </div>

      <ol className="mt-12 grid gap-6 md:grid-cols-4">
        {DEROULE_ETAPES.map((etape, i) => (
          <li key={etape.titre} className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-vert-50 text-lg font-bold text-vert-700">
              {i + 1}
            </span>
            <h3 className="mt-4 font-semibold text-ink">{etape.titre}</h3>
            <p className="mt-2 text-sm text-ink/65">{etape.texte}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
