import type { Article } from './types';

export const article: Article = {
  slug: 'frequence-audit-hygiene',
  title: "À quelle fréquence faire auditer son restaurant ?",
  metaTitle: "Fréquence d'audit hygiène restaurant : annuel, semestriel",
  description:
    "À quelle fréquence faire auditer son restaurant ? Annuel, semestriel ou trimestriel : les facteurs de risque, l'articulation avec les autocontrôles du PMS et un plan de suivi.",
  excerpt:
    "Annuel, semestriel ou trimestriel ? La bonne fréquence d'audit dépend de votre activité, de votre public et de votre historique. Voici comment construire un plan de suivi hygiène cohérent.",
  category: 'Audit',
  datePublished: '2026-06-13',
  dateModified: '2026-06-13',
  readingMinutes: 14,
  answer:
    "Il n'existe aucune fréquence d'audit hygiène imposée par la loi pour un restaurant : la réglementation oblige à maîtriser la sécurité des aliments en continu, pas à commander un audit privé à date fixe. Dans la pratique, un rythme annuel convient à la plupart des établissements à risque modéré, un rythme semestriel aux activités servant un public sensible ou à fort volume, et un rythme trimestriel aux structures récentes, en redressement ou à fort turnover. L'audit externe ne remplace pas les autocontrôles quotidiens du Plan de Maîtrise Sanitaire : il les vérifie et les recadre. La bonne fréquence se calcule à partir de votre niveau de risque réel, pas d'une règle universelle.",
  blocks: [
    {
      type: 'p',
      text: "C'est une des premières questions que pose un restaurateur après son premier audit : on revient quand ? La tentation est de répondre par un chiffre rond, une fois par an, et de passer à autre chose. Sauf qu'un audit hygiène n'a de valeur que s'il colle au rythme réel des risques de l'établissement. Un bar à salades qui assemble des produits crus toute la journée et une rôtisserie qui sert une cuisson uniforme ne vivent pas les mêmes dangers, ni à la même cadence. Cet article explique comment raisonner la fréquence, quels facteurs la font monter ou descendre, et comment articuler l'audit externe avec ce que vos équipes contrôlent déjà chaque jour.",
    },
    {
      type: 'p',
      text: "Précision utile avant d'aller plus loin : audit hygiène est un label privé indépendant. La fréquence dont il est question ici relève d'un conseil professionnel, d'une démarche volontaire de mise en conformité, pas d'une obligation réglementaire. Personne ne vous sanctionnera pour ne pas avoir commandé d'audit privé. En revanche, la réglementation vous impose, elle, de maîtriser en permanence la sécurité sanitaire de ce que vous servez. L'audit est un outil au service de cette obligation continue.",
    },
    {
      type: 'h2',
      id: 'pas-de-frequence-legale',
      text: "Pourquoi il n'existe pas de fréquence légale d'audit",
    },
    {
      type: 'p',
      text: "Le règlement (CE) n° 852/2004 relatif à l'hygiène des denrées alimentaires pose le principe de base : tout exploitant doit mettre en place, appliquer et maintenir des procédures permanentes fondées sur les principes HACCP. Le mot clé est permanent. Le texte ne parle pas d'un contrôle ponctuel à intervalle fixe, il parle d'une maîtrise continue, intégrée au fonctionnement quotidien. La sécurité des aliments n'est pas un examen que l'on passe une fois, c'est un état que l'on tient jour après jour.",
    },
    {
      type: 'p',
      text: "Cette logique se retrouve dans les principes HACCP du Codex Alimentarius, qui structurent la démarche autour de la surveillance des points critiques et de la vérification régulière du système. La vérification est même un des sept principes : on contrôle que le dispositif fonctionne, on enregistre, on corrige. Mais ni le Codex ni le droit européen ne fixent un calendrier d'audit externe. Ils confient à l'exploitant le soin d'organiser sa surveillance en fonction de son activité.",
    },
    {
      type: 'p',
      text: "En droit français, l'arrêté du 21 décembre 2009 relatif aux règles sanitaires applicables aux activités de commerce de détail détaille les exigences pour la restauration et la remise directe, sans imposer de fréquence d'audit privé. De son côté, l'administration mène ses propres inspections selon une programmation fondée sur le risque, et non un passage automatique à date connue. Autrement dit, ni l'État ni la réglementation ne vous disent quand faire appel à un auditeur indépendant. C'est à vous de construire ce rythme, et c'est précisément l'objet d'un plan de suivi.",
    },
    {
      type: 'callout',
      title: "Ne confondez pas audit externe et contrôle officiel",
      text: "Un audit hygiène privé est une démarche volontaire que vous commandez pour préparer, anticiper et progresser. Un contrôle sanitaire officiel est mené par les services de l'État (sous l'autorité du ministère de l'Agriculture), à l'improviste, et peut donner lieu à des suites administratives. L'audit privé ne remplace pas le contrôle officiel et ne garantit aucun résultat à celui-ci. Il vous met simplement en meilleure posture pour l'aborder.",
    },
    {
      type: 'h2',
      id: 'logique-du-risque',
      text: "Raisonner par le risque, pas par le calendrier",
    },
    {
      type: 'p',
      text: "La bonne question n'est pas combien de fois par an, mais à quelle vitesse mon niveau de maîtrise peut se dégrader entre deux passages. Un établissement où les procédures sont solides, les équipes stables et les produits peu sensibles dérive lentement. Un autre, où l'on manipule beaucoup de produits crus, où le personnel tourne et où les volumes explosent le week-end, peut perdre le contrôle en quelques semaines. La fréquence d'audit doit suivre cette vitesse de dérive, pas un chiffre figé.",
    },
    {
      type: 'p',
      text: "Cette approche par le risque est exactement celle qu'utilisent les autorités pour cibler leurs inspections, et celle que recommande le Codex pour calibrer la surveillance HACCP. On concentre l'effort là où les conséquences d'une défaillance seraient les plus graves, et là où la probabilité de défaillance est la plus haute. Transposé à l'audit privé, cela donne une grille de lecture simple : plus le risque sanitaire potentiel est élevé, plus les passages doivent être rapprochés.",
    },
    {
      type: 'h3',
      text: "Les facteurs qui resserrent la fréquence",
    },
    {
      type: 'ul',
      items: [
        "Type d'établissement et nature des préparations : produits crus, liaison froide, sous-vide, viande hachée, produits de la mer et préparations à base d'œuf cru augmentent le risque par rapport à des plats cuits à cœur et servis chauds.",
        "Volume et flux : un service qui double ou triple en coup de feu met sous tension la chaîne du froid, les temps de manipulation et la marche en avant. Le volume crée des occasions d'erreur.",
        "Public sensible : restauration collective servant des enfants, des personnes âgées ou des malades (cantines, EHPAD, établissements de santé). Une même défaillance y a des conséquences bien plus lourdes, ce qui justifie une surveillance plus serrée.",
        "Historique de non-conformités : un établissement qui a connu des cas critiques, une contre-visite ou une fermeture administrative doit revenir sous contrôle rapproché jusqu'à preuve d'une stabilisation durable.",
        "Turnover des équipes : chaque départ emporte des réflexes acquis, chaque arrivée demande une nouvelle montée en compétence. Une cuisine qui change souvent de personnel perd plus vite le niveau atteint.",
        "Saisonnalité et extras : recours fréquent à des renforts ponctuels, ouverture d'une terrasse l'été, pics événementiels. Les périodes de tension méritent un audit calé juste avant ou pendant.",
      ],
    },
    {
      type: 'h3',
      text: "Les facteurs qui permettent d'espacer",
    },
    {
      type: 'ul',
      items: [
        "Carte courte et stable, procédés de cuisson maîtrisés, peu de manipulation de produits sensibles.",
        "Équipe ancienne, formée, avec un responsable hygiène identifié et impliqué.",
        "Plan de Maîtrise Sanitaire vivant, à jour, avec des autocontrôles réellement tenus et enregistrés.",
        "Historique propre : audits précédents sans cas critique, écarts mineurs corrigés rapidement.",
        "Locaux récents ou bien conçus, équipements en bon état, traçabilité fluide.",
      ],
    },
    {
      type: 'p',
      text: "Aucun de ces facteurs ne joue seul. C'est leur combinaison qui dessine le profil de risque. Un restaurant gastronomique avec une carte ambitieuse mais une brigade ultra-stable et un PMS exemplaire peut tenir un rythme plus calme qu'une sandwicherie en sous-effectif chronique. Le métier de l'auditeur consiste justement à lire cet équilibre, pas à appliquer un barème mécanique.",
    },
    {
      type: 'h2',
      id: 'annuel-semestriel-trimestriel',
      text: "Annuel, semestriel, trimestriel : à qui s'adresse chaque rythme",
    },
    {
      type: 'p',
      text: "Voici des repères de cadrage. Ils servent de point de départ à la discussion, pas de vérité gravée. Un auditeur ajuste toujours en fonction de ce qu'il constate sur place.",
    },
    {
      type: 'h3',
      text: "Audit annuel : le socle pour un risque modéré",
    },
    {
      type: 'p',
      text: "Un passage par an convient à la majorité des restaurants traditionnels à risque modéré : carte maîtrisée, équipe relativement stable, historique correct. L'audit annuel permet de faire le point une fois par cycle complet, de vérifier que le PMS n'a pas vieilli, que les nouvelles recrues ont été formées et que les habitudes ne se sont pas relâchées. C'est aussi un rythme lisible pour le restaurateur, facile à intégrer dans son calendrier de gestion, souvent calé sur un moment creux de l'année.",
    },
    {
      type: 'p',
      text: "La limite de l'annuel, c'est l'angle mort de douze mois. Beaucoup de choses peuvent se déconstruire en un an : un changement de fournisseur, l'arrivée d'un nouveau chef, un équipement vieillissant. Pour un établissement franchement stable, ce risque reste raisonnable. Pour les autres, il faut resserrer.",
    },
    {
      type: 'h3',
      text: "Audit semestriel : volume élevé ou public sensible",
    },
    {
      type: 'p',
      text: "Deux passages par an s'imposent dès que les conséquences d'une défaillance grimpent ou que l'activité tourne à plein régime. La restauration collective servant un public fragile entre naturellement dans cette catégorie, tout comme les établissements à très gros volume où la chaîne du froid et la marche en avant sont sollicitées en permanence. Le rythme semestriel a un autre intérêt : il permet de couvrir deux saisons différentes, l'été et l'hiver n'imposant pas les mêmes contraintes thermiques ni les mêmes flux.",
    },
    {
      type: 'h3',
      text: "Audit trimestriel : redressement et instabilité",
    },
    {
      type: 'p',
      text: "Quatre passages par an se justifient pour les situations à risque élevé ou en cours de stabilisation. Un établissement qui sort d'une contre-visite difficile, d'une fermeture administrative ou d'un audit avec cas critiques a besoin d'un suivi rapproché pour ancrer durablement ses corrections. Idem pour une jeune structure dans ses premiers mois, ou pour une cuisine au turnover très élevé où le niveau se reconstruit en continu. Le trimestriel n'est pas une punition : c'est un dispositif de remise à niveau, pensé pour redescendre vers l'annuel une fois la stabilité prouvée.",
    },
    {
      type: 'callout',
      title: "Repères de fréquence, pas de barème officiel",
      text: "Ces trois rythmes sont des conseils issus de la pratique de l'audit hygiène, fondés sur le principe réglementaire de maîtrise continue et de surveillance proportionnée au risque. Ils ne reposent sur aucune fréquence imposée par un texte de loi. Votre auditeur recommande un intervalle, vous décidez. La date du prochain audit figure d'ailleurs dans le rapport, justement pour rendre cette recommandation explicite et traçable.",
    },
    {
      type: 'h2',
      id: 'audit-vs-autocontroles',
      text: "L'audit externe ne remplace pas les autocontrôles quotidiens",
    },
    {
      type: 'p',
      text: "C'est le malentendu le plus fréquent. Un audit hygiène, même trimestriel, reste une photographie à un instant donné. Entre deux passages, ce qui tient le niveau, ce sont les autocontrôles internes du Plan de Maîtrise Sanitaire, exécutés par les équipes elles-mêmes. Relevés de température des enceintes froides et chaudes, contrôle des cuissons et des refroidissements, vérification des DLC, suivi du plan de nettoyage, traçabilité des réceptions : ce travail quotidien est le cœur du dispositif. L'audit externe vient le vérifier, pas le remplacer.",
    },
    {
      type: 'p',
      text: "Le règlement (CE) n° 852/2004 et l'arrêté du 21 décembre 2009 fondent cette surveillance continue. Les enregistrements quotidiens sont d'ailleurs la première chose qu'un inspecteur consulte, et la première qu'un auditeur examine. Un PMS rempli consciencieusement tous les jours vaut mieux qu'un audit brillant suivi de trois mois de relâchement. La fréquence d'audit n'a donc de sens que posée sur des autocontrôles réellement tenus.",
    },
    {
      type: 'quote',
      text: "Un audit ponctuel mesure le niveau d'un jour. Les autocontrôles quotidiens, eux, sont ce qui maintient ce niveau les 364 autres. L'un sans l'autre ne tient pas.",
    },
    {
      type: 'p',
      text: "La complémentarité fonctionne dans les deux sens. L'audit externe apporte un regard neuf, débusque les angles morts que l'habitude finit par masquer, et challenge des pratiques que l'équipe ne questionne plus. Les autocontrôles, eux, donnent à l'audit sa matière : des semaines de relevés à analyser, des tendances à repérer, des dérives à corriger avant qu'elles ne deviennent critiques. Un bon auditeur ne se contente pas d'inspecter la cuisine le jour J, il lit l'historique des enregistrements pour comprendre comment l'établissement vit entre deux visites.",
    },
    {
      type: 'h2',
      id: 'construire-plan-de-suivi',
      text: "Construire un plan de suivi sur l'année",
    },
    {
      type: 'p',
      text: "Plutôt que de raisonner audit par audit, il vaut mieux penser en cycle. Un plan de suivi articule un audit complet de référence, des points intermédiaires ciblés et le travail quotidien des équipes. Voici une façon de le bâtir.",
    },
    {
      type: 'ol',
      items: [
        "Poser un audit complet de référence. Il établit le niveau de départ, identifie les non-conformités, distingue les cas critiques et fixe un plan correctif avec priorités et délais.",
        "Évaluer le profil de risque. À partir du type d'activité, du volume, du public, de l'historique et du turnover, l'auditeur recommande un intervalle (annuel, semestriel ou trimestriel) et le note dans le rapport.",
        "Caler les passages dans le calendrier. On évite les périodes mortes et on vise plutôt les moments de tension réelle : avant la saison haute, après l'arrivée d'une nouvelle équipe, à l'ouverture d'une terrasse.",
        "Programmer une contre-visite si nécessaire. Quand des cas critiques ont été relevés, un passage de vérification ciblé vérifie que les corrections ont été appliquées, sans attendre l'audit suivant.",
        "Faire vivre les autocontrôles entre deux audits. Le PMS reste actif chaque jour. L'auditeur s'appuiera sur ces enregistrements au passage suivant pour mesurer la régularité, pas seulement l'état du jour.",
        "Réviser le rythme à chaque cycle. Un historique qui s'assainit autorise à espacer. Une dégradation impose de resserrer. Le plan de suivi n'est pas figé, il respire avec l'établissement.",
      ],
    },
    {
      type: 'p',
      text: "Ce séquençage transforme l'audit d'un événement isolé en un dispositif d'amélioration continue. Le restaurateur sait à quoi s'attendre, l'équipe se prépare, et les progrès se mesurent d'un cycle à l'autre. C'est aussi ce qui donne sa valeur dans le temps à un label privé : un établissement suivi régulièrement maintient son niveau au lieu de le redécouvrir une fois par an.",
    },
    {
      type: 'h2',
      id: 'maintenir-le-niveau',
      text: "Pourquoi le suivi régulier compte plus que l'audit isolé",
    },
    {
      type: 'p',
      text: "Le niveau d'hygiène d'un établissement n'est jamais acquis. Il monte avec l'effort et redescend dès que l'attention faiblit. Un audit unique peut produire un beau rapport et un classeur en règle, puis être suivi de mois de dérive silencieuse. Le suivi régulier casse cette logique : en sachant qu'un auditeur reviendra, l'équipe maintient ses réflexes, le responsable garde le PMS à jour, et les petits écarts se corrigent avant de devenir des cas critiques.",
    },
    {
      type: 'p',
      text: "Il y a aussi un effet d'apprentissage. Au fil des passages, l'auditeur connaît l'établissement, ses points faibles récurrents, ses contraintes propres. Les recommandations gagnent en précision, le plan correctif devient plus opérationnel, et la relation de confiance permet d'aller plus loin que lors d'un premier audit. Un suivi installé dans la durée vaut mieux qu'une succession d'audits sans mémoire, où l'on repart de zéro à chaque fois.",
    },
    {
      type: 'callout',
      title: "Maintenir vaut mieux que rattraper",
      text: "Corriger une dérive identifiée tôt coûte peu : un rappel, un ajustement de procédure, une formation. Rattraper un établissement qui a glissé pendant des mois mobilise bien plus d'énergie, parfois sous la pression d'une contre-visite ou d'une suite administrative. Le suivi régulier est moins une dépense qu'une assurance contre le décrochage.",
    },
    {
      type: 'h2',
      id: 'date-prochain-audit',
      text: "Comment se décide la date du prochain audit",
    },
    {
      type: 'p',
      text: "La recommandation de date n'est pas un automatisme commercial. Elle découle directement de ce que l'audit a révélé. Un rapport sans cas critique, des écarts mineurs corrigés vite, une équipe stable : la date recommandée s'éloigne, souvent vers l'annuel. Des cas critiques, un PMS lacunaire, un turnover marqué : elle se rapproche, et une contre-visite peut s'intercaler. La logique est transparente et tracée dans le rapport, pour que le restaurateur comprenne le pourquoi de l'intervalle proposé.",
    },
    {
      type: 'p',
      text: "Plusieurs éléments concrets pèsent dans cette décision :",
    },
    {
      type: 'ul',
      items: [
        "La présence ou non de cas critiques lors du dernier passage.",
        "Le score global et son évolution par rapport aux audits précédents.",
        "La qualité et la régularité des autocontrôles du PMS.",
        "Les changements prévus : nouvelle carte, agrandissement, ouverture saisonnière, recrutements.",
        "Le public servi et les volumes attendus dans les mois à venir.",
      ],
    },
    {
      type: 'p',
      text: "Le restaurateur reste décisionnaire. L'auditeur propose un intervalle argumenté, le client le valide, l'avance ou le retarde selon ses contraintes. L'essentiel est que la décision soit éclairée, pas subie. Cette date n'a évidemment aucun caractère obligatoire au sens réglementaire : c'est un repère professionnel pour piloter la qualité dans la durée.",
    },
    {
      type: 'h2',
      id: 'cas-particuliers',
      text: "Quelques situations qui changent la donne",
    },
    {
      type: 'p',
      text: "Certains moments justifient un audit hors cycle, indépendamment du rythme habituel.",
    },
    {
      type: 'ul',
      items: [
        "Avant une ouverture ou une réouverture : un audit de démarrage cale les bonnes pratiques dès le premier jour, quand tout est encore à fixer.",
        "Après un changement majeur : nouveau chef, refonte de carte, travaux de cuisine, changement de système de froid. La maîtrise acquise peut être bousculée par ces transitions.",
        "À la suite d'une contre-visite officielle ou d'une suite administrative : un suivi rapproché aide à reconstruire un niveau stable et documenté.",
        "Avant un événement à fort enjeu : ouverture estivale d'une terrasse, montée en charge saisonnière, reprise après une longue fermeture.",
        "En cas de doute interne : un signal d'alerte, un incident évité de justesse, une équipe qui exprime des difficultés. Mieux vaut un audit anticipé qu'une dérive installée.",
      ],
    },
    {
      type: 'p',
      text: "Ces audits ponctuels ne remplacent pas le plan de suivi, ils s'y greffent. L'idée reste la même : adapter la surveillance au risque réel du moment, plutôt que de s'enfermer dans un calendrier rigide qui ignorerait ce qui se passe vraiment en cuisine.",
    },
    {
      type: 'h2',
      id: 'conclusion-pratique',
      text: "Trouver le bon rythme pour votre établissement",
    },
    {
      type: 'p',
      text: "Il n'y a pas de réponse unique à la question de la fréquence, et c'est tant mieux : une fréquence universelle serait soit excessive pour les uns, soit insuffisante pour les autres. Partez de votre profil de risque réel, croisez le type d'activité, le volume, le public, l'historique et la stabilité de vos équipes, puis posez un premier audit de référence. C'est lui qui vous donnera l'intervalle le plus juste, fondé sur des constats plutôt que sur une intuition.",
    },
    {
      type: 'p',
      text: "Si vous cherchez un point de départ : annuel pour un restaurant stable à risque modéré, semestriel pour un gros volume ou un public sensible, trimestriel le temps de stabiliser une situation fragile. Et dans tous les cas, des autocontrôles quotidiens qui tiennent la route entre les passages. C'est ce duo, audit régulier et PMS vivant, qui maintient un établissement au niveau dans la durée. Pour caler un premier audit de référence en Île-de-France et définir ensemble le bon rythme de suivi, vous pouvez prendre rendez-vous avec un auditeur.",
    },
  ],
  faq: [
    {
      q: "La loi impose-t-elle une fréquence d'audit hygiène pour un restaurant ?",
      a: "Non. Aucun texte ne fixe de fréquence pour un audit hygiène privé. Le règlement (CE) n° 852/2004 impose une maîtrise permanente de la sécurité des aliments, pas un audit externe à date fixe. La fréquence d'audit privé relève d'un conseil professionnel et d'une démarche volontaire, pas d'une obligation légale.",
    },
    {
      q: "Quelle fréquence d'audit pour un restaurant traditionnel classique ?",
      a: "Un audit annuel convient à la plupart des restaurants à risque modéré, avec une carte maîtrisée, une équipe stable et un historique correct. Ce rythme permet de vérifier une fois par cycle que le Plan de Maîtrise Sanitaire reste à jour et que les bonnes pratiques ne se sont pas relâchées. Il peut se resserrer si le profil de risque l'exige.",
    },
    {
      q: "Quand faut-il passer à un audit semestriel ou trimestriel ?",
      a: "Le semestriel s'adresse aux gros volumes et aux publics sensibles, comme la restauration collective servant enfants, personnes âgées ou malades. Le trimestriel concerne les situations en redressement, les structures récentes ou les équipes à fort turnover. L'objectif est d'ancrer durablement les corrections avant de revenir à un rythme plus espacé.",
    },
    {
      q: "L'audit externe remplace-t-il les autocontrôles quotidiens ?",
      a: "Non. L'audit est une photographie à un instant donné. Entre deux passages, ce sont les autocontrôles internes du PMS qui tiennent le niveau : relevés de température, contrôle des cuissons, suivi des DLC, plan de nettoyage, traçabilité. L'audit externe vérifie ces autocontrôles et les recadre, il ne s'y substitue pas.",
    },
    {
      q: "Comment se décide la date du prochain audit ?",
      a: "Elle découle des constats de l'audit : présence ou non de cas critiques, score et son évolution, qualité des autocontrôles, changements prévus, public et volumes à venir. L'auditeur propose un intervalle argumenté, noté dans le rapport, et le restaurateur reste décisionnaire pour l'avancer ou le retarder selon ses contraintes.",
    },
    {
      q: "Un audit plus fréquent garantit-il de réussir un contrôle sanitaire officiel ?",
      a: "Non. Aucun audit privé ne garantit un résultat à un contrôle officiel mené par les services de l'État. L'audit hygiène est un label privé indépendant qui aide à préparer, anticiper et progresser. Un suivi régulier améliore la posture de l'établissement, mais ne constitue ni une certification d'État ni une garantie de réussite.",
    },
    {
      q: "Quels facteurs justifient de resserrer la fréquence ?",
      a: "La manipulation de produits crus ou sensibles, les gros volumes en coup de feu, un public fragile, un historique de non-conformités ou de fermeture, et un turnover élevé des équipes. Ces facteurs accélèrent la vitesse à laquelle le niveau de maîtrise peut se dégrader, ce qui justifie des passages plus rapprochés.",
    },
    {
      q: "Faut-il un audit hors cycle après un changement dans le restaurant ?",
      a: "C'est souvent recommandé. Un nouveau chef, une refonte de carte, des travaux de cuisine, un changement de système de froid ou une ouverture saisonnière peuvent bousculer la maîtrise acquise. Un audit ponctuel, en plus du plan de suivi habituel, permet de sécuriser ces transitions avant qu'une dérive ne s'installe.",
    },
  ],
  sources: [
    {
      label: "Règlement (CE) n° 852/2004 relatif à l'hygiène des denrées alimentaires",
      url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004R0852',
    },
    {
      label: 'Codex Alimentarius (FAO / OMS), principes généraux d\'hygiène et HACCP',
      url: 'https://www.fao.org/fao-who-codexalimentarius/',
    },
    {
      label: 'Arrêté du 21 décembre 2009 relatif aux règles sanitaires (commerce de détail, restauration)',
      url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000021629599',
    },
    {
      label: 'Décret n° 2011-731 du 24 juin 2011 relatif à l\'obligation de formation en hygiène alimentaire',
      url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000024226657',
    },
    {
      label: "Ministère de l'Agriculture et de la Souveraineté alimentaire",
      url: 'https://agriculture.gouv.fr/',
    },
    {
      label: 'DGCCRF, Direction générale de la concurrence, de la consommation et de la répression des fraudes',
      url: 'https://www.economie.gouv.fr/dgccrf',
    },
  ],
  related: [
    'audit-hygiene-restaurant-ile-de-france',
    'contre-visite-audit-hygiene',
    'plan-maitrise-sanitaire-pms',
  ],
  relatedZones: ['paris', 'hauts-de-seine', 'seine-saint-denis'],
};
