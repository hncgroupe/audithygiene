/**
 * L'assemblage d'une page de commune.
 *
 * Un restaurateur qui cherche « audit hygiène restaurant Créteil » arrive déjà
 * inquiet. Le rôle de la page n'est pas d'ajouter à cette inquiétude, c'est de
 * la faire tomber : un auditeur passe, contrôle tous les points réglementaires,
 * travaille avec discrétion, et laisse un rapport complet avec son plan
 * d'action. L'exploitant corrige ensuite lui-même.
 *
 * D'où le registre : jamais de menace, jamais de chiffre de fermeture, jamais
 * d'amende brandie.
 *
 * Deux limites tenues partout. La prestation s'arrête au rapport : pas de
 * contre-visite, pas de suivi, pas de clôture de dossier, et donc un plan
 * d'action qui doit être applicable sans nous. Et on ne promet jamais l'issue
 * d'un contrôle officiel, qui n'appartient qu'aux services de l'État.
 *
 * Les rédactions elles-mêmes vivent dans contenu-sections.ts. Ce fichier ne
 * fait que calculer les chiffres de la commune, tirer les variantes et monter
 * le plan.
 */

import { GRILLE_AUDIT } from './grille-audit';
import { FORMULES } from './constants';
import {
  ACTIVITES,
  combinaison,
  communeParCode,
  dep,
  graine,
  MEDIANE,
  nombre,
  quantite,
  sujetActivite,
  etabs,
  pluriel,
  tirer,
  urlCommune,
  type Commune,
} from './communes';
import { CONFORME, PROFIL, ROTATION, TISSU, type Chiffres, type Section } from './contenu-sections';

export type { Section };
export type Contenu = {
  reponse: string;
  reperes: { valeur: string; libelle: string }[];
  promesses: string[];
  ouverture: string;
  sections: Section[];
  tableau: {
    libelle: string;
    singulier: string;
    genre: string;
    nombre: number;
    quantite: string;
    part: number;
  }[];
  faq: { question: string; reponse: string }[];
  voisines: { slug: string; nom: string; km: number; url: string }[];
};

/* Le prix vient des formules affichees, jamais d'une reformulation : deux
   montants differents sur le meme site se reperent en trente secondes. */
const PRIX_ESSENTIEL = FORMULES.find((f) => f.id === 'essentiel')?.prix || '';
const PRIX_CONFORMITE = FORMULES.find((f) => f.id === 'conformite')?.prix || '';

const THEMES = GRILLE_AUDIT.map((t) => t.theme);
const NB_POINTS = GRILLE_AUDIT.reduce((a, t) => a + t.items.length, 0);

/* ------------------------------------------------------------------ *
 * L'ouverture : la premiere phrase lue, donc celle qui doit le moins
 * se repeter d'une commune a l'autre.
 * ------------------------------------------------------------------ */

