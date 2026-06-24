import Link from 'next/link';

/**
 * Rubrique « groupe » : présente le site frère auditresto360 (auditresto360.fr),
 * l'audit complet du restaurant. Backlink cross-domaine.
 */
export function Groupe() {
  return (
    <section className="container-ah py-20">
      <div className="overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-card">
        <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <span className="eyebrow">Le groupe</span>
            <h2 className="section-title mt-3">Besoin d’un audit complet de votre restaurant ?</h2>
            <p className="mt-4 text-ink/80">
              audit hygiène fait partie d’un groupe qui réunit deux expertises complémentaires. Quand votre besoin porte sur l’hygiène et le HACCP, par exemple pour préparer un contrôle sanitaire, c’est audit hygiène.
            </p>
            <p className="mt-3 text-ink/80">
              Quand vous voulez le diagnostic complet de votre restaurant (hygiène, mais aussi <strong>ressources humaines, gestion et comptabilité, carte, développement commercial</strong>), notre cabinet frère{' '}
              <a href="https://auditresto360.fr" target="_blank" rel="noopener" className="font-semibold text-vert-700 hover:underline">
                auditresto360
              </a>{' '}
              réalise l’audit 360° : 10 piliers, rapport noté et plan d’action sur tout l’établissement.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://auditresto360.fr" target="_blank" rel="noopener" className="btn-ghost">
                Découvrir auditresto360
              </a>
              <Link href="/#rdv" className="btn-primary">
                Mon audit hygiène
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl border border-ink/8 bg-vert-50 p-5">
              <p className="text-sm font-bold text-ink">audit hygiène</p>
              <p className="mt-1 text-xs text-ink/70">Le spécialiste hygiène et HACCP, pour anticiper un contrôle sanitaire.</p>
            </div>
            <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-card">
              <p className="text-sm font-bold text-ink">auditresto360</p>
              <p className="mt-1 text-xs text-ink/70">L’audit complet du restaurant : hygiène, RH, gestion, carte, commercial.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
