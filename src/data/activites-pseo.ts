/**
 * Les pages « audit d'hygiène par type d'établissement ».
 *
 * Douze activités, douze pages. Ce qui justifie leur existence n'est pas le nom
 * du métier collé sur un dossier générique : c'est ce qui change réellement
 * d'une activité à l'autre. La liaison froide et le transport chez un traiteur,
 * l'étiquetage des allergènes en boulangerie, la découpe et les températures en
 * boucherie, la glace et la plonge dans un bar, l'assainissement du poisson cru
 * pour les sushis, l'eau embarquée en food truck.
 *
 * Deux précisions que ces pages portent et que presque personne ne publie :
 *
 *   1. Les seuils de refroidissement et de remise en température de l'annexe IV
 *      de l'arrêté du 21 décembre 2009 ne visent que la restauration
 *      collective (article 6). Onze de ces douze activités n'y sont pas
 *      soumises : ces valeurs y sont des références professionnelles à
 *      reprendre et à justifier dans le plan de maîtrise sanitaire, pas des
 *      obligations.
 *   2. La distinction entre ce qu'un texte impose et ce qui relève de la bonne
 *      pratique professionnelle est faite à chaque fois qu'elle change quelque
 *      chose pour l'exploitant.
 *
 * Règles de rédaction appliquées, voir docs/BRIEF-REDACTION.md : aucun prix,
 * aucune durée d'audit, aucune sanction chiffrée, aucune statistique de
 * contrôle, aucune mention de formation vendue, aucun tiret cadratin ni
 * demi-cadratin, et aucune référence réglementaire qui ne soit vérifiée dans
 * src/lib/grille-audit.ts.
 *
 * Les codes de `pointsSensibles` sont ceux de la grille, voir
 * src/lib/grille-audit.ts. Les chemins de `liens` existent réellement, slugs
 * issus de src/lib/familles.ts.
 */

export interface ActivitePseo {
  /** Identifiant d'URL de la page. kebab-case ASCII. */
  slug: string;
  /** Le métier au singulier, tel qu'on l'écrit dans une phrase. */
  nom: string;
  /** Le métier au pluriel, pour les tournures collectives. */
  nomPluriel: string;
  /** Le titre de la page, en h1. */
  titre: string;
  /** Le titre de la balise title. 60 caractères au plus. */
  titreSeo: string;
  /** La meta description. 150 à 160 caractères. */
  description: string;
  /** La réponse directe, 60 à 120 mots, lisible seule et sans contexte. */
  reponse: string;
  /** Le paragraphe d'ouverture, sous le h1. */
  ouverture: string;
  /** Les points de la grille qui pèsent le plus dans cette activité. */
  pointsSensibles: { code: string; pourquoi: string }[];
  sections: { titre: string; paragraphes: string[] }[];
  faq: { question: string; reponse: string }[];
  /** Chemins internes réels, 4 à 6 par page. */
  liens: string[];
}

