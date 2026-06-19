import Link from 'next/link';
import { Logo } from './Logo';

const NAV = [
  { href: '/#deroule', label: 'Comment ça marche' },
  { href: '/#formules', label: 'Formules' },
  { href: '/zones', label: 'Zones' },
  { href: '/#faq', label: 'FAQ' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-white/90 backdrop-blur">
      <div className="container-ah flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/70 transition hover:text-vert-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/#rdv" className="btn-primary text-sm">
            Réserver un audit
          </Link>
        </div>
      </div>
    </header>
  );
}
