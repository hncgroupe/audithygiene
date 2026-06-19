# Intégration — Telegram (notifications)

## Rôle
Alertes temps réel : nouveau lead, nouveau RDV, audit terminé, paiement reçu.

## Variables requises
| Variable | Statut | Source |
|----------|--------|--------|
| `TELEGRAM_BOT_TOKEN` | 🟠 | @BotFather à la création du bot |
| `TELEGRAM_CHAT_ID` | 🟠 | via `getUpdates` ou @userinfobot |

## Étapes manuelles (toi)
1. Telegram → @BotFather → `/newbot` → nom + username `…bot`.
2. Récupérer le token.
3. Écrire un message au bot, puis `https://api.telegram.org/bot<token>/getUpdates` → `chat.id`.

## Code
Helper `src/lib/telegram.ts` → `sendMessage`. Appelé après lead/RDV/audit/paiement. Échec non bloquant.

## Statut
🟠 À configurer. Autonome (pas d'argent ni de masse).
