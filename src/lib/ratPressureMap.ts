import {
  getRatPressureResults,
  getUnavailableRatPressureGeos,
} from "@/lib/rodentRadarAtlas";

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
  type RatPressureResult,
  type UnavailableRatPressureGeo,
} from "@/lib/rodentRadarAtlas";

export const verifiedRatPressureGeos = getRatPressureResults();
export const unavailableRatPressureGeos = getUnavailableRatPressureGeos();
