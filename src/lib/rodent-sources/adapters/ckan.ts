// CKAN datastore_search_sql adapter (Toronto, Philadelphia OpenDataPhilly, …).
// Uses the public SQL endpoint with parameterized date filtering.

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

export interface CkanSourceConfig {
  id: string;
  name: string;
  owner: string;
  placeId: string;
  /** e.g. "https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search_sql" */
  sqlEndpoint: string;
  /** Resource id (datastore_search_sql requires it). */
  resourceId: string;
  url: string;
  dateField: string;
  typeField: string;
  rodentTypeValues: string[];
  zipField?: string;
  latField?: string;
  lngField?: string;
  statusField?: string;
  confidence: Confidence;
  comparabilityNote: string;
}

export function createCkanSource(config: CkanSourceConfig): RodentActivitySource {
  return {
    id: config.id,
    name: config.name,
    owner: config.owner,
    url: config.url,
    placeId: config.placeId,
    platform: "ckan",
    confidence: config.confidence,
    comparabilityNote: config.comparabilityNote,

    async fetch(window: FetchWindow): Promise<RodentActivityRecord[]> {
      const inList = config.rodentTypeValues
        .map((v) => `'${v.replace(/'/g, "''")}'`)
        .join(", ");
      const sql =
        `SELECT * FROM "${config.resourceId}" ` +
        `WHERE "${config.dateField}" >= '${window.from}' ` +
        `AND "${config.dateField}" <= '${window.to}' ` +
        (inList ? `AND "${config.typeField}" IN (${inList})` : "");

      const url = new URL(config.sqlEndpoint);
      url.searchParams.set("sql", sql);

      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error(`CKAN ${config.id} ${res.status}: ${await res.text()}`);
      }
      const body = (await res.json()) as {
        result?: { records?: Record<string, unknown>[] };
      };
      const rows = body.result?.records ?? [];

      const out: RodentActivityRecord[] = [];
      for (const row of rows) {
        const rawType = String(row[config.typeField] ?? "");
        if (!config.rodentTypeValues.length && !isRodentRelated(rawType)) continue;

        const status = config.statusField
          ? String(row[config.statusField] ?? "").toLowerCase()
          : "";

        out.push({
          sourceId: `${config.id}:${row["_id"] ?? `${out.length}`}`,
          recordedAt: toIsoDate(row[config.dateField]) ?? "",
          zip: config.zipField ? normalizeZip(row[config.zipField]) : null,
          lat: config.latField ? parseCoord(row[config.latField]) : null,
          lng: config.lngField ? parseCoord(row[config.lngField]) : null,
          category: classifyType(rawType),
          rawType,
          resolved: status.includes("closed") || status.includes("completed"),
        });
      }

      return pruneInvalid(out);
    },
  };
}
