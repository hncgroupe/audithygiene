# BLOCKERS — audit hygiène

Blocages en cours et ce qui les lèverait.

## Ouverts

### 🟠 Clés partielles (2026-06-19, MAJ)
- **Reçu & vérifié live :** Supabase (URL+anon+service_role), **Postgres connecté** (region aws-1-eu-central-1, migration `init` appliquée, écriture DB testée OK), bucket `rapports` créé, Brevo (clé OK). Domaine `audithygiene.fr` sur **Cloudflare**.
- **Manque encore :** `TELEGRAM_BOT_TOKEN`/`CHAT_ID` ; expéditeur Brevo (compte rattaché à `hncgroupe.fr`, pas `audithygiene.fr`) ; `VERCEL_TOKEN`/compte (pour déployer) ; Stripe/Yousign/Google (🟢).

### Grille d'audit réglementaire à valider
- **Bloque :** mise en production de l'outil d'audit avec contenu définitif.
- **Lève le blocage :** validation du client/expert sur les questions, pondérations et points réglementaires (voir `docs/REFERENCE.md`).
- **Contournement :** structure technique + jeu de questions initial marqué « à valider ».

### Offres & prix
- **Bloque :** affichage des formules et paiement.
- **Lève le blocage :** valeurs réelles (noms, contenu, durée, tarifs) — voir `docs/BUSINESS_MODEL.md`.

## Résolus
- (aucun pour l'instant)
