# BLOCKERS — audit hygiène

Blocages en cours et ce qui les lèverait.

## Ouverts

### 🔴 Clés de connexion 🔴 (2026-06-19)
- **Bloque :** branchement réel DB, déploiement, lead capture live, emails, notifs.
- **Lève le blocage :** fournir les clés du `KIT_DE_CONNEXION.md`, minimum 🔴 (Supabase ×5, compte Vercel, confirmation domaine IONOS).
- **Contournement :** tout le code non-secret est construit en attendant (placeholders d'env).

### Grille d'audit réglementaire à valider
- **Bloque :** mise en production de l'outil d'audit avec contenu définitif.
- **Lève le blocage :** validation du client/expert sur les questions, pondérations et points réglementaires (voir `docs/REFERENCE.md`).
- **Contournement :** structure technique + jeu de questions initial marqué « à valider ».

### Offres & prix
- **Bloque :** affichage des formules et paiement.
- **Lève le blocage :** valeurs réelles (noms, contenu, durée, tarifs) — voir `docs/BUSINESS_MODEL.md`.

## Résolus
- (aucun pour l'instant)
