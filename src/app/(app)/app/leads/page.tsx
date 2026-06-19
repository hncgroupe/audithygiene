import { env } from '@/lib/env';

export const dynamic = 'force-dynamic';

async function getLeads() {
  if (!env.isDatabaseConfigured) return null;
  try {
    const { prisma } = await import('@/lib/prisma');
    return prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  } catch {
    return null;
  }
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Leads</h1>
      <p className="mt-1 text-ink/60">Demandes reçues via le site, les plus récentes en premier.</p>

      {!leads ? (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Base non connectée - aucun lead à afficher.
        </p>
      ) : leads.length === 0 ? (
        <p className="mt-6 text-ink/60">Aucun lead pour le moment.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-ink/10 text-left text-gris">
              <tr>
                <Th>Date</Th><Th>Nom</Th><Th>Contact</Th><Th>Zone</Th><Th>Type</Th><Th>Besoin</Th><Th>Statut</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-vert-50/40">
                  <Td>{l.createdAt.toLocaleDateString('fr-FR')}</Td>
                  <Td className="font-medium text-ink">{l.nom}</Td>
                  <Td>
                    <div>{l.email}</div>
                    {l.telephone && <div className="text-gris">{l.telephone}</div>}
                  </Td>
                  <Td>{[l.ville, l.departement].filter(Boolean).join(' · ') || '-'}</Td>
                  <Td>{l.typeEtablissement ?? '-'}</Td>
                  <Td>{l.besoin ?? '-'}</Td>
                  <Td><span className="rounded-full bg-vert-50 px-2.5 py-1 text-xs font-medium text-vert-700">{l.statut}</span></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}
function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top text-ink/75 ${className}`}>{children}</td>;
}