const OUVERTURES: ((x: Chiffres) => string)[] = [
  ({ c }) =>
    `Un auditeur se déplace à ${c.nom}, passe votre établissement en revue point par point, et vous laisse un rapport complet avec son plan d'action. Rien de plus, rien de moins. C'est la manière la plus simple d'arrêter de se demander où on en est.`,
  ({ c, etablissements }) =>
    `Vous n'avez pas besoin d'être irréprochable pour nous appeler. Sur ${etablissements} de bouche recensés à ${c.nom}, aucun ne l'est le premier jour. La conformité se construit, elle ne se décrète pas.`,
  ({ c }) =>
    `La plupart des écarts relevés en cuisine ne sont pas des fautes, ce sont des habitudes prises faute de temps. Elles se corrigent presque toutes en quelques jours. Un auditeur passe à ${c.nom}, vous dit lesquelles, et dans quel ordre les traiter.`,
  ({ c, partDominante, dominanteSujet }) =>
    `${dominanteSujet.charAt(0).toUpperCase() + dominanteSujet.slice(1)} ${pluriel(c.dominante.nombre, 'forme')} ${partDominante} % du tissu de ${c.nom}. Nous auditons ce type d'établissement toute l'année, et les points qui coincent sont toujours les mêmes. Ils se traitent.`,
  ({ c }) =>
    `À ${c.nom}, un auditeur passe, contrôle, explique, et repart en vous laissant la liste. Chaque écart y porte le correctif attendu, écrit pour être appliqué par la personne qui tient la cuisine. La suite vous appartient, et c'est plus simple qu'il n'y paraît.`,
  ({ c }) =>
    `Être en règle n'a rien d'inaccessible : c'est une liste de points connus, écrits noir sur blanc, traités un par un. Nous établissons cette liste chez vous à ${c.nom}, avec le correctif attendu pour chacun. Vous la videz ensuite à votre rythme.`,
  ({ c, parHabitant, etablissements }) =>
    `${etablissements} de bouche à ${c.nom}, soit un pour ${nombre(parHabitant)} habitants, et autant d'exploitants qui se posent la même question sans oser la formuler. Y répondre prend une visite de deux heures.`,
  ({ c, rangTexte }) =>
    `${c.nom} arrive ${rangTexte} pour le nombre d'établissements concernés. Que le tissu soit dense ou clairsemé ne change rien à ce qui vous est demandé : les mêmes textes, les mêmes points, la même grille.`,
  ({ c }) =>
    `Un audit d'hygiène ne se demande pas quand tout va bien, il se demande quand le doute s'installe. Si c'est votre cas à ${c.nom}, la suite de cette page décrit exactement ce qui se passe, du premier appel au rapport que vous gardez.`,
];

/* ------------------------------------------------------------------ *
 * La reponse directe, celle que les moteurs citent.
 * ------------------------------------------------------------------ */

const REPONSES: ((x: Chiffres) => string)[] = [
  ({ c }) =>
    `Un auditeur se déplace à ${c.nom} (${c.codePostal}) et contrôle sur place les ${NB_POINTS} points réglementaires, en toute discrétion. Vous recevez un rapport complet avec son plan d'action : chaque écart, le correctif attendu et la preuve à constituer. Vous corrigez ensuite vous-même, et vous savez exactement quoi faire.`,
  ({ c }) =>
    `L'audit d'hygiène à ${c.nom} se déroule en deux temps : une visite sur place qui passe en revue les ${NB_POINTS} points de la grille, puis un rapport écrit assorti d'un plan d'action classé par priorité. Les corrections vous reviennent, et le rapport est écrit pour que vous puissiez les mener sans nous.`,
  ({ c }) =>
    `Nous auditons les établissements de ${c.nom} sur l'ensemble des ${NB_POINTS} points réglementaires, du froid aux allergènes. La visite est discrète et le rapport complet : chaque écart relevé, son correctif et sa priorité. À vous ensuite de dérouler la liste, avec vos moyens et votre calendrier.`,
  ({ c }) =>
    `À ${c.nom}, un auditeur contrôle votre établissement sur les ${NB_POINTS} points d'une grille qui couvre le même périmètre qu'une visite officielle. Vous repartez avec une note, la liste des écarts et le correctif attendu pour chacun. Rien d'autre à faire que de la traiter.`,
];

/* ------------------------------------------------------------------ *
 * Les requetes standard, en h3 : les formulations reellement tapees.
 * Six tirees parmi dix.
 * ------------------------------------------------------------------ */

