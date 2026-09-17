/**
 * Rapport d'audit hygiène, version PDF remise au client.
 *
 * Huit sections, dans l'ordre où un restaurateur en a besoin : la couverture et
 * sa jauge de maîtrise, le sommaire, les points à corriger, les risques et les
 * suites possibles, les résultats thème par thème, le détail de tous les points,
 * les références réglementaires, la portée du document.
 *
 * Trois contraintes techniques apprises à la dure, à ne pas défaire :
 *  - le numéro de page est ancré par le haut. Ancré par le bas, un nœud fixe dont
 *    le contenu est recalculé page après page fait diverger le calcul de position
 *    et pdfkit refuse le nombre obtenu ;
 *  - pas de dégradé SVG dans un bloc fixe, pour la même raison ;
 *  - pas de `wrap={false}` sur un bloc qui peut dépasser la hauteur d'une page :
 *    les fiches portent des photos et des textes longs, elles doivent pouvoir se
 *    couper. `minPresenceAhead` évite les titres orphelins en bas de page.
 */

import {
  Document,
  Page,
  Text,
  View,
  Image,
  Svg,
  Path,
  Rect,
  Circle,
  Line,
  Polygon,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';
import type { RapportHygiene, ActionCorrective, RapportTheme } from '@/lib/rapport-hygiene';
import { LIBELLE_CONFORMITE, COULEUR_CONFORMITE } from '@/lib/rapport-hygiene';
import {
  SUITES_CONTROLE,
  RISQUES_SANITAIRES,
  RISQUES_ETABLISSEMENT,
  AVERTISSEMENT_SUITES,
  suitesProbables,
  lectureDuRisque,
} from '@/lib/risques-sanctions';

export interface HygienePdfData {
  etablissement: string;
  adresse?: string | null;
  ville?: string | null;
  type?: string | null;
  date: string;
  reference: string;
  auditeur: string;
  grilleVersion: string;
  /** Logo blanc en data URI, posé sur le bandeau du pied de page. */
  logoBlanc?: string | null;
  /** Logo du client en data URI, posé sur la couverture. Facultatif. */
  logoClient?: string | null;
  /** Logo de marque (wordmark vert) en data URI, en tête de couverture. */
  logoMarque?: string | null;
  rapport: RapportHygiene;
}

/* ------------------------------------------------------------------ Polices */

/*
 * Le document suit la police de la marque : la pile système Apple à l'écran, et
 * sa traduction imprimable ici. Helvetica est la police que cette pile désigne
 * elle-même hors Apple, elle est présente dans tous les lecteurs PDF et n'a rien
 * à embarquer : le fichier reste léger et s'ouvre partout à l'identique.
 */
const FAMILLE = 'Helvetica';

/*
 * Pas de césure. Par défaut, le moteur coupe les mots en fin de ligne avec un
 * algorithme anglais : « établis-sement », « tempéra-tures ». Rendre le mot
 * entier laisse le texte respirer et fait tout de suite plus sérieux.
 */
Font.registerHyphenationCallback((mot) => [mot]);
const poids = (g: 400 | 500 | 600 | 700) =>
  g >= 600 ? ({ fontFamily: 'Helvetica-Bold' } as const) : ({} as const);

/* ------------------------------------------------------------------ Palette */

const ENCRE = '#0C1B17';
const GRIS = '#6B7D77';
const GRIS_CLAIR = '#9AA8A3';
const FILET = '#E2E9E6';
const FILET_FORT = '#CBD5D1';
const VERT = '#10B981';
const VERT_PROFOND = '#04543C';
const ROUGE = '#DC2626';
const AMBRE = '#B45309';

const A4_HAUTEUR = 841.89;
const PIED_HAUTEUR = 32;
const MARGE = 52;

/* ------------------------------------------------------------------- Styles */

const s = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 60,
    paddingHorizontal: MARGE,
    fontSize: 7,
    lineHeight: 1.5,
    color: ENCRE,
    fontFamily: FAMILLE,
    ...poids(400),
  },
  pageCouverture: {
    paddingBottom: 60,
    fontSize: 7,
    lineHeight: 1.5,
    color: ENCRE,
    fontFamily: FAMILLE,
    ...poids(400),
  },

  /* Couverture */
  banniere: { paddingHorizontal: MARGE, paddingTop: 40, paddingBottom: 0 },
  banniereRang: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logoMarque: { width: 132, height: 26, objectFit: 'contain' },
  separateurCouverture: { marginTop: 20, borderTopWidth: 0.7, borderTopColor: FILET },
  rangTitre: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  marqueBlanche: { fontSize: 8.8, color: ENCRE, ...poids(600) },
  marqueFine: { color: VERT },
  banniereDate: { fontSize: 6.8, color: GRIS_CLAIR },
  titreCouverture: { fontSize: 23, color: ENCRE, letterSpacing: -0.8, lineHeight: 1.12, ...poids(600) },
  sousCouverture: { fontSize: 7.6, color: GRIS, marginTop: 8, maxWidth: 380 },
  confidentiel: {
    marginTop: 18,
    alignSelf: 'flex-start',
    borderWidth: 0.8,
    borderColor: FILET_FORT,
    borderRadius: 20,
    paddingVertical: 3.5,
    paddingHorizontal: 11,
    fontSize: 6,
    color: GRIS,
  },

  corpsCouverture: { paddingHorizontal: MARGE, paddingTop: 20 },
  jaugeRang: { flexDirection: 'row', alignItems: 'flex-start' },
  logoClientCadre: {
    width: 74,
    height: 44,
    borderWidth: 0.7,
    borderColor: FILET,
    borderRadius: 6,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoClientImage: { maxWidth: 62, maxHeight: 32, objectFit: 'contain' },
  jaugeTexte: { flex: 1, paddingLeft: 26, paddingTop: 6 },
  niveauTitre: { fontSize: 13.6, letterSpacing: -0.4, ...poids(600) },
  niveauPhrase: { color: GRIS, marginTop: 8, maxWidth: 310, lineHeight: 1.5 },

  compteurs: { flexDirection: 'row', marginTop: 16 },
  compteur: { marginRight: 26 },
  compteurVal: { fontSize: 13.6, letterSpacing: -0.4, lineHeight: 1, ...poids(600) },
  compteurNom: { fontSize: 6.4, color: GRIS, marginTop: 3 },

  premier: { marginTop: 18, borderTopWidth: 0.7, borderTopColor: FILET, paddingTop: 12 },
  premierLigne: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 7 },
  premierDelai: { width: 74, fontSize: 6.4, color: GRIS, textAlign: 'right' },

  ficheEtab: { marginTop: 18, borderTopWidth: 0.7, borderTopColor: FILET, paddingTop: 12, flexDirection: 'row', flexWrap: 'wrap' },
  champ: { width: '50%', marginBottom: 7 },
  champNom: { fontSize: 6, color: GRIS_CLAIR, marginBottom: 1 },
  champVal: { fontSize: 7.6, ...poids(500) },

  /* Plan du froid */
  frigo: { marginTop: 12, borderWidth: 0.7, borderColor: FILET, borderRadius: 8 },
  etage: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 8, paddingHorizontal: 12, borderTopWidth: 0.7, borderTopColor: FILET },
  etageBande: { width: 4, height: 30, borderRadius: 2 },
  etageNiveau: { fontSize: 6, color: GRIS_CLAIR, marginBottom: 1 },
  frigoPied: { paddingVertical: 9, paddingHorizontal: 12, borderTopWidth: 0.7, borderTopColor: FILET },
  verdictRang: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 12, padding: 11, borderWidth: 0.7, borderColor: FILET, borderRadius: 6 },
  verdictPastille: { width: 8, height: 8, borderRadius: 4, marginTop: 3, marginRight: 10 },

  /* Panneau de l'étoile */
  panneau: { borderWidth: 0.7, borderColor: FILET, borderRadius: 10, paddingVertical: 18, paddingHorizontal: 20, alignItems: 'center' },
  panneauTitre: { fontSize: 8.4, color: ENCRE, alignSelf: 'flex-start', ...poids(600) },
  panneauNote: { fontSize: 6.4, color: GRIS_CLAIR, alignSelf: 'flex-start', marginTop: 2 },
  panneauLegende: { flexDirection: 'row', marginTop: 4, alignSelf: 'flex-start' },
  legendePuce: { flexDirection: 'row', alignItems: 'center', marginRight: 14 },

  colonnes: { flexDirection: 'row', marginTop: 24 },
  colonne: { flex: 1 },
  colonneGauche: { marginRight: 28 },

  faible: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 7, borderTopWidth: 0.7, borderTopColor: FILET },
  faibleVal: { width: 26, textAlign: 'right', fontSize: 8.8, ...poids(600) },

  /* Titres de section */
  chapitre: { marginTop: 30 },
  teteSection: { marginBottom: 16 },
  regle: { width: 26, height: 2, backgroundColor: VERT, marginBottom: 12 },
  h1: { fontSize: 15.2, letterSpacing: -0.6, lineHeight: 1.2, ...poids(600) },
  h2: { fontSize: 9.2, letterSpacing: -0.2, ...poids(600) },
  h3: { fontSize: 7.6, ...poids(600) },
  chapeau: { color: GRIS, marginTop: 7, maxWidth: 430 },
  gris: { color: GRIS },
  petit: { fontSize: 6.4, color: GRIS, lineHeight: 1.5 },
  filet: { borderTopWidth: 0.7, borderTopColor: FILET },
  bloc: { marginTop: 7 },
  cle: { fontSize: 6, color: GRIS_CLAIR, marginBottom: 1.5 },
  section: { marginTop: 22 },

  /* Sommaire */
  sommaireLigne: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10, borderTopWidth: 0.7, borderTopColor: FILET },
  sommaireRond: { width: 26, height: 26, borderRadius: 13, borderWidth: 0.7, borderColor: FILET, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  sommaireNum: { width: 20, fontSize: 7.2, color: GRIS_CLAIR, paddingTop: 3 },

  /* Thèmes */
  thLigne: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5.5, borderTopWidth: 0.7, borderTopColor: FILET },
  thIcone: { width: 20 },
  thNom: { flex: 1, fontSize: 7.2 },
  thCompte: { width: 80, fontSize: 6.4, color: GRIS_CLAIR, textAlign: 'right', paddingRight: 10 },
  thBarreFond: { width: 76, height: 3, borderRadius: 1.5, backgroundColor: '#EDF2F0' },
  thBarre: { height: 3, borderRadius: 1.5 },
  thVal: { width: 26, textAlign: 'right', fontSize: 7.2, ...poids(600) },

  /* Fiches d'action */
  fiche: { marginTop: 11, borderWidth: 0.7, borderColor: FILET, borderRadius: 6, padding: 12 },
  ficheTete: { flexDirection: 'row', alignItems: 'flex-start' },
  ficheTitre: { fontSize: 8.4, letterSpacing: -0.2, lineHeight: 1.3, ...poids(600) },
  ficheMeta: { fontSize: 6.4, color: GRIS, marginTop: 1.5 },
  jeton: { borderRadius: 9, paddingVertical: 2.5, paddingHorizontal: 8, fontSize: 6, color: '#FFFFFF', ...poids(600) },
  ficheCorps: { marginTop: 11 },
  ficheCode: { fontSize: 6.4, color: GRIS_CLAIR, marginTop: 2 },

  correction: { marginTop: 9, borderWidth: 0.8, borderColor: ENCRE, borderRadius: 5, paddingVertical: 8, paddingHorizontal: 10 },
  correctionCle: { fontSize: 6, color: GRIS, marginBottom: 2 },
  correctionTexte: { fontSize: 7.6, lineHeight: 1.45, ...poids(700) },

  bandePhotos: { flexDirection: 'row', marginTop: 4 },
  photo: { width: 124, height: 88, objectFit: 'cover', marginRight: 7, borderRadius: 4 },

  /* Détail */
  ptLigne: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 3.5, borderTopWidth: 0.7, borderTopColor: FILET },
  ptTexte: { flex: 1, paddingRight: 10 },
  ptEtat: { width: 116, textAlign: 'right', fontSize: 6.4, color: GRIS },

  /* Suites de contrôle */
  suite: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 7, borderTopWidth: 0.7, borderTopColor: FILET },
  suiteRang: { width: 18, height: 18, borderRadius: 9, marginRight: 12, textAlign: 'center', paddingTop: 4.6, fontSize: 6.4, lineHeight: 1, color: '#FFFFFF', ...poids(600) },
  suiteQuand: { fontSize: 6.4, color: GRIS_CLAIR, marginTop: 0.5 },

  encart: { marginTop: 14, padding: 12, borderRadius: 6, borderWidth: 0.7, borderColor: FILET },
  alerte: { marginTop: 16, padding: 12, borderRadius: 6, borderWidth: 0.7, borderColor: '#F1C7C7', borderLeftWidth: 2.5, borderLeftColor: ROUGE },

  renvoi: { flexDirection: 'row', paddingVertical: 6, borderTopWidth: 0.7, borderTopColor: FILET },
  renvoiCode: { width: 66, fontSize: 6.4, color: GRIS_CLAIR, paddingTop: 1 },

  cloture: { marginTop: 26, paddingTop: 16, borderTopWidth: 0.7, borderTopColor: FILET },
  signatures: { flexDirection: 'row', marginTop: 34 },
  signature: { flex: 1 },
  signatureLigne: { borderBottomWidth: 0.7, borderBottomColor: FILET_FORT, height: 30, marginBottom: 4 },

  ligneMeta: { flexDirection: 'row', paddingVertical: 5, borderTopWidth: 0.7, borderTopColor: FILET },
  metaCle: { width: 130, color: GRIS },

  /* Pied de page */
  bandeau: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: PIED_HAUTEUR,
    backgroundColor: VERT_PROFOND,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  bandeauLogo: { width: 60, height: 12, objectFit: 'contain' },
  bandeauMarque: { width: 60, fontSize: 6.8, color: '#FFFFFF', ...poids(600) },
  bandeauNom: { flex: 1, textAlign: 'center', fontSize: 6.4, color: '#BFE7D7' },
  bandeauPage: { width: 60 },
  numPage: {
    position: 'absolute',
    top: A4_HAUTEUR - PIED_HAUTEUR + 10.5,
    right: 22,
    width: 60,
    textAlign: 'right',
    fontSize: 6.4,
    color: '#BFE7D7',
  },
});

