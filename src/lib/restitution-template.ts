/**
 * Restitution auditresto360 générée par TEMPLATE (sans IA, sans appel externe).
 * Produit une synthèse rédigée, des points forts, des axes, une feuille de route
 * 30/60/90 jours, des gains et des risques, uniquement à partir des constats notés.
 * Déterministe : mêmes notes = même restitution.
 */
import { calculerRapportResto360, type ItemNote, type LigneRapport } from './rapport-resto360';
import type { RestitutionIA } from './restitution';

function bandeauScore(score: number): string {
  if (score >= 85) return "un niveau global solide, qui place l'établissement parmi les bien tenus";
  if (score >= 70) return 'un niveau global correct, avec des marges de progrès ciblées';
  if (score >= 50) return 'un niveau global fragile, qui demande un plan de remise à niveau structuré';
  return "un niveau global préoccupant, avec des fondamentaux à reprendre en priorité";
}

function action(l: LigneRapport): string {
  const base = l.commentaire?.trim() || l.intitule;
  return `${l.pilier} : ${base}`;
}

export function genererRestitutionTemplate(_etablissement: string, items: ItemNote[]): RestitutionIA {
  const r = calculerRapportResto360(items);

  if (r.scoreGlobal === null) {
    return {
      synthese:
        "L'audit n'a pas encore assez de critères notés pour produire une restitution. Complétez les piliers, la synthèse se mettra à jour automatiquement.",
      pointsForts: [],
      axes: [],
      roadmap: { j30: [], j60: [], j90: [] },
      gains: '',
      risques: '',
      genereLe: '',
      modele: 'template',
    };
  }

  const forts = r.radar.filter((p) => p.score >= 75).sort((a, b) => b.score - a.score);
  const faibles = r.radar.filter((p) => p.score < 60).sort((a, b) => a.score - b.score);
  const nbUrgences = r.urgences.length;
  const nbCritiques = r.plan.urgence.length; // notes à 1

  // Synthèse
  const phrases: string[] = [];
  phrases.push(
    `Avec ${r.scoreGlobal}/100 sur ${r.nbCriteresNotes} critères évalués, l'établissement présente ${bandeauScore(
      r.scoreGlobal
    )}.`
  );
  if (forts.length) {
    phrases.push(
      `Les points d'appui se trouvent surtout côté ${forts
        .slice(0, 3)
        .map((p) => p.radar.toLowerCase())
        .join(', ')}.`
    );
  }
  if (faibles.length) {
    phrases.push(
      `La priorité porte sur ${faibles
        .slice(0, 3)
        .map((p) => p.radar.toLowerCase())
        .join(', ')}, où les notes restent basses.`
    );
  }
  if (nbCritiques > 0) {
    phrases.push(
      `${nbCritiques} point${nbCritiques > 1 ? 's' : ''} not${
        nbCritiques > 1 ? 'és' : 'é'
      } en critique appelle${nbCritiques > 1 ? 'nt' : ''} une action immédiate.`
    );
  } else if (nbUrgences === 0) {
    phrases.push("Aucune urgence n'a été relevée le jour de la visite, ce qui est rare et positif.");
  }

  // Points forts
  const pointsForts: string[] = [];
  for (const p of forts.slice(0, 4)) {
    pointsForts.push(`${p.pilier} : pilier maîtrisé (${p.score}/100).`);
  }
  const excellents = items.filter((i) => i.note === 5 && i.groupe !== 'Questions ouvertes');
  if (excellents.length >= 3) {
    pointsForts.push(
      `Plusieurs critères au niveau excellent, dont ${excellents
        .slice(0, 3)
        .map((i) => i.intitule.toLowerCase())
        .join(', ')}.`
    );
  }
  if (pointsForts.length === 0) {
    pointsForts.push("Pas de pilier au-dessus de 75/100 pour l'instant : le socle reste à consolider.");
  }

  // Axes
  const axes: string[] = [];
  for (const p of faibles.slice(0, 4)) {
    axes.push(`${p.pilier} : pilier le plus fragile (${p.score}/100), à renforcer en priorité.`);
  }
  if (nbUrgences > 0) {
    axes.push(`${nbUrgences} critère${nbUrgences > 1 ? 's' : ''} en urgence à traiter (notes 1 et 2).`);
  }
  if (axes.length === 0) {
    axes.push('Maintenir le niveau et viser le passage des critères "à améliorer" vers "conforme".');
  }

  // Feuille de route (30/60/90)
  const j30 = r.plan.urgence.slice(0, 6).map(action);
  const j60 = r.plan.important.slice(0, 6).map(action);
  const j90 = r.plan.confort.slice(0, 6).map(action);
  if (j30.length === 0 && j60.length === 0 && j90.length === 0) {
    j30.push('Aucune action corrective requise. Planifier un audit de suivi pour maintenir le niveau.');
  }

  // Gains
  const gainCible = faibles[0];
  const gains = gainCible
    ? `Le potentiel le plus net se situe sur le pilier ${gainCible.pilier.toLowerCase()} : remonter ce score rapproche l'établissement d'un fonctionnement plus fluide et plus rentable. Traiter les urgences sécurise aussi l'image et limite le risque de remarque en contrôle.`
    : `En consolidant les critères "à améliorer", l'établissement gagne en régularité et en sérénité, sur l'exploitation comme sur la conformité.`;

  // Risques
  const haccp = r.radar.find((p) => p.radar.toLowerCase().includes('haccp'));
  let risques: string;
  if (nbCritiques > 0) {
    risques = `Les ${nbCritiques} point${nbCritiques > 1 ? 's' : ''} critique${
      nbCritiques > 1 ? 's' : ''
    } exposent à un risque sanitaire ou commercial direct s'ils ne sont pas corrigés sans délai.`;
    if (haccp && haccp.score < 60) {
      risques += ` Le pilier HACCP étant bas (${haccp.score}/100), une remarque en contrôle officiel devient probable.`;
    }
  } else if (haccp && haccp.score < 60) {
    risques = `Le pilier HACCP reste fragile (${haccp.score}/100) : sans correction, le risque d'écart en contrôle officiel augmente.`;
  } else if (nbUrgences > 0) {
    risques = `Laisser les urgences en l'état dégrade progressivement l'expérience client et la maîtrise opérationnelle.`;
  } else {
    risques = `Risque faible à ce stade. La vigilance porte sur le maintien des bonnes pratiques dans la durée.`;
  }

  return {
    synthese: phrases.join(' '),
    pointsForts,
    axes,
    roadmap: { j30, j60, j90 },
    gains,
    risques,
    genereLe: '',
    modele: 'template',
  };
}
