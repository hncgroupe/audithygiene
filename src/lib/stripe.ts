import Stripe from 'stripe';
import { env } from './env';

/**
 * Client Stripe (mode test tant que la clé est sk_test_).
 * Le passage en mode live nécessite une validation humaine (rule validation-humaine).
 */
let stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (!env.stripeSecretKey) {
    console.warn('[stripe] clé secrète manquante — paiement indisponible.');
    return null;
  }
  if (!stripe) {
    // Version d'API : on laisse la valeur par défaut du SDK pour rester compatible.
    stripe = new Stripe(env.stripeSecretKey);
  }
  return stripe;
}

export function isStripeLive(): boolean {
  return Boolean(env.stripeSecretKey?.startsWith('sk_live_'));
}
