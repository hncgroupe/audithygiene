# audit hygiène

Cabinet d'audit **hygiène & HACCP** pour restaurants et CHR en Île-de-France. Un auditeur se déplace, contrôle l'établissement avec un outil interne basé sur la réglementation, puis délivre un **rapport PDF** complet (notation, cas critiques, plan correctif).

> **Label privé de qualité** — indépendant. audit hygiène n'est **pas** une certification officielle de l'État ni un contrôle des services vétérinaires/DDPP. Voir `.claude/rules/label-prive-cadre-juridique.md`.

## Deux briques

| Brique | Domaine | Rôle |
|--------|---------|------|
| Site vitrine | `audithygiene.fr` | Acquisition — SEO/GEO maximum, tunnel de conversion |
| App opérationnelle | `app.audithygiene.fr` | Production — grille d'audit, notation, rapport PDF |

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Prisma · Supabase (Postgres + Auth + Storage) · Brevo · Telegram · Stripe · Yousign · Vercel.

## Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement (voir KIT_DE_CONNEXION.md)
cp .env.example .env.local
#   puis remplir .env.local — JAMAIS commiter ce fichier

# 3. Base de données
npx prisma generate
npx prisma migrate dev

# 4. Lancer en dev
npm run dev
```

Site : http://localhost:3000 · App : http://localhost:3000/app (protégée).

## Structure

```
src/app/(marketing)/   → site vitrine audithygiene.fr
src/app/(app)/         → app opérationnelle app.audithygiene.fr (auth)
src/components/         → composants UI à la marque
src/lib/               → clients brevo, telegram, stripe, supabase, pdf
prisma/                → schéma + migrations
integrations/          → doc de chaque intégration
docs/                  → business, stratégie, objectifs, référence
.claude/               → agents, skills, rules, memory
```

## Documents clés

- `CLAUDE.md` — fichier maître (identité, règles, stack, cadre juridique).
- `KIT_DE_CONNEXION.md` — toutes les clés à fournir.
- `SETUP_GUIDE.md` — guide pas-à-pas du branchement.
- `GROWTH_BOOTSTRAP_NEXT.md` — feuille de route growth après la mise en ligne.

## Règle d'or

Claude prépare et propose. L'humain valide les actions à risque : **dépense réelle**, **envoi de masse**, **go-live public**, **engagement juridique**. Marquées `⏸️ EN_ATTENTE_VALIDATION`.
