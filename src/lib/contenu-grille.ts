/**
 * Le contenu des pages de la grille : un point de contrôle, un thème.
 *
 * Ces pages ne parlent pas d'une ville, elles parlent d'un sujet. Leur valeur
 * tient à une chose que presque personne ne publie : le texte réglementaire
 * exact derrière chaque exigence, et la limite de ce texte. Beaucoup de grilles
 * du marché présentent des usages professionnels comme des obligations légales.
 * Un exploitant qui cite devant un inspecteur une règle qui n'existe pas perd
 * sa crédibilité sur le reste de la visite.
 *
 * D'où la section « ce que le texte dit, et ce qu'il ne dit pas », présente sur
 * chaque page de point : c'est ce qui distingue ces pages de la centaine de
 * check-lists recopiées les unes sur les autres.
 */

import { MOTIFS_PAR_CODE, type GrilleItem } from './grille-audit';
import { MOTIFS_AFFICHAGE_PAR_CODE } from './grille-affichage';
import { NB_AFFICHAGE, NB_HYGIENE, POINTS, THEMES, VOLETS } from './familles';
import { combinaison, graine, nombre } from './communes';

export type Point = (typeof POINTS)[number];
export type Theme = (typeof THEMES)[number];

export type Bloc = { titre: string; paragraphes: string[] };

const NB_POINTS = POINTS.length;

/** Le nombre de points du volet auquel appartient un point, et son libelle. */
const perimetre = (volet: 'hygiene' | 'affichage') =>
  volet === 'affichage'
    ? { n: NB_AFFICHAGE, nom: VOLETS.affichage.nom, service: VOLETS.affichage.service }
    : { n: NB_HYGIENE, nom: VOLETS.hygiene.nom, service: VOLETS.hygiene.service };

/* Les deux grilles ont leurs propres motifs : une seule table evite au gabarit
   de savoir laquelle interroger. */
const MOTIFS = { ...MOTIFS_PAR_CODE, ...MOTIFS_AFFICHAGE_PAR_CODE };

/** La phrase du texte reglementaire s'arrete parfois a une nuance : on la garde. */
const PHRASE_LIMITE = /Bonne pratique et non texte\s*:\s*/i;

export function referenceDecoupee(reference: string) {
  const i = reference.search(PHRASE_LIMITE);
  if (i === -1) return { texte: reference.trim(), limite: '' };
  return {
    texte: reference.slice(0, i).trim(),
    limite: reference.slice(i).replace(PHRASE_LIMITE, '').trim(),
  };
}

const gravite: Record<string, { mot: string; explication: string }> = {
  CONFORME: { mot: 'Conforme', explication: 'Le point est tenu, rien à reprendre.' },
  NC_MINEURE: {
    mot: 'Écart mineur',
    explication: 'À corriger, sans urgence immédiate pour le consommateur.',
  },
  NC_MAJEURE: {
    mot: 'Écart majeur',
    explication: 'Traité en priorité : le risque est direct.',
  },
};

export const libelleGravite = (c: string) => gravite[c] || { mot: c, explication: '' };

/** Le poids d'un point, mis en mots plutot qu'en chiffre nu. */
export function poidsEnMots(ponderation: number) {
  if (ponderation >= 3) return 'point majeur de la grille';
  if (ponderation === 2) return 'point important';
  return 'point de vigilance';
}

/* ------------------------------------------------------------------ *
 * Les pages de point de controle.
 * ------------------------------------------------------------------ */

const OUVERTURES_POINT: ((p: Point) => string)[] = [
  (p) =>
    `${p.intitule} est l'un des ${perimetre(p.volet).n} points du volet ${VOLETS[p.volet].court} que nous constatons lors d'un audit, dans le thème « ${p.theme} ». Voici ce que l'auditeur regarde, sur quel texte cela repose, et ce qu'il faut faire quand l'écart est relevé.`,
  (p) =>
    `Ce point revient dans presque toutes les visites, et c'est aussi l'un de ceux sur lesquels circulent le plus d'approximations. Cette page dit ce qui est réellement exigé au titre de « ${p.theme} », et ce qui relève de l'usage professionnel.`,
  (p) =>
    `Dans la grille, ce point pèse comme ${poidsEnMots(p.ponderation)}. Il est vérifié sur place, jamais sur déclaration, et le constat conditionne directement le plan d'action remis à l'exploitant.`,
];

