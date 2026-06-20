import type { Metadata } from 'next';
import Link from 'next/link';
import { DEPARTEMENTS } from '@/lib/constants';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export const metadata: Metadata = {
  title: "Audit hygiène restaurant en France - toutes nos zones",
  description:
    "audit hygiène intervient dans toute la France : Paris, 92, 93, 94, 77, 78, 91, 95. Trouvez votre département pour un audit hygiène et HACCP de votre restaurant.",
  alternates: { canonical: '/zones' },
};

export default function ZonesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Zones', url: `${siteUrl}/zones` },
        ])}
      />
      <section className="container-ah py-16">
        <p className="eyebrow">France</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Audit hygiène restaurant partout en France
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/70">
          Nos auditeurs se déplacent dans les huit départements franciliens. Sélectionnez votre
          zone pour en savoir plus.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEPARTEMENTS.map((d) => (
            <Link
              key={d.code}
              href={`/zones/${d.slug}`}
              className="group rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition hover:border-vert/40"
            >
              <span className="text-sm font-semibold text-vert-700">{d.code}</span>
              <h2 className="mt-1 text-lg font-bold text-ink group-hover:text-vert-700">{d.nom}</h2>
              <p className="mt-2 text-sm text-ink/60">{d.villes.slice(0, 3).join(', ')}…</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
