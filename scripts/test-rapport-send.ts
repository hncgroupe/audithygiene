/**
 * Test d'envoi du rapport auditresto360 : remplit le questionnaire au hasard,
 * génère le PDF (récap en première page) et l'envoie en pièce jointe par email.
 *
 * Lancement :
 *   export BREVO_API_KEY=... ; npx tsx scripts/test-rapport-send.ts
 */
import { renderToBuffer } from '@react-pdf/renderer';
import { createElement } from 'react';
import { writeFileSync } from 'fs';
import { GRILLE_RESTO360, critereId, critereLabel } from '../src/lib/grille-resto360';
import { assembleResto360Report, type ItemNote } from '../src/lib/rapport-resto360';
import { genererRestitutionTemplate } from '../src/lib/restitution-template';
import { Resto360Document } from '../src/lib/pdf/Resto360Document';
import { sendTransactionalEmail } from '../src/lib/brevo';

const DESTINATAIRES = ['younes@crispysoul.fr', 'oumeima@crispysoul.fr'];

let PHOTOS: string[] = [];

/** Récupère 2 vraies photos (JPEG) en data URI pour un rendu réaliste. */
async function chargerPhotos() {
  const urls = ['https://picsum.photos/seed/cuisine/400/300', 'https://picsum.photos/seed/frigo/400/300'];
  PHOTOS = (
    await Promise.all(
      urls.map(async (u) => {
        try {
          const r = await fetch(u);
          const buf = Buffer.from(await r.arrayBuffer());
          const type = r.headers.get('content-type') || 'image/jpeg';
          return `data:${type};base64,${buf.toString('base64')}`;
        } catch {
          return null;
        }
      })
    )
  ).filter((x): x is string => Boolean(x));
}

function noteAleatoire(): 1 | 2 | 3 | 4 | 5 {
  const r = Math.random();
  if (r < 0.22) return Math.random() < 0.5 ? 1 : 2; // ~22% de NC pour montrer les cas critiques
  if (r < 0.45) return 3;
  return Math.random() < 0.5 ? 4 : 5;
}

function buildItems(): ItemNote[] {
  const items: ItemNote[] = [];
  for (const p of GRILLE_RESTO360) {
    if (!p.noteAuRadar) {
      (p.questionsOuvertes ?? []).forEach((q, qi) =>
        items.push({
          code: `${p.code}-Q${qi + 1}`,
          theme: p.nom,
          groupe: 'Questions ouvertes',
          intitule: q,
          note: null,
          commentaire: 'Réponse de test du dirigeant : développer la vente à emporter.',
        })
      );
      continue;
    }
    p.groupes.forEach((g, gi) =>
      g.criteres.forEach((cr, ci) => {
        const note = noteAleatoire();
        items.push({
          code: critereId(p.code, gi, ci),
          theme: p.nom,
          groupe: g.nom,
          intitule: critereLabel(cr),
          note,
          commentaire: note <= 2 ? 'Écart constaté lors de la visite (donnée de test).' : null,
          photos: note <= 2 ? PHOTOS : [],
        });
      })
    );
  }
  return items;
}

async function main() {
  await chargerPhotos();
  console.log(`${PHOTOS.length} photo(s) de test chargée(s).`);
  const items = buildItems();
  const data = assembleResto360Report({
    etablissement: 'Le Bistrot Démo (TEST)',
    ville: 'Paris 11e',
    type: 'RESTAURANT',
    date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    ref: 'R360-TEST01',
    items,
    photos: [],
    restitution: genererRestitutionTemplate('Le Bistrot Démo (TEST)', items),
  });

  console.log(
    `Score ${data.scoreGlobal}/100 · ${data.maturite} · ${data.casCritiques.length} cas critiques · ${data.plan.length} actions`
  );

  const buffer = await renderToBuffer(
    createElement(Resto360Document, { data }) as Parameters<typeof renderToBuffer>[0]
  );
  const out = process.env.OUT_PDF || 'rapport-test.pdf';
  writeFileSync(out, buffer);
  console.log(`PDF généré (${(buffer.length / 1024).toFixed(0)} Ko) -> ${out}`);

  const ok = await sendTransactionalEmail({
    to: DESTINATAIRES.map((email) => ({ email })),
    subject: `TEST · Rapport auditresto360 - ${data.etablissement} (${data.scoreGlobal}/100)`,
    htmlContent: `
      <p>Bonjour,</p>
      <p>Test d'envoi automatique du rapport <strong>auditresto360</strong> (questionnaire rempli aléatoirement).</p>
      <p>Score global : <strong>${data.scoreGlobal}/100</strong> (${data.maturite}) · ${data.casCritiques.length} cas critique(s).</p>
      <p>Le récapitulatif (notation, cas critiques, plan d'action, quick wins) est en première page du PDF joint.</p>
      <p style="color:#6B7D77;font-size:12px">auditresto360, label privé indépendant. Email de test.</p>
    `,
    attachments: [{ content: buffer.toString('base64'), name: 'rapport-auditresto360-test.pdf' }],
  });

  console.log(ok ? `Email envoyé à : ${DESTINATAIRES.join(', ')}` : 'ÉCHEC envoi email (voir logs Brevo).');
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
