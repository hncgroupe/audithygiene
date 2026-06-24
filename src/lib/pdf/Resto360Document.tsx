import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

interface CritereD {
  intitule: string;
  note: number | null;
  commentaire: string | null;
  photos: string[];
}
interface PilierD {
  code: string;
  numero: number;
  nom: string;
  radar: string;
  score: number | null;
  groupes: { nom: string; criteres: CritereD[] }[];
  risques: CritereD[];
  forts: CritereD[];
}

/** Données d'entrée du rapport PDF auditresto360 (miroir du rapport de l'app). */
export interface Resto360ReportData {
  etablissement: string;
  ville?: string;
  type?: string;
  date: string;
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
  logo?: string | null;
  piliers: PilierD[];
  restitution: {
    synthese: string;
    pointsForts: string[];
    axes: string[];
    roadmap: { j30: string[]; j60: string[]; j90: string[] };
    gains: string;
    risques: string;
  } | null;
}

const ORANGE = '#F97316';
const INK = '#0C1B17';
const GRIS = '#6B7D77';

const s = StyleSheet.create({
  page: { padding: 36, fontSize: 10, color: INK, fontFamily: 'Helvetica', lineHeight: 1.4 },
  cover: { backgroundColor: INK, color: '#fff', margin: -36, padding: 40, minHeight: 760, justifyContent: 'space-between' },
  coverTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  brand: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#fff' },
  brandO: { color: ORANGE },
  clientLogo: { maxWidth: 120, height: 40, objectFit: 'contain', marginBottom: 6, backgroundColor: '#fff', borderRadius: 4, padding: 3 },
  coverKicker: { color: ORANGE, fontSize: 10, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1 },
  coverTitle: { fontSize: 30, fontFamily: 'Helvetica-Bold', color: '#fff', marginTop: 6 },
  coverSub: { color: '#FFFFFFB0', marginTop: 4 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', marginTop: 24 },
  scoreSquare: { width: 96, height: 96, borderRadius: 14, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center', marginRight: 20 },
  scoreBig: { fontSize: 38, fontFamily: 'Helvetica-Bold', color: '#fff' },
  scoreUnit: { fontSize: 9, color: '#fff' },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 0.5, borderTopColor: '#FFFFFF30', paddingTop: 14, marginTop: 8 },
  metaItem: { width: '25%' },
  metaLabel: { color: '#FFFFFF70', fontSize: 8 },
  metaVal: { color: '#fff', fontSize: 10 },

  sectionTitle: { fontSize: 13, fontFamily: 'Helvetica-Bold', marginBottom: 8, color: INK, borderBottomWidth: 1.5, borderBottomColor: ORANGE, paddingBottom: 3 },
  section: { marginTop: 16 },
  para: { color: '#1f2d28', marginTop: 4 },

  critiqueBox: { backgroundColor: '#FEF2F2', borderRadius: 6, padding: 10, marginTop: 8 },
  critiqueLine: { backgroundColor: '#fff', borderLeftWidth: 2, borderLeftColor: '#DC2626', borderRadius: 3, padding: 6, marginBottom: 4 },
  critiqueTitle: { color: '#B91C1C', fontFamily: 'Helvetica-Bold' },

  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  barLabel: { width: 96, fontSize: 9 },
  barTrack: { flexGrow: 1, height: 6, backgroundColor: '#EAEAEA', borderRadius: 3 },
  barFill: { height: 6, borderRadius: 3, backgroundColor: ORANGE },
  barVal: { width: 30, textAlign: 'right', fontFamily: 'Helvetica-Bold', fontSize: 9 },

  pilierTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', marginTop: 12, color: INK },
  twoCol: { flexDirection: 'row', marginTop: 4 },
  boxRisk: { flexGrow: 1, backgroundColor: '#FEF2F2', borderRadius: 5, padding: 6, marginRight: 4 },
  boxFort: { flexGrow: 1, backgroundColor: '#F0FDF4', borderRadius: 5, padding: 6 },
  boxTitleR: { color: '#B91C1C', fontFamily: 'Helvetica-Bold', fontSize: 8, textTransform: 'uppercase' },
  boxTitleF: { color: '#15803D', fontFamily: 'Helvetica-Bold', fontSize: 8, textTransform: 'uppercase' },
  groupLabel: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: GRIS, textTransform: 'uppercase', marginTop: 6 },
  critRow: { paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: '#F1F1F1' },
  critHead: { flexDirection: 'row', alignItems: 'flex-start' },
  noteBadge: { width: 16, height: 16, borderRadius: 3, color: '#fff', fontSize: 9, fontFamily: 'Helvetica-Bold', textAlign: 'center', marginRight: 6, paddingTop: 2 },
  critPhotos: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 3, marginLeft: 22 },
  critPhoto: { width: 64, height: 64, borderRadius: 4, marginRight: 4, marginBottom: 4, objectFit: 'cover' },

  planRow: { flexDirection: 'row', paddingVertical: 4, borderBottomWidth: 0.5, borderBottomColor: '#E5E7EB' },
  tag: { fontSize: 8, color: '#fff', borderRadius: 8, paddingVertical: 2, paddingHorizontal: 6, marginRight: 8, fontFamily: 'Helvetica-Bold' },
  road: { flexDirection: 'row', marginTop: 6 },
  roadCol: { flexGrow: 1, width: '33%', paddingRight: 6 },
  roadTitle: { fontFamily: 'Helvetica-Bold', color: ORANGE, fontSize: 9 },

  footer: { position: 'absolute', bottom: 22, left: 36, right: 36, fontSize: 7, color: GRIS, borderTopWidth: 0.5, borderTopColor: '#E5E7EB', paddingTop: 6, textAlign: 'center' },
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

function CritereLigne({ c }: { c: CritereD }) {
  return (
    <View style={s.critRow} wrap={false}>
      <View style={s.critHead}>
        <Text style={{ ...s.noteBadge, backgroundColor: noteColor(c.note) }}>{c.note ?? '-'}</Text>
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
  );
}

export function Resto360Document({ data }: { data: Resto360ReportData }) {
  const resti = data.restitution;
  return (
    <Document title={`Rapport auditresto360 - ${data.etablissement}`} author="auditresto360">
      {/* PAGE 1 : Couverture + cas critiques + synthèse */}
      <Page size="A4" style={s.page}>
        <View style={s.cover}>
          <View style={s.coverTop}>
            <Text style={s.brand}>
              audit<Text style={s.brandO}>resto360</Text>
            </Text>
            <View style={{ alignItems: 'flex-end' }}>
              {data.logo ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image src={data.logo} style={s.clientLogo} />
              ) : null}
              <Text style={{ color: '#FFFFFF70', fontSize: 8 }}>Confidentiel · {data.ref}</Text>
            </View>
          </View>

          <View>
            <Text style={s.coverKicker}>Rapport d&apos;audit 360</Text>
            <Text style={s.coverTitle}>{data.etablissement}</Text>
            <Text style={s.coverSub}>{data.ville ?? ''}</Text>

            <View style={s.scoreRow}>
              <View style={s.scoreSquare}>
                <Text style={s.scoreBig}>{data.scoreGlobal}</Text>
                <Text style={s.scoreUnit}>/ 100</Text>
              </View>
              <View>
                <Text style={{ color: ORANGE, fontSize: 16 }}>
                  {'★'.repeat(data.etoiles)}
                  {'☆'.repeat(5 - data.etoiles)}
                </Text>
                <Text style={{ color: '#fff', fontFamily: 'Helvetica-Bold', marginTop: 3 }}>{data.maturite}</Text>
                <Text style={{ color: '#FFFFFF90', fontSize: 9 }}>
                  {data.nbCriteresNotes}/{data.nbCriteresTotal} critères évalués · {data.casCritiques.length} cas critique(s)
                </Text>
              </View>
            </View>
          </View>

          <View style={s.metaGrid}>
            <View style={s.metaItem}>
              <Text style={s.metaLabel}>Date</Text>
              <Text style={s.metaVal}>{data.date}</Text>
            </View>
            <View style={s.metaItem}>
              <Text style={s.metaLabel}>Référence</Text>
              <Text style={s.metaVal}>{data.ref}</Text>
            </View>
            <View style={s.metaItem}>
              <Text style={s.metaLabel}>Auditeur</Text>
              <Text style={s.metaVal}>auditresto360</Text>
            </View>
            <View style={s.metaItem}>
              <Text style={s.metaLabel}>Type</Text>
              <Text style={s.metaVal}>{data.type ?? 'Restaurant'}</Text>
            </View>
          </View>
        </View>

        {data.casCritiques.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Cas critiques à traiter en priorité</Text>
            <Text style={{ color: GRIS, fontSize: 8 }}>
              Points sanitaires ou réglementaires notés 1 ou 2. Ils pèsent doublement et abaissent le score global.
            </Text>
            <View style={s.critiqueBox}>
              {data.casCritiques.map((c, i) => (
                <View key={i} style={s.critiqueLine}>
                  <Text style={s.critiqueTitle}>
                    [{c.note}] {c.intitule} · {c.pilier}
                  </Text>
                  {c.commentaire ? <Text>{c.commentaire}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={s.section}>
          <Text style={s.sectionTitle}>Synthèse exécutive</Text>
          {data.radar.map((t) => (
            <View key={t.radar} style={s.barRow}>
              <Text style={s.barLabel}>{t.radar}</Text>
              <View style={s.barTrack}>
                <View style={{ ...s.barFill, width: `${t.score}%` }} />
              </View>
              <Text style={s.barVal}>{t.score}</Text>
            </View>
          ))}
          {resti?.synthese ? <Text style={s.para}>{resti.synthese}</Text> : null}
        </View>

        <Text style={s.footer} fixed>
          {MENTION}
        </Text>
      </Page>

      {/* PAGE 2+ : Résultats détaillés par pilier (avec photos par question) */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionTitle}>Résultats détaillés par pilier</Text>
        {data.piliers.map((p) => (
          <View key={p.code} wrap={false}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <Text style={s.pilierTitle}>
                {p.numero}. {p.nom}
              </Text>
              <Text style={{ color: ORANGE, fontFamily: 'Helvetica-Bold' }}>{p.score ?? '--'}/100</Text>
            </View>
            <View style={s.barTrack}>
              <View style={{ ...s.barFill, width: `${p.score ?? 0}%` }} />
            </View>

            {(p.risques.length > 0 || p.forts.length > 0) && (
              <View style={s.twoCol}>
                {p.risques.length > 0 && (
                  <View style={s.boxRisk}>
                    <Text style={s.boxTitleR}>Risques</Text>
                    {p.risques.map((c, i) => (
                      <Text key={i} style={{ fontSize: 8 }}>
                        • {c.intitule}
                        {c.commentaire ? ` : ${c.commentaire}` : ''}
                      </Text>
                    ))}
                  </View>
                )}
                {p.forts.length > 0 && (
                  <View style={s.boxFort}>
                    <Text style={s.boxTitleF}>Points forts</Text>
                    {p.forts.slice(0, 6).map((c, i) => (
                      <Text key={i} style={{ fontSize: 8 }}>
                        • {c.intitule}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            )}

            {p.groupes.map((g) => (
              <View key={g.nom}>
                <Text style={s.groupLabel}>{g.nom}</Text>
                {g.criteres.map((c, i) => (
                  <CritereLigne key={i} c={c} />
                ))}
              </View>
            ))}
          </View>
        ))}
        <Text style={s.footer} fixed>
          {MENTION}
        </Text>
      </Page>

      {/* PAGE 3+ : Recommandations + plan d'action + quick wins + dirigeant */}
      <Page size="A4" style={s.page}>
        {resti && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Synthèse et recommandations</Text>
            {resti.pointsForts.length > 0 && (
              <View style={{ marginTop: 4 }}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>Points forts</Text>
                {resti.pointsForts.map((x, i) => (
                  <Text key={i}>• {x}</Text>
                ))}
              </View>
            )}
            {resti.axes.length > 0 && (
              <View style={{ marginTop: 6 }}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>Axes d&apos;amélioration</Text>
                {resti.axes.map((x, i) => (
                  <Text key={i}>• {x}</Text>
                ))}
              </View>
            )}
            <View style={s.road}>
              <View style={s.roadCol}>
                <Text style={s.roadTitle}>30 jours</Text>
                {resti.roadmap.j30.map((x, i) => (
                  <Text key={i} style={{ fontSize: 9 }}>
                    • {x}
                  </Text>
                ))}
              </View>
              <View style={s.roadCol}>
                <Text style={s.roadTitle}>60 jours</Text>
                {resti.roadmap.j60.map((x, i) => (
                  <Text key={i} style={{ fontSize: 9 }}>
                    • {x}
                  </Text>
                ))}
              </View>
              <View style={s.roadCol}>
                <Text style={s.roadTitle}>90 jours</Text>
                {resti.roadmap.j90.map((x, i) => (
                  <Text key={i} style={{ fontSize: 9 }}>
                    • {x}
                  </Text>
                ))}
              </View>
            </View>
            {resti.gains ? (
              <Text style={s.para}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>Gains potentiels : </Text>
                {resti.gains}
              </Text>
            ) : null}
            {resti.risques ? (
              <Text style={s.para}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>Risques : </Text>
                {resti.risques}
              </Text>
            ) : null}
          </View>
        )}

        <View style={s.section}>
          <Text style={s.sectionTitle}>Plan d&apos;action priorisé</Text>
          {data.plan.length === 0 ? (
            <Text style={{ color: GRIS }}>Aucune action corrective requise.</Text>
          ) : (
            data.plan.map((a, i) => (
              <View key={i} style={s.planRow} wrap={false}>
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
              <Text key={i}>
                • {q.intitule} <Text style={{ color: GRIS }}>({q.pilier})</Text>
              </Text>
            ))}
          </View>
        )}

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
