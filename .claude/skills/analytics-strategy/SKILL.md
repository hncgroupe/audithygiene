# Skill — analytics-strategy

## But
Mesurer ce qui compte : trafic, conversion, qualité des leads, SEO, GEO.

## Quand l'utiliser
- Définir le plan de mesure et les tableaux de bord.

## Méthode
1. **Plan de tracking** : pages vues, scroll/engagement, soumission formulaire, RDV, paiement. Nommage cohérent.
2. **Outils** : GA4 (avec consentement), Search Console (SEO réel), DB interne (leads → audits).
3. **Funnel** : visiteur → lead → RDV → audit réalisé → renouvellement.
4. **KPIs** (voir `docs/OBJECTIVES.md`) : trafic organique IDF, positions, taux de conversion par étape, CAC, LTV, citations IA.
5. **Reporting** : skill `campaign-reporter`.

## Garde-fou
- Aucun tag avant consentement (rule `rgpd-fr`).
- Données réelles uniquement (rule `no-fake-content`).