const REQUETES: ((x: Chiffres) => { titre: string; texte: string })[] = [
  ({ c }) => ({
    titre: `Audit hygiène restaurant ${c.nom}`,
    texte: `C'est une visite privée, demandée par vous. Un auditeur passe dans votre établissement, contrôle les ${NB_POINTS} points de la grille, et vous remet un rapport complet avec son plan d'action. Personne d'autre que vous n'en reçoit copie, et vous choisissez la date.`,
  }),
  ({ c }) => ({
    titre: `Contrôle sanitaire restaurant ${c.nom}`,
    texte: `C'est la visite officielle, conduite par les services de l'État au titre du règlement (UE) 2017/625. Elle est inopinée et peut donner lieu à des suites administratives. Nous ne la remplaçons pas et n'y assistons pas : nous vous préparons à la recevoir sereinement.`,
  }),
  ({ c }) => ({
    titre: `Audit HACCP ${c.nom}`,
    texte: `HACCP désigne la méthode d'analyse des dangers sur laquelle repose votre plan de maîtrise sanitaire. Un audit HACCP vérifie qu'elle est réellement appliquée chez vous : dangers identifiés, seuils fixés, relevés tenus, actions correctives écrites.`,
  }),
  ({ c }) => ({
    titre: `Plan de maîtrise sanitaire à ${c.nom}`,
    texte: `Le PMS rassemble vos bonnes pratiques d'hygiène, votre analyse des dangers et votre traçabilité. C'est le premier document demandé en contrôle. L'auditeur le parcourt et note ce qui manque, ce qui n'est pas à jour et ce qui ne correspond pas à votre cuisine réelle. Vous savez ensuite quoi reprendre.`,
  }),
  () => ({
    titre: `Grille et check-list d'hygiène pour un restaurant`,
    texte: `Notre grille compte ${NB_POINTS} points répartis en ${THEMES.length} thèmes, du froid aux allergènes. Elle sert de check-list pendant la visite puis de trame au rapport, si bien que vous récupérez la liste complète des points vérifiés, avec le constat de chacun.`,
  }),
  ({ c }) => ({
    titre: `Prix d'un audit d'hygiène à ${c.nom}`,
    texte: `${PRIX_ESSENTIEL} pour l'Audit Essentiel, qui couvre les ${NB_POINTS} points de la grille, et ${PRIX_CONFORMITE} pour l'Audit Conformité, qui ajoute le volet affichage et information du consommateur. Le déplacement à ${c.nom} est compris. Le devis est établi avant toute intervention et il n'y a rien à payer pour l'obtenir.`,
  }),
  () => ({
    titre: `Qui contrôle les restaurants`,
    texte: `Les services vétérinaires départementaux, rattachés à la direction départementale en charge de la protection des populations. Ils interviennent sur programmation, sur signalement, ou à la suite d'une alerte sanitaire. Un cabinet privé comme le nôtre n'a aucun pouvoir de contrôle : il prépare, il ne sanctionne pas.`,
  }),
  () => ({
    titre: `Formation hygiène alimentaire obligatoire`,
    texte: `Tout établissement de restauration commerciale doit compter dans son effectif au moins une personne formée à l'hygiène alimentaire. L'attestation fait partie des documents demandés en visite. Nous vérifions qu'elle existe et qu'elle couvre bien une personne présente, pas un salarié parti depuis deux ans.`,
  }),
  ({ c }) => ({
    titre: `Audit hygiène boulangerie, boucherie et traiteur à ${c.nom}`,
    texte: `Le commerce alimentaire de détail relève des mêmes textes que la restauration, avec des points d'attention propres : allergènes et étiquetage en boulangerie, températures et découpe en boucherie, liaison froide et transport chez un traiteur. La grille s'adapte, le périmètre reste complet.`,
  }),
  () => ({
    titre: `Différence entre audit d'hygiène et certification`,
    texte: `Une certification est délivrée par un organisme accrédité selon un référentiel déposé, et elle engage ce dernier. Un audit d'hygiène est une prestation de conseil : il constate, explique et suit les correctifs. Nous sommes dans le second cas, et nous ne prétendons rien d'autre.`,
  }),
];

/* ------------------------------------------------------------------ *
 * La FAQ : cinq questions tirees parmi quatorze, la premiere etant
 * toujours celle qui porte le chiffre local.
 * ------------------------------------------------------------------ */

