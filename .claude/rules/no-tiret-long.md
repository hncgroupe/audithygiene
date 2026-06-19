# Rule — no-tiret-long (anti-signature IA)

Le contenu ne doit JAMAIS trahir une rédaction par IA. Règle stricte sur tout texte visible (site, app, emails, rapports PDF, métas, ads, fiches).

## Interdits typographiques
- ❌ **Tiret long (cadratin `—` U+2014)** : jamais.
- ❌ **Tiret demi-cadratin (`–` U+2013)** : jamais.
- ✅ À la place : reformuler avec une virgule, un deux-points, une parenthèse, ou un tiret court `-` (avec espaces) si vraiment nécessaire.

## Autres signaux IA à éviter (style humain)
- Pas de formules creuses type « il est important de noter que », « en conclusion », « plongeons dans ».
- Pas de listes à puces systématiques quand une phrase suffit.
- Pas de symétrie parfaite « non seulement... mais aussi » répétée.
- Varier la longueur des phrases. Ton direct, concret, ancré sur le métier.
- Pas d'emoji dans le contenu sérieux (rapports, pages légales, CGV).

## Application
- Tout texte produit passe ce filtre avant livraison.
- Un script de nettoyage remplace `—`/`–` par `-` dans `src/` et `public/` si besoin.
- Le `validator` vérifie l'absence de tiret long avant toute livraison.
