import type { Block } from '@/content/blog/types';

/** Rendu des blocs de contenu d'un article de blog. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={i}
                id={block.id}
                className="scroll-mt-24 pt-6 text-2xl font-bold tracking-tight text-ink"
              >
                {block.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="pt-2 text-lg font-semibold text-ink">
                {block.text}
              </h3>
            );
          case 'p':
            return (
              <p key={i} className="text-[1.0625rem] leading-relaxed text-ink/80">
                {block.text}
              </p>
            );
          case 'ul':
            return (
              <ul key={i} className="space-y-2 pl-1">
                {block.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink/80">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vert" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="space-y-3 pl-1">
                {block.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink/80">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-vert-50 text-sm font-semibold text-vert-700">
                      {j + 1}
                    </span>
                    <span className="pt-0.5">{it}</span>
                  </li>
                ))}
              </ol>
            );
          case 'callout':
            return (
              <div key={i} className="rounded-2xl border border-vert/20 bg-vert-50/60 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-vert-700">
                  {block.title}
                </p>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink/85">{block.text}</p>
              </div>
            );
          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-vert pl-5 text-[1.0625rem] italic leading-relaxed text-ink/75"
              >
                {block.text}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
