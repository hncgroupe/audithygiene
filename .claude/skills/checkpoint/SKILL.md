# Skill — checkpoint

## But
Faire un point d'étape propre : sauvegarder l'état, mettre à jour la mémoire, préparer la suite.

## Quand l'utiliser
- Fin d'un jalon, avant une pause, avant un point `⏸️`.

## Méthode
1. **Mettre à jour** `memory/JOURNAL.md` (entrée datée), `DECISIONS.md`, `BLOCKERS.md` si pertinent.
2. **Commit git** (jamais de secret) avec message clair.
3. **Récap** : ✅ fait / ⏸️ attend validation / ➡️ prochaine étape.
4. **Vérifier** : pas de `.env.local` ni de secret commité.

## Garde-fou
- Ne jamais commiter `.env.local` ou une clé (rule `global`).
- Récap honnête : signaler ce qui n'est pas terminé.
