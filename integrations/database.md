# Intégration — Base de données (Supabase / Postgres)

## Rôle
Postgres (données métier) + Auth auditeurs + Storage PDF. ORM Prisma.

## Variables requises
| Variable | Statut | Source |
|----------|--------|--------|
| `DATABASE_URL` | 🔴 requis | Supabase → Database → Connection string (pooler 6543) |
| `DIRECT_URL` | 🔴 requis | Supabase → Database (directe 5432, migrations) |
| `NEXT_PUBLIC_SUPABASE_URL` | 🔴 requis | Supabase → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 🔴 requis | Supabase → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | 🔴 requis (serveur) | Supabase → API → service_role |

## Schéma (Prisma)
Tables : `User` (auditeurs, rôle admin/auditeur), `Lead`, `Appointment` (RDV), `Client`, `Establishment`, `Audit`, `AuditItem`, `Score`, `NonConformity`, `Report`, `Payment`. Voir `prisma/schema.prisma`.

## Étapes manuelles (toi)
1. Créer le projet Supabase (région EU).
2. Récupérer les 5 variables → `.env.local`.
3. Créer le bucket Storage `rapports` (privé).
4. Côté code : `npx prisma migrate dev`.

## Statut
🔴 Bloquant. Schéma Prisma posé en autonomie ; migrations à appliquer dès réception des clés.
