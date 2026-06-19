# bootstrap — audit hygiène

Point d'entrée de l'écosystème `.claude`. Charge le contexte et l'ordre de travail.

## Lire en premier
1. `CLAUDE.md` (racine) — fichier maître.
2. `.claude/rules/global.md` puis les autres rules.
3. `docs/REFERENCE.md`, `docs/STRATEGY.md`.
4. `.claude/memory/JOURNAL.md`, `BLOCKERS.md` — où on en est.

## Hiérarchie de décision
1. Instruction humaine directe.
2. `CLAUDE.md` + `.claude/rules/`.
3. Skills / agents.
4. Initiative raisonnable.

## Orchestration
- `strategist` est l'orchestrateur : il décompose, délègue aux agents spécialisés, agrège.
- Chaque agent charge ses skills déclarés et respecte toutes les rules.

## Points d'arrêt obligatoires `⏸️`
Argent réel · envoi de masse · go-live public · engagement juridique. Voir `rules/validation-humaine.md`.

## Après chaque jalon
Mettre à jour `.claude/memory/` (voir `rules/reports.md`).

## État du projet
Voir `.claude/memory/JOURNAL.md` pour l'avancement courant et `BLOCKERS.md` pour ce qui attend.
