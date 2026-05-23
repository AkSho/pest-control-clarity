import type { ActivityBand, Confidence } from "@/lib/rodentRadar";

export type AtlasRegion =
  | "NYC"
  | "Bay Area"
  | "NY/NJ metro"
  | "United States"
  | "Midwest"
  | "Northeast"
  | "Mid-Atlantic"
  | "Pacific Northwest"
  | "Canada";

export type AtlasPlace = {
  id: string;
  name: string;
  shortName: string;
  region: AtlasRegion;
  geo: string;
  lat: number;
  lng: number;
  transparencyStatus: "verified" | "partial" | "not-found" | "needs-review";
};

export type AtlasSource = {
  id: string;
  name: string;
  url: string;
  owner: string;
  sourceType: "official-open-data" | "official-guidance" | "context";
};

export type AtlasDataset = {
  id: string;
  sourceId: string;
  name: string;
  url: string;
  geography: string;
  updateCadence: string;
  filterNote: string;
  activityUse: "official-activity" | "context" | "guidance";
};

export type PressureMetricSnapshot = {
  id: string;
  placeId: string;
  datasetId: string;
  snapshotDate: string;
  queryWindow: string;
  sourceFilter: string;
  last12MonthsCount: number;
  previous12MonthsCount: number;
  recent90DayCount: number;
  confidence: Confidence;
  confidenceNote: string;
  methodologyNote: string;
};

export type ContextLayer = {
  id: string;
  name: string;
  label: string;
  description: string;
  sourceRequirement: string;
  scoringNote: string;
  status: "available-now" | "planned";
};

export type AtlasLayerRole = "official-activity" | "model" | "context" | "guidance" | "data-gap";

export type AtlasLayerDefinition = {
  id: string;
  name: string;
  group: string;
  description: string;
  role: AtlasLayerRole;
  defaultVisible: boolean;
  status: "available" | "partial" | "planned";
};

export type ExposureGuidance = {
  id: string;
  name: string;
  description: string;
  guidance: string[];
  sourceIds: string[];
  disclaimer: string;
};

export type WatchlistPlace = {
  placeId: string;
  reason: string;
  reviewedSourceName?: string;
  reviewedSourceUrl?: string;
  reviewedOn?: string;
  reviewNote?: string;
};

export type UnavailableRatPressureGeo = AtlasPlace & {
  reason: string;
  reviewedSourceName?: string;
  reviewedSourceUrl?: string;
  reviewedOn?: string;
  reviewNote?: string;
};

export type RatPressureResult = AtlasPlace &
  Omit<PressureMetricSnapshot, "id"> & {
    snapshotId: string;
    sourceName: string;
    sourceUrl: string;
    sourceDatasetId: string;
    activityIndex: number;
    activityBand: ActivityBand;
    trendPercent: number;
    recentSharePercent: number;
  };

export type ColonyGrowthProjection = {
  placeId: string;
  band: ActivityBand;
  label: string;
  estimateRange: string;
  days30: string;
  days60: string;
  days90: string;
  disclaimer: string;
};

const NYC_SOURCE_URL = "https://data.cityofnewyork.us/Health/Rodent-Inspection/p937-wjvj";
const NYC_311_NOTE_URL = "https://www.nyc.gov/311/nyc311-enhances-service-request-open-dataset.page";
const SF_SOURCE_URL = "https://data.sfgov.org/City-Infrastructure/311-Cases/vw6y-z8j6";
const OAKLAND_311_SOURCE_URL =
  "https://data.oaklandca.gov/Infrastructure/Service-requests-received-by-the-Oakland-Call-Cent/quth-gb8e";
const SAN_JOSE_311_SOURCE_URL = "https://data.sanjoseca.gov/dataset/311-service-request-data";
const JERSEY_CITY_OPEN_DATA_URL = "https://data.jerseycitynj.gov/explore/";
const NEWARK_OPEN_DATA_URL = "https://data.ci.newark.nj.us";
const CDC_HANTA_URL = "https://www.cdc.gov/hantavirus/";
const CDC_HANTA_PREVENTION_URL = "https://www.cdc.gov/hantavirus/prevention/index.html";
const CDC_CLEANUP_URL = "https://www.cdc.gov/healthy-pets/rodent-control/clean-up.html";
const CHICAGO_RODENT_URL = "https://data.cityofchicago.org/Service-Requests/311-Service-Requests/v6vf-nfxy";
const BOSTON_311_URL = "https://data.boston.gov/dataset/311-service-requests";
const DC_311_URL =
  "https://opendata.dc.gov/datasets/DCGIS::311-city-service-requests-in-2025";
