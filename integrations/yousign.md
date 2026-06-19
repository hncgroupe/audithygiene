# Intégration — Yousign (signature électronique)

## Rôle
Signature électronique des devis, CGV, contrats de prestation (acteur français, RGPD).

## Variables requises
| Variable | Statut | Source |
|----------|--------|--------|
| `YOUSIGN_API_KEY` | 🟢 | Yousign → Settings → API |
| `YOUSIGN_API_URL` | 🟢 | sandbox : `https://api-sandbox.yousign.app/v3` / prod : `https://api.yousign.app/v3` |

## Étapes manuelles (toi)
1. Créer le compte Yousign, demander l'environnement Sandbox.
2. Générer la clé API.

## Code
Helper `src/lib/yousign.ts` : création de procédure, envoi document, suivi de signature, archivage.

## Statut
🟢 Plus tard. Sandbox = autonome. **Envoi d'un document engageant = ⏸️ EN_ATTENTE_VALIDATION** (rule `validation-humaine`).
