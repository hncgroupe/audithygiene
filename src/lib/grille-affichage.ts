import type { GrilleConstat, GrilleItem, GrilleTheme } from './grille-audit';

/**
 * Grille « affichage et information du consommateur » - SQUELETTE À VALIDER.
 *
 * Pourquoi ce volet existe, et pourquoi il est séparé de la grille d'hygiène :
 * un établissement de restauration relève de deux administrations et de deux
 * contrôles distincts. La DDPP, services vétérinaires, contrôle l'hygiène des
 * denrées et des locaux : c'est l'objet de GRILLE_AUDIT. La DGCCRF contrôle la
 * loyauté de l'information donnée au consommateur : prix affichés, allergènes,
 * origine des viandes, mentions valorisantes, affichages obligatoires en salle.
 * Les deux services peuvent passer indépendamment l'un de l'autre, et une
 * cuisine irréprochable ne protège de rien sur une carte incomplète.
 *
 * Comme la grille d'hygiène, ce fichier est un squelette. Chaque item doit être
 * rattaché à un point réglementaire précis, validé par le client ou un expert
 * avant usage en production. `explication`, `pedagogie`, `constats` (et leurs
 * `pourquoi`/`correctif`) sont des amorces (TODO) : ni officielles, ni
 * définitives. Les références portées dans `referenceRegl` ont été vérifiées
 * texte par texte, mais elles restent à confirmer avant toute reprise dans un
 * rapport remis à un client.
 *
 * Deux règles de rédaction reprises de la grille d'hygiène :
 * 1. ce qu'un texte impose est distingué de ce qui relève de l'usage
 *    professionnel, introduit par « Bonne pratique et non texte : » ;
 * 2. aucun montant, aucune sanction chiffrée : le champ `pourquoi` explique le
 *    risque pour le consommateur ou pour l'exploitant, pas le tarif.
 *
 * Interfaces importées de ./grille-audit : la structure est strictement
 * identique, pour que les deux volets s'instancient et se notent de la même
 * façon.
 */

export const GRILLE_AFFICHAGE_VERSION = 'v0-draft'; // non validée

