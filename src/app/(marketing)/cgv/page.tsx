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
        <strong>Document préliminaire - à faire valider juridiquement avant publication.</strong>
      </p>
      <h2>1. Objet</h2>
      <p>Les présentes CGV régissent les prestations d'audit hygiène réalisées par audit hygiène pour ses clients professionnels de la restauration.</p>
      <h2>2. Prestations</h2>
      <p>Audit sur place, notation, identification des non-conformités, plan correctif et remise d'un rapport. Le périmètre exact figure au devis.</p>
      <h2>3. Prix et paiement</h2>
      {/* Aucun tarif n'est affiche ici : le prix depend de la taille de
          l'etablissement et du nombre de visites, et figure au devis accepte.
          Les modalites ci-dessous restent a faire valider par un juriste. */}
      <p>
        Les prix figurent au devis, établi avant toute intervention et accepté par le client. Ils
        s&apos;entendent en euros, hors taxes, et incluent le déplacement en Île-de-France. Le
        devis précise le périmètre audité, le nombre de visites comprises et la durée de validité
        de l&apos;offre. La prestation comprend la visite sur place et la remise du rapport ; la
        mise en oeuvre des actions correctives relève du client.
      </p>
      <p>
        La facture est émise après la visite et payable à trente jours, sauf mention contraire au
        devis. Un acompte peut être demandé pour une première intervention ou pour une prestation
        récurrente ; son montant est alors indiqué au devis. Conformément à l&apos;article
        L. 441-10 du code de commerce, tout retard de paiement entraîne des pénalités au taux
        d&apos;intérêt appliqué par la Banque centrale européenne majoré de dix points, ainsi
        qu&apos;une indemnité forfaitaire pour frais de recouvrement de 40 €.
      </p>
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
