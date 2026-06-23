import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export const metadata: Metadata = {
  title: 'Notre méthode d\'audit hygiène & HACCP',
  description:
    "Comment se déroule un audit hygiène : visite sur place, contrôle de chaque thème HACCP, notation sur 100, cas critiques isolés, plan correctif priorisé et rapport PDF.",
  alternates: { canonical: '/methode' },
  openGraph: {
    title: 'Notre méthode d\'audit hygiène & HACCP | audit hygiène',
    description:
      "Visite sur place, contrôle de chaque thème, notation sur 100, cas critiques, plan correctif et rapport PDF. La méthode d'audit hygiène, étape par étape.",
    url: `${siteUrl}/methode`,
  },
};

const ETAPES = [
  {
    titre: 'Prise de rendez-vous et cadrage',
    texte:
      "Vous décrivez votre établissement, votre activité et votre besoin (préparation d'un contrôle, ouverture, reprise, suivi). On convient d'un créneau de visite, annoncé ou inopiné selon ce que vous préférez.",
  },
  {
    titre: 'Audit sur place, environ 2 heures',
    texte:
      "L'auditeur intervient en conditions réelles, sans interrompre votre service. Il observe, mesure, photographie et échange avec votre équipe. L'objectif est de voir l'établissement tel qu'il fonctionne vraiment, pas tel qu'il se prépare pour une visite.",
  },
  {
    titre: 'Notation et identification des cas critiques',
    texte:
      "Chaque thème est évalué et noté. Les non-conformités majeures à impact sanitaire direct, les cas critiques, sont isolées et signalées à part, jamais diluées dans la note globale.",
  },
  {
    titre: 'Rapport et plan correctif',
    texte:
      "Vous recevez un rapport PDF complet : score global et par thème, chaque écart décrit et photographié, une action corrective concrète par non-conformité, sa priorité et un délai conseillé, plus la date du prochain audit recommandé.",
  },
];

const THEMES = [
  'Chaîne du froid et relevés de température',
  'Cuisson, refroidissement rapide et remise en température',
  'Traçabilité, DLC et DDM',
  'Hygiène et formation du personnel',
  'Nettoyage et désinfection',
  'Lutte contre les nuisibles',
  'Stockage et marche en avant',
  'Locaux, équipements et maintenance',
  'Gestion des déchets',
  'Plan de Maîtrise Sanitaire (PMS) et autocontrôles',
  'Allergènes et contamination croisée',
  'Eau, glace et potabilité',
];

const NIVEAUX = [
  {
    nom: 'Écart mineur',
    desc: "Un point à améliorer, sans risque sanitaire à court terme. On le corrige à un rythme raisonnable.",
  },
  {
    nom: 'Non-conformité majeure',
    desc: "Une perte de maîtrise sérieuse sur un point de sécurité, à traiter rapidement même sans danger immédiat le jour de la visite.",
  },
  {
    nom: 'Cas critique',
    desc: "Un danger direct pour le consommateur, ici et maintenant. Il se corrige sans délai et se signale en tête de rapport.",
  },
];

export default function MethodePage() {
  return (
    <>
      <JsonLd data={serviceSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Méthode', url: `${siteUrl}/methode` },
        ])}
      />

      <section className="aurora">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            / <span className="text-ink/70">Méthode</span>
          </nav>
          <p className="eyebrow mt-6">Notre méthode</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Un audit rigoureux, fondé sur la réglementation
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            Notre méthode repose sur les textes en vigueur et la démarche HACCP. Chaque point
            contrôlé renvoie à une exigence réglementaire identifiable. Pas d'avis au feeling : des
            constats, une notation reproductible, un plan d'action concret.
          </p>
        </div>
      </section>

      <section className="container-ah py-14">
        <h2 className="section-title">Le déroulé, étape par étape</h2>
        <ol className="mt-8 space-y-6">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="flex gap-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vert text-base font-bold text-white">
                {i + 1}
              </span>
              <div className="pt-1">
                <h3 className="text-lg font-semibold text-ink">{e.titre}</h3>
                <p className="mt-2 max-w-2xl text-ink/75">{e.texte}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-ink/8 bg-vert-50/40">
        <div className="container-ah py-14">
          <h2 className="section-title">Les thèmes que nous contrôlons</h2>
          <p className="mt-4 max-w-2xl text-ink/75">
            L'audit complet couvre l'ensemble des thèmes de la réglementation hygiène et des
            principes HACCP. Rien n'est laissé de côté.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {THEMES.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 rounded-xl border border-ink/8 bg-white p-4 text-sm text-ink/80"
              >
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vert" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-ah py-14">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Une notation transparente</h2>
            <p className="mt-4 text-ink/75">
              Chaque thème reçoit un score, agrégé en une note globale sur 100. La méthode de calcul
              est documentée et reproductible : à pratiques identiques, deux audits aboutissent au
              même résultat. La note sert à mesurer un progrès dans le temps, pas à juger.
            </p>
            <p className="mt-4 text-ink/75">
              Cette notation est celle de notre label privé. Elle ne constitue pas un score officiel
              et ne se substitue pas à l'évaluation des services de l'État.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              Trois niveaux d'écart, jamais confondus
            </h2>
            <ul className="mt-4 space-y-4">
              {NIVEAUX.map((n) => (
                <li key={n.nom} className="rounded-2xl border border-ink/8 bg-white p-5">
                  <p className="font-semibold text-ink">{n.nom}</p>
                  <p className="mt-1 text-sm text-ink/75">{n.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-ink/[0.02]">
        <div className="container-ah py-14">
          <h2 className="section-title">Le plan correctif, votre feuille de route</h2>
          <p className="mt-4 max-w-3xl text-ink/75">
            Constater ne suffit pas. Pour chaque non-conformité, le rapport indique l'action
            corrective concrète à mener, sa priorité (haute, moyenne, basse) et un délai conseillé.
            Vous repartez avec une liste de travail claire, du plus urgent au moins urgent, que vous
            pouvez confier à votre équipe.
          </p>
          <p className="mt-4 max-w-3xl text-ink/75">
            Une contre-visite peut être organisée pour vérifier que les corrections ont bien été
            mises en place et qu'elles tiennent dans le temps. Pour comprendre en détail la lecture
            d'un rapport, voir notre article{' '}
            <Link
              href="/blog/comprendre-rapport-audit-hygiene"
              className="font-medium text-vert-700 underline decoration-vert/40 underline-offset-2"
            >
              comprendre son rapport d'audit
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="container-ah py-16">
        <div className="rounded-2xl bg-vert-50 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-ink">Envie de voir où vous en êtes vraiment ?</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/70">
            Un auditeur se déplace, applique cette méthode et vous remet un rapport clair avec un
            plan d'action priorisé.
          </p>
          <Link href="/#rdv" className="btn-primary mt-6">
            Réserver un audit
          </Link>
        </div>
      </section>
    </>
  );
}