const PHILLY_311_URL = "https://www.opendataphilly.org/dataset/311-service-and-information-requests";
const SEATTLE_FIF_URL = "https://data.seattle.gov/Community-and-Culture/Find-It-Fix-It-Service-Requests/p3i6-mdy7";
const TORONTO_311_URL = "https://open.toronto.ca/dataset/311-service-requests-customer-initiated/";
const DOHMH_VIOLATIONS_URL = "https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/43nn-pn8j";
const DSNY_MISSED_URL = "https://data.cityofnewyork.us/City-Government/DSNY-Bulk-Item-Frequency/by5n-fxyh";
const CHICAGO_FOOD_URL = "https://data.cityofchicago.org/Health-Human-Services/Food-Inspections/4ijn-s7e5";
const HUD_VACANCY_URL = "https://www.huduser.gov/portal/datasets/usps.html";

export const atlasSources: AtlasSource[] = [
  {
    id: "nyc-rodent-inspection",
    name: "NYC Open Data Rodent Inspection",
    url: NYC_SOURCE_URL,
    owner: "New York City",
    sourceType: "official-open-data",
  },
  {
    id: "nyc-311-open-dataset-note",
    name: "NYC311 open dataset note",
    url: NYC_311_NOTE_URL,
    owner: "New York City 311",
    sourceType: "official-open-data",
  },
  {
    id: "datasf-311-cases",
    name: "DataSF 311 Cases",
    url: SF_SOURCE_URL,
    owner: "City and County of San Francisco",
    sourceType: "official-open-data",
  },
  {
    id: "cdc-hantavirus",
    name: "CDC Hantavirus",
    url: CDC_HANTA_URL,
    owner: "Centers for Disease Control and Prevention",
    sourceType: "official-guidance",
  },
  {
    id: "cdc-hantavirus-prevention",
    name: "CDC Hantavirus prevention",
    url: CDC_HANTA_PREVENTION_URL,
    owner: "Centers for Disease Control and Prevention",
    sourceType: "official-guidance",
  },
  {
    id: "cdc-rodent-cleanup",
    name: "CDC rodent cleanup guidance",
    url: CDC_CLEANUP_URL,
    owner: "Centers for Disease Control and Prevention",
    sourceType: "official-guidance",
  },
  {
    id: "chicago-311",
    name: "Chicago 311 Service Requests",
    url: CHICAGO_RODENT_URL,
    owner: "City of Chicago",
    sourceType: "official-open-data",
  },
  {
    id: "boston-311",
    name: "Boston 311 Service Requests",
    url: BOSTON_311_URL,
    owner: "City of Boston",
    sourceType: "official-open-data",
  },
  {
    id: "dc-311",
    name: "Washington DC 311 City Service Requests",
    url: DC_311_URL,
    owner: "District of Columbia",
    sourceType: "official-open-data",
  },
  {
    id: "philly-311",
    name: "Philadelphia 311 Service & Information Requests",
    url: PHILLY_311_URL,
    owner: "City of Philadelphia",
    sourceType: "official-open-data",
  },
  {
    id: "seattle-fif",
    name: "Seattle Find It, Fix It Service Requests",
    url: SEATTLE_FIF_URL,
    owner: "City of Seattle",
    sourceType: "official-open-data",
  },
  {
    id: "toronto-311",
    name: "Toronto 311 Service Requests (Customer Initiated)",
    url: TORONTO_311_URL,
    owner: "City of Toronto",
    sourceType: "official-open-data",
  },
  {
    id: "nyc-dohmh-violations",
    name: "NYC DOHMH Restaurant Inspection Results",
    url: DOHMH_VIOLATIONS_URL,
    owner: "NYC Department of Health and Mental Hygiene",
    sourceType: "context",
  },
  {
    id: "nyc-dsny-bulk",
    name: "NYC DSNY Bulk Item Frequency",
    url: DSNY_MISSED_URL,
    owner: "NYC Department of Sanitation",
    sourceType: "context",
  },
  {
    id: "chicago-food-inspections",
    name: "Chicago Food Inspections",
    url: CHICAGO_FOOD_URL,
    owner: "City of Chicago",
    sourceType: "context",
  },
  {
    id: "hud-vacancy",
    name: "HUD USPS Vacancy Data",
    url: HUD_VACANCY_URL,
    owner: "U.S. Department of Housing and Urban Development",
    sourceType: "context",
  },
];

