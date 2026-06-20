import Link from 'next/link';
import { IcoCheck } from '@/components/site/icons';

const ATOUTS = [
  'Un regard externe et objectif sur vos pratiques',
  'Les non-conformités majeures identifiées avant un contrôle',
  'Un plan correctif priorisé, action par action',
  'Un signal de confiance à afficher en vitrine',
];

export function Label() {
  return (
    <section className="container-ah py-24">
      <div className="grid items-center gap-12 rounded-3xl border border-ink/8 bg-vert-50/50 p-8 sm:p-12 lg:grid-cols-2">
        <div>
          <h2 className="section-title">Un label qui rassure vos clients</h2>
          <p className="mt-4 text-lg text-ink/65">
            Une démarche volontaire et indépendante, pas une certification d'État. Un standard de
            qualité que vous choisissez d'afficher.
          </p>
          <ul className="mt-7 space-y-3">
            {ATOUTS.map((a) => (
              <li key={a} className="flex items-start gap-3 text-ink/80">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-vert text-white">
                  <IcoCheck className="h-3.5 w-3.5" />
                </span>
                {a}
              </li>
            ))}
          </ul>
          <Link href="/#rdv" className="btn-primary mt-8">Obtenir mon audit</Link>
        </div>

        {/* Macaron / autocollant vitrine */}
        <div className="flex justify-center">
          <div className="relative aspect-square w-64 rounded-3xl bg-ink p-8 text-white shadow-soft">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-vert">
                <IcoCheck className="h-9 w-9 text-white" />
              </span>
              <div className="mt-5 text-xl font-bold tracking-tight">
                audit <span className="text-vert-300">hygiène</span>
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.12em] text-white/50">Établissement audité</div>
              <div className="mt-4 h-px w-16 bg-white/15" />
              <div className="mt-4 text-xs text-white/45">À afficher en vitrine</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
