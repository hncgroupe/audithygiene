// Barriere de qualite : le build echoue si une famille de pages faiblit.
//
//   node scripts/check-qualite.mjs
//
// Pourquoi une barriere plutot qu'un rapport : un rapport se lit quand on y
// pense, une barriere arrete le train. Neuf cents pages se degradent d'un coup
// quand un gabarit change, et personne ne relit neuf cents pages. Le controle
// tourne donc sur le rendu reel, apres le build, et refuse de laisser passer ce
// qu'aucun de nous ne voudrait publier.
//
// Ce qu'il verifie, famille par famille :
//   - un plancher de signes et de mots, mesure du h1 a la fin du main ;
//   - une balise h1 et une seule ;
//   - au moins un bloc de donnees structurees ;
//   - assez de liens internes pour que la page ne soit pas un cul-de-sac ;
//   - aucune valeur non rendue, du type [object Object], NaN ou TODO.
//
// Les seuils ne sont pas des objectifs de remplissage. Sous ce plancher, une
// page a rarement dit quelque chose que personne d'autre ne dit, et c'est
// exactement ce que les moteurs reprochent aux pages generees.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, sep } from 'node:path';

const RACINE = join(process.cwd(), '.next', 'server', 'app');

if (!existsSync(RACINE)) {
  console.log('Aucun rendu a controler : lancer ce script apres le build.');
  process.exit(0);
}

/** Plancher par famille : signes de contenu, mots, et pages tolerees dessous. */
const REGLES = {
  dossiers: { signes: 9000, mots: 1500, tolerance: 0 },
  activites: { signes: 6000, mots: 950, tolerance: 0 },
  communes: { signes: 4000, mots: 650, tolerance: 0 },
  points: { signes: 3500, mots: 550, tolerance: 0 },
  themes: { signes: 3500, mots: 550, tolerance: 0 },
  questions: { signes: 3000, mots: 500, tolerance: 0 },
  departements: { signes: 2500, mots: 400, tolerance: 0 },
  blog: { signes: 2000, mots: 350, tolerance: 0 },
  /* Mentions legales, contact, connexion : elles ne visent aucune requete et
     n'ont pas vocation a etre longues. */
  fixes: { signes: 0, mots: 0, tolerance: Infinity },
};

/* Les pages de l'application interne ne sont pas du contenu public. */
const PRIVEES = /^(app|login|api|preview-rapport)\b/;

function famille(relatif) {
  if (relatif.startsWith('blog/')) return 'blog';
  if (relatif.startsWith('dossiers/')) return 'dossiers';
  if (relatif.startsWith('audit-hygiene/')) return 'activites';
  if (relatif.startsWith('questions/')) return 'questions';
  if (relatif.startsWith('points-de-controle/')) return 'points';
  if (relatif.startsWith('themes/')) return 'themes';
  if (relatif.startsWith('zones/')) {
    /* zones/val-de-marne.html est un departement, zones/val-de-marne/creteil-94000.html
       est une commune : c'est la profondeur qui tranche, pas le nom. */
    return relatif.split('/').length > 2 ? 'communes' : 'departements';
  }
  return 'fixes';
}

const VALEURS_NON_RENDUES = /\[object Object\]|\bNaN\b|\bInfinity\b|\bundefined\b|TODO|À compléter/;

function analyser(fichier) {
  const html = readFileSync(fichier, 'utf8');
  const debut = html.indexOf('<h1');
  const fin = html.lastIndexOf('</main>');
  const corps = debut > 0 && fin > debut ? html.slice(debut, fin) : html;
  const texte = corps
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return {
    signes: texte.length,
    mots: texte.split(' ').filter(Boolean).length,
    h1: (html.match(/<h1/g) || []).length,
    balisage: (html.match(/application\/ld\+json/g) || []).length,
    liens: (corps.match(/<a /g) || []).length,
    sale: VALEURS_NON_RENDUES.test(texte),
  };
}

const pages = [];
(function parcourir(dossier) {
  for (const entree of readdirSync(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) {
      parcourir(chemin);
      continue;
    }
    if (!entree.name.endsWith('.html')) continue;
    const relatif = chemin.replace(RACINE + sep, '').split(sep).join('/');
    if (PRIVEES.test(relatif)) continue;
    pages.push({ relatif, famille: famille(relatif), ...analyser(chemin) });
  }
})(RACINE);

const fautes = [];
const parFamille = new Map();
for (const p of pages) {
  if (!parFamille.has(p.famille)) parFamille.set(p.famille, []);
  parFamille.get(p.famille).push(p);
}

const mediane = (liste) => {
  const t = liste.slice().sort((a, b) => a - b);
  return t[Math.floor(t.length / 2)] || 0;
};

for (const [nom, liste] of [...parFamille].sort((a, b) => b[1].length - a[1].length)) {
  const regle = REGLES[nom] || { signes: 2000, mots: 350, tolerance: 0 };
  const maigres = liste.filter((p) => p.signes < regle.signes || p.mots < regle.mots);
  console.log(
    `${nom.padEnd(14)} ${String(liste.length).padStart(5)} pages · mediane ${String(
      mediane(liste.map((p) => p.signes))
    ).padStart(6)} signes, ${String(mediane(liste.map((p) => p.mots))).padStart(
      5
    )} mots · plancher ${regle.signes}/${regle.mots}`
  );
  if (maigres.length > regle.tolerance) {
    fautes.push(
      `${nom} : ${maigres.length} page(s) sous le plancher, dont ${maigres
        .slice(0, 3)
        .map((p) => `${p.relatif} (${p.signes} signes, ${p.mots} mots)`)
        .join(', ')}`
    );
  }
}

const publiques = pages.filter((p) => p.famille !== 'fixes');
const sansBalisage = publiques.filter((p) => p.balisage === 0);
const h1Faux = publiques.filter((p) => p.h1 !== 1);
const culsDeSac = publiques.filter((p) => p.liens < 5);
const sales = pages.filter((p) => p.sale);

if (sansBalisage.length)
  fautes.push(
    `${sansBalisage.length} page(s) sans donnees structurees, dont ${sansBalisage[0].relatif}`
  );
if (h1Faux.length) fautes.push(`${h1Faux.length} page(s) sans h1 unique, dont ${h1Faux[0].relatif}`);
if (culsDeSac.length)
  fautes.push(
    `${culsDeSac.length} page(s) avec moins de cinq liens internes, dont ${culsDeSac[0].relatif}`
  );
if (sales.length)
  fautes.push(
    `${sales.length} page(s) affichant une valeur non rendue, dont ${sales
      .slice(0, 3)
      .map((p) => p.relatif)
      .join(', ')}`
  );

if (fautes.length) {
  console.error("\nLa qualite des pages n'est pas au niveau attendu :");
  for (const f of fautes) console.error('  ' + f);
  console.error('\nCorriger le gabarit concerne, pas le seuil.');
  process.exit(1);
}

console.log(`\n${pages.length} pages controlees. Chaque famille tient son plancher.`);
