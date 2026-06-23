import Link from 'next/link';
import { GRILLE_AUDIT, GRILLE_VERSION } from '@/lib/grille-audit';
import { env } from '@/lib/env';
import { getCurrentDbUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function getAudits() {
  if (!env.isDatabaseConfigured) return null;
  const user = await getCurrentDbUser();
  if (!user) return null;
  try {
    const { prisma } = await import('@/lib/prisma');
    return prisma.audit.findMany({
      // Un auditeur ne voit que ses audits ; un ADMIN voit tout.
      where: user.role === 'ADMIN' ? undefined : { auditeurId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { establishment: true },
    });
  } catch {
    return null;
  }
}

const STATUT_LABEL: Record<string, string> = {
  PLANIFIE: 'Planifié',
  EN_COURS: 'En cours',
  TERMINE: 'Terminé',
  RAPPORT_ENVOYE: 'Rapport envoyé',
};

export default async function AuditsPage() {
  const audits = await getAudits();
  const nbItems = GRILLE_AUDIT.reduce((n, t) => n + t.items.length, 0);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Audits</h1>
          <p className="mt-1 text-ink/60">Conduisez un audit terrain, suivez la notation en direct.</p>
        </div>
        <Link href="/app/audits/nouveau" className="btn-primary">
          Démarrer un audit
        </Link>
      </div>

      <section className="mt-8">
        <h2 className="font-semibold text-ink">Audits</h2>
        {!audits ? (
          <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">Base non connectée.</p>
        ) : audits.length === 0 ? (
          <p className="mt-3 text-ink/60">Aucun audit. Démarrez le premier ci-dessus.</p>
        ) : (
          <ul className="mt-3 divide-y divide-ink/10 overflow-hidden rounded-2xl border border-ink/10 bg-white">
            {audits.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/app/audits/${a.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-vert-50/40"
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium text-ink">{a.establishment.nom}</div>
                    <div className="text-sm text-gris">
                      {a.dateAudit?.toLocaleDateString('fr-FR') ?? '-'} · {STATUT_LABEL[a.statut] ?? a.statut}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold tabular-nums text-ink">
                      {a.scoreGlobal ?? '-'}
                      <span className="text-sm text-gris">/100</span>
                    </div>
                    {a.nbCasCritiques > 0 && (
                      <div className="text-xs font-semibold text-red-700">
                        {a.nbCasCritiques} cas critique{a.nbCasCritiques > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10 rounded-2xl border border-ink/10 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ink">Grille de référence</h2>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
            {GRILLE_VERSION} · à valider
          </span>
        </div>
        <p className="mt-2 text-sm text-ink/60">
          {GRILLE_AUDIT.length} thèmes · {nbItems} items. Chaque item doit être rattaché à un point
          réglementaire validé avant usage en production.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {GRILLE_AUDIT.map((t) => (
            <div key={t.theme} className="rounded-xl border border-ink/10 px-4 py-3">
              <div className="text-sm font-medium text-ink">{t.theme}</div>
              <div className="text-xs text-gris">{t.items.length} items</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
