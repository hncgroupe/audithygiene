/**
 * Les pots de formulation des pages de commune.
 *
 * Une page programmatique ne vaut que par ce qui la distingue des neuf cents
 * autres. Trois leviers, dans cet ordre d'efficacite :
 *
 *   1. un pot de redactions par section, tire par une graine propre a la
 *      section, si bien que deux communes voisines ne partagent presque jamais
 *      la meme phrase au meme endroit ;
 *   2. des chiffres calcules page par page, injectes dans la prose partagee :
 *      rang, densite, ecart a la mediane, comparaison a la commune voisine ;
 *   3. un plan combinatoire : quatre sections tirees parmi neuf, ce qui fait
 *      cent vingt-six plans, et non un ordre different du meme contenu, qui ne
 *      trompe personne.
 *
 * Chaque variante dit la meme chose sur le fond, parce que la promesse du
 * cabinet ne change pas d'une commune a l'autre. Ce qui change, c'est l'angle
 * d'attaque, la structure de la phrase et le chiffre qui l'ancre.
 */

import { dep, etabs, nombre, pluriel, type Commune } from './communes';

export type Section = {
  titre: string;
  paragraphes: string[];
  sous?: { titre: string; texte: string }[];
  accent?: boolean;
};

/** Les reperes chiffres d'une commune, calcules une fois et passes partout. */
export type Chiffres = {
  c: Commune;
  /** Habitants par etablissement de bouche : la densite vue a l'envers. */
  parHabitant: number;
  /** Etablissements pour mille habitants, un chiffre par commune. */
  densite: string;
  /** Part de l'activite dominante, en pourcentage du total. */
  partDominante: number;
  /** Ecart au nombre median d'etablissements des communes couvertes. */
  ecartMediane: number;
  mediane: number;
  /** La commune voisine la plus proche, quand elle existe. */
  voisine: { nom: string; km: number; total: number } | null;
  /** Le deuxieme type d'etablissement le plus represente. */
  second: { libelle: string; nombre: number; quantite: string; sujet: string } | null;
  /** L'activite dominante en sujet de phrase, accordee. */
  dominanteSujet: string;
  /** « 1 etablissement » ou « 412 etablissements », deja accorde. */
  etablissements: string;
  nbPoints: number;
  nbThemes: number;
  themes: string[];
  /** Le rang de la commune, deja mis en phrase. */
  rangTexte: string;
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ------------------------------------------------------------------ *
 * 1. Le tissu local. Toujours presente : c'est la section qui porte
 *    les chiffres, donc celle qui justifie l'existence de la page.
 * ------------------------------------------------------------------ */

type Ligne = { libelle: string; singulier: string; nombre: number; quantite: string };

export const TISSU: ((x: Chiffres, t: Ligne[]) => Section)[] = [
  ({ c, parHabitant, mediane, ecartMediane }, t) => ({
    titre: `${etabs(c.total)} de bouche à ${c.nom}`,
    paragraphes: [
      `La base SIRENE recense ${t
        .slice(0, 4)
        .map((l) => l.quantite)
        .join(', ')} en activité à ${c.nom} (${c.codePostal}), pour ${nombre(c.population)} habitants. Cela fait un établissement pour ${nombre(parHabitant)} habitants.`,
      `Rapporté aux communes que nous couvrons, dont la médiane s'établit à ${etabs(mediane)}, ${c.nom} se situe ${
        ecartMediane >= 0
          ? `${nombre(ecartMediane)} ${pluriel(ecartMediane, 'adresse')} au dessus`
          : `${nombre(-ecartMediane)} ${pluriel(-ecartMediane, 'adresse')} en dessous`
      }. Ce chiffre ne dit rien de la qualité des établissements, et tout de la concurrence : plus le tissu est dense, plus une réputation se fait et se défait vite.`,
    ],
  }),
  ({ c, densite, second, dominanteSujet }, t) => ({
    titre: `Combien d'établissements sont concernés à ${c.nom}`,
    paragraphes: [
      `${nombre(c.total)} ${pluriel(c.total, 'adresse')}, ${pluriel(c.total, 'répartie')} entre ${nombre(t.length)} ${pluriel(t.length, "type")} d'activité, dont ${t
        .slice(0, 3)
        .map((l) => l.quantite)
        .join(' et ')}. Ramené à la population, cela donne ${densite} établissement pour mille habitants à ${c.nom}.`,
      second
        ? `Derrière ${dominanteSujet}, ce sont ${second.quantite} qui ${pluriel(second.nombre, 'forme')} le second bloc. Cette répartition compte, parce qu'elle décide des points sur lesquels la visite passera le plus de temps.`
        : `Cette concentration sur une seule activité simplifie l'audit : les points sensibles sont connus, et la visite va droit au but.`,
    ],
  }),
  ({ c, parHabitant, etablissements }, t) => ({
    titre: `Le tissu de la restauration à ${c.nom} (${c.codePostal})`,
    paragraphes: [
      `Pour ${nombre(c.population)} habitants, ${c.nom} compte ${etablissements} manipulant des denrées : ${t
        .slice(0, 4)
        .map((l) => l.quantite)
        .join(', ')}. Un pour ${nombre(parHabitant)} habitants, chiffres SIRENE des établissements en activité.`,
      `La commune arrive ${c.rang}e sur les ${nombre(c.classees)} communes ${dep(c.departement)} que nous couvrons. Tous ces établissements relèvent des mêmes textes, de la table de quartier à l'enseigne de centre commercial : la réglementation ne fait pas de différence de taille.`,
    ],
  }),
  ({ c, densite, partDominante, dominanteSujet, etablissements }, t) => ({
    titre: `Qui est concerné par l'hygiène alimentaire à ${c.nom}`,
    paragraphes: [
      `Tout établissement qui manipule des denrées, soit ${etablissements} sur la commune : ${t
        .slice(0, 4)
        .map((l) => l.quantite)
        .join(', ')}. ${cap(dominanteSujet)} en ${pluriel(c.dominante.nombre, 'concentre')} ${partDominante} %, ce qui donne à ${c.nom} son profil propre.`,
      `Rapportée aux ${nombre(c.population)} habitants, cette densité de ${densite} pour mille situe la commune sans la flatter. Elle dit surtout une chose utile : vous n'êtes pas seul à vous poser la question, et les points qui coincent chez vous coincent chez vos voisins.`,
    ],
  }),
  ({ c, parHabitant, etablissements }, t) => ({
    titre: `${etabs(c.total)} soumis aux mêmes règles à ${c.nom}`,
    paragraphes: [
      `Le relevé SIRENE donne ${t
        .slice(0, 3)
        .map((l) => l.quantite)
        .join(', ')}, pour un total de ${etablissements} en activité, soit un pour ${nombre(parHabitant)} habitants de la commune.`,
      `Cette photographie vient d'une base publique et se vérifie en quelques clics. Nous la donnons pour une raison simple : une page qui parle d'audit sans citer un seul chiffre local ne parle de rien, et le lecteur le sent tout de suite.`,
    ],
  }),
];

/* ------------------------------------------------------------------ *
 * 2. Ce que le profil local change. Toujours presente, elle aussi
 *    chiffree.
 * ------------------------------------------------------------------ */

export const PROFIL: ((x: Chiffres) => Section)[] = [
  ({ c, partDominante, dominanteSujet }) => ({
    titre: `Ce que le profil de ${c.nom} change à l'audit`,
    paragraphes: [
      `Avec ${nombre(c.dominante.nombre)} ${pluriel(c.dominante.nombre, 'adresse')}, soit ${partDominante} % du total, ${dominanteSujet} ${pluriel(c.dominante.nombre, 'donne')} le ton du tissu local. Les points sensibles ne sont pas les mêmes d'une activité à l'autre : la chaîne du froid pèse davantage là où l'on stocke, la traçabilité là où l'on transforme, l'organisation des flux là où les locaux sont étroits.`,
      `Nous partons donc de votre activité réelle et de vos locaux, jamais d'une grille générique appliquée telle quelle. L'auditeur suit le produit de la réception à l'assiette et note ce qu'il voit, dans l'ordre où ça se passe chez vous.`,
    ],
  }),
  ({ c, second, partDominante, dominanteSujet }) => ({
    titre: `Un audit calé sur votre activité, pas sur un modèle`,
    paragraphes: [
      `${cap(dominanteSujet)} ${pluriel(c.dominante.nombre, 'représente')} ${partDominante} % des établissements de ${c.nom}${second ? `, devant ${second.sujet}` : ''}. Chaque profil a ses points de friction connus, et un audit qui les ignore n'apporte rien : il faut regarder ce qui, chez vous, peut réellement aller de travers.`,
      `Concrètement, la grille reste la même, mais l'ordre et le temps passé changent. Un traiteur sera davantage regardé sur la liaison froide et les transports, une boulangerie sur les allergènes et le nettoyage, un bar sur la glace et la plonge.`,
    ],
  }),
  ({ c, voisine }) => ({
    titre: `Pourquoi la visite ressemble rarement à celle d'à côté`,
    paragraphes: [
      `Deux établissements de ${c.nom} de la même taille n'ont presque jamais les mêmes écarts. Cela tient aux locaux, à l'ancienneté du matériel, au turnover en cuisine, et surtout à ce qui a déjà été mis en place. L'audit sert à repérer ce qui manque chez vous, pas à rappeler des généralités.`,
      voisine
        ? `C'est aussi pour cela que nous ne comparons pas les établissements entre eux. Que ${voisine.nom}, à ${voisine.km} km, compte ${nombre(voisine.total)} adresses ne vous dit rien de votre propre situation : seule une visite le dit.`
        : `C'est aussi pour cela que nous ne comparons pas les établissements entre eux : seule une visite sur place dit où vous en êtes réellement.`,
    ],
  }),
  ({ c, second }) => ({
    titre: `Une grille commune, un déroulé qui vous ressemble`,
    paragraphes: [
      `${cap(etabs(c.total))} de ${c.nom} n'${pluriel(c.total, 'a', 'ont')} pas les mêmes contraintes. Une cuisine ouverte ne se regarde pas comme un laboratoire fermé, un service continu pas comme deux services, une carte courte pas comme une carte de quarante plats. La grille ne change pas, la manière de la parcourir si.`,
      second
        ? `C'est pourquoi l'auditeur commence par vous écouter décrire une journée type. Que la commune compte ${second.quantite} n'y change rien : ce qui compte est votre organisation, pas la moyenne locale.`
        : `C'est pourquoi l'auditeur commence par vous écouter décrire une journée type : ce qui compte est votre organisation, pas une moyenne locale.`,
    ],
  }),
  ({ c, partDominante, dominanteSujet }) => ({
    titre: `Les points qui reviennent le plus dans ce type d'établissement`,
    paragraphes: [
      `${cap(dominanteSujet)} ${pluriel(c.dominante.nombre, 'pèse')} ${partDominante} % du tissu de ${c.nom}, et sur ce profil les mêmes écarts reviennent : relevés de température interrompus, dates d'ouverture absentes sur les produits entamés, plan de nettoyage jamais mis à jour après un changement de matériel.`,
      `Les connaître ne dispense pas de venir voir. Ce sont des tendances, pas un diagnostic, et l'écart qui vous coûtera cher est souvent celui auquel personne ne pensait.`,
    ],
  }),
];

/* ------------------------------------------------------------------ *
 * 3. La promesse. Toujours presente, mise en avant visuellement.
 * ------------------------------------------------------------------ */

export const CONFORME: ((x: Chiffres) => Section)[] = [
  ({ c }) => ({
    accent: true,
    titre: `Avec nous, votre établissement est conforme`,
    paragraphes: [
      `L'auditeur relève les écarts, les classe par priorité et écrit le correctif attendu pour chacun. Ensuite, vous corrigez. C'est vous qui tenez l'établissement, vous connaissez vos contraintes et votre calendrier mieux que nous, et la plupart des points se traitent sans intervention extérieure.`,
      `Notre part du travail est de rendre cette liste applicable seule. Chaque ligne dit ce qui a été vu, ce qu'il faut obtenir et ce qui en fera la preuve. Vous n'avez besoin de personne pour la dérouler à ${c.nom}, et le jour où elle est vide, votre établissement est en règle.`,
    ],
  }),
  ({ c, nbPoints }) => ({
    accent: true,
    titre: `Notre engagement : un rapport que vous pouvez appliquer seul`,
    paragraphes: [
      `Beaucoup de rapports d'audit sont illisibles pour la personne qui devra les appliquer : des références d'articles, des constats sans suite, un vocabulaire d'inspecteur. Sur les ${nbPoints} points, nous écrivons l'inverse : ce qui a été vu, ce qu'il faut faire, et à quoi on verra que c'est fait.`,
      `C'est ce qui vous rend autonome. Vous corrigez vous-même, dans l'ordre qui vous arrange, sans nous rappeler et sans dépendre d'un prestataire. Le jour où la liste de votre établissement de ${c.nom} est vide, vous le savez et vous pouvez le montrer.`,
    ],
  }),
  ({ c }) => ({
    accent: true,
    titre: `De l'état des lieux à la conformité, qui fait quoi`,
    paragraphes: [
      `La visite dit où vous en êtes, point par point. Le plan d'action dit quoi faire, dans quel ordre et avec quel délai raisonnable. À partir de là, la main vous revient : vous traitez la liste avec vos moyens, votre équipe et vos artisans habituels.`,
      `Ce partage est clair, et il est voulu. Notre métier est de voir ce que vous ne voyez plus et de l'écrire de façon exploitable. Le vôtre est de faire tourner un établissement, et personne n'est mieux placé que vous pour décider dans quel ordre les corrections rentrent dans une semaine de service à ${c.nom}.`,
    ],
  }),
];

/* ------------------------------------------------------------------ *
 * 4. Les sections qui tournent. Quatre tirees parmi neuf.
 * ------------------------------------------------------------------ */

const couverture: ((x: Chiffres) => Section)[] = [
  ({ c, nbPoints, nbThemes, themes }) => ({
    titre: `Tous les points réglementaires sont audités`,
    paragraphes: [
      `La visite ne fait pas d'impasse : ${nbPoints} points de contrôle répartis en ${nbThemes} thèmes, de ${themes[0].toLowerCase()} à ${themes[themes.length - 1].toLowerCase()}. Chacun est constaté sur place par l'auditeur, pas déclaré par vos soins.`,
      `Le périmètre découle des textes eux-mêmes : le règlement (CE) 852/2004 pour l'hygiène des denrées, l'arrêté du 21 décembre 2009 pour les produits d'origine animale, le règlement (UE) 1169/2011 pour les allergènes. Auditer moins reviendrait à vous laisser un angle mort, ce qu'un audit doit précisément éviter.`,
    ],
  }),
  ({ c, nbPoints, themes }) => ({
    titre: `Les ${themes.length} thèmes passés en revue à ${c.nom}`,
    paragraphes: [
      `${themes.slice(0, 6).join(', ')}, puis ${themes.slice(6).join(', ')}. Ces ${themes.length} thèmes se décomposent en ${nbPoints} points, et aucun n'est laissé de côté au motif qu'il serait secondaire : un contrôle officiel ne fait pas ce tri non plus.`,
      `Chaque point porte sa référence réglementaire, et le rapport distingue clairement ce qui est imposé par un texte de ce qui relève de la bonne pratique professionnelle. Cette distinction évite de vous faire dépenser pour une exigence qui n'existe pas.`,
    ],
  }),
  ({ nbPoints }) => ({
    titre: `Le même périmètre qu'un contrôle officiel`,
    paragraphes: [
      `L'intérêt d'un audit blanc tient entièrement à son exhaustivité. S'il ne regarde que le visible, il rassure à tort. Notre grille reprend donc les ${nbPoints} points qu'un agent est susceptible de vérifier, documents compris, et les traite dans le même ordre : les papiers d'abord, la cuisine ensuite.`,
      `La différence est ailleurs : l'auditeur explique pendant qu'il constate, revient sur ce qui n'est pas clair, et laisse de quoi corriger. Un agent de contrôle, lui, constate et repart.`,
    ],
  }),
];

const rapport: ((x: Chiffres) => Section)[] = [
  ({ nbThemes }) => ({
    titre: `Un rapport complet, et un plan d'action`,
    paragraphes: [
      `À l'issue de la visite, vous recevez un rapport écrit : chaque point avec son constat, les photos qui appuient les écarts, une note globale et le détail des ${nbThemes} thèmes. Rien n'y est laissé à l'interprétation, et rien n'y a été noté dans votre dos, tout ayant été dit pendant la visite.`,
      `Le rapport se termine par le plan d'action, la partie que vous utiliserez vraiment : chaque écart devient une tâche, avec le correctif attendu, la priorité et un délai réaliste. C'est écrit en français courant, pour être exploitable par la personne qui tient la cuisine.`,
    ],
  }),
  () => ({
    titre: `Ce que contient le rapport que vous recevez`,
    paragraphes: [
      `Une note globale et une note par thème, pour situer d'un coup d'œil. Le constat de chaque point, avec la photo quand elle éclaire. La distinction entre écart mineur et écart majeur, parce que les deux n'appellent pas la même réaction. Et pour chaque écart, ce qu'il faut faire.`,
      `Le plan d'action reprend l'ensemble sous forme de liste à traiter, classée par priorité. Beaucoup d'exploitants l'impriment et le cochent au fil des semaines : c'est exactement l'usage prévu.`,
    ],
  }),
  ({ c }) => ({
    titre: `Un document fait pour être utilisé, pas pour être classé`,
    paragraphes: [
      `Un rapport d'audit illisible ne sert à personne. Le nôtre évite les références d'articles en corps de texte, les tournures administratives et les formulations qui n'engagent à rien. Chaque ligne dit ce qui a été vu, pourquoi ça compte, et ce qu'il faut faire.`,
      `Vous le recevez sous quelques jours après la visite à ${c.nom}, au format PDF, avec le plan d'action en fin de document. Il vous appartient : vous pouvez le transmettre à votre équipe, à votre bailleur ou à votre franchiseur, ou ne le montrer à personne.`,
    ],
  }),
];

const discretion: ((x: Chiffres) => Section)[] = [
  ({ c }) => ({
    titre: `Une visite discrète, et des données qui restent chez vous`,
    paragraphes: [
      `L'auditeur se présente en civil, à l'heure convenue et en dehors du coup de feu. Rien ne signale sa présence en salle, et la visite se déroule côté cuisine et réserves. Vos clients n'ont pas à savoir qu'un audit a lieu à ${c.nom}, vos fournisseurs non plus.`,
      `Le rapport est un document privé, remis à vous seul. Il n'est transmis à aucune administration, à aucun assureur, à aucune enseigne. Nous ne publions ni le nom ni l'adresse des établissements audités, et les photos ne servent qu'à documenter votre plan d'action.`,
    ],
  }),
  () => ({
    titre: `Confidentialité : ce qui est vu pendant la visite reste entre nous`,
    paragraphes: [
      `C'est la première question posée, et elle est légitime : personne n'a envie qu'un état des lieux circule. Nos auditeurs sont tenus à la confidentialité sur tout ce qu'ils constatent, et aucun élément d'un audit ne sort du cabinet, ni sous forme de nom, ni sous forme d'exemple.`,
      `Techniquement, photos et rapports sont conservés dans un espace fermé, accessible au seul auditeur en charge, et supprimés sur simple demande. Vous restez propriétaire de vos données du premier jour au dernier.`,
    ],
  }),
  ({ c }) => ({
    titre: `Personne ne saura qu'un auditeur est passé`,
    paragraphes: [
      `Pas de véhicule marqué, pas de badge visible, pas de passage en salle aux heures de service. Dans une commune comme ${c.nom}, où ${etabs(c.total)} se ${pluriel(c.total, 'côtoie', 'côtoient')}, la discrétion n'est pas un détail de confort : c'est une condition pour que vous puissiez faire le point sans que cela se commente.`,
      `Si vous préférez que l'équipe elle-même ne sache pas de quoi il s'agit, dites-le : l'auditeur se présentera comme vous le souhaitez. Cela ne change rien à ce qu'il regarde.`,
    ],
  }),
];

const rassurer: ((x: Chiffres) => Section)[] = [
  () => ({
    titre: `Un contrôle n'est pas une sanction`,
    paragraphes: [
      `C'est la première chose à remettre à sa place. Une visite des services de contrôle est un acte de routine, encadré par le règlement (UE) 2017/625, et la grande majorité se termine par des observations à corriger dans un délai. L'agent attend surtout de voir un exploitant qui connaît son établissement et sait répondre.`,
      `Les mesures lourdes existent, mais elles répondent à un risque immédiat pour le consommateur, pas à un carrelage fendu ou à un classeur en retard. Autrement dit : ce qui vous inquiète le plus est presque toujours ce qui se corrige le plus vite.`,
    ],
  }),
  ({ c }) => ({
    titre: `Vous n'avez pas à être parfait pour nous appeler`,
    paragraphes: [
      `Nous n'avons jamais visité un établissement sans écart, et nous n'en attendons pas. Sur ${nombre(c.total)} ${pluriel(c.total, 'adresse')} à ${c.nom}, aucune ne coche tout dès la première visite. Un audit sur un établissement irréprochable n'apprendrait d'ailleurs rien à personne.`,
      `Le bon moment pour appeler est justement celui où vous avez un doute : après une remarque, avant une reprise, quand l'équipe a changé, ou simplement parce que le sujet traîne depuis des mois. Le doute est un signal, pas un aveu.`,
    ],
  }),
  () => ({
    titre: `Ce qui se corrige vite, et ce qui prend du temps`,
    paragraphes: [
      `Une large part des écarts se règle en quelques jours, sans dépense : un thermomètre à recalibrer, des relevés à reprendre, un rangement à revoir, une procédure à écrire. Ce sont les plus nombreux, et ce sont eux qui pèsent le plus en contrôle, parce qu'ils sont visibles immédiatement.`,
      `Restent les points matériels, un joint, un revêtement, une hotte, qui demandent une intervention et parfois un budget. Ils sont identifiés comme tels dans le plan d'action, avec un délai qui tient compte de la réalité d'un établissement en activité.`,
    ],
  }),
];

const documents: ((x: Chiffres) => Section)[] = [
  () => ({
    titre: `Les documents, la partie la plus facile à rattraper`,
    paragraphes: [
      `Une visite officielle commence souvent par les papiers : plan de maîtrise sanitaire, relevés de température, bons de livraison, plan de nettoyage, lutte contre les nuisibles, preuve qu'une personne est formée à l'hygiène alimentaire. C'est là que beaucoup d'exploitants se sentent pris au dépourvu.`,
      `C'est pourtant le volet le plus rapide à mettre en ordre : il ne demande ni travaux ni investissement, seulement de la méthode. L'auditeur ouvre chacun de ces documents, note ce qui manque et ce qui n'est pas à jour, et l'écrit dans le rapport. Vous savez alors exactement quoi compléter, et une fois le pli pris l'entretien prend quelques minutes par semaine.`,
    ],
  }),
  () => ({
    titre: `Votre classeur sanitaire, passé en revue`,
    paragraphes: [
      `Le plan de maîtrise sanitaire n'est pas un formulaire à signer une fois : c'est le document qui décrit comment vous maîtrisez les dangers, et il doit ressembler à ce que vous faites vraiment. Un PMS acheté tel quel et jamais adapté se repère en quelques minutes.`,
      `L'auditeur le parcourt volet par volet, bonnes pratiques d'hygiène, analyse des dangers, traçabilité, gestion des non-conformités, et relève ce qui manque ou ne correspond pas à ce qu'il a vu en cuisine. Le rapport dit quoi reprendre, et dans quel ordre. La rédaction, elle, vous appartient : c'est votre organisation qu'il décrit, personne ne peut l'écrire à votre place.`,
    ],
  }),
  ({ c }) => ({
    titre: `Ce qu'on vous demandera de sortir en premier`,
    paragraphes: [
      `Les relevés de température des dernières semaines, les bons de livraison récents, le plan de nettoyage, le contrat ou le suivi de dératisation, l'attestation de formation en hygiène alimentaire, et le plan de maîtrise sanitaire. Six documents, et la première impression est jouée.`,
      `Un exploitant de ${c.nom} qui sort ce dossier en trente secondes aborde la suite de la visite dans de bien meilleures conditions. Ce n'est pas une question de chance : c'est une organisation, et elle se met en place en une matinée.`,
    ],
  }),
];

const equipe: ((x: Chiffres) => Section)[] = [
  () => ({
    titre: `Vos équipes ne sont pas mises en cause`,
    paragraphes: [
      `Un audit n'est pas une inspection du personnel, et nous le disons devant l'équipe en arrivant. Ce qui est regardé, ce sont des locaux, des températures, des procédures et des documents. Quand un geste est à corriger, il l'est parce que personne ne l'a jamais expliqué, pas parce que quelqu'un a mal travaillé.`,
      `Cette mise au point change le déroulement de la visite : une équipe qui ne se sent pas jugée montre ce qui coince vraiment, et le plan d'action final est autrement plus utile.`,
    ],
  }),
  ({ c }) => ({
    titre: `Un passage en cuisine qui ne braque personne`,
    paragraphes: [
      `Dans un métier où le turnover est ce qu'il est, l'arrivée d'un auditeur peut être mal reçue. Nous prenons donc deux minutes en début de visite pour expliquer à l'équipe qui nous sommes, ce que nous regardons et ce que le rapport deviendra. Le ton de la visite se joue là.`,
      `L'auditeur travaille avec le personnel, pas contre lui : il demande, il écoute, il explique le pourquoi d'un seuil ou d'un geste. Beaucoup d'exploitants de ${c.nom} nous disent que c'est cette partie, la pédagogie sur le terrain, qui a le plus changé les habitudes.`,
    ],
  }),
  () => ({
    titre: `L'audit comme moment de formation informelle`,
    paragraphes: [
      `Chaque écart relevé est l'occasion d'expliquer ce qu'il produit : pourquoi un frigo à la limite haute est un problème même si rien ne sent, pourquoi une planche de découpe fendue ne se rattrape pas au nettoyage, pourquoi une date d'ouverture manquante rend un produit inutilisable.`,
      `Cette explication vaut souvent mieux qu'une consigne écrite. Une équipe qui a compris le mécanisme applique la règle même quand personne ne regarde, et c'est la seule hygiène qui tienne dans la durée.`,
    ],
  }),
];

const delais: ((x: Chiffres) => Section)[] = [
  ({ c }) => ({
    titre: `Combien de temps prend la démarche`,
    paragraphes: [
      `La visite occupe environ deux heures dans un établissement de taille courante, davantage si les locaux sont étendus ou la production complexe. Elle se cale en dehors du service, souvent le matin ou l'après-midi entre deux coups de feu, pour ne pas désorganiser la cuisine.`,
      `Le rapport suit sous quelques jours. Ensuite, le calendrier vous appartient entièrement : les correctifs simples se traitent souvent dans la foulée, les points matériels prennent le temps d'un devis et d'une intervention. Le plan d'action donne un ordre de priorité, pas une échéance imposée.`,
    ],
  }),
  ({ c }) => ({
    titre: `Le calendrier, de l'appel au rapport`,
    paragraphes: [
      `Un échange de quelques minutes suffit à cerner votre activité et à établir un devis. La visite se cale ensuite selon vos disponibilités à ${c.nom}, jour de fermeture compris si cela vous arrange.`,
      `Ensuite, le rythme vous appartient. Certains exploitants soldent leur plan d'action en deux semaines, d'autres étalent sur un trimestre parce qu'un poste de travail doit être repris. Les deux se défendent, et personne ne viendra vous mettre la pression : la liste est à vous, vous la traitez comme vous l'entendez.`,
    ],
  }),
  () => ({
    titre: `Une visite qui ne bloque pas le service`,
    paragraphes: [
      `L'auditeur s'adapte au rythme de la maison. Il commence par les documents, qui se regardent au calme, puis passe en cuisine quand le poste est libre. Si un coup de feu s'annonce, il attend : un audit conduit dans la précipitation ne vaut rien.`,
      `Aucune fermeture n'est nécessaire, aucune préparation non plus. Un établissement en fonctionnement normal est exactement ce qu'il faut observer, et c'est même la seule façon de voir ce qui se passe réellement.`,
    ],
  }),
];

const suites: ((x: Chiffres) => Section)[] = [
  () => ({
    titre: `Ce qu'il se passe après le plan d'action`,
    paragraphes: [
      `Vous traitez les points dans l'ordre donné, en commençant par ce qui touche à la sécurité du consommateur. Pour chacun, le rapport indique ce qui est attendu et ce qui fera preuve : une photo, un relevé, une facture d'intervention, une procédure écrite.`,
      `Conservez ces preuves au fur et à mesure, dans le classeur, à côté du rapport. C'est ce qui transforme une liste cochée en dossier montrable : le jour d'un contrôle, vous avez sous la main ce qui avait été relevé, ce que vous en avez fait, et quand.`,
    ],
  }),
  ({ c }) => ({
    titre: `Et ensuite ? Tenir le niveau dans la durée`,
    paragraphes: [
      `Le vrai risque n'est pas de rater un point, c'est de le corriger puis de le laisser retomber. Les relevés s'arrêtent quand le responsable part, le plan de nettoyage se périme quand un équipement change, la traçabilité se relâche quand un fournisseur est remplacé.`,
      `Un passage annuel suffit généralement à tenir le niveau à ${c.nom}. Entre deux audits, le rapport reste votre référence : il liste les points à surveiller, et une relecture au moment d'un changement d'équipe ou de matériel évite de laisser une habitude se perdre.`,
    ],
  }),
  () => ({
    titre: `Des preuves, pas seulement des intentions`,
    paragraphes: [
      `Devant un contrôle, dire qu'on fait quelque chose ne suffit jamais : il faut pouvoir le montrer. C'est la raison pour laquelle chaque correctif du plan d'action précise ce qui en fera la preuve : une photo, un relevé, une facture, une procédure signée.`,
      `À vous de les rassembler à mesure que vous avancez. Le rapport et les preuves que vous y joignez forment un dossier qui retrace ce qui a été constaté, ce que vous avez corrigé et à quelle date. Il n'a aucune valeur officielle, mais il montre une chose difficile à contester : que l'établissement est tenu.`,
    ],
  }),
];

const pourquoi: ((x: Chiffres) => Section)[] = [
  ({ c }) => ({
    titre: `Pourquoi faire auditer son établissement à ${c.nom}`,
    paragraphes: [
      `Trois situations reviennent. Une reprise ou une ouverture, où l'on veut partir sur des bases saines. Un changement d'équipe en cuisine, qui remet en cause les habitudes acquises. Ou simplement une inquiétude qui dure, entretenue par une remarque, un article, une visite chez un confrère.`,
      `Dans les trois cas, le bénéfice est le même : remplacer une impression par une liste. Une liste se traite, une impression tourne en boucle.`,
    ],
  }),
  () => ({
    titre: `Le bon moment pour faire le point`,
    paragraphes: [
      `Avant l'été, quand les volumes montent et que le froid travaille davantage. Avant une inspection attendue, quand un voisin vient d'en recevoir une. Après des travaux, qui déplacent souvent des flux sans qu'on y pense. Ou à date fixe, une fois par an, ce qui reste la formule la plus simple.`,
      `Le mauvais moment, c'est celui où l'on n'a plus le choix. Un écart découvert par vous se corrige tranquillement ; le même découvert en contrôle se corrige sous délai, avec la pression en plus.`,
    ],
  }),
  ({ c }) => ({
    titre: `Ce qu'un audit change concrètement`,
    paragraphes: [
      `Le premier effet est immédiat : vous savez où vous en êtes, point par point, au lieu de le supposer. Le deuxième vient dans les semaines qui suivent, quand les correctifs simples tombent les uns après les autres et que la cuisine se remet en ordre sans que personne n'ait eu à improviser.`,
      `Le troisième est plus discret et plus durable : l'équipe a compris le pourquoi des règles, et les habitudes tiennent. C'est ce qui fait qu'un établissement de ${c.nom} passe d'une conformité de façade à une conformité réelle.`,
    ],
  }),
];

const independance: ((x: Chiffres) => Section)[] = [
  () => ({
    titre: `Un regard extérieur, et c'est tout l'intérêt`,
    paragraphes: [
      `On ne voit plus les locaux dans lesquels on travaille tous les jours. Le carton posé au sol depuis trois mois, la porte de chambre froide qui ferme mal, l'étiquette illisible : tout cela disparaît du champ de vision de celui qui est là en permanence, et saute aux yeux d'un visiteur.`,
      `C'est la raison d'être d'un auditeur externe. Il n'a pas d'habitude à défendre, pas de compromis passé avec l'organisation en place, et aucune raison d'arrondir un constat.`,
    ],
  }),
  () => ({
    titre: `Indépendance : nous ne vendons rien d'autre que l'audit`,
    paragraphes: [
      `Un auditeur qui vend aussi du matériel, des produits d'entretien ou un contrat de dératisation n'est pas dans une position tenable : chaque écart relevé devient un devis. Nous ne commercialisons aucun équipement et ne touchons aucune commission sur les prestataires que vous choisirez.`,
      `Le plan d'action indique donc ce qu'il faut obtenir, pas chez qui l'acheter. Quand plusieurs solutions existent, elles sont présentées avec leur coût relatif, et la décision vous revient.`,
    ],
  }),
  ({ nbPoints }) => ({
    titre: `Ce que nous ne faisons pas`,
    paragraphes: [
      `Nous ne délivrons aucun agrément, aucune certification officielle, aucun document opposable à l'administration. Un audit privé ne remplace pas un contrôle des services vétérinaires et ne le prévient pas. Prétendre le contraire serait vendre du vent, et vous le découvririez au pire moment.`,
      `Ce que nous faisons est plus modeste et plus utile : constater les ${nbPoints} points sur place, écrire ce qui est à reprendre, et suivre jusqu'à la clôture. Le reste appartient aux services de l'État.`,
    ],
  }),
];

/**
 * Les dix sections qui tournent, chacune en trois redactions.
 *
 * Quatre tirees parmi dix font deux cent dix plans, multiplies par trois
 * redactions possibles pour chacune : deux communes ne recoivent pratiquement
 * jamais le meme assemblage.
 */
export const ROTATION: ((x: Chiffres) => Section)[][] = [
  couverture,
  rapport,
  discretion,
  rassurer,
  documents,
  equipe,
  delais,
  suites,
  pourquoi,
  independance,
];