/* ------------------------------------------------------------------ Outils */

function couleurScore(n: number | null): string {
  if (n === null) return '#D7DEDB';
  if (n >= 80) return VERT;
  if (n >= 60) return '#F59E0B';
  return ROUGE;
}

/**
 * Une référence encore marquée TODO est une amorce interne, pas du texte validé
 * (rule methodology-guard). Elle ne sort pas dans le document remis au client.
 */
function referenceValide(texte?: string | null): texte is string {
  if (!texte) return false;
  const t = texte.trim();
  return t.length > 12 && !t.toUpperCase().startsWith('TODO');
}

/** Première phrase de la référence réglementaire. Le texte entier part en annexe. */
function abrege(texte: string, max = 180): string {
  const t = texte.trim();
  if (t.length <= max) return t;
  const coupe = t.slice(0, max);
  const point = Math.max(coupe.lastIndexOf('. '), coupe.lastIndexOf(' ; '));
  return `${(point > 60 ? coupe.slice(0, point) : coupe).trim()}.`;
}

/* ------------------------------------------------------------------ Icônes */

/**
 * Pictogrammes au trait, un par thème de la grille. Ils servent de repère
 * visuel d'une page à l'autre : le même thème porte toujours le même signe.
 */
const TRACES: Record<string, string> = {
  thermometre: 'M9 2.6a2.1 2.1 0 0 1 4.2 0v8.1a4.6 4.6 0 1 1-4.2 0Z M11.1 6.4v6.6',
  flamme: 'M11 2.2c3 3 4.6 5.2 4.6 7.6a4.6 4.6 0 1 1-9.2 0c0-1.3.5-2.4 1.5-3.6.3 1 .9 1.6 1.7 1.8.1-2.3.6-4.2 1.4-5.8Z',
  etiquette: 'M3.4 3.4h7.1l7.1 7.1-7.1 7.1-7.1-7.1Z M6.7 6.7h.02',
  mains: 'M5.4 10.2V4.9a1.5 1.5 0 0 1 3 0v4 M8.4 8.4V3.6a1.5 1.5 0 0 1 3 0v4.8 M11.4 8.6V5.1a1.5 1.5 0 0 1 3 0v7.1a5.4 5.4 0 0 1-5.4 5.4 5.4 5.4 0 0 1-5.4-5.4v-1.4a1.5 1.5 0 0 1 2.8-.7',
  goutte: 'M10.5 2.4c3.3 3.7 5 6.3 5 8.4a5 5 0 1 1-10 0c0-2.1 1.7-4.7 5-8.4Z',
  nuisible: 'M10.5 6.2a4 4 0 0 1 4 4v2.2a4 4 0 1 1-8 0v-2.2a4 4 0 0 1 4-4Z M10.5 6.2V3.6 M6.5 8.4 3.6 6.6 M14.5 8.4l2.9-1.8 M6.5 12.4H3.4 M14.5 12.4h3.1',
  cartons: 'M3.6 7.4h13.8v9.8H3.6Z M3.6 7.4 6 3.8h9l2.4 3.6 M10.5 7.4v9.8',
  local: 'M3.4 17.2V8.1l7.1-4.9 7.1 4.9v9.1Z M8.2 17.2v-5.3h4.6v5.3',
  poubelle: 'M4.4 6.4h12.2 M8 6.4V4.2h5v2.2 M6 6.4l.9 10.8h7.2l.9-10.8 M9 9.4v5 M12 9.4v5',
  classeur: 'M5.2 3.2h7l3.6 3.6v11H5.2Z M12.2 3.2v3.6h3.6 M7.8 11h5.4 M7.8 14h5.4',
  allergene: 'M10.5 3.4c2 2.6 3 4.6 3 6.2a3 3 0 1 1-6 0c0-1.6 1-3.6 3-6.2Z M4.8 14.6c1.8 1.6 3.7 2.4 5.7 2.4s3.9-.8 5.7-2.4',
  robinet: 'M3.6 5.4h6.9v3.2H3.6Z M10.5 6.9h3.4a2.6 2.6 0 0 1 2.6 2.6v1.6 M16.5 13.4c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8c0-1 1.8-2.8 1.8-2.8s1.8 1.8 1.8 2.8Z',
  loupe: 'M9.4 3.6a5.8 5.8 0 1 1 0 11.6 5.8 5.8 0 0 1 0-11.6Z M13.6 13.6l3.8 3.8',
  balance: 'M10.5 3.6v13.6 M5.4 6.2h10.2 M5.4 6.2 3 11.4h4.8Z M15.6 6.2 13.2 11.4H18Z',
  bouclier: 'M10.5 3.2 16.8 5.6v4.8c0 3.6-2.5 6-6.3 7.4-3.8-1.4-6.3-3.8-6.3-7.4V5.6Z M7.9 10.4l1.9 1.9 3.3-3.4',
  liste: 'M7.4 5.6h9.2 M7.4 10.5h9.2 M7.4 15.4h9.2 M4.4 5.6h.02 M4.4 10.5h.02 M4.4 15.4h.02',
};

