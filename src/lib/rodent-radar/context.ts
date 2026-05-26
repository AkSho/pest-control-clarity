export type FoodPestEvidence = {
  id: string;
  source: string;
  sourceUrl: string;
  sourceDatasetId?: string;
  snapshotDate?: string;
  confidence?: "high" | "medium" | "low";
  contextType: "food-inspection-pest-evidence" | "sanitation-condition";
  establishmentName: string;
  category?: string;
  description: string;
  lat: number;
  lng: number;
  observedAt: string;
  status: string;
  addressLabel: string;
  neighborhood: string;
};

export const CONTEXT_SNAPSHOT_URL = "/rodent-radar/data/context-records.json";

export async function loadFoodPestEvidenceSnapshot(): Promise<FoodPestEvidence[]> {
  const response = await fetch(CONTEXT_SNAPSHOT_URL, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Unable to load context snapshot (${response.status})`);
  const records = (await response.json()) as unknown;
  if (!Array.isArray(records)) throw new Error("Context snapshot did not return an array");
  return records as FoodPestEvidence[];
}

export function getFoodPestEvidenceAsGeoJSON(records: FoodPestEvidence[]) {
  return {
    type: "FeatureCollection" as const,
    features: records.map((record) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [record.lng, record.lat] },
      properties: {
        id: record.id,
        source: record.source,
        sourceUrl: record.sourceUrl,
        sourceDatasetId: record.sourceDatasetId,
        snapshotDate: record.snapshotDate,
        confidence: record.confidence,
        contextType: record.contextType,
        establishmentName: record.establishmentName,
        category: record.category,
        description: record.description,
        observedAt: record.observedAt,
        observedAtMs: new Date(record.observedAt).getTime(),
        ageDays: Math.floor((Date.now() - new Date(record.observedAt).getTime()) / 86400000),
        status: record.status,
        addressLabel: record.addressLabel,
        neighborhood: record.neighborhood,
      },
    })),
  };
}
