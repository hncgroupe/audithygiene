# Skill — lifecycle-email-transactional

## But
Gérer les emails transactionnels du cycle de vie : confirmation RDV, rappel, envoi du rapport PDF.

## Quand l'utiliser
- Implémenter un email déclenché par un événement (lead, RDV, audit).

## Méthode
1. **Événements** :
   - Lead reçu → accusé de réception + prochaines étapes.
   - RDV confirmé → date, lieu, préparation conseillée.
   - Rappel J-1 → confirmation présence.
   - Audit terminé → envoi du **rapport PDF** (lien signé) + plan correctif résumé.
   - Rappel prochain audit recommandé.
2. **Implémentation** : Brevo transactionnel via route handler, templates à la marque.
3. **Fiabilité** : retries, logs, idempotence (pas de double envoi).

## Garde-fou
- Transactionnel ≠ marketing : pas besoin d'opt-in marketing, mais rester strictement lié au service.
- Lien PDF toujours via URL signée (skill `pdf-report-generation`).
