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
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
 *   ou, si le site porte déjà l'autre convention du groupe,
 *   GOOGLE_SERVICE_ACCOUNT_B64 (la clé JSON entière, encodée)
 *
 * Signature JWT par `node:crypto`, sans dépendance ajoutée : le projet n'a que
 * Prisma, Zod et Next, et une brique de sauvegarde ne mérite pas d'alourdir
 * l'arbre de dépendances.
 */

const TOKEN_URI = 'https://oauth2.googleapis.com/token';
const SHEETS = 'https://sheets.googleapis.com/v4/spreadsheets';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

/** Colonnes communes à tous les sites du groupe. */
// Grille commune au classeur « LEADS - TOUS PROJETS ». Tous les projets du
// groupe ecrivent ces memes 12 colonnes, dans cet ordre, chacun dans son onglet.
// Changer l'ordre ici sans mettre a jour l'onglet decale toutes les colonnes.
export const ENTETES = [
  'Date', 'Projet', 'Source', 'Nom', 'Societe', 'Email',
  'Telephone', 'Message', 'Details', 'Consentement', 'Statut', 'ID',
];

/** Un jeton vaut une heure ; le garder évite un aller-retour OAuth par lead. */
let cache: { valeur: string; expire: number } | null = null;

function b64(valeur: string | Buffer): string {
  return Buffer.from(valeur).toString('base64url');
}

interface Identite {
  compte: string;
  cle: string;
  /** D'où vient cette identité, pour le journal. Jamais la clé, seulement le nom des variables. */
  origine: string;
}

/**
 * Le dernier compte de service réellement utilisé. Sert à écrire l'email exact
 * dans le message d'erreur d'un 403 : c'est ce compte-là, et pas un autre, qui
 * doit apparaître en Éditeur sur le classeur.
 */
let compteUtilise: string | null = null;

/** Le journal ne doit pas répéter la même ligne à chaque lead. */
let identiteJournalisee = false;

function journaliser(identite: Identite): Identite {
  compteUtilise = identite.compte;
  if (!identiteJournalisee) {
    identiteJournalisee = true;
    // Uniquement l'email du compte de service. La clé privée ne sort jamais d'ici.
    console.info(`[classeur] compte de service : ${identite.compte} (source : ${identite.origine})`);
  }
  return identite;
}

/**
 * L'identité du compte de service, quelle que soit la forme sous laquelle elle
 * a été posée.
 *
 * Deux conventions coexistent dans le groupe : deux variables séparées, ou la
 * clé JSON entière encodée en base64. Accepter les deux évite de reposer une
 * variable là où l'autre existe déjà, et évite surtout qu'un site reste muet
 * parce qu'il portait la bonne clé sous le mauvais nom.
 *
 * Le repli d'une convention vers l'autre est ce qui a masqué un 403 pendant des
 * semaines : GOOGLE_SERVICE_ACCOUNT_EMAIL était posé, sa clé privée non, et le
 * code retombait en silence sur le compte de service du Drive, jamais partagé
 * sur le classeur. On dit donc systématiquement QUEL compte est utilisé et
 * POURQUOI, pour qu'un prochain 403 se lise en une ligne de journal.
 */
function compteDeService(): Identite | null {
  const compte = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const cleBrute = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  // La clé arrive parfois avec des \n littéraux, selon l'interface qui l'a posée.
  if (compte && cleBrute) {
    return journaliser({
      compte,
      cle: cleBrute.trim().replace(/\\n/g, '\n'),
      origine: 'GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY',
    });
  }

  const raison = compte
    ? 'GOOGLE_SERVICE_ACCOUNT_EMAIL est posé mais GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY manque (un email seul ne signe rien)'
    : cleBrute
      ? 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY est posée mais GOOGLE_SERVICE_ACCOUNT_EMAIL manque'
      : 'ni GOOGLE_SERVICE_ACCOUNT_EMAIL ni GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ne sont posés';

  const encodee = process.env.GOOGLE_SERVICE_ACCOUNT_B64;
  if (!encodee) {
    console.error(
      `[classeur] aucun compte de service exploitable : ${raison}, et GOOGLE_SERVICE_ACCOUNT_B64 est absent.`,
    );
    return null;
  }
  try {
    const json = JSON.parse(Buffer.from(encodee, 'base64').toString('utf8')) as {
      client_email?: string;
      private_key?: string;
    };
    if (!json.client_email || !json.private_key) {
      console.error('[classeur] GOOGLE_SERVICE_ACCOUNT_B64 décodé mais sans client_email ou private_key.');
      return null;
    }
    if (compte && json.client_email !== compte) {
      /* Le cas exact du bug : la variable qui nomme le compte attendu existe,
         mais c'est un autre compte qui va signer. Le dire fort. */
      console.warn(
        `[classeur] REPLI de compte de service : attendu ${compte} (GOOGLE_SERVICE_ACCOUNT_EMAIL), ` +
          `utilisé ${json.client_email} (GOOGLE_SERVICE_ACCOUNT_B64). Raison : ${raison}. ` +
          'Le classeur doit être partagé en Éditeur avec le compte réellement utilisé.',
      );
    }
    return journaliser({
      compte: json.client_email,
      cle: json.private_key.replace(/\\n/g, '\n'),
      origine: `GOOGLE_SERVICE_ACCOUNT_B64 (repli, raison : ${raison})`,
    });
  } catch (cause) {
    console.error('[classeur] GOOGLE_SERVICE_ACCOUNT_B64 illisible (base64 ou JSON invalide)', cause);
    return null;
  }
}

/**
 * Ce qu'il faut lire quand Google répond 403. Le partage du classeur est une
 * action humaine : le message doit donner l'email exact à coller, sinon le
 * lecteur du journal repart chercher lequel des deux comptes était en cause.
 */
function messagePermissionRefusee(classeur: string): string {
  const email = compteUtilise ?? '(compte de service inconnu)';
  return (
    `[classeur] 403 PERMISSION_DENIED sur le classeur ${classeur}. ` +
    `Le compte de service utilisé est ${email}. ` +
    `Correctif humain : ouvrir le classeur dans Google Sheets, Partager, ajouter ${email} ` +
    'avec le rôle Éditeur (sans notification), puis relancer. ' +
    'Aucune variable d\'environnement ne remplace ce partage.'
  );
}

async function jeton(): Promise<string> {
  const maintenant = Math.floor(Date.now() / 1000);
  if (cache && cache.expire > maintenant + 60) return cache.valeur;

  const identite = compteDeService();
  if (!identite) throw new Error('compte de service Google absent');
  const { compte, cle } = identite;

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
    if (/already exists/i.test(texte)) return;
    if (ajout.status === 403) throw new Error(`${messagePermissionRefusee(classeur)} ${texte.slice(0, 200)}`);
    throw new Error(`addSheet ${ajout.status}: ${texte.slice(0, 200)}`);
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
      const detail = (await res.text()).slice(0, 200);
      if (res.status === 403) {
        console.error(messagePermissionRefusee(classeur), detail);
      } else {
        console.error(`[classeur] ${onglet} ${res.status}`, detail);
      }
      return false;
    }
    return true;
  } catch (cause) {
    console.error('[classeur] echec', cause);
    return false;
  }
}
