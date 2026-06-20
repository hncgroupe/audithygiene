import { FAQ_ITEMS } from '@/lib/content';

export function Faq() {
  return (
    <section id="faq" className="container-ah py-24 scroll-mt-20">
      <div className="grid gap-12 md:grid-cols-3">
        <div className="md:col-span-1">
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Questions fréquentes
          </h2>
          <p className="mt-4 text-ink/80">
            Tout ce qu'il faut savoir sur l'audit hygiène et notre cadre d'intervention.
          </p>
        </div>
        <div className="md:col-span-2">
          <dl className="divide-y divide-ink/10">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <dt className="font-semibold text-ink">{item.q}</dt>
                  <span className="text-vert transition group-open:rotate-45" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <dd className="mt-3 text-ink/80">{item.a}</dd>
              </details>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