export const atlasDatasets: AtlasDataset[] = [
  {
    id: "p937-wjvj",
    sourceId: "nyc-rodent-inspection",
    name: "Rodent Inspection",
    url: NYC_SOURCE_URL,
    geography: "NYC boroughs",
    updateCadence: "Official open data portal",
    filterNote: "inspection_date grouped by borough",
    activityUse: "official-activity",
  },
  {
    id: "vw6y-z8j6",
    sourceId: "datasf-311-cases",
    name: "311 Cases",
    url: SF_SOURCE_URL,
    geography: "San Francisco",
    updateCadence: "Official open data portal",
    filterNote: "service fields containing rodent or vermin",
    activityUse: "official-activity",
  },
  {
    id: "v6vf-nfxy",
    sourceId: "chicago-311",
    name: "311 Service Requests — Rodent Baiting / Rat Complaint",
    url: CHICAGO_RODENT_URL,
    geography: "City of Chicago",
    updateCadence: "Daily on Chicago Open Data",
    filterNote: "sr_type = 'Rodent Baiting/Rat Complaint', filtered by created_date",
    activityUse: "official-activity",
  },
  {
    id: "boston-311-rodent",
    sourceId: "boston-311",
    name: "311 Service Requests — Rodent Activity / Mice / Rat Bite",
    url: BOSTON_311_URL,
    geography: "City of Boston",
    updateCadence: "Daily, split by year resource",
    filterNote: "type IN (Rodent Activity, Mice Infestation - Residential, Rat Bite), filtered by open_dt",
    activityUse: "official-activity",
  },
  {
    id: "dc-311-s0301",
    sourceId: "dc-311",
    name: "311 City Service Requests — Rodent Inspection and Treatment (S0301)",
    url: DC_311_URL,
    geography: "District of Columbia",
    updateCadence: "Daily, split by year layer",
    filterNote: "SERVICECODE = 'S0301', filtered by ADDDATE",
    activityUse: "official-activity",
  },
  {
    id: "nyc-dohmh-violations-ds",
    sourceId: "nyc-dohmh-violations",
    name: "DOHMH violations: evidence of mice / rats / live roaches",
    url: DOHMH_VIOLATIONS_URL,
    geography: "NYC",
    updateCadence: "Updated regularly",
    filterNote: "violation_description LIKE '%mice%' OR '%rats%' over rolling window",
    activityUse: "context",
  },
  {
    id: "nyc-dsny-bulk-ds",
    sourceId: "nyc-dsny-bulk",
    name: "DSNY collection signals (bulk + missed collection context)",
    url: DSNY_MISSED_URL,
    geography: "NYC",
    updateCadence: "Updated regularly",
    filterNote: "Bulk collection frequency, used as sanitation pressure context",
    activityUse: "context",
  },
  {
    id: "chicago-food-inspections-ds",
    sourceId: "chicago-food-inspections",
    name: "Chicago food establishment inspections — rodent / pest evidence",
    url: CHICAGO_FOOD_URL,
    geography: "City of Chicago",
    updateCadence: "Updated regularly",
    filterNote: "violations LIKE '%RODENT%' OR '%PEST%', commercial pressure context",
    activityUse: "context",
  },
  {
    id: "hud-vacancy-ds",
    sourceId: "hud-vacancy",
    name: "HUD USPS residential / business vacancy",
    url: HUD_VACANCY_URL,
    geography: "United States, ZIP / tract",
    updateCadence: "Quarterly",
    filterNote: "Vacancy rate as built-environment context, registration required",
    activityUse: "context",
  },
];

