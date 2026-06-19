# Skill — email-deliverability-rgpd-fr

## But
Assurer délivrabilité et conformité RGPD des emails (Brevo).

## Quand l'utiliser
- Configurer le domaine d'envoi, gérer consentement et désinscription.

## Méthode
1. **Authentification domaine** : SPF, DKIM, DMARC sur `audithygiene.fr` (chez IONOS, valeurs fournies par Brevo).
2. **Expéditeur cohérent** : `contact@audithygiene.fr`, nom « audit hygiène ».
3. **Consentement tracé** : opt-in marketing horodaté ; transactionnel séparé.
4. **Désinscription** : lien dans chaque email marketing, traitement des bounces/plaintes.
5. **Listes propres** : pas d'achat de listes, pas d'import non consenti.
6. **Warm-up** progressif si volume.

## Garde-fou
- RGPD strict (rule `rgpd-fr`). Pas de liste achetée, pas d'envoi non consenti.
- ⏸️ Campagne de masse = validation humaine.
