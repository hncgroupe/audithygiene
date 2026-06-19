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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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
        referenceRegl: 'TODO',
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

/** Liste plate de tous les items (utile pour instancier un audit). */
export function flattenGrille(): Array<GrilleItem & { theme: string }> {
  return GRILLE_AUDIT.flatMap((t) => t.items.map((i) => ({ ...i, theme: t.theme })));
}

/** Index par code pour fusionner explication/pédagogie/constats avec les items en base. */
export function grilleByCode(): Map<string, GrilleItem & { theme: string }> {
  return new Map(flattenGrille().map((i) => [i.code, i]));
}
