# Rule — no-fake-content

Aucune invention. La crédibilité du label dépend de l'honnêteté totale.

## Interdictions ❌

- **Faux avis clients** ou témoignages inventés.
- **Statistiques inventées** ou non sourcées (« 98% de réussite », « 500 restaurants audités ») tant qu'elles ne sont pas réelles et vérifiables.
- **Logos de tiers** (clients, partenaires, médias, organismes) sans autorisation écrite.
- **Notes/étoiles** (`AggregateRating`) sans vrais avis derrière.
- **Chiffres de performance** non mesurés.

## Obligations ✅

- Tout chiffre affiché doit être **réel et sourçable** (source citée ou donnée interne vérifiable).
- Les placeholders restent marqués `TODO` jusqu'à fourniture d'une vraie valeur — ne jamais combler par une invention.
- Pour le schema `AggregateRating` / avis : n'activer qu'avec de vrais avis collectés (ex. via Google Business Profile).
- Témoignages : uniquement réels, avec accord de la personne.

## En cas de doute

Laisser un `TODO` explicite et demander la vraie donnée au client plutôt que d'inventer.
