import Image from 'next/image';
import { Reveal } from '@/components/site/Reveal';
import {
  IcoFroid, IcoTemp, IcoTrace, IcoMains, IcoSpray, IcoNuisible,
  IcoStock, IcoBuilding, IcoTrash, IcoShield, IcoAllergen, IcoWater,
} from '@/components/site/icons';

const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=70`;

const THEMES = [
  { Ico: IcoFroid, nom: 'Chaîne du froid', desc: 'Enceintes froides, relevés de température.', img: U('1589109807644-924edf14ee09') },
  { Ico: IcoTemp, nom: 'Cuisson & refroidissement', desc: 'Barèmes, refroidissement rapide, remise en T°.', img: U('1572715376701-98568319fd0b') },
  { Ico: IcoTrace, nom: 'Traçabilité & DLC', desc: 'Étiquetage, dates, conservation des preuves.', img: U('1535850452425-140ee4a8dbae') },
  { Ico: IcoMains, nom: 'Hygiène du personnel', desc: 'Tenue, lavage des mains, formation.', img: U('1708915965975-2a950db0e215') },
  { Ico: IcoSpray, nom: 'Nettoyage & désinfection', desc: 'Plan de nettoyage, produits, preuves.', img: U('1627931085762-4017812f1773') },
  { Ico: IcoNuisible, nom: 'Lutte contre les nuisibles', desc: 'Plan de dératisation, traçabilité.', img: U('1666479258732-5ea17469b610') },
  { Ico: IcoStock, nom: 'Stockage & marche en avant', desc: 'Séparation cru/cuit, organisation.', img: U('1682071308247-04c65c28bba5') },
  { Ico: IcoBuilding, nom: 'Locaux & équipements', desc: 'État, matériaux, maintenance.', img: U('1663790776790-680c6282da2d') },
  { Ico: IcoTrash, nom: 'Gestion des déchets', desc: 'Tri, évacuation, local poubelles.', img: U('1511224931379-b4e4324ea7fc') },
  { Ico: IcoShield, nom: 'Plan de Maîtrise Sanitaire', desc: 'Documentation, autocontrôles.', img: U('1588416820614-f8d6ac6cea56') },
  { Ico: IcoAllergen, nom: 'Allergènes', desc: 'Information client, contamination croisée.', img: U('1529940316268-e245e031bcd1') },
  { Ico: IcoWater, nom: 'Eau & glace', desc: 'Potabilité, machine à glaçons.', img: U('1640583342012-4622f31b650d') },
];

export function ThemesAudit() {
  return (
    <section className="container-ah py-24">
      <div className="max-w-3xl">
        <h2 className="section-title">On passe tout au crible</h2>
        <p className="mt-4 text-lg text-ink/80">
          Notre grille couvre tous les thèmes de la réglementation hygiène et des principes HACCP.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {THEMES.map((t, i) => (
          <Reveal
            as="div"
            key={t.nom}
            delay={(i % 3) * 70}
            className="group overflow-hidden rounded-2xl border border-ink/8 bg-white card-hover"
          >
            <div className="relative h-36 overflow-hidden">
              <Image
                src={t.img}
                alt={t.nom}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-xl bg-white/95 text-vert-700 shadow-card backdrop-blur">
                <t.Ico className="h-5 w-5" />
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold tracking-tight text-ink">{t.nom}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{t.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
