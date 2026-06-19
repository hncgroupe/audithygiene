import Link from 'next/link';
import { env } from '@/lib/env';

export const dynamic = 'force-dynamic';

async function getStats() {
  if (!env.isDatabaseConfigured) return null;
  try {
    const { prisma } = await import('@/lib/prisma');
    const [leads, rdv, audits, rapports] = await Promise.all([
      prisma.lead.count(),
      prisma.appointment.count(),
      prisma.audit.count(),
      prisma.report.count(),
    ]);
    return { leads, rdv, audits, rapports };
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: 'Leads', value: stats?.leads ?? '—', href: '/app/leads' },
    { label: 'Rendez-vous', value: stats?.rdv ?? '—', href: '/app/audits' },
    { label: 'Audits', value: stats?.audits ?? '—', href: '/app/audits' },
    { label: 'Rapports', value: stats?.rapports ?? '—', href: '/app/audits' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Tableau de bord</h1>
      <p className="mt-1 text-ink/60">Vue d'ensemble de l'activité audit hygiène.</p>

      {!stats && (
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Base de données non connectée. Renseignez <code>DATABASE_URL</code> dans <code>.env.local</code> pour afficher les chiffres réels.
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition hover:border-vert/40">
            <div className="text-sm text-gris">{c.label}</div>
            <div className="mt-2 text-3xl font-extrabold text-ink">{c.value}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="font-semibold text-ink">Prochaines étapes</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink/70">
          <li>Valider la grille d'audit réglementaire (voir <code>docs/REFERENCE.md</code>).</li>
          <li>Réaliser un premier audit de bout en bout et générer le rapport PDF.</li>
          <li>Brancher l'authentification Supabase (rôles admin / auditeur).</li>
        </ul>
      </div>
    </div>
  );
}
