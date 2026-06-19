# Skill — email-workflows

## But
Concevoir les séquences email (lead nurturing, relance, post-audit) opt-in.

## Quand l'utiliser
- Créer une séquence ou un email automatisé marketing.

## Méthode
1. **Cartographier les déclencheurs** : nouveau lead non converti, RDV pris, audit réalisé, renouvellement à venir.
2. **Séquences** : bienvenue/qualification, réassurance (méthode, exemple rapport), relance douce, rappel audit annuel.
3. **Opt-in** : marketing uniquement avec consentement (rule `rgpd-fr`). Désinscription dans chaque email.
4. **Contenu** : valeur d'abord (conseils hygiène), CTA RDV. Ton de marque.
5. **Outil** : Brevo (skill `email-deliverability-rgpd-fr`).

## Garde-fou
- ⏸️ Envoi de masse = validation humaine (rule `validation-humaine`).
- Pas de prospection à froid non conforme. Pas de fausse promesse.
