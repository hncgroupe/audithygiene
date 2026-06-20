import { Reveal } from '@/components/site/Reveal';

const PILIERS = [
  {
    titre: 'Un audit ancré dans la réglementation',
    texte:
      'Chaque point de contrôle s’appuie sur le Paquet hygiène européen (règlement CE 852/2004), les principes HACCP du Codex Alimentarius et votre Plan de Maîtrise Sanitaire. Rien n’est laissé à l’appréciation : on évalue ce que la réglementation exige réellement.',
  },
  {
    titre: 'La rigueur d’un contrôle officiel, l’accompagnement en plus',
    texte:
      'Nous regardons votre établissement avec la même grille de lecture qu’une inspection : chaîne du froid, cuisson, traçabilité, hygiène du personnel, nettoyage, nuisibles, PMS, allergènes. Mais là où l’inspection sanctionne, nous expliquons et corrigeons.',
  },
  {
    titre: 'Une notation transparente et reproductible',
    texte:
      'Score global et par thème, écarts mineurs et cas critiques distingués clairement. La méthode de calcul est documentée : deux auditeurs aboutissent au même résultat. Vous savez exactement où vous en êtes.',
  },
  {
    titre: 'Un plan d’action, pas un simple constat',
    texte:
      'Pour chaque non-conformité : l’action corrective concrète, sa priorité et un délai conseillé. On ne vous laisse pas avec une liste de problèmes, mais avec une feuille de route claire, du plus urgent au moins urgent.',
  },
];

export function SavoirFaire() {
  return (
    <section className="container-ah py-24">
      <div className="max-w-3xl">
        <h2 className="section-title">Notre savoir-faire</h2>
        <p className="mt-4 text-lg text-ink/80">
          L’audit hygiène est un métier. Notre rôle de tiers de confiance : appliquer la
          réglementation avec la rigueur d’un expert, et la traduire en actions que vous pouvez
          mener dès le lendemain.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {PILIERS.map((p, i) => (
          <Reveal
            key={p.titre}
            delay={i * 70}
            className="rounded-2xl border border-ink/8 bg-white p-7 card-hover"
          >
            <h3 className="text-lg font-semibold tracking-tight text-ink">{p.titre}</h3>
            <p className="mt-3 leading-relaxed text-ink/80">{p.texte}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
