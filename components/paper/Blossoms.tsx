/** Small vector blossoms with sage leaves, placed by percentage inside a relative parent. */
export type Bloom = { x: number; y: number; r: number; c: string; rot?: number };

export function BloomGlyph({ b, size }: { b: Bloom; size: number }) {
  const r = 10;
  return (
    <svg
      viewBox="-20 -20 40 40"
      width={size}
      height={size}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${b.x}%`, top: `${b.y}%`, transform: `translate(-50%,-50%) rotate(${b.rot ?? 0}deg)` }}
      aria-hidden
    >
      <ellipse cx={-r * 0.9} cy={r * 0.4} rx={r * 0.9} ry={r * 0.35} fill="var(--color-sage)" transform="rotate(-30)" />
      <ellipse cx={r * 0.9} cy={r * 0.4} rx={r * 0.9} ry={r * 0.35} fill="var(--color-sage)" transform="rotate(30)" />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={0} cy={-r * 0.55} rx={r * 0.42} ry={r * 0.62} fill={b.c} transform={`rotate(${a})`} opacity="0.95" />
      ))}
      <circle r={r * 0.28} fill="var(--color-sand)" />
    </svg>
  );
}

/** Renders blooms as absolutely positioned sprites; parent must be `relative`. `scale` = px per r unit. */
export function Blossoms({ blooms, scale = 4, className }: { blooms: Bloom[]; scale?: number; className?: string }) {
  return (
    <div className={className ?? "absolute inset-0 pointer-events-none"} aria-hidden>
      {blooms.map((b, i) => (
        <BloomGlyph key={i} b={b} size={b.r * scale} />
      ))}
    </div>
  );
}
