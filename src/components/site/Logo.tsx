import Link from 'next/link';
import Image from 'next/image';

/**
 * Logo audit hygiène (fichiers de marque dans /public).
 * - clair (défaut) : logo complet horizontal (icône + wordmark).
 * - dark : icône + wordmark blanc, pour fonds sombres (footer) où le "audit" noir
 *   serait invisible.
 */
export function Logo({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  if (dark) {
    return (
      <Link
        href="/"
        className={`inline-flex items-center ${className}`}
        aria-label="audit hygiène, accueil"
      >
        <Image src="/logo-blanc.png" alt="audit hygiène" width={500} height={100} className="h-9 w-auto" />
      </Link>
    );
  }
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="audit hygiène, accueil">
      <Image
        src="/logo-wordmark.png"
        alt="audit hygiène"
        width={500}
        height={100}
        priority
        className="h-[34px] w-auto"
      />
    </Link>
  );
}
