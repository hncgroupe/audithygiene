import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validation';
import { env } from '@/lib/env';
import { notifyTelegram, formatLeadMessage } from '@/lib/telegram';
import { sendTransactionalEmail, leadConfirmationEmail } from '@/lib/brevo';

export const runtime = 'nodejs';

/**
 * Réception d'un lead depuis le formulaire de RDV.
 * Flux : validation → enregistrement DB → notification Telegram → email confirmation Brevo.
 * Chaque effet de bord (DB/Telegram/Brevo) est protégé : un échec n'empêche pas les autres.
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
    } catch (e) {
      console.error('[lead] échec enregistrement DB', e);
      // On continue : le lead ne doit pas être perdu côté notification.
    }
  } else {
    console.warn('[lead] DATABASE_URL absent - lead non persisté (notifications uniquement).');
  }

  // 2. Notification Telegram (non bloquant)
  await notifyTelegram(
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

  // 3. Email de confirmation au lead (non bloquant)
  const tpl = leadConfirmationEmail(data.nom);
  await sendTransactionalEmail({
    to: { email: data.email, name: data.nom },
    subject: tpl.subject,
    htmlContent: tpl.htmlContent,
  }).catch(() => false);

  return NextResponse.json({ ok: true });
}
