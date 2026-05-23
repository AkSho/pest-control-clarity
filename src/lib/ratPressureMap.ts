import {
  getRatPressureResults,
  getUnavailableRatPressureGeos,
} from "@/lib/rodentRadarAtlas";
import { getAhsEstimates } from "@/lib/rodentRadarProvenance";

export {
  atlasDatasets,
  atlasPlaces,
  atlasSources,
  comparePlaceToCohort,
  contextLayers,
  exposureGuidance,
  formatCount,
  getAtlasLayerDefinitions,
  getAtlasSourceCards,
  getColonyGrowthProjection,
  getRatPressureResults,
  getUnavailableRatPressureGeos,
  pressureMetricSnapshots,
  PRESSURE_BAND_THRESHOLDS,
  validateAtlasData,
  watchlistPlaces,
  type AtlasDataset,
  type AtlasLayerDefinition,
  type AtlasLayerRole,
  type AtlasPlace,
  type AtlasSource,
  type ColonyGrowthProjection,
  type ContextLayer,
  type ExposureGuidance,
  type PlaceCohortComparison,
  type PressureBandThreshold,
  type Provenance,
  type RatPressureResult,
  type UnavailableRatPressureGeo,
} from "@/lib/rodentRadarAtlas";

export {
  getAhsEstimates,
  AHS_META,
  PROVENANCE_LABELS,
  PROVENANCE_CAVEATS,
  METRIC_EXPLAINERS,
  plainBandLede,
  plainConfidence,
  plainColonyBlurb,
  plainTrendLabel,
  plainRecentVsCohortLabel,
  type AhsEstimatePin,
} from "@/lib/rodentRadarProvenance";

export const verifiedRatPressureGeos = getRatPressureResults();
export const unavailableRatPressureGeos = getUnavailableRatPressureGeos();
export const ahsEstimatePins = getAhsEstimates();
