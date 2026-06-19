import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';

/** Données d'entrée du rapport PDF. */
export interface ReportData {
  etablissement: string;
  ville?: string;
  date: string; // déjà formatée
  auditeur: string;
  scoreGlobal: number;
  scoresParTheme: { theme: string; valeur: number }[];
  casCritiques: { theme: string; description: string }[];
  planCorrectif: { description: string; priorite: string; delaiJours?: number }[];
  prochainAudit?: string;
}

const VERT = '#10B981';
const INK = '#0C1B17';
const GRIS = '#6B7D77';

const s = StyleSheet.create({
  page: { padding: 40, fontSize: 10, color: INK, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  brand: { fontSize: 16, fontFamily: 'Helvetica-Bold' },
  brandVert: { color: VERT },
  badge: { backgroundColor: '#ECFDF5', color: '#047857', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4, fontSize: 9 },
  h1: { fontSize: 18, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  meta: { color: GRIS, marginBottom: 2 },
  scoreBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAF9', borderRadius: 8, padding: 16, marginVertical: 16 },
  scoreBig: { fontSize: 36, fontFamily: 'Helvetica-Bold' },
  section: { marginTop: 18 },
  sectionTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', marginBottom: 8, color: INK },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottomWidth: 0.5, borderBottomColor: '#E5E7EB' },
  critique: { backgroundColor: '#FEF3C7', borderRadius: 6, padding: 8, marginBottom: 6 },
  critiqueTitle: { color: '#92400E', fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  corrItem: { borderLeftWidth: 2, borderLeftColor: VERT, paddingLeft: 8, marginBottom: 6 },
  footer: { position: 'absolute', bottom: 28, left: 40, right: 40, fontSize: 8, color: GRIS, borderTopWidth: 0.5, borderTopColor: '#E5E7EB', paddingTop: 8 },
});

export function ReportDocument({ data }: { data: ReportData }) {
  return (
    <Document title={`Rapport audit hygiène — ${data.etablissement}`} author="audit hygiène">
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.brand}>
            audit <Text style={s.brandVert}>hygiène</Text>
          </Text>
          <Text style={s.badge}>Label privé</Text>
        </View>

        <Text style={s.h1}>Rapport d'audit hygiène</Text>
        <Text style={s.meta}>Établissement : {data.etablissement}{data.ville ? ` — ${data.ville}` : ''}</Text>
        <Text style={s.meta}>Date de l'audit : {data.date}</Text>
        <Text style={s.meta}>Auditeur : {data.auditeur}</Text>

        <View style={s.scoreBox}>
          <View style={{ flexGrow: 1 }}>
            <Text style={s.scoreBig}>{data.scoreGlobal}/100</Text>
            <Text style={{ color: GRIS }}>Score global</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 20, fontFamily: 'Helvetica-Bold', color: data.casCritiques.length ? '#B45309' : VERT }}>
              {data.casCritiques.length}
            </Text>
            <Text style={{ color: GRIS }}>cas critique(s)</Text>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Notation par thème</Text>
          {data.scoresParTheme.map((t) => (
            <View key={t.theme} style={s.row}>
              <Text>{t.theme}</Text>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>{t.valeur}/100</Text>
            </View>
          ))}
        </View>

        {data.casCritiques.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Cas critiques (non-conformités majeures)</Text>
            {data.casCritiques.map((c, i) => (
              <View key={i} style={s.critique}>
                <Text style={s.critiqueTitle}>{c.theme}</Text>
                <Text>{c.description}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={s.section}>
          <Text style={s.sectionTitle}>Plan correctif</Text>
          {data.planCorrectif.length === 0 ? (
            <Text style={{ color: GRIS }}>Aucune action corrective requise.</Text>
          ) : (
            data.planCorrectif.map((a, i) => (
              <View key={i} style={s.corrItem}>
                <Text>{a.description}</Text>
                <Text style={{ color: GRIS, fontSize: 9 }}>
                  Priorité : {a.priorite}{a.delaiJours ? ` · Délai conseillé : ${a.delaiJours} j` : ''}
                </Text>
              </View>
            ))
          )}
        </View>

        {data.prochainAudit && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Prochain audit recommandé</Text>
            <Text>{data.prochainAudit}</Text>
          </View>
        )}

        <Text style={s.footer} fixed>
          {MENTION_LABEL_PRIVE}
        </Text>
      </Page>
    </Document>
  );
}
