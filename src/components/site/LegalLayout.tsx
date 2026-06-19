export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="container-ah py-16">
      <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>
      <div className="prose-ah mt-8 max-w-3xl space-y-4 text-ink/75 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_a]:text-vert-700 [&_a]:underline">
        {children}
      </div>
    </article>
  );
}