/** Nom court du thème, pour les axes de l'étoile. */
function themeCourt(theme: string): string {
  const t = theme.toLowerCase();
  if (t.includes('froid')) return 'Froid';
  if (t.includes('cuisson') || t.includes('température')) return 'Cuisson';
  if (t.includes('traça') || t.includes('dlc')) return 'Traçabilité';
  if (t.includes('personnel')) return 'Personnel';
  if (t.includes('nettoyage') || t.includes('désinfection')) return 'Nettoyage';
  if (t.includes('nuisible')) return 'Nuisibles';
  if (t.includes('stockage') || t.includes('marche en avant')) return 'Stockage';
  if (t.includes('local') || t.includes('équipement')) return 'Locaux';
  if (t.includes('déchet')) return 'Déchets';
  if (t.includes('pms') || t.includes('maîtrise sanitaire')) return 'PMS';
  if (t.includes('allerg')) return 'Allergènes';
  if (t.includes('eau') || t.includes('glace')) return 'Eau';
  return theme.length > 12 ? `${theme.slice(0, 11)}.` : theme;
}

/** Rattache un thème de la grille à son pictogramme, par mot-clé. */
function iconeTheme(theme: string): string {
  const t = theme.toLowerCase();
  if (t.includes('froid')) return 'thermometre';
  if (t.includes('cuisson') || t.includes('température')) return 'flamme';
  if (t.includes('traça') || t.includes('dlc')) return 'etiquette';
  if (t.includes('personnel')) return 'mains';
  if (t.includes('nettoyage') || t.includes('désinfection')) return 'goutte';
  if (t.includes('nuisible')) return 'nuisible';
  if (t.includes('stockage') || t.includes('marche en avant')) return 'cartons';
  if (t.includes('local') || t.includes('équipement')) return 'local';
  if (t.includes('déchet')) return 'poubelle';
  if (t.includes('pms') || t.includes('maîtrise sanitaire')) return 'classeur';
  if (t.includes('allerg')) return 'allergene';
  if (t.includes('eau') || t.includes('glace')) return 'robinet';
  return 'liste';
}

function Glyphe({ nom, taille = 13, couleur = ENCRE }: { nom: string; taille?: number; couleur?: string }) {
  const d = TRACES[nom] ?? TRACES.liste;
  return (
    <Svg width={taille} height={taille} viewBox="0 0 21 21">
      {d.split(' M').map((part, i) => (
        <Path
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          d={i === 0 ? part : `M${part}`}
          stroke={couleur}
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ))}
    </Svg>
  );
}

/* ------------------------------------------------------------- Jauge de score */

/**
 * Le score en thermomètre plutôt qu'en anneau : c'est l'instrument du métier,
 * celui que l'auditeur a sorti de sa poche toute la visite.
 */
function Jauge({ score, couleur, evalues }: { score: number; couleur: string; evalues: number }) {
  const h = 112; // hauteur de la colonne graduée
  const hautX = 26;
  const part = Math.max(0, Math.min(100, score)) / 100;
  const remplie = evalues === 0 ? 0 : Math.max(4, h * part);
  const graduations = [0, 25, 50, 75, 100];

  return (
    <View style={{ width: 118, flexDirection: 'row' }}>
      <Svg width={52} height={h + 46} viewBox={`0 0 52 ${h + 46}`}>
        {/* tube */}
        <Rect x={hautX - 9} y={2} width={18} height={h + 10} rx={9} fill="#EDF2F0" />
        {/* colonne */}
        <Rect
          x={hautX - 5.5}
          y={2 + (h - remplie) + 6}
          width={11}
          height={remplie}
          rx={5.5}
          fill={evalues === 0 ? '#D7DEDB' : couleur}
        />
        {/* réservoir */}
        <Circle cx={hautX} cy={h + 26} r={15} fill={evalues === 0 ? '#D7DEDB' : couleur} />
        <Circle cx={hautX} cy={h + 26} r={8.5} fill="#FFFFFF" fillOpacity={0.22} />
        {/* graduations */}
        {graduations.map((g) => (
          <Line
            key={g}
            x1={hautX + 12}
            y1={2 + 6 + h - (h * g) / 100}
            x2={hautX + (g % 50 === 0 ? 22 : 17)}
            y2={2 + 6 + h - (h * g) / 100}
            stroke={g % 50 === 0 ? '#9AA8A3' : '#CBD6D2'}
            strokeWidth={g % 50 === 0 ? 1 : 0.7}
          />
        ))}
      </Svg>
      <View style={{ paddingTop: 2, paddingLeft: 2 }}>
        <Text style={{ fontSize: 27.2, letterSpacing: -1.4, lineHeight: 1, ...poids(700) }}>
          {evalues === 0 ? '·' : Math.round(score)}
        </Text>
        <Text style={{ fontSize: 6.4, color: GRIS, marginTop: 2 }}>sur 100</Text>
      </View>
    </View>
  );
}

/* ------------------------------------------------- Plan de rangement du froid */