export const atlasPlaces: AtlasPlace[] = [
  {
    id: "brooklyn",
    name: "Brooklyn",
    shortName: "Brooklyn",
    region: "NYC",
    geo: "NYC borough",
    lat: 40.6782,
    lng: -73.9442,
    transparencyStatus: "verified",
  },
  {
    id: "manhattan",
    name: "Manhattan",
    shortName: "Manhattan",
    region: "NYC",
    geo: "NYC borough",
    lat: 40.7831,
    lng: -73.9712,
    transparencyStatus: "verified",
  },
  {
    id: "bronx",
    name: "Bronx",
    shortName: "Bronx",
    region: "NYC",
    geo: "NYC borough",
    lat: 40.8448,
    lng: -73.8648,
    transparencyStatus: "verified",
  },
  {
    id: "queens",
    name: "Queens",
    shortName: "Queens",
    region: "NYC",
    geo: "NYC borough",
    lat: 40.7282,
    lng: -73.7949,
    transparencyStatus: "verified",
  },
  {
    id: "staten-island",
    name: "Staten Island",
    shortName: "Staten Island",
    region: "NYC",
    geo: "NYC borough",
    lat: 40.5795,
    lng: -74.1502,
    transparencyStatus: "verified",
  },
  {
    id: "san-francisco",
    name: "San Francisco",
    shortName: "San Francisco",
    region: "Bay Area",
    geo: "City",
    lat: 37.7749,
    lng: -122.4194,
    transparencyStatus: "partial",
  },
  {
    id: "jersey-city",
    name: "Jersey City",
    shortName: "Jersey City",
    region: "NY/NJ metro",
    geo: "City",
    lat: 40.7178,
    lng: -74.0431,
    transparencyStatus: "not-found",
  },
  {
    id: "newark",
    name: "Newark",
    shortName: "Newark",
    region: "NY/NJ metro",
    geo: "City",
    lat: 40.7357,
    lng: -74.1724,
    transparencyStatus: "not-found",
  },
  {
    id: "oakland",
    name: "Oakland",
    shortName: "Oakland",
    region: "Bay Area",
    geo: "City",
    lat: 37.8044,
    lng: -122.2712,
    transparencyStatus: "partial",
  },
  {
    id: "san-jose",
    name: "San Jose",
    shortName: "San Jose",
    region: "Bay Area",
    geo: "City",
    lat: 37.3382,
    lng: -121.8863,
    transparencyStatus: "partial",
  },
];

export const pressureMetricSnapshots: PressureMetricSnapshot[] = [
  {
    id: "brooklyn-2026-05-21",
    placeId: "brooklyn",
    datasetId: "p937-wjvj",
    snapshotDate: "2026-05-21",
    queryWindow: "2025-05-21 through 2026-05-21",
    sourceFilter: "inspection_date from 2025-05-21 through 2026-05-21, grouped by borough",
    last12MonthsCount: 87537,
    previous12MonthsCount: 89352,
    recent90DayCount: 29330,
    confidence: "high",
    confidenceNote: "Direct official rodent inspection dataset.",
    methodologyNote: "Counts are inspection records, not unique rats or unique properties.",
  },
  {
    id: "manhattan-2026-05-21",
    placeId: "manhattan",
    datasetId: "p937-wjvj",
    snapshotDate: "2026-05-21",
    queryWindow: "2025-05-21 through 2026-05-21",
    sourceFilter: "inspection_date from 2025-05-21 through 2026-05-21, grouped by borough",
    last12MonthsCount: 67317,
    previous12MonthsCount: 76144,
    recent90DayCount: 16724,
    confidence: "high",
    confidenceNote: "Direct official rodent inspection dataset.",
    methodologyNote: "Counts are inspection records, not unique rats or unique properties.",
  },
  {
    id: "bronx-2026-05-21",
    placeId: "bronx",
    datasetId: "p937-wjvj",
    snapshotDate: "2026-05-21",
    queryWindow: "2025-05-21 through 2026-05-21",
    sourceFilter: "inspection_date from 2025-05-21 through 2026-05-21, grouped by borough",
    last12MonthsCount: 44783,
    previous12MonthsCount: 46870,
    recent90DayCount: 10536,
    confidence: "high",
    confidenceNote: "Direct official rodent inspection dataset.",
    methodologyNote: "Counts are inspection records, not unique rats or unique properties.",
  },
  {
    id: "queens-2026-05-21",
    placeId: "queens",
    datasetId: "p937-wjvj",
    snapshotDate: "2026-05-21",
    queryWindow: "2025-05-21 through 2026-05-21",
    sourceFilter: "inspection_date from 2025-05-21 through 2026-05-21, grouped by borough",
    last12MonthsCount: 11502,
    previous12MonthsCount: 15750,
    recent90DayCount: 2287,
    confidence: "high",
    confidenceNote: "Direct official rodent inspection dataset.",
    methodologyNote: "Counts are inspection records, not unique rats or unique properties.",
  },
  {
    id: "staten-island-2026-05-21",
    placeId: "staten-island",
    datasetId: "p937-wjvj",
    snapshotDate: "2026-05-21",
    queryWindow: "2025-05-21 through 2026-05-21",
    sourceFilter: "inspection_date from 2025-05-21 through 2026-05-21, grouped by borough",
    last12MonthsCount: 1414,
    previous12MonthsCount: 1730,
    recent90DayCount: 276,
    confidence: "high",
    confidenceNote: "Direct official rodent inspection dataset.",
    methodologyNote: "Counts are inspection records, not unique rats or unique properties.",
  },
  {
    id: "san-francisco-2026-05-21",
    placeId: "san-francisco",
    datasetId: "vw6y-z8j6",
    snapshotDate: "2026-05-21",
    queryWindow: "2025-05-21 through 2026-05-20",
    sourceFilter: "requested_datetime from 2025-05-21 through 2026-05-20, service fields containing rodent or vermin",
    last12MonthsCount: 723,
    previous12MonthsCount: 612,
    recent90DayCount: 192,
    confidence: "medium",
    confidenceNote: "Official 311 cases filtered by rodent/vermin terms; category also includes insect infestation wording.",
    methodologyNote: "Counts are public service requests, not unique rats or confirmed infestations.",
  },
];

