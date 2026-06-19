# Intégration — Google Business Profile + Google Cloud/Sheets

## Rôle
- **Google Business Profile** : fiche(s) pour le SEO local IDF.
- **Google Cloud / Sheets** (optionnel) : export des leads + API Search Console.

## Variables requises
| Variable | Statut | Source |
|----------|--------|--------|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | 🟢 | Google Cloud → Credentials → Service Account (JSON) |
| `GOOGLE_SHEET_ID` | 🟢 | ID dans l'URL du Sheet |

## Étapes manuelles (toi)
### Business Profile
1. Créer la fiche **audit hygiène** (catégorie service d'audit/conseil).
2. Zone de service : Île-de-France (pas d'adresse publique si déplacement).
3. Vérification Google (courrier/téléphone/vidéo).

### Cloud / Sheets (optionnel)
1. Google Cloud → projet `audithygiene` → activer Sheets API + Search Console API.
2. Créer un Service Account + clé JSON.
3. Créer le Sheet `LEADS - audithygiene`, le partager avec l'email du service account (Éditeur).

## Colonnes du Sheet
`date | nom | email | téléphone | source | ville | type_etablissement | formule | message | statut | consentement_RGPD`

## Statut
🟠/🟢 À configurer. Autonome. Pas de faux avis sur la fiche (rule `no-fake-content`).
