import { createFileRoute, Link, retainSearchParams, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Check,
  CircleDot,
  Copy,
  Crosshair,
  Database,
  ExternalLink,
  Globe2,
  ImageDown,
  Info,
  Layers3,
  Map,
  Menu,
  MapPin,
  RefreshCcw,
  Search,
  Share2,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Sun,
  Wifi,
  X,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { activityBandLabels, type ActivityBand } from "@/lib/rodentRadar";
import {
  ahsEstimatePins,
  AHS_META,
  comparePlaceToCohort,
  exposureGuidance,
  formatCount,
  getAtlasLayerDefinitions,
  getAtlasSourceCards,
  getColonyGrowthProjection,
  getRatPressureResults,
  METRIC_EXPLAINERS,
  plainBandLede,
  plainColonyBlurb,
  plainConfidence,
  plainRecentVsCohortLabel,
  plainTrendLabel,
  PRESSURE_BAND_THRESHOLDS,
  PROVENANCE_CAVEATS,
  PROVENANCE_LABELS,
  unavailableRatPressureGeos,
  type AhsEstimatePin,
  type AtlasLayerDefinition,
  type PlaceCohortComparison,
  type Provenance,
  type RatPressureResult,
  type UnavailableRatPressureGeo,
} from "@/lib/ratPressureMap";
import {
  DEFAULT_LAYERS,
  DISPLAY_MODES,
  PRESET_IDS,
  rodentRadarSearchSchema,
  type AtlasLayerId,
  type DisplayMode,
  type PresetId,
  type RodentRadarSearch,
} from "@/lib/rodentRadarSearch";
import zipToPlaceData from "../../public/rodent-radar/data/zip-to-place.json";
import { AtlasSidebar, AtlasSidebarBody, type MetricKey } from "@/components/rodent-radar/AtlasSidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { type LayerCardItem } from "@/components/rodent-radar/LayerCard";
import { AtlasToolbar } from "@/components/rodent-radar/AtlasToolbar";
import { CinematicToggle } from "@/components/rodent-radar/CinematicToggle";
import {
  CuratedViews,
  getCuratedViewCamera,
  type CuratedViewId,
} from "@/components/rodent-radar/CuratedViews";
import { ReportPopup } from "@/components/rodent-radar/ReportPopup";
import {
  getReportsAsGeoJSON,
  getReportPlace,
  getReportPlaceLabel,
  groupByAddress,
  findGroupAt,
  loadReportSnapshot,
  type AddressGroup,
  type RodentReport,
} from "@/lib/rodent-radar/reports";
import {
  getFoodPestEvidenceAsGeoJSON,
  loadFoodPestEvidenceSnapshot,
  type FoodPestEvidence,
} from "@/lib/rodent-radar/context";
import {
  CLUSTER_RADIUS_EXPRESSION,
  RECENCY_COLOR_EXPRESSION,
  RECENCY_RAMP,
} from "@/lib/rodent-radar/encoding";


// z-index ladder so map chrome stops fighting itself.
const Z = {
  mapControls: 20,
  rail: 30,
  topTools: 35,
  drawer: 40,
  fieldChip: 45,
  popover: 60,
} as const;

// One-line answer to "what am I looking at?" — changes with active preset.
const LEDE_BY_PRESET: Record<PresetId | "default", string> = {
  default: "Every dot is a real public report. Repeated activity nearby may show a pattern.",
  winning: "Official rodent reports across verified city datasets.",
  seasonal: "How recent rodent reports shift across the last 90 days.",
  gaps: "Cities where we don't have verified data yet.",
  "your-block": "Official rodent activity near a ZIP or current location.",
};

type MapLibreModule = typeof import("maplibre-gl");
type MapLibreMap = import("maplibre-gl").Map;
type MapLibreLayerMouseEvent = import("maplibre-gl").MapLayerMouseEvent;
type MapLibreGeoJSONSource = import("maplibre-gl").GeoJSONSource;

type UtilityPanel = "layers" | "sources" | "map-type" | null;
type MapType = "dark" | "voyager" | "light";
type AsyncSnapshotState = "idle" | "loading" | "ready" | "error";

const TITLE = "Rodent Radar: Rodent Activity Atlas";
const DESCRIPTION =
  "Explore official rodent activity, recurring report patterns, civic conditions, data gaps, and exposure-safety guidance in a dark interactive atlas.";
const CANONICAL_URL = "https://cloakd-removals.cloud/rodent-radar/rat-pressure-map";
const SOURCES = getAtlasSourceCards();
const ZIP_TO_PLACE = (zipToPlaceData as { zips: Record<string, string> }).zips;

type PlaceFocusBounds = {
  id: string;
  name: string;
  bbox: [number, number, number, number]; // west, south, east, north
  tone: "verified" | "gap";
};

const PLACE_FOCUS_BOUNDS: Record<string, PlaceFocusBounds> = {
  nyc: { id: "nyc", name: "New York City", bbox: [-74.26, 40.47, -73.7, 40.92], tone: "verified" },
  brooklyn: { id: "brooklyn", name: "Brooklyn", bbox: [-74.06, 40.55, -73.84, 40.74], tone: "verified" },
  manhattan: { id: "manhattan", name: "Manhattan", bbox: [-74.03, 40.69, -73.91, 40.88], tone: "verified" },
  bronx: { id: "bronx", name: "Bronx", bbox: [-73.93, 40.78, -73.76, 40.92], tone: "verified" },
  queens: { id: "queens", name: "Queens", bbox: [-73.96, 40.53, -73.7, 40.81], tone: "verified" },
  "staten-island": { id: "staten-island", name: "Staten Island", bbox: [-74.26, 40.47, -74.05, 40.65], tone: "verified" },
  sf: { id: "sf", name: "San Francisco", bbox: [-122.52, 37.7, -122.35, 37.83], tone: "verified" },
  "san-francisco": { id: "san-francisco", name: "San Francisco", bbox: [-122.52, 37.7, -122.35, 37.83], tone: "verified" },
  chicago: { id: "chicago", name: "Chicago", bbox: [-87.94, 41.64, -87.52, 42.03], tone: "verified" },
  boston: { id: "boston", name: "Boston", bbox: [-71.2, 42.23, -70.99, 42.4], tone: "verified" },
  dc: { id: "dc", name: "Washington, D.C.", bbox: [-77.12, 38.79, -76.91, 38.99], tone: "verified" },
  "washington-dc": { id: "washington-dc", name: "Washington, D.C.", bbox: [-77.12, 38.79, -76.91, 38.99], tone: "verified" },
  baltimore: { id: "baltimore", name: "Baltimore", bbox: [-76.72, 39.19, -76.52, 39.38], tone: "verified" },
  newark: { id: "newark", name: "Newark", bbox: [-74.25, 40.67, -74.12, 40.8], tone: "verified" },
  "new-orleans": { id: "new-orleans", name: "New Orleans", bbox: [-90.14, 29.88, -89.9, 30.08], tone: "verified" },
  "jersey-city": { id: "jersey-city", name: "Jersey City", bbox: [-74.1, 40.68, -74.03, 40.76], tone: "gap" },
  oakland: { id: "oakland", name: "Oakland", bbox: [-122.36, 37.7, -122.11, 37.9], tone: "gap" },
  "san-jose": { id: "san-jose", name: "San Jose", bbox: [-122.05, 37.12, -121.7, 37.47], tone: "gap" },
  philadelphia: { id: "philadelphia", name: "Philadelphia", bbox: [-75.28, 39.86, -74.95, 40.14], tone: "gap" },
  philly: { id: "philly", name: "Philadelphia", bbox: [-75.28, 39.86, -74.95, 40.14], tone: "gap" },
  seattle: { id: "seattle", name: "Seattle", bbox: [-122.46, 47.49, -122.22, 47.74], tone: "gap" },
  toronto: { id: "toronto", name: "Toronto", bbox: [-79.64, 43.58, -79.12, 43.86], tone: "gap" },
};

function getPlaceFocusFeature(placeId?: string) {
  if (!placeId) return null;
  const focus = PLACE_FOCUS_BOUNDS[placeId];
  if (!focus) return null;
  const [west, south, east, north] = focus.bbox;
  return {
    type: "Feature" as const,
    geometry: {
      type: "Polygon" as const,
      coordinates: [[
        [west, south],
        [east, south],
        [east, north],
        [west, north],
        [west, south],
      ]],
    },
    properties: {
      id: focus.id,
      name: focus.name,
      tone: focus.tone,
      centerLng: (west + east) / 2,
      centerLat: (south + north) / 2,
    },
  };
}

function getPlaceFocusBounds(placeId?: string) {
  return placeId ? PLACE_FOCUS_BOUNDS[placeId] : undefined;
}

const layerIcons: Record<AtlasLayerId, LucideIcon> = {
  "rodent-activity": Activity,
  "colony-growth": BarChart3,
  "recent-reports": CircleDot,
  seasonality: Crosshair,
  conditions: Globe2,
  "data-gaps": AlertCircle,
  "exposure-safety": ShieldCheck,
};

const layerColors: Record<AtlasLayerId, string> = {
  "rodent-activity": "#67e8f9",
  "colony-growth": "#c084fc",
  "recent-reports": "#facc15",
  seasonality: "#38bdf8",
  conditions: "#34d399",
  "data-gaps": "#94a3b8",
  "exposure-safety": "#fb7185",
};

export const Route = createFileRoute("/rodent-radar_/rat-pressure-map")({
  validateSearch: zodValidator(rodentRadarSearchSchema),
  search: { middlewares: [retainSearchParams(["mode"])] },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "@id": `${CANONICAL_URL}#atlas`,
              name: TITLE,
              url: CANONICAL_URL,
              applicationCategory: "UtilitiesApplication",
              description: DESCRIPTION,
              provider: {
                "@type": "Organization",
                name: "Cloakd Removals",
                url: "https://cloakd-removals.cloud",
              },
            },
            ...SOURCES.map((source) => ({
              "@type": "Dataset",
              name: source.name,
              identifier: source.id,
              url: source.url,
            })),
          ],
        }),
      },
    ],
  }),
  component: RodentRadarAtlasPage,
});


function bandTone(band: ActivityBand) {
  const tones: Record<ActivityBand, string> = {
    low: "text-emerald-200 border-emerald-300/40 bg-emerald-400/10",
    moderate: "text-yellow-200 border-yellow-300/40 bg-yellow-400/10",
    high: "text-orange-200 border-orange-300/40 bg-orange-400/10",
    severe: "text-rose-200 border-rose-300/40 bg-rose-400/10",
  };
  return tones[band];
}

const MARKER_TONES_STANDARD: Record<ActivityBand, string> = {
  low: "#34d399",
  moderate: "#facc15",
  high: "#fb923c",
  severe: "#fb7185",
};

const MARKER_TONES_HC: Record<ActivityBand, string> = {
  low: "#6ee7b7",
  moderate: "#fde047",
  high: "#ffb86b",
  severe: "#ff8fa3",
};

function markerTone(band: ActivityBand, mode: DisplayMode = "standard") {
  return (mode === "high-contrast" ? MARKER_TONES_HC : MARKER_TONES_STANDARD)[band];
}

// Normalize a chosen metric to a 0..100 scale so the map's circle-radius
// interpolation reads one consistent property regardless of which metric the
// user picked. activityIndex is already 0..100; the rest get rescaled against
// the dataset's own max so the loudest place reads "loud" on every metric.
function rawMetric(city: RatPressureResult, metric: MetricKey): number {
  switch (metric) {
    case "reports":
    case "housing":
    case "recurring":
      return city.last12MonthsCount;
    case "recent90":
      return city.recent90DayCount;
    case "absolute12mo":
      return city.last12MonthsCount;
    case "trend12mo": {
      // Year-over-year % change, clamped to a reasonable range so a single
      // outlier doesn't flatten everyone else.
      const prev = Math.max(1, city.previous12MonthsCount);
      const pct = ((city.last12MonthsCount - prev) / prev) * 100;
      return Math.max(-100, Math.min(200, pct));
    }
    case "index":
    default:
      return city.activityIndex;
  }
}

function computeMetricValues(cities: RatPressureResult[], metric: MetricKey) {
  const raws = cities.map((c) => rawMetric(c, metric));
  const out: Record<string, number> = {};
  if (metric === "index") {
    cities.forEach((c, i) => { out[c.id] = raws[i]; });
    return out;
  }
  if (metric === "trend12mo") {
    cities.forEach((c, i) => {
      out[c.id] = Math.max(0, Math.min(100, ((raws[i] + 100) / 300) * 100));
    });
    return out;
  }
  const max = Math.max(1, ...raws);
  cities.forEach((c, i) => { out[c.id] = (raws[i] / max) * 100; });
  return out;
}

type PresetMeta = {
  id: PresetId;
  label: string;
  hint: string;
  icon: LucideIcon;
};

const PRESETS: PresetMeta[] = [
  { id: "winning", label: "Where reports cluster", hint: "Top activity, 12 mo", icon: Sparkles },
  { id: "seasonal", label: "The seasonal swing", hint: "Recent 90 d", icon: Snowflake },
  { id: "gaps", label: "Data gaps in America", hint: "Cities without clean data", icon: AlertCircle },
  { id: "your-block", label: "Your block", hint: "Geolocate or ZIP", icon: MapPin },
];

type PresetApply = {
  layers: AtlasLayerId[];
  window: "12mo" | "90d" | "30d";
  zoom?: number;
  center?: [number, number];
  place?: string;
};

function nearestPlaceByCoord(lat: number, lng: number, candidates: RatPressureResult[]) {
  let best = candidates[0];
  let bestDist = Number.POSITIVE_INFINITY;
  for (const c of candidates) {
    const d = (c.lat - lat) ** 2 + (c.lng - lng) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = c;
    }
  }
  return best;
}

