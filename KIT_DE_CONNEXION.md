# 🔌 KIT DE CONNEXION — audithygiène

> **But :** tu me fournis ici, **une seule fois**, toutes les clés et accès. Ensuite j'avance sans pause (sauf points `⏸️` argent / envoi de masse / go-live).
>
> **Comment me transmettre les valeurs SANS les commiter :** colle chaque valeur dans le fichier `.env.local` (que je créerai et qui est ignoré par git). Ou colle-les-moi directement dans le chat ; je les place dans `.env.local`. **Ne mets jamais une clé dans un fichier versionné.** Le seul fichier d'env versionné est `.env.example`, qui ne contient que des placeholders.

**Légende priorité :**
- 🔴 **BLOQUANT** — nécessaire pour démarrer (DB, déploiement, lead capture de base).
- 🟠 **BIENTÔT** — nécessaire pour la première vraie mise en service.
- 🟢 **PLUS TARD** — fonctionnalités avancées (paiement live, signature, ads).

---

## 0. Récapitulatif express (checklist à cocher)

| # | Service | Compte à créer ? | Priorité |
|---|---------|------------------|----------|
| 1 | DNS du domaine (IONOS) | Tu as déjà le domaine | 🔴 |
| 2 | Vercel | Oui (gratuit) | 🔴 |
| 3 | Base Postgres (Supabase) | Oui (gratuit) | 🔴 |
| 4 | Telegram (notifications) | Oui (Telegram + BotFather) | 🟠 |
| 5 | Brevo (emails) | Oui (gratuit) | 🟠 |
| 6 | Stockage PDF (Supabase Storage) | Inclus dans Supabase | 🟠 |
| 7 | Stripe (paiements) | Oui | 🟢 |
| 8 | Yousign (signature) | Oui | 🟢 |
| 9 | Google Search Console | Oui (compte Google) | 🟠 |
| 10 | Google Business Profile | Oui (compte Google) | 🟠 |
| 11 | Google Cloud / Sheets (export leads) | Optionnel | 🟢 |

---

## 1. 🌐 DNS du domaine — IONOS  🔴 BLOQUANT

**Rôle :** pointer `audithygiene.fr`, `app.audithygiene.fr` et `audithygiene.com` vers Vercel.

**Ce que je te demanderai (au moment du branchement DNS) :**
- Confirmation que tu possèdes bien `audithygiene.fr` et `audithygiene.com` chez IONOS.

