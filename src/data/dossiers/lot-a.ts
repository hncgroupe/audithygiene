/**
 * Lot A : les dix dossiers de fond fondateurs.
 *
 * Un dossier est la page de référence sur un sujet. Il tient seul, il distingue
 * systématiquement ce qu'un texte impose de ce qui relève de la bonne pratique
 * professionnelle, et il se termine sur ce que le cabinet apporte concrètement.
 *
 * Règles appliquées : aucune sanction chiffrée, aucun prix, aucune durée
 * d'audit, aucune référence inventée, aucun tiret cadratin ni demi-cadratin.
 */

import type { Dossier } from './type';

export const DOSSIERS_A: Dossier[] = [
  {
    slug: "plan-de-maitrise-sanitaire-restaurant",
    titre: "Le plan de maîtrise sanitaire en restaurant",
    titreSeo: "Plan de maîtrise sanitaire restaurant : le guide",
    description: "Ce qu'un plan de maîtrise sanitaire contient vraiment, ce que les articles 4 et 5 du règlement 852/2004 imposent, et ce qui relève de la bonne pratique.",
    reponse: "Le plan de maîtrise sanitaire est le document qui rassemble tout ce que votre établissement met en place pour servir des denrées sûres : les bonnes pratiques d'hygiène, l'analyse des dangers fondée sur les principes HACCP, la traçabilité et la conduite à tenir devant une non-conformité. L'expression elle-même ne figure pas dans le règlement européen. Ce qui vous oblige, en restaurant, ce sont les articles 4 et 5 du règlement (CE) n° 852/2004 du 29 avril 2004 : appliquer les règles générales d'hygiène de l'annexe II, tenir des procédures permanentes fondées sur les principes HACCP, et conserver des documents qui prouvent que ces procédures vivent.",
    ouverture: "Beaucoup de restaurateurs découvrent le sujet le jour où un agent demande le classeur, et se demandent alors si le document qu'ils ont acheté ou téléchargé correspond bien à ce que la loi attend. La réponse est plus simple qu'il n'y paraît, à condition de savoir d'où vient chaque exigence.",
    sections: [
      {
        titre: "Ce qu'est réellement un plan de maîtrise sanitaire",
        paragraphes: [
          "Un plan de maîtrise sanitaire, souvent abrégé en PMS, est la mise par écrit de votre organisation sanitaire. Il décrit comment les denrées entrent chez vous, comment elles sont stockées, préparées, cuites, refroidies, servies, comment le matériel et les locaux sont nettoyés, comment le personnel travaille, et ce que vous faites quand quelque chose sort du cadre prévu. Ce n'est pas un document théorique posé sur une étagère : c'est la description de ce qui se passe réellement dans votre cuisine, complétée par les preuves que cela se passe bien ainsi.",
          "La structure la plus répandue comporte trois volets. Le premier réunit les bonnes pratiques d'hygiène, c'est-à-dire le socle qui vaut pour tout établissement : personnel, locaux, équipements, nettoyage, nuisibles, eau, déchets, approvisionnement. Le deuxième est le plan fondé sur les principes HACCP, qui identifie les dangers propres à votre activité et fixe les mesures qui les maîtrisent. Le troisième organise la traçabilité et la gestion des produits non conformes, du retrait au rappel.",
          "Cette structure en trois volets est celle que les guides professionnels et les administrations utilisent comme référence commune. Elle est pratique, elle est lisible par un agent qui découvre votre établissement, et elle vous évite d'oublier un pan entier de votre activité. Elle n'est pas pour autant imposée sous cette forme à un restaurant classique, et c'est précisément le point que la section suivante détaille."
        ]
      },
      {
        titre: "Ce que le texte impose, ce qu'il n'impose pas",
        paragraphes: [
          "L'expression plan de maîtrise sanitaire n'appartient pas au règlement européen. Son contenu type, avec ses trois volets, est décrit par l'annexe II de l'arrêté du 8 juin 2006 relatif à l'agrément sanitaire des établissements mettant sur le marché des produits d'origine animale ou des denrées en contenant. Or ce texte vise les établissements soumis à agrément. Un restaurant qui remet directement au consommateur final relève du commerce de détail, exclu du champ du règlement (CE) n° 853/2004 par son article 1er, paragraphe 5, point a), et n'est donc pas soumis à agrément.",
          "Ce que le texte impose à votre restaurant, ce sont les articles 4 et 5 du règlement (CE) n° 852/2004 du 29 avril 2004. L'article 4, paragraphe 2, vous oblige à respecter les règles générales d'hygiène de l'annexe II. L'article 5, paragraphe 1, vous oblige à mettre en place, appliquer et maintenir une ou plusieurs procédures permanentes fondées sur les principes HACCP. L'article 5, paragraphe 2, point g), et l'article 5, paragraphe 4, ajoutent l'obligation d'établir des documents et des dossiers prouvant l'application effective des mesures, de les tenir à jour et de les conserver pendant une période appropriée.",
          "La différence est loin d'être théorique. Elle signifie qu'aucune disposition n'impose à votre restaurant un classeur découpé en trois volets, ni un modèle de fiche, ni un plan de nettoyage rédigé sous une forme précise, ni une durée d'archivage chiffrée. Ce qui est exigible, c'est que vos procédures existent, qu'elles soient adaptées à ce que vous faites, qu'elles soient appliquées, et que vous puissiez le démontrer. Le PMS écrit reste de très loin le moyen le plus simple d'apporter cette démonstration, mais il est le moyen, pas l'obligation elle-même.",
          "Cette nuance a une valeur pratique en visite. Un exploitant qui invoque une règle qui n'existe pas perd de sa crédibilité sur le reste de l'échange. À l'inverse, un exploitant qui explique posément que son plan est la traduction des articles 4 et 5, et qui montre les enregistrements correspondants, tient une position solide même si son document ne ressemble pas au modèle attendu."
        ]
      },
      {
        titre: "Le socle des bonnes pratiques d'hygiène",
        paragraphes: [
          "Le premier volet décrit ce qui vaut tous les jours, quel que soit le plat en préparation. Il couvre l'hygiène du personnel, avec les tenues, le lavage des mains et l'état de santé, exigences qui viennent du chapitre VIII de l'annexe II du règlement 852/2004. Il couvre les locaux et les équipements, avec les revêtements nettoyables, l'éclairage, la ventilation et les lave-mains, exigences des chapitres I et II. Il couvre le nettoyage et la désinfection, la lutte contre les nuisibles, l'alimentation en eau potable et la gestion des déchets.",
          "Ce volet a une qualité que les autres n'ont pas : il se vérifie à l'œil. Un agent qui entre dans votre cuisine voit en quelques minutes l'état des surfaces, la présence du savon au lave-mains, la propreté des tenues, l'ordre dans les réserves. C'est aussi la partie qui se corrige le plus vite, souvent sans dépense, parce que la plupart des écarts constatés sont des habitudes prises faute de temps plutôt que des choix délibérés.",
          "Écrire ce volet ne demande pas de talent littéraire. Il suffit de décrire ce que vous faites déjà, en nommant les zones, les fréquences que vous vous fixez, les produits que vous utilisez et les personnes responsables. Un texte court et vrai vaut infiniment mieux qu'un texte long recopié d'un modèle qui décrit une cuisine que vous n'avez pas."
        ]
      },
      {
        titre: "Le plan fondé sur les principes HACCP",
        paragraphes: [
          "Le deuxième volet applique les sept principes rappelés à l'article 5, paragraphe 2, du règlement 852/2004 : identifier les dangers, déterminer les points critiques, fixer des limites critiques, établir une surveillance, prévoir des actions correctives, vérifier périodiquement que l'ensemble fonctionne, et conserver des documents. En restaurant, cela revient à parcourir votre carte et à repérer les étapes où un danger microbiologique, chimique, physique ou allergène peut apparaître ou se développer.",
          "L'analyse ne se fait pas en général, elle se fait sur votre production. Une carte de brasserie avec des viandes hachées, un tartare et une mayonnaise maison n'a pas les mêmes points sensibles qu'une pizzeria ou qu'un traiteur qui refroidit des préparations en grande quantité. Les étapes qui reviennent le plus souvent sont la réception, le stockage réfrigéré, la décongélation, la cuisson, le refroidissement, la conservation des produits entamés et le service.",
          "Le règlement admet expressément la souplesse : l'article 5, paragraphe 2, précise que les documents sont établis en fonction de la nature et de la taille de l'entreprise. Un établissement de vingt couverts n'est pas tenu au même formalisme qu'une cuisine centrale. Ce qui compte est que les dangers réels de votre carte soient identifiés et que vous sachiez dire, devant chacun, quelle mesure les maîtrise et comment vous vous en assurez."
        ]
      },
      {
        titre: "La traçabilité et la gestion des non-conformités",
        paragraphes: [
          "Le troisième volet organise la capacité à retrouver l'origine d'un produit et à réagir quand un produit pose problème. L'obligation vient du règlement (CE) n° 178/2002 du 28 janvier 2002, dont l'article 18 impose d'être en mesure d'identifier toute personne vous ayant fourni une denrée et de mettre cette information à disposition des autorités à leur demande. L'article 19 organise le retrait, l'information du consommateur et le rappel quand une denrée n'est pas conforme.",
          "En pratique, cela repose sur des documents que vous recevez déjà : bons de livraison, factures, étiquettes des produits d'origine animale. La question n'est pas d'en produire de nouveaux, mais de les conserver de façon à pouvoir les retrouver. Un classeur par mois ou une photographie systématique des étiquettes suffisent, à condition que le lien avec la période de service soit reconstituable.",
          "La gestion des non-conformités mérite une procédure écrite courte, parce qu'elle se joue dans l'urgence. Que faites-vous si un frigo est monté en température pendant la nuit, si un produit est servi au-delà de sa date limite de consommation, si un client signale une réaction allergique ? Décider à froid ce qui sera fait à chaud évite les décisions improvisées, et montre à un agent que la question a été anticipée."
        ]
      },
      {
        titre: "Les enregistrements qui font vivre le plan",
        paragraphes: [
          "Un plan sans enregistrement reste une intention. L'article 5, paragraphe 2, point g), du règlement 852/2004 demande des documents et des dossiers prouvant l'application effective des mesures, et l'article 5, paragraphe 4, demande qu'ils soient tenus à jour et conservés pendant une période appropriée. Les relevés de température des enceintes froides, les fiches de nettoyage, les enregistrements de cuisson ou de refroidissement lorsque votre production le justifie, les rapports de passage de l'entreprise de lutte contre les nuisibles forment le corps de ces preuves.",
          "Il faut savoir ce qui n'est pas fixé par un texte. Aucune disposition n'impose une fréquence de relevé, un format de fiche, une signature ni une durée d'archivage chiffrée. C'est votre plan qui les définit et qui les justifie. La durée de douze mois souvent citée est un usage professionnel commode, pas une obligation réglementaire. La formule selon laquelle ce qui n'est pas tracé est réputé non fait est une pratique de contrôle, pas une règle de droit.",
          "Le vrai piège n'est pas l'absence de fiches, c'est la fiche remplie d'avance. Une colonne de relevés parfaitement identiques, écrits de la même encre, décrédibilise l'ensemble du classeur, y compris les parties sincères. Mieux vaut un relevé quotidien réel, avec des valeurs qui varient et une ligne écrite le jour où une anomalie a été traitée, qu'une série impeccable et invraisemblable."
        ]
      },
      {
        titre: "Écrire son plan sans le recopier",
        paragraphes: [
          "Les modèles de PMS circulent largement, et ils ne sont pas inutiles : ils rappellent les thèmes à ne pas oublier. Le problème apparaît quand le modèle est adopté tel quel. Un plan qui mentionne une cellule de refroidissement que vous n'avez pas, un vestiaire qui n'existe pas ou un poste de plonge en trois bacs quand vous en avez deux se retourne contre vous, parce qu'il annonce des mesures que rien ne vient prouver.",
          "La méthode la plus rapide consiste à parcourir physiquement votre établissement dans l'ordre où la denrée le traverse, et à écrire ce que vous voyez. Réception, réserve sèche, chambres froides, préparation froide, cuisson, service, plonge, vestiaire, local déchets. À chaque poste, notez qui fait quoi, avec quoi, à quelle fréquence, et comment vous savez que c'est fait. Le document se construit tout seul, dans le vocabulaire de votre équipe.",
          "Le plan gagne aussi à rester court. Un document de quelques dizaines de pages que personne ne lit protège moins qu'un document de quelques pages que le chef connaît et que le nouvel arrivant peut parcourir en une demi-heure. La lisibilité est un critère de qualité sanitaire à part entière."
        ]
      },
      {
        titre: "Le tenir à jour quand l'établissement change",
        paragraphes: [
          "L'article 5, paragraphe 4, point a), du règlement 852/2004 demande que le plan soit revu lorsque des modifications interviennent. Un changement de carte, l'ajout d'une préparation à risque comme un tartare ou une pâtisserie à base d'œufs crus, l'installation d'un nouvel équipement, l'ouverture d'une activité de livraison, un changement de fournisseur sur un produit sensible : chacune de ces évolutions appelle une relecture ciblée, pas une réécriture complète.",
          "Le moment le plus favorable pour cette relecture est le changement de saison, quand la carte bouge de toute façon. Une heure passée à vérifier que les nouvelles préparations sont couvertes, que les fiches de relevé correspondent aux enceintes réellement en service et que les coordonnées des fournisseurs sont à jour suffit dans la plupart des établissements.",
          "Le changement d'équipe compte autant que le changement de carte. Un plan est appliqué par des personnes ; quand elles changent, la transmission ne se fait pas d'elle-même. Reprendre les gestes clés avec un nouvel arrivant, en s'appuyant sur le document, est le meilleur usage qu'on puisse en faire."
        ]
      },
      {
        titre: "Ce qu'un agent regarde dans un plan de maîtrise sanitaire",
        paragraphes: [
          "L'examen documentaire n'est pas une lecture ligne à ligne. L'agent cherche d'abord la cohérence entre ce qu'il vient de voir en cuisine et ce que le document annonce. Si le plan décrit une procédure de refroidissement et qu'aucun enregistrement n'existe alors que vous produisez à l'avance, l'écart saute aux yeux. Si le plan ne mentionne pas la préparation qu'il a vue sur le plan de travail, la même impression apparaît.",
          "Il regarde ensuite si le document est vivant : dates récentes, écritures différentes, corrections apportées, anomalies notées et traitées. Un classeur qui porte les traces de son usage rassure davantage qu'un classeur neuf. Il vérifie enfin que les pièces les plus demandées sont accessibles rapidement, parce qu'un document introuvable produit le même effet qu'un document absent.",
          "L'appréciation du caractère approprié des procédures et de la période de conservation relève de l'agent et du service instructeur. C'est une raison de plus pour que votre plan explique ses propres choix : une fréquence justifiée par votre volume et votre carte se défend, une fréquence sortie d'un modèle ne se défend pas."
        ]
      },
      {
        titre: "Les écarts les plus fréquents, et comment ils se corrigent",
        paragraphes: [
          "Le premier est le plan générique, acheté ou téléchargé, qui décrit un autre établissement. Il se corrige en une session de travail : on supprime ce qui n'existe pas, on ajoute ce qui manque, on renomme les zones avec les mots de la maison. Le deuxième est le plan à jour mais sans enregistrement, cas très courant dans les établissements qui travaillent bien mais n'écrivent rien. Il se corrige en installant deux ou trois fiches simples aux endroits où elles se remplissent en dix secondes.",
          "Le troisième est le plan complet dont l'équipe ignore l'existence. Il se corrige en une réunion courte, en reprenant les cinq ou six gestes qui comptent vraiment. Le quatrième est le plan qui n'a pas suivi une évolution récente de la carte ou du matériel, et qui se corrige par une relecture ciblée.",
          "Aucun de ces écarts ne demande d'investissement. Ils demandent du temps et un regard extérieur, parce qu'on relit très mal un document que l'on a soi-même écrit dans un lieu que l'on connaît par cœur."
        ]
      },
      {
        titre: "Faire vérifier son plan avant qu'un autre le fasse",
        paragraphes: [
          "C'est le rôle d'un audit sur place. Un auditeur parcourt votre établissement, contrôle les vingt-sept points de la grille répartis en douze thèmes, en toute discrétion, pendant que le service continue. Il confronte le document à la réalité des postes, ce qu'aucune lecture de bureau ne permet de faire. Il repère aussi bien les manques que les procédures inutilement lourdes que personne n'appliquera jamais.",
          "Vous recevez ensuite un rapport complet, avec une note, les constats point par point et un plan d'action classé par priorité. Ce classement compte autant que les constats : il indique ce qui doit être repris dans la semaine et ce qui peut attendre le prochain changement de carte. Chaque écart y porte le correctif attendu et la preuve à constituer, écrits en français courant, pour que la personne qui tient la cuisine puisse l'appliquer sans nous.",
          "La prestation s'arrête là : vous appliquez ensuite la liste vous-même, à votre rythme et avec vos propres moyens. Audit hygiène est un label privé indépendant. Ce n'est ni une certification officielle, ni un agrément d'État, ni un contrôle des services vétérinaires : l'issue d'un contrôle officiel appartient aux services de l'État. Ce que la démarche apporte est plus simple et plus utile : vous savez exactement quoi corriger, et votre plan finit par décrire ce que vous faites vraiment. Le cabinet intervient partout en Île-de-France, dans les huit départements, et le devis est établi avant intervention, après un échange de quelques minutes."
        ]
      }
    ],
    faq: [
      {
        question: "Le plan de maîtrise sanitaire est-il obligatoire dans un restaurant ?",
        reponse: "Le document appelé plan de maîtrise sanitaire n'est pas nommé par le règlement européen, et son contenu type vient de l'annexe II de l'arrêté du 8 juin 2006, qui vise les établissements soumis à agrément. Votre restaurant reste en revanche pleinement tenu des articles 4 et 5 du règlement (CE) n° 852/2004 : appliquer les règles d'hygiène de l'annexe II, tenir des procédures fondées sur les principes HACCP, et conserver des documents prouvant leur application. Le plan écrit est le moyen le plus simple de satisfaire ces obligations."
      },
      {
        question: "Puis-je utiliser un modèle de PMS trouvé en ligne ?",
        reponse: "Comme point de départ, oui : un modèle rappelle les thèmes à couvrir. Comme document final, non. Un plan qui décrit des équipements que vous n'avez pas ou des procédures que vous n'appliquez pas est plus fragile qu'un plan court et exact, parce qu'il annonce des mesures que rien ne vient prouver. Le travail utile consiste à parcourir votre établissement poste par poste et à écrire ce qui s'y passe réellement, avec les mots de votre équipe."
      },
      {
        question: "Combien de temps dois-je conserver mes enregistrements ?",
        reponse: "Aucune disposition ne fixe de durée chiffrée pour un restaurant. Le règlement (CE) n° 852/2004 demande, à son article 5, paragraphe 4, que les documents soient tenus à jour et conservés pendant une période appropriée. C'est votre plan qui définit cette période et qui la justifie au regard de votre activité et de la durée de vie de vos produits. La durée de douze mois souvent citée est un usage professionnel commode, pas une obligation réglementaire, et l'appréciation du caractère approprié revient à l'agent."
      },
      {
        question: "Faut-il un logiciel ou le papier suffit-il ?",
        reponse: "Le papier suffit parfaitement. Aucun texte n'impose de support particulier, et un classeur bien tenu vaut un logiciel mal alimenté. Le support numérique présente deux avantages réels : il horodate les saisies, ce qui rend les enregistrements plus crédibles, et il évite les pertes. Il présente un inconvénient : si personne ne saisit pendant le service, les données manquent tout autant. Choisissez le support que votre équipe utilisera réellement, puis décrivez-le dans votre plan."
      },
      {
        question: "Mon plan doit-il obligatoirement comporter trois volets ?",
        reponse: "Non. La structure en trois volets, bonnes pratiques d'hygiène, plan HACCP, traçabilité et gestion des non-conformités, vient du contenu type de l'arrêté du 8 juin 2006 applicable aux établissements agréés. Elle est devenue la référence commune parce qu'elle est claire et qu'elle évite les oublis. Rien n'interdit une autre organisation, à condition que les exigences des articles 4 et 5 du règlement 852/2004 soient couvertes et que le document reste lisible par quelqu'un qui découvre votre établissement."
      },
      {
        question: "À quelle fréquence dois-je mettre mon plan à jour ?",
        reponse: "Le règlement demande une révision lorsque des modifications interviennent, sans fixer de périodicité. En pratique, une relecture au changement de carte suffit dans la plupart des établissements, complétée par une mise à jour ciblée à chaque évolution significative : nouvelle préparation sensible, nouvel équipement, nouvelle activité comme la livraison, changement d'équipe. L'important est que la date de la dernière révision soit visible et que le document corresponde à ce que l'on voit en cuisine le jour de la visite."
      },
      {
        question: "Qui doit rédiger le plan de maîtrise sanitaire ?",
        reponse: "L'exploitant en est responsable. Rien n'impose de le faire rédiger par un tiers, et le plan écrit par le chef est souvent le plus juste, parce qu'il décrit les gestes réels. Un regard extérieur reste utile au moment de la relecture : on relit très mal un document que l'on a soi-même écrit dans un lieu que l'on connaît par cœur. Une visite sur place permet de confronter le document aux postes et de repérer ce qui manque comme ce qui est inutilement lourd."
      },
      {
        question: "Que se passe-t-il si mon plan est jugé incomplet ?",
        reponse: "Un plan incomplet est un constat courant et il se traite comme les autres écarts documentaires : l'agent le note, en explique la portée et attend une mise en conformité. La plupart des manques relevés se corrigent en quelques jours, sans dépense, parce qu'ils tiennent à des procédures appliquées mais non écrites. L'appréciation de la suite relève du service instructeur. La meilleure préparation reste de faire relire le document avant, dans les conditions réelles du service."
      }
    ],
    liens: [
      "/points-de-controle/pms-documente-et-a-jour",
      "/points-de-controle/autocontroles-realises-et-traces",
      "/themes/plan-de-maitrise-sanitaire-pms",
      "/points-de-controle/releves-de-temperature-tenus-et-archives",
      "/methode",
      "/contact"
    ]
  },
  {
    slug: "chaine-du-froid-restaurant",
    titre: "La chaîne du froid en restaurant",
    titreSeo: "Chaîne du froid en restaurant : températures et relevés",
    description: "Températures des enceintes, relevés, ruptures de froid : ce que le règlement 852/2004 et l'arrêté du 21 décembre 2009 chiffrent, et ce qui relève de vous.",
    reponse: "La chaîne du froid ne doit pas être interrompue : c'est l'exigence du règlement (CE) n° 852/2004 du 29 avril 2004, annexe II, chapitre IX, point 5, qui interdit de conserver des denrées sensibles à des températures pouvant entraîner un risque pour la santé. Les valeurs chiffrées ne viennent pas de ce règlement mais de l'arrêté du 21 décembre 2009 pour les produits d'origine animale et de l'arrêté du 8 octobre 2013 pour les autres denrées. Il n'existe pas de seuil unique : la température dépend de la denrée, et vous pouvez retenir une autre valeur si vous la justifiez par un guide de bonnes pratiques ou par votre analyse des dangers.",
    ouverture: "C'est le premier sujet regardé en visite, et souvent celui sur lequel les idées reçues sont les plus tenaces, à commencer par le fameux zéro à quatre degrés que beaucoup croient inscrit dans la loi. Voici ce que les textes disent réellement, et ce qu'ils laissent à votre appréciation.",
    sections: [
      {
        titre: "Pourquoi le froid ouvre presque toujours la visite",
        paragraphes: [
          "Le froid se mesure. C'est une donnée objective, immédiate, indépendante du discours de l'exploitant, et c'est pour cette raison qu'un agent commence fréquemment par ouvrir les enceintes. Une valeur affichée, une sonde plongée dans un produit, un joint de porte examiné du bout du doigt : en quelques minutes, une grande partie de l'organisation sanitaire de l'établissement se laisse deviner.",
          "Le froid a aussi une place particulière dans la sécurité des aliments. Il n'élimine pas les bactéries, il ralentit leur multiplication. Une denrée conservée quelques degrés au-dessus du seuil qu'elle appelle ne change ni d'aspect ni d'odeur, mais la population microbienne qu'elle porte progresse. C'est ce décalage entre ce que l'on voit et ce qui se passe qui rend la surveillance nécessaire.",
          "Enfin, le froid est le domaine où les corrections sont les plus rapides et les moins coûteuses. Un thermomètre remplacé, un joint changé, une enceinte désencombrée, un relevé remis en place : la plupart des écarts constatés sur ce thème se soldent en quelques jours, sans travaux."
        ]
      },
      {
        titre: "Ce que le texte impose, ce qu'il n'impose pas",
        paragraphes: [
          "L'obligation de fond tient en une phrase. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 5, dispose que les denrées susceptibles de favoriser la reproduction de micro-organismes pathogènes ne doivent pas être conservées à des températures pouvant entraîner un risque pour la santé, et que la chaîne du froid ne doit pas être interrompue. Ce texte ne donne aucun chiffre. Il fixe un résultat.",
          "Les chiffres viennent d'ailleurs. Pour les produits d'origine animale et les denrées en contenant, l'arrêté du 21 décembre 2009, article 3 et annexe I, comporte un tableau des températures maximales des denrées réfrigérées, cette annexe renvoyant au règlement (CE) n° 853/2004 pour les viandes hachées et les produits de la pêche. Pour les produits et denrées autres que d'origine animale, c'est l'arrêté du 8 octobre 2013, article 3 et annexe I, qui s'applique.",
          "Ce qui n'est pas imposé mérite d'être connu aussi précisément. La cible souvent citée de zéro à quatre degrés n'est pas un seuil réglementaire unique : le seuil dépend de la denrée, et l'exploitant peut retenir une autre température s'il la justifie par un guide de bonnes pratiques d'hygiène ou par une analyse des dangers validée. Aucune disposition ne fixe non plus la fréquence des relevés, leur format, ni une durée d'archivage chiffrée. Ces éléments relèvent de votre plan de maîtrise sanitaire, qui doit les définir et les justifier.",
          "Cette distinction n'est pas un détail de juriste. Elle vous permet, en visite, d'expliquer pourquoi telle enceinte est réglée à telle valeur, en vous appuyant sur la denrée qu'elle contient et sur votre plan, plutôt que d'invoquer un seuil unique qui n'existe pas et qui ne résiste pas à la première question."
        ]
      },
      {
        titre: "Les enceintes froides positives",
        paragraphes: [
          "Le principe pratique est simple : chaque enceinte reçoit une consigne, et cette consigne correspond à la denrée la plus exigeante qu'elle contient. Une armoire qui abrite des produits de la pêche n'est pas réglée comme une armoire de légumes lavés ou de boissons. Lorsque l'organisation le permet, séparer les familles de produits par enceinte simplifie tout : la consigne devient évidente, la surveillance aussi.",
          "La température qui compte est celle de la denrée, pas celle de l'afficheur. Un afficheur mesure l'air à un endroit donné, souvent près de l'évaporateur, et il peut indiquer une valeur flatteuse alors qu'une caisse posée devant la grille de ventilation est plus chaude de plusieurs degrés. Une sonde plongée dans un produit témoin, ou glissée entre deux barquettes, donne une image plus fidèle et c'est ce que fait un agent.",
          "Les causes de dérive sont presque toujours les mêmes : enceinte surchargée qui empêche l'air de circuler, joint de porte fatigué qui laisse entrer l'air ambiant, porte ouverte trop longtemps pendant la mise en place, givre accumulé sur l'évaporateur, condenseur encrassé faute de dépoussiérage. Aucune de ces causes ne demande un investissement pour être traitée, elles demandent d'être regardées."
        ]
      },
      {
        titre: "Le froid négatif et les produits congelés",
        paragraphes: [
          "Pour les denrées congelées, l'arrêté du 21 décembre 2009, article 3 et annexe I, comporte un tableau des températures maximales : moins dix-huit degrés pour les glaces et crèmes glacées, moins douze degrés pour les autres denrées alimentaires congelées, les viandes hachées et les produits de la pêche congelés relevant des températures fixées par le règlement (CE) n° 853/2004, annexe III, section V, chapitre III, point 2 c) ii, soit moins dix-huit degrés à cœur.",
          "Le seuil général de moins dix-huit degrés que tout le monde cite vaut pour les produits surgelés, régime défini par le décret n° 64-949 du 9 septembre 1964, article 1er. La distinction entre congelé et surgelé n'est donc pas un raffinement de vocabulaire : elle change la valeur applicable. En cuisine, retenir la valeur la plus exigeante des produits présents évite les erreurs de raisonnement.",
          "Le givre mérite une attention particulière. Une couche épaisse sur les parois ou sur les produits signale une ouverture fréquente, un joint défaillant ou des cycles de dégivrage mal réglés, et parfois une décongélation partielle suivie d'une recongélation. Un emballage déformé, une poche de glace au fond du sachet, un produit collé en bloc racontent la même histoire. Ce sont des indices qu'un agent lit immédiatement, et ce sont aussi les vôtres."
        ]
      },
      {
        titre: "Mesurer juste : matériel et méthode",
        paragraphes: [
          "Le règlement 852/2004, annexe II, chapitre I, point 2 d), demande que les locaux permettent de maintenir les denrées à des températures appropriées qui puissent être vérifiées et, si nécessaire, enregistrées. Vérifier suppose un moyen de mesure fiable. Une sonde à piquer pour les produits, un thermomètre par enceinte ou un thermomètre mobile utilisé selon un circuit fixe suffisent dans la grande majorité des restaurants.",
          "L'étalonnage n'est encadré par aucune disposition chiffrée pour un restaurant, mais la fiabilité de la mesure conditionne la valeur de tout le reste : un relevé pris avec une sonde fausse ne prouve rien. La vérification la plus simple reste le contrôle dans un mélange d'eau et de glace fondante, noté dans votre classeur. C'est une bonne pratique, pas une obligation, et c'est un geste que l'on peut faire en deux minutes.",
          "La méthode compte autant que le matériel. Mesurer toujours au même endroit, au même moment du service, avec le même outil, produit une série comparable où une dérive se voit tout de suite. Mesurer au hasard produit des chiffres qui ne disent rien. C'est aussi pour cela qu'un circuit de relevé écrit dans le plan vaut mieux qu'une consigne orale."
        ]
      },
      {
        titre: "Les relevés de température",
        paragraphes: [
          "L'obligation de tenir des documents vient de l'article 5 du règlement 852/2004 : paragraphe 2, points d) et g), pour la surveillance et pour les documents prouvant l'application effective des mesures, paragraphe 4, points b) et c), pour la tenue à jour et la conservation pendant une période appropriée. Le relevé de température est le plus courant de ces documents et le premier demandé en visite.",
          "Aucune disposition ne fixe la fréquence des relevés ni une durée d'archivage chiffrée. C'est au plan de maîtrise sanitaire de les définir et de les justifier. La pratique répandue d'un relevé par enceinte et par service se défend bien dans un restaurant, parce qu'elle suit le rythme réel de l'activité, mais une autre organisation se défend aussi si elle est cohérente avec votre production. La durée de douze mois souvent citée est un usage professionnel, pas une règle de droit.",
          "Ce qui donne sa valeur à un relevé, ce n'est pas la régularité parfaite des chiffres, c'est la trace des anomalies traitées. Une ligne indiquant qu'une enceinte est montée, ce qui a été fait des denrées et quelle intervention a suivi vaut mieux que trente lignes identiques. Un relevé sans aucune variation sur plusieurs mois est le signal le plus fréquent d'un document rempli après coup, et il fragilise le classeur entier."
        ]
      },
      {
        titre: "La réception des livraisons",
        paragraphes: [
          "La réception est le moment où la chaîne du froid change de mains, et c'est souvent le maillon le plus faible parce qu'il tombe pendant la mise en place. Contrôler la température des produits sensibles à l'arrivée, avant de signer le bon, est une mesure de bon sens qui protège autant votre cuisine que votre relation avec le fournisseur.",
          "Le contrôle porte sur trois choses : la température du produit, son état, et la cohérence de l'étiquetage avec le bon de livraison. Un produit non conforme se refuse, et le refus se note. Un produit accepté avec réserve se note aussi. Ces quelques lignes constituent, en cas de problème ultérieur, la preuve que la question a été traitée à l'entrée.",
          "Le rangement immédiat compte autant que le contrôle. Des cartons laissés à quai pendant que le service démarre annulent le bénéfice du contrôle. Une règle simple, comme ranger le froid avant d'ouvrir le sec, se tient dans une phrase et se vérifie d'un coup d'œil."
        ]
      },
      {
        titre: "Que faire devant une rupture de froid",
        paragraphes: [
          "Une panne, une porte restée ouverte, une coupure de courant nocturne arrivent dans tous les établissements. Ce qui distingue une maison bien tenue n'est pas l'absence d'incident, c'est la conduite tenue devant lui. Le premier réflexe est de mesurer la température à cœur d'un produit témoin, pas seulement l'air de l'enceinte, et de noter l'heure.",
          "La décision ensuite se prend selon la denrée, la valeur atteinte et la durée estimée de l'écart. Une denrée dont la sécurité n'est plus assurée est impropre à la consommation humaine et relève du retrait prévu à l'article 19 du règlement (CE) n° 178/2002. Aucun texte ne vous donnera un abaque pour trancher chaque cas : c'est votre analyse des dangers qui doit fixer par avance les limites que vous vous donnez, ce qui évite d'arbitrer dans l'urgence.",
          "Écrire l'incident est ce qui protège le plus. Un document daté qui indique la constatation, la mesure, la décision prise sur les denrées et la remise en service de l'appareil transforme un problème en preuve de maîtrise. C'est exactement ce qu'un agent attend de voir dans un classeur vivant."
        ]
      },
      {
        titre: "Refroidissement et remise en température : le piège des seuils",
        paragraphes: [
          "Le règlement 852/2004, annexe II, chapitre IX, point 6, demande que les denrées devant être conservées ou servies à basse température soient réfrigérées dès que possible après le traitement thermique, à une température n'entraînant pas de risque pour la santé. Là encore, aucun chiffre. Les valeurs que tout le monde cite, passer de soixante-trois à dix degrés en moins de deux heures, figurent à l'annexe IV, point 1, de l'arrêté du 21 décembre 2009.",
          "Or cet arrêté, à son article 6, réserve cette annexe aux établissements de restauration collective. Un restaurant en remise directe, c'est-à-dire qui sert directement le consommateur final, n'y est pas soumis. Le même raisonnement vaut pour la remise en température, dont le seuil figure au point 3 de la même annexe IV. Ces valeurs restent d'excellentes références professionnelles, à reprendre, adapter et justifier dans votre plan de maîtrise sanitaire, mais ce ne sont pas des obligations qui vous seraient opposables comme telles.",
          "À ne pas confondre avec le maintien au chaud des plats cuisinés ou repas livrés chauds, fixé à soixante-trois degrés par l'annexe I du même arrêté, tableau relatif à la liaison chaude. La confusion entre ces trois valeurs est la plus fréquente sur le sujet, et elle mérite d'être levée une fois pour toutes dans votre documentation."
        ]
      },
      {
        titre: "Ce qu'un agent regarde vraiment",
        paragraphes: [
          "Il ouvre les portes et il mesure. Il compare la valeur de l'afficheur à celle d'une sonde plongée dans un produit. Il regarde la charge de l'enceinte, l'état des joints, la présence de givre, la propreté intérieure, la séparation entre produits crus et produits prêts à consommer. Il note ce qu'il voit, et il demande ensuite les relevés correspondants.",
          "La cohérence entre les deux est ce qui compte le plus. Un relevé annonçant trois degrés face à une sonde qui en indique huit pose davantage de questions que l'écart lui-même, parce qu'il met en cause la fiabilité de tout le système de surveillance. À l'inverse, une valeur haute expliquée, mesurée, notée et suivie d'une action se traite comme un incident maîtrisé.",
          "La qualification d'un écart et les suites données relèvent de l'appréciation de l'agent et du service instructeur. Ce que vous maîtrisez, c'est la qualité de vos mesures, la sincérité de vos relevés et votre capacité à expliquer vos choix de température denrée par denrée."
        ]
      },
      {
        titre: "Reprendre le froid en main, poste par poste",
        paragraphes: [
          "Le travail utile tient en trois temps. D'abord dresser la liste des enceintes, avec pour chacune la denrée dominante et la consigne retenue, et vérifier que la consigne correspond bien au produit le plus exigeant. Ensuite vérifier la fiabilité des mesures : un thermomètre par enceinte ou un circuit de relevé, une sonde en état, une vérification simple dans l'eau glacée. Enfin remettre en place un relevé que l'équipe tiendra vraiment, avec la place pour écrire une anomalie.",
          "C'est ce que fait un audit sur place, poste par poste, pendant que le service continue et en toute discrétion. Les vingt-sept points de la grille répartis en douze thèmes couvrent le froid positif, le froid négatif et les relevés, mais aussi tout ce qui pèse dessus sans qu'on y pense : l'organisation des stocks, l'état des locaux, le nettoyage des condenseurs.",
          "Vous recevez un rapport complet, avec une note, les constats point par point et un plan d'action classé par priorité, qui indique pour chaque écart le correctif attendu et la preuve à constituer. La prestation s'arrête là : vous appliquez la liste vous-même, à votre rythme et avec vos propres moyens, et la conformité vient quand elle est traitée. Audit hygiène est un label privé indépendant, ni certification officielle ni contrôle des services vétérinaires. Le cabinet intervient partout en Île-de-France, dans les huit départements, et le devis est établi avant intervention, après un échange de quelques minutes."
        ]
      }
    ],
    faq: [
      {
        question: "Mes frigos doivent-ils être réglés entre zéro et quatre degrés ?",
        reponse: "Pas nécessairement. Cette cible est une référence professionnelle commode, pas un seuil réglementaire unique. Le seuil dépend de la denrée : les tableaux de l'arrêté du 21 décembre 2009 pour les produits d'origine animale et de l'arrêté du 8 octobre 2013 pour les autres denrées donnent des valeurs différenciées. Vous pouvez retenir une autre température si vous la justifiez par un guide de bonnes pratiques d'hygiène ou par votre analyse des dangers. L'essentiel est que la consigne corresponde au produit le plus exigeant de l'enceinte."
      },
      {
        question: "À quelle fréquence faut-il relever les températures ?",
        reponse: "Aucune disposition ne fixe de fréquence. Le règlement (CE) n° 852/2004 impose une surveillance efficace et des documents prouvant l'application effective des mesures, mais c'est votre plan de maîtrise sanitaire qui détermine le rythme et le justifie au regard de votre activité. Un relevé par enceinte et par service est la pratique la plus répandue en restaurant, parce qu'elle suit le rythme réel de la cuisine. Une autre organisation se défend si elle est cohérente et effectivement tenue."
      },
      {
        question: "Un enregistreur automatique remplace-t-il les relevés manuels ?",
        reponse: "Il peut les remplacer, et il présente un avantage réel : les données sont horodatées et continues, ce qui rend la démonstration plus solide qu'une colonne de chiffres manuscrits. Deux conditions cependant. Les alarmes doivent être vues et traitées, sinon l'enregistrement prouve seulement que l'écart est passé inaperçu. Et les données doivent rester consultables sur place le jour d'une visite. Décrivez le dispositif dans votre plan, avec la conduite à tenir en cas d'alarme."
      },
      {
        question: "Un produit oublié hors du froid pendant une heure est-il perdu ?",
        reponse: "Il n'existe pas de règle chiffrée qui répondrait par oui ou par non pour un restaurant. La décision dépend de la denrée, de la température ambiante, de la durée réelle et de la suite prévue, notamment si une cuisson à cœur intervient ensuite. Ce qui est certain, c'est qu'une denrée dont la sécurité n'est plus assurée est impropre à la consommation et relève du retrait prévu à l'article 19 du règlement (CE) n° 178/2002. L'anticipation dans votre analyse des dangers évite d'arbitrer dans l'urgence."
      },
      {
        question: "Le délai de deux heures pour refroidir un plat s'applique-t-il chez moi ?",
        reponse: "Il vient de l'annexe IV, point 1, de l'arrêté du 21 décembre 2009, qui s'applique, selon l'article 6 du même arrêté, aux établissements de restauration collective. Un restaurant en remise directe n'y est pas soumis par ce texte. L'exigence qui vous concerne est celle du règlement 852/2004, annexe II, chapitre IX, point 6 : réfrigérer dès que possible après le traitement thermique, à une température n'entraînant pas de risque. Reprendre le seuil de deux heures dans votre plan reste une excellente référence, à condition de la présenter comme telle."
      },
      {
        question: "Puis-je recongeler un produit décongelé ?",
        reponse: "La recongélation d'un produit décongelé est à proscrire en cuisine. La décongélation permet la reprise de la multiplication microbienne et la recongélation ne la fait pas disparaître, elle la met en pause en dégradant le produit. Aucun texte ne détaille cette conduite pour la restauration : elle découle de l'exigence générale de ne pas conserver les denrées à des températures entraînant un risque, posée à l'annexe II, chapitre IX, point 5, du règlement 852/2004. Écrivez la règle dans votre plan, elle sera plus solide qu'une consigne orale."
      },
      {
        question: "Faut-il un thermomètre dans chaque enceinte ?",
        reponse: "Le règlement demande que les températures puissent être vérifiées et, si nécessaire, enregistrées, sans imposer un appareil par enceinte. Un thermomètre par enceinte reste la solution la plus lisible et la plus rapide au quotidien. Un thermomètre mobile utilisé selon un circuit fixe convient aussi, à condition qu'il soit toujours disponible et fiable. Ce qui compte est la fiabilité de la mesure et la régularité de la méthode : même endroit, même moment, même outil."
      },
      {
        question: "Que faire si une panne survient la nuit et que je découvre l'écart au matin ?",
        reponse: "Mesurez d'abord la température à cœur d'un produit témoin, pas seulement l'air de l'enceinte, et notez l'heure. Évaluez ensuite denrée par denrée, en tenant compte de la durée probable de l'écart. Ce qui n'est plus sûr est retiré, au titre de l'article 19 du règlement (CE) n° 178/2002. Faites intervenir sur l'appareil avant de le recharger. Enfin, écrivez l'incident : constat, mesure, décision, remise en service. Ce document est la meilleure démonstration de maîtrise que vous puissiez produire."
      }
    ],
    liens: [
      "/points-de-controle/temperatures-des-enceintes-froides-positives-conformes",
      "/points-de-controle/temperatures-des-enceintes-negatives-conformes",
      "/points-de-controle/releves-de-temperature-tenus-et-archives",
      "/themes/chaine-du-froid",
      "/themes/temperatures-cuisson",
      "/contact"
    ]
  },
  {
    slug: "tracabilite-et-dlc-en-restauration",
    titre: "Traçabilité et dates de consommation en restauration",
    titreSeo: "Traçabilité et DLC en restauration : ce qui est exigé",
    description: "Étiquettes, numéros de lot, dates d'ouverture, durée de vie secondaire : les obligations réelles issues du règlement 178/2002 et ce qui relève de votre plan.",
    reponse: "La traçabilité est une obligation de résultat posée par l'article 18 du règlement (CE) n° 178/2002 du 28 janvier 2002 : vous devez pouvoir identifier toute personne vous ayant fourni une denrée et mettre cette information à la disposition des autorités à leur demande. En restaurant, cela repose sur les documents que vous recevez déjà, bons de livraison, factures et étiquettes des produits d'origine animale. Les dates relèvent d'un autre texte, le règlement (UE) n° 1169/2011 du 25 octobre 2011. En revanche, l'étiquetage des produits entamés avec une date d'ouverture n'est imposé par aucune disposition : c'est votre plan de maîtrise sanitaire qui le prévoit.",
    ouverture: "Deux sujets voisins sont ici presque toujours confondus : savoir d'où vient un produit, et savoir jusqu'à quand il peut être servi. Ils obéissent à des textes différents, et les distinguer simplifie beaucoup l'organisation d'une cuisine.",
    sections: [
      {
        titre: "Deux obligations différentes que l'on confond",
        paragraphes: [
          "La traçabilité répond à une question d'origine : si un produit pose problème, de quel fournisseur vient-il, sous quel lot, livré quel jour ? Elle sert à remonter la chaîne et à circonscrire un incident. Elle ne dit rien de la qualité du produit et ne concerne pas directement la durée pendant laquelle il peut être conservé.",
          "Les dates répondent à une question de durée de vie : jusqu'à quand ce produit peut-il être consommé sans danger, ou sans perte de qualité ? Elles sont apposées par celui qui fabrique ou conditionne le produit et suivent des règles d'étiquetage propres. Elles relèvent du règlement (UE) n° 1169/2011 du 25 octobre 2011, texte d'information du consommateur, et non du texte sur la traçabilité.",
          "Dans une cuisine, les deux se rencontrent sur la même étiquette et c'est pour cela qu'on les mélange. Les séparer dans votre organisation évite un travers courant : consacrer beaucoup d'énergie à dater les boîtes entamées tout en jetant les bons de livraison au fil de la semaine, c'est-à-dire soigner ce qu'aucun texte n'exige et négliger ce qu'un texte impose."
        ]
      },
      {
        titre: "Ce que le texte impose, ce qu'il n'impose pas",
        paragraphes: [
          "L'article 18 du règlement (CE) n° 178/2002 pose que la traçabilité des denrées est établie à toutes les étapes de la production, de la transformation et de la distribution. L'exploitant doit être en mesure d'identifier toute personne lui ayant fourni une denrée et doit disposer de systèmes et de procédures permettant de mettre cette information à la disposition des autorités compétentes à leur demande. L'article 19 organise ensuite le retrait, l'information des consommateurs et le rappel des denrées non conformes. Pour les denrées d'origine animale, le règlement d'exécution (UE) n° 931/2011 du 19 septembre 2011 précise les informations à détenir.",
          "Côté dates, le règlement (UE) n° 1169/2011 impose la mention de la date de durabilité minimale ou de la date limite de consommation à son article 9, paragraphe 1, point f), et à son article 24, l'annexe X précisant les formulations. L'article 24, paragraphe 1, ajoute une conséquence importante : au-delà de la date limite de consommation, une denrée est réputée dangereuse au sens de l'article 14, paragraphes 2 à 5, du règlement (CE) n° 178/2002, ce qui déclenche le retrait prévu à l'article 19.",
          "Ce qui n'est imposé par aucune disposition mérite d'être connu avec la même précision. L'étiquetage des produits entamés avec une date d'ouverture, la fixation d'une durée de vie secondaire après ouverture, la conservation des étiquettes et des bons de livraison pendant une durée déterminée : rien de tout cela ne figure dans un texte applicable à un restaurant. Ce sont des moyens, à définir dans votre plan de maîtrise sanitaire, de satisfaire les obligations ci-dessus et les exigences de conservation du règlement 852/2004, annexe II, chapitre IX, points 2 et 3.",
          "Une précision utile pour la durée de vie après ouverture : le règlement 1169/2011, article 25, paragraphe 2, prévoit que les conditions particulières de conservation après ouverture soient indiquées par le fabricant. C'est donc l'étiquette du produit qui vous donne le point de départ, et votre plan qui en tire une règle applicable à votre cuisine."
        ]
      },
      {
        titre: "La traçabilité amont : un pas en arrière suffit",
        paragraphes: [
          "L'obligation de l'article 18 s'énonce souvent ainsi : un pas en arrière, un pas en avant. En restaurant, le pas en avant vers le consommateur final n'est pas exigible produit par produit, parce que vous ne pouvez pas identifier vos clients. Reste le pas en arrière, qui doit être solide : pour chaque denrée présente chez vous, savoir qui vous l'a fournie et quand.",
          "Cette exigence se satisfait avec des documents que vous recevez déjà. Les bons de livraison et les factures portent le fournisseur, la date et la nature des produits. Les étiquettes des produits d'origine animale portent en outre la marque d'identification et le lot. Il n'y a rien à créer, il y a à conserver et à classer de façon retrouvable.",
          "Le classement le plus simple reste chronologique : une pochette par mois, ou par semaine dans les établissements à fort volume. Ce qui compte est le temps qu'il vous faut pour retrouver l'origine d'un produit servi tel jour. Si la réponse se donne en quelques minutes, votre système fonctionne, quelle que soit sa forme."
        ]
      },
      {
        titre: "Les étiquettes et les numéros de lot",
        paragraphes: [
          "La question la plus posée est celle des étiquettes qu'il faudrait garder. Aucune disposition ne fixe de liste ni de durée pour un restaurant. La pratique professionnelle qui se défend le mieux consiste à conserver les étiquettes des produits d'origine animale, celles qui portent la marque d'identification et le lot, et à s'appuyer sur les bons de livraison pour le reste.",
          "La photographie systématique des étiquettes au moment du déconditionnement est devenue une solution très pratique. Elle est datée par l'appareil, elle ne s'efface pas comme une étiquette humide, elle ne prend pas de place. Elle vaut ce que vaut son classement : un dossier par mois sur un téléphone partagé, sauvegardé, reste consultable le jour d'une visite.",
          "Le point réellement sensible n'est pas la quantité d'étiquettes conservées, c'est le lien entre le lot et la période de service. Une étiquette conservée sans savoir quand le produit a été utilisé ne permet pas de circonscrire un incident. Noter la date d'ouverture sur la boîte, même si aucun texte ne l'impose, rétablit ce lien pour un coût nul."
        ]
      },
      {
        titre: "DLC et date de durabilité minimale",
        paragraphes: [
          "Deux régimes coexistent et n'ont pas les mêmes conséquences. La date limite de consommation concerne les denrées microbiologiquement très périssables. Une fois dépassée, la denrée est réputée dangereuse par l'article 24, paragraphe 1, du règlement 1169/2011 et doit être retirée. Il n'y a pas d'appréciation à porter : la présence en stock d'un produit dont la date limite est dépassée est un constat objectif.",
          "La date de durabilité minimale, longtemps appelée date limite d'utilisation optimale, concerne les produits stables. Son dépassement n'emporte pas la même conséquence : le produit peut perdre en qualité organoleptique sans devenir dangereux, et sa présence n'est pas assimilable à celle d'une denrée périmée au sens précédent. Encore faut-il que l'emballage soit intact, que les conditions de conservation aient été respectées et que le produit soit sain.",
          "En pratique, la clarté sur ce point évite deux erreurs symétriques : jeter par excès de prudence des produits parfaitement sains, ou conserver par méconnaissance des produits qui doivent partir. Écrire la distinction dans votre plan, en une phrase, suffit à aligner toute l'équipe."
        ]
      },
      {
        titre: "Les produits entamés et la durée de vie secondaire",
        paragraphes: [
          "Dès qu'un produit est ouvert, sa date d'origine cesse de s'appliquer telle quelle : le contenu a été exposé à l'air, aux mains, au matériel. Le règlement 1169/2011, article 25, paragraphe 2, prévoit que le fabricant indique les conditions particulières de conservation après ouverture. C'est le premier endroit à regarder, et cette indication figure sur beaucoup de conditionnements professionnels.",
          "Quand elle manque, c'est à vous de fixer une durée et de la justifier. Aucun texte ne vous donnera un chiffre. Les guides de bonnes pratiques d'hygiène du secteur proposent des repères par famille de produits, et c'est là qu'il faut aller chercher une base défendable. Le raisonnement s'appuie sur la nature du produit, sa température de conservation, son mode de manipulation et le délai réel d'écoulement dans votre cuisine.",
          "La règle retenue doit ensuite être écrite et appliquée uniformément. Une durée notée dans le plan, une étiquette de date d'ouverture sur la boîte, un contrôle au moment de la mise en place : trois gestes qui tiennent en quelques secondes et qui rendent la maîtrise visible. Ce dispositif n'est pas une obligation réglementaire, c'est la manière la plus simple de démontrer que les conditions de conservation du chapitre IX de l'annexe II du règlement 852/2004 sont respectées."
        ]
      },
      {
        titre: "Déconditionnement et étiquetage interne",
        paragraphes: [
          "Le déconditionnement est le moment où l'information se perd. Un produit sorti de son emballage d'origine et transvasé dans un bac gastronorme n'a plus ni lot, ni date, ni conditions de conservation. Reporter l'information au moment du transvasement, et non plus tard, est le seul geste qui empêche cette perte.",
          "Une étiquette interne utile porte peu de choses : la dénomination, la date d'ouverture ou de fabrication, et la date jusqu'à laquelle le produit sera utilisé. Ajouter le nom de la personne qui l'a préparée aide à retrouver l'information sans transformer l'étiquette en formulaire. Le support importe peu, du ruban adhésif d'écriture au dérouleur d'étiquettes.",
          "L'écueil classique est l'étiquette illisible, effacée par l'humidité de la chambre froide ou recouverte par une nouvelle sans que l'ancienne ait été retirée. Une boîte portant trois dates superposées ne prouve rien et fait naître un doute sur l'ensemble de la réserve. Nettoyer la boîte à chaque réemploi fait partie du geste."
        ]
      },
      {
        titre: "Les préparations faites maison",
        paragraphes: [
          "Vos propres préparations posent la même question que les produits entamés, sans étiquette de fabricant pour vous aider. Une sauce, un fond, une farce, une pâtisserie préparés en cuisine doivent recevoir une date de fabrication et une durée d'utilisation que vous fixez et justifiez dans votre plan, au regard de leur composition et de leur température de conservation.",
          "Les préparations à base d'œufs crus, de produits de la pêche ou de viandes hachées demandent la plus grande attention, parce que leur marge de sécurité est courte. Ce sont aussi celles qu'un agent repérera immédiatement sur un plan de travail et sur lesquelles il posera des questions précises.",
          "La sous-traitance implicite existe aussi : un produit acheté déjà transformé chez un fournisseur relève de la traçabilité amont, avec ses documents. Un produit transformé chez vous relève de votre organisation interne. La frontière doit être nette dans votre documentation, parce qu'elle détermine où chercher l'information en cas d'incident."
        ]
      },
      {
        titre: "Retrait et rappel : décider avant d'y être",
        paragraphes: [
          "L'article 19 du règlement 178/2002 impose d'engager le retrait d'une denrée dont vous estimez ou avez des raisons de penser qu'elle n'est pas conforme aux prescriptions de sécurité, et d'en informer les autorités compétentes. Lorsque le produit a pu atteindre le consommateur, l'information de celui-ci et le rappel entrent en jeu. C'est une procédure, et une procédure s'écrit à froid.",
          "Une page suffit : qui décide, qui isole physiquement les produits concernés et où, qui contacte le fournisseur, qui prévient la direction départementale de la protection des populations, et ce qui est consigné. Cette page transforme un moment de panique en suite d'actions connues, et c'est exactement ce qu'un agent veut voir quand il pose la question.",
          "Le déclencheur le plus fréquent n'est pas un contrôle mais une information reçue du fournisseur, parfois un simple message signalant un lot. Savoir en quelques minutes si ce lot est passé chez vous, et où il en est, est précisément ce que la traçabilité amont rend possible. C'est là qu'elle prouve son utilité, bien plus qu'en visite."
        ]
      },
      {
        titre: "Ce qu'un agent regarde",
        paragraphes: [
          "Il ouvre les enceintes et il regarde les boîtes. Une date dépassée en stock est un constat immédiat, indiscutable, et c'est le plus fréquent sur ce thème. Il regarde ensuite si les produits entamés portent une indication, si les étiquettes sont lisibles, si les préparations maison sont datées. Il demande enfin les documents d'origine sur un ou deux produits choisis dans la chambre froide.",
          "Ce dernier test est le vrai. Il ne s'agit pas de montrer un classeur, il s'agit de retrouver, pour un produit précis qu'il désigne, le fournisseur et la date de livraison. Un système qui répond en quelques minutes emporte la conviction, quelle que soit sa forme, papier ou photographique.",
          "La qualification des écarts et les suites relèvent de l'appréciation de l'agent et du service instructeur. Ce que vous maîtrisez, c'est l'absence de produits périmés en stock, la lisibilité de vos étiquettes internes et la rapidité avec laquelle vous remontez à l'origine d'une denrée."
        ]
      },
      {
        titre: "Remettre la traçabilité en ordre sans alourdir le service",
        paragraphes: [
          "Les corrections utiles sont peu nombreuses et rapides. Installer une pochette de classement à côté du poste de réception, pour que les bons y entrent avant d'être perdus. Décider d'une méthode unique d'étiquetage interne et la faire tenir par tout le monde. Fixer, en s'appuyant sur les indications des fabricants et sur les guides du secteur, les durées après ouverture des dix produits les plus utilisés. Passer en revue les enceintes une fois par semaine pour sortir ce qui doit sortir.",
          "Un audit sur place vérifie ces points dans les conditions réelles du service. Les vingt-sept points de la grille, répartis en douze thèmes, couvrent l'étiquetage et les dates comme la conservation des étiquettes et des numéros de lot, en toute discrétion pendant que la cuisine tourne. L'auditeur fait le test qu'un agent ferait : il choisit un produit et remonte son origine avec vous.",
          "Vous recevez un rapport complet, avec une note, les constats point par point et un plan d'action classé par priorité, qui indique pour chaque écart le correctif attendu et la preuve à constituer. La prestation s'arrête là : vous appliquez la liste vous-même, à votre rythme et avec vos propres moyens, et la conformité vient quand elle est traitée. Audit hygiène est un label privé indépendant, ni certification officielle ni agrément d'État. Le cabinet intervient partout en Île-de-France, dans les huit départements, et le devis est établi avant intervention, après un échange de quelques minutes."
        ]
      }
    ],
    faq: [
      {
        question: "Combien de temps dois-je garder les étiquettes et les bons de livraison ?",
        reponse: "Aucune disposition ne fixe de durée précise pour un restaurant. L'obligation de l'article 18 du règlement (CE) n° 178/2002 est de pouvoir identifier vos fournisseurs et de mettre l'information à disposition des autorités à leur demande, ce qui suppose une conservation cohérente avec la durée de vie de vos produits et le délai raisonnable d'apparition d'un incident. C'est à votre plan de maîtrise sanitaire de fixer cette durée et de la justifier. L'usage professionnel courant retient une conservation de plusieurs mois."
      },
      {
        question: "Faut-il obligatoirement noter la date d'ouverture sur les produits entamés ?",
        reponse: "Aucun texte ne l'impose à un restaurant. C'est une bonne pratique d'hygiène, et de loin la plus simple pour démontrer que les conditions de conservation exigées par le règlement 852/2004, annexe II, chapitre IX, sont respectées. Le point de départ est l'indication du fabricant sur la conservation après ouverture, prévue à l'article 25, paragraphe 2, du règlement (UE) n° 1169/2011. À défaut, vous fixez une durée dans votre plan en vous appuyant sur les guides de bonnes pratiques du secteur."
      },
      {
        question: "Un produit dont la DDM est dépassée doit-il être jeté ?",
        reponse: "Le dépassement d'une date de durabilité minimale, autrefois appelée date limite d'utilisation optimale, n'emporte pas les mêmes conséquences qu'un dépassement de date limite de consommation. Le produit peut perdre en qualité sans devenir dangereux. Encore faut-il que l'emballage soit intact, que les conditions de conservation aient été tenues et que le produit soit sain à l'examen. Le dépassement d'une date limite de consommation, lui, rend la denrée réputée dangereuse au titre de l'article 24 du règlement 1169/2011 et impose son retrait."
      },
      {
        question: "Les photos d'étiquettes sont-elles acceptées ?",
        reponse: "Aucun texte n'impose de support pour la conservation de ces informations. Une photographie datée, classée et sauvegardée répond parfaitement à l'exigence de l'article 18 du règlement 178/2002, à condition d'être consultable le jour où on vous la demande. Elle présente même deux avantages sur le papier : elle ne s'efface pas en chambre froide et elle porte un horodatage. Décrivez la méthode dans votre plan, en précisant qui photographie, où les images sont stockées et comment on les retrouve."
      },
      {
        question: "Dois-je tracer les produits jusqu'au client ?",
        reponse: "Non. Le principe dit du pas en avant ne peut pas s'appliquer produit par produit dans un restaurant, puisque vous ne pouvez pas identifier vos clients. Ce qui vous est demandé par l'article 18 du règlement (CE) n° 178/2002, c'est le pas en arrière : identifier toute personne vous ayant fourni une denrée. En revanche, l'article 19 vous impose, si une denrée non conforme a pu atteindre le consommateur, d'informer les autorités compétentes et, le cas échéant, d'informer le consommateur."
      },
      {
        question: "Comment fixer une durée de conservation pour mes préparations maison ?",
        reponse: "Aucun texte ne fournit de chiffre. Le raisonnement s'appuie sur la nature de la préparation, notamment la présence d'œufs crus, de produits de la pêche ou de viandes hachées, sur la température de conservation, sur le mode de manipulation et sur le délai réel d'écoulement dans votre cuisine. Les guides de bonnes pratiques d'hygiène du secteur donnent des repères par famille de produits. La durée retenue s'écrit dans le plan de maîtrise sanitaire, s'affiche en cuisine et s'applique uniformément."
      },
      {
        question: "Que faire si un fournisseur m'informe d'un problème sur un lot ?",
        reponse: "Isolez physiquement les produits concernés pour qu'ils ne puissent pas être servis, vérifiez dans vos documents si le lot est passé chez vous et jusqu'où il a été utilisé, puis appliquez la procédure prévue par l'article 19 du règlement (CE) n° 178/2002 : retrait, information des autorités compétentes et, si le produit a pu atteindre le consommateur, information de celui-ci. Consignez chaque étape par écrit. Une procédure d'une page, écrite à froid, rend ce moment beaucoup plus simple."
      },
      {
        question: "Une étiquette illisible est-elle un problème ?",
        reponse: "Elle en est un, parce qu'une information qui ne se lit plus ne prouve rien. Le cas le plus fréquent est l'étiquette effacée par l'humidité de la chambre froide, ou recouverte par une nouvelle sans que l'ancienne ait été retirée. Une boîte portant plusieurs dates superposées fait naître un doute sur l'ensemble de la réserve. Nettoyer le contenant à chaque réemploi et choisir un support qui résiste au froid humide règlent le sujet définitivement, pour un coût très faible."
      }
    ],
    liens: [
      "/points-de-controle/etiquetage-et-dlc-dluo-respectes",
      "/points-de-controle/conservation-des-etiquettes-n-de-lot",
      "/themes/tracabilite-dlc",
      "/points-de-controle/organisation-des-stocks-rotation-sol",
      "/methode",
      "/contact"
    ]
  },
  {
    slug: "nettoyage-et-desinfection-en-cuisine",
    titre: "Nettoyage et désinfection en cuisine professionnelle",
    titreSeo: "Nettoyage et désinfection en cuisine : le plan réel",
    description: "Plan de nettoyage, choix et stockage des produits, enregistrements : ce que le règlement 852/2004 exige réellement et ce qui n'est imposé par aucun texte.",
    reponse: "Le règlement (CE) n° 852/2004 du 29 avril 2004 demande, à son annexe II, chapitre I, point 1, que les locaux par lesquels circulent les denrées soient propres et en bon état d'entretien, et à son chapitre V, point 1 a), que tous les articles, installations et équipements en contact avec les denrées soient effectivement nettoyés et, le cas échéant, désinfectés, à une fréquence suffisante pour éviter tout risque de contamination. Aucune disposition n'impose la forme d'un plan de nettoyage écrit ni des fréquences chiffrées. Le plan est un volet de votre plan de maîtrise sanitaire, et seule la preuve documentaire de son application relève d'un texte, l'article 5, paragraphe 2, point g).",
    ouverture: "C'est le thème sur lequel circulent le plus de règles imaginaires, du plan de nettoyage obligatoire à la fréquence gravée dans le marbre. Le texte est en réalité beaucoup plus court, et beaucoup plus exigeant sur le résultat.",
    sections: [
      {
        titre: "Nettoyer et désinfecter sont deux opérations distinctes",
        paragraphes: [
          "Nettoyer consiste à retirer les salissures visibles, graisses, résidus alimentaires, poussières. Désinfecter consiste à réduire la population de micro-organismes présents sur une surface déjà propre. L'ordre n'est pas interchangeable : un désinfectant appliqué sur une surface grasse est en grande partie neutralisé par la matière organique et n'atteint pas son objectif.",
          "Cette distinction explique la formulation du règlement, qui parle de nettoyer et, le cas échéant, de désinfecter. La désinfection n'est pas requise partout : elle s'impose sur les surfaces et le matériel en contact direct avec des denrées, en particulier après le travail de produits crus. Un sol propre, un mur en bon état, une étagère de réserve n'appellent pas le même traitement qu'une planche à découper ou qu'un plan de travail de préparation froide.",
          "En pratique, un établissement qui distingue clairement ces deux opérations économise du temps et du produit. Il concentre la désinfection là où elle compte, avec un temps de contact respecté, plutôt que de la disperser partout avec un temps de contact jamais tenu."
        ]
      },
      {
        titre: "Ce que le texte impose, ce qu'il n'impose pas",
        paragraphes: [
          "Deux dispositions portent l'essentiel. L'annexe II, chapitre I, point 1, du règlement 852/2004 exige des locaux propres et en bon état d'entretien. L'annexe II, chapitre V, point 1 a), exige que les articles, installations et équipements avec lesquels les denrées entrent en contact soient effectivement nettoyés et, le cas échéant, désinfectés, à une fréquence suffisante pour éviter tout risque de contamination. Le mot important est suffisante : le texte fixe un objectif, pas un calendrier.",
          "Il faut le dire clairement : aucune disposition n'impose la forme d'un plan de nettoyage écrit, ni des fréquences chiffrées, ni un modèle de fiche, ni une signature, ni une durée de conservation des enregistrements. Le plan de nettoyage est un volet de votre plan de maîtrise sanitaire, c'est-à-dire un outil que vous vous donnez pour organiser et prouver ce que le texte exige.",
          "Ce qui relève bien d'un texte, en revanche, c'est l'obligation d'établir des documents et des dossiers prouvant l'application effective des mesures, posée par l'article 5, paragraphe 2, point g), du règlement 852/2004, avec la tenue à jour et la conservation pendant une période appropriée prévues au paragraphe 4. Autrement dit, la preuve est exigible, sa forme ne l'est pas.",
          "Une formule circule beaucoup dans le métier : ce qui n'est pas tracé est réputé non fait. Elle décrit fidèlement une pratique de contrôle, elle n'est pas une règle de droit. La connaître dans les deux sens est utile : elle explique pourquoi il vaut mieux écrire ce que l'on fait, sans pour autant vous obliger à produire des fiches pour chaque geste de la journée."
        ]
      },
      {
        titre: "Construire un plan de nettoyage qui tienne",
        paragraphes: [
          "Un plan de nettoyage utile répond à cinq questions par zone : quoi, avec quoi, comment, à quelle fréquence, par qui. Les quatre premières colonnes se remplissent en marchant dans l'établissement, la cinquième est celle qui fait vivre ou mourir le plan. Une tâche sans responsable désigné n'est faite que lorsque quelqu'un y pense.",
          "Le découpage par zone est plus efficace que le découpage par matériel. La zone de préparation froide, la zone de cuisson, la plonge, la réserve sèche, les chambres froides, la salle, les sanitaires, le local déchets, le vestiaire : chacune a son rythme et ses points sensibles. À l'intérieur de chaque zone, listez ce qui est touché quotidiennement, ce qui l'est chaque semaine, et ce qui relève d'une opération périodique.",
          "Le plan doit tenir sur un support que l'on regarde. Une feuille plastifiée affichée dans la zone concernée est lue, un classeur rangé dans le bureau ne l'est pas. Cette différence de support explique une grande partie des écarts constatés entre le document et la réalité."
        ]
      },
      {
        titre: "Fixer des fréquences et savoir les justifier",
        paragraphes: [
          "Puisque aucun texte ne les chiffre, les fréquences se déduisent de votre activité. Le raisonnement est simple : à quelle vitesse cette surface se salit, quel produit y passe, quel serait le risque si elle restait sale jusqu'au lendemain ? Une planche utilisée pour la volaille crue et une étagère de conserves ne relèvent évidemment pas du même rythme.",
          "Une fréquence justifiée par ce raisonnement se défend devant un agent, alors qu'une fréquence recopiée d'un modèle ne se défend pas. Écrire une ligne de justification à côté de chaque fréquence sensible transforme votre plan en argument. C'est une pratique rare, et c'est celle qui produit le meilleur effet en visite.",
          "Prévoyez aussi les fréquences réduites et les opérations reportables. Une hotte se dégraisse selon un rythme lié au type de cuisson pratiqué. Une chambre froide se vide et se lave selon la rotation des produits. Ces opérations lourdes tombent souvent aux fermetures hebdomadaires ou aux périodes creuses : les inscrire au plan les fait exister, les laisser implicites les fait disparaître."
        ]
      },
      {
        titre: "Le résultat dépend de quatre facteurs",
        paragraphes: [
          "Un nettoyage efficace combine une action mécanique, une action chimique, une température et un temps de contact. Ces quatre facteurs se compensent partiellement : moins de frottement demande plus de temps de contact, une eau plus froide demande un produit plus actif. C'est un repère professionnel, pas une règle réglementaire, et il explique la plupart des échecs constatés.",
          "L'erreur la plus répandue est le temps de contact non respecté. Un désinfectant pulvérisé puis essuyé dans la foulée n'a pas agi, quelle que soit sa qualité. La fiche technique du produit indique la durée nécessaire, et cette durée conditionne l'organisation du poste : on désinfecte avant de partir en pause, pas au moment de reprendre le service.",
          "La deuxième erreur est le dosage approximatif. Un produit surdosé coûte cher, laisse des résidus et ne nettoie pas mieux. Un produit sous-dosé donne l'illusion du travail fait. Une centrale de dilution, un doseur ou simplement un repère marqué sur le seau règlent la question durablement."
        ]
      },
      {
        titre: "Les produits : aptitude, étiquetage, stockage",
        paragraphes: [
          "L'aptitude des produits employés pour nettoyer les surfaces au contact des denrées est encadrée par l'arrêté du 8 septembre 1999 modifié, pris pour l'application de l'article 11 du décret n° 73-138 du 12 février 1973 modifié, relatif aux procédés et produits utilisés pour le nettoyage des matériaux et objets destinés à entrer en contact avec des denrées, produits et boissons pour l'alimentation de l'homme et des animaux. Concrètement, cela signifie que tout produit du commerce n'a pas sa place sur un plan de travail.",
          "Le stockage est cadré par deux dispositions du règlement 852/2004. L'annexe II, chapitre I, point 10, interdit d'entreposer les produits de nettoyage et de désinfection dans les zones où les denrées alimentaires sont manipulées. L'annexe II, chapitre IX, point 8, impose que les substances dangereuses et non comestibles fassent l'objet d'un étiquetage approprié et soient entreposées dans des conteneurs sûrs et séparés.",
          "Le cas le plus fréquemment relevé est banal : un bidon posé sous le plan de travail, ou un pulvérisateur transvasé sans étiquette. Le transvasement dans un contenant non identifié est doublement problématique, parce qu'il fait perdre l'identification du produit et parce qu'il fait perdre les consignes de dilution et de sécurité. Un placard fermé, dédié, et des étiquettes lisibles suffisent à solder ce point."
        ]
      },
      {
        titre: "Le rinçage et les surfaces au contact des denrées",
        paragraphes: [
          "Après désinfection, les surfaces destinées au contact des denrées appellent un rinçage à l'eau potable, sauf lorsque la fiche technique du produit prévoit expressément l'absence de rinçage. Ce point se vérifie sur la fiche, pas sur l'habitude. Conserver les fiches techniques des produits utilisés, dans le classeur ou à côté du placard, est une bonne pratique très utile en visite.",
          "Le matériel de nettoyage lui-même est une source de contamination sous-estimée. Une lavette laissée humide dans un seau devient un support de multiplication microbienne et transporte d'un poste à l'autre ce qu'elle est censée retirer. Le code couleur par zone, le lavage quotidien des textiles, le séchage des raclettes et des balais tête en l'air font une différence visible.",
          "La plonge mérite un traitement à part. Le lavage manuel exige un produit adapté, une eau renouvelée et un séchage à l'air plutôt qu'au torchon. Le lave-vaisselle exige une température de cycle atteinte, un adoucisseur en état et des bras de lavage non obstrués. Un contrôle rapide des bras et des filtres à chaque fin de service évite la plupart des mauvaises surprises."
        ]
      },
      {
        titre: "Les zones que l'on oublie",
        paragraphes: [
          "Les mêmes zones reviennent dans les constats, parce qu'elles ne se voient pas depuis le poste de travail. Le dessous et l'arrière des équipements, les pieds de tables inox, les rails de portes de chambre froide, les joints de porte, les grilles de ventilation, les siphons de sol, l'intérieur des machines à glaçons et des trancheurs, le dessus des hottes et des étagères hautes.",
          "Le meilleur remède est un parcours périodique, lampe en main, en s'accroupissant et en regardant vers le haut. Ce que l'on voit dans cette position est exactement ce qu'un agent verra, puisqu'il fera le même geste. Un quart d'heure passé ainsi une fois par semaine change la note d'un établissement.",
          "Le démontage fait partie du nettoyage. Un trancheur, un cutter, un mixeur plongeant, un bec de tireuse ne se nettoient pas montés. Inscrire explicitement le démontage dans le plan évite qu'il soit considéré comme optionnel les jours de forte activité."
        ]
      },
      {
        titre: "Les enregistrements de nettoyage",
        paragraphes: [
          "L'obligation qui existe est celle de l'article 5, paragraphe 2, point g), du règlement 852/2004 : établir des documents et des dossiers, en fonction de la nature et de la taille de l'entreprise, pour prouver l'application effective des mesures. Le paragraphe 4 ajoute la tenue à jour et la conservation pendant une période appropriée. Ni la forme des fiches, ni la signature, ni la durée de conservation ne sont fixées par une disposition.",
          "La conséquence pratique est libératrice : vous n'avez pas besoin d'une fiche par geste. Une fiche hebdomadaire par zone, où l'on coche les opérations périodiques et où l'on note les anomalies, est souvent plus honnête et plus utile qu'un formulaire quotidien rempli en série le vendredi soir. La sincérité du document compte davantage que sa densité.",
          "Là encore, ce qui donne de la valeur à un enregistrement, c'est la trace de ce qui n'a pas marché : une opération reportée avec son motif, une dégradation constatée, une intervention demandée. Un document sans aucune aspérité sur six mois éveille la même méfiance qu'un relevé de température parfaitement plat."
        ]
      },
      {
        titre: "Vérifier que le nettoyage produit son effet",
        paragraphes: [
          "Le premier contrôle est visuel et tactile, et il est plus fiable qu'on ne le croit : une surface propre ne colle pas, ne laisse pas de trace au doigt, ne sent rien. Un contrôle croisé, où quelqu'un vérifie une zone qu'il n'a pas nettoyée, révèle plus de choses qu'une auto-vérification.",
          "Les prélèvements de surface constituent un contrôle complémentaire. Aucun texte ne les impose à un restaurant, et il ne faut pas les présenter comme une obligation. Ils ont une utilité réelle sur des points précis, par exemple pour valider une procédure nouvelle ou pour objectiver un doute persistant sur un équipement. Leur intérêt tient à la répétition dans le temps, pas au prélèvement isolé.",
          "Un résultat défavorable n'est pas un échec, c'est une information. Il conduit à revoir un des quatre facteurs, dosage, temps de contact, action mécanique ou température, puis à contrôler de nouveau. Consigner cette boucle dans le classeur est la meilleure démonstration possible que votre plan est vivant."
        ]
      },
      {
        titre: "Ce qu'un agent regarde, et par où reprendre",
        paragraphes: [
          "Il regarde la propreté réelle des surfaces au contact, l'état des équipements démontables, les zones basses et hautes, le local de stockage des produits, l'étiquetage des contenants et le matériel de nettoyage lui-même. Il demande ensuite le plan et les enregistrements, et il vérifie la cohérence entre les deux. Un plan annonçant un dégraissage mensuel de hotte face à une hotte manifestement chargée crée un écart plus difficile à expliquer que l'absence de plan.",
          "La reprise se fait dans l'ordre inverse de l'intuition. On commence par la réalité des surfaces, on ajuste ensuite le plan pour qu'il décrive ce qui est réellement tenable, et on installe enfin les enregistrements. Un plan ambitieux posé sur une organisation qui ne suit pas produit des écarts, alors qu'un plan modeste et tenu produit de la conformité.",
          "C'est ce travail que permet un audit sur place. L'auditeur parcourt les vingt-sept points de la grille répartis en douze thèmes, en toute discrétion pendant le service, regarde sous les équipements et derrière les portes, et confronte le plan aux postes. Vous recevez un rapport complet, avec une note, les constats point par point et un plan d'action classé par priorité, qui indique pour chaque écart le correctif attendu et la preuve à constituer. La prestation s'arrête là : vous appliquez la liste vous-même, à votre rythme et avec vos propres moyens, et la conformité vient quand elle est traitée. Audit hygiène est un label privé indépendant, ni certification officielle ni contrôle des services vétérinaires. Le cabinet intervient partout en Île-de-France, dans les huit départements, et le devis est établi avant intervention, après un échange de quelques minutes."
        ]
      }
    ],
    faq: [
      {
        question: "Le plan de nettoyage écrit est-il obligatoire ?",
        reponse: "Aucune disposition n'impose la forme d'un plan de nettoyage écrit à un restaurant. Ce qui est exigé par le règlement (CE) n° 852/2004, ce sont des locaux propres et en bon état d'entretien, un nettoyage effectif des surfaces au contact des denrées à une fréquence suffisante pour éviter tout risque de contamination, et des documents prouvant l'application effective des mesures. Le plan écrit est le moyen le plus simple et le plus lisible de démontrer tout cela, et il reste vivement recommandé, mais il est un moyen et non une obligation en soi."
      },
      {
        question: "Existe-t-il des fréquences de nettoyage réglementaires ?",
        reponse: "Non. Le règlement parle d'une fréquence suffisante pour éviter tout risque de contamination, ce qui renvoie à votre analyse. Les fréquences se déduisent de la vitesse à laquelle une surface se salit, de la nature des produits qui y passent et du risque encouru si elle restait en l'état. Une fréquence justifiée par ce raisonnement, écrite dans votre plan, se défend très bien. Une fréquence recopiée d'un modèle générique ne se défend pas, parce qu'elle ne correspond à aucune réalité de votre cuisine."
      },
      {
        question: "Quels produits ai-je le droit d'utiliser ?",
        reponse: "Pour les surfaces destinées au contact des denrées, l'aptitude des produits relève de l'arrêté du 8 septembre 1999 modifié, pris pour l'application de l'article 11 du décret n° 73-138 du 12 février 1973 modifié. Concrètement, choisissez des produits présentés comme utilisables en milieu agroalimentaire, conservez leur fiche technique, respectez le dosage et le temps de contact indiqués, et rincez à l'eau potable sauf mention contraire de la fiche. Un produit ménager courant n'est pas nécessairement apte à cet usage."
      },
      {
        question: "Où dois-je stocker mes produits de nettoyage ?",
        reponse: "Le règlement 852/2004 est explicite. L'annexe II, chapitre I, point 10, interdit d'entreposer les produits de nettoyage et de désinfection dans les zones où les denrées sont manipulées. L'annexe II, chapitre IX, point 8, impose un étiquetage approprié des substances dangereuses et non comestibles et leur entreposage dans des conteneurs sûrs et séparés. Un placard dédié et fermé, à l'écart des postes de préparation, avec des contenants identifiés, répond aux deux exigences."
      },
      {
        question: "Dois-je faire signer les fiches de nettoyage ?",
        reponse: "Aucune disposition n'impose la signature, ni un format de fiche, ni une durée de conservation. Ces éléments relèvent de votre plan de maîtrise sanitaire. La signature ou les initiales ont malgré tout une utilité réelle : elles désignent une personne, donc une responsabilité, et rendent le document plus crédible qu'une simple croix. Le point important reste la sincérité : une fiche remplie en série en fin de semaine fragilise l'ensemble du classeur, y compris ses parties exactes."
      },
      {
        question: "Faut-il faire des prélèvements de surface ?",
        reponse: "Aucun texte ne les impose à un restaurant, et il ne faut pas les présenter comme une obligation. Ils constituent un contrôle complémentaire utile dans des situations précises : valider une procédure nouvelle, objectiver un doute sur un équipement difficile à nettoyer, vérifier l'effet d'un changement de produit. Leur valeur vient de la répétition dans le temps plutôt que d'un prélèvement isolé. Un résultat défavorable conduit à revoir le dosage, le temps de contact, l'action mécanique ou la température, puis à contrôler de nouveau."
      },
      {
        question: "À quelle fréquence dégraisser la hotte ?",
        reponse: "Aucune disposition ne fixe de fréquence pour un restaurant. Le rythme dépend du type de cuisson pratiqué et du volume produit : une cuisine de fritures charge ses filtres beaucoup plus vite qu'une cuisine de cuissons douces. Le repère le plus fiable reste l'état constaté, filtres et conduits examinés régulièrement. Inscrivez au plan un rythme de contrôle et un rythme d'intervention, conservez les justificatifs des interventions réalisées, et ajustez si l'état constaté montre que le rythme retenu ne suffit pas."
      },
      {
        question: "Mon matériel de nettoyage doit-il être rangé d'une façon particulière ?",
        reponse: "Aucun texte ne détaille son rangement, mais il relève de l'exigence générale de prévention des contaminations. Une lavette laissée humide dans un seau devient un support de multiplication microbienne et transporte d'un poste à l'autre ce qu'elle est censée retirer. Le lavage quotidien des textiles, le séchage des balais et raclettes tête en l'air, un code couleur par zone et un rangement à l'écart des denrées suffisent. Décrivez ces règles dans votre plan, elles seront plus solides qu'une habitude orale."
      }
    ],
    liens: [
      "/points-de-controle/plan-de-nettoyage-present-et-applique",
      "/points-de-controle/produits-adaptes-et-correctement-stockes",
      "/points-de-controle/preuves-de-realisation-enregistrements",
      "/themes/nettoyage-desinfection",
      "/points-de-controle/etat-et-entretien-des-locaux",
      "/contact"
    ]
  },
  {
    slug: "lutte-contre-les-nuisibles-en-restauration",
    titre: "La lutte contre les nuisibles en restauration",
    titreSeo: "Lutte contre les nuisibles en restauration : les règles",
    description: "Méthodes adéquates exigées par le règlement 852/2004, contrat de dératisation non obligatoire, indices recherchés en visite : ce qui compte réellement.",
    reponse: "Le règlement (CE) n° 852/2004 du 29 avril 2004 demande, à son annexe II, chapitre IX, point 4, que des méthodes adéquates soient mises au point pour lutter contre les organismes nuisibles, et à son annexe II, chapitre I, point 2 c), que les locaux permettent de prévenir la contamination et en particulier de lutter contre ces organismes. Le texte n'impose ni contrat avec une entreprise spécialisée, ni plan des appâts, ni rapports de passage. Ce sont les moyens usuels de démontrer la mise en œuvre de ces méthodes, à décrire dans votre plan de maîtrise sanitaire. Ce qui est exigible, c'est le résultat et sa démonstration.",
    ouverture: "Peu de sujets inquiètent autant, et peu reposent autant sur des gestes simples de conception et de rangement. Un établissement bien fermé, bien rangé et régulièrement inspecté résout la plus grande partie du problème avant qu'il n'apparaisse.",
    sections: [
      {
        titre: "Ce que le règlement demande exactement",
        paragraphes: [
          "Trois dispositions se combinent. L'annexe II, chapitre IX, point 4, du règlement 852/2004 impose la mise au point de méthodes adéquates de lutte contre les organismes nuisibles. L'annexe II, chapitre I, point 2 c), impose des locaux conçus de manière à permettre la mise en œuvre de bonnes pratiques d'hygiène, notamment en prévenant la contamination et en particulier en luttant contre ces organismes. L'annexe II, chapitre II, point 1 d), ajoute que les fenêtres et autres ouvertures doivent être conçues pour prévenir l'encrassement et, en cas de besoin, équipées d'écrans de protection contre les insectes.",
          "Le mot adéquat est central et il est délibérément ouvert. Le texte ne dit pas comment lutter, il dit que les méthodes doivent être appropriées à votre situation. Un établissement en rez-de-chaussée avec un local déchets partagé et une cour arrière n'a pas les mêmes contraintes qu'une cuisine au premier étage sans accès direct sur l'extérieur.",
          "L'exigence est donc double : concevoir et entretenir des locaux qui ne facilitent pas l'installation des nuisibles, et mettre en place une surveillance qui permette de détecter tôt une présence. Le reste, c'est-à-dire les moyens concrets, relève de votre choix et de votre plan."
        ]
      },
      {
        titre: "Ce que le texte impose, ce qu'il n'impose pas",
        paragraphes: [
          "Il faut le dire sans ambiguïté : le contrat avec une entreprise de dératisation n'est imposé par aucune disposition. Ni le plan des appâts, ni les rapports de passage, ni une fréquence de visite ne figurent dans un texte applicable à un restaurant. Ce sont des moyens, très répandus et très efficaces, de démontrer que vous avez mis au point des méthodes adéquates au sens de l'annexe II, chapitre IX, point 4.",
          "Cette précision a une portée pratique importante. Un exploitant qui n'a pas de contrat n'est pas en infraction par ce seul fait, à condition de pouvoir montrer ce qu'il fait à la place : dispositifs de surveillance en place, parcours d'inspection régulier, constats consignés, actions engagées quand un indice apparaît. À l'inverse, un contrat en cours ne vaut pas conformité si les locaux sont ouverts à tous les vents et si les rapports signalent depuis des mois des recommandations jamais suivies.",
          "Ce qui relève bien d'un texte, c'est l'obligation de résultat sur la protection des denrées. L'annexe II, chapitre IX, point 3, impose de protéger les denrées de toute contamination à toutes les étapes. Si des denrées ont été souillées, elles sont impropres à la consommation humaine et relèvent du retrait prévu à l'article 19 du règlement (CE) n° 178/2002. Sur ce point, il n'y a pas d'appréciation à porter.",
          "L'article 5, paragraphe 2, point g), du règlement 852/2004 impose enfin des documents prouvant l'application effective des mesures. C'est cette disposition, et non un texte spécifique aux nuisibles, qui justifie de conserver les rapports de passage ou vos propres relevés d'inspection."
        ]
      },
      {
        titre: "Trois leviers, dans cet ordre",
        paragraphes: [
          "La lutte efficace repose sur trois leviers hiérarchisés. Le premier est l'exclusion : empêcher physiquement l'entrée. Le deuxième est la privation : supprimer la nourriture, l'eau et les abris. Le troisième seulement est la surveillance et le traitement. Un établissement qui commence par le troisième dépense de l'énergie sans résultat durable, parce que les populations se reconstituent aussi vite qu'on les réduit.",
          "Cet ordre a une conséquence budgétaire agréable : les deux premiers leviers coûtent surtout du temps et de l'attention. Un joint de bas de porte, une grille sur une bouche d'aération, un siphon rempli, une réserve organisée en hauteur, des déchets sortis chaque soir : rien de tout cela ne demande d'investissement lourd.",
          "Le troisième levier reste nécessaire, parce qu'aucun local commercial n'est parfaitement étanche, en particulier dans un immeuble collectif. Mais il fonctionne beaucoup mieux quand les deux premiers ont été traités, et il devient alors ce qu'il doit être : un système d'alerte précoce plutôt qu'un moyen de contenir une population installée."
        ]
      },
      {
        titre: "L'exclusion : par où ils entrent",
        paragraphes: [
          "Les points d'entrée sont toujours les mêmes et se repèrent avec une lampe. Le bas des portes donnant sur l'extérieur, dont le jour laisse passer un rongeur bien plus petit qu'on ne l'imagine. Les passages de gaines et de canalisations non rebouchés. Les bouches d'aération sans grille. Les siphons de sol asséchés dans les zones peu utilisées. Les faux plafonds et les gaines techniques, qui relient parfois plusieurs lots d'un même immeuble.",
          "Les portes ouvertes pendant les livraisons ou pour aérer la cuisine constituent la voie la plus banale, en particulier pour les insectes volants. Un rideau à lanières, une porte moustiquaire ou simplement une consigne de fermeture suffisent, à condition d'être tenus aux heures où la cuisine est ouverte sur l'extérieur.",
          "Les marchandises entrent aussi par les cartons. Les palettes et les cartons d'emballage sont un vecteur classique d'introduction, notamment pour les blattes. Déconditionner à la réception plutôt qu'en réserve, et évacuer immédiatement les emballages, coupe cette voie sans rien changer à l'organisation."
        ]
      },
      {
        titre: "Priver de nourriture, d'eau et d'abri",
        paragraphes: [
          "Les nuisibles s'installent là où ils trouvent à manger et à boire. Les miettes sous les équipements, les résidus dans les rails de porte, les graisses derrière les fourneaux, les sacs de farine ouverts, la nourriture pour le personnel laissée dans un vestiaire : autant de ressources permanentes. Le nettoyage des zones basses et des arrières d'équipements est ici une mesure de lutte autant qu'une mesure de propreté.",
          "L'eau compte autant que la nourriture. Une fuite sous un évier, une condensation permanente, un seau d'eau stagnante, un siphon qui déborde entretiennent une population qui aurait disparu sans cela. Traiter une fuite est souvent la mesure de dératisation la plus efficace d'un établissement.",
          "Les abris sont le troisième point : cartons empilés au sol, matériel hors service stocké dans un recoin, faux plafond accessible, arrière de chambre froide inaccessible. Ranger en hauteur, sur des étagères qui laissent voir le sol, et se débarrasser du matériel inutilisé retire d'un coup la plupart des refuges disponibles."
        ]
      },
      {
        titre: "Le dispositif de surveillance",
        paragraphes: [
          "Un dispositif de surveillance ne sert pas à tuer, il sert à savoir. Des postes disposés selon un plan, numérotés, et vérifiés à intervalles réguliers permettent de détecter une activité avant qu'elle ne devienne visible en cuisine. Le plan des postes, avec leur emplacement sur un schéma des locaux, n'est imposé par aucun texte, mais il rend la démonstration limpide.",
          "La vérification compte plus que l'installation. Un poste jamais ouvert depuis un an n'apporte rien et signale même le contraire de ce qu'il devrait montrer. Noter la date de chaque vérification et ce qui a été observé, même quand il n'y a rien, constitue le meilleur enregistrement possible sur ce thème.",
          "Les pièges lumineux à insectes se placent à l'écart des postes de préparation, pour éviter la projection de fragments d'insectes sur les denrées, et leurs plaques ou tubes se remplacent selon les indications du fabricant. Le bac de collecte se relève, il en dit long sur la pression réelle et sur l'efficacité des mesures d'exclusion."
        ]
      },
      {
        titre: "Le prestataire : ce qu'il apporte, ce qu'il ne remplace pas",
        paragraphes: [
          "Faire appel à une entreprise spécialisée reste la solution la plus simple pour la plupart des établissements. Elle apporte des produits et des dispositifs réglementés, une compétence d'identification des espèces, et un regard extérieur périodique. Elle apporte aussi des rapports de passage, qui documentent l'action et facilitent l'échange en visite.",
          "Elle ne remplace pas deux choses. D'abord la surveillance quotidienne, qui appartient à l'équipe : un rapport mensuel ne détecte pas une entrée survenue le lendemain de la visite. Ensuite la mise en œuvre des recommandations, qui appartient à l'exploitant. Un rapport signalant depuis six mois un bas de porte à reprendre, sans que rien n'ait été fait, se retourne contre vous : il prouve que le problème était connu.",
          "Le choix du prestataire mérite deux questions simples : quels dispositifs seront posés et selon quel plan, et que contient exactement le rapport remis. Un rapport qui décrit les constats, les actions et les recommandations vaut infiniment mieux qu'une attestation de passage sans contenu."
        ]
      },
      {
        titre: "Lire les indices avant qu'ils ne deviennent visibles",
        paragraphes: [
          "Les rongeurs laissent des déjections, des traces de gras le long des murs, des rongements sur les emballages et les gaines, parfois une odeur caractéristique dans un espace confiné. Les blattes se repèrent à leurs déjections en points noirs dans les angles chauds, aux mues, aux enveloppes d'œufs, et à leur présence près des moteurs et des points d'eau. Les mouches et moucherons signalent un gîte de développement proche, souvent un siphon ou un déchet oublié.",
          "Le parcours d'inspection se fait lampe en main, dans les zones que personne ne regarde : derrière et sous les équipements, dans les faux plafonds accessibles, au fond des réserves, dans le local déchets, autour des points d'eau, le long des plinthes. Un quart d'heure hebdomadaire suffit, à condition d'être réellement fait et noté.",
          "L'important est de traiter un indice comme une information, pas comme une faute. Constater tôt et agir vite est exactement ce qu'un agent attend. C'est l'absence de constat, dans un établissement où les traces sont manifestes, qui pose problème, parce qu'elle révèle que la surveillance n'existe pas."
        ]
      },
      {
        titre: "Quand un nuisible est vu : la conduite à tenir",
        paragraphes: [
          "La première décision porte sur les denrées. Toute denrée souillée, ou seulement susceptible de l'avoir été compte tenu de l'endroit et de l'espèce, est impropre à la consommation humaine et relève du retrait prévu à l'article 19 du règlement (CE) n° 178/2002. Cette décision se prend immédiatement et se consigne. C'est la partie la plus coûteuse et la moins discutable.",
          "La deuxième porte sur la source. Identifier l'espèce, chercher le point d'entrée et le gîte, faire intervenir un professionnel si la présence est avérée, et surtout traiter la cause : une fuite, un joint de porte, une gaine ouverte. Un traitement sans correction de la cause donne un répit, pas une solution.",
          "La troisième porte sur la trace écrite. Consigner la date, le constat, les denrées retirées, l'intervention réalisée et la vérification qui a suivi transforme un incident en démonstration de maîtrise. C'est aussi ce qui vous permettra, si le sujet revient, de montrer que la situation a été traitée et suivie."
        ]
      },
      {
        titre: "L'immeuble, le voisinage et ce qui ne dépend pas de vous",
        paragraphes: [
          "Beaucoup d'établissements subissent une pression qui vient d'ailleurs : local déchets commun à l'immeuble, colonnes techniques partagées, chantier voisin, commerce alimentaire mitoyen mal tenu. Cette situation ne vous exonère pas de l'obligation de protéger vos denrées, mais elle change la nature du travail à conduire.",
          "Deux actions sont utiles. La première est de renforcer l'exclusion à la limite de votre lot : c'est le seul périmètre que vous maîtrisez complètement. La deuxième est d'écrire : signaler au syndic ou au bailleur, par un courrier daté, ce que vous constatez et ce que vous demandez. Ce courrier a une valeur double, il déclenche parfois l'action et il documente votre diligence.",
          "En visite, expliquer clairement cette situation, preuves à l'appui, est bien reçu. L'appréciation reste celle de l'agent, mais un exploitant qui montre qu'il a identifié une source extérieure, renforcé sa propre barrière et alerté qui de droit se place dans une position tout à fait différente de celui qui découvre le sujet devant lui."
        ]
      },
      {
        titre: "Faire le tour avec un œil neuf",
        paragraphes: [
          "Le principal obstacle est l'habitude. On ne voit plus le jour sous la porte de service, ni les cartons empilés au fond de la réserve, ni le siphon asséché du couloir. Un regard extérieur retrouve en quelques minutes ce que l'on a cessé de voir en plusieurs années.",
          "C'est ce que fait un audit sur place. L'auditeur parcourt les vingt-sept points de la grille répartis en douze thèmes, en toute discrétion pendant que le service continue, lampe en main, et vérifie aussi bien le dispositif de surveillance que les conditions qui le rendent nécessaire : état des locaux, gestion des déchets, organisation des stocks.",
          "Vous recevez un rapport complet, avec une note, les constats point par point et un plan d'action classé par priorité, où l'on distingue ce qui se règle dans la semaine de ce qui demande une intervention sur le bâti. Chaque écart porte le correctif attendu et la preuve à constituer. La prestation s'arrête là : vous appliquez la liste vous-même, à votre rythme et avec vos propres moyens. Audit hygiène est un label privé indépendant, ni certification officielle ni contrôle des services vétérinaires. Le cabinet intervient partout en Île-de-France, dans les huit départements, et le devis est établi avant intervention, après un échange de quelques minutes."
        ]
      }
    ],
    faq: [
      {
        question: "Le contrat de dératisation est-il obligatoire ?",
        reponse: "Non. Aucune disposition n'impose de contrat avec une entreprise spécialisée à un restaurant. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 4, exige que des méthodes adéquates soient mises au point pour lutter contre les organismes nuisibles. Le contrat, le plan des appâts et les rapports de passage sont les moyens usuels de démontrer cette mise en œuvre, et ils restent la solution la plus simple. Sans contrat, il faut pouvoir montrer autre chose : dispositifs en place, inspections régulières et consignées, actions engagées."
      },
      {
        question: "À quelle fréquence un prestataire doit-il passer ?",
        reponse: "Aucun texte ne fixe de fréquence pour un restaurant. Elle se détermine avec le prestataire au regard de la configuration des locaux, de l'environnement de l'établissement et de la pression constatée. Un local en rez-de-chaussée avec cour arrière et déchets partagés appelle un rythme différent d'une cuisine sans accès direct sur l'extérieur. Ce qui compte davantage que la fréquence, c'est la surveillance quotidienne assurée par l'équipe et la mise en œuvre effective des recommandations formulées."
      },
      {
        question: "Que faire si je vois une souris pendant le service ?",
        reponse: "Traitez d'abord les denrées : ce qui a pu être souillé est impropre à la consommation humaine et relève du retrait prévu à l'article 19 du règlement (CE) n° 178/2002. Isolez la zone concernée, faites intervenir un professionnel, cherchez le point d'entrée et le gîte, et corrigez la cause, souvent un bas de porte, une gaine ouverte ou une fuite. Consignez enfin par écrit le constat, les denrées retirées, l'intervention et la vérification qui a suivi. Cet écrit est votre meilleure démonstration de maîtrise."
      },
      {
        question: "Puis-je poser moi-même des appâts ?",
        reponse: "L'emploi des produits biocides est encadré et certains usages sont réservés à des professionnels détenteurs des certificats correspondants. En pratique, pour un restaurant, la voie la plus sûre est de confier les traitements à une entreprise spécialisée et de concentrer votre action sur l'exclusion, la privation de ressources et la surveillance, qui sont les trois leviers les plus efficaces et qui ne demandent aucun produit. Renseignez-vous auprès du prestataire sur ce que vous pouvez faire vous-même avant d'installer quoi que ce soit."
      },
      {
        question: "Les pièges lumineux à insectes sont-ils obligatoires ?",
        reponse: "Aucun texte ne les impose. Le règlement 852/2004 demande, à son annexe II, chapitre II, point 1 d), que les fenêtres et autres ouvertures soient conçues pour prévenir l'encrassement et, en cas de besoin, équipées d'écrans de protection contre les insectes. Le piège lumineux est un complément utile, pas une obligation. S'il est installé, placez-le à l'écart des postes de préparation pour éviter la projection de fragments sur les denrées, et remplacez plaques ou tubes selon les indications du fabricant."
      },
      {
        question: "Le problème vient de l'immeuble, suis-je quand même responsable ?",
        reponse: "Vous restez tenu de protéger vos denrées de toute contamination, quelle que soit l'origine de la pression. En revanche, la nature du travail change : renforcez l'exclusion à la limite de votre lot, qui est le périmètre que vous maîtrisez, et signalez par écrit au syndic ou au bailleur ce que vous constatez et ce que vous demandez. Ce courrier daté déclenche parfois l'action et documente votre diligence. Présenter cette situation avec ses preuves est bien reçu en visite."
      },
      {
        question: "Faut-il conserver les rapports de passage ?",
        reponse: "Aucune disposition ne fixe de durée pour un restaurant, mais l'article 5, paragraphe 2, point g), du règlement 852/2004 impose des documents prouvant l'application effective des mesures, tenus à jour et conservés pendant une période appropriée. Les rapports de passage sont précisément cette preuve sur le thème des nuisibles, et ce sont des pièces demandées en visite. Conservez-les dans l'ordre chronologique et, surtout, notez en regard ce que vous avez fait des recommandations qu'ils contiennent."
      },
      {
        question: "Comment savoir s'il y a une présence sans avoir rien vu ?",
        reponse: "Les indices précèdent toujours l'observation directe. Cherchez les déjections dans les angles et derrière les équipements, les traces de gras le long des plinthes, les rongements sur les emballages et les gaines, les mues et enveloppes d'œufs près des points chauds et humides, et les moucherons qui signalent un gîte proche, souvent un siphon. Un parcours hebdomadaire lampe en main, dans les zones basses et les recoins, avec une note écrite même quand il n'y a rien, constitue la meilleure surveillance possible."
      }
    ],
    liens: [
      "/points-de-controle/plan-de-lutte-contrat-de-deratisation",
      "/points-de-controle/absence-de-traces-de-nuisibles",
      "/themes/lutte-contre-les-nuisibles",
      "/points-de-controle/local-poubelles-entretenu",
      "/points-de-controle/etat-et-entretien-des-locaux",
      "/contact"
    ]
  },
  {
    slug: "allergenes-en-restauration",
    titre: "Les allergènes en restauration",
    titreSeo: "Allergènes en restauration : obligations et méthode",
    description: "Information du consommateur, décret 2015-447, contamination croisée : ce que le règlement 1169/2011 impose vraiment, et comment le tenir à jour au quotidien.",
    reponse: "Le règlement (UE) n° 1169/2011 du 25 octobre 2011 impose, à son article 9, paragraphe 1, point c), de mentionner tout ingrédient ou auxiliaire technologique figurant à son annexe II qui provoque des allergies ou des intolérances et qui reste présent dans le produit fini. Son article 44, paragraphe 1, point a), maintient cette obligation pour les denrées proposées non préemballées, donc pour les plats servis en restaurant. En droit interne, le décret n° 2015-447 du 17 avril 2015, codifié aux articles R. 412-12 et R. 412-13 du code de la consommation, impose une information portée sur la denrée elle-même ou à proximité, sans incertitude possible sur le plat concerné.",
    ouverture: "L'information sur les allergènes est l'une des rares obligations de ce domaine qui soit à la fois précise dans son contenu et souple dans sa forme. Comprendre cette combinaison évite beaucoup de travail inutile et beaucoup d'approximations dangereuses.",
    sections: [
      {
        titre: "Une liste fermée de quatorze substances",
        paragraphes: [
          "L'annexe II du règlement (UE) n° 1169/2011 énumère les substances et produits concernés : les céréales contenant du gluten, les crustacés, les œufs, les poissons, les arachides, le soja, le lait, les fruits à coque, le céleri, la moutarde, les graines de sésame, l'anhydride sulfureux et les sulfites au-delà d'un certain seuil, le lupin et les mollusques. Chaque entrée couvre aussi les produits dérivés de ces substances, avec quelques exceptions listées dans l'annexe elle-même.",
          "Cette liste est fermée. Elle ne couvre pas toutes les allergies alimentaires existantes, et un client peut parfaitement être allergique à un aliment qui n'y figure pas. L'obligation d'information porte sur les quatorze entrées de l'annexe, mais la conversation avec un client concerné ne s'arrête pas là, et c'est une distinction utile à faire comprendre à l'équipe.",
          "Le champ de l'obligation est également précis sur un autre point : elle vise l'ingrédient ou l'auxiliaire technologique utilisé dans la fabrication ou la préparation et encore présent dans le produit fini, même sous une forme modifiée. Un ingrédient qui disparaît réellement du produit fini n'a pas à être mentionné, ce qui est rare en cuisine mais existe pour certains auxiliaires."
        ]
      },
      {
        titre: "Ce que le texte impose, ce qu'il n'impose pas",
        paragraphes: [
          "Ce qui est imposé, c'est le fond : l'information doit exister, être exacte, et être accessible au consommateur avant qu'il ne commande. Le décret n° 2015-447 du 17 avril 2015, codifié aux articles R. 412-12 et R. 412-13 du code de la consommation, précise qu'elle est portée sur la denrée elle-même ou à proximité de celle-ci, de façon qu'il n'existe aucune incertitude quant à la denrée à laquelle elle se rapporte.",
          "Ce qui n'est pas imposé, c'est un support unique. Le texte ne prescrit ni une mention sur la carte, ni un classeur, ni une ardoise, ni un affichage particulier. Vous pouvez informer sur la carte, sur un support disponible sur place, ou par tout autre moyen, à condition que l'accès à l'information soit réel et que le lien avec le plat concerné soit sans ambiguïté.",
          "Ce qui n'est pas imposé non plus, c'est le matériel dédié ou un ordonnancement particulier de la production pour éviter la contamination croisée. Ce sont des moyens à définir et à justifier dans votre plan de maîtrise sanitaire. Une exigence existe néanmoins sur ce terrain depuis 2021, et la section consacrée à la contamination croisée la détaille.",
          "Enfin, aucune disposition n'encadre les mentions de précaution du type peut contenir des traces de. Elles ne sont ni obligatoires, ni interdites, et elles ne remplacent jamais l'information sur les ingrédients réellement utilisés. Une carte couverte de mentions de précaution génériques rend l'information inutilisable pour la personne qui en a besoin, ce qui est le contraire de l'objectif."
        ]
      },
      {
        titre: "Les modalités d'information qui fonctionnent",
        paragraphes: [
          "Trois formules couvrent la quasi-totalité des situations. La première est la mention directe sur la carte, plat par plat, avec les allergènes présents. Elle est la plus lisible pour le client et la plus exigeante à tenir à jour. La deuxième est un support disponible sur place, classeur ou fiche, annoncé clairement sur la carte par une mention indiquant où le demander. La troisième combine les deux, avec une mention sur la carte pour les allergènes majeurs et un support détaillé disponible.",
          "Dans tous les cas, le lien entre l'information et le plat doit être immédiat. Un classeur qui reprend les plats dans l'ordre de la carte, avec les mêmes intitulés, remplit cette condition. Un classeur classé par ingrédients, ou qui utilise des noms de recettes différents de ceux de la carte, ne la remplit pas, parce qu'il crée précisément l'incertitude que le décret veut éviter.",
          "L'accessibilité compte autant que l'exactitude. Un support rangé dans le bureau, ou qu'un serveur ne sait pas trouver, n'informe personne. Le test est simple : demandez à un membre de l'équipe qui n'a pas participé à sa rédaction de sortir l'information sur un plat en moins d'une minute."
        ]
      },
      {
        titre: "Construire le tableau des allergènes de sa carte",
        paragraphes: [
          "La méthode la plus fiable part des recettes, pas des plats. Pour chaque plat, listez tous les composants, y compris les préparations intermédiaires : le fond, la sauce, la panure, la marinade, le beurre de cuisson, la garniture, le pain servi avec. C'est dans ces composants intermédiaires que se cachent la plupart des allergènes oubliés.",
          "Prenez ensuite les étiquettes des produits achetés, une par une, et relevez les allergènes déclarés. Ce travail est fastidieux la première fois et rapide ensuite, parce que la plupart des matières premières reviennent dans plusieurs recettes. Un tableau à double entrée, plats en lignes et quatorze substances en colonnes, se remplit ainsi en une session.",
          "Conservez la trace de vos sources. Une photographie des étiquettes ou des fiches techniques des produits utilisés permet de justifier chaque case du tableau, et rend la mise à jour possible quand un produit change. Sans cette trace, un changement de fournisseur oblige à tout recommencer."
        ]
      },
      {
        titre: "Les pièges de recette les plus fréquents",
        paragraphes: [
          "Certains allergènes se cachent dans des endroits inattendus et reviennent constamment dans les constats. Le gluten dans les sauces liées, les bouillons, la sauce soja et certaines charcuteries. Le lait dans les purées, les panures, les préparations dites végétales et les beurres de cuisson. L'œuf dans les mayonnaises, les liaisons et les dorures. Les fruits à coque dans les huiles, les pestos et les pâtisseries.",
          "Le soja, le céleri et la moutarde apparaissent très souvent dans les bases industrielles, fonds, fumets et mélanges d'épices, sans que la présentation du plat le laisse deviner. Les sulfites se retrouvent dans les vins utilisés en cuisine, certains fruits secs, certaines pommes de terre préparées. Le sésame est présent dans de nombreux pains et snacks.",
          "La friteuse partagée mérite une mention particulière. Un bain de friture utilisé pour des produits panés transmet le gluten et parfois le lait à tout ce qui y passe. C'est l'un des cas de contamination les plus fréquents et les plus faciles à expliquer à un client, à condition de l'avoir identifié dans son tableau."
        ]
      },
      {
        titre: "La contamination croisée en cuisine",
        paragraphes: [
          "Une disposition précise existe depuis 2021. Le règlement (CE) n° 852/2004, annexe II, chapitre IX, point 9, inséré par le règlement (UE) 2021/382 de la Commission du 3 mars 2021, prévoit que les équipements, réceptacles et conteneurs utilisés pour la transformation, la manutention, le transport ou l'entreposage d'une substance ou d'un produit allergène visé à l'annexe II du règlement 1169/2011 ne peuvent pas être utilisés pour des denrées ne contenant pas cette substance, à moins d'avoir été nettoyés et contrôlés au moins pour vérifier l'absence de débris visibles de celle-ci.",
          "Cette rédaction est importante parce qu'elle fixe une exigence concrète : nettoyage suivi d'un contrôle visuel, avant réutilisation. Elle ne va pas jusqu'à imposer du matériel dédié ni un ordonnancement particulier de la production. Ces moyens restent à votre main, et c'est votre plan de maîtrise sanitaire qui doit les définir et les justifier, en cohérence avec l'annexe II, chapitre V, point 1 a), sur le nettoyage du matériel.",
          "En pratique, trois gestes couvrent l'essentiel : préparer les plats destinés à un client allergique avec du matériel propre et contrôlé, protéger les préparations sensibles pendant le stockage, et éviter les manipulations qui font voyager la farine ou les fruits à coque en poudre dans toute la cuisine. La farine en suspension est un vecteur largement sous-estimé."
        ]
      },
      {
        titre: "Le dialogue avec le client",
        paragraphes: [
          "L'information écrite ne remplace pas la conversation quand un client annonce une allergie. La bonne pratique tient en trois temps : écouter la substance précise, vérifier dans le tableau et non de mémoire, et répondre honnêtement, y compris quand la réponse est que le plat ne peut pas être garanti.",
          "Dire non est parfois la seule réponse juste. Un établissement qui explique qu'il ne peut pas exclure la présence d'un allergène compte tenu de son organisation protège le client bien mieux qu'un établissement qui promet ce qu'il ne maîtrise pas. Cette franchise est très bien reçue par les personnes concernées, qui la préfèrent de loin à une approximation rassurante.",
          "L'équipe de salle est en première ligne et doit savoir à qui s'adresser en cuisine. Une règle simple, comme le passage systématique de l'information au responsable de la production avant confirmation au client, évite les réponses improvisées un soir de coup de feu. Le sujet vaut d'être repris régulièrement en brief, sans dramatiser."
        ]
      },
      {
        titre: "Tenir l'information à jour",
        paragraphes: [
          "Le point faible de tous les dispositifs est le changement. Un changement de fournisseur sur un produit banal, une rupture qui conduit à prendre une autre référence, une recette modifiée en cours de saison, un plat du jour ajouté le matin : chacun de ces événements peut rendre le tableau inexact sans que personne ne le remarque.",
          "La parade est procédurale et légère : toute nouvelle référence entrant en cuisine passe par une lecture d'étiquette avant utilisation, et tout plat du jour reçoit sa ligne d'allergènes avant d'être annoncé. Ces deux règles, écrites dans le plan, valent mieux qu'une révision annuelle du tableau.",
          "Le plat du jour est d'ailleurs le cas le plus souvent pris en défaut. Une ardoise sans information sur les allergènes, à côté d'une carte parfaitement documentée, crée exactement l'incertitude que le décret n° 2015-447 veut éviter. Prévoir la place de cette information sur le support du jour règle le sujet une fois pour toutes."
        ]
      },
      {
        titre: "Ce qu'un agent regarde",
        paragraphes: [
          "Il regarde d'abord si l'information existe et si elle est accessible au client avant la commande. Il vérifie ensuite le lien avec les plats : mêmes intitulés, aucune ambiguïté. Il teste enfin l'exactitude sur un ou deux plats, en demandant les composants et en confrontant votre réponse au support. Le plat du jour est presque toujours dans le test.",
          "Il observe aussi la cuisine sous cet angle : friteuse partagée, planches et ustensiles, stockage des produits allergènes en vrac, farine à l'air libre à côté d'une préparation sans gluten. Le nouveau point 9 du chapitre IX de l'annexe II du règlement 852/2004 lui donne un fondement précis pour le faire.",
          "La qualification d'un écart et ses suites relèvent de l'appréciation de l'agent et du service instructeur. Ce que vous maîtrisez, c'est l'existence du support, son exactitude, son accessibilité, et la capacité de l'équipe à s'en servir sans hésiter."
        ]
      },
      {
        titre: "Mettre le sujet au clair une bonne fois",
        paragraphes: [
          "Le travail utile se fait en une session : reprendre la carte plat par plat, ouvrir les étiquettes, remplir le tableau, choisir un support et vérifier que l'équipe sait le trouver. Ajouter ensuite les deux règles de mise à jour, sur les nouvelles références et sur les plats du jour. Le sujet cesse alors d'être une inquiétude de fond pour devenir une routine de quelques minutes.",
          "Un audit sur place permet de faire ce contrôle dans les conditions réelles, en toute discrétion pendant le service. L'auditeur parcourt les vingt-sept points de la grille répartis en douze thèmes, dont l'information du consommateur et la prévention de la contamination croisée, et fait le test qu'un agent ferait : il choisit un plat et remonte ses composants avec vous.",
          "Vous recevez un rapport complet, avec une note, les constats point par point et un plan d'action classé par priorité, qui indique pour chaque écart le correctif attendu et la preuve à constituer. La prestation s'arrête là : vous appliquez la liste vous-même, à votre rythme et avec vos propres moyens, et la conformité vient quand elle est traitée. Audit hygiène est un label privé indépendant, ni certification officielle ni agrément d'État. Le cabinet intervient partout en Île-de-France, dans les huit départements, et le devis est établi avant intervention, après un échange de quelques minutes."
        ]
      }
    ],
    faq: [
      {
        question: "Dois-je indiquer les allergènes directement sur la carte ?",
        reponse: "Ce n'est pas imposé. Le décret n° 2015-447 du 17 avril 2015, codifié aux articles R. 412-12 et R. 412-13 du code de la consommation, exige que l'information soit portée sur la denrée elle-même ou à proximité, sans incertitude quant à la denrée à laquelle elle se rapporte. Un support disponible sur place, annoncé clairement sur la carte et reprenant les mêmes intitulés de plats, répond à cette exigence. Ce qui compte est l'accès réel du client à l'information avant sa commande, et l'absence d'ambiguïté sur le plat visé."
      },
      {
        question: "Quels sont les allergènes à déclarer ?",
        reponse: "Ceux de l'annexe II du règlement (UE) n° 1169/2011 : céréales contenant du gluten, crustacés, œufs, poissons, arachides, soja, lait, fruits à coque, céleri, moutarde, graines de sésame, anhydride sulfureux et sulfites au-delà du seuil fixé, lupin, mollusques, ainsi que les produits dérivés de ces substances avec les exceptions que l'annexe précise. Cette liste est fermée pour l'obligation d'information, mais elle ne couvre pas toutes les allergies existantes, ce qui rend la conversation avec le client toujours utile."
      },
      {
        question: "La mention peut contenir des traces est-elle obligatoire ?",
        reponse: "Aucune disposition ne l'impose ni ne l'interdit pour les denrées non préemballées. Elle ne remplace jamais l'information sur les ingrédients réellement utilisés, qui est la seule obligation. Employée systématiquement sur toute la carte, elle rend l'information inutilisable pour la personne qui en a besoin. Employée là où un risque réel de contamination existe, par exemple une friteuse partagée avec des produits panés, elle est en revanche honnête et utile, à condition d'être expliquée si le client interroge."
      },
      {
        question: "Faut-il du matériel dédié pour les plats sans allergène ?",
        reponse: "Le matériel dédié n'est pas imposé en tant que tel. Ce qui est exigé depuis 2021, par l'annexe II, chapitre IX, point 9, du règlement 852/2004 inséré par le règlement (UE) 2021/382, c'est que les équipements ayant servi à une substance allergène ne soient pas utilisés pour des denrées qui n'en contiennent pas, sauf à avoir été nettoyés et contrôlés au moins pour vérifier l'absence de débris visibles. Le matériel dédié est un moyen commode d'y parvenir, à définir dans votre plan de maîtrise sanitaire."
      },
      {
        question: "Comment gérer le plat du jour ?",
        reponse: "C'est le cas le plus souvent pris en défaut. Une ardoise sans information, à côté d'une carte bien documentée, crée exactement l'incertitude que le décret n° 2015-447 veut éviter. La solution est de prévoir la place de l'information sur le support du jour, et d'adopter la règle suivante : aucun plat n'est annoncé avant que sa ligne d'allergènes soit renseignée. Cela prend quelques minutes le matin et supprime durablement le point faible du dispositif."
      },
      {
        question: "Que répondre à un client dont l'allergie ne figure pas dans la liste ?",
        reponse: "L'obligation d'information porte sur les quatorze entrées de l'annexe II du règlement 1169/2011, mais votre responsabilité de restaurateur ne s'arrête pas à cette liste. Écoutez la substance précise, vérifiez la composition réelle du plat plutôt que de répondre de mémoire, et répondez honnêtement. Si vous ne pouvez pas exclure la présence de la substance compte tenu de votre organisation, dites-le. Cette franchise protège mieux le client qu'une réponse rassurante mais approximative."
      },
      {
        question: "Mon fournisseur a changé une recette, que dois-je faire ?",
        reponse: "Relisez l'étiquette avant la première utilisation et corrigez votre tableau si nécessaire. C'est le principal point de rupture des dispositifs allergènes : une référence remplacée pendant une rupture de stock, ou une recette modifiée par le fabricant, rend le tableau inexact sans que personne ne le remarque. Inscrivez dans votre plan la règle qui l'évite : toute nouvelle référence entrant en cuisine passe par une lecture d'étiquette. Conservez les fiches ou photographies des étiquettes pour justifier chaque case."
      },
      {
        question: "Faut-il tracer les demandes des clients allergiques ?",
        reponse: "Aucun texte ne l'impose. Certains établissements notent la demande sur le bon de commande pour que l'information circule jusqu'à la cuisine, ce qui est avant tout une mesure d'organisation interne. L'essentiel reste la transmission fiable de l'information entre la salle et la production, avant confirmation au client. Une règle simple, comme le passage systématique par le responsable de production, évite les réponses improvisées et vaut mieux qu'un formulaire supplémentaire que personne ne remplira en plein service."
      }
    ],
    liens: [
      "/points-de-controle/information-allergenes-consommateur",
      "/points-de-controle/prevention-contamination-croisee-allergenes",
      "/themes/allergenes",
      "/points-de-controle/separation-cru-cuit-respectee",
      "/methode",
      "/contact"
    ]
  },
  {
    slug: "marche-en-avant-et-organisation-des-locaux",
    titre: "La marche en avant et l'organisation des locaux",
    titreSeo: "Marche en avant : ce que le texte impose vraiment",
    description: "La marche en avant n'est pas une notion juridique : elle traduit l'annexe II chapitre II du règlement 852/2004. Comment l'appliquer dans un local exigu.",
    reponse: "La marche en avant est la formulation professionnelle française d'une exigence de conception posée par le règlement (CE) n° 852/2004 du 29 avril 2004, annexe II, chapitre II, point 1 : la conception et l'agencement des locaux où les denrées sont préparées doivent permettre la mise en œuvre de bonnes pratiques d'hygiène et notamment prévenir la contamination entre et durant les opérations. L'expression elle-même ne figure dans aucun texte. Ce qui est exigible, c'est l'absence de contamination croisée, pas un plan de circulation en ligne droite. Dans un local exigu, la séparation dans le temps remplace légitimement la séparation dans l'espace.",
    ouverture: "Beaucoup de restaurateurs se croient hors des clous parce que leur cuisine ne permet pas un circuit linéaire, alors que le texte ne demande rien de tel. Le sujet mérite d'être remis à sa place, parce qu'il conditionne des décisions d'aménagement parfois coûteuses.",
    sections: [
      {
        titre: "D'où vient l'expression et ce qu'elle recouvre",
        paragraphes: [
          "La marche en avant désigne l'idée qu'une denrée progresse du sale vers le propre sans revenir en arrière : réception, stockage, déconditionnement, préparation, cuisson, dressage, service. Le principe est excellent et il structure la conception de la plupart des cuisines professionnelles depuis longtemps. Il est enseigné, il est parlé, il est demandé par les architectes, et il est devenu dans le métier une sorte d'évidence réglementaire.",
          "Il n'est pourtant pas une notion juridique. Aucun texte européen ou national applicable à un restaurant ne prescrit une marche en avant. Ce que le règlement 852/2004 exige, à son annexe II, chapitre II, point 1, c'est que la conception et l'agencement des locaux permettent la mise en œuvre de bonnes pratiques d'hygiène et notamment préviennent la contamination entre et durant les opérations. La marche en avant est un moyen de satisfaire cette exigence, elle n'en est pas la formulation officielle.",
          "Cette nuance libère beaucoup d'établissements. Une cuisine en L, une cuisine en couloir, une cuisine où la plonge est au fond ne sont pas non conformes par principe. Elles imposent seulement de démontrer autrement que le croisement des flux sales et propres est maîtrisé, et c'est parfaitement possible."
        ]
      },
      {
        titre: "Ce que le texte impose, ce qu'il n'impose pas",
        paragraphes: [
          "Le règlement 852/2004 pose plusieurs exigences précises sur les locaux. L'annexe II, chapitre I, point 2, demande des locaux pouvant être convenablement entretenus, nettoyés et désinfectés, et permettant de prévenir l'encrassement ainsi que la formation de condensation et de moisissure indésirable. L'annexe II, chapitre II, point 1, points a) à f), détaille les revêtements de sol, les surfaces murales, les plafonds, les fenêtres, les portes et les surfaces : bien entretenus, faciles à nettoyer et au besoin à désinfecter, en matériaux étanches, non absorbants, lavables et non toxiques, sauf si l'exploitant prouve à l'autorité compétente que d'autres matériaux conviennent.",
          "Sur les flux, l'annexe II, chapitre IX, point 2, impose que les matières premières entreposées soient conservées dans des conditions évitant toute détérioration néfaste et toute contamination. Le point 3 impose la protection des denrées contre toute contamination à toutes les étapes. Le point 5 ajoute, pour les produits transformés, des locaux permettant l'entreposage séparé des matières premières et des produits transformés.",
          "Ce qui n'est imposé nulle part : un circuit en ligne droite, un nombre minimal de pièces, une zone dédiée par opération, un sens de circulation, une surface minimale de cuisine. Un exploitant qui croit devoir tout cela s'impose des contraintes que le texte ne connaît pas, et se prive parfois de solutions plus simples et plus efficaces.",
          "Une dernière précision compte pour les petits locaux : le chapitre II du règlement fixe des exigences pour les locaux où les denrées sont préparées, traitées ou transformées, et le chapitre III prévoit des dispositions spécifiques pour certaines structures. La souplesse générale de l'article 5, paragraphe 2, du règlement, qui module les obligations documentaires selon la nature et la taille de l'entreprise, va dans le même sens."
        ]
      },
      {
        titre: "Suivre une denrée dans votre établissement",
        paragraphes: [
          "L'exercice le plus utile ne se fait pas sur un plan, il se fait à pied. Prenez une caisse de volaille crue à la porte de service et suivez-la jusqu'à l'assiette. Notez chaque surface qu'elle touche, chaque ustensile, chaque zone qu'elle traverse, chaque endroit où elle attend. Recommencez avec une salade lavée, puis avec une assiette sale qui revient de la salle.",
          "Les trois parcours se superposent quelque part, c'est certain. La question n'est pas d'éviter toute superposition, ce qui est impossible dans un local commercial, mais d'identifier les points de croisement et de dire ce qui les rend sans risque : une séparation dans le temps, un nettoyage intercalaire, un contenant fermé, un plan de travail dédié à ce moment-là.",
          "Cet exercice produit deux choses. Il alimente directement votre analyse des dangers, parce qu'il désigne les étapes où une contamination peut survenir. Et il vous donne, en visite, la capacité d'expliquer votre organisation en marchant, ce qui est infiniment plus convaincant qu'un schéma."
        ]
      },
      {
        titre: "Les croisements qui comptent vraiment",
        paragraphes: [
          "Tous les croisements ne se valent pas. Les plus sensibles sont le contact entre produits crus d'origine animale et produits prêts à consommer, le retour de vaisselle sale à proximité d'un dressage, le passage des déchets au-dessus ou à côté d'un plan de travail en service, et le stockage de denrées non protégées sous un point susceptible de goutter.",
          "Le croisement le plus fréquemment constaté reste le plus banal : une planche ou un couteau passé du cru au prêt à consommer sans nettoyage intercalaire. Aucune organisation des locaux ne corrige cela, seule la règle de poste le fait. C'est une bonne illustration du fait que la marche en avant est autant une affaire de gestes que d'architecture.",
          "À l'inverse, certains croisements inquiètent à tort. Un couloir emprunté par les livraisons et par le personnel, une porte unique de cuisine, une réserve traversée pour accéder au vestiaire ne posent pas de problème en soi si les denrées sont protégées et si le nettoyage suit. Concentrer l'effort sur les croisements à risque réel évite de dépenser pour des cloisons inutiles."
        ]
      },
      {
        titre: "La séparation dans le temps",
        paragraphes: [
          "Quand l'espace manque, le temps prend le relais. Travailler les produits crus sur un créneau, nettoyer et désinfecter le plan de travail, puis travailler les produits prêts à consommer sur le créneau suivant satisfait pleinement l'exigence de prévention de la contamination entre les opérations. C'est une réponse ancienne, connue et parfaitement recevable.",
          "Elle demande deux choses. D'abord une planification écrite, même sommaire : quel poste, quel produit, à quelle heure, avec quel nettoyage intercalaire. Ensuite une discipline de nettoyage entre les séquences, car c'est elle qui fait toute la valeur du dispositif. Une séparation dans le temps sans nettoyage intercalaire n'est pas une séparation.",
          "L'écrire dans votre plan de maîtrise sanitaire change tout en visite. Un exploitant qui explique que sa cuisine ne permet pas la séparation dans l'espace et qui montre son ordonnancement, ses créneaux et ses enregistrements de nettoyage intercalaire tient une position solide. Un exploitant qui répond que tout le monde fait attention n'en tient aucune."
        ]
      },
      {
        titre: "Le local exigu : ce qui marche vraiment",
        paragraphes: [
          "Dans une petite cuisine, quelques décisions produisent plus d'effet que n'importe quel plan. Dédier un plan de travail au cru et un autre au prêt à consommer, même s'ils sont voisins, en les identifiant clairement. Utiliser un code couleur pour les planches et les ustensiles, qui rend la règle visible sans rien expliquer. Réserver un bac ou une étagère de chambre froide aux produits crus, en position basse, pour qu'aucun jus ne puisse couler sur autre chose.",
          "Le rangement en hauteur libère du sol et rend le nettoyage possible. Des étagères qui laissent voir le sol, un dégagement suffisant sous les équipements ou au contraire un scellement complet, l'élimination du matériel inutilisé : autant de mesures qui améliorent simultanément la propreté, la lutte contre les nuisibles et la circulation.",
          "Enfin, la protection des denrées remplace souvent la séparation. Un film, un couvercle, un bac fermé rendent sans objet la plupart des croisements de circulation. C'est la mesure la moins coûteuse et la plus efficace, et c'est exactement ce que demande l'annexe II, chapitre IX, point 3, du règlement 852/2004."
        ]
      },
      {
        titre: "La plonge, point de croisement majeur",
        paragraphes: [
          "La plonge concentre le sale : vaisselle revenant de la salle, batterie de cuisine, éclaboussures, humidité, déchets. Sa position détermine une grande partie du confort sanitaire d'une cuisine. Lorsqu'elle ne peut pas être isolée, ce qui est le cas le plus fréquent, quelques mesures compensent efficacement.",
          "Séparer nettement le poste de plonge du poste de dressage, par une distance, un retour de plan ou un panneau, limite les projections. Éviter de faire transiter la vaisselle sale au-dessus de denrées non protégées relève de la règle de circulation plus que de l'aménagement. Prévoir un rangement du propre à l'écart de la zone humide évite la recontamination immédiate.",
          "Le séchage mérite une mention. Le séchage à l'air, sur une grille propre, est préférable à l'essuyage au torchon, qui redistribue ce qu'il ramasse. Cette règle simple, écrite dans le plan de nettoyage, résout un point souvent relevé et ne coûte rien."
        ]
      },
      {
        titre: "Les surfaces, le matériel et leur état",
        paragraphes: [
          "L'organisation ne vaut que si les surfaces sont nettoyables. L'annexe II, chapitre II, point 1, du règlement 852/2004 demande des sols, murs, plafonds et surfaces bien entretenus, faciles à nettoyer et au besoin à désinfecter, en matériaux étanches, non absorbants, lavables et non toxiques. Une planche entaillée, un plan de travail piqué, un joint de carrelage creusé annulent le bénéfice de toute l'organisation.",
          "L'annexe II, chapitre V, point 1, ajoute que les articles, installations et équipements en contact avec les denrées doivent être construits, réalisés et entretenus de manière à réduire au maximum les risques de contamination, et installés de manière à permettre un nettoyage convenable. L'aptitude au contact alimentaire relève du règlement (CE) n° 1935/2004 du 27 octobre 2004, dont l'article 3, paragraphe 1, interdit la cession de constituants dangereux ou modifiant la composition des denrées.",
          "Le remplacement d'une planche usée ou d'un bac fendu coûte peu et se voit immédiatement. Le remplacement d'un plan de travail ou la reprise d'un carrelage relèvent d'un autre budget et méritent d'être planifiés. Distinguer les deux, dans un plan d'action classé par priorité, évite de tout remettre à plus tard parce qu'un seul poste était coûteux."
        ]
      },
      {
        titre: "Stockage, circulations du personnel et déchets",
        paragraphes: [
          "Le stockage obéit à trois règles simples et efficaces : rien à même le sol, les produits crus en position basse et les produits prêts à consommer au-dessus, les denrées protégées par un contenant ou un film. Aucune disposition n'énonce l'interdiction de stocker au sol en ces termes, c'est une bonne pratique qui met en œuvre les exigences de conservation et de protection des points 2 et 3 du chapitre IX de l'annexe II.",
          "La rotation des stocks, selon le principe du premier entré premier sorti, relève de la même logique : ce n'est pas une règle de droit, c'est le moyen le plus simple d'éviter les dépassements de date. Une étagère organisée où le plus ancien se trouve devant fait le travail sans qu'on y pense.",
          "Les circulations du personnel et des déchets complètent le tableau. Un vestiaire accessible sans traverser une zone de production, une sortie des déchets à un moment où la production est arrêtée, un contenant fermé pour le transport : ces mesures d'organisation ne demandent aucun travaux et suppriment des croisements réels."
        ]
      },
      {
        titre: "Ce qu'un agent regarde",
        paragraphes: [
          "Il suit les flux, exactement comme vous l'auriez fait à pied. Il regarde où sont les produits crus et où sont les produits prêts à consommer, dans les enceintes comme sur les plans de travail. Il regarde les planches et les couteaux, leur état et leur affectation. Il regarde le trajet de la vaisselle sale et celui des déchets.",
          "Il pose ensuite la question qui compte : comment évitez-vous que le cru touche le prêt à consommer, ici, dans cette cuisine ? Une réponse concrète, appuyée sur un ordonnancement, un code couleur ou une séparation d'espace, satisfait. Une réponse théorique sur la marche en avant, dans une cuisine où les flux se croisent visiblement, ne satisfait pas.",
          "L'appréciation du caractère suffisant de l'agencement relève de l'agent et du service instructeur. C'est pourquoi votre plan gagne à expliquer vos choix : dire pourquoi la séparation se fait dans le temps, et le prouver par des enregistrements, vaut beaucoup mieux que d'invoquer un principe."
        ]
      },
      {
        titre: "Regarder sa cuisine avec les yeux d'un autre",
        paragraphes: [
          "L'organisation d'un local se juge très mal de l'intérieur. Les gestes se sont installés autour des contraintes, on ne voit plus le croisement que l'on fait vingt fois par service. C'est la limite de l'auto-évaluation sur ce thème précis, plus encore que sur les autres.",
          "Un audit sur place apporte exactement ce regard. L'auditeur suit les flux pendant le service, en toute discrétion, et parcourt les vingt-sept points de la grille répartis en douze thèmes, dont la séparation des produits crus et cuits, l'organisation des stocks et l'état des locaux et des équipements. Il distingue ce qui relève d'une règle de poste, corrigeable immédiatement, de ce qui relève du bâti.",
          "Vous recevez un rapport complet, avec une note, les constats point par point et un plan d'action classé par priorité, qui indique pour chaque écart le correctif attendu et la preuve à constituer. La prestation s'arrête là : vous appliquez la liste vous-même, à votre rythme et avec vos propres moyens, et la conformité vient quand elle est traitée. Audit hygiène est un label privé indépendant, ni certification officielle ni contrôle des services vétérinaires. Le cabinet intervient partout en Île-de-France, dans les huit départements, et le devis est établi avant intervention, après un échange de quelques minutes."
        ]
      }
    ],
    faq: [
      {
        question: "La marche en avant est-elle obligatoire ?",
        reponse: "L'expression ne figure dans aucun texte applicable à un restaurant. Elle traduit une exigence bien réelle du règlement (CE) n° 852/2004, annexe II, chapitre II, point 1 : la conception et l'agencement des locaux doivent permettre la mise en œuvre de bonnes pratiques d'hygiène et notamment prévenir la contamination entre et durant les opérations. C'est ce résultat qui est exigible, pas un circuit en ligne droite. La marche en avant reste un excellent moyen d'y parvenir quand la configuration le permet."
      },
      {
        question: "Ma cuisine est trop petite pour séparer les zones, que faire ?",
        reponse: "Séparez dans le temps ce que vous ne pouvez pas séparer dans l'espace. Travaillez les produits crus sur un créneau, nettoyez et désinfectez le plan de travail, puis passez aux produits prêts à consommer. Ce dispositif est parfaitement recevable à deux conditions : l'ordonnancement doit être écrit dans votre plan de maîtrise sanitaire, et le nettoyage intercalaire doit être réel et tracé. C'est ce nettoyage qui fait toute la valeur de la méthode, pas le découpage horaire lui-même."
      },
      {
        question: "Faut-il des locaux séparés pour la plonge ?",
        reponse: "Aucune disposition n'impose un local dédié à un restaurant. Ce qui est exigé, c'est la prévention de la contamination et la possibilité de nettoyer correctement. Quand la plonge ne peut pas être isolée, séparez-la nettement du poste de dressage par une distance ou un retour de plan pour limiter les projections, évitez de faire transiter la vaisselle sale au-dessus de denrées non protégées, rangez le propre à l'écart de la zone humide et privilégiez le séchage à l'air plutôt qu'au torchon."
      },
      {
        question: "Peut-on stocker des denrées à même le sol ?",
        reponse: "Aucune disposition ne l'interdit en ces termes. C'est une bonne pratique d'hygiène qui met en œuvre deux exigences réelles du règlement 852/2004, annexe II, chapitre IX : conserver les matières premières dans des conditions évitant toute détérioration néfaste et toute contamination, et protéger les denrées à toutes les étapes. Un carton posé au sol empêche le nettoyage, absorbe l'humidité et offre un abri aux nuisibles. Des étagères qui laissent voir le sol règlent les trois problèmes en même temps."
      },
      {
        question: "Le code couleur des planches est-il imposé ?",
        reponse: "Non, aucun texte ne l'impose. C'est une bonne pratique très efficace, parce qu'elle rend visible une règle sans avoir à l'expliquer, ce qui est précieux avec des extras ou de nouveaux arrivants. Ce qui est exigé, c'est que le matériel en contact avec les denrées soit nettoyé et le cas échéant désinfecté à une fréquence suffisante pour éviter tout risque de contamination, selon l'annexe II, chapitre V, point 1 a). Le code couleur est un moyen d'y parvenir, à décrire dans votre plan."
      },
      {
        question: "Faut-il un plan des locaux dans mon plan de maîtrise sanitaire ?",
        reponse: "Aucune disposition ne l'impose à un restaurant. Un schéma sommaire reste très utile : il situe les zones, les postes, les enceintes froides, les points d'eau et les dispositifs de surveillance des nuisibles, et il rend votre organisation compréhensible en quelques secondes pour quelqu'un qui découvre les lieux. Il facilite aussi votre propre analyse des flux. Un croquis à main levée, à jour, vaut mieux qu'un plan d'architecte qui date de l'ouverture et ne correspond plus au matériel installé."
      },
      {
        question: "Les livraisons qui passent par la salle posent-elles problème ?",
        reponse: "Elles ne sont pas interdites. Ce qui compte, c'est que les denrées soient protégées pendant le trajet, que le passage ne se fasse pas au-dessus de préparations en cours ou de tables dressées, et que la zone traversée soit nettoyée ensuite si nécessaire. Beaucoup d'établissements urbains n'ont pas d'autre accès et gèrent parfaitement la situation. Choisissez un horaire hors service, un contenant fermé pour les produits sensibles, et écrivez la règle dans votre plan pour qu'elle survive aux changements d'équipe."
      },
      {
        question: "Dois-je refaire ma cuisine pour être conforme ?",
        reponse: "Dans la très grande majorité des cas, non. Les écarts constatés sur ce thème relèvent bien plus souvent des règles de poste et du rangement que du bâti : une planche passée du cru au prêt à consommer sans nettoyage, des produits crus stockés au-dessus de produits prêts, du matériel inutilisé qui encombre. Ce qui relève réellement du bâti, comme un revêtement dégradé ou une surface non nettoyable, se planifie dans un plan d'action classé par priorité plutôt que de tout bloquer."
      }
    ],
    liens: [
      "/points-de-controle/separation-cru-cuit-respectee",
      "/points-de-controle/organisation-des-stocks-rotation-sol",
      "/themes/stockage-marche-en-avant",
      "/points-de-controle/etat-et-entretien-des-locaux",
      "/themes/locaux-equipements",
      "/contact"
    ]
  },
  {
    slug: "hygiene-du-personnel-en-cuisine",
    titre: "L'hygiène du personnel en cuisine",
    titreSeo: "Hygiène du personnel en cuisine : ce qui est exigé",
    description: "Tenues, lavage des mains, état de santé, vestiaires : ce que le chapitre VIII de l'annexe II du règlement 852/2004 impose, et ce qui relève des guides.",
    reponse: "Le règlement (CE) n° 852/2004 du 29 avril 2004 pose deux exigences à son annexe II, chapitre VIII. Le point 1 impose à toute personne travaillant dans une zone de manutention de denrées de respecter un niveau élevé de propreté personnelle et de porter des tenues adaptées et propres assurant, si cela est nécessaire, sa protection. Le point 2 interdit à toute personne atteinte d'une maladie transmissible par les aliments, de plaies infectées ou de lésions cutanées de manipuler des denrées. Le port de la coiffe, l'interdiction des bijoux et la fréquence de change ne figurent pas dans ce texte : ce sont des bonnes pratiques issues des guides du secteur.",
    ouverture: "C'est le thème le plus visible d'une visite et le plus mal compris, parce que la plupart des règles que l'on récite viennent des guides professionnels et non du règlement. Savoir d'où vient chaque exigence change la manière de l'expliquer à une équipe.",
    sections: [
      {
        titre: "Ce que recouvre l'hygiène du personnel",
        paragraphes: [
          "Les mains, les tenues et l'état de santé forment le triangle du sujet. Les mains transportent d'un poste à l'autre ce qu'elles viennent de toucher, et ce transfert est la voie de contamination la plus banale d'une cuisine. Les tenues protègent la denrée de ce que l'on apporte de l'extérieur, et accessoirement la personne de ce qu'elle manipule. L'état de santé conditionne le droit de manipuler des denrées à un moment donné.",
          "Ces trois éléments ont un point commun : ils dépendent entièrement de gestes humains, répétés des dizaines de fois par service, dans un contexte de pression et de rapidité. Aucun équipement ne les remplace. C'est pourquoi ils demandent de l'explication plus que de la surveillance, et de la répétition plus que de l'affichage.",
          "Il faut le dire d'emblée, parce que le sujet touche des personnes : un geste à corriger l'est presque toujours parce que personne ne l'a expliqué, pas parce que quelqu'un a mal fait. La plupart des écarts constatés sur ce thème sont des habitudes prises faute de temps, et elles se corrigent en quelques jours."
        ]
      },
      {
        titre: "Ce que le texte impose, ce qu'il n'impose pas",
        paragraphes: [
          "Le règlement 852/2004 est bref sur ce chapitre, et c'est important de le savoir. L'annexe II, chapitre VIII, point 1, exige un niveau élevé de propreté personnelle et des tenues adaptées et propres assurant, si cela est nécessaire, la protection de la personne. Le point 2 interdit la manipulation de denrées aux personnes atteintes d'une maladie transmissible par les aliments, porteuses de plaies infectées ou de lésions cutanées. L'annexe II, chapitre I, point 9, ajoute des vestiaires adéquats lorsque l'hygiène l'exige.",
          "Pour le lavage des mains, l'annexe II, chapitre I, point 4, exige un nombre suffisant de lavabos judicieusement situés et destinés au lavage des mains, équipés d'eau courante chaude et froide ainsi que de matériel pour le nettoyage et pour le séchage hygiénique des mains, et séparés en cas de besoin des dispositifs de lavage des denrées. Le chapitre VIII, point 1, couvre la pratique effective.",
          "Ce qui n'est pas dans le texte mérite d'être connu avec précision. Le port de la coiffe, l'interdiction des bijoux et des montres, la fréquence de change des tenues, l'ongle court et sans vernis : rien de tout cela n'est énoncé par le règlement. Ce sont des bonnes pratiques d'hygiène issues des guides du secteur, à formaliser dans votre plan de maîtrise sanitaire. Elles sont excellentes, elles se défendent très bien, mais elles ne s'imposent pas comme des dispositions réglementaires.",
          "Le lave-mains à commande non manuelle est le cas d'école. Cette exigence existe, mais pour certains établissements traitant des produits d'origine animale, au titre du règlement (CE) n° 853/2004, annexe III, section V, chapitre I, point 4, texte qui ne s'applique pas au commerce de détail selon son article 1er, paragraphe 5, point a). En restauration, le lave-mains à commande non manuelle est une bonne pratique d'hygiène, pas une obligation. Le savoir évite de dépenser pour une contrainte imaginaire, et évite surtout d'invoquer devant un agent une règle qui n'existe pas."
        ]
      },
      {
        titre: "La tenue de travail",
        paragraphes: [
          "Adaptée et propre : ces deux mots portent toute l'exigence. Adaptée signifie qu'elle convient au poste, qu'elle couvre les vêtements de ville, qu'elle ne présente pas de risque de chute d'éléments dans les denrées. Propre signifie qu'elle l'est au moment où l'on travaille, ce qui suppose un stock suffisant et une organisation de change qui tienne les jours de forte activité.",
          "La coiffe est le meilleur exemple de bonne pratique adoptée par tout le métier sans figurer au texte. Elle limite la chute de cheveux dans les préparations, qui est un des constats les plus fréquents et un de ceux qu'un client remarque immédiatement. La recommander, la fournir et l'inscrire dans votre plan est plus efficace que de la présenter comme une obligation légale que l'on vous contredirait.",
          "Les chaussures relèvent d'une autre logique, celle de la sécurité au travail, mais elles participent au sujet : une semelle qui traverse le local déchets puis la zone de préparation transporte exactement ce qu'on essaie d'éloigner. Une paire réservée au service, laissée sur place, règle le point sans discussion."
        ]
      },
      {
        titre: "Le lave-mains : équipement et emplacement",
        paragraphes: [
          "L'exigence tient en trois éléments : un nombre suffisant, un emplacement judicieux, et l'équipement complet. Le nombre suffisant s'apprécie au regard de la configuration : un lave-mains à trois mètres du poste de découpe est utilisé, un lave-mains à l'autre bout de la cuisine ne l'est pas. L'emplacement judicieux est celui qui rend le geste possible sans quitter son poste plus de quelques secondes.",
          "L'équipement complet suppose l'eau courante chaude et froide, du matériel pour le nettoyage et du matériel pour le séchage hygiénique. Le savon vide et l'essuie-mains épuisé sont, de loin, les constats les plus fréquents sur ce point, et ils sont aussi les plus faciles à éviter : un stock visible à côté du lave-mains, et une vérification au brief d'ouverture.",
          "Le séchage hygiénique exclut le torchon commun, qui redistribue à chaque usage ce qu'il a ramassé. L'essuie-mains à usage unique est la solution la plus simple. Enfin, le lave-mains doit rester accessible : c'est un point d'eau, il attire naturellement les bacs, les casseroles et les seaux, et il cesse alors de remplir sa fonction."
        ]
      },
      {
        titre: "Le lavage des mains : les moments qui comptent",
        paragraphes: [
          "Aucun texte ne liste les moments où se laver les mains, et il n'y a pas de fréquence réglementaire. La logique suffit : après avoir manipulé des produits crus d'origine animale, après avoir touché des emballages, des poubelles ou du matériel de nettoyage, après être passé aux sanitaires, après s'être mouché ou avoir touché son visage, en début de service, et à chaque changement de tâche entre le sale et le propre.",
          "Le geste lui-même compte autant que sa fréquence. Un passage sous l'eau de deux secondes ne fait rien. Le mouillage, le savonnage avec frottement incluant les doigts, les pouces et les ongles, le rinçage et le séchage forment une séquence courte mais complète. Afficher cette séquence au-dessus du lave-mains est l'une des rares affiches réellement utiles.",
          "Le vrai obstacle est le temps. Personne ne se lave les mains douze fois pendant un coup de feu si le lave-mains est loin, si le savon est vide ou si l'essuie-mains manque. Traiter l'obstacle matériel est plus efficace que de rappeler la règle, et c'est ce qui distingue une consigne appliquée d'une consigne affichée."
        ]
      },
      {
        titre: "Les gants et les fausses sécurités",
        paragraphes: [
          "Le gant n'est pas exigé par le règlement, et il n'est pas non plus une protection en soi. Un gant porté trop longtemps, passé du cru au prêt à consommer sans changement, se comporte exactement comme une main non lavée, avec en prime une fausse impression de sécurité. Le gant se change aussi souvent qu'on se laverait les mains, et les mains se lavent avant de l'enfiler.",
          "Il a des usages précis et légitimes : la protection d'une plaie correctement pansée, la manipulation prolongée de produits prêts à consommer, certaines tâches de nettoyage. En dehors de ces cas, une main propre et lavée régulièrement fait mieux le travail, pour un coût moindre.",
          "La même remarque vaut pour d'autres gestes rassurants qui ne protègent rien : le tablier essuyé d'un revers de main, le couteau rincé sans lavage entre deux produits, le torchon coincé à la ceinture qui sert à tout. Nommer ces habitudes sans mettre personne en cause est le meilleur moyen de les faire disparaître."
        ]
      },
      {
        titre: "L'état de santé et les plaies",
        paragraphes: [
          "L'annexe II, chapitre VIII, point 2, du règlement 852/2004 est explicite : une personne atteinte d'une maladie transmissible par les aliments, ou porteuse de plaies infectées, d'infections cutanées ou de diarrhée, ne doit pas manipuler de denrées ni pénétrer dans une zone de manutention lorsqu'il existe un risque de contamination. C'est l'une des rares interdictions directes du texte.",
          "L'application concrète suppose que l'information remonte, ce qui n'a rien d'évident dans un métier où l'on ne veut pas laisser tomber l'équipe. Dire clairement qu'une déclaration ne sera jamais reprochée, et prévoir une réaffectation temporaire à un poste sans manipulation quand c'est possible, produit plus d'effet qu'une note affichée.",
          "Les plaies simples se pansent avec un pansement étanche, de couleur visible pour être repéré s'il tombe, et protégé par un doigtier ou un gant lorsque la manipulation le justifie. Une trousse de premiers secours accessible et complète fait partie de l'organisation ordinaire d'une cuisine, et son état se vérifie au même titre que le reste."
        ]
      },
      {
        titre: "Les vestiaires",
        paragraphes: [
          "L'annexe II, chapitre I, point 9, du règlement 852/2004 demande des vestiaires adéquats lorsque l'hygiène l'exige. La formulation laisse une marge d'appréciation, et elle se comprend : la contrainte n'est pas la même selon que le personnel arrive en tenue de ville et se change sur place ou non. Ce qui est visé est la séparation entre les effets personnels et la zone de production.",
          "Dans les établissements exigus, la solution passe rarement par une pièce dédiée. Une armoire fermée, à l'écart des zones de manipulation, avec une séparation entre vêtements de ville et tenues propres, répond à l'objectif. Ce qui est constaté en visite, ce sont plutôt les sacs et les manteaux posés en réserve sèche, sur un plan de travail ou sur des caisses de denrées.",
          "La nourriture personnelle est le second point du sujet. Un repas de personnel laissé dans une chambre froide de production, sans identification, pose deux problèmes : il occupe une enceinte destinée aux denrées de l'établissement et il devient un aliment sans traçabilité au milieu des autres. Une étagère ou un bac identifié suffit à traiter le point."
        ]
      },
      {
        titre: "Les habitudes de service",
        paragraphes: [
          "Certaines habitudes sont si banales qu'on ne les voit plus. Goûter avec le doigt ou avec la cuillère de service, reposer une cuillère goûtée dans la préparation, boire dans un verre posé sur le plan de travail, poser un téléphone entre deux bacs, s'essuyer les mains à son tablier. Chacune est un transfert direct entre une personne et une denrée.",
          "Elles se corrigent par un geste de remplacement, pas par une interdiction. Une pile de petites cuillères à usage unique près du piano supprime le goût au doigt sans discours. Une place identifiée pour les boissons du personnel, à l'écart des denrées, supprime le verre sur le plan de travail. Un support pour les téléphones dans le couloir fait la même chose.",
          "Le tabac appelle une organisation simple : sortie complète, lavage des mains au retour. C'est un moment de rupture pratique, souvent mal placé dans le service, et c'est là que le lave-mains proche de l'entrée de cuisine prend tout son sens."
        ]
      },
      {
        titre: "La personne formée à l'effectif",
        paragraphes: [
          "Le règlement 852/2004, annexe II, chapitre XII, points 1 et 2, demande que les manutentionnaires de denrées soient encadrés et disposent d'instructions ou d'une formation en matière d'hygiène alimentaire adaptées à leur activité, et que les personnes responsables de la procédure fondée sur les principes HACCP aient reçu la formation appropriée à l'application de ces principes.",
          "En restauration commerciale, le droit interne ajoute qu'au moins une personne de l'effectif doit justifier d'une formation spécifique : code rural et de la pêche maritime, article L. 233-4, et articles D. 233-11 et D. 233-12 issus du décret n° 2011-731 du 24 juin 2011. Le deuxième alinéa de l'article L. 233-4 prévoit qu'une expérience professionnelle d'au moins trois ans au sein d'une entreprise du secteur alimentaire, comme gestionnaire ou exploitant, vaut satisfaction de cette obligation.",
          "En pratique, ce qui est demandé en visite est le justificatif : l'attestation de la personne concernée, ou les éléments établissant l'expérience professionnelle qui en tient lieu. Le point le plus souvent pris en défaut n'est pas l'absence de personne formée, c'est l'impossibilité de retrouver le document le jour où on le demande. Une copie dans le classeur du plan de maîtrise sanitaire règle le sujet."
        ]
      },
      {
        titre: "Ce qu'un agent regarde",
        paragraphes: [
          "Il regarde les tenues, leur état et leur adéquation au poste. Il regarde les mains, les ongles, les bijoux, et il observe surtout les gestes pendant qu'il parle d'autre chose : le passage d'un produit cru à un produit prêt à consommer, l'usage du torchon, le goût à la cuillère. Ce qu'il voit spontanément pèse davantage que ce qu'on lui montre.",
          "Il vérifie ensuite les lave-mains, un par un : présence, accessibilité, eau chaude et froide, savon, séchage hygiénique. C'est un contrôle rapide et objectif, et c'est aussi celui qui donne le plus mauvais signal quand il échoue, parce qu'un savon vide se remplit en dix secondes.",
          "Il demande enfin le justificatif de formation et, selon les cas, la manière dont les consignes sont transmises aux nouveaux arrivants et aux extras. L'appréciation de l'adéquation des instructions ou de la formation relève de l'agent et du service instructeur, mais un exploitant qui décrit son brief d'accueil, même court et oral, montre que la question a été posée."
        ]
      },
      {
        titre: "Expliquer plutôt que reprendre",
        paragraphes: [
          "Sur ce thème plus que sur les autres, la correction passe par l'explication. Une règle dont on comprend la raison est appliquée quand personne ne regarde ; une règle affichée sans raison tient le temps d'un service. Cinq minutes en brief sur pourquoi la planche se change entre la volaille et la salade valent mieux qu'une note punaisée au mur.",
          "Un regard extérieur aide, précisément parce qu'il ne connaît pas les personnes. Il décrit des gestes, pas des comportements, et il rend possible une conversation d'équipe sans que personne ne se sente visé. C'est souvent le principal effet d'un audit sur ce thème, avant même le contenu du rapport.",
          "L'auditeur parcourt les vingt-sept points de la grille répartis en douze thèmes, en toute discrétion pendant que le service continue, et observe les gestes tels qu'ils se font vraiment. Vous recevez un rapport complet, avec une note, les constats point par point et un plan d'action classé par priorité, qui indique pour chaque écart le correctif attendu et la preuve à constituer. La prestation s'arrête là : vous appliquez la liste vous-même, à votre rythme et avec vos propres moyens. Audit hygiène est un label privé indépendant, ni certification officielle ni contrôle des services vétérinaires. Le cabinet intervient partout en Île-de-France, dans les huit départements, et le devis est établi avant intervention, après un échange de quelques minutes."
        ]
      }
    ],
    faq: [
      {
        question: "La charlotte ou la coiffe est-elle obligatoire en cuisine ?",
        reponse: "Le règlement (CE) n° 852/2004 ne la mentionne pas. Son annexe II, chapitre VIII, point 1, exige un niveau élevé de propreté personnelle et des tenues adaptées et propres. Le port de la coiffe est une bonne pratique d'hygiène issue des guides du secteur, à formaliser dans votre plan de maîtrise sanitaire. Elle reste vivement recommandée, parce que la chute de cheveux dans les préparations est un constat fréquent et immédiatement visible par un client comme par un agent."
      },
      {
        question: "Les bijoux et les montres sont-ils interdits ?",
        reponse: "Aucune disposition du règlement ne les interdit expressément. L'interdiction figure dans les guides de bonnes pratiques d'hygiène du secteur et se rattache à l'exigence générale de propreté personnelle et de protection des denrées. La raison est concrète : une alliance ou un bracelet retient l'humidité et les résidus, gêne un lavage des mains efficace, et peut tomber dans une préparation. Inscrivez la règle dans votre plan et expliquez-la, elle sera mieux tenue que présentée comme une obligation légale."
      },
      {
        question: "Faut-il un lave-mains à commande non manuelle ?",
        reponse: "Pas en restauration. Cette exigence figure au règlement (CE) n° 853/2004, annexe III, section V, chapitre I, point 4, pour certains établissements traitant des produits d'origine animale, texte qui ne s'applique pas au commerce de détail selon son article 1er, paragraphe 5, point a). Le règlement 852/2004 demande seulement des lavabos en nombre suffisant, judicieusement situés, avec eau chaude et froide et matériel de nettoyage et de séchage hygiénique. La commande non manuelle est une bonne pratique, très utile mais non imposée."
      },
      {
        question: "Un membre de l'équipe malade peut-il travailler ?",
        reponse: "L'annexe II, chapitre VIII, point 2, du règlement 852/2004 interdit à toute personne atteinte d'une maladie transmissible par les aliments, ou porteuse de plaies infectées, d'infections cutanées ou de diarrhée, de manipuler des denrées et de pénétrer dans une zone de manutention lorsqu'il existe un risque de contamination. Une réaffectation temporaire à un poste sans manipulation est possible quand l'organisation le permet. L'essentiel est que l'information remonte, ce qui suppose de dire clairement qu'une déclaration ne sera jamais reprochée."
      },
      {
        question: "Les gants dispensent-ils du lavage des mains ?",
        reponse: "Non, et c'est l'une des fausses sécurités les plus répandues. Un gant porté longtemps, passé du produit cru au produit prêt à consommer sans être changé, se comporte exactement comme une main non lavée. Les mains se lavent avant d'enfiler un gant, et le gant se change aussi souvent qu'on se laverait les mains. Le gant garde des usages précis : protection d'une plaie pansée, manipulation prolongée de produits prêts à consommer, certaines tâches de nettoyage."
      },
      {
        question: "Un vestiaire séparé est-il obligatoire ?",
        reponse: "L'annexe II, chapitre I, point 9, du règlement 852/2004 demande des vestiaires adéquats lorsque l'hygiène l'exige, ce qui laisse une marge d'appréciation. Dans un établissement exigu, une armoire fermée située à l'écart des zones de manipulation, avec une séparation entre vêtements de ville et tenues propres, répond à l'objectif. Ce qui est constaté en visite, ce sont surtout les manteaux et les sacs posés en réserve sèche ou sur un plan de travail, situation qui se corrige sans travaux."
      },
      {
        question: "À quelle fréquence changer les tenues ?",
        reponse: "Aucune disposition ne fixe de fréquence. L'exigence est que la tenue soit propre au moment où l'on travaille, ce qui renvoie à votre organisation et au type de poste. Une tenue de plonge ou de préparation de produits crus se salit plus vite qu'une tenue de dressage. Le point limitant est presque toujours le stock disponible : prévoir suffisamment de tenues pour ne jamais avoir à en reporter une sale est plus efficace que d'inscrire une fréquence dans le plan."
      },
      {
        question: "Quel justificatif de formation faut-il pouvoir présenter ?",
        reponse: "En restauration commerciale, au moins une personne de l'effectif doit justifier d'une formation spécifique en matière d'hygiène alimentaire, selon l'article L. 233-4 du code rural et de la pêche maritime et les articles D. 233-11 et D. 233-12 issus du décret n° 2011-731 du 24 juin 2011. L'attestation correspondante est demandée en visite. Le deuxième alinéa de l'article L. 233-4 prévoit qu'une expérience professionnelle d'au moins trois ans comme gestionnaire ou exploitant dans le secteur alimentaire vaut satisfaction de cette obligation."
      }
    ],
    liens: [
      "/points-de-controle/tenue-de-travail-propre-et-adaptee",
      "/points-de-controle/lavage-des-mains-equipement-et-pratique",
      "/themes/hygiene-du-personnel",
      "/points-de-controle/formation-hygiene-du-personnel",
      "/methode",
      "/contact"
    ]
  },
  {
    slug: "gestion-des-dechets-en-restauration",
    titre: "La gestion des déchets en restauration",
    titreSeo: "Gestion des déchets en restauration : ce qui compte",
    description: "Conteneurs, local poubelles, biodéchets, huiles usagées : les exigences du chapitre VI de l'annexe II du règlement 852/2004 et ce qui n'est pas imposé.",
    reponse: "Le règlement (CE) n° 852/2004 du 29 avril 2004 consacre aux déchets le chapitre VI de son annexe II. Le point 1 impose de les retirer aussi vite que possible des locaux où se trouvent des denrées, de façon à éviter qu'ils ne s'accumulent. Le point 2 impose leur dépôt dans des conteneurs dotés d'une fermeture, bien entretenus et faciles à nettoyer. Le point 3 impose des aires de stockage conçues et gérées pour être propres en permanence et, le cas échéant, exemptes d'animaux et de parasites. Le texte exige une fermeture, il n'impose pas de commande non manuelle : la poubelle à pédale est une bonne pratique.",
    ouverture: "C'est le poste que l'on regarde en dernier et qui explique pourtant une bonne partie des problèmes du reste de l'établissement, à commencer par les nuisibles et les odeurs. Quelques décisions d'organisation suffisent le plus souvent à le remettre en ordre.",
    sections: [
      {
        titre: "Pourquoi les déchets pèsent sur tout le reste",
        paragraphes: [
          "Un déchet alimentaire est un aliment qui a cessé d'en être un, mais qui garde toutes les qualités nutritives qui intéressent une bactérie, une mouche ou un rongeur. Il concentre en un point de l'établissement de la matière organique, de l'humidité et de la chaleur. C'est la ressource idéale pour tout ce que l'on cherche à tenir dehors.",
          "La conséquence est directe : un local déchets mal tenu alimente un problème de nuisibles que l'on essaiera ensuite de traiter à coups de dispositifs, sans jamais y arriver. De la même façon, un conteneur ouvert au milieu d'une cuisine remet en cause tout le travail de protection des denrées fait ailleurs.",
          "L'autre raison de s'y intéresser est que ce poste se corrige vite et sans dépense notable. Un couvercle, un rythme de sortie, un nettoyage inscrit au plan, un contenant supplémentaire : la plupart des constats sur ce thème relèvent d'une organisation à reprendre, pas d'un investissement."
        ]
      },
      {
        titre: "Ce que le texte impose, ce qu'il n'impose pas",
        paragraphes: [
          "Quatre points du chapitre VI de l'annexe II du règlement 852/2004 portent l'essentiel. Le point 1 exige le retrait aussi rapide que possible des locaux où se trouvent des denrées, de façon à éviter l'accumulation. Le point 2 exige le dépôt dans des conteneurs dotés d'une fermeture, bien entretenus et faciles à nettoyer. Le point 3 exige des dispositions adéquates pour l'entreposage et l'élimination, avec des aires de stockage conçues et gérées de manière à pouvoir être propres en permanence et, le cas échéant, exemptes d'animaux et de parasites. Le point 4 exige une élimination hygiénique et respectueuse de l'environnement, sans constituer une source de contamination directe ou indirecte.",
          "Le mot à retenir dans le point 2 est fermeture. Le règlement demande un conteneur qui ferme, il ne dit rien du mode d'ouverture. La poubelle à pédale, que beaucoup présentent comme une obligation, est une bonne pratique d'hygiène : elle évite de toucher le couvercle avec des mains propres, ce qui est très utile, mais elle n'est pas imposée par un texte.",
          "Ce qui n'est pas fixé non plus, c'est la fréquence de nettoyage de la zone déchets. Aucune disposition ne la chiffre. Elle relève de votre plan de nettoyage, au même titre que les autres zones, et elle se justifie par la nature de ce que vous y stockez et par le rythme de collecte dont vous dépendez.",
          "Enfin, aucun texte ne fixe pour un restaurant une fréquence de sortie des déchets ni un volume de conteneur. Le point 1 emploie la formule aussi vite que possible, ce qui renvoie à votre organisation et à votre production. La règle pratique la plus solide reste de ne jamais laisser un conteneur alimentaire passer la nuit en zone de production."
        ]
      },
      {
        titre: "Les conteneurs en cuisine",
        paragraphes: [
          "Le conteneur de cuisine doit fermer, se nettoyer facilement et rester en bon état. Un couvercle cassé, un fond fendu, une poignée arrachée le rendent impossible à laver correctement et il devient lui-même une source de contamination. Le remplacement coûte peu et se voit immédiatement dans l'état général de la cuisine.",
          "Le sac est le complément indispensable, à condition d'être changé avant d'être plein. Un sac qui déborde empêche la fermeture du couvercle, et l'exigence du point 2 tombe. Prévoir un contenant de taille adaptée à la production du poste, plutôt qu'un seul grand conteneur en fond de cuisine, évite ce cercle vicieux et raccourcit les trajets.",
          "L'emplacement compte autant que l'équipement. Un conteneur placé à côté d'un plan de travail de dressage, sur le trajet du service, ou sous une étagère de denrées non protégées crée un risque que le couvercle ne suffit pas à annuler. Reculer la poubelle d'un mètre est parfois la mesure la plus efficace du poste."
        ]
      },
      {
        titre: "L'évacuation : rythme et trajet",
        paragraphes: [
          "Le rythme se déduit de la production. Un service qui génère beaucoup de parures et d'épluchures appelle une sortie en cours de service, pas seulement en fin de journée. La règle qui se tient le mieux dans le temps est simple : le conteneur alimentaire sort à la fin de chaque service, et ne passe jamais la nuit en zone de production.",
          "Le trajet mérite d'être pensé. Faire passer un sac au-dessus d'un plan de travail en cours d'utilisation, ou traverser une zone de dressage avec des déchets, annule une partie du travail fait ailleurs. Sortir les déchets à un moment où la production est arrêtée, ou emprunter un trajet dédié quand il existe, résout le point sans travaux.",
          "Le retour compte aussi : après avoir manipulé des déchets ou touché un conteneur extérieur, les mains se lavent avant de reprendre un poste. C'est l'un des moments de lavage les plus souvent oubliés, et l'un de ceux qui comptent le plus."
        ]
      },
      {
        titre: "Le local ou l'aire de stockage",
        paragraphes: [
          "Le point 3 du chapitre VI demande des aires de stockage conçues et gérées de manière à pouvoir être propres en permanence et, le cas échéant, exemptes d'animaux et de parasites. Un sol lavable avec évacuation, des parois nettoyables, une fermeture correcte et une ventilation suffisante sont les caractéristiques qui permettent d'y parvenir. Beaucoup d'établissements urbains disposent d'un local sommaire, et la marge de progrès y est souvent considérable pour un effort modeste.",
          "L'entretien est la moitié du sujet. Un lavage régulier des conteneurs eux-mêmes, un rinçage du sol, l'élimination des cartons stockés là faute de place, la fermeture effective de la porte : quatre actions qui changent l'état d'un local en une matinée. Inscrire ces opérations au plan de nettoyage les fait exister au-delà de la bonne volonté.",
          "Le local déchets est aussi le point d'entrée le plus fréquent des nuisibles, et il doit être traité comme tel : bas de porte étanche, grille sur toute ouverture d'aération, absence d'eau stagnante, dispositifs de surveillance. Les deux sujets se traitent ensemble ou pas du tout."
        ]
      },
      {
        titre: "Le tri et les biodéchets",
        paragraphes: [
          "Le tri des déchets répond à une logique environnementale et non sanitaire, mais il concerne directement l'organisation d'une cuisine. L'obligation de tri à la source des biodéchets figure à l'article L. 541-21-1 du code de l'environnement, et son champ a été progressivement élargi jusqu'à viser l'ensemble des producteurs, y compris les plus petits, quel que soit le volume produit.",
          "Les modalités concrètes dépendent de votre collectivité et de votre prestataire : collecte séparée, apport volontaire, compostage sur place quand c'est possible. Il n'existe pas de solution unique, et le premier réflexe utile est de vous renseigner auprès de la collectivité dont vous dépendez sur le dispositif effectivement disponible à votre adresse.",
          "Du point de vue sanitaire, un contenant de biodéchets obéit aux mêmes exigences que les autres : fermeture, nettoyabilité, retrait rapide des zones où se trouvent des denrées. Un bac à biodéchets laissé ouvert en cuisine sous prétexte qu'il est trié pose exactement le même problème qu'une poubelle ordinaire ouverte. Les déchets d'origine animale relèvent en outre du régime des sous-produits animaux, encadré par le règlement (CE) n° 1069/2009 du 21 octobre 2009, ce qui peut orienter le choix de la filière."
        ]
      },
      {
        titre: "Les huiles de friture usagées",
        paragraphes: [
          "Les huiles alimentaires usagées ne se jettent ni à l'égout ni dans les ordures ménagères. Elles sont remises à un collecteur, qui délivre un justificatif d'enlèvement. Ce document est utile à double titre : il prouve l'élimination conforme et il est parfois demandé en visite parmi les pièces justificatives.",
          "Le stockage intermédiaire est le point sensible. Un bidon d'huile usagée entreposé en cuisine, ouvert, ou posé près de denrées, crée un risque de contamination et une gêne de circulation. Un contenant fermé, identifié, stocké à l'écart des zones de manipulation et de préférence dans la zone déchets, règle le sujet.",
          "Le suivi du bain de friture lui-même relève d'un autre registre, celui de la qualité de la denrée. Une huile trop usagée se voit à sa couleur, à son odeur et à sa fumée. Fixer dans votre plan un repère de contrôle et de renouvellement, et le noter, est une bonne pratique qui améliore autant la cuisine que la conformité."
        ]
      },
      {
        titre: "Cartons, verre et emballages",
        paragraphes: [
          "Les cartons méritent une mention particulière parce qu'ils sont le vecteur d'introduction le plus classique des insectes, blattes en tête. Déconditionner à la réception et évacuer immédiatement les emballages, plutôt que de stocker les cartons en réserve, coupe cette voie sans rien changer à l'organisation. Cela libère en outre de la place et facilite le nettoyage au sol.",
          "Le verre pose un problème différent, celui du bris. Un bac dédié, résistant, et une consigne claire sur ce que l'on fait en cas de casse à proximité de denrées font partie de l'organisation ordinaire. Le point important est le sort des denrées exposées à des éclats : elles ne se trient pas, elles se retirent.",
          "L'ensemble des emballages, enfin, ne doit pas s'accumuler dans les zones de production. C'est une application directe du point 1 du chapitre VI, qui vise les déchets alimentaires et autres déchets. Un carton empilé le long d'un mur gêne le nettoyage, abrite des nuisibles et retient l'humidité."
        ]
      },
      {
        titre: "L'immeuble, la collecte et ce qui ne dépend pas de vous",
        paragraphes: [
          "Beaucoup d'établissements dépendent d'un local commun à l'immeuble, d'une collecte municipale à horaires fixes ou de bacs partagés avec d'autres commerces. Cette situation ne vous exonère pas de vos obligations, mais elle déplace le travail : il s'agit de sécuriser ce qui vous appartient et de documenter ce qui vous échappe.",
          "Concrètement, cela signifie des conteneurs propres et fermés jusqu'au point de dépôt, un stockage intermédiaire correct chez vous quand la collecte ne coïncide pas avec votre rythme, et un signalement écrit au syndic ou au bailleur quand l'état du local commun se dégrade. Un courrier daté a une valeur réelle : il déclenche parfois l'action et il documente votre diligence.",
          "En visite, expliquer cette contrainte avec ses preuves est bien reçu. L'appréciation reste celle de l'agent, mais un exploitant qui montre qu'il a identifié la difficulté, organisé sa propre chaîne et alerté qui de droit se place dans une position différente de celui qui découvre le sujet devant lui."
        ]
      },
      {
        titre: "Ce qu'un agent regarde",
        paragraphes: [
          "Il regarde les conteneurs de cuisine : présence d'un couvercle, état, propreté, emplacement, sac non débordant. Il regarde ensuite l'aire ou le local de stockage : propreté du sol, état des parois, fermeture, présence d'eau stagnante, traces de nuisibles, cartons entassés. Ces deux observations se font en quelques minutes et donnent une image très fidèle de la tenue générale de l'établissement.",
          "Il vérifie enfin l'existence des filières : justificatifs d'enlèvement des huiles usagées, dispositif prévu pour les biodéchets, organisation de la collecte. Ces documents rejoignent les preuves de bonne exécution attendues au titre de l'article 5, paragraphe 2, point g), du règlement 852/2004.",
          "La qualification des écarts et leurs suites relèvent de l'appréciation de l'agent et du service instructeur. Ce que vous maîtrisez, c'est la fermeture des conteneurs, le rythme d'évacuation, l'état du local et la disponibilité des justificatifs."
        ]
      },
      {
        titre: "Reprendre le poste en une matinée",
        paragraphes: [
          "L'inventaire des actions utiles est court : vérifier que chaque conteneur de cuisine ferme et se lave, adapter leur taille et leur emplacement aux postes, fixer une règle de sortie qui interdit la nuit en zone de production, inscrire le lavage des conteneurs et de la zone déchets au plan de nettoyage, et rassembler les justificatifs de filières dans le classeur.",
          "Un audit sur place permet de voir ce poste comme un agent le verra, y compris les détails que l'habitude efface : le couvercle qui ne ferme plus, la porte du local calée ouverte, les cartons stockés faute de place. L'auditeur parcourt les vingt-sept points de la grille répartis en douze thèmes, en toute discrétion pendant que le service continue.",
          "Vous recevez un rapport complet, avec une note, les constats point par point et un plan d'action classé par priorité, qui indique pour chaque écart le correctif attendu et la preuve à constituer. La prestation s'arrête là : vous appliquez la liste vous-même, à votre rythme et avec vos propres moyens. Audit hygiène est un label privé indépendant, ni certification officielle ni contrôle des services vétérinaires. Le cabinet intervient partout en Île-de-France, dans les huit départements, et le devis est établi avant intervention, après un échange de quelques minutes."
        ]
      }
    ],
    faq: [
      {
        question: "La poubelle à pédale est-elle obligatoire ?",
        reponse: "Non. Le règlement (CE) n° 852/2004, annexe II, chapitre VI, point 2, exige que les déchets soient déposés dans des conteneurs dotés d'une fermeture, bien entretenus et faciles à nettoyer. Le texte demande une fermeture, il ne dit rien du mode d'ouverture. La commande non manuelle est une bonne pratique d'hygiène très utile, puisqu'elle évite de toucher le couvercle avec des mains propres, mais elle n'est pas imposée par une disposition. Le point réellement exigible est que le couvercle ferme effectivement."
      },
      {
        question: "À quelle fréquence faut-il sortir les déchets ?",
        reponse: "Aucun texte ne fixe de fréquence. Le point 1 du chapitre VI de l'annexe II du règlement 852/2004 demande un retrait aussi rapide que possible des locaux où se trouvent des denrées, de façon à éviter l'accumulation. Cela renvoie à votre production et à votre organisation. La règle qui se tient le mieux dans la durée est de sortir le conteneur alimentaire à la fin de chaque service, et de ne jamais laisser de déchets alimentaires passer la nuit en zone de production."
      },
      {
        question: "Un local poubelles dédié est-il obligatoire ?",
        reponse: "Le règlement demande des dispositions adéquates pour l'entreposage et l'élimination des déchets, et des aires de stockage conçues et gérées de manière à pouvoir être propres en permanence et, le cas échéant, exemptes d'animaux et de parasites. Il n'impose pas une pièce dédiée. Une aire extérieure correctement délimitée, nettoyable et protégée peut répondre à l'objectif. Ce qui est apprécié, c'est la possibilité réelle de tenir cet endroit propre et fermé aux nuisibles."
      },
      {
        question: "Quelle fréquence de nettoyage pour la zone déchets ?",
        reponse: "Aucune disposition ne la chiffre. Elle relève de votre plan de nettoyage, au même titre que les autres zones, et se justifie par la nature de ce que vous y stockez et par le rythme de collecte dont vous dépendez. Un lavage des conteneurs et un rinçage du sol à intervalle régulier, inscrits au plan avec un responsable désigné, valent mieux qu'une intention. L'état constaté reste le meilleur indicateur : si l'endroit sent ou attire, le rythme retenu ne suffit pas."
      },
      {
        question: "Suis-je concerné par le tri des biodéchets ?",
        reponse: "L'obligation de tri à la source des biodéchets figure à l'article L. 541-21-1 du code de l'environnement, et son champ a été élargi progressivement jusqu'à viser l'ensemble des producteurs, y compris les plus petits. Les modalités concrètes dépendent de votre collectivité et du prestataire disponible à votre adresse : collecte séparée, apport volontaire, compostage sur place. Renseignez-vous auprès de la collectivité dont vous dépendez, car les dispositifs varient fortement d'une commune à l'autre."
      },
      {
        question: "Que faire de mes huiles de friture usagées ?",
        reponse: "Elles ne se jettent ni à l'égout ni dans les ordures ménagères. Elles sont remises à un collecteur, qui délivre un justificatif d'enlèvement. Conservez ces justificatifs avec vos autres preuves : ils sont parfois demandés en visite. Le stockage intermédiaire mérite attention : un contenant fermé, identifié, entreposé à l'écart des zones de manipulation, de préférence dans la zone déchets. Un bidon ouvert laissé en cuisine crée à la fois un risque de contamination et une gêne de circulation."
      },
      {
        question: "Puis-je stocker mes cartons en réserve ?",
        reponse: "Rien ne l'interdit expressément, mais c'est une des plus mauvaises habitudes possibles. Les cartons sont le vecteur d'introduction le plus classique des blattes, ils retiennent l'humidité, ils empêchent le nettoyage au sol et ils offrent des abris. Déconditionner à la réception et évacuer immédiatement les emballages coupe cette voie sans rien changer à votre organisation, et libère de la place. Cela rejoint l'exigence du point 1 du chapitre VI, qui vise les déchets alimentaires et autres déchets."
      },
      {
        question: "Le local poubelles est commun à l'immeuble et mal tenu, que faire ?",
        reponse: "Sécurisez d'abord ce qui vous appartient : conteneurs propres et fermés jusqu'au point de dépôt, stockage intermédiaire correct chez vous si la collecte ne coïncide pas avec votre rythme. Signalez ensuite par écrit au syndic ou au bailleur ce que vous constatez et ce que vous demandez. Ce courrier daté déclenche parfois l'action et documente votre diligence. Présenter cette situation avec ses preuves en visite est bien reçu, même si l'appréciation reste celle de l'agent."
      }
    ],
    liens: [
      "/points-de-controle/tri-et-evacuation-des-dechets",
      "/points-de-controle/local-poubelles-entretenu",
      "/themes/gestion-des-dechets",
      "/points-de-controle/absence-de-traces-de-nuisibles",
      "/methode",
      "/contact"
    ]
  },
  {
    slug: "eau-et-glace-en-restauration",
    titre: "L'eau et la glace en restauration",
    titreSeo: "Eau et glace en restauration : potabilité et entretien",
    description: "Eau potable, machines à glaçons, entretien du réseau intérieur : ce que le chapitre VII de l'annexe II du règlement 852/2004 impose, et ce qui relève de vous.",
    reponse: "Le règlement (CE) n° 852/2004 du 29 avril 2004 traite le sujet au chapitre VII de son annexe II. Le point 1 a) impose une alimentation en eau potable en quantité suffisante. Le point 4 impose que la glace entrant en contact avec les denrées, ou susceptible de les contaminer, soit fabriquée à partir d'eau potable et qu'elle soit fabriquée, manipulée et stockée dans des conditions prévenant toute contamination. L'entretien de la machine relève du chapitre V, point 1 a). Aucune disposition ne fixe la fréquence de nettoyage et de détartrage d'une machine à glaçons : elle relève de votre plan de nettoyage.",
    ouverture: "La glace est un aliment, et c'est le seul aliment d'un restaurant que personne ne pense à contrôler. Le sujet est court, il coûte peu à traiter, et il figure pourtant régulièrement dans les constats.",
    sections: [
      {
        titre: "L'eau et la glace sont des ingrédients",
        paragraphes: [
          "Un glaçon servi dans un verre est consommé. Une eau utilisée pour laver une salade, pour cuire des pâtes ou pour rincer un plan de travail entre en contact direct avec ce qui sera mangé. Les deux relèvent donc de la même logique que n'importe quelle denrée, alors qu'ils sont souvent traités comme des utilités techniques.",
          "Cette confusion explique la place particulière de la machine à glaçons dans les constats. Elle est rarement inscrite au plan de nettoyage, elle se trouve souvent au bar ou dans un couloir, elle fonctionne sans qu'on l'ouvre pendant des mois, et son intérieur humide et tempéré offre des conditions favorables au développement microbien. Un client qui reçoit ces micro-organismes dans son verre les consomme sans aucune barrière.",
          "La bonne nouvelle est que le sujet se traite en une intervention et se maintient avec quelques lignes au plan de nettoyage. Peu de thèmes offrent un rapport aussi favorable entre l'effort demandé et le risque écarté."
        ]
      },
      {
        titre: "Ce que le texte impose, ce qu'il n'impose pas",
        paragraphes: [
          "Le règlement 852/2004, annexe II, chapitre VII, point 1 a), impose une alimentation en eau potable en quantité suffisante, utilisée chaque fois qu'il est nécessaire pour éviter la contamination des denrées. Le point 4 impose que la glace en contact avec les denrées, ou susceptible de les contaminer, soit fabriquée à partir d'eau potable, et qu'elle soit fabriquée, manipulée et stockée dans des conditions prévenant toute contamination.",
          "La qualité de l'eau destinée à la consommation humaine relève, en droit interne, des articles R. 1321-1 et suivants du code de la santé publique, et de l'arrêté du 11 janvier 2007 relatif aux limites et références de qualité des eaux brutes et des eaux destinées à la consommation humaine mentionnées aux articles R. 1321-2, R. 1321-3, R. 1321-7 et R. 1321-38 du code de la santé publique, modifié notamment par l'arrêté du 30 décembre 2022.",
          "L'entretien de la machine à glaçons ne fait pas l'objet d'une disposition propre : il relève de l'exigence générale du chapitre V, point 1 a), de l'annexe II, selon laquelle les articles, installations et équipements en contact avec les denrées sont effectivement nettoyés et, le cas échéant, désinfectés à une fréquence suffisante pour éviter tout risque de contamination.",
          "Ce qui n'est imposé par aucune disposition : la fréquence de nettoyage et de détartrage de la machine, la réalisation d'analyses d'eau périodiques dans un restaurant raccordé au réseau public, l'installation d'un filtre ou d'un adoucisseur. Ces éléments relèvent de votre plan de maîtrise sanitaire et de votre appréciation. Un exploitant qui présenterait des analyses comme une obligation légale se tromperait, et il est plus solide de les présenter pour ce qu'elles sont : un moyen de vérification utile dans certaines situations."
        ]
      },
      {
        titre: "L'eau du réseau et ce qui reste à votre charge",
        paragraphes: [
          "Un établissement raccordé au réseau public reçoit une eau dont la qualité est contrôlée jusqu'au point de livraison, généralement le compteur. La responsabilité du distributeur s'arrête là. Ce qui se passe ensuite, dans le réseau intérieur de l'établissement, relève de l'exploitant, et c'est exactement l'endroit où la qualité peut se dégrader.",
          "Cette répartition explique pourquoi il n'est pas utile, dans la plupart des cas, de faire analyser l'eau en sortie de compteur. Ce qui a du sens, quand un doute existe, c'est un prélèvement au point d'usage, au robinet de la cuisine ou à la sortie de la machine à glaçons, puisque c'est là que se pose la question réelle.",
          "Les établissements alimentés par une ressource privée, puits ou forage, sont dans une situation différente et plus encadrée, avec des démarches propres auprès des autorités sanitaires. Le cas est rare en restauration urbaine et, s'il vous concerne, il mérite un examen spécifique plutôt qu'une transposition des règles applicables au réseau public."
        ]
      },
      {
        titre: "Le réseau intérieur, là où la qualité se perd",
        paragraphes: [
          "Trois situations dégradent l'eau à l'intérieur d'un établissement. La première est la stagnation : un robinet peu utilisé, une antenne de canalisation qui ne sert plus, un tuyau qui alimente un équipement déposé. L'eau y séjourne, se réchauffe et perd sa qualité. Supprimer les portions inutilisées, ou les purger régulièrement, est la mesure la plus efficace.",
          "La deuxième est la température. Une eau froide qui tiédit dans une gaine chaude et une eau chaude maintenue trop bas offrent des conditions favorables au développement microbien. La séparation et l'isolation des réseaux, quand elles sont possibles, améliorent la situation durablement.",
          "La troisième est l'état des équipements terminaux : brise-jets entartrés, flexibles de douchette, filtres non remplacés, joints dégradés. Ce sont des pièces peu coûteuses, souvent oubliées, et leur remplacement fait partie des actions qui améliorent immédiatement la situation. Après une fermeture prolongée, une purge complète des points d'eau avant reprise est une précaution simple et efficace."
        ]
      },
      {
        titre: "La machine à glaçons",
        paragraphes: [
          "C'est l'équipement le plus oublié d'un établissement. Il fabrique un aliment, il fonctionne en continu, et il est rarement ouvert. À l'intérieur, on trouve un bac de réserve humide, des surfaces en contact permanent avec l'eau et la glace, un circuit d'eau, souvent un filtre, et parfois une accumulation de tartre et de biofilm que rien ne signale de l'extérieur.",
          "Le nettoyage complet suppose l'arrêt de la machine, le vidage du bac, le retrait de la glace en réserve, le nettoyage et la désinfection des surfaces intérieures selon les indications du fabricant, le détartrage du circuit, le remplacement du filtre s'il y en a un, et un rinçage soigné avant remise en service. Les premières productions qui suivent un détartrage sont éliminées.",
          "La fréquence n'est fixée par aucune disposition. Elle se détermine au regard de la dureté de l'eau, de l'usage et des préconisations du fabricant, et elle s'inscrit au plan de nettoyage avec un responsable désigné. Le pelletage régulier de la glace en réserve, en fin de semaine ou après une période creuse, est une bonne pratique complémentaire : une glace stockée trop longtemps se soude en bloc et devient impossible à évaluer."
        ]
      },
      {
        titre: "Manipuler et stocker la glace",
        paragraphes: [
          "Le point 4 du chapitre VII vise expressément la manipulation et le stockage. Les erreurs les plus courantes sont connues : la pelle laissée à l'intérieur du bac, où elle est manipulée par des mains qui viennent de toucher autre chose ; le verre utilisé comme pelle, avec le risque de bris et d'éclats invisibles dans la glace ; le couvercle laissé ouvert ; le bac de service rempli en début de soirée et complété au fil des heures.",
          "Les corrections sont immédiates et gratuites. Une pelle rangée dans un support propre à l'extérieur du bac, l'interdiction du verre comme ustensile de prélèvement, un couvercle fermé, un bac de service vidé et lavé plutôt que complété. Ces quatre règles s'écrivent en trois lignes dans le plan et se tiennent sans effort.",
          "Le cas du bris de verre dans un bac à glace mérite une consigne écrite. La glace concernée ne se trie pas, elle se retire intégralement, et le bac est lavé avant réemploi. C'est une décision coûteuse sur le moment, et c'est la seule possible."
        ]
      },
      {
        titre: "La glace pour rafraîchir et la glace alimentaire",
        paragraphes: [
          "Une distinction pratique aide beaucoup : la glace destinée à être consommée, celle des boissons, et la glace utilisée pour rafraîchir un contenant fermé, par exemple une bouteille dans un seau. La seconde n'entre pas en contact avec la denrée elle-même, mais elle reste susceptible de contaminer si elle est réutilisée ou si elle touche des surfaces qui reviendront en contact.",
          "La règle la plus simple est de ne jamais réemployer une glace de rafraîchissement pour un usage de consommation, et de ne pas remettre dans le bac une glace qui en est sortie. Cela paraît évident et c'est pourtant l'un des gestes les plus fréquemment observés en fin de service, par souci d'économie.",
          "Le même raisonnement vaut pour la glace utilisée en cuisine, par exemple pour refroidir une préparation. Si elle entre en contact direct avec la denrée, elle doit être fabriquée à partir d'eau potable et manipulée comme un ingrédient. Si elle refroidit par l'extérieur, un contenant intermédiaire propre suffit."
        ]
      },
      {
        titre: "Fontaines, tireuses et machines à boissons",
        paragraphes: [
          "Tous les équipements qui distribuent une boisson relèvent de la même logique : ce sont des surfaces en contact avec une denrée, soumises au chapitre V, point 1 a), de l'annexe II. Les becs de tireuse, les buses de machine à café, les circuits de fontaine à eau, les mixeurs de boissons frappées demandent un nettoyage régulier et un démontage périodique.",
          "Les becs et les buses sont les points visibles et ceux qu'un agent regarde en premier, parce qu'ils se contrôlent en quelques secondes. Les circuits internes, eux, demandent une intervention selon les préconisations du fabricant ou du prestataire. Conserver les justificatifs de ces interventions est utile, au titre des preuves prévues à l'article 5, paragraphe 2, point g), du règlement 852/2004.",
          "Les fontaines à eau et les carafes appellent une attention particulière parce qu'elles circulent en salle. Un rinçage insuffisant, un stockage humide, un bec touché par les clients : autant de points à traiter dans le plan de nettoyage au même titre que la cuisine."
        ]
      },
      {
        titre: "Les analyses d'eau : quand elles servent vraiment",
        paragraphes: [
          "Il faut être clair : aucune disposition n'impose à un restaurant raccordé au réseau public de faire réaliser des analyses d'eau périodiques. Les présenter comme une obligation serait une erreur. Elles constituent un moyen de vérification, à mobiliser dans des situations précises.",
          "Ces situations sont identifiables. Un doute après une réclamation, une remise en service après une longue fermeture, un réseau intérieur ancien ou modifié, une machine à glaçons dont on veut valider la procédure d'entretien, une installation alimentée autrement que par le réseau public. Dans ces cas, un prélèvement au point d'usage apporte une information utile.",
          "Le résultat s'interprète et se consigne. Une analyse favorable rangée dans le classeur avec sa date et son point de prélèvement documente votre démarche. Une analyse défavorable appelle une action, puis un contrôle de vérification, et c'est cette boucle consignée qui a de la valeur, bien plus que le résultat isolé."
        ]
      },
      {
        titre: "Ce qu'un agent regarde",
        paragraphes: [
          "Il ouvre la machine à glaçons quand elle est accessible, et il regarde l'intérieur du bac, les parois, la présence de tartre ou de dépôt, la position de la pelle. C'est un contrôle rapide, visuel, et il en dit long. Il regarde ensuite les becs de tireuse, les buses, l'état des robinets et des brise-jets.",
          "Il demande, le cas échéant, ce qui est prévu au plan de nettoyage pour ces équipements et les traces des interventions réalisées. Un plan de nettoyage complet qui ne mentionne nulle part la machine à glaçons est un manque fréquent et facile à combler.",
          "La qualification d'un constat et ses suites relèvent de l'appréciation de l'agent et du service instructeur. Ce que vous maîtrisez, c'est l'état intérieur de la machine, les règles de manipulation de la glace, et l'existence de lignes explicites dans votre plan de nettoyage."
        ]
      },
      {
        titre: "Traiter le sujet une fois, le maintenir sans effort",
        paragraphes: [
          "Le programme est court : ouvrir la machine à glaçons et la nettoyer complètement, remplacer le filtre s'il existe, purger les points d'eau peu utilisés, remplacer les brise-jets entartrés, poser un support de pelle à l'extérieur du bac, et ajouter au plan de nettoyage les trois ou quatre lignes qui manquent. Une matinée suffit dans la plupart des établissements.",
          "Un audit sur place vérifie ce poste comme les autres, et c'est souvent l'un de ceux où l'écart entre la perception et la réalité est le plus grand, parce que personne n'ouvre jamais l'appareil. L'auditeur parcourt les vingt-sept points de la grille répartis en douze thèmes, en toute discrétion pendant que le service continue.",
          "Vous recevez un rapport complet, avec une note, les constats point par point et un plan d'action classé par priorité, qui indique pour chaque écart le correctif attendu et la preuve à constituer. La prestation s'arrête là : vous appliquez la liste vous-même, à votre rythme et avec vos propres moyens. Audit hygiène est un label privé indépendant, ni certification officielle ni contrôle des services vétérinaires. Le cabinet intervient partout en Île-de-France, dans les huit départements, et le devis est établi avant intervention, après un échange de quelques minutes."
        ]
      }
    ],
    faq: [
      {
        question: "Dois-je faire analyser mon eau régulièrement ?",
        reponse: "Aucune disposition ne l'impose à un restaurant raccordé au réseau public d'eau potable. La qualité de l'eau est contrôlée jusqu'au point de livraison, et ce qui se passe ensuite dans votre réseau intérieur relève de vous. Les analyses restent un moyen de vérification utile dans des situations précises : doute après une réclamation, remise en service après une longue fermeture, réseau intérieur ancien ou modifié, validation d'une procédure d'entretien. Le prélèvement a alors du sens au point d'usage, pas au compteur."
      },
      {
        question: "À quelle fréquence nettoyer la machine à glaçons ?",
        reponse: "Aucune disposition ne fixe de fréquence. Elle relève de votre plan de nettoyage et se détermine au regard de la dureté de l'eau, de l'usage de la machine et des préconisations du fabricant. Ce qui est exigible, c'est le résultat : le chapitre V, point 1 a), de l'annexe II du règlement 852/2004 demande un nettoyage effectif des équipements en contact avec les denrées, à une fréquence suffisante pour éviter tout risque de contamination. Inscrivez l'opération au plan avec un responsable désigné."
      },
      {
        question: "La glace est-elle vraiment considérée comme un aliment ?",
        reponse: "Oui, dès lors qu'elle entre en contact avec les denrées ou qu'elle est susceptible de les contaminer. Le règlement 852/2004, annexe II, chapitre VII, point 4, exige qu'elle soit fabriquée à partir d'eau potable et qu'elle soit fabriquée, manipulée et stockée dans des conditions prévenant toute contamination. Un glaçon servi dans un verre est consommé sans aucune étape de cuisson ou de lavage intermédiaire, ce qui en fait l'un des rares aliments d'un restaurant à ne bénéficier d'aucune barrière."
      },
      {
        question: "Où ranger la pelle à glace ?",
        reponse: "À l'extérieur du bac, dans un support propre et identifié. La pelle laissée à l'intérieur est manipulée par des mains qui viennent de toucher autre chose et repose ensuite directement sur la glace destinée aux clients. C'est l'un des constats les plus fréquents et l'un des plus simples à corriger. Proscrivez également l'usage d'un verre comme ustensile de prélèvement, à cause du risque de bris et d'éclats invisibles dans la glace."
      },
      {
        question: "Que faire si un verre se casse dans le bac à glace ?",
        reponse: "La glace concernée ne se trie pas : elle se retire intégralement, et le bac est lavé avant réemploi. Des éclats de verre sont invisibles dans la glace et impossibles à retrouver de façon fiable. C'est une décision coûteuse sur le moment et c'est la seule possible. Écrivez la consigne dans votre plan de maîtrise sanitaire pour qu'elle ne dépende pas de la personne présente ce soir-là, et prévoyez comment le service continue pendant le lavage du bac."
      },
      {
        question: "Faut-il installer un filtre ou un adoucisseur ?",
        reponse: "Aucune disposition ne l'impose. Le choix dépend de la dureté de votre eau et des préconisations du fabricant de vos équipements, notamment machine à glaçons et machine à café. Un filtre non remplacé est en revanche pire que pas de filtre du tout, puisqu'il devient lui-même un support de développement. Si vous en installez un, inscrivez son remplacement au plan de nettoyage avec une périodicité et un responsable, et conservez la trace des remplacements effectués."
      },
      {
        question: "Que faire après une longue fermeture ?",
        reponse: "Purgez l'ensemble des points d'eau avant la reprise, y compris ceux qui servent peu, en laissant couler suffisamment longtemps pour renouveler l'eau des canalisations. Nettoyez et remettez en service la machine à glaçons en éliminant la glace en réserve et les premières productions. Vérifiez les brise-jets et les flexibles. La stagnation prolongée est la principale cause de dégradation de l'eau dans un réseau intérieur, et une purge soignée règle la plus grande partie du sujet."
      },
      {
        question: "Les becs de tireuse et les buses sont-ils contrôlés ?",
        reponse: "Ils le sont, parce qu'ils constituent des surfaces en contact avec une denrée au sens du chapitre V, point 1 a), de l'annexe II du règlement 852/2004. Ce sont aussi des points qu'un agent vérifie en quelques secondes. Prévoyez leur nettoyage régulier et leur démontage périodique dans le plan, suivez les préconisations du fabricant ou du prestataire pour les circuits internes, et conservez les justificatifs des interventions réalisées parmi vos preuves de bonne exécution."
      }
    ],
    liens: [
      "/points-de-controle/potabilite-de-l-eau-entretien-machine-a-glacons",
      "/themes/eau-glace",
      "/points-de-controle/plan-de-nettoyage-present-et-applique",
      "/points-de-controle/materiaux-et-equipements-conformes",
      "/methode",
      "/contact"
    ]
  },
];
