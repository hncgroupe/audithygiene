/**
 * Lot B des dossiers de fond : le contrôle officiel, l'audit privé, le rapport,
 * les non-conformités, le classeur, l'ouverture, la reprise, les formats
 * mobiles et le suivi dans la durée.
 *
 * Règles appliquées (voir docs/BRIEF-REDACTION.md) :
 * - audit hygiène est un label privé indépendant, jamais une certification
 *   officielle ni un agrément d'État. La prestation s'arrête à la remise du
 *   rapport : l'exploitant applique ensuite les correctifs lui-même. On écrit
 *   « avec nous, vous savez exactement quoi corriger », et jamais l'issue d'un
 *   contrôle officiel. Aucun second passage, aucun suivi, aucune clôture.
 * - Aucun prix, aucune durée d'audit, aucune sanction chiffrée, aucune
 *   statistique de contrôle, aucun délai réglementaire inventé.
 * - Toute référence citée porte son numéro et sa date. Ce qui relève de la
 *   bonne pratique professionnelle est distingué de ce qu'un texte impose.
 * - La formation à l'hygiène alimentaire est hors périmètre : on rappelle
 *   l'obligation, on ne vend rien et on ne nomme aucun organisme.
 * - Aucun tiret cadratin ni demi-cadratin.
 */

import type { Dossier } from "./type";

