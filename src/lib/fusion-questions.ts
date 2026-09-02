/**
 * La fusion des pages d'auto-audit.
 *
 * Quinze pages apprenaient au lecteur a auditer son etablissement lui-meme,
 * zone par zone : les frigos, la reserve seche, la plonge, la marche en avant,
 * le service du soir, la frequence, qui s'en charge dans l'equipe, comment se
 * noter. Prises une par une elles etaient utiles et bien ecrites. Prises
 * ensemble elles se disputaient la meme requete, quinze fois, et surtout elles
 * repondaient a une seule question de fond sans jamais la poser : jusqu'ou
 * peut-on aller seul, et a partir d'ou faut-il quelqu'un d'autre.
 *
 * Elles n'en font plus qu'une, batie sur cette question. Les quatorze autres
 * adresses redirigent en 301 vers elle, voir next.config.mjs.
 *
 * La fusion se declare ici plutot que dans src/data/questions-pseo.ts : le
 * corpus reste intact, verifiable par scripts/check-questions-pseo.ts, et
 * revenir en arriere ne demande que de vider ce fichier.
 */

import type { QuestionPseo } from '@/data/questions-pseo';

/** L'adresse qui survit, et qui recoit les quatorze autres. */
export const SLUG_AUTO_AUDIT = 'auto-audit-vs-audit-externe';

/**
 * Les pages absorbees, dans l'ordre de lecture de la page fusionnee, avec la
 * phrase qui les introduit. L'ordre suit le trajet d'un exploitant : par ou
 * commencer, le tour rapide, puis zone par zone, puis l'organisation, puis la
 * limite de l'exercice.
 */
export const ABSORBEES: { slug: string; amorce: string }[] = [
  { slug: 'par-ou-commencer-auto-audit', amorce: "Par où commencer, quand rien n'est encore en place." },
  { slug: 'checklist-tour-de-cuisine-30-minutes', amorce: 'Le tour de trente minutes, quand le temps manque.' },
  { slug: 'auto-audit-frigo', amorce: 'Les enceintes froides, la zone qui concentre le plus de constats.' },
  { slug: 'auto-audit-reserve-seche', amorce: 'La réserve sèche, celle que personne ne regarde vraiment.' },
  { slug: 'auto-audit-plonge-laverie', amorce: 'La plonge et la laverie.' },
  { slug: 'auto-audit-marche-en-avant', amorce: "La marche en avant, quand les locaux n'ont pas été dessinés pour elle." },
  { slug: 'auto-audit-service-du-soir', amorce: 'Vérifier pendant un service, sans gêner la production.' },
  { slug: 'qui-doit-faire-auto-audit-equipe', amorce: "Qui s'en charge dans l'équipe." },
  { slug: 'frequence-auto-audit', amorce: 'À quelle fréquence recommencer.' },
  { slug: 'noter-son-etablissement-objectivement', amorce: 'Se noter sans se mentir.' },
  { slug: 'hierarchiser-corrections-auto-audit', amorce: 'Par quoi commencer une fois la liste écrite.' },
  { slug: 'auto-audit-apres-changement-carte', amorce: 'Quand la carte change.' },
  { slug: 'auto-audit-reprise-fonds', amorce: 'Quand on reprend un fonds, avant de signer.' },
  { slug: 'auto-audit-plusieurs-etablissements', amorce: "Quand il y a plusieurs établissements." },
];

export const SLUGS_ABSORBES = ABSORBEES.map((a) => a.slug);

/** Les redirections a declarer dans next.config.mjs, une par page absorbee. */
export const REDIRECTIONS_AUTO_AUDIT = SLUGS_ABSORBES.map((slug) => ({
  source: `/questions/${slug}`,
  destination: `/questions/${SLUG_AUTO_AUDIT}`,
  permanent: true,
}));

