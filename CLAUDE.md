# CLAUDE.md — Fichier maître audithygiène

> Fichier chargé automatiquement à chaque session. Il conditionne tout le reste du projet (site, app, agents, skills, intégrations). En cas de conflit entre une instruction ponctuelle et ce fichier, **ce fichier prime**, sauf instruction humaine explicite et contraire donnée en direct.

---

## 1. Le projet en une phrase

**audithygiène** est un cabinet d'audit hygiène & HACCP pour restaurants et CHR en Île-de-France : un auditeur se déplace, contrôle l'établissement avec un outil interne basé sur la réglementation, puis délivre un rapport PDF complet (notation, cas critiques, plan correctif). Objectif : devenir **le label de référence** et le **numéro 1 SEO/GEO** sur « audit hygiène restaurant ».

| Clé | Valeur |
|---|---|
| Nom du projet | `audithygiene` |
| Domaine principal (SEO France) | `audithygiene.fr` |
| Domaine secondaire | `audithygiene.com` → redirection 301 vers `.fr` |
| Sous-domaine app opérationnelle | `app.audithygiene.fr` |
| Zone | Toute l'Île-de-France (75, 92, 93, 94, 77, 78, 91, 95) |
| Langue | Français (`fr`) |
| Hébergement | Vercel |
| E-signature | Yousign |
| Base de données | Postgres (recommandé : Supabase) |

---

## 2. Les deux briques

1. **Site vitrine (acquisition)** — `audithygiene.fr`. Machine à trafic et conversion. SEO + GEO poussés au maximum. **On commence par là.**
2. **App opérationnelle (production)** — `app.audithygiene.fr`. Outil interne des auditeurs : grille d'audit HACCP, notation, cas critiques, plan correctif, génération du rapport PDF client.

Les deux partagent : même base de données, même identité de marque, même back-office. Monorepo Next.js unique avec route groups `(marketing)` et `(app)`.

---

## 3. Identité de marque (à respecter partout)

- **Nom :** « audit hygiène » (minuscules) — « audit » en noir, « hygiène » en vert.
- **Logo :** app-icon carré arrondi vert avec coche blanche (fichier SVG fourni par le client).
- **Couleurs :**
  - Vert principal : `#10B981`
  - Noir / ink (texte, fonds sombres) : `#0C1B17`
  - Gris secondaire (sous-titres) : `#6B7D77`
  - Nuances claires/foncées (hover, fonds, états) : à générer à partir du vert principal.
- **Typo :** Poppins (Google Fonts), graisses 400 / 500 / 600 / 700 / 800.
- **Ton de marque :** sérieux, rassurant, moderne, « tiers de confiance ». On valide la conformité, on rassure le restaurateur face au contrôle sanitaire.

---

## 4. ⚖️ Cadre juridique — NON NÉGOCIABLE

audit hygiène est un **label privé de qualité** (standard de marché indépendant). Dans tout le contenu, code, copy, méta, agents et skills :

- ❌ JAMAIS laisser croire qu'il s'agit d'une **certification officielle de l'État**, d'un **agrément réglementaire**, ou d'un **contrôle des services vétérinaires / DDPP**.
- ❌ JAMAIS promettre une **garantie** de réussite à un contrôle officiel.
- ❌ Aucun **faux avis**, aucune **statistique inventée**, aucun **logo de tiers** sans autorisation écrite.
- ✅ Toujours présenter audit hygiène comme un **label privé**, indépendant, basé sur la réglementation HACCP.

Voir `.claude/rules/label-prive-cadre-juridique.md` et `.claude/rules/no-fake-content.md`.

---

## 5. 🚦 Règle d'or — validation humaine

Claude **prépare et propose**, l'humain **valide** uniquement pour les actions à risque. Claude ne déclenche **JAMAIS seul** une action qui :

- **dépense de l'argent réel** (budget ads, paiement Stripe en mode live) ;
- **envoie en masse** (campagnes emailing, prospection) ;
- **met le site en ligne sur le domaine public** (go-live final) ;
- **engage juridiquement**.

Ces points sont marqués `⏸️ EN_ATTENTE_VALIDATION` : Claude résume et attend le « go ».
**Tout le reste se fait en autonomie complète, sans redemander à chaque étape.**

---

## 6. Stack technique