export const ACTIVITES_PSEO: ActivitePseo[] = [
  {
    slug: "restaurant-traditionnel",
    nom: "restaurant traditionnel",
    nomPluriel: "restaurants traditionnels",
    titre: "Audit d'hygiène en restaurant traditionnel",
    titreSeo: "Audit hygiène restaurant traditionnel, Île-de-France",
    description:
      "Audit d'hygiène en restaurant traditionnel : les points qui pèsent vraiment, les textes qui s'appliquent et un plan d'action que vous pouvez appliquer seul.",
    reponse:
      "Dans un restaurant traditionnel, l'audit suit le produit de la réception à l'assiette et constate sur place les vingt-sept points de la grille. Quatre sujets concentrent l'essentiel des écarts : la température des enceintes froides et les relevés qui la prouvent, l'étiquetage des produits entamés et des préparations de la mise en place, la séparation du cru et du cuit dans une cuisine rarement dimensionnée pour cela, et l'information allergènes sur une carte qui bouge. L'auditeur note chaque point, classe les écarts par priorité et écrit pour chacun le correctif attendu et la preuve à constituer, de sorte que le plan d'action s'applique sans nous.",
    ouverture:
      "Un restaurant traditionnel travaille des produits bruts, prépare la veille pour le lendemain et sert deux fois par jour dans des locaux qui ont rarement été dessinés pour cela. C'est cette combinaison, et non le niveau de la cuisine, qui décide des points sur lesquels une visite passe du temps.",
    pointsSensibles: [
      {
        code: "FROID-01",
        pourquoi:
          "La mise en place de la veille, les fonds, les sauces et les produits entamés dorment dans les mêmes enceintes, chargées au maximum avant le service. C'est là qu'un dépassement passe le plus facilement inaperçu, parce que rien ne se voit et rien ne sent.",
      },
      {
        code: "FROID-03",
        pourquoi:
          "Les relevés s'interrompent presque toujours au même moment : le départ d'un chef de partie, une semaine chargée, un changement de matériel. Sans eux, rien ne prouve que le froid a été tenu, même quand il l'a été.",
      },
      {
        code: "TRAC-01",
        pourquoi:
          "Une cuisine traditionnelle vit de produits entamés et de préparations maison qui n'ont aucune date d'origine. La date d'ouverture et la durée de vie secondaire sont l'écart le plus fréquent de cette activité.",
      },
      {
        code: "TEMP-02",
        pourquoi:
          "Fonds, bouillons, braisés, légumes cuits en avance : presque toute la mise en place passe par un refroidissement. C'est l'étape où la température stagne le plus longtemps dans la plage qui pose problème.",
      },
      {
        code: "STOCK-01",
        pourquoi:
          "Le nombre de mètres carrés décide de beaucoup. Quand un seul plan de travail sert au parage du poisson et au dressage, la séparation des flux ne tient plus que par l'ordre des tâches et par un nettoyage intermédiaire.",
      },
      {
        code: "ALL-01",
        pourquoi:
          "Une carte qui change à l'ardoise, des sauces montées maison et une salle qui répond de mémoire : c'est la configuration où l'information allergènes se perd le plus vite, alors qu'elle est due au client.",
      },
      {
        code: "PMS-01",
        pourquoi:
          "Beaucoup de restaurants travaillent avec un plan de maîtrise sanitaire acheté tel quel, qui décrit une cuisine qui n'est pas la leur. L'écart entre le document et la réalité se repère en quelques minutes.",
      },
    ],
    sections: [
      {
        titre: "Le froid, premier poste d'écarts",
        paragraphes: [
          "Le règlement (CE) n° 852/2004 du 29 avril 2004, annexe II, chapitre IX, point 5, pose la règle de fond : les denrées susceptibles de favoriser la reproduction de micro-organismes pathogènes ne doivent pas être conservées à des températures pouvant entraîner un risque pour la santé, et la chaîne du froid ne doit pas être interrompue. Les valeurs chiffrées viennent de l'arrêté du 21 décembre 2009, article 3 et annexe I, pour les denrées d'origine animale, et de l'arrêté du 8 octobre 2013 pour les autres.",
          "Une précision utile en restaurant traditionnel : la cible souvent citée de 0 à +4 °C n'est pas un seuil réglementaire unique. Le seuil dépend de la denrée, et vous pouvez retenir une autre température si vous la justifiez par un guide de bonnes pratiques d'hygiène ou par votre analyse des dangers. Ce qui se contrôle, c'est la cohérence entre ce que votre plan annonce, ce que le thermomètre indique et ce que les relevés montrent.",
        ],
      },
      {
        titre: "Produits entamés, mise en place et durée de vie secondaire",
        paragraphes: [
          "C'est le sujet propre à la cuisine traditionnelle. Une boîte de crème ouverte, un sous-vide entamé, une farce préparée le matin, un fond passé la veille : aucun de ces produits ne porte de date qui vous protège. Le règlement (UE) n° 1169/2011 du 25 octobre 2011 encadre la date limite de consommation d'origine, et son article 24 précise qu'au delà de cette date une denrée est dite dangereuse au sens du règlement (CE) n° 178/2002. Mais il ne dit rien de ce qui se passe après ouverture.",
          "L'étiquetage des produits entamés, avec date d'ouverture et durée de vie secondaire, ne figure dans aucune disposition : c'est une bonne pratique professionnelle qui relève de votre plan de maîtrise sanitaire, établi à partir des conditions de conservation après ouverture indiquées par le fabricant. Le dire évite deux erreurs opposées : croire qu'on est hors la loi parce qu'une boîte n'est pas datée, et croire qu'on est libre de ne rien écrire.",
        ],
      },
      {
        titre: "Refroidissement : le seuil des deux heures ne vous est pas imposé",
        paragraphes: [
          "Tout le monde connaît la formule : de +63 °C à +10 °C en moins de deux heures. Elle est exacte, mais elle vient de l'annexe IV, point 1, de l'arrêté du 21 décembre 2009, dont l'article 6 réserve l'application aux établissements de restauration collective. Un restaurant qui remet directement au consommateur final n'y est pas soumis. La même remarque vaut pour la remise en température encadrée par l'annexe IV, point 3.",
          "Cela ne veut pas dire que le refroidissement est libre. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 6, impose de réfrigérer dès que possible après le traitement thermique, à une température n'entraînant pas de risque pour la santé, et son article 5 vous demande de fixer votre limite, de la surveiller et de réagir quand elle est dépassée. Les deux heures restent la meilleure référence disponible, et la plupart des exploitants la reprennent : simplement, elle devient votre règle et non celle d'un texte.",
        ],
      },
      {
        titre: "Cru, cuit, et le problème des mètres carrés",
        paragraphes: [
          "La marche en avant est la formulation professionnelle française d'exigences qui, elles, sont bien écrites : le règlement (CE) n° 852/2004, annexe II, chapitre II, point 1, demande que la conception et l'agencement des locaux permettent de prévenir la contamination entre et durant les opérations, et l'annexe II, chapitre IX, points 2, 3 et 5, exige de conserver les matières premières à l'abri de toute contamination et de protéger les denrées à toutes les étapes. La marche en avant n'est pas, en tant que telle, une notion juridique.",
          "La différence compte quand les locaux sont contraints, ce qui est le cas de la majorité des restaurants installés dans du bâti ancien. Vous n'êtes pas tenu de construire deux circuits séparés : vous êtes tenu d'obtenir le résultat. Une marche en avant dans le temps, avec des plages dédiées, du matériel identifié et un nettoyage intermédiaire tracé, répond à l'exigence quand la marche en avant dans l'espace est impossible.",
        ],
      },
      {
        titre: "Les allergènes sur une carte qui bouge",
        paragraphes: [
          "Pour les denrées proposées non préemballées, ce qui est le cas d'un plat servi à l'assiette, le règlement (UE) n° 1169/2011, article 44, paragraphe 1, point a), maintient l'obligation d'informer sur les substances de son annexe II. En droit interne, le décret n° 2015-447 du 17 avril 2015, codifié aux articles R. 412-12 et R. 412-13 du code de la consommation, demande que l'information soit portée sur la denrée ou à proximité, de façon qu'il n'existe aucune incertitude quant au plat auquel elle se rapporte.",
          "Le format est libre : une mention sur la carte, un classeur consultable, une information donnée à la demande dès lors que sa disponibilité est signalée. Ce qui se constate en visite, c'est la mise à jour. Un classeur qui décrit la carte d'il y a deux saisons ne vaut rien, et il se repère en comparant trois plats. La question à se poser est simple : qui met à jour la liste quand le chef change une garniture, et en combien de temps.",
        ],
      },
      {
        titre: "Les documents, la partie la plus facile à rattraper",
        paragraphes: [
          "Le plan de maîtrise sanitaire n'est pas une notion du règlement européen. Son contenu type vient de l'annexe II de l'arrêté du 8 juin 2006, qui vise les établissements soumis à agrément. Un restaurant qui remet directement au consommateur final relève du commerce de détail et n'est pas soumis à agrément, mais il reste pleinement tenu des articles 4 et 5 du règlement (CE) n° 852/2004 : règles générales d'hygiène de l'annexe II, et procédures permanentes fondées sur les principes HACCP.",
          "Concrètement, le contenu compte plus que la forme. Un classeur mince mais fidèle à votre cuisine vaut mieux qu'un document épais acheté en ligne. L'auditeur reprend l'existant, même réduit, et le complète avec vous : bonnes pratiques d'hygiène, analyse des dangers, traçabilité, gestion des non-conformités. L'objectif n'est pas d'épaissir le classeur, c'est qu'il décrive ce que vous faites vraiment.",
        ],
      },
      {
        titre: "Ce que vous recevez, et ce que vous en faites",
        paragraphes: [
          "Le rapport reprend les vingt-sept points avec leur constat, les photos qui appuient les écarts, une note globale et une note par thème. Chaque écart est classé mineur ou majeur, parce que les deux n'appellent pas la même réaction, et chaque écart porte son correctif attendu et ce qui en fera la preuve. Rien n'y figure qui n'ait été dit pendant la visite.",
          "Le plan d'action est fait pour être appliqué sans nous. Chaque écart y devient une tâche, avec sa priorité, le correctif attendu et la preuve à constituer : une photo, un relevé, une facture d'intervention, une procédure écrite. Vous avancez ensuite à votre rythme et avec vos moyens. Le rapport n'a aucune valeur officielle : audit hygiène est un label privé indépendant, ni certification officielle, ni agrément d'État, ni contrôle des services vétérinaires.",
        ],
      },
    ],
    faq: [
      {
        question: "Faut-il refroidir en moins de deux heures dans un restaurant traditionnel ?",
        reponse:
          "Ce n'est pas une obligation qui vous vise. Le passage de +63 °C à +10 °C en moins de deux heures figure à l'annexe IV, point 1, de l'arrêté du 21 décembre 2009, applicable à la restauration collective. En remise directe, vous devez réfrigérer dès que possible après cuisson, au titre du règlement (CE) n° 852/2004, annexe II, chapitre IX, point 6, et fixer vous-même la limite que vous surveillez. Reprendre les deux heures reste le choix le plus simple à défendre.",
      },
      {
        question: "Dois-je étiqueter tous mes produits entamés avec une date d'ouverture ?",
        reponse:
          "Aucun texte ne l'impose. C'est une bonne pratique professionnelle, et elle relève de votre plan de maîtrise sanitaire, construit à partir des conditions de conservation après ouverture indiquées par le fabricant. Elle est très largement attendue en visite, parce que sans elle vous ne pouvez pas démontrer que la durée de vie secondaire est maîtrisée. La formaliser vous protège, mais l'absence d'étiquette n'est pas en soi une infraction à un article.",
      },
      {
        question: "Mon plan de maîtrise sanitaire acheté en ligne suffit-il ?",
        reponse:
          "Il suffit s'il décrit votre cuisine. Ce qui se constate, c'est l'écart entre le document et la réalité : des équipements que vous n'avez pas, des procédures que personne n'applique, des fiches jamais remplies. Le règlement (CE) n° 852/2004, article 5, demande des procédures permanentes fondées sur les principes HACCP, adaptées à votre activité, et des documents prouvant leur application effective. Un modèle est un point de départ, pas une réponse.",
      },
      {
        question: "Faut-il un lave-mains à commande non manuelle en cuisine ?",
        reponse:
          "Le règlement (CE) n° 852/2004, annexe II, chapitre I, point 4, exige un nombre suffisant de lavabos judicieusement situés, avec eau chaude et froide, de quoi nettoyer et de quoi sécher les mains de façon hygiénique. Il n'impose pas la commande non manuelle en restauration : cette exigence vise certains établissements de produits d'origine animale relevant du règlement (CE) n° 853/2004, texte qui ne s'applique pas au commerce de détail. C'est donc une bonne pratique, et une bonne idée.",
      },
      {
        question: "Combien de temps dois-je conserver mes relevés de température ?",
        reponse:
          "Aucune disposition ne fixe de durée chiffrée, ni de fréquence de relevé. Le règlement (CE) n° 852/2004, article 5, paragraphe 4, demande des documents tenus à jour et conservés pendant une période appropriée, ce qui renvoie à votre plan de maîtrise sanitaire : c'est à lui de définir la fréquence et la durée, et de les justifier. Douze mois est un usage professionnel courant et facile à défendre, ce n'est pas une obligation réglementaire.",
      },
      {
        question: "L'auditeur va-t-il juger mon équipe ?",
        reponse:
          "Non, et c'est dit à l'équipe en arrivant. Ce qui est regardé, ce sont des locaux, des températures, des procédures et des documents. Quand un geste est à reprendre, il l'est parce que personne ne l'a expliqué, pas parce que quelqu'un a mal travaillé. Une équipe qui ne se sent pas jugée montre ce qui coince réellement, et le plan d'action qui en sort est nettement plus utile.",
      },
    ],
    liens: [
      "/points-de-controle/temperatures-des-enceintes-froides-positives-conformes",
      "/points-de-controle/etiquetage-et-dlc-dluo-respectes",
      "/points-de-controle/refroidissement-rapide-maitrise",
      "/themes/chaine-du-froid",
      "/methode",
      "/contact",
    ],
  },
  {
    slug: "restauration-rapide",
    nom: "établissement de restauration rapide",
    nomPluriel: "établissements de restauration rapide",
    titre: "Audit d'hygiène en restauration rapide",
    titreSeo: "Audit hygiène restauration rapide, Île-de-France",
    description:
      "Audit d'hygiène en restauration rapide : maintien au chaud, cuisson à la commande, huiles, lavage des mains, allergènes au comptoir et en ligne. Devis avant.",
    reponse:
      "En restauration rapide, l'audit part de la cadence : c'est elle qui décide de tout. Les points qui pèsent sont le maintien au chaud entre la cuisson et la vente, la cuisson à cœur des produits hachés et des volailles, le lavage des mains sur un poste sollicité en continu, le suivi des bains de friture, et l'information allergènes donnée au comptoir comme sur les plateformes de commande. L'auditeur observe en service réel, relève les écarts, les classe par priorité et écrit pour chacun le correctif attendu et la preuve à constituer.",
    ouverture:
      "En restauration rapide, personne ne manque de savoir-faire : ce qui manque, c'est du temps. Les écarts naissent presque tous d'un geste raccourci sous la pression du flux, jamais d'une négligence. Une visite utile part donc de votre rythme réel, pas d'une cuisine théorique où chaque étape aurait sa minute.",
    pointsSensibles: [
      {
        code: "TEMP-01",
        pourquoi:
          "Steaks hachés, volaille, produits panés : ce sont exactement les denrées sur lesquelles une cuisson insuffisante rend malade. En service continu, le contrôle à cœur est le premier geste sacrifié, parce qu'il coûte une sonde et vingt secondes.",
      },
      {
        code: "TEMP-03",
        pourquoi:
          "Entre la cuisson et la vente, les produits attendent en bac chauffant, en vitrine ou sous lampe. C'est le maintien au chaud, et non la cuisson, qui constitue le vrai point critique d'une enseigne rapide.",
      },
      {
        code: "FROID-02",
        pourquoi:
          "L'approvisionnement repose largement sur le surgelé, avec des ouvertures de congélateur très fréquentes. Le givre, la surcharge et les produits déjà décongelés puis remis au froid sont les constats les plus courants.",
      },
      {
        code: "PERS-02",
        pourquoi:
          "Un poste de comptoir enchaîne encaissement, emballage et manipulation de denrées prêtes à consommer. Sans lave-mains accessible et approvisionné à portée du poste, la coupure manuportée ne se fait pas.",
      },
      {
        code: "PERS-03",
        pourquoi:
          "Le renouvellement des équipes est rapide, et les gestes s'apprennent souvent sur le tas. Le règlement impose des instructions ou une formation adaptées à l'activité de chaque manutentionnaire, ce qui suppose de retracer qui a été encadré et sur quoi.",
      },
      {
        code: "NETT-01",
        pourquoi:
          "Grill, friteuse, trancheur, machine à boissons et zone de sauces en libre-service ne se nettoient pas au même rythme. Le plan de nettoyage devient inutilisable dès qu'il ne suit plus l'ouverture continue.",
      },
      {
        code: "DECH-01",
        pourquoi:
          "L'emballage à usage unique produit un volume de déchets sans commune mesure avec une cuisine classique. L'accumulation en zone de production et l'extérieur du point de vente sont deux constats fréquents.",
      },
    ],
    sections: [
      {
        titre: "Ce que la cadence change à l'hygiène",
        paragraphes: [
          "Une cuisine traditionnelle a deux pics et des creux entre les deux. Un point de restauration rapide fonctionne en flux tendu du matin au soir, parfois sans interruption. Les conséquences sont mécaniques : les enceintes froides s'ouvrent beaucoup plus souvent, le nettoyage se fait entre deux commandes, les relevés se prennent quand quelqu'un y pense, et les gestes de lavage des mains passent après le client qui attend.",
          "L'audit en tient compte. L'auditeur observe pendant un vrai service, parce qu'un point de vente vidé de ses clients ne montre rien de ce qui se passe réellement. Il note ce qu'il voit, puis reprend au calme avec vous les points où l'organisation, et non les personnes, produit l'écart. Presque toujours, la correction est un changement de place, de séquence ou d'approvisionnement, pas un investissement.",
        ],
      },
      {
        titre: "Le maintien au chaud, le vrai point critique",
        paragraphes: [
          "Beaucoup d'enseignes concentrent leurs efforts sur la cuisson, alors que le risque se joue après. Un produit cuit qui attend en bac chauffant, sous lampe ou en vitrine, dérive lentement vers la plage de températures où les bactéries se multiplient. Le règlement (CE) n° 852/2004 du 29 avril 2004, annexe II, chapitre IX, point 3, exige que les denrées soient protégées de toute contamination susceptible de les rendre dangereuses, et son article 5 vous demande de fixer la limite critique correspondante, de la surveiller et de réagir.",
          "Le repère de +63 °C existe dans un texte, mais il faut savoir où : l'arrêté du 21 décembre 2009, annexe I, fixe cette température minimale en liaison chaude pour les plats cuisinés ou repas livrés chauds. Le délai d'une heure entre +10 °C et la remise au consommateur, lui, figure à l'annexe IV, point 3, du même arrêté, qui ne vise que la restauration collective. En vente sur place, c'est donc à votre plan de maîtrise sanitaire de fixer une durée de maintien et une température, et de dire ce que devient un produit qui les dépasse.",
        ],
      },
      {
        titre: "La cuisson à cœur, sans barème imposé",
        paragraphes: [
          "Aucun texte ne fixe de barème de cuisson à cœur en restauration commerciale. L'obligation est de résultat, pas de moyen chiffré : le règlement (CE) n° 852/2004, article 5, vous demande des limites critiques, une surveillance, des actions correctives et des enregistrements, et les couples temps et température relèvent de votre plan de maîtrise sanitaire et du guide de bonnes pratiques d'hygiène de votre secteur. Le chapitre XI de l'annexe II, sur le traitement thermique, ne vise que les denrées mises sur le marché en récipients hermétiquement fermés.",
          "La conséquence est libératrice et exigeante à la fois. Vous choisissez vos valeurs, mais vous devez pouvoir les montrer et prouver que vous les atteignez. Pour un produit haché ou une volaille, une sonde et quelques relevés par jour suffisent à faire cette démonstration. Sans sonde, il n'existe aucun moyen de la faire, et c'est ce qui est constaté en visite, pas la couleur de la viande.",
        ],
      },
      {
        titre: "Les huiles de friture et les autocontrôles",
        paragraphes: [
          "Le suivi des bains de friture fait partie des autocontrôles attendus dans presque toutes les enseignes qui frient. L'huile se dégrade avec le nombre de cycles, la température et les résidus, et cette dégradation se mesure : au testeur de composés polaires, à la bandelette, ou à défaut par un protocole de filtration et de renouvellement daté. Le règlement (CE) n° 852/2004, article 5, paragraphe 2, points d) à g), demande une surveillance, des actions correctives et des documents prouvant l'application effective des mesures.",
          "Ce qui se constate le plus souvent n'est pas une huile mauvaise : c'est l'absence de toute trace du suivi. Une friteuse filtrée tous les soirs et vidangée à date fixe, avec un relevé simple accroché à côté, règle ce point en une semaine et sans dépense. C'est typiquement l'écart qui inquiète beaucoup et qui se corrige vite.",
        ],
      },
      {
        titre: "Le froid entre deux services qui n'existent pas",
        paragraphes: [
          "Sans creux dans la journée, les enceintes froides travaillent dans des conditions difficiles : portes ouvertes des dizaines de fois par heure, réassorts fréquents, sous-comptoirs proches d'une source de chaleur. L'arrêté du 21 décembre 2009, article 3 et annexe I, fixe les températures maximales des denrées réfrigérées et congelées d'origine animale, et l'arrêté du 8 octobre 2013 celles des autres denrées. Le seuil général de -18 °C pour les surgelés vient, lui, du décret n° 64-949 du 9 septembre 1964, article 1er.",
          "L'écart typique n'est pas une panne : c'est un tiroir réfrigéré qui remonte à chaque coup de feu et redescend ensuite, si bien que le relevé pris à l'ouverture ne montre jamais rien. La correction passe par un relevé pris au bon moment, c'est-à-dire au pic, et par un enregistreur autonome quand l'enceinte est stratégique. Là encore, l'objectif est de rendre visible ce qui se passe pendant le service, pas d'ajouter du papier.",
        ],
      },
      {
        titre: "Les mains, le poste le plus sollicité de la journée",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, annexe II, chapitre I, point 4, exige un nombre suffisant de lavabos judicieusement situés, équipés d'eau chaude et froide, de matériel de nettoyage et de séchage hygiénique des mains, séparés en cas de besoin des dispositifs de lavage des denrées. Le mot qui compte est judicieusement situés : un lave-mains parfait mais placé derrière trois personnes ne sert à rien, et cela se voit en dix minutes d'observation.",
          "Le chapitre VIII, point 1, ajoute l'exigence de propreté personnelle et de tenue adaptée. Le point 2 interdit à une personne atteinte d'une maladie transmissible par les aliments, de plaies infectées ou de lésions cutanées de manipuler des denrées : c'est une règle simple, rarement connue, et qui suppose que l'équipe sache qu'elle doit le signaler sans crainte. La commande non manuelle du lave-mains, elle, n'est pas imposée en restauration : c'est une bonne pratique.",
        ],
      },
      {
        titre: "Les allergènes au comptoir et sur les plateformes",
        paragraphes: [
          "Un produit vendu à emporter et non préemballé relève du règlement (UE) n° 1169/2011 du 25 octobre 2011, article 44, paragraphe 1, point a), qui maintient l'obligation d'informer sur les substances de son annexe II. Le décret n° 2015-447 du 17 avril 2015, aux articles R. 412-12 et R. 412-13 du code de la consommation, demande que l'information figure sur la denrée ou à proximité, sans incertitude sur le produit concerné. Un panneau au comptoir ou un support consultable répond à cette exigence.",
          "La vente en ligne ajoute un volet que beaucoup découvrent : le règlement (UE) n° 1169/2011, article 14, encadre la vente à distance et impose que les mentions obligatoires soient disponibles avant la conclusion de l'achat. Autrement dit, ce que vous affichez au comptoir doit aussi exister sur vos fiches produit chez les plateformes de commande, et il vous appartient de les tenir à jour quand une recette change.",
        ],
      },
      {
        titre: "Déchets, extérieur et nuisibles",
        paragraphes: [
          "L'emballage à usage unique produit un volume qu'une cuisine classique ne connaît pas. Le règlement (CE) n° 852/2004, annexe II, chapitre VI, point 1, impose de retirer les déchets aussi vite que possible des locaux où se trouvent des denrées, et le point 2 exige des conteneurs dotés d'une fermeture, bien entretenus et faciles à nettoyer. La poubelle à pédale, elle, n'est pas une obligation : le texte demande une fermeture, pas une commande au pied.",
          "L'extérieur compte autant, et c'est le point aveugle des enseignes de rue. Une zone de stockage de cartons contre la façade, un local à déchets partagé mal tenu, une trappe qui ferme mal, et la lutte contre les nuisibles devient impossible quelle que soit la qualité du contrat de dératisation. Le contrat lui-même n'est d'ailleurs pas imposé par un texte : ce que le règlement demande, à l'annexe II, chapitre IX, point 4, ce sont des méthodes adéquates de lutte, dont le contrat n'est qu'un moyen de preuve.",
        ],
      },
    ],
    faq: [
      {
        question: "Existe-t-il une température de cuisson obligatoire pour un steak haché ?",
        reponse:
          "Aucun texte ne fixe de barème de cuisson à cœur en restauration commerciale. L'obligation est de résultat : le règlement (CE) n° 852/2004, article 5, vous demande de définir vos limites critiques, de les surveiller et de corriger les écarts. Vous retenez donc un couple temps et température, en vous appuyant sur le guide de bonnes pratiques de votre secteur, vous le sondez et vous le tracez. Ce qui est constaté en visite, c'est l'existence de cette démonstration.",
      },
      {
        question: "Combien de temps un produit cuit peut-il rester en vitrine chaude ?",
        reponse:
          "Aucune durée ne vous est imposée en vente directe. Le délai d'une heure figure à l'annexe IV, point 3, de l'arrêté du 21 décembre 2009, qui vise la restauration collective. La température minimale de +63 °C en liaison chaude, elle, apparaît à l'annexe I du même arrêté pour les plats livrés chauds. À vous de fixer dans votre plan une durée maximale, une température de maintien et le sort du produit qui les dépasse, puis de vous y tenir.",
      },
      {
        question: "Dois-je afficher les allergènes sur les applications de livraison ?",
        reponse:
          "Oui. Le règlement (UE) n° 1169/2011, article 14, encadre la vente à distance et impose que les mentions obligatoires, dont les allergènes, soient disponibles avant que le client valide sa commande. La fiche produit chez la plateforme fait donc partie de votre information, au même titre que le panneau au comptoir, et elle doit être corrigée quand une recette change.",
      },
      {
        question: "Faut-il un test de composés polaires pour les huiles de friture ?",
        reponse:
          "Le suivi des huiles fait partie des autocontrôles que le règlement (CE) n° 852/2004, article 5, vous demande de définir et de tracer. Le moyen vous appartient : testeur, bandelettes, ou protocole écrit de filtration et de vidange daté. Ce qui pose problème en visite n'est presque jamais la qualité de l'huile, c'est l'absence de toute trace du suivi.",
      },
      {
        question: "Mes poubelles doivent-elles être à pédale ?",
        reponse:
          "Non. Le règlement (CE) n° 852/2004, annexe II, chapitre VI, point 2, demande des conteneurs dotés d'une fermeture, bien entretenus et faciles à nettoyer. La commande non manuelle est une bonne pratique d'hygiène, très utile en zone de production où les mains sont propres, mais elle n'est pas une obligation réglementaire. C'est le type de point sur lequel il vaut mieux ne pas se tromper devant un agent.",
      },
      {
        question: "Faut-il qu'un salarié soit formé à l'hygiène alimentaire ?",
        reponse:
          "En restauration commerciale, au moins une personne de l'effectif doit justifier d'une formation spécifique, au titre de l'article L. 233-4 du code rural et de la pêche maritime. Une expérience d'au moins trois ans dans le secteur alimentaire comme gestionnaire ou exploitant vaut satisfaction de cette obligation. L'attestation est demandée en visite. Nous ne vendons pas de formation et ne renvoyons vers aucun organisme.",
      },
    ],
    liens: [
      "/points-de-controle/baremes-de-cuisson-respectes",
      "/points-de-controle/remise-en-temperature-maitrisee",
      "/points-de-controle/lavage-des-mains-equipement-et-pratique",
      "/themes/temperatures-cuisson",
      "/themes/allergenes",
      "/contact",
    ],
  },
  {
    slug: "bar-et-debit-de-boissons",
    nom: "bar ou débit de boissons",
    nomPluriel: "bars et débits de boissons",
    titre: "Audit d'hygiène en bar et débit de boissons",
    titreSeo: "Audit hygiène bar et débit de boissons, Île-de-France",
    description:
      "Audit d'hygiène en bar et débit de boissons : la glace, la machine à glaçons, la plonge à verres, le lave-mains du comptoir et la petite restauration.",
    reponse:
      "Un bar manipule des denrées même sans cuisine, et c'est ce que l'audit met d'abord au clair. La glace est une denrée alimentaire à part entière : le règlement (CE) n° 852/2004 impose qu'elle soit fabriquée à partir d'eau potable et manipulée dans des conditions prévenant toute contamination. Autour d'elle, les points qui pèsent sont l'entretien de la machine à glaçons, la plonge à verres, les becs de tirage et les fontaines, les fruits découpés et les jus pressés, le lave-mains du comptoir et, quand elle existe, la petite restauration.",
    ouverture:
      "Beaucoup d'exploitants de bar pensent être hors sujet parce qu'il n'y a pas de cuisine. C'est l'idée la plus coûteuse du métier : un verre, un glaçon, une rondelle de citron et une planche de charcuterie sont des denrées, et ils relèvent des mêmes textes qu'une assiette de restaurant.",
    pointsSensibles: [
      {
        code: "EAU-01",
        pourquoi:
          "La glace est le seul aliment qu'un bar fabrique lui-même, en continu, dans une machine que personne n'ouvre. C'est le point le plus spécifique de l'activité, et celui où un constat photographique change immédiatement la conversation.",
      },
      {
        code: "NETT-01",
        pourquoi:
          "Bacs à glace, becs de tirage, lignes de bière, fontaines à soda, blender et centrifugeuse ont chacun leur fréquence propre. Un plan de nettoyage écrit pour une cuisine ne couvre aucun de ces équipements.",
      },
      {
        code: "PERS-02",
        pourquoi:
          "Derrière un comptoir, la même main encaisse, ramasse des verres sales et attrape un glaçon ou une garniture. Sans lave-mains dédié et accessible au poste, la coupure ne se fait pas, et le bac à verres ne remplace pas un lavabo.",
      },
      {
        code: "FROID-01",
        pourquoi:
          "Les sous-comptoirs réfrigérés ouvrent en continu, souvent près d'une machine qui chauffe, et abritent des produits laitiers, des jus frais et des garnitures entamées. Ils dérivent pendant le service et redescendent après, ce qui rend le relevé du matin trompeur.",
      },
      {
        code: "TRAC-01",
        pourquoi:
          "Bouteilles de jus ouvertes, crème pour le café, sirops transvasés, fruits découpés d'avance : la moitié du bar est constituée de produits entamés sans date. C'est l'écart documentaire le plus courant de l'activité.",
      },
      {
        code: "DECH-01",
        pourquoi:
          "Bouteilles, verres cassés, fûts et déchets de terrasse s'accumulent vite dans un espace réduit, souvent sur la voie publique. L'évacuation régulière conditionne toute la lutte contre les nuisibles.",
      },
      {
        code: "NUIS-01",
        pourquoi:
          "Sucre, sirops renversés, résidus de bière dans les bacs et cartons humides forment un environnement très attractif. Un bar sans dispositif de lutte suivi voit apparaître les indices avant beaucoup de cuisines.",
      },
    ],
    sections: [
      {
        titre: "Un bar manipule des denrées, même sans cuisine",
        paragraphes: [
          "Le règlement (CE) n° 852/2004 du 29 avril 2004 s'applique à toutes les étapes de la production, de la transformation et de la distribution des denrées alimentaires. Une boisson, une garniture, un glaçon et une planche à partager en font partie. L'absence de piano, de hotte ou de chambre froide ne change rien au périmètre : elle change seulement la liste des points sur lesquels une visite passera du temps.",
          "En pratique, l'audit d'un bar est plus court sur la cuisson et le stockage, et beaucoup plus dense sur l'eau, la glace, les équipements de service et les mains. C'est aussi l'activité où les corrections sont les moins coûteuses, parce qu'elles portent presque toutes sur des fréquences de nettoyage et sur l'organisation du comptoir, pas sur du matériel à remplacer.",
        ],
      },
      {
        titre: "La glace est un aliment, et le texte le dit",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, annexe II, chapitre VII, point 4, est explicite : la glace entrant en contact avec les denrées alimentaires ou susceptible de les contaminer doit être fabriquée à partir d'eau potable, et elle doit être fabriquée, manipulée et stockée dans des conditions prévenant toute contamination. Le point 1 a) du même chapitre exige une alimentation en eau potable en quantité suffisante. Ce sont deux dispositions courtes, et elles suffisent à cadrer tout le sujet.",
          "Ce qui est constaté en visite tient à la manipulation autant qu'à la machine. Une pelle à glace posée dans le bac plutôt que dans un support, un verre utilisé pour puiser la glace, un bac laissé ouvert sous le comptoir, une réserve de glace conservée dans un congélateur qui sert aussi aux garnitures : chacun de ces gestes fait entrer une contamination dans un produit qui ne sera plus jamais chauffé.",
        ],
      },
      {
        titre: "La machine à glaçons, l'équipement que personne n'ouvre",
        paragraphes: [
          "L'entretien de la machine relève du règlement (CE) n° 852/2004, annexe II, chapitre V, point 1 a) : les articles, installations et équipements avec lesquels les denrées entrent en contact doivent être effectivement nettoyés et, le cas échéant, désinfectés, à une fréquence suffisante pour éviter tout risque de contamination. Le texte ne fixe aucune fréquence chiffrée : c'est votre plan de nettoyage qui la définit et qui doit pouvoir la justifier.",
          "L'intérieur d'un évaporateur, la goulotte et le bac de stockage sont des zones humides, tièdes en surface, et jamais regardées. Un biofilm s'y installe sans que la glace change d'aspect. C'est pour cela que ce point figure parmi ceux où une photo est conseillée pendant l'audit : le constat visuel emporte l'adhésion bien mieux qu'une explication, et la remise en état se fait en une intervention.",
        ],
      },
      {
        titre: "Becs de tirage, lignes et fontaines",
        paragraphes: [
          "Les lignes de bière, les becs de tirage, les fontaines à soda et les machines à café relèvent du même chapitre V, point 1, du règlement (CE) n° 852/2004 : construction, entretien et installation permettant un nettoyage convenable et réduisant au maximum les risques de contamination. Là encore, aucune fréquence n'est imposée par un texte, et là encore c'est votre plan qui la fixe, en s'appuyant sur les préconisations de vos fournisseurs de matériel.",
          "Ce qui est regardé en visite, c'est la cohérence entre la fréquence annoncée et la trace de sa réalisation. Un nettoyage de lignes fait par le brasseur laisse une preuve ; un rinçage de bec fait chaque soir n'en laisse aucune si personne ne le note. Une simple grille hebdomadaire au dos de la porte du bar, cochée et datée, répond à l'exigence de documents prouvant l'application effective des mesures posée par l'article 5, paragraphe 2, point g).",
        ],
      },
      {
        titre: "La plonge à verres et le comptoir",
        paragraphes: [
          "Le lave-verres est un équipement au contact des denrées, au sens du chapitre V. Ce qui pose problème n'est presque jamais la machine : c'est l'eau du bac de trempage laissée toute la soirée, le torchon unique qui sert au comptoir, aux verres et aux mains, et l'égouttoir posé sous une étagère. Le règlement (CE) n° 852/2004, annexe II, chapitre I, point 1, demande des locaux propres et en bon état d'entretien, et le chapitre II, point 1 f), des surfaces faciles à nettoyer.",
          "Le comptoir lui-même mérite un regard, parce qu'il concentre trois flux qui ne devraient pas se croiser : le sale qui revient de salle, le propre qui en repart, et l'argent. Réorganiser ce triangle relève de la conception et de l'agencement visés au chapitre II, point 1, qui demande de prévenir la contamination entre et durant les opérations. Cela se règle par un sens de circulation, pas par des travaux.",
        ],
      },
      {
        titre: "Fruits, jus pressés et garnitures",
        paragraphes: [
          "Un fruit découpé devient un produit prêt à consommer sans étape de cuisson. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, points 2 et 3, impose de conserver les matières premières dans des conditions évitant toute détérioration néfaste et de protéger les denrées contre toute contamination à toutes les étapes. Des rondelles préparées le matin pour la soirée, laissées à l'air libre sur le comptoir, ne répondent pas à cette exigence.",
          "Les jus pressés à l'avance et les préparations maison, sirops, infusions froides, purées de fruits, posent la question de la durée de vie. Aucun texte ne fixe cette durée pour une préparation que vous réalisez vous-même : elle relève de votre analyse des dangers et doit être écrite. Une bouteille datée à la fabrication, une durée décidée et respectée, et le point est tenu.",
        ],
      },
      {
        titre: "Le lave-mains du comptoir",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, annexe II, chapitre I, point 4, exige un nombre suffisant de lavabos judicieusement situés et destinés au lavage des mains, équipés d'eau courante chaude et froide, de matériel de nettoyage et de séchage hygiénique des mains, séparés en cas de besoin des dispositifs de lavage des denrées. Dans un bar, cela veut dire un point d'eau au comptoir, distinct du bac à verres, et approvisionné en savon et en essuie-mains à usage unique.",
          "C'est le point où la configuration des lieux joue le plus. Beaucoup de comptoirs anciens n'ont qu'un bac, et l'idée de faire deux mètres jusqu'aux toilettes disparaît dès le premier coup de feu. Quand l'installation d'un lavabo est impossible, il faut le dire et chercher l'aménagement le plus proche du texte, plutôt que de laisser un point ouvert. Le rapport distingue toujours ce qui est exigé par un texte de ce qui relève de la bonne pratique, et la commande non manuelle appartient à la seconde catégorie.",
        ],
      },
      {
        titre: "La petite restauration change le périmètre",
        paragraphes: [
          "Dès qu'un bar sert des planches, des croque-monsieur, des tapas ou un plat du jour, plusieurs points s'ajoutent : la séparation du cru et du cuit, l'étiquetage des produits entamés, la cuisson à cœur des produits sensibles et l'information allergènes. Cette dernière est due même pour une planche : le règlement (UE) n° 1169/2011 du 25 octobre 2011, article 44, paragraphe 1, point a), maintient l'obligation pour les denrées non préemballées, et le décret n° 2015-447 du 17 avril 2015 en fixe les modalités en droit interne.",
          "C'est aussi le moment où la question du plan de maîtrise sanitaire devient concrète. Un bar sans production peut s'en tenir à un dossier léger ; un bar qui prépare et sert des assiettes relève des mêmes articles 4 et 5 du règlement (CE) n° 852/2004 qu'un restaurant. L'audit dit clairement dans quelle situation vous êtes, ce qui évite à la fois d'en faire trop et de découvrir un manque au mauvais moment.",
        ],
      },
    ],
    faq: [
      {
        question: "Un bar sans cuisine est-il vraiment concerné par l'hygiène alimentaire ?",
        reponse:
          "Oui. Le règlement (CE) n° 852/2004 vise toutes les étapes de la distribution des denrées, et une boisson, un glaçon ou une garniture en sont. L'absence de cuisine réduit le nombre de points concernés, elle ne supprime pas le périmètre. L'audit d'un bar est simplement plus dense sur l'eau, la glace, les équipements de service et les mains, et plus léger sur la cuisson.",
      },
      {
        question: "À quelle fréquence dois-je nettoyer ma machine à glaçons ?",
        reponse:
          "Aucune disposition ne fixe de fréquence. Le règlement (CE) n° 852/2004, annexe II, chapitre V, point 1 a), demande un nettoyage à une fréquence suffisante pour éviter tout risque de contamination, et c'est votre plan de nettoyage qui la définit et la justifie, en s'appuyant sur les préconisations du fabricant. Ce qui est constaté en visite, c'est l'état de l'intérieur de la machine et l'existence d'une trace du suivi.",
      },
      {
        question: "Puis-je conserver la glace non utilisée d'un service à l'autre ?",
        reponse:
          "Le texte n'interdit rien de tel explicitement, mais il exige que la glace soit manipulée et stockée dans des conditions prévenant toute contamination, au titre de l'annexe II, chapitre VII, point 4. Un bac ouvert sous un comptoir, dans lequel on a puisé toute la soirée avec un ustensile posé dedans, ne remplit pas cette condition. Vider et laver le bac en fin de service est la solution la plus simple à tenir et à démontrer.",
      },
      {
        question: "Le bac à verres peut-il servir de lave-mains ?",
        reponse:
          "Non. Le règlement (CE) n° 852/2004, annexe II, chapitre I, point 4, demande des lavabos destinés au lavage des mains, séparés en cas de besoin des dispositifs de lavage des denrées, avec eau chaude et froide, savon et séchage hygiénique. Un bac de plonge à verres ne remplit pas cette fonction. Quand la configuration du comptoir rend l'installation difficile, l'audit cherche l'aménagement le plus proche du texte plutôt que de laisser le point ouvert.",
      },
      {
        question: "Dois-je donner les allergènes pour une planche de charcuterie ?",
        reponse:
          "Oui. Le règlement (UE) n° 1169/2011, article 44, paragraphe 1, point a), maintient l'obligation d'information sur les substances de son annexe II pour les denrées proposées non préemballées, et le décret n° 2015-447 du 17 avril 2015 précise que l'information doit figurer sur la denrée ou à proximité, sans incertitude sur le produit concerné. Une ardoise ou un support consultable au comptoir suffit, à condition d'être à jour.",
      },
      {
        question: "Faut-il un contrat de dératisation pour un bar ?",
        reponse:
          "Aucun texte ne l'impose. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 4, demande des méthodes adéquates de lutte contre les organismes nuisibles. Le contrat, le plan des appâts et les rapports de passage sont les moyens usuels d'en apporter la preuve, et ils se décrivent dans le plan de maîtrise sanitaire. Un dispositif interne suivi et tracé répond aussi à l'exigence, à condition d'être réellement tenu.",
      },
    ],
    liens: [
      "/points-de-controle/potabilite-de-l-eau-entretien-machine-a-glacons",
      "/points-de-controle/plan-de-nettoyage-present-et-applique",
      "/points-de-controle/lavage-des-mains-equipement-et-pratique",
      "/themes/eau-glace",
      "/themes/nettoyage-desinfection",
      "/contact",
    ],
  },
  {
    slug: "boulangerie-patisserie",
    nom: "boulangerie-pâtisserie",
    nomPluriel: "boulangeries-pâtisseries",
    titre: "Audit d'hygiène en boulangerie-pâtisserie",
    titreSeo: "Audit hygiène boulangerie-pâtisserie, Île-de-France",
    description:
      "Audit d'hygiène en boulangerie-pâtisserie : allergènes en vente au détail, crèmes et refroidissement, vitrines, farines et nuisibles, traçabilité amont.",
    reponse:
      "Une boulangerie-pâtisserie fait cohabiter deux métiers dans un même local : un laboratoire qui transforme et une surface de vente ouverte au public. L'audit suit cette double vie. Les points qui pèsent sont l'information allergènes sur des produits vendus non préemballés, la contamination croisée par les farines et les fruits à coque, le refroidissement des crèmes et des appareils, la température des vitrines réfrigérées et la protection des produits exposés, enfin la réserve de farine et la lutte contre les nuisibles. Chaque écart repart avec sa priorité, le correctif attendu et la preuve à constituer, pour que vous puissiez le traiter vous-même.",
    ouverture:
      "En boulangerie, la réglementation qui pèse le plus n'est pas celle du froid : c'est celle de l'information du consommateur. Vous vendez des produits non préemballés, fabriqués chez vous, à des clients qui ne voient ni recette ni étiquette. C'est là que se joue l'essentiel de la visite.",
    pointsSensibles: [
      {
        code: "ALL-01",
        pourquoi:
          "Presque tout ce que vend une boulangerie contient au moins trois substances de l'annexe II du règlement sur l'information du consommateur. L'obligation d'informer est due pour chaque produit vendu au détail, et le support doit suivre les recettes.",
      },
      {
        code: "ALL-02",
        pourquoi:
          "Poudre d'amande, praliné, farines spéciales et graines circulent dans le même laboratoire, sur le même matériel et parfois dans le même four. La contamination croisée est ici un risque technique, pas une hypothèse théorique.",
      },
      {
        code: "TEMP-02",
        pourquoi:
          "Crème pâtissière, crème anglaise, appareils à flan et fonds de tarte cuits en avance passent tous par un refroidissement. C'est le point critique de la pâtisserie, et celui que les textes traitent le moins clairement pour la remise directe.",
      },
      {
        code: "FROID-01",
        pourquoi:
          "Les vitrines réfrigérées de la surface de vente ouvrent en continu, chauffent par l'éclairage et se remplissent au fil de la journée. Elles ne tiennent pas la même température qu'une chambre froide de laboratoire.",
      },
      {
        code: "TRAC-01",
        pourquoi:
          "Un entremets ou une tarte à la crème est une denrée sensible dont la durée de vie est décidée par vous. Sans date de fabrication et sans durée écrite, cette décision ne se démontre pas.",
      },
      {
        code: "NUIS-01",
        pourquoi:
          "Farines, semoules et fruits secs stockés en sacs constituent l'un des environnements les plus attractifs du secteur alimentaire, mites comprises. La réserve mérite autant d'attention que le fournil.",
      },
      {
        code: "LOC-01",
        pourquoi:
          "Fournil chaud et humide, sols farinés, joints de four et plafonds au-dessus des pétrins : les surfaces se dégradent vite et deviennent difficiles à nettoyer sans que personne ne le remarque au quotidien.",
      },
    ],
    sections: [
      {
        titre: "Deux métiers dans un même local",
        paragraphes: [
          "Le laboratoire transforme, la boutique vend. Ces deux espaces n'ont ni les mêmes flux, ni les mêmes risques, ni les mêmes visiteurs. Le règlement (CE) n° 852/2004 du 29 avril 2004, annexe II, chapitre II, point 1, demande que la conception et l'agencement des locaux permettent de prévenir la contamination entre et durant les opérations : c'est la traduction exacte de ce que vous appelez la séparation entre le fournil et le magasin.",
          "L'audit suit donc deux parcours. Celui du produit, de la réception des farines au comptoir, et celui des personnes, entre le vestiaire, le fournil, la caisse et les toilettes. Beaucoup d'écarts viennent du second : une même personne qui encaisse et qui reprend un produit nu, sans point de lavage des mains intercalé.",
        ],
      },
      {
        titre: "Les allergènes, la vraie contrainte du métier",
        paragraphes: [
          "Un pain, une viennoiserie ou une pâtisserie vendus à l'unité sont des denrées non préemballées. Le règlement (UE) n° 1169/2011 du 25 octobre 2011, article 44, paragraphe 1, point a), maintient pour elles l'obligation d'informer sur les substances de son annexe II. En droit interne, le décret n° 2015-447 du 17 avril 2015, aux articles R. 412-12 et R. 412-13 du code de la consommation, exige que l'information soit portée sur la denrée ou à proximité, sans incertitude sur le produit concerné.",
          "Le format reste libre : une étiquette par produit, un classeur consultable, un panneau au comptoir. Ce qui se constate en visite est ailleurs : la liste correspond-elle encore aux recettes. Un changement de fournisseur de margarine, l'ajout de graines sur un pain, un praliné maison remplacé par un produit du commerce, et l'information devient fausse sans que personne ne l'ait décidé.",
        ],
      },
      {
        titre: "Farines, fruits à coque et matériel commun",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 9, inséré par le règlement (UE) 2021/382 du 3 mars 2021, est très clair : un équipement, un réceptacle ou un conteneur ayant servi à une substance allergène ne peut pas être utilisé pour une denrée qui n'en contient pas, à moins d'avoir été nettoyé et contrôlé au moins pour vérifier l'absence de débris visibles de cette substance.",
          "En boulangerie, cela vise le batteur qui passe d'un appareil aux amandes à une crème sans fruits à coque, la plaque partagée, le rouleau, le tamis, et jusqu'au fond de sac. Le matériel dédié n'est pas imposé par le texte : c'est un moyen parmi d'autres. L'ordonnancement des productions, du plus neutre au plus allergène, en est un autre, à condition d'être écrit dans votre plan de maîtrise sanitaire.",
        ],
      },
      {
        titre: "Les crèmes, et ce que le texte impose vraiment",
        paragraphes: [
          "La crème pâtissière est le produit le plus surveillé de la pâtisserie, et pour de bonnes raisons. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 6, impose de réfrigérer dès que possible après le traitement thermique les denrées devant être conservées à basse température, à une température n'entraînant pas de risque pour la santé. C'est une obligation de résultat, et elle vous vise pleinement.",
          "En revanche, le fameux passage de +63 °C à +10 °C en moins de deux heures vient de l'annexe IV, point 1, de l'arrêté du 21 décembre 2009, dont l'article 6 réserve l'application à la restauration collective. Une boulangerie en remise directe n'y est pas soumise. La valeur reste la meilleure référence disponible, et la reprendre dans votre plan est la démarche la plus simple à défendre, mais elle devient alors votre limite, pas celle d'un texte.",
        ],
      },
      {
        titre: "Vitrines, comptoir et produits exposés",
        paragraphes: [
          "Le chapitre IX, point 3, du même règlement impose de protéger les denrées contre toute contamination à toutes les étapes, ce qui inclut l'exposition à la vente. Un présentoir ouvert à hauteur de visage, une corbeille de viennoiseries en libre accès, une vitrine dont la façade côté client reste entrouverte : ce sont les constats les plus fréquents en boutique, et les moins coûteux à corriger.",
          "Côté températures, l'arrêté du 21 décembre 2009, article 3 et annexe I, fixe les valeurs maximales pour les denrées d'origine animale et celles qui en contiennent, ce qui couvre les pâtisseries à la crème. L'arrêté du 8 octobre 2013 traite les autres denrées. Le point pratique est simple : une vitrine se relève au moment où elle travaille le plus, en milieu de journée, pas à l'ouverture.",
        ],
      },
      {
        titre: "Pâtons, surgelés et décongélation",
        paragraphes: [
          "Beaucoup de boulangeries travaillent des pâtons crus surgelés et congèlent une partie de leur production. L'arrêté du 21 décembre 2009, article 3 et annexe I, fixe les températures maximales des denrées congelées, et le seuil général de -18 °C pour les produits surgelés vient du décret n° 64-949 du 9 septembre 1964, article 1er. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 5, interdit toute rupture de la chaîne du froid.",
          "La décongélation, elle, n'est encadrée par aucune valeur chiffrée en remise directe. Ce qui est attendu, c'est que la méthode soit décrite, qu'elle protège le produit et qu'elle ne le laisse pas séjourner à température ambiante. Une décongélation en enceinte froide, sur une grille, avec une date apposée, répond à la question et se trace en trois secondes.",
        ],
      },
      {
        titre: "La réserve, les farines et les nuisibles",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 4, demande des méthodes adéquates de lutte contre les organismes nuisibles, et le chapitre I, point 2 c), que les locaux permettent de les prévenir. Le contrat avec une entreprise de dératisation, le plan des appâts et les rapports de passage ne sont imposés par aucune disposition : ce sont les moyens usuels de démontrer que ces méthodes existent.",
          "Ce qui compte davantage en boulangerie, c'est ce qui attire. Sacs posés au sol, fonds de bacs jamais vidés, farines conservées au-delà de leur rotation, semoules et fruits secs en vrac. Le chapitre IX, point 2, impose de conserver les matières premières dans des conditions évitant toute détérioration néfaste. Vider et laver les bacs à chaque fin de sac règle plus de problèmes qu'un contrat supplémentaire.",
        ],
      },
      {
        titre: "Traçabilité, dates et documents",
        paragraphes: [
          "Le règlement (CE) n° 178/2002 du 28 janvier 2002, article 18, vous demande de pouvoir identifier tout fournisseur et de mettre cette information à disposition des autorités sur demande. Concrètement, cela veut dire conserver les étiquettes de sacs de farine, de beurre, de préparations et de chocolat, et savoir relier un lot à une production. C'est l'exigence qui compte le jour d'un rappel produit.",
          "Pour vos propres fabrications, aucune disposition ne fixe la durée de vie d'un entremets : c'est vous qui la décidez, à partir de votre analyse des dangers, et qui devez pouvoir l'expliquer. Une date de fabrication apposée en laboratoire et une durée écrite dans le plan de maîtrise sanitaire suffisent à rendre cette décision démontrable.",
        ],
      },
    ],
    faq: [
      {
        question: "Dois-je afficher les allergènes pour du pain vendu à l'unité ?",
        reponse:
          "Oui. Le règlement (UE) n° 1169/2011, article 44, paragraphe 1, point a), maintient l'obligation d'informer sur les substances de son annexe II pour les denrées proposées non préemballées, et le décret n° 2015-447 du 17 avril 2015 précise en droit interne que l'information doit figurer sur la denrée ou à proximité. Le format vous appartient : étiquette, classeur consultable ou panneau, à condition d'être exact et tenu à jour.",
      },
      {
        question: "Faut-il une cellule de refroidissement pour les crèmes ?",
        reponse:
          "Aucun texte n'impose l'équipement. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 6, impose le résultat : réfrigérer dès que possible après le traitement thermique, à une température n'entraînant pas de risque. La cellule est le moyen le plus simple d'y parvenir et de le tracer, mais une autre méthode validée et démontrée répond aussi à l'exigence. Ce qui se constate, c'est le résultat et sa preuve.",
      },
      {
        question: "Le refroidissement en deux heures s'impose-t-il à une boulangerie ?",
        reponse:
          "Non. Ce seuil figure à l'annexe IV, point 1, de l'arrêté du 21 décembre 2009, applicable à la restauration collective au titre de son article 6. Une boulangerie en remise directe n'y est pas soumise. Elle reste tenue de réfrigérer dès que possible après cuisson et de fixer sa propre limite dans son plan de maîtrise sanitaire. Reprendre les deux heures est le choix le plus lisible, mais c'est un choix.",
      },
      {
        question: "Combien de temps puis-je vendre un entremets fabriqué chez moi ?",
        reponse:
          "Aucune disposition ne fixe cette durée. Elle découle de votre analyse des dangers et doit être écrite dans votre plan de maîtrise sanitaire, puis appliquée par une date de fabrication apposée en laboratoire. Ce qui est constaté en visite n'est pas la durée retenue, c'est l'absence de durée écrite ou l'absence de date sur le produit, qui rendent la décision indémontrable.",
      },
      {
        question: "Dois-je conserver les étiquettes de mes sacs de farine ?",
        reponse:
          "Le règlement (CE) n° 178/2002, article 18, vous demande de pouvoir identifier vos fournisseurs et de fournir cette information aux autorités à leur demande, ce qui suppose de conserver étiquettes, bons de livraison ou numéros de lot. Aucune disposition ne fixe de durée de conservation précise en boulangerie : c'est le plan de maîtrise sanitaire qui la définit, en cohérence avec la durée de vie de vos produits.",
      },
      {
        question: "Un même batteur peut-il servir aux préparations avec et sans fruits à coque ?",
        reponse:
          "Oui, à condition d'être nettoyé et contrôlé entre les deux, au moins pour vérifier l'absence de débris visibles. C'est ce que prévoit le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 9, issu du règlement (UE) 2021/382 du 3 mars 2021. Le matériel dédié n'est pas exigé : c'est un moyen, au même titre que l'ordonnancement des productions, à décrire dans votre plan.",
      },
    ],
    liens: [
      "/points-de-controle/information-allergenes-consommateur",
      "/points-de-controle/prevention-contamination-croisee-allergenes",
      "/points-de-controle/refroidissement-rapide-maitrise",
      "/themes/allergenes",
      "/themes/lutte-contre-les-nuisibles",
      "/contact",
    ],
  },
  {
    slug: "boucherie-charcuterie",
    nom: "boucherie-charcuterie",
    nomPluriel: "boucheries-charcuteries",
    titre: "Audit d'hygiène en boucherie-charcuterie",
    titreSeo: "Audit hygiène boucherie-charcuterie, Île-de-France",
    description:
      "Audit d'hygiène en boucherie-charcuterie : températures des viandes, découpe et hachoir, cru et cuit, traçabilité amont, sous-produits animaux et tenue.",
    reponse:
      "Une boucherie-charcuterie manipule les denrées les plus surveillées du secteur, et elle les transforme sur place. L'audit part de là. Les points qui pèsent sont la température des enceintes et des viandes, dont certaines relèvent d'un régime propre, la découpe et le nettoyage par démontage du hachoir et du trancheur, la séparation entre les viandes crues et les produits de charcuterie prêts à consommer, la traçabilité amont des lots, et le sort des sous-produits animaux. Chaque écart repart avec sa priorité, le correctif attendu et la preuve à constituer.",
    ouverture:
      "Un boucher connaît son produit mieux que n'importe quel auditeur. Ce qui lui manque, en général, c'est la lecture réglementaire : savoir quelle exigence vient d'un texte, laquelle vient d'un usage de métier, et laquelle change selon qu'il vend au comptoir ou qu'il livre un confrère.",
    pointsSensibles: [
      {
        code: "FROID-01",
        pourquoi:
          "Les viandes fraîches, les préparations de viande et les viandes hachées ne partagent pas le même régime de température. Une chambre froide unique réglée sur une valeur moyenne ne convient à aucune de ces catégories.",
      },
      {
        code: "STOCK-01",
        pourquoi:
          "La charcuterie cuite est un produit prêt à consommer qui ne subira plus aucun traitement. Le faire cohabiter avec de la viande crue, sur le même plan, la même vitrine ou le même torchon, est le risque majeur du métier.",
      },
      {
        code: "TRAC-02",
        pourquoi:
          "Une carcasse, un quartier ou un colis portent un numéro de lot qui disparaît dès la première découpe. Sans reprise de cette information, le lien entre ce qui est vendu et ce qui a été reçu est perdu.",
      },
      {
        code: "NETT-01",
        pourquoi:
          "Hachoir, trancheur, scie et poussoir ne se nettoient qu'en pièces détachées. Un plan de nettoyage qui ne descend pas au niveau du démontage laisse en place les zones qui comptent vraiment.",
      },
      {
        code: "LOC-02",
        pourquoi:
          "Billots entaillés, planches creusées, joints de vitrine fendus et lames piquées retiennent la matière et ne se désinfectent plus. En boucherie, l'état du matériel est un point sanitaire autant qu'un point d'entretien.",
      },
      {
        code: "TRAC-01",
        pourquoi:
          "Les préparations maison, saucisses, farces, terrines et marinades, portent une durée de vie que vous décidez seul. Sans date de fabrication ni durée écrite, cette décision ne se démontre pas.",
      },
      {
        code: "PERS-01",
        pourquoi:
          "Le métier expose aux coupures, et une plaie sur une main qui manipule de la viande crue est traitée par le règlement lui-même. La tenue et la protection des lésions sont ici des points de premier plan.",
      },
    ],
    sections: [
      {
        titre: "Commerce de détail, sauf quand vous livrez",
        paragraphes: [
          "Une boucherie qui vend au consommateur final relève du commerce de détail. À ce titre, elle est exclue du champ du règlement (CE) n° 853/2004 par son article 1er, paragraphe 5, point a), et n'est pas soumise à agrément sanitaire, au sens de l'article L. 233-2 du code rural et de la pêche maritime. Elle reste pleinement tenue des articles 4 et 5 du règlement (CE) n° 852/2004 du 29 avril 2004.",
          "La situation change dès que vous cédez des produits à d'autres établissements, un restaurant, une épicerie, un confrère. Vous entrez alors dans un régime qui peut relever de l'agrément, ou d'une dérogation à l'obligation d'agrément lorsque l'activité de cession reste marginale. C'est un point que l'audit vérifie systématiquement, parce qu'il décide du contenu attendu de votre dossier sanitaire.",
        ],
      },
      {
        titre: "Les températures des viandes, un régime à part",
        paragraphes: [
          "L'arrêté du 21 décembre 2009, article 3 et annexe I, fixe les températures maximales des denrées réfrigérées d'origine animale. Sa particularité, en boucherie, est qu'il ne traite pas tout lui-même : pour les viandes hachées, il renvoie aux températures du règlement (CE) n° 853/2004. Les préparations de viande, les viandes fraîches et les produits de charcuterie ne se rangent donc pas sous une valeur unique.",
          "C'est la raison pour laquelle une chambre froide réglée une fois pour toutes ne suffit pas à démontrer la maîtrise. Ce qui est attendu, c'est que vous sachiez dire quelle catégorie va où, à quelle température, et que vos relevés le montrent. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 5, pose la règle de fond : la chaîne du froid ne doit pas être interrompue.",
        ],
      },
      {
        titre: "Découpe, hachoir et nettoyage par démontage",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, annexe II, chapitre V, point 1, exige que les équipements en contact avec les denrées soient effectivement nettoyés et, le cas échéant, désinfectés, à une fréquence suffisante pour éviter tout risque de contamination, construits et entretenus de manière à réduire au maximum ce risque, et installés de manière à permettre un nettoyage convenable. Pour un hachoir, cela veut dire en pièces.",
          "Le plan de nettoyage écrit n'est imposé par aucune disposition : c'est une bonne pratique, et un volet de votre plan de maîtrise sanitaire. Mais l'article 5, paragraphe 2, point g), demande des documents prouvant l'application effective des mesures. Un plan qui descend au niveau du démontage, avec une fréquence par pièce et une fiche cochée, transforme une pratique déjà réelle en preuve utilisable.",
        ],
      },
      {
        titre: "Cru et cuit, le vrai partage du métier",
        paragraphes: [
          "Un jambon cuit, un pâté ou une saucisse cuite sont des produits prêts à consommer. Ils ne subiront plus de traitement capable de détruire ce qu'ils auront attrapé. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 5, impose pour les produits transformés des locaux permettant l'entreposage séparé des matières premières et des produits transformés, et le point 3 la protection des denrées à toutes les étapes.",
          "La marche en avant n'est pas une notion juridique : c'est la formulation professionnelle de ces exigences, complétées par le chapitre II, point 1, sur la conception et l'agencement des locaux. Quand la surface ne permet pas deux circuits, la séparation dans le temps, avec du matériel identifié et un nettoyage intercalé et tracé, répond à l'exigence. Ce qui ne répond à rien, c'est un plan de travail unique sans séquence écrite.",
        ],
      },
      {
        titre: "La traçabilité amont, celle qui sert le jour d'un rappel",
        paragraphes: [
          "Le règlement (CE) n° 178/2002 du 28 janvier 2002, article 18, impose de pouvoir identifier toute personne vous ayant fourni une denrée et de disposer de systèmes permettant de mettre cette information à disposition des autorités à leur demande. Pour les denrées d'origine animale, le règlement d'exécution (UE) n° 931/2011 du 19 septembre 2011 précise les exigences de traçabilité applicables.",
          "En boucherie, la difficulté est concrète : le numéro de lot vit sur l'emballage d'arrivée et disparaît à la première découpe. Ce qui est constaté en visite, c'est la manière dont vous conservez ce lien, par un cahier de réception, des étiquettes classées ou une photo systématique. Aucune disposition ne fixe la durée de conservation de ces étiquettes : elle relève de votre plan de maîtrise sanitaire, en cohérence avec la durée de vie des produits.",
        ],
      },
      {
        titre: "Les fabrications maison et leurs dates",
        paragraphes: [
          "Le règlement (UE) n° 1169/2011 du 25 octobre 2011 encadre la date limite de consommation, et son article 24 précise qu'au delà de cette date la denrée est dite dangereuse au sens du règlement (CE) n° 178/2002. Mais pour une terrine, une chair à saucisse ou une viande marinée fabriquées chez vous, aucun texte ne fixe la durée : c'est votre analyse des dangers qui la détermine.",
          "L'audit regarde donc deux choses. Que cette durée existe par écrit, et qu'une date de fabrication soit apposée au moment où le produit est fait, pas au moment où on y pense. C'est le geste qui rend la décision démontrable, et c'est celui qui manque le plus souvent, y compris dans des laboratoires par ailleurs irréprochables.",
        ],
      },
      {
        titre: "Sous-produits animaux et déchets",
        paragraphes: [
          "Les os, les gras, les parures et les retours ne sont pas des ordures ordinaires : ce sont des sous-produits animaux, encadrés par le règlement (CE) n° 1069/2009 du 21 octobre 2009. Leur collecte par une filière adaptée, et la conservation des bons d'enlèvement, font partie de ce qu'un agent demande à voir dans une boucherie, souvent avant les relevés de température.",
          "Le règlement (CE) n° 852/2004, annexe II, chapitre VI, complète le sujet : retrait des déchets aussi vite que possible des locaux où se trouvent des denrées, conteneurs dotés d'une fermeture et faciles à nettoyer, aires de stockage propres et exemptes de parasites. La commande non manuelle de la poubelle, elle, n'est pas imposée : c'est une bonne pratique.",
        ],
      },
      {
        titre: "Tenue, mains et coupures",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, annexe II, chapitre VIII, point 1, impose un niveau élevé de propreté personnelle et le port de tenues adaptées et propres. Le point 2 va plus loin, et il est souvent ignoré : une personne atteinte d'une maladie transmissible par les aliments, de plaies infectées ou de lésions cutanées ne doit pas manipuler de denrées. Dans un métier à couteau, cette disposition est centrale.",
          "Le chapitre I, point 4, impose par ailleurs un nombre suffisant de lavabos destinés au lavage des mains, judicieusement situés, avec eau chaude et froide, savon et séchage hygiénique. La coiffe, l'interdiction des bijoux et la fréquence de change ne figurent dans aucun texte : ce sont des bonnes pratiques issues des guides du secteur, à formaliser dans votre plan de maîtrise sanitaire.",
        ],
      },
    ],
    faq: [
      {
        question: "Ma boucherie doit-elle avoir un agrément sanitaire ?",
        reponse:
          "Pas si vous vendez uniquement au consommateur final. Vous relevez alors du commerce de détail, exclu du champ du règlement (CE) n° 853/2004 par son article 1er, paragraphe 5, point a), et non soumis à agrément au sens de l'article L. 233-2 du code rural et de la pêche maritime. Dès que vous cédez des produits à d'autres établissements, la question se pose, entre agrément et dérogation à l'obligation d'agrément.",
      },
      {
        question: "À quelle température dois-je conserver la viande hachée ?",
        reponse:
          "La viande hachée relève d'un régime propre : l'arrêté du 21 décembre 2009, annexe I, renvoie pour elle aux températures du règlement (CE) n° 853/2004, distinctes de celles des autres viandes réfrigérées. C'est précisément pour cela qu'une chambre froide réglée sur une valeur unique ne suffit pas à démontrer la maîtrise. L'audit vérifie que chaque catégorie a sa place, sa valeur cible et ses relevés.",
      },
      {
        question: "Faut-il un local séparé pour la charcuterie cuite ?",
        reponse:
          "Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 5, demande, pour les produits transformés, des locaux permettant l'entreposage séparé des matières premières et des produits transformés. La séparation est donc exigée, mais le texte ne dicte pas une pièce dédiée. Quand la surface ne le permet pas, une séparation dans le temps, avec matériel identifié et nettoyage intercalé tracé, répond à l'exigence.",
      },
      {
        question: "Combien de temps dois-je garder les étiquettes de mes livraisons ?",
        reponse:
          "Aucune disposition ne fixe de durée chiffrée en boucherie. Le règlement (CE) n° 178/2002, article 18, vous demande de pouvoir identifier vos fournisseurs et de mettre l'information à disposition des autorités, ce qui suppose de conserver étiquettes, bons et numéros de lot. La durée relève de votre plan de maîtrise sanitaire et se raisonne à partir de la durée de vie des produits concernés.",
      },
      {
        question: "Que dois-je faire de mes os et de mes parures ?",
        reponse:
          "Ce sont des sous-produits animaux, relevant du règlement (CE) n° 1069/2009 du 21 octobre 2009, et non des déchets ordinaires. Ils sont pris en charge par une filière adaptée, et les bons d'enlèvement font partie des documents demandés en visite. En attendant la collecte, le règlement (CE) n° 852/2004, annexe II, chapitre VI, impose un stockage en conteneur fermé, dans une aire tenue propre.",
      },
      {
        question: "Un plan de nettoyage écrit est-il obligatoire ?",
        reponse:
          "Non. Aucune disposition n'impose la forme d'un plan de nettoyage ni des fréquences chiffrées. Ce qui est imposé, c'est le résultat, au titre de l'annexe II, chapitre V, point 1 a), et la preuve documentaire de l'application effective des mesures, au titre de l'article 5, paragraphe 2, point g). Le plan écrit est le moyen le plus simple d'apporter cette preuve, surtout pour du matériel qui se nettoie démonté.",
      },
    ],
    liens: [
      "/points-de-controle/separation-cru-cuit-respectee",
      "/points-de-controle/conservation-des-etiquettes-n-de-lot",
      "/points-de-controle/materiaux-et-equipements-conformes",
      "/themes/chaine-du-froid",
      "/themes/stockage-marche-en-avant",
      "/contact",
    ],
  },
  {
    slug: "traiteur",
    nom: "traiteur",
    nomPluriel: "traiteurs",
    titre: "Audit d'hygiène pour un traiteur",
    titreSeo: "Audit hygiène traiteur, Île-de-France",
    description:
      "Audit d'hygiène pour traiteur : liaison froide et chaude, transport, remise en température sur place, allergènes du devis au buffet, dates et autocontrôles.",
    reponse:
      "Chez un traiteur, le risque commence là où la cuisine s'arrête. L'audit suit donc le produit au delà du laboratoire : le refroidissement des préparations, la liaison froide et la liaison chaude, le transport et les contenants, la remise en température dans une cuisine que vous ne maîtrisez pas, et l'information allergènes qui doit tenir du devis jusqu'au buffet. S'y ajoute la traçabilité des dates sur des productions faites plusieurs jours avant le service. Chaque écart repart avec sa priorité, le correctif attendu et la preuve à constituer.",
    ouverture:
      "Un traiteur produit dans un lieu et sert dans un autre. Entre les deux, il y a un camion, un ascenseur de service, une cuisine d'appoint et parfois une salle des fêtes sans point d'eau. C'est cette zone intermédiaire, et non le laboratoire, que la visite regarde le plus attentivement.",
    pointsSensibles: [
      {
        code: "TEMP-02",
        pourquoi:
          "Un traiteur produit en avance, par définition. Presque toutes ses préparations chaudes passent par un refroidissement avant d'être conditionnées, et c'est l'étape la plus longue en zone de température défavorable.",
      },
      {
        code: "TEMP-03",
        pourquoi:
          "La remise en température se fait souvent sur le lieu de l'événement, avec un matériel d'appoint et sans thermomètre. C'est le point le plus difficile à démontrer, parce qu'il se joue hors de vos murs.",
      },
      {
        code: "FROID-01",
        pourquoi:
          "Entre le laboratoire, le camion, la chambre froide du client et le buffet, une denrée change quatre fois d'enceinte. Chaque transfert est une occasion de rupture, et aucune n'est visible sur le produit.",
      },
      {
        code: "TRAC-01",
        pourquoi:
          "Une production réalisée le mercredi pour un service le samedi porte une durée de vie que vous décidez seul. Sans date de fabrication sur le contenant, ni durée écrite, la décision ne se démontre pas.",
      },
      {
        code: "ALL-01",
        pourquoi:
          "Le client commande sur un devis, plusieurs semaines avant, et la carte évolue jusqu'au dernier moment. L'information allergènes doit survivre à cet écart de temps et arriver jusqu'aux convives.",
      },
      {
        code: "STOCK-01",
        pourquoi:
          "Un laboratoire de traiteur fait cohabiter des matières premières crues, des préparations en cours et des produits finis prêts à consommer, souvent dans la même chambre froide, sur des échelles voisines.",
      },
      {
        code: "PMS-02",
        pourquoi:
          "Le service a lieu ailleurs, et personne du cabinet ni de l'administration ne le verra. Les autocontrôles tracés sont la seule mémoire de ce qui s'est passé entre le départ du camion et la fin du buffet.",
      },
    ],
    sections: [
      {
        titre: "Le risque commence là où la cuisine s'arrête",
        paragraphes: [
          "Le règlement (CE) n° 852/2004 du 29 avril 2004 s'applique à toutes les étapes de la production, de la transformation et de la distribution. Pour un traiteur, la distribution représente la moitié du métier, et c'est la partie la moins documentée dans la plupart des dossiers sanitaires. Le laboratoire est souvent bien tenu ; ce qui se passe entre le quai de chargement et l'assiette du convive l'est beaucoup moins.",
          "L'audit prend donc les choses dans cet ordre. Il commence par une prestation réelle, racontée du devis à la reprise du matériel, et cherche à chaque étape ce qui protège la denrée et ce qui en garde la trace. La plupart des écarts relevés ne sont pas des fautes : ce sont des étapes que personne n'a jamais écrites parce qu'elles se font naturellement.",
        ],
      },
      {
        titre: "Liaison froide, liaison chaude, et ce que dit le texte",
        paragraphes: [
          "L'arrêté du 21 décembre 2009, article 3 et annexe I, fixe une valeur qui vous concerne directement : la température minimale en liaison chaude, soit +63 °C, pour les plats cuisinés ou repas livrés chauds. C'est l'une des rares valeurs chiffrées qui s'applique sans détour à l'activité de traiteur, et c'est aussi celle qui est le plus souvent perdue en fin de trajet.",
          "Pour la liaison froide, ce sont les températures maximales des denrées réfrigérées de la même annexe qui s'appliquent, complétées par l'arrêté du 8 octobre 2013 pour les denrées autres que d'origine animale. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 5, ajoute la règle qui commande tout : la chaîne du froid ne doit pas être interrompue, y compris pendant le transport.",
        ],
      },
      {
        titre: "Le transport, un chapitre entier du règlement",
        paragraphes: [
          "Beaucoup d'exploitants ignorent que le règlement (CE) n° 852/2004 consacre un chapitre de son annexe II au transport. Il demande que les réceptacles de véhicules et les conteneurs utilisés pour transporter des denrées soient propres et en bon état d'entretien, conçus et construits pour permettre un nettoyage adéquat, et capables de maintenir les denrées à la température appropriée quand cela est nécessaire.",
          "Ce qui est constaté en visite tient rarement au véhicule lui-même. Ce sont les bacs empilés à même le plancher, la cloison de séparation absente entre les denrées et le matériel de service, les nappes et le petit matériel voyageant avec les plats, et l'absence de relevé au départ et à l'arrivée. Ce dernier point est le plus simple à corriger : deux mesures et une ligne écrite suffisent.",
        ],
      },
      {
        titre: "Le refroidissement, et le cas où l'annexe IV vous rattrape",
        paragraphes: [
          "Le passage de +63 °C à +10 °C en moins de deux heures figure à l'annexe IV, point 1, de l'arrêté du 21 décembre 2009, dont l'article 6 réserve l'application aux établissements de restauration collective. Un traiteur qui vend à des particuliers, pour un mariage ou une réception privée, n'y est pas soumis : il est tenu du résultat posé par le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 6, réfrigérer dès que possible après le traitement thermique.",
          "La nuance importe parce qu'elle peut basculer. Si votre activité consiste à fournir des repas à une collectivité, vous relevez alors de ces dispositions, et les valeurs cessent d'être des références pour devenir des obligations. C'est exactement le genre de point qu'il vaut mieux avoir tranché avant une visite, et l'audit le tranche avec vous au vu de votre clientèle réelle.",
        ],
      },
      {
        titre: "La remise en température chez le client",
        paragraphes: [
          "Le délai d'une heure entre +10 °C et la remise au consommateur, avec un minimum de +63 °C, figure à l'annexe IV, point 3, du même arrêté, et relève donc du même champ : la restauration collective. Pour une prestation privée, aucune valeur ne s'impose, et c'est votre plan de maîtrise sanitaire qui doit fixer la procédure, sa limite et ce qu'on fait quand elle n'est pas atteinte.",
          "Le vrai sujet est matériel. Une remise en température conduite dans un four domestique, un chafing dish à bougie ou une étuve de location ne monte pas comme un four de laboratoire. Emporter une sonde, mesurer à cœur sur une pièce témoin et noter la valeur transforme un point invérifiable en point maîtrisé, sans rien changer à l'organisation du service.",
        ],
      },
      {
        titre: "Les allergènes, du devis au buffet",
        paragraphes: [
          "Le règlement (UE) n° 1169/2011 du 25 octobre 2011, article 44, paragraphe 1, point a), maintient l'obligation d'informer sur les substances de son annexe II pour les denrées proposées non préemballées, ce qui couvre un buffet. Le décret n° 2015-447 du 17 avril 2015, aux articles R. 412-12 et R. 412-13 du code de la consommation, exige que l'information figure sur la denrée ou à proximité, sans incertitude sur le plat concerné.",
          "Chez un traiteur, la difficulté est le décalage de temps. Le devis est signé longtemps avant, la carte bouge, et l'information part souvent d'un document commercial jamais relu. Une fiche par plat, tenue en laboratoire et non au commercial, réglée sur les recettes réellement produites, est le seul dispositif qui tienne. Si vous prenez des commandes en ligne, l'article 14 du même règlement impose que ces mentions soient disponibles avant la conclusion de l'achat.",
        ],
      },
      {
        titre: "Dates, contenants et retours",
        paragraphes: [
          "Une production faite plusieurs jours avant le service porte une durée de vie que vous fixez vous-même, à partir de votre analyse des dangers. Aucun texte ne la détermine. Ce qui est attendu, c'est qu'elle soit écrite et qu'une date de fabrication soit apposée sur le contenant au moment de la production. C'est le geste qui manque le plus souvent, et il coûte trois secondes.",
          "Les retours d'événement méritent une règle écrite, parce que c'est là que les décisions se prennent à chaud, tard, et par des personnes fatiguées. Un plat resté sur un buffet, une pièce non servie restée en camion, un fond de bac réfrigéré ne relèvent pas du même traitement. Décider une fois pour toutes, et l'écrire, évite d'avoir à décider chaque samedi soir.",
        ],
      },
      {
        titre: "Les autocontrôles, la mémoire d'un service qui n'a pas lieu chez vous",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, article 5, paragraphe 2, points d) à g), demande une surveillance efficace des points critiques, des actions correctives quand un point n'est pas maîtrisé, une vérification périodique et des documents prouvant l'application effective des mesures. Ni la nature, ni la fréquence, ni le format de ces autocontrôles ne sont fixés par un texte : ils découlent de votre analyse des dangers.",
          "Pour un traiteur, cela se traduit très concrètement par une fiche de prestation : température de départ, heure de chargement, température à l'arrivée, heure de service, sort des retours. Une feuille par événement, remplie par le chef d'équipe, remplace à elle seule la moitié d'un classeur, et c'est le document qui parle le mieux d'une activité que personne ne peut venir observer.",
        ],
      },
    ],
    faq: [
      {
        question: "Dois-je respecter le refroidissement en deux heures ?",
        reponse:
          "Cela dépend de votre clientèle. Le seuil de +63 °C à +10 °C en moins de deux heures figure à l'annexe IV, point 1, de l'arrêté du 21 décembre 2009, applicable à la restauration collective au titre de son article 6. Pour des prestations auprès de particuliers, vous êtes tenu du résultat posé par le règlement (CE) n° 852/2004, réfrigérer dès que possible, et vous fixez votre propre limite. Si vous fournissez des repas à une collectivité, ces valeurs vous deviennent opposables.",
      },
      {
        question: "À quelle température livrer un plat chaud ?",
        reponse:
          "L'arrêté du 21 décembre 2009, annexe I, fixe une température minimale de +63 °C en liaison chaude pour les plats cuisinés ou repas livrés chauds. C'est une valeur qui s'applique directement à l'activité de traiteur. Ce qui est constaté en visite, ce n'est pas la valeur au départ du laboratoire, c'est l'absence de mesure à l'arrivée, alors que c'est le seul moment où le chiffre a une portée.",
      },
      {
        question: "Mon camion doit-il être un véhicule frigorifique homologué ?",
        reponse:
          "Le règlement (CE) n° 852/2004, annexe II, consacre un chapitre au transport : réceptacles et conteneurs propres, en bon état, conçus pour permettre un nettoyage adéquat et capables de maintenir la température appropriée lorsque c'est nécessaire. Le texte impose donc un résultat, pas un modèle de véhicule. Ce qui compte est votre capacité à démontrer la température maintenue, ce qui suppose de la mesurer.",
      },
      {
        question: "Faut-il conserver des plats témoins ?",
        reponse:
          "La conservation de plats témoins est une exigence propre à la restauration collective. Pour un traiteur qui sert des particuliers, c'est une bonne pratique professionnelle, largement répandue, et non une obligation. Elle a un intérêt très concret : en cas de suspicion après un événement, un échantillon conservé est souvent la seule pièce qui permette de vous situer. La décision et sa durée se décrivent dans votre plan de maîtrise sanitaire.",
      },
      {
        question: "Qui est responsable une fois les plats livrés chez le client ?",
        reponse:
          "Tant que vous assurez la prestation, la remise en température et le service, la maîtrise vous appartient, et c'est à vous d'en garder la trace. Quand vous livrez et repartez, la limite de votre responsabilité se déplace, mais l'information que vous transmettez compte : conditions de conservation, durée, mode de remise en température. Une consigne écrite remise avec la livraison protège les deux parties.",
      },
      {
        question: "Un traiteur a-t-il besoin d'un agrément sanitaire ?",
        reponse:
          "Un traiteur qui remet directement au consommateur final relève du commerce de détail, exclu du champ du règlement (CE) n° 853/2004 par son article 1er, paragraphe 5, point a). Dès que vous cédez des produits à d'autres établissements, la question de l'agrément ou d'une dérogation à l'obligation d'agrément se pose. L'audit vérifie ce point en premier, parce qu'il décide du contenu attendu de votre dossier.",
      },
    ],
    liens: [
      "/points-de-controle/refroidissement-rapide-maitrise",
      "/points-de-controle/remise-en-temperature-maitrisee",
      "/points-de-controle/autocontroles-realises-et-traces",
      "/themes/temperatures-cuisson",
      "/themes/plan-de-maitrise-sanitaire-pms",
      "/contact",
    ],
  },
  {
    slug: "cafeteria-et-libre-service",
    nom: "cafétéria ou libre-service",
    nomPluriel: "cafétérias et libres-services",
    titre: "Audit d'hygiène en cafétéria et libre-service",
    titreSeo: "Audit hygiène cafétéria et libre-service, Île-de-France",
    description:
      "Audit d'hygiène en cafétéria et libre-service : vitrines et réassort, maintien au chaud, dates des préparations exposées, allergènes sans prise de commande.",
    reponse:
      "En libre-service, le client devient le dernier manipulateur de la denrée, et c'est ce qui change tout. L'audit se concentre sur la protection des produits exposés, la température des vitrines froides et le maintien au chaud, le réassort qui mélange les productions de deux heures différentes, les dates des assiettes préparées à l'avance, et l'information allergènes quand personne ne prend la commande. Une précision compte ici plus qu'ailleurs : une cafétéria commerciale n'est pas de la restauration collective, et les seuils de l'annexe IV de l'arrêté du 21 décembre 2009 ne s'y appliquent pas.",
    ouverture:
      "Une cafétéria expose ses produits et laisse le client se servir. Cette liberté déplace le risque : il ne se joue plus seulement en cuisine, mais sur le linéaire, dans le réassort et dans le temps que passe une assiette en vitrine avant d'être choisie.",
    pointsSensibles: [
      {
        code: "FROID-01",
        pourquoi:
          "Une vitrine ouverte sur la salle n'est pas une chambre froide. L'éclairage chauffe, la façade reste dégagée, et le haut des bacs travaille plusieurs degrés au-dessus du bas. Le relevé pris à l'ouverture ne dit rien de la réalité de midi.",
      },
      {
        code: "TEMP-03",
        pourquoi:
          "Les plats chauds attendent en bain-marie ou sous rampe pendant toute la durée du service. La montée en température et le maintien sont deux opérations distinctes, et c'est presque toujours la seconde qui pose problème.",
      },
      {
        code: "TRAC-01",
        pourquoi:
          "Salades composées, coupelles de dessert et entrées en barquette sont fabriquées en amont, parfois la veille. Leur durée de vie est décidée par vous, et sans date apposée elle ne se démontre pas.",
      },
      {
        code: "STOCK-01",
        pourquoi:
          "Un réassort qui pose des produits frais sur des produits déjà exposés depuis deux heures fabrique un mélange qu'aucune date ne rattrape. C'est l'écart le plus fréquent, et le plus discret, du libre-service.",
      },
      {
        code: "ALL-01",
        pourquoi:
          "Sans prise de commande, personne ne peut répondre au client allergique. L'information doit donc être portée sur la denrée ou juste à côté, produit par produit, ce qui suppose de la refaire à chaque changement de carte.",
      },
      {
        code: "NETT-01",
        pourquoi:
          "Pinces, louches, plateaux, distributeurs de sauces et de couverts sont touchés toute la journée par des dizaines de mains. Ce sont des surfaces de contact qu'un plan de nettoyage écrit pour une cuisine ignore.",
      },
      {
        code: "DECH-01",
        pourquoi:
          "Retours de plateaux, emballages et restes arrivent par vagues au même endroit, souvent à côté de la laverie et pas très loin des vitrines. L'organisation de ce point de retour conditionne la propreté de la salle.",
      },
    ],
    sections: [
      {
        titre: "En libre-service, le client devient un manipulateur",
        paragraphes: [
          "Le règlement (CE) n° 852/2004 du 29 avril 2004, annexe II, chapitre IX, point 3, impose de protéger les denrées contre toute contamination susceptible de les rendre impropres à la consommation humaine ou dangereuses pour la santé, à toutes les étapes. L'exposition à la vente en fait partie, et c'est la seule étape où la denrée est à portée d'une personne qui n'a reçu aucune consigne.",
          "Le protège-postillons, la vitre inclinée et la pince à usage unique ne sont écrits nulle part : ce sont des bonnes pratiques professionnelles qui mettent en œuvre cette exigence. La distinction compte, parce qu'elle ouvre la discussion sur le moyen. Une vitrine mal conçue peut être compensée par un service à l'assiette sur les produits sensibles, et l'audit cherche cette solution plutôt qu'un remplacement de mobilier.",
        ],
      },
      {
        titre: "Une cafétéria n'est pas de la restauration collective",
        paragraphes: [
          "C'est la confusion la plus coûteuse de cette activité. Les seuils de refroidissement, de +63 °C à +10 °C en moins de deux heures, et de remise en température, une heure au plus avec un minimum de +63 °C, figurent à l'annexe IV, points 1 et 3, de l'arrêté du 21 décembre 2009. Son article 6 en réserve l'application aux établissements de restauration collective. Une cafétéria qui vend à qui se présente n'en fait pas partie.",
          "Vous restez tenu du résultat : réfrigérer dès que possible après le traitement thermique, au titre du règlement (CE) n° 852/2004, annexe II, chapitre IX, point 6, et fixer, surveiller et corriger vos propres limites au titre de son article 5. Reprendre les valeurs de l'annexe IV dans votre plan de maîtrise sanitaire est le choix le plus lisible, mais elles deviennent alors vos limites, ce qui change ce que vous devez démontrer.",
        ],
      },
      {
        titre: "Les vitrines froides et l'heure du relevé",
        paragraphes: [
          "L'arrêté du 21 décembre 2009, article 3 et annexe I, fixe les températures maximales des denrées réfrigérées d'origine animale et de celles qui en contiennent ; l'arrêté du 8 octobre 2013 traite les autres denrées. Le point à retenir est que la valeur porte sur la denrée, pas sur l'air de la vitrine, et qu'une sonde d'affichage placée près du groupe ne mesure pas ce que vous croyez.",
          "En pratique, un relevé de vitrine n'a d'intérêt que pris au pic de service, au moment où le linéaire est ouvert depuis une heure et où le réassort vient de passer. Un thermomètre placé dans un bac témoin, au point le plus défavorable, donne la seule valeur qui compte. C'est une correction sans coût, et c'est celle qui fait le plus bouger le résultat sur ce point.",
        ],
      },
      {
        titre: "Le réassort, l'écart que personne ne voit",
        paragraphes: [
          "Ajouter des portions fraîches sur un bac déjà entamé fabrique un produit dont on ne sait plus dire depuis quand il est là. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 2, demande de conserver les denrées dans des conditions évitant toute détérioration néfaste, et le point 3 de les protéger à toutes les étapes. Un mélange de deux fabrications rend ces exigences invérifiables.",
          "La règle qui résout ce point tient en une phrase : on remplace un bac, on ne le complète pas. Elle suppose de produire en plus petites quantités et plus souvent, ce qui est une décision d'organisation autant que d'hygiène. Écrite dans le plan de maîtrise sanitaire et affichée au poste, elle transforme un point difficile à tenir en habitude.",
        ],
      },
      {
        titre: "Le maintien au chaud pendant tout un service",
        paragraphes: [
          "La montée en température et le maintien sont deux opérations différentes. La première se maîtrise avec du matériel adapté et une mesure à cœur ; la seconde se maîtrise avec une durée. L'arrêté du 21 décembre 2009, annexe I, fixe une température minimale de +63 °C en liaison chaude pour les plats cuisinés ou repas livrés chauds, ce qui donne un repère solide même quand il ne vous est pas directement opposable.",
          "Ce qui est constaté en visite est presque toujours la durée, jamais la température. Un plat qui tient +65 °C depuis quatre heures est conforme sur le papier et discutable dans l'assiette. Fixer une durée maximale de maintien, dire ce que devient le reste, et le noter, est la seule façon de traiter ce point sans arbitrage quotidien.",
        ],
      },
      {
        titre: "Les dates sur les préparations exposées",
        paragraphes: [
          "Salades, entrées, coupelles et desserts fabriqués en amont portent une durée de vie que vous décidez, à partir de votre analyse des dangers. Aucun texte ne la fixe. Le règlement (UE) n° 1169/2011 du 25 octobre 2011 encadre la date limite de consommation des produits que vous achetez, et son article 24 précise qu'au delà de cette date la denrée est dite dangereuse au sens du règlement (CE) n° 178/2002.",
          "Pour vos fabrications, l'exigence est de démontrer votre décision. Une date de fabrication apposée en cuisine, une durée écrite dans le plan de maîtrise sanitaire, et un contrôle au réassort suffisent. C'est un point documentaire, il ne coûte rien, et c'est l'un des rares qui se solde entièrement en une semaine.",
        ],
      },
      {
        titre: "Les allergènes quand personne ne prend la commande",
        paragraphes: [
          "Le règlement (UE) n° 1169/2011, article 44, paragraphe 1, point a), maintient l'obligation d'informer sur les substances de son annexe II pour les denrées proposées non préemballées. Le décret n° 2015-447 du 17 avril 2015, aux articles R. 412-12 et R. 412-13 du code de la consommation, exige que l'information soit portée sur la denrée elle-même ou à proximité, de façon qu'il n'existe aucune incertitude quant à la denrée à laquelle elle se rapporte.",
          "En libre-service, cette dernière condition est exigeante. Un classeur à la caisse laisse une incertitude sur un linéaire de quinze références. Une étiquette par bac, ou une réglette sous chaque produit, y répond. C'est le point sur lequel les cafétérias sont le plus souvent en écart, et c'est aussi celui qui se corrige avec une imprimante et une procédure de mise à jour.",
        ],
      },
      {
        titre: "Pinces, plateaux et retours",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, annexe II, chapitre V, point 1 a), impose que les articles et équipements en contact avec les denrées soient nettoyés et le cas échéant désinfectés à une fréquence suffisante pour éviter tout risque de contamination. Pinces, louches et becs de distributeurs sont exactement cela, et ils sont touchés par des dizaines de mains dans la journée. Aucune fréquence n'est fixée par un texte : c'est votre plan qui la définit.",
          "Le point de retour des plateaux mérite le même soin. Le chapitre VI, points 1 et 2, impose de retirer les déchets aussi vite que possible des locaux où se trouvent des denrées et de les déposer dans des conteneurs dotés d'une fermeture, bien entretenus et faciles à nettoyer. Quand ce point de retour jouxte une vitrine, la question n'est plus documentaire, elle est d'agencement.",
        ],
      },
    ],
    faq: [
      {
        question: "Une cafétéria relève-t-elle de la restauration collective ?",
        reponse:
          "Non, si elle vend à toute personne qui se présente. C'est une distinction décisive : les seuils de refroidissement et de remise en température de l'annexe IV de l'arrêté du 21 décembre 2009 ne visent, au titre de son article 6, que les établissements de restauration collective. Vous restez tenu du résultat posé par le règlement (CE) n° 852/2004 et devez fixer vos propres limites dans votre plan de maîtrise sanitaire.",
      },
      {
        question: "Le protège-postillons est-il obligatoire ?",
        reponse:
          "Aucun texte ne le nomme. Ce qui est imposé, par le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 3, c'est de protéger les denrées contre toute contamination à toutes les étapes, exposition comprise. La vitre de protection est le moyen le plus courant d'y parvenir, pas le seul : un service à l'assiette sur les produits les plus sensibles répond aussi à l'exigence.",
      },
      {
        question: "Puis-je compléter un bac de salade en cours de service ?",
        reponse:
          "C'est la pratique qui pose le plus de problèmes en libre-service, parce qu'elle mélange deux fabrications et rend la durée d'exposition inconnue. Aucune disposition ne l'interdit expressément, mais elle rend invérifiables les exigences de conservation et de protection des denrées. La règle qui tient est de remplacer le bac plutôt que de le compléter, et de l'écrire dans le plan de maîtrise sanitaire.",
      },
      {
        question: "Où dois-je afficher les allergènes en libre-service ?",
        reponse:
          "Sur la denrée ou à proximité immédiate, de façon qu'il n'y ait aucune incertitude sur le produit concerné : c'est ce qu'exigent les articles R. 412-12 et R. 412-13 du code de la consommation, issus du décret n° 2015-447 du 17 avril 2015. Sur un linéaire de plusieurs références, un classeur situé à la caisse ne remplit pas cette condition. Une étiquette ou une réglette par produit y répond.",
      },
      {
        question: "Combien de temps un plat peut-il rester en bain-marie ?",
        reponse:
          "Aucune durée ne vous est imposée si vous n'êtes pas en restauration collective. La température minimale de +63 °C en liaison chaude figure à l'annexe I de l'arrêté du 21 décembre 2009 pour les plats cuisinés ou repas livrés chauds, et constitue un bon repère. La durée, elle, relève de votre plan de maîtrise sanitaire : fixez-la, dites ce que devient le produit au delà, et notez-le.",
      },
      {
        question: "Faut-il relever la température des vitrines chaque jour ?",
        reponse:
          "Aucune disposition ne fixe de fréquence. Le règlement (CE) n° 852/2004, annexe II, chapitre I, point 2 d), demande des températures qui puissent être vérifiées et si nécessaire enregistrées, et l'article 5 une surveillance efficace assortie de documents. Ce qui compte davantage que la fréquence, c'est le moment : un relevé pris au pic de service, sur un bac témoin, vaut mieux que trois relevés pris à l'ouverture.",
      },
    ],
    liens: [
      "/points-de-controle/temperatures-des-enceintes-froides-positives-conformes",
      "/points-de-controle/information-allergenes-consommateur",
      "/points-de-controle/remise-en-temperature-maitrisee",
      "/themes/temperatures-cuisson",
      "/themes/tracabilite-dlc",
      "/contact",
    ],
  },
  {
    slug: "pizzeria",
    nom: "pizzeria",
    nomPluriel: "pizzerias",
    titre: "Audit d'hygiène en pizzeria",
    titreSeo: "Audit hygiène pizzeria, Île-de-France",
    description:
      "Audit d'hygiène en pizzeria : pâte hors du froid, table à garniture, mozzarella et conserves entamées, farine et nuisibles, four, livraison et allergènes.",
    reponse:
      "Une pizzeria concentre ses risques sur trois mètres carrés : la table à garniture. C'est là que l'audit passe le plus de temps, parce que les bacs posés au-dessus du groupe froid travaillent plusieurs degrés au-dessus de ce que l'afficheur annonce. Autour, les points qui pèsent sont les produits entamés, mozzarella, conserves et saumures, la réserve de farine et la lutte contre les nuisibles, l'environnement du four, et l'information allergènes quand la commande arrive par téléphone ou par une plateforme.",
    ouverture:
      "En pizzeria, la question qui revient le plus est celle de la pâte laissée hors du froid. La réponse surprend souvent : le règlement l'admet, sous conditions, et c'est écrit. Encore faut-il savoir où, et surtout savoir ce que cela vous oblige à écrire de votre côté.",
    pointsSensibles: [
      {
        code: "FROID-01",
        pourquoi:
          "La table à pizza est le seul meuble froid ouvert en permanence, à hauteur de plan de travail, à côté d'un four. Les bacs du haut ne tiennent presque jamais la valeur affichée par le groupe qui les porte.",
      },
      {
        code: "TRAC-01",
        pourquoi:
          "Mozzarella entamée, conserves de tomates ouvertes, saumures, charcuteries sous vide entamées : la garniture est faite de produits ouverts sans date. C'est l'écart documentaire le plus courant de l'activité.",
      },
      {
        code: "STOCK-02",
        pourquoi:
          "Les sacs de farine et de semoule occupent le sol de la réserve, et les bacs à pâtons s'empilent au plus près. La rotation et le stockage hors sol sont ici des sujets d'organisation quotidienne.",
      },
      {
        code: "NUIS-01",
        pourquoi:
          "Farine au sol, résidus de pâte séchée derrière les meubles et cartons de livraison stockés en réserve créent un environnement attractif. La pizzeria voit souvent les indices avant les autres cuisines.",
      },
      {
        code: "LOC-01",
        pourquoi:
          "Chaleur du four, projections d'huile et farine en suspension attaquent les revêtements, les joints et les plafonds. Des surfaces devenues poreuses ne se désinfectent plus, quelle que soit la qualité du nettoyage.",
      },
      {
        code: "PERS-02",
        pourquoi:
          "Le pizzaïolo enchaîne pâte crue, garniture, four et parfois encaissement, sur un poste où les mains ne quittent jamais les denrées. Un lave-mains accessible depuis ce poste change la pratique réelle.",
      },
      {
        code: "ALL-01",
        pourquoi:
          "Gluten, lait, poisson, fruits à coque et sésame se croisent sur presque toutes les cartes. Quand la commande passe par téléphone ou par une plateforme, l'information doit exister avant que le client valide.",
      },
    ],
    sections: [
      {
        titre: "La pâte hors du froid n'est pas un écart en soi",
        paragraphes: [
          "C'est le point sur lequel les pizzaïolos se sentent le plus jugés, et souvent à tort. Le règlement (CE) n° 852/2004 du 29 avril 2004, annexe II, chapitre IX, point 5, pose l'interdiction de conserver les denrées à des températures pouvant entraîner un risque, mais il admet aussi que des denrées soient maintenues hors de ces températures pendant des périodes limitées lorsque des raisons pratiques de préparation l'imposent, à condition que cela n'entraîne pas de risque pour la santé.",
          "Une pousse à température ambiante entre donc dans ce cadre, à trois conditions : que la durée soit connue et limitée, qu'elle soit justifiée par le procédé, et que tout cela soit écrit dans votre plan de maîtrise sanitaire. Ce qui pose problème en visite n'est jamais la pâte sur le comptoir, c'est l'absence d'une phrase expliquant pourquoi elle y est et jusqu'à quelle heure.",
        ],
      },
      {
        titre: "La table à garniture, le vrai point froid",
        paragraphes: [
          "L'arrêté du 21 décembre 2009, article 3 et annexe I, fixe les températures maximales des denrées réfrigérées d'origine animale et de celles qui en contiennent, ce qui couvre la mozzarella, la charcuterie et les préparations à base d'œuf. L'arrêté du 8 octobre 2013 traite les autres denrées. La valeur porte sur la denrée, pas sur l'air, et c'est toute la difficulté d'un meuble ouvert.",
          "En pratique, la mesure utile se prend dans un bac du haut, en milieu de service, un jour de forte activité. C'est là que l'écart apparaît, et il tient rarement au groupe : couvercles laissés ouverts, bacs remplis trop haut, rideau non rabattu pendant la coupure, proximité immédiate du four. Ces corrections sont gratuites, et ce sont elles qui règlent le point.",
        ],
      },
      {
        titre: "Mozzarella, conserves et produits entamés",
        paragraphes: [
          "Le règlement (UE) n° 1169/2011 du 25 octobre 2011 encadre la date limite de consommation d'origine, et son article 24 précise qu'au delà de cette date la denrée est dite dangereuse au sens du règlement (CE) n° 178/2002. Mais il ne dit rien de ce qui se passe après ouverture. L'article 25, paragraphe 2, du même règlement impose au fabricant d'indiquer les conditions de conservation après ouverture, et c'est de là que part votre raisonnement.",
          "L'étiquetage des produits entamés, avec date d'ouverture et durée de vie secondaire, n'est imposé par aucune disposition : c'est une bonne pratique qui relève de votre plan de maîtrise sanitaire. Elle est très attendue en visite, parce que sans elle une boîte de tomates ouverte ou une saumure de mozzarella ne peuvent pas être situées dans le temps. Un rouleau d'étiquettes au-dessus de la table règle le sujet.",
        ],
      },
      {
        titre: "Farine, pâtons et réserve",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 2, impose de conserver les matières premières dans des conditions adéquates permettant d'éviter toute détérioration néfaste et de les protéger contre toute contamination. L'interdiction de stocker à même le sol et la rotation premier entré premier sorti ne figurent telles quelles dans aucun texte : ce sont des bonnes pratiques qui mettent en œuvre cette exigence.",
          "En pizzeria, elles ont une portée très concrète. Un sac de farine ouvert et posé au sol se souille, s'humidifie et attire ; des bacs à pâtons empilés sans date font perdre la rotation. Surélever, refermer, dater les bacs de pousse et vider complètement un contenant avant de le remplir sont quatre gestes qui ferment quatre constats différents.",
        ],
      },
      {
        titre: "Le four, la chaleur et les surfaces",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, annexe II, chapitre II, point 1, demande des sols, des surfaces murales, des plafonds et des surfaces de travail bien entretenus, faciles à nettoyer et au besoin à désinfecter, en matériaux étanches, non absorbants, lavables et non toxiques, sauf à démontrer à l'autorité compétente que d'autres matériaux conviennent. Un environnement de four met ces matériaux à rude épreuve.",
          "Le bois de chauffe, quand il y en a, pose une question simple : où est-il stocké et par où passe-t-il. Stocké en cuisine, il apporte de la poussière, de l'écorce et parfois des insectes au plus près des denrées. Aucun texte ne traite le bois de four en tant que tel, mais le chapitre IX, point 3, sur la protection des denrées à toutes les étapes suffit à cadrer la réponse.",
        ],
      },
      {
        titre: "Des mètres carrés comptés",
        paragraphes: [
          "La plupart des pizzerias travaillent dans des surfaces réduites où le poste de garniture, la découpe, la plonge et parfois la caisse tiennent dans la même pièce. Le règlement (CE) n° 852/2004, annexe II, chapitre II, point 1, demande que la conception et l'agencement des locaux permettent de prévenir la contamination entre et durant les opérations. La marche en avant n'est pas une notion juridique : c'est la traduction professionnelle de cette exigence.",
          "Vous n'êtes donc pas tenu de créer des circuits séparés. Vous êtes tenu d'obtenir le résultat, et une séparation dans le temps, avec des plages dédiées, du matériel identifié et un nettoyage intercalé tracé, y répond. C'est le raisonnement que l'audit propose quand les mètres carrés manquent, plutôt qu'un constat que rien ne permet de solder.",
        ],
      },
      {
        titre: "Livraison, cartons et allergènes en ligne",
        paragraphes: [
          "Les cartons à pizza sont des matériaux destinés à entrer en contact avec des denrées et relèvent du règlement (CE) n° 1935/2004 du 27 octobre 2004, dont l'article 3, paragraphe 1, impose qu'ils ne cèdent pas aux denrées des constituants susceptibles de présenter un danger, de modifier leur composition de façon inacceptable ou d'altérer leurs caractères organoleptiques. Leur stockage à l'abri, et non contre un mur humide, relève du même bon sens que celui des denrées.",
          "Côté information, si vous prenez des commandes en ligne, le règlement (UE) n° 1169/2011, article 14, encadre la vente à distance et impose que les mentions obligatoires, dont les allergènes, soient disponibles avant la conclusion de l'achat. Ce que vous affichez sur la carte de salle doit donc exister aussi sur vos fiches produit chez les plateformes, et être corrigé quand une recette change.",
        ],
      },
      {
        titre: "Les documents qu'on vous demandera",
        paragraphes: [
          "Relevés de température, bons de livraison, plan de nettoyage, suivi de la lutte contre les nuisibles, justificatif de formation en hygiène alimentaire à l'effectif et plan de maîtrise sanitaire : ce sont les six pièces qui ouvrent une visite. Le plan de maîtrise sanitaire n'est pas une notion du règlement européen, son contenu type vient de l'annexe II de l'arrêté du 8 juin 2006, qui vise les établissements soumis à agrément.",
          "Une pizzeria en remise directe n'est pas soumise à agrément, mais elle reste pleinement tenue des articles 4 et 5 du règlement (CE) n° 852/2004. Ce qui compte est donc que le dossier décrive votre cuisine, y compris ce qu'elle a de particulier : la pousse, la table à garniture, les cartons et la livraison. Un modèle générique passe à côté de tout ce qui fait votre métier.",
        ],
      },
    ],
    faq: [
      {
        question: "Ai-je le droit de laisser ma pâte pousser à température ambiante ?",
        reponse:
          "Oui, dans un cadre précis. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 5, admet que des denrées soient maintenues hors des températures de conservation pendant des périodes limitées lorsque des raisons pratiques de préparation l'imposent, sans risque pour la santé. La pousse entre dans ce cadre si la durée est connue, limitée, justifiée par le procédé et écrite dans votre plan de maîtrise sanitaire.",
      },
      {
        question: "Quelle température pour les bacs de ma table à pizza ?",
        reponse:
          "Les valeurs viennent de l'arrêté du 21 décembre 2009, annexe I, pour les denrées d'origine animale et celles qui en contiennent, et de l'arrêté du 8 octobre 2013 pour les autres. Elles portent sur la denrée, pas sur l'air du meuble. La mesure qui compte se prend dans un bac du haut, en milieu de service : c'est le point le plus défavorable et celui qu'un agent regardera.",
      },
      {
        question: "Dois-je dater ma boîte de tomates une fois ouverte ?",
        reponse:
          "Aucun texte ne l'impose. C'est une bonne pratique qui relève de votre plan de maîtrise sanitaire, construit à partir des conditions de conservation après ouverture que le fabricant doit indiquer, au titre du règlement (UE) n° 1169/2011, article 25, paragraphe 2. Sans date, un produit entamé ne peut pas être situé dans le temps, et c'est ce qui est constaté en visite.",
      },
      {
        question: "Où stocker le bois de mon four ?",
        reponse:
          "Aucune disposition ne traite le bois de four en tant que tel. Ce qui s'applique est le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 3, qui impose de protéger les denrées contre toute contamination à toutes les étapes. Un stockage à l'écart de la zone de manipulation, dans un espace propre et sec, répond à l'exigence. Stocker le bois sous la table de garniture ne répond à rien.",
      },
      {
        question: "Faut-il afficher les allergènes sur les plateformes de commande ?",
        reponse:
          "Oui. Le règlement (UE) n° 1169/2011, article 14, encadre la vente à distance et impose que les mentions obligatoires, allergènes compris, soient disponibles avant que le client valide sa commande. La fiche produit de la plateforme fait donc partie de votre information au même titre que votre carte, et c'est à vous de la corriger quand une recette change.",
      },
      {
        question: "La farine attire-t-elle vraiment les nuisibles ?",
        reponse:
          "Farines, semoules et fruits secs comptent parmi les matières premières les plus attractives, mites comprises. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 4, demande des méthodes adéquates de lutte contre les organismes nuisibles. Le contrat de dératisation n'est imposé par aucun texte : c'est un moyen de preuve. Vider et laver les bacs à chaque fin de sac agit davantage sur le problème.",
      },
    ],
    liens: [
      "/points-de-controle/temperatures-des-enceintes-froides-positives-conformes",
      "/points-de-controle/organisation-des-stocks-rotation-sol",
      "/points-de-controle/etiquetage-et-dlc-dluo-respectes",
      "/themes/stockage-marche-en-avant",
      "/themes/lutte-contre-les-nuisibles",
      "/contact",
    ],
  },
  {
    slug: "dark-kitchen",
    nom: "dark kitchen",
    nomPluriel: "dark kitchens",
    titre: "Audit d'hygiène en dark kitchen",
    titreSeo: "Audit hygiène dark kitchen, Île-de-France",
    description:
      "Audit d'hygiène en dark kitchen : allergènes en vente à distance, plusieurs marques dans une cuisine, délai avant consommation, local, traçabilité et documents.",
    reponse:
      "Une dark kitchen produit sans salle et sans client sur place. Rien ne se joue en vitrine, tout se joue sur le local, les documents et le temps qui sépare la production du repas. L'audit s'y concentre sur quatre sujets : l'information allergènes en vente à distance, qui doit exister avant que la commande soit validée, la cohabitation de plusieurs marques dans une même cuisine, la maîtrise du froid et du délai jusqu'au client, et un plan de maîtrise sanitaire qui décrive une organisation que personne ne vient observer.",
    ouverture:
      "Une dark kitchen n'a pas de salle à montrer, et c'est justement ce qui rend la visite différente. Il n'y a pas de première impression à corriger : il reste le local, les enregistrements et la façon dont l'information arrive au client par un écran plutôt que par un serveur.",
    pointsSensibles: [
      {
        code: "ALL-01",
        pourquoi:
          "Le client commande sur un écran et ne peut poser aucune question. L'information allergènes doit donc être disponible avant qu'il valide, ce qui déplace l'obligation vers la fiche produit et non vers une réponse orale.",
      },
      {
        code: "ALL-02",
        pourquoi:
          "Plusieurs marques partagent souvent le même matériel et les mêmes plans de travail, avec des recettes très différentes. Le risque de contamination croisée est structurel, pas accidentel.",
      },
      {
        code: "TRAC-01",
        pourquoi:
          "La production est faite en avance pour absorber les pics de commandes. Les préparations intermédiaires portent une durée de vie décidée par vous, et sans date elles ne se situent plus dans le temps.",
      },
      {
        code: "FROID-01",
        pourquoi:
          "Le volume de préparations stockées est élevé par rapport à la surface froide disponible, dans des locaux souvent compacts. La surcharge des enceintes est le premier facteur de dérive constaté.",
      },
      {
        code: "PERS-02",
        pourquoi:
          "Le poste d'assemblage et d'emballage manipule des denrées prêtes à consommer, entre deux passages de livreurs. Un lave-mains accessible depuis ce poste est plus déterminant ici que dans une cuisine classique.",
      },
      {
        code: "LOC-01",
        pourquoi:
          "Beaucoup de dark kitchens s'installent dans des locaux qui n'étaient pas destinés à la restauration : sous-sols, boxes, anciens ateliers. L'aptitude au nettoyage des surfaces et la ventilation y sont les premiers sujets.",
      },
      {
        code: "PMS-01",
        pourquoi:
          "Sans salle, sans clientèle sur place et sans historique, le dossier sanitaire est ce qui décrit l'établissement. Un plan générique s'y remarque immédiatement, parce qu'il ne parle ni de marques multiples ni de livraison.",
      },
    ],
    sections: [
      {
        titre: "Une cuisine sans salle reste une cuisine",
        paragraphes: [
          "Le règlement (CE) n° 852/2004 du 29 avril 2004 s'applique à toutes les étapes de la production, de la transformation et de la distribution des denrées, sans considération du canal de vente. Une dark kitchen est donc tenue des mêmes règles générales d'hygiène de l'annexe II et des mêmes procédures fondées sur les principes HACCP que n'importe quel restaurant, au titre des articles 4 et 5.",
          "Ce qui change, c'est la manière dont cela se démontre. Il n'y a ni salle, ni vitrine, ni client sur place pour attester du fonctionnement. Restent le local, le matériel, les enregistrements et la cohérence entre ce que les cartes en ligne annoncent et ce qui sort réellement de la cuisine. C'est sur ce dernier point que la visite est la plus attentive.",
        ],
      },
      {
        titre: "Les allergènes en vente à distance",
        paragraphes: [
          "C'est le point le plus spécifique de l'activité, et le plus souvent découvert tardivement. Le règlement (UE) n° 1169/2011 du 25 octobre 2011, article 14, encadre la vente à distance : les mentions obligatoires, dont l'information sur les substances allergènes de son annexe II, doivent être disponibles avant la conclusion de l'achat. Autrement dit, avant que le client clique, pas au moment de la livraison.",
          "En pratique, cela veut dire que chaque fiche produit publiée sur chaque plateforme fait partie de votre information réglementaire. Une recette modifiée en cuisine sans mise à jour de la fiche crée un écart immédiat, et il est visible depuis l'extérieur, sans même entrer dans l'établissement. Une procédure qui lie tout changement de recette à la mise à jour des fiches est ici la première correction à mettre en place.",
        ],
      },
      {
        titre: "Plusieurs marques, une seule cuisine",
        paragraphes: [
          "Faire cohabiter trois ou quatre enseignes virtuelles dans une même cuisine est le modèle courant. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 9, inséré par le règlement (UE) 2021/382 du 3 mars 2021, prend une importance particulière dans cette configuration : un équipement ayant servi à une substance allergène ne peut être utilisé pour une denrée qui n'en contient pas sans avoir été nettoyé et contrôlé au moins pour vérifier l'absence de débris visibles.",
          "Le matériel dédié n'est pas imposé, c'est un moyen. L'ordonnancement des productions en est un autre. Ce qui est constaté, c'est l'absence de choix explicite : quand personne n'a décidé si l'on dédie ou si l'on séquence, chaque service improvise. Écrire ce choix, marque par marque, est une correction documentaire qui change immédiatement la pratique du poste.",
        ],
      },
      {
        titre: "Le temps entre la production et le client",
        paragraphes: [
          "Une dark kitchen produit en avance pour tenir la cadence des commandes, puis confie le repas à un livreur pour un trajet dont elle ne maîtrise ni la durée ni les conditions. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 5, impose que la chaîne du froid ne soit pas interrompue, et le point 3 la protection des denrées à toutes les étapes.",
          "Ce que l'audit cherche est simple : jusqu'où va votre maîtrise, et où commence celle du livreur. Un emballage qui ferme, une consigne de température au moment de la remise, une durée maximale d'attente au comptoir de retrait et une décision écrite sur ce qu'on fait d'une commande non récupérée constituent la réponse. Sans ces quatre éléments, la partie la plus risquée de votre activité n'est décrite nulle part.",
        ],
      },
      {
        titre: "Le local, souvent le vrai sujet",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, annexe II, chapitre II, point 1, demande des sols, des surfaces murales, des plafonds et des surfaces de travail bien entretenus, faciles à nettoyer et au besoin à désinfecter, en matériaux étanches, non absorbants, lavables et non toxiques, sauf à démontrer à l'autorité compétente que d'autres matériaux conviennent. Le chapitre I, point 2, ajoute l'exigence de prévenir l'encrassement, la condensation et les moisissures.",
          "Ces exigences deviennent sensibles dans des locaux qui n'ont pas été conçus pour la restauration. Ventilation insuffisante, condensation sur des murs peints, sol non raccordé aux plinthes, absence de vestiaire : ce sont les constats les plus fréquents. Ils demandent parfois une intervention, et ils sont identifiés comme tels dans le plan d'action, avec la priorité et la preuve à constituer.",
        ],
      },
      {
        titre: "Traçabilité : ce que vous devez pouvoir remonter",
        paragraphes: [
          "Le règlement (CE) n° 178/2002 du 28 janvier 2002, article 18, impose de pouvoir identifier toute personne vous ayant fourni une denrée et de mettre cette information à disposition des autorités à leur demande. L'obligation d'identifier les destinataires ne vise pas le consommateur final, ce qui allège votre charge côté aval, mais elle ne change rien à l'exigence côté amont, où tout se joue en cas de rappel.",
          "Concrètement, cela veut dire conserver les étiquettes et les numéros de lot des produits reçus, et pouvoir relier un lot à une journée de production. Aucune disposition ne fixe la durée de conservation de ces éléments : elle relève de votre plan de maîtrise sanitaire. Avec plusieurs marques, la bonne pratique consiste à tracer par production et non par enseigne, sans quoi le lien se perd.",
        ],
      },
      {
        titre: "Un plan de maîtrise sanitaire qui décrit vraiment votre cuisine",
        paragraphes: [
          "L'expression plan de maîtrise sanitaire n'appartient pas au règlement européen : son contenu type vient de l'annexe II de l'arrêté du 8 juin 2006, qui vise les établissements soumis à agrément. Une dark kitchen qui remet directement au consommateur final relève du commerce de détail et n'est pas soumise à agrément, mais elle reste pleinement tenue des articles 4 et 5 du règlement (CE) n° 852/2004.",
          "Le contenu compte donc plus que la forme, et c'est là que les dossiers achetés en ligne échouent. Aucun modèle générique ne parle de marques multiples, de fiches produit publiées sur des plateformes, de comptoir de retrait ni de délai de livraison. Ce sont pourtant vos points critiques, et ce sont eux qu'un agent cherchera à retrouver dans votre analyse des dangers.",
        ],
      },
      {
        titre: "Emballages et déchets",
        paragraphes: [
          "Les contenants de livraison sont des matériaux destinés à entrer en contact avec des denrées et relèvent du règlement (CE) n° 1935/2004 du 27 octobre 2004, dont l'article 3, paragraphe 1, impose qu'ils ne cèdent pas aux denrées des constituants susceptibles de présenter un danger pour la santé, de modifier leur composition de façon inacceptable ou d'altérer leurs caractères organoleptiques. Leur stockage propre et à l'abri fait partie de la visite.",
          "Le volume de déchets d'une dark kitchen est celui d'un point de vente rapide, sans la façade pour l'absorber. Le règlement (CE) n° 852/2004, annexe II, chapitre VI, impose de retirer les déchets aussi vite que possible des locaux où se trouvent des denrées, des conteneurs dotés d'une fermeture et faciles à nettoyer, et des aires de stockage tenues propres. La poubelle à pédale, elle, n'est pas une obligation.",
        ],
      },
    ],
    faq: [
      {
        question: "Dois-je publier les allergènes sur mes fiches de plateforme ?",
        reponse:
          "Oui, et avant la validation de la commande. Le règlement (UE) n° 1169/2011, article 14, encadre la vente à distance et impose que les mentions obligatoires, allergènes compris, soient disponibles avant la conclusion de l'achat. Votre fiche produit en ligne fait donc partie de votre information réglementaire, et elle doit être corrigée dès qu'une recette change en cuisine.",
      },
      {
        question: "Puis-je exploiter plusieurs marques dans la même cuisine ?",
        reponse:
          "Rien ne l'interdit. Ce que le règlement (CE) n° 852/2004 exige, à l'annexe II, chapitre IX, point 9, c'est qu'un équipement ayant servi à une substance allergène ne soit pas utilisé pour une denrée qui n'en contient pas sans nettoyage et contrôle de l'absence de débris visibles. Vous choisissez le moyen, matériel dédié ou ordonnancement des productions, mais ce choix doit être écrit et appliqué.",
      },
      {
        question: "Ma responsabilité s'arrête-t-elle quand le livreur part ?",
        reponse:
          "La question de la responsabilité juridique dépend des contrats et sort du champ d'un audit d'hygiène. Ce qui relève de votre maîtrise est en revanche clair : l'emballage, la température au moment de la remise, la durée d'attente au comptoir de retrait et le sort d'une commande non récupérée. Ces quatre points se décident et s'écrivent, et c'est ce que la visite regarde.",
      },
      {
        question: "Faut-il un plan de maîtrise sanitaire pour une dark kitchen ?",
        reponse:
          "Vous êtes tenu des articles 4 et 5 du règlement (CE) n° 852/2004 : règles générales d'hygiène et procédures permanentes fondées sur les principes HACCP, adaptées à la nature et à la taille de l'activité. L'expression plan de maîtrise sanitaire vient de l'arrêté du 8 juin 2006, qui vise les établissements soumis à agrément. Un dossier générique ne suffit pas : il doit décrire les marques, les plateformes et la livraison.",
      },
      {
        question: "Un local en sous-sol peut-il accueillir une cuisine de livraison ?",
        reponse:
          "Le règlement ne raisonne pas en étages mais en aptitude. Le chapitre II, point 1, de l'annexe II demande des surfaces faciles à nettoyer et au besoin à désinfecter, en matériaux étanches, non absorbants, lavables et non toxiques, et le chapitre I, point 2, impose de prévenir l'encrassement, la condensation et les moisissures. C'est sur ces critères, et sur la ventilation, que le local se juge.",
      },
      {
        question: "Combien de temps dois-je conserver les étiquettes de mes fournisseurs ?",
        reponse:
          "Aucune disposition ne fixe de durée chiffrée. Le règlement (CE) n° 178/2002, article 18, vous demande de pouvoir identifier vos fournisseurs et de fournir cette information aux autorités à leur demande, ce qui suppose de conserver étiquettes, bons et numéros de lot. La durée relève de votre plan de maîtrise sanitaire et se raisonne à partir de la durée de vie de vos productions.",
      },
    ],
    liens: [
      "/points-de-controle/information-allergenes-consommateur",
      "/points-de-controle/pms-documente-et-a-jour",
      "/points-de-controle/etat-et-entretien-des-locaux",
      "/themes/allergenes",
      "/themes/locaux-equipements",
      "/contact",
    ],
  },
  {
    slug: "food-truck",
    nom: "food truck",
    nomPluriel: "food trucks",
    titre: "Audit d'hygiène en food truck",
    titreSeo: "Audit hygiène food truck, Île-de-France",
    description:
      "Audit d'hygiène en food truck : le chapitre du règlement dédié aux locaux mobiles, eau embarquée, lavage des mains, froid en autonomie, base arrière et déchets.",
    reponse:
      "Un food truck relève d'un chapitre que le règlement (CE) n° 852/2004 a écrit pour lui : celui des locaux mobiles et provisoires, qui vise notamment les véhicules de vente ambulants. L'audit part de là, puis suit les contraintes propres au camion : l'eau embarquée et sa quantité, le lave-mains à bord, le froid tenu en autonomie, la base arrière et le trajet, le nettoyage avec peu d'eau, et la conservation des étiquettes quand les emballages restent au dépôt. Chaque écart repart avec sa priorité et le correctif attendu.",
    ouverture:
      "Beaucoup d'exploitants de camion croient travailler dans un vide réglementaire, ou au contraire sous des règles impossibles à tenir. Ni l'un ni l'autre : le règlement européen consacre un chapitre entier aux locaux mobiles, et il est plus praticable que ce qu'on imagine.",
    pointsSensibles: [
      {
        code: "EAU-01",
        pourquoi:
          "Tout dépend du réservoir. La quantité d'eau potable embarquée décide du nombre de lavages de mains, du rinçage du matériel et de la fin de service. C'est la contrainte qui commande toutes les autres à bord.",
      },
      {
        code: "PERS-02",
        pourquoi:
          "Un poste de camion enchaîne encaissement, cuisson et emballage sur deux mètres. Sans lave-mains alimenté en eau chaude et froide, approvisionné en savon et en essuie-mains, la coupure manuportée ne se fait pas.",
      },
      {
        code: "FROID-01",
        pourquoi:
          "Le froid fonctionne sur groupe électrogène ou sur branchement d'appoint, avec des coupures pendant les trajets et les installations. La dérive n'est visible que si quelqu'un mesure au moment du service.",
      },
      {
        code: "LOC-01",
        pourquoi:
          "Les surfaces d'un camion vibrent, chauffent et se déforment. Joints décollés, angles impossibles à atteindre et revêtements fatigués rendent le nettoyage inefficace bien avant qu'on s'en aperçoive.",
      },
      {
        code: "NETT-01",
        pourquoi:
          "Nettoyer à bord avec un volume d'eau compté suppose une méthode précise, qui n'a rien à voir avec celle d'une cuisine fixe. Un plan copié d'un restaurant ne décrit rien de ce qui se passe réellement.",
      },
      {
        code: "TRAC-02",
        pourquoi:
          "Les emballages sont souvent défaits au dépôt pour gagner de la place, et les étiquettes partent avec. Le lien entre ce qui est servi et ce qui a été acheté se coupe au chargement, pas en cuisine.",
      },
      {
        code: "DECH-01",
        pourquoi:
          "Un emplacement ne fournit pas toujours de point de collecte, et les déchets rentrent avec le camion. Leur stockage pendant le service, à proximité immédiate des denrées, est le constat le plus fréquent.",
      },
    ],
    sections: [
      {
        titre: "Le règlement a prévu les locaux mobiles",
        paragraphes: [
          "Le règlement (CE) n° 852/2004 du 29 avril 2004 consacre, à son annexe II, un chapitre aux locaux mobiles et provisoires, qui vise notamment les grandes tentes, les étals de marché et les véhicules de vente ambulants. Ce chapitre existe précisément parce qu'un camion ne peut pas satisfaire les exigences d'un local fixe, et il adapte les attentes sans les supprimer.",
          "Ce qu'il demande tient en quelques idées : des installations permettant de maintenir une hygiène personnelle adéquate, des surfaces et du matériel faciles à nettoyer et le cas échéant à désinfecter, de l'eau potable en quantité suffisante, un stockage protégé des denrées et l'évacuation hygiénique des déchets et des eaux usées. C'est la trame de la visite d'un food truck.",
        ],
      },
      {
        titre: "L'eau embarquée, la contrainte qui commande tout",
        paragraphes: [
          "Le chapitre VII de la même annexe pose la règle générale : l'alimentation en eau potable doit être en quantité suffisante, et la glace en contact avec les denrées doit être fabriquée à partir d'eau potable et manipulée dans des conditions prévenant toute contamination. Dans un camion, cette exigence devient arithmétique : un réservoir donné correspond à un nombre de gestes possibles.",
          "L'audit part donc du volume réel et le confronte au service. Combien de lavages de mains, combien de rinçages, quelle réserve pour la fin de service. Quand le compte ne tombe pas, la correction est rarement un nouveau camion : c'est un plan de rechargement en cours de journée, un changement de matériel de nettoyage, ou une préparation faite à la base plutôt qu'à bord.",
        ],
      },
      {
        titre: "Le lavage des mains à bord",
        paragraphes: [
          "Le chapitre VIII, point 1, de l'annexe II impose à toute personne travaillant dans une zone de manutention un niveau élevé de propreté personnelle et le port de tenues adaptées et propres. Le point 2 interdit à une personne atteinte d'une maladie transmissible par les aliments, de plaies infectées ou de lésions cutanées de manipuler des denrées. Ces règles ne connaissent pas d'exception pour les véhicules.",
          "Ce qui est constaté en visite tient à l'équipement du poste : un lave-mains alimenté en eau chaude et froide, avec savon et essuie-mains à usage unique, et surtout atteignable sans quitter le poste. Le gel hydroalcoolique ne remplace pas un lavage, il le complète. La commande non manuelle, elle, n'est pas une obligation en restauration : c'est une bonne pratique, particulièrement utile dans un espace exigu.",
        ],
      },
      {
        titre: "Tenir le froid en autonomie",
        paragraphes: [
          "L'arrêté du 21 décembre 2009, article 3 et annexe I, fixe les températures maximales des denrées réfrigérées et congelées d'origine animale et de celles qui en contiennent ; l'arrêté du 8 octobre 2013 traite les autres denrées. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 5, ajoute que la chaîne du froid ne doit pas être interrompue, ce qui vaut aussi pendant un trajet et pendant une installation.",
          "Le point sensible d'un camion n'est pas le groupe froid, c'est l'alimentation. Une coupure d'une heure entre le dépôt et l'emplacement ne se voit sur aucun produit. Un enregistreur autonome placé dans l'enceinte, relevé au début et à la fin du service, transforme ce trou noir en donnée. C'est la correction la moins coûteuse et la plus décisive de cette activité.",
        ],
      },
      {
        titre: "La base arrière et le trajet",
        paragraphes: [
          "La plupart des camions travaillent avec un local de préparation et de stockage. Ce local relève, lui, des règles générales de l'annexe II : locaux propres et en bon état, surfaces faciles à nettoyer, lavabos judicieusement situés, stockage protégé des denrées, gestion des déchets. C'est souvent la partie la moins regardée par l'exploitant, et la plus regardée en visite.",
          "Entre les deux, il y a le transport. L'annexe II du même règlement consacre un chapitre aux réceptacles de véhicules et aux conteneurs utilisés pour transporter des denrées : propres, en bon état, conçus pour permettre un nettoyage adéquat, et capables de maintenir la température appropriée lorsque c'est nécessaire. Charger des bacs à même le plancher, à côté du matériel de service, ne répond pas à cette exigence.",
        ],
      },
      {
        titre: "Nettoyer avec peu d'eau",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, annexe II, chapitre V, point 1 a), impose que les équipements en contact avec les denrées soient effectivement nettoyés et le cas échéant désinfectés à une fréquence suffisante pour éviter tout risque de contamination. Aucune fréquence n'est fixée par un texte, et aucun texte ne dit comment faire : c'est votre plan de nettoyage qui le décrit et le justifie.",
          "C'est justement là que les modèles génériques échouent. Un plan de nettoyage écrit pour une cuisine fixe suppose une plonge, un point d'eau chaude continu et un local de stockage des produits. Un plan de food truck décrit autre chose : ce qui se nettoie à bord, ce qui redescend à la base, ce qui se démonte le soir, et où sont rangés les produits d'entretien pour qu'ils ne côtoient jamais les denrées.",
        ],
      },
      {
        titre: "Ne pas perdre l'étiquette au chargement",
        paragraphes: [
          "Le règlement (CE) n° 178/2002 du 28 janvier 2002, article 18, impose de pouvoir identifier tout fournisseur et de mettre cette information à disposition des autorités à leur demande. Pour les denrées d'origine animale, le règlement d'exécution (UE) n° 931/2011 du 19 septembre 2011 précise les exigences applicables. Ces obligations ne s'allègent pas parce que le point de vente est mobile.",
          "La difficulté est purement pratique : pour gagner de la place, on décartonne au dépôt, et l'étiquette part avec le carton. Le geste qui règle ce point est de photographier ou de découper l'étiquette avant de jeter, et de la classer par date de service. Aucune disposition ne fixe la durée de conservation de ces éléments : elle relève de votre plan de maîtrise sanitaire.",
        ],
      },
      {
        titre: "Déchets, eaux usées et emplacement",
        paragraphes: [
          "Le chapitre VI de l'annexe II impose de retirer les déchets aussi vite que possible des locaux où se trouvent des denrées, de les déposer dans des conteneurs dotés d'une fermeture et faciles à nettoyer, et de prévoir des aires de stockage tenues propres. Sur un emplacement sans collecte, cela veut dire un contenant fermé à bord, séparé de la zone de manipulation, et une évacuation à chaque retour.",
          "Les eaux usées suivent la même logique : elles se stockent dans un réservoir dédié et se vident à la base, jamais sur l'emplacement. C'est un point que les organisateurs de marchés et d'événements regardent aussi, et l'avoir écrit dans votre dossier facilite autant les visites officielles que les demandes d'emplacement.",
        ],
      },
    ],
    faq: [
      {
        question: "Un food truck relève-t-il vraiment des mêmes règles qu'un restaurant ?",
        reponse:
          "Il relève du même règlement, le règlement (CE) n° 852/2004 du 29 avril 2004, mais d'un chapitre spécifique de son annexe II, consacré aux locaux mobiles et provisoires, qui vise notamment les véhicules de vente ambulants. Ce chapitre adapte les exigences à la réalité d'un camion sans les supprimer : hygiène personnelle, surfaces nettoyables, eau potable, protection des denrées et évacuation des déchets.",
      },
      {
        question: "Quelle quantité d'eau dois-je embarquer ?",
        reponse:
          "Aucun volume n'est chiffré par un texte. Le règlement demande une alimentation en eau potable en quantité suffisante, ce qui renvoie à votre activité réelle. L'audit fait le calcul avec vous : nombre de lavages de mains attendus, rinçages de matériel, réserve de fin de service. Quand le compte ne tombe pas, la solution passe le plus souvent par un rechargement prévu ou par une préparation faite à la base.",
      },
      {
        question: "Le gel hydroalcoolique remplace-t-il le lave-mains ?",
        reponse:
          "Non. Le règlement (CE) n° 852/2004 demande des installations permettant un lavage et un séchage hygiéniques des mains, avec de l'eau. Le gel est un complément utile entre deux lavages, notamment sur un poste exigu, mais il n'agit pas sur les salissures et ne remplace pas l'eau et le savon. Un lave-mains atteignable sans quitter le poste reste l'équipement attendu.",
      },
      {
        question: "Comment prouver que le froid a tenu pendant le trajet ?",
        reponse:
          "En le mesurant. Aucun texte n'impose un enregistreur, mais le règlement (CE) n° 852/2004, article 5, demande une surveillance efficace et des documents prouvant l'application effective des mesures, et l'annexe II, chapitre IX, point 5, interdit toute rupture de la chaîne du froid. Un enregistreur autonome dans l'enceinte, relevé au début et à la fin du service, répond aux deux exigences pour un coût minime.",
      },
      {
        question: "Où stocker mes produits d'entretien dans un camion ?",
        reponse:
          "Le règlement (CE) n° 852/2004, annexe II, chapitre I, point 10, interdit d'entreposer les produits de nettoyage et de désinfection dans les zones où les denrées sont manipulées, et le chapitre IX, point 8, impose que les substances dangereuses et non comestibles soient étiquetées et entreposées dans des conteneurs sûrs et séparés. Dans un camion, cela suppose un coffre dédié, fermé, hors de la zone de préparation.",
      },
      {
        question: "Que faire des déchets quand l'emplacement n'a pas de collecte ?",
        reponse:
          "Les conserver dans un conteneur fermé, facile à nettoyer, tenu à l'écart de la zone de manipulation, et les évacuer au retour à la base. C'est ce que demande le chapitre VI de l'annexe II du règlement (CE) n° 852/2004 : retrait rapide des locaux où se trouvent des denrées, conteneurs dotés d'une fermeture, aires de stockage propres. Les eaux usées suivent la même logique, avec un réservoir dédié vidé à la base.",
      },
    ],
    liens: [
      "/points-de-controle/potabilite-de-l-eau-entretien-machine-a-glacons",
      "/points-de-controle/lavage-des-mains-equipement-et-pratique",
      "/points-de-controle/etat-et-entretien-des-locaux",
      "/themes/eau-glace",
      "/themes/hygiene-du-personnel",
      "/contact",
    ],
  },
  {
    slug: "restauration-collective",
    nom: "établissement de restauration collective",
    nomPluriel: "établissements de restauration collective",
    titre: "Audit d'hygiène en restauration collective",
    titreSeo: "Audit hygiène restauration collective, Île-de-France",
    description:
      "Audit d'hygiène en restauration collective : la seule activité où l'annexe IV de l'arrêté du 21 décembre 2009 s'applique. Refroidissement, liaison, satellites.",
    reponse:
      "La restauration collective est la seule des activités que nous auditons pour laquelle l'annexe IV de l'arrêté du 21 décembre 2009 s'applique réellement, en vertu de son article 6. Ce qui est ailleurs une référence professionnelle devient ici une obligation : refroidissement de +63 °C à +10 °C en moins de deux heures, remise en température en une heure au plus avec un minimum de +63 °C. L'audit s'organise autour de ces valeurs, du transport vers les satellites, des plats témoins, des allergènes et des enregistrements.",
    ouverture:
      "Dans presque toutes les autres activités, notre travail consiste à expliquer que les seuils connus de tous ne sont pas opposables. Ici, c'est l'inverse : ils le sont. La restauration collective est le seul cas où ces valeurs sortent du plan de maîtrise sanitaire pour entrer dans un texte.",
    pointsSensibles: [
      {
        code: "TEMP-02",
        pourquoi:
          "Le refroidissement est ici encadré par une valeur opposable, et non par une référence à reprendre. C'est le point où l'écart se mesure au chronomètre, et où l'absence d'enregistrement suffit à faire le constat.",
      },
      {
        code: "TEMP-03",
        pourquoi:
          "La remise en température en satellite est le maillon le plus fragile de la liaison froide : matériel hétérogène, personnel non issu de la production, et une valeur d'arrivée qui doit être atteinte à chaque service.",
      },
      {
        code: "FROID-03",
        pourquoi:
          "Le dossier d'une cuisine collective se juge d'abord sur ses enregistrements. Un relevé manquant n'est pas une négligence de forme ici : c'est l'absence de preuve sur une obligation chiffrée.",
      },
      {
        code: "PMS-02",
        pourquoi:
          "Les autocontrôles portent sur des limites que le texte impose, ce qui rend leur périodicité et leur traçabilité plus exigeantes qu'ailleurs. Les points critiques ne sont pas au choix de l'exploitant.",
      },
      {
        code: "TRAC-02",
        pourquoi:
          "Les volumes sont importants, les marchés d'approvisionnement multiples, et un lot part souvent vers plusieurs sites. Sans reprise du numéro de lot par production, un retrait devient impossible à cibler.",
      },
      {
        code: "ALL-01",
        pourquoi:
          "Les convives sont souvent captifs et parfois vulnérables. L'information allergènes doit atteindre la personne qui sert et celle qui accompagne, pas seulement figurer dans un classeur de bureau.",
      },
      {
        code: "PERS-03",
        pourquoi:
          "Les équipes de satellites appliquent des procédures écrites ailleurs, souvent sans avoir participé à la production. L'encadrement et les instructions prennent ici plus d'importance que dans une cuisine unique.",
      },
    ],
    sections: [
      {
        titre: "La seule activité où l'annexe IV s'applique",
        paragraphes: [
          "L'arrêté du 21 décembre 2009 comporte une annexe IV consacrée aux traitements thermiques, et son article 6 en réserve l'application aux établissements de restauration collective. C'est une distinction que nous rappelons sur toutes nos autres pages, parce qu'elle est massivement ignorée. Ici, elle joue dans l'autre sens : ces dispositions vous concernent, et elles sont chiffrées.",
          "Le point 1 fixe le refroidissement, de +63 °C à +10 °C en moins de deux heures. Le point 3 fixe la remise en température, avec un délai maximal d'une heure entre +10 °C et la remise au consommateur, et une température minimale de +63 °C. L'annexe I du même arrêté fixe par ailleurs cette même valeur de +63 °C comme température minimale en liaison chaude pour les plats cuisinés ou repas livrés chauds.",
        ],
      },
      {
        titre: "Le refroidissement, obligation et non référence",
        paragraphes: [
          "La différence est pratique autant que juridique. Dans un restaurant commercial, un refroidissement de deux heures et demie ouvre une discussion sur la limite retenue au plan de maîtrise sanitaire. En collectivité, il constitue un dépassement d'une valeur fixée par un texte, et la discussion porte alors sur l'action corrective et sur le sort du produit.",
          "Ce qui est constaté en visite tient rarement à la cellule elle-même. Ce sont les bacs trop remplis, les pièces entières mises à refroidir sans être portionnées, les cellules chargées au delà de leur capacité et les sondes non recoupées. Ce sont des corrections d'organisation, sans dépense, et elles produisent un effet immédiat sur les courbes enregistrées.",
        ],
      },
      {
        titre: "Liaison chaude, liaison froide et satellites",
        paragraphes: [
          "Le règlement (CE) n° 852/2004 du 29 avril 2004 consacre un chapitre de son annexe II au transport : réceptacles de véhicules et conteneurs propres, en bon état, conçus pour permettre un nettoyage adéquat, et capables de maintenir les denrées à la température appropriée lorsque cela est nécessaire. C'est le socle sur lequel s'ajoutent les valeurs de l'arrêté du 21 décembre 2009.",
          "En satellite, la difficulté est humaine autant que technique. Le personnel qui remet en température n'a pas produit le plat, ne connaît pas toujours son historique et travaille avec un matériel qui n'est pas celui de la cuisine centrale. Une fiche par plat, indiquant la procédure de remise en température et la valeur à atteindre, vaut mieux qu'un protocole général affiché en cuisine centrale.",
        ],
      },
      {
        titre: "Cuisine centrale, agrément et dérogation",
        paragraphes: [
          "Une cuisine centrale qui livre des satellites ne remet pas directement au consommateur final. Elle sort donc du commerce de détail et peut relever de l'agrément sanitaire, au sens de l'article L. 233-2 du code rural et de la pêche maritime, ou d'une dérogation à l'obligation d'agrément selon la nature et le volume des cessions. C'est le premier point que l'audit vérifie, parce qu'il détermine tout le reste.",
          "Il détermine notamment le contenu attendu du dossier. L'annexe II de l'arrêté du 8 juin 2006 définit le contenu type du plan de maîtrise sanitaire pour les établissements soumis à agrément : bonnes pratiques d'hygiène, plan fondé sur les principes HACCP, traçabilité et gestion des non-conformités. Un établissement agréé qui présente un dossier de restaurant commercial est en écart avant même qu'on entre en cuisine.",
        ],
      },
      {
        titre: "Les plats témoins",
        paragraphes: [
          "La conservation de plats témoins est une exigence propre à la restauration collective, et c'est l'un des rares points sur lesquels votre secteur est plus contraint que la restauration commerciale. Un échantillon est prélevé par production servie, conservé au froid, identifié et daté, de sorte qu'il puisse être analysé si une suspicion apparaît après le service.",
          "Ce qui est constaté en visite porte moins sur le principe que sur la rigueur : prélèvements irréguliers les jours de forte activité, identification incomplète, conservation dans une enceinte partagée avec des denrées en service. La procédure, la durée retenue et le lieu de conservation se décrivent dans le plan de maîtrise sanitaire, et c'est ce document qui rend l'ensemble démontrable.",
        ],
      },
      {
        titre: "Des convives qui ne sont pas des clients ordinaires",
        paragraphes: [
          "Une crèche, un établissement scolaire, un établissement de santé ou un établissement pour personnes âgées accueillent des convives dont la sensibilité n'est pas celle d'une clientèle de restaurant. Aucun texte ne fixe une grille de seuils différente pour autant : ce qui change, c'est votre analyse des dangers, qui doit en tenir compte au titre de l'article 5 du règlement (CE) n° 852/2004.",
          "Concrètement, cela se traduit par des choix documentés : produits écartés de la carte, cuissons plus poussées sur certaines catégories, textures modifiées gérées comme des productions à part entière. Ce ne sont pas des obligations réglementaires, ce sont des décisions d'exploitant, et elles ont d'autant plus de poids en visite qu'elles sont écrites et justifiées.",
        ],
      },
      {
        titre: "Les allergènes en collectivité",
        paragraphes: [
          "Le règlement (UE) n° 1169/2011 du 25 octobre 2011, article 44, paragraphe 1, point a), maintient l'obligation d'informer sur les substances de son annexe II pour les denrées proposées non préemballées. Le décret n° 2015-447 du 17 avril 2015, aux articles R. 412-12 et R. 412-13 du code de la consommation, exige que l'information soit portée sur la denrée ou à proximité, sans incertitude sur celle à laquelle elle se rapporte.",
          "La chaîne d'information est ici plus longue qu'ailleurs : la cuisine centrale produit, le satellite sert, et parfois un tiers accompagne le convive. L'information doit franchir chacun de ces relais sans se perdre. Le second volet, la contamination croisée, relève du règlement (CE) n° 852/2004, annexe II, chapitre IX, point 9, inséré par le règlement (UE) 2021/382 du 3 mars 2021, qui impose le nettoyage et le contrôle de l'absence de débris visibles avant réemploi d'un équipement.",
        ],
      },
      {
        titre: "Les enregistrements, colonne vertébrale du dossier",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, article 5, paragraphe 2, points d) à g), impose une surveillance efficace des points critiques, des actions correctives quand la surveillance révèle qu'un point n'est pas maîtrisé, une vérification périodique et des documents prouvant l'application effective des mesures. Le paragraphe 4 ajoute que ces documents sont tenus à jour et conservés pendant une période appropriée.",
          "Aucune durée d'archivage n'est chiffrée par un texte, et c'est un point sur lequel beaucoup d'exploitants se trompent en citant une règle qui n'existe pas. La durée relève de votre plan de maîtrise sanitaire. Ce qui compte, en revanche, est que les enregistrements portent sur les limites que l'arrêté du 21 décembre 2009 vous impose, et pas seulement sur les températures d'enceintes.",
        ],
      },
    ],
    faq: [
      {
        question: "Le refroidissement en deux heures est-il obligatoire chez nous ?",
        reponse:
          "Oui. Le passage de +63 °C à +10 °C en moins de deux heures figure à l'annexe IV, point 1, de l'arrêté du 21 décembre 2009, et son article 6 en réserve l'application aux établissements de restauration collective. Contrairement à un restaurant commercial, vous ne fixez pas cette limite dans votre plan de maîtrise sanitaire : vous l'appliquez, vous la surveillez et vous l'enregistrez.",
      },
      {
        question: "Quelle valeur pour la remise en température en satellite ?",
        reponse:
          "L'annexe IV, point 3, du même arrêté fixe un délai maximal d'une heure entre +10 °C et la remise au consommateur, avec une température minimale de +63 °C. À ne pas confondre avec le maintien au chaud des plats cuisinés ou repas livrés chauds, fixé à +63 °C par l'annexe I du même arrêté, tableau de la liaison chaude. Les deux valeurs coexistent et ne visent pas la même opération.",
      },
      {
        question: "Notre cuisine centrale doit-elle être agréée ?",
        reponse:
          "Dès lors qu'elle livre des satellites, elle ne remet pas directement au consommateur final et sort du commerce de détail. La question de l'agrément sanitaire se pose alors, au sens de l'article L. 233-2 du code rural et de la pêche maritime, ou celle d'une dérogation à l'obligation d'agrément selon la nature et le volume des cessions. C'est le premier point que l'audit tranche, parce qu'il décide du contenu attendu du dossier.",
      },
      {
        question: "Combien de temps conserver les plats témoins ?",
        reponse:
          "La conservation de plats témoins est une exigence propre à la restauration collective. La durée retenue, le lieu de conservation et l'identification se décrivent dans votre plan de maîtrise sanitaire, qui doit pouvoir les justifier. Ce qui est constaté en visite porte le plus souvent sur la régularité des prélèvements les jours de forte activité, et sur l'identification incomplète des échantillons.",
      },
      {
        question: "Combien de temps devons-nous archiver nos relevés ?",
        reponse:
          "Aucune disposition ne fixe de durée chiffrée. Le règlement (CE) n° 852/2004, article 5, paragraphe 4, demande des documents tenus à jour et conservés pendant une période appropriée, ce qui renvoie à votre plan de maîtrise sanitaire. Invoquer devant un agent une durée réglementaire qui n'existe pas fragilise votre crédibilité sur le reste : mieux vaut assumer une durée choisie et l'écrire.",
      },
      {
        question: "Les convives sensibles imposent-ils des seuils différents ?",
        reponse:
          "Non, aucun texte ne fixe une grille de températures spécifique selon le public. Ce qui change, c'est votre analyse des dangers, que l'article 5 du règlement (CE) n° 852/2004 vous demande d'adapter à votre activité. Les décisions qui en découlent, produits écartés, cuissons renforcées, gestion des textures modifiées, sont des choix d'exploitant, et ils pèsent d'autant plus qu'ils sont écrits et justifiés.",
      },
    ],
    liens: [
      "/points-de-controle/refroidissement-rapide-maitrise",
      "/points-de-controle/remise-en-temperature-maitrisee",
      "/points-de-controle/releves-de-temperature-tenus-et-archives",
      "/themes/temperatures-cuisson",
      "/themes/plan-de-maitrise-sanitaire-pms",
      "/contact",
    ],
  },
  {
    slug: "sushi-et-poisson-cru",
    nom: "restaurant de sushis et de poisson cru",
    nomPluriel: "restaurants de sushis et de poisson cru",
    titre: "Audit d'hygiène pour les sushis et le poisson cru",
    titreSeo: "Audit hygiène sushi et poisson cru, Île-de-France",
    description:
      "Audit d'hygiène sushi et poisson cru : assainissement par congélation, réception et glace fondante, riz vinaigré, découpe dédiée, allergènes et traçabilité.",
    reponse:
      "Servir du poisson cru retire une étape : il n'y a pas de cuisson pour rattraper quoi que ce soit. L'audit se concentre donc sur ce qui remplace cette étape. L'assainissement par congélation des produits de la pêche destinés à être consommés crus relève du règlement (CE) n° 853/2004, annexe III, section VIII. Autour, les points qui pèsent sont la réception et la conservation sous glace fondante, le procédé d'acidification du riz, le matériel de découpe dédié, l'information allergènes et la traçabilité des lots.",
    ouverture:
      "Dans une cuisine ordinaire, la cuisson corrige beaucoup de choses. Ici, elle n'existe pas. Tout ce qui protège le convive se joue avant la découpe : à la réception, au froid, et dans un traitement de congélation dont peu de cartes précisent qu'il a bien eu lieu.",
    pointsSensibles: [
      {
        code: "FROID-01",
        pourquoi:
          "Les produits de la pêche relèvent de températures qui leur sont propres, proches de celles de la glace fondante. Une chambre froide réglée comme pour de la viande ne convient pas, et l'écart ne se voit pas sur le produit.",
      },
      {
        code: "FROID-02",
        pourquoi:
          "Le congélateur ne sert pas ici à stocker : il applique un traitement. Sa capacité à atteindre et à tenir la température requise conditionne l'efficacité de l'assainissement, pas seulement la conservation.",
      },
      {
        code: "PMS-01",
        pourquoi:
          "Le traitement d'assainissement est un point critique au sens propre. S'il n'est pas décrit, surveillé et enregistré dans le dossier, la maîtrise du danger parasitaire n'existe nulle part.",
      },
      {
        code: "TRAC-02",
        pourquoi:
          "Un lot de poisson doit pouvoir être relié à sa provenance et au traitement qu'il a subi. Sans conservation des étiquettes et des documents d'accompagnement, ce lien disparaît dès le premier filetage.",
      },
      {
        code: "STOCK-01",
        pourquoi:
          "Poisson cru, riz cuit et produits prêts à consommer se croisent sur un plan de travail court. Le riz vinaigré, manipulé à mains nues, est le produit le plus exposé de la carte.",
      },
      {
        code: "TRAC-01",
        pourquoi:
          "Un plateau assemblé le matin pour la vente à emporter porte une durée de vie que vous fixez seul, sur un produit sensible. Sans date et sans durée écrite, la décision ne se démontre pas.",
      },
      {
        code: "ALL-01",
        pourquoi:
          "Poisson, crustacés, mollusques, soja, sésame et gluten se retrouvent sur presque chaque ligne d'une carte japonaise, y compris dans les sauces d'accompagnement servies à part.",
      },
    ],
    sections: [
      {
        titre: "Un produit sans étape corrective",
        paragraphes: [
          "Le règlement (CE) n° 852/2004 du 29 avril 2004, annexe II, chapitre IX, point 3, impose de protéger les denrées contre toute contamination susceptible de les rendre impropres ou dangereuses, à toutes les étapes. Dans une cuisine où la cuisson n'intervient pas, cette exigence se déplace entièrement vers l'amont : la sélection du produit, la réception, le froid et le traitement appliqué avant la découpe.",
          "C'est ce qui rend l'audit de cette activité différent. Il y a moins de points chauds à contrôler et beaucoup plus d'attention portée à la chaîne d'arrivée. L'article 5 du même règlement prend ici tout son sens : il vous demande d'identifier vos points critiques, de fixer des limites, de les surveiller et d'enregistrer, et le danger parasitaire en est un.",
        ],
      },
      {
        titre: "L'assainissement par congélation",
        paragraphes: [
          "Le traitement d'assainissement des produits de la pêche destinés à être consommés crus relève du règlement (CE) n° 853/2004 du 29 avril 2004, annexe III, section VIII. Il repose sur une congélation à cœur, conduite à une température suffisamment basse et pendant une durée suffisamment longue pour détruire les parasites viables, les deux paramètres allant de pair : plus la température est basse, plus la durée requise est courte.",
          "Ce qui est constaté en visite ne porte presque jamais sur le principe, connu de tous les professionnels. Il porte sur la démonstration : quel équipement applique le traitement, comment la température à cœur est vérifiée, où la durée est notée, et comment un produit traité se distingue d'un produit qui ne l'est pas encore. Sans ces quatre réponses, le traitement existe peut-être, mais il ne se prouve pas.",
        ],
      },
      {
        titre: "Ce que le règlement 853/2004 change, et ce qu'il ne change pas",
        paragraphes: [
          "Une précision honnête s'impose. Le règlement (CE) n° 853/2004 fixe des règles spécifiques d'hygiène applicables aux denrées d'origine animale, et son article 1er, paragraphe 5, point a), exclut de son champ le commerce de détail. Un restaurant qui remet directement au consommateur final relève donc, en principe, du seul règlement (CE) n° 852/2004 et de ses règles générales.",
          "Cela ne vous dispense de rien. C'est bien le traitement décrit à l'annexe III, section VIII, du règlement (CE) n° 853/2004 qui constitue la référence attendue, et c'est lui que la DDPP cherchera dans votre plan de maîtrise sanitaire. La différence est de méthode : vous le reprenez comme mesure de maîtrise de votre danger parasitaire, au titre de l'article 5 du règlement (CE) n° 852/2004, et vous le justifiez.",
        ],
      },
      {
        titre: "La réception et la glace fondante",
        paragraphes: [
          "L'arrêté du 21 décembre 2009, article 3 et annexe I, fixe les températures maximales des denrées réfrigérées d'origine animale, mais il renvoie, pour les produits de la pêche, aux températures du règlement (CE) n° 853/2004. Ces produits ne se rangent donc pas sous la valeur qui s'applique aux autres denrées réfrigérées : ils relèvent d'un régime propre, voisin de la température de la glace fondante.",
          "En pratique, la visite regarde le moment de la livraison. L'état de la glace à l'arrivée, la présence des documents d'accompagnement, le transfert immédiat en enceinte dédiée et le refus assumé d'un lot douteux valent davantage que n'importe quel relevé pris trois heures plus tard. C'est le contrôle à réception qui protège un restaurant de poisson cru, et c'est souvent le moins formalisé.",
        ],
      },
      {
        titre: "Le riz vinaigré, un procédé à justifier",
        paragraphes: [
          "Le riz de sushi est un produit cuit, refroidi, acidifié et maintenu à température de travail pendant plusieurs heures. Aucun texte français ou européen ne fixe de valeur de pH ni de durée pour ce procédé. Cela ne le rend pas libre : le règlement (CE) n° 852/2004, article 5, vous demande de définir vos limites critiques, de les surveiller et de réagir quand elles ne sont pas atteintes.",
          "Ce qui est attendu est donc une description : quelle quantité de vinaigre pour quelle masse de riz, quelle valeur cible vous retenez, comment vous la vérifiez et pendant combien de temps le riz reste utilisable. Un exploitant qui présente ce raisonnement écrit tient un point que presque personne ne documente. Un exploitant qui répond que c'est la tradition ne tient rien du tout.",
        ],
      },
      {
        titre: "Découpe, planches et mains nues",
        paragraphes: [
          "Le règlement (CE) n° 852/2004, annexe II, chapitre V, point 1, exige que les équipements en contact avec les denrées soient nettoyés et le cas échéant désinfectés à une fréquence suffisante, construits et entretenus pour réduire au maximum les risques de contamination. Une planche entaillée ou une lame piquée ne se désinfectent plus, et sur du poisson cru la conséquence est directe.",
          "Le chapitre IX, points 3 et 5, impose par ailleurs de protéger les denrées et, pour les produits transformés, un entreposage séparé des matières premières et des produits transformés. Le matériel dédié au poisson cru n'est pas imposé en tant que tel, mais c'est le moyen le plus simple d'obtenir le résultat. Le travail à mains nues, courant sur le riz, appelle la même rigueur de lavage que n'importe quelle manipulation de produit prêt à consommer.",
        ],
      },
      {
        titre: "Les allergènes d'une carte japonaise",
        paragraphes: [
          "Poisson, crustacés, mollusques, soja, sésame, gluten et parfois arachide se retrouvent sur presque toutes les lignes d'une carte, y compris dans les sauces servies à part. Le règlement (UE) n° 1169/2011 du 25 octobre 2011, article 44, paragraphe 1, point a), maintient l'obligation d'informer sur les substances de son annexe II pour les denrées non préemballées, et le décret n° 2015-447 du 17 avril 2015 en précise les modalités en droit interne.",
          "La vente à emporter et la livraison ajoutent une exigence : l'article 14 du même règlement encadre la vente à distance et impose que les mentions obligatoires soient disponibles avant la conclusion de l'achat. Une carte en ligne incomplète crée un écart visible sans même entrer dans l'établissement, et c'est un point que l'audit vérifie depuis l'extérieur avant la visite.",
        ],
      },
      {
        titre: "Tracer, du lot au plateau",
        paragraphes: [
          "Le règlement (CE) n° 178/2002 du 28 janvier 2002, article 18, impose de pouvoir identifier tout fournisseur et de mettre cette information à disposition des autorités à leur demande. Pour les denrées d'origine animale, le règlement d'exécution (UE) n° 931/2011 du 19 septembre 2011 précise les exigences applicables. Sur du poisson, cette traçabilité est le seul outil disponible en cas d'alerte.",
          "La difficulté est la même qu'en boucherie : le lot vit sur l'emballage d'arrivée et disparaît au premier filetage. Conserver l'étiquette, la relier à une date de traitement et à une date de production, et apposer une date sur les plateaux assemblés reconstitue la chaîne. Aucune disposition ne fixe la durée de conservation de ces éléments : elle relève de votre plan de maîtrise sanitaire.",
        ],
      },
    ],
    faq: [
      {
        question: "Faut-il congeler le poisson destiné à être consommé cru ?",
        reponse:
          "Le traitement d'assainissement par congélation des produits de la pêche destinés à être consommés crus est prévu par le règlement (CE) n° 853/2004 du 29 avril 2004, annexe III, section VIII. Il repose sur un couple température et durée : plus la température atteinte à cœur est basse, plus la durée requise est courte. C'est la référence attendue dans votre plan de maîtrise sanitaire, et c'est elle qui sera recherchée en visite.",
      },
      {
        question: "Le règlement 853/2004 s'applique-t-il à un restaurant ?",
        reponse:
          "Son article 1er, paragraphe 5, point a), exclut le commerce de détail de son champ, et un restaurant qui remet directement au consommateur final en relève. Cela ne vous dispense pas du sujet : le traitement décrit à son annexe III, section VIII, reste la référence que vous reprenez comme mesure de maîtrise du danger parasitaire, au titre de l'article 5 du règlement (CE) n° 852/2004, et que vous devez justifier.",
      },
      {
        question: "Mon congélateur de cuisine suffit-il pour ce traitement ?",
        reponse:
          "La question n'est pas la marque de l'appareil, c'est sa capacité à atteindre et à tenir la température requise à cœur du produit, pendant toute la durée nécessaire, et votre capacité à le démontrer. Un congélateur de conservation n'a pas été conçu pour cela. L'audit regarde l'équipement, la mesure à cœur, l'enregistrement de la durée et la façon dont un produit traité se distingue d'un produit non traité.",
      },
      {
        question: "Existe-t-il un pH obligatoire pour le riz à sushi ?",
        reponse:
          "Aucun texte français ou européen ne fixe de valeur de pH ni de durée pour le riz vinaigré. Cela ne rend pas le procédé libre : le règlement (CE) n° 852/2004, article 5, vous demande de définir vos limites critiques, de les surveiller et de corriger les écarts. Ce qui est attendu est donc une procédure écrite, avec une valeur cible que vous retenez, une méthode de vérification et une durée d'utilisation du riz.",
      },
      {
        question: "À quelle température conserver le poisson frais ?",
        reponse:
          "Les produits de la pêche relèvent d'un régime propre : l'arrêté du 21 décembre 2009, annexe I, renvoie pour eux aux températures du règlement (CE) n° 853/2004, distinctes de celles des autres denrées réfrigérées et voisines de la température de la glace fondante. Une enceinte réglée comme pour de la viande ne convient donc pas, et c'est l'un des écarts les plus fréquents de cette activité.",
      },
      {
        question: "Dois-je dater les plateaux préparés pour la vente à emporter ?",
        reponse:
          "Aucun texte ne fixe la durée de vie d'un plateau que vous assemblez vous-même : elle découle de votre analyse des dangers et doit être écrite. Sur un produit aussi sensible, une date de fabrication apposée au moment de l'assemblage est le seul moyen de rendre cette décision démontrable. C'est un point documentaire, il ne coûte rien, et il se solde en quelques jours.",
      },
    ],
    liens: [
      "/points-de-controle/temperatures-des-enceintes-negatives-conformes",
      "/points-de-controle/conservation-des-etiquettes-n-de-lot",
      "/points-de-controle/pms-documente-et-a-jour",
      "/themes/chaine-du-froid",
      "/themes/tracabilite-dlc",
      "/contact",
    ],
  },
];
