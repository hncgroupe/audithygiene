/**
 * La page d'une commune.
 *
 * Elle n'existe que si la commune est dans la vague ouverte : hors vague, pas
 * de generation, donc un 404 franc, et aucun lien interne qui pointe dessus.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { commune, dep, depSlug, nombre, urlCommune } from '@/lib/communes';
import { contenuCommune } from '@/lib/contenu-commune';
import { communeOuverte, COMMUNES_OUVERTES } from '@/lib/vagues';
import { DEPARTEMENTS, MENTION_LABEL_PRIVE } from '@/lib/constants';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema, faqSchema, localBusinessSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audithygiene.fr';

export function generateStaticParams() {
  return COMMUNES_OUVERTES.map((c) => ({
    departement: depSlug(c.departement),
    commune: c.slug,
  }));
}

/* Une commune qui change de departement dans l'URL ne doit pas exister deux
   fois : on n'accepte que le couple exact. */
function trouver(departement: string, slug: string) {
  const c = commune(slug);
  if (!c || !communeOuverte(c.slug) || depSlug(c.departement) !== departement) return undefined;
  return c;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ departement: string; commune: string }>;
}): Promise<Metadata> {
  const { departement, commune: slug } = await params;
  const c = trouver(departement, slug);
  if (!c) return {};
  const url = `${siteUrl}${urlCommune(c)}`;
  const titre = `Audit hygiène restaurant ${c.nom} (${c.codePostal})`;
  return {
    title: `${titre} : rapport et plan d'action`,
    description: `Audit hygiène et HACCP à ${c.nom} : un auditeur contrôle sur place tous les points réglementaires, en toute discrétion, et vous remet un rapport complet avec son plan d'action. Contre-visite comprise.`,
    alternates: { canonical: urlCommune(c) },
    openGraph: {
      title: titre,
      description: `Audit sur place à ${c.nom}, rapport complet et plan d'action priorisé.`,
      url,
    },
  };
}

