// Helpers shared across adapters to keep `RodentActivityRecord` shapes consistent.

import type { RecordCategory, RodentActivityRecord } from "./types";

const RODENT_KEYWORDS = /\b(rat|rats|rodent|rodents|mice|mouse|vermin)\b/i;

export function isRodentRelated(text: string | null | undefined): boolean {
  if (!text) return false;
  return RODENT_KEYWORDS.test(text);
}

/** Classify an upstream type string into one of the normalized categories. */
export function classifyType(rawType: string): RecordCategory {
  const t = rawType.toLowerCase();
  if (t.includes("inspection") || t.includes("baiting")) return "inspection";
  if (t.includes("violation") || t.includes("food") || t.includes("restaurant")) {
    return "commercial-violation";
  }
  if (t.includes("closed") || t.includes("resolved")) return "resolution";
  return "complaint";
}

/** Normalize ZIP to 5 digits, dropping ZIP+4 and rejecting empties. */
export function normalizeZip(zip: unknown): string | null {
  if (typeof zip !== "string" && typeof zip !== "number") return null;
  const m = String(zip).match(/\b(\d{5})\b/);
  return m ? m[1] : null;
}

export function toIsoDate(value: unknown): string | null {
  if (!value) return null;
  const d = new Date(value as string | number);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

export function parseCoord(value: unknown): number | null {
  if (value == null) return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

/** Drop records missing both a recordedAt and any geocoding. */
export function pruneInvalid(records: RodentActivityRecord[]): RodentActivityRecord[] {
  return records.filter((r) => r.recordedAt && (r.zip || (r.lat != null && r.lng != null)));
}