/**
 * L'ordre des étages d'une enceinte froide, du propre vers le sale en descendant :
 * rien de cru ne doit se trouver au-dessus d'un produit prêt à manger, parce
 * qu'un jus qui goutte ne remonte jamais.
 *
 * Le verdict affiché est celui du point de la grille qui juge la séparation
 * cru/cuit sur cet audit. Si le point n'a pas été évalué, le plan reste un
 * repère de rangement et ne prétend rien dire de l'établissement.
 */
const ETAGES = [
  {
    niveau: 'Étage du haut',
    titre: 'Produits prêts à manger',
    detail: 'Desserts, entremets, fromages entamés, produits finis filmés et datés.',
    couleur: VERT,
  },
  {
    niveau: 'Deuxième étage',
    titre: 'Préparations cuites et refroidies',
    detail: 'Plats de la veille, sauces, cuissons refroidies, le tout couvert et daté.',
    couleur: '#3FBF8F',
  },
  {
    niveau: 'Troisième étage',
    titre: 'Crus préparés',
    detail: 'Viandes et poissons portionnés, marinades, en bacs fermés.',
    couleur: '#F59E0B',
  },
  {
    niveau: 'Bas et bac',
    titre: 'Crus bruts et légumes terreux',
    detail: 'Viandes et poissons non travaillés, légumes non lavés, dans le bac du bas.',
    couleur: ROUGE,
  },
];

function PlanDuFroid({ r }: { r: RapportHygiene }) {
  const point = r.themes
    .flatMap((t) => t.items)
    .find((i) => i.code.startsWith('STOCK-01'));
  const evalue =
    point && point.conformite !== 'NON_EVALUE' && point.conformite !== 'NON_APPLICABLE';

  return (
    <View style={s.section} minPresenceAhead={56}>
      <Text style={s.h2}>L&apos;ordre des étages, dans le froid</Text>
      <Text style={[s.gris, { marginTop: 6, maxWidth: 430 }]}>
        Le propre en haut, le cru en bas : un jus qui goutte ne remonte jamais. C&apos;est le seul
        rangement qui protège les produits prêts à manger.
      </Text>

      <View style={s.frigo}>
        {ETAGES.map((e, i) => (
          <View
            key={e.titre}
            style={[
              s.etage,
              i === 0 ? { borderTopWidth: 0 } : {},
            ]}
          >
            <View style={[s.etageBande, { backgroundColor: e.couleur }]} />
            <View style={{ flex: 1, paddingLeft: 12 }}>
              <Text style={s.etageNiveau}>{e.niveau}</Text>
              <Text style={{ ...poids(600), fontSize: 8 }}>{e.titre}</Text>
              <Text style={[s.petit, { marginTop: 1 }]}>{e.detail}</Text>
            </View>
          </View>
        ))}
        <View style={s.frigoPied}>
          <Text style={[s.petit, { color: GRIS }]}>
            Tout se range couvert et daté. Rien à même le sol, rien contre la grille de
            ventilation.
          </Text>
        </View>
      </View>

      <View style={[s.verdictRang, evalue ? {} : { borderColor: FILET }]}>
        <View
          style={[
            s.verdictPastille,
            { backgroundColor: point ? COULEUR_CONFORMITE[point.conformite] : GRIS_CLAIR },
          ]}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ ...poids(600), fontSize: 8 }}>
            {point
              ? `Sur cet audit : ${LIBELLE_CONFORMITE[point.conformite].toLowerCase()}`
              : 'Séparation cru/cuit non examinée sur cet audit'}
          </Text>
          <Text style={[s.petit, { marginTop: 1 }]}>
            {point?.commentaire?.trim()
              ? point.commentaire
              : evalue
                ? point?.intitule
                : 'Le plan ci-dessus reste le repère de rangement à appliquer.'}
          </Text>
        </View>
      </View>
    </View>
  );
}

/* --------------------------------------------------------------- Fragments */

/* --------------------------------------------------- Étoile des thèmes (radar) */

const RADAR_L = 436;
const RADAR_H = 300;
const RADAR_CX = RADAR_L / 2;
const RADAR_CY = RADAR_H / 2 - 2;
const RADAR_R = 94;

/** Point d'un axe, en partant du haut et dans le sens horaire. */
function pointRadar(i: number, n: number, rayon: number): [number, number] {
  const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
  return [RADAR_CX + rayon * Math.cos(angle), RADAR_CY + rayon * Math.sin(angle)];
}

