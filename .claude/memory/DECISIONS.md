# DECISIONS — audit hygiène

Décisions d'architecture et de produit, avec leur justification.

## 2026-06-19 — Stack & architecture
- **Next.js App Router + TypeScript + Tailwind.** Raison : SEO (SSR/SSG) + un seul écosystème pour site et app.
- **Monorepo unique, route groups `(marketing)` et `(app)`.** Raison : partage DB/marque/back-office, simplicité de déploiement Vercel. `(app)` servi sur `app.audithygiene.fr`.
- **Supabase (Postgres + Auth + Storage).** Raison : tout-en-un, région EU (RGPD), Auth auditeurs intégrée, Storage pour PDF. ORM Prisma.
- **Brevo** pour emails, **Telegram** pour notifs, **Stripe** (test d'abord) pour paiement, **Yousign** (sandbox) pour signature.
- **PDF** : moteur serverless-compatible (`@react-pdf/renderer` privilégié pour le contrôle de mise en page à la marque ; fallback puppeteer+chromium si besoin HTML→PDF).
- **Domaines** : `.fr` principal SEO, `.com` → 301 vers `.fr`, `app.` pour l'opérationnel.

## Décisions cadre
- **Label privé** assumé partout (jamais certification d'État). Raison : conformité juridique + crédibilité.
- **Validation humaine** restreinte à 4 cas (argent, masse, go-live, juridique). Raison : maximiser l'autonomie sans risque.

> Mettre à jour ici toute nouvelle décision structurante.
