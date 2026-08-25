/**
 * Barriere de conformite editoriale du corpus audithygiene.fr.
 *
 *   node scripts/check-corpus.mjs
 *
 * Pourquoi ce script existe
 * -------------------------
 * docs/BRIEF-REDACTION.md ouvre sur une phrase qui justifie tout le reste :
 * chaque regle vient d'une erreur deja commise ou d'un risque juridique reel.
 * Une regle qui ne vit que dans un document se perd des que quelqu'un ecrit
 * vite, et le corpus fait plusieurs milliers de lignes reparties sur des
 * fichiers que personne ne relit en entier. Le brief demande une relecture
 * avant de rendre ; ce script est cette relecture, mais elle ne depend plus de
 * la fatigue du relecteur.
 *
 * Pourquoi une barriere et pas un rapport : une page fautive ne se voit pas.
 * Un prix oublie, une reference abrogee ou un chemin mort ne cassent aucun
 * build, ne declenchent aucune erreur TypeScript, et se publient sur des
 * centaines de pages generees d'un seul coup. Le seul moment ou l'erreur coute
 * peu, c'est avant la publication. Le script sort donc en code 1.
 *
 * Deux niveaux, et c'est deliberе :
 *   FAUTE : la regle est violee, il n'y a pas de lecture innocente. Sortie 1.
 *   DOUTE : le motif est reconnu mais le contexte peut l'excuser. Affiche,
 *           jamais bloquant. Un controle qui crie a tort finit desactive, et
 *           un controle desactive ne protege plus rien.
 *
 * Ce qui est lu : les fichiers .ts de src/data et src/lib. Les controles de
 * fond ne portent que sur le contenu des chaines de caracteres, parce que
 * seules les chaines sont publiees ; un commentaire de code ne se lit sur
 * aucune page. Seul le controle des tirets balaie le fichier entier, parce que
 * le brief dit « nulle part » et qu'une regle de ponctuation qui souffre des
 * exceptions ne tient pas trois semaines.
 *
 * Les lots en cours de redaction (src/data/dossiers/lot-*.ts,
 * src/data/activites-pseo.ts) sont controles s'ils existent et ignores sinon.
 * Un controle qui echoue parce qu'un fichier n'est pas encore ecrit apprend
 * surtout a l'equipe a le contourner.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const RACINE = process.cwd();
const SOURCES = ['src/data', 'src/lib'];

/* Les familles en cours d'ecriture. Leur absence est normale, elle se signale
   sans jamais peser sur le code de sortie. */
const ATTENDUS_OPTIONNELS = ['src/data/activites-pseo.ts', 'src/data/dossiers'];

const constats = [];
const vus = new Set();
/* Deux regles peuvent mordre sur la meme phrase, et une phrase peut revenir
   dans plusieurs gabarits. Un rapport qui repete la meme ligne se lit mal et
   fait croire a un corpus plus atteint qu'il ne l'est. */
const ajouter = (gravite, regle, fichier, ligne, extrait, note) => {
  const cle = `${gravite}|${regle}|${fichier}|${ligne}`;
  if (vus.has(cle)) return;
  vus.add(cle);
  constats.push({ gravite, regle, fichier, ligne, extrait, note });
};

/* ------------------------------------------------------------------ *
 * Lecture des sources
 * ------------------------------------------------------------------ */

function fichiersTs(dossier) {
  const abs = join(RACINE, dossier);
  if (!existsSync(abs)) return [];
  const sortie = [];
  for (const entree of readdirSync(abs)) {
    const chemin = join(abs, entree);
    if (statSync(chemin).isDirectory()) sortie.push(...fichiersTs(join(dossier, entree)));
    else if (entree.endsWith('.ts') || entree.endsWith('.tsx')) sortie.push(join(dossier, entree));
  }
  return sortie;
}

/**
 * Extraction des chaines de caracteres, avec leur ligne de depart.
 *
 * Pourquoi un vrai petit automate plutot qu'une expression reguliere : le
 * corpus contient des litteraux d'expression reguliere qui portent des
 * apostrophes, par exemple le slugifieur de src/lib/familles.ts. Une regex
 * naive y entre en mode chaine et decale tout le reste du fichier. Un fichier
 * mal decoupe rend le controle muet, ce qui est pire qu'absent : il rassure.
 *
 * Les interpolations ${...} sont remplacees par un jeton. Elles portent du
 * code, pas de la copie, et un chiffre calcule a l'execution n'est pas un
 * chiffre ecrit par un redacteur.
 */
