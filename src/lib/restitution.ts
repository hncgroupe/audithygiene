/**
 * Génération de la restitution IA d'un audit auditresto360.
 * À partir des notes, commentaires et réponses du dirigeant, un modèle Claude
 * rédige une restitution de consultant senior : synthèse, points forts, axes,
 * feuille de route 30/60/90 jours, gains potentiels, risques.
 *
 * Clé Anthropic directe (ANTHROPIC_API_KEY). Aucune donnée inventée n'est demandée :
 * le modèle s'appuie uniquement sur les constats fournis.
 */
import { env } from './env';
import { calculerRapportResto360, type ItemNote } from './rapport-resto360';

export interface RestitutionIA {
  synthese: string;
  pointsForts: string[];
  axes: string[];
  roadmap: { j30: string[]; j60: string[]; j90: string[] };
  gains: string;
  risques: string;
  genereLe: string;
  modele: string;
}

const SYSTEM = `Tu es un consultant senior en restauration (exploitation, hygiène, rentabilité, organisation, expérience client). Tu rédiges la restitution d'un audit 360 réalisé sous le label privé "auditresto360". Tu t'appuies STRICTEMENT sur les constats fournis (notes de 1 à 5, commentaires de l'auditeur, réponses du dirigeant). Tu n'inventes aucun chiffre ni aucun fait non fourni. Ton clair, concret, orienté action, lisible par un restaurateur non technique. Pas de jargon inutile. Aucun tiret cadratin ni demi-cadratin (proscrits) : remplace par virgule, deux-points ou parenthèses. auditresto360 est un label privé indépendant : ne le présente jamais comme une certification officielle et ne garantis aucun résultat à un contrôle.`;

function construirePrompt(etablissement: string, items: ItemNote[]): string {
  const r = calculerRapportResto360(items);
  const radar = r.radar.map((p) => `${p.radar}: ${p.score}/100`).join(', ');
  const fmt = (lignes: typeof r.urgences) =>
    lignes
      .map((l) => `- [${l.note}/5] ${l.pilier} > ${l.intitule}${l.commentaire ? ` (note auditeur: ${l.commentaire})` : ''}`)
      .join('\n') || '(aucun)';
  const dirigeant = r.dirigeant
    .filter((d) => d.reponse)
    .map((d) => `- ${d.question} : ${d.reponse}`)
    .join('\n') || '(non renseigné)';

  return `Restaurant audité : ${etablissement}
Score global : ${r.scoreGlobal ?? 'n/d'}/100 (${r.nbCriteresNotes}/${r.nbCriteresTotal} critères notés)
Scores par pilier : ${radar}

Critères en urgence (notes 1 et 2) :
${fmt(r.urgences)}

Critères à améliorer (note 3) :
${fmt(r.quickWins)}

Échanges avec le dirigeant :
${dirigeant}

Rédige la restitution. Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ou après, sans balise de code, au format exact :
{
  "synthese": "3 à 5 phrases de synthèse générale, ton consultant senior",
  "pointsForts": ["point fort concret", "..."],
  "axes": ["axe d'amélioration prioritaire", "..."],
  "roadmap": { "j30": ["action à 30 jours", "..."], "j60": ["action à 60 jours"], "j90": ["action à 90 jours"] },
  "gains": "estimation qualitative des gains potentiels (rentabilité, organisation, conformité) si les axes sont traités, sans inventer de chiffre précis",
  "risques": "risques concrets encourus si les non-conformités et urgences ne sont pas corrigées"
}`;
}

function extraireJson(texte: string): unknown {
  const sansFence = texte.replace(/```json\s*/gi, '').replace(/```/g, '').trim();
  const debut = sansFence.indexOf('{');
  const fin = sansFence.lastIndexOf('}');
  if (debut === -1 || fin === -1) throw new Error('Réponse IA sans JSON.');
  return JSON.parse(sansFence.slice(debut, fin + 1));
}

export async function genererRestitution(etablissement: string, items: ItemNote[]): Promise<RestitutionIA> {
  if (!env.anthropicApiKey) throw new Error('IA non configurée (ANTHROPIC_API_KEY absente).');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': env.anthropicApiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: env.anthropicModel,
      max_tokens: 2000,
      system: SYSTEM,
      messages: [{ role: 'user', content: construirePrompt(etablissement, items) }],
    }),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Appel IA échoué (${res.status}). ${txt.slice(0, 200)}`);
  }

  const data = (await res.json()) as { content?: { type: string; text?: string }[] };
  const texte = (data.content ?? []).filter((b) => b.type === 'text').map((b) => b.text ?? '').join('\n');
  const parsed = extraireJson(texte) as Partial<RestitutionIA>;

  return {
    synthese: typeof parsed.synthese === 'string' ? parsed.synthese : '',
    pointsForts: Array.isArray(parsed.pointsForts) ? parsed.pointsForts.map(String) : [],
    axes: Array.isArray(parsed.axes) ? parsed.axes.map(String) : [],
    roadmap: {
      j30: Array.isArray(parsed.roadmap?.j30) ? parsed.roadmap!.j30.map(String) : [],
      j60: Array.isArray(parsed.roadmap?.j60) ? parsed.roadmap!.j60.map(String) : [],
      j90: Array.isArray(parsed.roadmap?.j90) ? parsed.roadmap!.j90.map(String) : [],
    },
    gains: typeof parsed.gains === 'string' ? parsed.gains : '',
    risques: typeof parsed.risques === 'string' ? parsed.risques : '',
    genereLe: new Date().toISOString(),
    modele: env.anthropicModel,
  };
}
