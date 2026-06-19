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
        className={`inline-flex items-center gap-2.5 ${className}`}
        aria-label="audit hygiène, accueil"
      >
        <Image src="/favicon.png" alt="" width={36} height={36} className="h-9 w-9 rounded-lg" />
        <span className="text-lg font-bold tracking-tight text-white">audit hygiène</span>
      </Link>
    );
  }
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="audit hygiène, accueil">
      <Image
        src="/logo.png"
        alt="audit hygiène"
        width={500}
        height={100}
        priority
        className="h-9 w-auto"
      />
    </Link>
  );
}