function polygone(scores: number[]): string {
  return scores
    .map((sc, i) => {
      const [x, y] = pointRadar(i, scores.length, (RADAR_R * Math.max(0, Math.min(100, sc))) / 100);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

function anneau(fraction: number, n: number): string {
  return Array.from({ length: n }, (_, i) => {
    const [x, y] = pointRadar(i, n, RADAR_R * fraction);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

function couleurSommet(score: number): string {
  if (score >= 80) return VERT;
  if (score >= 60) return '#F59E0B';
  return ROUGE;
}

/**
 * L'étoile des thèmes : un axe par thème noté, un anneau tous les 25 points.
 * Elle ne montre que les thèmes réellement évalués. Faire figurer un thème non
 * évalué à zéro laisserait croire à un échec là où rien n'a été regardé.
 */
function Etoile({ themes }: { themes: RapportTheme[] }) {
  const n = themes.length;
  const scores = themes.map((t) => t.score ?? 0);

  return (
    <View style={{ width: RADAR_L, height: RADAR_H, position: 'relative' }}>
      <Svg width={RADAR_L} height={RADAR_H} viewBox={`0 0 ${RADAR_L} ${RADAR_H}`}>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <Polygon
            key={f}
            points={anneau(f, n)}
            fill="none"
            stroke={f === 1 ? FILET_FORT : FILET}
            strokeWidth={f === 1 ? 1 : 0.7}
          />
        ))}
        {themes.map((t, i) => {
          const [x, y] = pointRadar(i, n, RADAR_R);
          return (
            <Line
              key={t.theme}
              x1={RADAR_CX}
              y1={RADAR_CY}
              x2={x}
              y2={y}
              stroke={FILET}
              strokeWidth={0.7}
            />
          );
        })}
        <Polygon
          points={polygone(scores)}
          fill={VERT}
          fillOpacity={0.14}
          stroke={VERT_PROFOND}
          strokeWidth={1.7}
          strokeLinejoin="round"
        />
        {themes.map((t, i) => {
          const [x, y] = pointRadar(i, n, (RADAR_R * Math.max(0, Math.min(100, t.score ?? 0))) / 100);
          return (
            <Circle
              key={t.theme}
              cx={x}
              cy={y}
              r={3}
              fill="#FFFFFF"
              stroke={couleurSommet(t.score ?? 0)}
              strokeWidth={2}
            />
          );
        })}
      </Svg>

      {themes.map((t, i) => {
        /* Étiquettes posées sur une ellipse, plus large que haute : à douze axes,
           un cercle rapproche trop les étiquettes du haut et du bas. */
        const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
        const x = RADAR_CX + (RADAR_R + 40) * Math.cos(angle);
        const y = RADAR_CY + (RADAR_R + 17) * Math.sin(angle);
        return (
          <View
            key={t.theme}
            style={{ position: 'absolute', left: x - 33, top: y - 11, width: 66, alignItems: 'center' }}
          >
            <Text style={{ fontSize: 6.4, color: GRIS, textAlign: 'center', lineHeight: 1.25 }}>
              {themeCourt(t.theme)}
            </Text>
            <Text
              style={{
                fontSize: 8,
                color: couleurSommet(t.score ?? 0),
                textAlign: 'center',
                lineHeight: 1.25,
                ...poids(700),
              }}
            >
              {Math.round(t.score ?? 0)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

/* ------------------------------------------------ Répartition et carte des points */

/** Les points audités en une barre : conformes, écarts, critiques, écartés du calcul. */
function Repartition({ r }: { r: RapportHygiene }) {
  const parts = [
    { nom: 'conformes', n: r.conformes, couleur: VERT },
    { nom: 'écarts mineurs', n: r.ncMineures, couleur: '#F59E0B' },
    { nom: 'points critiques', n: r.ncMajeures, couleur: ROUGE },
    { nom: 'hors calcul', n: r.nonApplicables + r.nonEvalues, couleur: '#D7DEDB' },
  ].filter((x) => x.n > 0);
  const total = parts.reduce((t, x) => t + x.n, 0) || 1;

  return (
    <View>
      <View style={{ flexDirection: 'row', height: 9, borderRadius: 4.5, marginTop: 10 }}>
        {parts.map((x, i) => (
          <View
            key={x.nom}
            style={{
              width: `${(x.n / total) * 100}%`,
              backgroundColor: x.couleur,
              borderTopLeftRadius: i === 0 ? 4.5 : 0,
              borderBottomLeftRadius: i === 0 ? 4.5 : 0,
              borderTopRightRadius: i === parts.length - 1 ? 4.5 : 0,
              borderBottomRightRadius: i === parts.length - 1 ? 4.5 : 0,
            }}
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
        {parts.map((x) => (
          <View key={x.nom} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 4 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: x.couleur, marginRight: 5 }} />
            <Text style={{ fontSize: 6.8 }}>
              <Text style={{ ...poids(600) }}>{x.n}</Text>
              <Text style={{ color: GRIS }}> {x.nom}</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/** Un carré par point audité, dans l'ordre de la grille : l'état du thème d'un coup d'oeil. */
function Pastilles({ t }: { t: RapportTheme }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 86 }}>
      {t.items.map((i) => (
        <View
          key={i.code}
          style={{
            width: 6,
            height: 6,
            borderRadius: 1.5,
            marginRight: 2.5,
            marginBottom: 2.5,
            backgroundColor: COULEUR_CONFORMITE[i.conformite],
          }}
        />
      ))}
    </View>
  );
}

function Bandeau({ data }: { data: HygienePdfData }) {
  return (
    <View style={s.bandeau} fixed>
      {data.logoBlanc ? (
        <Image src={data.logoBlanc} style={s.bandeauLogo} />
      ) : (
        <Text style={s.bandeauMarque}>audit hygiène</Text>
      )}
      <Text style={s.bandeauNom}>
        {data.etablissement}, rapport du {data.date}
      </Text>
      {/* Réserve la place du numéro, posé par NumeroPage. */}
      <View style={s.bandeauPage} />
    </View>
  );
}

/** Numéro de page, rejoué sur chaque page. Ancré par le haut, voir l'entête. */
function NumeroPage() {
  return (
    <Text
      style={s.numPage}
      fixed
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  );
}

function Pied({ data }: { data: HygienePdfData }) {
  return (
    <>
      <Bandeau data={data} />
      <NumeroPage />
    </>
  );
}

/**
 * Signet de navigation du PDF. react-pdf sait le poser sur un bloc, mais ne le
 * déclare pas dans ses types : on passe donc par cette petite fonction.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const signet = (titre: string): any => ({ bookmark: titre });

function TeteSection({ titre, chapeau }: { titre: string; chapeau?: string }) {
  return (
    <View style={s.teteSection} minPresenceAhead={70}>
      <View style={s.regle} />
      <Text style={s.h1}>{titre}</Text>
      {chapeau ? <Text style={s.chapeau}>{chapeau}</Text> : null}
    </View>
  );
}

function Champ({ nom, valeur }: { nom: string; valeur: string }) {
  return (
    <View style={s.champ}>
      <Text style={s.champNom}>{nom}</Text>
      <Text style={s.champVal}>{valeur}</Text>
    </View>
  );
}

function Meta({ cle, valeur }: { cle: string; valeur: string }) {
  return (
    <View style={s.ligneMeta}>
      <Text style={s.metaCle}>{cle}</Text>
      <Text>{valeur}</Text>
    </View>
  );
}

function LigneTheme({ t }: { t: RapportTheme }) {
  const couleur = couleurScore(t.score);
  const ecarts = t.ncMajeures + t.ncMineures;
  return (
    <View style={s.thLigne} wrap={false}>
      <View style={s.thIcone}>
        <Glyphe nom={iconeTheme(t.theme)} taille={13} couleur={t.score === null ? GRIS_CLAIR : ENCRE} />
      </View>
      <Text style={s.thNom}>{t.theme}</Text>
      <Pastilles t={t} />
      <Text style={s.thCompte}>
        {t.score === null
          ? 'non évalué'
          : ecarts === 0
            ? 'tout conforme'
            : `${ecarts} ${ecarts > 1 ? 'écarts' : 'écart'}`}
      </Text>
      <View style={s.thBarreFond}>
        <View
          style={[s.thBarre, { width: `${Math.max(0, Math.min(100, t.score ?? 0))}%`, backgroundColor: couleur }]}
        />
      </View>
      <Text style={[s.thVal, { color: t.score === null ? GRIS_CLAIR : ENCRE }]}>
        {t.score === null ? '·' : Math.round(t.score)}
      </Text>
    </View>
  );
}

function Fiche({ a }: { a: ActionCorrective }) {
  const critique = a.priorite === 'IMMEDIAT';
  return (
    <View style={s.fiche} minPresenceAhead={46}>
      <View style={s.ficheTete}>
        <View style={{ width: 22, paddingTop: 1 }}>
          <Glyphe nom={iconeTheme(a.theme)} taille={14} couleur={critique ? ROUGE : AMBRE} />
        </View>
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={s.ficheTitre}>{a.intitule}</Text>
          <Text style={s.ficheMeta}>
            {a.theme}, point {a.code}
          </Text>
        </View>
        <Text style={[s.jeton, { backgroundColor: critique ? ROUGE : AMBRE }]}>
          {critique ? 'Sous 48 h' : 'Sous 30 jours'}
        </Text>
      </View>

      <View style={s.ficheCorps}>
        {a.constat ? (
          <View style={s.bloc}>
            <Text style={s.cle}>Constaté sur place</Text>
            <Text>{a.constat}</Text>
          </View>
        ) : null}
        <View style={s.bloc}>
          <Text style={s.cle}>Pourquoi ça compte</Text>
          <Text>{a.risque}</Text>
        </View>
        {/* La correction est ce que le client vient chercher : elle est encadrée. */}
        <View style={s.correction}>
          <Text style={s.correctionCle}>À faire</Text>
          <Text style={s.correctionTexte}>{a.correctif}</Text>
        </View>

        {a.photos.length > 0 && (
          /* Le libellé et la bande de photos tiennent ensemble : séparés, le
             libellé restait seul en bas de page. */
          <View style={s.bloc} wrap={false}>
            <Text style={s.cle}>Sur place</Text>
            <View style={s.bandePhotos}>
              {a.photos.slice(0, 3).map((p, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Image key={i} src={p.url} style={s.photo} />
              ))}
            </View>
          </View>
        )}

        {critique ? (
          <View style={s.bloc}>
            <Text style={s.cle}>Si ce point est retrouvé en contrôle</Text>
            <Text style={s.petit}>
              {suitesProbables(a.priorite)
                .map((x) => x.titre.charAt(0).toLowerCase() + x.titre.slice(1))
                .join(', ')}
              .
            </Text>
          </View>
        ) : null}

        {referenceValide(a.referenceRegl) ? (
          <View style={s.bloc}>
            <Text style={s.cle}>Texte applicable</Text>
            <Text style={s.petit}>{abrege(a.referenceRegl)} Version complète en annexe.</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function LigneSuite({ rang, titre, quand, texte, couleur }: (typeof SUITES_CONTROLE)[number]) {
  return (
    <View style={s.suite} wrap={false}>
      <Text style={[s.suiteRang, { backgroundColor: couleur }]}>{rang}</Text>
      <View style={{ flex: 1 }}>
        <Text style={s.h3}>{titre}</Text>
        <Text style={s.suiteQuand}>{quand}</Text>
        <Text style={[s.gris, { marginTop: 3 }]}>{texte}</Text>
      </View>
    </View>
  );
}

/* ------------------------------------------------------------------ Sommaire */

function LigneSommaire({
  num,
  icone,
  titre,
  texte,
}: {
  num: number;
  icone: string;
  titre: string;
  texte: string;
}) {
  return (
    <View style={s.sommaireLigne} wrap={false}>
      <Text style={s.sommaireNum}>{String(num).padStart(2, '0')}</Text>
      <View style={s.sommaireRond}>
        <Glyphe nom={icone} taille={14} couleur={VERT_PROFOND} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.h2}>{titre}</Text>
        <Text style={[s.gris, { marginTop: 2, maxWidth: 380 }]}>{texte}</Text>
      </View>
    </View>
  );
}

/* ------------------------------------------------------------------ Document */

export function HygieneDocument({ data }: { data: HygienePdfData }) {
  const r = data.rapport;
  const references = r.themes
    .flatMap((t) => t.items)
    .filter((i) => referenceValide(i.referenceRegl))
    .map((i) => ({ code: i.code, intitule: i.intitule, texte: i.referenceRegl as string }));

  const lieu = [data.type, data.ville].filter(Boolean).join(', ');

  /* Les thèmes notés d'abord, du plus faible au plus solide : on lit ce qui
     appelle du travail avant ce qui est tenu. Les thèmes sans point évalué
     ferment la liste. */
  const themesClasses = r.themes
    .slice()
    .sort((a, b) =>
      a.score === null || b.score === null
        ? (a.score === null ? 1 : 0) - (b.score === null ? 1 : 0)
        : a.score - b.score
    );

  /* Les trois premières choses à faire, reprises en couverture. */
  const priorites = [...r.actionsImmediates, ...r.actionsTrente].slice(0, 5);

  /* L'étoile a besoin d'au moins trois axes pour dessiner une surface. */
  const themesNotes = r.themes.filter((t) => t.score !== null);
  const themesSansNote = r.themes.filter((t) => t.score === null);
  const plusFaibles = themesClasses.filter((t) => t.score !== null).slice(0, 4);

  return (
    <Document
      title={`Rapport d'audit hygiène, ${data.etablissement}`}
      author="audit hygiène"
      subject={`Audit du ${data.date}, référence ${data.reference}`}
      keywords="audit hygiène, HACCP, plan correctif"
    >
      {/* 01 · Couverture */}
      <Page size="A4" style={s.pageCouverture} bookmark="Couverture">
        <View style={s.banniere}>
          <View style={s.banniereRang}>
            {data.logoMarque ? (
              <Image src={data.logoMarque} style={s.logoMarque} />
            ) : (
              <Text style={s.marqueBlanche}>
                audit <Text style={s.marqueFine}>hygiène</Text>
              </Text>
            )}
            <Text style={s.banniereDate}>{data.reference}</Text>
          </View>

          {/* Le nom du client ne se colle pas sous la marque : un filet les sépare. */}
          <View style={s.separateurCouverture} />
          <View style={s.rangTitre}>
            {data.logoClient ? (
              <View style={s.logoClientCadre}>
                <Image src={data.logoClient} style={s.logoClientImage} />
              </View>
            ) : null}
            <Text style={[s.titreCouverture, data.logoClient ? { marginLeft: 14 } : {}]}>
              {data.etablissement}
            </Text>
          </View>
          <Text style={s.sousCouverture}>
            Rapport d&apos;audit hygiène du {data.date}
            {lieu ? `, ${lieu}` : ''}.
          </Text>
          <Text style={s.confidentiel}>
            Document confidentiel, destiné à l&apos;établissement audité
          </Text>
        </View>

        <View style={s.corpsCouverture}>
          <View style={s.jaugeRang}>
            <Jauge score={r.scoreGlobal} couleur={r.niveau.couleur} evalues={r.evalues} />
            <View style={s.jaugeTexte}>
              <Text style={[s.niveauTitre, { color: r.niveau.couleur }]}>{r.niveau.titre}</Text>
              <Text style={s.niveauPhrase}>{r.niveau.phrase}</Text>
              <View style={s.compteurs}>
                <View style={s.compteur}>
                  <Text style={[s.compteurVal, { color: VERT }]}>{r.conformes}</Text>
                  <Text style={s.compteurNom}>conformes</Text>
                </View>
                <View style={s.compteur}>
                  <Text style={[s.compteurVal, { color: r.ncMineures ? AMBRE : GRIS_CLAIR }]}>
                    {r.ncMineures}
                  </Text>
                  <Text style={s.compteurNom}>écarts mineurs</Text>
                </View>
                <View style={s.compteur}>
                  <Text style={[s.compteurVal, { color: r.ncMajeures ? ROUGE : GRIS_CLAIR }]}>
                    {r.ncMajeures}
                  </Text>
                  <Text style={s.compteurNom}>points critiques</Text>
                </View>
                <View style={s.compteur}>
                  <Text style={[s.compteurVal, { color: GRIS_CLAIR }]}>{r.nbPhotos}</Text>
                  <Text style={s.compteurNom}>photos</Text>
                </View>
              </View>
            </View>

          </View>

          {priorites.length > 0 ? (
            <View style={s.premier}>
              <Text style={s.h2}>À faire en premier</Text>
              {priorites.map((a) => (
                <View key={a.code} style={s.premierLigne}>
                  <View style={{ width: 20, paddingTop: 1 }}>
                    <Glyphe
                      nom={iconeTheme(a.theme)}
                      taille={12}
                      couleur={a.priorite === 'IMMEDIAT' ? ROUGE : AMBRE}
                    />
                  </View>
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text style={{ ...poids(500) }}>{a.intitule}</Text>
                    <Text style={s.petit}>{a.theme}</Text>
                  </View>
                  <Text style={s.premierDelai}>{a.delai.toLowerCase()}</Text>
                </View>
              ))}
              {r.actions.length > priorites.length ? (
                <Text style={[s.petit, { marginTop: 9 }]}>
                  et {r.actions.length - priorites.length} autre
                  {r.actions.length - priorites.length > 1 ? 's points' : ' point'} à corriger,
                  détaillés en partie 1.
                </Text>
              ) : null}
            </View>
          ) : null}

          <View style={s.ficheEtab}>
            <Champ nom="Adresse" valeur={data.adresse ?? data.ville ?? 'Non renseignée'} />
            <Champ nom="Type" valeur={data.type ?? 'Non renseigné'} />
            <Champ nom="Date de la visite" valeur={data.date} />
            <Champ nom="Auditeur" valeur={data.auditeur} />
            <Champ nom="Grille appliquée" valeur={data.grilleVersion} />
            <Champ nom="Points examinés" valeur={`${r.evalues} sur ${r.totalPoints}`} />
            <Champ nom="Référence du rapport" valeur={data.reference} />
          </View>

          <Text style={[s.petit, { marginTop: 14, maxWidth: 430 }]}>{MENTION_LABEL_PRIVE}</Text>

        </View>

        <Pied data={data} />
      </Page>

      {/* Le corps du rapport coule d'une partie à l'autre : ouvrir une page
          neuve à chaque partie laissait une demi-page blanche à chaque fin. */}
      <Page size="A4" style={s.page}>
      {/* 02 · Vue d'ensemble */}
      <View {...signet("Le résultat en un coup d'oeil")} style={s.chapitre}>
        <TeteSection
          titre="Le résultat en un coup d'oeil"
          chapeau="L'étoile donne la forme de l'établissement : plus la surface est large, plus la maîtrise est homogène. Un creux marque un thème à reprendre."
        />

        {themesNotes.length >= 3 ? (
          <View style={s.panneau}>
            <Text style={s.panneauTitre}>Maîtrise par thème</Text>
            <Text style={s.panneauNote}>un anneau tous les 25 points, le bord extérieur vaut 100</Text>
            <Etoile themes={themesNotes} />
            <View style={s.panneauLegende}>
              {[
                { c: VERT, t: '80 et plus, tenu' },
                { c: '#F59E0B', t: 'de 60 à 79, à consolider' },
                { c: ROUGE, t: 'moins de 60, à reprendre' },
              ].map((x) => (
                <View key={x.t} style={s.legendePuce}>
                  <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: x.c, marginRight: 5 }} />
                  <Text style={{ fontSize: 6, color: GRIS }}>{x.t}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={s.encart}>
            <Text style={s.petit}>
              L&apos;étoile des thèmes demande au moins trois thèmes notés. Cet audit en compte{' '}
              {themesNotes.length} : les notes se lisent directement dans la liste des thèmes.
            </Text>
          </View>
        )}

        {themesSansNote.length > 0 ? (
          <Text style={[s.petit, { marginTop: 10 }]}>
            Hors étoile, sans point évalué : {themesSansNote.map((t) => t.theme).join(', ')}.
          </Text>
        ) : null}

        <View style={s.colonnes}>
          <View style={[s.colonne, s.colonneGauche]}>
            <Text style={s.h2}>Où vont les points</Text>
            <Text style={[s.gris, { marginTop: 4 }]}>
              Les {r.totalPoints} points de la grille, par état constaté.
            </Text>
            <Repartition r={r} />
          </View>

          <View style={s.colonne}>
            <Text style={s.h2}>Les thèmes les plus faibles</Text>
            <Text style={[s.gris, { marginTop: 4 }]}>
              Par ordre de priorité, c&apos;est là que le travail paie le plus vite.
            </Text>
            <View style={{ marginTop: 10 }}>
              {plusFaibles.map((t) => (
                <View key={t.theme} style={s.faible} wrap={false}>
                  <View style={{ width: 18, paddingTop: 1 }}>
                    <Glyphe nom={iconeTheme(t.theme)} taille={12} couleur={couleurScore(t.score)} />
                  </View>
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={{ ...poids(500) }}>{t.theme}</Text>
                    <Text style={s.petit}>
                      {t.ncMajeures > 0
                        ? `${t.ncMajeures} critique${t.ncMajeures > 1 ? 's' : ''}`
                        : t.ncMineures > 0
                          ? `${t.ncMineures} écart${t.ncMineures > 1 ? 's' : ''} mineur${t.ncMineures > 1 ? 's' : ''}`
                          : 'aucun écart'}
                    </Text>
                  </View>
                  <Text style={[s.faibleVal, { color: couleurScore(t.score) }]}>
                    {Math.round(t.score ?? 0)}
                  </Text>
                </View>
              ))}
              <View style={s.filet} />
            </View>
          </View>
        </View>

      </View>

      {/* 03 · Sommaire */}
      <View {...signet("Sommaire")} style={s.chapitre}>
        <TeteSection
          titre="Ce que contient ce rapport"
          chapeau="Six parties, dans l'ordre de lecture conseillé. Si vous n'en lisez qu'une, lisez la première : elle suffit à savoir quoi faire cette semaine."
        />

        <View style={{ marginTop: 6 }}>
          <LigneSommaire
            num={1}
            icone="liste"
            titre="Les points à corriger"
            texte={
              r.actions.length === 0
                ? "Aucun écart relevé sur les points audités."
                : `${r.actions.length} ${r.actions.length > 1 ? 'fiches' : 'fiche'} : ce qui a été vu, pourquoi ça compte, ce qu'il faut faire, sous quel délai.`
            }
          />
          <LigneSommaire
            num={2}
            icone="balance"
            titre="Les risques et les suites"
            texte="Ce qu'un écart fait peser sur le consommateur, sur l'établissement, et l'échelle des suites d'un contrôle officiel."
          />
          <LigneSommaire
            num={3}
            icone="thermometre"
            titre="Les résultats par thème"
            texte="La note de chaque thème de la grille, du froid aux allergènes, avec le nombre d'écarts."
          />
          <LigneSommaire
            num={4}
            icone="loupe"
            titre="Le détail de tous les points"
            texte={`Les ${r.totalPoints} points examinés, leur état et les notes prises sur place.`}
          />
          <LigneSommaire
            num={5}
            icone="classeur"
            titre="Les références réglementaires"
            texte="Le texte sur lequel s'appuie chaque point, dans sa version en vigueur à la date de la visite."
          />
          <LigneSommaire
            num={6}
            icone="bouclier"
            titre="La portée du document"
            texte="Ce que ce rapport dit, ce qu'il ne dit pas, et comment le conserver."
          />
          <View style={s.filet} />
        </View>

        <View style={s.section}>
          <Text style={s.h2}>Comment se lit la note</Text>
          <Text style={[s.gris, { marginTop: 6, maxWidth: 430 }]}>
            Chaque point vaut un poids de 1 à 3 selon son impact sanitaire. Un point conforme rapporte la
            totalité de son poids, un écart mineur la moitié, un point critique rien. Les points non
            applicables et non évalués sortent du calcul.
          </Text>
          <View style={s.encart}>
            <Text style={s.petit}>
              Un point critique ne se compense pas. Tant qu&apos;il en reste un, le rapport place
              l&apos;établissement à redresser, quelle que soit la note obtenue ailleurs.
            </Text>
          </View>
        </View>

      </View>

      {/* 03 · Points à corriger, seulement s'il y en a */}
      {r.actions.length > 0 ? (
      <View {...signet("Points à corriger")} style={s.chapitre}>
        <TeteSection
          titre={
            r.actions.length === 0
              ? 'Aucun point à corriger'
              : `${r.actions.length} ${r.actions.length > 1 ? 'points à corriger' : 'point à corriger'}`
          }
          chapeau={
            r.actions.length === 0
              ? "Aucun écart n'a été relevé sur les points audités. Continuez à tenir vos relevés et vos enregistrements : ce sont eux qui font la preuve dans la durée."
              : "Classés par urgence. Prenez une photo après correction, c'est la preuve la plus simple à présenter."
          }
        />

        {r.actionsImmediates.length > 0 ? (
          <View style={{ marginTop: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[s.jeton, { backgroundColor: ROUGE }]}>Sous 48 heures</Text>
              <Text style={[s.gris, { marginLeft: 10, fontSize: 6.8 }]}>
                impact sanitaire direct, à traiter avant le prochain service
              </Text>
            </View>
            {r.actionsImmediates.map((a) => (
              <Fiche key={a.code} a={a} />
            ))}
          </View>
        ) : null}

        {r.actionsTrente.length > 0 ? (
          <View style={{ marginTop: r.actionsImmediates.length > 0 ? 26 : 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[s.jeton, { backgroundColor: AMBRE }]}>Sous 30 jours</Text>
              <Text style={[s.gris, { marginLeft: 10, fontSize: 6.8 }]}>
                écarts sans danger immédiat, à régulariser
              </Text>
            </View>
            {r.actionsTrente.map((a) => (
              <Fiche key={a.code} a={a} />
            ))}
          </View>
        ) : null}

      </View>
      ) : null}

      {/* 04 · Risques et suites */}
      <View {...signet("Risques et suites")} style={s.chapitre}>
        <TeteSection titre="Ce qu'un écart peut coûter" chapeau={lectureDuRisque(r)} />

        {r.ncMajeures > 0 ? (
          <View style={s.alerte}>
            <Text style={[s.h3, { color: ROUGE }]}>
              {r.ncMajeures} {r.ncMajeures > 1 ? 'points critiques' : 'point critique'} à traiter sous 48
              heures
            </Text>
            <Text style={[s.gris, { marginTop: 2 }]}>
              Le détail et le moyen de correction figurent aux fiches de la partie précédente.
            </Text>
          </View>
        ) : null}

        <View style={s.section}>
          <Text style={s.h2}>Les suites d&apos;un contrôle officiel</Text>
          <Text style={[s.gris, { marginTop: 6, maxWidth: 430 }]}>
            De la simple observation à la mesure de police, dans l&apos;ordre de gravité.
          </Text>
          <View style={{ marginTop: 8 }}>
            {SUITES_CONTROLE.map((x) => (
              <LigneSuite key={x.rang} {...x} />
            ))}
            <View style={s.filet} />
          </View>
          <View style={s.encart}>
            <Text style={s.petit}>{AVERTISSEMENT_SUITES}</Text>
          </View>
        </View>

        <View style={s.section} wrap={false}>
          <Text style={s.h2}>Ce que risque le consommateur</Text>
          {RISQUES_SANITAIRES.map((x) => (
            <View key={x.titre} style={{ marginTop: 10 }}>
              <Text style={s.h3}>{x.titre}</Text>
              <Text style={[s.gris, { marginTop: 1.5, maxWidth: 430 }]}>{x.texte}</Text>
            </View>
          ))}
        </View>

        <View style={s.section} wrap={false}>
          <Text style={s.h2}>Ce que risque l&apos;établissement</Text>
          {RISQUES_ETABLISSEMENT.map((x) => (
            <View key={x.titre} style={{ marginTop: 10 }}>
              <Text style={s.h3}>{x.titre}</Text>
              <Text style={[s.gris, { marginTop: 1.5, maxWidth: 430 }]}>{x.texte}</Text>
            </View>
          ))}
        </View>

      </View>

      {/* 05 · Résultats par thème */}
      <View {...signet("Résultats par thème")} style={s.chapitre}>
        <TeteSection
          titre="Les résultats, thème par thème"
          chapeau="Chaque thème porte sa note sur 100 et le nombre d'écarts relevés. Un thème sans point évalué reste sans note."
        />

        <View style={{ marginTop: 4 }}>
          {themesClasses.map((t) => (
            <LigneTheme key={t.theme} t={t} />
          ))}
          <View style={s.filet} />
        </View>

        <PlanDuFroid r={r} />

        {r.pointsForts.length > 0 ? (
          <View style={s.section}>
            <Text style={s.h2}>Ce qui est déjà tenu</Text>
            <Text style={[s.gris, { marginTop: 6, maxWidth: 430 }]}>
              {r.conformes} {r.conformes > 1 ? 'points conformes' : 'point conforme'} le jour de la visite.
              Ces acquis se perdent vite : ce sont les mêmes gestes, tenus tous les jours, qui les
              maintiennent.
            </Text>
            <View style={{ marginTop: 8 }}>
              {r.pointsForts.slice(0, 10).map((i) => (
                <View key={i.code} style={s.ptLigne} wrap={false}>
                  <View style={{ width: 18, paddingTop: 1 }}>
                    <Glyphe nom={iconeTheme(i.theme)} taille={11} couleur={VERT} />
                  </View>
                  <Text style={s.ptTexte}>{i.intitule}</Text>
                  <Text style={s.ptEtat}>{i.theme}</Text>
                </View>
              ))}
              <View style={s.filet} />
              {r.pointsForts.length > 10 ? (
                <Text style={[s.petit, { marginTop: 6 }]}>
                  et {r.pointsForts.length - 10} autres points conformes, listés dans le détail.
                </Text>
              ) : null}
            </View>
          </View>
        ) : null}

      </View>

      {/* 06 · Détail */}
      <View {...signet("Détail des points")} style={s.chapitre}>
        <TeteSection
          titre="Le détail de tous les points"
          chapeau={`Les ${r.totalPoints} points de la grille, dans l'ordre de l'audit. Un point non applicable ou non évalué ne compte pas dans la note.`}
        />

        {r.themes.map((t) => (
          <View key={t.theme} style={{ marginTop: 14 }} minPresenceAhead={28}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 20 }}>
                <Glyphe nom={iconeTheme(t.theme)} taille={13} couleur={ENCRE} />
              </View>
              <Text style={[s.h2, { flex: 1 }]}>{t.theme}</Text>
              <Text style={s.petit}>{t.score === null ? 'non évalué' : `${Math.round(t.score)} / 100`}</Text>
            </View>
            <View style={{ marginTop: 4 }}>
              {t.items.map((i) => (
                <View key={i.code} style={s.ptLigne} wrap={false}>
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 2.5,
                      marginTop: 4.5,
                      marginRight: 9,
                      backgroundColor: COULEUR_CONFORMITE[i.conformite],
                    }}
                  />
                  <View style={s.ptTexte}>
                    <Text>{i.intitule}</Text>
                    <Text style={[s.petit, { marginTop: 0.5 }]}>
                      {i.code}
                      {i.commentaire ? `, ${i.commentaire}` : ''}
                      {i.photos.length ? ` (${i.photos.length} ${i.photos.length > 1 ? 'photos' : 'photo'})` : ''}
                    </Text>
                  </View>
                  <Text style={s.ptEtat}>{LIBELLE_CONFORMITE[i.conformite]}</Text>
                </View>
              ))}
              <View style={s.filet} />
            </View>
          </View>
        ))}

      </View>

      {/* 07 · Références, seulement s'il y a des textes à citer */}
      {references.length > 0 ? (
      <View {...signet("Références réglementaires")} style={s.chapitre}>
        <TeteSection
          titre="Les références réglementaires"
          chapeau="Le texte sur lequel s'appuie chaque point audité, dans sa version en vigueur à la date de la visite. Les points sans référence rattachée relèvent des bonnes pratiques d'hygiène."
        />

        <View style={{ marginTop: 6 }}>
            {references.map((ref) => (
              <View key={ref.code} style={s.renvoi} minPresenceAhead={30}>
                <Text style={s.renvoiCode}>{ref.code}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.h3}>{ref.intitule}</Text>
                  <Text style={[s.petit, { marginTop: 2 }]}>{ref.texte}</Text>
                </View>
              </View>
            ))}
          <View style={s.filet} />
        </View>

      </View>
      ) : null}

      {/* 08 · Portée */}
      <View {...signet("Portée du rapport")} style={s.chapitre}>
        <TeteSection titre="Ce que dit, et ne dit pas, ce document" />

        <View style={{ marginTop: 4 }}>
          <Text style={s.h2}>Ce qu&apos;il contient</Text>
          <Text style={[s.gris, { marginTop: 5, maxWidth: 430 }]}>
            L&apos;état constaté le {data.date} sur {r.totalPoints} points de la grille{' '}
            {data.grilleVersion}, par {data.auditeur}. Les constats reposent sur ce qui était observable
            ce jour-là, dans les zones ouvertes à l&apos;auditeur.
          </Text>
        </View>

        <View style={{ marginTop: 18 }}>
          <Text style={s.h2}>Ce qu&apos;il n&apos;est pas</Text>
          <Text style={[s.gris, { marginTop: 5, maxWidth: 430 }]}>
            {MENTION_LABEL_PRIVE} Ce rapport ne garantit pas le résultat d&apos;un contrôle officiel et ne
            remplace ni le plan de maîtrise sanitaire, ni les analyses, ni la formation obligatoire du
            personnel.
          </Text>
        </View>

        <View style={{ marginTop: 18 }}>
          <Text style={s.h2}>À qui il appartient</Text>
          <Text style={[s.gris, { marginTop: 5, maxWidth: 430 }]}>
            Document confidentiel. Il est établi pour l&apos;établissement audité et ses
            responsables. Sa diffusion à un tiers, bailleur, franchiseur, assureur ou autre, relève
            de la seule décision de l&apos;établissement.
          </Text>
        </View>

        <View style={{ marginTop: 18 }}>
          <Text style={s.h2}>Comment le conserver</Text>
          <Text style={[s.gris, { marginTop: 5, maxWidth: 430 }]}>
            Gardez ce rapport avec vos relevés de températures et votre plan de nettoyage. Daté,
            référencé et photographié, il montre une démarche suivie.
          </Text>
        </View>

        <View style={s.cloture} wrap={false}>
          <Text style={{ ...poids(600), fontSize: 8.4 }}>
            Fait à {data.ville ?? "l'établissement"}, le {data.date}
          </Text>
          <Text style={[s.gris, { marginTop: 3, maxWidth: 430 }]}>
            Rapport établi par {data.auditeur}, auditeur, sur la grille {data.grilleVersion}, sous la
            référence {data.reference}. {r.evalues} points examinés sur {r.totalPoints}, {r.nbPhotos}{' '}
            {r.nbPhotos > 1 ? 'photos versées' : 'photo versée'} au dossier.
          </Text>
          <View style={s.signatures}>
            <View style={s.signature}>
              <View style={s.signatureLigne} />
              <Text style={s.petit}>L&apos;auditeur, {data.auditeur}</Text>
            </View>
            <View style={[s.signature, { marginLeft: 26 }]}>
              <View style={s.signatureLigne} />
              <Text style={s.petit}>Pour l&apos;établissement, nom et qualité</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 26 }}>
          <Meta cle="Établissement" valeur={[data.etablissement, data.ville].filter(Boolean).join(', ')} />
          {data.adresse ? <Meta cle="Adresse" valeur={data.adresse} /> : null}
          <Meta cle="Référence" valeur={data.reference} />
          <Meta cle="Auditeur" valeur={data.auditeur} />
          <Meta cle="Date de la visite" valeur={data.date} />
          <Meta cle="Grille appliquée" valeur={data.grilleVersion} />
          <Meta cle="Points examinés" valeur={`${r.evalues} sur ${r.totalPoints}`} />
          <View style={s.filet} />
        </View>

      </View>
        <Pied data={data} />
      </Page>
    </Document>
  );
}
