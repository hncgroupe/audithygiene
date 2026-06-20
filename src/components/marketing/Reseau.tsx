const CLIENTS = [
  'Restaurants',
  'Brasseries',
  'Restauration rapide',
  'Dark kitchens',
  'Boulangeries',
  'Traiteurs',
  'Hôtels-restaurants',
  'Bars & cafés',
  'Food trucks',
];

/**
 * Bande « réseau de clients » : les métiers de bouche que nous auditons, partout en France.
 * Signal de portée, sans logo de marque tiers (rule no-fake-content).
 */
export function Reseau() {
  return (
    <section className="border-y border-ink/8 bg-white">
      <div className="container-ah py-10">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.08em] text-ink/50">
          Nous auditons tous les métiers de bouche, partout en France
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {CLIENTS.map((c) => (
            <span key={c} className="text-lg font-semibold tracking-tight text-ink/80 sm:text-xl">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