- **Framework :** Next.js (App Router) + TypeScript + Tailwind CSS.
- **Hébergement :** Vercel (preview auto sur chaque commit ; go-live prod = validation).
- **Base de données :** Postgres via Supabase (Postgres + Auth auditeurs + Storage PDF). ORM : Prisma.
- **Emails :** Brevo (transactionnel + marketing opt-in) via API dans des route handlers.
- **Notifications :** Telegram Bot API (nouveau lead, RDV, audit terminé, paiement).
- **Paiements :** Stripe (Checkout / Payment Links / acomptes). Mode test d'abord.
- **E-signature :** Yousign (devis, CGV, contrat de prestation).
- **PDF :** moteur serverless-compatible (`@react-pdf/renderer` ou `puppeteer-core` + `@sparticuz/chromium`). Stockage Supabase Storage (alt. Vercel Blob / R2).
- **Monorepo :** un seul projet Next.js. Route group `(marketing)` public + `(app)` protégé (auth) servi sur `app.audithygiene.fr`.

> Note plateforme Vercel : Edge Functions dépréciées → utiliser Fluid Compute (Node.js complet). Vercel Postgres/KV n'existent plus → DB via marketplace. Node 24 LTS par défaut.

---

## 7. Priorités SEO / GEO

- **SEO technique :** Lighthouse ≥ 95 (Perf, SEO, A11y, Best Practices). Titles/méta uniques, Hn propre, `sitemap.xml`, `robots.txt`, `canonical`, OG + Twitter cards, images WebP/AVIF + `alt`, fonts optimisées.
- **Données structurées schema.org :** `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `AggregateRating` (uniquement si vrais avis).
- **SEO local IDF :** une page par département (75, 92, 93, 94, 77, 78, 91, 95) + grandes villes, contenu unique (zéro duplication), maillage interne, schema `LocalBusiness` géolocalisé.
- **GEO (citation par les IA) :** `llms.txt` à la racine, réponses directes en haut de page, FAQ structurées, signaux E-E-A-T réels.

Honnêteté : le score technique est atteignable ; le classement dépend du contenu, des liens et du temps. Aucune promesse de rang garanti.

---

## 8. RGPD / CNIL

- Opt-in explicite pour tout emailing marketing ; consentement tracé ; registre.
- Pas de cookie avant consentement (bandeau conforme).
- Mentions légales, politique de confidentialité, CGV présentes.
- Champ `consentement_RGPD` stocké sur chaque lead.

---

## 9. Sécurité & secrets

- Aucun secret en clair dans le repo. `.env.local` **jamais commité** (présent dans `.gitignore`).
- Seul `.env.example` est versionné, avec des placeholders.
- Toutes les clés requises sont consolidées dans `KIT_DE_CONNEXION.md`.

---

## 10. Mémoire & journal

Après **chaque jalon**, mettre à jour :
- `.claude/memory/JOURNAL.md` — ce qui a été fait.
- `.claude/memory/DECISIONS.md` — décisions d'architecture/produit.
- `.claude/memory/LEARNINGS.md`, `BLOCKERS.md`, `EXPERIMENTS.md`, `EVALS.md` selon le contexte.

---

## 11. Ordre d'exécution (résumé)

1. `CLAUDE.md` ✅ → `KIT_DE_CONNEXION.md` → pause unique `⏸️ EN_ATTENTE_DES_CLÉS`.
2. À réception des clés : `.gitignore`, `.env.example`, `.env.local`, `README`, `SETUP_GUIDE`, `.mcp.json`.
3. `docs/` → `.claude/` complet (rules → memory → skills → agents → bootstrap).
4. `integrations/*.md`.
5. Init Next.js + Tailwind + Prisma + schéma DB complet.
6. **Site vitrine en priorité** (design, tunnel conversion, SEO, pages locales IDF, GEO, conformité).
7. Formulaire RDV/lead → route handler → DB + Telegram + Brevo.
8. Fondations app opérationnelle (auth, structure, schéma) → outil d'audit + PDF.
9. Déploiement preview Vercel ; go-live prod = `⏸️ validation`.
10. MAJ mémoire. Récap final.

---

## 12. Conventions de travail

- Aucun fichier vide ou creux : chaque fichier a un contenu réel et utile.
- Les valeurs non encore décidées (formules, prix, grille d'audit, SLA) sont marquées `TODO` clairement et listées pour validation.
- Affirmations factuelles → sourcées.
- Avancer en autonomie hors points `⏸️` de la règle d'or.
