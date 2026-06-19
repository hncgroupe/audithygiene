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
      <p>{/* TODO : durées à valider */}Durées de conservation : <em>à préciser (TODO)</em>. Vos données ne sont pas conservées au-delà du nécessaire.</p>
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
