import Link from 'next/link';
import Image from 'next/image';
import { Logo } from './Logo';
import { DEPARTEMENTS, MENTION_LABEL_PRIVE } from '@/lib/constants';
import { ACTIVITES_OUVERTES } from '@/lib/vagues';

export function Footer() {
  /* Les six types d'etablissement qui portent la demande commerciale. Le reste
     du catalogue s'atteint depuis le hub /audit-hygiene, lie juste au dessus. */
  const activites = ACTIVITES_OUVERTES.slice(0, 6);
  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink text-white/80">
      <div className="container-ah grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo dark />
          <p className="mt-4 text-sm text-white/60">
            Audit hygiène & HACCP pour restaurants et CHR en Île-de-France.
          </p>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold text-white">Le groupe</p>
            <p className="mt-1 text-xs text-white/60">
              audit hygiène et{' '}
              <a href="https://auditresto360.fr" target="_blank" rel="noopener" className="font-semibold text-vert hover:underline">
                auditresto360
              </a>{' '}
              font partie du même groupe. auditresto360 réalise l’audit complet du restaurant (hygiène, RH, gestion, carte, commercial).
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Le service</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><Link href="/methode" className="hover:text-vert">Notre méthode</Link></li>
            <li><Link href="/#formules" className="hover:text-vert">Formules</Link></li>
            <li><Link href="/blog" className="hover:text-vert">Blog</Link></li>
            <li><Link href="/a-propos" className="hover:text-vert">À propos</Link></li>
            <li><Link href="/faq" className="hover:text-vert">FAQ</Link></li>
            <li><Link href="/#rdv" className="hover:text-vert">Réserver un audit</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><Link href="/contact" className="hover:text-vert">Nous contacter</Link></li>
            <li><a href="mailto:contact@audithygiene.fr" className="hover:text-vert">contact@audithygiene.fr</a></li>
            <li><Link href="/#configurateur" className="hover:text-vert">Configurer mon audit</Link></li>
            <li><Link href="/#rdv" className="hover:text-vert">Demande express 48 h</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Légal</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><Link href="/mentions-legales" className="hover:text-vert">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:text-vert">Confidentialité</Link></li>
            <li><Link href="/cgv" className="hover:text-vert">CGV</Link></li>
          </ul>
        </div>
      </div>

      {/*
        Le maillage des familles programmatiques.

        Sans ce bloc, /audit-hygiene, /dossiers et /points-de-controle n'ont
        aucun lien entrant depuis le reste du site : ils ne sont atteignables
        que par le sitemap, et Google les laisse en « explorée, actuellement
        non indexée ». Les huit départements ouvrent l'accès aux communes, qui
        passaient sinon en profondeur 4.
      */}
      <div className="border-t border-white/10">
        <div className="container-ah grid gap-10 py-12 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-white">
              <Link href="/zones" className="hover:text-vert">Audit hygiène près de chez vous</Link>
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/60">
              {DEPARTEMENTS.map((d) => (
                <li key={d.slug}>
                  <Link href={`/zones/${d.slug}`} className="hover:text-vert">
                    {d.nom} ({d.code})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              <Link href="/audit-hygiene" className="hover:text-vert">Par type d&apos;établissement</Link>
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/60">
              {activites.map((a) => (
                <li key={a.slug}>
                  <Link href={`/audit-hygiene/${a.slug}`} className="hover:text-vert">
                    {a.titre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Comprendre et se préparer</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li><Link href="/dossiers" className="hover:text-vert">Les dossiers de fond</Link></li>
              <li><Link href="/points-de-controle" className="hover:text-vert">La grille de contrôle, point par point</Link></li>
              <li><Link href="/methode" className="hover:text-vert">Le déroulé d&apos;un audit</Link></li>
              <li><Link href="/faq" className="hover:text-vert">Les questions des restaurateurs</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Certification Qualiopi (formulation officielle obligatoire) */}
      <div className="border-t border-white/10">
        <div className="container-ah flex flex-col items-start gap-3 py-6 sm:flex-row sm:items-center">
          <span className="inline-flex shrink-0 items-center rounded-lg bg-white px-3 py-2">
            <Image src="/img/qualiopi.png" alt="Certifié Qualiopi" width={633} height={338} className="h-9 w-auto" />
          </span>
          <p className="text-xs text-white/60">
            La certification qualité a été délivrée au titre de la catégorie : actions de formation.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-ah flex flex-col gap-3 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} audit hygiène. Tous droits réservés.</p>
          <p className="max-w-2xl">{MENTION_LABEL_PRIVE}</p>
        </div>
      </div>
    </footer>
  );
}