function RodentRadarAtlasPage() {
  const verified = useMemo(() => getRatPressureResults(), []);
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const activeLayers = search.layers;
  // Display mode + presets are deferred in the OGW-clone IA; pin them so
  // downstream marker tones + the rest of the existing AtlasMap keep working.
  const mode: DisplayMode = "standard";

  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [utilityPanel, setUtilityPanel] = useState<UtilityPanel>(null);
  const [mapType, setMapType] = useState<MapType>("dark");
  const [selectedAhs, setSelectedAhs] = useState<AhsEstimatePin | null>(null);
  const [metric, setMetric] = useState<MetricKey>("reports");
  // Coverage filter — which pin classes render on the map + appear in the
  // sidebar list. Reviewed gaps + estimates default on per the locked plan
  // (live pins + visible gap markers in the launch view).
  const [showCoverage, setShowCoverage] = useState({
    live: true,
    gaps: true,
    estimates: false,
  });
  const [cinematic, setCinematic] = useState(false);
  const [activeView, setActiveView] = useState<CuratedViewId | null>(null);
  const [recurringOnly, setRecurringOnly] = useState(false);
  const [clickedGroup, setClickedGroup] = useState<AddressGroup | null>(null);
  const [selectedContext, setSelectedContext] = useState<FoodPestEvidence | null>(null);
  const [selectedReportPlaceId, setSelectedReportPlaceId] = useState("all");
  const [allReports, setAllReports] = useState<RodentReport[]>([]);
  const [reportsState, setReportsState] = useState<AsyncSnapshotState>("idle");
  const [reportsError, setReportsError] = useState<string | null>(null);
  const [foodPestEvidence, setFoodPestEvidence] = useState<FoodPestEvidence[]>([]);
  const [contextState, setContextState] = useState<AsyncSnapshotState>("idle");
  const [contextError, setContextError] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [pulseReports, setPulseReports] = useState(false);
  const [pulseHamburger, setPulseHamburger] = useState(false);
  const mapRef = useRef<MapLibreMap | null>(null);
  const contextLoadStartedRef = useRef(false);
  const isMountedRef = useRef(true);

  // Per-report data: the new primary unit. One feature = one filed report.
  // Loaded once, grouped by address for popup + recurrence detection.
  const addressGroups = useMemo(() => groupByAddress(allReports), [allReports]);
  const reportsGeoJSON = useMemo(
    () => getReportsAsGeoJSON(showCoverage.live ? allReports : []),
    [allReports, showCoverage.live],
  );
  const foodPestGeoJSON = useMemo(
    () => getFoodPestEvidenceAsGeoJSON(foodPestEvidence),
    [foodPestEvidence],
  );

  const selected = useMemo(
    () => verified.find((c) => c.id === search.place) ?? verified[0],
    [verified, search.place],
  );
  const selectedGap = useMemo(
    () => unavailableRatPressureGeos.find((c) => c.id === search.gap) ?? null,
    [search.gap],
  );
  const selectedFocusPlaceId = selectedGap?.id ?? selectedAhs?.id ?? (selectedReportPlaceId !== "all" ? selectedReportPlaceId : search.place);
  const activeSet = useMemo(() => new Set<AtlasLayerId>(activeLayers), [activeLayers]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setReportsState("loading");
    setReportsError(null);
    loadReportSnapshot()
      .then((records) => {
        if (cancelled) return;
        setAllReports(records);
        setReportsState("ready");
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setReportsError(error instanceof Error ? error.message : "Unable to load official records");
        setReportsState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!activeSet.has("conditions") || contextLoadStartedRef.current) return;
    contextLoadStartedRef.current = true;
    setContextState("loading");
    setContextError(null);
    loadFoodPestEvidenceSnapshot()
      .then((records) => {
        if (!isMountedRef.current) return;
        setFoodPestEvidence(records);
        setContextState("ready");
      })
      .catch((error: unknown) => {
        if (!isMountedRef.current) return;
        contextLoadStartedRef.current = false;
        setContextError(error instanceof Error ? error.message : "Unable to load context records");
        setContextState("error");
      });
  }, [activeSet]);

  const dataMix = useMemo(
    () => ({
      live: allReports.length,
      gaps: unavailableRatPressureGeos.length,
      estimates: 0,
    }),
    [allReports.length],
  );
  const verifiedPlaceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const report of allReports) {
      const place = getReportPlace(report);
      counts[place.id] = (counts[place.id] ?? 0) + 1;
    }
    return counts;
  }, [allReports]);

  const updateSearch = useCallback(
    (patch: Partial<RodentRadarSearch>) => {
      navigate({
        search: (prev: RodentRadarSearch) => ({ ...prev, ...patch }),
        replace: true,
      });
    },
    [navigate],
  );

  const selectVerified = useCallback(
    (city: RatPressureResult) => {
      setSelectedAhs(null);
      setSelectedReportPlaceId(city.id);
      setDrawerOpen(true);
      updateSearch({ place: city.id, gap: undefined });
    },
    [updateSearch],
  );

  const selectGap = useCallback(
    (city: UnavailableRatPressureGeo) => {
      setSelectedAhs(null);
      setSelectedReportPlaceId("all");
      setDrawerOpen(true);
      updateSearch({ gap: city.id });
    },
    [updateSearch],
  );

  const handleSelectAhs = useCallback(
    (c: AhsEstimatePin) => {
      setSelectedAhs(c);
      setDrawerOpen(true);
      updateSearch({ gap: undefined });
    },
    [updateSearch],
  );

  const toggleLayer = useCallback(
    (layerId: AtlasLayerId) => {
      const next = activeLayers.includes(layerId)
        ? activeLayers.filter((id: AtlasLayerId) => id !== layerId)
        : [...activeLayers, layerId];
      // Keep rodent-activity always on — it's the spine of the map.
      const normalized: AtlasLayerId[] = next.includes("rodent-activity")
        ? next
        : ["rodent-activity", ...next];
      updateSearch({ layers: normalized });
    },
    [activeLayers, updateSearch],
  );

  // Layer-card config. Reads as: "what optional overlays can the map carry?"
  // Coverage / gap pins are owned by the sidebar coverage toggle, so they
  // don't appear as a layer card.
  const officialLayer: LayerCardItem[] = [
    {
      id: "recent-reports",
      label: "Recent reports (90d)",
      description: "Highlight pins with activity in the last quarter.",
      icon: CircleDot,
      color: "#facc15",
    },
  ];
  const conditionLayers: LayerCardItem[] = [
    {
      id: "conditions",
      label: "Food inspection pest evidence",
      description: "NYC DOHMH pest-related food inspection violations. Context only.",
      icon: Globe2,
      color: "#f59e0b",
    },
    {
      id: "seasonality",
      label: "Seasonality",
      description: "Monthly rhythm from official report dates.",
      icon: Snowflake,
      color: "#38bdf8",
    },
  ];
  const modeledLayers: LayerCardItem[] = [
    {
      id: "colony-growth",
      label: "Recurring pattern model",
      description: "Modeled repeat-activity context. Interpretive, not observed.",
      icon: BarChart3,
      color: "#c084fc",
      gated: true,
      gatedDisclaimer:
        "This model interprets repeat activity from official records. It is not a rat population count, a city-published figure, or proof of a confirmed colony.",
    },
  ];
  const guidanceLayers: LayerCardItem[] = [
    {
      id: "exposure-safety",
      label: "Exposure safety",
      description: "CDC-backed cleanup guidance drawer, not a disease-risk map.",
      icon: ShieldCheck,
      color: "#fb7185",
    },
  ];

  // Filter the AtlasMap's input arrays by the coverage toggle so hidden
  // classes truly disappear from the canvas.
  // Memoize so reference stability stops the AtlasMap init-effect from
  // tearing the map down on every parent re-render (root cause of the
  // "map empty after closing modal" bug).
  const mapVerified = useMemo(() => [], []);
  const mapGaps = useMemo(() => (showCoverage.gaps ? unavailableRatPressureGeos : []), [showCoverage.gaps]);
  const mapAhs = useMemo(() => [], []);

  // Curated-view selection just adjusts camera + layer flags. Pure side effect.
  const handleCuratedView = useCallback(
    (id: CuratedViewId) => {
      setActiveView(id);
      const cam = getCuratedViewCamera(id);
      mapRef.current?.flyTo({ center: cam.center, zoom: cam.zoom, essential: true, duration: 1400 });
      if (id === "nyc-now") setRecurringOnly(true);
      else if (id === "replacement-belt") setRecurringOnly(true);
      else if (id === "data-ends") setRecurringOnly(false);
    },
    [],
  );

  // Cinematic mode strips all chrome and leaves the map. Keep the toggle
  // mounted so users can ESC back out.
  const onSelectGroup = useCallback((g: AddressGroup | null) => {
    setClickedGroup(g);
  }, []);

  const handleSelectVerifiedPlace = useCallback((placeId: string) => {
    const place = HERO_CITY_SUMMARIES(allReports).find((item) => item.id === placeId);
    if (!place) return;
    setSelectedReportPlaceId(placeId);
    setDrawerOpen(true);
    setSelectedAhs(null);
    updateSearch({ place: placeId, gap: undefined });
    mapRef.current?.flyTo({ center: [place.lng, place.lat], zoom: place.zoom, duration: 800, essential: true });
  }, [allReports, updateSearch]);


  return (
    <div className={`h-screen overflow-hidden bg-[#05080d] text-slate-100 ${cinematic ? "cinematic-mode" : ""}`}>
      <AtlasMap
        verified={mapVerified}
        unavailable={mapGaps}
        ahsPins={mapAhs}
        mapType={mapType}
        selected={selected}
        selectedGap={selectedGap}
        selectedAhs={selectedAhs}
        selectedFocusPlaceId={selectedFocusPlaceId}
        activeLayers={activeSet as Set<AtlasLayerId>}
        mode={mode}
        metric={metric}
        onSelectVerified={selectVerified}
        onSelectGap={selectGap}
        onSelectAhs={handleSelectAhs}
        mapRef={mapRef}
        reportsGeoJSON={reportsGeoJSON}
        foodPestGeoJSON={foodPestGeoJSON}
        foodPestEvidence={foodPestEvidence}
        addressGroups={addressGroups}
        recurringOnly={recurringOnly}
        onSelectGroup={onSelectGroup}
        onSelectContext={setSelectedContext}
      />

      <SnapshotStatusChip
        reportsState={reportsState}
        reportsError={reportsError}
        contextState={contextState}
        contextError={contextError}
        conditionsActive={activeSet.has("conditions")}
      />

      {/* Cinematic toggle + curated views — always mounted, hidden by CSS in cinematic */}
      <CinematicToggle cinematic={cinematic} onToggle={() => setCinematic((v) => !v)} />
      {!cinematic ? (
        <CuratedViews activeId={activeView} onSelect={handleCuratedView} />
      ) : null}

      {/* Mobile top bar: hamburger + search. Desktop uses AtlasToolbar instead. */}
      {!cinematic ? (
        <div className="pointer-events-auto absolute inset-x-0 top-0 z-[36] flex items-center gap-2 border-b border-white/[0.06] bg-slate-950/85 px-3 py-2 backdrop-blur md:hidden">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open layers and filters"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-slate-200 hover:text-cyan-100"
          >
            <Menu className="h-4 w-4" />
          </button>
          <label className="flex flex-1 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5">
            <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city, ZIP, or region"
              className="w-full bg-transparent text-[0.8rem] text-slate-100 placeholder-slate-500 focus:outline-none"
            />
          </label>
        </div>
      ) : null}

      {/* Per-report popup, anchored to clicked address group */}
      {clickedGroup ? (
        <div className="pointer-events-none absolute right-4 top-20 z-[55] flex">
          <ReportPopup group={clickedGroup} onClose={() => setClickedGroup(null)} />
        </div>
      ) : null}

      {selectedContext ? (
        <FoodPestContextPopup record={selectedContext} onClose={() => setSelectedContext(null)} />
      ) : null}

      {!cinematic ? (
        <>
          <AtlasSidebar
            metric={metric}
            onMetricChange={setMetric}
            gaps={unavailableRatPressureGeos}
            query={query}
            onQueryChange={setQuery}
            selectedGapId={selectedGap?.id}
            showCoverage={showCoverage}
            onShowCoverageChange={setShowCoverage}
            onSelectGap={selectGap}
            onSelectVerifiedPlace={handleSelectVerifiedPlace}
            selectedPlaceId={selectedReportPlaceId}
            dataMix={dataMix}
            recurringGroups={addressGroups.filter((group) => group.isRecurring)}
            verifiedPlaceCounts={verifiedPlaceCounts}
          />

          {/* Mobile drawer: same sidebar body, opened from the hamburger in the mobile top bar */}
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetContent
              side="left"
              className="w-[92vw] max-w-[360px] border-r border-white/[0.06] bg-slate-950/95 p-0 text-slate-200 sm:max-w-[360px] md:hidden"
            >
              <div className="flex h-full flex-col">
                <AtlasSidebarBody
                  gaps={unavailableRatPressureGeos}
                  query={query}
                  onQueryChange={setQuery}
                  selectedGapId={selectedGap?.id}
                  showCoverage={showCoverage}
                  onShowCoverageChange={setShowCoverage}
                  onSelectGap={(g) => { selectGap(g); setMobileNavOpen(false); }}
                  onSelectVerifiedPlace={(id) => { handleSelectVerifiedPlace(id); setMobileNavOpen(false); }}
                  selectedPlaceId={selectedReportPlaceId}
                  dataMix={dataMix}
                  recurringGroups={addressGroups.filter((group) => group.isRecurring)}
                  verifiedPlaceCounts={verifiedPlaceCounts}
                />
              </div>
            </SheetContent>
          </Sheet>

          <AtlasToolbar query={query} onQueryChange={setQuery} onOpenReports={() => setDrawerOpen(true)} />

          <BottomMapDock
            activePanel={utilityPanel}
            onPanelChange={setUtilityPanel}
            activeLayers={activeLayers}
            onToggleLayer={toggleLayer}
            officialLayers={officialLayer}
            conditionLayers={conditionLayers}
            modeledLayers={modeledLayers}
            guidanceLayers={guidanceLayers}
            mapType={mapType}
            onMapTypeChange={setMapType}
          />

          {activeLayers.includes("seasonality") ? (
            <SeasonalityRhythmPanel reports={allReports} onClose={() => toggleLayer("seasonality")} />
          ) : null}

          {activeLayers.includes("exposure-safety") ? (
            <ExposureSafetyDrawer onClose={() => toggleLayer("exposure-safety")} />
          ) : null}

          <RecordDrawer
            open={drawerOpen}
            reports={allReports}
            groups={addressGroups}
            gaps={unavailableRatPressureGeos}
            selectedGap={selectedGap}
            query={query}
            onQueryChange={setQuery}
            onCloseGap={() => updateSearch({ gap: undefined })}
            onClose={() => setDrawerOpen(false)}
            onOpen={() => setDrawerOpen(true)}
            onSelectGroup={setClickedGroup}
            onSelectGap={selectGap}
            mapRef={mapRef}
            selectedPlaceId={selectedReportPlaceId}
            onSelectedPlaceChange={setSelectedReportPlaceId}
            reportsState={reportsState}
            reportsError={reportsError}
          />
        </>
      ) : null}
    </div>
  );
}



