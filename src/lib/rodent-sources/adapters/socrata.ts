// Socrata SODA 2.1 adapter (data.cityofnewyork.us, data.cityofchicago.org, …).
// All cities expose a SoQL `$where` + `$limit` interface, so one adapter handles
// every Socrata-backed Phase A city via per-source config.

import {
  classifyType,
  isRodentRelated,
  normalizeZip,
  parseCoord,
  pruneInvalid,
  toIsoDate,
} from "../normalize";
import type {
  Confidence,
  FetchWindow,
  RodentActivityRecord,
  RodentActivitySource,
} from "../types";

export interface SocrataSourceConfig {
  id: string;
  name: string;
  owner: string;
  placeId: string;
  /** e.g. "https://data.cityofnewyork.us/resource/p937-wjvj.json" */
  endpoint: string;
  /** Canonical dataset URL (portal page) — shown in drawer. */
  url: string;
  /** Field name holding the event date (e.g. "inspection_date"). */
  dateField: string;
  /** Field holding the upstream type string. */
  typeField: string;
  /** Optional SoQL fragment to scope to rodent records (e.g. "result like '%Rat%'"). */
  whereClause?: string;
  /** Field holding the ZIP, if any. */
  zipField?: string;
  /** Optional lat/lng fields. */
  latField?: string;
  lngField?: string;
  /** Optional resolution-status field (e.g. "status"). */
  statusField?: string;
  /** App token — increases rate limit. */
  appToken?: string;
  confidence: Confidence;
  comparabilityNote: string;
}

const PAGE_SIZE = 50_000;

export function createSocrataSource(config: SocrataSourceConfig): RodentActivitySource {
  return {
    id: config.id,
    name: config.name,
    owner: config.owner,
    url: config.url,
    placeId: config.placeId,
    platform: "socrata",
    confidence: config.confidence,
    comparabilityNote: config.comparabilityNote,

    async fetch(window: FetchWindow): Promise<RodentActivityRecord[]> {
      const where = [
        `${config.dateField} between '${window.from}T00:00:00' and '${window.to}T23:59:59'`,
        config.whereClause,
      ]
        .filter(Boolean)
        .join(" AND ");

      const out: RodentActivityRecord[] = [];
      let offset = 0;

      while (true) {
        const url = new URL(config.endpoint);
        url.searchParams.set("$where", where);
        url.searchParams.set("$limit", String(PAGE_SIZE));
        url.searchParams.set("$offset", String(offset));

        const headers: Record<string, string> = { Accept: "application/json" };
        if (config.appToken) headers["X-App-Token"] = config.appToken;

        const res = await fetch(url.toString(), { headers });
        if (!res.ok) {
          throw new Error(`Socrata ${config.id} ${res.status}: ${await res.text()}`);
        }
        const page = (await res.json()) as Record<string, unknown>[];

        for (const row of page) {
          const rawType = String(row[config.typeField] ?? "");
          // Defensive: some upstream feeds need keyword filtering even when a
          // whereClause is set (e.g. 311 catch-all endpoints).
          if (!config.whereClause && !isRodentRelated(rawType)) continue;

          const status = config.statusField
            ? String(row[config.statusField] ?? "").toLowerCase()
            : "";

          out.push({
            sourceId: `${config.id}:${row["unique_key"] ?? row[":id"] ?? `${offset}-${out.length}`}`,
            recordedAt: toIsoDate(row[config.dateField]) ?? "",
            zip: config.zipField ? normalizeZip(row[config.zipField]) : null,
            lat: config.latField ? parseCoord(row[config.latField]) : null,
            lng: config.lngField ? parseCoord(row[config.lngField]) : null,
            category: classifyType(rawType),
            rawType,
            resolved: status.includes("closed") || status.includes("completed"),
          });
        }

        if (page.length < PAGE_SIZE) break;
        offset += PAGE_SIZE;
      }

      return pruneInvalid(out);
    },
  };
}
