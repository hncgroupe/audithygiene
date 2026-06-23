import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

/** Données d'entrée du rapport PDF auditresto360. */
export interface Resto360ReportData {
  etablissement: string;
  ville?: string;
  date: string; // déjà formatée
  ref: string;
  scoreGlobal: number;
  etoiles: number;
  maturite: string;
  nbCriteresNotes: number;
  nbCriteresTotal: number;
  radar: { radar: string; score: number }[];
  casCritiques: { intitule: string; pilier: string; note: number; commentaire: string | null }[];
  plan: { priorite: string; intitule: string; pilier: string; commentaire: string | null; delai: string }[];
  quickWins: { intitule: string; pilier: string }[];
  dirigeant: { question: string; reponse: string }[];
  photos: { intitule: string; url: string }[];
  details: {
    nom: string;
    numero: number;
    score: number | null;
    criteres: { intitule: string; note: number | null; commentaire: string | null; photos: string[] }[];
  }[];
}

const ORANGE = '#F97316';
const INK = '#0C1B17';
const GRIS = '#6B7D77';

const s = StyleSheet.create({
  page: { padding: 36, fontSize: 10, color: INK, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  brand: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: INK },
  brandO: { color: ORANGE },
  badge: { color: GRIS, fontSize: 8, textTransform: 'uppercase', letterSpacing: 1 },
  h1: { fontSize: 18, fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  meta: { color: GRIS, marginBottom: 1 },
  scoreBox: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, padding: 14, marginVertical: 14, backgroundColor: '#FFF7ED' },
  scoreSquare: { width: 70, height: 70, borderRadius: 10, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  scoreBig: { fontSize: 28, fontFamily: 'Helvetica-Bold', color: '#fff' },
  scoreUnit: { fontSize: 8, color: '#fff' },
  section: { marginTop: 14 },
  sectionTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', marginBottom: 6, color: INK, borderBottomWidth: 1.5, borderBottomColor: ORANGE, paddingBottom: 3 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: '#E5E7EB' },
  critique: { backgroundColor: '#FEF2F2', borderLeftWidth: 2, borderLeftColor: '#DC2626', borderRadius: 4, padding: 7, marginBottom: 5 },
  critiqueTitle: { color: '#B91C1C', fontFamily: 'Helvetica-Bold', marginBottom: 1 },
  planRow: { flexDirection: 'row', paddingVertical: 4, borderBottomWidth: 0.5, borderBottomColor: '#E5E7EB' },
  tag: { fontSize: 8, color: '#fff', borderRadius: 8, paddingVertical: 2, paddingHorizontal: 6, marginRight: 8, fontFamily: 'Helvetica-Bold' },
  photo: { width: '32%', marginRight: '1%', marginBottom: 8 },
  photoImg: { width: '100%', height: 90, objectFit: 'cover', borderRadius: 4 },
  photoCap: { fontSize: 7, color: GRIS, marginTop: 2 },
  pilierTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', marginTop: 10, marginBottom: 2, color: INK },
  critRow: { paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: '#F1F1F1' },
  critHead: { flexDirection: 'row', alignItems: 'flex-start' },
  noteBadge: { width: 16, height: 16, borderRadius: 3, color: '#fff', fontSize: 9, fontFamily: 'Helvetica-Bold', textAlign: 'center', marginRight: 6, paddingTop: 2 },
  critPhotos: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 3, marginLeft: 22 },
  critPhoto: { width: 64, height: 64, borderRadius: 4, marginRight: 4, marginBottom: 4, objectFit: 'cover' },
  footer: { position: 'absolute', bottom: 24, left: 36, right: 36, fontSize: 7, color: GRIS, borderTopWidth: 0.5, borderTopColor: '#E5E7EB', paddingTop: 6, textAlign: 'center' },
});

const MENTION =
  "auditresto360 est un label privé indépendant. Ce rapport est un outil de conseil. Il ne constitue ni une certification officielle, ni un agrément d'État, ni un contrôle des services vétérinaires, et ne garantit pas le résultat d'un contrôle officiel.";

function tagColor(p: string): string {
  return p === 'Urgence' ? '#DC2626' : p === 'Important' ? ORANGE : '#EAB308';
}

function noteColor(n: number | null): string {
  switch (n) {
    case 5:
      return '#16A34A';
    case 4:
      return '#22C55E';
    case 3:
      return '#EAB308';
    case 2:
      return '#F97316';
    case 1:
      return '#DC2626';
    default:
      return GRIS;
  }
}

