import type { RestitutionIA } from '@/lib/restitution';

const ORANGE = '#F97316';

function Liste({ titre, items, couleur }: { titre: string; items: string[]; couleur?: string }) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="text-sm font-bold text-ink">{titre}</h3>
      <ul className="mt-2 space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm text-ink/80">
            <span
              aria-hidden
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: couleur ?? ORANGE }}
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Affiche une restitution (template ou IA). Composant serveur, sans interaction.
 *  bare = sans carte ni titre (pour insertion dans une section de document). */
export function RestitutionView({ data, bare = false }: { data: RestitutionIA; bare?: boolean }) {
  const aRoadmap = data.roadmap.j30.length + data.roadmap.j60.length + data.roadmap.j90.length > 0;
  const Wrapper = bare ? 'div' : 'section';
  return (
    <Wrapper className={bare ? '' : 'rounded-3xl border border-ink/10 bg-white p-6 sm:p-8'}>
      {!bare && <h2 className="text-lg font-bold text-ink">Synthèse &amp; recommandations</h2>}

      {data.synthese && (
        <p className={`text-[15px] leading-relaxed text-ink/85 ${bare ? '' : 'mt-3'}`}>{data.synthese}</p>
      )}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Liste titre="Points forts" items={data.pointsForts} couleur="#16A34A" />
        <Liste titre="Axes d'amélioration" items={data.axes} couleur={ORANGE} />
      </div>

      {aRoadmap && (
        <div className="mt-6">
          <h3 className="text-sm font-bold text-ink">Feuille de route</h3>
          <div className="mt-2 grid gap-4 sm:grid-cols-3">
            <Liste titre="30 jours" items={data.roadmap.j30} />
            <Liste titre="60 jours" items={data.roadmap.j60} />
            <Liste titre="90 jours" items={data.roadmap.j90} />
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {data.gains && (
          <div className="rounded-2xl bg-vert-50 p-4">
            <h3 className="text-sm font-bold text-ink">Gains potentiels</h3>
            <p className="mt-1 text-sm text-ink/80">{data.gains}</p>
          </div>
        )}
        {data.risques && (
          <div className="rounded-2xl bg-red-50 p-4">
            <h3 className="text-sm font-bold text-ink">Risques si rien n&apos;est fait</h3>
            <p className="mt-1 text-sm text-ink/80">{data.risques}</p>
          </div>
        )}
      </div>

      <p className="mt-4 text-[11px] text-gris">
        Synthèse générée automatiquement à partir des constats de l&apos;audit. À relire et compléter
        par l&apos;auditeur. auditresto360 est un label privé indépendant.
      </p>
    </Wrapper>
  );
}
