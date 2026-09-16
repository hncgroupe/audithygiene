import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentDbUser } from '@/lib/auth';
import { getSignedUrl } from '@/lib/supabase';
import {
  calculerRapportResto360,
  detailPiliers,
  type ItemNote,
} from '@/lib/rapport-resto360';
import { genererRestitutionTemplate } from '@/lib/restitution-template';
import { PrintButton } from '@/components/app/PrintButton';
import { SendReportButton } from '@/components/app/SendReportButton';
import { Resto360RapportDocument } from '@/components/app/Resto360RapportDocument';
import { RapportHygieneDocument } from '@/components/app/RapportHygieneDocument';
import {
  assemblerRapportHygiene,
  LIBELLE_TYPE_ETABLISSEMENT,
  type RapportItemEntree,
} from '@/lib/rapport-hygiene';
import type { Conformite } from '@/lib/notation';

export const dynamic = 'force-dynamic';

export default async function RapportResto360Page({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDbUser();
  if (!user) redirect('/login');

  const { id } = await params;
  const { prisma } = await import('@/lib/prisma');
  const audit = await prisma.audit.findUnique({
    where: { id },
    include: { establishment: true, items: true, auditeur: true },
  });
  if (!audit) notFound();

  // Marque audit hygiène : rapport conformité (notation, points à corriger, détail).
  if (audit.marque === 'AUDIT_HYGIENE') {
    const entrees: RapportItemEntree[] = await Promise.all(
      audit.items
        .slice()
        .sort((x, y) => x.createdAt.getTime() - y.createdAt.getTime())
        .map(async (it) => ({
          code: it.code,
          theme: it.theme,
          intitule: it.intitule,
          referenceRegl: it.referenceRegl,
          conformite: it.conformite as Conformite,
          ponderation: it.ponderation,
          commentaire: it.commentaire,
          photos: (
            await Promise.all(it.photoUrls.map((path) => getSignedUrl(path, 60 * 60 * 8)))
          )
            .filter((u): u is string => Boolean(u))
            .map((url) => ({ url })),
        }))
    );

    const dateHygiene = (audit.dateAudit ?? audit.createdAt).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return (
      <div className="fixed inset-0 z-30 overflow-y-auto bg-white print:static print:overflow-visible">
        <div className="sticky top-0 z-10 border-b border-ink/[0.07] bg-white/85 px-4 py-2.5 backdrop-blur print:hidden">
          <div className="mx-auto flex max-w-[780px] items-center justify-between">
            <Link href={`/app/audits/${id}`} className="text-sm text-gris hover:text-ink">
              Retour à l&apos;audit
            </Link>
            <div className="flex items-center gap-2">
              <PrintButton className="rounded-full px-4 py-2 text-sm text-gris transition-colors hover:bg-ink/5 hover:text-ink" />
              <a
                href={`/app/audits/${id}/rapport/pdf`}
                className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Télécharger le PDF
              </a>
            </div>
          </div>
        </div>

        <RapportHygieneDocument
          etablissement={audit.establishment.nom}
          adresse={audit.establishment.adresse}
          ville={audit.establishment.ville}
          type={LIBELLE_TYPE_ETABLISSEMENT[audit.establishment.type] ?? null}
          date={dateHygiene}
          reference={`AH-${audit.id.slice(-6).toUpperCase()}`}
          auditeur={audit.auditeur.name}
          grilleVersion={audit.grilleVersion}
          rapport={assemblerRapportHygiene(entrees)}
        />
      </div>
    );
  }

  if (audit.marque !== 'AUDITRESTO360') redirect(`/app/audits/${id}`);

  const items: ItemNote[] = await Promise.all(
    audit.items.map(async (it) => ({
      code: it.code,
      theme: it.theme,
      groupe: it.groupe,
      intitule: it.intitule,
      note: it.note,
      commentaire: it.commentaire,
      photos: (
        await Promise.all(it.photoUrls.map((path) => getSignedUrl(path, 60 * 60 * 8)))
      ).filter((u): u is string => Boolean(u)),
    }))
  );
  const r = calculerRapportResto360(items);
  const restitution = genererRestitutionTemplate(audit.establishment.nom, items);
  const details = detailPiliers(items);
  const logoUrl = audit.establishment.logoUrl
    ? await getSignedUrl(audit.establishment.logoUrl, 60 * 60 * 8)
    : null;

  const dateStr = audit.dateAudit
    ? new Date(audit.dateAudit).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const ref = `R360-${audit.id.slice(-6).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto bg-ink/10 print:static print:overflow-visible print:bg-white">
      {/* Barre d'actions (écran seulement) */}
      <div className="sticky top-0 z-10 border-b border-ink/10 bg-white px-4 py-2.5 print:hidden">
        <div className="mx-auto flex max-w-[820px] items-center justify-between">
          <Link href="/app/audits" className="text-sm text-gris hover:text-ink">
            ← Tous les audits
          </Link>
          <div className="flex gap-2">
            <Link href={`/app/audits/${id}`} className="btn-ghost text-sm">
              Modifier
            </Link>
            <SendReportButton
              auditId={id}
              className="rounded-full border border-[#F97316] px-5 py-2.5 text-sm font-semibold text-[#F97316] transition-all hover:bg-orange-50 active:scale-[0.98] disabled:opacity-60"
            />
            <PrintButton className="rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]" />
          </div>
        </div>
      </div>

      <Resto360RapportDocument
        etablissement={{
          nom: audit.establishment.nom,
          adresse: audit.establishment.adresse,
          ville: audit.establishment.ville,
          type: audit.establishment.type,
          logoUrl,
        }}
        dateStr={dateStr}
        reference={ref}
        r={r}
        restitution={restitution}
        details={details}
      />
    </div>
  );
}
