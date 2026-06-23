import { NextResponse } from 'next/server';
import { getCurrentDbUser } from '@/lib/auth';
import { getSignedUrl } from '@/lib/supabase';
import { assembleResto360Report, type ItemNote } from '@/lib/rapport-resto360';
import { renderResto360Report } from '@/lib/pdf/generate';
import { sendTransactionalEmail } from '@/lib/brevo';

export const runtime = 'nodejs';
export const maxDuration = 60;

/** Copie systématique de l'équipe label (suivi interne). */
const COPIES_INTERNES = ['younes@crispysoul.fr', 'oumeima@crispysoul.fr'];

/**
 * Génère le PDF du rapport auditresto360 et l'envoie par email (pièce jointe)
 * aux destinataires du rapport + à l'équipe interne.
 */
export async function POST(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDbUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  const { id } = await ctx.params;
  const { prisma } = await import('@/lib/prisma');
  const audit = await prisma.audit.findUnique({
    where: { id },
    include: { establishment: true, items: true },
  });
  if (!audit) return NextResponse.json({ error: 'Audit introuvable.' }, { status: 404 });
  if (audit.marque !== 'AUDITRESTO360') {
    return NextResponse.json({ error: 'Rapport indisponible pour cette marque.' }, { status: 400 });
  }

  const items: ItemNote[] = audit.items.map((it) => ({
    code: it.code,
    theme: it.theme,
    groupe: it.groupe,
    intitule: it.intitule,
    note: it.note,
    commentaire: it.commentaire,
  }));

  // Photos (URL signées, courte durée — le temps de la génération)
  const photos = (
    await Promise.all(
      audit.items.flatMap((it) =>
        it.photoUrls.map(async (path) => ({
          intitule: it.intitule,
          url: await getSignedUrl(path, 60 * 30),
        }))
      )
    )
  ).filter((p): p is { intitule: string; url: string } => Boolean(p.url));

  const dateStr = audit.dateAudit
    ? new Date(audit.dateAudit).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const ref = `R360-${audit.id.slice(-6).toUpperCase()}`;

  const data = assembleResto360Report({
    etablissement: audit.establishment.nom,
    ville: audit.establishment.ville,
    date: dateStr,
    ref,
    items,
    photos,
  });

  let pdf: Buffer;
  try {
    pdf = await renderResto360Report(data);
  } catch (e) {
    console.error('[rapport/send] PDF', e);
    return NextResponse.json({ error: 'Échec de génération du PDF.' }, { status: 500 });
  }

  const recipients = Array.from(
    new Set([...COPIES_INTERNES, ...audit.emailsRapport].map((e) => e.trim().toLowerCase()).filter(Boolean))
  );

  const fileName = `rapport-${ref}.pdf`;
  const ok = await sendTransactionalEmail({
    to: recipients.map((email) => ({ email })),
    subject: `Rapport auditresto360 - ${audit.establishment.nom} (${data.scoreGlobal}/100)`,
    htmlContent: `
      <p>Bonjour,</p>
      <p>Veuillez trouver ci-joint le rapport d'audit <strong>auditresto360</strong> de
      <strong>${audit.establishment.nom}</strong>.</p>
      <p>Score global : <strong>${data.scoreGlobal}/100</strong> (${data.maturite}) ·
      ${data.casCritiques.length} cas critique(s).</p>
      <p style="color:#6B7D77;font-size:12px">auditresto360, label privé indépendant. Document confidentiel.</p>
    `,
    attachments: [{ content: pdf.toString('base64'), name: fileName }],
  });

  if (!ok) return NextResponse.json({ error: "Échec de l'envoi de l'email." }, { status: 502 });

  await prisma.audit
    .update({ where: { id }, data: { statut: 'RAPPORT_ENVOYE' } })
    .catch(() => null);

  return NextResponse.json({ ok: true, recipients });
}