export const watchlistPlaces: WatchlistPlace[] = [
  {
    placeId: "jersey-city",
    reason: "Jersey City has an open data portal, but no clean citywide rodent complaint or inspection dataset was confirmed in the portal review.",
    reviewedSourceName: "Jersey City Open Data",
    reviewedSourceUrl: JERSEY_CITY_OPEN_DATA_URL,
    reviewedOn: "2026-05-21",
    reviewNote: "Portal search did not confirm a citywide 311, rodent, vermin, or health-inspection dataset suitable for pressure scoring.",
  },
  {
    placeId: "newark",
    reason: "Newark has official health/rodent-control information, but no accessible public rodent complaint dataset was confirmed for scoring.",
    reviewedSourceName: "Newark Open Data",
    reviewedSourceUrl: NEWARK_OPEN_DATA_URL,
    reviewedOn: "2026-05-21",
    reviewNote: "The open-data endpoint could not be audited from this environment, and no filterable rodent complaint dataset was confirmed.",
  },
  {
    placeId: "oakland",
    reason: "Oakland publishes official 311-style service requests, but the reviewed category and description fields did not expose a clean rodent/vermin request type.",
    reviewedSourceName: "Service requests received by the Oakland Call Center (OAK 311)",
    reviewedSourceUrl: OAKLAND_311_SOURCE_URL,
    reviewedOn: "2026-05-21",
    reviewNote: "Reviewed DESCRIPTION and REQCATEGORY fields; keyword matches were false positives rather than a reliable rodent taxonomy.",
  },
  {
    placeId: "san-jose",
    reason: "San Jose publishes official 311 service request CSVs, but the reviewed service-type/category fields did not include a rodent or vermin type.",
    reviewedSourceName: "San Jose 311 Service Request Data",
    reviewedSourceUrl: SAN_JOSE_311_SOURCE_URL,
    reviewedOn: "2026-05-21",
    reviewNote: "Reviewed current service type and category values; no rodent, rat, mice, or vermin service type was found.",
  },
];

export const contextLayers: ContextLayer[] = [
  {
    id: "sanitation-context",
    name: "Sanitation context",
    label: "Context only",
    description: "Trash, waste, and sanitation signals can help explain where rodent pressure may become visible.",
    sourceRequirement: "Official city sanitation or 311 datasets only.",
    scoringNote: "Context only. Not included in official Rodent Activity.",
    status: "planned",
  },
  {
    id: "restaurant-violations",
    name: "Restaurant rodent violations",
    label: "Context only",
    description: "Food-establishment rodent violations can help PMPs and local readers understand commercial pressure.",
    sourceRequirement: "Official inspection datasets with auditable rodent violation fields.",
    scoringNote: "Context only unless promoted through a future official-activity review.",
    status: "planned",
  },
  {
    id: "built-environment",
    name: "Built environment",
    label: "Context only",
    description: "Density, housing age, transit, alleys, and land-use context can make the atlas more explorable.",
    sourceRequirement: "Public civic datasets or federal datasets with clear geography.",
    scoringNote: "Context only. Not included in official Rodent Activity.",
    status: "planned",
  },
];

