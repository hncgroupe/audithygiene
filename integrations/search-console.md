# Intégration — Google Search Console

## Rôle
Données SEO réelles (impressions, clics, positions, indexation), branchées à l'agent SEO.

## Variables requises
| Variable | Statut | Source |
|----------|--------|--------|
| (vérification) | 🟠 | enregistrement TXT chez IONOS |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | 🟢 (API) | Google Cloud → Service Account (voir google) |

## Étapes manuelles (toi)
1. Search Console → Ajouter propriété **Domaine** `audithygiene.fr`.
2. Vérifier via TXT chez IONOS (valeur fournie par Google).
3. Pour l'API : créer un Service Account (voir `integrations/google-business.md` / KIT §11) et lui donner accès à la propriété.
4. Soumettre le `sitemap.xml`.

## Statut
🟠 À configurer après mise en ligne. Autonome.
