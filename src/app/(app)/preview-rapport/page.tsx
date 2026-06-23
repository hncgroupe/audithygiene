import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  GRILLE_RESTO360,
  critereId,
  critereLabel,
  CRITIQUE_IDS,
} from '@/lib/grille-resto360';
import {
  calculerRapportResto360,
  detailPiliers,
  type ItemNote,
} from '@/lib/rapport-resto360';
import { genererRestitutionTemplate } from '@/lib/restitution-template';
import { PrintButton } from '@/components/app/PrintButton';
import { Resto360RapportDocument } from '@/components/app/Resto360RapportDocument';

export const dynamic = 'force-dynamic';

/**
 * Prévisualisation du rapport auditresto360 (DEV UNIQUEMENT).
 * Génère un audit fictif complet (les dix piliers notés) avec 40 photos de
 * démonstration, sans base de données ni authentification. Rendu via le même
 * composant que le rapport réel : ce qu'on voit ici = ce que verra l'auditeur
 * en fin de parcours, après « Terminer l'audit ».
 *
 * URL : http://localhost:3000/preview-rapport
 */

const PHOTO_CIBLE = 40;

// Image de démonstration déterministe (placeholder public, aucune donnée réelle).
function photoDemo(n: number): string {
  return `https://picsum.photos/seed/r360-demo-${n}/600/450`;
}

// Note déterministe d'un critère : majorité conforme, quelques alertes, et des
// cas critiques pour montrer le mécanisme (points sanitaires notés 1 ou 2).
function noteDe(i: number, critique: boolean): number {
  const motif = [5, 4, 3, 4, 5, 2, 4, 3, 4, 5][i % 10];
  if (critique) {
    if (i % 4 === 0) return 2; // cas critique visible
    return motif === 2 ? 4 : motif;
  }
  if (i % 17 === 0) return 1; // urgence non sanitaire
  return motif;
}

// Commentaires de démo réalistes (l'auditeur les saisit en vrai). On varie selon
// la note, sans répéter l'intitulé du critère, pour un rendu crédible.
const COMM_CRITIQUE = [
  'Corriger aujourd\'hui, puis prendre une photo de la remise en conformité.',
  'Reprendre sous 48 h et noter le contrôle dans le registre.',
  'Mettre en conformité sans délai : point bloquant pour un contrôle officiel.',
  'Isoler ou retirer le produit, traiter la cause, puis revérifier.',
];
const COMM_AMELIORER = [
  'Écrire une procédure simple et l\'afficher au poste concerné.',
  'Désigner un responsable et vérifier le point une fois par semaine.',
  'Corriger les écarts ponctuels et caler un contrôle hebdomadaire.',
  'Cadrer la pratique pour la rendre régulière dans la durée.',
];

function commentaireDe(note: number, i: number): string | null {
  if (note >= 4) return null;
  if (note <= 2) return COMM_CRITIQUE[i % COMM_CRITIQUE.length];
  return COMM_AMELIORER[i % COMM_AMELIORER.length];
}

const REPONSES_DIRIGEANT = [
  'Le turnover en cuisine et les ruptures de stock le week-end.',
  'Stabiliser l\'équipe et fiabiliser les approvisionnements.',
  'Augmenter le ticket moyen et ouvrir un second service le midi.',
  'La régularité du dressage et la vitesse au passe.',
  'Le manque de temps pour former et le suivi administratif.',
];

function construireAuditFictif(): ItemNote[] {
  const items: ItemNote[] = [];
  let globalIndex = 0;

  // Critères notés des piliers au radar.
  for (const p of GRILLE_RESTO360) {
    if (!p.noteAuRadar) continue;
    p.groupes.forEach((g, gi) => {
      g.criteres.forEach((crit, ci) => {
        const code = critereId(p.code, gi, ci);
        const critique = CRITIQUE_IDS.has(code);
        const intitule = critereLabel(crit);
        const note = noteDe(globalIndex, critique);
        items.push({
          code,
          theme: p.nom,
          groupe: g.nom,
          intitule,
          note,
          commentaire: commentaireDe(note, globalIndex),
          photos: [],
        });
        globalIndex += 1;
      });
    });
  }

  // Réparti 40 photos sur l'ensemble des critères (pas réguliers pour l'étalement).
  for (let n = 0; n < PHOTO_CIBLE; n += 1) {
    const it = items[(n * 7) % items.length];
    it.photos!.push(photoDemo(n + 1));
  }

  // Pilier Dirigeant : questions ouvertes + réponses.
  const dir = GRILLE_RESTO360.find((p) => !p.noteAuRadar);
  if (dir?.questionsOuvertes) {
    dir.questionsOuvertes.forEach((q, i) => {
      items.push({
        code: `${dir.code}-Q${i + 1}`,
        theme: dir.nom,
        groupe: 'Questions ouvertes',
        intitule: q,
        note: null,
        commentaire: REPONSES_DIRIGEANT[i] ?? null,
        photos: [],
      });
    });
  }

  return items;
}

export default function PreviewRapportPage() {
  // Garde-fou : jamais accessible en production.
  if (process.env.NODE_ENV === 'production') notFound();

  const items = construireAuditFictif();
  const etablissementNom = 'Le Comptoir des Halles (démo)';

  const r = calculerRapportResto360(items);
  const restitution = genererRestitutionTemplate(etablissementNom, items);
  const details = detailPiliers(items);

  const photos = items.flatMap((it) =>
    (it.photos ?? []).map((url) => ({ intitule: it.intitule, url }))
  );

  const dateStr = new Date('2026-06-23').toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto bg-ink/10 print:static print:overflow-visible print:bg-white">
      {/* Barre d'actions (écran seulement) */}
      <div className="sticky top-0 z-10 border-b border-ink/10 bg-white px-4 py-2.5 print:hidden">
        <div className="mx-auto flex max-w-[820px] items-center justify-between">
          <span className="text-sm font-semibold text-[#F97316]">
            Prévisualisation rapport (démo, {photos.length} photos)
          </span>
          <div className="flex items-center gap-3">
            <Link href="/app/audits" className="text-sm text-gris hover:text-ink">
              Espace audits
            </Link>
            <PrintButton className="rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]" />
          </div>
        </div>
      </div>

      <Resto360RapportDocument
        etablissement={{
          nom: etablissementNom,
          adresse: '12 rue des Halles',
          ville: 'Paris 1er',
          type: 'Restaurant traditionnel',
        }}
        dateStr={dateStr}
        reference="R360-DEMO01"
        r={r}
        restitution={restitution}
        details={details}
      />
    </div>
  );
}
