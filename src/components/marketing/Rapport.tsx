import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/site/Reveal';

const CONTENU = [
  {
    titre: 'Une note claire, globale et par thème',
    texte: 'Un score sur 100 pour situer l’établissement, détaillé thème par thème (froid, cuisson, traçabilité, hygiène, nettoyage, nuisibles, PMS…).',
  },
  {
    titre: 'Chaque non-conformité, décrite et photographiée',
    texte: 'Pas de jargon. Pour chaque écart : ce qui a été constaté, où, et la preuve photo à l’appui.',
  },
  {
    titre: 'Les cas critiques signalés à part',
    texte: 'Les non-conformités à impact sanitaire direct sont isolées et mises en avant, jamais noyées dans la note.',
  },
  {
    titre: 'Un plan d’action concret pour chaque écart',
    texte: 'Pour chaque point à corriger : l’action précise à mener, sa priorité (haute, moyenne, basse) et un délai conseillé.',
  },
  {
    titre: 'La date du prochain audit recommandé',
    texte: 'Pour inscrire la mise en conformité dans la durée et garder l’établissement au niveau.',
  },
  {
    titre: 'Un PDF complet, partageable avec l’équipe',
    texte: 'Le rapport se transmet et s’affiche. Chacun sait quoi corriger, dans quel ordre.',
  },
];

export function Rapport() {
  return (
    <section id="rapport" className="container-ah py-24 scroll-mt-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="max-w-xl">
          <h2 className="section-title">Le rapport qui dit quoi corriger</h2>
          <p className="mt-4 text-lg text-ink/80">
            À la fin de l'audit, vous ne repartez pas avec une impression, mais avec un document
            précis : point par point, du plus urgent au moins urgent.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-ink/5">
          <Image
            src="/img/cuisine-propre.jpg"
            alt="Cuisine propre et conforme après mise en conformité"
            width={800}
            height={1000}
            className="h-[280px] w-full object-cover sm:h-[340px]"
          />
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CONTENU.map((c, i) => (
          <Reveal
            key={c.titre}
            delay={i * 70}
            className="rounded-2xl border border-ink/8 bg-white p-6 card-hover"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-vert-50 text-sm font-bold text-vert-700">
              {i + 1}
            </span>
            <h3 className="mt-4 font-semibold tracking-tight text-ink">{c.titre}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{c.texte}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/#rdv" className="btn-primary text-base">
          Obtenir mon rapport d'audit
        </Link>
      </div>
    </section>
  );
}
