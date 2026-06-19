/** Jeu d'icônes ligne, stroke cohérent (1.8). Pas d'emoji (rule UI). */
type P = { className?: string };
const base = (className = 'h-6 w-6') => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className,
  'aria-hidden': true,
});

export const IcoFroid = ({ className }: P) => (
  <svg {...base(className)}><path d="M12 2v20M4 6l16 12M20 6L4 18M12 2l3 3-3 3-3-3 3-3M12 22l3-3-3-3-3 3 3 3" /></svg>
);
export const IcoTrace = ({ className }: P) => (
  <svg {...base(className)}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h6M9 11h6M9 15h4" /></svg>
);
export const IcoMains = ({ className }: P) => (
  <svg {...base(className)}><path d="M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V6a1.5 1.5 0 0 1 3 0v6c0 3.5-2 6-5 6s-5-2-6-5l-1.2-3a1.4 1.4 0 0 1 2.4-1.4L7 11" /></svg>
);
export const IcoSpray = ({ className }: P) => (
  <svg {...base(className)}><path d="M9 8h6v12a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V8zM9 8V5h4V3M16 5h1M19 5h.01M17 8h.01M19 8h.01M18 11h.01" /></svg>
);
export const IcoNuisible = ({ className }: P) => (
  <svg {...base(className)}><circle cx="12" cy="13" r="5" /><path d="M12 8V5M9 9 7 7M15 9l2-2M7 13H4M20 13h-3M9 17l-2 2M15 17l2 2" /></svg>
);
export const IcoStock = ({ className }: P) => (
  <svg {...base(className)}><path d="M3 9h18M3 9 5 4h14l2 5M5 9v11h14V9M9 13h6" /></svg>
);
export const IcoShield = ({ className }: P) => (
  <svg {...base(className)}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zM9 12l2 2 4-4" /></svg>
);
export const IcoDoc = ({ className }: P) => (
  <svg {...base(className)}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5M9 13h6M9 17h6" /></svg>
);
export const IcoResto = ({ className }: P) => (
  <svg {...base(className)}><path d="M5 3v7a3 3 0 0 0 6 0V3M8 3v18M19 3c-1.5 0-3 2-3 5s1.5 4 3 4v9" /></svg>
);
export const IcoMapPin = ({ className }: P) => (
  <svg {...base(className)}><path d="M12 21c4-4 7-7.5 7-11a7 7 0 0 0-14 0c0 3.5 3 7 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const IcoCheck = ({ className }: P) => (
  <svg {...base(className)}><path d="M20 6 9 17l-5-5" /></svg>
);
export const IcoTemp = ({ className }: P) => (
  <svg {...base(className)}><path d="M10 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0z" /><path d="M12 9v5" /></svg>
);
export const IcoAllergen = ({ className }: P) => (
  <svg {...base(className)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
);
export const IcoWater = ({ className }: P) => (
  <svg {...base(className)}><path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" /></svg>
);
export const IcoTrash = ({ className }: P) => (
  <svg {...base(className)}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" /></svg>
);
export const IcoBuilding = ({ className }: P) => (
  <svg {...base(className)}><path d="M4 21V5l8-2 8 2v16M9 9h.01M15 9h.01M9 13h.01M15 13h.01M10 21v-4h4v4" /></svg>
);