export function contenuPoint(p: Point) {
  const ref = referenceDecoupee(p.referenceRegl || '');
  const motifs = MOTIFS[p.code] || [];
  const voisins = POINTS.filter((x) => x.themeSlug === p.themeSlug && x.slug !== p.slug);
  const ailleurs = combinaison(
    POINTS.filter((x) => x.themeSlug !== p.themeSlug),
    5,
    graine(p.code, 'ailleurs')
  );

  const blocs: Bloc[] = [
    {
      titre: `Ce que l'auditeur vérifie`,
      paragraphes: [
        p.explication,
        p.photoConseillee
          ? `Le constat est photographié quand la preuve compte, afin que le rapport montre l'état relevé et non une appréciation. La photo reste dans votre dossier et n'est transmise à personne.`
          : `Le constat est noté au moment où il est fait, devant vous, et repris tel quel dans le rapport. Rien n'est ajouté après coup.`,
      ],
    },
    {
      titre: `Pourquoi ce point compte`,
      paragraphes: [
        p.pedagogie,
        `C'est la raison pour laquelle il est classé comme ${poidsEnMots(p.ponderation)} dans la notation : un écart ici ne se rattrape pas par un effort ailleurs.`,
      ],
    },
  ];

  if (ref.texte) {
    blocs.push({
      titre: `Ce que dit le texte`,
      paragraphes: [ref.texte],
    });
  }
  if (ref.limite) {
    blocs.push({
      titre: `Ce que le texte ne dit pas`,
      paragraphes: [
        ref.limite,
        `Nous le signalons parce que la confusion coûte cher dans les deux sens : elle fait dépenser pour une exigence qui n'existe pas, et elle décrédibilise l'exploitant qui l'invoque devant un agent. Dans le rapport, ces éléments sont présentés comme des recommandations, jamais comme des obligations.`,
      ],
    });
  }

  if (motifs.length) {
    blocs.push({
      titre: `Les écarts les plus fréquents`,
      paragraphes: [
        `Sur ce point, les constats se répartissent presque toujours entre ${motifs.length} situations : ${motifs
          .map((m) => m.toLowerCase())
          .join(', ')}. Aucune n'est rare, et aucune n'est irrattrapable.`,
        `L'auditeur note laquelle s'applique, avec le détail de ce qu'il a vu. Cette précision compte : « relevés incomplets » et « aucun relevé » n'appellent pas le même correctif ni le même délai.`,
      ],
    });
  }

  blocs.push({
    titre: `Le correctif attendu`,
    paragraphes: [
      p.constats
        .filter((x) => x.correctif)
        .map((x) => `Si le constat est « ${x.label.toLowerCase()} » : ${x.correctif}`)
        .join(' '),
      `Chaque correctif est repris dans le plan d'action avec sa priorité, et accompagné de la preuve à constituer : une photo, un relevé, une facture, une procédure écrite. La correction vous revient, et c'est cette preuve qui vous permettra de montrer, plus tard, que le point a été traité.`,
    ],
  });

  blocs.push({
    titre: `Où ce point s'inscrit dans l'audit`,
    paragraphes: [
      `Il appartient au thème « ${p.theme} », qui compte ${nombre(voisins.length + 1)} point${voisins.length ? 's' : ''} au total, dans le volet ${VOLETS[p.volet].court} de la grille. Ce volet en compte ${perimetre(p.volet).n}, et c'est ${perimetre(p.volet).service} qui le contrôle. La visite les parcourt tous : un audit partiel donnerait une fausse sécurité, ce qui est pire que pas d'audit.`,
      `Sur le terrain, l'auditeur ne suit pas l'ordre de la grille mais celui du produit, de la réception à l'assiette. Ce point est donc vérifié au moment où il se présente dans votre organisation, ce qui évite les allers-retours en cuisine.`,
    ],
  });

  return {
    reponse: `${p.intitule} : ${p.explication} ${p.pedagogie}`,
    ouverture: OUVERTURES_POINT[graine(p.code, 'ouverture') % OUVERTURES_POINT.length](p),
    blocs,
    constats: p.constats,
    motifs,
    voisins,
    ailleurs,
    reference: ref,
  };
}

/* ------------------------------------------------------------------ *
 * Les pages de theme.
 * ------------------------------------------------------------------ */

