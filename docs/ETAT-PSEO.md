# audithygiene.fr, état du pSEO

## Le positionnement, tel qu'il est écrit partout

Un restaurateur veut savoir où il en est. Un auditeur passe, contrôle sur place
les **27 points réglementaires** répartis en **12 thèmes**, en toute
**discrétion**, et remet un **rapport complet** avec son **plan d'action**.

**La prestation s'arrête là.** Auditer, et envoyer le rapport. Rien d'autre.

Pas de contre-visite, pas de suivi, pas de clôture de dossier. Pas de rédaction
du plan de maîtrise sanitaire ni de reconstitution du classeur : l'auditeur
ouvre ces documents parce qu'ils font partie des 27 points, note ce qui manque,
et l'écrit. La rédaction appartient à l'exploitant, qui applique ensuite les
correctifs lui-même, à son rythme et avec ses propres moyens.

C'est pour cela que le plan d'action doit être exploitable seul : chaque écart
porte le correctif attendu et la preuve à constituer, écrits pour la personne
qui tient la cuisine. **Avec nous, vous savez exactement quoi corriger.**

## Les formules

| Formule | Prix | Contenu |
|---|---|---|
| Audit Essentiel | 490 € HT | Les 27 points d'hygiène, environ 2 h sur place, rapport et plan d'action |
| Audit Conformité | 890 € HT | Les 27 points, plus le volet affichage et information du consommateur |
| Réseau | sur devis | Dégressif à partir de trois établissements |

Déplacement en Île-de-France compris, devis établi avant toute intervention.

Le second volet relève de la **DGCCRF**, le premier de la **DDPP** : deux
administrations, deux contrôles distincts, et c'est l'argument de vente. Sa
grille est écrite et publiée, en 17 points détaillés plus bas.

Le prix vit dans `src/lib/constants.ts` et `src/lib/audit-config.ts`, et le
corpus pSEO le lit depuis `FORMULES` : jamais de montant recopié à la main,
sans quoi deux chiffres finissent par cohabiter sur le même site.

Le cabinet intervient **partout en Île-de-France**, dans les huit départements.

Le registre **rassure** : un contrôle est un acte de routine, pas une sanction ;
la plupart des écarts sont des habitudes, pas des fautes ; les équipes ne sont
jamais mises en cause ; on peut appeler sans être irréprochable.

**La limite, tenue partout** : on ne promet jamais l'issue d'un contrôle
officiel, qui n'appartient qu'aux services de l'État. audit hygiène reste un
label privé indépendant, ni certification, ni agrément.

## Les familles de pages

| Famille | Générées | Vague 1 | Médiane | Plancher |
|---|---|---|---|---|
| Communes | 995 | 137 | 10 392 signes, 1 601 mots | 4 000 / 650 |
| Questions autonomes | 70 | 70 | 6 695 signes, 1 042 mots | 3 000 / 500 |
| Points de contrôle | 44 | 44 | 4 910 signes, 784 mots | 3 500 / 550 |
| Dossiers de fond | 20 | 20 | 21 324 signes, 3 310 mots | 9 000 / 1 500 |
| Thèmes de la grille | 17 | 17 | 4 710 signes, 774 mots | 3 500 / 550 |
| Types d'établissement | 12 | 12 | 13 895 signes, 2 197 mots | 6 000 / 950 |
| Départements | 8 | 8 | 5 865 signes, 902 mots | 2 500 / 400 |
| Blog, antérieur | 30 | 30 | 25 789 signes, 3 891 mots | 2 000 / 350 |

**1 158 pages programmatiques générables, 300 ouvertes.** Il reste 858 communes,
soit trois vagues de 300 ou cinq de 200. Les cinq autres familles sont
intégralement ouvertes : elles passent en tête de l'ordre d'ouverture parce qu'elles reçoivent les liens des communes et n'ont besoin de rien pour exister.

## Les deux volets de la grille

La grille compte 44 points en 17 thèmes, répartis en deux volets qui
correspondent à deux administrations :

- **hygiène**, 27 points, contrôlés par les services vétérinaires (DDPP) ;
- **affichage et information du consommateur**, 17 points, contrôlés par la
  DGCCRF.

