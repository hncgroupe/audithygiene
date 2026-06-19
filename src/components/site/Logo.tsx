import Link from 'next/link';

/**
 * Logo audit hygiène : app-icon vert arrondi + coche blanche, puis le wordmark
 * « audit » (noir) + « hygiène » (vert). Le SVG officiel fourni par le client
 * pourra remplacer l'icône inline ci-dessous.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="audit hygiène - accueil">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-vert shadow-soft">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12.5l4.2 4.2L19 7" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight">
        <span className="text-ink">audit</span>{' '}
        <span className="text-vert">hygiène</span>
      </span>
    </Link>
  );
}
