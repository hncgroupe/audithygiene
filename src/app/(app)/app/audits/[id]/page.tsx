import { notFound, redirect } from 'next/navigation';
import { getCurrentDbUser } from '@/lib/auth';
import { AuditWizard, type WizardItem } from '@/components/app/AuditWizard';
import { grilleByCode, MOTIFS_PAR_CODE } from '@/lib/grille-audit';
import { getSignedUrl } from '@/lib/supabase';
import type { Conformite } from '@/lib/notation';

export const dynamic = 'force-dynamic';

export default async function AuditPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDbUser();
  if (!user) redirect('/login');

  const { id } = await params;
  const { prisma } = await import('@/lib/prisma');

  const audit = await prisma.audit.findUnique({
    where: { id },
    include: { establishment: true, items: true },
  });
  if (!audit) notFound();

  const grille = grilleByCode();

  const sorted = audit.items
    .slice()
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const items: WizardItem[] = await Promise.all(
    sorted.map(async (it) => {
      const g = grille.get(it.code);
      const photos = await Promise.all(
        it.photoUrls.map(async (path) => ({
          path,
          url: await getSignedUrl(path, 60 * 60 * 8),
          status: 'done' as const,
        }))
      );
      return {
        code: it.code,
        theme: it.theme,
        intitule: it.intitule,
        explication: g?.explication ?? '',
        pedagogie: g?.pedagogie ?? '',
        ponderation: it.ponderation,
        photoConseillee: g?.photoConseillee,
        conformite: it.conformite as Conformite,
        commentaire: it.commentaire,
        constats: g?.constats ?? [],
        motifs: MOTIFS_PAR_CODE[it.code] ?? [],
        photos,
      };
    })
  );

  return (
    <AuditWizard
      auditId={audit.id}
      etablissement={{
        nom: audit.establishment.nom,
        ville: audit.establishment.ville,
        type: audit.establishment.type,
      }}
      statutInitial={audit.statut}
      items={items}
    />
  );
}
