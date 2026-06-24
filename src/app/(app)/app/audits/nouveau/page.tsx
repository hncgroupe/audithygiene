import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentDbUser } from '@/lib/auth';
import { NewAuditForm } from '@/components/app/NewAuditForm';

export const dynamic = 'force-dynamic';

export default async function NouvelAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const user = await getCurrentDbUser();
  if (!user) redirect('/login');

  const { type } = await searchParams;
  const marque = type === 'AUDITRESTO360' ? 'AUDITRESTO360' : type === 'AUDIT_HYGIENE' ? 'AUDIT_HYGIENE' : null;

  // Type déjà choisi → formulaire établissement.
  if (marque) {
    return <NewAuditForm marqueInitiale={marque} />;
  }

  // Écran de choix du type d'audit.
  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col">
      <div className="border-b border-ink/8 bg-white">
        <div className="container-ah flex items-center gap-3 py-2.5">
          <Link href="/app/audits" className="text-sm text-gris hover:text-ink" aria-label="Retour">
            ←
          </Link>
          <div>
            <h1 className="text-base font-bold tracking-tight text-ink">Démarrer un audit</h1>
            <p className="text-xs text-gris">Choisissez le type d&apos;audit.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="w-full max-w-lg">
          <h2 className="text-center text-lg font-bold text-ink">Quel audit voulez-vous lancer ?</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/app/audits/nouveau?type=AUDIT_HYGIENE"
              className="group rounded-2xl border-2 border-ink/12 bg-white p-5 text-left transition-all hover:border-vert hover:shadow-card active:scale-[0.99]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-vert-50 text-xl">🧪</span>
              <span className="mt-3 block text-base font-bold text-ink">audit hygiène</span>
              <span className="mt-1 block text-sm text-gris">Hygiène &amp; HACCP, notation conformité.</span>
              <span className="mt-3 inline-flex text-sm font-semibold text-vert-700 group-hover:text-vert-800">Choisir →</span>
            </Link>

            <Link
              href="/app/audits/nouveau?type=AUDITRESTO360"
              className="group rounded-2xl border-2 border-ink/12 bg-white p-5 text-left transition-all hover:border-[#F97316] hover:shadow-card active:scale-[0.99]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-50 text-xl">🎯</span>
              <span className="mt-3 block text-base font-bold text-ink">auditresto360</span>
              <span className="mt-1 block text-sm text-gris">Audit 360, 10 piliers notés /100.</span>
              <span className="mt-3 inline-flex text-sm font-semibold text-[#C2410C] group-hover:text-[#9A3412]">Choisir →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