export const atlasLayerDefinitions: AtlasLayerDefinition[] = [
  {
    id: "rodent-activity",
    name: "Rodent Activity",
    group: "Activity",
    description: "Official rodent inspections, complaints, or auditable rodent/vermin 311 records.",
    role: "official-activity",
    defaultVisible: true,
    status: "available",
  },
  {
    id: "colony-growth",
    name: "Colony Growth",
    group: "Model",
    description: "Estimated growth trajectory based on activity band and calculator-style assumptions.",
    role: "model",
    defaultVisible: false,
    status: "partial",
  },
  {
    id: "recent-reports",
    name: "Recent Reports",
    group: "Activity",
    description: "Recent 90-day official report share from verified datasets.",
    role: "official-activity",
    defaultVisible: true,
    status: "available",
  },
  {
    id: "seasonality",
    name: "Seasonality",
    group: "Conditions",
    description: "Recent reporting pattern and seasonal movement context.",
    role: "context",
    defaultVisible: true,
    status: "partial",
  },
  {
    id: "conditions",
    name: "Conditions",
    group: "Conditions",
    description: "Trash, food inspection, housing, weather, density, vacancy, and building context.",
    role: "context",
    defaultVisible: false,
    status: "planned",
  },
  {
    id: "data-gaps",
    name: "Data Gaps",
    group: "Transparency",
    description: "Watchlist cities with reviewed sources and no verified rodent activity layer yet.",
    role: "data-gap",
    defaultVisible: true,
    status: "available",
  },
  {
    id: "exposure-safety",
    name: "Exposure Safety",
    group: "Guidance",
    description: "CDC-backed cleanup guidance; not a local disease-risk prediction.",
    role: "guidance",
    defaultVisible: false,
    status: "available",
  },
];

