// GeoReport v2 / Open311 adapter (Boston, SF historic, many smaller cities).
// Open311 enforces date range via `start_date` + `end_date` and returns
// service requests scoped by `service_code`.

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

export interface Open311SourceConfig {
  id: string;
  name: string;
  owner: string;
  placeId: string;
  /** e.g. "https://311api.cityofboston.gov/open311/v2/requests.json" */
  endpoint: string;
  url: string;
  /** One or more service codes that map to rodent-related requests. */
  serviceCodes: string[];
  jurisdictionId?: string;
  confidence: Confidence;
  comparabilityNote: string;
}

const PAGE_SIZE = 500;

interface Open311Request {
  service_request_id?: string | number;
  service_code?: string;
  service_name?: string;
  requested_datetime?: string;
  updated_datetime?: string;
  status?: string;
  zipcode?: string;
  lat?: number | string;
  long?: number | string;
}

export function createOpen311Source(config: Open311SourceConfig): RodentActivitySource {
  return {
    id: config.id,
    name: config.name,
    owner: config.owner,
    url: config.url,
    placeId: config.placeId,
    platform: "open311",
    confidence: config.confidence,
    comparabilityNote: config.comparabilityNote,

    async fetch(window: FetchWindow): Promise<RodentActivityRecord[]> {
      const out: RodentActivityRecord[] = [];

      for (const serviceCode of config.serviceCodes) {
        let page = 1;
        while (true) {
          const url = new URL(config.endpoint);
          url.searchParams.set("service_code", serviceCode);
          url.searchParams.set("start_date", `${window.from}T00:00:00Z`);
          url.searchParams.set("end_date", `${window.to}T23:59:59Z`);
          url.searchParams.set("page_size", String(PAGE_SIZE));
          url.searchParams.set("page", String(page));
          if (config.jurisdictionId) {
            url.searchParams.set("jurisdiction_id", config.jurisdictionId);
          }

          const res = await fetch(url.toString());
          if (!res.ok) {
            throw new Error(`Open311 ${config.id} ${res.status}: ${await res.text()}`);
          }
          const rows = (await res.json()) as Open311Request[];

          for (const row of rows) {
            const rawType = row.service_name ?? row.service_code ?? "";
            // Defensive — Open311 occasionally bundles unrelated children
            // under a shared parent service_code.
            if (!isRodentRelated(rawType) && !isRodentRelated(String(row.service_code ?? ""))) {
              continue;
            }
            const status = String(row.status ?? "").toLowerCase();

            out.push({
              sourceId: `${config.id}:${row.service_request_id ?? `${page}-${out.length}`}`,
              recordedAt: toIsoDate(row.requested_datetime) ?? "",
              zip: normalizeZip(row.zipcode),
              lat: parseCoord(row.lat),
              lng: parseCoord(row.long),
              category: classifyType(rawType),
              rawType,
              resolved: status === "closed",
            });
          }

          if (rows.length < PAGE_SIZE) break;
          page += 1;
        }
      }

      return pruneInvalid(out);
    },
  };
}
