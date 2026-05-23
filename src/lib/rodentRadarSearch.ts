import { fallback } from "@tanstack/zod-adapter";
import { z } from "zod";

export const DISPLAY_MODES = ["standard", "high-contrast", "lines-off", "field"] as const;
export type DisplayMode = (typeof DISPLAY_MODES)[number];

export const TIME_WINDOWS = ["12mo", "90d", "30d"] as const;
export type TimeWindow = (typeof TIME_WINDOWS)[number];

export const PRESET_IDS = ["winning", "seasonal", "gaps", "your-block"] as const;
export type PresetId = (typeof PRESET_IDS)[number];

export const ATLAS_LAYER_IDS = [
  "rodent-activity",
  "colony-growth",
  "recent-reports",
  "seasonality",
  "conditions",
  "data-gaps",
  "exposure-safety",
] as const;
export type AtlasLayerId = (typeof ATLAS_LAYER_IDS)[number];

export const DEFAULT_LAYERS: AtlasLayerId[] = [
  "rodent-activity",
  "recent-reports",
  "seasonality",
  "data-gaps",
];

// Center stored as [lng, lat]. Validated as a tuple of finite numbers in range.
const centerSchema = z
  .tuple([
    z.number().finite().min(-180).max(180),
    z.number().finite().min(-85).max(85),
  ])
  .optional();

export const rodentRadarSearchSchema = z.object({
  layers: fallback(z.array(z.enum(ATLAS_LAYER_IDS)), DEFAULT_LAYERS).default(DEFAULT_LAYERS),
  place: fallback(z.string().min(1).max(64).optional(), undefined),
  gap: fallback(z.string().min(1).max(64).optional(), undefined),
  mode: fallback(z.enum(DISPLAY_MODES), "standard").default("standard"),
  preset: fallback(z.enum(PRESET_IDS).optional(), undefined),
  window: fallback(z.enum(TIME_WINDOWS), "12mo").default("12mo"),
  zoom: fallback(z.number().finite().min(0).max(20).optional(), undefined),
  center: fallback(centerSchema, undefined),
});

export type RodentRadarSearch = z.infer<typeof rodentRadarSearchSchema>;
