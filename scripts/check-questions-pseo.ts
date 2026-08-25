/**
 * Contrôle qualité du corpus pSEO : src/data/questions-pseo.ts
 *
 * Vérifie, pour chaque entrée :
 *  - le volume de mots (question + reponse + precisions), cible >= 700 ;
 *  - la longueur de `reponse` (60 à 120 mots) ;
 *  - le nombre de paragraphes de `precisions` (5 à 7) ;
 *  - l'unicité des slugs, la validité des rubriques et des liens internes ;
 *  - l'absence de tiret cadratin et de demi-cadratin ;
 *  - quelques garde-fous éditoriaux (montants, pourcentages, formation).
 *
 * Puis mesure la similarité de Jaccard sur les 5-grammes de mots entre toutes
 * les paires d'entrées. Seuil d'alerte : 0,40.
 *
 * Usage : node scripts/check-questions-pseo.ts
 *   (Node 24 retire les types nativement ; `npx tsx scripts/check-questions-pseo.ts`
 *    fonctionne également si les dépendances sont installées.)
 */

interface QuestionPseo {
  slug: string;
  question: string;
  reponse: string;
  precisions: string[];
  rubrique: string;
  liens?: string[];
}

const SEUIL_MOTS = 700;
const SEUIL_JACCARD = 0.4;
const N_GRAM = 5;
const REPONSE_MIN = 60;
const REPONSE_MAX = 120;
const PRECISIONS_MIN = 5;
const PRECISIONS_MAX = 7;

const RUBRIQUES_ATTENDUES = [
  'Le contrôle officiel',
  "S'auditer soi-même",
  'Les non-conformités',
  'Les preuves et documents',
  'Après le contrôle',
];

/** Répartition cible demandée au brief. */
const REPARTITION_CIBLE: Record<string, number> = {
  'Le contrôle officiel': 18,
  "S'auditer soi-même": 16,
  'Les non-conformités': 14,
  'Les preuves et documents': 12,
  'Après le contrôle': 10,
};

const LIENS_AUTORISES = new Set([
  '/methode',
  '/faq',
  '/contact',
  '/blog/allergenes-restaurant-obligations',
  '/blog/audit-avant-ouverture-restaurant-paris',
  '/blog/audit-blanc-restaurant',
  '/blog/audit-hygiene-apres-controle',
  '/blog/audit-hygiene-avant-controle',
  '/blog/audit-hygiene-franchise-reseau',
  '/blog/audit-hygiene-restaurant-ile-de-france',
  '/blog/audit-hygiene-traiteur-evenementiel-idf',
  '/blog/audit-prive-vs-controle-officiel',
  '/blog/audit-reprise-restaurant',
  '/blog/cas-critique-non-conformite-majeure',
  '/blog/chaine-du-froid-restauration',
  '/blog/checklist-controle-sanitaire',
  '/blog/comprendre-rapport-audit-hygiene',
  '/blog/traiter-son-plan-d-action-apres-un-audit',
  '/blog/controle-hygiene-hauts-de-seine',
  '/blog/controle-sanitaire-paris',
  '/blog/controle-sanitaire-restaurant',
  '/blog/controle-sanitaire-seine-saint-denis',
  '/blog/fermeture-administrative-restaurant',
  '/blog/frequence-audit-hygiene',
  '/blog/haccp-restauration-guide',
  '/blog/hygiene-dark-kitchen-ile-de-france',
  '/blog/hygiene-food-truck-marche-ile-de-france',
  '/blog/hygiene-restauration-rapide-paris',
  '/blog/nettoyage-desinfection-cuisine',
  '/blog/note-alim-confiance',
  '/blog/ouvrir-restaurant-obligations-hygiene',
  '/blog/plan-maitrise-sanitaire-pms',
  '/blog/tracabilite-dlc-restaurant',
]);

function texteComplet(q: QuestionPseo): string {
  return [q.question, q.reponse, ...q.precisions].join(' ');
}

