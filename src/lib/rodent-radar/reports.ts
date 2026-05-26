// Per-report rodent data. One record = one filed report from a public dataset.
// The bulky snapshot is served as static JSON so it does not bloat the route JS.

export type RodentReport = {
  id: string;
  source: string;
  sourceUrl: string;
  sourceDatasetId?: string;
  snapshotDate?: string;
  confidence?: "high" | "medium" | "low";
  category?: string;
  lat: number;
  lng: number;
  reportedAt: string; // ISO
  status: string;
  addressLabel: string;
  neighborhood: string;
};

export type HeroCity = {
  id: "nyc" | "chicago" | "sf" | "philly" | "boston" | "dc" | "baltimore" | "newark" | "new-orleans";
  name: string;
  label: string; // pretty label for UI
  center: [number, number]; // lng, lat
  zoom: number;
  hasOfficialReports: boolean;
};

export const HERO_CITIES: HeroCity[] = [
  {
    id: "nyc",
    name: "New York City",
    label: "NYC",
    center: [-73.96, 40.74],
    zoom: 11.2,
    hasOfficialReports: true,
  },
  {
    id: "chicago",
    name: "Chicago",
    label: "Chicago",
    center: [-87.66, 41.88],
    zoom: 11.2,
    hasOfficialReports: true,
  },
  {
    id: "sf",
    name: "San Francisco",
    label: "SF",
    center: [-122.4194, 37.7749],
    zoom: 11.4,
    hasOfficialReports: true,
  },
  {
    id: "philly",
    name: "Philadelphia",
    label: "Philly",
    center: [-75.16, 39.96],
    zoom: 11.4,
    hasOfficialReports: false,
  },
  {
    id: "boston",
    name: "Boston",
    label: "Boston",
    center: [-71.07, 42.33],
    zoom: 11.6,
    hasOfficialReports: true,
  },
  {
    id: "dc",
    name: "Washington, D.C.",
    label: "DC",
    center: [-77.02, 38.91],
    zoom: 11.8,
    hasOfficialReports: true,
  },
  {
    id: "baltimore",
    name: "Baltimore",
    label: "Baltimore",
    center: [-76.6122, 39.2904],
    zoom: 11.6,
    hasOfficialReports: true,
  },
  {
    id: "newark",
    name: "Newark",
    label: "Newark",
    center: [-74.1724, 40.7357],
    zoom: 12,
    hasOfficialReports: true,
  },
  {
    id: "new-orleans",
    name: "New Orleans",
    label: "NOLA",
    center: [-90.0715, 29.9511],
    zoom: 11.4,
    hasOfficialReports: true,
  },
];

export const REPORT_SNAPSHOT_URL = "/rodent-radar/data/official-reports.json";