export const DOSSIERS_B: Dossier[] = [
  {
    slug: "controle-sanitaire-restaurant-comment-ca-se-passe",
    titre: "Contrôle sanitaire en restaurant : comment ça se passe, du premier contact à la clôture",
    titreSeo: "Contrôle sanitaire restaurant : comment ça se passe",
    description: "Le déroulé complet d'un contrôle sanitaire en restaurant : arrivée de l'agent, parcours des locaux, examen des documents, entretien de clôture et suites.",
    reponse: "Une visite officielle commence presque toujours sans rendez-vous. L'agent se présente, décline son identité et l'objet de sa venue, puis un bref entretien d'ouverture désigne la personne qui l'accompagnera. Vient le parcours des locaux, suivi le plus souvent dans le sens du produit, de la réception à l'assiette, puis l'examen des documents qui prouvent que vos procédures vivent réellement. La visite se termine par un entretien de clôture où l'agent reprend ses constats. Le règlement (UE) 2017/625 du 15 mars 2017 prévoit qu'un compte rendu écrit est établi et qu'une copie vous revient. Rien ne se décide dans votre dos.",
    ouverture: "Un contrôle sanitaire n'est pas une sanction, c'est un acte de routine que l'administration exerce sur toutes les entreprises du secteur alimentaire. Savoir précisément comment il se déroule fait tomber l'essentiel de l'appréhension, et permet de recevoir l'agent en responsable plutôt qu'en accusé.",
    sections: [
      {
        titre: "Qui se présente chez vous, et à quel titre",
        paragraphes: [
          "Dans la plupart des départements, l'inspection sanitaire des établissements de restauration relève de la direction départementale en charge de la protection des populations, héritière des anciens services vétérinaires et des services de la concurrence et de la consommation. L'agent qui franchit votre porte est un agent public habilité à réaliser des contrôles officiels. Il porte une carte professionnelle et, selon les situations, un ordre de mission. Vous pouvez lire l'une et l'autre tranquillement, noter le nom et le service : cette vérification est normale et personne ne s'en formalise.",
          "Le cadre de son intervention est européen. Le règlement (UE) 2017/625 du 15 mars 2017 organise les contrôles officiels destinés à vérifier que la législation alimentaire est respectée. Son article 15 met à votre charge, en tant qu'exploitant, de donner accès aux locaux, aux équipements, aux moyens de transport, aux documents et aux systèmes d'information, et de prêter assistance à l'agent dans l'accomplissement de sa mission. Concrètement, on ouvre les portes, on montre les enceintes, on sort le classeur, on répond aux questions.",
          "Il faut entendre ce cadre pour ce qu'il est : une vérification de routine exercée sur toute la filière, du producteur au comptoir. La visite ne vise pas votre personne, elle vise la maîtrise du danger alimentaire dans un lieu donné, à un instant donné. Un restaurateur qui a compris cela reçoit l'agent comme un interlocuteur technique, ce qui change entièrement la tonalité de la journée."
        ]
      },
      {
        titre: "Pourquoi votre établissement est visité ce jour-là",
        paragraphes: [
          "L'article 9 du règlement (UE) 2017/625 pose que les contrôles officiels sont effectués régulièrement et selon une fréquence appropriée fondée sur les risques. Il énumère ce qui entre dans cette appréciation : les risques associés à l'activité et aux produits, les antécédents de l'opérateur au regard des contrôles antérieurs, la fiabilité de ses propres autocontrôles et les informations qui laisseraient penser à une non-conformité. Autrement dit, la sélection n'est ni aléatoire ni personnelle : elle est le produit d'une programmation.",
          "Trois autres portes d'entrée existent en pratique. Le signalement, qu'il vienne d'un client, d'un ancien salarié ou d'un professionnel de santé, oriente souvent la visite vers un point précis. Le suivi d'une inspection antérieure fait revenir un agent pour vérifier que les écarts relevés ont été traités. Enfin, des campagnes thématiques ou saisonnières ciblent une activité, un type de produit ou une période de forte affluence. Le motif exact vous est généralement indiqué à l'entretien d'ouverture, et rien ne vous interdit de le demander.",
          "Le même article 9 prévoit que les contrôles officiels sont réalisés sans préavis, sauf dans les cas où un préavis est nécessaire et dûment justifié. La visite inopinée est donc la règle, non une brimade. Elle a une conséquence pratique simple : la seule préparation qui tienne est celle qui se voit un mardi ordinaire à quinze heures, pas celle qu'on improvise quand on a été prévenu."
        ]
      },
      {
        titre: "L'arrivée et l'entretien d'ouverture",
        paragraphes: [
          "L'agent entre par la porte clients ou par la porte de service, demande le responsable présent et se présente. L'entretien d'ouverture prend quelques minutes et sert à cadrer la visite : quelles activités sont réellement exercées, quels volumes sortent par service, qui pilote l'hygiène au quotidien, qui tient les documents. Répondez simplement, sans anticiper la question suivante et sans réciter. Minimiser une activité que la cuisine trahira de toute façon est le plus mauvais départ possible.",
          "Désignez immédiatement la personne qui suivra la visite du début à la fin, en général vous-même ou le chef. Cette continuité vaut mieux qu'un relais improvisé au milieu du parcours : l'agent pose des questions qui s'enchaînent, et un interlocuteur unique évite les contradictions involontaires. Si vous n'êtes pas sur place, une consigne écrite d'une page dans le bureau, indiquant qui accompagne, où sont les documents et quel numéro composer, suffit à éviter les improvisations.",
          "Le service continue. Sauf demande contraire de l'agent, on ne ferme pas, on ne fait pas asseoir la brigade, on ne lance pas un nettoyage spectaculaire à son passage : le geste se remarque toujours et il attire précisément le regard là où vous ne le vouliez pas. La visite se déroule dans une cuisine qui travaille, et c'est très bien ainsi."
        ]
      },
      {
        titre: "Le parcours des locaux, dans le sens du produit",
        paragraphes: [
          "Le tour des locaux suit le plus souvent le circuit de la denrée : quai ou zone de réception, réserve sèche, enceintes froides, laboratoire ou zone de préparation, postes de cuisson, dressage, plonge, salle, sanitaires et vestiaires, local à déchets. Ce sens de parcours n'est pas une exigence de texte, c'est une méthode de vérification : elle permet de voir où le produit peut croiser ce qui le contamine. Le règlement (CE) n° 852/2004 du 29 avril 2004 formule cette exigence en termes de conception et d'agencement des locaux, à son annexe II, chapitre II, point 1.",
          "L'agent regarde l'état et l'entretien des surfaces, des sols, des murs, des plafonds, des joints, des siphons, des portes de chambre froide. Il ouvre les placards bas, il regarde derrière et sous les équipements, il passe la main sur le dessus des hottes. Les zones difficiles sont précisément celles qui renseignent sur la réalité d'un plan de nettoyage, parce que ce sont celles qu'on saute quand on manque de temps. Rien de tout cela n'est un piège : c'est le seul endroit où l'information est disponible.",
          "Le lavabo destiné au lavage des mains fait l'objet d'une attention constante. L'annexe II, chapitre I, point 4 du règlement (CE) n° 852/2004 impose un nombre suffisant de lavabos judicieusement situés, alimentés en eau chaude et froide, avec de quoi nettoyer et sécher les mains de façon hygiénique. Un lave-mains encombré de vaisselle ou dépourvu de savon se voit en trois secondes et pèse lourd, parce qu'il dit que le geste n'est pas possible."
        ],
        sous: [
          {
            titre: "Ce qui se joue dans la plonge et le local à déchets",
            texte: "Deux endroits concentrent beaucoup d'informations et sont pourtant les moins préparés. La plonge dit si la vaisselle sale et la vaisselle propre se croisent, si les produits sont adaptés et rangés hors des zones de manipulation, si l'égouttage est possible. Le local à déchets dit si les conteneurs sont dotés d'une fermeture, comme l'exige l'annexe II, chapitre VI, point 2 du règlement (CE) n° 852/2004, et si l'aire de stockage peut être tenue propre. Une poubelle à pédale relève de la bonne pratique, pas d'une obligation."
          }
        ]
      },
      {
        titre: "Les enceintes froides et les températures",
        paragraphes: [
          "L'agent ouvre les frigos et les congélateurs, compare l'affichage à une mesure réelle et regarde ce qu'il y a dedans : identification des produits, dates, produits entamés, séparation du cru et du cuit, propreté des clayettes et des joints. Le principe général figure à l'annexe II, chapitre IX, point 5 du règlement (CE) n° 852/2004 : les denrées susceptibles de favoriser la reproduction de micro-organismes pathogènes ne doivent pas être conservées à des températures pouvant entraîner un risque pour la santé, et la chaîne du froid ne doit pas être interrompue.",
          "Les valeurs chiffrées ne sont pas uniques. Elles dépendent de la denrée et viennent, pour les produits d'origine animale et les denrées en contenant, de l'arrêté du 21 décembre 2009 et, pour les autres, de l'arrêté du 8 octobre 2013. La cible souvent citée de 0 à +4 °C est une référence de travail commode, pas un seuil réglementaire universel : l'exploitant peut retenir une autre température s'il la justifie par un guide de bonnes pratiques d'hygiène ou par son analyse des dangers.",
          "Une enceinte hors seuil ne se règle pas par une explication. Ce qui se regarde, c'est ce que vous en avez fait : la mesure a-t-elle été relevée, l'écart a-t-il déclenché une action, les produits ont-ils été déplacés ou retirés, la panne a-t-elle été signalée. Une non-conformité détectée et traitée par vous, avec sa trace, se lit tout autrement qu'une non-conformité découverte par l'agent dans un système qui ne voyait rien."
        ]
      },
      {
        titre: "L'examen des documents",
        paragraphes: [
          "La partie documentaire vérifie que ce que vous décrivez existe réellement. L'article 5 du règlement (CE) n° 852/2004 impose de mettre en place, d'appliquer et de maintenir des procédures permanentes fondées sur les principes HACCP, avec des limites critiques, une surveillance, des actions correctives, une vérification et des documents prouvant l'application effective des mesures. Son paragraphe 4 précise que ces documents sont tenus à jour et conservés pendant une période appropriée.",
          "En pratique, l'agent demande d'abord les pièces qui parlent vite : les relevés de température, les preuves de nettoyage, les enregistrements de réception, les étiquettes et numéros de lot conservés, les rapports de passage de lutte contre les nuisibles, l'attestation de formation en hygiène alimentaire de la personne concernée et le document qui décrit vos procédures. La rapidité avec laquelle ces pièces arrivent en dit long, et chaque minute passée à chercher est une minute pendant laquelle l'agent regarde autre chose.",
          "Le terme de plan de maîtrise sanitaire n'appartient pas au règlement européen. Son contenu type vient de l'annexe II de l'arrêté du 8 juin 2006, qui vise les établissements soumis à agrément. Un restaurant qui remet directement au consommateur final n'y est pas soumis, mais il reste pleinement tenu des articles 4 et 5 du règlement (CE) n° 852/2004. Le document a donc une valeur pratique évidente, à condition de décrire votre cuisine et non un modèle acheté tel quel."
        ]
      },
      {
        titre: "Photographies, prélèvements, consignation",
        paragraphes: [
          "La prise de photographies fait partie des moyens ordinaires de constat. Elle fixe l'état d'un local, d'un équipement ou d'un lot au moment de la visite, et elle protège aussi bien l'agent que vous, puisqu'elle évite les descriptions contestables. Vous pouvez demander à savoir ce qui est photographié et pourquoi, et rien ne vous empêche de prendre vos propres clichés des mêmes points, ce qui est même une bonne habitude pour préparer la suite.",
          "Le prélèvement d'échantillons est prévu dans le cadre des contrôles officiels, avec analyse en laboratoire. Selon ce qui est constaté, des denrées peuvent être immobilisées en attendant un résultat ou une décision, ou faire l'objet d'un retrait. Demandez que les lots concernés soient identifiés précisément par écrit : quantité, dénomination, numéro de lot, dates. Cette précision vous servira ensuite, pour la gestion du stock comme pour la relation avec le fournisseur.",
          "Si un lot doit être retiré, la logique juridique est celle de l'article 19 du règlement (CE) n° 178/2002 du 28 janvier 2002 : l'exploitant qui considère qu'une denrée qu'il a mise sur le marché ne répond pas aux prescriptions de sécurité engage immédiatement les procédures de retrait et en informe les autorités. Faire soi-même ce geste, sans attendre qu'on vous le demande, est le signe le plus clair qu'un système fonctionne."
        ]
      },
      {
        titre: "L'entretien de clôture et le document écrit",
        paragraphes: [
          "La visite se termine par une reprise des constats. C'est le moment le plus utile de la journée et beaucoup de restaurateurs le laissent passer en silence. Écoutez chaque point, demandez à ce que soit précisé ce que vous n'avez pas compris, faites préciser un constat trop général. Si une explication factuelle manque, une porte de chambre froide en dégivrage programmé, un produit en décongélation contrôlée, des travaux en cours avec devis signé, donnez la maintenant : après, elle n'a plus le même poids.",
          "L'article 13 du règlement (UE) 2017/625 prévoit que l'autorité compétente établit un document écrit rendant compte de chaque contrôle officiel et qu'une copie est fournie à l'opérateur, notamment lorsqu'une non-conformité a été relevée. Vous repartez donc avec un écrit, ou vous savez qu'il vous parviendra. Lisez-le à froid le lendemain, point par point : la formulation exacte d'un constat détermine ce qu'il faut prouver pour le solder.",
          "Ne signez rien que vous ne comprenez pas et ne contestez rien à chaud. Une signature vaut le plus souvent prise de connaissance et non approbation, mais l'important est ailleurs : le désaccord se travaille par écrit, avec des pièces, dans les jours qui suivent. Une discussion vive à la clôture ne fait jamais changer un constat et laisse une impression durable."
        ]
      },
      {
        titre: "Ce qui peut être décidé à l'issue de la visite",
        paragraphes: [
          "Les suites appartiennent à l'administration. Le règlement (UE) 2017/625 prévoit à son article 138 que l'autorité compétente, lorsqu'une non-conformité est établie, prend les mesures appropriées pour que l'opérateur y remédie et en prévienne la réapparition. L'éventail va de la simple observation à des mesures plus contraignantes, et le choix relève de l'appréciation du service au regard de la nature du manquement, de son incidence sur la sécurité des denrées et des antécédents de l'établissement.",
          "La très grande majorité des visites se solde par des points à corriger, pas par une décision spectaculaire. Beaucoup d'écarts sont des habitudes prises faute de temps : un thermomètre non vérifié, un bac sans date d'ouverture, une étagère basse trop chargée, un cahier de relevés qui s'est arrêté un jeudi de coup de feu. Ils se traitent en quelques jours, souvent sans dépense, en remettant un geste à sa place et en le rendant visible pour toute l'équipe.",
          "Les résultats des contrôles sanitaires font l'objet d'une publication, dans le cadre de la transparence des contrôles officiels. Sur ce terrain, la seule stratégie qui tienne est de corriger vite et de pouvoir le prouver, puisque la mise à jour d'un résultat suit la vérification par le service, jamais la déclaration de l'exploitant."
        ]
      },
      {
        titre: "Les jours qui suivent : répondre, corriger, prouver",
        paragraphes: [
          "Reprenez l'écrit reçu et transformez chaque constat en une action datée avec un responsable nommé. Un constat porte toujours sur un fait vérifiable, donc la preuve du traitement est toujours possible : une photo avant et après, une facture d'intervention, un bon de passage, un relevé qui reprend, une fiche de nettoyage renseignée, une note de service affichée et signée par l'équipe. Rassemblez ces pièces dans un dossier unique plutôt que de les éparpiller.",
          "Répondez au service dans le délai qui vous a été indiqué, même si tout n'est pas terminé. Un courrier qui dit ce qui est fait, ce qui est engagé avec une date, et ce qui dépend d'un tiers avec le devis à l'appui, vaut infiniment mieux qu'un silence suivi d'une réponse parfaite trois semaines trop tard. La qualité du dialogue compte, parce qu'elle montre un exploitant qui pilote au lieu de subir.",
          "Traitez ensuite la cause, pas seulement le symptôme. Si un relevé s'est arrêté, la question n'est pas de le remplir rétroactivement, ce qu'il ne faut jamais faire, mais de comprendre pourquoi il ne tenait pas : trop de lignes, mauvais moment dans le service, personne clairement désignée, support mal placé. Un système qu'on allège tient, un système qu'on alourdit après un contrôle s'effondre au premier week-end chargé."
        ]
      },
      {
        titre: "Se préparer sans se mettre en scène",
        paragraphes: [
          "La préparation utile ne ressemble pas à un grand ménage. Elle consiste à rendre normal ce qui doit l'être : un classeur unique, à jour, rangé près de la cuisine, avec des intercalaires nets ; des enceintes dont l'affichage correspond à la réalité ; une identification lisible sur chaque bac ; un lave-mains toujours opérationnel ; des zones difficiles réellement nettoyées selon une fréquence que vous avez fixée et que vous tenez.",
          "Elle consiste ensuite à rendre l'équipe autonome. Une maison où seul le patron sait où sont les papiers reste fragile tous les jours où il n'est pas là. Expliquez le sens d'un relevé plutôt que le geste, faites tourner les responsabilités, vérifiez de temps en temps qu'un second sait ouvrir le dossier, montrer le dernier rapport nuisibles et retrouver l'étiquette d'un lot. C'est cette autonomie qui se voit pendant une visite inopinée.",
          "Elle consiste enfin à se regarder honnêtement. Faites le tour de votre propre cuisine avec les yeux de quelqu'un qui la découvre, en commençant par les endroits que vous évitez du regard. La liste des écarts que vous trouverez seul est presque toujours la même que celle qu'un tiers trouverait, à la différence près que vous pouvez la traiter avant que quiconque ne l'écrive."
        ]
      },
      {
        titre: "Ce qu'un regard extérieur apporte avant la visite",
        paragraphes: [
          "Un audit privé sur place reproduit la logique d'une inspection sans en avoir les conséquences. Un auditeur parcourt vos locaux, contrôle les vingt-sept points de notre grille répartis en douze thèmes, ouvre les enceintes, regarde les documents et remet un rapport écrit : une note, les constats point par point et un plan d'action classé par priorité, qui dit pour chaque écart le correctif attendu et la preuve à constituer. audit hygiène est un label privé indépendant, ni certification officielle, ni agrément d'État, ni contrôle des services vétérinaires.",
          "L'intérêt n'est pas de deviner ce qu'un agent verra, ce que personne ne peut promettre, mais de supprimer les écarts évidents pendant qu'ils ne coûtent encore rien. Un tiers voit ce que l'habitude a effacé : le joint noirci qu'on ne regarde plus, l'étagère qui a glissé sous le lave-mains, le bac de sauce sans date parce que le rouleau d'étiquettes est resté au bureau. Ce sont ces points, cumulés, qui pèsent lourd dans un compte rendu.",
          "Vous repartez avec la liste complète de ce qui est à reprendre et le correctif attendu pour chacun. La prestation s'arrête là : vous appliquez ensuite vous-même, à votre rythme et avec vos moyens, et la conformité vient quand la liste est traitée. L'issue d'une visite de l'État, elle, appartient aux services de l'État, et nous ne la promettons jamais. Le devis est établi avant intervention, après un échange de quelques minutes, depuis la page contact."
        ]
      }
    ],
    faq: [
      {
        question: "Le contrôle est-il annoncé à l'avance ?",
        reponse: "Non, dans la règle générale. L'article 9 du règlement (UE) 2017/625 du 15 mars 2017 prévoit que les contrôles officiels sont effectués sans préavis, sauf dans les cas où un préavis est nécessaire et dûment justifié. Une visite de suivi peut donc parfois être annoncée, mais l'inopiné reste le principe. La conséquence pratique est simple : la seule préparation efficace est celle qui tient un jour ordinaire, pas celle qu'on organise après un coup de téléphone."
      },
      {
        question: "Puis-je refuser l'entrée à l'agent ?",
        reponse: "Non. L'article 15 du règlement (UE) 2017/625 met à la charge de l'exploitant l'obligation de donner accès aux locaux, aux équipements, aux moyens de transport, aux documents et aux systèmes d'information, et de prêter assistance à l'agent. Un refus se retourne toujours contre l'établissement et transforme une visite de routine en incident. Ce que vous pouvez faire, en revanche, est demander à voir la carte professionnelle, noter le nom et le service, et demander que l'objet de la visite soit précisé."
      },
      {
        question: "Dois-je être présent pendant la visite ?",
        reponse: "Ce n'est pas indispensable pour que la visite ait lieu, mais c'est très souhaitable. Le responsable est le seul à pouvoir expliquer les choix d'organisation, localiser un document en quelques secondes et engager une correction immédiate devant l'agent. Si vous ne pouvez pas être là, désignez à l'avance un représentant par service, informé de ce qu'il doit faire et de l'endroit où tout se trouve. Une absence non préparée coûte du temps et des constats évitables."
      },
      {
        question: "Combien de temps dure un contrôle sanitaire ?",
        reponse: "Aucune durée standard n'existe et aucun barème public ne fixe le temps d'une inspection. La visite s'achève quand l'agent estime avoir vu ce qu'il devait voir. Quatre éléments pèsent réellement : la taille et la complexité des locaux, la nature des activités exercées, le nombre et la gravité des écarts découverts en chemin, et la rapidité avec laquelle les documents sont produits. Un établissement simple, propre et documenté se contrôle vite."
      },
      {
        question: "Que se passe-t-il si je ne retrouve pas un document sur le moment ?",
        reponse: "Dites-le franchement et proposez de le transmettre. Un document existant mais introuvable est noté comme indisponible au moment du contrôle, ce qui n'est pas la même chose qu'un document absent, à condition que vous l'envoyiez ensuite dans le délai indiqué. Ce qu'il ne faut jamais faire, c'est reconstituer après coup des relevés qui n'ont pas été tenus : l'écriture, l'encre et la régularité des lignes se voient, et la crédibilité perdue sur ce point contamine tout le reste du dossier."
      },
      {
        question: "L'agent peut-il photographier ma cuisine et emporter des échantillons ?",
        reponse: "Oui. La photographie est un moyen ordinaire de constat et le prélèvement d'échantillons est prévu dans le cadre des contrôles officiels, avec analyse en laboratoire. Selon ce qui est constaté, des denrées peuvent aussi être immobilisées en attendant un résultat ou une décision. Demandez que les lots concernés soient identifiés par écrit avec leur dénomination, leur quantité, leur numéro de lot et leurs dates : cette précision vous servira pour votre stock comme pour la relation avec le fournisseur."
      },
      {
        question: "Vais-je recevoir un document écrit à la fin ?",
        reponse: "Oui. L'article 13 du règlement (UE) 2017/625 prévoit que l'autorité compétente établit un document écrit rendant compte de chaque contrôle officiel et en fournit une copie à l'opérateur, notamment lorsqu'une non-conformité a été relevée. Relisez-le à froid le lendemain, constat par constat : la formulation exacte de chaque point détermine ce qu'il faudra prouver pour le solder. Classez-le avec les pièces de correction dans un dossier unique."
      },
      {
        question: "Un audit privé garantit-il un bon résultat au contrôle officiel ?",
        reponse: "Non, et personne ne peut sérieusement le promettre. L'issue d'une visite officielle appartient aux services de l'État et dépend de l'appréciation de l'agent au jour de son passage. Ce qu'un audit privé apporte est différent et immédiatement utilisable : un état des lieux écrit, une note, et un plan d'action classé par priorité qui dit pour chaque écart le correctif attendu et la preuve à constituer. Vous savez exactement quoi corriger, et la conformité vient quand vous avez traité la liste."
      }
    ],
    liens: [
      "/methode",
      "/points-de-controle",
      "/themes/plan-de-maitrise-sanitaire-pms",
      "/blog/controle-sanitaire-restaurant",
      "/blog/checklist-controle-sanitaire",
      "/contact"
    ]
  },
  {
    slug: "audit-blanc-avant-controle-sanitaire",
    titre: "L'audit blanc avant un contrôle sanitaire : ce qu'il apporte, ce qu'il ne remplace pas",
    titreSeo: "Audit blanc avant contrôle sanitaire : ce qu'il apporte",
    description: "Ce qu'est un audit blanc en restauration, comment il se déroule, ce qu'il change vraiment dans une cuisine, et la limite qu'il ne franchit jamais nulle part.",
    reponse: "Un audit blanc est une inspection privée conduite chez vous, avec la logique d'un contrôle officiel mais sans aucune de ses conséquences. Un auditeur parcourt les locaux, ouvre les enceintes, examine les documents, note chaque point d'une grille et remet un rapport écrit avec une note, les constats et un plan d'action classé par priorité, qui dit pour chaque écart le correctif attendu et la preuve à constituer. Ce qu'il apporte est un état des lieux honnête et une liste que vous pouvez appliquer seul. Ce qu'il ne remplace pas est le contrôle officiel lui-même : audit hygiène est un label privé indépendant, ni certification, ni agrément d'État.",
    ouverture: "Beaucoup de restaurateurs découvrent l'état réel de leur cuisine le jour où quelqu'un l'écrit. L'audit blanc sert exactement à cela : provoquer ce moment à un instant que vous choisissez, avec le temps de corriger derrière.",
    sections: [
      {
        titre: "Ce qu'un audit blanc est, exactement",
        paragraphes: [
          "Un audit blanc est une prestation privée : vous commandez à un tiers une inspection de votre établissement, conduite selon une grille écrite, et vous en recevez le résultat. L'auditeur se déplace, observe, mesure, ouvre, demande des documents, prend des photographies et note. Il ne vend rien pendant la visite, il ne répare rien, il ne décide rien à votre place. Il constate, il explique et il hiérarchise.",
          "La grille que nous utilisons compte vingt-sept points de contrôle répartis en douze thèmes, de la chaîne du froid à l'eau et la glace, en passant par les allergènes, la traçabilité, le personnel, le nettoyage, les nuisibles, les locaux, les déchets, le stockage et les procédures. Chaque point est rattaché à une base réglementaire vérifiée, et la distinction entre ce qu'un texte impose et ce qui relève de la bonne pratique professionnelle est faite explicitement dans le rapport.",
          "Le résultat n'est pas une impression, c'est un document. Une note globale, les constats point par point avec ce qui a été vu et pourquoi cela compte, les cas critiques identifiés comme tels, et un plan d'action qui range les corrections par ordre d'urgence. On peut le photocopier, l'afficher, le donner au chef, le transmettre à un bailleur ou à un franchiseur. C'est cette matérialité qui le rend utile."
        ]
      },
      {
        titre: "Pourquoi un regard extérieur voit ce que vous ne voyez plus",
        paragraphes: [
          "L'habitude est une forme d'aveuglement parfaitement normale. Quand on passe onze heures par jour dans un lieu, le cerveau cesse d'enregistrer ce qui ne bouge pas : le joint de la chambre froide qui a noirci progressivement, la caisse posée sous le lave-mains depuis six mois, le carrelage fendu derrière la friteuse. Ce ne sont pas des négligences, ce sont des éléments devenus invisibles parce qu'ils font partie du décor.",
          "Un auditeur arrive sans ce filtre. Il voit la cuisine comme un agent la verra, c'est-à-dire pour la première fois, et il regarde délibérément les endroits qu'on ne montre pas : le dessus des hottes, l'arrière des équipements sur roulettes, l'intérieur des placards bas, le fond du local à déchets, le vestiaire. La liste qu'il produit est presque toujours plus courte que ce que le restaurateur redoutait, et pas du tout composée des points qu'il anticipait.",
          "L'autre apport, moins attendu, tient à l'équipe. Un tiers qui explique pourquoi un geste compte est entendu différemment du patron qui le répète depuis deux ans. Une grande partie des écarts d'hygiène ne vient pas d'un refus mais d'une explication qui n'a jamais été donnée : personne n'a dit pourquoi la sonde se désinfecte entre deux produits, alors personne ne le fait."
        ]
      },
      {
        titre: "Comment se déroule la visite",
        paragraphes: [
          "L'auditeur arrive en tenue neutre et travaille en toute discrétion : le passage n'est pas annoncé à votre salle et rien ne signale à un client qu'une inspection est en cours. Un court échange d'ouverture précise vos activités réelles, vos volumes, votre organisation et vos points de préoccupation. C'est le moment de dire ce qui vous inquiète, parce que la visite peut y consacrer un temps particulier.",
          "Vient ensuite le parcours des locaux, suivi dans le sens du produit, avec mesures de température, ouverture des enceintes, examen des surfaces et des équipements, vérification des postes de lavage des mains, de la plonge, des vestiaires, des sanitaires et de la zone déchets. Chaque constat significatif est photographié, parce qu'une photo évite les discussions et sert de point de départ à la correction.",
          "La partie documentaire ferme la visite : procédures, relevés, preuves de nettoyage, traçabilité, information allergènes, attestation de formation en hygiène alimentaire présente à l'effectif, suivi des nuisibles. Un point de restitution orale a lieu avant le départ de l'auditeur, pour que rien ne vous surprenne à la lecture du rapport. Rien n'est transmis à qui que ce soit sans votre accord : la démarche est privée et vous en êtes le seul destinataire."
        ]
      },
      {
        titre: "Ce que l'audit blanc change réellement dans une cuisine",
        paragraphes: [
          "Le premier changement est un classement. Sans hiérarchie, une liste de vingt écarts paralyse : on ne sait pas par quoi commencer, donc on ne commence pas. Un plan d'action qui distingue ce qui touche directement la sécurité des denrées, ce qui pose un problème de preuve et ce qui relève de l'amélioration, transforme une angoisse diffuse en trois semaines de travail concret.",
          "Le deuxième est la disparition des écarts gratuits. Une part importante des constats ne coûte rien à corriger : dater les produits entamés, dégager le lave-mains, remettre du savon et des essuie-mains, ranger les produits d'entretien hors des zones de manipulation comme l'exige l'annexe II, chapitre I, point 10 du règlement (CE) n° 852/2004, séparer physiquement le cru et le cuit dans les enceintes. Ces points partent en une matinée et pèsent lourd dans n'importe quel compte rendu.",
          "Le troisième est la remise en route de la preuve. L'article 5, paragraphe 2, point g) du règlement (CE) n° 852/2004 impose d'établir des documents et des dossiers prouvant l'application effective des mesures. Un audit blanc montre presque toujours que la cuisine fait mieux que ce qu'elle prouve, et le travail consiste alors à alléger les supports jusqu'à ce qu'ils soient réellement tenus, pas à en ajouter."
        ],
        sous: [
          {
            titre: "La partie que vous seul pouvez faire",
            texte: "Un rapport qui reste dans un tiroir n'a servi à rien. Le plan d'action est écrit pour être appliqué sans nous : chaque ligne porte le correctif attendu et la preuve à constituer, en français courant. C'est vous qui traitez la liste, à votre rythme et avec vos moyens, et c'est ce travail-là qui transforme un diagnostic en cuisine conforme. Notre part s'arrête à la remise du rapport."
          }
        ]
      },
      {
        titre: "Ce qu'un audit blanc ne remplace pas",
        paragraphes: [
          "Il ne remplace pas le contrôle officiel. Une visite de l'administration est un acte de puissance publique exercé dans le cadre du règlement (UE) 2017/625 du 15 mars 2017 : elle peut donner lieu à des prélèvements, à des mesures prises au titre de son article 138 et à un compte rendu écrit versé au dossier de l'établissement. Un audit privé n'a aucune de ces conséquences et n'en dispense pas.",
          "Il ne remplace pas non plus vos obligations propres. Les articles 4 et 5 du règlement (CE) n° 852/2004 du 29 avril 2004 mettent la maîtrise sanitaire à la charge de l'exploitant, en continu, pas une fois par an. Un auditeur photographie un état à un instant donné ; ce sont vos procédures quotidiennes qui tiennent le reste de l'année. Personne ne peut sous-traiter la responsabilité, et aucun prestataire sérieux ne prétendra le contraire.",
          "Il ne remplace enfin ni la maintenance, ni la lutte contre les nuisibles, ni les analyses de laboratoire, ni la formation d'une personne de votre effectif. Ces sujets sont examinés pendant l'audit, mais ils relèvent d'autres intervenants. Un rapport qui ferait semblant de tout couvrir vous rendrait un mauvais service au moment où quelqu'un vérifierait."
        ]
      },
      {
        titre: "La limite juridique, écrite noir sur blanc",
        paragraphes: [
          "audit hygiène est un label privé indépendant. Ce n'est pas une certification officielle, ce n'est pas un agrément d'État, ce n'est pas un contrôle des services vétérinaires, et notre rapport n'a aucune valeur administrative. Nous l'écrivons dans le rapport lui-même, parce qu'un exploitant qui présenterait un document privé comme une pièce officielle se mettrait en difficulté devant un agent, et perdrait sa crédibilité sur tout le reste de la visite.",
          "Nous ne promettons jamais l'issue d'un contrôle officiel. Cette issue dépend de l'appréciation de l'agent au jour de son passage, de ce qu'il constate à ce moment-là et de la politique du service. Un prestataire qui vous garantit de passer un contrôle vend un engagement intenable, et cet engagement se retourne contre vous au premier écart constaté.",
          "Ce que nous promettons est autre chose, et c'est tenable parce que cela porte sur notre propre travail : avec nous, vous savez exactement quoi corriger. Vous repartez avec la liste complète de ce qui est à reprendre et le correctif attendu pour chacun, adossé à un référentiel construit sur les textes en vigueur. La conformité vient ensuite, quand vous avez traité la liste."
        ]
      },
      {
        titre: "Audit blanc, auto-audit et contrôle officiel : trois choses différentes",
        paragraphes: [
          "L'auto-audit est le tour que vous faites vous-même, avec une liste, à intervalles réguliers. Il ne coûte rien, il entretient l'attention de l'équipe et il attrape les dérives courantes. Sa limite est structurelle : on ne voit pas ce qu'on a cessé de voir, et personne ne se note sévèrement. Il reste indispensable, mais il ne suffit pas à établir un état des lieux crédible pour un tiers.",
          "L'audit blanc apporte l'extériorité, la méthode écrite et la preuve. Il produit un document opposable à personne mais lisible par tout le monde : un chef, un associé, un bailleur, un franchiseur, un assureur, un repreneur. Il transforme surtout une inquiétude diffuse en une liste finie, où chaque ligne dit ce qu'il faut faire et ce qu'il faudra pouvoir montrer.",
          "Le contrôle officiel, lui, ne se prépare pas au sens où on prépare un examen. Il constate un état ordinaire. La bonne question n'est donc pas de savoir comment avoir l'air conforme un jour donné, mais comment tenir une cuisine dont l'état ordinaire ne pose pas de question. Les trois démarches se complètent dans cet ordre, et aucune ne dispense des deux autres."
        ]
      },
      {
        titre: "À quel moment le déclencher",
        paragraphes: [
          "Le moment le plus utile est celui où quelque chose change. Une ouverture, une reprise de fonds, un changement de chef, un renouvellement large de l'équipe, une carte qui bascule vers des produits sensibles, l'ajout d'une activité de vente à emporter ou de livraison, un déménagement de laboratoire : chaque changement redistribue les flux et fabrique des angles morts que l'organisation précédente ne connaissait pas.",
          "Le deuxième moment est celui du doute persistant. Si vous vous surprenez à espérer qu'on ne vienne pas cette semaine, l'audit est déjà justifié. On peut appeler sans être irréprochable : c'est même le seul cas où l'appel sert à quelque chose. Un auditeur ne vient pas juger une maison, il vient dresser une liste et la rendre traitable.",
          "Le troisième est celui du suivi d'une visite officielle qui a laissé des points à corriger. Le rapport d'un tiers, avec ses photographies avant et après, constitue un dossier de preuve solide et ordonné à présenter le jour où le service revient vérifier. Là encore, la preuve appartient à l'exploitant et c'est lui qui doit la produire."
        ]
      },
      {
        titre: "Ce que vous recevez et ce que vous en faites",
        paragraphes: [
          "Le rapport contient une note globale, les constats point par point avec leur base, les cas critiques identifiés séparément, les photographies utiles et le plan d'action classé par priorité. Chaque ligne du plan porte une action formulée en verbe d'action, pas un reproche : remplacer, dégager, dater, réparer, réécrire, afficher, former en interne, contacter le prestataire.",
          "L'usage le plus efficace consiste à extraire le plan d'action, à mettre un nom et une date en face de chaque ligne, et à l'afficher dans le bureau ou l'économat. Les lignes qui ne coûtent rien se traitent dans la semaine. Celles qui dépendent d'un tiers, un frigoriste, un plombier, une entreprise de lutte contre les nuisibles, se déclenchent le jour même par un appel et un devis, parce que c'est le devis qui prouve l'engagement en attendant les travaux.",
          "Gardez enfin le rapport et vos preuves de correction ensemble. Le jour où un agent, un assureur ou un repreneur demande à voir comment vous pilotez l'hygiène, un dossier qui montre un état des lieux daté, un plan d'action et les pièces qui attestent que vous l'avez traité dit quelque chose qu'aucun discours ne dit."
        ]
      },
      {
        titre: "Les objections qu'on entend le plus souvent",
        paragraphes: [
          "« Je vais me faire descendre. » Non. Un rapport qui listerait tout sans hiérarchie serait inutilisable. Le travail de l'auditeur consiste précisément à séparer ce qui touche la sécurité des denrées de ce qui relève du confort, et à formuler chaque constat de façon traitable. Une équipe n'est jamais mise en cause : un geste à corriger l'est parce que personne ne l'a expliqué, pas parce que quelqu'un est fautif.",
          "« Je sais déjà ce qui ne va pas. » Souvent en partie, rarement en totalité, et presque jamais dans le bon ordre. L'expérience montre que la liste anticipée par le restaurateur et celle du rapport se recoupent à moitié. Le reste se partage entre des points qu'il croyait problématiques et qui ne le sont pas, et des points qu'il n'avait jamais regardés.",
          "« Je n'ai pas le temps. » L'audit se déroule pendant que la cuisine travaille et il ne demande pas d'arrêter le service. Ce qui prend du temps, ce sont les corrections, et elles en prendront de toute façon : la seule question est de savoir si elles se font à votre rythme ou dans l'urgence, après un courrier. Le devis est établi avant intervention, après un échange de quelques minutes, depuis la page contact."
        ]
      }
    ],
    faq: [
      {
        question: "L'audit blanc a-t-il une valeur officielle ?",
        reponse: "Non, et c'est écrit dans le rapport. audit hygiène est un label privé indépendant : ni certification officielle, ni agrément d'État, ni contrôle des services vétérinaires. Le rapport n'a aucune valeur administrative et ne remplace pas une visite de l'administration. Sa valeur est pratique : c'est un état des lieux écrit, daté, photographié et hiérarchisé, que vous pouvez utiliser pour corriger, pour piloter votre équipe et pour montrer à un tiers comment vous tenez le sujet."
      },
      {
        question: "Est-ce que cela me garantit de bien passer un contrôle officiel ?",
        reponse: "Non. L'issue d'un contrôle officiel appartient aux services de l'État et dépend de l'appréciation de l'agent au jour de son passage. Aucun prestataire ne peut promettre le contraire sans prendre un engagement intenable. Ce que la démarche apporte est différent : avec nous, vous savez exactement quoi corriger. Vous repartez avec la liste complète de ce qui est à reprendre et le correctif attendu pour chacun, et la conformité vient quand vous avez traité cette liste."
      },
      {
        question: "Mon équipe va-t-elle savoir qu'un audit a lieu ?",
        reponse: "C'est vous qui décidez. L'auditeur travaille en tenue neutre et en toute discrétion vis-à-vis de la salle et des clients. Beaucoup de restaurateurs préfèrent prévenir la brigade, parce que l'audit devient alors un moment pédagogique : l'auditeur explique pourquoi un geste compte, et cette parole extérieure est souvent mieux entendue qu'une consigne répétée. D'autres préfèrent un passage non annoncé pour voir la cuisine dans son état ordinaire. Les deux se pratiquent."
      },
      {
        question: "Faut-il fermer ou arrêter le service ?",
        reponse: "Non. L'audit se déroule pendant que la cuisine travaille, ce qui est d'ailleurs préférable : une cuisine à l'arrêt ne montre pas les flux, les croisements ni les gestes réels. L'auditeur s'organise pour ne pas gêner la production et adapte son parcours au rythme du service. Le seul temps qui vous est demandé est celui du court échange d'ouverture et de la restitution orale avant son départ."
      },
      {
        question: "Que se passe-t-il si le rapport est mauvais ?",
        reponse: "Il devient un plan de travail. Un rapport sévère n'est pas un jugement, c'est une liste, et une liste se traite. La plupart des écarts constatés en restauration sont des habitudes prises faute de temps, pas des fautes, et ils se corrigent en quelques jours sans dépense : dater les produits entamés, dégager un lave-mains, séparer le cru et le cuit, remettre en route un relevé. Les points lourds sont identifiés comme tels et traités en premier."
      },
      {
        question: "Faut-il un audit blanc avant l'ouverture d'un établissement ?",
        reponse: "C'est le moment où il rend le plus de services, parce que tout est encore modifiable à faible coût. Un plan de travail mal placé, un lave-mains oublié dans une zone de préparation ou un local à déchets sans point d'eau se corrigent pendant les travaux, presque jamais après. À l'ouverture, l'établissement doit déjà disposer de sa déclaration d'activité, de procédures écrites adaptées à sa cuisine et d'une personne formée à l'hygiène alimentaire dans son effectif."
      },
      {
        question: "Quelle différence avec un auto-audit fait par moi-même ?",
        reponse: "L'auto-audit reste indispensable et gratuit : il entretient l'attention de l'équipe et attrape les dérives courantes. Sa limite est qu'on ne voit pas ce qu'on a cessé de voir et que personne ne se note sévèrement. L'audit blanc apporte l'extériorité, une grille écrite, des mesures, des photographies, une note et un plan d'action où chaque ligne porte le correctif attendu et la preuve à constituer. Les deux se complètent, l'un ne dispense pas de l'autre."
      },
      {
        question: "À quelle fréquence faut-il le renouveler ?",
        reponse: "Il n'existe aucune obligation de faire auditer son établissement par un tiers : la fréquence relève de votre organisation. Ce qui se constate en revanche, c'est que la conformité retombe quand plus personne ne la mesure, en général au rythme des changements d'équipe et de carte. Un passage régulier, complété par des tours internes plus courts entre deux visites, tient mieux qu'un audit isolé suivi de deux ans de silence."
      }
    ],
    liens: [
      "/methode",
      "/points-de-controle",
      "/themes/plan-de-maitrise-sanitaire-pms",
      "/blog/audit-blanc-restaurant",
      "/blog/audit-prive-vs-controle-officiel",
      "/contact"
    ]
  },
  {
    slug: "comprendre-un-rapport-d-audit-hygiene",
    titre: "Comprendre un rapport d'audit hygiène : la note, les écarts, le plan d'action",
    titreSeo: "Comprendre un rapport d'audit hygiène : note et écarts",
    description: "Comment lire un rapport d'audit hygiène : d'où vient la note, ce qui sépare un écart mineur d'un écart majeur, et comment se servir du plan d'action reçu.",
    reponse: "Un rapport d'audit hygiène se lit dans un ordre précis. La note globale, exprimée sur 100, est une moyenne pondérée des points évalués : un point conforme compte pour la totalité de sa pondération, un écart mineur pour la moitié, un écart majeur pour rien, et les points non applicables sortent du calcul. Les écarts majeurs sont en outre listés à part, comme cas critiques, parce qu'ils ne se compensent pas par de bons résultats ailleurs. Viennent ensuite les scores par thème, qui montrent où se concentre le problème, puis le plan d'action, qui est la seule partie à imprimer.",
    ouverture: "Un rapport d'audit n'est pas un bulletin scolaire, c'est un outil de travail. Lu dans le bon ordre, il indique quoi faire lundi matin, dans quel ordre et avec quelle preuve à la clé.",
    sections: [
      {
        titre: "Par où commencer la lecture",
        paragraphes: [
          "Le réflexe naturel est de regarder la note et de s'arrêter là. C'est la lecture la moins utile. La note résume, elle ne dit pas quoi faire, et deux établissements avec la même note peuvent avoir des situations totalement différentes : l'un avec beaucoup de petits écarts documentaires, l'autre avec deux problèmes lourds sur la chaîne du froid.",
          "L'ordre de lecture qui fonctionne est le suivant : d'abord la liste des cas critiques, s'il y en a, parce qu'elle commande tout le reste ; ensuite les scores par thème, qui montrent où se concentre le travail ; ensuite seulement la note globale, qui devient alors interprétable ; enfin le plan d'action, ligne par ligne, avec un crayon. Le corps du rapport, point par point, se relit tranquillement le lendemain.",
          "Prenez cette lecture au calme, pas entre deux services. Un rapport se lit une première fois pour l'encaisser et une seconde fois pour le traiter. C'est la deuxième lecture qui produit quelque chose, parce qu'elle transforme des constats en lignes avec un nom et une date en face."
        ]
      },
      {
        titre: "D'où vient la note",
        paragraphes: [
          "La note ne sort pas d'une appréciation générale. Chaque point de contrôle de la grille reçoit une conformité et porte une pondération, c'est-à-dire un poids qui reflète son incidence sur la sécurité des denrées. Un point conforme rapporte la totalité de sa pondération, un écart mineur en rapporte la moitié, un écart majeur n'en rapporte rien. La note globale est la somme des points obtenus rapportée à la somme des points possibles, exprimée sur 100.",
          "Les points non applicables et les points non évalués sortent du calcul, dans les deux termes. Un établissement qui n'a pas de machine à glaçons n'est ni pénalisé ni avantagé sur ce point : il disparaît simplement du dénominateur. C'est ce qui permet de comparer un comptoir de dix mètres carrés et un restaurant avec laboratoire au sous-sol sans que la comparaison soit absurde.",
          "Cette mécanique est volontairement transparente et reproductible : deux auditeurs qui constatent la même chose produisent la même note. Elle a un corollaire important, qui déçoit parfois : on ne négocie pas une note, on négocie un constat. Si vous estimez qu'un point a été mal apprécié, c'est le constat qu'il faut discuter, avec un élément factuel à l'appui, et la note suivra mécaniquement."
        ]
      },
      {
        titre: "Écart mineur, écart majeur : la ligne de partage",
        paragraphes: [
          "Un écart mineur est un manquement qui n'expose pas directement le consommateur au moment du constat. Une fiche de nettoyage non renseignée alors que le nettoyage a bien eu lieu, un thermomètre dont la vérification n'est pas tracée, un produit entamé sans date d'ouverture dans une enceinte par ailleurs conforme, un affichage manquant : le danger est potentiel, la maîtrise existe mais elle n'est pas complète ou pas prouvée.",
          "Un écart majeur est un manquement qui peut mettre une denrée en cause dès maintenant. Une enceinte froide durablement hors seuil avec des produits sensibles dedans, une trace active de nuisibles dans une zone de manipulation, une contamination croisée constatée entre cru et cuit, une absence totale d'information sur les allergènes, de l'eau non potable au contact des denrées, un défaut de lavage des mains rendu impossible par l'installation. Ces points ne se compensent pas.",
          "C'est pour cela que les écarts majeurs sont listés à part, sous le nom de cas critiques. Un établissement peut afficher un score honorable et compter un cas critique : la lecture correcte est alors de traiter ce cas critique en premier, immédiatement, et de considérer le reste du rapport comme la suite du travail. La moyenne ne dit rien du danger, la liste des cas critiques dit tout."
        ],
        sous: [
          {
            titre: "Un mot sur le vocabulaire",
            texte: "Le vocabulaire d'un audit privé et celui d'un contrôle officiel ne se recouvrent pas. Un rapport de l'administration classe selon ses propres grilles et son propre barème, et la qualification d'un manquement y relève de l'appréciation de l'agent. Un écart majeur dans notre grille signale un point à traiter en priorité, il ne préjuge de rien quant à la qualification qu'un service retiendrait."
          }
        ]
      },
      {
        titre: "Les scores par thème, la carte du travail à faire",
        paragraphes: [
          "Chaque thème reçoit son propre score, calculé de la même façon sur les seuls points de ce thème. C'est cette vue qui rend le rapport actionnable. Un score global de 78 ne dit rien ; le même rapport qui affiche 95 sur les locaux, 90 sur le personnel et 40 sur la traçabilité dit exactement quoi faire : le problème n'est pas la cuisine, c'est le suivi des lots et des dates.",
          "Les profils se répètent d'un établissement à l'autre. Le profil documentaire, très fréquent, montre une cuisine tenue et des preuves absentes : la correction est rapide et ne coûte rien d'autre que de l'organisation. Le profil structurel montre l'inverse, des procédures écrites impeccables et des locaux fatigués : la correction demande du temps et parfois de l'investissement, et se planifie.",
          "Le profil le plus délicat est celui où tous les thèmes tournent autour de la même valeur moyenne. Il signale rarement un problème technique et presque toujours un problème d'attention : personne, dans la maison, n'a le sujet dans ses attributions. La correction passe alors par une répartition claire des responsabilités avant toute chose."
        ]
      },
      {
        titre: "Lire un constat point par point",
        paragraphes: [
          "Chaque point de contrôle est rendu de la même manière : ce qui a été observé, pourquoi ce point compte, et sur quoi il repose. Cette dernière ligne mérite votre attention, parce qu'elle distingue systématiquement ce qu'un texte impose de ce qui relève de la bonne pratique professionnelle. La différence n'est pas cosmétique : elle vous dit ce qui est négociable dans votre organisation et ce qui ne l'est pas.",
          "Beaucoup d'exigences réputées légales n'en sont pas. Le plan de nettoyage écrit, le contrat avec une entreprise de dératisation, la poubelle à commande non manuelle, la marche en avant comme notion juridique, la durée d'archivage des relevés : ce sont des moyens usuels de démontrer que vous respectez des obligations qui, elles, existent bel et bien. Vous pouvez en choisir d'autres, à condition de pouvoir les justifier.",
          "L'intérêt pratique est direct. Un exploitant qui invoque devant un agent une règle qui n'existe pas perd sa crédibilité sur tout le reste de la visite. Un exploitant qui sait dire « le texte impose que la chaîne du froid ne soit pas interrompue, et voici comment je le prouve chez moi » tient une position solide, même si son support n'est pas celui du voisin."
        ]
      },
      {
        titre: "Le plan d'action, la seule partie à imprimer",
        paragraphes: [
          "Le plan d'action reprend chaque écart sous forme d'action, classée par priorité. Il est écrit en verbes : remplacer, dégager, dater, réparer, réécrire, afficher, appeler. C'est volontaire. Un constat décrit un état, une action se coche. Un rapport dont on n'extrait pas le plan d'action reste une lecture ; un plan d'action affiché devient un chantier.",
          "Ajoutez deux colonnes que nous ne pouvons pas remplir à votre place : qui, et pour quand. Une action sans responsable nommé n'est faite par personne, et une action sans date est faite un jour. Mettez le plan dans le bureau ou l'économat, pas dans un tiroir, et cochez au fur et à mesure. Les lignes qui ne coûtent rien partent dans la semaine, et elles représentent souvent la moitié de la liste.",
          "Chaque ligne indique aussi la preuve à constituer, parce qu'une correction non tracée n'existe pas pour un tiers. Une photographie avant et après, une facture d'intervention, un bon de passage, un relevé qui reprend, une fiche renseignée, une note de service signée par l'équipe. Rassemblez ces pièces au fur et à mesure : le jour où un agent demande ce qui a été fait, elles répondent à votre place."
        ]
      },
      {
        titre: "Ce que le rapport ne dit pas",
        paragraphes: [
          "Il ne prédit pas le résultat d'un contrôle officiel. Une visite de l'administration constate un état à son propre jour de passage, avec ses propres grilles, et l'appréciation appartient à l'agent puis au service. Notre rapport photographie votre établissement à la date de l'audit, selon un référentiel privé. Le rapprochement des deux est utile, l'équivalence n'existe pas.",
          "Il n'a pas de valeur administrative. audit hygiène est un label privé indépendant, ni certification officielle, ni agrément d'État, ni contrôle des services vétérinaires. Présenter le rapport comme une pièce officielle serait une erreur ; le présenter comme la preuve d'une démarche volontaire de mise en conformité, avec son plan d'action et les pièces qui montrent ce que vous en avez fait, est parfaitement légitime et se comprend très bien.",
          "Il ne dit rien non plus de ce qui se passera la semaine suivante. Un audit mesure un instant. Ce sont vos procédures quotidiennes qui tiennent l'année, conformément aux articles 4 et 5 du règlement (CE) n° 852/2004 du 29 avril 2004, qui mettent la maîtrise sanitaire à la charge permanente de l'exploitant."
        ]
      },
      {
        titre: "Traiter la liste soi-même, sans dépendre de personne",
        paragraphes: [
          "Le rapport est écrit pour que vous puissiez l'appliquer seul. Chaque écart porte le correctif attendu en français courant et la preuve à constituer, pas une référence à déchiffrer. C'est volontaire : notre prestation s'arrête à la remise du rapport, nous ne repassons pas vérifier et nous ne faisons pas les travaux. Un rapport que l'exploitant ne pourrait pas appliquer sans nous serait un rapport raté.",
          "Organisez le traitement en trois vagues. Ce qui ne coûte rien part dans la semaine et représente souvent la moitié de la liste. Ce qui dépend d'un tiers se déclenche le jour même par un appel et un devis, parce que c'est le devis qui prouve l'engagement en attendant l'intervention. Ce qui relève de travaux se planifie, avec une date écrite plutôt qu'une intention.",
          "Cochez au fur et à mesure et classez la preuve en face de chaque ligne. Quand la liste est traitée, votre établissement est conforme au référentiel que nous avons contrôlé, et vous en détenez la démonstration. Cette conformité vient de votre travail, pas d'un tampon que nous viendrions poser."
        ]
      },
      {
        titre: "Se servir du rapport avec son équipe",
        paragraphes: [
          "Le rapport est un excellent support de brief, à condition de le présenter comme une liste et non comme un verdict. Les équipes ne sont pas en cause : un geste à corriger l'est parce que personne ne l'a expliqué, ou parce que l'organisation le rend difficile. Un lave-mains encombré n'est pas de la négligence, c'est un manque de place que personne n'a résolu.",
          "Prenez trois ou quatre points, expliquez pourquoi ils comptent, et faites choisir à l'équipe la façon de les tenir. Une consigne conçue par ceux qui l'appliquent survit aux semaines chargées ; une consigne imposée disparaît au premier coup de feu. Le rapport sert alors de point de départ neutre, ce qui désamorce la question de savoir qui a mal fait.",
          "Ressortez-le au changement d'équipe. Un rapport, son plan d'action et les preuves des corrections faites constituent le meilleur document d'accueil qui soit pour un nouveau chef ou un nouveau second : il montre où sont les fragilités connues de la maison et comment elles ont été traitées."
        ]
      },
      {
        titre: "Le rapport comme pièce de dossier",
        paragraphes: [
          "Un rapport d'audit daté, son plan d'action et les preuves des corrections engagées forment un ensemble lisible par des tiers qui ne connaissent rien à votre cuisine. Un franchiseur qui vérifie la tenue de son réseau, un bailleur, un assureur, un investisseur, un repreneur potentiel : tous cherchent la même chose, la preuve qu'un sujet est piloté plutôt que subi.",
          "Il joue aussi un rôle après une visite officielle qui a laissé des points à corriger. Constituer un dossier ordonné, avec l'écrit reçu, les actions engagées, les preuves et un état des lieux vérifié par un tiers, est la manière la plus claire de montrer au service ce qui a été fait. La preuve appartient à l'exploitant, et c'est à lui de la produire.",
          "Conservez enfin les rapports successifs. La comparaison d'un audit à l'autre est riche : elle montre ce qui tient et ce qui retombe. Les points qui reviennent d'une fois sur l'autre ne sont pas des points difficiles, ce sont des points dont personne n'a la charge. Le devis est établi avant intervention, après un échange de quelques minutes, depuis la page contact."
        ]
      }
    ],
    faq: [
      {
        question: "Quelle note faut-il viser ?",
        reponse: "La question la plus utile n'est pas le niveau de la note mais l'absence de cas critique. Un établissement sans écart majeur, dont les thèmes se tiennent dans une fourchette homogène, est dans une situation saine même si sa note n'est pas maximale. À l'inverse, une note élevée qui masque un cas critique appelle une réaction immédiate. Visez d'abord zéro cas critique, puis remontez les thèmes les plus faibles, dans cet ordre."
      },
      {
        question: "Un écart majeur signifie-t-il que mon établissement est dangereux ?",
        reponse: "Non. Il signifie qu'un point peut mettre une denrée en cause s'il n'est pas traité, et qu'il doit donc l'être en premier. La plupart des écarts majeurs relevés en restauration se corrigent vite : isoler et retirer les produits d'une enceinte défaillante, faire intervenir un frigoriste, déclencher un traitement contre les nuisibles, séparer physiquement deux flux, remettre en état un poste de lavage des mains. Ce qui compte est la rapidité de la réaction et sa trace."
      },
      {
        question: "Puis-je contester un constat du rapport ?",
        reponse: "Oui, et c'est même souhaitable si un élément factuel manquait. Un constat repose sur une observation datée et le plus souvent photographiée : si une enceinte était en dégivrage programmé, si un produit était en décongélation contrôlée, si des travaux étaient engagés avec un devis signé, dites-le et fournissez la pièce. Le constat est alors requalifié et la note suit mécaniquement. Ce qui ne se discute pas, c'est la note elle-même, qui n'est qu'un calcul."
      },
      {
        question: "Pourquoi certains points sont-ils marqués non applicables ?",
        reponse: "Parce qu'ils ne concernent pas votre activité. Un établissement sans machine à glaçons, sans enceinte négative ou sans zone de refroidissement rapide ne peut pas être évalué sur ces points. Ils sortent alors du calcul dans les deux termes, ce qui ne pénalise ni n'avantage l'établissement. C'est ce mécanisme qui permet de noter avec la même grille un comptoir de vente à emporter et un restaurant avec laboratoire, sans que la comparaison devienne absurde."
      },
      {
        question: "Le rapport est-il transmis à l'administration ?",
        reponse: "Non. La démarche est privée et vous en êtes le seul destinataire. Nous ne transmettons rien à un tiers sans votre accord écrit, y compris à un franchiseur ou à un bailleur. C'est vous qui décidez de montrer ou non le rapport, et à qui. Beaucoup de restaurateurs choisissent de le présenter spontanément lors d'une visite de suivi, pour montrer la démarche engagée, mais cette décision vous appartient entièrement."
      },
      {
        question: "Combien de temps pour traiter un plan d'action ?",
        reponse: "Cela dépend entièrement de la nature des lignes. Les écarts documentaires et d'organisation se traitent en général dans la semaine, sans dépense. Les lignes qui dépendent d'un tiers, frigoriste, plombier, entreprise de lutte contre les nuisibles, se déclenchent le jour même par un appel et un devis, et se soldent au rythme de l'intervenant. Les travaux se planifient. Ce qui compte n'est pas la vitesse absolue mais le fait que chaque ligne porte une date et un nom."
      },
      {
        question: "Faut-il refaire un audit tout de suite après les corrections ?",
        reponse: "Non. Le plan d'action est écrit pour être traité par vous, avec pour chaque écart le correctif attendu et la preuve à constituer : une fois la liste cochée et les pièces classées, le travail est fait. Un nouvel audit se justifie plus tard, dans une logique de mesure : il sert à savoir si la conformité tient dans la durée, généralement après un changement d'équipe, de carte ou d'organisation, pas à valider des corrections que vous avez déjà documentées."
      },
      {
        question: "Que veut dire « conforme » à la fin de la démarche ?",
        reponse: "Cela veut dire que les points de la grille sont tenus, au regard du référentiel privé que nous contrôlons, construit sur les textes en vigueur. La conformité vient quand vous avez traité la liste du plan d'action : elle est le produit de votre travail, pas d'un tampon. Cela ne veut pas dire que vous êtes certifié, agréé ou garanti conforme par l'État, et cela ne préjuge pas de l'issue d'une visite officielle, qui appartient aux services de l'État."
      }
    ],
    liens: [
      "/methode",
      "/points-de-controle",
      "/themes/tracabilite-dlc",
      "/blog/comprendre-rapport-audit-hygiene",
      "/blog/audit-blanc-restaurant",
      "/contact"
    ]
  },
  {
    slug: "non-conformite-majeure-que-faire",
    titre: "Non-conformité majeure : que faire, dans quel ordre, et comment le prouver",
    titreSeo: "Non-conformité majeure : que faire, dans quel ordre",
    description: "Une non-conformité majeure relevée dans votre restaurant : la marche à suivre pour sécuriser, traiter la cause, répondre par écrit et prouver la correction.",
    reponse: "Une non-conformité majeure se traite dans un ordre simple et toujours le même. On sécurise d'abord : on isole ou on retire les denrées concernées et on arrête la pratique en cause. On documente ensuite ce qu'on a fait, avec des photographies, des relevés et des pièces datées. On traite la cause, pas seulement le symptôme, en corrigeant l'organisation qui a permis l'écart. On répond enfin par écrit au service dans le délai indiqué, en disant ce qui est fait, ce qui est engagé et à quelle date. Un écart traité vite et prouvé ne se lit pas comme un écart subi.",
    ouverture: "Lire les mots « non-conformité majeure » sur un document fait toujours le même effet. La bonne nouvelle est que ces situations obéissent à une marche à suivre connue, et que la plupart se soldent en quelques jours quand on procède dans le bon ordre.",
    sections: [
      {
        titre: "D'abord, comprendre ce que le mot désigne",
        paragraphes: [
          "Une non-conformité majeure est un manquement qui peut mettre une denrée en cause dès à présent, par opposition à un écart mineur qui signale un défaut de maîtrise ou de preuve sans exposition immédiate. Les cas les plus fréquents se comptent sur les doigts d'une main : une enceinte froide durablement hors seuil avec des produits sensibles, une trace active de nuisibles en zone de manipulation, une contamination croisée entre cru et cuit, une absence d'information sur les allergènes, un poste de lavage des mains rendu inutilisable.",
          "Ce n'est pas un verdict sur votre maison. C'est la qualification d'un fait, à un instant donné, dans un lieu donné. Une cuisine tenue peut produire une non-conformité majeure un mardi de canicule parce qu'un condenseur s'est encrassé et que personne n'a regardé l'afficheur depuis trois jours. Ce qui distingue les établissements, ce n'est pas l'absence totale d'incident, c'est la vitesse et la qualité de la réaction.",
          "Il faut aussi entendre que le vocabulaire varie selon l'origine du document. Un rapport d'audit privé qualifie selon son propre référentiel. Un compte rendu de contrôle officiel qualifie selon les grilles de l'administration, et cette qualification relève de l'appréciation de l'agent puis du service. Les deux se recoupent souvent, ils ne sont pas équivalents."
        ]
      },
      {
        titre: "Les premières heures : sécuriser",
        paragraphes: [
          "La première action porte toujours sur les denrées. On identifie ce qui est concerné, on l'isole physiquement, on l'étiquette clairement comme non destiné à la vente, et on décide ensuite de son sort. Ne rien jeter précipitamment tant qu'un agent est sur place ou qu'une consignation est en cours : demandez ce qui est attendu. En dehors de ce cas, la décision vous appartient et le doute se tranche en faveur du retrait.",
          "La logique juridique est claire. L'article 14 du règlement (CE) n° 178/2002 du 28 janvier 2002 pose qu'aucune denrée dangereuse ne peut être mise sur le marché, et son article 19 prévoit que l'exploitant qui considère qu'une denrée qu'il a mise sur le marché ne répond pas aux prescriptions de sécurité engage immédiatement les procédures de retrait et en informe les autorités compétentes. Faire ce geste soi-même, sans attendre qu'on vous le demande, est le signal le plus fort qu'un système fonctionne.",
          "La deuxième action porte sur la pratique. Si le problème vient d'un flux, on l'arrête : on suspend une fabrication, on ferme temporairement un poste, on déplace une opération dans une autre zone, on retire un équipement du service. Ce sont des décisions qui coûtent sur le moment et qui protègent tout le reste. Un exploitant qui arrête lui-même une production tient une position que rien ne peut affaiblir."
        ],
        sous: [
          {
            titre: "Les trois réflexes à ne pas avoir",
            texte: "Ne reconstituez jamais des relevés qui n'ont pas été tenus : l'écriture et la régularité des lignes se voient, et la crédibilité perdue sur ce point contamine tout le dossier. Ne contestez pas à chaud : le désaccord se travaille par écrit, avec des pièces, dans les jours qui suivent. Ne cherchez pas un coupable dans l'équipe : un geste manquant l'est presque toujours parce que personne ne l'a expliqué ou parce que l'organisation le rendait impossible."
          }
        ]
      },
      {
        titre: "Documenter ce que vous venez de faire",
        paragraphes: [
          "Une correction non tracée n'existe pas pour un tiers. Photographiez l'état de départ si ce n'est pas déjà fait, puis l'état après intervention, avec un repère qui situe la photo dans votre cuisine. Notez la date et l'heure de chaque action, la quantité et l'identification des lots retirés, le nom de la personne qui a agi. Un simple compte rendu d'une page, écrit le jour même, vaut mieux qu'une reconstitution parfaite trois semaines plus tard.",
          "Cette exigence de preuve n'est pas une invention de prestataire. L'article 5, paragraphe 2, points e) et g) du règlement (CE) n° 852/2004 du 29 avril 2004 impose d'établir les actions correctives à mettre en œuvre lorsque la surveillance révèle qu'un point n'est pas maîtrisé, et d'établir des documents et des dossiers prouvant l'application effective des mesures. La trace de la correction fait donc partie du dispositif, elle n'est pas un supplément.",
          "Rassemblez ces pièces dans un dossier unique dédié à l'incident, pas éparpillées dans le classeur général. Le jour où quelqu'un demande ce qui a été fait, un dossier autonome qui raconte l'histoire dans l'ordre chronologique répond en deux minutes. Cette clarté matérielle produit un effet réel sur la façon dont l'affaire est lue."
        ]
      },
      {
        titre: "Traiter la cause, pas seulement le symptôme",
        paragraphes: [
          "La question à poser n'est jamais « qui a oublié » mais « pourquoi ce point n'a-t-il pas été vu ». Une enceinte hors seuil pendant trois jours signale rarement un frigo défaillant : elle signale que personne ne regardait l'afficheur, ou que le relevé était prévu à un moment du service où il est impossible à faire, ou que la personne chargée du relevé est partie sans que quelqu'un reprenne la mission.",
          "Reprenez la chaîne complète. Qui devait voir ? Avec quel support ? À quel moment ? Que se passait-il quand l'écart s'est produit ? Un support trop lourd n'est pas tenu, un support placé au mauvais endroit n'est pas rempli, une responsabilité partagée entre trois personnes n'est portée par personne. Dans presque tous les cas, la correction durable consiste à alléger et à nommer, pas à ajouter une procédure.",
          "Écrivez la nouvelle organisation en trois lignes et affichez-la. Qui fait quoi, quand, et quoi faire si la valeur relevée sort des clous. Cette dernière partie est celle qu'on oublie le plus : un relevé sans consigne d'action produit des cahiers remplis de chiffres que personne ne lit. Un relevé qui dit « au-dessus de tant, appeler le chef et déplacer les produits » produit une réaction."
        ]
      },
      {
        titre: "Répondre par écrit, et dans le délai indiqué",
        paragraphes: [
          "Si l'écart vient d'un contrôle officiel, vous avez reçu ou allez recevoir un document écrit : l'article 13 du règlement (UE) 2017/625 du 15 mars 2017 prévoit que l'autorité compétente établit un compte rendu de chaque contrôle officiel et en fournit copie à l'opérateur, notamment lorsqu'une non-conformité est relevée. Ce document est votre feuille de route : la formulation exacte de chaque constat détermine ce qu'il faut prouver.",
          "Répondez dans le délai qui vous a été indiqué, même si tout n'est pas terminé. Un courrier structuré, qui reprend chaque constat dans l'ordre du document reçu et dit ce qui est fait, ce qui est engagé avec une date, et ce qui dépend d'un tiers avec le devis à l'appui, vaut infiniment mieux qu'un silence suivi d'une réponse complète trop tard. Joignez les preuves, numérotées, et gardez une copie de l'envoi.",
          "Le ton compte autant que le contenu. On ne plaide pas, on ne se justifie pas longuement, on ne conteste pas la qualification. On expose des faits vérifiables et des actions datées. Un service qui lit un courrier de ce type comprend qu'il a affaire à un exploitant qui pilote, et cette impression pèse dans la suite du dossier, même si aucune décision ne se promet à l'avance."
        ]
      },
      {
        titre: "Ce que l'administration peut décider, et ce qui relève d'elle seule",
        paragraphes: [
          "L'article 138 du règlement (UE) 2017/625 prévoit que l'autorité compétente, lorsqu'une non-conformité est établie, prend les mesures appropriées pour que l'opérateur y remédie et en prévienne la réapparition. L'éventail est large et le choix appartient au service, au regard de la nature du manquement, de son incidence sur la sécurité des denrées et des antécédents de l'établissement. Personne d'extérieur ne peut annoncer par avance quelle mesure sera retenue.",
          "Ce que vous maîtrisez, en revanche, est entièrement de votre côté : la rapidité de la sécurisation, la qualité de la preuve, la clarté de la réponse et la solidité de la correction. Ces quatre éléments constituent la totalité de votre marge de manœuvre, et ils comptent. Un dossier où l'exploitant a réagi sur-le-champ, retiré les produits de lui-même et documenté chaque étape se lit très différemment d'un dossier où rien n'a bougé.",
          "Les résultats des contrôles font par ailleurs l'objet d'une publication, dans le cadre de la transparence des contrôles officiels. Sur ce terrain aussi, la seule stratégie qui tienne est de corriger vite et de pouvoir le prouver, puisque la mise à jour suit la vérification par le service et non la déclaration de l'exploitant."
        ]
      },
      {
        titre: "Les cas les plus fréquents et la marche à suivre",
        paragraphes: [
          "Une enceinte froide hors seuil : mesurer à cœur dans plusieurs produits, isoler et décider du sort des denrées sensibles, appeler le frigoriste le jour même, noter l'heure de la découverte, vérifier les autres enceintes, reprendre les relevés des jours précédents pour situer le début de la dérive et ajuster le support de relevé pour qu'il soit réellement tenu. Le principe applicable est celui de l'annexe II, chapitre IX, point 5 du règlement (CE) n° 852/2004 : la chaîne du froid ne doit pas être interrompue.",
          "Une trace active de nuisibles : retirer et détruire toute denrée souillée, qui est impropre à la consommation humaine, nettoyer et désinfecter la zone, appeler le prestataire pour une intervention et non un simple passage de routine, chercher et boucher le point d'entrée, revoir l'état des ouvertures et la gestion des déchets. Le règlement (CE) n° 852/2004 impose à son annexe II, chapitre IX, point 4, de mettre au point des méthodes adéquates de lutte, sans imposer telle ou telle formule contractuelle.",
          "Une contamination croisée constatée : arrêter l'opération, revoir la séparation dans les enceintes et sur les plans de travail, dédier ou désinfecter le matériel entre deux usages, réordonner la production dans le temps quand la place manque. Pour les allergènes, l'annexe II, chapitre IX, point 9 du règlement (CE) n° 852/2004, inséré par le règlement (UE) 2021/382 du 3 mars 2021, impose que les équipements ayant servi à un produit allergène ne servent pas à un produit qui n'en contient pas sans nettoyage et contrôle de l'absence de débris visibles."
        ]
      },
      {
        titre: "Préparer la visite de suivi de l'administration",
        paragraphes: [
          "Quand le service repasse, il vérifie une liste : celle des constats qu'il a lui-même écrits. Reprenez donc le document reçu et présentez vos preuves dans son ordre exact, constat par constat, pas dans l'ordre où les corrections ont été faites. Cette simple discipline de présentation change la fluidité de la visite et évite les malentendus sur ce qui a été traité.",
          "Préparez aussi la démonstration en cuisine, pas seulement le papier. Si le point portait sur le lavage des mains, montrez le poste opérationnel et faites faire le geste. Si le point portait sur l'identification des produits, ouvrez une enceinte au hasard plutôt que celle que vous avez préparée. Un exploitant qui invite à ouvrir n'importe quelle porte dit quelque chose qu'aucun classeur ne dit.",
          "Enfin, ne présentez que ce qui est vrai. Une correction annoncée mais non faite se découvre en trente secondes et coûte plus cher que l'écart d'origine. Un point encore ouvert, présenté comme tel avec son devis et sa date d'intervention, ne pose pas de difficulté particulière : il montre un exploitant qui sait où il en est."
        ]
      },
      {
        titre: "Éviter que cela recommence",
        paragraphes: [
          "Un écart majeur est presque toujours le point visible d'une organisation qui s'est relâchée sans que personne ne le remarque. Après le traitement, revenez sur les quelques routines qui font tenir une cuisine : un tour rapide chaque matin avec un regard sur les enceintes, une identification systématique de tout produit ouvert, un support de relevé court et placé au bon endroit, une consigne d'action écrite pour chaque valeur hors seuil.",
          "Répartissez ensuite explicitement les responsabilités. Une maison où seul le patron connaît le sujet reste fragile tous les jours où il n'est pas là. Nommez une personne par service, expliquez le sens des gestes plutôt que le geste lui-même, vérifiez de temps en temps qu'un second sait ouvrir le dossier et retrouver une étiquette de lot. Cette autonomie est ce qui empêche la rechute.",
          "Faites enfin regarder la maison par quelqu'un d'extérieur. Un audit sur place contrôle les vingt-sept points de notre grille et remet un rapport écrit avec sa note, ses cas critiques et un plan d'action classé par priorité, qui dit pour chaque écart le correctif attendu et la preuve à constituer. Vous savez alors exactement quoi corriger, et vous le faites vous-même, à votre rythme et avec vos moyens. audit hygiène est un label privé indépendant : nous ne promettons jamais l'issue d'une visite officielle, qui appartient aux services de l'État. Le devis est établi avant intervention, après un échange de quelques minutes, depuis la page contact."
        ]
      },
      {
        titre: "Garder la mesure",
        paragraphes: [
          "Une non-conformité majeure est un problème sérieux, ce n'est pas une catastrophe. Elle décrit un point précis, réparable, dans un établissement qui continue de fonctionner. La plupart des situations que nous rencontrons se soldent en quelques jours, souvent sans dépense, parce que le manquement tient à un flux mal organisé ou à un geste que personne n'avait expliqué.",
          "Ce qui aggrave réellement une situation, ce n'est pas l'écart d'origine, c'est la suite : le silence, la correction non prouvée, la reconstitution de documents, la répétition du même constat à la visite suivante. Chacune de ces réactions transforme un incident technique en question de fiabilité, et la seconde est beaucoup plus difficile à rattraper que la première.",
          "Parlez-en à votre équipe sans dramatiser. Une brigade qui comprend ce qui s'est passé et pourquoi tient la correction ; une brigade qui sent qu'on lui cache quelque chose applique une consigne trois semaines puis l'abandonne. C'est très souvent la conversation qui suit l'incident qui détermine si le point reviendra ou non."
        ]
      }
    ],
    faq: [
      {
        question: "Dois-je jeter les produits concernés tout de suite ?",
        reponse: "Isolez-les et étiquetez-les clairement comme non destinés à la vente avant toute autre chose. Si un agent est sur place ou si une consignation est en cours, ne détruisez rien sans demander ce qui est attendu, car les lots peuvent devoir être identifiés ou analysés. En dehors de ce cas, la décision vous appartient et le doute se tranche en faveur du retrait : l'article 14 du règlement (CE) n° 178/2002 du 28 janvier 2002 interdit la mise sur le marché d'une denrée dangereuse."
      },
      {
        question: "Puis-je continuer à servir pendant que je corrige ?",
        reponse: "Cela dépend entièrement de ce qui est en cause et, le cas échéant, de ce que l'administration a décidé. Si une mesure a été prise à votre égard, elle s'applique et il faut s'y conformer strictement. En dehors de cela, la règle de bon sens est de suspendre ce qui touche au point incriminé, une fabrication, un poste, un équipement, plutôt que d'arrêter l'ensemble. Un exploitant qui restreint lui-même son activité le temps de corriger tient une position solide."
      },
      {
        question: "Faut-il prévenir l'administration si je découvre le problème moi-même ?",
        reponse: "Oui dès lors qu'une denrée non conforme a pu être mise sur le marché : l'article 19 du règlement (CE) n° 178/2002 impose d'engager immédiatement les procédures de retrait et d'en informer les autorités compétentes. Pour un écart interne détecté et traité avant toute mise sur le marché, la démarche relève de vos procédures et de leur trace. Dans les deux cas, écrivez ce que vous avez constaté, ce que vous avez fait et à quelle heure."
      },
      {
        question: "Combien de temps ai-je pour me mettre en conformité ?",
        reponse: "Le délai est celui que le service vous indique dans le document que vous avez reçu, et il varie selon la nature du manquement. Aucun délai général ne peut être annoncé à l'avance, et méfiez-vous des chiffres qui circulent. Ce qui se pratique utilement est de traiter immédiatement ce qui touche la sécurité des denrées, sans attendre l'échéance, et de répondre par écrit dans le délai en distinguant ce qui est fait, ce qui est engagé et ce qui dépend d'un tiers."
      },
      {
        question: "Comment prouver que j'ai corrigé ?",
        reponse: "Par des pièces datées et vérifiables : photographies avant et après avec un repère qui les situe dans votre cuisine, facture ou rapport d'intervention d'un prestataire, bon de passage, relevés qui reprennent avec la nouvelle organisation, fiche de nettoyage renseignée, note de service affichée et signée par l'équipe, bon de retrait des lots. Rassemblez le tout dans un dossier autonome qui raconte l'incident dans l'ordre chronologique, et présentez-le dans l'ordre des constats reçus."
      },
      {
        question: "Mon équipe est-elle responsable de ce qui s'est passé ?",
        reponse: "L'obligation pèse sur l'exploitant : les articles 4 et 5 du règlement (CE) n° 852/2004 du 29 avril 2004 mettent la maîtrise sanitaire à la charge de l'entreprise du secteur alimentaire, c'est-à-dire de vous. Sur le fond, chercher un coupable dans la brigade ne corrige rien : un geste manquant l'est presque toujours parce que personne ne l'a expliqué, ou parce que l'organisation le rendait impossible à tenir. La correction utile porte sur le support et sur la répartition des responsabilités."
      },
      {
        question: "Un audit privé peut-il régler la situation à ma place ?",
        reponse: "Non, il ne se substitue ni à vos obligations ni à l'administration. Ce qu'il apporte est un état des lieux écrit et exploitable seul : les vingt-sept points de la grille contrôlés sur place, un rapport avec la note et les cas critiques, et un plan d'action classé par priorité qui dit pour chaque écart le correctif attendu et la preuve à constituer. Vous savez exactement quoi corriger et vous le faites avec vos propres moyens. Nous ne promettons jamais l'issue d'une visite officielle."
      },
      {
        question: "Le même constat peut-il revenir à la visite suivante ?",
        reponse: "C'est le scénario à éviter absolument, parce qu'il déplace la discussion du terrain technique vers celui de la fiabilité de l'exploitant. Un constat qui revient signale presque toujours qu'on a traité le symptôme sans toucher la cause : le support est trop lourd, il est prévu au mauvais moment du service, ou personne n'en a précisément la charge. Reprenez la chaîne complète, allégez, nommez une personne et écrivez la consigne d'action en trois lignes."
      }
    ],
    liens: [
      "/methode",
      "/points-de-controle/temperatures-des-enceintes-froides-positives-conformes",
      "/themes/lutte-contre-les-nuisibles",
      "/blog/cas-critique-non-conformite-majeure",
      "/blog/audit-hygiene-apres-controle",
      "/contact"
    ]
  },
  {
    slug: "preparer-son-classeur-sanitaire",
    titre: "Préparer son classeur sanitaire : les six documents demandés en premier",
    titreSeo: "Classeur sanitaire restaurant : les 6 documents à avoir",
    description: "Les six documents qu'on vous demande en premier en restauration, comment les tenir sans y passer ses soirées, et ce que le texte dit vraiment de l'archivage.",
    reponse: "Six documents partent en premier dans presque toutes les visites : le document qui décrit vos procédures, les relevés de température, les preuves de nettoyage, la traçabilité des lots avec les étiquettes et les bons de livraison, le suivi de la lutte contre les nuisibles et l'attestation de formation en hygiène alimentaire présente à l'effectif. Le règlement (CE) n° 852/2004 du 29 avril 2004 impose, à son article 5, d'établir des documents prouvant l'application effective des mesures, tenus à jour et conservés pendant une période appropriée. Aucune durée d'archivage chiffrée n'est fixée par le texte : c'est à vous de la définir et de la justifier.",
    ouverture: "Un classeur sanitaire n'a pas besoin d'être épais, il a besoin d'être vrai et d'être trouvable. Un dossier mince que tout le monde sait ouvrir vaut mieux qu'un classeur imposant que personne n'a rempli depuis six mois.",
    sections: [
      {
        titre: "Ce que le texte demande vraiment",
        paragraphes: [
          "L'obligation documentaire découle de l'article 5 du règlement (CE) n° 852/2004 du 29 avril 2004. Son paragraphe 2, point g), impose d'établir des documents et des dossiers, en fonction de la nature et de la taille de l'entreprise, pour prouver l'application effective des mesures. Son paragraphe 4 ajoute que ces documents sont tenus à jour à tout moment et conservés pendant une période appropriée, et qu'ils permettent à l'exploitant de démontrer sa conformité à l'autorité compétente.",
          "Deux mots méritent d'être lus lentement. « En fonction de la nature et de la taille de l'entreprise » : la loi n'attend pas d'un comptoir de dix mètres carrés le même volume documentaire que d'une brasserie avec laboratoire. « Prouver l'application effective » : ce qui est demandé n'est pas de posséder des documents, c'est de démontrer que ce que vous décrivez se passe réellement dans votre cuisine.",
          "L'expression « plan de maîtrise sanitaire » n'appartient pas au règlement européen. Son contenu type figure à l'annexe II de l'arrêté du 8 juin 2006, qui vise les établissements soumis à agrément sanitaire. Un restaurant qui remet directement au consommateur final relève du commerce de détail et n'y est pas soumis, mais il reste pleinement tenu des articles 4 et 5 du règlement (CE) n° 852/2004. Autrement dit, le classeur est utile et attendu, sa forme exacte n'est pas dictée par un texte."
        ]
      },
      {
        titre: "Le premier document : vos procédures écrites",
        paragraphes: [
          "C'est la pièce maîtresse et c'est aussi la plus souvent achetée telle quelle. Un document type acheté en ligne, où figurent des équipements que vous n'avez pas et des zones qui n'existent pas chez vous, se repère en une minute et se retourne contre vous : il prouve que vous n'avez pas fait le travail d'analyse que l'article 5 demande. Un document maison de quelques pages, qui décrit votre cuisine avec vos mots, tient infiniment mieux.",
          "Ce qu'il doit contenir tient en peu de choses : le plan de vos locaux avec les zones et le circuit des produits, la liste de vos activités réelles, les bonnes pratiques d'hygiène que vous appliquez sur le personnel, le nettoyage, les livraisons et le stockage, votre analyse des dangers avec les points que vous surveillez et les valeurs que vous vous fixez, ce que vous faites quand une valeur sort des clous, et comment vous gérez la traçabilité et le retrait d'un produit.",
          "Faites-le évoluer. Un changement de carte, l'ajout d'une activité de vente à emporter, l'installation d'une cellule de refroidissement ou d'une machine sous vide modifient votre analyse des dangers. Un document daté et révisé dit qu'il est vivant ; un document identique depuis quatre ans dit le contraire, quelle que soit sa qualité initiale."
        ]
      },
      {
        titre: "Le deuxième : les relevés de température",
        paragraphes: [
          "C'est le document le plus demandé, parce qu'il se vérifie en trois secondes. L'annexe II, chapitre I, point 2 d) du règlement (CE) n° 852/2004 exige des locaux permettant de maintenir les denrées à des températures appropriées qui puissent être vérifiées et, si nécessaire, enregistrées. La surveillance et l'enregistrement relèvent ensuite de l'article 5. Aucun texte ne fixe la fréquence des relevés : c'est votre analyse des dangers qui la détermine et qui doit pouvoir la justifier.",
          "Ce qui distingue un relevé utile d'un relevé décoratif, c'est la consigne d'action. Un tableau de chiffres sans instruction produit des cahiers que personne ne lit. Un support qui dit « au-dessus de telle valeur, prévenir le chef, déplacer les produits sensibles et appeler le frigoriste » produit une réaction, et cette réaction est exactement ce que la surveillance est censée déclencher au sens de l'article 5, paragraphe 2, points d) et e).",
          "Une valeur hors seuil qui apparaît dans votre cahier, suivie d'une action notée, n'est pas un aveu : c'est la démonstration que le système fonctionne. Ce qui inquiète un lecteur averti, c'est un relevé où toutes les valeurs sont identiques depuis six mois, parce qu'un frigo ne se comporte jamais ainsi. Ne lissez rien et ne remplissez jamais rétroactivement."
        ],
        sous: [
          {
            titre: "Papier ou numérique",
            texte: "Aucun texte n'impose l'un ou l'autre. Le papier a l'avantage d'être immédiatement disponible et compréhensible par tous ; le numérique, avec sondes enregistreuses, a celui d'être automatique et infalsifiable. Ce qui compte est que le support soit réellement tenu, accessible pendant une visite et lisible sans que vous soyez là. Un système numérique dont seul le patron a le mot de passe est un système indisponible."
          }
        ]
      },
      {
        titre: "Le troisième : les preuves de nettoyage",
        paragraphes: [
          "L'obligation de fond est claire : l'annexe II, chapitre V, point 1 a) du règlement (CE) n° 852/2004 impose que les articles, installations et équipements en contact avec les denrées soient effectivement nettoyés et, le cas échéant, désinfectés à une fréquence suffisante pour éviter tout risque de contamination, et le chapitre I, point 1 exige des locaux propres et en bon état d'entretien. Le résultat est donc imposé.",
          "En revanche, ni la forme d'un plan de nettoyage écrit, ni des fréquences chiffrées ne sont imposées par une disposition. Le plan de nettoyage est un outil, pas une obligation en tant que telle : il fixe les zones, les fréquences, les produits et les responsables, et c'est ce qui permet ensuite de prouver l'application effective au sens de l'article 5, paragraphe 2, point g). La distinction vaut la peine d'être connue, parce qu'elle vous rend libre du format.",
          "Le piège classique est la fiche trop ambitieuse. Un plan qui prévoit trente lignes quotidiennes est abandonné en deux semaines, et une fiche vide est pire qu'une fiche absente. Descendez au réaliste : ce qui se fait chaque jour, ce qui se fait chaque semaine, ce qui se fait chaque mois, avec des zones nommées comme votre équipe les nomme. Gardez aussi les fiches techniques et les fiches de données de sécurité des produits utilisés."
        ]
      },
      {
        titre: "Le quatrième : la traçabilité des lots",
        paragraphes: [
          "L'article 18 du règlement (CE) n° 178/2002 du 28 janvier 2002 impose que la traçabilité soit établie à toutes les étapes, et que l'exploitant soit en mesure d'identifier toute personne lui ayant fourni une denrée, avec des systèmes et des procédures permettant de mettre cette information à la disposition des autorités à leur demande. Pour les denrées d'origine animale, le règlement d'exécution (UE) n° 931/2011 du 19 septembre 2011 précise les informations à détenir.",
          "En pratique, cela veut dire savoir remonter d'un plat servi à un fournisseur. Les moyens usuels sont les bons de livraison classés par date, les factures, et surtout les étiquettes ou les numéros de lot des produits sensibles conservés le temps que le produit soit consommé, plus une marge. Une pochette par mois, agrafée aux bons de livraison correspondants, suffit dans la plupart des restaurants.",
          "Aucune disposition ne fixe de durée précise de conservation des étiquettes et des bons de livraison en restauration : cette durée relève de vos procédures, et vous devez pouvoir expliquer le raisonnement qui la fonde. Un raisonnement simple et défendable consiste à la caler sur la durée de vie des produits concernés augmentée d'une marge, avec une durée plus longue pour les produits les plus sensibles."
        ]
      },
      {
        titre: "Le cinquième : le suivi de la lutte contre les nuisibles",
        paragraphes: [
          "L'annexe II, chapitre IX, point 4 du règlement (CE) n° 852/2004 impose de mettre au point des méthodes adéquates pour lutter contre les organismes nuisibles, et le chapitre I, point 2 c) demande des locaux permettant de prévenir la contamination et notamment de lutter contre ces organismes. C'est une obligation de résultat exprimée en termes de méthode : la présence de nuisibles dans une zone de manipulation est un manquement, quel que soit le dispositif en place.",
          "Le contrat avec une entreprise spécialisée, le plan des appâts et les rapports de passage ne sont imposés par aucune disposition. Ce sont les moyens usuels de démontrer que des méthodes adéquates existent, et ils ont le mérite d'être immédiatement lisibles par un tiers. Rien ne vous interdit d'organiser autrement la surveillance, à condition de pouvoir la décrire et de garder la trace des vérifications et des actions engagées.",
          "Ce qui est regardé, au-delà du contrat, c'est la suite donnée aux observations. Un rapport de passage qui signale une activité et qui n'est suivi d'aucune action pèse plus lourd que l'absence de contrat. Classez donc ensemble le plan, les rapports successifs et ce que vous avez fait après chacun : bouchage d'un point d'entrée, réparation d'un bas de porte, changement de gestion des déchets."
        ]
      },
      {
        titre: "Le sixième : l'attestation de formation en hygiène alimentaire",
        paragraphes: [
          "L'annexe II, chapitre XII du règlement (CE) n° 852/2004 impose que les manutentionnaires de denrées soient encadrés et disposent d'instructions ou d'une formation en hygiène alimentaire adaptée à leur activité, et que les personnes responsables de la procédure fondée sur les principes HACCP aient reçu une formation appropriée. En droit français, la restauration commerciale doit en outre compter au moins une personne justifiant d'une formation spécifique.",
          "Cette obligation figure à l'article L. 233-4 du code rural et de la pêche maritime, précisé par les articles D. 233-11 et D. 233-12 issus du décret n° 2011-731 du 24 juin 2011. Le cahier des charges de cette formation est fixé par l'arrêté du 12 février 2024, qui a remplacé l'arrêté du 5 octobre 2011. Une expérience professionnelle d'au moins trois ans dans une entreprise du secteur alimentaire comme gestionnaire ou exploitant vaut satisfaction de cette obligation.",
          "Ce qui est demandé en visite, c'est la pièce : l'attestation nominative, ou l'élément qui établit l'expérience équivalente. Rangez-en une copie dans le classeur, avec les éléments qui montrent que le reste de l'équipe a bien été instruit, ce qui peut prendre la forme de notes de service, de fiches de poste ou d'émargements de briefs internes. Nous n'intervenons pas sur le champ de la formation, qui relève d'autres acteurs."
        ]
      },
      {
        titre: "Le septième qu'on oublie : l'information allergènes",
        paragraphes: [
          "Ce n'est pas un document du classeur au sens habituel, mais c'est une pièce demandée et souvent absente. L'article 9, paragraphe 1, point c) du règlement (UE) n° 1169/2011 du 25 octobre 2011 rend obligatoire la mention de tout ingrédient ou auxiliaire technologique figurant à son annexe II et provoquant des allergies ou des intolérances, et son article 44, paragraphe 1, point a) maintient cette obligation pour les denrées proposées non préemballées.",
          "En droit interne, le décret n° 2015-447 du 17 avril 2015, codifié aux articles R. 412-12 et R. 412-13 du code de la consommation, impose une information portée sur la denrée elle-même ou à proximité, de façon qu'il n'existe aucune incertitude quant à la denrée à laquelle elle se rapporte. Une réponse orale du serveur, seule, ne remplit pas cette exigence, même si elle est exacte.",
          "Le support pratique est un tableau à jour croisant vos plats et les substances de l'annexe II, tenu à partir des étiquettes de vos fournisseurs et mis à jour à chaque changement de recette ou de référence. Gardez la trace de la source : c'est elle qui permet de justifier la réponse le jour où quelqu'un la vérifie."
        ]
      },
      {
        titre: "Combien de temps garder tout cela",
        paragraphes: [
          "C'est la question sur laquelle circulent le plus de fausses certitudes. Le texte dit que les documents sont conservés pendant une période appropriée, à l'article 5, paragraphe 4, point c) du règlement (CE) n° 852/2004. Il ne dit pas douze mois, il ne dit pas trois ans, il ne fixe aucun chiffre. Les durées entendues dans le métier sont des usages professionnels, parfois issus de guides de bonnes pratiques d'hygiène, jamais des obligations générales.",
          "Ce que vous devez pouvoir faire, c'est expliquer votre choix. Un raisonnement défendable part de la durée de vie des produits concernés, y ajoute une marge, tient compte de la nature du document et de son utilité en cas de recherche après un signalement. Un exploitant qui dit « je conserve mes relevés sur telle durée parce que voici mon raisonnement » est dans une position bien plus solide que celui qui invoque une règle qui n'existe pas.",
          "L'erreur à ne pas commettre est de citer devant un agent une durée réglementaire imaginaire. Un exploitant qui invoque une règle inexistante perd sa crédibilité sur tout le reste de la visite, y compris sur les points où il avait raison. Écrivez votre durée dans vos procédures, tenez-la, et vous n'aurez jamais à improviser une réponse."
        ]
      },
      {
        titre: "Comment tenir le classeur sans y passer ses soirées",
        paragraphes: [
          "Un seul classeur, rangé à un endroit fixe et proche de la cuisine, avec un sommaire en première page et des intercalaires nommés comme votre équipe nomme les choses. Chaque personne de la brigade doit savoir l'ouvrir et trouver la bonne rubrique en moins d'une minute. Cette simple exigence élimine à elle seule une grande part des difficultés observées en visite.",
          "Ensuite, allégez jusqu'à ce que ce soit tenu. Le bon volume documentaire n'est pas le plus complet, c'est le plus grand volume que votre organisation remplit réellement toutes les semaines, y compris les semaines difficiles. Il vaut mieux trois supports courts et vivants que huit supports ambitieux dont cinq sont vierges. Un support vierge est un constat qui s'écrit tout seul.",
          "Enfin, nommez. Une tâche partagée entre trois personnes n'est portée par personne. Une ligne par service, avec un nom, et une vérification hebdomadaire de dix minutes par le responsable suffisent à faire tenir l'ensemble. Un audit sur place mesure exactement cette fluidité, en plus de l'état des locaux, et le rapport remis distingue ce qui relève des documents de ce qui relève de l'organisation humaine. Le devis est établi avant intervention, après un échange de quelques minutes, depuis la page contact."
        ]
      }
    ],
    faq: [
      {
        question: "Combien de temps faut-il conserver les relevés de température ?",
        reponse: "Aucune disposition ne fixe de durée chiffrée. L'article 5, paragraphe 4, point c) du règlement (CE) n° 852/2004 du 29 avril 2004 demande que les documents soient conservés pendant une période appropriée, ce qui renvoie à votre appréciation, écrite dans vos procédures et justifiable. Les durées qui circulent dans le métier sont des usages professionnels, pas des obligations générales. Fixez la vôtre en partant de la durée de vie de vos produits, ajoutez une marge, écrivez-la et tenez-la."
      },
      {
        question: "Un plan de maîtrise sanitaire est-il obligatoire dans un restaurant ?",
        reponse: "L'expression n'appartient pas au règlement européen et son contenu type vient de l'annexe II de l'arrêté du 8 juin 2006, qui vise les établissements soumis à agrément. Un restaurant en remise directe n'y est pas soumis, mais il reste pleinement tenu des articles 4 et 5 du règlement (CE) n° 852/2004 : procédures permanentes fondées sur les principes HACCP et documents prouvant leur application effective. En pratique, un document écrit adapté à votre cuisine est donc attendu, même si son format n'est pas imposé."
      },
      {
        question: "Puis-je acheter un plan de maîtrise sanitaire tout fait ?",
        reponse: "Vous pouvez partir d'un modèle, mais il ne tient pas tel quel. Un document où figurent des équipements que vous n'avez pas et des zones qui n'existent pas chez vous se repère immédiatement, et il prouve précisément l'absence du travail d'analyse que l'article 5 du règlement (CE) n° 852/2004 exige. Reprenez le modèle, supprimez tout ce qui ne vous concerne pas, ajoutez votre plan de locaux, vos activités réelles et vos propres valeurs de surveillance."
      },
      {
        question: "Les relevés papier sont-ils encore acceptés ?",
        reponse: "Oui, aucun texte n'impose de support. Le papier a l'avantage d'être immédiatement disponible et compréhensible par toute l'équipe ; les sondes enregistreuses ont celui d'être automatiques et difficiles à contester. Le seul critère qui compte est que le support soit réellement tenu et accessible pendant une visite, même en votre absence. Un système numérique dont seul le patron connaît le mot de passe est, du point de vue du contrôle, un système indisponible."
      },
      {
        question: "Faut-il un contrat de dératisation ?",
        reponse: "Aucune disposition ne l'impose. L'annexe II, chapitre IX, point 4 du règlement (CE) n° 852/2004 exige de mettre au point des méthodes adéquates de lutte contre les organismes nuisibles, sans dicter la forme. Le contrat, le plan des appâts et les rapports de passage sont les moyens usuels de démontrer que ces méthodes existent, et ils sont immédiatement lisibles par un tiers. Ce qui est regardé au-delà du contrat, c'est la suite donnée aux observations des rapports."
      },
      {
        question: "Que se passe-t-il si un document existe mais reste introuvable pendant la visite ?",
        reponse: "Dites-le franchement et proposez de le transmettre dans le délai indiqué. Un document indisponible au moment du contrôle n'est pas la même chose qu'un document absent, à condition que l'envoi suive réellement. Ce qu'il ne faut jamais faire, c'est reconstituer après coup des enregistrements qui n'ont pas été tenus : l'écriture, l'encre et la régularité des lignes se voient, et la crédibilité perdue sur ce point se propage à tout le dossier."
      },
      {
        question: "L'attestation de formation en hygiène doit-elle être au nom du gérant ?",
        reponse: "L'obligation posée par l'article L. 233-4 du code rural et de la pêche maritime porte sur l'établissement : au moins une personne de l'effectif doit justifier de la formation spécifique dont le cahier des charges est fixé par l'arrêté du 12 février 2024. Ce peut être le gérant, le chef ou un autre salarié. Une expérience professionnelle d'au moins trois ans dans une entreprise du secteur alimentaire comme gestionnaire ou exploitant vaut satisfaction de cette obligation."
      },
      {
        question: "L'information allergènes peut-elle être seulement orale ?",
        reponse: "Non. L'article 44, paragraphe 1, point a) du règlement (UE) n° 1169/2011 du 25 octobre 2011 maintient l'obligation d'information sur les allergènes pour les denrées non préemballées, et le décret n° 2015-447 du 17 avril 2015, codifié aux articles R. 412-12 et R. 412-13 du code de la consommation, impose une information portée sur la denrée elle-même ou à proximité, sans incertitude possible. Un tableau à jour, consultable, est le support le plus simple."
      },
      {
        question: "Faut-il un classeur par établissement quand on en a plusieurs ?",
        reponse: "Oui, parce que les documents doivent décrire des locaux, des flux et des équipements réels, qui diffèrent d'un site à l'autre. Ce qui peut être commun, ce sont les principes, les modèles de supports et les procédures de retrait. Ce qui doit être propre à chaque site, c'est le plan des locaux, l'analyse des dangers, les relevés, les preuves de nettoyage, la traçabilité et le suivi des nuisibles. Un classeur unique pour deux adresses se remarque immédiatement."
      }
    ],
    liens: [
      "/themes/plan-de-maitrise-sanitaire-pms",
      "/points-de-controle/releves-de-temperature-tenus-et-archives",
      "/points-de-controle/conservation-des-etiquettes-n-de-lot",
      "/blog/plan-maitrise-sanitaire-pms",
      "/blog/tracabilite-dlc-restaurant",
      "/contact"
    ]
  },
  {
    slug: "ouvrir-un-restaurant-les-obligations-d-hygiene",
    titre: "Ouvrir un restaurant : les obligations d'hygiène à tenir dès le premier jour",
    titreSeo: "Ouvrir un restaurant : les obligations d'hygiène",
    description: "Déclaration d'activité, conception des locaux, procédures écrites, formation, allergènes : ce qu'un restaurant doit avoir en place le jour de son ouverture.",
    reponse: "Avant de servir le premier couvert, trois choses doivent exister. La déclaration de votre établissement auprès de l'autorité compétente, prévue à l'article 6, paragraphe 2 du règlement (CE) n° 852/2004 du 29 avril 2004. Des locaux conçus et équipés selon son annexe II, avec des surfaces nettoyables, des postes de lavage des mains opérationnels, de l'eau potable et une gestion des déchets. Et des procédures écrites fondées sur les principes HACCP, exigées par son article 5, adaptées à votre cuisine et non copiées d'un modèle. S'y ajoute une personne formée à l'hygiène alimentaire présente à l'effectif.",
    ouverture: "L'ouverture est le seul moment où tout est encore modifiable à faible coût. Un lave-mains oublié ou un flux mal pensé se corrige pendant les travaux en quelques heures, presque jamais après.",
    sections: [
      {
        titre: "La déclaration de l'établissement",
        paragraphes: [
          "L'article 6, paragraphe 2 du règlement (CE) n° 852/2004 du 29 avril 2004 impose à tout exploitant du secteur alimentaire de notifier à l'autorité compétente chaque établissement placé sous son contrôle, en vue de son enregistrement, et de l'informer de toute modification significative ou de la fermeture. En France, cette déclaration se fait auprès du service départemental en charge de la protection des populations, au moyen du formulaire prévu à cet effet.",
          "Elle est à faire avant l'ouverture, et elle doit être renouvelée quand la situation change de façon significative : changement d'exploitant, transfert de locaux, ajout d'une activité qui modifie la nature de ce que vous produisez. Une déclaration à jour est la première pièce qu'on vous demandera, et son absence est un manquement facile à éviter.",
          "Cette déclaration n'est ni une autorisation, ni une certification, ni un contrôle préalable. Elle inscrit votre établissement dans les fichiers du service, ce qui permet notamment la programmation des contrôles officiels prévue à l'article 9 du règlement (UE) 2017/625 du 15 mars 2017. Vous ne recevrez pas de visite d'ouverture systématique, et le fait de ne pas en recevoir ne signifie rien sur la conformité de vos locaux."
        ],
        sous: [
          {
            titre: "Le cas de l'agrément sanitaire",
            texte: "Un restaurant qui remet directement au consommateur final relève du commerce de détail, exclu du champ du règlement (CE) n° 853/2004 par son article 1er, paragraphe 5, point a), et n'est donc pas soumis à agrément. La question se pose autrement si vous fournissez des produits d'origine animale à d'autres établissements : l'agrément est alors régi par l'article L. 233-2 du code rural et de la pêche maritime, avec un régime de dérogation pour les quantités limitées. Si votre projet comporte cette activité, posez la question au service avant d'ouvrir."
          }
        ]
      },
      {
        titre: "Concevoir les locaux avant de les construire",
        paragraphes: [
          "L'annexe II, chapitre II, point 1 du règlement (CE) n° 852/2004 demande que la conception et l'agencement des locaux permettent la mise en œuvre de bonnes pratiques d'hygiène et notamment de prévenir la contamination entre et durant les opérations. C'est de cette exigence que vient l'expression professionnelle de « marche en avant », qui n'est pas une notion juridique mais qui traduit une idée simple : le produit ne doit jamais revenir en arrière ni croiser ce qui le salit.",
          "Concrètement, dessinez le circuit avant de dessiner la cuisine. Où arrivent les livraisons, où se déballe le carton, où va le carton ensuite, où se stocke le sec, où se stocke le froid, où se fait la préparation du cru, où se fait la cuisson, où se dresse, par où sort la vaisselle sale, par où revient la vaisselle propre, où sortent les déchets. Chaque croisement qui apparaît sur ce dessin est un problème à résoudre maintenant, avec un plan, plutôt que plus tard, avec une procédure.",
          "Quand la surface ne permet pas la séparation dans l'espace, la séparation dans le temps est admise et se justifie : on ne fait pas le cru et le cuit sur le même plan au même moment, on nettoie et on désinfecte entre les deux, et on l'écrit dans ses procédures. C'est une solution acceptable, à condition d'être décrite et réellement tenue."
        ]
      },
      {
        titre: "Ce que les surfaces et les équipements doivent permettre",
        paragraphes: [
          "L'annexe II, chapitre II, point 1, points a) à f) demande que les revêtements de sol, les surfaces murales, les plafonds, les fenêtres, les portes et les surfaces de travail soient bien entretenus, faciles à nettoyer et au besoin à désinfecter, en matériaux étanches, non absorbants, lavables et non toxiques, sauf si l'exploitant démontre à l'autorité compétente que d'autres matériaux conviennent. C'est le point sur lequel les économies faites au moment des travaux coûtent le plus cher ensuite.",
          "Les équipements relèvent du chapitre V, point 1 : construits, réalisés et entretenus de manière à réduire au maximum les risques de contamination, et installés de manière à permettre un nettoyage convenable de l'appareil et de la zone environnante. Un four scellé au mur sans dégagement, un plan de travail posé sur un socle maçonné non jointoyé ou une plonge trop courte pour égoutter créent des problèmes définitifs.",
          "Les matériaux au contact des denrées relèvent du règlement (CE) n° 1935/2004 du 27 octobre 2004, dont l'article 3 impose qu'ils ne cèdent pas aux denrées des constituants susceptibles de présenter un danger pour la santé, d'entraîner une modification inacceptable de leur composition ou une altération de leurs caractères organoleptiques. Conservez les justificatifs d'aptitude au contact alimentaire fournis par vos fabricants."
        ]
      },
      {
        titre: "Le lavage des mains, l'eau et les sanitaires",
        paragraphes: [
          "L'annexe II, chapitre I, point 4 exige un nombre suffisant de lavabos judicieusement situés et destinés au lavage des mains, équipés d'eau courante chaude et froide, avec du matériel pour le nettoyage et pour le séchage hygiénique des mains, et séparés en cas de besoin des dispositifs de lavage des denrées. C'est un point qui ne se rattrape pas : un lave-mains absent d'une zone de préparation impose des travaux.",
          "La commande non manuelle relève de la bonne pratique et non d'une obligation générale. Elle n'est imposée qu'à certains établissements de produits d'origine animale par le règlement (CE) n° 853/2004, texte qui ne s'applique pas au commerce de détail. Cela dit, un robinet à commande au coude ou au genou coûte peu au moment des travaux et supprime une question définitivement.",
          "L'alimentation en eau potable en quantité suffisante est exigée par le chapitre VII, point 1 a). La glace en contact avec les denrées doit être fabriquée à partir d'eau potable et manipulée dans des conditions prévenant toute contamination, selon le point 4 du même chapitre. Les sanitaires ne doivent pas donner directement sur un local de manipulation, et les vestiaires sont exigés par le chapitre I, point 9 lorsque l'hygiène l'impose."
        ]
      },
      {
        titre: "Le froid et la gestion des déchets",
        paragraphes: [
          "Dimensionnez le froid pour vos volumes de pointe, pas pour votre moyenne. Une enceinte surchargée ne tient pas ses températures, et le principe posé à l'annexe II, chapitre IX, point 5 est que la chaîne du froid ne doit pas être interrompue. Prévoyez également la séparation physique du cru et du cuit et l'entreposage séparé des matières premières et des produits transformés, exigé au même chapitre pour les produits transformés.",
          "Les valeurs à tenir ne sont pas uniques : elles dépendent des denrées et viennent de l'arrêté du 21 décembre 2009 pour les produits d'origine animale et les denrées en contenant, et de l'arrêté du 8 octobre 2013 pour les autres. Prévoyez dès l'installation le moyen de vérifier ces températures : afficheurs lisibles, thermomètre indépendant, et éventuellement sondes enregistreuses.",
          "Les déchets relèvent du chapitre VI : retrait aussi rapide que possible des locaux où se trouvent des denrées, conteneurs dotés d'une fermeture, bien entretenus et faciles à nettoyer, et une aire de stockage conçue et gérée pour rester propre et exempte d'animaux et de parasites. Le règlement demande une fermeture, il n'impose pas une commande à pédale : la pédale est une bonne pratique, très commode, pas une obligation."
        ]
      },
      {
        titre: "Les procédures écrites, dès l'ouverture",
        paragraphes: [
          "L'article 5 du règlement (CE) n° 852/2004 impose de mettre en place, d'appliquer et de maintenir des procédures permanentes fondées sur les principes HACCP. Cette obligation ne commence pas après quelques mois d'activité : elle vaut dès le premier service. Un établissement qui ouvre sans aucune procédure écrite se met dans une position difficile dès la première visite, alors que le travail se fait en quelques heures pendant la période d'installation.",
          "Le document attendu décrit vos locaux, vos activités réelles, vos bonnes pratiques d'hygiène, votre analyse des dangers avec les points que vous surveillez et les valeurs que vous vous fixez, ce que vous faites quand une valeur sort des clous, votre traçabilité et votre procédure de retrait. Le contenu type auquel on se réfère souvent vient de l'annexe II de l'arrêté du 8 juin 2006, qui vise les établissements soumis à agrément : c'est un modèle utile, pas une obligation pour un restaurant en remise directe.",
          "Les supports d'enregistrement se conçoivent en même temps. Relevés de température, réception des livraisons, preuves de nettoyage, suivi des nuisibles, conservation des étiquettes. Faites-les courts, placez-les au bon endroit dès le premier jour et nommez la personne responsable de chacun. Une habitude prise à l'ouverture tient ; une habitude qu'on essaie d'installer six mois plus tard se heurte à une organisation déjà figée."
        ]
      },
      {
        titre: "L'équipe : formation, tenue, santé",
        paragraphes: [
          "L'annexe II, chapitre XII impose que les manutentionnaires de denrées soient encadrés et disposent d'instructions ou d'une formation en hygiène alimentaire adaptée à leur activité. En droit français, l'article L. 233-4 du code rural et de la pêche maritime, précisé par les articles D. 233-11 et D. 233-12 issus du décret n° 2011-731 du 24 juin 2011, impose qu'au moins une personne de l'effectif justifie d'une formation spécifique dont le cahier des charges est fixé par l'arrêté du 12 février 2024.",
          "Une expérience professionnelle d'au moins trois ans dans une entreprise du secteur alimentaire comme gestionnaire ou exploitant vaut satisfaction de cette obligation. L'attestation ou l'élément justifiant l'expérience équivalente se range dans le classeur dès l'ouverture : c'est une pièce demandée très tôt en visite. Ce sujet relève d'organismes de formation, il ne fait pas partie de notre périmètre.",
          "Le chapitre VIII impose un niveau élevé de propreté personnelle et des tenues adaptées et propres, et interdit à toute personne atteinte d'une maladie transmissible par les aliments, de plaies infectées ou de lésions cutanées de manipuler des denrées. Le port de la coiffe, l'interdiction des bijoux et la fréquence de change ne sont pas énoncés par le règlement : ce sont des bonnes pratiques issues des guides du secteur, à formaliser dans vos procédures si vous les retenez."
        ]
      },
      {
        titre: "Les allergènes et l'information du consommateur",
        paragraphes: [
          "L'article 9, paragraphe 1, point c) du règlement (UE) n° 1169/2011 du 25 octobre 2011 rend obligatoire la mention de tout ingrédient ou auxiliaire technologique figurant à son annexe II et provoquant des allergies ou des intolérances, dès lors qu'il est encore présent dans le produit fini, même sous forme modifiée. Son article 44, paragraphe 1, point a) maintient cette obligation pour les denrées proposées non préemballées, ce qui est le cas d'un plat servi à table.",
          "En droit interne, le décret n° 2015-447 du 17 avril 2015, codifié aux articles R. 412-12 et R. 412-13 du code de la consommation, impose que l'information soit portée sur la denrée ou à proximité, sans incertitude possible sur la denrée à laquelle elle se rapporte. Un tableau à jour croisant vos plats et les substances de l'annexe II, consultable en salle, est le support le plus simple à tenir.",
          "La prévention de la contamination croisée est également encadrée. L'annexe II, chapitre IX, point 9 du règlement (CE) n° 852/2004, inséré par le règlement (UE) 2021/382 du 3 mars 2021, impose que les équipements et conteneurs ayant servi à un produit allergène ne servent pas à un produit qui n'en contient pas, sauf nettoyage et contrôle de l'absence de débris visibles. Ce point se pense dès la conception de la cuisine."
        ]
      },
      {
        titre: "Les trois erreurs les plus fréquentes à l'ouverture",
        paragraphes: [
          "La première est de traiter l'hygiène après les travaux. Le lave-mains ajouté en fin de chantier finit dans un angle inutilisable, la zone de déballage se retrouve dans le couloir, la plonge est trop courte. Ces décisions se prennent sur plan et se rattrapent difficilement. Faites relire votre plan par quelqu'un qui connaît le sujet pendant qu'il est encore sur le papier.",
          "La deuxième est d'acheter des procédures toutes faites et de les ranger sans les lire. Un document où figurent des équipements que vous n'avez pas prouve précisément que l'analyse exigée par l'article 5 n'a pas été faite. Le travail de reprise prend une demi-journée et vaut mieux qu'un classeur épais et faux.",
          "La troisième est de croire qu'une visite d'ouverture validera l'installation. Aucun contrôle systématique n'est prévu à l'ouverture, et l'absence de visite ne dit rien de la conformité de vos locaux. La conformité est à la charge de l'exploitant en permanence, au titre des articles 4 et 5 du règlement (CE) n° 852/2004, et elle se vérifie le jour où l'agent passe, qui peut être n'importe lequel."
        ]
      },
      {
        titre: "Faire regarder l'installation avant d'ouvrir",
        paragraphes: [
          "Un audit avant ouverture est le moment où un regard extérieur rend le plus de services, parce que tout est encore modifiable. Un auditeur parcourt les locaux terminés ou en fin de chantier, contrôle les vingt-sept points de notre grille répartis en douze thèmes, examine vos procédures et vos supports, et remet un rapport écrit avec une note, les constats point par point et un plan d'action classé par priorité.",
          "L'intérêt est double. Le rapport vous dit ce qui doit changer pendant que les entreprises sont encore sur place, ce qui divise le coût de la correction. Il vous sert aussi de document d'organisation pour vos premières semaines : qui tient quel support, où sont les documents, quelles zones se nettoient à quelle fréquence. Chaque écart y porte le correctif attendu et la preuve à constituer, en français courant, pour que vous puissiez le traiter sans nous.",
          "audit hygiène est un label privé indépendant, ni certification officielle, ni agrément d'État, ni contrôle des services vétérinaires. Notre prestation s'arrête à la remise du rapport : nous ne faisons pas les travaux et nous ne promettons jamais l'issue d'une visite officielle, qui appartient aux services de l'État. Avec nous, vous savez exactement quoi corriger avant d'ouvrir. Le devis est établi avant intervention, après un échange de quelques minutes, depuis la page contact."
        ]
      }
    ],
    faq: [
      {
        question: "Faut-il déclarer son restaurant avant d'ouvrir ?",
        reponse: "Oui. L'article 6, paragraphe 2 du règlement (CE) n° 852/2004 du 29 avril 2004 impose de notifier à l'autorité compétente chaque établissement placé sous votre contrôle en vue de son enregistrement, et de l'informer de toute modification significative ou de la fermeture. En France, cette déclaration se fait auprès du service départemental en charge de la protection des populations, au moyen du formulaire prévu à cet effet. Elle se refait en cas de changement d'exploitant, de transfert de locaux ou d'ajout d'activité."
      },
      {
        question: "Reçoit-on une visite d'inspection à l'ouverture ?",
        reponse: "Il n'existe pas de contrôle d'ouverture systématique. Les contrôles officiels sont programmés selon une fréquence fondée sur les risques, en application de l'article 9 du règlement (UE) 2017/625 du 15 mars 2017, qui tient compte de l'activité, des antécédents, de la fiabilité des autocontrôles et des informations reçues. L'absence de visite dans vos premiers mois ne dit donc rien sur la conformité de vos locaux : elle signifie seulement que votre établissement n'a pas encore été sélectionné."
      },
      {
        question: "Un restaurant a-t-il besoin d'un agrément sanitaire ?",
        reponse: "Non s'il remet directement au consommateur final : il relève alors du commerce de détail, exclu du champ du règlement (CE) n° 853/2004 par son article 1er, paragraphe 5, point a). La question change si vous fournissez des produits d'origine animale à d'autres établissements, cas régi par l'article L. 233-2 du code rural et de la pêche maritime, avec un régime de dérogation pour les quantités limitées. Si votre projet comporte cette activité, interrogez le service avant d'ouvrir."
      },
      {
        question: "La marche en avant est-elle obligatoire ?",
        reponse: "L'expression n'est pas une notion juridique. Ce qui est imposé, c'est que la conception et l'agencement des locaux permettent de prévenir la contamination entre et durant les opérations, selon l'annexe II, chapitre II, point 1 du règlement (CE) n° 852/2004. Quand la surface ne permet pas la séparation dans l'espace, la séparation dans le temps est admise : on ne travaille pas le cru et le cuit au même moment sur le même plan, on nettoie et on désinfecte entre les deux, et on l'écrit dans ses procédures."
      },
      {
        question: "Faut-il des procédures écrites dès le premier service ?",
        reponse: "Oui. L'article 5 du règlement (CE) n° 852/2004 impose de mettre en place, d'appliquer et de maintenir des procédures permanentes fondées sur les principes HACCP, sans période de tolérance. Le travail se fait facilement pendant l'installation, quand vous avez encore du temps : décrire les locaux et les flux, lister les activités réelles, fixer les points surveillés et les valeurs retenues, écrire ce qu'on fait quand une valeur sort des clous, et préparer des supports d'enregistrement courts."
      },
      {
        question: "Combien de lave-mains faut-il prévoir ?",
        reponse: "Le texte ne donne pas de nombre. L'annexe II, chapitre I, point 4 exige un nombre suffisant de lavabos judicieusement situés et destinés au lavage des mains, avec eau chaude et froide et de quoi nettoyer et sécher les mains hygiéniquement. La lecture pratique est qu'une personne qui manipule des denrées doit pouvoir se laver les mains sans quitter sa zone ni traverser un autre local. Placez-les sur plan, en fin de chantier ils finissent toujours au mauvais endroit."
      },
      {
        question: "Faut-il une personne formée à l'hygiène dès l'ouverture ?",
        reponse: "Oui, l'établissement doit compter au moins une personne justifiant de la formation spécifique prévue à l'article L. 233-4 du code rural et de la pêche maritime, précisé par les articles D. 233-11 et D. 233-12 issus du décret n° 2011-731 du 24 juin 2011, dont le cahier des charges est fixé par l'arrêté du 12 février 2024. Une expérience professionnelle d'au moins trois ans dans le secteur alimentaire comme gestionnaire ou exploitant vaut satisfaction de cette obligation. L'attestation est demandée très tôt en visite."
      },
      {
        question: "Faut-il une carte des allergènes le jour de l'ouverture ?",
        reponse: "L'information sur les allergènes est obligatoire dès le premier plat servi. L'article 9, paragraphe 1, point c) et l'article 44, paragraphe 1, point a) du règlement (UE) n° 1169/2011 du 25 octobre 2011 l'imposent, y compris pour les denrées non préemballées, et le décret n° 2015-447 du 17 avril 2015 exige qu'elle soit portée sur la denrée ou à proximité. Un tableau croisant vos plats et les substances de l'annexe II, tenu à partir des étiquettes fournisseurs, suffit et se prépare avant l'ouverture."
      }
    ],
    liens: [
      "/methode",
      "/themes/locaux-equipements",
      "/points-de-controle/separation-cru-cuit-respectee",
      "/blog/ouvrir-restaurant-obligations-hygiene",
      "/blog/audit-avant-ouverture-restaurant-paris",
      "/contact"
    ]
  },
  {
    slug: "reprendre-un-restaurant-etat-des-lieux-hygiene",
    titre: "Reprendre un restaurant : l'état des lieux hygiène à faire avant de signer",
    titreSeo: "Reprendre un restaurant : l'état des lieux hygiène",
    description: "Ce qu'il faut regarder dans une cuisine avant de reprendre un fonds : locaux, froid, extraction, nuisibles, documents du cédant et ce qui se répare vraiment.",
    reponse: "Avant de signer, un état des lieux hygiène sépare deux catégories : ce qui se corrige par de l'organisation, en quelques jours et sans dépense, et ce qui touche au bâti, au froid, à l'extraction ou à l'évacuation, et qui se paie. Regardez les locaux et leurs revêtements, l'implantation des postes de lavage des mains, la capacité et l'état du froid, la ventilation, la plonge, le local à déchets et les accès. Demandez au cédant ses procédures écrites, ses relevés, ses contrats de maintenance et de lutte contre les nuisibles, et l'historique de ses visites. Ce que vous ne verrez pas avant la signature, vous le paierez après.",
    ouverture: "Une reprise se joue souvent sur des points qu'aucune photo d'annonce ne montre : une extraction sous-dimensionnée, une chambre froide en fin de vie, un local à déchets sans point d'eau. Une visite technique avant signature est le meilleur investissement d'un repreneur.",
    sections: [
      {
        titre: "Pourquoi le faire avant la signature",
        paragraphes: [
          "Après la signature, la conformité est la vôtre. Les articles 4 et 5 du règlement (CE) n° 852/2004 du 29 avril 2004 mettent la maîtrise sanitaire à la charge de l'exploitant, et l'exploitant, à partir de la reprise, c'est vous. Ce que le prédécesseur n'a pas fait ne se plaide pas devant un agent : le jour de la visite, on regarde l'état des locaux et vos procédures, pas l'historique du fonds.",
          "Avant la signature, en revanche, tout est encore négociable. Un état des lieux écrit, avec des photographies et une liste de points chiffrables par des professionnels, se met sur la table. Il ne sert pas à faire échouer l'opération mais à la mettre au bon niveau : soit le cédant traite avant la vente, soit le prix intègre les travaux, soit vous décidez en connaissance de cause.",
          "Le calendrier compte aussi. Les corrections structurelles se font pendant la période où l'établissement est fermé pour transition. Une fois le service relancé, chaque intervention coûte un jour d'exploitation, et beaucoup de repreneurs reportent ces travaux à un moment qui n'arrive jamais."
        ]
      },
      {
        titre: "Le bâti et les revêtements",
        paragraphes: [
          "L'annexe II, chapitre II, point 1 du règlement (CE) n° 852/2004 demande que les sols, les surfaces murales, les plafonds, les fenêtres, les portes et les surfaces de travail soient bien entretenus, faciles à nettoyer et au besoin à désinfecter, en matériaux étanches, non absorbants, lavables et non toxiques. Regardez donc ce qui ne se nettoie pas : un carrelage fendu, un joint creusé, une peinture qui cloque, un plafond taché par une fuite ancienne, un plan de travail piqué.",
          "Les zones cachées disent la vérité de l'établissement. Passez derrière et sous les équipements, ouvrez les placards bas, regardez le dessus des hottes, l'intérieur des chambres froides au niveau des angles, les siphons, les passages de gaines. Une cuisine que personne n'a nettoyée en profondeur depuis longtemps se lit là, et le nettoyage de remise à niveau est un poste de dépense réel qu'il vaut mieux anticiper.",
          "Repérez enfin les points qui imposeront des travaux quoi qu'il arrive : une évacuation au sol absente ou bouchée, une pente inexistante, un local sans arrivée d'eau, une réserve en sous-sol humide, une porte extérieure dont le bas laisse passer un jour. Ce sont ces éléments, et non la couleur des murs, qui déterminent le budget réel d'une reprise."
        ]
      },
      {
        titre: "Le froid, poste le plus lourd",
        paragraphes: [
          "Le froid est ce qui coûte le plus cher à remplacer et ce qu'on regarde le moins. Ouvrez chaque enceinte, mesurez la température réelle avec votre propre thermomètre plutôt que de croire l'afficheur, laissez la porte fermée dix minutes et remesurez, regardez l'état des joints, la présence de givre anormal, le bruit du groupe, la propreté du condenseur. Demandez l'âge des équipements et les factures d'entretien.",
          "Vérifiez ensuite la capacité au regard de votre projet, pas de celui du cédant. Une carte plus ambitieuse, un volume plus élevé ou l'ajout d'une activité de vente à emporter changent complètement les besoins. Une enceinte surchargée ne tient pas ses températures, et le principe posé à l'annexe II, chapitre IX, point 5 du règlement (CE) n° 852/2004 est que la chaîne du froid ne doit pas être interrompue.",
          "Regardez enfin la séparation possible. Le même chapitre exige, pour les produits transformés, un entreposage séparé des matières premières et des produits transformés, et la protection des denrées contre toute contamination à toutes les étapes. Une seule chambre froide pour tout, sans possibilité d'organiser des zones, est une contrainte durable qui pèsera sur votre organisation quotidienne."
        ],
        sous: [
          {
            titre: "L'extraction et la ventilation",
            texte: "L'annexe II, chapitre I, point 5 du règlement (CE) n° 852/2004 exige une ventilation adéquate, naturelle ou mécanique, et des systèmes accessibles pour le nettoyage et le remplacement des filtres. Vérifiez l'état des filtres, la date du dernier dégraissage des conduits, la présence d'un rapport d'intervention, et le tirage réel en service. Une extraction fatiguée se traduit par de la condensation, des dépôts gras partout et un problème de nettoyage permanent."
          }
        ]
      },
      {
        titre: "Les postes de lavage des mains, la plonge et l'eau",
        paragraphes: [
          "Comptez les lave-mains et regardez où ils sont. L'annexe II, chapitre I, point 4 exige un nombre suffisant de lavabos judicieusement situés, destinés au lavage des mains, avec eau courante chaude et froide et de quoi nettoyer et sécher les mains hygiéniquement. Un lave-mains qui n'existe pas dans une zone de préparation impose une intervention de plomberie, et c'est un point à connaître avant de signer.",
          "La plonge dit beaucoup de l'organisation possible. Regardez la longueur des paillasses, la place pour poser le sale et le propre sans qu'ils se croisent, l'égouttage, la présence d'un bac de trempage, l'état du lave-vaisselle et sa capacité. Une plonge trop courte fabrique une contamination croisée que rien n'effacera ensuite, sauf à travailler en décalé toute la journée.",
          "Vérifiez enfin l'eau chaude, son débit et sa disponibilité aux heures de pointe, l'état de la machine à glaçons si elle est reprise, et l'absence de bricolage sur les réseaux. Le chapitre VII exige une alimentation en eau potable en quantité suffisante, et pose que la glace en contact avec les denrées soit fabriquée à partir d'eau potable et manipulée dans des conditions prévenant toute contamination."
        ]
      },
      {
        titre: "Les nuisibles et l'environnement immédiat",
        paragraphes: [
          "C'est le point qui se découvre le plus souvent après la reprise, parce qu'il ne se voit pas en journée. Cherchez les indices plutôt que les animaux : déjections, traces de passage le long des murs, emballages rongés dans la réserve, bas de porte usé, gaine non rebouchée, siphon sec, grille d'aération cassée. Regardez aussi les parties communes de l'immeuble, les caves, le local vide-ordures.",
          "Demandez le contrat de lutte contre les nuisibles s'il existe, et surtout les rapports de passage des derniers mois. Une succession de rapports signalant une activité sans qu'aucune action ne suive vaut avertissement. L'annexe II, chapitre IX, point 4 du règlement (CE) n° 852/2004 impose de mettre au point des méthodes adéquates de lutte, et le contrat n'est qu'un moyen usuel de le démontrer, jamais une obligation en soi.",
          "Un problème de nuisibles dans un immeuble ne se règle pas depuis une seule cuisine. Si les indices pointent vers une source collective, la question devient celle de la copropriété, du bailleur et des voisins, et le délai de traitement s'allonge. Le savoir avant de signer permet d'en parler au bon moment et avec les bonnes personnes."
        ]
      },
      {
        titre: "Les déchets, les accès et les livraisons",
        paragraphes: [
          "Le chapitre VI du règlement (CE) n° 852/2004 demande que les déchets soient retirés aussi vite que possible des locaux où se trouvent des denrées, déposés dans des conteneurs dotés d'une fermeture, bien entretenus et faciles à nettoyer, et que l'aire de stockage puisse rester propre et exempte d'animaux et de parasites. Regardez donc où sortent les poubelles, par quel chemin, et si ce chemin croise le circuit des produits.",
          "Beaucoup de restaurants urbains n'ont pas de local dédié et sortent les conteneurs par la salle. Ce n'est pas rédhibitoire, mais cela impose une organisation horaire stricte et cela se décrit dans vos procédures. Vérifiez également la présence d'un point d'eau à proximité de la zone déchets : sans lui, le nettoyage des conteneurs devient une corvée que personne ne fait.",
          "Regardez enfin l'arrivée des marchandises. Où se pose une palette, où se déballe un carton, où va le carton ensuite, comment on descend en réserve, faut-il traverser une zone de production. Ces contraintes de flux ne se voient pas sur un plan mais elles pèsent tous les jours, et elles se corrigent parfois pour presque rien en réaffectant deux mètres carrés."
        ]
      },
      {
        titre: "Les documents à demander au cédant",
        paragraphes: [
          "Demandez le document décrivant ses procédures, ses relevés de température des derniers mois, ses fiches de nettoyage, ses bons de passage de lutte contre les nuisibles, ses contrats de maintenance sur le froid et sur l'extraction, les justificatifs d'aptitude au contact alimentaire des équipements récents, et les attestations de formation en hygiène alimentaire des personnes en poste. La qualité de ces pièces vous renseigne autant que leur contenu.",
          "Ces documents ne se reprennent pas tels quels. Un document de procédures décrit une organisation, des flux et des activités : si vous changez la carte, l'équipe ou l'implantation, il faut le réécrire. En revanche, l'historique des relevés et des rapports de nuisibles a une vraie valeur d'information : il montre quels équipements ont dérivé, à quelle fréquence, et quels problèmes reviennent.",
          "Demandez également l'historique des visites officielles et les comptes rendus reçus, ainsi que ce qui a été fait en réponse. Un cédant qui produit ces éléments sans difficulté envoie un signal positif ; un cédant qui esquive la question en envoie un autre. La publication des résultats des contrôles, dans le cadre de la transparence des contrôles officiels, permet par ailleurs de vérifier une partie de ces informations."
        ]
      },
      {
        titre: "Les formalités qui vous incombent à la reprise",
        paragraphes: [
          "L'article 6, paragraphe 2 du règlement (CE) n° 852/2004 impose de notifier à l'autorité compétente chaque établissement placé sous votre contrôle en vue de son enregistrement, et de l'informer de toute modification significative. Un changement d'exploitant est une modification significative : la déclaration se refait à votre nom, auprès du service départemental en charge de la protection des populations, au moyen du formulaire prévu à cet effet.",
          "Selon le montage retenu, la situation diffère. L'achat d'un fonds de commerce fait de vous un nouvel exploitant, avec ses propres formalités. Le rachat des parts d'une société laisse la personne morale inchangée, et son historique avec elle. Cette différence a des conséquences pratiques qu'il vaut mieux avoir examinées avec votre conseil avant de choisir la structure de l'opération.",
          "Côté équipe, les contrats de travail en cours se poursuivent avec le nouvel employeur en application de l'article L. 1224-1 du code du travail. Concrètement, les personnes formées à l'hygiène alimentaire restent dans l'effectif, et leurs attestations aussi. Vérifiez qu'au moins une personne satisfait à l'obligation de l'article L. 233-4 du code rural et de la pêche maritime, et gardez les pièces dans votre classeur."
        ]
      },
      {
        titre: "Ce qui se répare et ce qui se paie",
        paragraphes: [
          "Se répare en quelques jours, sans dépense significative : l'identification des produits, l'organisation des enceintes, la séparation du cru et du cuit, le rangement des produits d'entretien hors des zones de manipulation exigé par l'annexe II, chapitre I, point 10, la remise en service d'un lave-mains encombré, la mise en place de supports d'enregistrement courts, la réécriture des procédures, la formation interne des gestes. Ce sont souvent les deux tiers des constats.",
          "Se paie, avec un montant qui dépend entièrement de votre configuration et qu'un professionnel doit chiffrer sur place : le remplacement d'une enceinte froide en fin de vie, la reprise d'un sol ou d'une évacuation, le dégraissage complet et la remise à niveau d'une extraction, l'ajout d'un poste de lavage des mains, la création d'un local ou d'un espace déchets, le traitement d'une infestation installée.",
          "La règle de décision est simple : demandez des devis avant la signature pour tout ce qui relève de la seconde catégorie. Un état des lieux qui liste les points sans les faire chiffrer ne sert qu'à moitié. C'est le devis qui transforme un constat en argument de négociation, et c'est aussi lui qui, plus tard, prouvera à un agent qu'une correction est engagée."
        ]
      },
      {
        titre: "Faire réaliser l'état des lieux par un tiers",
        paragraphes: [
          "Un audit de reprise se conduit comme un audit ordinaire, avec un regard supplémentaire sur ce qui n'est pas modifiable. L'auditeur parcourt les locaux, contrôle les vingt-sept points de notre grille répartis en douze thèmes, mesure, photographie, examine les documents du cédant et remet un rapport écrit avec une note, les constats point par point et un plan d'action classé par priorité.",
          "Ce rapport a deux usages. Avant la signature, il constitue une pièce factuelle et datée à porter dans la discussion, plus solide qu'une impression. Après la reprise, il devient votre feuille de route des premières semaines : chaque écart y porte le correctif attendu et la preuve à constituer, en français courant, pour que vous puissiez le traiter avec vos propres moyens.",
          "audit hygiène est un label privé indépendant, ni certification officielle, ni agrément d'État, ni contrôle des services vétérinaires. Notre prestation s'arrête à la remise du rapport : nous ne faisons pas les travaux, et nous ne promettons jamais l'issue d'une visite officielle, qui appartient aux services de l'État. Ce que vous obtenez est la liste complète de ce qui est à reprendre, avec le correctif attendu pour chacun. Le devis est établi avant intervention, après un échange de quelques minutes, depuis la page contact."
        ]
      }
    ],
    faq: [
      {
        question: "Suis-je responsable des manquements laissés par le cédant ?",
        reponse: "À partir de la reprise, la maîtrise sanitaire est la vôtre : les articles 4 et 5 du règlement (CE) n° 852/2004 du 29 avril 2004 la mettent à la charge de l'exploitant. Le jour d'une visite, on regarde l'état des locaux et vos procédures, pas l'historique du fonds. C'est précisément pour cela que l'état des lieux se fait avant la signature, quand les constats peuvent encore être traités par le cédant, intégrés au prix ou assumés en connaissance de cause."
      },
      {
        question: "Faut-il refaire la déclaration de l'établissement ?",
        reponse: "Oui en cas de changement d'exploitant, qui constitue une modification significative au sens de l'article 6, paragraphe 2 du règlement (CE) n° 852/2004. La déclaration se refait à votre nom auprès du service départemental en charge de la protection des populations, au moyen du formulaire prévu à cet effet. Selon le montage retenu, achat de fonds ou rachat de parts, la situation juridique diffère : examinez ce point avec votre conseil avant de choisir la structure de l'opération."
      },
      {
        question: "Puis-je reprendre le plan de maîtrise sanitaire du cédant ?",
        reponse: "Pas tel quel. Un document de procédures décrit des locaux, des flux, des activités et une équipe donnés. Si vous changez la carte, l'implantation ou l'organisation, il devient faux, et un document faux prouve précisément que l'analyse exigée par l'article 5 du règlement (CE) n° 852/2004 n'a pas été faite. Reprenez-le comme base de travail, gardez le plan des locaux, réécrivez l'analyse des dangers et refaites les supports d'enregistrement à votre main."
      },
      {
        question: "Que faire si je découvre des nuisibles après la reprise ?",
        reponse: "Traitez immédiatement et documentez tout. Retirez et détruisez toute denrée souillée, qui est impropre à la consommation humaine, nettoyez et désinfectez la zone, faites intervenir un prestataire pour une action et non un simple passage de routine, cherchez et bouchez le point d'entrée. Si les indices pointent vers une source collective de l'immeuble, saisissez le bailleur ou la copropriété par écrit sans attendre : la trace de cette démarche fait partie de votre dossier."
      },
      {
        question: "Quels documents demander en priorité au cédant ?",
        reponse: "Ses procédures écrites, ses relevés de température des derniers mois, ses fiches de nettoyage, les rapports de passage de lutte contre les nuisibles, les contrats de maintenance sur le froid et sur l'extraction avec les dernières interventions, les justificatifs d'aptitude au contact alimentaire des équipements récents, les attestations de formation en hygiène des personnes en poste, et l'historique des visites officielles avec les suites données. La façon dont ces pièces arrivent vous renseigne autant que leur contenu."
      },
      {
        question: "Que regarder en premier si je n'ai qu'une heure sur place ?",
        reponse: "Le froid, l'extraction, l'eau et les évacuations, dans cet ordre. Ce sont les postes lourds, ceux qui ne se corrigent pas par de l'organisation et dont le remplacement engage un budget réel. Ouvrez chaque enceinte et mesurez avec votre propre thermomètre, regardez les joints et les condenseurs, vérifiez les filtres de hotte et la date du dernier dégraissage des conduits, testez l'eau chaude, et regardez les siphons et la pente des sols."
      },
      {
        question: "L'état des lieux hygiène remplace-t-il un diagnostic technique ?",
        reponse: "Non. Un audit hygiène constate ce qui pose un problème de sécurité des denrées et hiérarchise les corrections ; il ne se substitue ni à un frigoriste, ni à un plombier, ni à un bureau de contrôle, ni aux diagnostics immobiliers obligatoires. Ce qu'il apporte est la liste ordonnée des points à faire chiffrer, ce qui rend les devis plus rapides à obtenir et la négociation plus concrète. Les deux démarches se complètent, aucune ne dispense de l'autre."
      },
      {
        question: "Vaut-il mieux auditer avant ou après la reprise ?",
        reponse: "Avant, si l'accès aux locaux est possible, parce que c'est le seul moment où les constats ont une valeur de négociation et où les travaux lourds peuvent être discutés. Après, l'audit reste très utile : il donne la feuille de route des premières semaines, pendant que l'organisation n'est pas encore figée et que les habitudes se prennent. Dans les deux cas, le plan d'action est écrit pour que vous le traitiez vous-même, correctif par correctif, avec la preuve à constituer en face de chaque ligne."
      }
    ],
    liens: [
      "/methode",
      "/themes/locaux-equipements",
      "/points-de-controle/etat-et-entretien-des-locaux",
      "/blog/audit-reprise-restaurant",
      "/blog/audit-hygiene-restaurant-ile-de-france",
      "/contact"
    ]
  },
  {
    slug: "hygiene-en-dark-kitchen-et-vente-a-emporter",
    titre: "Hygiène en dark kitchen et en vente à emporter : les points qui changent",
    titreSeo: "Hygiène dark kitchen et vente à emporter : les points clés",
    description: "Transport, emballage, traçabilité, allergènes et information du consommateur : ce qui change vraiment quand la cuisine produit pour la livraison et l'emporté.",
    reponse: "Une dark kitchen est un établissement du secteur alimentaire comme un autre : mêmes obligations de déclaration, mêmes règles de locaux et mêmes procédures fondées sur les principes HACCP, au titre du règlement (CE) n° 852/2004 du 29 avril 2004. Ce qui change tient à ce qui se passe après la cuisine. Le transport relève de l'annexe II, chapitre IV, l'emballage du chapitre X, et l'information du consommateur du règlement (UE) n° 1169/2011 du 25 octobre 2011, dont l'article 14 impose que les mentions obligatoires soient disponibles avant la conclusion de l'achat à distance. La traçabilité doit relier une commande à un lot.",
    ouverture: "Un plat livré passe entre plus de mains et sous plus de conditions qu'un plat servi en salle. C'est le seul écart réel entre les deux modèles, et il se traite avec des règles simples appliquées de bout en bout.",
    sections: [
      {
        titre: "Une dark kitchen reste un établissement à déclarer",
        paragraphes: [
          "Aucun régime particulier ne s'applique aux cuisines qui ne reçoivent pas de public. L'article 6, paragraphe 2 du règlement (CE) n° 852/2004 du 29 avril 2004 impose de notifier à l'autorité compétente chaque établissement placé sous votre contrôle en vue de son enregistrement, et d'informer de toute modification significative. Une cuisine de production sans salle se déclare comme un restaurant, auprès du service départemental en charge de la protection des populations.",
          "Un point revient souvent : plusieurs enseignes exploitées depuis la même cuisine ne créent pas plusieurs établissements. C'est un lieu, avec un exploitant, des locaux, des flux et des procédures. En revanche, si votre déclaration décrit une activité de restauration traditionnelle et que la réalité est devenue une production pour la livraison avec des volumes tout autres, la modification est significative et se signale.",
          "Le fait de ne pas recevoir de public ne réduit rien. Les contrôles officiels sont programmés selon une fréquence fondée sur les risques, en application de l'article 9 du règlement (UE) 2017/625 du 15 mars 2017, qui tient compte notamment de la nature de l'activité et des volumes. Une cuisine de production concentrée sur des produits sensibles n'est pas un profil discret."
        ]
      },
      {
        titre: "Ce que la production en flux change dans la cuisine",
        paragraphes: [
          "Le modèle de la livraison produit des pics extrêmement concentrés. Une cuisine qui sort en deux heures ce qu'une salle sortirait en quatre travaille avec plus de préparations d'avance, plus de produits en attente et plus de manipulations en parallèle. Chacun de ces trois éléments allonge la durée pendant laquelle une denrée reste hors de son enceinte, ce qui est précisément le mécanisme que l'annexe II, chapitre IX, point 5 du règlement (CE) n° 852/2004 cherche à éviter en posant que la chaîne du froid ne doit pas être interrompue.",
          "La conséquence pratique est qu'il faut organiser le temps, pas seulement l'espace. Les préparations avancées se datent, se rangent en enceinte et sortent par petites quantités. Le poste de dressage travaille sur une réserve froide à portée de main plutôt que sur un bac laissé sur le plan pendant tout le service. Ce sont des habitudes qui ne coûtent rien et qui font la différence sur un service dense.",
          "La séparation des flux se pense de la même manière. Quand la surface interdit de séparer physiquement le cru et le cuit, la séparation dans le temps est admise et se justifie, à condition d'être décrite et réellement tenue : on ne travaille pas les deux au même moment sur le même plan, on nettoie et on désinfecte entre les deux. C'est la traduction pratique de l'annexe II, chapitre II, point 1, qui demande une conception et un agencement prévenant la contamination entre et durant les opérations."
        ]
      },
      {
        titre: "Le transport, le chapitre qu'on oublie",
        paragraphes: [
          "L'annexe II, chapitre IV du règlement (CE) n° 852/2004 traite spécifiquement du transport. Les réceptacles de véhicules et les conteneurs servant au transport des denrées doivent être propres et en bon état d'entretien pour protéger les denrées de la contamination, et être conçus et construits de manière à permettre un nettoyage et une désinfection adéquats. Le même chapitre demande que, lorsque c'est nécessaire, les denrées puissent être maintenues à des températures appropriées et que ces températures puissent être contrôlées.",
          "Traduit dans une dark kitchen, cela veut dire que le sac isotherme fait partie de votre dispositif, même quand il appartient au livreur. Un sac gras, taché, jamais nettoyé, dans lequel on a transporté hier un produit qui a coulé, est un point de contamination au même titre qu'un bac sale. Prévoyez des sacs à vous pour ce qui est sensible, un nettoyage entre les tournées et une consigne écrite sur le sujet.",
          "La séparation dans le transport compte autant. Le chaud et le froid ne voyagent pas ensemble dans le même contenant : le premier réchauffe le second et détruit l'intérêt des deux. Les produits d'origine animale et les préparations sensibles voyagent dans un contenant fermé, jamais posés directement sur le fond du sac. Ces règles se transmettent en trente secondes à un livreur, à condition que quelqu'un les lui dise."
        ],
        sous: [
          {
            titre: "Les températures pendant le trajet",
            texte: "Pour les produits d'origine animale et les denrées en contenant, les températures maximales des denrées réfrigérées sont fixées par l'arrêté du 21 décembre 2009, article 3 et annexe I. Le même arrêté fixe, à son annexe I, une température minimale de +63 °C en liaison chaude pour les plats cuisinés et repas livrés chauds. En pratique, un plat sort à sa température de service et le trajet doit être organisé pour ne pas la faire chuter : contenant fermé, sac isotherme réellement isolant, temps d'attente réduit entre le passe et le départ."
          }
        ]
      },
      {
        titre: "L'emballage et les contenants",
        paragraphes: [
          "L'annexe II, chapitre X du règlement (CE) n° 852/2004 pose que les matériaux de conditionnement et d'emballage ne doivent pas être une source de contamination, qu'ils doivent être entreposés de manière à ne pas y être exposés, et que les opérations de conditionnement et d'emballage doivent être effectuées de façon à éviter la contamination des produits. Le stock d'emballages n'a donc rien à faire par terre dans un couloir ou sous une plonge.",
          "L'aptitude au contact alimentaire relève du règlement (CE) n° 1935/2004 du 27 octobre 2004, dont l'article 3 impose que les matériaux ne cèdent pas aux denrées des constituants susceptibles de présenter un danger pour la santé, d'entraîner une modification inacceptable de leur composition ou une altération de leurs caractères organoleptiques. Conservez les attestations de vos fournisseurs d'emballages, et vérifiez la compatibilité annoncée avec le chaud, le gras et le passage au four à micro-ondes selon vos usages.",
          "Choisissez ensuite les contenants pour ce qu'ils font vraiment pendant le trajet. Un couvercle qui ne ferme pas, une barquette qui se déforme au chaud, une soupe dans un contenant sans opercule créent des problèmes que la cuisine ne verra jamais et que le client verra tout de suite. Séparez les sauces, les crudités et les éléments chauds, et prévoyez un système de fermeture inviolable qui montre que rien n'a été ouvert en chemin."
        ]
      },
      {
        titre: "La traçabilité, de la commande au lot",
        paragraphes: [
          "L'article 18 du règlement (CE) n° 178/2002 du 28 janvier 2002 impose que la traçabilité soit établie à toutes les étapes et que l'exploitant soit en mesure d'identifier ses fournisseurs, avec des systèmes permettant de mettre cette information à la disposition des autorités à leur demande. Pour les denrées d'origine animale, le règlement d'exécution (UE) n° 931/2011 du 19 septembre 2011 précise les informations à détenir.",
          "Dans une dark kitchen, cette exigence prend un sens très concret : le jour où une réclamation porte sur une commande précise, il faut pouvoir remonter du numéro de commande au lot de matière première utilisée. Cela suppose de savoir quel jour et quelle production a servi cette commande. Le moyen le plus simple reste de conserver les étiquettes et les bons de livraison par jour, et de pouvoir rapprocher une date de commande d'une date de production.",
          "Aucune disposition ne fixe de durée précise de conservation des étiquettes et des bons de livraison en restauration : cette durée relève de vos procédures et doit pouvoir être expliquée. Calez-la sur la durée de vie de vos produits augmentée d'une marge, en tenant compte du délai pendant lequel une réclamation peut vous parvenir via une plateforme, qui est souvent plus long qu'en salle."
        ]
      },
      {
        titre: "Les allergènes, obligation renforcée à distance",
        paragraphes: [
          "L'article 9, paragraphe 1, point c) du règlement (UE) n° 1169/2011 du 25 octobre 2011 rend obligatoire la mention de tout ingrédient ou auxiliaire technologique figurant à son annexe II et provoquant des allergies ou des intolérances, encore présent dans le produit fini même sous forme modifiée. L'article 44, paragraphe 1, point a) maintient cette obligation pour les denrées non préemballées.",
          "La vente à distance ajoute une exigence propre. L'article 14 du même règlement prévoit que, pour les denrées proposées à la vente par communication à distance, les mentions obligatoires soient disponibles avant la conclusion de l'achat, sur le support de vente à distance, sans frais supplémentaires. Autrement dit, l'information sur les allergènes doit figurer sur votre page de commande, pas être donnée au téléphone après coup ni imprimée sur le sac.",
          "Cela impose une discipline : tout changement de recette ou de référence fournisseur se répercute sur la fiche en ligne le jour même. C'est la difficulté réelle du modèle, parce que la fiche est gérée sur une plateforme, souvent par une autre personne que celle qui cuisine. Nommez explicitement le responsable de la mise à jour et conservez les étiquettes fournisseurs qui justifient chaque mention."
        ]
      },
      {
        titre: "La contamination croisée allergène en production dense",
        paragraphes: [
          "L'annexe II, chapitre IX, point 9 du règlement (CE) n° 852/2004, inséré par le règlement (UE) 2021/382 de la Commission du 3 mars 2021, impose que les équipements, réceptacles et conteneurs utilisés pour une substance ou un produit allergène visé à l'annexe II du règlement (UE) n° 1169/2011 ne soient pas utilisés pour des denrées n'en contenant pas, à moins d'avoir été nettoyés et contrôlés au moins pour vérifier l'absence de débris visibles.",
          "En production rapide et parallèle, c'est le point le plus exposé. La même pince, la même planche, la même friteuse, le même bac de sauce servent à des recettes différentes en quelques secondes. La solution la moins coûteuse est l'ordonnancement : traiter les productions sans allergène avant celles qui en contiennent, et prévoir un matériel identifiable pour les produits les plus sensibles.",
          "Le matériel dédié et l'ordre de production ne sont pas imposés en tant que tels : ce sont des moyens à définir et à justifier dans vos procédures. Écrivez celui que vous retenez, expliquez-le à l'équipe et vérifiez qu'il tient un soir de forte affluence, parce que c'est le seul moment qui compte."
        ]
      },
      {
        titre: "Le point de retrait et l'attente des commandes",
        paragraphes: [
          "Le sas de remise aux livreurs est une zone à part entière et il est souvent le maillon le moins pensé. Les commandes y attendent, parfois longtemps quand un livreur tarde, à température ambiante, à côté d'une porte qui s'ouvre en permanence. L'annexe II, chapitre IX, point 3 du règlement (CE) n° 852/2004 impose que les denrées soient protégées de toute contamination à toutes les étapes, et cette étape en fait partie.",
          "Organisez-la comme un poste : une surface nettoyable, dégagée, hors passage, avec un rangement qui empêche les sacs de se toucher et de traîner par terre. Prévoyez de quoi maintenir le chaud si le délai d'attente est réel, et de quoi tenir le froid pour les produits froids. Une commande prête trop tôt n'est pas une commande en avance, c'est une commande qui perd sa température.",
          "Traitez la porte comme une entrée. Des livreurs qui pénètrent en zone de production, avec leur sac et leur tenue de rue, créent un flux entrant que rien ne maîtrise. Une remise au comptoir ou par un passe résout la question, et elle protège aussi votre équipe des interruptions pendant le service."
        ]
      },
      {
        titre: "Les livreurs et les plateformes : qui répond de quoi",
        paragraphes: [
          "L'article 17 du règlement (CE) n° 178/2002 du 28 janvier 2002 pose que les exploitants du secteur alimentaire veillent, à toutes les étapes de la production, de la transformation et de la distribution dans les entreprises placées sous leur contrôle, à ce que les denrées répondent aux prescriptions de la législation alimentaire. La ligne de partage est donc celle du contrôle effectif, et elle mérite d'être regardée de près quand des tiers interviennent.",
          "Ce que vous maîtrisez est clair : la production, l'emballage, la fermeture, la température au départ, l'état de la zone de remise, et les consignes données. Ce que vous ne maîtrisez pas dans un modèle de livraison ouvert est le trajet et l'état du sac du livreur. Vous pouvez néanmoins réduire cette zone grise en fournissant vos propres contenants isothermes pour les produits sensibles et en affichant une consigne courte au point de retrait.",
          "Gardez la trace de ce que vous avez mis en place. Une consigne affichée, un registre de nettoyage des sacs qui vous appartiennent, une note transmise à la plateforme sur les conditions de remise : ce sont des éléments qui montrent que le sujet est traité chez vous, quelle que soit l'organisation contractuelle en aval."
        ]
      },
      {
        titre: "Ce qui se vérifie facilement chez vous",
        paragraphes: [
          "Une cuisine de livraison se contrôle bien avec cinq gestes rapides. Ouvrir une enceinte au hasard et regarder si chaque contenant porte une identification et une date. Mesurer la température d'un plat au moment où il part, pas au moment où il sort du feu. Ouvrir un sac de transport et regarder son état intérieur. Prendre une commande de la veille sur la plateforme et remonter au lot de matière première. Ouvrir la fiche en ligne d'un plat modifié récemment et vérifier que les allergènes ont suivi.",
          "Ces cinq vérifications tiennent en quelques minutes et couvrent l'essentiel des points spécifiques au modèle. Faites-les à un moment de charge réelle, jamais à onze heures du matin dans une cuisine rangée : ce n'est pas ce moment-là qui pose problème.",
          "Un audit sur place contrôle les vingt-sept points de notre grille répartis en douze thèmes et remet un rapport écrit avec une note, les constats point par point et un plan d'action classé par priorité, où chaque écart porte le correctif attendu et la preuve à constituer. Vous savez alors exactement quoi corriger, et vous le traitez vous-même, à votre rythme et avec vos moyens. audit hygiène est un label privé indépendant, ni certification officielle, ni agrément d'État. Le devis est établi avant intervention, après un échange de quelques minutes, depuis la page contact."
        ]
      }
    ],
    faq: [
      {
        question: "Une dark kitchen doit-elle être déclarée comme un restaurant ?",
        reponse: "Oui. L'article 6, paragraphe 2 du règlement (CE) n° 852/2004 du 29 avril 2004 impose de notifier à l'autorité compétente chaque établissement placé sous votre contrôle en vue de son enregistrement, sans distinguer selon qu'il reçoit ou non du public. La déclaration se fait auprès du service départemental en charge de la protection des populations. Plusieurs enseignes exploitées depuis la même cuisine ne créent pas plusieurs établissements, mais un changement significatif d'activité ou de volume se signale."
      },
      {
        question: "Faut-il fournir des sacs isothermes aux livreurs ?",
        reponse: "Aucune disposition n'impose de fournir le sac. Ce qui est imposé, par l'annexe II, chapitre IV du règlement (CE) n° 852/2004, c'est que les conteneurs servant au transport des denrées soient propres, en bon état d'entretien et conçus pour permettre un nettoyage adéquat, et que les températures appropriées puissent être maintenues et contrôlées lorsque c'est nécessaire. Fournir vos propres contenants pour les produits sensibles est le moyen le plus simple de maîtriser un maillon que vous ne voyez pas."
      },
      {
        question: "Comment afficher les allergènes sur une plateforme de commande ?",
        reponse: "L'information doit être disponible avant la conclusion de l'achat, sur le support de vente à distance et sans frais supplémentaires : c'est ce que prévoit l'article 14 du règlement (UE) n° 1169/2011 du 25 octobre 2011. Concrètement, elle figure sur la fiche du plat, pas dans un message envoyé après la commande. Tenez un tableau croisant vos plats et les substances de l'annexe II du même règlement, mettez-le à jour le jour même de tout changement de recette ou de fournisseur, et nommez la personne qui en a la charge."
      },
      {
        question: "À quelle température un plat chaud doit-il partir en livraison ?",
        reponse: "L'arrêté du 21 décembre 2009 fixe à son annexe I une température minimale de +63 °C en liaison chaude pour les plats cuisinés et repas livrés chauds. Les températures maximales des denrées réfrigérées figurent au même arrêté pour les produits d'origine animale et les denrées en contenant, et à l'arrêté du 8 octobre 2013 pour les autres. Organisez le départ pour que la température tienne : contenant fermé, sac réellement isolant, et attente réduite entre le passe et le livreur."
      },
      {
        question: "Le refroidissement doit-il se faire en moins de deux heures ?",
        reponse: "Le seuil de +63 °C à +10 °C en moins de deux heures figure à l'annexe IV de l'arrêté du 21 décembre 2009, qui vise la restauration collective. Un établissement en remise directe, ce qui est le cas d'une dark kitchen livrant au consommateur final, n'y est pas soumis. Ce délai reste une référence professionnelle solide, à reprendre, adapter et justifier dans vos procédures. L'obligation qui s'impose à vous est celle de l'annexe II, chapitre IX, point 6 du règlement (CE) n° 852/2004 : réfrigérer dès que possible après le traitement thermique."
      },
      {
        question: "Faut-il des locaux séparés pour chaque marque exploitée ?",
        reponse: "Non, rien ne l'impose. Ce qui est exigé, c'est que la conception et l'agencement des locaux permettent de prévenir la contamination entre et durant les opérations, selon l'annexe II, chapitre II, point 1 du règlement (CE) n° 852/2004. Quand plusieurs cartes coexistent dans une même cuisine, la difficulté réelle porte sur les allergènes et sur la séparation des flux : elle se traite par l'ordonnancement des productions, par du matériel identifiable et par des procédures écrites que l'équipe applique en pointe."
      },
      {
        question: "Qui est responsable si le plat est arrivé froid ou souillé ?",
        reponse: "L'article 17 du règlement (CE) n° 178/2002 du 28 janvier 2002 fait peser sur chaque exploitant le respect de la législation alimentaire dans les entreprises placées sous son contrôle. La ligne de partage est donc celle du contrôle effectif, et la répartition précise entre restaurant, plateforme et livreur relève des situations et des contrats. Ce que vous pouvez faire est réduire la zone grise : contenants fermés et isothermes fournis par vous pour les produits sensibles, consigne écrite au point de retrait, et trace de ces mesures."
      },
      {
        question: "Comment relier une commande à un lot de matière première ?",
        reponse: "En conservant les étiquettes et les bons de livraison classés par jour, et en pouvant rapprocher une date de commande d'une date de production. L'article 18 du règlement (CE) n° 178/2002 impose de pouvoir identifier vos fournisseurs et de mettre l'information à disposition des autorités à leur demande. Aucune durée de conservation n'est fixée par un texte pour la restauration : calez la vôtre sur la durée de vie de vos produits augmentée d'une marge, en tenant compte du délai de réclamation via les plateformes."
      }
    ],
    liens: [
      "/methode",
      "/themes/allergenes",
      "/points-de-controle/etiquetage-et-dlc-dluo-respectes",
      "/blog/hygiene-dark-kitchen-ile-de-france",
      "/blog/allergenes-restaurant-obligations",
      "/contact"
    ]
  },
  {
    slug: "hygiene-en-food-truck-et-restauration-mobile",
    titre: "Hygiène en food truck et restauration mobile : eau, froid, mains, les contraintes réelles",
    titreSeo: "Hygiène food truck : eau, froid, lavage des mains",
    description: "Ce que le règlement demande à une installation mobile, et comment tenir l'eau, le froid et le lavage des mains dans quelques mètres carrés qui roulent.",
    reponse: "Un food truck relève de l'annexe II, chapitre III du règlement (CE) n° 852/2004 du 29 avril 2004, qui vise les installations mobiles ou temporaires. Il doit être implanté, conçu et nettoyé de façon à éviter les risques de contamination, disposer d'installations permettant de se laver et de se sécher les mains de manière hygiénique, d'une alimentation en eau potable en quantité suffisante, de surfaces en contact faciles à nettoyer, de moyens de maintenir et de surveiller les températures, et d'un dispositif d'entreposage et d'élimination des déchets. Les exigences sont adaptées au format, elles ne sont pas allégées sur le fond.",
    ouverture: "Tout ce qui est simple dans une cuisine fixe devient une question de place et d'autonomie dans un camion. Les points qui posent réellement problème sont toujours les mêmes trois : l'eau, le froid et le lavage des mains.",
    sections: [
      {
        titre: "Le texte qui s'applique aux installations mobiles",
        paragraphes: [
          "L'annexe II du règlement (CE) n° 852/2004 du 29 avril 2004 consacre son chapitre III aux installations mobiles ou temporaires, aux locaux utilisés occasionnellement comme cuisine et aux distributeurs automatiques. Un camion aménagé, une remorque, un étal de marché ou une tente relèvent de ce chapitre plutôt que des chapitres I et II qui visent les locaux fixes.",
          "Ce chapitre demande que ces installations soient implantées, conçues, construites, nettoyées et entretenues de manière à éviter les risques de contamination, notamment par les animaux et les organismes nuisibles. Il exige ensuite des installations appropriées pour maintenir une hygiène personnelle adéquate, dont de quoi se laver et se sécher les mains de manière hygiénique, des surfaces en contact avec les denrées en bon état, faciles à nettoyer et le cas échéant à désinfecter, de quoi nettoyer et désinfecter les instruments et équipements, une alimentation en eau potable en quantité suffisante, des dispositions pour l'entreposage et l'élimination hygiéniques des déchets, des moyens de maintenir et de surveiller les températures, et un placement des denrées évitant la contamination.",
          "L'esprit du texte est important à saisir : il adapte la forme des exigences au format mobile, il ne les supprime pas. La différence avec un local fixe porte sur les moyens, pas sur le résultat attendu. Un camion qui ne peut pas maintenir une température ne bénéficie d'aucune tolérance parce qu'il roule."
        ]
      },
      {
        titre: "L'eau, la contrainte numéro un",
        paragraphes: [
          "L'alimentation en eau potable en quantité suffisante est exigée, et le mot suffisante se juge à l'usage réel d'un service, pas à la contenance affichée d'un réservoir. Comptez ce que consomment le lavage des mains répété, le rinçage des ustensiles, le nettoyage des surfaces en cours de service et le nettoyage de fin de journée. La panne d'eau à quarante minutes de la fin du service est le problème le plus banal de la restauration mobile.",
          "Le réservoir d'eau propre se remplit à un point d'eau potable et se traite comme un équipement au contact des denrées : il se vidange, se nettoie et se désinfecte à une fréquence que vous fixez et que vous tenez. Un réservoir laissé plein entre deux sorties, tiède, dans un camion fermé au soleil, est un problème en soi. Le réservoir d'eaux usées se vide dans un point d'évacuation prévu à cet effet, jamais au caniveau.",
          "La glace suit la même règle que dans une cuisine fixe. L'annexe II, chapitre VII, point 4 du règlement (CE) n° 852/2004 impose que la glace entrant en contact avec les denrées ou susceptible de les contaminer soit fabriquée à partir d'eau potable et manipulée et stockée dans des conditions prévenant toute contamination. En mobile, cela signifie un bac dédié, fermé, avec une pelle qui ne reste pas dedans, et jamais de glace de refroidissement de bouteilles servie dans un verre."
        ]
      },
      {
        titre: "Le lavage des mains dans quelques mètres carrés",
        paragraphes: [
          "C'est le point le plus regardé et le plus souvent défaillant. Le chapitre III demande des installations appropriées permettant de se laver et de se sécher les mains de manière hygiénique. Il n'énonce pas, comme le chapitre I pour les locaux fixes, l'exigence d'eau chaude et froide, mais un lave-mains alimenté en eau chaude reste ce qu'on attend d'une installation sérieuse et ce qui rend le geste réellement efficace.",
          "Le dispositif doit être disponible sans manipulation compliquée : un point d'eau dédié au lavage des mains, distinct du bac de rinçage des ustensiles, avec du savon et de quoi se sécher de façon hygiénique. Un rouleau de papier ménager posé sur le plan de travail et une bouteille de gel remplacent trop souvent l'installation ; ils ne la remplacent pas.",
          "Le geste lui-même se perd vite quand on est seul dans un camion et qu'on encaisse. La solution qui fonctionne est organisationnelle : séparer les rôles quand l'équipe compte deux personnes, l'une à la caisse et l'autre à la production, ou prévoir un temps de lavage systématique à chaque retour à la production quand on est seul. Écrivez la règle que vous retenez, elle vaut mieux qu'une bonne intention."
        ],
        sous: [
          {
            titre: "Les sanitaires",
            texte: "Un food truck ne peut pas embarquer de sanitaires. La question se règle par l'emplacement : sanitaires du marché, de l'entreprise qui vous accueille, de l'événement, ou établissement voisin avec accord. Ce n'est pas un détail administratif, c'est la condition d'un lavage des mains correct après passage aux toilettes. Vérifiez ce point avant d'accepter un emplacement, pas le jour du service."
          }
        ]
      },
      {
        titre: "Le froid et l'autonomie",
        paragraphes: [
          "Le chapitre III demande des installations permettant de maintenir et de surveiller les températures des denrées. La difficulté du mobile n'est pas d'avoir du froid, c'est de le tenir : porte ouverte en permanence, chaleur du poste de cuisson à cinquante centimètres, ensoleillement direct sur la carrosserie, coupure d'alimentation pendant les trajets. Chacun de ces facteurs joue et ils s'additionnent l'été.",
          "Les seuils applicables restent ceux des denrées, pas ceux du format. Ils viennent de l'arrêté du 21 décembre 2009 pour les produits d'origine animale et les denrées en contenant, et de l'arrêté du 8 octobre 2013 pour les autres. Le principe de fond est celui de l'annexe II, chapitre IX, point 5 du règlement (CE) n° 852/2004 : la chaîne du froid ne doit pas être interrompue.",
          "L'organisation compte plus que le matériel. Chargez le camion avec des enceintes déjà froides et des produits déjà à température, limitez la casse pendant le trajet avec des plaques eutectiques, prévoyez une petite enceinte de service au plus près du poste pour éviter d'ouvrir la grande, et mesurez à cœur avec une sonde plutôt que de croire l'afficheur. Un relevé au chargement, un à l'arrivée et un en fin de service suffisent, à condition qu'ils soient réellement faits."
        ]
      },
      {
        titre: "Le trajet, un transport de denrées",
        paragraphes: [
          "Quand vous chargez le camion à votre laboratoire pour rejoindre un emplacement, vous faites du transport de denrées, et l'annexe II, chapitre IV du règlement (CE) n° 852/2004 s'applique. Les réceptacles et conteneurs doivent être propres et en bon état d'entretien, conçus pour permettre un nettoyage et une désinfection adéquats, et permettre le maintien à des températures appropriées lorsque c'est nécessaire, avec la possibilité de contrôler ces températures.",
          "Le chapitre demande aussi que, lorsque des denrées et d'autres produits sont transportés en même temps, ils soient effectivement séparés. En pratique, cela veut dire que le carton d'emballages, le groupe électrogène, les bouteilles de gaz et les produits d'entretien ne voyagent pas mélangés aux bacs de denrées. Cette séparation coûte deux minutes de rangement et supprime un constat facile.",
          "Prévoyez enfin le calage. Un bac qui bascule dans un virage salit une enceinte entière et coûte un service. Des rangements fermés, des étagères avec butée et des couvercles verrouillés valent mieux que la meilleure des procédures écrites."
        ]
      },
      {
        titre: "Les surfaces, le nettoyage et les déchets",
        paragraphes: [
          "Les surfaces en contact avec les denrées doivent être en bon état, faciles à nettoyer et le cas échéant à désinfecter, ce qui suppose des matériaux lisses, lavables et non toxiques. Dans un camion, les points faibles sont connus : les jonctions entre plan de travail et paroi, les angles non congés, les vis apparentes, les rebords de trappe, les charnières. Ce sont ces zones qui se contrôlent et qui, mal conçues, deviennent des problèmes permanents.",
          "Le nettoyage se pense en deux temps. Pendant le service, un dispositif à portée de main pour nettoyer et désinfecter les surfaces et les ustensiles entre deux usages, avec un produit adapté au contact alimentaire et son temps de contact respecté. Après le service, un nettoyage complet à un endroit prévu pour cela, avec de l'eau et de l'évacuation. Aucun texte n'impose la forme d'un plan de nettoyage écrit, mais c'est le moyen le plus simple de prouver l'application effective exigée par l'article 5, paragraphe 2, point g) du règlement (CE) n° 852/2004.",
          "Les déchets suivent le chapitre VI : retrait aussi rapide que possible des zones où se trouvent des denrées, conteneurs dotés d'une fermeture, faciles à nettoyer, et élimination hygiénique. En mobile, la contrainte réelle est l'absence de local : prévoyez un contenant fermé embarqué, videz-le dans un point d'élimination autorisé, et ne comptez pas sur la corbeille publique de l'emplacement."
        ]
      },
      {
        titre: "Les nuisibles et l'environnement de l'emplacement",
        paragraphes: [
          "L'annexe II, chapitre IX, point 4 impose de mettre au point des méthodes adéquates de lutte contre les organismes nuisibles, et le chapitre III demande explicitement une implantation évitant les risques de contamination, notamment par les animaux et les organismes nuisibles. En mobile, la lutte passe moins par des appâts que par la fermeture : trappes closes, ouvertures grillagées, denrées jamais laissées à l'air libre, camion fermé quand il est stationné.",
          "L'environnement de l'emplacement compte autant que le camion. Un stationnement à côté d'un local à poubelles collectif, sous des arbres à oiseaux, à proximité immédiate d'une zone de travaux poussiéreuse ou d'un axe très circulant crée une exposition que rien à l'intérieur ne compensera. Regardez ce point quand vous acceptez un emplacement récurrent.",
          "Le stationnement entre deux services mérite aussi une attention. Un camion garé plusieurs jours avec des restes de denrées, des miettes sous les équipements ou un réservoir d'eaux usées non vidé attire ce qu'on ne veut pas voir. Une routine de fin de service qui vide, nettoie et referme règle la question."
        ]
      },
      {
        titre: "La traçabilité et les documents à bord",
        paragraphes: [
          "L'obligation documentaire ne s'allège pas en mobile. L'article 5 du règlement (CE) n° 852/2004 impose des procédures permanentes fondées sur les principes HACCP et des documents prouvant l'application effective des mesures, tenus à jour et conservés pendant une période appropriée. Comme aucune durée d'archivage chiffrée n'est fixée par le texte, c'est à vous de la définir et de pouvoir l'expliquer.",
          "Ce qui doit être à bord est peu volumineux : le document décrivant vos procédures, le relevé de température en cours, les fiches de nettoyage, les étiquettes ou numéros de lot conservés, l'attestation de formation en hygiène alimentaire de la personne concernée. Une pochette rigide accrochée dans le camion suffit, et elle doit être accessible à la personne qui tient le service, pas restée au laboratoire.",
          "La traçabilité fonctionne comme ailleurs : l'article 18 du règlement (CE) n° 178/2002 du 28 janvier 2002 impose d'être en mesure d'identifier ses fournisseurs et de mettre l'information à disposition des autorités à leur demande. Conservez les bons de livraison et les étiquettes des produits sensibles, classés par jour de service, ce qui permet aussi de relier un emplacement et une date à une production."
        ]
      },
      {
        titre: "Les formalités et l'organisation autour",
        paragraphes: [
          "L'établissement se déclare comme tout autre : l'article 6, paragraphe 2 du règlement (CE) n° 852/2004 impose de notifier à l'autorité compétente chaque établissement placé sous votre contrôle en vue de son enregistrement, et de signaler toute modification significative. Le camion, et le laboratoire si vous en avez un, entrent dans cette déclaration auprès du service départemental en charge de la protection des populations.",
          "Au moins une personne de l'effectif doit justifier de la formation spécifique en hygiène alimentaire prévue à l'article L. 233-4 du code rural et de la pêche maritime, précisé par les articles D. 233-11 et D. 233-12 issus du décret n° 2011-731 du 24 juin 2011, dont le cahier des charges est fixé par l'arrêté du 12 février 2024. Une expérience professionnelle d'au moins trois ans dans le secteur alimentaire comme gestionnaire ou exploitant vaut satisfaction de cette obligation. L'attestation se range dans la pochette du camion.",
          "Les autorisations d'occupation du domaine public, les emplacements de marché et la carte permettant l'exercice d'une activité commerciale ambulante relèvent d'autres réglementations et d'autres interlocuteurs. Elles ne concernent pas l'hygiène, mais elles conditionnent l'accès à l'eau, à l'électricité et aux sanitaires, ce qui rend leur négociation directement utile à votre organisation sanitaire."
        ]
      },
      {
        titre: "La routine qui tient un camion",
        paragraphes: [
          "Trois moments suffisent. Au chargement : enceintes déjà froides, produits à température, relevé noté, réservoir d'eau propre rempli et réservoir d'eaux usées vidé, savon et essuie-mains à bord, contenant à déchets fermé et vide. En arrivant : relevé de température, mise en route du froid, contrôle de la propreté des surfaces après le trajet. En fin de service : relevé, tri et évacuation des déchets, nettoyage complet, vidange, fermeture.",
          "Une feuille unique qui reprend ces trois moments, plastifiée et accrochée dans le camion, remplace un classeur entier. Elle a l'avantage d'être remplie, ce qui est la seule qualité qui compte pour un support d'enregistrement. Une feuille ambitieuse et vierge est un constat qui s'écrit tout seul.",
          "Un audit sur place contrôle les vingt-sept points de notre grille répartis en douze thèmes, adaptés au format de votre installation, et remet un rapport écrit avec une note, les constats point par point et un plan d'action classé par priorité, où chaque écart porte le correctif attendu et la preuve à constituer. Vous savez alors exactement quoi corriger, et vous le traitez vous-même. audit hygiène est un label privé indépendant, ni certification officielle, ni agrément d'État. Le devis est établi avant intervention, après un échange de quelques minutes, depuis la page contact."
        ]
      }
    ],
    faq: [
      {
        question: "Un food truck a-t-il les mêmes obligations qu'un restaurant ?",
        reponse: "Les mêmes sur le fond, adaptées sur la forme. L'annexe II, chapitre III du règlement (CE) n° 852/2004 du 29 avril 2004 vise spécifiquement les installations mobiles ou temporaires et décrit ce qu'elles doivent permettre : éviter les risques de contamination, se laver et se sécher les mains de manière hygiénique, disposer d'eau potable en quantité suffisante, de surfaces nettoyables, de moyens de maintenir et de surveiller les températures et d'un dispositif pour les déchets. Le format change les moyens, pas le résultat attendu."
      },
      {
        question: "Faut-il de l'eau chaude dans un camion ?",
        reponse: "Le chapitre III demande des installations appropriées permettant de se laver et de se sécher les mains de manière hygiénique, sans reprendre expressément l'exigence d'eau chaude et froide que le chapitre I pose pour les locaux fixes. En pratique, un lave-mains alimenté en eau chaude est ce qu'on attend d'une installation sérieuse et ce qui rend le geste réellement efficace. Un chauffe-eau de faible capacité suffit et supprime définitivement la question."
      },
      {
        question: "Le gel hydroalcoolique peut-il remplacer le lave-mains ?",
        reponse: "Non. Le gel est un complément, pas un substitut : il ne retire ni les souillures, ni les matières grasses, ni les résidus alimentaires, et son efficacité chute sur des mains sales. Ce que le texte demande est une installation permettant de se laver et de se sécher les mains de manière hygiénique. Prévoyez un point d'eau dédié au lavage des mains, distinct du bac de rinçage des ustensiles, avec du savon et de quoi se sécher, et gardez le gel pour ce qu'il fait bien."
      },
      {
        question: "Comment tenir le froid quand la porte s'ouvre en permanence ?",
        reponse: "En organisant plutôt qu'en augmentant la puissance. Chargez des enceintes déjà froides avec des produits déjà à température, utilisez des plaques eutectiques pendant le trajet, prévoyez une petite enceinte de service au plus près du poste pour ne pas ouvrir la grande à chaque commande, protégez la carrosserie du soleil direct quand c'est possible, et mesurez à cœur avec une sonde plutôt que de vous fier à l'afficheur. Un relevé au chargement, un à l'arrivée et un en fin de service suffisent."
      },
      {
        question: "Où vider les eaux usées et les déchets ?",
        reponse: "Dans les points d'évacuation et d'élimination prévus à cet effet, jamais au caniveau ni dans une corbeille publique. Le chapitre VI de l'annexe II du règlement (CE) n° 852/2004 demande que les déchets soient retirés aussi vite que possible des zones où se trouvent des denrées, déposés dans des conteneurs dotés d'une fermeture faciles à nettoyer, et éliminés de façon hygiénique. Réglez ce point avec le gestionnaire de l'emplacement avant d'accepter une place récurrente."
      },
      {
        question: "Faut-il un laboratoire fixe en plus du camion ?",
        reponse: "Aucun texte ne l'impose. Beaucoup d'exploitants en prennent un parce que la préparation à l'avance dans quelques mètres carrés est difficile et parce qu'il apporte de l'eau, de l'évacuation, du stockage et du froid. Si vous en avez un, il fait partie de votre déclaration et le trajet entre le laboratoire et l'emplacement devient un transport de denrées, soumis à l'annexe II, chapitre IV du règlement (CE) n° 852/2004."
      },
      {
        question: "Quels documents doivent être à bord ?",
        reponse: "Le document décrivant vos procédures, le relevé de température en cours, les fiches de nettoyage, les étiquettes ou numéros de lot conservés, et l'attestation de formation en hygiène alimentaire de la personne concernée. Une pochette rigide accrochée dans le camion suffit, à condition qu'elle soit accessible à la personne qui tient le service et non restée au laboratoire. L'article 5 du règlement (CE) n° 852/2004 demande des documents tenus à jour et conservés pendant une période appropriée, sans fixer de durée chiffrée."
      },
      {
        question: "Un contrôle peut-il avoir lieu sur un marché ou un festival ?",
        reponse: "Oui, comme partout ailleurs. Les contrôles officiels sont effectués selon une fréquence fondée sur les risques et, en règle générale, sans préavis, en application de l'article 9 du règlement (UE) 2017/625 du 15 mars 2017. Les événements à forte affluence font l'objet d'une attention particulière parce que les volumes et l'improvisation y sont élevés. La préparation utile est la même qu'ailleurs : de l'eau, du froid tenu, un lave-mains opérationnel et une feuille de relevés réellement remplie."
      }
    ],
    liens: [
      "/methode",
      "/themes/eau-glace",
      "/points-de-controle/lavage-des-mains-equipement-et-pratique",
      "/blog/hygiene-food-truck-marche-ile-de-france",
      "/blog/chaine-du-froid-restauration",
      "/contact"
    ]
  },
  {
    slug: "frequence-des-audits-et-suivi-dans-la-duree",
    titre: "Fréquence des audits et suivi dans la durée : à quel rythme, et quoi surveiller entre deux",
    titreSeo: "Fréquence des audits hygiène et suivi dans la durée",
    description: "Pourquoi la conformité retombe dans une cuisine, à quel rythme refaire un audit hygiène, et les vérifications que vous menez vous-même entre deux passages.",
    reponse: "Aucun texte n'impose de faire auditer son établissement par un tiers : la fréquence relève de votre organisation. Ce qui se constate en revanche, c'est que la conformité retombe quand plus personne ne la mesure, au rythme des changements d'équipe, de carte et de saison. Un rythme qui fonctionne consiste à faire mesurer l'établissement de l'extérieur à intervalle régulier, et à tenir entre deux passages des vérifications internes courtes : un tour quotidien de quelques minutes, un tour hebdomadaire un peu plus large, et un examen mensuel des points qui dérivent lentement.",
    ouverture: "La difficulté d'une cuisine n'est pas d'être conforme un jour, c'est de l'être encore six mois plus tard, quand l'équipe a changé et que la carte s'est allongée. Le suivi dans la durée est un sujet d'organisation, pas de réglementation.",
    sections: [
      {
        titre: "Ce que la loi impose, et ce qu'elle n'impose pas",
        paragraphes: [
          "Aucune disposition n'oblige un restaurant à recourir à un auditeur extérieur, ni à une fréquence particulière. Ce qui est imposé est ailleurs : les articles 4 et 5 du règlement (CE) n° 852/2004 du 29 avril 2004 mettent à la charge de l'exploitant le respect permanent des règles générales d'hygiène et la mise en place, l'application et le maintien de procédures fondées sur les principes HACCP. Le mot maintien est celui qui compte ici.",
          "L'article 5 va plus loin en exigeant, à son paragraphe 2, point f), d'établir des procédures de vérification périodique du bon fonctionnement des mesures. Autrement dit, la loi vous demande de vérifier vous-même que votre dispositif marche, à une périodicité que vous définissez et que vous justifiez. C'est cette vérification interne, et non l'audit externe, qui constitue l'obligation.",
          "L'audit externe est un choix, et il se justifie par ce qu'il apporte : un regard qui n'a pas l'habitude, une grille écrite, des mesures, et une liste de corrections avec le correctif attendu pour chacune. Il ne se substitue pas à votre vérification interne, il en mesure la qualité."
        ]
      },
      {
        titre: "Pourquoi la conformité retombe",
        paragraphes: [
          "Le premier moteur de dérive est le renouvellement des personnes. Une consigne vit dans la tête de ceux qui l'ont apprise. Quand un commis part, il emporte la raison d'être d'un geste, et son remplaçant apprend la version raccourcie de son voisin. Au bout de trois relais, la sonde ne se désinfecte plus entre deux produits et personne ne sait dire depuis quand.",
          "Le deuxième est le changement de production. Une carte qui s'allonge, un plat qui demande une préparation à l'avance, l'ajout d'une activité de vente à emporter, une machine sous vide achetée d'occasion : chaque nouveauté modifie l'analyse des dangers sans que personne ne rouvre le document qui la décrit. Le décalage entre ce qui est écrit et ce qui se fait s'installe silencieusement.",
          "Le troisième est la charge. Une organisation calibrée pour un service normal se déforme aux périodes denses, et les premiers gestes abandonnés sont toujours les mêmes : le relevé, l'étiquette, le nettoyage de la zone difficile. Ce n'est pas de la négligence, c'est un arbitrage sous contrainte de temps. Ce qui distingue les maisons solides, c'est qu'elles reprennent ces gestes dès que la pointe est passée, parce que quelqu'un le vérifie."
        ]
      },
      {
        titre: "À quel rythme refaire mesurer l'établissement",
        paragraphes: [
          "Il n'existe pas de bonne réponse universelle, mais un raisonnement simple. Plus la production est sensible, plus l'équipe tourne et plus la carte bouge, plus l'intervalle se resserre. Une maison stable, avec une brigade ancienne et une carte courte, tient plus longtemps entre deux mesures qu'un établissement qui renouvelle la moitié de son effectif chaque année.",
          "Un repère praticable consiste à mesurer une fois par cycle d'exploitation complet, c'est-à-dire après avoir traversé les périodes qui vous mettent en difficulté : la saison haute, les fêtes, l'été, selon votre activité. Mesurer toujours au même moment de l'année a un avantage supplémentaire, celui de rendre les rapports comparables entre eux.",
          "L'erreur courante est l'audit unique. Un établissement audité une fois, qui traite sa liste et n'y revient jamais, retrouve en général une partie de ses écarts dans les mois qui suivent, parce que les corrections d'organisation sont les plus fragiles. Un rythme modeste mais tenu vaut mieux qu'un passage exemplaire sans lendemain."
        ],
        sous: [
          {
            titre: "Les événements qui déclenchent une mesure hors rythme",
            texte: "Un changement de chef ou le renouvellement large de l'équipe, une reprise de fonds, un déménagement ou un réaménagement de laboratoire, l'ajout d'une activité de livraison ou de traiteur, un basculement de la carte vers des produits sensibles, ou une visite officielle qui a laissé des points à corriger. Dans chacun de ces cas, l'organisation a changé assez pour que l'état des lieux précédent ne dise plus grand-chose."
          }
        ]
      },
      {
        titre: "Le tour quotidien, quelques minutes",
        paragraphes: [
          "La vérification quotidienne se fait à l'ouverture et tient en une poignée de gestes. Regarder l'affichage de chaque enceinte et noter la valeur, ouvrir une porte au hasard et vérifier que tout est identifié et daté, contrôler que les postes de lavage des mains ont du savon et de quoi se sécher, jeter un œil aux zones que le nettoyage de la veille pouvait avoir sautées, vérifier l'absence de trace suspecte le long des murs et dans la réserve.",
          "Ce tour n'a de valeur que s'il déclenche une action quand quelque chose ne va pas. Un relevé sans consigne produit des cahiers que personne ne lit. Écrivez en trois lignes ce qu'on fait au-dessus d'une valeur donnée : prévenir le responsable, déplacer les produits sensibles, appeler le frigoriste, noter l'heure. C'est cette partie qui transforme une surveillance en maîtrise, au sens de l'article 5, paragraphe 2, points d) et e) du règlement (CE) n° 852/2004.",
          "Faites-le tourner entre les personnes plutôt que de le réserver au patron. Une maison où seul le dirigeant regarde reste fragile tous les jours où il n'est pas là, et c'est très souvent le jour où le problème apparaît. La rotation a un autre effet : elle apprend à trois ou quatre personnes à voir, au lieu d'une seule."
        ]
      },
      {
        titre: "Le tour hebdomadaire, un peu plus large",
        paragraphes: [
          "Une fois par semaine, allez voir ce que le quotidien ne regarde pas. Le dessus des hottes et l'état des filtres, l'arrière et le dessous des équipements sur roulettes, l'intérieur des placards bas, les joints de chambre froide, les siphons, le local à déchets, le vestiaire, la zone de réception. Ce sont ces endroits qui racontent la vérité d'un plan de nettoyage, parce que ce sont ceux qu'on saute quand le temps manque.",
          "Profitez-en pour faire une revue des stocks : produits entamés sans date, denrées en limite, cartons posés au sol, produits d'entretien qui ont migré vers une zone de manipulation. Le rangement des produits de nettoyage hors des zones où les denrées sont manipulées est d'ailleurs une exigence explicite de l'annexe II, chapitre I, point 10 du règlement (CE) n° 852/2004.",
          "Terminez par les supports. Les relevés de la semaine sont-ils complets, les fiches de nettoyage renseignées, les étiquettes des produits sensibles conservées. Un support incomplet ne se corrige jamais en le remplissant après coup : il se corrige en comprenant pourquoi il n'a pas été tenu, en l'allégeant ou en le déplaçant au bon moment du service."
        ]
      },
      {
        titre: "L'examen mensuel, ce qui dérive lentement",
        paragraphes: [
          "Certaines choses ne se dégradent pas d'un jour à l'autre mais glissent sur des semaines. Une fois par mois, prenez le temps de comparer : les températures relevées ce mois-ci sont-elles en moyenne plus hautes que le mois dernier, une enceinte s'est-elle mise à osciller, un poste consomme-t-il plus de temps de nettoyage qu'avant, un fournisseur livre-t-il désormais des produits dont la durée de vie restante est plus courte.",
          "Passez également en revue les interventions et les documents extérieurs. Les rapports de passage de lutte contre les nuisibles signalent-ils une activité qui revient, la dernière intervention sur le froid a-t-elle été suivie d'effet, le dégraissage des conduits est-il à jour, les attestations de formation en hygiène alimentaire couvrent-elles encore l'effectif après les mouvements de personnel.",
          "Rouvrez enfin le document qui décrit vos procédures et confrontez-le à ce que vous faites réellement. Un plat ajouté, un équipement nouveau, une zone réaffectée doivent s'y retrouver. C'est la vérification périodique prévue au paragraphe 2, point f) de l'article 5, et c'est la seule façon d'éviter que votre document ne devienne progressivement une fiction."
        ]
      },
      {
        titre: "Les cinq indicateurs qui préviennent avant les autres",
        paragraphes: [
          "Le premier est le taux de remplissage réel de vos supports. Un relevé rempli quatre jours sur sept annonce un problème avant même qu'une température ne dérive, parce qu'il dit que la surveillance ne fonctionne plus. Regardez-le sans indulgence, c'est l'indicateur le plus honnête dont vous disposiez.",
          "Le deuxième est le nombre de produits non identifiés trouvés lors d'une ouverture d'enceinte au hasard. Le troisième est l'état d'une zone difficile choisie au sort, par exemple le dessous d'un équipement. Le quatrième est le temps qu'il faut à quelqu'un d'autre que vous pour retrouver une pièce dans le classeur, ce qui mesure la disponibilité réelle de vos documents.",
          "Le cinquième est le nombre de personnes capables de mener une visite à votre place. C'est celui qui prédit le mieux la solidité d'une maison, parce qu'il mesure la diffusion du sujet dans l'équipe plutôt que la compétence d'une seule personne. Faites l'exercice une fois : demandez à votre second de montrer le dernier relevé de température, la fiche d'un lot de viande et le dernier rapport nuisibles."
        ]
      },
      {
        titre: "Garder l'équipe dans le sujet",
        paragraphes: [
          "Les équipes ne sont jamais en cause : un geste à corriger l'est parce que personne ne l'a expliqué, ou parce que l'organisation le rendait difficile. Le suivi dans la durée passe donc par la transmission, pas par le rappel à l'ordre. Un brief court, une fois par mois, sur un seul sujet expliqué à fond vaut mieux qu'un rappel général que personne n'écoute.",
          "Faites concevoir les consignes par ceux qui les appliquent. Une règle inventée par la brigade survit aux semaines chargées, une règle imposée disparaît au premier coup de feu. Demandez comment ils feraient pour que le relevé soit tenu, et acceptez leur solution même si elle n'est pas celle que vous aviez en tête, dès lors qu'elle atteint le résultat.",
          "Intégrez enfin le sujet à l'accueil des nouveaux. Une demi-heure le premier jour, avec le tour des zones, l'emplacement du classeur, les trois gestes qui comptent et la raison de chacun, économise des mois de reprise. C'est le moment où une habitude se prend, et une habitude prise le premier jour se déloge difficilement."
        ]
      },
      {
        titre: "Garder la mémoire de la maison",
        paragraphes: [
          "Conservez ensemble vos rapports d'audit successifs, les plans d'action et les preuves de ce que vous avez corrigé. Cet ensemble raconte quelque chose qu'aucun document isolé ne dit : ce qui tient et ce qui retombe. Les points qui reviennent d'une mesure sur l'autre ne sont presque jamais des points difficiles, ce sont des points dont personne n'a précisément la charge.",
          "Cette mémoire a une valeur pratique immédiate. Le jour où un agent, un assureur, un franchiseur ou un repreneur demande comment vous pilotez l'hygiène, un dossier qui montre des états des lieux datés, des listes traitées et des pièces à l'appui répond mieux que n'importe quel discours. Il montre un sujet piloté plutôt que subi.",
          "Elle sert aussi en interne. Un nouveau chef qui prend une cuisine avec cet historique sous les yeux comprend en une heure où sont les fragilités connues de la maison et pourquoi telle règle existe. Sans cet historique, il recommence l'apprentissage depuis zéro et refait les mêmes découvertes."
        ]
      },
      {
        titre: "Ce que le passage d'un tiers apporte à intervalle régulier",
        paragraphes: [
          "Un auditeur arrive sans le filtre de l'habitude et mesure au lieu d'apprécier. Il parcourt les locaux, contrôle les vingt-sept points de notre grille répartis en douze thèmes, ouvre les enceintes, examine les documents et remet un rapport écrit : une note, les scores par thème, les constats point par point et un plan d'action classé par priorité, où chaque écart porte le correctif attendu et la preuve à constituer.",
          "Notre prestation s'arrête à la remise du rapport. Vous appliquez ensuite les correctifs vous-même, à votre rythme et avec vos moyens, ce qui est aussi la raison pour laquelle le plan d'action est écrit en français courant : il doit être utilisable par la personne qui tient la cuisine, sans nous. Avec nous, vous savez exactement quoi corriger, et la conformité vient quand vous avez traité la liste.",
          "audit hygiène est un label privé indépendant, ni certification officielle, ni agrément d'État, ni contrôle des services vétérinaires. Nous ne promettons jamais l'issue d'une visite officielle, qui appartient aux services de l'État. On peut nous appeler sans être irréprochable, c'est même le seul cas utile. Le devis est établi avant intervention, après un échange de quelques minutes, depuis la page contact."
        ]
      }
    ],
    faq: [
      {
        question: "Existe-t-il une obligation légale de faire auditer son restaurant ?",
        reponse: "Non. Aucune disposition n'impose de recourir à un auditeur extérieur ni ne fixe de fréquence. Ce qui est imposé, par les articles 4 et 5 du règlement (CE) n° 852/2004 du 29 avril 2004, c'est le respect permanent des règles générales d'hygiène et le maintien de procédures fondées sur les principes HACCP, avec une vérification périodique de leur bon fonctionnement prévue au paragraphe 2, point f). Cette vérification interne est l'obligation ; l'audit externe en mesure la qualité."
      },
      {
        question: "À quelle fréquence refaire un audit ?",
        reponse: "Cela dépend de trois choses : la sensibilité de votre production, le renouvellement de votre équipe et la stabilité de votre carte. Plus ces trois éléments bougent, plus l'intervalle se resserre. Un repère praticable consiste à mesurer une fois par cycle d'exploitation complet, après avoir traversé les périodes qui vous mettent en difficulté, et toujours au même moment de l'année pour que les rapports soient comparables entre eux."
      },
      {
        question: "Quels événements justifient une mesure hors rythme ?",
        reponse: "Un changement de chef ou le renouvellement large de l'équipe, une reprise de fonds, un déménagement ou un réaménagement de laboratoire, l'ajout d'une activité de livraison ou de traiteur, un basculement de la carte vers des produits sensibles, et une visite officielle qui a laissé des points à corriger. Dans chacun de ces cas, l'organisation a suffisamment changé pour que l'état des lieux précédent ne décrive plus la cuisine réelle."
      },
      {
        question: "Que faut-il vérifier tous les jours ?",
        reponse: "L'affichage de chaque enceinte, avec la valeur notée ; l'identification et la date des produits dans une enceinte ouverte au hasard ; la présence de savon et de quoi se sécher aux postes de lavage des mains ; l'état des zones que le nettoyage de la veille pouvait avoir sautées ; l'absence de trace suspecte le long des murs et dans la réserve. Cela prend quelques minutes, et cela n'a de valeur que si une consigne écrite dit quoi faire quand une valeur sort des clous."
      },
      {
        question: "Pourquoi les mêmes écarts reviennent-ils d'une fois sur l'autre ?",
        reponse: "Parce qu'on a traité le symptôme sans toucher la cause. Un relevé qui s'arrête n'est pas un problème de discipline, c'est presque toujours un problème de support : trop de lignes, mauvais moment dans le service, emplacement inadapté, ou responsabilité partagée entre plusieurs personnes et donc portée par aucune. Reprenez la chaîne complète, allégez le support, nommez une personne par service et écrivez en trois lignes la consigne d'action."
      },
      {
        question: "Comment garder l'équipe attentive dans la durée ?",
        reponse: "En expliquant le sens plutôt que le geste, et en faisant concevoir les consignes par ceux qui les appliquent. Un brief court une fois par mois sur un seul sujet traité à fond vaut mieux qu'un rappel général. Intégrez le sujet à l'accueil des nouveaux, avec une demi-heure le premier jour : le tour des zones, l'emplacement du classeur, les trois gestes qui comptent et la raison de chacun. Une habitude prise le premier jour se déloge difficilement."
      },
      {
        question: "Faut-il conserver les anciens rapports d'audit ?",
        reponse: "Oui, avec les plans d'action et les preuves des corrections. La comparaison d'un rapport à l'autre montre ce qui tient et ce qui retombe, et les points qui reviennent signalent presque toujours une responsabilité mal attribuée plutôt qu'une difficulté technique. Cet historique sert aussi en externe, face à un assureur, un franchiseur ou un repreneur, et en interne pour un nouveau chef qui découvre la maison."
      },
      {
        question: "Que se passe-t-il après la remise du rapport ?",
        reponse: "Vous appliquez le plan d'action vous-même, à votre rythme et avec vos moyens. Chaque écart y porte le correctif attendu et la preuve à constituer, écrits en français courant pour que la personne qui tient la cuisine puisse les traiter sans nous. Notre prestation s'arrête à la remise du rapport : nous ne faisons pas les travaux et nous ne vendons rien d'autre. La conformité vient quand vous avez traité la liste."
      },
      {
        question: "Un audit régulier garantit-il un bon résultat au contrôle officiel ?",
        reponse: "Non, et personne ne peut sérieusement le promettre : l'issue d'une visite officielle appartient aux services de l'État et dépend de l'appréciation de l'agent au jour de son passage. Ce qu'une mesure régulière apporte est différent et vérifiable : les écarts évidents ne s'installent pas, les dérives se repèrent tôt, et vous savez à chaque instant où vous en êtes. C'est ce qui rend une visite inopinée sans conséquence particulière, parce qu'elle tombe sur un état ordinaire tenu."
      }
    ],
    liens: [
      "/methode",
      "/points-de-controle",
      "/points-de-controle/autocontroles-realises-et-traces",
      "/blog/frequence-audit-hygiene",
      "/blog/checklist-controle-sanitaire",
      "/contact"
    ]
  },
];
