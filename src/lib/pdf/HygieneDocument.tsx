/**
 * Rapport d'audit hygiène, version PDF téléchargeable.
 *
 * Page 1 en synthèse : anneau de score, état des lieux, notation par thème sur
 * deux colonnes. Viennent ensuite les points à corriger (constat, risque, moyen
 * de correction, photos en bande sous le texte), les risques et les suites
 * possibles d'un contrôle officiel, le détail de tous les points, les références
 * réglementaires, puis la portée du rapport.
 *
 * Pied de page sur toutes les pages : bandeau dégradé, logo blanc à gauche, nom
 * de l'établissement au centre, numéro de page à droite. Le numéro est posé par
 * NumeroPage, directement sur la page : imbriqué dans le bandeau, lui-même fixe,
 * il ne se rejouait que sur la première page.
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
  Defs,
  LinearGradient,
  Stop,
  StyleSheet,
} from '@react-pdf/renderer';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';
import type { RapportHygiene, ActionCorrective } from '@/lib/rapport-hygiene';
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
  rapport: RapportHygiene;
}

const INK = '#0C1B17';
const GRIS = '#6B7D77';
const GRIS_CLAIR = '#9AA8A3';
const FILET = '#E4E9E7';
const FILET_FORT = '#CBD5D1';
const VERT = '#10B981';
const ROUGE = '#DC2626';
const AMBRE = '#B45309';

/** Bornes du dégradé du pied de page : vert de marque, puis vert profond. */
const DEG_A = '#10B981';
const DEG_B = '#047857';
const DEG_C = '#065F46';

