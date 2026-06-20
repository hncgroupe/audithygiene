import Link from 'next/link';
import Image from 'next/image';

const POINTS = [
  'Avertissement ou mise en demeure reçus',
  'Fermeture administrative à éviter ou à lever',
  'Remise en conformité rapide, avec plan d’action',
];

/**
 * Section urgence : intervention après un contrôle officiel.
 * Reprend l'angle « on intervient suite à un contrôle pour une remise en conformité rapide ».
 */
export function Urgence() {
  return (
    <section className="container-ah py-24">
      <div className="overflow-hidden rounded-3xl border border-ink/8 bg-vert-50/50">
        <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Vous venez d'avoir un contrôle ?</h2>
            <p className="mt-4 text-lg text-ink/80">
              On intervient en urgence, sous 48 h si besoin. Un auditeur passe, identifie chaque écart
              et vous remet un plan d'action concret pour vous remettre en conformité au plus vite.
            </p>
            <ul className="mt-6 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-vert text-white">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5l4 4L19 7" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/#rdv" className="btn-primary mt-8">
              Demander une intervention express
            </Link>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-ink/5">
              <Image
                src="/img/support.webp"
                alt="Accompagnement à la mise en conformité après contrôle"
                width={920}
                height={775}
                className="h-[360px] w-full object-cover sm:h-[440px]"
              />
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-ink/5 bg-white/95 p-4 shadow-card backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-wide text-vert-700">Express 48 h</div>
              <p className="mt-1 text-sm font-medium text-ink">
                Reprenez votre activité sereinement, sans interrompre votre service. Supplément urgence
                appliqué.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
