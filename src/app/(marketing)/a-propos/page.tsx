import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export const metadata: Metadata = {
  title: 'À propos d\'audit hygiène',
  description:
    "audit hygiène est un cabinet d'audit hygiène et HACCP indépendant pour la restauration. Label privé, méthode ancrée dans la réglementation, démarche honnête et confidentielle.",
  alternates: { canonical: '/a-propos' },
  openGraph: {
    title: 'À propos d\'audit hygiène | label privé indépendant',
    description:
      "Cabinet d'audit hygiène et HACCP indépendant pour la restauration. Label privé, méthode réglementaire, honnêteté et confidentialité.",
    url: `${siteUrl}/a-propos`,
  },
};

const ENGAGEMENTS = [
  {
    titre: 'Ancrage réglementaire',
    texte:
      "Chaque point de notre grille renvoie à un texte identifiable : Paquet hygiène européen, principes HACCP du Codex Alimentarius, Plan de Maîtrise Sanitaire, règlement INCO pour les allergènes. Pas de jugement arbitraire.",
  },
  {
    titre: 'Honnêteté totale',
    texte:
      "Aucun faux avis, aucune statistique inventée, aucune sur-promesse. Nous vous aidons à préparer et à anticiper un contrôle, nous ne garantissons pas son résultat, qui relève des autorités compétentes.",
  },
  {
    titre: 'Confidentialité',
    texte:
      "Votre rapport et vos données ne sont partagés qu'avec vous. Ils sont traités conformément au RGPD et stockés de façon sécurisée, avec un accès par lien à durée limitée.",
  },
  {
    titre: 'Indépendance',
    texte:
      "Nous ne vendons pas les équipements ou produits que nous évaluons. Notre seul intérêt est de vous donner une lecture juste de votre conformité réelle.",
  },
];

export default function AProposPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'À propos', url: `${siteUrl}/a-propos` },
        ])}
      />

      <section className="aurora">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            / <span className="text-ink/70">À propos</span>
          </nav>
          <p className="eyebrow mt-6">Qui nous sommes</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Le tiers de confiance qui valide votre hygiène
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            audit hygiène est un cabinet d'audit hygiène et HACCP indépendant, dédié aux restaurants
            et aux établissements de la restauration. Nous contrôlons votre établissement sur la
            base de la réglementation en vigueur et vous remettons un rapport clair, avec un plan
            d'action pour vous mettre en conformité.
          </p>
        </div>
      </section>

      <section className="container-ah py-14">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Notre raison d'être</h2>
            <p className="mt-4 text-ink/75">
              Un contrôle sanitaire ne prévient pas. Beaucoup de restaurateurs sérieux découvrent un
              écart le jour de l'inspection, alors qu'il aurait pu être corrigé bien avant. Notre
              métier consiste à porter ce regard externe en amont : voir ce que l'habitude ne voit
              plus, hiérarchiser ce qui compte, et transformer un constat en plan d'action concret.
            </p>
            <p className="mt-4 text-ink/75">
              Nous voulons faire de l'hygiène un atout affichable, pas une source d'angoisse. Un
              établissement bien tenu mérite de le savoir et de le prouver.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              Un label privé, et ce que cela veut dire
            </h2>
            <p className="mt-4 text-ink/75">
              audit hygiène est un label privé de qualité, indépendant. C'est une démarche
              volontaire de mise en conformité, distincte d'un contrôle officiel. Nous le disons
              clairement parce que la confiance se construit sur la franchise.
            </p>
            <div className="mt-5 rounded-2xl border border-vert/20 bg-vert-50/60 p-5">
              <p className="text-sm leading-relaxed text-ink/80">{MENTION_LABEL_PRIVE}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/8 bg-vert-50/40">
        <div className="container-ah py-14">
          <h2 className="section-title">Nos engagements</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {ENGAGEMENTS.map((e) => (
              <div key={e.titre} className="rounded-2xl border border-ink/8 bg-white p-6">
                <h3 className="text-lg font-semibold text-ink">{e.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{e.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-ah py-14">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              Une méthode, une qualification
            </h2>
            <p className="mt-4 text-ink/75">
              Nos audits sont réalisés par un auditeur formé à la réglementation hygiène et à la
              méthode HACCP, capable d'observer sans déranger votre activité et de traduire chaque
              constat en action concrète. La méthode, le déroulé et la notation sont décrits en
              détail sur notre page dédiée.
            </p>
            {/*
              TODO E-E-A-T : ajouter ici la présentation nominative du ou des auditeurs
              (nom, parcours, qualification HACCP précise, années d'expérience, photo),
              à fournir par le client. Renforce fortement la confiance et la citation par les IA.
              Ne rien inventer : laisser ce bloc en attente tant que la vraie donnée n'est pas fournie.
            */}
            <p className="mt-4 text-ink/75">
              audit hygiène est par ailleurs certifié Qualiopi au titre de la catégorie « actions de
              formation ». L'audit hygiène, lui, reste un label privé indépendant.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/methode" className="btn-ghost text-sm">
                Voir notre méthode
              </Link>
              <Link href="/#rdv" className="btn-primary text-sm">
                Réserver un audit
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink/5">
            <span className="inline-flex items-center rounded-lg bg-white px-3 py-2 ring-1 ring-ink/10">
              <Image
                src="/img/qualiopi.png"
                alt="Certifié Qualiopi"
                width={633}
                height={338}
                className="h-12 w-auto"
              />
            </span>
            <p className="mt-4 text-sm text-ink/70">
              La certification qualité a été délivrée au titre de la catégorie : actions de
              formation.
            </p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-t border-ink/8 pt-3">
                <dt className="text-ink/60">Activité</dt>
                <dd className="font-medium text-ink">Audit hygiène &amp; HACCP</dd>
              </div>
              <div className="flex justify-between border-t border-ink/8 pt-3">
                <dt className="text-ink/60">Secteur</dt>
                <dd className="font-medium text-ink">Restauration et CHR</dd>
              </div>
              <div className="flex justify-between border-t border-ink/8 pt-3">
                <dt className="text-ink/60">Cadre</dt>
                <dd className="font-medium text-ink">Label privé indépendant</dd>
              </div>
              <div className="flex justify-between border-t border-ink/8 pt-3">
                <dt className="text-ink/60">Contact</dt>
                <dd className="font-medium text-vert-700">
                  <a href="mailto:contact@audithygiene.fr">contact@audithygiene.fr</a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="container-ah pb-20">
        <div className="rounded-2xl bg-ink p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold">Parlons de votre établissement</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Décrivez votre besoin, on vous rappelle pour convenir d'un créneau. Sans engagement.
          </p>
          <Link href="/#rdv" className="btn-primary mt-6">
            Réserver un audit
          </Link>
        </div>
      </section>
    </>
  );
}
