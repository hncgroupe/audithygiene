import type { RadarPoint } from '@/lib/rapport-resto360';

const ORANGE = '#F97316';

/** Radar des scores par pilier (SVG pur, sans dépendance). */
export function RadarResto({ points }: { points: RadarPoint[] }) {
  const N = points.length;
  if (N < 3) {
    return <p className="text-sm text-gris">Radar disponible dès que 3 piliers sont notés.</p>;
  }

  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const R = 120;

  const angle = (i: number) => (-90 + (i * 360) / N) * (Math.PI / 180);
  const pt = (i: number, r: number) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  });

  const grids = [0.25, 0.5, 0.75, 1];
  const dataPath =
    points
      .map((p, i) => {
        const { x, y } = pt(i, (p.score / 100) * R);
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ') + ' Z';

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-auto w-full max-w-sm" role="img" aria-label="Radar des piliers">
      {/* Grilles concentriques */}
      {grids.map((g) => (
        <polygon
          key={g}
          points={points
            .map((_, i) => {
              const { x, y } = pt(i, g * R);
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(' ')}
          fill="none"
          stroke="#0C1B17"
          strokeOpacity={0.08}
          strokeWidth={1}
        />
      ))}

      {/* Axes + labels */}
      {points.map((p, i) => {
        const edge = pt(i, R);
        const label = pt(i, R + 18);
        const anchor = Math.abs(label.x - cx) < 12 ? 'middle' : label.x > cx ? 'start' : 'end';
        return (
          <g key={p.pilier}>
            <line x1={cx} y1={cy} x2={edge.x} y2={edge.y} stroke="#0C1B17" strokeOpacity={0.08} />
            <text
              x={label.x}
              y={label.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={10}
              fontWeight={600}
              fill="#6B7D77"
            >
              {p.radar}
            </text>
            <text
              x={label.x}
              y={label.y + 11}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={9}
              fontWeight={700}
              fill={ORANGE}
            >
              {p.score}
            </text>
          </g>
        );
      })}

      {/* Donnée */}
      <path d={dataPath} fill={ORANGE} fillOpacity={0.18} stroke={ORANGE} strokeWidth={2} />
      {points.map((p, i) => {
        const { x, y } = pt(i, (p.score / 100) * R);
        return <circle key={p.pilier} cx={x} cy={y} r={3} fill={ORANGE} />;
      })}
    </svg>
  );
}