function chaines(source) {
  const out = [];
  let i = 0;
  let ligne = 1;
  let precedent = '';
  const n = source.length;

  const regexPossible = () => /[(,=:[!&|?{};+\-*%<>~^]$|^$|\b(return|typeof|case|in|of)$/.test(precedent);

  while (i < n) {
    const c = source[i];

    if (c === '\n') { ligne++; i++; continue; }

    if (c === '/' && source[i + 1] === '/') {
      while (i < n && source[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && source[i + 1] === '*') {
      i += 2;
      while (i < n && !(source[i] === '*' && source[i + 1] === '/')) { if (source[i] === '\n') ligne++; i++; }
      i += 2;
      continue;
    }
    if (c === '/' && regexPossible()) {
      i++;
      let classe = false;
      while (i < n) {
        if (source[i] === '\\') { i += 2; continue; }
        if (source[i] === '[') classe = true;
        else if (source[i] === ']') classe = false;
        else if (source[i] === '/' && !classe) { i++; break; }
        else if (source[i] === '\n') break;
        i++;
      }
      precedent = '/';
      continue;
    }

    if (c === "'" || c === '"' || c === '`') {
      const debut = ligne;
      const fin = c;
      let texte = '';
      i++;
      while (i < n) {
        const d = source[i];
        if (d === '\\') { texte += source[i + 1] === 'n' ? ' ' : source[i + 1]; i += 2; continue; }
        if (d === fin) { i++; break; }
        if (d === '\n') { ligne++; texte += ' '; i++; continue; }
        if (fin === '`' && d === '$' && source[i + 1] === '{') {
          let profondeur = 1;
          i += 2;
          while (i < n && profondeur > 0) {
            if (source[i] === '{') profondeur++;
            else if (source[i] === '}') profondeur--;
            else if (source[i] === '\n') ligne++;
            i++;
          }
          texte += ' § ';
          continue;
        }
        texte += d;
        i++;
      }
      out.push({ ligne: debut, texte });
      precedent = 'x';
      continue;
    }

    if (!/\s/.test(c)) precedent = (precedent + c).slice(-8);
    i++;
  }
  return out;
}

/** Les phrases d'une chaine. Beaucoup de regles se jugent a l'echelle de la
    phrase : une promesse niee et une promesse tenue portent les memes mots, et
    seule la negation voisine les distingue. */
const phrases = (texte) => texte.split(/(?<=[.!?:;])\s+/).filter(Boolean);

const NEGATIONS = /\b(ne|n'|aucune?|aucun|sans|jamais|ni|pas|rien|non|hors|exclu|interdit|impossible|nullement)\b/i;

/**
 * src/lib ne contient pas que de la copie. Les gabarits d'e-mail, les messages
 * Telegram, les feuilles de style des PDF et les chemins d'API y vivent aussi.
 * Les passer aux regles de redaction produirait un rapport ou la vraie faute se
 * noie dans quarante balises fermantes, et un rapport illisible ne se lit pas.
 * On ecarte donc ce qui n'est manifestement pas une phrase publiee.
 */
const TECHNIQUE = /<\/?[a-z][a-z0-9]*[\s/>]|style\s*=|[a-z-]+\s*:\s*[^ ]*(px|rem|%|#[0-9a-f]{3})\s*;|^https?:|^[A-Z][A-Z0-9_]+$/i;

/** Une statistique vit toujours dans une phrase. Un « 25% » seul est une
    largeur de colonne, pas une affirmation sur le parc francilien. */
const estProse = (texte) => texte.trim().split(/\s+/).length >= 6;

const extrait = (texte, motif) => {
  const m = texte.match(motif);
  if (!m) return texte.slice(0, 160);
  const d = Math.max(0, m.index - 70);
  return (d > 0 ? '...' : '') + texte.slice(d, m.index + m[0].length + 70).trim() + '...';
};

/* ------------------------------------------------------------------ *
 * L'univers des chemins reellement servis
 * ------------------------------------------------------------------ */

/* Le brief le dit : un lien mort coute plus qu'un lien manquant. La liste des
   chemins n'est donc pas recopiee ici, elle est reconstruite depuis le routeur
   et depuis les fichiers qui portent les slugs. Une liste recopiee se desynchronise
   le jour ou une famille bouge, et c'est precisement ce jour-la que le controle
   devrait parler. */

const slugifier = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/['’]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function routes() {
  const fixes = new Set();
  const dynamiques = [];
  const racine = join(RACINE, 'src', 'app');
  if (!existsSync(racine)) return { fixes, dynamiques, connu: false };

  const parcourir = (dossier, segments) => {
    for (const entree of readdirSync(dossier)) {
      const chemin = join(dossier, entree);
      if (statSync(chemin).isDirectory()) {
        /* (marketing) et (app) sont des groupes de route : ils organisent les
           fichiers sans apparaitre dans l'URL. */
        parcourir(chemin, entree.startsWith('(') ? segments : [...segments, entree]);
      } else if (/^(page|opengraph-image|twitter-image|icon|apple-icon|sitemap|robots)\.(tsx?|jsx?)$/.test(entree)) {
        /* Next.js sert aussi les images sociales et le sitemap comme des
           routes. Les ignorer ferait passer /opengraph-image pour un lien mort
           alors que le fichier qui la produit est juste a cote. */
        const feuille = entree.replace(/\.\w+$/, '');
        const chemins = feuille === 'page' ? segments : [...segments, feuille];
        const chemin_url = '/' + chemins.join('/');
        if (chemins.some((s) => s.startsWith('['))) dynamiques.push(chemins);
        else fixes.add(chemins.length ? chemin_url : '/');
      }
    }
  };
  parcourir(racine, []);
  return { fixes, dynamiques, connu: true };
}

function slugsDepuis(fichier, motif, groupe = 1) {
  const abs = join(RACINE, fichier);
  if (!existsSync(abs)) return null;
  const texte = readFileSync(abs, 'utf8');
  const out = new Set();
  let m;
  while ((m = motif.exec(texte))) out.add(m[groupe]);
  return out;
}

const UNIVERS = (() => {
  const { fixes, connu } = routes();

  const intitules = slugsDepuis('src/lib/grille-audit.ts', /\bintitule:\s*'([^']+)'/g);
  const themes = slugsDepuis('src/lib/grille-audit.ts', /\btheme:\s*'([^']+)'/g);
  const questions = slugsDepuis('src/data/questions-pseo.ts', /\bslug:\s*"([^"]+)"/g);

  const blogDir = join(RACINE, 'src', 'content', 'blog');
  const blog = existsSync(blogDir)
    ? new Set(
        readdirSync(blogDir)
          .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts')
          .map((f) => f.replace(/\.ts$/, ''))
      )
    : null;

  const noms = slugsDepuis('src/lib/communes.ts', /'\d{2}':\s*(['"])(.+?)\1,?\s*$/gm, 2);
  const departements = noms ? new Set([...noms].map(slugifier)) : null;

  return {
    connu,
    fixes,
    points: intitules ? new Set([...intitules].map(slugifier)) : null,
    themes: themes ? new Set([...themes].map(slugifier)) : null,
    questions,
    blog,
    departements,
  };
})();

/** Un fichier de public/ est servi tel quel : ce n'est pas une page, mais ce
    n'est pas un lien mort non plus. On le reconnait sur le disque plutot que
    sur son nom, pour que la suppression d'un logo se voie. */
const PUBLIC = join(RACINE, 'public');
const estAsset = (url) => {
  if (!existsSync(PUBLIC)) return false;
  const base = join(PUBLIC, url.slice(1).split('/').join(sep));
  if (existsSync(base)) return true;
  return ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.ico', '.pdf', '.avif'].some((e) => existsSync(base + e));
};

/**
 * Verdict sur un chemin cite.
 *
 * Les pages de commune ne sont pas verifiees au slug pres : elles naissent d'un
 * releve SIRENE qui evolue, et un controle qui liste six cents communes en
 * memoire dirait surtout que le releve a change. Le departement, lui, est fige
 * a huit valeurs et se verifie.
 */
function chemin_valide(url) {
  if (!UNIVERS.connu) return { ok: true };
  const propre = url.replace(/[.,;:!?)]+$/, '');
  if (UNIVERS.fixes.has(propre)) return { ok: true };

  const seg = propre.split('/').filter(Boolean);
  const enfant = (famille, jeu, quoi) => {
    if (seg.length !== 2 || seg[0] !== famille) return null;
    if (!jeu) return { ok: true };
    return jeu.has(seg[1]) ? { ok: true } : { ok: false, raison: `slug absent de ${quoi}` };
  };

  return (
    enfant('points-de-controle', UNIVERS.points, 'src/lib/grille-audit.ts') ||
    enfant('themes', UNIVERS.themes, 'src/lib/grille-audit.ts') ||
    enfant('questions', UNIVERS.questions, 'src/data/questions-pseo.ts') ||
    enfant('blog', UNIVERS.blog, 'src/content/blog') ||
    (seg[0] === 'zones' && seg.length === 3
      ? UNIVERS.departements && !UNIVERS.departements.has(seg[1])
        ? { ok: false, raison: 'departement inconnu' }
        : { ok: true }
      : null) ||
    (seg[0] === 'zones' && seg.length === 2
      ? UNIVERS.departements && !UNIVERS.departements.has(seg[1])
        ? { ok: false, raison: 'departement inconnu' }
        : { ok: true }
      : null) || { ok: false, raison: 'aucune page ne sert ce chemin' }
  );
}

/* ------------------------------------------------------------------ *
 * Le registre des textes reglementaires
 * ------------------------------------------------------------------ */

/* Pourquoi un registre plutot qu'une confiance au redacteur : une reference
   fausse ne se voit pas a la relecture, elle se voit devant l'agent. Le brief
   est net, un exploitant qui invoque une regle qui n'existe pas perd sa
   credibilite sur le reste de la visite. On verifie donc que le numero cite
   porte bien la date qui lui appartient, et pas une date voisine. */
const REGISTRE = {
  '178/2002': '28 janvier 2002',
  '852/2004': '29 avril 2004',
  '853/2004': '29 avril 2004',
  '1935/2004': '27 octobre 2004',
  '931/2011': '19 septembre 2011',
  '1169/2011': '25 octobre 2011',
  '2017/625': '15 mars 2017',
  '2021/382': '3 mars 2021',
};

/* Textes remplaces. Citer le texte abroge sans nommer son successeur, c'est
   dater la page et donner prise a la contestation. */
const REMPLACES = [
  {
    abroge: /arrêté du 5 octobre 2011/i,
    successeur: /12 février 2024/i,
    note: "arrêté du 5 octobre 2011, remplacé par l'arrêté du 12 février 2024",
  },
];

/* Le piege que le brief nomme explicitement : les seuils de l'annexe IV de
   l'arrete du 21 decembre 2009 ne visent que la restauration collective. Les
   servir a un restaurant en remise directe, c'est lui faire croire a une
   obligation qui ne le concerne pas. */
const ANNEXE_IV = /annexe\s+IV/i;
const COLLECTIVE = /restauration collective/i;

const SEUILS_COLLECTIFS = /(\+?\s*63\s*°C[^.]{0,60}\+?\s*10\s*°C|\+?\s*10\s*°C[^.]{0,60}\+?\s*63\s*°C|remise en température)/i;
const TON_OBLIGATOIRE = /\b(impose|imposé|imposée|obligation|obligatoire|exige|exigé|doit|doivent|réglementaire|prévu par|fixé par|fixe)\b/i;
const TON_PRUDENT = /\b(cible courante|référence professionnelle|bonne pratique|usage professionnel|non imposé|n'est pas imposé|plan de maîtrise sanitaire|restauration collective|à titre de repère|repère)\b/i;

/* ------------------------------------------------------------------ *
 * Les controles
 * ------------------------------------------------------------------ */

/** Le texte du fichier autour d'une chaine, pour juger une mention en contexte. */
function autour(source, texte, rayon) {
  const i = source.indexOf(texte.slice(0, 60));
  if (i === -1) return texte;
  return source.slice(Math.max(0, i - rayon), i + texte.length + rayon);
}

const REGLES_CHAINE = [
  {
    /* Le cabinet ne publie pas de prix : les formules sont encore TODO dans
       src/lib/constants.ts. Afficher un montant que personne n'a valide, c'est
       s'engager sur une grille tarifaire qu'il faudra ensuite tenir ou
       desavouer devant un client qui l'a lue. */
    nom: 'prix et montants (à recouper avec audit-config.ts)',
    gravite: 'DOUTE',
    motif: /(\d[\d   ]*\s*(€|euros?\b))|(?<!\/)\btarifs?\b|\bhonoraires\b|\bsupplément\b[^.]{0,30}\b(appliqué|urgence|tarifaire)\b/i,
  },
  {
    /* La duree d'audit est hors perimetre au meme titre que le prix : elle
       varie avec l'etablissement, et une duree annoncee devient une promesse
       que l'auditeur devra tenir montre en main. */
    nom: "durée d'audit chiffrée (à recouper avec content.ts)",
    gravite: 'DOUTE',
    motif: /\b(audit|visite|intervention|contre-visite)\b[^.]{0,80}\b(dure|durent|prend|prennent|occupe|occupent|se déroule|s'étale)\b[^.]{0,50}\b(demi-journée|demi-heure|heures?|minutes?|jours?|\d)/i,
  },
  {
    nom: "durée d'audit chiffrée (à recouper avec content.ts)",
    gravite: 'DOUTE',
    motif: /\b(demi-journée|environ\s+\d+\s*(h\b|heures?)|compter\s+\d+\s*(h\b|heures?))\b[^.]{0,80}\b(visite|audit|établissements?|intervention)\b|\b(visite|audit|intervention)\b[^.]{0,50}\b(demi-journée|environ\s+\d+\s*(h\b|heures?))\b/i,
  },
  {
    /* Ces chiffres n'existent pas publiquement par commune ni par activite.
       Les inventer, meme de bonne foi, produit une statistique invérifiable qui
       se retournera au premier lecteur qui la cherchera. */
    nom: 'statistique de contrôle ou sanction chiffrée',
    gravite: 'FAUTE',
    prose: true,
    motif: /\b\d+([.,]\d+)?\s*%|\b(un|une|deux|trois|\d+)\s+(restaurants?|établissements?|cuisines?)\s+sur\s+(deux|trois|quatre|cinq|dix|cent|\d+)\b|\bun contrôle tous les\b|\b(amendes?|sanctions?|pénalités?)\b[^.]{0,40}\d|\bjusqu'à\s+\d[\d   ]*\s*(€|euros)/i,
  },
  {
    /* « la plupart des etablissements » n'est pas un chiffre, mais c'est une
       generalisation sur un parc que personne n'a mesure. Elle merite un
       regard, pas un arret de chaine. */
    nom: 'généralisation sur le parc',
    gravite: 'DOUTE',
    motif: /\b(la plupart|la majorité|la moitié|en moyenne)\s+(des|du)\s+(restaurants?|établissements?|contrôles?|exploitants?)\b/i,
  },
  {
    /* L'issue d'un controle appartient aux services de l'Etat. Le brief est
       explicite : promettre l'inverse est un engagement intenable et se
       retourne au premier controle. La phrase n'est retenue que si elle ne
       porte aucune negation, parce que le corpus dit surtout l'inverse et qu'il
       a raison de le dire. */
    nom: "promesse sur l'issue d'un contrôle",
    gravite: 'FAUTE',
    parPhrase: true,
    /* « garantie » tout court ne prouve rien : un materiau offre une garantie
       sanitaire sans engager personne devant la DDPP. Seule la promesse
       adressee au client compte, et elle se reconnait a son objet. */
    motif: /\bgarantie? (de |d')?(résultat|conformité|réussite|succès)|\bgaranti(t|ssons)? (le|la|votre|un|une) (résultat|succès|conformité|passage|réussite)|\bgaranti(e|s|es)? conforme|conformité garantie|\bvous (passerez|réussirez|serez conforme)\b|100\s*% conforme|zéro non-conformité|réussite (assurée|garantie)/i,
    sauf: NEGATIONS,
  },
  {
    /* audit hygiene est un label prive independant. « Certifie » et « agree »
       designent des actes que seuls un organisme accredite ou l'Etat peuvent
       poser : se les attribuer est une allegation trompeuse au sens du code de
       la consommation, pas une maladresse de style. */
    nom: 'certification ou agrément revendiqué par le cabinet',
    gravite: 'FAUTE',
    parPhrase: true,
    motif: /\b(nous sommes|nous serions|le cabinet est|notre cabinet est|nous restons|nous avons été)\b[^.]{0,60}\b(certifiés?|certifiées?|agréés?|agréées?|accrédités?|accréditées?|habilités?)\b|\bnos (certifications?|agréments?|accréditations?)\b|\bcabinet (certifié|agréé|accrédité)\b/i,
    sauf: NEGATIONS,
  },
  {
    /* Meme sans sujet explicite, ces mots meritent un regard : ils sont
       legitimes quand ils qualifient un fournisseur ou quand la phrase les nie,
       jamais quand ils qualifient la prestation. */
    nom: 'vocabulaire de certification',
    gravite: 'DOUTE',
    parPhrase: true,
    motif: /\b(certifiés?|certifiées?|certification|agréé|agréée|agréés|agréées|accrédité\w*)\b/i,
    sauf: NEGATIONS,
  },
  {
    /* La formation est vendue par un autre site du groupe : on ne la vend pas
       ici. La frontiere ne passe pas par le mot, elle passe par le verbe.
       Ecrire que HNC, editeur du site, est un organisme de formation certifie
       Qualiopi est un fait verifiable qui sert la credibilite du cabinet, a
       condition de dire dans la meme phrase que l'audit, lui, n'est pas une
       prestation certifiee. Proposer une formation, ou renvoyer vers un
       organisme, est en revanche hors perimetre. Le CPF n'apparait sous aucun
       angle tant que l'enregistrement au repertoire specifique n'est pas
       verifie. */
    /* Le perimetre est l'audit et le rapport. Promettre de rediger le plan de
       maitrise sanitaire, de reconstituer le classeur ou de fournir des
       modeles vend une prestation qui n'existe pas, et le client le decouvre
       a la premiere demande. L'auditeur regarde ces documents et ecrit ce qui
       manque : c'est tout, et c'est deja beaucoup. */
    nom: 'prestation de rédaction promise (hors périmètre)',
    gravite: 'FAUTE',
    motif: /\bnous (le |la |les )?(reconstituons|rédigeons|complétons|remettons en état)\b|\b(reconstituons|rédigeons) (le|votre) (classeur|PMS|plan de maîtrise)\b|\bnous (vous )?(fournissons|laissons) des modèles\b|\brédaction de votre (PMS|plan de maîtrise)\b|\bnous écrivons votre\b/i,
  },
  {
    nom: 'formation vendue, organisme nommé ou CPF',
    gravite: 'FAUTE',
    motif: /\bCPF\b|compte personnel de formation|\bmon compte formation\b|\bDatadock\b|\bnos formations?\b|\bnotre formation\b|\bnous (vous )?formons\b|\bnous dispensons\b|\bnous proposons (une |des )?formations?\b|\bfinancement de (la|votre) formation\b|\bs'inscrire à (une|la) formation\b/i,
  },
  {
    /* Qualiopi certifie un organisme de formation, pas une prestation d'audit.
       Cite seul a cote de l'offre, le mot laisse croire que l'audit est
       certifie, ce qu'il n'est pas : c'est exactement la phrase qui a du etre
       retiree de la FAQ. Il n'est donc admis qu'accompagne de la mise au
       point. */
    nom: 'Qualiopi cité sans la mise au point sur l’audit',
    gravite: 'FAUTE',
    motif: /\bQualiopi\b/i,
    sauf: null,
    test: (texte) =>
      /\bQualiopi\b/i.test(texte) &&
      !/(l'audit[^.]{0,40}n'est pas[^.]{0,40}certifi|label privé|ni certification)/i.test(texte)
        ? "Qualiopi certifie l'organisme de formation, jamais l'audit : le dire dans la même phrase"
        : null,
  },
  {
    /* Dire qu'une personne formee doit figurer a l'effectif est autorise.
       Renvoyer vers un organisme ne l'est pas, et la frontiere se juge sur la
       phrase entiere. */
    nom: 'renvoi vers un organisme de formation',
    gravite: 'DOUTE',
    motif: /\borganisme de formation\b|\bcentre de formation\b|\bs'inscrire à (une|la) formation\b/i,
  },
  {
    nom: 'texte réglementaire remplacé cité seul',
    gravite: 'FAUTE',
    test: (texte) => {
      for (const r of REMPLACES) if (r.abroge.test(texte) && !r.successeur.test(texte)) return r.note;
      return null;
    },
  },
  {
    /* La reserve se lit rarement dans la meme chaine que la mention : elle
       tient au paragraphe suivant, ou au titre qui precede. Juger la chaine
       seule condamnait les textes qui traitent le piege le mieux, et un
       controle qui crie a tort finit desactive. On regarde donc le voisinage
       dans le fichier. */
    nom: 'annexe IV appliquée hors restauration collective',
    gravite: 'FAUTE',
    voisinage: 1600,
    test: (texte, voisinage) =>
      ANNEXE_IV.test(texte) && !COLLECTIVE.test(voisinage || texte)
        ? "l'annexe IV de l'arrêté du 21 décembre 2009 ne vise que la restauration collective"
        : null,
  },
  {
    /* Le seuil +63 °C vers +10 °C et la remise en temperature viennent de cette
       meme annexe IV. Enonces sur le ton de l'obligation, sans dire d'ou ils
       viennent ni pour qui, ils transforment une reference professionnelle en
       regle opposable a un restaurant qui n'y est pas soumis. */
    nom: 'seuils de refroidissement présentés comme obligatoires',
    gravite: 'DOUTE',
    voisinage: 1200,
    test: (texte, voisinage) =>
      SEUILS_COLLECTIFS.test(texte) &&
      TON_OBLIGATOIRE.test(texte) &&
      !TON_PRUDENT.test(voisinage || texte)
        ? 'seuil issu de la restauration collective énoncé sans sa réserve'
        : null,
  },
  {
    nom: 'date ne correspondant pas au texte cité',
    gravite: 'FAUTE',
    test: (texte) => {
      const re = /(?:règlement|réglement)[^.;]{0,25}?(\d{2,4}\s*\/\s*\d{2,4})\s*du\s+(\d{1,2}\s+\p{L}+\s+\d{4})/giu;
      const faux = [];
      let m;
      while ((m = re.exec(texte))) {
        const num = m[1].replace(/\s+/g, '');
        const attendue = REGISTRE[num];
        if (attendue && m[2].replace(/\s+/g, ' ').toLowerCase() !== attendue.toLowerCase())
          faux.push(`${num} daté « ${m[2]} », attendu « ${attendue} »`);
      }
      return faux.length ? faux.join(' ; ') : null;
    },
  },
];

/* ------------------------------------------------------------------ *
 * Execution
 * ------------------------------------------------------------------ */

const cibles = SOURCES.flatMap(fichiersTs);

/**
 * Le brief impose le numero ET la date. Une reference sans date ne se verifie
 * pas : le lecteur qui la cherche tombe sur la version en vigueur de son cru,
 * et le redacteur ne sait plus laquelle il a lue.
 *
 * Le controle se pose au fichier, pas a la phrase, et c'est un compromis
 * assume. Exiger la date a chaque occurrence obligerait a ecrire « du 29 avril
 * 2004 » vingt-cinq fois dans src/lib/grille-audit.ts, ce qu'aucun relecteur
 * n'accepterait et ce qui rendrait les references illisibles. Au fichier, le
 * controle attrape ce qui compte vraiment : un texte cite dans une famille de
 * pages sans que sa date apparaisse nulle part. La granularite plus fine reste
 * du ressort du relecteur.
 */
function datesManquantes(source, chaines) {
  const cites = new Map();
  for (const { ligne, texte } of chaines) {
    const re = /(?:règlement|réglement)[^.;]{0,30}?(\d{2,4}\s*\/\s*\d{2,4})/gi;
    let m;
    while ((m = re.exec(texte))) {
      const num = m[1].replace(/\s+/g, '');
      if (REGISTRE[num] && !cites.has(num)) cites.set(num, ligne);
    }
  }
  const manquants = [];
  for (const [num, ligne] of cites) {
    const attendue = new RegExp('du\\s+' + REGISTRE[num].replace(/ /g, '\\s+'), 'i');
    if (!attendue.test(source)) manquants.push({ num, ligne, attendue: REGISTRE[num] });
  }
  return manquants;
}

for (const rel of cibles) {
  const source = readFileSync(join(RACINE, rel), 'utf8');
  const affiche = rel.split(sep).join('/');

  /* Les tirets se cherchent sur le fichier entier. Le brief dit « nulle part »,
     et un tiret survit a un copier-coller depuis un traitement de texte sans
     que personne ne le voie. */
  source.split(/\r?\n/).forEach((ligne, i) => {
    const m = ligne.match(/[–—]/);
    if (m) ajouter('FAUTE', 'tiret cadratin ou demi-cadratin', affiche, i + 1, extrait(ligne, /[–—]/));
  });

  const litteraux = chaines(source);

  for (const { num, ligne, attendue } of datesManquantes(source, litteraux))
    ajouter('DOUTE', 'référence citée sans sa date', affiche, ligne, `règlement ${num}`, `« du ${attendue} » n'apparaît nulle part dans le fichier`);

  for (const { ligne, texte } of litteraux) {
    if (!texte.trim()) continue;
    if (TECHNIQUE.test(texte)) continue;

    for (const regle of REGLES_CHAINE) {
      if (regle.prose && !estProse(texte)) continue;
      if (regle.test) {
        const note = regle.test(texte, regle.voisinage ? autour(source, texte, regle.voisinage) : null);
        if (note) ajouter(regle.gravite, regle.nom, affiche, ligne, extrait(texte, regle.motif || /./), note);
        continue;
      }
      const morceaux = regle.parPhrase ? phrases(texte) : [texte];
      for (const morceau of morceaux) {
        const m = morceau.match(regle.motif);
        if (!m) continue;
        /* La negation n'excuse que ce qu'elle precede. « Nous ne garantissons
           pas » desamorce la promesse ; « vous passerez le controle sans
           difficulte » ne la desamorce pas, il la renforce. Chercher la
           negation dans la phrase entiere laisserait passer la seconde. */
        if (regle.sauf && regle.sauf.test(morceau.slice(0, m.index))) continue;
        ajouter(regle.gravite, regle.nom, affiche, ligne, extrait(morceau, regle.motif));
        break;
      }
    }

    /* Les chemins internes. Un lien mort coute plus qu'un lien manquant, et une
       famille pSEO les recopie sur des centaines de pages d'un coup.
       Tout ce qui commence par une barre oblique n'est pas une URL : une note
       sur vingt s'ecrit « 16/20 », un fichier statique vit dans public/, et un
       point de terminaison d'API se termine par une barre. Confondre les trois
       avec un lien mort ferait crier le controle a chaque execution. */
    const re = /(?<![\w.@/])\/[a-z0-9][a-z0-9\-/]*/g;
    let m;
    const deja = new Set();
    while ((m = re.exec(texte))) {
      const url = m[0];
      if (deja.has(url)) continue;
      deja.add(url);
      if (/^\/\d+$/.test(url)) continue;
      if (url.endsWith('/')) continue;
      if (estAsset(url)) continue;
      const v = chemin_valide(url);
      if (!v.ok) ajouter('FAUTE', 'chemin interne inexistant', affiche, ligne, `${url} : ${v.raison}`);
    }
  }
}

/* ------------------------------------------------------------------ *
 * Rapport
 * ------------------------------------------------------------------ */

console.log(`\naudithygiene, contrôle du corpus`);
console.log(`${cibles.length} fichiers lus dans ${SOURCES.join(' et ')}\n`);

for (const attendu of ATTENDUS_OPTIONNELS) {
  const present = existsSync(join(RACINE, attendu));
  console.log(`  ${present ? 'présent ' : 'absent  '} ${attendu}${present ? '' : ' (en cours de rédaction, ignoré)'}`);
}
if (!UNIVERS.connu) console.log(`  src/app introuvable : le contrôle des chemins internes est désactivé`);
console.log('');

const fautes = constats.filter((c) => c.gravite === 'FAUTE');
const doutes = constats.filter((c) => c.gravite === 'DOUTE');

const rendre = (titre, liste) => {
  if (!liste.length) return;
  console.log(`${titre} (${liste.length})`);
  console.log('-'.repeat(72));
  const parRegle = new Map();
  for (const c of liste) {
    if (!parRegle.has(c.regle)) parRegle.set(c.regle, []);
    parRegle.get(c.regle).push(c);
  }
  for (const [regle, cs] of parRegle) {
    console.log(`\n  ${regle} : ${cs.length}`);
    for (const c of cs) {
      console.log(`    ${c.fichier}:${c.ligne}`);
      if (c.note) console.log(`      → ${c.note}`);
      console.log(`      ${c.extrait.replace(/\s+/g, ' ').slice(0, 200)}`);
    }
  }
  console.log('');
};

rendre('FAUTES, à corriger avant publication', fautes);
rendre('DOUTES, à relire par un humain', doutes);

if (!fautes.length && !doutes.length) console.log('Rien à signaler.\n');

console.log('-'.repeat(72));
console.log(`${fautes.length} faute(s), ${doutes.length} doute(s).`);

/* Les doutes ne bloquent pas. Un controle qui arrete la chaine sur une
   incertitude finit contourne, et un controle contourne ne protege plus rien. */
process.exit(fautes.length ? 1 : 0);
