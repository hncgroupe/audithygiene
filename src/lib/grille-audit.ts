import type { Conformite } from './notation';

/**
 * Grille d'audit - SQUELETTE À VALIDER (rule methodology-guard).
 * Chaque item DOIT être rattaché à un point réglementaire précis, validé par
 * le client/expert avant usage en production. `explication`, `pedagogie`,
 * `constats` (et leurs `pourquoi`/`correctif`) sont des amorces génériques (TODO) :
 * ni officielles, ni définitives. Voir skill haccp-audit-methodology et docs/REFERENCE.md.
 */

/**
 * Constat pré-rempli : un clic remplit la note ET pose la conformité (donc le score).
 * Pour les non-conformités : `pourquoi` (risque) et `correctif` (action) alimentent
 * la synthèse affichée à l'auditeur et le plan correctif du rapport.
 */
export interface GrilleConstat {
  label: string;
  conformite: Conformite;
  pourquoi?: string;
  correctif?: string;
}

export interface GrilleItem {
  code: string;
  intitule: string;
  explication: string; // aide à la décision de l'auditeur (TODO à valider)
  pedagogie: string; // à lire au client présent : pourquoi ce point compte (TODO à valider)
  referenceRegl?: string; // TODO à valider
  ponderation: number;
  photoConseillee?: boolean;
  constats: GrilleConstat[]; // TODO à valider
}

export interface GrilleTheme {
  theme: string;
  items: GrilleItem[];
}

export const GRILLE_VERSION = 'v0-draft'; // non validée

