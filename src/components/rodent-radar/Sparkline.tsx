// Tiny SVG sparkline that turns a list of report timestamps into a 24-month
// monthly bar chart. The sawtooth pattern IS the replacement cycle: kill,
// quiet, kill again, quiet — repeat. No chart library needed.

type Props = {
  reports: { reportedAt: string }[];
  monthsBack?: number;
  width?: number;
  height?: number;
  className?: string;
};

export function Sparkline({
  reports,
  monthsBack = 24,
  width = 240,
  height = 48,
  className,
}: Props) {
  const buckets = new Array(monthsBack).fill(0);
  const now = new Date();
  const startMs = new Date(now.getFullYear(), now.getMonth() - (monthsBack - 1), 1).getTime();

  for (const r of reports) {
    const t = new Date(r.reportedAt).getTime();
    if (t < startMs) continue;
    const d = new Date(r.reportedAt);
    const monthsAgo =
      (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
    const idx = monthsBack - 1 - monthsAgo;
    if (idx >= 0 && idx < monthsBack) buckets[idx]++;
  }

  const max = Math.max(1, ...buckets);
  const barW = width / monthsBack;
  const gap = Math.max(1, barW * 0.18);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={`${reports.length} reports across ${monthsBack} months`}
    >
      {/* Baseline */}
      <line x1={0} y1={height - 0.5} x2={width} y2={height - 0.5} stroke="#1e293b" strokeWidth={1} />
      {buckets.map((v, i) => {
        const h = v === 0 ? 0 : Math.max(2, (v / max) * (height - 4));
        const x = i * barW + gap / 2;
        const y = height - h;
        const isRecent = i >= monthsBack - 3;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={Math.max(1, barW - gap)}
            height={h}
            fill={v === 0 ? "transparent" : isRecent ? "#22d3ee" : "#475569"}
            opacity={v === 0 ? 0 : 0.95}
            rx={1}
          />
        );
      })}
    </svg>
  );
}
