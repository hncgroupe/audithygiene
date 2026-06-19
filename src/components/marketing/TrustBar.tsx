const PILIERS = [
  {
    titre: 'Fondé sur la réglementation',
    texte: "Chaque point d'audit s'appuie sur l'hygiène alimentaire et les principes HACCP.",
  },
  {
    titre: 'Un auditeur sur place',
    texte: "Une visite réelle de votre établissement, partout en Île-de-France.",
  },
  {
    titre: 'Un rapport actionnable',
    texte: 'Notation, cas critiques et plan correctif priorisé, sans jargon.',
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-ink/5 bg-white">
      <div className="container-ah grid gap-px md:grid-cols-3">
        {PILIERS.map((p) => (
          <div key={p.titre} className="px-2 py-8 md:px-8">
            <div className="flex items-center gap-2.5">
              <Mark />
              <h2 className="text-base font-semibold tracking-tight text-ink">{p.titre}</h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{p.texte}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Mark() {
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-vert-50">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12.5l4 4L19 7" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