function AtlasMap({
  verified,
  unavailable,
  ahsPins,
  mapType,
  selected,
  selectedGap,
  selectedAhs,
  selectedFocusPlaceId,
  activeLayers,
  mode,
  metric,
  onSelectVerified,
  onSelectGap,
  onSelectAhs,
  mapRef: externalMapRef,
  reportsGeoJSON,
  foodPestGeoJSON,
  foodPestEvidence,
  addressGroups,
  recurringOnly,
  onSelectGroup,
  onSelectContext,
}: {
  verified: RatPressureResult[];
  unavailable: UnavailableRatPressureGeo[];
  ahsPins: AhsEstimatePin[];
  mapType: MapType;
  selected: RatPressureResult;
  selectedGap: UnavailableRatPressureGeo | null;
  selectedAhs: AhsEstimatePin | null;
  selectedFocusPlaceId?: string;
  activeLayers: Set<AtlasLayerId>;
  mode: DisplayMode;
  metric: MetricKey;
  onSelectVerified: (city: RatPressureResult) => void;
  onSelectGap: (city: UnavailableRatPressureGeo) => void;
  onSelectAhs: (city: AhsEstimatePin) => void;
  mapRef?: React.MutableRefObject<MapLibreMap | null>;
  reportsGeoJSON: ReturnType<typeof getReportsAsGeoJSON>;
  foodPestGeoJSON: ReturnType<typeof getFoodPestEvidenceAsGeoJSON>;
  foodPestEvidence: FoodPestEvidence[];
  addressGroups: AddressGroup[];
  recurringOnly: boolean;
  onSelectGroup: (g: AddressGroup | null) => void;
  onSelectContext: (record: FoodPestEvidence | null) => void;
}) {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const internalMapRef = useRef<MapLibreMap | null>(null);
  const mapRef = externalMapRef ?? internalMapRef;
  const maplibreRef = useRef<MapLibreModule | null>(null);
  const addressGroupsRef = useRef(addressGroups);
  const foodPestEvidenceRef = useRef(foodPestEvidence);
  const selectedFocusPlaceIdRef = useRef(selectedFocusPlaceId);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    addressGroupsRef.current = addressGroups;
  }, [addressGroups]);

  useEffect(() => {
    foodPestEvidenceRef.current = foodPestEvidence;
  }, [foodPestEvidence]);

  useEffect(() => {
    selectedFocusPlaceIdRef.current = selectedFocusPlaceId;
  }, [selectedFocusPlaceId]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    async function loadMap() {
      const maplibre = await import("maplibre-gl");
      await import("maplibre-gl/dist/maplibre-gl.css");
      if (!containerRef.current || cancelled) return;

      maplibreRef.current = maplibre;
      const map = new maplibre.Map({
        container: containerRef.current,
        style: {
          version: 8,
          glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
          sources: {
            cartoDark: {
              type: "raster",
              tiles: [
                "https://a.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png",
                "https://b.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png",
                "https://c.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
              attribution: "© CARTO © OpenStreetMap contributors",
            },
            cartoVoyager: {
              type: "raster",
              tiles: [
                "https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
                "https://b.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
                "https://c.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
              attribution: "© CARTO © OpenStreetMap contributors",
            },
            cartoLight: {
              type: "raster",
              tiles: [
                "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
                "https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
                "https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
              attribution: "© CARTO © OpenStreetMap contributors",
            },
            cartoDarkLabels: {
              type: "raster",
              tiles: [
                "https://a.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png",
                "https://b.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png",
                "https://c.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
              attribution: "© CARTO © OpenStreetMap contributors",
            },
            cartoVoyagerLabels: {
              type: "raster",
              tiles: [
                "https://a.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png",
                "https://b.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png",
                "https://c.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
              attribution: "© CARTO © OpenStreetMap contributors",
            },
            cartoLightLabels: {
              type: "raster",
              tiles: [
                "https://a.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
                "https://b.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
                "https://c.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
              attribution: "© CARTO © OpenStreetMap contributors",
            },
          },
          layers: [
            { id: "bg", type: "background", paint: { "background-color": "#05070d" } },
            { id: "cartoDark", type: "raster", source: "cartoDark", paint: { "raster-opacity": 0.9, "raster-contrast": 0.08 } },
            { id: "cartoVoyager", type: "raster", source: "cartoVoyager", layout: { visibility: "none" }, paint: { "raster-opacity": 0.85 } },
            { id: "cartoLight", type: "raster", source: "cartoLight", layout: { visibility: "none" }, paint: { "raster-opacity": 0.9 } },
            { id: "cartoDarkLabels", type: "raster", source: "cartoDarkLabels", paint: { "raster-opacity": 0.62, "raster-contrast": 0.18 } },
            { id: "cartoVoyagerLabels", type: "raster", source: "cartoVoyagerLabels", layout: { visibility: "none" }, paint: { "raster-opacity": 0.58, "raster-contrast": 0.08 } },
            { id: "cartoLightLabels", type: "raster", source: "cartoLightLabels", layout: { visibility: "none" }, paint: { "raster-opacity": 0.68 } },
          ],
        },
        center: [-40, 28],
        zoom: 1.6,
        attributionControl: false,
        // @ts-expect-error globe projection added in maplibre-gl v5
        projection: { type: "globe" },
      });
      mapRef.current = map;
      map.addControl(new maplibre.AttributionControl({ compact: true }), "bottom-right");

      map.on("load", () => {
        if (cancelled) return;
        // Atmospheric sky / fog around the globe (silent satellite chrome)
        try {
          map.setSky?.({
            "sky-color": "#0b1220",
            "sky-horizon-blend": 0.6,
            "horizon-color": "#1a2233",
            "horizon-fog-blend": 0.6,
            "fog-color": "#05070d",
            "fog-ground-blend": 0.9,
          } as Record<string, unknown>);
        } catch {
          /* sky not supported */
        }

        // Vector sources (GeoJSON, built from in-memory data)
        map.addSource("rodent-activity", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
        map.addSource("rodent-gaps", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
        map.addSource("rodent-ahs", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
        map.addSource("selected-place-focus", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });

        // Selection focus frame. This is an orientation aid, not an official
        // legal boundary; the exact reported points remain the source of truth.
        map.addLayer({
          id: "selected-place-fill",
          type: "fill",
          source: "selected-place-focus",
          paint: {
            "fill-color": ["case", ["==", ["get", "tone"], "gap"], "#94a3b8", "#22d3ee"],
            "fill-opacity": ["case", ["==", ["get", "tone"], "gap"], 0.035, 0.055],
          },
        });
        map.addLayer({
          id: "selected-place-glow",
          type: "line",
          source: "selected-place-focus",
          paint: {
            "line-color": ["case", ["==", ["get", "tone"], "gap"], "#cbd5e1", "#67e8f9"],
            "line-opacity": 0.22,
            "line-width": [
              "interpolate", ["linear"], ["zoom"],
              4, 5,
              10, 8,
              14, 12,
            ],
            "line-blur": 5,
          },
        });
        map.addLayer({
          id: "selected-place-line",
          type: "line",
          source: "selected-place-focus",
          filter: ["!=", ["get", "tone"], "gap"],
          paint: {
            "line-color": "#a5f3fc",
            "line-opacity": 0.92,
            "line-width": [
              "interpolate", ["linear"], ["zoom"],
              4, 1.2,
              10, 1.8,
              14, 2.4,
            ],
          },
        });
        map.addLayer({
          id: "selected-place-gap-line",
          type: "line",
          source: "selected-place-focus",
          filter: ["==", ["get", "tone"], "gap"],
          paint: {
            "line-color": "#e2e8f0",
            "line-opacity": 0.82,
            "line-width": [
              "interpolate", ["linear"], ["zoom"],
              4, 1,
              10, 1.5,
              14, 2,
            ],
            "line-dasharray": [1.8, 1.2],
          },
        });
        // Outer colony-growth ring (rendered first, behind the dot)
        map.addLayer({
          id: "rodent-activity-ring",
          type: "circle",
          source: "rodent-activity",
          filter: ["==", ["get", "showRing"], true],
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              2, ["+", 14, ["*", ["get", "metricValue"], 0.06]],
              6, ["+", 22, ["*", ["get", "metricValue"], 0.18]],
              10, ["+", 38, ["*", ["get", "metricValue"], 0.3]],
            ],
            "circle-color": "transparent",
            "circle-stroke-color": ["get", "color"],
            "circle-stroke-width": 1.25,
            "circle-stroke-opacity": 0.45,
          },
        });

        // Soft glow halo. Sample/seeded snapshots use a dashed-feeling lower opacity.
        map.addLayer({
          id: "rodent-activity-glow",
          type: "circle",
          source: "rodent-activity",
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              2, ["+", 8, ["*", ["get", "metricValue"], 0.05]],
              6, ["+", 14, ["*", ["get", "metricValue"], 0.12]],
              10, ["+", 24, ["*", ["get", "metricValue"], 0.22]],
            ],
            "circle-color": ["get", "color"],
            "circle-opacity": ["*", ["case", ["==", ["get", "provenance"], "seeded"], 0.12, 0.22], ["get", "confidence"]],
            "circle-blur": 0.9,
          },
        });

        // Solid activity dot — outlined differently for live vs seeded.
        map.addLayer({
          id: "rodent-activity-dot",
          type: "circle",
          source: "rodent-activity",
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              2, ["+", 3.2, ["*", ["get", "metricValue"], 0.02]],
              6, ["+", 5.5, ["*", ["get", "metricValue"], 0.045]],
              10, ["+", 9, ["*", ["get", "metricValue"], 0.08]],
            ],
            "circle-color": ["case", ["==", ["get", "provenance"], "seeded"], "#0b0f1a", ["get", "color"]],
            "circle-opacity": ["max", 0.7, ["get", "confidence"]],
            "circle-stroke-color": ["get", "color"],
            "circle-stroke-width": ["case", ["==", ["get", "provenance"], "seeded"], 1.8, 1],
          },
        });


        // AHS estimate pin — hollow ring (different shape so it doesn't read as live).
        map.addLayer({
          id: "rodent-ahs-ring",
          type: "circle",
          source: "rodent-ahs",
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              2, 6,
              6, 9,
              10, 14,
            ],
            "circle-color": "transparent",
            "circle-stroke-color": "#94a3b8",
            "circle-stroke-width": 1.6,
            "circle-stroke-opacity": 0.85,
          },
        });
        map.addLayer({
          id: "rodent-ahs-dot",
          type: "circle",
          source: "rodent-ahs",
          paint: {
            "circle-radius": 2.2,
            "circle-color": "#cbd5e1",
            "circle-opacity": 0.85,
          },
        });

        // Data-gap marker — small dashed-outline ring, no fill. Replaces the
        // illegible "?" glyph. Reads as "designed absence" not "broken tile."
        map.addLayer({
          id: "rodent-gaps-symbol",
          type: "circle",
          source: "rodent-gaps",
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              2, 4,
              6, 6,
              10, 9,
            ],
            "circle-color": "transparent",
            "circle-stroke-color": "#64748b",
            "circle-stroke-width": 1.2,
            "circle-stroke-opacity": 0.7,
          },
        });

        // ============ PER-REPORT LAYER (the new primary unit) ============
        // Clustered point source — one feature = one filed report.
        // At low zoom they collapse into count bubbles (real quantity);
        // at zoom ≥ 13 each report renders as its own colored dot (recency).
        map.addSource("rodent-reports", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
          cluster: true,
          clusterRadius: 40,
          clusterMaxZoom: 12,
        });
        map.addSource("food-pest-context", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
          cluster: true,
          clusterRadius: 34,
          clusterMaxZoom: 12,
        });

        // Cluster bubbles — size = log(point_count), cyan with translucent halo
        map.addLayer({
          id: "rodent-reports-clusters",
          type: "circle",
          source: "rodent-reports",
          filter: ["has", "point_count"],
          paint: {
            "circle-radius": CLUSTER_RADIUS_EXPRESSION as never,
            "circle-color": "#22d3ee",
            "circle-opacity": 0.18,
            "circle-stroke-color": "#67e8f9",
            "circle-stroke-width": 1.25,
            "circle-stroke-opacity": 0.85,
          },
        });

        // Cluster count label
        map.addLayer({
          id: "rodent-reports-cluster-count",
          type: "symbol",
          source: "rodent-reports",
          filter: ["has", "point_count"],
          layout: {
            "text-field": ["get", "point_count_abbreviated"],
            "text-size": 11,
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          },
          paint: {
            "text-color": "#e0fbff",
            "text-halo-color": "#06121a",
            "text-halo-width": 1.25,
          },
        });

        // Unclustered single reports — recency-colored dot
        map.addLayer({
          id: "rodent-reports-points",
          type: "circle",
          source: "rodent-reports",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              10, 2.5,
              13, 4,
              16, 6,
            ],
            "circle-color": RECENCY_COLOR_EXPRESSION as never,
            "circle-opacity": 0.9,
            "circle-stroke-color": "#06121a",
            "circle-stroke-width": 0.5,
          },
        });

        // Food inspection pest-evidence context. Separate from Rodent Activity.
        map.addLayer({
          id: "food-pest-clusters",
          type: "circle",
          source: "food-pest-context",
          filter: ["has", "point_count"],
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["get", "point_count"],
              2, 7,
              10, 12,
              50, 18,
              200, 26,
            ],
            "circle-color": "#f59e0b",
            "circle-opacity": 0.16,
            "circle-stroke-color": "#fbbf24",
            "circle-stroke-width": 1,
            "circle-stroke-opacity": 0.75,
          },
        });
        map.addLayer({
          id: "food-pest-cluster-count",
          type: "symbol",
          source: "food-pest-context",
          filter: ["has", "point_count"],
          layout: {
            "text-field": ["get", "point_count_abbreviated"],
            "text-size": 10,
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          },
          paint: {
            "text-color": "#fff7ed",
            "text-halo-color": "#1c1206",
            "text-halo-width": 1,
          },
        });
        map.addLayer({
          id: "food-pest-points",
          type: "circle",
          source: "food-pest-context",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              10, 2.2,
              13, 3.8,
              16, 5.5,
            ],
            "circle-color": "#f59e0b",
            "circle-opacity": 0.82,
            "circle-stroke-color": "#111827",
            "circle-stroke-width": 0.65,
          },
        });


        const handleVerifiedClick = (e: MapLibreLayerMouseEvent) => {
          const f = e.features?.[0];
          if (!f) return;
          const id = f.properties?.id as string | undefined;
          const city = verified.find((c) => c.id === id);
          if (city) onSelectVerified(city);
        };
        const handleGapClick = (e: MapLibreLayerMouseEvent) => {
          const f = e.features?.[0];
          if (!f) return;
          const id = f.properties?.id as string | undefined;
          const city = unavailable.find((c) => c.id === id);
          if (city) onSelectGap(city);
        };
        const handleAhsClick = (e: MapLibreLayerMouseEvent) => {
          const f = e.features?.[0];
          if (!f) return;
          const id = f.properties?.id as string | undefined;
          const pin = ahsPins.find((c) => c.id === id);
          if (pin) onSelectAhs(pin);
        };
        map.on("click", "rodent-activity-dot", handleVerifiedClick);
        map.on("click", "rodent-activity-glow", handleVerifiedClick);
        map.on("click", "rodent-gaps-symbol", handleGapClick);
        map.on("click", "rodent-ahs-ring", handleAhsClick);
        map.on("click", "rodent-ahs-dot", handleAhsClick);

        // Cluster click — zoom in to expand
        map.on("click", "rodent-reports-clusters", (e) => {
          const f = e.features?.[0];
          if (!f) return;
          const clusterId = f.properties?.cluster_id as number | undefined;
          const src = map.getSource("rodent-reports") as MapLibreGeoJSONSource | undefined;
          if (clusterId == null || !src) return;
          src.getClusterExpansionZoom(clusterId).then((zoom) => {
            const coords = (f.geometry as GeoJSON.Point).coordinates as [number, number];
            map.easeTo({ center: coords, zoom: Math.min(zoom + 0.2, 16), duration: 600 });
          }).catch(() => {});
        });

        // Single report click — find nearest address group → open popup
        map.on("click", "rodent-reports-points", (e) => {
          const f = e.features?.[0];
          if (!f) return;
          const coords = (f.geometry as GeoJSON.Point).coordinates as [number, number];
          const group = findGroupAt(addressGroupsRef.current, coords[1], coords[0]);
          if (group) onSelectGroup(group);
        });

        map.on("click", "food-pest-clusters", (e) => {
          const f = e.features?.[0];
          if (!f) return;
          const clusterId = f.properties?.cluster_id as number | undefined;
          const src = map.getSource("food-pest-context") as MapLibreGeoJSONSource | undefined;
          if (clusterId == null || !src) return;
          src.getClusterExpansionZoom(clusterId).then((zoom) => {
            const coords = (f.geometry as GeoJSON.Point).coordinates as [number, number];
            map.easeTo({ center: coords, zoom: Math.min(zoom + 0.2, 16), duration: 600 });
          }).catch(() => {});
        });

        map.on("click", "food-pest-points", (e) => {
          const f = e.features?.[0];
          const id = f?.properties?.id as string | undefined;
          const record = foodPestEvidenceRef.current.find((item) => item.id === id);
          if (record) onSelectContext(record);
        });

        for (const lid of [
          "rodent-activity-dot",
          "rodent-activity-glow",
          "rodent-gaps-symbol",
          "rodent-ahs-ring",
          "rodent-ahs-dot",
          "rodent-reports-clusters",
          "rodent-reports-points",
          "food-pest-clusters",
          "food-pest-points",
        ]) {
          map.on("mouseenter", lid, () => { map.getCanvas().style.cursor = "pointer"; });
          map.on("mouseleave", lid, () => { map.getCanvas().style.cursor = ""; });
        }


        setReady(true);
        // Mark canvas ready for thumbnail capture once the basemap settles
        map.once("idle", () => {
          containerRef.current?.setAttribute("data-map-ready", "true");
        });
        // Ease into the working view once the globe is up
        window.setTimeout(() => {
          if (selectedFocusPlaceIdRef.current) return;
          map.easeTo({ center: [-88, 39], zoom: 3.2, duration: 1800 });
        }, 350);
      });
    }

    void loadMap();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [ahsPins, onSelectAhs, onSelectContext, onSelectGap, onSelectVerified, unavailable, verified]);

  // Push data into the vector sources whenever inputs change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const activitySrc = map.getSource("rodent-activity") as MapLibreGeoJSONSource | undefined;
    const gapsSrc = map.getSource("rodent-gaps") as MapLibreGeoJSONSource | undefined;
    const ahsSrc = map.getSource("rodent-ahs") as MapLibreGeoJSONSource | undefined;
    if (!activitySrc || !gapsSrc || !ahsSrc) return;

    const showActivity = activeLayers.has("rodent-activity");
    // In field mode, suppress ancillary overlays for a calmer single-layer read
    const fieldMode = mode === "field";
    const showRing = !fieldMode && activeLayers.has("colony-growth");
    const showGaps = !fieldMode && activeLayers.has("data-gaps");
    const showAhs = !fieldMode && showActivity;

    const metricValues = computeMetricValues(verified, metric);

    activitySrc.setData({
      type: "FeatureCollection",
      features: showActivity
        ? verified.map((city) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: [city.lng, city.lat] },
            properties: {
              id: city.id,
              name: city.name,
              activityIndex: city.activityIndex,
              metricValue: metricValues[city.id] ?? city.activityIndex,
              confidence: Math.min(1, Math.max(0.45, city.last12MonthsCount > 0 ? 0.95 : 0.6)),
              color: markerTone(city.activityBand, mode),
              showRing,
              provenance: city.provenance ?? "live",
            },
          }))
        : [],
    });

    gapsSrc.setData({
      type: "FeatureCollection",
      features: showGaps
        ? unavailable.map((city) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: [city.lng, city.lat] },
            properties: { id: city.id, name: city.name },
          }))
        : [],
    });

    ahsSrc.setData({
      type: "FeatureCollection",
      features: showAhs
        ? ahsPins.map((pin) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: [pin.lng, pin.lat] },
            properties: { id: pin.id, name: pin.name, pct: pin.rodentEvidencePercent },
          }))
        : [],
    });
  }, [activeLayers, ahsPins, metric, mode, ready, unavailable, verified]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const src = map.getSource("selected-place-focus") as MapLibreGeoJSONSource | undefined;
    if (!src) return;
    const feature = getPlaceFocusFeature(selectedFocusPlaceId);
    src.setData({
      type: "FeatureCollection",
      features: feature ? [feature] : [],
    });
  }, [ready, selectedFocusPlaceId]);

  // Push per-report data into the clustered source. When recurringOnly is on,
  // filter to reports whose address group is recurring.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const src = map.getSource("rodent-reports") as MapLibreGeoJSONSource | undefined;
    if (!src) return;

    if (!recurringOnly) {
      src.setData(reportsGeoJSON);
      return;
    }
    const recurringIds = new Set<string>();
    for (const g of addressGroups) {
      if (g.isRecurring) for (const r of g.reports) recurringIds.add(r.id);
    }
    src.setData({
      type: "FeatureCollection",
      features: reportsGeoJSON.features.filter((f) =>
        recurringIds.has(f.properties.id as string),
      ),
    });
  }, [ready, reportsGeoJSON, recurringOnly, addressGroups]);

  // Push context data separately so Conditions never blends into official activity.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const src = map.getSource("food-pest-context") as MapLibreGeoJSONSource | undefined;
    if (!src) return;
    src.setData(activeLayers.has("conditions") ? foodPestGeoJSON : { type: "FeatureCollection", features: [] });
  }, [activeLayers, foodPestGeoJSON, ready]);


  // Per-mode basemap paint: desaturate in HC, hide labels in lines-off/field
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    try {
      if (mode === "high-contrast") {
        map.setPaintProperty("cartoDark", "raster-saturation", -1);
        map.setPaintProperty("cartoDark", "raster-contrast", 0.18);
        map.setPaintProperty("cartoDark", "raster-opacity", 0.95);
      } else {
        map.setPaintProperty("cartoDark", "raster-saturation", 0);
        map.setPaintProperty("cartoDark", "raster-contrast", 0.08);
        map.setPaintProperty("cartoDark", "raster-opacity", 0.9);
        map.setPaintProperty("cartoDarkLabels", "raster-opacity", 0.62);
        map.setPaintProperty("cartoDarkLabels", "raster-contrast", 0.18);
      }
      const widen = mode === "field" ? 1.4 : 1;
      map.setPaintProperty("rodent-activity-dot", "circle-stroke-width", 1 * widen);
    } catch {
      /* layer not yet mounted */
    }
  }, [mode, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const visibleLayer = mapType === "dark" ? "cartoDark" : mapType === "voyager" ? "cartoVoyager" : "cartoLight";
    const visibleLabelLayer = mapType === "dark" ? "cartoDarkLabels" : mapType === "voyager" ? "cartoVoyagerLabels" : "cartoLightLabels";
    for (const layer of ["cartoDark", "cartoVoyager", "cartoLight", "cartoDarkLabels", "cartoVoyagerLabels", "cartoLightLabels"]) {
      try {
        map.setLayoutProperty(layer, "visibility", layer === visibleLayer || layer === visibleLabelLayer ? "visible" : "none");
      } catch {
        /* basemap layer not mounted */
      }
    }
  }, [mapType, ready]);

  useEffect(() => {
    if (!ready) return;
    const focus = getPlaceFocusBounds(selectedFocusPlaceId);
    if (focus) {
      const [west, south, east, north] = focus.bbox;
      const isCompact = (containerRef.current?.clientWidth ?? 1200) < 760;
      mapRef.current?.fitBounds(
        [
          [west, south],
          [east, north],
        ],
        {
          padding: isCompact
            ? { top: 96, right: 28, bottom: 180, left: 28 }
            : { top: 110, right: 420, bottom: 100, left: 340 },
          duration: 850,
          essential: true,
        },
      );
      return;
    }
    const target = selectedAhs ?? selectedGap ?? selected;
    mapRef.current?.flyTo({
      center: [target.lng, target.lat],
      zoom: target.region === "NYC" || target.region === "NY/NJ metro" ? 8.7 : 9.25,
      essential: true,
    });
  }, [ready, selected, selectedGap, selectedAhs, selectedFocusPlaceId]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.10),transparent_35%),radial-gradient(circle_at_25%_80%,rgba(168,85,247,0.10),transparent_32%)]" />
      <SatelliteChrome />
      {activeLayers.has("conditions") ? <ConditionsOverlay /> : null}
      {!ready ? (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-slate-500/80">
          <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-cyan-300/70 align-middle" /> streaming basemap
        </div>
      ) : null}
    </div>
  );
}

