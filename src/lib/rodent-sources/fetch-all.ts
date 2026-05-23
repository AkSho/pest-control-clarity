// Orchestrator: pull every configured source in parallel and roll up to the
// normalized counts the atlas expects (12-month, prior 12-month, 90-day).

import type { FetchWindow, RodentActivityRecord, RodentActivitySource } from "./types";

export interface PlaceRollup {
  placeId: string;
  sourceId: string;
  last12MonthsCount: number;
  previous12MonthsCount: number;
  recent90DayCount: number;
  records: RodentActivityRecord[];
}

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

/** Build the standard fetch window: trailing 24 months (covers prior + last). */
export function defaultWindow(): FetchWindow {
  return { from: isoDaysAgo(365 * 2), to: isoDaysAgo(0) };
}

export interface FetchAllResult {
  rollups: PlaceRollup[];
  errors: Array<{ sourceId: string; message: string }>;
}

export async function fetchAllSources(
  sources: RodentActivitySource[],
  window: FetchWindow = defaultWindow(),
): Promise<FetchAllResult> {
  const errors: FetchAllResult["errors"] = [];
  const results = await Promise.all(
    sources.map(async (s) => {
      try {
        const records = await s.fetch(window);
        return { source: s, records };
      } catch (err) {
        errors.push({
          sourceId: s.id,
          message: err instanceof Error ? err.message : String(err),
        });
        return { source: s, records: [] as RodentActivityRecord[] };
      }
    }),
  );

  const cutoff12 = Date.parse(isoDaysAgo(365));
  const cutoff24 = Date.parse(isoDaysAgo(365 * 2));
  const cutoff90 = Date.parse(isoDaysAgo(90));

  const rollups: PlaceRollup[] = results.map(({ source, records }) => {
    let last12 = 0;
    let prev12 = 0;
    let recent90 = 0;
    for (const r of records) {
      const t = Date.parse(r.recordedAt);
      if (Number.isNaN(t)) continue;
      if (t >= cutoff12) last12 += 1;
      else if (t >= cutoff24) prev12 += 1;
      if (t >= cutoff90) recent90 += 1;
    }
    return {
      placeId: source.placeId,
      sourceId: source.id,
      last12MonthsCount: last12,
      previous12MonthsCount: prev12,
      recent90DayCount: recent90,
      records,
    };
  });

  return { rollups, errors };
}
