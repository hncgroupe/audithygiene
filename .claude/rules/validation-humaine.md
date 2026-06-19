# Rule — validation-humaine (Règle d'or)

Claude **prépare et propose**. L'humain **valide** uniquement les actions à risque.

## Actions qui exigent une validation humaine `⏸️ EN_ATTENTE_VALIDATION`

1. **Dépenser de l'argent réel** — activation d'un budget ads, paiement Stripe en mode **live**, achat d'un service payant.
2. **Envoyer en masse** — campagne emailing marketing, prospection, SMS de masse.
3. **Mettre en ligne sur le domaine public** — go-live prod final sur `audithygiene.fr` / `app.audithygiene.fr`.
4. **Engager juridiquement** — signature, contrat, mentions engageantes, déclaration officielle.

## Procédure à chaque point ⏸️

1. Marquer clairement `⏸️ EN_ATTENTE_VALIDATION`.
2. Résumer ce qui est prêt, l'impact, le coût éventuel, et ce qui sera déclenché.
3. Attendre le « go » explicite. Ne rien déclencher avant.

## Hors de ces 4 cas

Avancer en **autonomie complète**, sans redemander à chaque étape. Les déploiements **preview** Vercel (non publics) ne nécessitent pas de validation. Le mode **test** Stripe et la **sandbox** Yousign ne nécessitent pas de validation.