const FAQ: ((x: Chiffres) => { question: string; reponse: string })[] = [
  ({ c }) => ({
    question: `La visite se voit-elle en salle ?`,
    reponse: `Non. L'auditeur arrive en civil, à l'heure convenue, en dehors du service, et travaille côté cuisine et réserves. Rien n'indique à vos clients qu'un audit est en cours à ${c.nom}, et le rapport n'est communiqué à personne d'autre que vous.`,
  }),
  () => ({
    question: `Vais-je me faire juger sur l'état de ma cuisine ?`,
    reponse: `Non. L'auditeur voit des dizaines de cuisines par mois et sait à quoi ressemble un établissement en activité. Son travail est de lister ce qui est à reprendre et de vous dire comment, pas de commenter.`,
  }),
  () => ({
    question: `Que se passe-t-il si l'audit révèle beaucoup de points à corriger ?`,
    reponse: `C'est le cas le plus fréquent lors d'une première visite, et ce n'est pas un mauvais signe. Le plan d'action les classe par priorité : d'abord ce qui touche à la sécurité du consommateur, ensuite le reste. Vous avancez dans cet ordre, à votre rythme, pas tout en même temps.`,
  }),
  () => ({
    question: `Est-ce que vous revenez vérifier que j'ai corrigé ?`,
    reponse: `Non. La prestation s'arrête au rapport, et les corrections vous reviennent. C'est la raison pour laquelle le plan d'action précise, pour chaque écart, le correctif attendu et la preuve à constituer : il est écrit pour être appliqué sans nous. Si vous voulez un nouvel état des lieux plus tard, c'est un nouvel audit.`,
  }),
  () => ({
    question: `Tous les points d'un contrôle officiel sont-ils couverts ?`,
    reponse: `Oui. La grille compte ${NB_POINTS} points répartis en ${THEMES.length} thèmes, de la chaîne du froid au plan de maîtrise sanitaire, et suit le même périmètre réglementaire qu'une visite officielle. Chaque point est constaté sur place.`,
  }),
  () => ({
    question: `Le rapport a-t-il une valeur officielle ?`,
    reponse: `Non, et nous ne le présentons jamais autrement. C'est un document privé, destiné à l'exploitant. Seuls les services de l'État délivrent des constats officiels. En revanche il porte les mêmes points que ceux qu'un agent regarde, et vous donne de quoi prouver que vous les avez traités.`,
  }),
  ({ c }) => ({
    question: `L'auditeur se déplace-t-il à ${c.nom} ?`,
    reponse: `Oui, le cabinet intervient partout en Île-de-France, ${dep(c.departement, 'dans')} comme dans les sept autres départements. L'audit se fait sur place : une grille d'hygiène ne se remplit pas à distance.`,
  }),
  () => ({
    question: `Faut-il préparer quelque chose avant la visite ?`,
    reponse: `Non, et il vaut mieux ne rien préparer. Un établissement rangé pour l'occasion donne un audit inutile. Sortez simplement vos documents habituels, même incomplets : c'est justement ce qu'il faut voir.`,
  }),
  () => ({
    question: `Un contrôle sanitaire est-il annoncé à l'avance ?`,
    reponse: `Non, les contrôles officiels sont inopinés dans la grande majorité des cas. C'est précisément pour cela qu'un établissement tenu en continu, avec ses documents à jour, n'a pas à s'en inquiéter : il n'y a rien à préparer dans l'urgence.`,
  }),
  () => ({
    question: `Combien de temps dure la visite ?`,
    reponse: `Environ deux heures dans un établissement de taille courante, davantage si les locaux sont étendus ou la production complexe. La visite se cale en dehors du service pour ne pas désorganiser la cuisine, et aucune fermeture n'est nécessaire.`,
  }),
  () => ({
    question: `Mon équipe doit-elle être présente ?`,
    reponse: `Ce n'est pas obligatoire, mais c'est préférable. Une bonne part de la valeur de la visite tient aux explications données sur le terrain, au moment où l'écart est constaté. Une consigne comprise s'applique mieux qu'une consigne lue.`,
  }),
  () => ({
    question: `Proposez-vous du matériel ou des produits ?`,
    reponse: `Non, et c'est délibéré. Un auditeur qui vend aussi de l'équipement n'est pas dans une position tenable. Le plan d'action indique ce qu'il faut obtenir, jamais chez qui l'acheter, et nous ne touchons aucune commission sur vos prestataires.`,
  }),
  ({ c }) => ({
    question: `Mon établissement est petit, est-ce que cela vaut le coup ?`,
    reponse: `La réglementation ne fait pas de différence de taille : une table de vingt couverts à ${c.nom} relève des mêmes textes qu'une brasserie de deux cents. La visite est simplement plus courte, et le plan d'action plus court aussi.`,
  }),
  ({ c }) => ({
    question: `Combien coûte un audit à ${c.nom} ?`,
    reponse: `${PRIX_ESSENTIEL} pour l'Audit Essentiel et ${PRIX_CONFORMITE} pour l'Audit Conformité, déplacement en Île-de-France compris. Les deux parcourent les ${NB_POINTS} points de la grille : nous ne vendons pas d'audit partiel. Le second ajoute le volet affichage et information du consommateur, qui relève d'un contrôle distinct.`,
  }),
  () => ({
    question: `Faut-il un audit chaque année ?`,
    reponse: `Un passage annuel suffit généralement à tenir le niveau, parce que c'est le rythme auquel les habitudes se relâchent : un responsable qui part, un équipement qui change, un fournisseur remplacé. Entre deux visites, vos questions trouvent une réponse sans nouvelle facturation.`,
  }),
];

