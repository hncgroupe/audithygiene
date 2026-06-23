import { notFound, redirect } from 'next/navigation';
import { getCurrentDbUser } from '@/lib/auth';
import { AuditWizard, type WizardItem } from '@/components/app/AuditWizard';
import { Resto360Wizard, type Resto360Item } from '@/components/app/Resto360Wizard';
import { grilleByCode, flattenGrille, MOTIFS_PAR_CODE } from '@/lib/grille-audit';
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

  // Moteur resto360 : wizard 10 piliers (notation 1 à 5).
  if (audit.marque === 'AUDITRESTO360') {
    const r360Items: Resto360Item[] = await Promise.all(
      audit.items
        .slice()
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .map(async (it) => ({
          code: it.code,
          theme: it.theme,
          groupe: it.groupe,
          intitule: it.intitule,
          note: it.note,
          commentaire: it.commentaire,
          meta: (it.meta ?? null) as Record<string, unknown> | null,
          photos: (
            await Promise.all(
              it.photoUrls.map(async (path) => ({ path, url: await getSignedUrl(path, 60 * 60 * 8) }))
            )
          ).filter((p): p is { path: string; url: string } => Boolean(p.url)),
        }))
    );
    return (
      <Resto360Wizard
        auditId={audit.id}
        etablissement={{
          nom: audit.establishment.nom,
          ville: audit.establishment.ville,
          type: audit.establishment.type,
        }}
        items={r360Items}
        statutInitial={audit.statut}
      />
    );
  }

  const grille = grilleByCode();

  const sorted = audit.items
    .slice()
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  // Code de base pour les points ajoutés depuis la bibliothèque (suffixés -XXXX)
  const baseCode = (code: string) => code.replace(/-[A-Z0-9]{4}$/, '');

  const items: WizardItem[] = await Promise.all(
    sorted.map(async (it) => {
      const g = grille.get(it.code) ?? grille.get(baseCode(it.code));
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
        motifs: MOTIFS_PAR_CODE[it.code] ?? MOTIFS_PAR_CODE[baseCode(it.code)] ?? [],
        photos,
      };
    })
  );

  // Bibliothèque pour l'autocomplétion « Ajouter un point »
  const library = flattenGrille().map((i) => ({
    code: i.code,
    theme: i.theme,
    intitule: i.intitule,
    explication: i.explication,
    pedagogie: i.pedagogie,
    ponderation: i.ponderation,
    photoConseillee: i.photoConseillee ?? false,
    constats: i.constats,
    motifs: MOTIFS_PAR_CODE[i.code] ?? [],
  }));

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
      library={library}
    />
  );
}
