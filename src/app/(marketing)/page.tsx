import { Hero } from '@/components/marketing/Hero';
import { TrustBar } from '@/components/marketing/TrustBar';
import { Probleme } from '@/components/marketing/Probleme';
import { ThemesAudit } from '@/components/marketing/ThemesAudit';
import { Deroule } from '@/components/marketing/Deroule';
import { Rapport } from '@/components/marketing/Rapport';
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

      <Hero />
      <TrustBar />
      <Probleme />
      <ThemesAudit />
      <Deroule />
      <Rapport />
      <PourQui />
      <Formules />
      <Label />

      <section id="rdv" className="bg-ink py-20 scroll-mt-20">
        <div className="container-ah grid items-start gap-12 lg:grid-cols-2">
          <div className="text-white">
            <p className="text-sm font-semibold uppercase tracking-wide text-vert-300">Réserver</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Réservez votre audit hygiène
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Décrivez votre établissement en quelques secondes. Un auditeur vous recontacte pour
              convenir d'un créneau. Sans engagement.
            </p>
            <ul className="mt-8 space-y-3 text-white/80">
              <li className="flex items-center gap-3"><DotW /> Intervention dans toute l'Île-de-France</li>
              <li className="flex items-center gap-3"><DotW /> Rapport PDF complet à la clé</li>
              <li className="flex items-center gap-3"><DotW /> Plan correctif priorisé</li>
            </ul>
          </div>
          <RdvForm />
        </div>
      </section>

      <Faq />
    </>
  );
}

function DotW() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="12" cy="12" r="11" fill="#065F46" />
      <path d="M7 12.5l3.2 3.2L17 9" stroke="#6EE7B7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
