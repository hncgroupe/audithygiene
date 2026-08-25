/**
 * Le format d'un dossier de fond.
 *
 * Un dossier n'est pas un article de blog : c'est la page de référence sur un
 * sujet, celle vers laquelle pointent les questions et les pages de commune.
 * Elle doit tenir seule, sans que le lecteur ait besoin d'ouvrir autre chose.
 */

export interface SectionDossier {
  /** Titre de section, rendu en h2. Formulé comme on le chercherait. */
  titre: string;
  /** Paragraphes pleins. Jamais de puce déguisée en phrase. */
  paragraphes: string[];
  /** Sous-parties optionnelles, rendues en h3. */
  sous?: { titre: string; texte: string }[];
}

export interface Dossier {
  /** Identifiant d'URL. kebab-case ASCII, sans accent. */
  slug: string;
  /** Titre de la page, rendu en h1. */
  titre: string;
  /** Balise title, 60 caractères au plus, sans le nom du site. */
  titreSeo: string;
  /** Meta description, 150 à 160 caractères. */
  description: string;
  /**
   * Réponse directe de 60 à 120 mots, autosuffisante et citable telle quelle.
   * C'est elle que les moteurs reprennent : elle doit répondre sans renvoyer
   * à la suite de la page.
   */
  reponse: string;
  /** Une à deux phrases d'ouverture, sous la réponse. */
  ouverture: string;
  /** Le corps du dossier. Huit à douze sections. */
  sections: SectionDossier[];
  /** Six à dix questions fréquentes propres au sujet. */
  faq: { question: string; reponse: string }[];
  /** Chemins internes réels vers lesquels le dossier renvoie. */
  liens: string[];
}
