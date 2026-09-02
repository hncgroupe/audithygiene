/**
 * Verifie que next.config.mjs et src/lib/fusion-questions.ts declarent bien la
 * meme liste de pages absorbees.
 *
 * Les deux listes sont dupliquees parce qu'un next.config.mjs ne peut pas
 * importer un module TypeScript. Une divergence produirait soit une page
 * generee que rien ne redirige, soit une redirection vers le vide.
 */
import fs from 'node:fs';

const extraire = (texte, debut) => {
  const i = texte.indexOf(debut);
  if (i < 0) return null;
  const bloc = texte.slice(i, texte.indexOf('];', i));
  return [...bloc.matchAll(/'([a-z0-9-]{6,})'/g)].map((m) => m[1]).sort();
};

const config = extraire(fs.readFileSync('next.config.mjs', 'utf8'), 'const AUTO_AUDIT_ABSORBEES');
const source = extraire(fs.readFileSync('src/lib/fusion-questions.ts', 'utf8'), 'export const ABSORBEES');

if (!config || !source) {
  console.error('check-fusion : liste introuvable dans l un des deux fichiers.');
  process.exit(1);
}
const manquantes = source.filter((s) => !config.includes(s));
const surnumeraires = config.filter((s) => !source.includes(s));
if (manquantes.length || surnumeraires.length) {
  console.error('check-fusion : les deux listes divergent.');
  if (manquantes.length) console.error('  absentes de next.config.mjs :', manquantes.join(', '));
  if (surnumeraires.length) console.error('  absentes de fusion-questions.ts :', surnumeraires.join(', '));
  process.exit(1);
}
console.log(`check-fusion : ${config.length} redirections, les deux listes concordent.`);
