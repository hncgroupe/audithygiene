/**
 * Validation et accès centralisé aux variables d'environnement.
 * Les valeurs sont lues depuis .env.local (jamais commité).
 * On ne jette pas au build si une clé optionnelle manque, mais on logue.
 */

function opt(key: string): string | undefined {
  const v = process.env[key];
  return v && v.length > 0 ? v : undefined;
}

function req(key: string): string {
  const v = opt(key);
  if (!v) {
    // En dev/preview sans clé : on ne casse pas le rendu, on signale.
    if (process.env.NODE_ENV === 'production') {
      console.warn(`[env] Variable requise manquante : ${key}`);
    }
    return '';
  }
  return v;
}

export const env = {
  siteUrl: opt('NEXT_PUBLIC_SITE_URL') ?? 'https://audithygiene.fr',
  appUrl: opt('NEXT_PUBLIC_APP_URL') ?? 'https://app.audithygiene.fr',

  // Supabase
  supabaseUrl: opt('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: opt('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: opt('SUPABASE_SERVICE_ROLE_KEY'),
  storageBucket: opt('SUPABASE_STORAGE_BUCKET') ?? 'rapports',

  // Telegram
  telegramBotToken: opt('TELEGRAM_BOT_TOKEN'),
  telegramChatId: opt('TELEGRAM_CHAT_ID'),

  // Brevo
  brevoApiKey: opt('BREVO_API_KEY'),
  brevoSenderEmail: opt('BREVO_SENDER_EMAIL') ?? 'contact@audithygiene.fr',
  brevoSenderName: opt('BREVO_SENDER_NAME') ?? 'audit hygiène',

  // Stripe
  stripeSecretKey: opt('STRIPE_SECRET_KEY'),
  stripeWebhookSecret: opt('STRIPE_WEBHOOK_SECRET'),

  cronSecret: opt('CRON_SECRET'),

  /** true si la config minimale (DB) est présente */
  get isDatabaseConfigured() {
    return Boolean(opt('DATABASE_URL'));
  },
};

export { req };
