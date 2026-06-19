# Skill — pdf-report-generation

## But
Générer le rapport PDF client à la marque audit hygiène : notation, cas critiques, photos, plan correctif, prochain audit recommandé.

## Quand l'utiliser
- Implémenter/modifier le moteur de génération PDF.
- Concevoir la mise en page du rapport.

## Méthode
1. **Moteur** : `@react-pdf/renderer` (contrôle fin de la mise en page, serverless-friendly). Fallback HTML→PDF via `puppeteer-core` + `@sparticuz/chromium` si besoin de rendu riche.
2. **Structure du rapport** :
   - Page de garde : logo, nom établissement, date, auditeur, score global, mention « label privé ».
   - Synthèse : score global + scores par thème (visuel), nombre de NC, **cas critiques en évidence**.
   - Détail par thème : items, statut de conformité, photos, commentaires.
   - **Plan correctif** : tableau action / priorité / délai.
   - Date du prochain audit recommandé.
   - Pied : mention juridique label privé (rule `label-prive-cadre-juridique`).
3. **Marque** : Poppins, vert `#10B981`, ink `#0C1B17`, gris `#6B7D77`.
4. **Stockage** : Supabase Storage bucket `rapports` (privé). Servir via URL signée à durée limitée.
5. **Envoi** : email Brevo transactionnel au client avec lien/pièce jointe.

## Garde-fou
- Mention juridique obligatoire au pied du rapport.
- Cas critiques toujours visibles dès la synthèse.
- PDF jamais public en clair (URL signée).
- Pas de note inventée : la notation vient de l'audit réel.
