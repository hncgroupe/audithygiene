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
 * Les familles retirees de l'index.
 *
 * Vide, et c'est une decision, pas un oubli.
 *
 * On a d'abord retire les 44 points de controle et les 17 themes, au motif que
 * leurs intitules sont des libelles internes de grille que personne ne tape.
 * Le raisonnement etait juste sur la demande, et faux sur la cause : ces pages
 * recevaient deja une dizaine de liens entrants contextuels chacune. Ce qui
 * les tenait hors de l'index n'etait pas leur sujet, c'etait qu'aucun lien ne
 * descendait jusqu'a elles depuis l'accueil. Leur grappe entiere formait un
 * ilot ferme.
 *
 * Un site voisin du meme groupe a mesure l'inverse exact de l'intuition : ses
 * pages les moins indexables etaient ses pages a intention d'achat pure, et
 * ses pages purement informatives, mieux maillees, etaient toutes indexees.
 * L'intention n'explique pas l'indexation. Le maillage l'explique.
 *
 * Le client a tranche : ces deux familles sortent quand meme. La decision se
 * tient sur la demande, pas sur le diagnostic. Personne ne cherche
 * « separation cru cuit respectee », et dix URL parlaient deja des allergenes.
 *
 * Consequence a garder en tete au moment de mesurer : l'effet du maillage se
 * lira sur les 289 pages qui restent declarees, communes, questions, dossiers,
 * activites et departements. Les 61 pages sortent de l'experience, on ne
 * saura pas si elles se seraient indexees une fois atteignables.
 *
 * Pour les reintegrer : vider cette liste, rebatir, resoumettre le sitemap.
 * Le sitemap et les balises robots suivent tout seuls.
 */
export const FAMILLES_HORS_INDEX: readonly string[] = ['points-de-controle', 'themes'];

export const familleHorsIndex = (famille: string) => FAMILLES_HORS_INDEX.includes(famille);

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
