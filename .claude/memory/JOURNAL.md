# JOURNAL — audit hygiène

Journal chronologique des jalons. Entrée datée après chaque étape (voir rule `reports`).

## 2026-06-19 — Auth auditeurs + outil d'audit terrain (vision auditeur)
- Fait : auth Supabase branchée. Routes `/api/auth/login` + `/api/auth/logout` (session cookies httpOnly), form `/login` avec messages d'erreur, bouton déconnexion dans le shell app. Helper `getCurrentDbUser()` (mapping authId/email ↔ Prisma User).
- Fait : compte ADMIN `younes@crispysoul.fr` (Supabase Auth + record Prisma, role ADMIN). Script idempotent réutilisable `scripts/create-admin.ts`.
- Fait : outil d'audit terrain interactif (vision auditeur), bar haut de gamme orientée opérateur. `src/components/app/AuditConductor.tsx` (anneau de score live, rail thèmes = navigation, 4 boutons conformité, autosave debounce 700ms, commentaire inline si NC, CTA unique "Terminer"). Page `/app/audits/[id]`.
- Fait : API `POST /api/audits` (instancie les 27 items de la grille), `PATCH /api/audits/[id]` (recalcule notation + scores par thème + non-conformités/plan correctif, finalize). `POST /api/etablissements` (création rapide client+établissement). `StartAudit.tsx` (choix existant ou création + démarrage). Liste audits cliquable.
- Vérifié : typecheck OK, flux end-to-end (créer établissement → audit → patch → score 50 + 1 cas critique → page éditeur 200).
- Données : 1 établissement démo "Le Bistrot Démo" (75) + 1 audit démo en base.
- Suivant : générer le rapport PDF depuis un audit terminé (lib/pdf déjà présente), brancher photos (upload Supabase Storage), valider la grille réglementaire (TODO methodology-guard).

## 2026-06-19 — Adresse BAN, multi-emails rapport, photos offline-resilient
- Fait : autocomplétion adresse via Base Adresse Nationale (gratuit, sans clé) dans `NewAuditForm`. Sélection remplit adresse + ville + code postal (même bandeau) ; département dérivé du CP côté `POST /api/audits`.
- Fait : emails de réception du rapport multiples (petit bouton + à droite du champ, × pour retirer). Stockés sur `Audit.emailsRapport` (migration `audit_emails_rapport`), dédoublonnés + validés ; 1er = email du client.
- Fait : résilience photo hors-ligne (le "back de sauvetage"). `src/lib/photo-queue.ts` (file IndexedDB tolérante aux pannes). Dans `AuditWizard` : à la prise, aperçu instantané + blob persisté en IndexedDB (survit reload/fermeture/hors-ligne), upload en arrière-plan, moteur de sync relancé à l'ouverture + sur évènement `online` + toutes les 20 s. Réhydratation au reload. Vignette ⏳ en attente / ✓ enregistrée, chip "Hors-ligne" + "N photos en attente" dans l'en-tête, alerte non bloquante à "Terminer" si photos non synchronisées. Aucune photo perdue.
- Vérifié : typecheck OK ; pages 200 ; upload endpoint 200 ; multi-emails dédoublonnés/validés en base ; CP+département stockés.
- Suivant : génération PDF (photos + plan correctif) envoyée aux `emailsRapport` (Brevo) ; validation réglementaire de la grille.

## 2026-06-19 — Refonte outil d'audit en assistant pas-à-pas (UX opérateur)
- Fait : flux auditeur refondu en wizard 1 item/écran. Écran 0 = formulaire démarrage (nom resto, adresse, ville, type, date+heure, email réception rapport) → crée client+établissement+audit. `NewAuditForm.tsx`, page `/app/audits/nouveau`.
- Fait : `AuditWizard.tsx` (remplace AuditConductor). Par écran : thème + intitulé + explication, **encart "À expliquer au client"** (pédagogie, demande client présent), zone **photo** (capture mobile + galerie, upload Supabase Storage, vignettes/suppression), **boutons constats pré-remplis** (clic = pose conformité + remplit la note), **synthèse NC** (pourquoi + correctif) affichée à la sélection, notes éditables, nav Précédent/Suivant. Écran final = récap (score + plan correctif) + "Terminer". Anneau score live sticky.
- Fait : grille enrichie (`grille-audit.ts`) : `explication`, `pedagogie`, `constats[{label,conformite,pourquoi,correctif}]` sur les 27 items (génériques, TODO methodology-guard). `grilleByCode()`.
- Fait : API photo `POST/DELETE /api/audits/[id]/photo` (upload bucket privé `rapports`, URL signée 8 h). `POST /api/audits` accepte le payload resto complet. `PATCH` enrichit les non-conformités avec pourquoi+correctif issus des constats.
- Vérifié : typecheck OK ; end-to-end (form → audit, patch score 50 + 1 critique, upload photo HTTP 200 + URL signée, pages 200). Bucket `rapports` confirmé.
- Suivant : génération PDF (intégrer photos + plan correctif), envoi auto à l'email rapport (Brevo), validation réglementaire de la grille.

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
