# Skill — telegram-automation

## But
Notifier en temps réel les événements clés via un bot Telegram.

## Quand l'utiliser
- Câbler/modifier les alertes (nouveau lead, RDV, audit terminé, paiement).

## Méthode
1. **Bot** : créé via @BotFather, token en `TELEGRAM_BOT_TOKEN`, destinataire `TELEGRAM_CHAT_ID` (voir KIT §4).
2. **Envoi** : `sendMessage` via `https://api.telegram.org/bot<token>/sendMessage` depuis un helper serveur (`src/lib/telegram.ts`).
3. **Événements** : nouveau lead (nom, ville, type, formule), nouveau RDV (date), audit terminé (établissement, score), paiement reçu (montant).
4. **Format** : message court, lisible, avec lien back-office si pertinent.
5. **Robustesse** : échec Telegram ne doit jamais bloquer l'action principale (try/catch, log).

## Garde-fou
- Token uniquement côté serveur, jamais exposé.
- Pas de donnée sensible client au-delà du nécessaire (RGPD : minimisation).