export async function loadReportSnapshot(): Promise<RodentReport[]> {
  const response = await fetch(REPORT_SNAPSHOT_URL, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Unable to load official report snapshot (${response.status})`);
  const records = (await response.json()) as unknown;
  if (!Array.isArray(records)) throw new Error("Official report snapshot did not return an array");
  return records as RodentReport[];
}

export type ReportPlaceSummary = {
  id: HeroCity["id"] | "unknown";
  name: string;
  label: string;
  center: [number, number];
  zoom: number;
};

const REPORT_PLACE_BY_SOURCE: Array<{
  match: (report: RodentReport) => boolean;
  place: ReportPlaceSummary;
}> = HERO_CITIES.map((city) => ({
  match: (report) => {
    const source = report.source.toLowerCase();
    const dataset = (report.sourceDatasetId ?? "").toLowerCase();
    if (city.id === "nyc") return source.includes("nyc") || dataset === "p937-wjvj";
    if (city.id === "chicago") return source.includes("chicago") || dataset === "v6vf-nfxy";
    if (city.id === "sf") return source.includes("datasf") || dataset === "vw6y-z8j6";
    if (city.id === "philly") return source.includes("philadelphia") || source.includes("philly");
    if (city.id === "boston") return source.includes("boston");
    if (city.id === "dc") return source.includes("dc 311") || dataset.includes("dcgis");
    if (city.id === "baltimore") return source.includes("baltimore") || dataset.includes("baltimore");
    if (city.id === "newark") return source.includes("newark") || dataset.includes("newark");
    if (city.id === "new-orleans") return source.includes("new orleans") || dataset === "2jgv-pqrq";
    return false;
  },
  place: {
    id: city.id,
    name: city.name,
    label: city.label,
    center: city.center,
    zoom: city.zoom,
  },
}));

export function getReportPlace(report: RodentReport): ReportPlaceSummary {
  return (
    REPORT_PLACE_BY_SOURCE.find((entry) => entry.match(report))?.place ?? {
      id: "unknown",
      name: "Verified place",
      label: "Verified",
      center: [report.lng, report.lat],
      zoom: 10.5,
    }
  );
}

export function getReportPlaceLabel(report: RodentReport): string {
  return getReportPlace(report).label;
}

export function getReportsAsGeoJSON(reports: RodentReport[]) {
  return {
    type: "FeatureCollection" as const,
    features: reports.map((r) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [r.lng, r.lat] },
      properties: {
        id: r.id,
        source: r.source,
        sourceUrl: r.sourceUrl,
        sourceDatasetId: r.sourceDatasetId,
        snapshotDate: r.snapshotDate,
        confidence: r.confidence,
        category: r.category,
        reportedAt: r.reportedAt,
        // ms-since-epoch for fast filter expressions in MapLibre
        reportedAtMs: new Date(r.reportedAt).getTime(),
        ageDays: Math.floor((Date.now() - new Date(r.reportedAt).getTime()) / 86400000),
        status: r.status,
        addressLabel: r.addressLabel,
        neighborhood: r.neighborhood,
      },
    })),
  };
}

// Group reports by approximate address (round lat/lng to ~10m) for the
// "recurring activity" pattern. An address with >=3 reports across >=6 months
// is a pattern signal, not proof of a confirmed colony.
export type AddressGroup = {
  key: string;
  addressLabel: string;
  neighborhood: string;
  lat: number;
  lng: number;
  reports: RodentReport[];
  firstReportedAt: string;
  lastReportedAt: string;
  spanMonths: number;
  isRecurring: boolean;
};

function addrKey(lat: number, lng: number): string {
  return `${lat.toFixed(4)},${lng.toFixed(4)}`;
}

export function groupByAddress(reports: RodentReport[]): AddressGroup[] {
  const map = new Map<string, RodentReport[]>();
  for (const r of reports) {
    const k = addrKey(r.lat, r.lng);
    const arr = map.get(k);
    if (arr) arr.push(r);
    else map.set(k, [r]);
  }
  const groups: AddressGroup[] = [];
  for (const [key, rs] of map.entries()) {
    const sorted = [...rs].sort((a, b) => a.reportedAt.localeCompare(b.reportedAt));
    const first = new Date(sorted[0].reportedAt).getTime();
    const last = new Date(sorted[sorted.length - 1].reportedAt).getTime();
    const spanMonths = Math.max(0, (last - first) / (1000 * 60 * 60 * 24 * 30));
    groups.push({
      key,
      addressLabel: sorted[0].addressLabel,
      neighborhood: sorted[0].neighborhood,
      lat: sorted[0].lat,
      lng: sorted[0].lng,
      reports: sorted,
      firstReportedAt: sorted[0].reportedAt,
      lastReportedAt: sorted[sorted.length - 1].reportedAt,
      spanMonths,
      isRecurring: rs.length >= 3 && spanMonths >= 6,
    });
  }
  return groups;
}

// Find the address group nearest to a clicked lat/lng (within ~50m).
// Used for popup lookup when MapLibre returns a clustered feature point.
export function findGroupAt(
  groups: AddressGroup[],
  lat: number,
  lng: number,
  tolDeg = 0.0005,
): AddressGroup | null {
  let best: AddressGroup | null = null;
  let bestD = Number.POSITIVE_INFINITY;
  for (const g of groups) {
    const d = (g.lat - lat) ** 2 + (g.lng - lng) ** 2;
    if (d < bestD && d < tolDeg * tolDeg * 4) {
      bestD = d;
      best = g;
    }
  }
  return best;
}
