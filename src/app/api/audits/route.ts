import { NextResponse } from 'next/server';
import { getCurrentDbUser } from '@/lib/auth';
import { flattenGrille, GRILLE_VERSION } from '@/lib/grille-audit';
import { GRILLE_RESTO360, GRILLE_RESTO360_VERSION, critereId, critereLabel } from '@/lib/grille-resto360';

export const runtime = 'nodejs';

interface Body {
  // Soit un établissement existant…
  establishmentId?: string;
  // …soit les infos saisies au démarrage (écran 0)
  nom?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  type?: string;
  dateHeure?: string; // ISO datetime-local
  emailRapport?: string; // compat : email unique
  emails?: string[]; // destinataires multiples du rapport
  marque?: string; // AUDIT_HYGIENE | AUDITRESTO360
}

/** Items instanciés pour un audit resto360 (un par critère + questions ouvertes). */
function itemsResto360() {
  const items: { theme: string; groupe: string; code: string; intitule: string }[] = [];
  for (const pilier of GRILLE_RESTO360) {
    pilier.groupes.forEach((g, gi) => {
      g.criteres.forEach((crit, ci) => {
        items.push({
          theme: pilier.nom,
          groupe: g.nom,
          code: critereId(pilier.code, gi, ci),
          intitule: critereLabel(crit),
        });
      });
    });
    // Questions ouvertes (pilier Dirigeant) : persistées via le commentaire.
    (pilier.questionsOuvertes ?? []).forEach((q, qi) => {
      items.push({
        theme: pilier.nom,
        groupe: 'Questions ouvertes',
        code: `${pilier.code}-Q${qi + 1}`,
        intitule: q,
      });
    });
  }
  return items;
}

const TYPES = [
  'RESTAURANT',
  'RESTAURATION_RAPIDE',
  'DARK_KITCHEN',
  'BOULANGERIE',
  'TRAITEUR',
  'HOTEL_RESTAURANT',
  'BAR',
  'AUTRE',
];

/**
 * Démarre un nouvel audit.
 * - Crée l'établissement + le client porteur (email = réception du rapport) si non fourni.
 * - Instancie tous les items de la grille (statut NON_EVALUE), en traçant la version (methodology-guard).
 */
export async function POST(request: Request) {
  const user = await getCurrentDbUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const { prisma } = await import('@/lib/prisma');

  let establishmentId = body.establishmentId;
  let emailsRapport: string[] = [];

  if (!establishmentId) {
    const nom = (body.nom ?? '').trim();
    if (!nom) return NextResponse.json({ error: 'Nom du restaurant requis.' }, { status: 400 });

    const type = TYPES.includes(body.type ?? '') ? (body.type as string) : 'RESTAURANT';

    // Destinataires du rapport : liste nettoyée + dédoublonnée
    const rawEmails = body.emails?.length ? body.emails : body.emailRapport ? [body.emailRapport] : [];
    emailsRapport = Array.from(
      new Set(
        rawEmails
          .map((e) => e.trim().toLowerCase())
          .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
      )
    );

    const client = await prisma.client.create({
      data: { nom, email: emailsRapport[0] ?? null },
    });
    const codePostal = body.codePostal?.trim() || null;
    const departement = codePostal && /^\d{2}/.test(codePostal) ? codePostal.slice(0, 2) : null;
    const etab = await prisma.establishment.create({
      data: {
        clientId: client.id,
        nom,
        type: type as never,
        adresse: body.adresse?.trim() || null,
        ville: body.ville?.trim() || null,
        codePostal,
        departement,
      },
    });
    establishmentId = etab.id;
  } else {
    const etab = await prisma.establishment.findUnique({ where: { id: establishmentId } });
    if (!etab) return NextResponse.json({ error: 'Établissement introuvable.' }, { status: 404 });
  }

  const dateAudit = body.dateHeure ? new Date(body.dateHeure) : new Date();
  const dateOk = isNaN(dateAudit.getTime()) ? new Date() : dateAudit;
  const marque = body.marque === 'AUDITRESTO360' ? 'AUDITRESTO360' : 'AUDIT_HYGIENE';

  if (marque === 'AUDITRESTO360') {
    const audit = await prisma.audit.create({
      data: {
        establishmentId,
        auditeurId: user.id,
        marque: 'AUDITRESTO360',
        grilleVersion: GRILLE_RESTO360_VERSION,
        statut: 'EN_COURS',
        dateAudit: dateOk,
        emailsRapport,
        items: {
          create: itemsResto360().map((i) => ({
            theme: i.theme,
            groupe: i.groupe,
            code: i.code,
            intitule: i.intitule,
            conformite: 'NON_EVALUE',
          })),
        },
      },
    });
    return NextResponse.json({ id: audit.id });
  }

  const items = flattenGrille();
  const audit = await prisma.audit.create({
    data: {
      establishmentId,
      auditeurId: user.id,
      marque: 'AUDIT_HYGIENE',
      grilleVersion: GRILLE_VERSION,
      statut: 'EN_COURS',
      dateAudit: dateOk,
      emailsRapport,
      items: {
        create: items.map((i) => ({
          theme: i.theme,
          code: i.code,
          intitule: i.intitule,
          referenceRegl: i.referenceRegl ?? null,
          ponderation: i.ponderation,
          conformite: 'NON_EVALUE',
        })),
      },
    },
  });

  return NextResponse.json({ id: audit.id });
}
