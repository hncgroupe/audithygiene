import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DEPARTEMENTS, FORMULES } from '@/lib/constants';
import { nombre, urlCommune } from '@/lib/communes';
import { COMMUNES_OUVERTES } from '@/lib/vagues';
import { contenuDepartement } from '@/lib/contenu-departement';
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
    title: `Audit hygiène restaurant ${dept.nom} (${dept.code})`,
    description: `Audit hygiène et HACCP pour restaurants en ${dept.nom} (${dept.code}). Un auditeur contrôle votre établissement et vous remet un rapport : notation, cas critiques, plan correctif. À partir de ${FORMULES[0].prix}, devis avant intervention.`,
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

  const communes = COMMUNES_OUVERTES.filter((c) => c.departement === dept.code);
  const contenu = contenuDepartement(dept.code, dept.nom, communes);

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
          <p className="mt-4 max-w-3xl text-lg text-ink/80">{contenu.reponse}</p>
          <p className="mt-4 max-w-2xl text-ink/70">
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

        {/* Les chiffres du departement, agreges depuis les communes relevees :
            c'est ce qu'aucune autre page du site ne porte. */}
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <caption className="sr-only">
              Établissements en activité en {dept.nom} par type, source SIRENE
            </caption>
            <thead>
              <tr className="border-b border-ink/10 text-gris">
                <th scope="col" className="py-2 font-medium">Type d&apos;établissement</th>
                <th scope="col" className="py-2 text-right font-medium">En activité</th>
                <th scope="col" className="py-2 text-right font-medium">Part</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {contenu.parActivite.map((a) => (
                <tr key={a.libelle} className="border-b border-ink/5">
                  <td className="py-2 text-ink/80">{a.libelle}</td>
                  <td className="py-2 text-right text-ink">{nombre(a.nombre)}</td>
                  <td className="py-2 text-right text-gris">{a.part} %</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-2 text-ink">Total</td>
                <td className="py-2 text-right text-ink">{nombre(contenu.total)}</td>
                <td className="py-2 text-right text-gris">100 %</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-gris">
          Source : base SIRENE, établissements en activité, relevés commune par commune.
        </p>

        {contenu.blocs.map((b) => (
          <div key={b.titre} className="mt-10">
            <h3 className="text-lg font-semibold text-ink">{b.titre}</h3>
            {b.paragraphes.map((x) => (
              <p key={x.slice(0, 40)} className="mt-3 max-w-3xl text-ink/70">{x}</p>
            ))}
          </div>
        ))}

        <h3 className="mt-10 text-lg font-semibold text-ink">
          Communes couvertes en {dept.nom}
        </h3>
        <p className="mt-2 text-sm text-gris">
          {nombre(communes.length)} communes, classées par nombre d&apos;établissements de bouche
          recensés dans la base SIRENE.
        </p>
        {/* Chaque commune ouverte reçoit ici son lien entrant : sans lui, la page
            existe mais rien ne la cite, et Google la laisse « détectée, non indexée ». */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {communes.map((c) => (
            <li key={c.slug}>
              <Link
                href={urlCommune(c)}
                className="inline-block rounded-full bg-vert-50 px-4 py-1.5 text-sm font-medium text-vert-700 hover:bg-vert-100"
              >
                {c.nom} <span className="text-gris">{nombre(c.total)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gris">
          Votre commune n&apos;est pas listée ? Nous intervenons dans l&apos;ensemble du
          département {dept.code}, et partout en Île-de-France.
        </p>
      </section>

      <Deroule />

      {/* Maillage interne : les départements se citent entre eux. Sans ça,
          certaines zones n'avaient qu'un seul lien entrant et Google ne les
          visitait pas (« Détectée, actuellement non indexée »). */}
      <section className="container-ah pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Nos autres zones d’intervention</h2>
        <ul className="mt-5 flex flex-wrap gap-3">
          {DEPARTEMENTS.filter((d) => d.slug !== dept.slug).map((d) => (
            <li key={d.slug}>
              <Link
                href={`/zones/${d.slug}`}
                className="inline-block rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-vert-700 hover:text-vert-700"
              >
                Audit d’hygiène en {d.nom}
              </Link>
            </li>
          ))}
        </ul>
      </section>

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
