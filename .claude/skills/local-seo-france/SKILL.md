# Skill — local-seo-france

## But
Dominer le SEO local en Île-de-France : pages par département et ville, Google Business Profile, signaux NAP.

## Quand l'utiliser
- Générer l'arborescence de pages locales.
- Optimiser pour les recherches géolocalisées.

## Méthode
1. **Arborescence** : `/audit-hygiene-restaurant/[departement]` (75, 92, 93, 94, 77, 78, 91, 95) + `/audit-hygiene-restaurant/[ville]` (Paris par arrondissements + grandes villes — voir `docs/REFERENCE.md`).
2. **Contenu unique par page** : spécificités locales réelles (zones, types d'établissements, contexte), pas de gabarit dupliqué. Variabiliser intelligemment, jamais du copier-coller.
3. **Schema `LocalBusiness`** géolocalisé par page (areaServed = zone).
4. **NAP cohérent** : nom, (zone, pas forcément adresse si déplacement), téléphone identiques partout.
5. **Google Business Profile** : fiche zone IDF, catégorie service d'audit/conseil, posts réguliers.
6. **Maillage** : page nationale ↔ départements ↔ villes.

## Garde-fou
- Zéro duplication (pénalité SEO + qualité). Si une ville n'a pas de contenu réel, ne pas publier de page creuse.
- Pas de fausse adresse ni faux avis local (rule `no-fake-content`).
