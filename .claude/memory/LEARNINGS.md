# LEARNINGS — audit hygiène

Apprentissages réutilisables (technique, SEO, produit, conversion). Enrichir au fil du projet.

## Plateforme
- Vercel : Edge Functions dépréciées → Fluid Compute (Node.js complet) pour les route handlers lourds (PDF, webhooks). Node 24 LTS par défaut. Vercel Postgres/KV supprimés → DB via Supabase.

## PDF (@react-pdf/renderer)
- Un nœud `fixed` avec `render` dynamique (numéro de page) doit être ancré par le **haut** (`top: hauteurPage - hauteurPied`). Ancré par `bottom`, sa position diverge sur les documents longs et pdfkit lève `unsupported number`. Le même nœud imbriqué dans un autre bloc `fixed` ne s'affiche pas du tout.
- Pas de `wrap={false}` sur un bloc qui peut dépasser une page : le contenu est perdu ou saute. `minPresenceAhead` suffit pour éviter les titres orphelins.
- Polices locales : `Font.register` avec un chemin de fichier, et `outputFileTracingIncludes` dans `next.config.mjs`, sinon les fichiers ne sont pas embarqués dans la fonction serveur et le PDF repart en Helvetica.
- Pour relire un PDF sans visionneuse : `pypdfium2` rend chaque page en PNG et extrait le texte (contrôle de la numérotation, chasse aux `TODO`).

## SEO / GEO
- (à remplir) Requêtes qui rankent, pages qui convertissent, citations IA obtenues.

## Conversion
- (à remplir) Variantes de hero/CTA testées, taux observés.

## Produit d'audit
- (à remplir) Items de grille les plus discriminants, retours auditeurs terrain.
