# JOURNAL — audit hygiène

Journal chronologique des jalons. Entrée datée après chaque étape (voir rule `reports`).

## 2026-06-23 — Resto360 wizard : photos instantanées + saisie note corrigée
- Fait : photos quasi instantanées. `addPhoto` compresse côté client (`compressImage`), affiche l'aperçu tout de suite (object URL), upload en arrière-plan sans bloquer. Filet IndexedDB (`enqueuePhoto`) + drainer `drainPhotos` qui renvoie les photos échouées au montage et à chaque retour de connexion. Plus de verrou `uploading` global. Règle « doit reprendre 3-4 fois » : la photo apparaît immédiatement et reste en file tant qu'elle n'est pas confirmée.
- Fait : indicateur d'enregistrement par vignette. Coche verte `✓` (#10B981) quand le serveur confirme, spinner orange pendant l'envoi, `↻` ambre si à renvoyer. Libellé « Photos (n) » sous chaque question.
- Fix : saisie de note qui partait « à l'envers ». Cause racine : `CritereRow` était un composant imbriqué (`<CritereRow/>`) redéfini à chaque rendu, donc React remontait le sous-arbre à chaque frappe → curseur du textarea remis à 0. Converti en fonction de rendu appelée en ligne `renderCritere({...})` (clé sur le `<div>` racine) → éléments hôtes stables, réconciliés, plus de remount.
- Fichiers : `src/components/app/Resto360Wizard.tsx` (photo-queue branché), `src/lib/photo-queue.ts` (déjà présent, désormais utilisé).
- Vérifié : `tsc --noEmit` OK, `next build` OK. Test UI live non joué (wizard derrière auth Supabase + Storage, pas de session dispo dans l'env).
- Suivant : test manuel sur tablette connectée (login auditeur) ; valider l'aperçu hors-ligne après rechargement.

## 2026-06-23 — Resto360 : info conformité, notation sévère, hors-ligne, envoi PDF
- Fait : icône (i) par critère réglementaire (conforme / non conforme + base de règle). Nouvelles questions : rangement du froid, stockage viande-volaille, poisson, fiches recettes, optimisation plateformes livraison, caisse/clôtures/encaissements.
- Fait : notation sévère. Critères critiques (ceux avec info) comptent double dans le pilier ; malus global (note 1 = -6, note 2 = -3) et plafond à 49 si un critique est noté 1. `casCritiquesResto`, `CRITIQUE_IDS`, section « Cas critiques » en tête de rapport. Méthode documentée dans `grille-resto360.ts`.
- Fait : reprise + hors-ligne. Cache local complet (localStorage) des réponses, file d'envoi persistée, flush à la sortie + passage arrière-plan (keepalive) + retour de connexion + filet 20 s, indicateur « Hors ligne / à synchroniser », pilier mémorisé, upsert des critères ajoutés après démarrage. Purge du cache à la finalisation.
- Fait : PDF resto360 (`Resto360Document.tsx`, react-pdf) — récap 1re page (score, cas critiques, plan, quick wins), page 2 dirigeant + photos. Route `POST /rapport/send` + bouton « Envoyer le rapport (PDF) ». Brevo étendu (pièces jointes + destinataires multiples). Copie interne younes@/oumeima@.
- Vérifié : `tsc` OK, `next build` OK. Test réel `scripts/test-rapport-send.ts` (remplissage aléatoire) : PDF 14 Ko + email envoyé aux 2 adresses, score 49/100 (plafonné par 1 cas critique). 4 déploiements prod sur audithygiene.fr.
- Note : tsx exige `--tsconfig scripts/tsconfig.json` (jsx react-jsx) pour rendre react-pdf hors Next.
- Suivant : Google Doc (⏸️ nécessite identifiants API Google) ; brancher l'envoi sur les vrais destinataires client ; valider la grille avec le client.

## 2026-06-23 — Resto360 wizard : notes, checklists, photos par question, ajout libre
- Fait : grille resto360 enrichie (`grille-resto360.ts` v2). Chaque critère = objet `{label, aide, checklist?}` ; abréviations expansées partout (PMS, DLC, DDM, FIFO, HACCP, KPI, DPAE, Food Cost, upselling, PMR). Helpers `critereLabel/Aide/Checklist`, type `CritereInput` (compat string).
- Fait : explication 1 ligne (`aide`) affichée sous chaque intitulé dans le wizard.
- Fait : checklists cochables au fil de l'eau. P4 « Affichages obligatoires » (interdiction fumer/vapoter, allergènes, origine viandes, prix, fait maison, licence, sécurité, réclamation) + nouveau groupe RH « Cadre social & terrain » (planning, tenue, vestiaire, nettoyage tenue, pause, contrat, DPAE, journée test). Bouton « Reporter les manquants dans la note ».
- Fait : bouton `note` (libre) + bouton `photo` (avec badge compteur) à droite de la rangée de notation, sur chaque question.
- Fait : « Ajouter une question » en bas du corps (point sur mesure par pilier, code `CUSTOM-…`) + suppression. Endpoint `item` étendu (groupe + DELETE).
- Fait : persistance — colonne `AuditItem.meta Json?` (état checklist) via `prisma db push`. PATCH `resto360` enregistre `meta`. Page passe `meta` au wizard.
- Vérifié : `tsc --noEmit` OK, `npm run build` OK, aucun tiret long.
- Suivant : intégrer photos + checklists dans le rapport PDF resto360 ; valider grille avec le client.

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

## 2026-06-22 — Blog (10 articles) + passe SEO/GEO
- Fait : infrastructure blog data-driven (src/content/blog/types.ts + index.ts), pages /blog et /blog/[slug] (sommaire, answer-first, FAQ, sources, maillage, articles liés), composant ArticleBody.
- 10 articles FR sourcés écrits (réglementation/méthode/pratique) : controle-sanitaire-restaurant, haccp-restauration-guide, plan-maitrise-sanitaire-pms, chaine-du-froid-restauration, tracabilite-dlc-restaurant, allergenes-restaurant-obligations, fermeture-administrative-restaurant, nettoyage-desinfection-cuisine, ouvrir-restaurant-obligations-hygiene, note-alim-confiance.
- SEO/GEO : schema BlogPosting + ItemList + Organization + WebSite (graphe lié par @id) ; articleSchema avec image + isPartOf ; robots.ts autorise explicitement 18 crawlers IA ; verification Google/Bing branchée sur env (NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION / _BING_) ; sitemap inclut blog + lastModified ; llms.txt enrichi (liens blog) ; breadcrumb sur /faq ; manifest icônes 192/512 + maskable ; OG image runtime nodejs + coche dessinée (SVG) ; metadata enrichie (keywords, authors, publisher, googleBot).
- Header + Footer : lien Blog ajouté.
- Fichiers : src/content/blog/*, src/app/(marketing)/blog/*, src/components/marketing/ArticleBody.tsx, src/lib/schema.ts, src/app/{layout,robots,sitemap,manifest,opengraph-image}.ts(x), src/lib/env.ts, .env.example, public/llms.txt, src/components/site/{Header,Footer}.tsx, src/app/(marketing)/faq/page.tsx.
- Vérifs : tsc --noEmit OK ; next build OK (39 pages statiques, dont 10 articles prerender) ; 0 tiret long/demi-cadratin ; corrigé note-alim-confiance.ts (réécrit avec accents) + nettoyage (titres/étapes).
- Audits indépendants : GEO 82/100 (geo agent), SEO technique 96/100 (validator), conformité label privé/no-fake/no-tiret/RGPD = PASS.
- Suivant / à valider humain : (1) coller les jetons Search Console + Bing Webmaster dans .env (puis soumettre sitemap aux 2). (2) déployer en prod (audithygiene.fr est live, auto-deploy sur commit) = ⏸️ go-live public. (3) page /methode + /a-propos avec auteur réel qualifié (E-E-A-T) -> demander la vraie bio/qualif. (4) trancher périmètre France vs Île-de-France (incohérence layout/schema "France" vs CLAUDE.md "IDF").

## 2026-06-23 — Blog x30 + pages E-E-A-T + page contact (déployé prod)
- Blog : 30 articles au standard (≥2500 mots, ton expert, voix humaine, 0 tiret long, 6-9 sources officielles avec URL canoniques EUR-Lex/Legifrance/gouv). 3 lots : national/réglementaire (10), Île-de-France (10), Audit avant/après contrôle (10). Schema BlogPosting+FAQ+Breadcrumb, sommaire, maillage, llms.txt.
- Pages E-E-A-T : /methode (déroulé, thèmes, notation, 3 niveaux d'écart, plan correctif) et /a-propos (label privé, engagements, Qualiopi). TODO laissé : bio nominative de l'auditeur à fournir (no-fake-content).
- Page /contact : ContactForm (nom, email, tel, type, message, consentement RGPD, honeypot) -> POST /api/lead source:'contact' -> Telegram (+ DB + Brevo). Testé en prod : POST 200, notif Telegram OK.
- Câblage : nav (Méthode, Formules, Blog, À propos, Contact), footer, sitemap (+/methode /a-propos /contact), llms.txt.
- Build : 62 pages statiques, typecheck OK, 0 tiret long. Déployé prod (vercel --prod), aliasé audithygiene.fr, pages live 200.
- Vérif moteurs : GSC + Bing déjà vérifiés par le client (méthode DNS). Jetons env meta non utilisés (laissés vides). Reste : soumettre sitemap.xml dans les 2 consoles.
- ⏸️ À fournir par client : bio/qualif nominative auditeur (E-E-A-T) ; trancher périmètre France vs IDF (copy accueil/schema disent "France").

## 2026-06-23 — Outil auditeur multi-marque : auditresto360 (4 phases)
- Multi-marque : au démarrage d'un audit, choix audit hygiène (vert, moteur conformité) ou auditresto360 (orange, moteur 10 piliers /100). DB additive : enum Marque + Audit.marque ; AuditItem.note(1-5)+groupe ; Audit.syntheseIA(Json). prisma db push (non destructif).
- Phase 1 : logo public/logo-auditresto360.png ; src/lib/marques.ts (charte vert/orange) ; src/lib/grille-resto360.ts (10 piliers, sous-groupes, 58 critères, notation 1-5, scorePilier/scoreGlobal/radar) - fidèle au cadrage client.
- Phase 2 : NewAuditForm choix marque ; /api/audits branche selon marque (instancie items resto360 + questions dirigeant) ; page [id] route vers Resto360Wizard ; Resto360Wizard.tsx (plein écran tablette, stepper 10 piliers, notation 1-5 couleur, commentaire, autosave PATCH /resto360, score live) ; /api/audits/[id]/resto360 (save notes + scores piliers + global).
- Phase 3 : src/lib/rapport-resto360.ts (urgences/quick wins/plan Urgence-Important-Confort/dirigeant/étoiles) ; RadarResto.tsx (SVG) ; page [id]/rapport (score+étoiles, radar, urgences, quick wins, plan, dirigeant, photos, Imprimer/PDF) ; wizard "Terminer" redirige vers rapport.
- Phase 3.5 : capture photo par critère dans le wizard (route /photo réutilisée), affichée dans le rapport.
- Phase 4 : src/lib/restitution.ts (appel Claude Messages API, JSON parsé) ; /api/audits/[id]/restitution (génère + stocke syntheseIA) ; RestitutionPanel.tsx dans le rapport (synthèse consultant, points forts/axes, roadmap 30/60/90, gains, risques, régénérer). Clé Anthropic directe : env ANTHROPIC_API_KEY (+ ANTHROPIC_MODEL, défaut claude-sonnet-4-6).
- Build OK 62 pages, typecheck OK, 0 tiret long. Non déployé (app derrière login, testé en local).
- ⏸️ À fournir : ANTHROPIC_API_KEY dans .env.local (+ sur Vercel pour la prod) pour activer la restitution IA.
- TODO produit : la grille resto360 est structurelle (validée par le client) ; les critères restent qualitatifs (pas de barème détaillé par note) - à affiner si besoin.