**Étapes manuelles de ton côté (je te donnerai les valeurs exactes une fois le projet Vercel créé) :**
1. Connecte-toi à [ionos.fr](https://www.ionos.fr) → **Domaines & SSL** → `audithygiene.fr` → **DNS**.
2. Ajouter un enregistrement **A** `@` → `76.76.21.21` (IP Vercel, je confirmerai).
3. Ajouter un **CNAME** `www` → `cname.vercel-dns.com`.
4. Ajouter un **CNAME** `app` → `cname.vercel-dns.com` (pour `app.audithygiene.fr`).
5. Pour `audithygiene.com` : même type de config, la redirection 301 → `.fr` sera gérée côté Vercel.

**Variables d'env :** aucune (config DNS pure). Je te guide pas à pas le moment venu.

---

## 2. ▲ Vercel  🔴 BLOQUANT

**Rôle :** hébergement + déploiement (preview auto, prod sur validation).

**Compte :** crée un compte gratuit sur [vercel.com](https://vercel.com) (connexion via GitHub recommandée).

**Étapes manuelles :**
1. Installe le CLI : `npm i -g vercel` puis `vercel login`.
2. (Optionnel mais recommandé) crée un repo GitHub `audithygiene` et connecte-le à Vercel.
3. Dans Vercel → **Project Settings → Domains** : ajoute `audithygiene.fr`, `app.audithygiene.fr`, `audithygiene.com`.

**Clés à récupérer** (Vercel → **Account Settings → Tokens**, puis **Project → Settings → General**) :

| Variable | Où la trouver |
|----------|---------------|
| `VERCEL_TOKEN` | vercel.com → Settings → Tokens → *Create Token* |
| `VERCEL_ORG_ID` | Project Settings → General (ou via `vercel link`) |
| `VERCEL_PROJECT_ID` | Project Settings → General (ou via `vercel link`) |

> Les variables d'environnement de prod seront poussées via `vercel env` ou l'UI Vercel ; en local elles vivent dans `.env.local`.

---

## 3. 🗄️ Base de données Postgres — Supabase  🔴 BLOQUANT

**Rôle :** Postgres (leads, RDV, clients, établissements, audits, scores, non-conformités, rapports, paiements, auditeurs) + Auth des auditeurs + Storage des PDF.

**Compte :** [supabase.com](https://supabase.com) → *New project* (région **EU — Paris/Frankfurt** pour le RGPD).

**Étapes manuelles :**
1. Crée le projet, note le **mot de passe DB** (affiché une seule fois).
2. Va dans **Project Settings → Database → Connection string** (mode **Session** pour Prisma migrations, **Transaction/pooler** pour le runtime serverless).
3. Va dans **Project Settings → API** pour les clés API.

**Clés à récupérer :**

| Variable | Où la trouver |
|----------|---------------|
| `DATABASE_URL` | Settings → Database → Connection string (pooler, port 6543, `?pgbouncer=true`) |
| `DIRECT_URL` | Settings → Database → Connection string (directe, port 5432) — pour les migrations Prisma |
| `NEXT_PUBLIC_SUPABASE_URL` | Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Settings → API → Project API keys → `anon public` |
| `SUPABASE_SERVICE_ROLE_KEY` | Settings → API → `service_role` (⚠️ secret, serveur uniquement) |

---

## 4. 🤖 Telegram — notifications  🟠 BIENTÔT

**Rôle :** alertes temps réel (nouveau lead, nouveau RDV, audit terminé, paiement reçu).

**Compte :** appli Telegram sur ton téléphone.

**Étapes manuelles :**
1. Dans Telegram, cherche **@BotFather** → `/newbot` → choisis un nom (ex. `audithygiene alerts`) et un username finissant par `bot`.
2. BotFather te renvoie le **token** → c'est `TELEGRAM_BOT_TOKEN`.
3. Récupère ton **chat_id** : écris un message à ton bot, puis ouvre `https://api.telegram.org/bot<TON_TOKEN>/getUpdates` dans un navigateur → champ `chat.id`. (Ou utilise @userinfobot.)

**Clés à récupérer :**

| Variable | Où la trouver |
|----------|---------------|
| `TELEGRAM_BOT_TOKEN` | BotFather, à la création du bot |
| `TELEGRAM_CHAT_ID` | via `getUpdates` ou @userinfobot |

---

## 5. ✉️ Brevo — emails  🟠 BIENTÔT

**Rôle :** emails transactionnels (confirmation RDV, rappel, envoi du rapport PDF) + marketing (opt-in only, RGPD).

**Compte :** [brevo.com](https://www.brevo.com) (ex-Sendinblue), offre gratuite.

**Étapes manuelles :**
1. Crée le compte, complète le profil expéditeur.
2. **Authentifie ton domaine** : Brevo → **Senders, Domains & Dedicated IPs → Domains** → ajoute `audithygiene.fr` → configure les enregistrements **SPF, DKIM, DMARC** chez IONOS (je te fournis les valeurs exactes affichées par Brevo).
3. Crée une **clé API** : Brevo → **SMTP & API → API Keys → Generate a new API key**.

**Clés à récupérer :**

| Variable | Où la trouver |
|----------|---------------|
| `BREVO_API_KEY` | Brevo → SMTP & API → API Keys |
| `BREVO_SENDER_EMAIL` | l'adresse expéditrice vérifiée (ex. `contact@audithygiene.fr`) |
| `BREVO_SENDER_NAME` | nom affiché (ex. `audit hygiène`) |

⚠️ Envoi de masse marketing = `⏸️ EN_ATTENTE_VALIDATION`.

---

## 6. 📄 Stockage des PDF — Supabase Storage  🟠 BIENTÔT

**Rôle :** stocker les rapports PDF générés, avec accès sécurisé (URLs signées).

**Étapes manuelles :** dans Supabase → **Storage → New bucket** → nom `rapports` → **Private**.

**Variables :** réutilise `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (point 3).

| Variable | Valeur |
|----------|--------|
| `SUPABASE_STORAGE_BUCKET` | `rapports` |

> Alternative si tu préfères : **Vercel Blob** (`BLOB_READ_WRITE_TOKEN`) ou **Cloudflare R2**. Dis-moi, je documente.

---

## 7. 💳 Stripe — paiements  🟢 PLUS TARD

**Rôle :** Checkout / Payment Links / acomptes pour les formules. **Mode test d'abord.**

**Compte :** [stripe.com](https://stripe.com).

**Étapes manuelles :**
1. Crée le compte (mode **Test** activé par défaut).
2. **Developers → API keys** : récupère les clés de test.
3. **Developers → Webhooks → Add endpoint** : `https://audithygiene.fr/api/webhooks/stripe` → récupère le **signing secret**.

**Clés à récupérer :**

| Variable | Où la trouver |
|----------|---------------|
| `STRIPE_SECRET_KEY` | Developers → API keys → *Secret key* (test : `sk_test_…`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Developers → API keys → *Publishable key* (`pk_test_…`) |
| `STRIPE_WEBHOOK_SECRET` | Developers → Webhooks → endpoint → *Signing secret* (`whsec_…`) |

⚠️ Passage en mode **live** = `⏸️ EN_ATTENTE_VALIDATION`.

---

## 8. ✍️ Yousign — signature électronique  🟢 PLUS TARD

**Rôle :** signature des devis, CGV, contrats de prestation.

**Compte :** [yousign.com](https://yousign.com) (acteur français, RGPD). Demande un accès **Sandbox** d'abord.

**Étapes manuelles :**
1. Crée le compte, demande l'environnement **Sandbox**.
2. **Settings → API → Generate API key**.

**Clés à récupérer :**

| Variable | Où la trouver |
|----------|---------------|
| `YOUSIGN_API_KEY` | Yousign → Settings → API |
| `YOUSIGN_API_URL` | `https://api-sandbox.yousign.app/v3` (sandbox) puis `https://api.yousign.app/v3` (prod) |

---

## 9. 🔎 Google Search Console  🟠 BIENTÔT

**Rôle :** données SEO réelles (impressions, clics, positions) branchées à l'agent SEO.

**Compte :** compte Google → [search.google.com/search-console](https://search.google.com/search-console).

**Étapes manuelles :**
1. **Ajouter une propriété** → type **Domaine** → `audithygiene.fr`.
2. Vérifie via un enregistrement **TXT** chez IONOS (Google te donne la valeur).
3. Pour brancher l'API plus tard : crée un **Service Account** dans Google Cloud (voir point 11) et donne-lui accès à la propriété.

**Clés :** aucune au départ (vérification DNS). Pour l'API : `GOOGLE_SERVICE_ACCOUNT_JSON` (voir point 11).

---

## 10. 📍 Google Business Profile  🟠 BIENTÔT

**Rôle :** fiche(s) établissement pour le SEO local IDF.

**Compte :** [business.google.com](https://business.google.com).

**Étapes manuelles :**
1. Crée la fiche **audit hygiène** (catégorie : *Service d'audit / Conseil*).
2. Zone de service : Île-de-France (pas d'adresse publique si tu te déplaces → "zone de chalandise").
3. Vérification (courrier, téléphone ou vidéo selon Google).

**Clés :** aucune variable d'env. Étape de configuration manuelle ; je prépare la stratégie de contenu de la fiche.

---

## 11. ☁️ Google Cloud / Sheets — export leads (optionnel)  🟢 PLUS TARD

**Rôle :** miroir des leads dans un Google Sheet `LEADS - audithygiene` + API Search Console.

**Étapes manuelles :**
1. [console.cloud.google.com](https://console.cloud.google.com) → crée un projet `audithygiene`.
2. **APIs & Services → Enable APIs** : active *Google Sheets API* et *Search Console API*.
3. **Credentials → Create credentials → Service Account** → crée une clé **JSON** (télécharge le fichier).
4. Crée le Google Sheet, partage-le avec l'email du service account (droits *Éditeur*).

**Clés à récupérer :**

| Variable | Où la trouver |
|----------|---------------|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | le contenu du fichier JSON (ou son chemin) |
| `GOOGLE_SHEET_ID` | l'ID dans l'URL du Sheet (`/d/<ID>/edit`) |

Colonnes du Sheet : `date | nom | email | téléphone | source | ville | type_etablissement | formule | message | statut | consentement_RGPD`.

---

## 12. 🔐 Secrets internes générés (pas besoin de toi)

Je génère moi-même ces valeurs, tu n'as rien à fournir :

| Variable | Rôle |
|----------|------|
| `NEXTAUTH_SECRET` / `AUTH_SECRET` | signature des sessions auth (si NextAuth utilisé en complément de Supabase) |
| `CRON_SECRET` | protéger les routes cron Vercel |

---

## ✅ Ce dont j'ai besoin pour DÉMARRER tout de suite (🔴)

Tu peux me débloquer le minimum vital avec **juste ça** :
1. **Supabase** : `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
2. **Vercel** : compte créé + (optionnel) `VERCEL_TOKEN`.
3. **Domaine IONOS** : confirmation de possession.

Le reste (Telegram, Brevo, Stripe, Yousign, Google) peut arriver après — je construis tout le code en placeholder en attendant.

---

> Quand tu as les valeurs : colle-les dans `.env.local` (je le crée à la réception) ou directement dans le chat. Je ne committe jamais ces valeurs.
