import type { Metadata } from 'next';
import { LegalLayout } from '@/components/site/LegalLayout';
import { MENTION_LABEL_PRIVE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description: "Conditions générales de vente des prestations audit hygiène.",
  alternates: { canonical: '/cgv' },
  robots: { index: false, follow: true },
};

export default function CgvPage() {
  return (
    <LegalLayout title="Conditions Générales de Vente">
      <p>
        {/* TODO : CGV à faire valider par un juriste avant usage réel (skill contract-fr-prestation) */}
        <strong>Document préliminaire — à faire valider juridiquement avant publication.</strong>
      </p>
      <h2>1. Objet</h2>
      <p>Les présentes CGV régissent les prestations d'audit hygiène réalisées par audit hygiène pour ses clients professionnels de la restauration.</p>
      <h2>2. Prestations</h2>
      <p>Audit sur place, notation, identification des non-conformités, plan correctif et remise d'un rapport. Le périmètre exact figure au devis.</p>
      <h2>3. Prix et paiement</h2>
      <p><em>Modalités TODO</em> : tarifs au devis, conditions de paiement, acompte éventuel.</p>
      <h2>4. Nature du service</h2>
      <p>{MENTION_LABEL_PRIVE} Aucune garantie de résultat à un contrôle officiel n'est promise.</p>
      <h2>5. Confidentialité</h2>
      <p>Les informations recueillies lors de l'audit sont traitées de manière confidentielle.</p>
      <h2>6. Données personnelles</h2>
      <p>Le traitement des données est décrit dans la politique de confidentialité.</p>
      <h2>7. Droit applicable</h2>
      <p>Les présentes CGV sont soumises au droit français.</p>
    </LegalLayout>
  );
}
