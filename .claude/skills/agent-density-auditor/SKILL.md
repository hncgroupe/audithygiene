# Skill — agent-density-auditor

## But
Vérifier que l'écosystème d'agents/skills reste cohérent, sans doublon ni trou.

## Quand l'utiliser
- Après ajout/modif d'agents ou skills ; revue périodique.

## Méthode
1. **Inventaire** : lister agents (`.claude/agents/`) et skills (`.claude/skills/`).
2. **Couverture** : chaque besoin (SEO, GEO, local, contenu, ads, email, audit produit, PDF, contrats, ops) a un responsable.
3. **Doublons** : repérer les recouvrements, fusionner ou clarifier les périmètres.
4. **Trous** : signaler les capacités manquantes.
5. **Référencement** : chaque agent déclare ses skills ; chaque skill est utilisée par ≥ 1 agent (sinon → `_inactive/`).

## Garde-fou
- Ne pas multiplier les agents inutiles. Préférer la clarté des périmètres.
