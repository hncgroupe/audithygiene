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

## 2026-06-19 — Intégrations live + tunnel vérifié + UX/SEO
- **DB Supabase** : migration `init` appliquée (eu-central-1, pooler aws-1), CRUD testé.
- **Brevo** : domaine `audithygiene.fr` vérifié, email transactionnel réel envoyé OK (plan gratuit ~300/j).
- **Telegram** : bot + chat_id branchés, notif réelle envoyée OK.
- **Tunnel end-to-end vérifié** : POST `/api/lead` → écriture DB + notif Telegram + Brevo. Lead de test créé puis nettoyé.
- **DNS** : Cloudflare (zone audithygiene.fr), doc mise à jour.
- **Anti-IA** : suppression de tous les tirets longs (rule `no-tiret-long`).
- **UX** : composant `Reveal` (scroll, reduced-motion, filet anti-blanc), jauge de score animée (signature), copy humanisée. Rendu validé par capture Playwright.
- **SEO/GEO** : OG image générée, manifest, favicon (en plus de schema.org/sitemap/robots/llms.txt).
- **Vercel CLI** installé (disque saturé nettoyé, 4,4 Go libérés).
- ⏸️ Reste : formules/prix réels ; validation grille.

## 2026-06-19 — Déploiement Vercel LIVE
- Compte : **hncgroupe** (équipe `hncgroupes-projects`). Projet `audithygiene`. (Projet vide créé par erreur sur l'ancienne équipe bac-graisse, supprimé/abandonné.)
- 15 variables d'env poussées (production + preview + development).
- Déploiement READY : **https://audithygiene-gamma.vercel.app**
- Smoke test : home, /zones, /zones/paris, llms.txt, sitemap.xml, opengraph-image -> tous 200.
- **Tunnel lead testé en PRODUCTION réelle** : POST live -> écriture DB confirmée + Telegram + Brevo. Nettoyé.
- Domaine connecté ensuite (voir entrée go-live ci-dessous).

## 2026-06-19 — GO-LIVE domaine public (validé par le client)
- Client a donné le "go" pour connecter `audithygiene.fr`.
- Domaines `audithygiene.fr` + `app.audithygiene.fr` ajoutés au projet Vercel.
- DNS Cloudflare (zone active, NS elle/pablo) : 2 records `A -> 76.76.21.21` en **DNS only** (gris). Anciens records IONOS en conflit supprimés (`A 217.160.0.162`, `AAAA 2001:8d8:...`).
- Token Cloudflare fourni = lecture seule (403 sur DNS edit) -> records faits manuellement par le client.
- Certificats SSL émis (app auto, apex via `vercel certs issue`).
- **LIVE vérifié** : https://audithygiene.fr (200, pages + sitemap OK), https://app.audithygiene.fr (307 -> login). SSL OK.
- Brevo : records DKIM/DMARC/TXT déjà présents dans Cloudflare (domaine vérifié).
- Note : accès R2 fournis (clé S3 + endpoint `0f46...r2.cloudflarestorage.com`) -> option future pour stocker les PDF au lieu de Supabase Storage. Non branché.
- ⏸️ Reste (contenu, pas technique) : formules + prix réels ; validation grille d'audit.
