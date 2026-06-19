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
    <section className="container-ah py-20">
      <div className="max-w-3xl">
        <p className="eyebrow">La méthode</p>
        <h2 className="section-title mt-4">On passe tout au crible</h2>
        <p className="mt-4 text-lg text-ink/60">
          Notre grille couvre les thèmes de la réglementation hygiène et des principes HACCP.
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {THEMES.map((t, i) => (
          <Reveal as="div" key={t.nom} delay={(i % 3) * 70} className="group rounded-2xl border border-ink/8 bg-white p-5 card-hover">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-vert-50 text-vert-700 transition-colors group-hover:bg-vert group-hover:text-white">
                <t.Ico className="h-[22px] w-[22px]" />
              </span>
              <h3 className="font-semibold tracking-tight text-ink">{t.nom}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/55">{t.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
