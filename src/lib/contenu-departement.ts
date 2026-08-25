/**
 * Le contenu d'une page de département.
 *
 * Huit pages seulement, mais ce sont les hubs : elles distribuent le maillage
 * vers les communes et reçoivent les liens des sept autres. Elles doivent donc
 * porter autre chose qu'une liste de villes.
 *
 * Ce qu'elles portent : l'agrégat SIRENE du département, calculé à partir des
 * communes réellement relevées, et la répartition par activité. Aucun chiffre
 * n'est estimé ni arrondi vers le haut.
 */

import { ACTIVITES, COMMUNES, dep, nombre, type Commune } from './communes';
import { GRILLE_AUDIT } from './grille-audit';

const NB_POINTS = GRILLE_AUDIT.reduce((a, t) => a + t.items.length, 0);
const NB_THEMES = GRILLE_AUDIT.length;

export function contenuDepartement(code: string, nom: string, communes: Commune[]) {
  const total = communes.reduce((a, c) => a + c.total, 0);
  const population = communes.reduce((a, c) => a + c.population, 0);

  const parActivite = ACTIVITES.map((a) => ({
    libelle: a.libelle,
    nombre: communes.reduce((s, c) => s + (c.chiffres[a.cle] || 0), 0),
  }))
    .filter((x) => x.nombre > 0)
    .sort((x, y) => y.nombre - x.nombre)
    .map((x) => ({ ...x, part: Math.round((x.nombre / Math.max(total, 1)) * 100) }));

  /* La part du departement dans l'ensemble couvert : un chiffre que seule cette
     page peut donner, et qui situe le lecteur sans le flatter. */
  const totalRegion = COMMUNES.reduce((a, c) => a + c.total, 0);
  const partRegion = Math.round((total / Math.max(totalRegion, 1)) * 100);
  const premieres = communes.slice(0, 5);

  const blocs = [
    {
      titre: `${nombre(total)} établissements de bouche ${dep(code)}`,
      paragraphes: [
        `En agrégeant les relevés SIRENE des ${nombre(communes.length)} communes que nous couvrons ${dep(code, 'dans')}, on compte ${nombre(total)} établissements en activité pour ${nombre(population)} habitants, soit ${partRegion} % de l'ensemble francilien que nous suivons. La répartition est dominée par ${parActivite
          .slice(0, 3)
          .map((a) => `${nombre(a.nombre)} ${a.libelle}`)
          .join(', ')}.`,
        `Les cinq communes les plus denses sont ${premieres
          .map((c) => `${c.nom} (${nombre(c.total)})`)
          .join(', ')}. Ce classement ne dit rien de la qualité des établissements : il dit simplement où se concentre l'activité, et donc où la question de la conformité se pose le plus souvent.`,
      ],
    },
    {
      titre: `Un auditeur se déplace dans tout le ${nom}`,
      paragraphes: [
        `Nous intervenons partout en Île-de-France, et le ${nom} en fait partie au même titre que les sept autres départements. Aucune commune n'est écartée pour cause d'éloignement : un audit se fait sur place, et une grille d'hygiène ne se remplit pas à distance.`,
        `La visite se cale en dehors du service, l'auditeur arrive en civil, et rien ne signale sa présence en salle. Vous recevez ensuite un rapport complet avec son plan d'action, et les corrections vous reviennent : elles sont écrites pour être menées avec vos propres moyens.`,
      ],
    },
    {
      titre: `Les ${NB_POINTS} points vérifiés, quel que soit l'établissement`,
      paragraphes: [
        `La grille couvre ${NB_POINTS} points répartis en ${NB_THEMES} thèmes, de la chaîne du froid aux allergènes, et la visite les parcourt tous. Une table de vingt couverts relève des mêmes textes qu'une brasserie de deux cents : la réglementation ne fait pas de différence de taille, seule la durée de la visite change.`,
        `Chaque point porte sa référence réglementaire, et le rapport distingue ce qu'un texte impose de ce qui relève de la bonne pratique professionnelle. Cette distinction évite de vous faire dépenser pour une exigence qui n'existe pas, et évite surtout d'invoquer devant un agent une règle qui n'en est pas une.`,
      ],
    },
    {
      titre: `Avec nous, vous savez exactement quoi corriger`,
      paragraphes: [
        `L'auditeur relève les écarts, les classe par priorité et écrit le correctif attendu pour chacun, avec la preuve à constituer. La correction, elle, vous appartient : c'est vous qui connaissez vos contraintes, votre budget et votre calendrier, et la plupart des points se traitent sans intervention extérieure.`,
        `Notre part du travail est donc de rendre cette liste applicable seule. À mesure que vous la déroulez, le rapport et les preuves que vous y joignez forment un dossier daté qui montre ce qui a été constaté et ce que vous en avez fait. Il n'a aucune valeur officielle, mais il montre une chose difficile à contester : que l'établissement est tenu.`,
      ],
    },
  ];

  return {
    reponse: `Nous auditons les établissements de restauration ${dep(code, 'dans')} sur les ${NB_POINTS} points réglementaires de notre grille. La base SIRENE y recense ${nombre(total)} établissements de bouche répartis sur ${nombre(communes.length)} communes. Visite discrète, rapport complet, plan d'action priorisé, et des correctifs écrits pour être appliqués sans nous.`,
    total,
    population,
    parActivite,
    partRegion,
    blocs,
  };
}
