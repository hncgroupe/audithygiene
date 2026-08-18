import { NextResponse } from 'next/server';
import { parseLead } from '@/lib/validation';
import { env } from '@/lib/env';
import { notifyTelegram, formatLeadMessage } from '@/lib/telegram';
import { sendTransactionalEmail, leadConfirmationEmail } from '@/lib/brevo';
import { ajouterAuClasseur, celluleJson } from '@/lib/classeur';

export const runtime = 'nodejs';

/** Où partent les alertes internes de nouveau lead. */
const EMAIL_INTERNE = 'contact@audithygiene.fr';

/* ------------------------------------------------------------------
   Limite de débit par IP.

   L'endpoint est public : chaque POST accepté écrit en base et consomme un
   crédit Brevo. Le honeypot arrête les robots naïfs, pas un script qui poste
   en boucle.

   Limite : 20 requêtes par tranche de 10 minutes et par IP, en fenêtre
   glissante.

   Le plafond était à 5. Il partait du principe qu'une IP = un visiteur, ce qui
   est faux sur la cible de ce site : les restaurateurs remplissent le
   formulaire depuis leur mobile, et les opérateurs français partagent une même
   IP publique entre des milliers d'abonnés (CGNAT) ; un groupe de restaurants,
   une pépinière ou un espace de coworking sortent aussi par une IP unique. Un
   6e client réel derrière la même sortie recevait « Trop de demandes
   envoyées » sans que rien ne soit journalisé de son côté : exactement le
   refus invisible qu'on cherche à éliminer.

   20 laisse passer une pointe légitime tout en arrêtant une boucle bête.

   Fenêtre en mémoire, volontairement sans dépendance ni service externe. La
   contrepartie est connue : la mémoire appartient à une instance de fonction,
   et Vercel peut en faire tourner plusieurs en parallèle ou en recycler une à
   froid. La limite réelle est donc un plafond souple, pas une garantie. C'est
   suffisant contre une boucle bête ou un doigt lourd sur « Envoyer » ; contre
   un vrai flood distribué il faudra le pare-feu Vercel ou un captcha.
   ------------------------------------------------------------------ */
const RL_FENETRE_MS = 10 * 60 * 1000;
const RL_MAX = 20;
/** Garde-fou mémoire : au-delà, on purge les IP dont la fenêtre est expirée. */
const RL_MAX_IP = 5000;

const passages = new Map<string, number[]>();

function ipDeLaRequete(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  // Vercel place l'IP du client en tête de la liste.
  const premiere = xff?.split(',')[0]?.trim();
  return premiere || request.headers.get('x-real-ip')?.trim() || 'inconnue';
}

/** `false` quand l'IP a dépassé son quota. Ne jette jamais. */
function debitAutorise(ip: string): boolean {
  const maintenant = Date.now();
  const limite = maintenant - RL_FENETRE_MS;

  if (passages.size > RL_MAX_IP) {
    for (const [cle, dates] of passages) {
      if (!dates.some((d) => d > limite)) passages.delete(cle);
    }
  }

  const recents = (passages.get(ip) ?? []).filter((d) => d > limite);
  if (recents.length >= RL_MAX) {
    passages.set(ip, recents);
    return false;
  }
  recents.push(maintenant);
  passages.set(ip, recents);
  return true;
}

/**
 * Le récapitulatif Telegram, rendu lisible dans un email.
 *
 * Le texte vient d'un formulaire public : on neutralise tout le HTML, puis on
 * ne réautorise que le `<b>` que `formatLeadMessage` pose lui-même. Sans ça,
 * un message de visiteur pourrait injecter du balisage dans la boîte interne.
 */
function recapInterneHtml(recap: string): string {
  const corps = recap
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&lt;(\/?b)&gt;/g, '<$1>')
    .replace(/\n/g, '<br />');
  return `<div style="font-family: Poppins, Arial, sans-serif; color: #0C1B17; font-size: 15px; line-height: 1.7;">${corps}</div>`;
}

/**
 * Réception d'un lead depuis le formulaire de RDV.
 *
 * Flux : limite de débit → validation → classeur → base → Telegram → emails.
 * Chaque effet de bord reste protégé, un échec n'empêche pas les autres, mais
 * la réponse ne vaut « ok » que si au moins une copie a réellement tenu.
 */
