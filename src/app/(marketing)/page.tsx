import { Hero } from '@/components/marketing/Hero';
import { Reseau } from '@/components/marketing/Reseau';
import { Configurateur } from '@/components/marketing/Configurateur';
import { TrustBar } from '@/components/marketing/TrustBar';
import { Probleme } from '@/components/marketing/Probleme';
import { Urgence } from '@/components/marketing/Urgence';
import { SavoirFaire } from '@/components/marketing/SavoirFaire';
import { ThemesAudit } from '@/components/marketing/ThemesAudit';
import { Deroule } from '@/components/marketing/Deroule';
import { Rapport } from '@/components/marketing/Rapport';
import { LeadMagnet } from '@/components/marketing/LeadMagnet';
import { StickyCta } from '@/components/marketing/StickyCta';
import { PourQui } from '@/components/marketing/PourQui';
import { Formules } from '@/components/marketing/Formules';
import { Label } from '@/components/marketing/Label';
import { Faq } from '@/components/marketing/Faq';
import { RdvForm } from '@/components/marketing/RdvForm';
import { JsonLd } from '@/components/site/JsonLd';
import { localBusinessSchema, serviceSchema, faqSchema } from '@/lib/schema';
import { FAQ_ITEMS } from '@/lib/content';

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={serviceSchema()} />
      <JsonLd data={faqSchema(FAQ_ITEMS)} />

      {/* Funnel optimisé conversion : hook → confiance → devis → peur → valeur → preuve → prix → capture → résa */}
      <Hero />
      <Reseau />
      <Configurateur />
      <TrustBar />
      <Probleme />
      <Urgence />
      <Rapport />
      <SavoirFaire />
      <Deroule />
      <ThemesAudit />
      <Formules />
      <LeadMagnet />
      <Label />
      <PourQui />

      <section id="rdv" className="container-ah scroll-mt-24 py-24">
        <div className="max-w-3xl">
          <h2 className="section-title">Réservez votre audit</h2>
          <p className="mt-4 text-lg text-ink/80">
            Configurez votre audit et laissez vos coordonnées. Un auditeur vous recontacte pour convenir d'un créneau.
          </p>
        </div>
        <div className="mt-8">
          <RdvForm />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2">
          {['Intervention partout en France', 'Rapport PDF complet à la clé', 'Plan d’action priorisé', 'Réponse rapide, sans engagement'].map((t) => (
            <span key={t} className="inline-flex items-center gap-2 text-sm font-medium text-ink/80">
              <Dot /> {t}
            </span>
          ))}
        </div>
      </section>

      <Faq />
      <StickyCta />
    </>
  );
}

function Dot() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="12" cy="12" r="11" fill="#10B981" />
      <path d="M7 12.5l3.2 3.2L17 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
