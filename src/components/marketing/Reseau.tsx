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
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-lg border border-ink/12 bg-white px-3 py-2 font-semibold text-ink">
            <span className="grid h-5 w-5 place-items-center rounded bg-vert text-[11px] text-white">Q</span>
            Qualiopi · actions de formation
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg border border-ink/12 bg-white px-3 py-2 font-medium text-ink/80">
            Basé sur la réglementation officielle (HACCP, Paquet hygiène)
          </span>
        </div>
      </div>
    </section>
  );
}