export function Resto360Document({ data }: { data: Resto360ReportData }) {
  return (
    <Document title={`Rapport auditresto360 - ${data.etablissement}`} author="auditresto360">
      {/* Page 1 : récapitulatif */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.brand}>
            audit<Text style={s.brandO}>resto360</Text>
          </Text>
          <Text style={s.badge}>Confidentiel · {data.ref}</Text>
        </View>

        <Text style={s.h1}>{data.etablissement}</Text>
        <Text style={s.meta}>{data.ville ? `${data.ville} · ` : ''}Audit 360 du restaurant</Text>
        <Text style={s.meta}>Date : {data.date}</Text>

        <View style={s.scoreBox}>
          <View style={s.scoreSquare}>
            <Text style={s.scoreBig}>{data.scoreGlobal}</Text>
            <Text style={s.scoreUnit}>/ 100</Text>
          </View>
          <View style={{ flexGrow: 1 }}>
            <Text style={{ fontSize: 14, color: ORANGE }}>
              {'★'.repeat(data.etoiles)}
              {'☆'.repeat(5 - data.etoiles)}
            </Text>
            <Text style={{ fontFamily: 'Helvetica-Bold', marginTop: 2 }}>{data.maturite}</Text>
            <Text style={{ color: GRIS, fontSize: 9 }}>
              {data.nbCriteresNotes}/{data.nbCriteresTotal} critères évalués
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Helvetica-Bold',
                color: data.casCritiques.length ? '#DC2626' : '#16A34A',
              }}
            >
              {data.casCritiques.length}
            </Text>
            <Text style={{ color: GRIS, fontSize: 9 }}>cas critique(s)</Text>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Notation par pilier</Text>
          {data.radar.map((t) => (
            <View key={t.radar} style={s.row}>
              <Text>{t.radar}</Text>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>{t.score}/100</Text>
            </View>
          ))}
        </View>

        {data.casCritiques.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Cas critiques à traiter en priorité</Text>
            {data.casCritiques.map((c, i) => (
              <View key={i} style={s.critique}>
                <Text style={s.critiqueTitle}>
                  [{c.note}] {c.intitule} · {c.pilier}
                </Text>
                {c.commentaire ? <Text>{c.commentaire}</Text> : null}
              </View>
            ))}
          </View>
        )}

        <View style={s.section}>
          <Text style={s.sectionTitle}>Plan d'action priorisé</Text>
          {data.plan.length === 0 ? (
            <Text style={{ color: GRIS }}>Aucune action corrective requise.</Text>
          ) : (
            data.plan.map((a, i) => (
              <View key={i} style={s.planRow}>
                <Text style={{ ...s.tag, backgroundColor: tagColor(a.priorite) }}>{a.priorite}</Text>
                <View style={{ flexGrow: 1 }}>
                  <Text>{a.commentaire?.trim() || a.intitule}</Text>
                  <Text style={{ color: GRIS, fontSize: 8 }}>
                    {a.pilier} · {a.delai}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {data.quickWins.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Quick wins (à améliorer)</Text>
            {data.quickWins.map((q, i) => (
              <Text key={i} style={{ marginBottom: 2 }}>
                • {q.intitule} <Text style={{ color: GRIS }}>({q.pilier})</Text>
              </Text>
            ))}
          </View>
        )}

        <Text style={s.footer} fixed>
          {MENTION}
        </Text>
      </Page>

      {/* Page 2+ : détail par pilier, photos collées à chaque question */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionTitle}>Détail par pilier &amp; photos</Text>
        {data.details
          .filter((pil) => pil.criteres.length > 0)
          .map((pil) => (
            <View key={pil.numero} wrap={false}>
              <Text style={s.pilierTitle}>
                {pil.numero}. {pil.nom}
                {pil.score !== null ? ` — ${pil.score}/100` : ''}
              </Text>
              {pil.criteres.map((c, i) => (
                <View key={i} style={s.critRow}>
                  <View style={s.critHead}>
                    <Text style={{ ...s.noteBadge, backgroundColor: noteColor(c.note) }}>
                      {c.note ?? '-'}
                    </Text>
                    <Text style={{ flexGrow: 1 }}>
                      {c.intitule}
                      {c.commentaire ? <Text style={{ color: GRIS }}> · {c.commentaire}</Text> : null}
                    </Text>
                  </View>
                  {c.photos.length > 0 && (
                    <View style={s.critPhotos}>
                      {c.photos.map((u, j) => (
                        // eslint-disable-next-line jsx-a11y/alt-text
                        <Image key={j} src={u} style={s.critPhoto} />
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}

        {data.dirigeant.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Échanges avec le dirigeant</Text>
            {data.dirigeant.map((d, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>{d.question}</Text>
                <Text style={{ color: GRIS }}>{d.reponse}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={s.footer} fixed>
          {MENTION}
        </Text>
      </Page>
    </Document>
  );
}