const TITRES_REQUETES = [
  (c: Commune) => `Audit hygiène, contrôle sanitaire, HACCP à ${c.nom} : ce que recouvrent ces mots`,
  () => `Les questions que l'on tape avant d'appeler un auditeur`,
  () => `Audit, contrôle, HACCP, PMS : remettre chaque mot à sa place`,
];

/* ------------------------------------------------------------------ */

export function contenuCommune(c: Commune): Contenu {
  const tableau = ACTIVITES.filter((a) => (c.chiffres[a.cle] || 0) > 0)
    .map((a) => ({
      libelle: a.libelle,
      singulier: a.singulier,
      genre: a.genre as string,
      nombre: c.chiffres[a.cle] || 0,
      quantite: quantite(c.chiffres[a.cle] || 0, a),
      part: Math.round(((c.chiffres[a.cle] || 0) / Math.max(c.total, 1)) * 100),
    }))
    .sort((x, y) => y.nombre - x.nombre);

  const voisines = (c.voisines || [])
    .map((v) => {
      const cible = communeParCode(v.code);
      return cible
        ? { slug: cible.slug, nom: cible.nom, km: v.km, url: urlCommune(cible), total: cible.total }
        : null;
    })
    .filter((v): v is NonNullable<typeof v> => Boolean(v))
    .slice(0, 5);

  const x: Chiffres = {
    c,
    parHabitant: Math.round(c.population / Math.max(c.total, 1)),
    densite: ((c.total / Math.max(c.population, 1)) * 1000).toFixed(1).replace('.', ','),
    partDominante: Math.round((c.dominante.nombre / Math.max(c.total, 1)) * 100),
    ecartMediane: c.total - MEDIANE,
    mediane: MEDIANE,
    voisine: voisines[0]
      ? { nom: voisines[0].nom, km: voisines[0].km, total: voisines[0].total }
      : null,
    second: tableau[1]
      ? {
          libelle: tableau[1].libelle,
          nombre: tableau[1].nombre,
          quantite: tableau[1].quantite,
          sujet: sujetActivite(tableau[1].nombre, tableau[1]),
        }
      : null,
    dominanteSujet: sujetActivite(c.dominante.nombre, c.dominante),
    etablissements: etabs(c.total),
    nbPoints: NB_POINTS,
    nbThemes: THEMES.length,
    themes: THEMES,
    rangTexte: `${c.rang}e sur ${nombre(c.classees)} communes ${dep(c.departement)}`,
  };

  /* Une graine par pot : deux communes voisines peuvent tomber sur la meme
     ouverture sans tomber sur le meme plan, ni sur la meme FAQ. */
  /* Quatre familles tirees en une fois, jamais en deux : deux tirages
     successifs peuvent ramener la meme famille, et il faudrait ensuite la
     retirer, ce qui raccourcit la page sans qu'on l'ait decide. */
  const choisies = combinaison(
    ROTATION.map((pot, rang) => ({ pot, rang })),
    4,
    graine(c.code, 'plan')
  );
  /* La redaction se tire sur l'identite de la famille, pas sur sa position :
     sinon deux communes qui tombent sur le meme plan tombent aussi sur les
     memes redactions, et les pages se rejoignent. */
  const rendue = (f: (typeof choisies)[number]) =>
    f.pot[graine(c.code, `redaction${f.rang}`) % f.pot.length](x);

  const sections: Section[] = [
    TISSU[graine(c.code, 'tissu') % TISSU.length](x, tableau),
    PROFIL[graine(c.code, 'profil') % PROFIL.length](x),
    ...choisies.slice(0, 2).map(rendue),
    CONFORME[graine(c.code, 'promesse') % CONFORME.length](x),
    {
      titre: tirer(TITRES_REQUETES, graine(c.code, 'titreRequetes'), 13)(c),
      paragraphes: [
        `Ces termes se mélangent souvent dans les recherches, et la confusion coûte du temps à ceux qui cherchent de l'aide. Voici ce que chacun désigne exactement, et lequel correspond à votre situation à ${c.nom}.`,
      ],
      sous: combinaison(REQUETES, 6, graine(c.code, 'requetes')).map((f) => f(x)),
    },
    ...choisies.slice(2).map(rendue),
  ];

  const premiere = {
    question: `Combien d'établissements sont concernés à ${c.nom} ?`,
    reponse: `${x.etablissements} d'après la base SIRENE, dont ${tableau
      .slice(0, 3)
      .map((t) => t.quantite)
      .join(', ')}. Tous relèvent des mêmes règles d'hygiène, quelle que soit leur taille.`,
  };
  /* Deux entrees fixes : le chiffre local, qui fonde la page, et le prix, qui
     est la question commerciale la plus tapee. Le reste tourne. */
  const rendues = FAQ.map((f) => f(x));
  const prix = rendues.find((f) => /Combien coûte/.test(f.question));
  const faq = [
    premiere,
    ...(prix ? [prix] : []),
    ...combinaison(
      rendues.filter((f) => f !== prix),
      prix ? 4 : 5,
      graine(c.code, 'faq')
    ),
  ];

  return {
    reperes: [
      { valeur: nombre(c.total), libelle: `${pluriel(c.total, 'établissement')} de bouche à ${c.nom}` },
      { valeur: `${c.rang}e`, libelle: `sur ${nombre(c.classees)} communes ${dep(c.departement)}` },
      { valeur: String(NB_POINTS), libelle: `points réglementaires contrôlés` },
      { valeur: String(THEMES.length), libelle: `thèmes couverts, sans impasse` },
    ],
    promesses: [
      'Tous les points réglementaires',
      'Visite discrète',
      "Rapport complet et plan d'action",
      'Correctifs écrits, applicables sans nous',
      'Partout en Île-de-France',
    ],
    reponse: REPONSES[graine(c.code, 'reponse') % REPONSES.length](x),
    ouverture: OUVERTURES[graine(c.code, 'ouverture') % OUVERTURES.length](x),
    sections,
    tableau,
    faq,
    voisines,
  };
}
