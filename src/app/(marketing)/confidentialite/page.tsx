import type { Metadata } from 'next';
import { LegalLayout } from '@/components/site/LegalLayout';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: "Comment audit hygiène traite vos données personnelles (RGPD).",
  alternates: { canonical: '/confidentialite' },
  robots: { index: false, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <p>
        audit hygiène accorde une grande importance à la protection de vos données personnelles,
        conformément au Règlement Général sur la Protection des Données (RGPD).
      </p>
      <h2>Données collectées</h2>
      <p>
        Via le formulaire de demande d'audit : nom, email, téléphone, ville/département, type
        d'établissement, et tout message que vous nous transmettez. Ces données sont strictement
        nécessaires au traitement de votre demande.
      </p>
      <h2>Finalités</h2>
      <p>
        Vous recontacter au sujet de votre demande, organiser un audit, et - uniquement avec votre
        consentement - vous envoyer des informations utiles.
      </p>
      <h2>Base légale</h2>
      <p>
        Exécution de mesures précontractuelles (votre demande) et, pour le marketing, votre
        consentement explicite.
      </p>
      <h2>Durée de conservation</h2>
      {/* Durees alignees sur les recommandations de la CNIL et sur les
          obligations comptables. A revoir si le perimetre de traitement change. */}
      <p>
        Vos données ne sont pas conservées au-delà de ce qui est nécessaire. Les demandes de
        contact restées sans suite sont supprimées au bout de trois ans à compter du dernier
        échange. Les dossiers d&apos;audit, rapports et photographies compris, sont conservés
        cinq ans après la fin de la relation contractuelle, durée qui correspond à la
        prescription de droit commun et permet de justifier de la prestation réalisée. Les pièces
        comptables et les factures sont conservées dix ans, conformément à l&apos;article
        L. 123-22 du code de commerce.
      </p>
      <p>
        Les photographies prises pendant un audit ne servent qu&apos;à documenter le rapport et le
        plan d&apos;action. Elles ne sont ni publiées, ni transmises à un tiers, et sont
        supprimées avant terme sur simple demande de votre part.
      </p>
      <h2>Destinataires & sous-traitants</h2>
      <p>
        Vos données sont traitées par audit hygiène et ses prestataires techniques (hébergement
        Vercel, base de données et stockage Supabase, envoi d'emails Brevo), dans le cadre de leurs
        services et sous garanties contractuelles.
      </p>
      <h2>Vos droits</h2>
      <p>
        Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de
        portabilité. Pour les exercer : contact@audithygiene.fr. Vous pouvez aussi saisir la CNIL.
      </p>
      <h2>Cookies</h2>
      <p>
        Aucun cookie non essentiel n'est déposé sans votre consentement. Vous pouvez accepter ou
        refuser via le bandeau dédié.
      </p>
    </LegalLayout>
  );
}
