import Link from 'next/link';
import Image from 'next/image';
import { Logo } from './Logo';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink text-white/80">
      <div className="container-ah grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo dark />
          <p className="mt-4 text-sm text-white/60">
            Audit hygiène & HACCP pour restaurants et CHR en France.
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
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><a href="mailto:contact@audithygiene.fr" className="hover:text-vert">contact@audithygiene.fr</a></li>
            <li><Link href="/#configurateur" className="hover:text-vert">Configurer mon audit</Link></li>
            <li><Link href="/#rdv" className="hover:text-vert">Demande express 48 h</Link></li>
            <li className="text-white/40">Intervention partout en France</li>
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
