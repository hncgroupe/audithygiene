import { createSign } from 'node:crypto';

/**
 * Classeur « AUDIT HYGIENE - WORKFLOW » : la copie qu'un humain relit.
 *
 * Telegram et l'email disent qu'un lead est arrivé. Ni l'un ni l'autre ne
 * permet de compter ceux du mois, de filtrer par source, ou de voir qu'il en
 * manque. Une ligne de tableur, si. C'est le dispositif en service sur ALUR 42
 * et HelloJet, posé ici à l'identique.
 *
 * Trois variables, toutes facultatives : sans elles la fonction sort en
 * silence et rien d'autre ne change.
 *
 *   GOOGLE_SHEET_BACKUP_ID
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
 *
 * Signature JWT par `node:crypto`, sans dépendance ajoutée : le projet n'a que
 * Prisma, Zod et Next, et une brique de sauvegarde ne mérite pas d'alourdir
 * l'arbre de dépendances.
 */

const TOKEN_URI = 'https://oauth2.googleapis.com/token';
const SHEETS = 'https://sheets.googleapis.com/v4/spreadsheets';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

/** Colonnes communes à tous les sites du groupe. */
export const ENTETES = [
  'Horodatage', 'Source', 'Nom', 'Email', 'Telephone', 'Societe',
  'Sujet', 'Message', 'Montant', 'Statut', 'Demande complete (JSON)',
];

/** Un jeton vaut une heure ; le garder évite un aller-retour OAuth par lead. */
let cache: { valeur: string; expire: number } | null = null;

function b64(valeur: string | Buffer): string {
  return Buffer.from(valeur).toString('base64url');
}

async function jeton(): Promise<string> {
  const maintenant = Math.floor(Date.now() / 1000);
  if (cache && cache.expire > maintenant + 60) return cache.valeur;

  const compte = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const cleBrute = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!compte || !cleBrute) throw new Error('compte de service Google absent');

  // La clé arrive parfois avec des \n littéraux, selon l'interface qui l'a posée.
  const cle = cleBrute.trim().replace(/\\n/g, '\n');
  const entete = b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const corps = b64(
    JSON.stringify({ iss: compte, scope: SCOPE, aud: TOKEN_URI, iat: maintenant, exp: maintenant + 3600 }),
  );
  const signeur = createSign('RSA-SHA256');
  signeur.update(`${entete}.${corps}`);
  const assertion = `${entete}.${corps}.${signeur.sign(cle).toString('base64url')}`;

  const res = await fetch(TOKEN_URI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  });
  if (!res.ok) throw new Error(`token ${res.status}: ${(await res.text()).slice(0, 200)}`);

  const donnees = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!donnees.access_token) throw new Error('token sans access_token');
  cache = { valeur: donnees.access_token, expire: maintenant + (donnees.expires_in ?? 3600) };
  return donnees.access_token;
}

/**
 * La demande entière, prête pour une cellule. Sheets refuse au-delà de 50 000
 * caractères, et refuse alors la ligne entière : on coupe avant, en le disant.
 */
export function celluleJson(valeur: unknown): string {
  let texte: string;
  try {
    texte = JSON.stringify(valeur) ?? '';
  } catch {
    return '';
  }
  return texte.length > 45000 ? `${texte.slice(0, 45000)}… [tronque]` : texte;
}

async function creerOnglet(acces: string, classeur: string, onglet: string): Promise<void> {
  const entetes = { Authorization: `Bearer ${acces}`, 'Content-Type': 'application/json' };
  const ajout = await fetch(`${SHEETS}/${classeur}:batchUpdate`, {
    method: 'POST',
    headers: entetes,
    body: JSON.stringify({
      requests: [{ addSheet: { properties: { title: onglet, gridProperties: { frozenRowCount: 1 } } } }],
    }),
  });
  if (!ajout.ok) {
    const texte = await ajout.text();
    // Deux leads simultanés peuvent créer l'onglet en même temps ; le second
    // échoue sur un nom déjà pris, ce qui n'est pas une erreur.
    if (!/already exists/i.test(texte)) throw new Error(`addSheet ${ajout.status}: ${texte.slice(0, 200)}`);
    return;
  }
  await fetch(`${SHEETS}/${classeur}/values/${encodeURIComponent(`${onglet}!A1`)}?valueInputOption=RAW`, {
    method: 'PUT',
    headers: entetes,
    body: JSON.stringify({ values: [ENTETES] }),
  });
}

/**
 * Ajoute une ligne. Ne lève jamais : le classeur est un filet, il ne doit pas
 * faire échouer un lead. Renvoie `false` quand rien n'a été écrit, pour que
 * l'appelant sache s'il lui reste une copie durable.
 */
export async function ajouterAuClasseur(onglet: string, valeurs: (string | number)[]): Promise<boolean> {
  const classeur = process.env.GOOGLE_SHEET_BACKUP_ID;
  if (!classeur) return false;

  try {
    const acces = await jeton();
    /* RAW, et pas USER_ENTERED : le contenu vient d'un formulaire public, et un
       message commençant par « = » deviendrait une formule dans le classeur de
       celui qui l'ouvre. */
    const cible =
      `${SHEETS}/${classeur}/values/${encodeURIComponent(`${onglet}!A1`)}` +
      `:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
    const entetes = { Authorization: `Bearer ${acces}`, 'Content-Type': 'application/json' };
    const corps = JSON.stringify({ values: [valeurs] });

    let res = await fetch(cible, { method: 'POST', headers: entetes, body: corps });
    if (res.status === 400) {
      // 400 sur une plage : l'onglet n'existe pas encore.
      await creerOnglet(acces, classeur, onglet);
      res = await fetch(cible, { method: 'POST', headers: entetes, body: corps });
    }
    if (!res.ok) {
      console.error(`[classeur] ${onglet} ${res.status}`, (await res.text()).slice(0, 200));
      return false;
    }
    return true;
  } catch (cause) {
    console.error('[classeur] echec', cause);
    return false;
  }
}
