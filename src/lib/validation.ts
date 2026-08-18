import { z } from 'zod';

/* ------------------------------------------------------------------
   Règle de conduite de ce schéma.

   Un formulaire public n'a que deux informations dont l'absence rend le lead
   inexploitable : le NOM et l'EMAIL. Tout le reste est du confort. Un champ
   facultatif mal rempli (un téléphone avec « poste 2 », une ville de 130
   caractères, un « environ 80 » dans le nombre de couverts, une valeur d'enum
   inconnue parce que le visiteur a un vieux bundle JS en cache) ne doit
   JAMAIS coûter le client qui vient de le taper.

   D'où deux traitements distincts :
     - champs REQUIS  → refus, avec un message français qui dit quoi corriger ;
     - champs FACULTATIFS → on normalise, on tronque, on ignore ce qu'on ne
       comprend pas, et le lead passe.

   Perdre « -sur-Marne » à la fin d'un nom de ville est réparable d'un coup de
   téléphone. Perdre le lead ne l'est pas, et personne ne l'apprend jamais.
   ------------------------------------------------------------------ */

const ESTABLISHMENT_TYPES = [
  'RESTAURANT',
  'RESTAURATION_RAPIDE',
  'DARK_KITCHEN',
  'BOULANGERIE',
  'TRAITEUR',
  'HOTEL_RESTAURANT',
  'BAR',
  'AUTRE',
] as const;

/** Coercition d'un champ checkbox HTML ("true" / "on" / undefined). */
const checkbox = z
  .union([z.literal('true'), z.literal('on'), z.boolean(), z.undefined()])
  .transform((v) => v === true || v === 'true' || v === 'on');

/** "" ou null → undefined (avant validation), sinon valeur. */
const blankToUndef = (v: unknown) => (v === '' || v === null ? undefined : v);

/**
 * Enum facultatif TOLÉRANT : une valeur hors liste est ignorée, pas refusée.
 *
 * Ces valeurs viennent de nos propres `<select>`. Le jour où l'on renomme une
 * constante, où un visiteur garde un bundle JS périmé en cache, ou bien où une
 * campagne pousse un paramètre d'URL fantaisiste, l'ancien schéma refusait le
 * lead ENTIER pour une case de classement. On préfère perdre la classification
 * (récupérable en rappelant le client) que le client lui-même.
 */
function optEnum<T extends readonly [string, ...string[]]>(values: T) {
  return z.preprocess((v) => {
    const brut = blankToUndef(v);
    if (typeof brut !== 'string') return undefined;
    const normalise = brut.trim().toUpperCase();
    // Tolère aussi la casse : « urgent » saisi à la main vaut « URGENT ».
    return (values as readonly string[]).includes(normalise) ? normalise : undefined;
  }, z.enum(values).optional());
}

/**
 * Chaîne facultative : nettoyée et TRONQUÉE, jamais refusée.
 *
 * Accepte aussi un nombre (un code postal envoyé en JSON comme `75011` plutôt
 * que `"75011"` ne doit pas faire échouer la demande).
 */
function optString(max: number) {
  return z.preprocess((v) => {
    if (v === '' || v === null || v === undefined) return undefined;
    if (typeof v !== 'string' && typeof v !== 'number') return undefined;
    const t = String(v).trim();
    return t ? t.slice(0, max) : undefined;
  }, z.string().optional());
}

/**
 * Entier facultatif TOLÉRANT : « environ 80 », « 80 couverts » ou une valeur
 * aberrante ne refusent plus le lead. On extrait ce qu'on peut, on borne, et
 * si rien n'est exploitable on laisse le champ vide.
 */
function optInt(max: number) {
  return z.preprocess((v) => {
    if (v === '' || v === null || v === undefined) return undefined;
    const chiffres = String(v).replace(/[^\d]/g, '');
    if (!chiffres) return undefined;
    const n = Number(chiffres);
    if (!Number.isFinite(n)) return undefined;
    return Math.min(n, max);
  }, z.number().int().optional());
}

/** Le message le plus long qu'on garde en base, en caractères. */
export const MESSAGE_MAX = 2000;
const MARQUE_TRONCATURE = '\n[…message tronqué, la suite a été coupée…]';

/**
 * Message libre : tronqué, jamais refusé.
 *
 * Un restaurateur qui raconte son histoire sur 3 000 caractères était renvoyé à
 * un formulaire en erreur, en anglais (« String must contain at most 2000
 * character(s) »), sans compteur ni indication de la limite. Beaucoup ne
 * réessaient pas. On garde les 2 000 premiers caractères et on le dit : le
 * début d'un message suffit largement à rappeler quelqu'un.
 */
