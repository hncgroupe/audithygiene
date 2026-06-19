import { env } from '@/lib/env';

export const dynamic = 'force-dynamic';

async function getEtablissements() {
  if (!env.isDatabaseConfigured) return null;
  try {
    const { prisma } = await import('@/lib/prisma');
    return prisma.establishment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { client: true, _count: { select: { audits: true } } },
    });
  } catch {
    return null;
  }
}

export default async function EtablissementsPage() {
  const etabs = await getEtablissements();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Établissements</h1>
      <p className="mt-1 text-ink/60">Clients et établissements suivis, avec leur historique d'audits.</p>

      {!etabs ? (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">Base non connectée.</p>
      ) : etabs.length === 0 ? (
        <p className="mt-6 text-ink/60">Aucun établissement enregistré pour le moment.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {etabs.map((e) => (
            <div key={e.id} className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
              <div className="font-semibold text-ink">{e.nom}</div>
              <div className="text-sm text-gris">{[e.ville, e.departement].filter(Boolean).join(' · ') || '—'}</div>
              <div className="mt-3 text-xs text-gris">Client : {e.client.nom}</div>
              <div className="mt-1 text-xs text-vert-700">{e._count.audits} audit(s)</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