export function contenuTheme(t: Theme) {
  const items = t.items as GrilleItem[];
  const poids = items.reduce((a, i) => a + i.ponderation, 0);
  const majeurs = items.filter((i) => i.ponderation >= 3);
  const autres = combinaison(
    THEMES.filter((x) => x.slug !== t.slug),
    5,
    graine(t.slug, 'autres')
  );

  const blocs: Bloc[] = [
    {
      titre: `Ce que couvre le thème « ${t.theme} »`,
      paragraphes: [
        `${nombre(items.length)} point${items.length > 1 ? 's' : ''} de contrôle sur les ${perimetre(t.volet).n} du volet ${VOLETS[t.volet].court}, pour un poids de ${poids} dans la notation. ${
          majeurs.length
            ? `Dont ${nombre(majeurs.length)} classé${majeurs.length > 1 ? 's' : ''} en point majeur : ${majeurs.map((i) => i.intitule.toLowerCase()).join(', ')}.`
            : `Aucun n'est classé en point majeur, ce qui ne les rend pas facultatifs : ils pèsent sur la note et apparaissent au plan d'action comme les autres.`
        }`,
        `Chacun est constaté sur place, avec le texte réglementaire qui le fonde et, quand c'est nécessaire, la mention de ce que ce texte n'impose pas. Cette distinction évite les dépenses inutiles autant que les fausses certitudes.`,
      ],
    },
    {
      titre: `Comment ce thème est vérifié pendant la visite`,
      paragraphes: [
        `L'auditeur ne déroule pas la grille dans l'ordre : il suit le produit, de la réception à l'assiette, et coche les points au moment où ils se présentent dans votre organisation. Les points de ce thème sont donc vus à des moments différents de la visite, mais aucun n'est sauté.`,
        `Ce qui est constaté est expliqué sur le moment, devant vous et devant l'équipe si elle est là. Un écart compris se corrige et ne revient pas ; un écart simplement noté revient à la visite suivante.`,
      ],
    },
    {
      titre: `Ce qui se corrige vite, et ce qui demande une intervention`,
      paragraphes: [
        `Sur ce thème comme sur les autres, les écarts se répartissent en deux familles. Ceux qui tiennent à une habitude ou à un document se règlent en quelques jours, sans dépense : une procédure à écrire, un relevé à reprendre, un rangement à revoir, une consigne à expliquer à l'équipe.`,
        `Ceux qui tiennent au matériel ou aux locaux demandent une intervention, parfois un budget, et le plan d'action leur donne un délai qui tient compte d'un établissement en activité. Les distinguer dès la visite évite deux erreurs symétriques : repousser ce qui pouvait être fait le soir même, et improviser dans l'urgence ce qui demandait un devis.`,
      ],
    },
    {
      titre: `Les questions que ce thème soulève le plus souvent`,
      paragraphes: [
        `« Est-ce vraiment obligatoire ? » revient sur presque chaque point. C'est une bonne question, et elle mérite une réponse précise plutôt qu'un rappel général : chaque fiche de point indique le texte exact et, quand il y en a une, la limite de ce texte. Beaucoup d'exigences réputées légales sont en réalité des usages professionnels, utiles mais non imposés.`,
        `« Est-ce que ça se voit tout de suite ? » revient presque autant. Sur ${t.theme.toLowerCase()}, la réponse dépend du point : certains écarts sautent aux yeux, d'autres ne se lisent que dans les documents. C'est précisément pour cela qu'un audit regarde les deux, et dans cet ordre.`,
      ],
    },
    {
      titre: `Ce que vous recevez ensuite`,
      paragraphes: [
        `Le rapport donne une note par thème, ce qui permet de voir d'un coup d'œil où se concentre le travail. « ${t.theme} » apparaît avec son détail point par point, chaque constat accompagné du correctif attendu.`,
        `Le plan d'action reprend ces correctifs, classés par priorité et non par thème : ce qui touche à la sécurité du consommateur passe devant, quel que soit le chapitre auquel il appartient. Vous déroulez ensuite la liste vous-même, dans cet ordre, avec vos moyens et votre calendrier.`,
      ],
    },
  ];

  return {
    reponse: `Le thème « ${t.theme} » regroupe ${nombre(items.length)} des ${perimetre(t.volet).n} points du volet ${VOLETS[t.volet].court} de notre grille d'audit, celui que contrôle ${perimetre(t.volet).service} : ${items.map((i) => i.intitule.toLowerCase()).join(', ')}. Chacun est constaté sur place et donne lieu, en cas d'écart, à un correctif écrit que vous appliquez ensuite vous-même.`,
    blocs,
    items,
    autres,
  };
}
