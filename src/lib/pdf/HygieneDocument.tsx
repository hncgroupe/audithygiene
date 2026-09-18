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
import { PHOTOS_MAX } from '@/lib/photos';
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
  /** Date en chiffres, pour le relevé de couverture où la place manque. */
  dateCourte?: string | null;
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
const ENCRE_DOUX = '#33443E';
const FILET = '#E2E9E6';
const FILET_FORT = '#CBD5D1';
const VERT = '#10B981';
const VERT_PROFOND = '#04543C';
const ROUGE = '#DC2626';
const AMBRE = '#B45309';

/* Demi-cadran de la couverture. */
const CADRAN_L = 226;
const CADRAN_H = 132;
const CADRAN_CX = CADRAN_L / 2;
const CADRAN_CY = 116;
const CADRAN_R = 88;

const TEINTE_ROUGE = '#FDF3F3';
const TEINTE_AMBRE = '#FEF8EC';
const A4_HAUTEUR = 841.89;
/** Hauteur imprimable d'une page, marges hautes et basses deduites. */
const HAUTEUR_UTILE = 736;
/** Marge haute de la page courante, celle que la bande doit remonter. */
const PAGE_HAUT = 44;
const PIED_HAUTEUR = 27;
const MARGE = 52;

/* ------------------------------------------------------------------- Styles */

