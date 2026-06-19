import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DEPARTEMENTS } from '@/lib/constants';
import { JsonLd } from '@/components/site/JsonLd';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { Deroule } from '@/components/marketing/Deroule';
import { FAQ_ITEMS } from '@/lib/content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export function generateStaticParams() {
  return DEPARTEMENTS.map((d) => ({ departement: d.slug }));
}

function getDept(slug: string) {
  return DEPARTEMENTS.find((d) => d.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ departement: string }> }): Promise<Metadata> {
  const { departement } = await params;
  const dept = getDept(departement);
  if (!dept) return {};
  return {
    title: `Audit hygiène restaurant ${dept.nom} (${dept.code}) - HACCP`,
    description: `Audit hygiène et HACCP pour restaurants en ${dept.nom} (${dept.code}). Un auditeur contrôle votre établissement et vous remet un rapport : notation, cas critiques, plan correctif. Label privé indépendant.`,
    alternates: { canonical: `/zones/${dept.slug}` },
    openGraph: {
      title: `Audit hygiène restaurant ${dept.nom} (${dept.code})`,
      description: `Audit hygiène et HACCP pour restaurants en ${dept.nom}. Notation, cas critiques, plan correctif.`,
      url: `${siteUrl}/zones/${dept.slug}`,
    },
  };
}

export default async function DepartementPage({ params }: { params: Promise<{ departement: string }> }) {
  const { departement } = await params;
  const dept = getDept(departement);
  if (!dept) notFound();

  return (
    <>
      <JsonLd data={localBusinessSchema({ areaServed: `${dept.nom}, ${dept.code}, France`, url: `${siteUrl}/zones/${dept.slug}` })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Zones', url: `${siteUrl}/zones` },
          { name: dept.nom, url: `${siteUrl}/zones/${dept.slug}` },
        ])}
      />
      <JsonLd data={faqSchema(FAQ_ITEMS)} />

      <section className="bg-gradient-to-b from-vert-50 to-white">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">Accueil</Link> /{' '}
            <Link href="/zones" className="hover:text-vert-700">Zones</Link> /{' '}
            <span className="text-ink/70">{dept.nom}</span>
          </nav>
          <p className="eyebrow mt-6">{dept.nom} · {dept.code}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Audit hygiène pour restaurants en {dept.nom}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            Vous gérez un établissement de restauration en {dept.nom} ({dept.code}) ? audit hygiène
            envoie un auditeur sur place pour contrôler votre conformité à la réglementation
            hygiène et HACCP, et vous remet un rapport clair avec un plan correctif priorisé.
          </p>
          <div className="mt-8">
            <Link href="/#rdv" className="btn-primary">Réserver un audit en {dept.nom}</Link>
          </div>
        </div>
      </section>

      <section className="container-ah py-14">
        <h2 className="text-2xl font-bold text-ink">Un audit adapté à la restauration en {dept.nom}</h2>
        <p className="mt-4 max-w-3xl text-ink/70">
          De la petite adresse de quartier au restaurant à fort volume, nos auditeurs interviennent
          dans tout le {dept.code}. L'audit couvre l'ensemble des thèmes réglementaires : chaîne du
          froid, traçabilité et DLC, hygiène du personnel, nettoyage et désinfection, lutte contre
          les nuisibles, stockage, plan de maîtrise sanitaire, allergènes.
        </p>

        <h3 className="mt-10 text-lg font-semibold text-ink">Villes couvertes en {dept.nom}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {dept.villes.map((v) => (
            <li key={v} className="rounded-full bg-vert-50 px-4 py-1.5 text-sm font-medium text-vert-700">
              {v}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gris">
          Votre commune n'est pas listée ? Nous intervenons dans l'ensemble du département {dept.code}.
        </p>
      </section>

      <Deroule />

      <section className="container-ah pb-20">
        <div className="rounded-2xl bg-vert-50 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-ink">Prêt à faire auditer votre établissement en {dept.nom} ?</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/70">
            Réservez un créneau. Réponse rapide, sans engagement.
          </p>
          <Link href="/#rdv" className="btn-primary mt-6">Réserver un audit</Link>
        </div>
      </section>
    </>
  );
}
