# Brief de rédaction, audithygiene.fr

À lire en entier avant d'écrire une ligne. Ces règles ne sont pas des
préférences de style : chacune vient d'une erreur déjà commise ou d'un risque
juridique réel.

## Ce que vend le cabinet

Un auditeur se déplace dans un établissement de restauration, contrôle sur
place les **27 points réglementaires** de la grille répartis en **12 thèmes**,
en toute discrétion. Il remet un **rapport complet** avec une note, les constats
point par point et un **plan d'action** classé par priorité, qui dit pour chaque
écart ce qu'il faut faire.

**La prestation s'arrête là.** L'exploitant applique ensuite les correctifs
lui-même, à son rythme et avec ses propres moyens. Le cabinet ne repasse pas
vérifier, ne suit pas le chantier, ne fait pas les travaux et ne vend rien
d'autre.

C'est pour cela que le plan d'action doit être exploitable seul : écrit en
français courant, avec le correctif attendu et la preuve à constituer pour
chaque point. Un rapport que l'exploitant ne peut pas appliquer sans nous serait
un rapport raté.

Le cabinet intervient **partout en Île-de-France**, dans les huit départements.

## Le registre : rassurer

Le lecteur arrive inquiet. La page doit faire baisser cette inquiétude, jamais
l'alimenter.

- Un contrôle officiel est un acte de routine, pas une sanction.
- La plupart des écarts sont des habitudes prises faute de temps, pas des
  fautes, et se corrigent en quelques jours sans dépense.
- Les équipes ne sont jamais mises en cause : un geste à corriger l'est parce
  que personne ne l'a expliqué.
- On peut appeler sans être irréprochable. C'est même le seul cas utile.

**Interdit** : le vocabulaire de la peur (risque de fermeture, amende, sanction
brandie en accroche), les chiffres de fermetures ou de contrôles, tout ce qui
transforme une page d'aide en argument commercial anxiogène.

## La promesse, et sa limite

On écrit : **« avec nous, vous savez exactement quoi corriger »**, et la
conformité vient quand l'exploitant a traité la liste.

Formulation juste : « vous repartez avec la liste complète de ce qui est à
reprendre et le correctif attendu pour chacun ». Formulation fausse : « nous
revenons vérifier », « nous vous accompagnons jusqu'à la clôture », « le
dossier reste ouvert tant qu'un point subsiste ». **Il n'y a pas de
contre-visite, pas de suivi, pas de clôture de dossier.** Ne l'écris nulle
part, sous aucune formulation.

On n'écrit **jamais** que le client passera un contrôle officiel, ni qu'il est
« certifié », « agréé » ou « garanti conforme par l'État ». L'issue d'un
contrôle appartient aux services de l'État. Promettre l'inverse est un
engagement intenable et se retourne au premier contrôle.

Mention à rappeler quand le sujet s'y prête : audit hygiène est un **label privé
indépendant**, ni certification officielle, ni agrément d'État, ni contrôle des
services vétérinaires.

## Hors périmètre absolu

- **La formation à l'hygiène alimentaire.** Un autre site du groupe la vend.
  On peut dire qu'une personne formée doit figurer à l'effectif et que
  l'attestation est demandée en visite. On ne vend pas la formation, on ne la
  décrit pas, on ne renvoie pas vers un organisme nommé.
- **Le CPF**, jamais mentionné, sous aucun angle.
- **Les prix et les durées d'audit.** Les formules sont encore `TODO` dans
  `src/lib/constants.ts`. On écrit « le devis est établi avant intervention,
  après un échange de quelques minutes » et on renvoie à `/contact`.

## Exactitude réglementaire

- Toute référence citée porte **son numéro et sa date** : règlement (CE)
  n° 852/2004 du 29 avril 2004, arrêté du 21 décembre 2009, règlement (UE)
  n° 1169/2011 du 25 octobre 2011, règlement (UE) 2017/625.
- **Aucune sanction chiffrée, aucun montant, aucun délai réglementaire
  inventé, aucune statistique de contrôle.** Ces chiffres n'existent pas
  publiquement par commune ni par activité.
- Ce qui relève de l'appréciation de l'agent ou de la DDPP est écrit comme tel.
- Distinguer systématiquement **ce qu'un texte impose** de **ce qui relève de
  la bonne pratique professionnelle**. Beaucoup d'exigences réputées légales
  n'en sont pas : le plan de nettoyage écrit, le contrat de dératisation, la
  poubelle à pédale, la marche en avant comme notion juridique, la durée
  d'archivage des relevés. Un exploitant qui invoque devant un agent une règle
  qui n'existe pas perd sa crédibilité sur le reste de la visite.
- Piège fréquent : les seuils de refroidissement (+63 °C à +10 °C en deux
  heures) et de remise en température viennent de l'**annexe IV de l'arrêté du
  21 décembre 2009, qui ne vise que la restauration collective**. Un restaurant
  en remise directe n'y est pas soumis ; ce sont des références à reprendre
  dans le plan de maîtrise sanitaire, pas des obligations.
- Le « plan de maîtrise sanitaire » n'est pas une notion du règlement européen.
  Le contenu type vient de l'annexe II de l'arrêté du 8 juin 2006, qui vise les
  établissements soumis à agrément. Un restaurant en remise directe reste tenu
  des articles 4 et 5 du règlement 852/2004.
- Si la source exacte d'une règle n'est pas certaine : énoncer la règle sans la
  sourcer, ou ne pas l'énoncer. **Jamais de référence inventée.**

## Style

- **Aucun tiret cadratin ni demi-cadratin**, nulle part. Ni `—` ni `–`. Une
  virgule, un deux-points ou un point font le travail.
- Pas de listes à puces déguisées en paragraphes. Des phrases pleines.
- Pas de superlatifs commerciaux, pas de « n'hésitez pas », pas de « dans un
  monde où ».
- Le vouvoiement, toujours.
- Écrire pour quelqu'un qui tient une cuisine, pas pour un juriste : le texte
  se cite, il ne se paraphrase pas en jargon.

## Maillage interne

Chemins réels utilisables :

- `/` , `/methode` , `/contact` , `/zones` , `/faq` , `/a-propos`
- `/points-de-controle` et `/points-de-controle/<slug>` (27 pages, slug issu de
  l'intitulé du point, voir `src/lib/familles.ts`)
- `/themes/<slug>` (12 pages)
- `/zones/<departement>/<commune>` (pages de commune)
- `/questions/<slug>` (70 pages, voir `src/data/questions-pseo.ts`)
- `/blog/<slug>` (voir `src/content/blog`)

**Ne jamais inventer un chemin.** Un lien mort coûte plus qu'un lien manquant.
En cas de doute, vérifier que le slug existe dans le fichier cité.

## Vérification avant de rendre

1. `node -e "..."` ou lecture directe : le fichier parse en TypeScript.
2. Aucun `—` ni `–` dans le fichier.
3. Aucun prix, aucune durée d'audit, aucun montant de sanction.
4. Aucune mention de formation vendue, aucun CPF.
5. Chaque chemin interne cité existe réellement.
