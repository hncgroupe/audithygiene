import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validation';
import { env } from '@/lib/env';
import { notifyTelegram, formatLeadMessage } from '@/lib/telegram';
import { sendTransactionalEmail, leadConfirmationEmail } from '@/lib/brevo';
import { ajouterAuClasseur, celluleJson } from '@/lib/classeur';

export const runtime = 'nodejs';

/**
 * Réception d'un lead depuis le formulaire de RDV.
 *
 * Flux : validation → classeur → base → Telegram → email de confirmation.
 * Chaque effet de bord reste protégé, un échec n'empêche pas les autres, mais
 * la réponse ne vaut « ok » que si au moins une copie a réellement tenu.
 */
export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json({ error: first?.message ?? 'Données invalides.' }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot anti-spam
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }); // on ignore silencieusement
  }

  // Consentement RGPD obligatoire pour être recontacté
  if (!data.consentementRGPD) {
    return NextResponse.json({ error: 'Le consentement est requis.' }, { status: 400 });
  }

  const lead = {
    nom: data.nom,
    email: data.email,
    telephone: data.telephone,
    ville: data.ville,
    departement: data.departement,
    typeEtablissement: data.typeEtablissement,
    nombreCouverts: data.nombreCouverts,
    besoin: data.besoin,
    formule: data.formule,
    message: data.message,
    source: data.source ?? 'site',
  };

  /* Ce que la réponse « ok » doit valoir. Avant, chaque effet de bord était
     protégé par un `.catch(() => false)` et la route répondait `ok` quoi qu'il
     arrive : base injoignable, Telegram muet, clé Brevo expirée donnaient le
     même résultat qu'un lead parfaitement transmis. */
  const copies: string[] = [];

  // 0. Le classeur, la seule copie qu'on saura relire et compter dans six mois.
  if (
    await ajouterAuClasseur('Leads', [
      new Date().toISOString(),
      lead.source,
      lead.nom,
      lead.email ?? '',
      lead.telephone ?? '',
      lead.typeEtablissement ?? '',
      [lead.besoin, lead.formule].filter(Boolean).join(' · '),
      lead.message ?? '',
      lead.nombreCouverts ? String(lead.nombreCouverts) : '',
      [lead.ville, lead.departement].filter(Boolean).join(' '),
      celluleJson(data),
    ])
  ) {
    copies.push('classeur');
  }

  // 1. Enregistrement en base (si configurée)
  if (env.isDatabaseConfigured) {
    try {
      const { prisma } = await import('@/lib/prisma');
      await prisma.lead.create({
        data: {
          ...lead,
          consentementRGPD: true,
          consentementAt: new Date(),
          consentementMarketing: Boolean(data.consentementMarketing),
        },
      });
      copies.push('base');
    } catch (e) {
      console.error('[lead] échec enregistrement DB', e);
      // On continue : le lead ne doit pas être perdu côté notification.
    }
  } else {
    console.warn('[lead] DATABASE_URL absent - lead non persisté (notifications uniquement).');
  }

  // 2. Notification Telegram (non bloquant)
  const telegramOk = await notifyTelegram(
    formatLeadMessage({
      nom: data.nom,
      email: data.email || null,
      telephone: data.telephone || null,
      ville: data.ville || data.departement || null,
      typeEtablissement: data.typeEtablissement || null,
      besoin: data.besoin || null,
      formule: data.formule || null,
      message: data.message || null,
    })
  ).catch(() => false);
  if (telegramOk) copies.push('telegram');

  // 3. Email de confirmation au lead (non bloquant)
  const tpl = leadConfirmationEmail(data.nom);
  await sendTransactionalEmail({
    to: { email: data.email, name: data.nom },
    subject: tpl.subject,
    htmlContent: tpl.htmlContent,
  }).catch(() => false);

  if (!copies.length) {
    /* Aucune copie n'a tenu. Le dire vaut mieux que de laisser croire au
       visiteur que sa demande est partie : il peut réessayer, alors qu'un faux
       succès le fait partir pour de bon. Le journal porte le lead entier,
       dernière trace avant qu'il ne disparaisse. */
    console.error('[lead] AUCUNE COPIE GARDEE', JSON.stringify(data));
    return NextResponse.json(
      { error: "Votre demande n'a pas pu être transmise. Réessayez, ou écrivez-nous directement." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, copies });
}