export default async function CommunePage({
  params,
}: {
  params: Promise<{ departement: string; commune: string }>;
}) {
  const { departement, commune: slug } = await params;
  const c = trouver(departement, slug);
  if (!c) notFound();

  const contenu = contenuCommune(c);
  const departementNom = DEPARTEMENTS.find((d) => d.code === c.departement)?.nom || c.departement;
  const url = `${siteUrl}${urlCommune(c)}`;

  return (
    <>
      <JsonLd data={localBusinessSchema({ areaServed: `${c.nom}, ${c.codePostal}, France`, url })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', url: siteUrl },
          { name: 'Zones', url: `${siteUrl}/zones` },
          { name: departementNom, url: `${siteUrl}/zones/${departement}` },
          { name: c.nom, url },
        ])}
      />
      <JsonLd data={faqSchema(contenu.faq.map((f) => ({ q: f.question, a: f.reponse })))} />

      <section className="bg-gradient-to-b from-vert-50 to-white">
        <div className="container-ah py-16">
          <nav className="text-sm text-gris" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-vert-700">
              Accueil
            </Link>{' '}
            /{' '}
            <Link href="/zones" className="hover:text-vert-700">
              Zones
            </Link>{' '}
            /{' '}
            <Link href={`/zones/${departement}`} className="hover:text-vert-700">
              {departementNom}
            </Link>{' '}
            / <span className="text-ink/70">{c.nom}</span>
          </nav>

          <p className="eyebrow mt-6">
            {c.nom} · {c.codePostal} · {departementNom}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Audit hygiène pour les restaurants de {c.nom}
          </h1>

          {/* La reponse directe, en tete : c'est elle que les moteurs citent. */}
          <p className="mt-4 max-w-3xl text-lg text-ink/80">{contenu.reponse}</p>
          <p className="mt-4 max-w-3xl text-ink/70">{contenu.ouverture}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#rdv" className="btn-primary">
              Faire auditer mon établissement à {c.nom}
            </Link>
            <Link
              href="/methode"
              className="inline-flex items-center rounded-lg border border-ink/15 px-5 py-3 font-medium text-ink hover:border-vert-700 hover:text-vert-700"
            >
              Voir la méthode
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {contenu.promesses.map((p) => (
              <li
                key={p}
                className="rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-medium text-vert-700 ring-1 ring-inset ring-vert-200"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Les chiffres de la commune, en tete : ce sont eux qui distinguent cette
          page de toutes les autres, et ce que le lecteur verifie en premier. */}
      <section className="border-y border-ink/10 bg-white">
        <div className="container-ah grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          {contenu.reperes.map((r) => (
            <div key={r.libelle}>
              <p className="text-3xl font-bold tabular-nums text-vert-700">{r.valeur}</p>
              <p className="mt-1 text-sm leading-snug text-gris">{r.libelle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-ah py-14">
        <h2 className="text-2xl font-bold text-ink">
          Les établissements de bouche recensés à {c.nom}
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <caption className="sr-only">
              Établissements en activité à {c.nom} par type, source SIRENE
            </caption>
            <thead>
              <tr className="border-b border-ink/10 text-gris">
                <th scope="col" className="py-2 font-medium">
                  Type d&apos;établissement
                </th>
                <th scope="col" className="py-2 text-right font-medium">
                  En activité
                </th>
                <th scope="col" className="py-2 text-right font-medium">
                  Part
                </th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {contenu.tableau.map((l) => (
                <tr key={l.libelle} className="border-b border-ink/5">
                  <td className="py-2 text-ink/80">{l.libelle}</td>
                  <td className="py-2 text-right text-ink">{nombre(l.nombre)}</td>
                  <td className="py-2 text-right text-gris">{l.part} %</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-2 text-ink">Total</td>
                <td className="py-2 text-right text-ink">{nombre(c.total)}</td>
                <td className="py-2 text-right text-gris">100 %</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-gris">
          Source : base SIRENE, établissements en activité, relevés par code commune.
        </p>
      </section>

      {contenu.sections.map((bloc) => (
        <section key={bloc.titre} className="container-ah py-8">
          <div
            className={
              bloc.accent
                ? 'rounded-2xl border border-vert-200 bg-vert-50 p-8 sm:p-10'
                : undefined
            }
          >
            <h2 className="text-2xl font-bold tracking-tight text-ink">{bloc.titre}</h2>
            {bloc.paragraphes.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 max-w-3xl text-ink/70">
                {p}
              </p>
            ))}

            {bloc.sous && (
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {bloc.sous.map((sc) => (
                  <div
                    key={sc.titre}
                    className="rounded-xl border border-ink/10 bg-white p-6 transition hover:border-vert-300"
                  >
                    <h3 className="font-semibold text-ink">{sc.titre}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{sc.texte}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="container-ah py-14">
        <h2 className="text-2xl font-bold text-ink">Questions fréquentes à {c.nom}</h2>
        <dl className="mt-6 max-w-3xl divide-y divide-ink/10">
          {contenu.faq.map((f) => (
            <div key={f.question} className="py-5">
              <dt className="font-semibold text-ink">{f.question}</dt>
              <dd className="mt-2 text-ink/70">{f.reponse}</dd>
            </div>
          ))}
        </dl>
      </section>

      {contenu.voisines.length > 0 && (
        <section className="container-ah py-8">
          <h2 className="text-2xl font-bold text-ink">Autour de {c.nom}</h2>
          <p className="mt-3 text-ink/70">
            Le cabinet intervient partout en Île-de-France, {dep(c.departement, 'dans')} comme dans
            les sept autres départements.
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {contenu.voisines.map((v) => (
              <li key={v.slug}>
                <Link
                  href={v.url}
                  className="inline-block rounded-full border border-ink/10 px-4 py-2 text-sm text-ink/80 hover:border-vert-700 hover:text-vert-700"
                >
                  {v.nom} <span className="text-gris">{v.km} km</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/zones/${departement}`}
                className="inline-block rounded-full border border-ink/10 px-4 py-2 text-sm text-ink/80 hover:border-vert-700 hover:text-vert-700"
              >
                Toutes les communes {dep(c.departement, 'de')}
              </Link>
            </li>
          </ul>
        </section>
      )}

      <section className="container-ah pb-6 pt-8">
        <div className="rounded-2xl bg-ink p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white">
            Faites le point sur votre établissement à {c.nom}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Un échange de quelques minutes suffit à caler la visite. Devis avant intervention,
            sans engagement.
          </p>
          <Link href="/#rdv" className="btn-primary mt-6">
            Réserver un audit à {c.nom}
          </Link>
        </div>
      </section>

      <section className="container-ah pb-16">
        <p className="max-w-3xl text-sm text-gris">{MENTION_LABEL_PRIVE}</p>
      </section>
    </>
  );
}
