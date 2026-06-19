import { env } from './env';

/**
 * Envoi d'une notification Telegram. Échec non bloquant (try/catch côté appelant
 * ou via le retour boolean). Voir skill telegram-automation.
 */
export async function notifyTelegram(message: string): Promise<boolean> {
  if (!env.telegramBotToken || !env.telegramChatId) {
    console.warn('[telegram] Token ou chat_id manquant — notification ignorée.');
    return false;
  }
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: env.telegramChatId,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    );
    if (!res.ok) {
      console.error('[telegram] échec envoi', await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error('[telegram] exception', e);
    return false;
  }
}

/** Message formaté pour un nouveau lead. */
export function formatLeadMessage(lead: {
  nom: string;
  ville?: string | null;
  typeEtablissement?: string | null;
  formule?: string | null;
  besoin?: string | null;
}): string {
  return [
    '🟢 <b>Nouveau lead — audit hygiène</b>',
    `👤 ${lead.nom}`,
    lead.ville ? `📍 ${lead.ville}` : null,
    lead.typeEtablissement ? `🍽️ ${lead.typeEtablissement}` : null,
    lead.besoin ? `⏱️ ${lead.besoin}` : null,
    lead.formule ? `📦 ${lead.formule}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}
