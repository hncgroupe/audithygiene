# Skill — contract-fr-prestation

## But
Préparer les documents contractuels (devis, CGV, contrat de prestation) et le flux de signature Yousign.

## Quand l'utiliser
- Générer/structurer un devis, des CGV, un contrat ; câbler la signature.

## Méthode
1. **Devis** : prestation, périmètre, prix, durée de validité, conditions.
2. **CGV** : objet, obligations, prix/paiement, délais, responsabilité, données (RGPD), résiliation, droit applicable (français).
3. **Contrat de prestation** : périmètre de l'audit, livrable (rapport), confidentialité, propriété, limites (label privé, pas de garantie officielle).
4. **Signature** : flux Yousign (sandbox d'abord), envoi, suivi, archivage.

## Garde-fou
- ⏸️ Tout document **engageant juridiquement** = validation humaine avant envoi (rule `validation-humaine`).
- Mention obligatoire : label privé, pas de certification officielle (rule `label-prive-cadre-juridique`).
- Faire relire par un juriste avant usage réel (`TODO` — ne pas présenter comme conseil juridique).
