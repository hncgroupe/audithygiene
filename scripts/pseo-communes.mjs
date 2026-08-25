// Complete le jeu de communes d'Ile-de-France.
//
//   node scripts/pseo-communes.mjs [--seuil 0]
//
// Le jeu herite de hygiene14 s'arretait a 1 500 habitants : 620 communes sur
// les 1 268 de la region. Le cabinet se deplace partout en Ile-de-France, donc
// la couverture doit suivre. On descend le seuil et on complete, sans jamais
// retoucher une commune deja relevee.
//
// Deux sources publiques, sans cle :
//   geo.api.gouv.fr                    communes, population, code postal, centre
//   recherche-entreprises.api.gouv.fr  etablissements ouverts par activite, SIRENE
//
// Une commune n'est publiable que si elle porte au moins deux activites
// renseignees : en dessous, la page n'aurait rien qui lui appartienne, et un
// village a un seul commerce vaut mieux absent que mince.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const args = process.argv.slice(2);
const valeur = (n, d) => {
  const i = args.indexOf(n);
  return i === -1 ? d : args[i + 1];
};
const SEUIL = parseInt(valeur('--seuil', '0'), 10);
const DEPS = valeur('--dep', '75,77,78,91,92,93,94,95').split(',');
const FICHIER = join(process.cwd(), 'src', 'data', 'communes-idf.json');
const DEBIT = 5;

const ACTIVITES = [
  { naf: '56.10A', cle: 'restaurants' },
  { naf: '56.10C', cle: 'rapide' },
  { naf: '56.30Z', cle: 'bars' },
  { naf: '10.71C', cle: 'boulangeries' },
  { naf: '47.22Z', cle: 'boucheries' },
  { naf: '56.21Z', cle: 'traiteurs' },
  { naf: '56.10B', cle: 'cafeterias' },
  { naf: '56.29B', cle: 'autresRestauration' },
  { naf: '56.29A', cle: 'collectiveSousContrat' },
  { naf: '47.24Z', cle: 'detailPain' },
];

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

async function json(url, essais = 4) {
  for (let i = 1; i <= essais; i += 1) {
    try {
      const r = await fetch(url, {
        headers: { 'user-agent': 'audithygiene.fr pSEO (contact@audithygiene.fr)' },
      });
      if (r.status === 429 || r.status >= 500) throw new Error(`HTTP ${r.status}`);
      if (!r.ok) return null;
      return await r.json();
    } catch {
      if (i === essais) return null;
      await pause(900 * i);
    }
  }
  return null;
}

function distance(a, b) {
  const R = 6371;
  const rad = (x) => (x * Math.PI) / 180;
  const dLat = rad(b[1] - a[1]);
  const dLon = rad(b[0] - a[0]);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[1])) * Math.cos(rad(b[1])) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

mkdirSync(dirname(FICHIER), { recursive: true });
const dejaLa = existsSync(FICHIER) ? JSON.parse(readFileSync(FICHIER, 'utf8')) : { communes: {} };

/* Une commune enregistree sans aucun chiffre est une collecte ratee : on la
   remet dans la file plutot que de la garder vide. */
const connues = new Map(
  Object.entries(dejaLa.communes || {}).filter(([, v]) =>
    Object.values(v.chiffres || {}).some((n) => n > 0)
  )
);
console.log(`${connues.size} communes deja relevees`);

const communes = [];
for (const d of DEPS) {
  const r = await json(
    `https://geo.api.gouv.fr/departements/${d}/communes?fields=nom,code,population,codesPostaux,centre,codeDepartement`
  );
  if (r) communes.push(...r);
  else console.error(`departement ${d} : liste indisponible`);
}

const retenues = communes
  .filter((c) => (c.population || 0) >= SEUIL)
  .sort((a, b) => (b.population || 0) - (a.population || 0));
console.log(
  `${communes.length} communes en Ile-de-France, ${retenues.length} au dessus de ${SEUIL} habitants`
);

const sauver = () =>
  writeFileSync(FICHIER, JSON.stringify({ communes: Object.fromEntries(connues) }, null, 1), 'utf8');

let faits = 0;
const debut = Date.now();
const aFaire = retenues.filter((c) => !connues.has(c.code));
console.log(`${aFaire.length} communes a relever`);

for (const c of aFaire) {
  const chiffres = {};
  let manque = false;
  for (const a of ACTIVITES) {
    const r = await json(
      'https://recherche-entreprises.api.gouv.fr/search' +
        `?activite_principale=${a.naf}&code_commune=${c.code}&etat_administratif=A&per_page=1`
    );
    if (r && typeof r.total_results === 'number') chiffres[a.cle] = r.total_results;
    else manque = true;
    await pause(1000 / DEBIT);
  }
  /* Un releve partiel donnerait un total faux, donc une phrase fausse sur la
     page. On repasse a la prochaine execution. */
  if (manque) {
    console.log(`  ${c.nom} : reponse incomplete, reprise a la prochaine passe`);
    continue;
  }
  connues.set(c.code, {
    code: c.code,
    nom: c.nom,
    population: c.population || 0,
    departement: c.codeDepartement,
    codesPostaux: c.codesPostaux || [],
    centre: c.centre ? c.centre.coordinates : null,
    chiffres,
  });
  faits += 1;
  if (faits % 20 === 0) {
    const parMinute = faits / ((Date.now() - debut) / 60000);
    console.log(`${faits} relevees · ${Math.round(parMinute)}/min · reste ${aFaire.length - faits}`);
    sauver();
  }
}

const liste = [...connues.values()];
for (const v of liste) {
  v.voisines = liste
    .filter((x) => x.code !== v.code && x.centre && v.centre)
    .map((x) => ({ code: x.code, nom: x.nom, km: distance(v.centre, x.centre) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 6);
  v.total = Object.values(v.chiffres).reduce((a, b) => a + b, 0);
  v.publiable = Object.values(v.chiffres).filter((n) => n > 0).length >= 2;
}
sauver();

const publiables = liste.filter((v) => v.publiable).length;
console.log(
  `\n${liste.length} communes, ${publiables} publiables, ${liste.length - publiables} ecartees faute de donnees`
);
