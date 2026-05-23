// ArcGIS FeatureServer adapter (opendata.dc.gov, many municipal GIS portals).
// Uses the `query` endpoint with `where`, `outFields`, pagination, and JSON output.

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

export interface ArcgisSourceConfig {
  id: string;
  name: string;
  owner: string;
  placeId: string;
  /** Feature layer URL ending in /FeatureServer/<n> (no /query). */
  featureLayerUrl: string;
  url: string;
  dateField: string;
  typeField: string;
  whereClause?: string;
  zipField?: string;
  statusField?: string;
  confidence: Confidence;
  comparabilityNote: string;
}

const PAGE_SIZE = 2_000; // ArcGIS default maxRecordCount.

export function createArcgisSource(config: ArcgisSourceConfig): RodentActivitySource {
  return {
    id: config.id,
    name: config.name,
    owner: config.owner,
    url: config.url,
    placeId: config.placeId,
    platform: "arcgis",
    confidence: config.confidence,
    comparabilityNote: config.comparabilityNote,

    async fetch(window: FetchWindow): Promise<RodentActivityRecord[]> {
      const where = [
        `${config.dateField} >= DATE '${window.from}' AND ${config.dateField} <= DATE '${window.to}'`,
        config.whereClause,
      ]
        .filter(Boolean)
        .join(" AND ");

      const out: RodentActivityRecord[] = [];
      let offset = 0;

      while (true) {
        const url = new URL(`${config.featureLayerUrl}/query`);
        url.searchParams.set("where", where);
        url.searchParams.set("outFields", "*");
        url.searchParams.set("returnGeometry", "true");
        url.searchParams.set("outSR", "4326");
        url.searchParams.set("f", "json");
        url.searchParams.set("resultRecordCount", String(PAGE_SIZE));
        url.searchParams.set("resultOffset", String(offset));

        const res = await fetch(url.toString());
        if (!res.ok) {
          throw new Error(`ArcGIS ${config.id} ${res.status}: ${await res.text()}`);
        }
        const body = (await res.json()) as {
          features?: Array<{ attributes: Record<string, unknown>; geometry?: { x: number; y: number } }>;
          exceededTransferLimit?: boolean;
        };
        const features = body.features ?? [];

        for (const f of features) {
          const a = f.attributes;
          const rawType = String(a[config.typeField] ?? "");
          if (!config.whereClause && !isRodentRelated(rawType)) continue;

          const status = config.statusField
            ? String(a[config.statusField] ?? "").toLowerCase()
            : "";

          out.push({
            sourceId: `${config.id}:${a["OBJECTID"] ?? `${offset}-${out.length}`}`,
            recordedAt: toIsoDate(a[config.dateField]) ?? "",
            zip: config.zipField ? normalizeZip(a[config.zipField]) : null,
            lat: parseCoord(f.geometry?.y),
            lng: parseCoord(f.geometry?.x),
            category: classifyType(rawType),
            rawType,
            resolved: status.includes("closed") || status.includes("completed"),
          });
        }

        if (!body.exceededTransferLimit || features.length === 0) break;
        offset += features.length;
      }

      return pruneInvalid(out);
    },
  };
}