export const exposureGuidance: ExposureGuidance = {
  id: "rodent-exposure-safety",
  name: "Rodent Exposure Safety",
  description: "CDC-backed cleanup and exposure guidance for rodent droppings, urine, nesting material, and contaminated dust.",
  guidance: [
    "Avoid sweeping or vacuuming dry rodent droppings or nesting material.",
    "Ventilate enclosed spaces before cleanup when it is safe to do so.",
    "Use disinfectant or a bleach solution before removing droppings or nesting material.",
    "Take enclosed spaces, garages, sheds, cabins, vehicles, and heavy droppings seriously.",
    "Contact a healthcare professional if you feel unwell after rodent exposure.",
  ],
  sourceIds: ["cdc-hantavirus", "cdc-hantavirus-prevention", "cdc-rodent-cleanup"],
  disclaimer:
    "This layer is educational. It does not diagnose illness or predict local Hantavirus risk from rat pressure data.",
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function bandFromScore(score: number): ActivityBand {
  if (score >= 75) return "severe";
  if (score >= 50) return "high";
  if (score >= 25) return "moderate";
  return "low";
}

function getDataset(datasetId: string) {
  const dataset = atlasDatasets.find((item) => item.id === datasetId);
  if (!dataset) throw new Error(`Missing atlas dataset: ${datasetId}`);
  return dataset;
}

function getSource(sourceId: string) {
  const source = atlasSources.find((item) => item.id === sourceId);
  if (!source) throw new Error(`Missing atlas source: ${sourceId}`);
  return source;
}

function getPlace(placeId: string) {
  const place = atlasPlaces.find((item) => item.id === placeId);
  if (!place) throw new Error(`Missing atlas place: ${placeId}`);
  return place;
}

export function validateAtlasData() {
  for (const snapshot of pressureMetricSnapshots) {
    const place = getPlace(snapshot.placeId);
    const dataset = getDataset(snapshot.datasetId);
    const source = getSource(dataset.sourceId);

    if (place.transparencyStatus === "not-found" || place.transparencyStatus === "needs-review") {
      throw new Error(`Unverified place cannot have an official activity layer: ${place.id}`);
    }

    if (!source.url || !snapshot.snapshotDate || !snapshot.queryWindow || !snapshot.sourceFilter) {
      throw new Error(`Incomplete activity snapshot: ${snapshot.id}`);
    }
  }
}

export function getRatPressureResults(): RatPressureResult[] {
  validateAtlasData();
  const maxCount = Math.max(...pressureMetricSnapshots.map((snapshot) => snapshot.last12MonthsCount));

  return pressureMetricSnapshots
    .map((snapshot) => {
      const place = getPlace(snapshot.placeId);
      const dataset = getDataset(snapshot.datasetId);
      const source = getSource(dataset.sourceId);
      const countScore = (Math.log1p(snapshot.last12MonthsCount) / Math.log1p(maxCount)) * 60;
      const trendPercent =
        snapshot.previous12MonthsCount > 0
          ? ((snapshot.last12MonthsCount - snapshot.previous12MonthsCount) / snapshot.previous12MonthsCount) * 100
          : 0;
      const trendScore = clamp((trendPercent + 25) / 50, 0, 1) * 25;
      const recentSharePercent =
        snapshot.last12MonthsCount > 0 ? (snapshot.recent90DayCount / snapshot.last12MonthsCount) * 100 : 0;
      const recentScore = clamp((recentSharePercent - 18) / 12, 0, 1) * 15;
      const activityIndex = Math.round(countScore + trendScore + recentScore);

      return {
        ...snapshot,
        ...place,
        snapshotId: snapshot.id,
        sourceName: source.name,
        sourceUrl: source.url,
        sourceDatasetId: dataset.id,
        activityIndex,
        activityBand: bandFromScore(activityIndex),
        trendPercent: Math.round(trendPercent * 10) / 10,
        recentSharePercent: Math.round(recentSharePercent * 10) / 10,
      };
    })
    .sort((a, b) => b.activityIndex - a.activityIndex);
}

export function getUnavailableRatPressureGeos(): UnavailableRatPressureGeo[] {
  return watchlistPlaces.map((watchlist) => {
    const place = getPlace(watchlist.placeId);
    return {
      ...place,
      reason: watchlist.reason,
      reviewedSourceName: watchlist.reviewedSourceName,
      reviewedSourceUrl: watchlist.reviewedSourceUrl,
      reviewedOn: watchlist.reviewedOn,
      reviewNote: watchlist.reviewNote,
    };
  });
}

export function getAtlasSourceCards() {
  return atlasSources.map((source) => ({
    name: source.name,
    url: source.url,
    id: source.id,
  }));
}

export function getAtlasLayerDefinitions() {
  return atlasLayerDefinitions;
}

export function getColonyGrowthProjection(city: RatPressureResult): ColonyGrowthProjection {
  const rangeByBand: Record<ActivityBand, string> = {
    low: "early activity",
    moderate: "small established pocket",
    high: "established colony pattern",
    severe: "heavy replacement pattern",
  };
  const copyByBand: Record<ActivityBand, Pick<ColonyGrowthProjection, "days30" | "days60" | "days90" | "label">> = {
    low: {
      label: "early",
      days30: "May stay stable if food and entry points are fixed.",
      days60: "Can remain low with monitoring and cleanup.",
      days90: "May rise if signs keep appearing.",
    },
    moderate: {
      label: "building",
      days30: "Activity may become more regular.",
      days60: "Nest or travel routes may become established.",
      days90: "Repeat sightings become more likely.",
    },
    high: {
      label: "established",
      days30: "Activity may spread toward nearby food or shelter.",
      days60: "Replacement pressure can keep activity visible.",
      days90: "A recurring pattern is likely without deeper control.",
    },
    severe: {
      label: "heavy",
      days30: "Activity is already heavy.",
      days60: "New activity may keep replacing removed rodents.",
      days90: "Multiple control layers are usually needed.",
    },
  };
  const copy = copyByBand[city.activityBand];

  return {
    placeId: city.id,
    band: city.activityBand,
    label: copy.label,
    estimateRange: rangeByBand[city.activityBand],
    days30: copy.days30,
    days60: copy.days60,
    days90: copy.days90,
    disclaimer: "Modeled colony trajectory, not official city data and not a rat population count.",
  };
}

export function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}
