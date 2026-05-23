/**
 * Provenance, plain-English copy, and survey-based estimates that live
 * alongside the verified rat-pressure snapshots. Kept out of
 * rodentRadarAtlas.ts to keep that file's invariants simple.
 */
import ahsData from "../../public/rodent-radar/data/ahs-rodent-estimates.json";
import type { AtlasPlace, Provenance } from "@/lib/rodentRadarAtlas";
import { atlasPlaces } from "@/lib/rodentRadarAtlas";
import type { ActivityBand, Confidence } from "@/lib/rodentRadar";

export type { Provenance };

/**
 * Short plain-English label shown next to a number so a visitor knows
 * what kind of measurement it is. Keep these honest and brief.
 */
export const PROVENANCE_LABELS: Record<Provenance, string> = {
  live: "Live city data",
  seeded: "Sample — verifying source",
  "inspections-housing": "Housing inspections",
  "inspections-commercial": "Restaurant inspections",
  "ahs-estimate": "Survey estimate",
  unavailable: "No data yet",
};

export const PROVENANCE_CAVEATS: Record<Provenance, string> = {
  live: "Counted from official city open data — rodent inspections or 311 complaints filed by the public.",
  seeded:
    "Numbers shown are a published reference figure we are still re-verifying against the live source. Treat as a sample, not a daily count.",
  "inspections-housing":
    "Source is housing-code inspections, not public 311 complaints. Counts what inspectors found, not what neighbors reported.",
  "inspections-commercial":
    "Source is restaurant inspections, not residential complaints. Counts food-business pest violations, which is a commercial-corridor signal.",
  "ahs-estimate":
    "Number is a household survey estimate from the U.S. Census American Housing Survey for the metro area, not a city report count.",
  unavailable:
    "No clean public dataset has been confirmed yet for this place. We list it so the gap is visible, not hidden.",
};

/**
 * Plain-English captions shown under every number in the selection drawer.
 * 8th-grade reading level. Keyed by metric.
 */
export const METRIC_EXPLAINERS = {
  last12MonthsCount: "Total rodent reports filed with this city in the last year.",
  recent90DayCount: "Rodent reports filed in the last 3 months.",
  trendPercent: "How much reports went up or down compared to the year before.",
  recentSharePercent: "What share of the year's reports came in the last 3 months.",
  activityIndex: "A score from 0 to 100 we calculate from reports, trend, and recent share. Not a rat count.",
  confidence: "How sure we are about the numbers, based on how clean the source data is.",
  ahsPercent: "Share of households who said they saw rats or mice in their home in the last year.",
} as const;

/**
 * Plain-English confidence labels (replacing the bare "high"/"medium"/"low" strings).
 */
export function plainConfidence(confidence: Confidence): string {
  switch (confidence) {
    case "high":
      return "High — based on official city data";
    case "medium":
      return "Medium — official data with some category overlap";
    case "low":
      return "Low — limited or indirect data";
    default:
      return "Unknown";
  }
}

/**
 * Plain-English replacement for the old "established colony pattern trajectory"
 * lede. Returns one sentence describing the area at an 8th-grade level.
 */
export function plainBandLede(
  shortName: string,
  band: ActivityBand,
  trendPercent: number,
): string {
  const bandPhrase: Record<ActivityBand, string> = {
    low: "has low rodent activity",
    moderate: "has steady rodent activity",
    high: "has heavy rodent activity",
    severe: "has very heavy rodent activity",
  };
  const trend =
    trendPercent >= 5
      ? `Reports are up ${trendPercent.toFixed(0)}% from last year.`
      : trendPercent <= -5
        ? `Reports are down ${Math.abs(trendPercent).toFixed(0)}% from last year.`
        : "Reports are about the same as last year.";
  return `${shortName} ${bandPhrase[band]}. ${trend}`;
}

/**
 * Plain-English trend label for the cohort comparison.
 */
export function plainTrendLabel(trendPercent: number): string {
  if (trendPercent >= 10) return "Rising fast";
  if (trendPercent >= 2) return "Going up a little";
  if (trendPercent <= -10) return "Falling fast";
  if (trendPercent <= -2) return "Going down a little";
  return "About the same";
}

/**
 * Plain-English replacement for "Recent activity is accelerating vs other tracked areas".
 */
export function plainRecentVsCohortLabel(
  placeRecentShare: number,
  cohortAvgRecentShare: number,
): string {
  if (placeRecentShare >= cohortAvgRecentShare + 3)
    return "Recent activity is faster than other cities we track.";
  if (placeRecentShare <= cohortAvgRecentShare - 3)
    return "Recent activity is slower than other cities we track.";
  return "Recent activity is in line with other cities we track.";
}

/**
 * Plain-English colony growth blurb (replaces "established colony pattern trajectory").
 */
export function plainColonyBlurb(shortName: string, band: ActivityBand): {
  headline: string;
  body: string;
  disclaimer: string;
} {
  const headlines: Record<ActivityBand, string> = {
    low: `${shortName} likely has small, scattered rat activity.`,
    moderate: `${shortName} likely has small but settled rat pockets.`,
    high: `${shortName} likely has lots of rats living here.`,
    severe: `${shortName} likely has very heavy rat populations.`,
  };
  const bodies: Record<ActivityBand, string> = {
    low: "If food and entry points are fixed, activity can stay low. Watch for new sightings.",
    moderate:
      "Without action, activity can settle into regular nests and travel paths over a few months.",
    high: "Even when rats are removed, more often move in unless food, water, and shelter are cut off.",
    severe:
      "Heavy activity usually keeps coming back unless every food, water, and shelter source is removed.",
  };
  return {
    headline: headlines[band],
    body: bodies[band],
    disclaimer: "This is a guess based on activity bands, not a head-count of rats.",
  };
}

/**
 * AHS (American Housing Survey) household-level rodent estimates, used to fill
 * gap pins where no city dataset exists.
 */
export type AhsMetroEntry = {
  placeId: string;
  metroLabel: string;
  rodentEvidencePercent: number;
  households: number;
  ahsTableUrl: string;
};

export type AhsEstimatePin = AtlasPlace & {
  provenance: "ahs-estimate";
  metroLabel: string;
  ahsYear: number;
  rodentEvidencePercent: number;
  households: number;
  ahsTableUrl: string;
  sourceName: string;
  sourceUrl: string;
};

const ahs = ahsData as {
  source: string;
  sourceUrl: string;
  ahsYear: number;
  note: string;
  metros: AhsMetroEntry[];
};

export function getAhsEstimates(): AhsEstimatePin[] {
  return ahs.metros.map((m) => {
    const place = atlasPlaces.find((p) => p.id === m.placeId);
    if (!place) {
      throw new Error(`AHS estimate references unknown place: ${m.placeId}`);
    }
    return {
      ...place,
      provenance: "ahs-estimate" as const,
      metroLabel: m.metroLabel,
      ahsYear: ahs.ahsYear,
      rodentEvidencePercent: m.rodentEvidencePercent,
      households: m.households,
      ahsTableUrl: m.ahsTableUrl,
      sourceName: ahs.source,
      sourceUrl: ahs.sourceUrl,
    };
  });
}

export const AHS_META = {
  source: ahs.source,
  sourceUrl: ahs.sourceUrl,
  ahsYear: ahs.ahsYear,
  note: ahs.note,
};
