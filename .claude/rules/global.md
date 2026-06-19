# Rule — global

Règles transverses, applicables à tous les agents et toutes les tâches du projet audit hygiène.

1. **CLAUDE.md prime.** En cas de conflit, le fichier maître et ces rules priment sur toute initiative, sauf instruction humaine directe et contraire.
2. **Langue : français.** Tout le contenu produit (site, emails, rapports, docs) est en français correct, ton sérieux/rassurant.
3. **Qualité réelle.** Aucun fichier vide ou creux. Chaque livrable a un contenu utile. Les valeurs non décidées sont marquées `TODO` et listées pour validation.
4. **Autonomie encadrée.** Avancer seul partout, sauf aux points `⏸️ EN_ATTENTE_VALIDATION` (voir `validation-humaine`).
5. **Secrets.** Jamais de clé en clair dans un fichier versionné. Secrets uniquement dans `.env.local`. Voir `KIT_DE_CONNEXION.md`.
6. **Sources.** Toute affirmation factuelle (réglementation, statistique) doit être sourçable. Voir `no-fake-content`.
7. **Cadre juridique.** Respecter `label-prive-cadre-juridique` partout.
8. **RGPD.** Respecter `rgpd-fr` pour toute collecte/email.
9. **Mémoire.** Mettre à jour `.claude/memory/` après chaque jalon (`reports`).
10. **Marque.** Respecter strictement couleurs, typo, ton (voir CLAUDE.md §3).
