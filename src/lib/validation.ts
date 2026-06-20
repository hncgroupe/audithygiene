import { z } from 'zod';

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

/** Enum optionnel qui accepte aussi la chaîne vide (mappée en undefined). */
function optEnum<T extends readonly [string, ...string[]]>(values: T) {
  return z.preprocess(blankToUndef, z.enum(values).optional());
}

/** String optionnelle, chaîne vide → undefined. */
function optString(max: number) {
  return z.preprocess(blankToUndef, z.string().trim().max(max).optional());
}

export const leadSchema = z.object({
  nom: z.string().trim().min(1, 'Nom requis').max(120),
  email: z.string().trim().email('Email invalide').max(160),
  telephone: optString(40),
  ville: optString(120),
  departement: optString(3),
  typeEtablissement: optEnum(ESTABLISHMENT_TYPES),
  nombreCouverts: z.preprocess(
    blankToUndef,
    z.coerce.number().int().min(0).max(100000).optional()
  ),
  besoin: optEnum(['URGENT', 'PREVENTIF'] as const),
  formule: optString(60),
  message: optString(2000),
  source: optString(60),
  consentementRGPD: checkbox,
  consentementMarketing: checkbox,
  // Honeypot anti-spam : doit rester vide
  website: z.preprocess(blankToUndef, z.string().max(0).optional()),
});

export type LeadInput = z.infer<typeof leadSchema>;