const s = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 60,
    paddingHorizontal: MARGE,
    fontSize: 7.7,
    lineHeight: 1.5,
    color: ENCRE,
    fontFamily: FAMILLE,
    ...poids(400),
  },
  pageCouverture: {
    paddingBottom: 42,
    fontSize: 7.7,
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
  rangLogoClient: { alignItems: 'center', marginTop: 18 },
  marqueBlanche: { fontSize: 9.7, color: ENCRE, ...poids(600) },
  marqueFine: { color: VERT },
  banniereDate: { fontSize: 7.5, color: GRIS_CLAIR },
  titreCouverture: { fontSize: 33, color: ENCRE, letterSpacing: -0.8, lineHeight: 1.12, marginTop: 14, textAlign: 'center', ...poids(600) },
  sousCouverture: { fontSize: 12.1, color: GRIS, marginTop: 10, textAlign: 'center', ...poids(500) },
  confidentiel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: FILET_FORT,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  confidentielTexte: { fontSize: 7.7, color: GRIS, marginLeft: 6, marginTop: 2, textAlign: 'center' },

  corpsCouverture: { paddingHorizontal: MARGE, paddingTop: 20 },
  mentionPied: {
    position: 'absolute',
    bottom: 14,
    left: 24,
    right: 24,
    textAlign: 'center',
    fontSize: 7.3,
    color: GRIS_CLAIR,
  },
  blocScore: { marginTop: 20, borderWidth: 0.8, borderColor: FILET, borderRadius: 9 },
  cadranRang: { flexDirection: 'row', alignItems: 'center', padding: 18, paddingBottom: 14 },
  cadranBoite: { width: CADRAN_L, height: CADRAN_H, position: 'relative' },
  cadranBorne: { position: 'absolute', width: 24, textAlign: 'center', fontSize: 7.5, color: GRIS_CLAIR },
  cadranTexte: { flex: 1, paddingLeft: 22 },
  scoreNombre: { fontSize: 50, letterSpacing: -1.6, lineHeight: 1, ...poids(700) },
  scoreSur: { fontSize: 12.5, color: GRIS, marginLeft: 9, marginBottom: 6 },
  scoreNiveau: { fontSize: 14.5, marginTop: 8, letterSpacing: -0.2, ...poids(700) },
  scorePhrase: { fontSize: 9.8, lineHeight: 1.45, color: GRIS, marginTop: 6, maxWidth: 240 },

  etats: { flexDirection: 'row', borderTopWidth: 0.8, borderTopColor: FILET },
  etatCase: { flex: 1, paddingVertical: 13, paddingHorizontal: 10, borderRightWidth: 0.8, borderRightColor: FILET, alignItems: 'center' },
  etatTete: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  etatPastille: { width: 7, height: 7, borderRadius: 1.5, marginRight: 6 },
  etatMot: { fontSize: 8.8, lineHeight: 1, letterSpacing: 0.2, textAlign: 'center', ...poids(700) },
  etatNombre: { fontSize: 24.2, lineHeight: 1.15, marginTop: 6, letterSpacing: -0.6, textAlign: 'center', ...poids(700) },
  etatQuoi: { fontSize: 7.6, lineHeight: 1.35, color: GRIS, marginTop: 3, textAlign: 'center' },

  jaugeRang: { flexDirection: 'row', alignItems: 'flex-start' },
  logoClientCadre: {
    width: 96,
    height: 54,
    borderWidth: 0.7,
    borderColor: FILET,
    borderRadius: 6,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoClientImage: { maxWidth: 80, maxHeight: 40, objectFit: 'contain' },
  jaugeTexte: { flex: 1, paddingLeft: 26, paddingTop: 6 },
  niveauTitre: { fontSize: 15, letterSpacing: -0.4, ...poids(600) },
  niveauPhrase: { color: GRIS, marginTop: 8, maxWidth: 310, lineHeight: 1.5 },

  compteursCadre: { flexDirection: 'row', marginTop: 12, borderWidth: 0.8, borderColor: FILET, borderRadius: 8 },
  compteurCase: { flex: 1, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 0.7, borderRightColor: FILET },
  compteurs: { flexDirection: 'row', marginTop: 16 },
  compteur: { marginRight: 26 },
  compteurVal: { fontSize: 15, letterSpacing: -0.4, lineHeight: 1, ...poids(600) },
  compteurNom: { fontSize: 7, color: GRIS, marginTop: 3 },

  premier: { marginTop: 18, borderTopWidth: 0.7, borderTopColor: FILET, paddingTop: 12 },
  premierLigne: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 7 },
  premierDelai: { width: 74, fontSize: 7, color: GRIS, textAlign: 'right' },

  /* Ancré au bas de la page, pas poussé par le flux : dans ce moteur, un « vide
     qui grandit » ne pousse rien du tout. */
  releve: { position: 'absolute', left: MARGE, right: MARGE, bottom: 44 },
  releveCol: { paddingHorizontal: 8, paddingTop: 9, paddingBottom: 11 },
  releveColPale: { backgroundColor: '#F7FAF9' },
  releveTitre: { fontSize: 7, color: GRIS_CLAIR, letterSpacing: 0.3, textTransform: 'uppercase', textAlign: 'center' },
  releveFilet: { borderBottomWidth: 0.8, borderBottomColor: FILET_FORT, marginTop: 6, marginBottom: 9 },
  releveVal: { fontSize: 10.5, lineHeight: 1.25, textAlign: 'center', ...poids(700) },
  releveSous: { fontSize: 8.1, color: GRIS, marginTop: 1.5, textAlign: 'center', ...poids(400) },

  cadrePhoto: { marginHorizontal: '1%', marginBottom: 5, borderRadius: 4, overflow: 'hidden' },
  photo: { width: '100%', height: '100%', objectFit: 'cover' },
  horodate: { position: 'absolute', right: 4, bottom: 4, fontSize: 5.4, lineHeight: 1,
    color: '#FFFFFF', backgroundColor: 'rgba(12,27,23,0.62)', borderRadius: 2,
    paddingVertical: 2.2, paddingHorizontal: 3.6, ...poids(500) },
  panneauNote: { fontSize: 8.6, color: GRIS_CLAIR, alignSelf: 'center', marginTop: 3, marginBottom: 6 },
  ptTexte: { flex: 1, paddingRight: 10 },
  etage: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 8, paddingHorizontal: 12, borderTopWidth: 0.7, borderTopColor: FILET },
  renvoiCode: { width: 66, fontSize: 7, color: GRIS_CLAIR, paddingTop: 1 },
  ficheMeta: { fontSize: 8, lineHeight: 1, letterSpacing: 0.9, textTransform: 'uppercase', marginLeft: 7, ...poids(700) },
  petit: { fontSize: 7, color: GRIS, lineHeight: 1.5 },
  jeton: { borderRadius: 9, paddingVertical: 2.5, paddingHorizontal: 8, fontSize: 6.6, color: '#FFFFFF', ...poids(600) },
  thBarre: { height: 3, borderRadius: 1.5 },
  frigoPied: { paddingVertical: 9, paddingHorizontal: 12, borderTopWidth: 0.7, borderTopColor: FILET },
  correctionCle: { fontSize: 6.8, letterSpacing: 1.1, textTransform: 'uppercase', color: VERT_PROFOND,
    lineHeight: 1, marginBottom: 8, ...poids(700) },
  cle: { fontSize: 6.6, color: GRIS_CLAIR, marginBottom: 1.5 },
  sommaireNum: { width: 20, fontSize: 7.9, color: GRIS_CLAIR, paddingTop: 3 },
  thBarreFond: { width: 76, height: 3, borderRadius: 1.5, backgroundColor: '#EDF2F0' },
  ficheTete: { paddingLeft: 74, paddingRight: 6, paddingTop: 0 },
  ficheEntete: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: -(PAGE_HAUT - 16), marginBottom: 26 },
  regle: { width: 26, height: 2, backgroundColor: VERT, marginBottom: 12 },
  correctionTexte: { fontSize: 9.6, lineHeight: 1.45, letterSpacing: -0.1, ...poids(600) },
  ficheTitre: { fontSize: 18.5, letterSpacing: -0.5, lineHeight: 1.18, textAlign: 'center', ...poids(700) },
  frigo: { marginTop: 12, borderWidth: 0.7, borderColor: FILET, borderRadius: 8 },
  cloture: { marginTop: 26, paddingTop: 16, borderTopWidth: 0.7, borderTopColor: FILET },
  ficheCorps: { paddingLeft: 74, paddingRight: 6, paddingTop: 6, paddingBottom: 24 },
  panneauLegende: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginTop: 14, paddingTop: 12, borderTopWidth: 0.7, borderTopColor: FILET, alignSelf: 'stretch' },
  legendeTexte: { fontSize: 9.5 },
  h3: { fontSize: 8.4, ...poids(600) },
  verdictPastille: { width: 8, height: 8, borderRadius: 4, marginTop: 3, marginRight: 10 },
  h1: { fontSize: 21, letterSpacing: -0.6, lineHeight: 1.2, textAlign: 'center', ...poids(600) },
  thCompte: { width: 80, fontSize: 7, color: GRIS_CLAIR, textAlign: 'right', paddingRight: 10 },
  sommaireLigne: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10, borderTopWidth: 0.7, borderTopColor: FILET },
  chapeau: { color: GRIS, marginTop: 5, maxWidth: 440, textAlign: 'center' },
  renvoi: { flexDirection: 'row', paddingVertical: 6, borderTopWidth: 0.7, borderTopColor: FILET },
  etageNiveau: { fontSize: 6.6, color: GRIS_CLAIR, marginBottom: 1 },
  teteSection: { marginBottom: 18, alignItems: 'center' },
  panneauTitre: { fontSize: 10.5, color: ENCRE, alignSelf: 'center', ...poids(600) },
  legendePuce: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 12 },
  suite: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 7, borderTopWidth: 0.7, borderTopColor: FILET },
  faible: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 7, borderTopWidth: 0.7, borderTopColor: FILET },
  signature: { flex: 1 },
  ptEtat: { width: 116, textAlign: 'right', fontSize: 7, color: GRIS },
  faibleVal: { width: 26, textAlign: 'right', fontSize: 9.7, ...poids(600) },
  signatures: { flexDirection: 'row', marginTop: 34 },
  ptLigne: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 3.5, borderTopWidth: 0.7, borderTopColor: FILET },
  colonne: { flex: 1 },
  etapes: { marginTop: 13, paddingTop: 13, borderTopWidth: 0.7, borderTopColor: '#CFEADD' },
  etape: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 8 },
  etapeNum: { width: 12, height: 12, borderRadius: 6, backgroundColor: VERT, color: '#FFFFFF', fontSize: 6.6, lineHeight: 1, paddingTop: 3.2, textAlign: 'center', marginRight: 8, ...poids(700) },
  etapeTexte: { flex: 1, fontSize: 8.8, lineHeight: 1.5, ...poids(400) },
  achatGrille: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 4 },
  achatCarte: { width: '49%', minHeight: 52, flexDirection: 'row', alignItems: 'center', marginBottom: 9, borderWidth: 0.8, borderColor: FILET, borderRadius: 9, paddingVertical: 10, paddingHorizontal: 12 },
  achatCase: { width: 11, height: 11, borderWidth: 1, borderColor: GRIS, borderRadius: 2.5, marginRight: 11 },
  achatNom: { fontSize: 9.6, lineHeight: 1.3, ...poids(600) },
  achatPoints: { fontSize: 7.2, lineHeight: 1.35, color: GRIS_CLAIR, marginTop: 2.5 },
  achatRang: { width: 16, fontSize: 7.6, lineHeight: 1, color: GRIS_CLAIR, textAlign: 'right', marginLeft: 8 },

  materiel: { marginTop: 21 },
  materielCle: { fontSize: 6.8, letterSpacing: 0.9, textTransform: 'uppercase', color: VERT_PROFOND, lineHeight: 1, marginBottom: 2, ...poids(700) },
  materielListe: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 1 },
  materielItem: { fontSize: 8.8, lineHeight: 1.3, ...poids(400) },

  correction: { marginTop: 21, backgroundColor: '#F1FBF6', borderRadius: 9, paddingVertical: 15,
    paddingHorizontal: 16 },
  gris: { color: GRIS },
  thIcone: { width: 20 },
  panneau: { borderWidth: 0.7, borderColor: FILET, borderRadius: 10, paddingVertical: 18, paddingHorizontal: 20, alignItems: 'center' },
  verdictRang: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 12, padding: 11, borderWidth: 0.7, borderColor: FILET, borderRadius: 6 },
  bloc: { marginTop: 7 },
  rubrique: { marginTop: 21 },
  cleLigne: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  rubriqueCle: { fontSize: 6.8, letterSpacing: 1.1, textTransform: 'uppercase', lineHeight: 1,
    color: GRIS, marginBottom: 7, ...poids(700) },
  texteLoi: { marginTop: 24, borderTopWidth: 0.7, borderTopColor: FILET, paddingTop: 12 },
  texteLoiCorps: { fontSize: 8, lineHeight: 1.6, color: ENCRE_DOUX, fontFamily: 'Helvetica-Oblique' },
  texteLoiNote: { fontSize: 6.8, lineHeight: 1.4, color: GRIS_CLAIR, marginTop: 5 },
  blocRisque: { marginTop: 12 },
  blocPreuve: { marginTop: 12 },
  blocPhotos: { marginTop: 24, marginBottom: 14 },
  blocControle: { marginTop: 21, backgroundColor: TEINTE_ROUGE, borderWidth: 0.8, borderColor: '#F3C9C9',
    borderRadius: 9, paddingVertical: 13, paddingHorizontal: 15 },
  ligneAlerte: { flexDirection: 'row', alignItems: 'center', marginBottom: 9 },
  /* Un vrai emoji ne s'imprime pas : les polices PDF standard n'ont pas ces
     glyphes. Le signe est donc dessine, meme lecture, mais qui sort partout. */
  pictoAlerte: { marginRight: 9 },
  blocTexte: { marginTop: 13, borderTopWidth: 0.7, borderTopColor: FILET, paddingTop: 8 },
  ficheTexte: { fontSize: 9.4, lineHeight: 1.5, letterSpacing: -0.05 },
  ficheAttendu: { fontSize: 8.6, lineHeight: 1.5, color: GRIS, marginTop: 5 },
  cleSombre: { fontSize: 6.8, letterSpacing: 0.9, textTransform: 'uppercase', color: GRIS, lineHeight: 1, marginBottom: 5, ...poids(700) },
  cleCouleur: { fontSize: 6.8, letterSpacing: 0.9, textTransform: 'uppercase', lineHeight: 1, marginBottom: 5, ...poids(700) },
  clePreuve: { fontSize: 6.8, letterSpacing: 0.9, textTransform: 'uppercase', color: VERT_PROFOND, lineHeight: 1, marginBottom: 4, ...poids(700) },
  materielPuce: { flexDirection: 'row', alignItems: 'center', marginRight: 18, marginBottom: 5 },
  materielCase: { width: 7, height: 7, borderRadius: 1.5, borderWidth: 0.9, borderColor: VERT, marginRight: 6 },
  /* Le rail sort de la marge de page : la bande de couleur touche le bord du
     papier, c'est elle qui se voit sur la tranche du rapport. */
  fiche: { height: HAUTEUR_UTILE, flexDirection: 'row', marginLeft: -MARGE },
  ficheInterieur: { flex: 1 },
  /* La bande court du haut de la feuille jusqu'au bandeau de pied : elle sort
     des marges de page, en haut comme a gauche. */
  /* La bande court du haut de la feuille jusqu'au bas : sur ces pages le
     bandeau vert est retire, la couleur va donc bord a bord. Le logo se cale a
     la hauteur ou il se trouvait dans le bandeau. */
  rail: { width: MARGE + 20, height: A4_HAUTEUR, marginTop: -PAGE_HAUT,
    alignItems: 'center', justifyContent: 'space-between', paddingTop: 26,
    paddingBottom: (PIED_HAUTEUR - 11) / 2 },
  railNumero: { fontSize: 22, lineHeight: 1, color: '#FFFFFF', ...poids(700) },
  railPivot: { width: MARGE + 20, height: 230, alignItems: 'center', justifyContent: 'center' },
  railMot: { width: 230, textAlign: 'center', fontSize: 11, lineHeight: 1, letterSpacing: 3.4,
    color: '#FFFFFF', transform: 'rotate(-90deg)', ...poids(700) },
  railBas: { width: MARGE + 20, alignItems: 'center' },
  railCode: { width: MARGE + 20, textAlign: 'center', fontSize: 6, lineHeight: 1, letterSpacing: 0.6,
    color: 'rgba(255,255,255,0.72)', ...poids(500) },
  railLogo: { width: 54, height: 11, marginTop: 16, objectFit: 'contain' },
  bandeauLarge: { paddingVertical: 9, paddingHorizontal: 16 },
  signatureLigne: { borderBottomWidth: 0.7, borderBottomColor: FILET_FORT, height: 30, marginBottom: 4 },
  colonneGauche: { marginRight: 28 },
  filet: { borderTopWidth: 0.7, borderTopColor: FILET },
  etageBande: { width: 4, height: 30, borderRadius: 2 },
  colonnes: { flexDirection: 'row', marginTop: 24 },
  sommaireRond: { width: 26, height: 26, borderRadius: 13, borderWidth: 0.7, borderColor: FILET, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  thNom: { flex: 1, fontSize: 7.9 },
  encart: { marginTop: 16, paddingTop: 10, borderTopWidth: 0.7, borderTopColor: FILET },
  alerte: { marginTop: 16, padding: 12, borderRadius: 6, borderWidth: 0.7, borderColor: '#F1C7C7', borderLeftWidth: 2.5, borderLeftColor: ROUGE },
  suiteRang: { width: 18, height: 18, borderRadius: 9, marginRight: 12, textAlign: 'center', paddingTop: 4.6, fontSize: 7, lineHeight: 1, color: '#FFFFFF', ...poids(600) },
  thVal: { width: 26, textAlign: 'right', fontSize: 7.9, ...poids(600) },
  bandePhotos: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 },
  suiteQuand: { fontSize: 7, color: GRIS_CLAIR, marginTop: 0.5 },
  chapitre: { marginTop: 30 },
  section: { marginTop: 22 },
  h2: { fontSize: 10.1, letterSpacing: -0.2, ...poids(600) },
  thLigne: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5.5, borderTopWidth: 0.7, borderTopColor: FILET },

  modeEmploi: { marginTop: 4, marginBottom: 14, borderWidth: 0.7, borderColor: FILET, borderRadius: 7, padding: 12 },
  modeTitre: { fontSize: 10.5, marginBottom: 6, ...poids(700) },
  modeLigne: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 3 },
  modePuce: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: VERT, marginTop: 5, marginRight: 7 },
  modeTexte: { flex: 1, fontSize: 8.8, lineHeight: 1.45, color: GRIS },

  recapEntete: { flexDirection: 'row', alignItems: 'flex-end', borderBottomWidth: 1, borderBottomColor: ENCRE, paddingBottom: 5 },
  recapTitre: { fontSize: 8, lineHeight: 1.15, color: GRIS_CLAIR, letterSpacing: 0.3, textTransform: 'uppercase', textAlign: 'center' },
  recapLigne: { paddingVertical: 8.5, paddingHorizontal: 2 },
  recapRangee: { flexDirection: 'row', alignItems: 'center' },
  recapNom: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 10 },
  recapAlerte: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: ROUGE, marginRight: 8 },
  recapAlerteVide: { width: 7, marginRight: 8 },
  recapNomTexte: { fontSize: 11, marginLeft: 8 },
  recapVal: { fontSize: 11, textAlign: 'center' },
  recapNote: { fontSize: 13, width: 26, textAlign: 'right', ...poids(700) },
  fiche3Grille: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  fiche3: { width: '49%', height: 108, marginBottom: 7, borderWidth: 0.8, borderColor: FILET, borderRadius: 7, overflow: 'hidden' },
  fiche3Bandeau: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 9, borderBottomWidth: 0.8, borderBottomColor: FILET },
  /* lineHeight à 1 : sans lui, le chiffre hérite de l'interligne de la page et
     se décale vers le bas dans sa pastille. */
  fiche3Numero: { width: 18, borderRadius: 4, paddingTop: 3, paddingBottom: 3, fontSize: 7.6, lineHeight: 1,
    textAlign: 'center', color: '#FFFFFF', marginRight: 8, ...poids(700) },
  fiche3Etat: { flex: 1, fontSize: 7, lineHeight: 1, letterSpacing: 0.5, textTransform: 'uppercase', ...poids(700) },
  fiche3Code: { fontSize: 6.6, lineHeight: 1, letterSpacing: 0.4, color: GRIS_CLAIR, ...poids(500) },
  fiche3Titre: { fontSize: 8.4, lineHeight: 1.25, ...poids(600) },
  fiche3Zone: { flex: 1, paddingVertical: 5, paddingHorizontal: 9 },
  fiche3Bas: { paddingVertical: 7, paddingHorizontal: 9, borderTopWidth: 0.8, borderTopColor: '#C9E9DA', backgroundColor: '#F1FBF6', borderBottomLeftRadius: 7, borderBottomRightRadius: 7 },
  fiche3Probleme: { fontSize: 7.6, lineHeight: 1.3, color: GRIS, marginTop: 2 },
  fiche3Cle: { fontSize: 6.4, lineHeight: 1, letterSpacing: 0.8, textTransform: 'uppercase', color: GRIS_CLAIR, ...poids(600) },
  fiche3Correction: { fontSize: 7.9, lineHeight: 1.3, marginTop: 2, ...poids(500) },

  plan: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 9, borderTopWidth: 0.7, borderTopColor: FILET },
  planNumero: { width: 24, fontSize: 9, color: GRIS_CLAIR, paddingTop: 2.5, ...poids(600) },
  planTete: { flexDirection: 'row', alignItems: 'center' },
  planJeton: { borderRadius: 8, paddingVertical: 2, paddingHorizontal: 7, fontSize: 7.4, color: '#FFFFFF', marginRight: 9, ...poids(700) },
  planIntitule: { flex: 1, fontSize: 11, ...poids(600) },
  planLigne: { marginTop: 4, marginLeft: 0 },
  planCle: { fontSize: 8.6, color: GRIS_CLAIR },
  planTexte: { fontSize: 9.4, color: ENCRE },
  planFaire: { fontSize: 9.4, color: ENCRE, ...poids(700) },

  definitions: { marginTop: 12, borderWidth: 0.7, borderColor: FILET, borderRadius: 7, paddingVertical: 10, paddingHorizontal: 12, alignSelf: 'stretch' },
  definition: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 3 },
  definitionPuce: { width: 7, height: 7, borderRadius: 1.5, marginTop: 3.5, marginRight: 8 },
  definitionTexte: { flex: 1, fontSize: 8.4, lineHeight: 1.4 },

  recapEtat: { fontSize: 7.6, borderWidth: 0.8, borderRadius: 9, paddingVertical: 2, paddingHorizontal: 7, textAlign: 'center', ...poids(600) },
  recapNoteBloc: { width: 110, flexDirection: 'row', alignItems: 'center' },
  recapBarreFond: { flex: 1, height: 6.5, borderRadius: 3.25, backgroundColor: '#EDF2F0', marginRight: 10 },
  recapBarre: { height: 6.5, borderRadius: 3.25 },
  recapTotal: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1.2, borderTopColor: ENCRE, paddingTop: 10, paddingHorizontal: 2 },

  ligneMeta: { flexDirection: 'row', paddingVertical: 5, borderTopWidth: 0.7, borderTopColor: FILET },
  metaCle: { width: 130, color: GRIS },

  /* Pied de page */
  /* Le pied est ancre par le haut : un noeud fixe a rendu dynamique cale par le
     bas fait diverger pdfkit. */
  pied: {
    position: 'absolute',
    top: A4_HAUTEUR - PIED_HAUTEUR,
    left: 0,
    right: 0,
    height: PIED_HAUTEUR,
  },
  piedSobre: {
    height: PIED_HAUTEUR,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  piedSobreNom: { flex: 1, textAlign: 'center', fontSize: 7, lineHeight: 1, color: ENCRE },
  piedSobrePage: { width: 60, textAlign: 'right', fontSize: 7, lineHeight: 1, color: ENCRE },
  bandeau: {
    height: PIED_HAUTEUR,
    backgroundColor: VERT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  bandeauLogo: { width: 60, height: 12, objectFit: 'contain' },
  bandeauMarque: { width: 60, fontSize: 7.5, color: '#FFFFFF', ...poids(600) },
  bandeauNom: { flex: 1, textAlign: 'center', fontSize: 7, lineHeight: 1, color: '#EAFBF3' },
  bandeauPage: { width: 60, textAlign: 'right', fontSize: 7, lineHeight: 1, color: '#EAFBF3' },
  numPage: {
    position: 'absolute',
    top: A4_HAUTEUR - PIED_HAUTEUR + 10.5,
    right: 22,
    width: 60,
    textAlign: 'right',
    fontSize: 7,
    lineHeight: 1,
    color: '#EAFBF3',
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
function abrege(texte: string, max = 250): string {
  const t = texte.trim();
  if (t.length <= max) return t;
  const coupe = t.slice(0, max);
  /* On coupe a une fin de proposition, jamais au milieu d'un mot : une citation
     reglementaire tronquee sur une syllabe ne veut plus rien dire. */
  const fin = Math.max(
    coupe.lastIndexOf('. '),
    coupe.lastIndexOf(' ; '),
    coupe.lastIndexOf(' : '),
    coupe.lastIndexOf(', ')
  );
  const mot = coupe.lastIndexOf(' ');
  const rupture = fin > 90 ? fin : mot;
  const garde = coupe.slice(0, rupture).replace(/[\s,;:.]+$/, '');
  return `${garde} […]`;
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
  cadenas: 'M6.4 9.2h8.2a1.4 1.4 0 0 1 1.4 1.4v5.2a1.4 1.4 0 0 1-1.4 1.4H6.4A1.4 1.4 0 0 1 5 15.8v-5.2a1.4 1.4 0 0 1 1.4-1.4Z M7.6 9.2V7a2.9 2.9 0 0 1 5.8 0v2.2 M10.5 12.2v2.2',
  liste: 'M7.4 5.6h9.2 M7.4 10.5h9.2 M7.4 15.4h9.2 M4.4 5.6h.02 M4.4 10.5h.02 M4.4 15.4h.02',
  alerte: 'M10.5 2.9 19.4 17.6H1.6Z M10.5 8.2v4.1 M10.5 14.7h.02',
  listeCochee: 'M9.4 5.6h7.2 M9.4 10.5h7.2 M9.4 15.4h7.2 M3.4 5.2l1.2 1.2 2-2.2 M3.4 10.1l1.2 1.2 2-2.2 M3.4 15l1.2 1.2 2-2.2',
  panier: 'M3.2 7.2h14.6l-1.5 9.4a1.6 1.6 0 0 1-1.6 1.3H6.3a1.6 1.6 0 0 1-1.6-1.3Z M7.4 7.2V5.6a3.1 3.1 0 0 1 6.2 0v1.6',
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

/** Triangle d'alerte plein : le seul signe de la fiche qui doit sauter aux yeux. */
function PictoAlerte({ taille = 18 }: { taille?: number }) {
  return (
    <Svg width={taille} height={taille} viewBox="0 0 24 24">
      <Path d="M12 2.2 23 21.4H1Z" fill={ROUGE} />
      <Path d="M12 8.6v6" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
      <Path d="M12 18.1h.02" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
    </Svg>
  );
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

/* ------------------------------------------------------------- Bloc de score */

/** Point du cadran pour une note sur 100, en partant de la gauche. */
function pointCadran(note: number, rayon = CADRAN_R): [number, number] {
  const angle = Math.PI - (Math.max(0, Math.min(100, note)) / 100) * Math.PI;
  return [CADRAN_CX + rayon * Math.cos(angle), CADRAN_CY - rayon * Math.sin(angle)];
}

/** Arc du cadran entre deux notes. */
function arcCadran(de: number, a: number): string {
  const [x1, y1] = pointCadran(de);
  const [x2, y2] = pointCadran(a);
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${CADRAN_R} ${CADRAN_R} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

/**
 * La note sur un demi-cadran : les trois zones en fond pâle, et par-dessus un arc
 * plein qui part de zéro et s'arrête à la note. On lit du même coup où on en est
 * et la distance qui reste à parcourir.
 */
function Cadran({ r }: { r: RapportHygiene }) {
  const note = Math.max(0, Math.min(100, r.scoreGlobal));
  const [ax, ay] = pointCadran(note);

  return (
    <Svg width={CADRAN_L} height={CADRAN_H} viewBox={`0 0 ${CADRAN_L} ${CADRAN_H}`}>
      <Path d={arcCadran(0, 60)} stroke="#FADCDC" strokeWidth={19} fill="none" strokeLinecap="butt" />
      <Path d={arcCadran(60, 80)} stroke="#FCEBCB" strokeWidth={19} fill="none" strokeLinecap="butt" />
      <Path d={arcCadran(80, 100)} stroke="#D5F0E4" strokeWidth={19} fill="none" strokeLinecap="butt" />
      {r.evalues > 0 ? (
        <>
          <Path
            d={arcCadran(0, note)}
            stroke={r.niveau.couleur}
            strokeWidth={8.5}
            fill="none"
            strokeLinecap="round"
          />
          <Circle cx={ax} cy={ay} r={6} fill="#FFFFFF" stroke={r.niveau.couleur} strokeWidth={3} />
        </>
      ) : null}
    </Svg>
  );
}

/** Une case d'état : un carré de couleur, le nombre, le mot. */
function Etat({
  nombre,
  mot,
  quoi,
  couleur,
  dernier,
}: {
  nombre: number;
  mot: string;
  quoi: string;
  couleur: string;
  dernier?: boolean;
}) {
  return (
    <View style={[s.etatCase, dernier ? { borderRightWidth: 0 } : {}]}>
      <View style={s.etatTete}>
        <View style={[s.etatPastille, { backgroundColor: couleur }]} />
        <Text style={[s.etatMot, { color: couleur }]}>{mot}</Text>
      </View>
      <Text style={s.etatNombre}>{nombre}</Text>
      <Text style={s.etatQuoi}>{quoi}</Text>
    </View>
  );
}

function BlocScore({ r }: { r: RapportHygiene }) {
  return (
    <View style={s.blocScore}>
      <View style={s.cadranRang}>
        <View style={s.cadranBoite}>
          <Cadran r={r} />
          {[
            { n: 0, t: '0' },
            { n: 60, t: '60' },
            { n: 80, t: '80' },
            { n: 100, t: '100' },
          ].map((b) => {
            const [x, y] = pointCadran(b.n, CADRAN_R + 13);
            return (
              <Text key={b.t} style={[s.cadranBorne, { left: x - 12, top: y - 4 }]}>
                {b.t}
              </Text>
            );
          })}
        </View>

        <View style={s.cadranTexte}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={[s.scoreNombre, { color: r.niveau.couleur }]}>
              {r.evalues === 0 ? '·' : Math.round(r.scoreGlobal)}
            </Text>
            <Text style={s.scoreSur}>sur 100</Text>
          </View>
          <Text style={[s.scoreNiveau, { color: r.niveau.couleur }]}>{r.niveau.titre}</Text>
        </View>
      </View>

      <View style={s.etats}>
        <Etat nombre={r.conformes} mot="Conforme" quoi="points tenus le jour de la visite" couleur={VERT} />
        <Etat
          nombre={r.ncMineures}
          mot="Non conforme"
          quoi="écarts à régulariser sous 30 jours"
          couleur={AMBRE}
        />
        <Etat
          nombre={r.ncMajeures}
          mot="Critique"
          quoi="peut conduire à une fermeture en contrôle"
          couleur={ROUGE}
          dernier
        />
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
              <Text style={{ ...poids(600), fontSize: 8.8 }}>{e.titre}</Text>
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
          <Text style={{ ...poids(600), fontSize: 8.8 }}>
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

const RADAR_L = 450;
const RADAR_H = 352;
const RADAR_CX = RADAR_L / 2;
const RADAR_CY = RADAR_H / 2 - 4;
const RADAR_R = 118;

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
        const x = RADAR_CX + (RADAR_R + 42) * Math.cos(angle);
        const y = RADAR_CY + (RADAR_R + 20) * Math.sin(angle);
        return (
          <View
            key={t.theme}
            style={{ position: 'absolute', left: x - 33, top: y - 11, width: 66, alignItems: 'center' }}
          >
            <Text style={{ fontSize: 8.8, color: GRIS, textAlign: 'center', lineHeight: 1.25 }}>
              {themeCourt(t.theme)}
            </Text>
            <Text
              style={{
                fontSize: 12.1,
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
            <Text style={{ fontSize: 7.5 }}>
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

/**
 * Pied de page. Sur les pages de fiche, la bande de couleur du point tient deja
 * tout le bord gauche : un second aplat vert en bas ferait masse, on le remplace
 * par une ligne sobre en noir.
 */
function Bandeau({ data, fiches }: { data: HygienePdfData; fiches: [number, number] | null }) {
  const sobre = (page: number) => fiches !== null && page >= fiches[0] && page <= fiches[1];
  return (
    <View
      style={s.pied}
      fixed
      render={(props) => {
        /* react-pdf transmet bien le total, ses types ne le declarent pas. */
        const { pageNumber, totalPages } = props as unknown as { pageNumber: number; totalPages: number };
        return sobre(pageNumber) ? (
          <View style={s.piedSobre}>
            <View style={{ width: 60 }} />
            <Text style={s.piedSobreNom}>
              {data.etablissement}, rapport du {data.date}
            </Text>
            <Text style={s.piedSobrePage}>
              {pageNumber} / {totalPages}
            </Text>
          </View>
        ) : (
          <View style={s.bandeau}>
            {data.logoBlanc ? (
              <Image src={data.logoBlanc} style={s.bandeauLogo} />
            ) : (
              <Text style={s.bandeauMarque}>audit hygiène</Text>
            )}
            <Text style={s.bandeauNom}>
              {data.etablissement}, rapport du {data.date}
            </Text>
            <Text style={s.bandeauPage}>
              {pageNumber} / {totalPages}
            </Text>
          </View>
        );
      }}
    />
  );
}

function Pied({ data, fiches }: { data: HygienePdfData; fiches: [number, number] | null }) {
  return <Bandeau data={data} fiches={fiches} />;
}

/**
 * Signet de navigation du PDF. react-pdf sait le poser sur un bloc, mais ne le
 * déclare pas dans ses types : on passe donc par cette petite fonction.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const signet = (titre: string): any => ({ bookmark: titre });

function TeteSection({ titre, chapeau }: { titre: string; chapeau?: string }) {
  return (
    <View style={s.teteSection} minPresenceAhead={130}>
      <Text style={s.h1}>{titre}</Text>
      {chapeau
        ? chapeau
            .split('. ')
            .filter(Boolean)
            .map((bout, i, tout) => (
              // eslint-disable-next-line react/no-array-index-key
              <Text key={i} style={s.chapeau}>
                {bout}
                {i < tout.length - 1 ? '.' : ''}
              </Text>
            ))
        : null}
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

/**
 * Une photo seule occupe plus de place que quatre : la bande reste centree et
 * lisible quel que soit le nombre de cliches, sans jamais depasser quatre par
 * ligne.
 */
function taillePhoto(nombre: number) {
  if (nombre === 1) return { width: '46%' as const, height: 150 };
  if (nombre === 2) return { width: '34%' as const, height: 118 };
  if (nombre === 3) return { width: '28%' as const, height: 98 };
  return { width: '22%' as const, height: 80 };
}

/**
 * Le bandeau d'un point : le numero du plan, l'etat, le code de la grille.
 * Une seule definition pour la carte du plan et pour la fiche detaillee, sinon
 * les deux finissent par diverger.
 */
function BandeauEtat({
  numero,
  critique,
  code,
  large = false,
}: {
  numero: number;
  critique: boolean;
  code: string;
  large?: boolean;
}) {
  const couleur = critique ? ROUGE : AMBRE;
  return (
    <View style={[s.fiche3Bandeau, large ? s.bandeauLarge : {}]}>
      <Text style={[s.fiche3Numero, { backgroundColor: couleur }]}>
        {String(numero).padStart(2, '0')}
      </Text>
      <Text style={[s.fiche3Etat, { color: couleur }]}>{critique ? 'Critique' : 'Non conforme'}</Text>
      <Text style={s.fiche3Code}>{code.replace(/-[A-Z0-9]{4}$/, '')}</Text>
    </View>
  );
}

/** Libelle d'une rubrique : son pictogramme, puis le mot, sur la meme ligne. */
function CleRubrique({ icone, couleur, children }: { icone: string; couleur: string; children: string }) {
  return (
    <View style={s.cleLigne}>
      <Glyphe nom={icone} taille={12} couleur={couleur} />
      <Text style={[s.rubriqueCle, { color: couleur, marginBottom: 0, marginLeft: 7 }]}>{children}</Text>
    </View>
  );
}

function Fiche({ a, numero, logo }: { a: ActionCorrective; numero: number; logo?: string | null }) {
  const critique = a.priorite === 'IMMEDIAT';
  return (
    /* Un point par page : on exige presque une page libre devant la fiche, donc
       la suivante part toujours sur une page neuve. `break` repete n'est pas
       fiable ici, le moteur cesse de l'honorer au bout de quelques appels. */
    <View style={{ height: HAUTEUR_UTILE }} wrap={false}>
    <View style={s.fiche}>
      {/* Le rail porte le rang et la gravite sur toute la hauteur : le point se
          repere des que le client feuillette, rapport ferme sur la tranche. */}
      <View style={[s.rail, { backgroundColor: critique ? ROUGE : AMBRE }]}>
        <Text style={s.railNumero}>{String(numero).padStart(2, '0')}</Text>
        <View style={s.railPivot}>
          <Text style={s.railMot}>{critique ? 'CRITIQUE' : 'NON CONFORME'}</Text>
        </View>
        <View style={s.railBas}>
          <Text style={s.railCode}>{a.code.replace(/-[A-Z0-9]{4}$/, '')}</Text>
          {logo ? <Image src={logo} style={s.railLogo} /> : null}
        </View>
      </View>

      <View style={s.ficheInterieur}>
      <View style={s.ficheTete}>
        {/* Entete courant de la page : le theme du point, en haut a droite, sur
            le meme filet d'une page a l'autre. */}
        <View style={s.ficheEntete}>
          <Glyphe nom={iconeTheme(a.theme)} taille={11} couleur={critique ? ROUGE : AMBRE} />
          <Text style={[s.ficheMeta, { color: critique ? ROUGE : AMBRE }]}>{a.theme}</Text>
        </View>
        <Text style={s.ficheTitre}>{a.intitule}</Text>
      </View>

      <View style={s.ficheCorps}>
        {a.constat ? (
          <View style={s.rubrique}>
            <CleRubrique icone="loupe" couleur={GRIS}>Constaté lors de la visite</CleRubrique>
            <Text style={s.ficheTexte}>{a.constat}</Text>
            {a.attendu ? (
              <Text style={s.ficheAttendu}>Ce que demande le point : {a.attendu}</Text>
            ) : null}
          </View>
        ) : null}

        <View style={s.rubrique}>
          <Text style={[s.rubriqueCle, { color: critique ? ROUGE : AMBRE }]}>
            La conséquence du manquement
          </Text>
          <Text style={s.ficheTexte}>{a.risque}</Text>
        </View>

        {/* La correction est ce que le client vient chercher : seul aplat de la page. */}
        <View style={s.correction}>
          <CleRubrique icone="listeCochee" couleur={VERT_PROFOND}>La correction à faire</CleRubrique>
          <Text style={s.correctionTexte}>{a.correctif}</Text>

          {a.etapes.length > 0 ? (
            <View style={s.etapes}>
              {a.etapes.map((etape, n) => (
                <View key={etape} style={s.etape}>
                  <Text style={s.etapeNum}>{n + 1}</Text>
                  <Text style={s.etapeTexte}>{etape}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {a.materiel.length > 0 ? (
          <View style={s.rubrique} wrap={false}>
            <CleRubrique icone="panier" couleur={VERT_PROFOND}>Matériel à prévoir</CleRubrique>
            <View style={s.materielListe}>
              {a.materiel.map((m) => (
                <View key={m} style={s.materielPuce}>
                  <View style={s.materielCase} />
                  <Text style={s.materielItem}>{m}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {a.photos.length > 0 && (
          /* Le libellé et la bande de photos tiennent ensemble : séparés, le
             libellé restait seul en bas de page. */
          <View style={s.blocPhotos} wrap={false}>
            <View style={s.bandePhotos}>
              {a.photos.slice(0, PHOTOS_MAX).map((p, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <View key={i} style={[s.cadrePhoto, taillePhoto(a.photos.length)]}>
                  <Image src={p.url} style={s.photo} />
                  {p.prise ? <Text style={s.horodate}>{p.prise}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        )}

        {critique ? (
          <View style={s.blocControle}>
            <View style={s.ligneAlerte}>
              <View style={s.pictoAlerte}>
                <PictoAlerte taille={19} />
              </View>
              <Text style={[s.rubriqueCle, { color: ROUGE, marginBottom: 0 }]}>
                Les suites possibles en cas de contrôle
              </Text>
            </View>
            <Text style={s.ficheTexte}>
              {suitesProbables(a.priorite)
                .map((x, i) => (i === 0 ? x.titre : x.titre.charAt(0).toLowerCase() + x.titre.slice(1)))
                .join(', ')}
              .
            </Text>
          </View>
        ) : null}

        {referenceValide(a.referenceRegl) ? (
          <View style={s.texteLoi}>
            <CleRubrique icone="classeur" couleur={GRIS}>Le texte qui s’applique</CleRubrique>
            <Text style={s.texteLoiCorps}>{abrege(a.referenceRegl)}</Text>
            <Text style={s.texteLoiNote}>Version complète en annexe du rapport.</Text>
          </View>
        ) : null}
      </View>
      </View>
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

/** Decoupe stricte : chaque page porte le plafond, sauf la derniere. */
function decouper<T>(liste: T[], taille: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < liste.length; i += taille) pages.push(liste.slice(i, i + taille));
  return pages;
}

function equilibrer<T>(liste: T[], plafond: number): T[][] {
  const nb = Math.max(1, Math.ceil(liste.length / plafond));
  const parPage = Math.ceil(liste.length / nb);
  const pages: T[][] = [];
  for (let i = 0; i < liste.length; i += parPage) pages.push(liste.slice(i, i + parPage));
  return pages;
}

export function HygieneDocument({ data }: { data: HygienePdfData }) {
  const r = data.rapport;
  const references = r.themes
    .flatMap((t) => t.items)
    .filter((i) => referenceValide(i.referenceRegl))
    .map((i) => ({ code: i.code, intitule: i.intitule, texte: i.referenceRegl as string }));


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

  /* Les fiches occupent une page chacune, a la suite du plan : couverture,
     toile, notation, sommaire, puis dix cartes de plan par page. On en deduit
     la plage de pages qui portent la bande de couleur. */
  const pagesFiches: [number, number] | null =
    r.actions.length > 0
      ? [
          5 + Math.ceil(r.actions.length / 10),
          5 + Math.ceil(r.actions.length / 10) + r.actions.length - 1,
        ]
      : null;

  /* Le sommaire ne liste que les parties reellement presentes dans ce rapport. */
  const parties = [
    r.actions.length > 0
      ? {
          icone: 'liste',
          titre: 'Le plan de mise en conformité',
          texte: `${r.actions.length} ${r.actions.length > 1 ? 'points' : 'point'} : le constat de l'auditeur, la correction attendue, puis la fiche détaillée de chacun.`,
        }
      : null,
    r.materielAPrevoir.length > 0
      ? {
          icone: 'cartons',
          titre: 'Le matériel à prévoir',
          texte: `${r.materielAPrevoir.length} ${r.materielAPrevoir.length > 1 ? 'éléments à réunir' : 'élément à réunir'} pour appliquer les corrections, en une seule liste.`,
        }
      : null,
    {
      icone: 'balance',
      titre: 'Les risques et les suites',
      texte: "Ce qu'un écart fait peser sur le consommateur, sur l'établissement, et l'échelle des suites d'un contrôle officiel.",
    },
    {
      icone: 'bouclier',
      titre: 'Ce qui est déjà tenu',
      texte: "Les points conformes le jour de la visite, et l'ordre des étages à garder dans le froid.",
    },
    {
      icone: 'loupe',
      titre: 'Le détail de tous les points',
      texte: `Les ${r.totalPoints} points examinés, leur état et les notes prises sur place.`,
    },
    references.length > 0
      ? {
          icone: 'classeur',
          titre: 'Les références réglementaires',
          texte: "Le texte sur lequel s'appuie chaque point, dans sa version en vigueur à la date de la visite.",
        }
      : null,
    {
      icone: 'etiquette',
      titre: 'La portée du document',
      texte: "Ce que ce rapport dit, ce qu'il ne dit pas, et comment le conserver.",
    },
  ].filter((x): x is { icone: string; titre: string; texte: string } => x !== null);

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
            <View style={s.confidentiel}>
              <Glyphe nom="cadenas" taille={9} couleur={GRIS} />
              <Text style={s.confidentielTexte}>
                Document confidentiel, destiné à l&apos;établissement audité
              </Text>
            </View>
          </View>

          {/* Le nom du client ne se colle pas sous la marque : un filet les sépare. */}
          <View style={s.separateurCouverture} />
          {data.logoClient ? (
            <View style={s.rangLogoClient}>
              <View style={s.logoClientCadre}>
                <Image src={data.logoClient} style={s.logoClientImage} />
              </View>
            </View>
          ) : null}
          <Text style={s.titreCouverture}>{data.etablissement}</Text>
          <Text style={s.sousCouverture}>Rapport d&apos;audit hygiène du {data.date}</Text>
        </View>

        <View style={s.corpsCouverture}>
          <BlocScore r={r} />

        </View>

        {/* Relevé en colonnes : une colonne sur deux prend un fond très pâle, et
            chaque colonne porte son titre et sa valeur, donc rien ne peut se
            décaler entre les deux lignes. */}
        <View style={s.releve}>
          <View style={{ flexDirection: 'row' }}>
            {[
              {
                titre: 'Établissement',
                valeur: data.adresse ?? data.ville ?? 'Non renseignée',
                sous: data.adresse ? data.ville : null,
                largeur: '28%',
              },
              { titre: 'Type', valeur: data.type ?? 'Non renseigné', sous: null, largeur: '14%' },
              { titre: 'Visite', valeur: data.dateCourte ?? data.date, sous: null, largeur: '14%' },
              { titre: 'Auditeur', valeur: data.auditeur, sous: null, largeur: '18%' },
              { titre: 'Points', valeur: `${r.evalues} / ${r.totalPoints}`, sous: null, largeur: '11%' },
              { titre: 'Référence', valeur: data.reference, sous: null, largeur: '15%' },
            ].map((c, i) => (
              <View
                key={c.titre}
                style={[s.releveCol, { width: c.largeur }, i % 2 === 0 ? s.releveColPale : {}]}
              >
                <Text style={s.releveTitre}>{c.titre}</Text>
                <View style={s.releveFilet} />
                <Text style={s.releveVal}>{c.valeur}</Text>
                {c.sous ? <Text style={s.releveSous}>{c.sous}</Text> : null}
              </View>
            ))}
          </View>
        </View>

        <Text style={s.mentionPied}>{MENTION_LABEL_PRIVE}</Text>
      </Page>

      {/* Le corps du rapport coule d'une partie à l'autre : ouvrir une page
          neuve à chaque partie laissait une demi-page blanche à chaque fin. */}
      <Page size="A4" style={s.page}>
      {/* 02 · Vue d'ensemble */}
      <View {...signet("Le résultat en un coup d'oeil")} style={[s.chapitre, { marginTop: 0 }]}>
        <View style={{ height: HAUTEUR_UTILE }} wrap={false}>
        <TeteSection
          titre="Le résultat en un coup d'oeil"
          chapeau="L'étoile donne la forme de l'établissement : plus la surface est large, plus la maîtrise est homogène. Un creux marque un thème à reprendre."
        />

        <View style={s.modeEmploi}>
          <Text style={s.modeTitre}>Comment lire la toile</Text>
          {[
            'Un axe par thème noté. Plus le sommet est loin du centre, mieux le thème est tenu.',
            'Un anneau tous les 25 points. Le bord extérieur vaut 100, le centre vaut 0.',
            'La couleur du sommet donne le niveau : vert à partir de 80, ambre de 60 à 79, rouge en dessous.',
            'Un creux vers le centre est un thème à reprendre. Une surface large et régulière est une maison tenue.',
          ].map((ligne) => (
            <View key={ligne} style={s.modeLigne}>
              <View style={s.modePuce} />
              <Text style={s.modeTexte}>{ligne}</Text>
            </View>
          ))}
        </View>

        {themesNotes.length >= 3 ? (
          <View style={s.panneau}>
            <Text style={s.panneauTitre}>Maîtrise par thème</Text>
            <Text style={s.panneauNote}>un anneau tous les 25 points, le bord extérieur vaut 100</Text>
            <Etoile themes={themesNotes} />
            <View style={s.panneauLegende}>
              {[
                { c: VERT, n: '80 et plus', t: 'le thème est tenu' },
                { c: AMBRE, n: '60 à 79', t: 'à consolider' },
                { c: ROUGE, n: 'moins de 60', t: 'à reprendre' },
              ].map((x) => (
                <View key={x.n} style={s.legendePuce}>
                  <View style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: x.c, marginRight: 7 }} />
                  <Text style={s.legendeTexte}>
                    <Text style={{ color: x.c, ...poids(700) }}>{x.n}</Text>
                    <Text style={{ color: GRIS }}>{` · ${x.t}`}</Text>
                  </Text>
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

        </View>

        <View style={[s.section, { height: HAUTEUR_UTILE, marginTop: 0 }]} wrap={false}>
          <Text style={s.h1}>La notation par thème</Text>

          <View style={s.definitions}>
            {[
              { c: VERT, mot: 'Conforme', t: 'le point est en règle.' },
              { c: AMBRE, mot: 'Non conforme', t: 'écart sans danger immédiat, à régulariser.' },
              {
                c: ROUGE,
                mot: 'Critique',
                t: 'danger pour les denrées. Peut conduire à une fermeture en contrôle.',
              },
            ].map((d) => (
              <View key={d.mot} style={s.definition}>
                <View style={[s.definitionPuce, { backgroundColor: d.c }]} />
                <Text style={s.definitionTexte}>
                  <Text style={{ color: d.c, ...poids(700) }}>{d.mot}</Text>
                  <Text style={{ color: GRIS }}>{` : ${d.t}`}</Text>
                </Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 12 }}>
            <View style={s.recapEntete}>
              <Text style={[s.recapTitre, { flex: 1, textAlign: 'left' }]}>Thème</Text>
              <Text style={[s.recapTitre, { width: 54 }]}>Points vérifiés</Text>
              <Text style={[s.recapTitre, { width: 54 }]}>Conformes</Text>
              <Text style={[s.recapTitre, { width: 60 }]}>Non conformes</Text>
              <Text style={[s.recapTitre, { width: 74, color: ROUGE }]}>Critique</Text>
              <Text style={[s.recapTitre, { width: 110 }]}>Note sur 100</Text>
            </View>

            {themesClasses.map((t, i) => {
              const evalues = t.conformes + t.ncMineures + t.ncMajeures;
              const note = t.score === null ? 0 : Math.round(t.score);
              /* Un point rouge en tête de ligne dès qu'un point critique est présent. */
              const critiques = t.ncMajeures;
              return (
                <View
                  key={t.theme}
                  style={[s.recapLigne, i % 2 === 1 ? { backgroundColor: '#F7FAF9' } : {}]}
                  wrap={false}
                >
                  <View style={s.recapRangee}>
                  <View style={s.recapNom}>
                    {critiques > 0 ? <View style={s.recapAlerte} /> : <View style={s.recapAlerteVide} />}
                    <Glyphe
                      nom={iconeTheme(t.theme)}
                      taille={11}
                      couleur={t.score === null ? GRIS_CLAIR : ENCRE}
                    />
                    <Text style={s.recapNomTexte}>{t.theme}</Text>
                  </View>

                  <Text style={[s.recapVal, { width: 54, color: GRIS }]}>{evalues || '·'}</Text>
                  <Text style={[s.recapVal, { width: 54, color: t.conformes ? VERT : GRIS_CLAIR }]}>
                    {t.conformes || '·'}
                  </Text>
                  <Text style={[s.recapVal, { width: 60, color: t.ncMineures ? AMBRE : GRIS_CLAIR }]}>
                    {t.ncMineures || '·'}
                  </Text>
                  <Text style={[s.recapVal, { width: 74, color: t.ncMajeures ? ROUGE : GRIS_CLAIR }]}>
                    {t.ncMajeures || '·'}
                  </Text>

                  <View style={s.recapNoteBloc}>
                    <View style={s.recapBarreFond}>
                      <View
                        style={[
                          s.recapBarre,
                          {
                            width: `${t.score === null ? 0 : Math.max(2, note)}%`,
                            backgroundColor: couleurScore(t.score),
                          },
                        ]}
                      />
                    </View>
                    <Text
                      style={[
                        s.recapNote,
                        { color: t.score === null ? GRIS_CLAIR : couleurScore(t.score) },
                      ]}
                    >
                      {t.score === null ? '·' : note}
                    </Text>
                  </View>
                  </View>
                </View>
              );
            })}

            <View style={s.recapTotal}>
              <Text style={[s.recapNomTexte, { flex: 1, marginLeft: 0, ...poids(700) }]}>
                Ensemble de l&apos;audit
              </Text>
              <Text style={[s.recapVal, { width: 54, ...poids(700) }]}>{r.evalues}</Text>
              <Text style={[s.recapVal, { width: 54, color: VERT, ...poids(700) }]}>{r.conformes}</Text>
              <Text style={[s.recapVal, { width: 60, color: AMBRE, ...poids(700) }]}>{r.ncMineures}</Text>
              <Text style={[s.recapVal, { width: 74, color: ROUGE, ...poids(700) }]}>{r.ncMajeures}</Text>
              <View style={s.recapNoteBloc}>
                <View style={s.recapBarreFond}>
                  <View
                    style={[
                      s.recapBarre,
                      { width: `${Math.max(2, Math.round(r.scoreGlobal))}%`, backgroundColor: r.niveau.couleur },
                    ]}
                  />
                </View>
                <Text style={[s.recapNote, { color: r.niveau.couleur }]}>
                  {r.evalues === 0 ? '·' : Math.round(r.scoreGlobal)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Une section qui occupe toute la hauteur utile pousse la suivante sur
            une page neuve. `break` n'est pas fiable ici : le moteur cesse de
            l'honorer au bout de quelques appels et deux sections finissent
            imprimees l'une par-dessus l'autre. */}
        <View {...signet('Sommaire')} style={{ height: HAUTEUR_UTILE }} wrap={false}>
          <TeteSection
            titre="Ce que contient ce rapport"
            chapeau="Les parties, dans l'ordre de lecture conseillé. Si vous n'en lisez qu'une, lisez la première : elle suffit à savoir quoi faire cette semaine."
          />

          <View style={{ marginTop: 6 }}>
            {parties.map((partie, i) => (
              <LigneSommaire
                key={partie.titre}
                num={i + 1}
                icone={partie.icone}
                titre={partie.titre}
                texte={partie.texte}
              />
            ))}
            <View style={s.filet} />
          </View>

          <View style={s.section}>
            <Text style={s.h2}>Comment se lit la note</Text>
            <Text style={[s.gris, { marginTop: 6, maxWidth: 430 }]}>
              Chaque point vaut un poids de 1 à 3 selon son impact sanitaire. Un point conforme rapporte
              la totalité de son poids, un écart mineur la moitié, un point critique rien. Les points non
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

        {r.actions.length > 0 ? (
          <View>
            {decouper(r.actions, 10).map((lot, ip, lots) => {
              const rang0 = lots.slice(0, ip).reduce((n, l) => n + l.length, 0);
              return (
                <View key={ip} style={{ height: HAUTEUR_UTILE }} wrap={false}>
                  {ip === 0 ? (
                    <TeteSection
                      titre="Plan de mise en conformité"
                      chapeau="Point par point : le constat de l'auditeur et la correction attendue. Les non-conformités majeures d'abord."
                    />
                  ) : null}

                  <View style={s.fiche3Grille}>
                    {lot.map((a, i) => {
                      const critique = a.priorite === 'IMMEDIAT';
                      return (
                        <View key={a.code} style={s.fiche3}>
                          <BandeauEtat numero={rang0 + i + 1} critique={critique} code={a.code} />

                          <View style={{ paddingHorizontal: 9, paddingTop: 5 }}>
                            <Text style={[s.fiche3Titre, { maxLines: 2, textOverflow: 'ellipsis' }]}>
                              {a.intitule}
                            </Text>
                          </View>

                          <View style={s.fiche3Zone}>
                            <Text style={s.fiche3Cle}>Constaté</Text>
                            <Text style={[s.fiche3Probleme, { maxLines: 2, textOverflow: 'ellipsis' }]}>
                              {a.constat?.trim() || a.risque}
                            </Text>
                          </View>

                          <View style={s.fiche3Bas}>
                            <Text style={[s.fiche3Cle, { color: VERT_PROFOND }]}>Correction</Text>
                            <Text style={[s.fiche3Correction, { maxLines: 2, textOverflow: 'ellipsis' }]}>
                              {a.correctif}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}

      </View>

      {/* 03 · Points à corriger, seulement s'il y en a */}
      {r.actions.length > 0 ? (
      <View {...signet("Points à corriger")} style={[s.chapitre, { marginTop: 0 }]}>
        {r.actions.map((a, i) => (
          <Fiche key={a.code} a={a} numero={i + 1} logo={data.logoBlanc} />
        ))}

        {r.materielAPrevoir.length > 0 ? (
          <View>
            {equilibrer(r.materielAPrevoir, 10).map((page, ip, pages) => {
              const rang0 = pages.slice(0, ip).reduce((n, p) => n + p.length, 0);
              return (
                <View key={ip} style={{ height: HAUTEUR_UTILE }} wrap={false}>
                  {ip === 0 ? (
                    <TeteSection
                      titre="Le matériel à prévoir"
                      chapeau="Tout ce que les corrections réclament, en une seule liste. Un même matériel n’est cité qu’une fois, avec les points qui le demandent."
                    />
                  ) : null}

                  <View style={s.achatGrille}>
                    {page.map((m, im) => (
                      <View key={m.intitule} style={s.achatCarte} wrap={false}>
                        <View style={s.achatCase} />
                        <View style={{ flex: 1 }}>
                          <Text style={s.achatNom}>{m.intitule}</Text>
                          <Text style={s.achatPoints}>{m.points.join(' · ')}</Text>
                        </View>
                        <Text style={s.achatRang}>{String(rang0 + im + 1).padStart(2, '0')}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}

      </View>
      ) : null}

      {/* 04 · Risques et suites */}
      <View {...signet("Risques et suites")} style={[s.chapitre, { marginTop: 0 }]} break>
        <TeteSection titre="Ce qu'un écart peut coûter" chapeau={lectureDuRisque(r)} />

        {r.ncMajeures > 0 ? (
          <View style={s.blocControle}>
            <View style={s.ligneAlerte}>
              <View style={s.pictoAlerte}>
                <PictoAlerte taille={19} />
              </View>
              <Text style={[s.rubriqueCle, { color: ROUGE, marginBottom: 0 }]}>
                {r.ncMajeures} {r.ncMajeures > 1 ? 'points critiques' : 'point critique'} à traiter en
                priorité
              </Text>
            </View>
            <Text style={s.ficheTexte}>
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

      {/* 05 · Ce qui est tenu */}
      <View {...signet("Ce qui est déjà tenu")} style={s.chapitre} break>
        <TeteSection
          titre="Ce qui est déjà tenu"
          chapeau="Les points en règle le jour de la visite, et l'ordre des étages à garder dans le froid."
        />

        {r.pointsForts.length > 0 ? (
          <View style={s.section}>
            <Text style={s.h2}>Les points en règle</Text>
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

        <PlanDuFroid r={r} />

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
            L&apos;état constaté le {data.date} sur {r.totalPoints} points de la grille d&apos;audit,
            par {data.auditeur}. Les constats reposent sur ce qui était observable ce jour-là, dans les
            zones ouvertes à l&apos;auditeur.
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
          <Text style={{ ...poids(600), fontSize: 9.2 }}>
            Fait à {data.ville ?? "l'établissement"}, le {data.date}
          </Text>
          <Text style={[s.gris, { marginTop: 3, maxWidth: 430 }]}>
            Rapport établi par {data.auditeur}, auditeur, sous la référence {data.reference}.{' '}
            {r.evalues} points examinés sur {r.totalPoints}, {r.nbPhotos}{' '}
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

        <View style={{ marginTop: 26 }} wrap={false}>
          <Meta cle="Établissement" valeur={[data.etablissement, data.ville].filter(Boolean).join(', ')} />
          {data.adresse ? <Meta cle="Adresse" valeur={data.adresse} /> : null}
          <Meta cle="Référence" valeur={data.reference} />
          <Meta cle="Auditeur" valeur={data.auditeur} />
          <Meta cle="Date de la visite" valeur={data.date} />
          <Meta cle="Points examinés" valeur={`${r.evalues} sur ${r.totalPoints}`} />
          <View style={s.filet} />
        </View>

      </View>
        <Pied data={data} fiches={pagesFiches} />
      </Page>
    </Document>
  );
}
