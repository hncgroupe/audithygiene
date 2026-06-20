import { Reveal } from '@/components/site/Reveal';

/**
 * En-tête de section standard (eyebrow + titre + sous-titre), révélé au scroll.
 * Garantit le même alignement et le même rythme typographique sur tout le site.
 */
export function SectionHead({
  eyebrow,
  title,
  children,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${light ? '!text-vert-300' : ''}`}>{eyebrow}</p>
      <h2 className={`section-title mt-4 ${light ? '!text-white' : ''}`}>{title}</h2>
      {children && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/60' : 'text-ink/60'}`}>
          {children}
        </p>
      )}
    </Reveal>
  );
}
