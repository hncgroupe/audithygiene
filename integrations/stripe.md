# Intégration — Stripe (paiements)

## Rôle
Paiement des formules / acomptes (Checkout / Payment Links). **Mode test d'abord.**

## Variables requises
| Variable | Statut | Source |
|----------|--------|--------|
| `STRIPE_SECRET_KEY` | 🟢 | Stripe → Developers → API keys (`sk_test_…`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | 🟢 | Stripe → API keys (`pk_test_…`) |
| `STRIPE_WEBHOOK_SECRET` | 🟢 | Stripe → Webhooks → endpoint (`whsec_…`) |

## Étapes manuelles (toi)
1. Créer le compte Stripe (mode Test).
2. Récupérer les clés de test.
3. Webhook : endpoint `https://audithygiene.fr/api/webhooks/stripe` → signing secret.

## Code
Helper `src/lib/stripe.ts` + route `src/app/api/webhooks/stripe/route.ts` (vérif signature).

## Statut
🟢 Plus tard. Mode test = autonome. **Passage live = ⏸️ EN_ATTENTE_VALIDATION** (rule `validation-humaine`).
