import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentDbUser } from '@/lib/auth';
import { AccesEditor } from '@/components/app/AccesEditor';

export const dynamic = 'force-dynamic';

export default async function AuditeursPage() {
  const user = await getCurrentDbUser();
  if (!user) redirect('/login');
  if (user.role !== 'ADMIN') redirect('/app');

  const { prisma } = await import('@/lib/prisma');
  const users = await prisma.user.findMany({
    orderBy: [{ active: 'desc' }, { name: 'asc' }],
    select: { id: true, name: true, email: true, role: true, acces: true, active: true },
  });

  return (
    <div>
      <div className="border-b border-ink/8 bg-white">
        <div className="container-ah flex items-center gap-3 py-2.5">
          <Link href="/app" className="text-sm text-gris hover:text-ink" aria-label="Retour">
            ←
          </Link>
          <div>
            <h1 className="text-base font-bold tracking-tight text-ink">Auditeurs</h1>
            <p className="text-xs text-gris">Définissez le périmètre d&apos;audit de chaque compte.</p>
          </div>
        </div>
      </div>

      <div className="container-ah py-5">
        <div className="overflow-hidden rounded-2xl border border-ink/8 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-ink/8 bg-ink/[0.02] text-left text-xs uppercase tracking-wide text-gris">
              <tr>
                <th className="px-4 py-3 font-semibold">Auditeur</th>
                <th className="px-4 py-3 font-semibold">Rôle</th>
                <th className="px-4 py-3 font-semibold">Périmètre d&apos;audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/8">
              {users.map((u) => (
                <tr key={u.id} className={u.active ? '' : 'opacity-50'}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-ink">{u.name}</div>
                    <div className="text-xs text-gris">{u.email}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-ink/70">{u.role === 'ADMIN' ? 'Admin' : 'Auditeur'}</td>
                  <td className="px-4 py-3">
                    <AccesEditor userId={u.id} initial={u.acces} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gris">
          « audit hygiène » : ne crée et ne voit que les audits hygiène. « auditresto360 » : uniquement les audits 360. « les deux » : accès complet. Les audits déjà réalisés sont conservés.
        </p>
      </div>
    </div>
  );
}
