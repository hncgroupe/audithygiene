# Intégration — Stockage des fichiers (PDF)

## Rôle
Stocker les rapports PDF générés, avec accès sécurisé.

## Solution retenue : Supabase Storage
| Variable | Statut | Source |
|----------|--------|--------|
| `SUPABASE_STORAGE_BUCKET` | 🟠 | `rapports` |
| (réutilise `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`) | | voir `database.md` |

## Étapes manuelles (toi)
1. Supabase → Storage → New bucket `rapports` → **Private**.

## Accès & sécurité
- Bucket **privé**. Accès via **URL signée** à durée limitée (générée côté serveur).
- Jamais d'URL publique permanente pour un rapport client.

## Rétention
- `TODO` durée de conservation à valider (RGPD). Suppression sur demande d'effacement.

## Alternatives documentées
- **Vercel Blob** (`BLOB_READ_WRITE_TOKEN`, supporte privé) ou **Cloudflare R2** — basculer si besoin.

## Statut
🟠 À configurer (inclus dans Supabase). Autonome.