Les deux services passent indépendamment l'un de l'autre. C'est ce qui fonde la
formule Conformité à 890 euros, et personne d'autre ne vend les deux ensemble.

Le volet affichage porte encore `GRILLE_AFFICHAGE_VERSION = 'v0-draft'`. Ses 17
références ont été vérifiées texte par texte, mais un point, le panonceau
extérieur de licence, est écrit sans source : aucun texte en vigueur ne l'impose
de façon vérifiable, alors que toute la documentation professionnelle le répète.

## La couverture géographique

Le jeu de communes hérité de hygiene14 s'arrêtait à 1 500 habitants, soit 620
communes sur les 1 268 d'Île-de-France. `scripts/pseo-communes.mjs --seuil 0`
descend le seuil et complète, sans jamais retoucher une commune déjà relevée.

Une commune n'est publiable que si elle porte **au moins deux activités
renseignées** : en dessous, la page n'aurait rien qui lui appartienne. Un
village à un seul commerce vaut mieux absent que mince.

Paris ne répond pas sur son code commune : ses **vingt arrondissements** portent
les chiffres, et c'est eux que cherchent les restaurateurs.

## L'indexation, mesurée le 2 septembre 2026

Search Console, fenêtre trois mois : 26 clics, 2 050 impressions, CTR 1,3 %,
position moyenne 29,8. **202 pages non indexées pour 151 indexées.**

La cause n'était ni le contenu, ni l'intention des pages, ni le sitemap. Elle
était dans le maillage, et elle se mesure sur le HTML rendu du build.

**96 pages n'étaient atteignables par aucun lien depuis l'accueil.** L'en-tête
portait cinq liens, le pied de page onze, et aucun des deux ne menait à
`/audit-hygiene`, `/dossiers` ou `/points-de-controle`. Ces familles se
liaient entre elles et vers leur propre hub : un îlot fermé, sans entrée.
Elles n'existaient que dans le sitemap. Les 137 communes se trouvaient à
quatre ou cinq clics, et le hub `/zones` à quatre, atteignable seulement par
le fil d'Ariane d'une commune.

**273 liens internes pointaient vers des adresses qui n'existent pas.** Le bloc
« communes voisines » résolvait la voisine dans le jeu complet sans vérifier
la vague : une commune ouverte liait une commune hors vague, dont la page
n'est pas générée et répond 404. Le commentaire de `src/lib/vagues.ts`
affirmait pourtant qu'aucun lien interne ne pointait vers une page hors vague.
C'était faux, et cela brûlait du budget d'exploration.

**Deux pages de sommaire manquaient.** `/questions` et `/themes` répondaient
404 alors que 87 pages vivaient dessous. Une famille que rien ne rassemble ne
se rassemble pas toute seule.

Trois contradictions s'y ajoutaient : les trois pages légales portaient
`index: false` **et** figuraient au sitemap ; le gabarit de titre ajoutait
« | audit hygiène » à chaque page, soit seize caractères, et **330 titres sur
351** dépassaient soixante caractères ; la méta description des communes
promettait « Contre-visite comprise », alors que la contre-visite ne fait pas
partie de la prestation.

### Après correction, mesuré sur le même build

| Mesure | Avant | Après |
|---|---|---|
| Pages inatteignables depuis l'accueil | 96 | **0** |
| Profondeur maximale | 5 | **2** |
| Liens internes vers un 404 | 273 | **0** |
| Titres au delà de 60 caractères | 330 | **9** |
| URL au sitemap portant un `noindex` | 3 | **0** |
| Pages de sommaire manquantes | 2 | **0** |

## Ce qui entre dans l'index, et ce qui n'y entre pas

`src/lib/indexation.ts` porte la règle. Deux états seulement : une page est au
sitemap et indexable, ou elle porte un `noindex` assumé et sort du sitemap.
Jamais les deux.

Les 44 points de contrôle et les 17 thèmes sont **hors index**. Ce sont les
intitulés internes de la grille, que personne ne cherche, les plus minces du
site, et dix URL parlaient déjà des allergènes, douze de la chaîne du froid.
Ils restent publiés, maillés et explorables : ils portent les références
réglementaires point par point. Leurs deux hubs, eux, restent indexés.

