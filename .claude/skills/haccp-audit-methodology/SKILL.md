# Skill — haccp-audit-methodology

## But
Définir et maintenir la méthode d'audit hygiène : structure de la grille, ancrage réglementaire, notation, cas critiques, plan correctif. C'est le cœur du produit.

## Quand l'utiliser
- Construire/modifier la grille d'audit ou le schéma des items.
- Concevoir la logique de notation et de détection des cas critiques.
- Rédiger le contenu réglementaire d'un thème.

## Méthode
1. **Structure par thèmes** (voir `docs/REFERENCE.md`) : chaîne du froid, températures/cuisson, traçabilité/DLC, hygiène personnel, nettoyage/désinfection, nuisibles, stockage/marche en avant, locaux/équipements, déchets, PMS, allergènes, eau/glace.
2. **Item = question rattachée à un point réglementaire** (Paquet hygiène CE 852/2004, principes HACCP, PMS, GBPH). Champs : id, thème, intitulé, référence réglementaire, type de réponse (conforme/NC mineure/NC majeure-critique/NA), pondération, aide auditeur, photo requise (oui/non).
3. **Notation** : score par thème (somme pondérée des items) + score global /100. Documenter la formule.
4. **Cas critiques** : tout item marqué NC majeure = cas critique, listé à part, non compensable par la note.
5. **Plan correctif** : pour chaque NC → action recommandée + priorité (haute/moyenne/basse) + délai conseillé. Date du prochain audit recommandé.
6. **Versionner la grille** : chaque audit conserve la version utilisée.

## Garde-fou
- Tout contenu réglementaire précis reste `TODO` jusqu'à validation client/expert (rule `methodology-guard`).
- Jamais minimiser un cas critique. Jamais inventer une référence réglementaire (rule `no-fake-content`).
- Pas de promesse de réussite à un contrôle officiel (rule `label-prive-cadre-juridique`).