/** Tokenisation : minuscules, ponctuation retirée, accents conservés. */
function tokens(texte: string): string[] {
  return texte
    .toLowerCase()
    .replace(/[.,;:!?()«»"'’–—/]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function compterMots(texte: string): number {
  return tokens(texte).length;
}

function nGrams(texte: string, n: number): Set<string> {
  const mots = tokens(texte);
  const set = new Set<string>();
  for (let i = 0; i + n <= mots.length; i += 1) set.add(mots.slice(i, i + n).join(' '));
  return set;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const item of a) if (b.has(item)) inter += 1;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

function mediane(valeurs: number[]): number {
  const tri = [...valeurs].sort((x, y) => x - y);
  const mid = Math.floor(tri.length / 2);
  return tri.length % 2 === 0 ? (tri[mid - 1] + tri[mid]) / 2 : tri[mid];
}

async function main(): Promise<void> {
  const cible = new URL('../src/data/questions-pseo.ts', import.meta.url).href;
  const mod: { QUESTIONS_PSEO: QuestionPseo[] } = await import(cible);
  const corpus = mod.QUESTIONS_PSEO;

  const erreurs: string[] = [];
  const avertissements: string[] = [];

  // 1. Slugs
  const vus = new Map<string, number>();
  corpus.forEach((q, i) => {
    if (vus.has(q.slug)) erreurs.push(`Slug dupliqué : ${q.slug} (index ${vus.get(q.slug)} et ${i})`);
    vus.set(q.slug, i);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(q.slug)) erreurs.push(`Slug non kebab-case ASCII : ${q.slug}`);
  });

  // 2. Rubriques
  const parRubrique = new Map<string, number>();
  for (const r of RUBRIQUES_ATTENDUES) parRubrique.set(r, 0);
  for (const q of corpus) {
    if (!RUBRIQUES_ATTENDUES.includes(q.rubrique)) {
      erreurs.push(`Rubrique inconnue sur ${q.slug} : ${q.rubrique}`);
      continue;
    }
    parRubrique.set(q.rubrique, (parRubrique.get(q.rubrique) ?? 0) + 1);
  }
  for (const [r, attendu] of Object.entries(REPARTITION_CIBLE)) {
    const reel = parRubrique.get(r) ?? 0;
    if (reel !== attendu) erreurs.push(`Répartition : ${r} = ${reel}, attendu ${attendu}`);
  }

  // 3. Volume, structure, caractères et garde-fous
  const compteurs: Array<{ slug: string; mots: number; reponse: number; paras: number }> = [];
  for (const q of corpus) {
    const mots = compterMots(texteComplet(q));
    const motsReponse = compterMots(q.reponse);
    compteurs.push({ slug: q.slug, mots, reponse: motsReponse, paras: q.precisions.length });

    if (mots < SEUIL_MOTS) erreurs.push(`Volume insuffisant : ${q.slug} = ${mots} mots`);
    if (motsReponse < REPONSE_MIN || motsReponse > REPONSE_MAX) {
      erreurs.push(`Réponse hors gabarit : ${q.slug} = ${motsReponse} mots (${REPONSE_MIN} à ${REPONSE_MAX})`);
    }
    if (q.precisions.length < PRECISIONS_MIN || q.precisions.length > PRECISIONS_MAX) {
      erreurs.push(`Paragraphes hors gabarit : ${q.slug} = ${q.precisions.length}`);
    }
    for (const p of q.precisions) {
      if (compterMots(p) < 60) avertissements.push(`Paragraphe court (${compterMots(p)} mots) dans ${q.slug}`);
    }

    const brut = [q.question, q.reponse, ...q.precisions].join(' ');
    if (brut.includes('—')) erreurs.push(`Tiret cadratin dans ${q.slug}`);
    if (brut.includes('–')) erreurs.push(`Demi-cadratin dans ${q.slug}`);
    if (/\d[\d\s]*(€|euros)/i.test(brut)) erreurs.push(`Montant en euros dans ${q.slug}`);
    if (/\d+\s?%/.test(brut)) erreurs.push(`Pourcentage dans ${q.slug}`);
    if (/\b14\s?(heures|h)\b/i.test(brut)) erreurs.push(`Renvoi aux 14 heures de formation dans ${q.slug}`);

    for (const lien of q.liens ?? []) {
      if (!LIENS_AUTORISES.has(lien)) erreurs.push(`Lien interne inconnu dans ${q.slug} : ${lien}`);
    }
  }

  const volumes = compteurs.map((c) => c.mots);

  // 4. Jaccard sur 5-grammes, toutes paires
  const grammes = corpus.map((q) => nGrams(texteComplet(q), N_GRAM));
  const paires: Array<{ a: string; b: string; sim: number }> = [];
  for (let i = 0; i < grammes.length; i += 1) {
    for (let j = i + 1; j < grammes.length; j += 1) {
      const sim = jaccard(grammes[i], grammes[j]);
      paires.push({ a: corpus[i].slug, b: corpus[j].slug, sim });
      if (sim >= SEUIL_JACCARD) {
        erreurs.push(`Similarité ${sim.toFixed(3)} entre ${corpus[i].slug} et ${corpus[j].slug}`);
      }
    }
  }
  paires.sort((x, y) => y.sim - x.sim);

  // 5. Rapport
  console.log('=== Corpus pSEO audithygiene ===');
  console.log(`Entrées : ${corpus.length}`);

  console.log('\n--- Répartition par rubrique ---');
  for (const [rubrique, n] of parRubrique) {
    console.log(`${String(n).padStart(3)}  ${rubrique}  (cible ${REPARTITION_CIBLE[rubrique]})`);
  }

  console.log('\n--- Volume : mots de question + reponse + precisions ---');
  console.log(`Minimum : ${Math.min(...volumes)}`);
  console.log(`Médiane : ${mediane(volumes)}`);
  console.log(`Maximum : ${Math.max(...volumes)}`);
  console.log(`Moyenne : ${Math.round(volumes.reduce((a, b) => a + b, 0) / volumes.length)}`);
  console.log(`Total   : ${volumes.reduce((a, b) => a + b, 0)}`);
  console.log(`Sous ${SEUIL_MOTS} mots : ${volumes.filter((v) => v < SEUIL_MOTS).length}`);
  console.log('5 entrées les plus courtes :');
  for (const c of [...compteurs].sort((a, b) => a.mots - b.mots).slice(0, 5)) {
    console.log(`  ${c.mots} mots  ${c.slug}`);
  }

  console.log(`\n--- Jaccard, ${N_GRAM}-grammes, toutes paires ---`);
  console.log(`Paires comparées : ${paires.length}`);
  console.log(`Maximum : ${paires[0].sim.toFixed(4)}  (${paires[0].a} / ${paires[0].b})`);
  console.log(`Médiane : ${mediane(paires.map((p) => p.sim)).toFixed(4)}`);
  console.log(`Paires >= ${SEUIL_JACCARD} : ${paires.filter((p) => p.sim >= SEUIL_JACCARD).length}`);
  console.log('10 paires les plus proches :');
  for (const p of paires.slice(0, 10)) console.log(`  ${p.sim.toFixed(4)}  ${p.a} / ${p.b}`);

  if (avertissements.length > 0) {
    console.log('\n--- Avertissements ---');
    for (const a of avertissements) console.log(`  ! ${a}`);
  }

  if (erreurs.length > 0) {
    console.log('\n--- ERREURS ---');
    for (const e of erreurs) console.log(`  x ${e}`);
    console.log(`\nÉCHEC : ${erreurs.length} erreur(s).`);
    process.exit(1);
  }

  console.log('\nOK : toutes les contraintes sont respectées.');
}

main();