export const GRILLE_AFFICHAGE: GrilleTheme[] = [
  {
    theme: 'Affichage des prix',
    items: [
      {
        code: 'PRIX-01',
        intitule: 'Affichage des prix visible de l’extérieur',
        explication: 'Se placer sur le trottoir avant d’entrer. Vérifier les prix des boissons et denrées les plus courantes affichés à l’extérieur et sur les emplacements extérieurs réservés à la clientèle, ainsi que les menus ou cartes du jour et la carte des vins pour un établissement servant des repas. Photographier la devanture.',
        pedagogie: 'Le client doit pouvoir connaître les prix avant de pousser la porte, c’est ce que le contrôleur vérifie en premier depuis la rue. C’est le point le plus simple à remettre en ordre et l’un des plus souvent relevés.',
        referenceRegl: 'Arrêté du 27 mars 1987 relatif à l’affichage des prix dans les établissements servant des repas, denrées ou boissons à consommer sur place, en vigueur, article 2 dans sa rédaction issue de l’arrêté du 29 juin 1990 : affichage à l’extérieur de l’établissement et sur les emplacements extérieurs réservés à la clientèle des prix des prestations les plus couramment servies, la liste étant énumérée par le texte (café, bière, jus de fruit, soda, eau minérale, apéritif anisé, plat du jour, sandwich), en caractères d’une hauteur minimale de 1,5 cm. Article 4, même rédaction : dans les établissements servant des repas, les menus ou cartes du jour ainsi qu’une carte comportant les prix de cinq vins au moins, ou des vins servis si l’établissement en sert moins de cinq, sont affichés de manière visible et lisible de l’extérieur pendant toute la durée du service et au moins à partir de 11 h 30 pour le déjeuner et de 18 heures pour le dîner ; à défaut de vins, les prix de cinq boissons couramment servies. Bonne pratique et non texte : le format, le support et la mise en page de l’affichage ne sont pas fixés, seuls la lisibilité, la visibilité depuis l’extérieur et la hauteur de caractères de l’article 2 le sont.',
        ponderation: 2,
        photoConseillee: true,
        constats: [
          { label: 'Prix et cartes affichés à l’extérieur', conformite: 'CONFORME' },
          { label: 'Affichage extérieur incomplet', conformite: 'NC_MINEURE', pourquoi: 'Le client ne peut pas connaître le prix ni comparer avant de s’attabler.', correctif: 'Compléter l’affichage extérieur, boissons courantes et menus du jour, et le remettre en place à chaque service.' },
          { label: 'Aucun affichage visible de l’extérieur', conformite: 'NC_MAJEURE', pourquoi: 'Défaut d’information sur les prix avant l’entrée : le consommateur s’engage sans connaître le tarif.', correctif: 'Installer un affichage extérieur lisible, prix des prestations courantes et menus, aux heures de service.' },
        ],
      },
      {
        code: 'PRIX-02',
        intitule: 'Carte des prix disponible à l’intérieur',
        explication: 'Demander la carte remise au client. Vérifier qu’un document reprend les boissons et denrées proposées avec leur prix, classées par catégorie, et que les menus indiquent si les boissons sont comprises, leur nature et leur contenance.',
        pedagogie: 'La carte intérieure doit dire la même chose que l’affichage extérieur, avec le détail. Une carte à jour évite la discussion au moment de l’addition.',
        referenceRegl: 'Arrêté du 27 mars 1987, article 3 : à l’intérieur de l’établissement, un document listant les boissons et denrées offertes à la vente avec leur prix, par catégorie, doit être mis à la disposition de la clientèle et directement lisible par elle. Article 5 : les menus et cartes indiquent, pour chaque prestation, le prix et si les boissons sont comprises ou non, ainsi que la nature et la contenance des boissons servies. Article 6 : les documents prévus peuvent être réunis en une carte unique mise à la disposition du client, le cas échéant au dos du menu. Bonne pratique et non texte : le nombre d’exemplaires de la carte, sa mise à jour datée et le remplacement des prix corrigés à la main ne sont fixés par aucune disposition, ce sont des usages professionnels.',
        ponderation: 2,
        constats: [
          { label: 'Carte complète et lisible remise au client', conformite: 'CONFORME' },
          { label: 'Carte incomplète ou prix corrigés à la main', conformite: 'NC_MINEURE', pourquoi: 'L’information sur le prix devient incertaine pour le client.', correctif: 'Rééditer une carte complète et lisible, prix par prestation, boissons comprises ou non, contenances.' },
          { label: 'Aucune carte des prix disponible en salle', conformite: 'NC_MAJEURE', pourquoi: 'Le client commande sans support écrit du prix : information non délivrée.', correctif: 'Mettre à disposition en salle un document reprenant toutes les prestations offertes et leur prix.' },
        ],
      },
      {
        code: 'PRIX-03',
        intitule: 'Prix nets, toutes taxes et service compris',
        explication: 'Vérifier que les prix affichés sont ceux effectivement payés par le client, taxes et service compris, et qu’aucun supplément non annoncé ne s’ajoute à l’addition. Comparer un prix de carte et une addition récente si l’exploitant l’accepte.',
        pedagogie: 'Le prix affiché est le prix payé, c’est la règle la plus regardée. Un supplément découvert au moment de l’addition est vécu comme une tromperie, même quand il ne s’agit que d’un oubli de mise à jour.',
        referenceRegl: 'Arrêté du 27 mars 1987, article 1er : les exploitants sont tenus d’afficher les prix à payer effectivement par le consommateur ; lorsqu’un service est perçu, les documents d’affichage portent la mention « Prix service compris » suivie, entre parenthèses, de l’indication du taux pratiqué. Règle générale de même portée : code de la consommation, article L. 112-1, information du consommateur sur les prix par voie de marquage, étiquetage, affichage ou tout autre procédé approprié, et arrêté du 3 décembre 1987 relatif à l’information du consommateur sur les prix, article 1er : toute information sur les prix doit faire apparaître la somme totale toutes taxes comprises qui devra être effectivement payée par le consommateur. Bonne pratique et non texte : le pourboire laissé librement par le client n’est pas un supplément de prix et n’est régi par aucune disposition d’affichage ; il ne peut pas être ajouté d’office à l’addition sans être annoncé comme un prix.',
        ponderation: 3,
        photoConseillee: true,
        constats: [
          { label: 'Prix nets affichés, service compris', conformite: 'CONFORME' },
          { label: 'Mention du service ou d’un supplément imprécise', conformite: 'NC_MINEURE', pourquoi: 'Le client ne sait pas ce qu’il paiera exactement.', correctif: 'Porter la mention « Prix service compris » et le taux sur les documents d’affichage, annoncer tout supplément sur la carte.' },
          { label: 'Écart entre le prix affiché et le prix payé', conformite: 'NC_MAJEURE', pourquoi: 'Le consommateur paie autre chose que le prix annoncé : atteinte directe à la loyauté de l’information.', correctif: 'Aligner immédiatement la carte et la caisse, afficher les prix réellement pratiqués, taxes et service compris.' },
        ],
      },
      {
        code: 'PRIX-04',
        intitule: 'Prix des ventes à emporter et des points de vente sans service à table',
        explication: 'Point à contrôler pour une boulangerie, une sandwicherie, un camion ou un comptoir de vente à emporter : prix marqués ou étiquetés sur les produits exposés, et prix des prestations affichés là où elles sont proposées.',
        pedagogie: 'La vente à emporter obéit aux règles générales d’information sur les prix, pas à celles de la salle de restaurant. Une étiquette par produit exposé suffit dans la plupart des cas.',
        referenceRegl: 'L’arrêté du 27 mars 1987 vise les établissements servant des repas, denrées ou boissons à consommer sur place ; pour un point de vente sans service à table, la référence est le régime général. Code de la consommation, article L. 112-1 : tout vendeur de produit ou prestataire de services informe le consommateur sur les prix par voie de marquage, d’étiquetage, d’affichage ou par tout autre procédé approprié, selon des modalités fixées par arrêté. Arrêté du 3 décembre 1987 relatif à l’information du consommateur sur les prix, en vigueur : article 1er, somme totale toutes taxes comprises effectivement payée ; article 4, le prix de tout produit destiné à la vente au détail et exposé à la vue du public est indiqué par un écriteau ou une étiquette ; article 13, le prix de toute prestation de services est affiché dans les lieux où elle est proposée au public. Bonne pratique et non texte : un établissement qui exerce les deux activités, sur place et à emporter, gagne à afficher les deux tarifs côte à côte, mais aucune disposition n’impose cette présentation.',
        ponderation: 2,
        constats: [
          { label: 'Prix marqués sur les produits et prestations', conformite: 'CONFORME' },
          { label: 'Étiquetage partiel des produits exposés', conformite: 'NC_MINEURE', pourquoi: 'Certains produits sont proposés sans prix visible.', correctif: 'Étiqueter chaque produit exposé, ou afficher un tableau reprenant l’ensemble des prix pratiqués.' },
          { label: 'Aucun prix affiché sur le point de vente', conformite: 'NC_MAJEURE', pourquoi: 'Le client achète sans connaître le prix : information sur les prix non délivrée.', correctif: 'Mettre en place le marquage ou l’affichage des prix de tous les produits et prestations proposés.' },
        ],
      },
    ],
  },
  {
    theme: 'Information sur les allergènes',
    items: [
      {
        code: 'ALLERG-01',
        intitule: 'Information allergènes disponible, complète et à jour',
        explication: 'Demander le support d’information allergènes et le confronter à deux ou trois recettes réelles, dont un plat sauce ou panure. Vérifier que la liste couvre bien les quatorze substances de l’annexe II et qu’elle suit les changements de fournisseur.',
        pedagogie: 'Pour un client allergique, une information juste évite l’accident grave. Ce point est aussi contrôlé côté hygiène : il figure au point ALL-01 de la grille d’hygiène, sous l’angle de la maîtrise du danger, alors qu’il est regardé ici sous l’angle de l’information du consommateur.',
        referenceRegl: 'Règlement (UE) n° 1169/2011 du 25 octobre 2011, article 9, paragraphe 1, point c), et annexe II : mention obligatoire de tout ingrédient ou auxiliaire technologique énuméré à l’annexe II, ou dérivé d’une substance ou d’un produit de cette annexe, utilisé dans la fabrication ou la préparation d’une denrée et encore présent dans le produit fini, même sous une forme modifiée. Article 44, paragraphe 1, point a) : cette mention reste obligatoire pour les denrées proposées non préemballées. En droit interne : décret n° 2015-447 du 17 avril 2015 relatif à l’information des consommateurs sur les allergènes et les denrées alimentaires non préemballées, codifié à l’article R. 412-12 du code de la consommation, qui impose que cette utilisation soit portée à la connaissance du consommateur final et des établissements de restauration. Bonne pratique et non texte : la mention « peut contenir des traces de » ne correspond à aucune obligation d’étiquetage, elle ne remplace pas l’information sur les allergènes réellement mis en œuvre et ne couvre pas un défaut de maîtrise de la contamination croisée.',
        ponderation: 3,
        constats: [
          { label: 'Information allergènes complète et tenue à jour', conformite: 'CONFORME' },
          { label: 'Information incomplète ou non actualisée', conformite: 'NC_MINEURE', pourquoi: 'Le client allergique reçoit une information partielle, sur laquelle il ne peut pas décider.', correctif: 'Reprendre chaque recette, lister les allergènes présents dans le produit fini et mettre à jour à chaque changement de produit.' },
          { label: 'Aucune information allergènes', conformite: 'NC_MAJEURE', pourquoi: 'Le consommateur allergique n’a aucun moyen de savoir ce qu’il mange : risque d’accident et défaut d’information.', correctif: 'Construire la liste des allergènes plat par plat à partir des étiquettes fournisseurs et la rendre accessible en salle.' },
        ],
      },
      {
        code: 'ALLERG-02',
        intitule: 'Support écrit de l’information allergènes accessible au client',
        explication: 'Vérifier la forme : l’information, ou l’indication de l’endroit où elle est consultable, doit être écrite, lisible et visible depuis la salle. Regarder si le client doit la demander pour l’obtenir.',
        pedagogie: 'Le texte n’impose pas un support précis, mais il impose l’écrit et la visibilité. Une mention sur la carte renvoyant au classeur disponible en salle répond à l’exigence, une réponse donnée seulement à l’oral non.',
        referenceRegl: 'Code de la consommation, article R. 412-13, issu du décret n° 2015-447 du 17 avril 2015 : l’information mentionnée à l’article R. 412-12 est indiquée sur la denrée elle-même ou à proximité de celle-ci, de façon qu’il n’existe aucune incertitude quant à la denrée à laquelle elle se rapporte, lorsque celle-ci est présentée non préemballée, emballée sur le lieu de vente à la demande du consommateur ou préemballée en vue de sa vente immédiate. Article R. 412-14, applicable aux lieux où sont proposés des repas à consommer sur place : sont portés à la connaissance du consommateur, sous forme écrite, de façon lisible et visible des lieux où est admis le public, soit ces informations, soit les modalités selon lesquelles elles sont tenues à sa disposition. Bonne pratique et non texte : le classeur, l’ardoise, le pictogramme par plat ou la mention en pied de carte sont des supports possibles, aucun n’est imposé ; le choix du support et son caractère suffisant relèvent de l’appréciation de l’agent.',
        ponderation: 2,
        photoConseillee: true,
        constats: [
          { label: 'Support écrit accessible et visible en salle', conformite: 'CONFORME' },
          { label: 'Support existant mais peu visible', conformite: 'NC_MINEURE', pourquoi: 'Le client doit demander pour savoir : l’information existe mais ne lui est pas portée.', correctif: 'Afficher en salle, de façon lisible et visible, l’information ou l’endroit exact où elle est consultable.' },
          { label: 'Information seulement orale', conformite: 'NC_MAJEURE', pourquoi: 'Rien d’écrit n’est porté à la connaissance du client : l’information dépend de la personne présente au moment du service.', correctif: 'Formaliser un support écrit, l’afficher ou en annoncer l’emplacement sur la carte, et former la salle à le présenter.' },
        ],
      },
    ],
  },
  {
    theme: 'Origine des viandes',
    items: [
      {
        code: 'VIAND-01',
        intitule: 'Origine des viandes bovine, porcine, ovine et de volaille',
        explication: 'Vérifier sur la carte, les menus ou l’affichage la mention d’origine des viandes servies, achetées crues par l’établissement. Confronter la mention affichée aux étiquettes des pièces en chambre froide. Photographier la carte.',
        pedagogie: 'L’origine des viandes est une information que le client attend et que le contrôleur retrouve facilement en comparant la carte et les étiquettes fournisseurs. Elle se met à jour en même temps que les approvisionnements.',
        referenceRegl: 'Décret n° 2002-1465 du 17 décembre 2002, aujourd’hui intitulé « relatif à l’étiquetage des viandes bovines, porcines, ovines et de volailles dans les établissements de restauration », dans sa rédaction issue du décret n° 2025-141 du 13 février 2025, en vigueur depuis le 19 février 2025. Articles 1er et 2 : pour les plats contenant ces viandes, proposés à la consommation sur place, à emporter ou en livraison, l’origine est indiquée sous la forme « Origine : (nom du pays) » lorsque la naissance, l’élevage et l’abattage ont eu lieu dans le même pays ; pour les bovins, « Né et élevé : (pays) et abattu : (pays) » dans les autres cas ; pour les porcins, les ovins et les volailles, « Élevé : (pays) et abattu : (pays) » dans les autres cas. Ces mentions sont portées à la connaissance du consommateur, de façon lisible et visible, par affichage, indication sur les cartes et menus ou sur tout autre support. Texte à ne plus citer : le décret n° 2022-65 du 26 janvier 2022 avait étendu l’obligation aux viandes porcine, ovine et de volaille du 1er mars 2022 au 29 février 2024 seulement ; il n’a pas été prorogé, et l’extension résulte désormais du décret n° 2025-141 intégré au décret n° 2002-1465. Bonne pratique et non texte : conserver les étiquettes d’origine et les bons de livraison pour justifier la mention affichée relève de l’usage et de la traçabilité (voir le point TRAC-02 de la grille d’hygiène), le décret ne l’impose pas en tant que tel.',
        ponderation: 2,
        photoConseillee: true,
        constats: [
          { label: 'Origine des viandes indiquée sur la carte ou par affichage', conformite: 'CONFORME' },
          { label: 'Origine indiquée pour une partie des viandes seulement', conformite: 'NC_MINEURE', pourquoi: 'L’information est partielle : le client ne sait pas pour quels plats elle vaut.', correctif: 'Compléter la carte espèce par espèce et reprendre la mention à chaque changement de fournisseur.' },
          { label: 'Aucune indication d’origine, ou origine démentie par les étiquettes', conformite: 'NC_MAJEURE', pourquoi: 'Information d’origine absente ou inexacte sur une denrée pour laquelle elle est obligatoire.', correctif: 'Relever l’origine sur les étiquettes fournisseurs et porter la mention exacte sur la carte, les menus ou l’affichage.' },
        ],
      },
      {
        code: 'VIAND-02',
        intitule: 'Origine des viandes utilisées comme ingrédients dans les produits transformés',
        explication: 'Point distinct du précédent : il vise les viandes entrant comme ingrédients dans des préparations de viandes et des produits à base de viande, saucisses, nuggets, steaks hachés, charcuteries. Demander si l’exploitant dispose de l’origine par ses fournisseurs et vérifier qu’elle est reportée.',
        pedagogie: 'L’obligation ne joue que si l’exploitant connaît l’origine au titre d’un texte. Quand le fournisseur la donne, elle doit remonter jusqu’à la carte, sans être noyée dans les autres mentions.',
        referenceRegl: 'Décret n° 2024-171 du 4 mars 2024 relatif à l’indication de l’origine des viandes utilisées en tant qu’ingrédients dans des préparations de viandes et des produits à base de viande applicable aux établissements de restauration, en vigueur, applicable depuis le 7 mars 2024. Il vise les espèces bovine, porcine, ovine et de volailles et les établissements de restauration mentionnés à l’article L. 412-9 du code de la consommation : l’exploitant informe le consommateur de l’origine lorsqu’il en a connaissance en application d’une réglementation nationale ou de l’Union européenne. Formules reprises du décret n° 2002-1465 : « Origine : (pays) », « Né et élevé : ... et abattu : ... » pour les bovins, « Élevé : ... et abattu : ... » pour les porcins, ovins et volailles, la mention « UE » ou « hors UE » étant admise dans les cas prévus par la réglementation. L’information est délivrée avant la conclusion du contrat, de manière visible, lisible et distincte des autres mentions relatives aux viandes, y compris en vente à distance. Bonne pratique et non texte : demander systématiquement l’origine à ses fournisseurs de produits transformés n’est pas une obligation posée par ce décret, c’est le seul moyen pratique de renseigner la carte lorsque l’information existe.',
        ponderation: 2,
        constats: [
          { label: 'Origine des viandes ingrédients reportée quand elle est connue', conformite: 'CONFORME' },
          { label: 'Origine connue du fournisseur mais non reportée sur la carte', conformite: 'NC_MINEURE', pourquoi: 'L’information dont dispose l’exploitant ne parvient pas au consommateur.', correctif: 'Reporter l’origine communiquée par le fournisseur sur la carte, de façon visible et distincte des autres mentions.' },
          { label: 'Mention d’origine erronée sur un produit transformé', conformite: 'NC_MAJEURE', pourquoi: 'Le consommateur se décide sur une origine qui n’est pas celle du produit servi.', correctif: 'Retirer immédiatement la mention inexacte et ne réafficher qu’une origine justifiée par les documents fournisseurs.' },
        ],
      },
    ],
  },
  {
    theme: 'Mentions valorisantes et état des denrées',
    items: [
      {
        code: 'MENT-01',
        intitule: 'Emploi de la mention « fait maison »',
        explication: 'Si la mention figure sur la carte, vérifier plat par plat qu’elle correspond à une élaboration sur place à partir de produits bruts, et contrôler la forme de l’affichage : mention unique si tous les plats sont concernés, mention par plat sinon.',
        pedagogie: 'La mention « fait maison » a une définition précise et vérifiable en cuisine. Utilisée pour un plat qui n’y a pas droit, elle attire l’attention du contrôleur sur toute la carte.',
        referenceRegl: 'Code de la consommation, article L. 122-19 : les personnes ou entreprises qui transforment ou distribuent des produits alimentaires dans le cadre d’une activité de restauration commerciale, de vente de repas à emporter, ou de restauration collective, à titre permanent ou occasionnel, principal ou secondaire, précisent sur leurs cartes ou sur tout autre support qu’un plat proposé est « fait maison ». Article L. 122-20 : un plat « fait maison » est élaboré sur place à partir de produits bruts, des produits déterminés par voie réglementaire pouvant entrer dans sa composition après avoir subi une transformation nécessaire à leur mise en œuvre. Articles D. 122-1 à D. 122-3 : liste des produits admis bien que non bruts, définition de l’élaboration sur place et de ses exceptions, et modalités d’affichage, mention en un lieu unique visible lorsque tous les plats sont faits maison, mention accompagnant chaque plat concerné dans le cas contraire, aucun plat composé exclusivement des produits listés à l’article D. 122-1 ne pouvant porter la mention. Textes d’origine : décret n° 2014-797 du 11 juillet 2014 relatif à la mention « fait maison » dans les établissements de restauration commerciale ou de vente à emporter de plats préparés, modifié par le décret n° 2015-505 du 6 mai 2015. Attention à la numérotation : les articles D. 121-13-1 à D. 121-13-3 créés en 2014 ne sont plus la référence à citer, la partie réglementaire du code de la consommation ayant été recodifiée par le décret n° 2016-884 du 29 juin 2016, applicable au 1er juillet 2016 ; ils sont devenus les articles D. 122-1 à D. 122-3.',
        ponderation: 2,
        photoConseillee: true,
        constats: [
          { label: 'Mention « fait maison » employée conformément à la définition', conformite: 'CONFORME' },
          { label: 'Affichage de la mention à corriger', conformite: 'NC_MINEURE', pourquoi: 'Le client ne distingue pas quels plats sont concernés.', correctif: 'Placer la mention plat par plat, ou en un lieu unique visible si tous les plats de la carte y répondent.' },
          { label: 'Mention apposée sur un plat qui n’y a pas droit', conformite: 'NC_MAJEURE', pourquoi: 'Le client paie une valorisation qui ne correspond pas au plat servi.', correctif: 'Retirer la mention des plats concernés et ne la conserver que pour ceux élaborés sur place à partir de produits bruts.' },
        ],
      },
      {
        code: 'MENT-02',
        intitule: 'Mention « décongelé » sur les denrées servies décongelées',
        explication: 'Rechercher les produits achetés congelés et servis décongelés sans transformation : pâtisseries, entrées, produits de la mer présentés en vitrine. Vérifier si la dénomination portée sur la carte ou en vitrine est accompagnée de la mention.',
        pedagogie: 'La mention vise le produit vendu tel quel après décongélation, pas le plat cuisiné sur place à partir d’un produit surgelé. C’est la présentation à côté de produits frais qui rend l’information nécessaire.',
        referenceRegl: 'Règlement (UE) n° 1169/2011 du 25 octobre 2011, article 17 et annexe VI, partie A, point 2 : pour les denrées alimentaires qui ont été congelées avant leur vente et qui sont vendues décongelées, la dénomination de la denrée est accompagnée de la mention « décongelé », sous réserve des dérogations prévues au même point. Denrées non préemballées : code de la consommation, article R. 412-11, la dénomination définie par le règlement (UE) n° 1169/2011 de toute denrée présentée non préemballée au stade de la remise au consommateur final, et le cas échéant les autres mentions obligatoires devant l’accompagner, sont indiquées sur la denrée elle-même ou à proximité de celle-ci, de façon qu’il n’existe aucune incertitude quant à la denrée à laquelle elles se rapportent. Bonne pratique et non texte : aucune disposition vérifiée n’impose d’indiquer sur une carte qu’un plat cuisiné sur place a été préparé à partir d’un produit surgelé. Le besoin d’informer sur l’état décongelé s’apprécie au cas par cas, notamment lorsque le produit est présenté au milieu de produits frais ou dans un environnement suggérant une préparation sur place ; cette lecture est celle de l’administration, elle relève de l’appréciation de l’agent et non d’un texte qui la formulerait ainsi.',
        ponderation: 2,
        constats: [
          { label: 'Produits servis décongelés correctement signalés', conformite: 'CONFORME' },
          { label: 'Mention absente sur une partie des produits concernés', conformite: 'NC_MINEURE', pourquoi: 'Le client peut croire fraîche une denrée qui a été congelée puis décongelée.', correctif: 'Ajouter la mention « décongelé » à la dénomination des produits vendus tels quels après décongélation.' },
          { label: 'Produits décongelés présentés comme frais', conformite: 'NC_MAJEURE', pourquoi: 'La présentation induit le consommateur en erreur sur l’état réel de la denrée.', correctif: 'Corriger immédiatement la dénomination et séparer la présentation des produits frais et des produits décongelés.' },
        ],
      },
      {
        code: 'MENT-03',
        intitule: 'Allégations et mentions valorisantes exactes',
        explication: 'Relever sur la carte, l’ardoise et la devanture les mots qui valorisent le plat : maison, artisanal, traditionnel, frais, du jour, du pêcheur, de la ferme, régional. Vérifier auprès de l’exploitant ce qui les justifie.',
        pedagogie: 'Ces mots ne sont pas interdits, ils engagent. Ils sont contrôlés au regard de ce qui se passe réellement en cuisine, et il vaut mieux en écrire moins et pouvoir tout justifier.',
        referenceRegl: 'Code de la consommation, article L. 121-2 : une pratique commerciale est trompeuse notamment lorsqu’elle repose sur des allégations, indications ou présentations fausses ou de nature à induire en erreur, portant en particulier sur les caractéristiques essentielles du bien ou du service, dont ses qualités substantielles, sa composition et son origine. Article L. 441-1 : il est interdit, pour toute personne, partie ou non au contrat, de tromper ou tenter de tromper le contractant, par quelque moyen ou procédé que ce soit, notamment sur la nature, l’espèce, l’origine, les qualités substantielles, la composition ou la teneur en principes utiles de toute marchandise. Bonne pratique et non texte : à l’exception de « fait maison », défini aux articles L. 122-19, L. 122-20 et D. 122-1 à D. 122-3, les mentions « artisanal », « traditionnel », « du chef », « frais » ou « du jour » ne font l’objet d’aucune définition propre à la restauration qui ait pu être vérifiée ici. Leur emploi n’est pas encadré en tant que tel, il est apprécié au regard de l’interdiction des pratiques commerciales trompeuses.',
        ponderation: 3,
        photoConseillee: true,
        constats: [
          { label: 'Mentions valorisantes justifiées par la pratique réelle', conformite: 'CONFORME' },
          { label: 'Mention imprécise ou difficile à justifier', conformite: 'NC_MINEURE', pourquoi: 'Le client se décide sur une promesse que l’établissement ne peut pas démontrer.', correctif: 'Préciser ou retirer les mentions non justifiables, et conserver les preuves d’approvisionnement pour celles qui restent.' },
          { label: 'Allégation contredite par ce qui est constaté en cuisine', conformite: 'NC_MAJEURE', pourquoi: 'Information fausse sur une qualité essentielle du plat : le consommateur est induit en erreur.', correctif: 'Retirer immédiatement l’allégation de tous les supports, carte, ardoise, devanture et sites de commande.' },
        ],
      },
    ],
  },
  {
    theme: 'Affichages obligatoires en salle',
    items: [
      {
        code: 'AFF-01',
        intitule: 'Affiche protection des mineurs et répression de l’ivresse publique',
        explication: 'Point applicable à tout établissement qui vend de l’alcool, sur place ou à emporter. Vérifier la présence de l’affiche conforme au modèle en vigueur, près de l’entrée ou près du comptoir, immédiatement visible par la clientèle. Un établissement qui ne sert aucune boisson alcoolique n’est pas concerné.',
        pedagogie: 'C’est l’affichage le plus souvent oublié après un changement de décoration. Il se remet en place en quelques minutes et il protège l’équipe quand un client conteste un refus de servir.',
        referenceRegl: 'Code de la santé publique, article L. 3342-4 : une affiche rappelant les dispositions relatives à la répression de l’ivresse publique et à la protection des mineurs est apposée dans les débits de boissons à consommer sur place, un modèle particulier étant prévu pour les débits de boissons à emporter ; les modèles de ces affiches et les lieux où elles sont apposées sont déterminés par arrêté du ministre chargé de la santé. Arrêté du 17 octobre 2016 fixant les modèles et lieux d’apposition des affiches prévues par l’article L. 3342-4 du code de la santé publique, entré en vigueur le 1er décembre 2016 : dans les débits de boissons à consommer sur place, l’affiche est apposée de façon immédiatement visible par la clientèle, près de l’entrée ou près du comptoir. Cet arrêté a succédé à l’arrêté du 27 janvier 2010, qui ne doit plus servir de référence pour le modèle.',
        ponderation: 2,
        photoConseillee: true,
        constats: [
          { label: 'Affiche conforme et visible', conformite: 'CONFORME' },
          { label: 'Affiche présente mais mal placée ou ancien modèle', conformite: 'NC_MINEURE', pourquoi: 'L’affichage n’atteint pas la clientèle qu’il doit informer.', correctif: 'Reposer l’affiche au modèle en vigueur près de l’entrée ou du comptoir, à hauteur de lecture.' },
          { label: 'Aucune affiche', conformite: 'NC_MAJEURE', pourquoi: 'Obligation d’affichage non satisfaite dans un établissement qui vend de l’alcool.', correctif: 'Se procurer l’affiche au modèle fixé par l’arrêté et l’apposer aux emplacements qu’il prévoit.' },
        ],
      },
      {
        code: 'AFF-02',
        intitule: 'Licence et étalage des boissons sans alcool',
        explication: 'Point applicable aux débits de boissons. Vérifier la présence de l’étalage des boissons non alcooliques en évidence là où sont servis les consommateurs, et demander à voir le justificatif de licence, dont la catégorie doit correspondre aux boissons réellement servies.',
        pedagogie: 'L’étalage des boissons sans alcool est une obligation ancienne et très concrète, souvent réduite à deux bouteilles derrière le comptoir. Il se remet en conformité avec le stock existant.',
        referenceRegl: 'Code de la santé publique, article L. 3323-1 : dans tous les débits de boissons, un étalage des boissons non alcooliques mises en vente dans l’établissement est obligatoire ; il comporte au moins dix bouteilles ou récipients et présente, dans la mesure où le débit est approvisionné, au moins un échantillon de chaque catégorie de boissons énumérées par le texte ; cet étalage, séparé de celui des autres boissons, est installé en évidence dans les lieux où sont servis les consommateurs. Catégories de licences de débits de boissons à consommer sur place : article L. 3331-1 du même code. Exigence énoncée sans source, faute de certitude : le panonceau extérieur indiquant la catégorie de licence en chiffres romains rouges sur fond blanc, près de la porte principale, est présenté comme obligatoire par de nombreux documents professionnels, mais nous n’avons pas pu le rattacher à un texte en vigueur et certains services de l’État indiquent que cet affichage ne l’est plus. Il est donc traité ici comme un usage et ne doit pas être présenté au client comme une règle de droit.',
        ponderation: 1,
        photoConseillee: true,
        constats: [
          { label: 'Étalage des boissons sans alcool en place', conformite: 'CONFORME' },
          { label: 'Étalage incomplet ou peu visible', conformite: 'NC_MINEURE', pourquoi: 'Le client ne voit pas l’offre sans alcool dont il dispose.', correctif: 'Reconstituer un étalage séparé, en évidence, comportant au moins dix bouteilles ou récipients.' },
          { label: 'Aucun étalage de boissons non alcooliques', conformite: 'NC_MAJEURE', pourquoi: 'Obligation propre aux débits de boissons non satisfaite.', correctif: 'Installer l’étalage prévu par le texte à l’endroit où sont servis les consommateurs.' },
        ],
      },
      {
        code: 'AFF-03',
        intitule: 'Signalisation de l’interdiction de fumer',
        explication: 'Vérifier la présence d’une signalisation apparente dans les lieux fermés et couverts, salle, sanitaires, cuisine, et son format. Attention au modèle : les affiches anciennes ne sont plus la référence. Photographier la signalisation en place.',
        pedagogie: 'L’interdiction est connue de tous, c’est la signalisation qui manque. Elle a changé de modèle récemment, une affiche jaunie posée il y a dix ans est souvent le seul écart relevé sur ce point.',
        referenceRegl: 'Décret n° 2006-1386 du 15 novembre 2006 fixant les conditions d’application de l’interdiction de fumer dans les lieux affectés à un usage collectif, dont les dispositions sont aujourd’hui codifiées au code de la santé publique. Article R. 3512-2 : l’interdiction de fumer dans les lieux affectés à un usage collectif s’applique dans tous les lieux fermés et couverts qui accueillent du public ou qui constituent des lieux de travail. Article R. 3512-7 : dans les lieux mentionnés à l’article R. 3512-2, une signalisation apparente rappelle le principe de l’interdiction de fumer, un modèle de signalisation accompagné d’un message sanitaire de prévention étant déterminé par arrêté du ministre chargé de la santé. Texte remplacé à signaler : l’arrêté du 1er décembre 2010 qui fixait ces modèles a été abrogé par l’arrêté du 21 juillet 2025 fixant les périmètres et les modèles de signalisation prévus respectivement aux articles R. 3512-2 et R. 3512-7 du code de la santé publique, entré en vigueur le lendemain de sa publication, soit le 23 juillet 2025. Ce même arrêté fixe des dimensions minimales de signalisation, maintient sous conditions la validité de certaines signalisations existantes et prévoit un délai de mise en conformité pour l’un de ses modèles : le détail est à vérifier dans le texte avant reprise dans un rapport.',
        ponderation: 2,
        photoConseillee: true,
        constats: [
          { label: 'Signalisation apparente et conforme au modèle en vigueur', conformite: 'CONFORME' },
          { label: 'Signalisation présente mais ancienne ou incomplète', conformite: 'NC_MINEURE', pourquoi: 'Le rappel de l’interdiction ne correspond plus au modèle applicable.', correctif: 'Remplacer par le modèle en vigueur et couvrir tous les lieux fermés et couverts, salle, sanitaires, locaux du personnel.' },
          { label: 'Aucune signalisation', conformite: 'NC_MAJEURE', pourquoi: 'Obligation de signalisation non satisfaite dans un lieu accueillant du public.', correctif: 'Apposer la signalisation au modèle en vigueur aux entrées et dans les espaces concernés.' },
        ],
      },
      {
        code: 'AFF-04',
        intitule: 'Signalisation de l’interdiction de vapoter dans les locaux du personnel',
        explication: 'Point à ne pas confondre avec le précédent. Vérifier la signalisation dans les locaux fermés et couverts réservés au personnel, cuisine, réserve, vestiaire, bureau. La salle qui accueille la clientèle n’entre pas dans les lieux de travail visés par le texte.',
        pedagogie: 'Vapoter en salle n’est pas interdit par la loi dans un bar ou un restaurant, l’exploitant reste libre de l’interdire chez lui. L’obligation de signalisation, elle, vise les locaux où travaille l’équipe sans public.',
        referenceRegl: 'Code de la santé publique, article L. 3513-6, qui interdit de vapoter dans certains lieux, dont, au 3°, les lieux de travail fermés et couverts à usage collectif. Décret n° 2017-633 du 25 avril 2017 relatif aux conditions d’application de l’interdiction de vapoter dans certains lieux à usage collectif, codifié aux articles R. 3513-2 et R. 3513-3 du code de la santé publique, dont les dispositions sont entrées en vigueur le 1er octobre 2017. Article R. 3513-2 : les lieux de travail soumis à l’interdiction de vapoter en application du 3° de l’article L. 3513-6 s’entendent des locaux recevant des postes de travail, situés ou non dans les bâtiments de l’établissement, fermés et couverts, et affectés à un usage collectif, à l’exception des locaux qui accueillent du public. Article R. 3513-3 : une signalisation apparente rappelle le principe de l’interdiction de vapoter et, le cas échéant, ses conditions d’application dans l’enceinte de ces lieux. Conséquence pour un bar ou un restaurant : la salle ouverte à la clientèle est exclue de la définition des lieux de travail visés, la signalisation obligatoire concerne les locaux fermés et couverts réservés au personnel. Bonne pratique et non texte : interdire le vapotage en salle et l’indiquer sur la carte ou à l’entrée relève du choix de l’exploitant, pas d’une obligation.',
        ponderation: 1,
        constats: [
          { label: 'Signalisation en place dans les locaux concernés', conformite: 'CONFORME' },
          { label: 'Signalisation absente d’une partie des locaux du personnel', conformite: 'NC_MINEURE', pourquoi: 'Le rappel de l’interdiction ne couvre pas tous les locaux visés.', correctif: 'Compléter la signalisation dans les locaux fermés et couverts affectés au travail sans accueil de public.' },
          { label: 'Aucune signalisation dans les locaux du personnel', conformite: 'NC_MAJEURE', pourquoi: 'Obligation de signalisation non satisfaite dans les lieux de travail visés.', correctif: 'Apposer une signalisation apparente rappelant l’interdiction de vapoter dans ces locaux.' },
        ],
      },
      {
        code: 'AFF-05',
        intitule: 'Registre public d’accessibilité',
        explication: 'Point applicable aux établissements recevant du public : demander le registre et vérifier qu’il est consultable sur place, au principal point d’accueil accessible. Pour un point de vente mobile sans local accessible à la clientèle, la qualification d’établissement recevant du public est à vérifier au cas par cas.',
        pedagogie: 'Le registre est un dossier, pas des travaux. Il rassemble ce qui existe déjà, les pièces d’accessibilité du local et la description de l’accueil, et se constitue en une matinée.',
        referenceRegl: 'Décret n° 2017-431 du 28 mars 2017 relatif au registre public d’accessibilité et modifiant diverses dispositions relatives à l’accessibilité aux personnes handicapées des établissements recevant du public et des installations ouvertes au public, et arrêté du 19 avril 2017 fixant le contenu et les modalités de diffusion et de mise à jour du registre public d’accessibilité. Dispositions aujourd’hui codifiées au code de la construction et de l’habitation, article L. 164-1 et article R. 164-6 : l’exploitant de tout établissement recevant du public élabore le registre public d’accessibilité, qui précise les dispositions prises pour permettre à tous, notamment aux personnes handicapées, quel que soit leur handicap, de bénéficier des prestations en vue desquelles cet établissement a été conçu ; il contient les informations sur les prestations fournies, la liste des pièces administratives et techniques relatives à l’accessibilité et la description des actions de formation des personnels chargés de l’accueil des personnes handicapées avec leurs justificatifs. Attention à la numérotation : les articles R. 111-19-60 et suivants créés en 2017 ne sont plus la référence à citer depuis la recodification de la partie réglementaire du code de la construction et de l’habitation entrée en vigueur le 1er juillet 2021.',
        ponderation: 1,
        constats: [
          { label: 'Registre constitué et consultable', conformite: 'CONFORME' },
          { label: 'Registre incomplet ou non mis à jour', conformite: 'NC_MINEURE', pourquoi: 'Le public n’y trouve pas l’information sur les prestations accessibles.', correctif: 'Compléter les pièces manquantes, décrire l’accueil des personnes handicapées et dater la mise à jour.' },
          { label: 'Aucun registre', conformite: 'NC_MAJEURE', pourquoi: 'Obligation propre aux établissements recevant du public non satisfaite.', correctif: 'Constituer le registre à partir des pièces d’accessibilité existantes et le rendre consultable au point d’accueil.' },
        ],
      },
      {
        code: 'AFF-06',
        intitule: 'Contenants réutilisables pour emporter les restes',
        explication: 'Demander si l’établissement dispose de contenants à remettre au client qui en fait la demande, et vérifier l’affichage informant le consommateur sur les règles de nettoyage et d’aptitude des contenants réutilisables.',
        pedagogie: 'Il ne s’agit pas de proposer systématiquement, mais de pouvoir répondre au client qui demande à emporter ce qu’il n’a pas fini. L’affichage sur les contenants apportés par le client est la partie la plus souvent oubliée.',
        referenceRegl: 'Code de l’environnement, article L. 541-15-7, dans sa rédaction issue de la loi n° 2020-105 du 10 février 2020 relative à la lutte contre le gaspillage et à l’économie circulaire, article 44, applicable depuis le 1er juillet 2021 : les établissements de restauration commerciale et les débits de boissons mettent à la disposition des consommateurs qui en font la demande des contenants réutilisables ou recyclables permettant d’emporter les aliments ou boissons non consommés, sous les réserves prévues par le texte ; les entreprises de restauration et de distribution de produits alimentaires exerçant une activité de vente à emporter utilisent à cette fin des contenants réutilisables ou recyclables. Le contenant peut être apporté par le consommateur, l’établissement pouvant refuser de le servir dans un contenant manifestement sale ou inadapté. Un affichage en établissement informe le consommateur sur les règles de nettoyage et d’aptitude des contenants réutilisables. Bonne pratique et non texte : le format de cet affichage et le modèle de contenant ne sont fixés par aucune disposition vérifiée ici.',
        ponderation: 1,
        constats: [
          { label: 'Contenants disponibles et affichage en place', conformite: 'CONFORME' },
          { label: 'Contenants disponibles mais aucun affichage', conformite: 'NC_MINEURE', pourquoi: 'Le client ignore les règles applicables au contenant qu’il apporte.', correctif: 'Afficher en salle les règles de nettoyage et d’aptitude des contenants réutilisables.' },
          { label: 'Aucun contenant proposé au client qui le demande', conformite: 'NC_MAJEURE', pourquoi: 'Obligation de mise à disposition non satisfaite : le client ne peut pas emporter ce qu’il a payé.', correctif: 'Constituer un stock de contenants réutilisables ou recyclables et informer l’équipe de la règle.' },
        ],
      },
    ],
  },
];