Conséquence à garder en tête au moment de mesurer : l'effet du maillage se lira
sur les 290 URL déclarées. Les 61 pages sortent de l'expérience.

## Les prix, validés le 2 septembre 2026

**490 € HT pour l'Audit Essentiel, 890 € HT pour l'Audit Conformité.** Deux
prix pour deux prestations distinctes. Ce ne sont pas des valeurs provisoires.

Le commentaire de `src/lib/constants.ts` disait l'inverse, « placeholders, à ne
pas afficher comme définitifs », et il était périmé. Il a coûté un aller-retour
complet : les montants ont été retirés de tout le site, puis remis. Le
commentaire porte désormais la date de validation. Ce qui reste en `v0-draft`
est la grille d'affichage, pas le tarif.

Les montants s'affichent partout : données structurées (`offers`,
`makesOffer`), balise `title` de l'accueil, méta descriptions des communes et
des départements, bloc de devis, prose et FAQ des 151 pages de commune,
`FAQ_ITEMS`, page prix. Aucun n'est recopié à la main, tous se lisent depuis
`FORMULES`.

**Deux règles à tenir en modifiant un prix.**

Les `Offer` portent `valueAddedTaxIncluded: false` et un `priceSpecification`
explicite. Un moteur de réponse qui reprend « 490 » sans la mention ferait dire
au site un prix qu'il ne pratique pas.

Chaque montant écrit dans une réponse de FAQ est accompagné de « hors taxes »
dans la même phrase. Une réponse de FAQ part dans le bloc `FAQPage`, donc en
données structurées, et se lit hors contexte. Chercher `price` dans le JSON-LD
ne montre pas ce chemin : le montant voyage dans `acceptedAnswer.text`.

**Comment le vérifier**, sur le rendu et non sur le code, après toute
modification touchant un prix :

```
node tmp/faq-prix.mjs      # montants servis dans les blocs FAQPage
node tmp/jsonld-prix.mjs   # noeuds Offer et champs libres portant un montant
```

État au 2 septembre 2026 : les blocs `FAQPage` de 162 pages servent exactement
490 et 890, tous avec la mention hors taxes, zéro montant orphelin. Les nœuds
`Offer` sont présents sur 175 pages, tous à `valueAddedTaxIncluded: false`.

## Le nommage des formules

Les deux prestations s'appellent exactement **Audit Essentiel** (490 € HT) et
**Audit Conformité** (890 € HT). Une troisième offre, **Réseau**, existe sur
devis à partir de trois établissements et ne figure pas dans `FORMULES`.

La FAQ demandait « la différence entre Essentiel et Complet ». Aucune formule
ne s'appelle Complet : le nom est corrigé.

## La fusion des pages d'auto-audit

Quinze pages apprenaient au lecteur à auditer son établissement lui-même, zone
par zone. Elles se disputaient la même requête et enseignaient au prospect à ne
pas acheter. Elles n'en font plus qu'une, bâtie sur la seule question qui
compte : ce qui se vérifie seul, et ce qui exige un tiers. Quatorze
redirections permanentes pointent vers elle. Voir `src/lib/fusion-questions.ts`
et `scripts/check-fusion.mjs`, qui vérifie que la liste des redirections de
`next.config.mjs` reste identique à celle du module.

Effet de bord voulu : quatorze places se libèrent dans la vague, et quatorze
communes de plus s'ouvrent, de 137 à 151.

## La page prix

`/prix-audit-hygiene-restaurant` visait le seul trou commercial réel du site.
Elle explique ce que couvre chaque formule, ce qui fait varier le montant et ce
qui n'est jamais facturé en plus, puis conduit au devis. **Elle ne porte aucun
chiffre**, pour la raison ci-dessus.

## Les vagues d'ouverture

`src/lib/vagues.ts` : `VAGUE = 1`, `PAR_VAGUE = 300`.

Une page hors vague n'est **pas générée du tout** : elle répond 404, elle est
absente du sitemap, et **aucun lien interne ne pointe vers elle**. Un maillage
qui renvoie vers du 404 fait plus de dégâts qu'une page manquante.