export const GRILLE_AUDIT: GrilleTheme[] = [
  {
    theme: 'Chaîne du froid',
    items: [
      {
        code: 'FROID-01',
        intitule: 'Températures des enceintes froides positives conformes',
        explication: 'Contrôler au thermomètre les frigos positifs (cible courante 0 à +4 °C selon denrées). Photographier l’afficheur.',
        pedagogie: 'Le froid bloque la multiplication des bactéries. Au-dessus des seuils, les denrées sensibles deviennent dangereuses bien avant de paraître abîmées.',
        referenceRegl: 'Règlement (CE) n° 852/2004 du 29 avril 2004, annexe II, chapitre IX, point 5 : les denrées susceptibles de favoriser la reproduction de micro-organismes pathogènes ne doivent pas être conservées à des températures pouvant entraîner un risque pour la santé et la chaîne du froid ne doit pas être interrompue. Valeurs chiffrées : arrêté du 21 décembre 2009, article 3 et annexe I, tableau « Températures maximales des denrées réfrigérées », pour les produits d’origine animale et les denrées en contenant, cette annexe renvoyant au règlement (CE) n° 853/2004 pour les viandes hachées et les produits de la pêche ; arrêté du 8 octobre 2013, article 3 et annexe I, pour les produits et denrées autres que d’origine animale. La cible « 0 à +4 °C » n’est pas un seuil réglementaire unique : le seuil dépend de la denrée, et l’exploitant peut retenir une autre température s’il la justifie par un guide de bonnes pratiques d’hygiène ou une analyse des dangers validée.',
        ponderation: 3,
        photoConseillee: true,
        constats: [
          { label: 'Températures relevées dans les seuils', conformite: 'CONFORME' },
          { label: 'Léger dépassement ponctuel', conformite: 'NC_MINEURE', pourquoi: 'Un dépassement modéré accélère la prolifération microbienne sur les produits sensibles.', correctif: 'Régler le thermostat, vérifier le chargement et l’étanchéité, recontrôler sous 24 h.' },
          { label: 'Dépassement franc, risque direct', conformite: 'NC_MAJEURE', pourquoi: 'Rupture de la chaîne du froid : risque sanitaire immédiat sur les denrées concernées.', correctif: 'Écarter/jeter les denrées à risque, faire intervenir le frigoriste, ne pas réutiliser l’enceinte avant retour aux seuils.' },
        ],
      },
      {
        code: 'FROID-02',
        intitule: 'Températures des enceintes négatives conformes',
        explication: 'Vérifier les congélateurs (cible courante ≤ -18 °C). Photographier l’afficheur.',
        pedagogie: 'La congélation à -18 °C met les bactéries en sommeil. Une congélation insuffisante laisse le produit se dégrader sans toujours le montrer.',
        referenceRegl: 'Arrêté du 21 décembre 2009, article 3 et annexe I, tableau « Température maximale des denrées congelées » : glaces et crèmes glacées -18 °C, autres denrées alimentaires congelées -12 °C, les viandes hachées et les produits de la pêche congelés relevant des températures du règlement (CE) n° 853/2004, annexe III, section V, chapitre III, point 2 c) ii, soit -18 °C à cœur. Le seuil général de -18 °C vaut pour les produits surgelés : décret n° 64-949 du 9 septembre 1964 portant application de l’article L. 214-1 du code de la consommation pour les produits surgelés, article 1er. Base générale : règlement (CE) n° 852/2004, annexe II, chapitre IX, point 5, chaîne du froid non interrompue.',
        ponderation: 3,
        photoConseillee: true,
        constats: [
          { label: 'Congélation conforme (≤ -18 °C)', conformite: 'CONFORME' },
          { label: 'Température limite', conformite: 'NC_MINEURE', pourquoi: 'Une température proche du seuil réduit la marge de sécurité en cas d’ouverture ou de panne.', correctif: 'Abaisser la consigne, limiter les ouvertures, recontrôler.' },
          { label: 'Rupture de congélation', conformite: 'NC_MAJEURE', pourquoi: 'Décongélation partielle : développement microbien et perte de salubrité des produits.', correctif: 'Détruire les produits décongelés, dépanner l’équipement, tracer la destruction.' },
        ],
      },
      {
        code: 'FROID-03',
        intitule: 'Relevés de température tenus et archivés',
        explication: 'Demander le registre des relevés (papier ou numérique). Vérifier régularité et archivage.',
        pedagogie: 'Sans relevés, impossible de prouver que le froid a été maîtrisé. C’est la mémoire qui protège l’établissement en cas de contrôle ou de TIAC.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre I, point 2 d) : les locaux doivent permettre de maintenir les denrées à des températures appropriées « qui puissent être vérifiées et si nécessaire enregistrées ». Article 5, paragraphe 2, points d) et g) : surveillance efficace des points critiques de contrôle et établissement de documents et de dossiers prouvant l’application effective des mesures ; article 5, paragraphe 4, points b) et c) : documents tenus à jour et conservés pendant une période appropriée. Bonne pratique et non texte : aucune disposition ne fixe la fréquence des relevés ni une durée d’archivage chiffrée, c’est au plan de maîtrise sanitaire de les définir et de les justifier. La durée de 12 mois citée dans le correctif est un usage professionnel, pas une obligation réglementaire.',
        ponderation: 2,
        constats: [
          { label: 'Relevés réguliers et archivés', conformite: 'CONFORME' },
          { label: 'Relevés irréguliers ou incomplets', conformite: 'NC_MINEURE', pourquoi: 'Le suivi est lacunaire : les dérives peuvent passer inaperçues.', correctif: 'Mettre en place un relevé quotidien daté et signé, archiver sur 12 mois.' },
          { label: 'Aucun relevé tenu', conformite: 'NC_MAJEURE', pourquoi: 'Aucune preuve de maîtrise du froid : non-conformité documentaire majeure.', correctif: 'Instaurer immédiatement un enregistrement des températures, former l’équipe.' },
        ],
      },
    ],
  },
  {
    theme: 'Températures & cuisson',
    items: [
      {
        code: 'TEMP-01',
        intitule: 'Barèmes de cuisson respectés',
        explication: 'Vérifier l’atteinte des températures à cœur attendues. Sonde à cœur si possible.',
        pedagogie: 'La cuisson à cœur détruit les bactéries pathogènes. Une cuisson insuffisante sur viande hachée ou volaille peut rendre malade.',
        referenceRegl: 'Aucun texte ne fixe de barème de cuisson à cœur en restauration commerciale : l’obligation est de résultat, pas de moyen chiffré. Règlement (CE) n° 852/2004, article 5 : procédures permanentes fondées sur les principes HACCP, avec limites critiques (paragraphe 2, point c), surveillance (point d), actions correctives (point e) et enregistrements (point g) ; annexe II, chapitre IX, point 3 : les denrées doivent être protégées de toute contamination susceptible de les rendre dangereuses pour la santé. Le chapitre XI de l’annexe II (traitement thermique) ne vise que les denrées mises sur le marché dans des récipients hermétiquement fermés et ne s’applique donc pas à la cuisson en cuisine. Les couples temps et température relèvent du plan de maîtrise sanitaire et du guide de bonnes pratiques d’hygiène du secteur.',
        ponderation: 2,
        constats: [
          { label: 'Cuissons maîtrisées et contrôlées', conformite: 'CONFORME' },
          { label: 'Contrôle à cœur non systématique', conformite: 'NC_MINEURE', pourquoi: 'Sans contrôle, rien ne garantit l’atteinte de la température cible à chaque service.', correctif: 'Sonder régulièrement à cœur et tracer les valeurs sur les produits sensibles.' },
          { label: 'Cuisson insuffisante constatée', conformite: 'NC_MAJEURE', pourquoi: 'Survie possible de pathogènes : risque d’intoxication alimentaire.', correctif: 'Prolonger la cuisson, retirer les produits concernés, revoir les temps/températures.' },
        ],
      },
      {
        code: 'TEMP-02',
        intitule: 'Refroidissement rapide maîtrisé',
        explication: 'Passage de +63 à +10 °C dans le délai cible (souvent 2 h). Cellule ou méthode équivalente.',
        pedagogie: 'C’est entre +10 et +63 °C que les bactéries explosent. Un refroidissement lent à l’air libre est l’une des causes les plus fréquentes d’intoxication.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre IX, point 6 : les denrées devant être conservées ou servies à basse température doivent être réfrigérées dès que possible après le stade de traitement thermique, à une température n’entraînant pas de risque pour la santé ; article 5 pour la fixation et la surveillance de la limite critique. Le seuil chiffré de +63 °C à +10 °C en moins de deux heures est fixé par l’arrêté du 21 décembre 2009, annexe IV, point 1, qui s’applique aux établissements de restauration collective (article 6). En remise directe, c’est-à-dire dans un restaurant commercial, ce délai n’est pas imposé par un texte : il sert de référence professionnelle et doit être repris, adapté et justifié dans le plan de maîtrise sanitaire.',
        ponderation: 3,
        constats: [
          { label: 'Refroidissement rapide tracé', conformite: 'CONFORME' },
          { label: 'Méthode présente mais peu tracée', conformite: 'NC_MINEURE', pourquoi: 'La maîtrise n’est pas démontrée faute d’enregistrement.', correctif: 'Tracer les couples temps/température de refroidissement.' },
          { label: 'Refroidissement à température ambiante', conformite: 'NC_MAJEURE', pourquoi: 'Stagnation prolongée en zone à risque : multiplication bactérienne importante.', correctif: 'Équiper d’une cellule de refroidissement ou d’une méthode validée, interdire le refroidissement à l’air libre.' },
        ],
      },
      {
        code: 'TEMP-03',
        intitule: 'Remise en température maîtrisée',
        explication: 'Remontée rapide à la température de service. Vérifier matériel et pratique.',
        pedagogie: 'Réchauffer trop lentement fait repasser l’aliment par la zone dangereuse. La remise en température doit être rapide et complète.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre IX, points 3 et 5, et article 5 pour la limite critique, la surveillance et l’action corrective. Le seuil chiffré, à savoir pas plus d’une heure entre +10 °C et la température de remise au consommateur, avec un minimum de +63 °C, figure à l’arrêté du 21 décembre 2009, annexe IV, point 3, applicable à la restauration collective (article 6). En remise directe, aucune valeur réglementaire n’encadre la remise en température : la procédure et ses limites relèvent du plan de maîtrise sanitaire. À ne pas confondre avec le maintien au chaud des plats cuisinés ou repas livrés chauds, fixé à +63 °C par l’annexe I du même arrêté, tableau « Température minimale en liaison chaude ».',
        ponderation: 2,
        constats: [
          { label: 'Remise en température rapide', conformite: 'CONFORME' },
          { label: 'Pratique à formaliser', conformite: 'NC_MINEURE', pourquoi: 'Absence de procédure claire : risque d’hétérogénéité selon l’opérateur.', correctif: 'Définir une consigne de remise en température et la tracer.' },
          { label: 'Maintien prolongé en zone à risque', conformite: 'NC_MAJEURE', pourquoi: 'Temps de passage long dans la plage de danger : prolifération microbienne.', correctif: 'Utiliser un matériel adapté pour une montée rapide, contrôler la température à cœur.' },
        ],
      },
    ],
  },
  {
    theme: 'Traçabilité & DLC',
    items: [
      {
        code: 'TRAC-01',
        intitule: 'Étiquetage et DLC/DLUO respectés',
        explication: 'Contrôler les dates sur produits ouverts/transformés. Photographier les étiquettes douteuses.',
        pedagogie: 'La DLC est une limite sanitaire, pas une suggestion. Au-delà, le risque microbiologique n’est plus maîtrisé.',
        referenceRegl: 'Règlement (UE) n° 1169/2011 du 25 octobre 2011, article 9, paragraphe 1, point f), article 24 et annexe X : date de durabilité minimale ou date limite de consommation. Article 24, paragraphe 1 : au-delà de la date limite de consommation, une denrée est dite dangereuse au sens de l’article 14, paragraphes 2 à 5, du règlement (CE) n° 178/2002 ; son retrait s’impose alors au titre de l’article 19 du même règlement. Conditions de conservation : règlement (CE) n° 852/2004, annexe II, chapitre IX, points 2 et 3. Bonne pratique et non texte : l’étiquetage des produits entamés avec date d’ouverture et la durée de vie secondaire ne sont fixés par aucune disposition, ils relèvent du plan de maîtrise sanitaire, établi à partir des conditions de conservation après ouverture indiquées par le fabricant (règlement (UE) n° 1169/2011, article 25, paragraphe 2).',
        ponderation: 3,
        photoConseillee: true,
        constats: [
          { label: 'Dates et étiquetage conformes', conformite: 'CONFORME' },
          { label: 'Étiquetage partiel sur produits entamés', conformite: 'NC_MINEURE', pourquoi: 'Sans date d’ouverture, la durée de vie secondaire n’est pas maîtrisée.', correctif: 'Étiqueter systématiquement à l’ouverture (date + désignation).' },
          { label: 'Produits périmés en service', conformite: 'NC_MAJEURE', pourquoi: 'Mise à disposition de denrées potentiellement dangereuses.', correctif: 'Retirer et détruire immédiatement, renforcer le contrôle des dates.' },
        ],
      },
      {
        code: 'TRAC-02',
        intitule: 'Conservation des étiquettes / n° de lot',
        explication: 'Vérifier la conservation des étiquettes d’origine et numéros de lot (traçabilité amont).',
        pedagogie: 'En cas de rappel produit ou d’intoxication, le numéro de lot permet de remonter la filière. Sans lui, on ne peut ni se protéger ni protéger le client.',
        referenceRegl: 'Règlement (CE) n° 178/2002 du 28 janvier 2002, article 18 : la traçabilité est établie à toutes les étapes de la production, de la transformation et de la distribution ; l’exploitant doit être en mesure d’identifier toute personne lui ayant fourni une denrée et disposer de systèmes et de procédures permettant de mettre cette information à la disposition des autorités compétentes à leur demande. Article 19 : retrait, information des consommateurs et rappel des denrées non conformes. Denrées d’origine animale : règlement d’exécution (UE) n° 931/2011 de la Commission du 19 septembre 2011 relatif aux exigences de traçabilité définies par le règlement (CE) n° 178/2002 en ce qui concerne les denrées alimentaires d’origine animale. Bonne pratique et non texte : aucune disposition ne fixe de durée précise de conservation des étiquettes et des bons de livraison en restauration, cette durée relève du plan de maîtrise sanitaire.',
        ponderation: 2,
        constats: [
          { label: 'Traçabilité amont conservée', conformite: 'CONFORME' },
          { label: 'Conservation partielle', conformite: 'NC_MINEURE', pourquoi: 'Traçabilité incomplète : remontée de filière difficile.', correctif: 'Conserver étiquettes et bons sur la durée de vie des produits.' },
          { label: 'Aucune traçabilité conservée', conformite: 'NC_MAJEURE', pourquoi: 'Impossible de réagir à un rappel ou une alerte sanitaire.', correctif: 'Mettre en place un système de conservation des étiquettes/lots.' },
        ],
      },
    ],
  },
  {
    theme: 'Hygiène du personnel',
    items: [
      {
        code: 'PERS-01',
        intitule: 'Tenue de travail propre et adaptée',
        explication: 'Tenue propre, dédiée, coiffe si requise. Observer en cuisine.',
        pedagogie: 'Une tenue de ville transporte des microbes de l’extérieur vers les aliments. La tenue dédiée est une barrière simple et efficace.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre VIII, point 1 : toute personne travaillant dans une zone de manutention de denrées doit respecter un niveau élevé de propreté personnelle et porter des tenues adaptées et propres assurant, si cela est nécessaire, sa protection. Chapitre VIII, point 2 : interdiction faite aux personnes atteintes d’une maladie transmissible par les aliments, de plaies infectées ou de lésions cutanées de manipuler les denrées. Chapitre I, point 9 : vestiaires adéquats lorsque l’hygiène l’exige. Bonne pratique et non texte : le port de la coiffe, l’interdiction des bijoux et la fréquence de change ne sont pas énoncés par le règlement, ce sont des bonnes pratiques d’hygiène issues des guides du secteur, à formaliser dans le plan de maîtrise sanitaire.',
        ponderation: 2,
        constats: [
          { label: 'Tenue conforme et propre', conformite: 'CONFORME' },
          { label: 'Tenue incomplète (coiffe, tablier)', conformite: 'NC_MINEURE', pourquoi: 'Barrière d’hygiène partielle (ex. cheveux non protégés).', correctif: 'Compléter la tenue, fournir coiffes et tabliers en nombre suffisant.' },
          { label: 'Tenue inadaptée ou sale', conformite: 'NC_MAJEURE', pourquoi: 'Vecteur direct de contamination des denrées.', correctif: 'Imposer une tenue propre dédiée, organiser le change et le lavage.' },
        ],
      },
      {
        code: 'PERS-02',
        intitule: 'Lavage des mains : équipement et pratique',
        explication: 'Lave-mains accessible, savon, essuie-mains à usage unique. Observer la pratique.',
        pedagogie: 'Les mains sont le premier vecteur de contamination. Un lave-mains fonctionnel et utilisé coupe la transmission manuportée.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre I, point 4 : un nombre suffisant de lavabos judicieusement situés et destinés au lavage des mains doit être disponible, équipés d’eau courante chaude et froide ainsi que de matériel pour le nettoyage et pour le séchage hygiénique des mains, et séparés en cas de besoin des dispositifs de lavage des denrées. Chapitre VIII, point 1, pour la pratique effective. Bonne pratique et non texte pour la commande non manuelle : elle n’est imposée qu’à certains établissements de produits d’origine animale par le règlement (CE) n° 853/2004, annexe III, section V, chapitre I, point 4, texte qui ne s’applique pas au commerce de détail (article 1er, paragraphe 5, point a). En restauration, le lave-mains à commande non manuelle est une bonne pratique d’hygiène.',
        ponderation: 3,
        photoConseillee: true,
        constats: [
          { label: 'Poste de lavage complet et utilisé', conformite: 'CONFORME' },
          { label: 'Consommable manquant (savon/papier)', conformite: 'NC_MINEURE', pourquoi: 'Le lavage efficace n’est pas garanti sans consommables.', correctif: 'Réapprovisionner savon et essuie-mains, contrôler quotidiennement.' },
          { label: 'Pas de poste de lavage fonctionnel', conformite: 'NC_MAJEURE', pourquoi: 'Hygiène des mains impossible : risque manuporté élevé.', correctif: 'Installer/réparer un lave-mains dédié à commande non manuelle.' },
        ],
      },
      {
        code: 'PERS-03',
        intitule: 'Formation hygiène du personnel',
        explication: 'Vérifier les justificatifs de formation hygiène/HACCP.',
        pedagogie: 'Les bonnes pratiques ne s’improvisent pas. Une équipe formée applique les bons gestes même sous le coup de feu.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre XII, points 1 et 2 : les manutentionnaires de denrées doivent être encadrés et disposer d’instructions ou d’une formation en matière d’hygiène alimentaire adaptées à leur activité professionnelle, et les personnes responsables de la procédure fondée sur les principes HACCP visée à l’article 5 doivent avoir reçu la formation appropriée à l’application de ces principes. En restauration commerciale, au moins une personne de l’effectif doit justifier d’une formation spécifique : code rural et de la pêche maritime, article L. 233-4, et articles D. 233-11 et D. 233-12 issus du décret n° 2011-731 du 24 juin 2011. Contenu et durée : arrêté du 12 février 2024 relatif au cahier des charges de la formation spécifique en matière d’hygiène alimentaire adaptée à l’activité des établissements de restauration commerciale, qui a remplacé l’arrêté du 5 octobre 2011. Une expérience professionnelle d’au moins trois ans au sein d’une entreprise du secteur alimentaire comme gestionnaire ou exploitant vaut satisfaction de cette obligation (article L. 233-4, deuxième alinéa).',
        ponderation: 2,
        constats: [
          { label: 'Formations à jour et justifiées', conformite: 'CONFORME' },
          { label: 'Formation partielle de l’équipe', conformite: 'NC_MINEURE', pourquoi: 'Niveau de maîtrise hétérogène selon les personnes.', correctif: 'Planifier la formation des collaborateurs non formés.' },
          { label: 'Aucune formation justifiée', conformite: 'NC_MAJEURE', pourquoi: 'Pratiques d’hygiène non garanties sur tout l’établissement.', correctif: 'Former le personnel manipulant des denrées et conserver les attestations.' },
        ],
      },
    ],
  },
  {
    theme: 'Nettoyage & désinfection',
    items: [
      {
        code: 'NETT-01',
        intitule: 'Plan de nettoyage présent et appliqué',
        explication: 'Demander le plan de nettoyage (zones, fréquences, produits) et vérifier l’application.',
        pedagogie: 'Un plan de nettoyage transforme le "on nettoie quand on peut" en routine maîtrisée. Sans lui, des zones sont oubliées.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre I, point 1 : les locaux par lesquels circulent les denrées alimentaires doivent être propres et en bon état d’entretien. Annexe II, chapitre V, point 1 a) : tous les articles, installations et équipements avec lesquels les denrées entrent en contact doivent être effectivement nettoyés et, le cas échéant, désinfectés, à une fréquence suffisante pour éviter tout risque de contamination. Bonne pratique et non texte : aucune disposition n’impose la forme d’un plan de nettoyage écrit ni des fréquences chiffrées. Le plan de nettoyage est un volet du plan de maîtrise sanitaire qui fixe zones, fréquences, produits et responsables ; seule la preuve documentaire de l’application relève d’un texte, l’article 5, paragraphe 2, point g).',
        ponderation: 2,
        constats: [
          { label: 'Plan présent et appliqué', conformite: 'CONFORME' },
          { label: 'Plan présent mais peu suivi', conformite: 'NC_MINEURE', pourquoi: 'Le nettoyage réel s’écarte du plan : zones à risque possibles.', correctif: 'Réafficher le plan, responsabiliser et contrôler son application.' },
          { label: 'Pas de plan, propreté insuffisante', conformite: 'NC_MAJEURE', pourquoi: 'Hygiène des surfaces non maîtrisée : risque de contamination.', correctif: 'Établir un plan de nettoyage écrit (quoi, qui, quand, comment).' },
        ],
      },
      {
        code: 'NETT-02',
        intitule: 'Produits adaptés et correctement stockés',
        explication: 'Produits agréés contact alimentaire, stockés à l’écart des denrées.',
        pedagogie: 'Un produit chimique près des aliments, c’est un risque d’intoxication chimique. La séparation est non négociable.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre I, point 10 : les produits de nettoyage et de désinfection ne doivent pas être entreposés dans des zones où les denrées alimentaires sont manipulées. Annexe II, chapitre IX, point 8 : les substances dangereuses et non comestibles doivent faire l’objet d’un étiquetage approprié et être entreposées dans des conteneurs sûrs et séparés. Aptitude des produits employés pour nettoyer les surfaces au contact des denrées : arrêté du 8 septembre 1999 modifié, pris pour l’application de l’article 11 du décret n° 73-138 du 12 février 1973 modifié, relatif aux procédés et aux produits utilisés pour le nettoyage des matériaux et objets destinés à entrer en contact avec des denrées, produits et boissons pour l’alimentation de l’homme et des animaux.',
        ponderation: 2,
        photoConseillee: true,
        constats: [
          { label: 'Produits adaptés et bien rangés', conformite: 'CONFORME' },
          { label: 'Stockage à réorganiser', conformite: 'NC_MINEURE', pourquoi: 'Rangement perfectible : risque de confusion ou de contact.', correctif: 'Dédier une zone fermée aux produits d’entretien.' },
          { label: 'Produits chimiques près des denrées', conformite: 'NC_MAJEURE', pourquoi: 'Risque de contamination chimique des aliments.', correctif: 'Séparer immédiatement, stocker les produits hors zone alimentaire.' },
        ],
      },
      {
        code: 'NETT-03',
        intitule: 'Preuves de réalisation (enregistrements)',
        explication: 'Vérifier les enregistrements de nettoyage (fiches signées, planning daté).',
        pedagogie: 'Ce qui n’est pas tracé est réputé non fait lors d’un contrôle. L’enregistrement protège l’établissement.',
        referenceRegl: 'Règlement (CE) n° 852/2004, article 5, paragraphe 2, point g) : établir des documents et des dossiers, en fonction de la nature et de la taille de l’entreprise, pour prouver l’application effective des mesures ; article 5, paragraphe 4, points b) et c) : documents tenus à jour à tout moment et conservés pendant une période appropriée. Exigence de fond : annexe II, chapitre V, point 1 a), et chapitre I, point 1. Bonne pratique et non texte : ni la forme des fiches, ni la signature, ni la durée de conservation ne sont fixées par une disposition, elles relèvent du plan de maîtrise sanitaire. La formule « ce qui n’est pas tracé est réputé non fait » est une pratique de contrôle, pas une règle de droit.',
        ponderation: 1,
        constats: [
          { label: 'Enregistrements tenus', conformite: 'CONFORME' },
          { label: 'Enregistrements incomplets', conformite: 'NC_MINEURE', pourquoi: 'Preuve partielle de la réalisation du nettoyage.', correctif: 'Compléter et faire signer les fiches de nettoyage.' },
          { label: 'Aucun enregistrement', conformite: 'NC_MAJEURE', pourquoi: 'Aucune preuve du nettoyage : non-conformité documentaire.', correctif: 'Mettre en place des fiches de suivi datées et signées.' },
        ],
      },
    ],
  },
  {
    theme: 'Lutte contre les nuisibles',
    items: [
      {
        code: 'NUIS-01',
        intitule: 'Plan de lutte / contrat de dératisation',
        explication: 'Demander le contrat/plan de lutte, le plan des appâts et les rapports de passage.',
        pedagogie: 'Les nuisibles transportent des pathogènes. Un dispositif de lutte suivi évite l’infestation avant qu’elle ne devienne visible.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre IX, point 4 : des méthodes adéquates doivent être mises au point pour lutter contre les organismes nuisibles. Annexe II, chapitre I, point 2 c) : les locaux doivent permettre la mise en œuvre de bonnes pratiques d’hygiène, notamment prévenir la contamination et en particulier lutter contre les organismes nuisibles. Bonne pratique et non texte : le contrat avec une entreprise de dératisation, le plan des appâts et les rapports de passage ne sont imposés par aucune disposition. Ce sont les moyens usuels de démontrer la mise en œuvre de ces méthodes, à décrire dans le plan de maîtrise sanitaire.',
        ponderation: 2,
        photoConseillee: true,
        constats: [
          { label: 'Contrat actif et rapports à jour', conformite: 'CONFORME' },
          { label: 'Dispositif présent, suivi à renforcer', conformite: 'NC_MINEURE', pourquoi: 'Surveillance insuffisante : détection tardive d’une infestation.', correctif: 'Mettre à jour le plan des appâts et le suivi des passages.' },
          { label: 'Aucun dispositif de lutte', conformite: 'NC_MAJEURE', pourquoi: 'Absence de prévention : risque d’infestation et de contamination.', correctif: 'Mettre en place un plan de lutte (interne ou prestataire) et un plan des appâts.' },
        ],
      },
      {
        code: 'NUIS-02',
        intitule: 'Absence de traces de nuisibles',
        explication: 'Rechercher déjections, traces, insectes. Photographier toute trace.',
        pedagogie: 'Une seule trace signale souvent une présence installée. C’est un signal d’alerte sanitaire immédiat.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre IX, points 3 et 4 : protection des denrées contre toute contamination à toutes les étapes et mise au point de méthodes adéquates de lutte contre les organismes nuisibles. Annexe II, chapitre I, points 1 et 2 c), et chapitre II, point 1 d) : les fenêtres et autres ouvertures doivent être conçues de manière à prévenir l’encrassement et, en cas de besoin, équipées d’écrans de protection contre les insectes. Si des denrées ont été souillées, elles sont impropres à la consommation humaine et relèvent du retrait prévu à l’article 19 du règlement (CE) n° 178/2002.',
        ponderation: 3,
        photoConseillee: true,
        constats: [
          { label: 'Aucune trace observée', conformite: 'CONFORME' },
          { label: 'Indice isolé à traiter', conformite: 'NC_MINEURE', pourquoi: 'Début possible de présence : à traiter avant aggravation.', correctif: 'Nettoyer, renforcer la surveillance, traiter la zone.' },
          { label: 'Présence avérée de nuisibles', conformite: 'NC_MAJEURE', pourquoi: 'Contamination directe des denrées et des surfaces.', correctif: 'Intervention de désinsectisation/dératisation, protéger/écarter les denrées.' },
        ],
      },
    ],
  },
  {
    theme: 'Stockage & marche en avant',
    items: [
      {
        code: 'STOCK-01',
        intitule: 'Séparation cru/cuit respectée',
        explication: 'Vérifier l’absence de contamination croisée (rangement, plans, ustensiles).',
        pedagogie: 'Le cru peut contaminer le cuit prêt à consommer. Séparer les flux, c’est éviter de transférer les bactéries vers ce qui ne sera plus cuit.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre II, point 1 : la conception et l’agencement des locaux où les denrées sont préparées, traitées ou transformées doivent permettre la mise en œuvre de bonnes pratiques d’hygiène et notamment prévenir la contamination entre et durant les opérations. Annexe II, chapitre IX, points 2, 3 et 5 : conservation des matières premières à l’abri de toute contamination, protection des denrées à toutes les étapes et, pour les produits transformés, locaux permettant l’entreposage séparé des matières premières et des produits transformés. Annexe II, chapitre V, point 1, pour les ustensiles et les surfaces. La « marche en avant » est la formulation professionnelle française de ces exigences de conception, ce n’est pas une notion figurant dans un texte.',
        ponderation: 3,
        photoConseillee: true,
        constats: [
          { label: 'Séparation cru/cuit respectée', conformite: 'CONFORME' },
          { label: 'Organisation perfectible', conformite: 'NC_MINEURE', pourquoi: 'Risque ponctuel de contact entre flux.', correctif: 'Réorganiser le rangement, dédier matériel et plans de travail.' },
          { label: 'Contamination croisée constatée', conformite: 'NC_MAJEURE', pourquoi: 'Transfert de pathogènes du cru vers le prêt-à-consommer.', correctif: 'Séparer immédiatement les flux, dédier ustensiles et zones, nettoyer.' },
        ],
      },
      {
        code: 'STOCK-02',
        intitule: 'Organisation des stocks (rotation, sol)',
        explication: 'Rotation (PEPS), rien à même le sol, denrées protégées.',
        pedagogie: 'Stocker au sol ou sans rotation, c’est favoriser souillures et oublis de dates. L’organisation protège la qualité et la salubrité.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre IX, point 2 : les matières premières et tous les ingrédients entreposés doivent être conservés dans des conditions adéquates permettant d’éviter toute détérioration néfaste et de les protéger contre toute contamination ; point 3 : protection des denrées contre toute contamination à toutes les étapes. Annexe II, chapitre I, point 1. Bonne pratique et non texte : l’interdiction de stocker à même le sol et la rotation premier entré premier sorti ne figurent telles quelles dans aucune disposition. Ce sont des bonnes pratiques d’hygiène qui mettent en œuvre les exigences ci-dessus et relèvent du plan de maîtrise sanitaire.',
        ponderation: 2,
        constats: [
          { label: 'Stocks organisés, rien au sol', conformite: 'CONFORME' },
          { label: 'Rotation à améliorer', conformite: 'NC_MINEURE', pourquoi: 'Risque de dépassement de dates et de gaspillage.', correctif: 'Appliquer le premier entré / premier sorti, contrôler les dates.' },
          { label: 'Denrées au sol / non protégées', conformite: 'NC_MAJEURE', pourquoi: 'Exposition aux souillures et nuisibles.', correctif: 'Surélever et protéger toutes les denrées, dégager le sol.' },
        ],
      },
    ],
  },
  {
    theme: 'Locaux & équipements',
    items: [
      {
        code: 'LOC-01',
        intitule: 'État et entretien des locaux',
        explication: 'Sols, murs, plafonds nettoyables et en bon état. Photographier les dégradations.',
        pedagogie: 'Une surface fissurée ou poreuse ne se nettoie pas vraiment : elle abrite les microbes. L’état du local conditionne l’hygiène.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre I, points 1 et 2 : locaux propres et en bon état d’entretien, pouvant être convenablement entretenus, nettoyés et désinfectés, et permettant de prévenir l’encrassement ainsi que la formation de condensation et de moisissure indésirable. Annexe II, chapitre II, point 1, points a) à f) : revêtements de sol, surfaces murales, plafonds, fenêtres, portes et surfaces bien entretenus, faciles à nettoyer et au besoin à désinfecter, en matériaux étanches, non absorbants, lavables et non toxiques, sauf si l’exploitant prouve à l’autorité compétente que d’autres matériaux conviennent.',
        ponderation: 2,
        photoConseillee: true,
        constats: [
          { label: 'Locaux entretenus et nettoyables', conformite: 'CONFORME' },
          { label: 'Dégradations légères', conformite: 'NC_MINEURE', pourquoi: 'Zones moins facilement nettoyables.', correctif: 'Planifier les réparations des surfaces concernées.' },
          { label: 'Locaux dégradés non nettoyables', conformite: 'NC_MAJEURE', pourquoi: 'Surfaces impossibles à désinfecter : réservoir de contamination.', correctif: 'Remettre en état les surfaces (revêtements lessivables, étanches).' },
        ],
      },
      {
        code: 'LOC-02',
        intitule: 'Matériaux et équipements conformes',
        explication: 'Surfaces et matériels adaptés au contact alimentaire, en bon état.',
        pedagogie: 'Un matériel inadapté ou abîmé relargue des particules et retient les bactéries. Le bon matériau est une garantie sanitaire.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre V, point 1 : tous les articles, installations et équipements avec lesquels les denrées entrent en contact doivent être effectivement nettoyés et le cas échéant désinfectés, construits, réalisés et entretenus de manière à réduire au maximum les risques de contamination, et installés de manière à permettre un nettoyage convenable. Annexe II, chapitre II, point 1 f), pour les surfaces. Aptitude au contact alimentaire : règlement (CE) n° 1935/2004 du 27 octobre 2004 concernant les matériaux et objets destinés à entrer en contact avec des denrées alimentaires, article 3, paragraphe 1 : ne pas céder aux denrées des constituants en une quantité susceptible de présenter un danger pour la santé humaine, d’entraîner une modification inacceptable de leur composition ou une altération de leurs caractères organoleptiques.',
        ponderation: 2,
        constats: [
          { label: 'Équipements conformes et entretenus', conformite: 'CONFORME' },
          { label: 'Matériel à remplacer à terme', conformite: 'NC_MINEURE', pourquoi: 'Usure pouvant compromettre le nettoyage.', correctif: 'Programmer le remplacement du matériel usé.' },
          { label: 'Matériel non conforme contact alimentaire', conformite: 'NC_MAJEURE', pourquoi: 'Risque de migration et de contamination des aliments.', correctif: 'Remplacer par du matériel apte au contact alimentaire.' },
        ],
      },
    ],
  },
  {
    theme: 'Gestion des déchets',
    items: [
      {
        code: 'DECH-01',
        intitule: 'Tri et évacuation des déchets',
        explication: 'Poubelles à commande non manuelle, évacuation régulière, tri.',
        pedagogie: 'Des déchets qui s’accumulent attirent les nuisibles et contaminent l’air et les surfaces. L’évacuation régulière est essentielle.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre VI, point 1 : les déchets alimentaires et autres déchets doivent être retirés aussi vite que possible des locaux où se trouvent des denrées, de façon à éviter qu’ils ne s’accumulent ; point 2 : dépôt dans des conteneurs dotés d’une fermeture, bien entretenus et faciles à nettoyer ; point 4 : élimination hygiénique et respectueuse de l’environnement, sans constituer une source de contamination directe ou indirecte. Bonne pratique et non texte : le règlement exige un conteneur doté d’une fermeture, il n’impose pas de commande non manuelle. La poubelle à pédale est une bonne pratique d’hygiène, pas une obligation réglementaire.',
        ponderation: 1,
        constats: [
          { label: 'Gestion des déchets conforme', conformite: 'CONFORME' },
          { label: 'Évacuation à cadencer', conformite: 'NC_MINEURE', pourquoi: 'Stagnation pouvant attirer les nuisibles.', correctif: 'Augmenter la fréquence d’évacuation.' },
          { label: 'Accumulation en zone de production', conformite: 'NC_MAJEURE', pourquoi: 'Source de contamination et d’attraction de nuisibles près des denrées.', correctif: 'Évacuer immédiatement, équiper de poubelles fermées à commande non manuelle.' },
        ],
      },
      {
        code: 'DECH-02',
        intitule: 'Local poubelles entretenu',
        explication: 'Local/zone déchets propre, fermé, sans nuisibles.',
        pedagogie: 'Le local poubelles est un point chaud à nuisibles. Propre et fermé, il protège tout le reste de la cuisine.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre VI, point 3 : des dispositions adéquates doivent être prévues pour l’entreposage et l’élimination des déchets, et les aires de stockage des déchets doivent être conçues et gérées de manière à pouvoir être propres en permanence et, le cas échéant, exemptes d’animaux et de parasites. Voir aussi annexe II, chapitre IX, point 4, pour la lutte contre les organismes nuisibles. Bonne pratique et non texte : la fréquence de nettoyage de la zone déchets n’est fixée par aucune disposition, elle relève du plan de nettoyage.',
        ponderation: 1,
        photoConseillee: true,
        constats: [
          { label: 'Local propre et entretenu', conformite: 'CONFORME' },
          { label: 'Entretien à renforcer', conformite: 'NC_MINEURE', pourquoi: 'Propreté insuffisante pouvant attirer les nuisibles.', correctif: 'Nettoyer/désinfecter régulièrement la zone déchets.' },
          { label: 'Local insalubre', conformite: 'NC_MAJEURE', pourquoi: 'Foyer de nuisibles et de contamination.', correctif: 'Assainir le local, le fermer et instaurer un nettoyage planifié.' },
        ],
      },
    ],
  },
  {
    theme: 'Plan de Maîtrise Sanitaire (PMS)',
    items: [
      {
        code: 'PMS-01',
        intitule: 'PMS documenté et à jour',
        explication: 'Demander le PMS (BPH, HACCP, traçabilité, gestion des non-conformités) et vérifier sa mise à jour.',
        pedagogie: 'Le PMS est la colonne vertébrale de l’hygiène : c’est lui qu’on présente en contrôle. Absent ou obsolète, l’établissement est exposé.',
        referenceRegl: 'Règlement (CE) n° 852/2004, article 4, paragraphe 2 : les exploitants se conforment aux règles générales d’hygiène figurant à l’annexe II ; article 5, paragraphe 1 : mise en place, application et maintien d’une ou plusieurs procédures permanentes fondées sur les principes HACCP ; article 5, paragraphe 2, point g), et paragraphe 4, points a) à c) : documents et dossiers tenus à jour, conservés, et démonstration de la conformité à l’autorité compétente. L’expression « plan de maîtrise sanitaire » n’appartient pas au règlement européen : son contenu type, bonnes pratiques d’hygiène, plan HACCP, traçabilité et gestion des non-conformités, est défini par l’arrêté du 8 juin 2006 relatif à l’agrément sanitaire des établissements mettant sur le marché des produits d’origine animale ou des denrées contenant des produits d’origine animale, annexe II, texte qui vise les établissements soumis à agrément. Un restaurant qui remet directement au consommateur final relève du commerce de détail, exclu du champ du règlement (CE) n° 853/2004 par son article 1er, paragraphe 5, point a), et n’est donc pas soumis à agrément (code rural et de la pêche maritime, article L. 233-2), mais il reste pleinement tenu des articles 4 et 5 du règlement (CE) n° 852/2004.',
        ponderation: 3,
        constats: [
          { label: 'PMS complet et à jour', conformite: 'CONFORME' },
          { label: 'PMS présent mais incomplet', conformite: 'NC_MINEURE', pourquoi: 'Certains volets manquent : maîtrise partielle.', correctif: 'Compléter les volets manquants et dater la mise à jour.' },
          { label: 'Pas de PMS', conformite: 'NC_MAJEURE', pourquoi: 'Obligation réglementaire non satisfaite : exposition forte en contrôle.', correctif: 'Élaborer un PMS adapté à l’activité (BPH, HACCP, traçabilité).' },
        ],
      },
      {
        code: 'PMS-02',
        intitule: 'Autocontrôles réalisés et tracés',
        explication: 'Vérifier la réalité des autocontrôles (températures, huiles, nettoyage) et leur traçabilité.',
        pedagogie: 'Les autocontrôles, c’est se contrôler soi-même avant que l’État ne le fasse. Réalisés et tracés, ils prouvent la maîtrise au quotidien.',
        referenceRegl: 'Règlement (CE) n° 852/2004, article 5, paragraphe 2, points d) à g) : établir et appliquer des procédures de surveillance efficace des points critiques de contrôle, établir les actions correctives à mettre en œuvre lorsque la surveillance révèle qu’un point critique n’est pas maîtrisé, établir des procédures de vérification périodique et établir des documents et dossiers prouvant l’application effective des mesures ; article 5, paragraphe 4, pour la tenue et la conservation des documents. Bonne pratique et non texte : la nature, la fréquence et le format des autocontrôles ne sont fixés par aucune disposition, ils sont définis par le plan de maîtrise sanitaire au vu de l’analyse des dangers propre à l’établissement.',
        ponderation: 2,
        constats: [
          { label: 'Autocontrôles réalisés et tracés', conformite: 'CONFORME' },
          { label: 'Autocontrôles partiels', conformite: 'NC_MINEURE', pourquoi: 'Suivi incomplet des points critiques.', correctif: 'Compléter le plan d’autocontrôles et le tracer.' },
          { label: 'Autocontrôles absents', conformite: 'NC_MAJEURE', pourquoi: 'Aucune surveillance des points critiques : maîtrise non démontrée.', correctif: 'Mettre en place des autocontrôles réguliers et documentés.' },
        ],
      },
    ],
  },
  {
    theme: 'Allergènes',
    items: [
      {
        code: 'ALL-01',
        intitule: 'Information allergènes consommateur',
        explication: 'Vérifier la disponibilité de l’information allergènes (affichage, classeur, à la demande).',
        pedagogie: 'Pour un client allergique, l’information juste évite l’accident grave. C’est aussi une obligation d’information du consommateur.',
        referenceRegl: 'Règlement (UE) n° 1169/2011 du 25 octobre 2011, article 9, paragraphe 1, point c) : mention obligatoire de tout ingrédient ou auxiliaire technologique énuméré à l’annexe II, ou dérivé d’une substance ou d’un produit de cette annexe, provoquant des allergies ou des intolérances, utilisé dans la fabrication ou la préparation d’une denrée et encore présent dans le produit fini, même sous une forme modifiée ; annexe II pour la liste des substances et produits concernés ; article 44, paragraphe 1, point a) : cette mention reste obligatoire pour les denrées proposées non préemballées. En droit interne : décret n° 2015-447 du 17 avril 2015 relatif à l’information des consommateurs sur les allergènes et les denrées alimentaires non préemballées, codifié aux articles R. 412-12 et R. 412-13 du code de la consommation, qui imposent une information portée sur la denrée elle-même ou à proximité de celle-ci, de façon qu’il n’existe aucune incertitude quant à la denrée à laquelle elle se rapporte.',
        ponderation: 2,
        constats: [
          { label: 'Information allergènes disponible', conformite: 'CONFORME' },
          { label: 'Information incomplète', conformite: 'NC_MINEURE', pourquoi: 'Le client allergique n’a pas une information fiable et complète.', correctif: 'Compléter et tenir à jour la liste des allergènes par plat.' },
          { label: 'Aucune information allergènes', conformite: 'NC_MAJEURE', pourquoi: 'Risque d’accident allergique et défaut d’information du consommateur.', correctif: 'Mettre en place une information allergènes accessible et fiable.' },
        ],
      },
      {
        code: 'ALL-02',
        intitule: 'Prévention contamination croisée allergènes',
        explication: 'Mesures contre la contamination croisée allergènes (matériel dédié, organisation).',
        pedagogie: 'Une trace d’allergène suffit à déclencher une réaction. Éviter la contamination croisée protège le client sensible.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre IX, point 9, inséré par le règlement (UE) 2021/382 de la Commission du 3 mars 2021 : les équipements, les réceptacles de véhicules et les conteneurs utilisés pour la transformation, la manutention, le transport ou l’entreposage d’une substance ou d’un produit provoquant des allergies ou des intolérances visé à l’annexe II du règlement (UE) n° 1169/2011 ne peuvent pas être utilisés pour des denrées ne contenant pas cette substance, à moins d’avoir été nettoyés et contrôlés au moins pour vérifier l’absence de débris visibles de celle-ci. Voir aussi annexe II, chapitre V, point 1 a), et article 5 pour la maîtrise du danger allergène. Bonne pratique et non texte : le matériel dédié et l’ordonnancement de la production ne sont pas imposés en tant que tels, ce sont des moyens à définir et à justifier dans le plan de maîtrise sanitaire.',
        ponderation: 2,
        constats: [
          { label: 'Mesures en place', conformite: 'CONFORME' },
          { label: 'Mesures à formaliser', conformite: 'NC_MINEURE', pourquoi: 'Pratiques non écrites : risque selon l’opérateur.', correctif: 'Formaliser les mesures anti-contamination croisée.' },
          { label: 'Risque de contamination croisée élevé', conformite: 'NC_MAJEURE', pourquoi: 'Présence d’allergènes non maîtrisée dans des plats annoncés sans.', correctif: 'Dédier matériel et plans de travail, organiser la production.' },
        ],
      },
    ],
  },
  {
    theme: 'Eau & glace',
    items: [
      {
        code: 'EAU-01',
        intitule: 'Potabilité de l’eau / entretien machine à glaçons',
        explication: 'Eau potable, machine à glaçons propre et entretenue. Photographier l’intérieur si accessible.',
        pedagogie: 'La glace est un aliment : faite avec une machine sale, elle contamine les boissons. L’eau et la glace doivent être irréprochables.',
        referenceRegl: 'Règlement (CE) n° 852/2004, annexe II, chapitre VII, point 1 a) : l’alimentation en eau potable doit être en quantité suffisante ; point 4 : la glace entrant en contact avec les denrées alimentaires ou susceptible de contaminer celles-ci doit être fabriquée à partir d’eau potable et doit être fabriquée, manipulée et stockée dans des conditions prévenant toute contamination. Entretien de la machine : annexe II, chapitre V, point 1 a). Qualité de l’eau destinée à la consommation humaine : code de la santé publique, articles R. 1321-1 et suivants, et arrêté du 11 janvier 2007 relatif aux limites et références de qualité des eaux brutes et des eaux destinées à la consommation humaine mentionnées aux articles R. 1321-2, R. 1321-3, R. 1321-7 et R. 1321-38 du code de la santé publique, modifié notamment par l’arrêté du 30 décembre 2022. Bonne pratique et non texte : la fréquence de nettoyage et de détartrage de la machine à glaçons n’est fixée par aucune disposition, elle relève du plan de nettoyage.',
        ponderation: 1,
        photoConseillee: true,
        constats: [
          { label: 'Eau potable, machine entretenue', conformite: 'CONFORME' },
          { label: 'Entretien machine à glaçons à renforcer', conformite: 'NC_MINEURE', pourquoi: 'Risque de développement microbien dans la machine.', correctif: 'Nettoyer/détartrer régulièrement la machine à glaçons.' },
          { label: 'Machine à glaçons insalubre', conformite: 'NC_MAJEURE', pourquoi: 'Glace contaminée servie au client.', correctif: 'Arrêter, nettoyer et désinfecter la machine avant remise en service.' },
        ],
      },
    ],
  },
];

