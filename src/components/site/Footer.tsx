import Link from 'next/link';
import { Logo } from './Logo';
import { MENTION_LABEL_PRIVE, DEPARTEMENTS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink text-white/80">
      <div className="container-ah grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo dark />
          <p className="mt-4 text-sm text-white/60">
            Audit hygiène & HACCP pour restaurants et CHR en Île-de-France.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Le service</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><Link href="/#deroule" className="hover:text-vert">Comment ça marche</Link></li>
            <li><Link href="/#formules" className="hover:text-vert">Formules</Link></li>
            <li><Link href="/#faq" className="hover:text-vert">FAQ</Link></li>
            <li><Link href="/#rdv" className="hover:text-vert">Réserver un audit</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Zones</h3>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/60">
            {DEPARTEMENTS.map((d) => (
              <li key={d.code}>
                <Link href={`/zones/${d.slug}`} className="hover:text-vert">{d.nom}</Link>
              </li>
            ))}
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

      <div className="border-t border-white/10">
        <div className="container-ah flex flex-col gap-3 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} audit hygiène. Tous droits réservés.</p>
          <p className="max-w-2xl">{MENTION_LABEL_PRIVE}</p>
        </div>
      </div>
    </footer>
  );
}
