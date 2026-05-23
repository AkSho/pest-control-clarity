// Visual encoding for per-report dots. Three orthogonal channels:
//   - COLOR encodes recency (last 30d / 180d / 24mo / older)
//   - SIZE (clusters only) encodes count of reports (log scale)
//   - PULSE encodes "right now" (last 7d, single dots only — applied as a
//     thin animated stroke layer above the base dot)
//
// Persistence ("recurring colony") is encoded by the recurring-sites layer,
// not by stacking another ring on every dot.

export const RECENCY_RAMP = {
  // bright cyan — last 30 days
  recent: "#22d3ee",
  // mid teal — 30-180d
  warm: "#0ea5b7",
  // muted slate-blue — 180d to 24mo
  cool: "#475569",
  // ghost — older than 24mo
  ghost: "#2a3344",
} as const;

export type RecencyBucket = keyof typeof RECENCY_RAMP;

export function recencyBucket(ageDays: number): RecencyBucket {
  if (ageDays <= 30) return "recent";
  if (ageDays <= 180) return "warm";
  if (ageDays <= 730) return "cool";
  return "ghost";
}

export function recencyColor(ageDays: number): string {
  return RECENCY_RAMP[recencyBucket(ageDays)];
}

// MapLibre paint expression for circle-color driven by ageDays property
export const RECENCY_COLOR_EXPRESSION = [
  "step",
  ["get", "ageDays"],
  RECENCY_RAMP.recent,
  31, RECENCY_RAMP.warm,
  181, RECENCY_RAMP.cool,
  731, RECENCY_RAMP.ghost,
] as const;

// Log-ish cluster radius — real quantity, not normalized
export const CLUSTER_RADIUS_EXPRESSION = [
  "interpolate",
  ["linear"],
  ["get", "point_count"],
  2, 8,
  10, 14,
  50, 22,
  200, 32,
  1000, 44,
] as const;
