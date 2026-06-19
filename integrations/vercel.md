# Intégration — Vercel

## Rôle
Hébergement et déploiement du monorepo Next.js. Preview automatique par commit ; production sur validation.

## Variables requises
| Variable | Statut | Source |
|----------|--------|--------|
| `VERCEL_TOKEN` | optionnel (CI) | vercel.com → Settings → Tokens |
| `VERCEL_ORG_ID` | optionnel | `vercel link` ou Project Settings |
| `VERCEL_PROJECT_ID` | optionnel | `vercel link` ou Project Settings |

Les variables runtime (Supabase, Brevo, etc.) sont poussées via `vercel env` ou l'UI Vercel.

## Étapes manuelles (toi)
1. Créer le compte Vercel (via GitHub recommandé).
2. `npm i -g vercel` → `vercel login` → `vercel link`.
3. Ajouter les domaines : `audithygiene.fr`, `app.audithygiene.fr`, `audithygiene.com`.
4. Configurer le DNS chez IONOS (voir `integrations/` + KIT §1).
5. Pousser les variables d'environnement.

## Domaines & redirection
- `audithygiene.fr` → site (route group `(marketing)`).
- `app.audithygiene.fr` → app (route group `(app)`).
- `audithygiene.com` → **redirection 301** vers `audithygiene.fr` (config Vercel / middleware).

## Statut
🔴 À configurer. **Go-live prod = ⏸️ EN_ATTENTE_VALIDATION.** Preview = autonome.