const s = StyleSheet.create({
  page: {
    paddingTop: 46,
    paddingBottom: 62,
    paddingHorizontal: 50,
    fontSize: 9.5,
    lineHeight: 1.5,
    color: INK,
    fontFamily: 'Helvetica',
  },

  enteteRang: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  wordmark: { fontSize: 11, fontFamily: 'Helvetica-Bold', letterSpacing: -0.2 },
  wordmarkVert: { color: VERT },

  sur: { fontSize: 7.5, letterSpacing: 1.3, textTransform: 'uppercase', color: GRIS_CLAIR },
  h1: { fontSize: 24, fontFamily: 'Helvetica-Bold', letterSpacing: -0.7, lineHeight: 1.2, marginTop: 16 },
  h2: { fontSize: 15, fontFamily: 'Helvetica-Bold', letterSpacing: -0.3 },
  h3: { fontSize: 10.5, fontFamily: 'Helvetica-Bold' },
  lede: { color: GRIS, marginTop: 8, maxWidth: 400 },
  gris: { color: GRIS },
  petit: { fontSize: 8, color: GRIS, lineHeight: 1.45 },
  filet: { borderTopWidth: 0.6, borderTopColor: FILET },
  section: { marginTop: 26 },

  anneauRang: { flexDirection: 'row', alignItems: 'center', marginTop: 22 },
  anneauBoite: { width: 104, height: 104, marginRight: 22, position: 'relative' },
  anneauVal: {
    position: 'absolute',
    top: 36,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: -0.8,
  },
  anneauSur: { position: 'absolute', top: 62, left: 0, right: 0, textAlign: 'center', fontSize: 7.5, color: GRIS },

  puces: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  puce: {
    flexDirection: 'row',
    borderWidth: 0.7,
    borderColor: FILET_FORT,
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 5,
    fontSize: 8,
    color: GRIS,
  },
  puceVal: { fontFamily: 'Helvetica-Bold', color: INK },

  colonnes: { flexDirection: 'row', marginTop: 10 },
  colonne: { flex: 1 },
  colonneGauche: { marginRight: 26 },

  thLigne: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5.5, borderTopWidth: 0.6, borderTopColor: FILET },
  thNom: { flex: 1, fontSize: 9 },
  thBarreFond: { width: 54, height: 2.5, backgroundColor: '#EEF2F0', marginHorizontal: 9 },
  thBarre: { height: 2.5 },
  thVal: { width: 20, textAlign: 'right', fontFamily: 'Helvetica-Bold', fontSize: 9 },

  fiche: { marginTop: 16, paddingTop: 14, borderTopWidth: 0.6, borderTopColor: FILET },
  ficheTete: { flexDirection: 'row', alignItems: 'flex-start' },
  ficheCode: { width: 62, fontSize: 8, color: GRIS_CLAIR, paddingTop: 2 },
  ficheTitre: { fontSize: 11.5, fontFamily: 'Helvetica-Bold', letterSpacing: -0.2, lineHeight: 1.3 },
  ficheSource: { fontSize: 8, color: GRIS, marginTop: 1 },
  etiquette: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', letterSpacing: 0.6, paddingTop: 2 },
  corps: { paddingLeft: 62, marginTop: 10 },
  bloc: { marginTop: 9 },
  cle: { fontSize: 7.5, letterSpacing: 0.9, textTransform: 'uppercase', color: GRIS_CLAIR, marginBottom: 2 },

  bandePhotos: { flexDirection: 'row', marginTop: 4 },
  photo: { width: 138, height: 100, objectFit: 'cover', marginRight: 7, borderRadius: 3 },

  ptLigne: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 5.5, borderTopWidth: 0.6, borderTopColor: FILET },
  pastille: { width: 5, height: 5, borderRadius: 2.5, marginTop: 4, marginRight: 9 },
  ptTexte: { flex: 1 },
  ptPhotos: { width: 34, textAlign: 'right', fontSize: 7.5, color: GRIS_CLAIR },
  ptEtat: { width: 104, textAlign: 'right', fontSize: 8, color: GRIS },

  renvoi: { flexDirection: 'row', paddingVertical: 9, borderTopWidth: 0.6, borderTopColor: FILET },
  renvoiCode: { width: 62, fontSize: 8, color: GRIS_CLAIR, paddingTop: 1 },

  ligneMeta: { flexDirection: 'row', paddingVertical: 5, borderTopWidth: 0.6, borderTopColor: FILET },
  metaCle: { width: 130, color: GRIS },

  /* Pied de page */
  bandeau: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  bandeauFond: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  bandeauLogo: { width: 64, height: 12.8, objectFit: 'contain' },
  bandeauNom: { flex: 1, textAlign: 'center', fontSize: 8.5, color: '#FFFFFF' },
  bandeauPage: { width: 70 },
  bandeauMarque: { width: 64, fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#FFFFFF' },
  /* Posé directement sur la page, jamais dans le bandeau : un bloc fixe imbriqué
     dans un autre bloc fixe ne rejoue pas son rendu page après page. */
  numPage: {
    position: 'absolute',
    bottom: 12,
    right: 22,
    width: 70,
    textAlign: 'right',
    fontSize: 8.5,
    color: '#FFFFFF',
  },

  /* Risques et suites */
  suite: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 9, borderTopWidth: 0.6, borderTopColor: FILET },
  suiteRang: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    marginRight: 12,
    textAlign: 'center',
    paddingTop: 3.6,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
  },
  suiteQuand: { fontSize: 8, color: GRIS_CLAIR, marginTop: 1 },
  encart: {
    marginTop: 14,
    padding: 11,
    borderWidth: 0.7,
    borderColor: FILET_FORT,
    borderRadius: 5,
    backgroundColor: '#FAFBFB',
  },
  risqueLigne: { marginTop: 11 },
  alerte: {
    marginTop: 16,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderLeftWidth: 2.5,
    borderLeftColor: ROUGE,
    backgroundColor: '#FEF4F4',
  },
});

function couleurScore(n: number | null): string {
  if (n === null) return '#D7DEDB';
  if (n >= 80) return VERT;
  if (n >= 60) return '#F59E0B';
  return ROUGE;
}

/** Première phrase de la référence réglementaire, pour la fiche. Le reste part en annexe. */
function abrege(texte: string, max = 190): string {
  const t = texte.trim();
  if (t.length <= max) return t;
  const coupe = t.slice(0, max);
  const point = Math.max(coupe.lastIndexOf('. '), coupe.lastIndexOf(' ; '));
  return `${(point > 60 ? coupe.slice(0, point) : coupe).trim()}.`;
}

/** Arc de cercle partant du haut, dans le sens horaire. */
function arc(cx: number, cy: number, r: number, part: number): string {
  const p = Math.max(0.0001, Math.min(0.9999, part));
  const angle = p * 2 * Math.PI - Math.PI / 2;
  const x = cx + r * Math.cos(angle);
  const y = cy + r * Math.sin(angle);
  return `M ${cx} ${cy - r} A ${r} ${r} 0 ${p > 0.5 ? 1 : 0} 1 ${x} ${y}`;
}

