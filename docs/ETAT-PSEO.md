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

La cause tient en un chiffre, mesuré sur le HTML rendu du build : **96 pages
n'étaient atteignables par aucun lien depuis l'accueil**, et 134 pages de
commune se trouvaient à quatre ou cinq clics. L'en-tête ne portait que cinq
liens et le pied de page onze : `/audit-hygiene`, `/dossiers` et
`/points-de-controle` n'avaient aucun lien entrant depuis le reste du site.
Elles n'existaient que dans le sitemap. Google les explorait une fois et les
laissait dehors.

Trois autres écarts s'y ajoutaient :

- les trois pages légales portaient `index: false` **et** figuraient au
  sitemap, ce qui est une instruction contradictoire ;
- le gabarit de titre ajoutait « | audit hygiène » à chaque page, soit seize
  caractères : **330 titres sur 351 dépassaient soixante caractères** ;
- la méta description des 137 communes promettait « Contre-visite comprise »,
  alors que la contre-visite ne fait pas partie de la prestation.

Après correction, mesuré sur le même build : **zéro page inatteignable**, toutes
à un ou deux clics de l'accueil, **7 titres trop longs** au lieu de 330, et
**287 URL au sitemap, toutes indexables, aucune en noindex**.

## Ce qui entre dans l'index, et ce qui n'y entre pas

`src/lib/indexation.ts` porte la règle. Deux états seulement, jamais
d'intermédiaire : une page est au sitemap et indexable, ou elle porte un
`noindex` assumé et sort du sitemap.

Les 44 points de contrôle et les 17 thèmes sont **hors index**. Ce sont les
intitulés internes de la grille : personne ne cherche « séparation cru cuit
respectée ». Ils sont les plus minces du site (784 et 774 mots médians), ils
n'ont aucune intention d'achat, et ils se disputent le sujet des dossiers de
fond, trois à quatre fois plus longs. Dix URL traitent des allergènes, douze de
la chaîne du froid. Ils restent publiés, maillés et explorables, parce qu'ils
portent les références réglementaires point par point et que c'est la preuve du
sérieux du cabinet.

Pour les réintégrer : les retirer de `FAMILLES_HORS_INDEX`, rebâtir, resoumettre
le sitemap.

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