function LayerRow({
  layer,
  active,
  onToggle,
}: {
  layer: AtlasLayerDefinition & { id: AtlasLayerId };
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group flex items-center gap-2 rounded px-2 py-1.5 text-left transition ${
        active ? "text-slate-100" : "text-slate-500 hover:text-slate-300"
      }`}
      aria-pressed={active}
      title={layer.description}
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full transition"
        style={{
          background: active ? layerColors[layer.id] : "transparent",
          boxShadow: active ? `0 0 8px ${layerColors[layer.id]}aa` : "none",
          border: active ? "none" : `1px solid ${layerColors[layer.id]}55`,
        }}
      />
      <span className="flex-1 text-xs font-medium">{layer.name}</span>
      {layer.status !== "available" ? (
        <span className="text-[0.55rem] uppercase tracking-wider text-slate-600">{layer.status}</span>
      ) : null}
    </button>
  );
}

function SnapshotStatusChip({
  reportsState,
  reportsError,
  contextState,
  contextError,
  conditionsActive,
}: {
  reportsState: AsyncSnapshotState;
  reportsError: string | null;
  contextState: AsyncSnapshotState;
  contextError: string | null;
  conditionsActive: boolean;
}) {
  const messages: Array<{ tone: "loading" | "error"; text: string }> = [];
  if (reportsState === "loading" || reportsState === "idle") {
    messages.push({ tone: "loading", text: "Loading official records" });
  }
  if (reportsState === "error") {
    messages.push({ tone: "error", text: reportsError ?? "Official records could not load" });
  }
  if (conditionsActive && contextState === "loading") {
    messages.push({ tone: "loading", text: "Loading context records" });
  }
  if (conditionsActive && contextState === "error") {
    messages.push({ tone: "error", text: contextError ?? "Context records could not load" });
  }
  if (!messages.length) return null;
  return (
    <div style={{ zIndex: Z.fieldChip }} className="pointer-events-none absolute left-1/2 top-4 flex -translate-x-1/2 flex-wrap justify-center gap-2">
      {messages.map((message) => (
        <div
          key={`${message.tone}-${message.text}`}
          className={`rounded-full border px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] shadow-lg backdrop-blur ${
            message.tone === "error"
              ? "border-rose-300/25 bg-rose-950/70 text-rose-100"
              : "border-cyan-300/20 bg-slate-950/75 text-cyan-100"
          }`}
        >
          {message.tone === "loading" ? (
            <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 align-middle" />
          ) : (
            <AlertCircle className="mr-1.5 inline h-3 w-3 align-[-2px]" />
          )}
          {message.text}
        </div>
      ))}
    </div>
  );
}

type RecordDrawerTab = "reports" | "recurring" | "places" | "gaps";
type ReportRecencyFilter = "all" | "30d" | "90d";
type ActiveFilterChip = {
  id: string;
  label: string;
  onClear: () => void;
};

function reportDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function reportAgeDays(iso: string) {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

function RecordDrawer({
  open,
  reports,
  groups,
  gaps,
  selectedGap,
  query,
  onQueryChange,
  onCloseGap,
  onClose,
  onOpen,
  onSelectGroup,
  onSelectGap,
  mapRef,
  selectedPlaceId,
  onSelectedPlaceChange,
  reportsState,
  reportsError,
}: {
  open: boolean;
  reports: RodentReport[];
  groups: AddressGroup[];
  gaps: UnavailableRatPressureGeo[];
  selectedGap: UnavailableRatPressureGeo | null;
  query: string;
  onQueryChange: (q: string) => void;
  onCloseGap: () => void;
  onClose: () => void;
  onOpen: () => void;
  onSelectGroup: (group: AddressGroup | null) => void;
  onSelectGap: (gap: UnavailableRatPressureGeo) => void;
  mapRef: React.MutableRefObject<MapLibreMap | null>;
  selectedPlaceId: string;
  onSelectedPlaceChange: (placeId: string) => void;
  reportsState: AsyncSnapshotState;
  reportsError: string | null;
}) {
  const [tab, setTab] = useState<RecordDrawerTab>("reports");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [confidenceFilter, setConfidenceFilter] = useState("all");
  const [recencyFilter, setRecencyFilter] = useState<ReportRecencyFilter>("all");
  const filter = query.trim().toLowerCase();
  const recurringGroups = groups.filter((group) => group.isRecurring);
  const reportsSorted = useMemo(
    () => [...reports].sort((a, b) => b.reportedAt.localeCompare(a.reportedAt)),
    [reports],
  );
  const placeOptions = useMemo(() => {
    const options = new globalThis.Map<string, { id: string; label: string; count: number }>();
    for (const report of reports) {
      const place = getReportPlace(report);
      const existing = options.get(place.id);
      if (existing) existing.count += 1;
      else options.set(place.id, { id: place.id, label: place.label, count: 1 });
    }
    return [...options.values()].sort((a, b) => b.count - a.count);
  }, [reports]);
  const sourceOptions = useMemo(() => {
    const options = new globalThis.Map<string, { id: string; label: string; count: number }>();
    for (const report of reports) {
      const id = report.sourceDatasetId ?? report.source;
      const existing = options.get(id);
      if (existing) existing.count += 1;
      else options.set(id, { id, label: report.source, count: 1 });
    }
    return [...options.values()].sort((a, b) => b.count - a.count);
  }, [reports]);
  const filteredBaseReports = reportsSorted.filter((report) => {
    const place = getReportPlace(report);
    const sourceId = report.sourceDatasetId ?? report.source;
    if (selectedPlaceId !== "all" && place.id !== selectedPlaceId) return false;
    if (sourceFilter !== "all" && sourceId !== sourceFilter) return false;
    if (confidenceFilter !== "all" && report.confidence !== confidenceFilter) return false;
    if (recencyFilter === "30d" && reportAgeDays(report.reportedAt) > 30) return false;
    if (recencyFilter === "90d" && reportAgeDays(report.reportedAt) > 90) return false;
    return true;
  });
  const filteredBaseReportIds = useMemo(() => new Set(filteredBaseReports.map((report) => report.id)), [filteredBaseReports]);
  const filteredReports = filteredBaseReports
    .filter((report) =>
      !filter ||
      `${getReportPlace(report).name} ${report.addressLabel} ${report.neighborhood} ${report.source} ${report.category ?? ""} ${report.status}`
        .toLowerCase()
        .includes(filter),
    )
    .slice(0, 80);
  const filteredGroups = recurringGroups
    .filter((group) => {
      const sample = group.reports[0];
      if (sample && !filteredBaseReportIds.has(sample.id)) return false;
      return !filter || `${group.addressLabel} ${group.neighborhood}`.toLowerCase().includes(filter);
    })
    .slice(0, 60);
  const filteredGaps = gaps
    .filter((gap) => !filter || `${gap.name} ${gap.region}`.toLowerCase().includes(filter))
    .slice(0, 80);
  const places = HERO_CITY_SUMMARIES(filteredBaseReports);
  const selectedPlaceLabel = placeOptions.find((place) => place.id === selectedPlaceId)?.label;
  const selectedSourceLabel = sourceOptions.find((source) => source.id === sourceFilter)?.label;
  const activeFilterChips: ActiveFilterChip[] = [
    ...(filter ? [{ id: "query", label: `Search: ${query.trim()}`, onClear: () => onQueryChange("") }] : []),
    ...(selectedPlaceId !== "all" ? [{ id: "place", label: selectedPlaceLabel ?? "Selected place", onClear: () => onSelectedPlaceChange("all") }] : []),
    ...(recencyFilter !== "all" ? [{ id: "recency", label: recencyFilter === "30d" ? "Last 30 days" : "Last 90 days", onClear: () => setRecencyFilter("all") }] : []),
    ...(sourceFilter !== "all" ? [{ id: "source", label: selectedSourceLabel ?? "Selected source", onClear: () => setSourceFilter("all") }] : []),
    ...(confidenceFilter !== "all" ? [{ id: "confidence", label: `${confidenceFilter} confidence`, onClear: () => setConfidenceFilter("all") }] : []),
  ];
  const resetFilters = () => {
    onQueryChange("");
    onSelectedPlaceChange("all");
    setSourceFilter("all");
    setConfidenceFilter("all");
    setRecencyFilter("all");
  };

  const flyTo = (lng: number, lat: number, zoom = 13.5) => {
    mapRef.current?.flyTo({ center: [lng, lat], zoom, duration: 700, essential: true });
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={onOpen}
        style={{ zIndex: Z.drawer }}
        className="absolute right-4 top-1/2 inline-flex -translate-y-1/2 items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-[0.7rem] font-medium text-slate-400 shadow-lg backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-100"
      >
        <CircleDot className="h-3.5 w-3.5" /> reports
      </button>
    );
  }

  if (selectedGap) {
    return (
      <aside style={{ zIndex: Z.drawer }} className="absolute right-4 top-20 max-h-[calc(100vh-6rem)] w-[min(360px,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-white/10 bg-slate-950/88 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Reviewed data gap</div>
            <h2 className="mt-0.5 text-xl font-semibold tracking-tight">{selectedGap.name}</h2>
            <p className="mt-0.5 text-xs text-slate-400">{selectedGap.region}</p>
          </div>
          <button type="button" onClick={() => { onCloseGap(); onClose(); }} className="rounded p-1 text-slate-500 hover:text-white">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate-300">
          No verified official rodent activity layer is shown here yet. The gap stays visible so the atlas does not pretend coverage exists.
        </p>
        <p className="mt-2 text-[0.65rem] leading-relaxed text-slate-500">{selectedGap.reason}</p>
        <div className="mt-3 rounded-lg border border-white/8 bg-white/[0.03] p-3">
          <div className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-slate-500">Source reviewed</div>
          <div className="mt-1 text-sm font-medium">{selectedGap.reviewedSourceName ?? "Source review needed"}</div>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{selectedGap.reviewNote}</p>
          {selectedGap.reviewedSourceUrl ? (
            <a href={selectedGap.reviewedSourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-cyan-200 hover:underline">
              View source <ExternalLink className="h-3 w-3" />
            </a>
          ) : null}
        </div>
      </aside>
    );
  }

  return (
    <aside
      style={{ zIndex: Z.drawer }}
      className="absolute right-4 top-20 flex max-h-[calc(100vh-6rem)] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-950/90 shadow-2xl shadow-black/40 backdrop-blur-xl"
    >
      <div className="border-b border-white/8 p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-50">Official records</div>
            <div className="text-[0.62rem] uppercase tracking-[0.16em] text-slate-500">
              {reportsState === "ready"
                ? `${reports.length.toLocaleString()} reports · ${recurringGroups.length} recurring sites`
                : reportsState === "error"
                  ? "Official records unavailable"
                  : "Loading official records"}
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded p-1 text-slate-500 hover:text-white" aria-label="Close">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <label className="mt-3 flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
          <Search className="h-3.5 w-3.5 text-slate-500" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search reports, places, sources"
            className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </label>
        <div className="mt-3 grid grid-cols-4 gap-1">
          {([
            ["reports", "Reports", filteredReports.length],
            ["recurring", "Recurring", filteredGroups.length],
            ["places", "Places", places.length],
            ["gaps", "Gaps", filteredGaps.length],
          ] as const).map(([id, label, count]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-md px-2 py-1.5 text-[0.62rem] font-semibold ${
                tab === id ? "bg-cyan-300/15 text-cyan-100" : "bg-white/[0.03] text-slate-500 hover:text-slate-200"
              }`}
            >
              {label}
              <span className="ml-1 text-slate-500">{count}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <select
            value={selectedPlaceId}
            onChange={(event) => onSelectedPlaceChange(event.target.value)}
            className="rounded-md border border-white/[0.06] bg-slate-950/70 px-2 py-1.5 text-[0.68rem] text-slate-200 outline-none focus:border-cyan-300/35"
            aria-label="Filter by verified place"
          >
            <option value="all">All verified places</option>
            {placeOptions.map((place) => (
              <option key={place.id} value={place.id}>
                {place.label} ({place.count})
              </option>
            ))}
          </select>
          <select
            value={recencyFilter}
            onChange={(event) => setRecencyFilter(event.target.value as ReportRecencyFilter)}
            className="rounded-md border border-white/[0.06] bg-slate-950/70 px-2 py-1.5 text-[0.68rem] text-slate-200 outline-none focus:border-cyan-300/35"
            aria-label="Filter by recency"
          >
            <option value="all">All dates</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <select
            value={sourceFilter}
            onChange={(event) => setSourceFilter(event.target.value)}
            className="rounded-md border border-white/[0.06] bg-slate-950/70 px-2 py-1.5 text-[0.68rem] text-slate-200 outline-none focus:border-cyan-300/35"
            aria-label="Filter by source"
          >
            <option value="all">All sources</option>
            {sourceOptions.map((source) => (
              <option key={source.id} value={source.id}>
                {source.label.length > 24 ? `${source.label.slice(0, 24)}...` : source.label}
              </option>
            ))}
          </select>
          <select
            value={confidenceFilter}
            onChange={(event) => setConfidenceFilter(event.target.value)}
            className="rounded-md border border-white/[0.06] bg-slate-950/70 px-2 py-1.5 text-[0.68rem] text-slate-200 outline-none focus:border-cyan-300/35"
            aria-label="Filter by confidence"
          >
            <option value="all">All confidence</option>
            <option value="high">High confidence</option>
            <option value="medium">Medium confidence</option>
            <option value="low">Low confidence</option>
          </select>
        </div>
        {activeFilterChips.length ? (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {activeFilterChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={chip.onClear}
                className="inline-flex max-w-full items-center gap-1 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-cyan-100 hover:border-cyan-200/40"
                title={`Clear ${chip.label}`}
              >
                <span className="truncate">{chip.label}</span>
                <X className="h-2.5 w-2.5 shrink-0" />
              </button>
            ))}
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"
            >
              Reset
            </button>
          </div>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {reportsState === "loading" || reportsState === "idle" ? (
          <DrawerLoadingState label="Loading official records from static snapshots." />
        ) : null}
        {reportsState === "error" ? (
          <DrawerErrorState label={reportsError ?? "Official records could not load."} />
        ) : null}
        {tab === "reports" ? (
          reportsState === "ready" && filteredReports.length ? (
            filteredReports.map((report) => (
              <button
                key={report.id}
                type="button"
                onClick={() => flyTo(report.lng, report.lat)}
                className="mb-1 w-full rounded-lg border border-white/[0.04] bg-white/[0.025] p-2 text-left hover:border-cyan-300/25 hover:bg-cyan-300/[0.04]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-xs font-semibold text-slate-100">{report.addressLabel}</div>
                    <div className="mt-0.5 truncate text-[0.65rem] text-slate-500">
                      {getReportPlaceLabel(report)} · {report.neighborhood} · {report.category ?? "Rodent report"}
                    </div>
                  </div>
                  <div className="shrink-0 text-[0.62rem] text-cyan-200">{reportDate(report.reportedAt)}</div>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2 text-[0.6rem] text-slate-500">
                  <span className="truncate">{report.source}</span>
                  <span className="shrink-0">{report.confidence ?? "source"} · {report.status}</span>
                </div>
              </button>
            ))
          ) : reportsState === "ready" ? (
            <DrawerEmptyState label="No reports match those filters." onReset={resetFilters} />
          ) : null
        ) : null}

        {tab === "recurring" ? (
          reportsState === "ready" && filteredGroups.length ? (
            filteredGroups.map((group) => (
              <button
                key={group.key}
                type="button"
                onClick={() => {
                  onSelectGroup(group);
                  flyTo(group.lng, group.lat);
                }}
                className="mb-1 w-full rounded-lg border border-cyan-300/10 bg-cyan-300/[0.035] p-2 text-left hover:border-cyan-300/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="truncate text-xs font-semibold text-cyan-50">{group.addressLabel}</div>
                  <div className="text-[0.62rem] text-cyan-200">{group.reports.length} reports</div>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2 text-[0.65rem] text-slate-400">
                  <span className="truncate">{group.neighborhood}</span>
                  <span className="shrink-0">{reportDate(group.firstReportedAt)} - {reportDate(group.lastReportedAt)}</span>
                </div>
                <div className="mt-1 text-[0.6rem] uppercase tracking-[0.12em] text-cyan-200/70">
                  recurring pattern · {Math.round(group.spanMonths)} months
                </div>
              </button>
            ))
          ) : reportsState === "ready" ? (
            <DrawerEmptyState label="No recurring sites match those filters." onReset={resetFilters} />
          ) : null
        ) : null}

        {tab === "places" ? (
          reportsState === "ready" && places.length ? (
            places.map((place) => (
              <button
                key={place.name}
                type="button"
                onClick={() => {
                  onSelectedPlaceChange(place.id);
                  flyTo(place.lng, place.lat, place.zoom);
                }}
                className={`mb-1 w-full rounded-lg border p-2 text-left hover:border-cyan-300/25 ${
                  selectedPlaceId === place.id ? "border-cyan-300/25 bg-cyan-300/[0.06]" : "border-white/[0.04] bg-white/[0.025]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-100">{place.name}</span>
                  <span className="text-[0.62rem] uppercase tracking-wider text-cyan-200">{place.count.toLocaleString()} reports</span>
                </div>
                <div className="mt-1 grid grid-cols-3 gap-1 text-[0.6rem] uppercase tracking-[0.1em] text-slate-500">
                  <span>{place.sourceCount} source{place.sourceCount === 1 ? "" : "s"}</span>
                  <span>{place.highConfidenceCount}/{place.count} high</span>
                  <span className="text-right">{reportDate(place.latestReportedAt)}</span>
                </div>
              </button>
            ))
          ) : reportsState === "ready" ? (
            <DrawerEmptyState label="No verified places match those filters." onReset={resetFilters} />
          ) : null
        ) : null}

        {tab === "gaps" ? (
          filteredGaps.length ? (
            filteredGaps.map((gap) => (
              <button
                key={gap.id}
                type="button"
                onClick={() => {
                  flyTo(gap.lng, gap.lat, 11.5);
                  onSelectGap(gap);
                }}
                className="mb-1 w-full rounded-lg border border-white/[0.04] bg-white/[0.025] p-2 text-left hover:border-slate-300/25 hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-semibold text-slate-100">{gap.name}</div>
                  <div className="shrink-0 text-[0.58rem] uppercase tracking-[0.14em] text-slate-500">gap</div>
                </div>
                <div className="mt-0.5 text-[0.65rem] text-slate-500">{gap.reviewedSourceName ?? "Source review needed"}</div>
                <p className="mt-1 text-[0.65rem] leading-snug text-slate-400">{gap.reason}</p>
              </button>
            ))
          ) : (
            <DrawerEmptyState label="No reviewed gaps match that search." onReset={resetFilters} />
          )
        ) : null}
      </div>
    </aside>
  );
}

function DrawerEmptyState({ label, onReset }: { label: string; onReset: () => void }) {
  return (
    <div className="rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] p-4 text-center">
      <p className="text-xs font-medium text-slate-300">{label}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 rounded-full border border-white/[0.08] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-500 hover:border-cyan-300/30 hover:text-cyan-100"
      >
        Reset filters
      </button>
    </div>
  );
}

function DrawerLoadingState({ label }: { label: string }) {
  return (
    <div className="mb-2 rounded-lg border border-cyan-300/10 bg-cyan-300/[0.035] p-3 text-xs text-cyan-100">
      <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 align-middle" />
      {label}
    </div>
  );
}

function DrawerErrorState({ label }: { label: string }) {
  return (
    <div className="mb-2 rounded-lg border border-rose-300/20 bg-rose-950/40 p-3 text-xs leading-relaxed text-rose-100">
      <AlertCircle className="mr-1.5 inline h-3 w-3 align-[-2px]" />
      {label}
    </div>
  );
}

function HERO_CITY_SUMMARIES(reports: RodentReport[]) {
  const out = new globalThis.Map<string, {
    id: string;
    name: string;
    count: number;
    lat: number;
    lng: number;
    zoom: number;
    latestReportedAt: string;
    highConfidenceCount: number;
    sourceIds: Set<string>;
  }>();
  for (const report of reports) {
    const place = getReportPlace(report);
    const key = place.name;
    const sourceId = report.sourceDatasetId ?? report.source;
    const existing = out.get(key);
    if (existing) {
      existing.count += 1;
      existing.latestReportedAt = report.reportedAt > existing.latestReportedAt ? report.reportedAt : existing.latestReportedAt;
      existing.highConfidenceCount += report.confidence === "high" ? 1 : 0;
      existing.sourceIds.add(sourceId);
    } else {
      out.set(key, {
        id: place.id,
        name: key,
        count: 1,
        lat: place.center[1],
        lng: place.center[0],
        zoom: place.zoom,
        latestReportedAt: report.reportedAt,
        highConfidenceCount: report.confidence === "high" ? 1 : 0,
        sourceIds: new Set([sourceId]),
      });
    }
  }
  return [...out.values()]
    .map((place) => ({ ...place, sourceCount: place.sourceIds.size }))
    .sort((a, b) => b.count - a.count);
}

function SelectedDrawer({
  open,
  selected,
  selectedGap,
  selectedAhs,
  activeLayers,
  onCloseGap,
  onCloseAhs,
  onClose,
  onOpen,
}: {
  open: boolean;
  selected: RatPressureResult;
  selectedGap: UnavailableRatPressureGeo | null;
  selectedAhs: AhsEstimatePin | null;
  activeLayers: Set<AtlasLayerId>;
  onCloseGap: () => void;
  onCloseAhs: () => void;
  onClose: () => void;
  onOpen: () => void;
}) {
  if (!open) {
    return (
      <button
        type="button"
        onClick={onOpen}
        style={{ zIndex: Z.drawer }}
        className="absolute right-4 top-1/2 inline-flex -translate-y-1/2 items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-[0.7rem] font-medium text-slate-400 shadow-lg backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-100"
      >
        <CircleDot className="h-3.5 w-3.5" /> click a marker for details
      </button>
    );
  }

  if (selectedAhs) {
    return (
      <aside style={{ zIndex: Z.drawer }} className="absolute bottom-4 right-4 w-[min(380px,calc(100vw-2rem))] rounded-xl border border-white/10 bg-slate-950/92 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {PROVENANCE_LABELS["ahs-estimate"]}
            </div>
            <h2 className="mt-0.5 truncate text-xl font-semibold tracking-tight">{selectedAhs.name}</h2>
            <p className="mt-0.5 text-[0.7rem] text-slate-500">{selectedAhs.metroLabel} · AHS {selectedAhs.ahsYear}</p>
          </div>
          <button type="button" onClick={() => { onCloseAhs(); onClose(); }} className="rounded p-1 text-slate-500 hover:text-white" aria-label="Close">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-3 rounded-lg border border-slate-300/15 bg-white/[0.03] px-3 py-3">
          <div className="text-[0.6rem] font-semibold uppercase tracking-wider text-slate-400">
            Households reporting rodents
          </div>
          <div className="mt-1 text-3xl font-semibold text-slate-100 tabular-nums">
            ~{selectedAhs.rodentEvidencePercent}%
          </div>
          <p className="mt-1 text-[0.7rem] leading-relaxed text-slate-400">
            {METRIC_EXPLAINERS.ahsPercent}
          </p>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-300">
          No city-level rodent dataset exists for {selectedAhs.shortName}. The number above is a metro-area household survey, not a city report count.
        </p>
        <p className="mt-2 text-[0.65rem] leading-relaxed text-slate-500">
          {PROVENANCE_CAVEATS["ahs-estimate"]}
        </p>

        <div className="mt-3 border-t border-white/8 pt-3">
          <a href={selectedAhs.ahsTableUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-200 hover:underline">
            Open AHS source <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </aside>
    );
  }

  if (selectedGap) {
    return (
      <aside style={{ zIndex: Z.drawer }} className="absolute bottom-4 right-4 w-[min(360px,calc(100vw-2rem))] rounded-xl border border-white/10 bg-slate-950/88 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-slate-500">No data yet</div>
            <h2 className="mt-0.5 text-xl font-semibold tracking-tight">{selectedGap.name}</h2>
            <p className="mt-0.5 text-xs text-slate-400">{selectedGap.region}</p>
          </div>
          <button type="button" onClick={() => { onCloseGap(); onClose(); }} className="rounded p-1 text-slate-500 hover:text-white">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate-300">
          We could not find a clean public rodent dataset for {selectedGap.shortName}. We list it so the gap stays visible.
        </p>
        <p className="mt-2 text-[0.65rem] leading-relaxed text-slate-500">{selectedGap.reason}</p>
        <div className="mt-3 rounded-lg border border-white/8 bg-white/[0.03] p-3">
          <div className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-slate-500">Source reviewed</div>
          <div className="mt-1 text-sm font-medium">{selectedGap.reviewedSourceName ?? "Source review needed"}</div>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{selectedGap.reviewNote}</p>
          {selectedGap.reviewedSourceUrl ? (
            <a href={selectedGap.reviewedSourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-cyan-200 hover:underline">
              View source <ExternalLink className="h-3 w-3" />
            </a>
          ) : null}
        </div>
      </aside>
    );
  }

  const colony = getColonyGrowthProjection(selected);
  const cohort = comparePlaceToCohort(selected);
  const dot = markerTone(selected.activityBand);
  const provenance: Provenance = selected.provenance ?? "live";
  const colonyPlain = plainColonyBlurb(selected.shortName, selected.activityBand);

  return (
    <aside
      style={{ zIndex: Z.drawer }}
      className="absolute bottom-4 right-4 w-[min(380px,calc(100vw-2rem))] rounded-xl border border-white/10 bg-slate-950/92 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cyan-200/80">
            {selected.geo}
          </div>
          <h2 className="mt-0.5 truncate text-xl font-semibold tracking-tight">{selected.name}</h2>
          <p className="mt-0.5 text-[0.7rem] text-slate-500">
            Snapshot {selected.snapshotDate} · {cohort.topPercentLabel}
          </p>
        </div>
        <button type="button" onClick={onClose} className="rounded p-1 text-slate-500 hover:text-white" aria-label="Close">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ background: dot, boxShadow: `0 0 8px ${dot}88` }}
        />
        <div className="text-xs font-semibold text-slate-100">
          {activityBandLabels[selected.activityBand]} activity
        </div>
        <div className="ml-auto text-[0.6rem] uppercase tracking-wider text-slate-500">
          official records
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-200">
        {plainBandLede(selected.shortName, selected.activityBand, selected.trendPercent)}
      </p>

      <div className="mt-1 flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider ${
          provenance === "live"
            ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-200"
            : provenance === "seeded"
              ? "border-yellow-300/40 bg-yellow-400/10 text-yellow-200"
              : "border-slate-300/30 bg-white/[0.04] text-slate-300"
        }`}>
          {PROVENANCE_LABELS[provenance]}
        </span>
      </div>
      <p className="mt-1 text-[0.65rem] leading-relaxed text-slate-500">
        {PROVENANCE_CAVEATS[provenance]}
      </p>

      <div className="mt-3 grid gap-2.5">
        <MetricRow
          label="Reports last 12 months"
          source={METRIC_EXPLAINERS.last12MonthsCount}
          value={formatCount(selected.last12MonthsCount)}
          context={cohort.vsMedianLabel}
        />
        <MetricRow
          label="Reports last 90 days"
          source={METRIC_EXPLAINERS.recent90DayCount}
          value={formatCount(selected.recent90DayCount)}
          context={plainRecentVsCohortLabel(selected.recentSharePercent, cohort.percentile)}
        />
        <MetricRow
          label="Year-over-year change"
          source={METRIC_EXPLAINERS.trendPercent}
          value={`${selected.trendPercent > 0 ? "+" : ""}${selected.trendPercent}%`}
          context={plainTrendLabel(selected.trendPercent)}
          accent={
            selected.trendPercent >= 5
              ? "warn"
              : selected.trendPercent <= -5
                ? "good"
                : "muted"
          }
        />
      </div>

      {activeLayers.has("colony-growth") ? (
        <div className="mt-3 rounded-lg border border-purple-300/15 bg-purple-300/[0.06] p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-semibold text-purple-100">What this could mean</div>
            <div className="text-[0.55rem] uppercase tracking-wider text-purple-200/70">estimate</div>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-200">{colonyPlain.headline}</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">{colonyPlain.body}</p>
          <p className="mt-1 text-[0.6rem] leading-relaxed text-slate-500">{colonyPlain.disclaimer ?? colony.disclaimer}</p>
        </div>
      ) : null}

      <div className="mt-3 border-t border-white/8 pt-3 text-[0.65rem] text-slate-500">
        {plainConfidence(selected.confidence)} · {selected.confidenceNote}
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <Link
          to="/rodent-radar/place/$slug"
          params={{ slug: selected.id }}
          className="text-xs font-semibold text-cyan-200 hover:underline"
        >
          View {selected.shortName} page →
        </Link>
        <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-200 hover:underline">
          Open source <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </aside>
  );
}


function useLiveCounter() {
  // Deterministic time-based fake until real telemetry is wired.
  const [n, setN] = useState(() => 32 + Math.floor((Date.now() / 60000) % 71));
  useEffect(() => {
    const id = window.setInterval(() => {
      setN(32 + Math.floor((Date.now() / 60000) % 71));
    }, 45000);
    return () => window.clearInterval(id);
  }, []);
  return n;
}

function TopTools({
  query,
  setQuery,
  onShare,
  onSources,
  onMethodology,
  onSettings,
}: {
  query: string;
  setQuery: (value: string) => void;
  onShare: () => void;
  onSources: () => void;
  onMethodology: () => void;
  onSettings: () => void;
}) {
  const counter = useLiveCounter();
  const tools = [
    { label: "Share", icon: Share2, action: onShare },
    { label: "Reset", icon: RefreshCcw, action: () => window.location.assign("/rodent-radar/rat-pressure-map") },
    { label: "Sources", icon: Database, action: onSources },
    { label: "How to read this", icon: Info, action: onMethodology },
  ];

  return (
    <div className="absolute right-4 top-4 z-20 hidden items-center gap-2 md:flex">
      <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/75 px-3 py-1.5 text-[0.65rem] font-medium text-slate-400 shadow-lg backdrop-blur xl:flex">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/80" />
        ~{counter} people checking their block
      </div>
      <label className="relative hidden md:block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search areas"
          className="h-9 w-44 rounded-full border border-white/10 bg-slate-950/75 pl-8 pr-3 text-xs font-medium text-slate-100 shadow-lg outline-none backdrop-blur transition placeholder:text-slate-500 focus:w-60 focus:border-cyan-300/50"
        />
      </label>
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.label}
            type="button"
            onClick={tool.action}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-slate-950/75 text-slate-300 shadow-lg backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-100"
            aria-label={tool.label}
            title={tool.label}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}

function BottomMapDock({
  activePanel,
  onPanelChange,
  activeLayers,
  onToggleLayer,
  officialLayers,
  conditionLayers,
  modeledLayers,
  guidanceLayers,
  mapType,
  onMapTypeChange,
}: {
  activePanel: UtilityPanel;
  onPanelChange: (panel: UtilityPanel) => void;
  activeLayers: AtlasLayerId[];
  onToggleLayer: (layer: AtlasLayerId) => void;
  officialLayers: LayerCardItem[];
  conditionLayers: LayerCardItem[];
  modeledLayers: LayerCardItem[];
  guidanceLayers: LayerCardItem[];
  mapType: MapType;
  onMapTypeChange: (type: MapType) => void;
}) {
  const tiles: Array<{ id: Exclude<UtilityPanel, null>; label: string; sub: string; icon: LucideIcon }> = [
    { id: "layers", label: "Layers", sub: "what's on", icon: Layers3 },
    { id: "sources", label: "Sources", sub: "data origins", icon: Database },
    { id: "map-type", label: "Map Type", sub: mapType === "dark" ? "dark" : mapType, icon: Map },
  ];

  return (
    <div className="pointer-events-auto absolute bottom-4 left-4 z-[36] hidden lg:block xl:left-[316px]">
      {activePanel ? (
        <div className="mb-2 w-[min(640px,calc(100vw-360px))] overflow-hidden rounded-xl border border-white/10 bg-slate-950/90 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 border-b border-white/8 px-3 py-2">
            <div>
              <div className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {activePanel === "layers" ? "Layer switcher" : activePanel === "sources" ? "Sources" : "Map type"}
              </div>
              <div className="text-xs text-slate-500">
                {activePanel === "layers"
                  ? "Fast toggles grouped like a map cockpit"
                  : activePanel === "sources"
                    ? "Official datasets and guidance sources"
                    : "Change the basemap under the report layer"}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onPanelChange(null)}
              className="rounded-md p-1 text-slate-500 hover:bg-white/[0.05] hover:text-slate-100"
              aria-label="Close panel"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {activePanel === "layers" ? (
            <LayerMatrix
              activeLayers={activeLayers}
              onToggleLayer={onToggleLayer}
              officialLayers={officialLayers}
              conditionLayers={conditionLayers}
              modeledLayers={modeledLayers}
              guidanceLayers={guidanceLayers}
            />
          ) : null}

          {activePanel === "sources" ? <SourcesSummaryPanel /> : null}

          {activePanel === "map-type" ? (
            <MapTypePanel mapType={mapType} onMapTypeChange={onMapTypeChange} />
          ) : null}
        </div>
      ) : null}

      <div className="flex gap-1.5">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          const active = activePanel === tile.id;
          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => onPanelChange(active ? null : tile.id)}
              className={`group flex h-16 w-24 flex-col items-start justify-between rounded-lg border p-2 text-left shadow-lg backdrop-blur transition ${
                active
                  ? "border-cyan-300/35 bg-cyan-300/10"
                  : "border-white/8 bg-slate-950/78 hover:border-cyan-300/35"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-cyan-100" : "text-cyan-200/80"}`} />
              <div>
                <div className="text-[0.76rem] font-semibold text-slate-100">{tile.label}</div>
                <div className="text-[0.55rem] uppercase tracking-wider text-slate-500">{tile.sub}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LayerMatrix({
  activeLayers,
  onToggleLayer,
  officialLayers,
  conditionLayers,
  modeledLayers,
  guidanceLayers,
}: {
  activeLayers: AtlasLayerId[];
  onToggleLayer: (layer: AtlasLayerId) => void;
  officialLayers: LayerCardItem[];
  conditionLayers: LayerCardItem[];
  modeledLayers: LayerCardItem[];
  guidanceLayers: LayerCardItem[];
}) {
  const groups: Array<{ label: string; items: LayerCardItem[] }> = [
    {
      label: "Activity",
      items: [
        {
          id: "rodent-activity",
          label: "Rodent Activity",
          description: "Always on: one dot is one official record.",
          icon: Activity,
          color: layerColors["rodent-activity"],
        },
        ...officialLayers,
      ],
    },
    { label: "Context", items: conditionLayers },
    { label: "Modeled", items: modeledLayers },
    { label: "Guidance", items: guidanceLayers },
    {
      label: "Transparency",
      items: [
        {
          id: "data-gaps",
          label: "Data gaps",
          description: "Reviewed places with no verified activity layer yet.",
          icon: AlertCircle,
          color: layerColors["data-gaps"],
        },
      ],
    },
  ];

  return (
    <div className="grid gap-3 p-3 md:grid-cols-3">
      {groups.map((group) => (
        <div key={group.label} className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-2">
          <div className="mb-2 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {group.label}
          </div>
          <div className="grid gap-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = activeLayers.includes(item.id);
              const disabled = item.id === "rodent-activity";
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => onToggleLayer(item.id)}
                  className={`min-h-[4.25rem] rounded-md border p-2 text-left transition ${
                    active
                      ? "border-cyan-300/30 bg-cyan-300/[0.06]"
                      : "border-white/[0.05] bg-slate-950/45 hover:border-white/15"
                  } ${disabled ? "cursor-default" : ""}`}
                  title={item.description}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="grid h-5 w-5 place-items-center rounded-md"
                        style={{ backgroundColor: active ? `${item.color}22` : "rgba(148,163,184,0.08)" }}
                      >
                        <Icon className="h-3.5 w-3.5" style={{ color: active ? item.color : "rgba(148,163,184,0.75)" }} />
                      </span>
                      <span className="text-[0.7rem] font-semibold text-slate-100">{item.label}</span>
                    </div>
                    {active ? <Check className="h-3.5 w-3.5 shrink-0 text-cyan-200" /> : null}
                  </div>
                  <p className="mt-1 text-[0.6rem] leading-snug text-slate-500">{item.description}</p>
                  {item.gated ? (
                    <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-amber-200/70">
                      Interpretive
                    </p>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function SourcesSummaryPanel() {
  return (
    <div className="grid max-h-[420px] gap-2 overflow-y-auto p-3 md:grid-cols-2">
      {SOURCES.slice(0, 8).map((source) => (
        <a
          key={source.id}
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3 hover:border-cyan-300/30"
        >
          <div className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-cyan-200/80">{source.id}</div>
          <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-100">
            {source.name}
            <ExternalLink className="h-3 w-3" />
          </div>
        </a>
      ))}
      <Link
        to="/rodent-radar/attribution"
        className="rounded-lg border border-cyan-200/25 bg-cyan-300/[0.04] p-3 text-xs font-semibold text-cyan-100 hover:bg-cyan-300/[0.08]"
      >
        Full attribution and data rights
      </Link>
    </div>
  );
}

function MapTypePanel({
  mapType,
  onMapTypeChange,
}: {
  mapType: MapType;
  onMapTypeChange: (type: MapType) => void;
}) {
  const options: Array<{ id: MapType; label: string; sub: string; icon: LucideIcon }> = [
    { id: "dark", label: "Dark Atlas", sub: "OGW-style default", icon: Map },
    { id: "voyager", label: "Street Context", sub: "lighter city geography", icon: Globe2 },
    { id: "light", label: "Light Reference", sub: "print-friendly base", icon: Sun },
  ];
  return (
    <div className="grid gap-2 p-3 md:grid-cols-3">
      {options.map((option) => {
        const Icon = option.icon;
        const active = mapType === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onMapTypeChange(option.id)}
            className={`rounded-lg border p-3 text-left transition ${
              active
                ? "border-cyan-300/40 bg-cyan-300/[0.08]"
                : "border-white/[0.06] bg-white/[0.025] hover:border-cyan-300/25"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <Icon className={active ? "h-4 w-4 text-cyan-100" : "h-4 w-4 text-slate-400"} />
              {active ? <Check className="h-3.5 w-3.5 text-cyan-200" /> : null}
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-100">{option.label}</div>
            <div className="mt-1 text-[0.65rem] text-slate-500">{option.sub}</div>
          </button>
        );
      })}
    </div>
  );
}

function UtilityDrawer({
  panel,
  layers,
  activeLayers,
  onToggle,
  onClose,
}: {
  panel: Exclude<UtilityPanel, null>;
  layers: Array<AtlasLayerDefinition & { id: AtlasLayerId }>;
  activeLayers: AtlasLayerId[];
  onToggle: (layer: AtlasLayerId) => void;
  onClose: () => void;
}) {
  return (
    <aside className="absolute right-4 top-20 z-30 max-h-[calc(100vh-6rem)] w-[min(430px,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="text-lg font-black">
          {panel === "sources" ? "Sources" : panel === "layers" ? "Atlas controls" : "Map type"}
        </div>
        <button type="button" onClick={onClose} className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>

      {panel === "sources" ? (
        <div className="mt-4 grid gap-3">
          {SOURCES.map((source) => (
            <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/[0.04] p-4 hover:border-cyan-300/35">
              <div className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">{source.id}</div>
              <div className="mt-1 flex items-center gap-2 font-bold">
                {source.name}
                <ExternalLink className="h-4 w-4" />
              </div>
            </a>
          ))}
          <Link to="/rodent-radar/attribution" className="rounded-xl border border-cyan-200/25 px-4 py-3 text-center text-sm font-black text-cyan-200 hover:bg-cyan-200/10">
            Full attribution
          </Link>
        </div>
      ) : null}

      {panel === "map-type" ? (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
          <p>
            <span className="font-semibold text-slate-100">Rodent Activity</span> uses official public inspections, complaints, and 311 records. It is not a rat population count.
          </p>
          <p>
            <span className="font-semibold text-slate-100">Recurring pattern models</span> are interpretive and separate from official city data.
          </p>
          <p className="text-slate-400">
            Context, exposure safety, and data gaps help explain the map. They do not change official Rodent Activity.
          </p>
          <div className="flex gap-4 pt-2 text-xs">
            <Link to="/rodent-radar/terms" className="text-cyan-200/80 hover:text-cyan-100 hover:underline">Terms</Link>
            <Link to="/rodent-radar/attribution" className="text-cyan-200/80 hover:text-cyan-100 hover:underline">Attribution</Link>
          </div>
        </div>
      ) : null}

      {panel === "layers" ? (
        <div className="mt-4 grid gap-2">
          {layers.map((layer) => (
            <LayerRow
              key={layer.id}
              layer={layer}
              active={activeLayers.includes(layer.id)}
              onToggle={() => onToggle(layer.id)}
            />
          ))}
        </div>
      ) : null}
    </aside>
  );
}

function MobileTopBar({
  activeLayers,
  layers,
  onToggle,
  query,
  setQuery,
}: {
  activeLayers: AtlasLayerId[];
  layers: Array<AtlasLayerDefinition & { id: AtlasLayerId }>;
  onToggle: (layer: AtlasLayerId) => void;
  query: string;
  setQuery: (value: string) => void;
}) {
  return (
    <div className="absolute left-3 right-3 top-3 z-30 rounded-2xl border border-white/10 bg-slate-950/88 p-3 shadow-xl backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="font-black"><span className="text-cyan-300">Rodent</span> Radar</div>
        <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">atlas</div>
      </div>
      <label className="relative mt-3 block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm font-semibold text-slate-100 outline-none"
          placeholder="Search map"
        />
      </label>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {layers.map((layer) => {
          const Icon = layerIcons[layer.id];
          const active = activeLayers.includes(layer.id);
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => onToggle(layer.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-black ${
                active ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-white/[0.04] text-slate-400"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {layer.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type MonthlyRhythmPoint = {
  key: string;
  label: string;
  count: number;
};

function buildMonthlyRhythm(reports: RodentReport[], months = 12): MonthlyRhythmPoint[] {
  const dated = reports
    .map((report) => new Date(report.reportedAt))
    .filter((date) => Number.isFinite(date.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());
  const end = dated[dated.length - 1] ?? new Date();
  const start = new Date(end.getFullYear(), end.getMonth() - (months - 1), 1);
  const buckets: MonthlyRhythmPoint[] = [];

  for (let i = 0; i < months; i += 1) {
    const date = new Date(start.getFullYear(), start.getMonth() + i, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    buckets.push({
      key,
      label: date.toLocaleDateString("en-US", { month: "short" }),
      count: 0,
    });
  }

  const index = new globalThis.Map(buckets.map((bucket, i) => [bucket.key, i]));
  for (const report of reports) {
    const date = new Date(report.reportedAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const i = index.get(key);
    if (i != null) buckets[i].count += 1;
  }
  return buckets;
}

function SeasonalityRhythmPanel({
  reports,
  onClose,
}: {
  reports: RodentReport[];
  onClose: () => void;
}) {
  const rhythm = useMemo(() => buildMonthlyRhythm(reports, 12), [reports]);
  const max = Math.max(1, ...rhythm.map((point) => point.count));
  const peak = rhythm.reduce((best, point) => (point.count > best.count ? point : best), rhythm[0]);
  const recent = rhythm[rhythm.length - 1];

  return (
    <aside className="pointer-events-auto absolute left-4 top-24 z-[34] hidden w-[280px] rounded-xl border border-cyan-200/15 bg-slate-950/88 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl md:block xl:left-[316px]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
            Seasonality
          </div>
          <h3 className="mt-0.5 text-sm font-semibold text-slate-100">Monthly report rhythm</h3>
        </div>
        <button type="button" onClick={onClose} className="rounded-md p-1 text-slate-500 hover:bg-white/[0.05] hover:text-slate-100" aria-label="Hide seasonality">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-3 flex h-24 items-end gap-1.5 border-b border-white/10 pb-2">
        {rhythm.map((point) => (
          <div key={point.key} className="flex h-full flex-1 flex-col justify-end gap-1">
            <div
              className="min-h-[3px] rounded-sm bg-cyan-300/75 shadow-[0_0_12px_rgba(103,232,249,0.25)]"
              style={{ height: `${Math.max(4, (point.count / max) * 100)}%` }}
              title={`${point.label}: ${point.count.toLocaleString()} reports`}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-6 gap-x-1 gap-y-0.5 text-center text-[0.52rem] uppercase text-slate-600">
        {rhythm.map((point) => (
          <span key={point.key}>{point.label}</span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Metric label="Peak month" value={`${peak.label} · ${peak.count.toLocaleString()}`} />
        <Metric label="Latest month" value={`${recent.label} · ${recent.count.toLocaleString()}`} />
      </div>
      <p className="mt-2 text-[0.65rem] leading-relaxed text-slate-400">
        Uses official report dates only. This shows timing patterns, not a forecast or health-risk prediction.
      </p>
    </aside>
  );
}

function ExposureSafetyDrawer({ onClose }: { onClose: () => void }) {
  return (
    <aside className="pointer-events-auto absolute right-4 top-20 z-[38] w-[min(340px,calc(100vw-2rem))] rounded-xl border border-rose-200/15 bg-slate-950/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-rose-200/70">
            Guidance
          </div>
          <h3 className="mt-0.5 text-base font-semibold text-slate-100">{exposureGuidance.name}</h3>
        </div>
        <button type="button" onClick={onClose} className="rounded-md p-1 text-slate-500 hover:bg-white/[0.05] hover:text-slate-100" aria-label="Hide exposure safety">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">{exposureGuidance.description}</p>
      <ul className="mt-3 space-y-2">
        {exposureGuidance.guidance.slice(0, 4).map((item) => (
          <li key={item} className="flex gap-2 text-xs leading-relaxed text-slate-300">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-200/80" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-lg border border-white/[0.06] bg-white/[0.03] p-2 text-[0.65rem] leading-relaxed text-slate-500">
        {exposureGuidance.disclaimer}
      </p>
    </aside>
  );
}

function SatelliteChrome() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden select-none text-[0.55rem] font-medium uppercase tracking-[0.28em] text-slate-400/45 md:block">
      <div className="absolute left-4 top-4 flex items-center gap-1.5">
        <span className="h-1 w-1 rounded-full bg-cyan-300/70" />
        NOAA-20 · pass 18:42 UTC
      </div>
      <div className="absolute right-4 top-4 flex items-center gap-1.5">
        SENTINEL-1A · ASC 142
        <span className="h-1 w-1 rounded-full bg-emerald-300/70" />
      </div>
      <div className="absolute bottom-4 right-4 text-slate-500/40">
        lat 39.0°N · lon −88.0°W · globe ortho
      </div>
    </div>
  );
}

function ConditionsOverlay() {
  return (
    <div className="pointer-events-none absolute left-4 top-1/2 hidden w-[280px] -translate-y-1/2 rounded-xl border border-emerald-200/15 bg-slate-950/72 p-3 text-xs text-slate-400 shadow-xl backdrop-blur md:block xl:left-[316px]">
      <div className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-emerald-200/70">Conditions</div>
      <div className="mt-1 text-sm font-semibold text-slate-100">Food inspection pest evidence</div>
      <p className="mt-1.5 leading-relaxed">
        Amber points are NYC food inspection violations mentioning rats, mice, rodents, insects, or pest-conducive conditions. Context only; they do not change official Rodent Activity dots.
      </p>
    </div>
  );
}

function FoodPestContextPopup({
  record,
  onClose,
}: {
  record: FoodPestEvidence;
  onClose: () => void;
}) {
  const isSanitation = record.contextType === "sanitation-condition";
  return (
    <aside className="pointer-events-auto absolute right-4 top-20 z-[55] w-[min(340px,calc(100vw-2rem))] rounded-xl border border-amber-200/20 bg-slate-950/92 p-4 text-slate-100 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-amber-200/80">Context only</div>
          <h3 className="mt-1 text-base font-semibold leading-tight">{record.establishmentName}</h3>
          <p className="mt-0.5 text-xs text-slate-500">{record.addressLabel} · {record.neighborhood}</p>
        </div>
        <button type="button" onClick={onClose} className="rounded p-1 text-slate-500 hover:bg-white/[0.05] hover:text-white" aria-label="Close context detail">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-3 rounded-lg border border-white/8 bg-white/[0.03] p-3">
        <div className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
          {isSanitation ? "Sanitation condition" : "Food inspection violation"}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-slate-300">{record.description}</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Metric label="Observed" value={reportDate(record.observedAt)} />
        <Metric label="Code" value={record.category ?? "Pest"} />
      </div>
      <p className="mt-3 text-[0.68rem] leading-relaxed text-slate-400">
        This is not a public rodent report. It is an official {isSanitation ? "sanitation context" : "food inspection context"} signal from {record.source}.
      </p>
      <a href={record.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-100 hover:underline">
        View source <ExternalLink className="h-3 w-3" />
      </a>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-1.5">
      <div className="text-sm font-semibold text-slate-100">{value}</div>
      <div className="mt-0.5 text-[0.55rem] font-semibold uppercase tracking-wider text-slate-500">{label}</div>
    </div>
  );
}

function LegendSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5 first:mt-0">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {title}
        </h3>
        {subtitle ? (
          <span className="text-[0.55rem] uppercase tracking-wider text-slate-600">{subtitle}</span>
        ) : null}
      </div>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function MetricRow({
  label,
  source,
  value,
  context,
  accent = "muted",
}: {
  label: string;
  source: string;
  value: string;
  context: string;
  accent?: "good" | "warn" | "muted";
}) {
  const accentClass =
    accent === "good"
      ? "text-emerald-200"
      : accent === "warn"
        ? "text-rose-200"
        : "text-slate-100";
  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2">
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </div>
          <div className="mt-0.5 truncate text-[0.6rem] text-slate-500">{source}</div>
        </div>
        <div className={`shrink-0 text-base font-semibold tabular-nums ${accentClass}`}>{value}</div>
      </div>
      <div className="mt-1 text-[0.7rem] leading-relaxed text-slate-300">{context}</div>
    </div>
  );
}

function compactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function DisplayModePicker({
  mode,
  onChange,
}: {
  mode: DisplayMode;
  onChange: (mode: DisplayMode) => void;
}) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-1.5">
      {DISPLAY_MODES.map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onChange(m)}
          className={`rounded px-2 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider transition ${
            mode === m
              ? "bg-cyan-300/15 text-cyan-100"
              : "bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

function PresetBar({
  active,
  onApply,
  onYourBlockGeo,
  onZipSubmit,
  zipNotice,
}: {
  active: PresetId | undefined;
  onApply: (preset: PresetId) => void;
  onYourBlockGeo: () => void;
  onZipSubmit: (zip: string) => void;
  zipNotice: string | null;
}) {
  const [zip, setZip] = useState("");
  const [thumbErrors, setThumbErrors] = useState<Record<string, boolean>>({});
  return (
    <div className="absolute left-1/2 top-4 z-20 hidden -translate-x-1/2 lg:flex lg:flex-col lg:items-center lg:gap-2">
      <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/85 px-2 py-1.5 shadow-2xl backdrop-blur-xl">
        {PRESETS.map((p) => {
          const Icon = p.icon;
          const isActive = active === p.id;
          const showImg = !thumbErrors[p.id];
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                if (p.id === "your-block") onYourBlockGeo();
                else onApply(p.id);
              }}
              title={p.hint}
              className={`flex items-center gap-1.5 rounded-full py-1 pl-1 pr-3 text-xs font-semibold transition ${
                isActive
                  ? "bg-cyan-300/15 text-cyan-100"
                  : "text-slate-300 hover:bg-white/[0.06]"
              }`}
            >
              {showImg ? (
                <img
                  src={`/rodent-radar/presets/${p.id}.jpg`}
                  alt=""
                  width={40}
                  height={24}
                  loading="lazy"
                  onError={() => setThumbErrors((prev) => ({ ...prev, [p.id]: true }))}
                  className="h-6 w-10 rounded-sm border border-white/10 object-cover"
                />
              ) : (
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/[0.06]">
                  <Icon className="h-3.5 w-3.5" />
                </span>
              )}
              {p.label}
            </button>
          );
        })}
      </div>
      {active === "your-block" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onZipSubmit(zip);
          }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/85 px-3 py-1.5 text-xs"
        >
          <input
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="US ZIP"
            inputMode="numeric"
            maxLength={5}
            className="w-20 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button type="submit" className="rounded-full bg-cyan-300/20 px-2 py-0.5 text-cyan-100">Go</button>
          {zipNotice ? <span className="text-slate-400">{zipNotice}</span> : null}
        </form>
      ) : null}
    </div>
  );
}

function SharePopover({
  onCopy,
  onDownload,
  onClose,
}: {
  onCopy: () => void;
  onDownload: () => void;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="absolute right-4 top-16 z-30 w-56 rounded-xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between px-2 pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
        <span>Share view</span>
        <button type="button" onClick={onClose} aria-label="Close" className="text-slate-500 hover:text-white">
          <X className="h-3 w-3" />
        </button>
      </div>
      <button
        type="button"
        onClick={async () => {
          await onCopy();
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        }}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs text-slate-200 hover:bg-white/[0.06]"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied link" : "Copy link"}
      </button>
      <button
        type="button"
        onClick={onDownload}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs text-slate-200 hover:bg-white/[0.06]"
      >
        <ImageDown className="h-3.5 w-3.5" />
        Download PNG of map
      </button>
    </div>
  );
}

function FieldBottomSheet({
  selected,
  selectedGap,
  onClose,
}: {
  selected: RatPressureResult;
  selectedGap: UnavailableRatPressureGeo | null;
  onClose: () => void;
}) {
  const place = selectedGap ?? selected;
  const isGap = !!selectedGap;
  return (
    <div className="atlas-field-sheet pointer-events-auto absolute inset-x-0 bottom-0 z-30 border-t border-white/10 bg-slate-950/95 px-5 pb-[max(env(safe-area-inset-bottom),1rem)] pt-4 shadow-[0_-12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl md:hidden">
      <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/15" />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {isGap ? "Data gap" : "Selected area"}
          </div>
          <div className="mt-0.5 truncate text-lg font-semibold tracking-tight">{place.name}</div>
          <div className="text-[0.7rem] text-slate-400">{place.region}</div>
        </div>
        {!isGap ? (
          <span className={`rounded-full border px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider ${bandTone(selected.activityBand)}`}>
            {activityBandLabels[selected.activityBand]}
          </span>
        ) : null}
        <button type="button" onClick={onClose} className="rounded p-1 text-slate-500 hover:text-white" aria-label="Exit field view">
          <X className="h-4 w-4" />
        </button>
      </div>
      {!isGap ? (
        <Link
          to="/rodent-radar/place/$slug"
          params={{ slug: selected.id }}
          className="mt-3 grid h-11 w-full place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-sm font-semibold text-cyan-100"
        >
          Open {selected.shortName} details
        </Link>
      ) : null}
    </div>
  );
}
