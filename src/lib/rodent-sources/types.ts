// Unified data-source contract for Rodent Radar's Official Activity layer.
//
// Every rodent activity dataset we onboard — Socrata, ArcGIS, Open311, CKAN —
// is wrapped by an adapter that implements `RodentActivitySource` and emits
// records that conform to `RodentActivityRecord`. The downstream atlas only
// ever consumes the normalized shape, so adding a new city is a config +
// adapter-pick exercise, not a per-city integration.

export type Confidence = "high" | "medium" | "low";

export type SourcePlatform = "socrata" | "arcgis" | "open311" | "ckan";

export type RecordCategory =
  // City crew inspected a property for rodent evidence.
  | "inspection"
  // Resident-submitted complaint via 311 / equivalent.
  | "complaint"
  // Restaurant / commercial inspection flagged rodent evidence.
  | "commercial-violation"
  // Resolved / closed work order (used for trend math only).
  | "resolution";

export interface RodentActivityRecord {
  /** Stable id within this source. Used to dedupe across refreshes. */
  sourceId: string;
  /** ISO date when the activity was recorded by the city. */
  recordedAt: string;
  /** 5-digit US ZIP (ZCTA) when available, else null. */
  zip: string | null;
  /** Best-effort lat/lng — null when the upstream record lacks geocoding. */
  lat: number | null;
  lng: number | null;
  /** Normalized category (see above). */
  category: RecordCategory;
  /** Upstream type string, preserved for audit + drawer methodology. */
  rawType: string;
  /** True only when the source explicitly marks the case closed. */
  resolved: boolean;
}

export interface FetchWindow {
  /** Inclusive ISO date (e.g. "2024-01-01"). */
  from: string;
  /** Inclusive ISO date (e.g. "2024-12-31"). */
  to: string;
}

export interface RodentActivitySource {
  /** Stable id used for joins + audit (e.g. "nyc-rodent-inspection"). */
  id: string;
  /** Human-readable owner-facing name. */
  name: string;
  /** Owning municipality or agency. */
  owner: string;
  /** Canonical dataset URL — surfaced in the drawer methodology section. */
  url: string;
  /** Underlying platform. */
  platform: SourcePlatform;
  /** Place id this source maps to (matches `AtlasPlace.id`). */
  placeId: string;
  /** Per-source confidence rating drives visual encoding (opacity/ring). */
  confidence: Confidence;
  /**
   * One-line explanation of why this source isn't directly comparable across
   * cities (e.g. "complaint-based, not inspection-based"). Shown in drawer.
   */
  comparabilityNote: string;
  /**
   * REQUIRED for reviewed data gaps; explains why no live source exists yet
   * (e.g. "Portal exists but no rodent-tagged dataset as of 2025-11").
   * Should be undefined for live sources.
   */
  reviewedExplanation?: string;

  /** Pull records for the given window. Adapters handle pagination + retries. */
  fetch(window: FetchWindow): Promise<RodentActivityRecord[]>;
}

/** Shape stored in `gap-explanations.json` for the ~30 reviewed coverage gaps. */
export interface ReviewedDataGap {
  placeId: string;
  reviewedOn: string;
  reviewedSourceName: string;
  reviewedSourceUrl: string;
  /** Public-facing one-paragraph explanation; shown in the city drawer. */
  reviewedExplanation: string;
}
