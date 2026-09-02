import Link from 'next/link';
import { FORMULES, MARQUE } from '@/lib/constants';

/**
 * Le bloc de prise de contact des pages programmatiques.
 *
 * Il existe pour une raison mesuree : sur un dossier de fond, il fallait lire
 * quatre mille deux cents mots avant de rencontrer le premier lien de contact,
 * et quatre cent soixante-dix sur une page de commune. Un lecteur qui vient de
 * recevoir un rapport defavorable ne lit pas quatre mille mots avant d'appeler,
 * il repart.
 *
 * Il se place donc juste apres la reponse directe, avant le developpement, et
 * il porte les trois choses que cherche quelqu'un qui compare : ce que ca
 * coute, ce que ca comprend, et comment demander.
 *
 * Ce qu'il ne dit jamais : une garantie de resultat a un controle officiel, un
 * delai d'intervention qui n'est pas tenu par ecrit ailleurs, ou une zone que
 * le cabinet ne couvre pas.
 */
export function DevisRapide({
  lieu,
  contexte,
}: {
  /** « à Montreuil », « en Seine-Saint-Denis ». Omis, la formule reste generale. */
  lieu?: string;
  /** Une phrase qui rattache le bloc au sujet de la page. */
  contexte?: string;
}) {
  const essentiel = FORMULES[0];
  const conformite = FORMULES[1];
  return (
    <section className="container-ah py-8">
      <div className="max-w-3xl rounded-2xl border border-vert/30 bg-vert-50/60 p-6 sm:p-8">
        <p className="eyebrow">Demander un devis</p>
        <h2 className="mt-2 text-xl font-bold text-ink sm:text-2xl">
          Faire auditer votre établissement{lieu ? ` ${lieu}` : ''}
        </h2>
        <p className="mt-3 text-ink/80">
          {contexte ??
            "Un auditeur se déplace, contrôle sur place, et vous repartez avec un rapport et un plan d'action que vous pouvez appliquer sans nous."}
        </p>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-ink/10 bg-white p-4">
            <dt className="text-sm font-semibold text-ink">{essentiel.nom}</dt>
            <dd className="mt-1 text-2xl font-bold text-ink">{essentiel.prix}</dd>
            <dd className="mt-1 text-sm text-gris">{essentiel.duree}</dd>
          </div>
          <div className="rounded-xl border border-ink/10 bg-white p-4">
            <dt className="text-sm font-semibold text-ink">{conformite.nom}</dt>
            <dd className="mt-1 text-2xl font-bold text-ink">{conformite.prix}</dd>
            <dd className="mt-1 text-sm text-gris">{conformite.duree}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-gris">
          Déplacement en Île-de-France compris. Devis établi avant toute intervention.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link href="/#rdv" className="btn-primary">
            Demander mon devis
          </Link>
          <Link href="/#configurateur" className="btn-ghost">
            Configurer mon audit
          </Link>
          <a
            href={`mailto:${MARQUE.email}`}
            className="text-sm text-ink/70 underline decoration-ink/20 underline-offset-4 hover:text-vert-700"
          >
            {MARQUE.email}
          </a>
        </div>
      </div>
    </section>
  );
}
