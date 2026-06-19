'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Révélation au scroll (IntersectionObserver). Léger, sans dépendance.
 * Respecte prefers-reduced-motion : si l'utilisateur réduit les animations,
 * le contenu apparaît immédiatement sans transition.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(el);
    // Filet de sécurité : révèle quoi qu'il arrive (jamais de section invisible).
    const fallback = setTimeout(() => setShown(true), 1200);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(18px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