export async function POST(request: Request) {
  const ip = ipDeLaRequete(request);
  if (!debitAutorise(ip)) {
    console.warn(`[lead] limite de débit atteinte pour ${ip}`);
    return NextResponse.json(
      { error: 'Trop de demandes envoyées. Réessayez dans quelques minutes.' },
      { status: 429, headers: { 'Retry-After': String(RL_FENETRE_MS / 1000) } },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const parsed = parseLead(raw);
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

  // Onglet dedie a ce projet dans le classeur partage.
  const ONGLET_CLASSEUR = 'audithygiene';
  // Reference courte, reprise dans le classeur et les notifications : elle
  // permet de relier une ligne du tableur au message qui l'a annoncee.
  const reference = crypto.randomUUID().slice(0, 8).toUpperCase();

  // 0. Le classeur, la seule copie qu'on saura relire et compter dans six mois.
  if (
    await ajouterAuClasseur(ONGLET_CLASSEUR, [
      new Date().toISOString(),                                  // Date
      'Audit Hygiene',                                           // Projet
      lead.source,                                               // Source
      lead.nom,                                                  // Nom
      '',                                                        // Societe (non collectee)
      lead.email ?? '',                                          // Email
      telephoneE164(lead.telephone) ?? lead.telephone ?? '',     // Telephone
      lead.message ?? '',                                        // Message
      [                                                          // Details
        [lead.besoin, lead.formule].filter(Boolean).join(' · '),
        lead.typeEtablissement ? `etablissement: ${lead.typeEtablissement}` : '',
        lead.nombreCouverts ? `couverts: ${lead.nombreCouverts}` : '',
        [lead.ville, lead.departement].filter(Boolean).join(' '),
      ].filter(Boolean).join(' | '),
      'oui',                                                     // Consentement (verifie plus haut)
      'nouveau',                                                 // Statut
      reference,                                                 // ID
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

  /* 2. Alertes internes, en parallèle et non bloquantes.

     Telegram seul était le seul canal qui prévenait l'équipe : le classeur,
     filet prévu pour ça, peut être hors service sans que personne le voie, et
     le seul email envoyé partait au lead. Un email interne double la ligne,
     avec le même récapitulatif que Telegram. */
  const recap = formatLeadMessage({
    nom: data.nom,
    email: data.email || null,
    telephone: data.telephone || null,
    ville: data.ville || data.departement || null,
    typeEtablissement: data.typeEtablissement || null,
    besoin: data.besoin || null,
    formule: data.formule || null,
    message: data.message || null,
  });
  const lieu = lead.ville || lead.departement;

  const [telegramOk, emailInterneOk] = await Promise.all([
    notifyTelegram(recap).catch(() => false),
    sendTransactionalEmail({
      to: { email: EMAIL_INTERNE, name: 'audit hygiène' },
      subject: `Nouveau lead : ${data.nom}${lieu ? ` (${lieu})` : ''}`,
      htmlContent: recapInterneHtml(recap),
    }).catch(() => false),
  ]);
  if (telegramOk) copies.push('telegram');
  if (emailInterneOk) copies.push('email-interne');

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

/**
 * Numero au format E.164. Brevo et la plupart des CRM refusent « 0600000000 ».
 * Renvoie null si le numero n'est pas exploitable, pour ne pas ecrire un faux
 * positif dans le classeur.
 */
function telephoneE164(brut?: string | null): string | null {
  let d = String(brut ?? '').replace(/[^\d+]/g, '');
  if (!d) return null;
  const plus = d.startsWith('+');
  d = d.replace(/\+/g, '');
  if (plus) return d.length >= 8 && d.length <= 15 ? `+${d}` : null;
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('33')) { const r = d.slice(2).replace(/^0+/, ''); return r.length === 9 ? `+33${r}` : null; }
  if (d.startsWith('0')) { const r = d.slice(1); return r.length === 9 ? `+33${r}` : null; }
  if (d.length === 9) return `+33${d}`;
  return d.length >= 11 && d.length <= 15 ? `+${d}` : null;
}
