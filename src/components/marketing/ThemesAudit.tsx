import Image from 'next/image';
import { Reveal } from '@/components/site/Reveal';
import {
  IcoFroid, IcoTemp, IcoTrace, IcoMains, IcoSpray, IcoNuisible,
  IcoStock, IcoBuilding, IcoTrash, IcoShield, IcoAllergen, IcoWater,
} from '@/components/site/icons';

const THEMES = [
  { Ico: IcoFroid, nom: 'Chaîne du froid', desc: 'Enceintes froides, relevés de température.' },
  { Ico: IcoTemp, nom: 'Cuisson & refroidissement', desc: 'Barèmes, refroidissement rapide, remise en T°.' },
  { Ico: IcoTrace, nom: 'Traçabilité & DLC', desc: 'Étiquetage, dates, conservation des preuves.' },
  { Ico: IcoMains, nom: 'Hygiène du personnel', desc: 'Tenue, lavage des mains, formation.' },
  { Ico: IcoSpray, nom: 'Nettoyage & désinfection', desc: 'Plan de nettoyage, produits, preuves.' },
  { Ico: IcoNuisible, nom: 'Lutte contre les nuisibles', desc: 'Plan de dératisation, traçabilité.' },
  { Ico: IcoStock, nom: 'Stockage & marche en avant', desc: 'Séparation cru/cuit, organisation.' },
  { Ico: IcoBuilding, nom: 'Locaux & équipements', desc: 'État, matériaux, maintenance.' },
  { Ico: IcoTrash, nom: 'Gestion des déchets', desc: 'Tri, évacuation, local poubelles.' },
  { Ico: IcoShield, nom: 'Plan de Maîtrise Sanitaire', desc: 'Documentation, autocontrôles.' },
  { Ico: IcoAllergen, nom: 'Allergènes', desc: 'Information client, contamination croisée.' },
  { Ico: IcoWater, nom: 'Eau & glace', desc: 'Potabilité, machine à glaçons.' },
];

export function ThemesAudit() {
  return (
    <section className="container-ah py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="max-w-xl">
          <h2 className="section-title">On passe tout au crible</h2>
          <p className="mt-4 text-lg text-ink/80">
            L'auditeur, en tenue, parcourt votre établissement point par point : tous les thèmes de la
            réglementation hygiène et des principes HACCP, rien n'est laissé de côté.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-ink/5">
          <Image
            src="/img/audit-heureux.webp"
            alt="Audit hygiène en cuisine professionnelle"
            width={1024}
            height={684}
            className="h-[280px] w-full object-cover sm:h-[360px]"
          />
        </div>
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {THEMES.map((t, i) => (
          <Reveal
            as="div"
            key={t.nom}
            delay={(i % 3) * 60}
            className="group rounded-2xl border border-ink/8 bg-white p-5 card-hover"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-vert-50 text-vert-700 transition-colors group-hover:bg-vert group-hover:text-white">
                <t.Ico className="h-[22px] w-[22px]" />
              </span>
              <h3 className="font-semibold tracking-tight text-ink">{t.nom}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{t.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
