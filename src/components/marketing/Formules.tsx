import Link from 'next/link';
import { FORMULES } from '@/lib/constants';

export function Formules() {
  return (
    <section id="formules" className="bg-vert-50/40 py-20 scroll-mt-20">
      <div className="container-ah">
        <div className="max-w-2xl">
          <p className="eyebrow">Formules</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Choisissez la formule adaptée à votre établissement
          </h2>
          <p className="mt-4 text-lg text-ink/70">
            One-shot ou suivi régulier. Le contenu détaillé et les tarifs sont confirmés lors de la
            prise de rendez-vous.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FORMULES.map((f) => (
            <div
              key={f.id}
              className={`relative flex flex-col rounded-2xl border bg-white p-7 shadow-card ${
                f.populaire ? 'border-vert ring-2 ring-vert/30' : 'border-ink/10'
              }`}
            >
              {f.populaire && (
                <span className="absolute -top-3 left-7 rounded-full bg-vert px-3 py-1 text-xs font-semibold text-white">
                  Le plus choisi
                </span>
              )}
              <h3 className="text-lg font-bold text-ink">{f.nom}</h3>
              <p className="mt-2 text-sm text-ink/65">{f.description}</p>
              <div className="mt-5">
                <span className="text-3xl font-extrabold text-ink">
                  {f.prix === 'TODO' ? 'Sur devis' : f.prix}
                </span>
                {f.recurrent && f.prix !== 'TODO' && <span className="text-gris"> /mois</span>}
              </div>
              <ul className="mt-6 space-y-2.5 text-sm text-ink/75">
                {f.inclus.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Dot /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/#rdv"
                className={`mt-7 ${f.populaire ? 'btn-primary' : 'btn-ghost'} w-full`}
              >
                Réserver
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-gris">
          Tarifs et contenu en cours de finalisation. Aucun engagement avant validation du devis.
        </p>
      </div>
    </section>
  );
}

function Dot() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
      <path d="M5 12.5l4 4L19 7" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
