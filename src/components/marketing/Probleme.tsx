import Image from 'next/image';
import { Reveal } from '@/components/site/Reveal';

const RISQUES = [
  {
    titre: 'Une visite sans prévenir',
    texte: "Le contrôle sanitaire arrive sans rendez-vous. Le jour J, on ne rattrape rien : c'est l'état réel de la cuisine qui est jugé.",
  },
  {
    titre: 'Des sanctions immédiates',
    texte: "Avertissement, mise en demeure, procès-verbal, voire fermeture administrative en cas de danger pour le consommateur.",
  },
  {
    titre: 'Une note rendue publique',
    texte: "Le résultat peut être publié et consulté par vos clients. Une mauvaise évaluation se voit, et elle reste.",
  },
  {
    titre: 'Une équipe sous pression',
    texte: "Sans repère clair sur ce qui est conforme ou non, le doute s'installe et le stress monte à chaque service.",
  },
];

export function Probleme() {
  return (
    <section className="border-y border-ink/8 bg-ink/[0.015]">
      <div className="container-ah py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="max-w-xl">
            <h2 className="section-title">Et si un contrôle tombait aujourd'hui ?</h2>
            <p className="mt-4 text-lg text-ink/80">
              Personne ne vous prévient. Et les conséquences d'une non-conformité ne pardonnent pas.
              La seule vraie protection : avoir déjà tout vérifié, avant l'inspection.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-ink/5">
            <Image
              src="https://images.unsplash.com/photo-1759521296013-559479e2a891?auto=format&fit=crop&w=1000&q=80"
              alt="Auditeur en tenue contrôlant une cuisine de restaurant"
              width={1000}
              height={720}
              className="h-[280px] w-full object-cover sm:h-[340px]"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RISQUES.map((r, i) => (
            <Reveal
              key={r.titre}
              delay={i * 80}
              className="rounded-2xl border border-ink/8 bg-white p-6 card-hover"
            >
              <h3 className="font-semibold tracking-tight text-ink">{r.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">{r.texte}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-lg font-medium text-ink">
          Notre audit vous met dans la position du restaurateur qui a déjà fait le travail :
          chaque écart identifié, corrigé, tracé. Vous abordez le contrôle préparé, pas surpris.
        </p>
      </div>
    </section>
  );
}
