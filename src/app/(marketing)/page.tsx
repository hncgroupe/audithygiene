/**
 * La page d'accueil.
 *
 * Le parcours tenait en treize sections, dont trois construites sur la peur du
 * contrôle et deux qui redisaient la même chose. Un restaurateur qui arrive ici
 * est déjà inquiet : l'empiler ne le fait pas convertir, ça le fait partir.
 *
 * Il en reste six, dans l'ordre des questions qu'il se pose vraiment : qu'est-ce
 * que vous faites, comment ça se passe, qu'est-ce que je reçois, combien ça
 * coûte, comment je réserve, et les objections. Un seul bloc de conversion, en
 * bas, vers lequel pointent tous les boutons de la page.
 */
import { Hero } from '@/components/marketing/Hero';
import { TrustBar } from '@/components/marketing/TrustBar';
import { ThemesAudit } from '@/components/marketing/ThemesAudit';
import { Deroule } from '@/components/marketing/Deroule';
import { Rapport } from '@/components/marketing/Rapport';
import { Configurateur } from '@/components/marketing/Configurateur';
import { Formules } from '@/components/marketing/Formules';
import { StickyCta } from '@/components/marketing/StickyCta';
import { Faq } from '@/components/marketing/Faq';
import { Groupe } from '@/components/marketing/Groupe';
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
      <Deroule />
      <ThemesAudit />
      <Rapport />
      <Formules />

      {/* Le bloc de conversion, unique. Le configurateur cerne le besoin, le
          formulaire envoie la demande. Les deux aboutissent a /api/lead, qui
          notifie Telegram et ecrit au classeur. */}
      <section id="rdv" className="scroll-mt-24 bg-vert-50/60 py-20">
        <div className="container-ah">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title">Demandez votre audit</h2>
            <p className="mt-4 text-lg text-ink/80">
              Décrivez votre établissement en quelques clics. Un auditeur vous rappelle pour
              convenir d&apos;un créneau, et vous recevez votre devis avant toute intervention.
            </p>
          </div>
        </div>

        {/* Le configurateur porte sa propre section et son propre conteneur :
            le reemboiter doublerait les marges. */}
        <Configurateur />

        <div className="container-ah">

          <div className="mx-auto mt-8 max-w-3xl">
            <RdvForm />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              'Intervention dans les huit départements franciliens',
              'Rapport PDF complet',
              'Plan d’action priorisé',
              'Sans engagement',
            ].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 text-sm font-medium text-ink/80"
              >
                <Dot /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Groupe />
      <Faq />
      <StickyCta />
    </>
  );
}

function Dot() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="11" fill="#10B981" />
      <path
        d="M7 12.5l3.2 3.2L17 9"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