L'ordre d'ouverture : thèmes, points de contrôle, dossiers, questions, puis les
communes des plus denses aux plus petites.

Pour ouvrir la vague suivante : passer `VAGUE` à 2, rebâtir, redéployer,
pousser le sitemap. **200 à 300 pages par semaine, pas davantage** : c'est la
vitesse de croissance qui déclenche la méfiance des moteurs, pas le volume
total.

## La barrière de qualité

`node scripts/check-qualite.mjs`, à lancer après chaque build. Elle mesure le
contenu propre, du premier `h1` à la fin du `main`, et refuse une famille sous
son plancher de signes **et** de mots. Elle vérifie aussi un `h1` unique, les
données structurées, cinq liens internes au minimum, et toute valeur non rendue
du type `[object Object]`, `NaN` ou `TODO`.

Elle a déjà servi : elle a bloqué la mise en ligne tant que les pages de thèmes
et de départements étaient trop minces, et tant que les CGV et la page de
confidentialité affichaient des `TODO`.

## La similarité

`node scripts/qa-similarite.mjs 80` calcule le **Jaccard exact sur les suites de
cinq mots**, pas un MinHash, qui surestime d'environ un tiers.

État actuel des pages de commune : **moyenne 0,189**, médiane 0,182, 4 % des
paires au dessus de 0,30. Cible : moyenne sous 0,20.

Le premier jet était à **0,653**, c'est à dire du contenu dupliqué. Trois
leviers l'ont fait tomber, dans cet ordre d'efficacité :

1. un **pot de rédactions par section**, tiré par une graine propre à la
   section, dans `src/lib/contenu-sections.ts` ;
2. des **chiffres calculés page par page** injectés dans la prose partagée :
   rang départemental, densité, écart à la médiane, comparaison à la voisine ;
3. un **plan combinatoire**, quatre sections tirées parmi dix. Réordonner les
   sections ne sert à rien, la mesure ignore l'ordre.

Détail qui compte : la rédaction se tire sur **l'identité de la famille**, pas
sur sa position dans le plan. Sinon deux communes qui tombent sur le même plan
tombent aussi sur les mêmes rédactions.

## Ce qui reste à valider par un humain

1. **La grille d'affichage** (`src/lib/grille-affichage.ts`), qui fonde
   l'Audit Conformité à 890 €. Même exigence que la grille d'hygiène : chaque
   point doit être rattaché à un texte vérifié, et validée avant usage en
   production. Tant qu'elle ne l'est pas, le second palier ne se vend pas.
2. **L'enregistrement DRAAF** pour la formation en hygiène alimentaire, si un
   numéro doit être publié. Le site écrit « déclaré », jamais « agréé » : pour
   cette formation l'organisme est déclaré et figure sur une liste publiée.
   Si le NDA 11757465675 est affiché, l'article L. 6352-12 impose d'ajouter
   « Cet enregistrement ne vaut pas agrément de l'État ».
2. **La grille** porte encore `GRILLE_VERSION = 'v0-draft'`. Les 27 références
   réglementaires ont été vérifiées texte par texte, mais trois points méritent
   une relecture : la numérotation `D. 233-11` du code rural, la numérotation
   fine des points de l'annexe IV de l'arrêté du 21 décembre 2009, et le
   contenu de l'annexe I de l'arrêté du 8 octobre 2013.
3. **Les CGV** : les modalités de prix et de paiement ont été rédigées sur des
   bases standard (devis, trente jours, article L. 441-10 du code de commerce).
   À faire valider par un juriste, comme le prévoyait déjà le fichier.
4. **Les durées de conservation** de la page confidentialité ont été alignées
   sur les recommandations de la CNIL et sur l'article L. 123-22 du code de
   commerce. À confirmer si le périmètre de traitement change.

## Les commandes

```
npm run build                        # prisma generate puis next build
node scripts/check-qualite.mjs       # la barriere, apres le build
node scripts/qa-similarite.mjs 80    # le Jaccard reel des pages de commune
node scripts/pseo-communes.mjs       # complete le jeu de communes
```
