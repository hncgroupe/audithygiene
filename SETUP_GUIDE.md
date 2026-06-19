# SETUP_GUIDE — Branchement pas-à-pas audithygiène

Guide opérationnel pour câbler le projet. Pour le détail de chaque clé, voir `KIT_DE_CONNEXION.md`.

---

## Étape 0 — Prérequis

- Node.js ≥ 20 (testé sur 24 LTS), npm ≥ 10.
- Compte GitHub (recommandé pour Vercel).
- `npm i -g vercel` puis `vercel login`.

---

## Étape 1 — Base de données (Supabase) 🔴

1. Crée le projet sur [supabase.com](https://supabase.com), région **EU**.
2. Récupère les 5 variables Supabase (voir KIT §3) → colle-les dans `.env.local`.
3. Crée le bucket Storage **`rapports`** en *Private* (KIT §6).
4. Génère le client Prisma et applique les migrations :
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

---

## Étape 2 — Lancer en local

```bash
npm install
npm run dev
```
Vérifie le site sur http://localhost:3000.

---

## Étape 3 — Notifications & emails (🟠)

1. **Telegram** : crée le bot via @BotFather, récupère `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` (KIT §4).
2. **Brevo** : crée la clé API, authentifie le domaine (SPF/DKIM/DMARC chez IONOS), renseigne l'expéditeur (KIT §5).
3. Teste le formulaire de RDV : un lead doit déclencher une notif Telegram + un email de confirmation.

---

## Étape 4 — Déploiement Vercel

1. `vercel link` (relie le dossier au projet Vercel).
2. Ajoute les variables d'environnement : `vercel env add` (ou via l'UI Vercel) pour chaque clé de `.env.local`.
3. `vercel` → déploiement **preview** (automatique sur chaque commit).
4. **Domaines** : Project Settings → Domains → `audithygiene.fr`, `app.audithygiene.fr`, `audithygiene.com`.
5. **DNS IONOS** : ajoute les enregistrements A/CNAME indiqués par Vercel (KIT §1).
6. **Go-live prod = ⏸️ EN_ATTENTE_VALIDATION** — ne jamais publier sur le domaine public sans « go » humain.

---

## Étape 5 — Paiements & signature (🟢)

1. **Stripe** en mode **test** : clés + webhook `https://audithygiene.fr/api/webhooks/stripe` (KIT §7). Passage live = ⏸️ validation.
2. **Yousign** en **sandbox** : clé API (KIT §8).

---

## Étape 6 — SEO & Google

1. **Search Console** : vérifie `audithygiene.fr` via TXT IONOS (KIT §9).
2. **Google Business Profile** : crée la fiche, zone IDF (KIT §10).
3. (Optionnel) **Google Sheets** export leads (KIT §11).

---

## Sécurité

- `.env.local` n'est **jamais** commité (présent dans `.gitignore`).
- Les clés `service_role` / secret ne sont utilisées que côté serveur (route handlers).
- Les PDF sont servis via URLs signées à durée limitée.