const messageLibre = z.preprocess((v) => {
  if (typeof v !== 'string') return blankToUndef(v);
  const t = v.trim();
  if (!t) return undefined;
  if (t.length <= MESSAGE_MAX) return t;
  return t.slice(0, MESSAGE_MAX - MARQUE_TRONCATURE.length) + MARQUE_TRONCATURE;
}, z.string().optional());

export const leadSchema = z.object({
  // Requis : sans eux, le lead n'est pas rappelable.
  nom: z
    .string({ required_error: 'Merci d’indiquer votre nom.', invalid_type_error: 'Merci d’indiquer votre nom.' })
    .trim()
    .min(1, 'Merci d’indiquer votre nom.')
    // Tronqué plutôt que refusé : un nom à rallonge reste un vrai client.
    .transform((v) => v.slice(0, 160)),
  email: z
    .string({ required_error: 'Merci d’indiquer votre email.', invalid_type_error: 'Merci d’indiquer votre email.' })
    .trim()
    .min(1, 'Merci d’indiquer votre email.')
    .max(254, 'Cet email est trop long : vérifiez qu’il ne contient pas d’espace en trop.')
    .email('Cet email ne semble pas valide. Exemple attendu : prenom@restaurant.fr'),

  // Facultatifs : normalisés, jamais bloquants.
  telephone: optString(40),
  ville: optString(120),
  /* 8 caractères tronquaient « Val-de-Marne » en « Val-de-M ». Le formulaire
     n'envoie aujourd'hui que les deux chiffres du code postal, mais la colonne
     est du texte libre en base : mieux vaut garder un libellé lisible que de
     produire un mot coupé qu'aucun humain ne saura relire. */
  departement: optString(32),
  typeEtablissement: optEnum(ESTABLISHMENT_TYPES),
  nombreCouverts: optInt(1_000_000),
  besoin: optEnum(['URGENT', 'PREVENTIF'] as const),
  formule: optString(60),
  message: messageLibre,
  source: optString(60),
  consentementRGPD: checkbox,
  consentementMarketing: checkbox,

  /* Honeypot anti-spam : ce champ est caché, un humain ne le voit pas.
     Il était déclaré `max(0)`, donc Zod refusait la requête AVANT que la route
     n'atteigne son propre test : le `if (data.website)` de la route était du
     code mort, et un visiteur dont le gestionnaire de mots de passe remplit le
     champ recevait un « String must contain at most 0 character(s) »
     incompréhensible. On accepte donc la valeur ici, et c'est la route qui
     décide (elle répond « ok » sans rien enregistrer). */
  website: optString(200),
});

export type LeadInput = z.infer<typeof leadSchema>;

/**
 * Filet de sécurité linguistique.
 *
 * Les messages ci-dessus couvrent les règles qu'on a écrites. Cet errorMap
 * couvre celles qu'on n'a pas prévues (type inattendu, JSON malformé) : sans
 * lui, Zod répond en anglais et le visiteur lit « Expected string, received
 * number » avant d'abandonner.
 */
const LIBELLES: Record<string, string> = {
  nom: 'votre nom',
  email: 'votre email',
  telephone: 'votre téléphone',
  ville: 'votre ville',
  codePostal: 'votre code postal',
  departement: 'votre département',
  message: 'votre message',
};

const messagesFr: z.ZodErrorMap = (issue) => {
  /* Un errorMap passé à safeParse a priorité sur les `required_error` posés sur
     les champs : c'est donc ICI que doit vivre le nom du champ, sinon le
     visiteur lit un « ce champ est requis » sans savoir lequel, et referme. */
  const champ = LIBELLES[String(issue.path[0] ?? '')];
  if (issue.code === z.ZodIssueCode.invalid_type && issue.received === 'undefined') {
    return { message: champ ? `Merci d’indiquer ${champ}.` : 'Une information nécessaire manque à votre demande.' };
  }
  return {
    message: champ
      ? `Merci de vérifier ${champ}.`
      : 'Une des informations saisies n’a pas été comprise. Merci de la vérifier.',
  };
};

/** Point d'entrée unique du endpoint : garantit les messages en français. */
export function parseLead(raw: unknown) {
  return leadSchema.safeParse(raw, { errorMap: messagesFr });
}
