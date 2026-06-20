import Link from 'next/link';
import { FORMULES } from '@/lib/constants';
import { Reveal } from '@/components/site/Reveal';

export function Formules() {
  return (
    <section id="formules" className="bg-vert-50/40 py-24 scroll-mt-20">
      <div className="container-ah">
        <div className="max-w-3xl">
          <h2 className="section-title">Choisissez votre formule</h2>
          <p className="mt-4 text-lg text-ink/80">
            Du diagnostic rapide à l'audit complet avec plan d'action, adapté à votre établissement.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {FORMULES.map((f, i) => (
            <Reveal
              as="div"
              key={f.id}
              delay={i * 90}
              className={`relative flex flex-col rounded-2xl border bg-white p-7 card-hover ${
                f.populaire ? 'border-vert shadow-soft ring-1 ring-vert/30' : 'border-ink/10 shadow-card'
              }`}
            >
              {f.populaire && (
                <span className="absolute -top-3 left-7 rounded-full bg-vert px-3 py-1 text-xs font-semibold text-white">
                  Le plus choisi
                </span>
              )}
              <h3 className="text-lg font-bold text-ink">{f.nom}</h3>
              <p className="mt-2 text-sm text-ink/80">{f.description}</p>
              <div className="mt-5">
                <span className="text-3xl font-extrabold text-ink">
                  {f.prix === 'TODO' ? 'Sur devis' : f.prix}
                </span>
                {f.recurrent && f.prix !== 'TODO' && <span className="text-ink/70"> /mois</span>}
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
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink/70">
          Tarifs indicatifs, précisés selon la taille de l'établissement. Supplément pour le rendez-vous
          express sous 48 h. Aucun engagement avant validation du devis.
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
