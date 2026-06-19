# JOURNAL — audit hygiène

Journal chronologique des jalons. Entrée datée après chaque étape (voir rule `reports`).

## 2026-06-19 — Bootstrap initial
- Fait : `CLAUDE.md` (fichier maître) + `KIT_DE_CONNEXION.md` (liste complète des clés).
- Fait : configs repo — `.gitignore`, `.env.example`, `.mcp.json`, `README.md`, `SETUP_GUIDE.md`, `GROWTH_BOOTSTRAP_NEXT.md`. Git initialisé (branche `main`).
- Fait : `docs/` — BUSINESS_MODEL, STRATEGY, OBJECTIVES, REFERENCE + docs/channels.
- Fait : `.claude/rules/` — global, validation-humaine, label-prive-cadre-juridique, no-fake-content, rgpd-fr, methodology-guard, reports.
- Fait : `.claude/memory/` initialisée.
- Suivant : skills, agents, bootstrap.md, integrations, init Next.js + Prisma, site vitrine.
- ⏸️ En attente : clés 🔴 (Supabase, Vercel, confirmation domaine IONOS). Construction du code non-secret en cours en parallèle.

## 2026-06-19 — Site vitrine + app opérationnelle (fondations)
- Fait : skills (21), agents (15 + _inactive), integrations (10).
- Fait : Next.js 15 + Tailwind 3.4 + Prisma 6 — schéma DB complet, clients lib (env, prisma, supabase, telegram, brevo, stripe), constants marque/zones, grille audit (v0-draft), notation, validation zod, schema.org.
- Fait : **site vitrine** — hero, déroulé, formules, RDV, FAQ ; pages locales IDF (8 départements en SSG) ; mentions/confidentialité/CGV ; robots.ts, sitemap.ts, llms.txt (GEO).
- Fait : **lead capture** — `/api/lead` → DB (si configurée) + Telegram + Brevo, honeypot, consentement RGPD obligatoire.
- Fait : **app opérationnelle (fondations)** — middleware sous-domaine `app.`, shell protégé (getCurrentUser Supabase), dashboard, listes leads/audits/établissements, login (placeholder auth), génération PDF `@react-pdf/renderer` à la marque + upload Supabase Storage.
- Build : **OK** (20 routes, 8 pages SSG départements, middleware actif).
- Reste (TODO) : outil de saisie terrain item-par-item + photos ; branchement réel auth Supabase ; déploiement Vercel (dépend des clés).
- ⏸️ En attente : clés 🔴 + validation grille réglementaire + go-live public.
