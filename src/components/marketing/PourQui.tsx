import { IcoResto } from '@/components/site/icons';

const CIBLES = [
  'Restaurants',
  'Restauration rapide',
  'Dark kitchens',
  'Boulangeries & snacking',
  'Traiteurs',
  'Hôtels-restaurants',
  'Bars & cafés',
  'Food trucks',
];

export function PourQui() {
  return (
    <section className="border-y border-ink/8 bg-ink py-20 text-white">
      <div className="container-ah grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-vert-300">Pour qui</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tightest sm:text-[2.5rem] sm:leading-[1.1]">
            Conçu pour tous les métiers de bouche
          </h2>
          <p className="mt-4 text-white/60">
            Que vous serviez dix couverts ou mille, la méthode s'adapte à votre établissement et à
            votre volume.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {CIBLES.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-vert/50 hover:bg-vert/10"
            >
              <IcoResto className="h-4 w-4 text-vert-300" />
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