function Bandeau({ data }: { data: HygienePdfData }) {
  return (
    <View style={s.bandeau} fixed>
      <View style={s.bandeauFond}>
        <Svg width="100%" height={34} viewBox="0 0 600 34" preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="pied" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={DEG_A} />
              <Stop offset="0.55" stopColor={DEG_B} />
              <Stop offset="1" stopColor={DEG_C} />
            </LinearGradient>
          </Defs>
          <Rect x={0} y={0} width={600} height={34} fill="url(#pied)" />
        </Svg>
      </View>
      {data.logoBlanc ? (
        <Image src={data.logoBlanc} style={s.bandeauLogo} />
      ) : (
        <Text style={s.bandeauMarque}>audit hygiène</Text>
      )}
      <Text style={s.bandeauNom}>{data.etablissement}</Text>
      {/* Réserve la place du numéro, qui est posé par NumeroPage. */}
      <View style={s.bandeauPage} />
    </View>
  );
}

/** Numéro de page en bas à droite, rejoué sur chaque page. */
function NumeroPage() {
  return (
    <Text
      style={s.numPage}
      fixed
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
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

function Meta({ cle, valeur }: { cle: string; valeur: string }) {
  return (
    <View style={s.ligneMeta}>
      <Text style={s.metaCle}>{cle}</Text>
      <Text>{valeur}</Text>
    </View>
  );
}

function Theme({ nom, score }: { nom: string; score: number | null }) {
  return (
    <View style={s.thLigne}>
      <Text style={s.thNom}>{nom}</Text>
      <View style={s.thBarreFond}>
        <View
          style={[
            s.thBarre,
            { width: `${Math.max(0, Math.min(100, score ?? 0))}%`, backgroundColor: couleurScore(score) },
          ]}
        />
      </View>
      <Text style={s.thVal}>{score === null ? '·' : Math.round(score)}</Text>
    </View>
  );
}

function Fiche({ a }: { a: ActionCorrective }) {
  const critique = a.priorite === 'IMMEDIAT';
  return (
    <View style={s.fiche} wrap={false}>
      <View style={s.ficheTete}>
        <Text style={s.ficheCode}>{a.code}</Text>
        <View style={{ flex: 1 }}>
          <Text style={s.ficheTitre}>{a.intitule}</Text>
          <Text style={s.ficheSource}>
            {a.theme} · {a.delai}
          </Text>
        </View>
        <Text style={[s.etiquette, { color: critique ? ROUGE : AMBRE }]}>
          {critique ? 'CRITIQUE' : 'ÉCART MINEUR'}
        </Text>
      </View>

      <View style={s.corps}>
        {a.constat ? (
          <View style={s.bloc}>
            <Text style={s.cle}>Constaté sur place</Text>
            <Text>{a.constat}</Text>
          </View>
        ) : null}
        <View style={s.bloc}>
          <Text style={s.cle}>Risque</Text>
          <Text>{a.risque}</Text>
        </View>
        <View style={s.bloc}>
          <Text style={s.cle}>Moyen de correction</Text>
          <Text>{a.correctif}</Text>
        </View>

        {a.photos.length > 0 && (
          <View style={s.bloc}>
            <Text style={s.cle}>Photos</Text>
            <View style={s.bandePhotos}>
              {a.photos.slice(0, 3).map((p, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Image key={i} src={p.url} style={s.photo} />
              ))}
            </View>
          </View>
        )}

        <View style={s.bloc}>
          <Text style={s.cle}>Si ce point est retrouvé en contrôle</Text>
          <Text style={s.petit}>
            {suitesProbables(a.priorite)
              .map((x) => x.titre.toLowerCase())
              .join(', ')}
            . Échelle complète et cadre page suivante.
          </Text>
        </View>

        {a.referenceRegl ? (
          <View style={s.bloc}>
            <Text style={s.cle}>Référence</Text>
            <Text style={s.petit}>{abrege(a.referenceRegl)} Texte complet en annexe.</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export function HygieneDocument({ data }: { data: HygienePdfData }) {
  const r = data.rapport;
  const moitie = Math.ceil(r.themes.length / 2);
  const part = Math.max(0, Math.min(100, r.scoreGlobal)) / 100;
  const references = r.themes
    .flatMap((t) => t.items)
    .filter((i) => i.referenceRegl)
    .map((i) => ({ code: i.code, intitule: i.intitule, texte: i.referenceRegl as string }));

  return (
    <Document
      title={`Rapport d'audit hygiène ${data.etablissement}`}
      author="audit hygiène"
      subject={`Audit du ${data.date}`}
    >
      {/* Synthèse */}
      <Page size="A4" style={s.page}>
        <View style={s.enteteRang}>
          <Text style={s.wordmark}>
            audit <Text style={s.wordmarkVert}>hygiène</Text>
          </Text>
          <Text style={s.sur}>
            {data.date} · {data.reference}
          </Text>
        </View>

        <Text style={s.h1}>{data.etablissement}</Text>
        <Text style={s.lede}>
          {[data.type, data.adresse ?? data.ville].filter(Boolean).join(', ')}. Audit conduit par{' '}
          {data.auditeur}, grille {data.grilleVersion}, {r.evalues} points examinés sur {r.totalPoints}.
        </Text>

        <View style={s.anneauRang}>
          <View style={s.anneauBoite}>
            <Svg width={104} height={104} viewBox="0 0 104 104">
              <Path
                d={arc(52, 52, 44, 0.9999)}
                stroke="#EEF2F0"
                strokeWidth={7}
                fill="none"
                strokeLinecap="round"
              />
              {r.evalues > 0 ? (
                <Path
                  d={arc(52, 52, 44, part)}
                  stroke={r.niveau.couleur}
                  strokeWidth={7}
                  fill="none"
                  strokeLinecap="round"
                />
              ) : (
                <Path d="" stroke="none" fill="none" />
              )}
            </Svg>
            <Text style={s.anneauVal}>{r.evalues === 0 ? '·' : Math.round(r.scoreGlobal)}</Text>
            <Text style={s.anneauSur}>sur 100</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[s.h3, { color: r.niveau.couleur }]}>{r.niveau.titre}</Text>
            <Text style={[s.gris, { marginTop: 3 }]}>{r.niveau.phrase}</Text>
            <View style={s.puces}>
              <Text style={s.puce}>
                <Text style={s.puceVal}>{r.conformes}</Text> conformes
              </Text>
              <Text style={[s.puce, r.ncMineures ? { borderColor: '#F0C68A' } : {}]}>
                <Text style={[s.puceVal, r.ncMineures ? { color: AMBRE } : {}]}>{r.ncMineures}</Text> écarts
                mineurs
              </Text>
              <Text style={[s.puce, r.ncMajeures ? { borderColor: '#F2B1B1' } : {}]}>
                <Text style={[s.puceVal, r.ncMajeures ? { color: ROUGE } : {}]}>{r.ncMajeures}</Text>{' '}
                critiques
              </Text>
              <Text style={s.puce}>
                <Text style={s.puceVal}>{r.nbPhotos}</Text> photos
              </Text>
            </View>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.h2}>Notation par thème</Text>
          <View style={s.colonnes}>
            <View style={[s.colonne, s.colonneGauche]}>
              {r.themes.slice(0, moitie).map((t) => (
                <Theme key={t.theme} nom={t.theme} score={t.score} />
              ))}
              <View style={s.filet} />
            </View>
            <View style={s.colonne}>
              {r.themes.slice(moitie).map((t) => (
                <Theme key={t.theme} nom={t.theme} score={t.score} />
              ))}
              <View style={s.filet} />
            </View>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.h3}>Comment lire ce score</Text>
          <Text style={[s.gris, { marginTop: 4, maxWidth: 430 }]}>
            Chaque point vaut un poids de 1 à 3 selon son impact sanitaire. Un point conforme rapporte la
            totalité de son poids, un écart mineur la moitié, un point critique rien. Les points non
            applicables et non évalués sortent du calcul.
          </Text>
          <Text style={[s.petit, { marginTop: 12, maxWidth: 430 }]}>{MENTION_LABEL_PRIVE}</Text>
        </View>

        <Bandeau data={data} />
        <NumeroPage />
      </Page>

      {/* Points à corriger */}
      <Page size="A4" style={s.page}>
        <Text style={s.sur}>À corriger</Text>
        <Text style={[s.h2, { marginTop: 8 }]}>
          {r.actions.length === 0
            ? 'Aucun point à corriger'
            : `${r.actions.length} ${r.actions.length > 1 ? 'points à traiter' : 'point à traiter'}`}
        </Text>
        <Text style={s.lede}>
          {r.actions.length === 0
            ? "Aucun écart n'a été relevé sur les points audités. Continuez à tenir vos relevés et vos enregistrements, ce sont eux qui font la preuve dans la durée."
            : 'Classés par gravité. Pour chaque point : ce qui a été vu, le risque, le moyen de correction, et les photos prises sur place. Gardez une photo après correction, la preuve la plus simple à présenter.'}
        </Text>

        {r.actionsImmediates.length > 0 ? (
          <View style={{ marginTop: 22 }}>
            <Text style={[s.etiquette, { color: ROUGE, fontSize: 9 }]}>SOUS 48 HEURES</Text>
            {r.actionsImmediates.map((a) => (
              <Fiche key={a.code} a={a} />
            ))}
          </View>
        ) : null}

        {r.actionsTrente.length > 0 ? (
          <View style={{ marginTop: 26 }}>
            <Text style={[s.etiquette, { color: AMBRE, fontSize: 9 }]}>SOUS 30 JOURS</Text>
            {r.actionsTrente.map((a) => (
              <Fiche key={a.code} a={a} />
            ))}
          </View>
        ) : null}

        <Bandeau data={data} />
        <NumeroPage />
      </Page>

      {/* Risques et suites possibles */}
      <Page size="A4" style={s.page}>
        <Text style={s.sur}>Risques et suites</Text>
        <Text style={[s.h2, { marginTop: 8 }]}>Ce qu&apos;un écart peut coûter</Text>
        <Text style={s.lede}>{lectureDuRisque(r)}</Text>

        {r.ncMajeures > 0 ? (
          <View style={s.alerte}>
            <Text style={[s.h3, { color: ROUGE }]}>
              {r.ncMajeures} {r.ncMajeures > 1 ? 'points critiques' : 'point critique'} à traiter sous 48
              heures
            </Text>
            <Text style={[s.gris, { marginTop: 2 }]}>
              Un point critique ne se rattrape pas par une bonne note ailleurs. Le détail et le moyen de
              correction figurent aux fiches précédentes.
            </Text>
          </View>
        ) : null}

        <View style={s.section}>
          <Text style={s.h2}>Les suites d&apos;un contrôle officiel</Text>
          <Text style={[s.gris, { marginTop: 6, maxWidth: 430 }]}>
            De la simple observation à la mesure de police, dans l&apos;ordre de gravité.
          </Text>
          <View style={{ marginTop: 10 }}>
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
            <View key={x.titre} style={s.risqueLigne}>
              <Text style={s.h3}>{x.titre}</Text>
              <Text style={[s.gris, { marginTop: 2, maxWidth: 430 }]}>{x.texte}</Text>
            </View>
          ))}
        </View>

        <View style={s.section} wrap={false}>
          <Text style={s.h2}>Ce que risque l&apos;établissement</Text>
          {RISQUES_ETABLISSEMENT.map((x) => (
            <View key={x.titre} style={s.risqueLigne}>
              <Text style={s.h3}>{x.titre}</Text>
              <Text style={[s.gris, { marginTop: 2, maxWidth: 430 }]}>{x.texte}</Text>
            </View>
          ))}
        </View>

        <Bandeau data={data} />
        <NumeroPage />
      </Page>

      {/* Détail */}
      <Page size="A4" style={s.page}>
        <Text style={s.sur}>Détail</Text>
        <Text style={[s.h2, { marginTop: 8 }]}>Tous les points, thème par thème</Text>
        <Text style={s.lede}>
          Les {r.totalPoints} points de la grille, dans l&apos;ordre de l&apos;audit. Un point non
          applicable ou non évalué ne compte pas dans la note.
        </Text>

        {r.themes.map((t) => (
          <View key={t.theme} style={{ marginTop: 20 }} wrap={false}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={[s.h3, { flex: 1 }]}>{t.theme}</Text>
              <Text style={s.petit}>{t.score === null ? 'non évalué' : `${Math.round(t.score)} / 100`}</Text>
            </View>
            <View style={{ marginTop: 5 }}>
              {t.items.map((i) => (
                <View key={i.code} style={s.ptLigne}>
                  <View style={[s.pastille, { backgroundColor: COULEUR_CONFORMITE[i.conformite] }]} />
                  <View style={s.ptTexte}>
                    <Text>{i.intitule}</Text>
                    <Text style={[s.petit, { marginTop: 0.5 }]}>
                      {i.code}
                      {i.commentaire ? ` · ${i.commentaire}` : ''}
                    </Text>
                  </View>
                  <Text style={s.ptPhotos}>{i.photos.length ? `${i.photos.length} ph.` : ''}</Text>
                  <Text style={s.ptEtat}>{LIBELLE_CONFORMITE[i.conformite]}</Text>
                </View>
              ))}
              <View style={s.filet} />
            </View>
          </View>
        ))}

        <Bandeau data={data} />
        <NumeroPage />
      </Page>

      {/* Références réglementaires */}
      <Page size="A4" style={s.page}>
        <Text style={s.sur}>Annexe</Text>
        <Text style={[s.h2, { marginTop: 8 }]}>Références réglementaires</Text>
        <Text style={s.lede}>
          Le texte sur lequel s&apos;appuie chaque point audité, dans sa version en vigueur à la date de
          l&apos;audit. Les points sans référence rattachée relèvent des bonnes pratiques d&apos;hygiène.
        </Text>

        {references.length === 0 ? (
          <Text style={[s.gris, { marginTop: 20 }]}>
            Aucune référence rattachée aux points audités.
          </Text>
        ) : (
          <View style={{ marginTop: 16 }}>
            {references.map((ref) => (
              <View key={ref.code} style={s.renvoi} wrap={false}>
                <Text style={s.renvoiCode}>{ref.code}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.h3}>{ref.intitule}</Text>
                  <Text style={[s.petit, { marginTop: 2 }]}>{ref.texte}</Text>
                </View>
              </View>
            ))}
            <View style={s.filet} />
          </View>
        )}

        <Bandeau data={data} />
        <NumeroPage />
      </Page>

      {/* Portée */}
      <Page size="A4" style={s.page}>
        <Text style={s.sur}>Portée du rapport</Text>
        <Text style={[s.h2, { marginTop: 8 }]}>Ce que dit, et ne dit pas, ce document</Text>

        <View style={{ marginTop: 20 }}>
          <Text style={s.h3}>Ce qu&apos;il contient</Text>
          <Text style={[s.gris, { marginTop: 4, maxWidth: 430 }]}>
            L&apos;état constaté le {data.date} sur {r.totalPoints} points de la grille{' '}
            {data.grilleVersion}, par {data.auditeur}. Les constats reposent sur ce qui était observable
            ce jour-là, dans les zones ouvertes à l&apos;auditeur.
          </Text>
        </View>

        <View style={{ marginTop: 18 }}>
          <Text style={s.h3}>Ce qu&apos;il n&apos;est pas</Text>
          <Text style={[s.gris, { marginTop: 4, maxWidth: 430, lineHeight: 1.6 }]}>
            {MENTION_LABEL_PRIVE} Ce rapport ne garantit pas le résultat d&apos;un contrôle officiel et ne
            remplace ni le plan de maîtrise sanitaire, ni les analyses, ni la formation obligatoire du
            personnel.
          </Text>
        </View>

        <View style={{ marginTop: 18 }}>
          <Text style={s.h3}>Conservation</Text>
          <Text style={[s.gris, { marginTop: 4, maxWidth: 430 }]}>
            Gardez ce rapport avec vos relevés de températures et votre plan de nettoyage. Daté et
            photographié, il montre une démarche suivie.
          </Text>
        </View>

        <View style={{ marginTop: 34 }}>
          <Meta cle="Établissement" valeur={[data.etablissement, data.ville].filter(Boolean).join(', ')} />
          {data.adresse ? <Meta cle="Adresse" valeur={data.adresse} /> : null}
          <Meta cle="Référence" valeur={data.reference} />
          <Meta cle="Auditeur" valeur={data.auditeur} />
          <Meta cle="Date" valeur={data.date} />
          <Meta cle="Grille" valeur={data.grilleVersion} />
          <View style={s.filet} />
        </View>

        <Bandeau data={data} />
        <NumeroPage />
      </Page>
    </Document>
  );
}
