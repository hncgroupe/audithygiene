# Intégration — Brevo (emails)

## Rôle
Emails transactionnels (confirmation RDV, rappel, envoi rapport PDF) + marketing opt-in (RGPD).

## Variables requises
| Variable | Statut | Source |
|----------|--------|--------|
| `BREVO_API_KEY` | 🟠 | Brevo → SMTP & API → API Keys |
| `BREVO_SENDER_EMAIL` | 🟠 | adresse vérifiée (`contact@audithygiene.fr`) |
| `BREVO_SENDER_NAME` | 🟠 | `audit hygiène` |

## Étapes manuelles (toi)
1. Créer le compte Brevo.
2. Authentifier le domaine : SPF, DKIM, DMARC chez **Cloudflare** (zone `audithygiene.fr`, valeurs fournies par Brevo).
   ⚠️ Compte Brevo actuellement rattaché à `contact@hncgroupe.fr` — pour envoyer depuis `contact@audithygiene.fr`, vérifier d'abord ce domaine/expéditeur.
3. Créer la clé API.

## Code
Helper `src/lib/brevo.ts` (API transactionnelle). Route handlers déclenchent les envois.

## Statut
🟠 À configurer. Envoi transactionnel = autonome. **Envoi de masse marketing = ⏸️ EN_ATTENTE_VALIDATION.** RGPD strict (rule `rgpd-fr`).
