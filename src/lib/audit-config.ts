/** Options partagées entre le configurateur (home) et le formulaire de réservation. */

export const TYPES = [
  { id: 'RESTAURANT', label: 'Restaurant', desc: 'Service à table' },
  { id: 'RAPIDE', label: 'Restauration rapide', desc: 'Fast-food, snack' },
  { id: 'DARK', label: 'Dark kitchen', desc: 'Cuisine de production' },
  { id: 'BOULANGERIE', label: 'Boulangerie', desc: 'Snacking, pâtisserie' },
  { id: 'TRAITEUR', label: 'Traiteur', desc: 'Production, événementiel' },
  { id: 'BAR', label: 'Bar / café', desc: 'Boissons, petite restauration' },
  { id: 'HOTEL', label: 'Hôtel-restaurant', desc: 'Cuisine + service' },
  { id: 'AUTRE', label: 'Autre', desc: 'Métier de bouche' },
] as const;

export const TAILLES = [
  { id: 'PETIT', label: 'Petit', desc: 'moins de 30 couverts', duree: '~1 h' },
  { id: 'STANDARD', label: 'Standard', desc: '30 à 80 couverts', duree: '~2 h' },
  { id: 'GRAND', label: 'Grand', desc: 'plus de 80 couverts', duree: '~3 h' },
] as const;

export const SITUATIONS = [
  { id: 'OUVERTURE', label: 'J’ouvre bientôt', reco: 'COMPLET' },
  { id: 'PREPA', label: 'Je prépare un contrôle', reco: 'COMPLET' },
  { id: 'CORRECTION', label: 'Je corrige après un contrôle', reco: 'COMPLET' },
  { id: 'REPRISE', label: 'Je reprends un établissement', reco: 'COMPLET' },
  { id: 'ROUTINE', label: 'Audit de routine', reco: 'ESSENTIEL' },
  { id: 'DOUTE', label: 'J’ai un doute sur mes pratiques', reco: 'ESSENTIEL' },
] as const;

export const DELAIS = [
  { id: 'SUPER_URGENT', label: 'Super urgent', desc: '48 h max' },
  { id: 'NORMAL', label: 'Normal', desc: 'sous 1 semaine' },
  { id: 'PAS_URGENT', label: 'Pas urgent', desc: 'sous 15 jours' },
] as const;

export const PMS_OPTS = [
  { id: 'AJOUR', label: 'Oui, à jour' },
  { id: 'ANCIEN', label: 'Oui, mais ancien' },
  { id: 'NON', label: 'Non' },
  { id: 'INCONNU', label: 'Je ne sais pas' },
] as const;

export const FORMULE = {
  ESSENTIEL: { nom: 'Audit Essentiel', prix: '690 €', points: '20 points de contrôle' },
  COMPLET: { nom: 'Audit Complet', prix: '990 €', points: '50 points · plan d’action détaillé' },
} as const;

/** Recommandation de formule : on recommande toujours l'Audit Complet. */
export function recommander(_situationIds: string[], _taille: string, _pms: string): 'ESSENTIEL' | 'COMPLET' {
  return 'COMPLET';
}

export const label = <T extends { id: string; label: string }>(arr: readonly T[], id: string) =>
  arr.find((x) => x.id === id)?.label;
