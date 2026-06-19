import { GRILLE_AUDIT, GRILLE_VERSION } from '@/lib/grille-audit';
import { env } from '@/lib/env';

export const dynamic = 'force-dynamic';

async function getAudits() {
  if (!env.isDatabaseConfigured) return null;
  try {
    const { prisma } = await import('@/lib/prisma');
    return prisma.audit.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { establishment: true },
    });
  } catch {
    return null;
  }
}

export default async function AuditsPage() {
  const audits = await getAudits();
  const nbItems = GRILLE_AUDIT.reduce((n, t) => n + t.items.length, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Audits</h1>
      <p className="mt-1 text-ink/60">Audits réalisés et grille de référence.</p>

      <section className="mt-6 rounded-2xl border border-ink/10 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ink">Grille d'audit</h2>
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

      <section className="mt-6">
        <h2 className="font-semibold text-ink">Audits réalisés</h2>
        {!audits ? (
          <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">Base non connectée.</p>
        ) : audits.length === 0 ? (
          <p className="mt-3 text-ink/60">Aucun audit réalisé. L'outil de saisie terrain est à finaliser (TODO).</p>
        ) : (
          <ul className="mt-3 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
            {audits.map((a) => (
              <li key={a.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="font-medium text-ink">{a.establishment.nom}</div>
                  <div className="text-sm text-gris">{a.dateAudit?.toLocaleDateString('fr-FR') ?? '-'} · {a.statut}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-ink">{a.scoreGlobal ?? '-'}<span className="text-sm text-gris">/100</span></div>
                  {a.nbCasCritiques > 0 && <div className="text-xs font-medium text-amber-700">{a.nbCasCritiques} cas critique(s)</div>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
