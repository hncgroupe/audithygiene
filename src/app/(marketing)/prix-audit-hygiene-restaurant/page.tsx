/**
 * La page prix.
 *
 * C'etait le seul trou commercial reel du site : « prix audit hygiene
 * restaurant », « tarif audit HACCP », « combien coute un audit hygiene » sont
 * les requetes les plus proches de l'achat du metier, et aucune adresse ne les
 * visait. Seule une ancre, /#formules, portait le sujet.
 *
 * TODO prix a confirmer.
 *
 * Cette page ne porte volontairement AUCUN montant. src/lib/constants.ts
 * indique encore, sur FORMULES, que les prix sont des placeholders a valider,
 * et le second palier repose sur une grille d'affichage en v0-draft dont un
 * point n'est rattache a aucun texte verifiable. Publier un chiffre non
 * confirme sur la page que Google servira aux requetes de prix, c'est le
 * diffuser partout et s'engager commercialement dessus.
 *
 * Elle explique donc ce qui fait varier un prix, ce que couvre chaque formule,
 * et conduit au devis. C'est ce que cherche quelqu'un qui compare : savoir ce
 * qu'il achete et obtenir un chiffre ferme pour son cas. Quand les montants
 * seront valides, ajouter ici un tableau lu depuis FORMULES et rebrancher
 * `offers` dans src/lib/schema.ts.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { DEPARTEMENTS, FORMULES, MENTION_LABEL_PRIVE } from '@/lib/constants';
import { NB_AFFICHAGE, NB_HYGIENE, VOLETS } from '@/lib/familles';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema, faqSchema, localBusinessSchema } from '@/lib/schema';
import { DevisRapide } from '@/components/marketing/DevisRapide';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';
const url = `${siteUrl}/prix-audit-hygiene-restaurant`;

export const metadata: Metadata = {
  title: "Prix d'un audit hygiène restaurant : ce qui le fait varier",
  description:
    "Combien coûte un audit hygiène en restaurant, ce que couvre chaque formule, ce qui fait varier le montant selon l'établissement, et comment obtenir un devis ferme en Île-de-France.",
  alternates: { canonical: '/prix-audit-hygiene-restaurant' },
  openGraph: {
    title: "Prix d'un audit hygiène restaurant",
    description:
      "Ce que couvre chaque formule, ce qui fait varier le montant, et comment obtenir un devis ferme.",
    url,
  },
};

const FAQ = [
  {
    q: "Combien coûte un audit hygiène pour un restaurant ?",
    a: "Le montant dépend de la formule retenue et de l'établissement : sa surface, le nombre d'enceintes froides à contrôler, le nombre de zones de production, et le fait de couvrir ou non le volet affichage. Un devis est établi avant toute intervention, à partir de ces éléments, et il est ferme. Le déplacement en Île-de-France est compris.",
  },
  {
    q: "Le déplacement est-il facturé en plus ?",
    a: "Non. Le déplacement est compris dans les huit départements d'Île-de-France. Aucun frais kilométrique ne s'ajoute au devis.",
  },
  {
    q: "Quelle différence de prix entre les deux formules ?",
    a: `L'Audit Essentiel couvre les ${NB_HYGIENE} points d'hygiène des denrées et des locaux, ceux que contrôlent ${VOLETS.hygiene.service}. L'Audit Conformité y ajoute les ${NB_AFFICHAGE} points d'information du consommateur, que contrôle ${VOLETS.affichage.service}. La seconde formule demande plus de temps sur place et un examen documentaire plus long, ce qui explique l'écart.`,
  },
  {
    q: "Y a-t-il un tarif dégressif pour plusieurs établissements ?",
    a: "Oui. À partir de trois établissements, la prestation est établie sur devis avec une dégressivité. Les visites sont menées sur la même grille, ce qui permet de comparer les sites entre eux dans un rapport unique.",
  },
  {
    q: "Le rapport et le plan d'action sont-ils facturés séparément ?",
    a: "Non. Le rapport écrit, la notation et le plan d'action priorisé font partie de la prestation. Il n'y a pas d'option ni de supplément pour les obtenir.",
  },
  {
    q: "Faut-il payer une contre-visite ?",
    a: "Il n'y a pas de contre-visite, ni dans le prix ni en option. La prestation consiste à auditer et à remettre le rapport. Le plan d'action est écrit pour que vous puissiez l'appliquer vous-même, avec pour chaque écart le correctif attendu et la preuve à constituer.",
  },
];

const VARIABLES = [
  {
    titre: "La taille et le nombre de zones",
    texte:
      "Une cuisine ouverte de quarante couverts et un établissement avec réserve, laboratoire séparé, cellule de refroidissement et économat ne demandent pas le même temps sur place. Ce qui compte n'est pas la surface au sol mais le nombre de zones à parcourir et d'enceintes froides à ouvrir une par une.",
  },
  {
    titre: "Le volet couvert",
    texte: `Deux administrations contrôlent, indépendamment l'une de l'autre. ${VOLETS.hygiene.service} pour l'hygiène des denrées et des locaux, ${VOLETS.affichage.service} pour l'information donnée au consommateur. Couvrir les deux volets demande une visite plus longue et un examen documentaire plus large.`,
  },
  {
    titre: "L'état de la documentation",
    texte:
      "L'examen porte sur le plan de maîtrise sanitaire et sur les enregistrements qui prouvent qu'il vit : relevés de température, traçabilité, plan de nettoyage, passages du prestataire nuisibles. Un classeur tenu se vérifie vite. Un classeur à reconstituer prend du temps, et ce temps figure au devis.",
  },
  {
    titre: "Le nombre d'établissements",
    texte:
      "À partir de trois sites, la prestation devient dégressive. La grille étant la même partout, les établissements se comparent entre eux, ce qui fait ressortir les écarts propres à un site et ceux qui relèvent d'une habitude de réseau.",
  },
];

export default function PrixPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema({ url })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: "Prix d'un audit hygiène", url },
        ])}
      />
      <JsonLd data={faqSchema(FAQ)} />

      <section className="bg-gradient-to-b from-vert-50 to-white">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            / <span className="text-ink/70">Prix</span>
          </nav>
          <p className="eyebrow mt-6">Tarifs et devis</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Combien coûte un audit hygiène en restaurant
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/85">
            Le prix d&apos;un audit hygiène dépend de deux choses : la formule retenue, et ce
            qu&apos;il y a à contrôler chez vous. Un établissement de quarante couverts sans
            réserve et une maison avec laboratoire, cellule et économat ne demandent pas le même
            temps sur place. Le devis est donc établi avant toute intervention, à partir de votre
            situation réelle, et il est ferme. Le déplacement en Île-de-France est compris, sans
            frais kilométrique. Le rapport, la notation et le plan d&apos;action font partie de la
            prestation : il n&apos;y a ni option ni supplément pour les obtenir.
          </p>
          <p className="mt-4 max-w-3xl text-ink/70">
            Cette page explique ce que couvre chaque formule et ce qui fait varier le montant, pour
            que vous sachiez ce que vous comparez avant de demander un chiffre.
          </p>
        </div>
      </section>

      <DevisRapide contexte="Le devis est établi sur votre situation réelle, avant toute intervention, et il est ferme." />

      <section className="container-ah py-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Ce que couvre chaque formule</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {FORMULES.map((f) => (
            <div key={f.id} className="rounded-2xl border border-ink/10 p-6">
              <h3 className="text-lg font-bold text-ink">{f.nom}</h3>
              <p className="mt-2 text-ink/75">{f.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-ink/80">
                {f.inclus.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true" className="mt-1 text-vert-700">
                      &bull;
                    </span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-medium text-gris">Sur devis, établi avant intervention.</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-ink/70">
          À partir de trois établissements, la prestation est dégressive et donne lieu à un devis
          réseau. La grille étant identique d&apos;un site à l&apos;autre, les établissements se
          comparent entre eux dans un rapport unique.
        </p>
      </section>

      <section className="container-ah py-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          Ce qui fait varier le montant
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {VARIABLES.map((v) => (
            <div key={v.titre} className="rounded-2xl border border-ink/10 p-6">
              <h3 className="font-semibold text-ink">{v.titre}</h3>
              <p className="mt-2 text-ink/75">{v.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-ah py-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          Ce qui n&apos;est pas facturé en plus
        </h2>
        <p className="mt-4 max-w-3xl text-ink/80">
          Le déplacement dans les huit départements franciliens, à savoir{' '}
          {DEPARTEMENTS.map((d) => d.nom).join(', ')}, est compris. Le rapport écrit, le score
          global et par thème, l&apos;identification des cas critiques et le plan d&apos;action
          priorisé le sont également. Pour chaque écart, le rapport indique le correctif attendu et
          la preuve à constituer, de sorte que vous puissiez l&apos;appliquer sans nous.
        </p>
        <p className="mt-4 max-w-3xl text-ink/80">
          Ce qui n&apos;existe pas, et ne se facture donc ni en option ni en supplément : la
          contre-visite, le suivi dans la durée, la clôture de dossier, la rédaction de votre plan
          de maîtrise sanitaire et la reconstitution de votre classeur. L&apos;auditeur ouvre ces
          documents parce qu&apos;ils font partie des points contrôlés, note ce qui manque et
          l&apos;écrit. La rédaction vous appartient.
        </p>
      </section>

      <section className="container-ah py-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Questions fréquentes</h2>
        <dl className="mt-6 max-w-3xl divide-y divide-ink/10">
          {FAQ.map((item) => (
            <div key={item.q} className="py-5">
              <dt className="font-semibold text-ink">{item.q}</dt>
              <dd className="mt-2 text-ink/80">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-ah pb-16">
        <div className="max-w-3xl rounded-2xl border border-ink/10 p-6">
          <h2 className="text-lg font-bold text-ink">Aller plus loin</h2>
          <ul className="mt-3 space-y-2 text-ink/80">
            <li>
              <Link href="/methode" className="underline decoration-ink/20 underline-offset-4 hover:text-vert-700">
                Le déroulé d&apos;un audit, étape par étape
              </Link>
            </li>
            <li>
              <Link href="/points-de-controle" className="underline decoration-ink/20 underline-offset-4 hover:text-vert-700">
                La grille de contrôle, point par point
              </Link>
            </li>
            <li>
              <Link href="/audit-hygiene" className="underline decoration-ink/20 underline-offset-4 hover:text-vert-700">
                L&apos;audit selon votre type d&apos;établissement
              </Link>
            </li>
            <li>
              <Link href="/zones" className="underline decoration-ink/20 underline-offset-4 hover:text-vert-700">
                Les zones d&apos;intervention en Île-de-France
              </Link>
            </li>
          </ul>
        </div>
        <p className="mt-6 max-w-3xl text-sm text-gris">{MENTION_LABEL_PRIVE}</p>
      </section>
    </>
  );
}
