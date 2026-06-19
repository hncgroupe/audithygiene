# Rule — rgpd-fr (RGPD / CNIL)

Toute collecte de données personnelles et tout emailing respectent le RGPD et les recommandations CNIL.

## Collecte (formulaires)

- **Minimisation** : ne collecter que le nécessaire (nom, email, téléphone, ville, type d'établissement, message).
- **Consentement explicite** pour le marketing : case à cocher **non pré-cochée**, opt-in clair, distinct de la demande de service.
- **Finalité affichée** : indiquer pourquoi les données sont collectées.
- **Champ `consentement_RGPD`** stocké et horodaté sur chaque lead.
- Lien vers la **politique de confidentialité** à proximité du formulaire.

## Cookies

- **Aucun cookie non essentiel avant consentement** (bandeau conforme, refus aussi simple que l'acceptation).
- Pas d'analytics/marketing tags chargés avant accord.

## Emails (Brevo)

- Marketing : **opt-in only**, lien de désinscription dans chaque email, gestion des désabonnements.
- Transactionnel (confirmation RDV, rapport) : licite sans opt-in marketing car lié à l'exécution du service.
- Authentification domaine (SPF/DKIM/DMARC) pour la délivrabilité.

## Droits des personnes

- Prévoir un moyen d'exercer : accès, rectification, effacement, opposition (`contact@audithygiene.fr` ou formulaire).
- **Registre des traitements** : tenir à jour (leads, clients, audits, emails).

## Conservation

- Définir des durées de conservation (`TODO` à valider) : ex. prospects non convertis, clients, rapports d'audit.
- PDF stockés en bucket privé, accès par URL signée à durée limitée.
