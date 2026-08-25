// Mesure la similarite reelle entre les pages generees.
//
//   node scripts/qa-similarite.mjs [nombre]
//
// Pas de MinHash ici : une signature a 64 valeurs surestime d'environ un tiers,
// et ce chiffre-la sert a decider si on publie. On calcule donc le Jaccard exact
// sur les suites de cinq mots, sur un echantillon tire dans toute la liste.
//
// Objectif : moyenne sous 0,20. Au dela, les pages racontent la meme chose avec
// un nom de ville echange, et c'est exactement ce que les moteurs ecartent.
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
register(pathToFileURL(join(process.cwd(), 'scripts', 'resolveur-ts.mjs')).href);

const { COMMUNES } = await import('../src/lib/communes.ts');
const { contenuCommune } = await import('../src/lib/contenu-commune.ts');

const TAILLE = parseInt(process.argv[2] || '60', 10);

const texte = (c) =>
  [
    c.reponse,
    c.ouverture,
    ...c.sections.flatMap((s) => [
      s.titre,
      ...s.paragraphes,
      ...(s.sous || []).flatMap((x) => [x.titre, x.texte]),
    ]),
    ...c.faq.flatMap((f) => [f.question, f.reponse]),
  ]
    .join(' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const grammes = (t, k = 5) => {
  const m = t.split(' ');
  const s = new Set();
  for (let i = 0; i + k <= m.length; i += 1) s.add(m.slice(i, i + k).join(' '));
  return s;
};

const jaccard = (a, b) => {
  let commun = 0;
  for (const g of a) if (b.has(g)) commun += 1;
  return commun / (a.size + b.size - commun);
};

/* Un echantillon reparti sur toute la liste, pas les soixante premieres : les
   grandes communes se ressemblent entre elles, les petites aussi, et ne
   comparer qu'un bout donnerait un chiffre flatteur. */
const pas = Math.max(1, Math.floor(COMMUNES.length / TAILLE));
const echantillon = COMMUNES.filter((_, i) => i % pas === 0).slice(0, TAILLE);
const sacs = echantillon.map((c) => ({ nom: c.nom, g: grammes(texte(contenuCommune(c))) }));

const paires = [];
for (let i = 0; i < sacs.length; i += 1)
  for (let j = i + 1; j < sacs.length; j += 1)
    paires.push({ a: sacs[i].nom, b: sacs[j].nom, v: jaccard(sacs[i].g, sacs[j].g) });

paires.sort((x, y) => y.v - x.v);
const moyenne = paires.reduce((a, p) => a + p.v, 0) / paires.length;
const median = paires[Math.floor(paires.length / 2)].v;

console.log(`${echantillon.length} pages · ${paires.length} paires comparees`);
console.log(`Jaccard moyen   ${moyenne.toFixed(3)}`);
console.log(`Jaccard median  ${median.toFixed(3)}`);
console.log(`Jaccard max     ${paires[0].v.toFixed(3)}  (${paires[0].a} / ${paires[0].b})`);
console.log(`au dessus de 0,30 : ${paires.filter((p) => p.v > 0.3).length} paires`);
console.log(`\nles cinq paires les plus proches :`);
for (const p of paires.slice(0, 5)) console.log(`  ${p.v.toFixed(3)}  ${p.a} / ${p.b}`);
