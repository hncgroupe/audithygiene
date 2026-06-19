import type { Metadata } from 'next';
import { LegalLayout } from '@/components/site/LegalLayout';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: "Mentions légales du site audit hygiène.",
  alternates: { canonical: '/mentions-legales' },
  robots: { index: false, follow: true },
};

export default function MentionsPage() {
  return (
    <LegalLayout title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        {/* TODO : compléter avec les informations légales réelles */}
        audit hygiène — <em>raison sociale TODO</em>, <em>forme juridique TODO</em>, <em>SIREN/SIRET TODO</em>.
        Siège social : <em>adresse TODO</em>. Contact : contact@audithygiene.fr.
      </p>
      <h2>Directeur de la publication</h2>
      <p><em>Nom TODO.</em></p>
      <h2>Hébergement</h2>
      <p>Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
      <h2>Propriété intellectuelle</h2>
      <p>L'ensemble des contenus de ce site est protégé. Toute reproduction sans autorisation est interdite.</p>
      <h2>Nature du service</h2>
      <p>{MENTION_LABEL_PRIVE}</p>
    </LegalLayout>
  );
}
