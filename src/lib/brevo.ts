import { env } from './env';

/**
 * Email transactionnel via l'API Brevo. Échec non bloquant.
 * Voir skills lifecycle-email-transactional / email-deliverability-rgpd-fr.
 */
interface SendEmailParams {
  to: { email: string; name?: string };
  subject: string;
  htmlContent: string;
}

export async function sendTransactionalEmail(params: SendEmailParams): Promise<boolean> {
  if (!env.brevoApiKey) {
    console.warn('[brevo] API key manquante — email ignoré.');
    return false;
  }
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': env.brevoApiKey,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { email: env.brevoSenderEmail, name: env.brevoSenderName },
        to: [params.to],
        subject: params.subject,
        htmlContent: params.htmlContent,
      }),
    });
    if (!res.ok) {
      console.error('[brevo] échec envoi', await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error('[brevo] exception', e);
    return false;
  }
}

/** Email de confirmation envoyé au lead après une demande de RDV. */
export function leadConfirmationEmail(nom: string): { subject: string; htmlContent: string } {
  return {
    subject: 'Votre demande d’audit hygiène a bien été reçue',
    htmlContent: `
      <div style="font-family: Poppins, Arial, sans-serif; color: #0C1B17; max-width: 560px; margin: auto;">
        <h2 style="color: #10B981;">Merci ${escapeHtml(nom)} 👋</h2>
        <p>Votre demande auprès d'<strong>audit hygiène</strong> a bien été enregistrée.
        Un membre de notre équipe vous recontacte rapidement pour convenir d'un créneau.</p>
        <p>En attendant, voici comment se déroule un audit :</p>
        <ol>
          <li>Visite sur place par un auditeur.</li>
          <li>Contrôle complet basé sur la réglementation hygiène/HACCP.</li>
          <li>Remise d'un rapport clair : notation, cas critiques, plan correctif.</li>
        </ol>
        <p style="color: #6B7D77; font-size: 13px;">audit hygiène est un label privé de qualité, indépendant.
        Il ne constitue ni une certification officielle, ni un agrément d'État, ni un contrôle des services vétérinaires/DDPP.</p>
      </div>
    `,
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
