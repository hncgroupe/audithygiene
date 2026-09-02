/**
 * Ce qui a le droit d'entrer dans l'index, et ce qui n'y a rien a faire.
 *
 * Un sitemap qui declare des pages que Google refuse d'indexer n'est pas
 * neutre : le rapport entre ce qu'on annonce et ce qui est retenu est lui meme
 * un signal de qualite, et il pese sur les pages qui passent. Mieux vaut donc
 * declarer moins et etre suivi, que declarer tout et etre a moitie ignore.
 *
 * Deux etats seulement, jamais d'intermediaire :
 *
 *   - une page merite l'index : elle est dans le sitemap, elle porte un lien
 *     entrant depuis le reste du site, et elle n'a pas de noindex ;
 *   - une page ne le merite pas : elle porte un noindex assume ET elle sort du
 *     sitemap. Elle reste explorable et maillee, parce qu'elle sert le lecteur
 *     et qu'elle transmet son autorite aux pages commerciales.
 *
 * Ce qu'on ne fait jamais : laisser une page dans le sitemap avec un noindex.
 * C'est une instruction contradictoire, et Google la compte comme une erreur.
 */

/**
 * Les familles retirees de l'index, et pourquoi.
 *
 * `points-de-controle` et `themes` sont la grille d'audit decoupee en URL. Ce
 * sont des intitules internes : personne ne tape « separation cru cuit
 * respectee » dans un moteur, ni « mentions valorisantes et etat des denrees ».
 * Elles n'ont aucune intention d'achat, elles sont les plus minces du site
 * (mediane 833 et 810 mots), et elles se disputent le meme sujet que les
 * dossiers de fond, qui eux sont trois a quatre fois plus longs et concluent
 * sur une prise de contact. Dix URL parlent des allergenes, douze de la chaine
 * du froid : Google en retient une et laisse les autres dehors.
 *
 * Elles restent publiees, maillees et explorables : elles portent les
 * references reglementaires point par point, c'est la preuve du serieux du
 * cabinet, et un moteur de reponse peut les citer. Elles ne demandent
 * simplement plus a etre classees pour elles-memes.
 *
 * Pour reintegrer une famille : la retirer de cette liste, rebatir, et
 * resoumettre le sitemap. Rien d'autre a toucher.
 */
export const FAMILLES_HORS_INDEX = ['points-de-controle', 'themes'] as const;

export type FamilleHorsIndex = (typeof FAMILLES_HORS_INDEX)[number];

export const familleHorsIndex = (famille: string) =>
  (FAMILLES_HORS_INDEX as readonly string[]).includes(famille);

/**
 * Les pages legales.
 *
 * Elles portent deja `index: false` dans leur propre metadata, et c'est
 * volontaire : elles n'ont aucune valeur de recherche. Elles n'ont donc rien a
 * faire dans le sitemap non plus, sans quoi Search Console les compte parmi les
 * pages « exclues par une balise noindex ». Elles restent liees depuis le pied
 * de page, ce qui suffit largement.
 */
export const PAGES_LEGALES = ['/mentions-legales', '/confidentialite', '/cgv'] as const;

/** La directive `robots` a poser sur une page publiee mais non indexable. */
export const ROBOTS_HORS_INDEX = { index: false, follow: true } as const;