const REPONSE_FUSIONNEE =
  "Un auto-audit honnête couvre l'essentiel de ce qui se contrôle : la température des enceintes, l'étiquetage des produits entamés, la séparation du cru et du cuit, la propreté des zones difficiles, la tenue des relevés et la présence des documents. Ces points se vérifient seul, avec un thermomètre et trente minutes. Ce qu'un auto-audit ne donne pas, c'est le regard de quelqu'un qui n'a pas pris l'habitude des lieux : on ne voit plus le joint encrassé que l'on longe dix fois par jour, et on note rarement contre soi. Un tiers apporte cela, plus une notation écrite et un plan d'action opposable. La règle tient en une ligne : auditez-vous seul souvent, faites-vous auditer quand l'enjeu change, avant une ouverture, après un écart relevé, ou lorsque personne ne sait plus dire où en est la maison.";

const OUVERTURE: string[] = [
  "Cette page réunit ce qui se vérifiait auparavant sur quinze pages distinctes. Elle répond à une seule question, celle que l'on se pose vraiment : jusqu'où peut-on aller seul, et à partir de quel moment un regard extérieur devient nécessaire.",
  "Ce que vous pouvez tenir seul, et qui représente la majeure partie du travail : le relevé des températures et sa traçabilité, l'étiquetage des produits ouverts et des préparations, la rotation des lots, la séparation du cru et du cuit, le nettoyage des zones que l'on ne regarde jamais, la tenue du plan de maîtrise sanitaire et des enregistrements qui prouvent qu'il vit. Rien de tout cela ne demande un intervenant extérieur. Cela demande une routine et un peu de discipline.",
  "Ce qui demande quelqu'un d'autre, et qui ne s'obtient pas en se relisant soi-même : voir ce que l'habitude a effacé, obtenir une notation qui ne s'arrange pas avec la fatigue de la semaine, disposer d'un écrit daté qui hiérarchise les écarts et qui tient devant un tiers, banquier, franchiseur, assureur ou repreneur. Un auto-audit ne produit aucun de ces trois résultats, quelle que soit la bonne volonté de celui qui le mène.",
];

const FERMETURE: string[] = [
  "La limite tient en une phrase : un auto-audit mesure ce que vous savez déjà chercher, il ne mesure pas ce que vous avez cessé de voir. C'est pour cette raison qu'il se complète, et ne se remplace pas, par un passage extérieur lorsque l'enjeu le justifie. Notre cabinet intervient sur place en Île-de-France et remet un rapport écrit avec notation, identification des cas critiques et plan correctif hiérarchisé. C'est un label privé et indépendant, sans valeur d'agrément, sans lien avec les services officiels et sans promesse sur l'issue d'une inspection. Les modalités se règlent depuis la page contact.",
];

/**
 * Construit la page fusionnee a partir du corpus.
 *
 * On reprend le texte deja ecrit et deja verifie plutot que d'en produire du
 * neuf : chaque paragraphe absorbe est la reponse directe de la page d'origine,
 * introduite par son amorce. Rien n'est invente, rien n'est perdu.
 */
export function fusionnerAutoAudit(questions: QuestionPseo[]): QuestionPseo[] {
  const survivante = questions.find((q) => q.slug === SLUG_AUTO_AUDIT);
  if (!survivante) return questions;

  const absorbe = new Set(SLUGS_ABSORBES);
  const corps = ABSORBEES.flatMap(({ slug, amorce }) => {
    const q = questions.find((x) => x.slug === slug);
    return q ? [`${amorce} ${q.reponse}`] : [];
  });

  const fusionnee: QuestionPseo = {
    ...survivante,
    question: 'Mon auto-audit suffit-il, ou faut-il un regard extérieur ?',
    reponse: REPONSE_FUSIONNEE,
    precisions: [...OUVERTURE, ...corps, ...survivante.precisions, ...FERMETURE],
  };

  return questions
    .filter((q) => !absorbe.has(q.slug))
    .map((q) => (q.slug === SLUG_AUTO_AUDIT ? fusionnee : q));
}
