# Audit SEO / GEO - audit hygiène

Date : 2026-06-22. Périmètre : site vitrine `audithygiene.fr` (route group marketing), après ajout du blog (10 articles) et de la passe SEO/GEO.

Méthode : audit de code + deux passes indépendantes (agent GEO, agent validator). Build de production vérifié (39 pages statiques), typecheck propre, zéro tiret long.

## Notes

| Axe | Note | Source |
|---|---|---|
| SEO technique | 96 / 100 | agent validator |
| GEO (citation IA) | 82 / 100 | agent geo |
| Conformité label privé | PASS | validator + geo |
| no-fake-content | PASS | validator |
| no-tiret-long | PASS (0 occurrence) | grep + validator |
| RGPD (pas de régression) | PASS | validator |

La note technique de 96 reflète un socle complet. Le plafond GEO de 82 tient surtout à l'E-E-A-T (pas encore d'auteur réel identifié) et à une ambiguité de zone (voir points ouverts). Ces deux leviers dépendent d'une décision ou d'une donnée humaine, pas de code.

## Ce qui est en place

### SEO technique
- Métadonnées uniques par page : `title` + `description` + `canonical` sur accueil, blog, chaque article (`generateMetadata`), zones, FAQ.
- Un seul H1 par page ; hiérarchie H2/H3 cohérente (le corps d'article n'émet que H2/H3, le H1 vient du header).
- Données structurées (JSON-LD) : `Organization` + `WebSite` (globaux, liés par `@id`), `BlogPosting` (avec `image`, `isPartOf`, dates, `inLanguage`), `FAQPage`, `BreadcrumbList`, `ItemList` (liste blog), `ProfessionalService` + `Service` (accueil et zones). Pas d'`AggregateRating` (aucun faux avis).
- `sitemap.xml` dynamique : pages statiques + 8 départements + 10 articles, avec `lastModified`.
- `robots.txt` : `/app` et `/api/` exclus, reste public.
- `manifest.webmanifest` : icônes 192 / 512 + maskable, catégories.
- Image Open Graph générée à la marque (route `opengraph-image`, runtime Node.js, coche dessinée en SVG).
- Vérification moteurs branchée sur variables d'env (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`).
- Maillage interne : blog vers blog (articles liés), blog vers zones (chips département), blog vers accueil (CTA, fil d'Ariane).

### GEO (être cité par les IA)
- `public/llms.txt` complet : cadre label privé, zone, service, pages clés, 10 liens blog, contact.
- `robots.ts` autorise explicitement 18 crawlers IA (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, Claude-Web, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot, CCBot, etc.).
- Format answer-first : chaque article ouvre sur un bloc "En bref" (2 à 4 phrases autoportantes, citables telles quelles).
- FAQ structurées sur chaque article + page FAQ (réponses extractibles, ancres H2).
- Sources réelles et cliquables sur chaque article (EUR-Lex, Legifrance, agriculture.gouv.fr, alim-confiance.gouv.fr, DGCCRF).

### Conformité
- audit hygiène présenté partout comme label privé indépendant : jamais certification d'État, agrément, ni contrôle DDPP. Aucune garantie de réussite à un contrôle.
- Aucune statistique inventée. Prix marqués comme propositions/TODO dans `constants.ts`.
- Zéro tiret long ou demi-cadratin dans `src/`.

## Défauts corrigés pendant la passe
- `note-alim-confiance.ts` était rédigé sans accents (français incorrect, mauvais pour le SEO) : article réécrit entièrement avec accents, structure et sources conservées.
- `nettoyage-desinfection-cuisine.ts` : accents manquants dans le `metaTitle` et deux mentions "5 étapes" corrigés.
- Slugs de zones erronés (`paris-75`...) dans 3 articles corrigés vers les vrais slugs (`paris`...).
- Image OG : glyphe coche remplacé par un tracé SVG (évite l'échec de téléchargement de police au build).

## Points ouverts (décision ou donnée humaine requise)

Priorité haute :
1. **Vérification moteurs** : coller le jeton Google Search Console dans `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` et celui de Bing Webmaster Tools dans `NEXT_PUBLIC_BING_SITE_VERIFICATION`, puis soumettre `sitemap.xml` dans les deux consoles. C'est l'étape qui déclenche l'indexation Google + Bing.
2. **E-E-A-T / auteur réel** : créer une page `/methode` (déroulé, grille, notation) et `/a-propos` (auteur, qualification HACCP réelle, expérience). Ajouter ensuite un `author` de type `Person` dans `articleSchema`. Ne rien inventer : fournir la vraie bio.
3. **Zone France vs Île-de-France** : `layout.tsx`, `schema.ts` et certaines pages disent "France", alors que `CLAUDE.md` et `DEPARTEMENTS` ciblent l'Île-de-France (8 départements). À trancher pour un signal géographique net (les IA citent la zone telle qu'écrite).

Priorité moyenne :
4. `sameAs` dans `Organization` une fois les profils réels créés (Google Business Profile, LinkedIn). Le GBP est le levier numéro un du SEO local et des citations IA locales.
5. Image OG dédiée par article (optionnel ; le fallback de marque suffit).
6. Différencier légèrement la FAQ par département pour réduire la duplication perçue.

## Honnêteté sur "100/100" et "cité par toutes les IA"
Le score technique (métadonnées, schema, sitemap, robots, performance de base) est à portée : 96/100 mesuré, le reste tient à la vérification moteurs et à des images/PWA mineures. En revanche, "être cité par toutes les IA" et "être visible sur Google et Bing" ne se décrètent pas par le code seul : cela dépend aussi de l'indexation (à déclencher), de l'autorité du domaine, des liens entrants, des avis réels et du temps. Le code met le site dans les meilleures conditions possibles ; il ne garantit pas un rang ni une citation. Voir `.claude/rules/no-fake-content.md`.