/**
 * Motifs de non-conformité prédéfinis par item (TODO à valider).
 * Affichés quand l'auditeur sélectionne « mineure » ou « critique » : un clic
 * ajoute le motif à la note ; l'auditeur peut compléter avec un détail libre.
 */
export const MOTIFS_PAR_CODE: Record<string, string[]> = {
  'FROID-01': ['Température au-dessus du seuil', 'Pas de thermomètre / défaillant', 'Enceinte surchargée', 'Joint de porte abîmé'],
  'FROID-02': ['Température > -18 °C', 'Givre excessif', 'Produits déjà décongelés', 'Appareil en panne'],
  'FROID-03': ['Relevés non tenus', 'Relevés incomplets', 'Pas d’archivage', 'Valeurs hors seuil non traitées'],
  'TEMP-01': ['Pas de contrôle à cœur', 'Cuisson insuffisante', 'Barème non défini', 'Sonde absente'],
  'TEMP-02': ['Refroidissement à l’air libre', 'Pas de cellule', 'Durée trop longue', 'Aucune traçabilité'],
  'TEMP-03': ['Remontée trop lente', 'Maintien en zone à risque', 'Matériel inadapté', 'Pas de procédure'],
  'TRAC-01': ['Produit périmé', 'Pas de date d’ouverture', 'Étiquetage illisible', 'DLC dépassée en stock'],
  'TRAC-02': ['Étiquettes non conservées', 'N° de lot absent', 'Conservation partielle', 'Aucune traçabilité amont'],
  'PERS-01': ['Tenue sale', 'Coiffe absente', 'Bijoux / montre', 'Tenue de ville en cuisine'],
  'PERS-02': ['Savon manquant', 'Essuie-mains absent', 'Lave-mains inaccessible', 'Lavage non pratiqué'],
  'PERS-03': ['Aucune formation', 'Formation partielle', 'Pas de justificatif', 'À recycler'],
  'NETT-01': ['Pas de plan', 'Plan non appliqué', 'Zones oubliées', 'Propreté insuffisante'],
  'NETT-02': ['Produits près des denrées', 'Produit non agréé', 'Stockage non dédié', 'Étiquetage produit absent'],
  'NETT-03': ['Aucun enregistrement', 'Fiches non signées', 'Suivi incomplet', 'Non daté'],
  'NUIS-01': ['Pas de contrat / plan', 'Rapports non à jour', 'Plan des appâts absent', 'Suivi insuffisant'],
  'NUIS-02': ['Déjections observées', 'Insectes présents', 'Traces de passage', 'Nuisible vu'],
  'STOCK-01': ['Cru/cuit mélangés', 'Ustensiles partagés', 'Contamination croisée', 'Plan de travail commun'],
  'STOCK-02': ['Denrées au sol', 'Pas de rotation', 'Produits non protégés', 'Stock désorganisé'],
  'LOC-01': ['Surface dégradée', 'Sol / mur non nettoyable', 'Plafond abîmé', 'Zone non entretenue'],
  'LOC-02': ['Matériel abîmé', 'Surface non alimentaire', 'Équipement rouillé', 'À remplacer'],
  'DECH-01': ['Poubelle à commande manuelle', 'Évacuation insuffisante', 'Accumulation', 'Tri non fait'],
  'DECH-02': ['Local sale', 'Local non fermé', 'Présence de nuisibles', 'Odeurs'],
  'PMS-01': ['Pas de PMS', 'PMS incomplet', 'Non mis à jour', 'Volet manquant'],
  'PMS-02': ['Autocontrôles absents', 'Partiels', 'Non tracés', 'Points critiques non suivis'],
  'ALL-01': ['Aucune information', 'Information incomplète', 'Non à jour', 'Pas accessible au client'],
  'ALL-02': ['Pas de matériel dédié', 'Risque contamination croisée', 'Organisation absente', 'Non formalisé'],
  'EAU-01': ['Machine à glaçons sale', 'Entretien non fait', 'Eau non contrôlée', 'Détartrage absent'],
};

/** Liste plate de tous les items (utile pour instancier un audit). */
export function flattenGrille(): Array<GrilleItem & { theme: string }> {
  return GRILLE_AUDIT.flatMap((t) => t.items.map((i) => ({ ...i, theme: t.theme })));
}

/** Index par code pour fusionner explication/pédagogie/constats avec les items en base. */
export function grilleByCode(): Map<string, GrilleItem & { theme: string }> {
  return new Map(flattenGrille().map((i) => [i.code, i]));
}