/**
 * Motifs de non-conformité prédéfinis par item (TODO à valider).
 * Même usage que MOTIFS_PAR_CODE dans la grille d'hygiène : affichés quand
 * l'auditeur sélectionne « mineure » ou « majeure », un clic ajoute le motif à
 * la note, complété au besoin par un détail libre.
 */
export const MOTIFS_AFFICHAGE_PAR_CODE: Record<string, string[]> = {
  'PRIX-01': ['Aucun affichage extérieur', 'Prix des boissons courantes absents', 'Menu du jour non affiché', 'Carte des vins absente', 'Affichage retiré pendant le service'],
  'PRIX-02': ['Pas de carte en salle', 'Prestations sans prix', 'Prix corrigés à la main', 'Boissons comprises ou non non précisé', 'Contenance des boissons absente'],
  'PRIX-03': ['Mention « service compris » absente', 'Taux de service non indiqué', 'Supplément non annoncé', 'Prix de carte différent du prix encaissé'],
  'PRIX-04': ['Produits exposés sans étiquette', 'Aucun tableau de prix', 'Prix non toutes taxes comprises', 'Prestations sans affichage'],
  'ALLERG-01': ['Aucune information allergènes', 'Liste incomplète', 'Non mise à jour après changement de fournisseur', 'Recette non conforme à la liste', 'Renvoi aux traces sans information réelle'],
  'ALLERG-02': ['Information seulement orale', 'Support non visible du public', 'Emplacement du classeur non indiqué', 'Support illisible'],
  'VIAND-01': ['Aucune mention d’origine', 'Origine partielle selon les espèces', 'Formule non conforme au décret', 'Origine démentie par les étiquettes', 'Mention non mise à jour'],
  'VIAND-02': ['Origine connue non reportée', 'Mention noyée dans la carte', 'Origine erronée', 'Aucune information demandée aux fournisseurs'],
  'MENT-01': ['Mention sur un plat non élaboré sur place', 'Produit non brut à l’origine du plat', 'Mention globale alors que tous les plats ne le sont pas', 'Mention absente sur les plats concernés'],
  'MENT-02': ['Produit décongelé non signalé', 'Décongelé présenté parmi les produits frais', 'Mention absente en vitrine', 'Dénomination incomplète'],
  'MENT-03': ['Allégation non justifiable', 'Mention « frais » contredite en cuisine', 'Origine annoncée non prouvée', '« Du jour » sur un plat conservé'],
  'AFF-01': ['Aucune affiche', 'Affiche à l’ancien modèle', 'Affiche non visible de la clientèle', 'Affiche absente du point de vente à emporter'],
  'AFF-02': ['Étalage absent', 'Moins de dix bouteilles', 'Étalage mélangé aux boissons alcooliques', 'Étalage hors de vue des consommateurs'],
  'AFF-03': ['Aucune signalisation', 'Modèle abrogé', 'Signalisation absente des sanitaires', 'Signalisation absente des locaux du personnel', 'Format insuffisant'],
  'AFF-04': ['Aucune signalisation en cuisine', 'Signalisation absente des réserves', 'Signalisation absente du vestiaire'],
  'AFF-05': ['Aucun registre', 'Registre non consultable sur place', 'Pièces d’accessibilité manquantes', 'Formation de l’accueil non décrite', 'Registre non mis à jour'],
  'AFF-06': ['Aucun contenant disponible', 'Refus opposé au client', 'Aucun affichage sur les contenants', 'Contenants ni réutilisables ni recyclables'],
};

/** Liste plate de tous les items du volet affichage (utile pour instancier un audit). */
export function flattenGrilleAffichage(): Array<GrilleItem & { theme: string }> {
  return GRILLE_AFFICHAGE.flatMap((t) => t.items.map((i) => ({ ...i, theme: t.theme })));
}

/** Index par code pour fusionner explication/pédagogie/constats avec les items en base. */
export function grilleAffichageByCode(): Map<string, GrilleItem & { theme: string }> {
  return new Map(flattenGrilleAffichage().map((i) => [i.code, i]));
}

/** Constats pré-remplis d'un point du volet affichage, vide si le code est inconnu. */
export function constatsAffichage(code: string): GrilleConstat[] {
  return grilleAffichageByCode().get(code)?.constats ?? [];
}
