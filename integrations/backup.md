# Intégration — Backup & restauration

## Rôle
Protéger le code, la documentation, la mémoire et la base de données.

## Périmètre
| Élément | Méthode | Fréquence |
|---------|---------|-----------|
| Code | Push Git sur remote (GitHub) | à chaque jalon |
| `docs/`, `.claude/memory/` | versionnés dans Git | continu |
| Base de données | Sauvegarde Supabase (auto) + export manuel `pg_dump` | quotidien (Supabase) / avant migration |
| PDF (Storage) | Supabase Storage (redondé) | continu |

## Étapes manuelles (toi)
1. Créer le repo distant GitHub `audithygiene` (privé).
2. `git remote add origin <url>` puis `git push -u origin main`.
3. Vérifier les sauvegardes automatiques Supabase (plan).

## Restauration
- Code : `git clone` + `.env.local` reconstitué depuis `KIT_DE_CONNEXION.md`.
- DB : restauration depuis snapshot Supabase ou `pg_restore`.

## Garde-fou
- **Jamais** de secret poussé sur le remote (`.env.local` ignoré).

## Statut
🟠 À configurer (remote Git). Autonome.
