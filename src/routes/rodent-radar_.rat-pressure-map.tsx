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
import { AtlasSidebar, type MetricKey } from "@/components/rodent-radar/AtlasSidebar";
import { LayerCard, type LayerCardItem } from "@/components/rodent-radar/LayerCard";
import { AtlasToolbar } from "@/components/rodent-radar/AtlasToolbar";


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
  default: "Where rodent pressure is worst right now, by verified city data.",
  winning: "Areas where rats are winning over the last 12 months.",
  seasonal: "How rodent activity shifts across the last 90 days.",
  gaps: "Cities where we don't have verified data yet.",
  "your-block": "Rodent pressure near a ZIP or your current location.",
};

type MapLibreModule = typeof import("maplibre-gl");
type MapLibreMap = import("maplibre-gl").Map;
type MapLibreLayerMouseEvent = import("maplibre-gl").MapLayerMouseEvent;
type MapLibreGeoJSONSource = import("maplibre-gl").GeoJSONSource;

type UtilityPanel = "sources" | "methodology" | "settings" | null;

const TITLE = "Rodent Radar: Rodent Activity Atlas";
const DESCRIPTION =
  "Explore official rodent activity, colony growth modeling, civic conditions, data gaps, and exposure-safety guidance in a dark interactive atlas.";
const CANONICAL_URL = "https://cloakd-removals.cloud/rodent-radar/rat-pressure-map";
const SOURCES = getAtlasSourceCards();
const ZIP_TO_PLACE = (zipToPlaceData as { zips: Record<string, string> }).zips;


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
  { id: "winning", label: "Where rats are winning", hint: "Top activity, 12 mo", icon: Sparkles },
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
  const [selectedAhs, setSelectedAhs] = useState<AhsEstimatePin | null>(null);
  const [metric, setMetric] = useState<MetricKey>("index");
  // Coverage filter — which pin classes render on the map + appear in the
  // sidebar list. Reviewed gaps + estimates default on per the locked plan
  // (live pins + visible gap markers in the launch view).
  const [showCoverage, setShowCoverage] = useState({
    live: true,
    gaps: true,
    estimates: true,
  });
  const mapRef = useRef<MapLibreMap | null>(null);

  const selected = useMemo(
    () => verified.find((c) => c.id === search.place) ?? verified[0],
    [verified, search.place],
  );
  const selectedGap = useMemo(
    () => unavailableRatPressureGeos.find((c) => c.id === search.gap) ?? null,
    [search.gap],
  );
  const activeSet = useMemo(() => new Set<AtlasLayerId>(activeLayers), [activeLayers]);

  const dataMix = useMemo(
    () => ({
      live: verified.filter((v) => v.provenance === "live").length,
      gaps: unavailableRatPressureGeos.length,
      estimates: ahsEstimatePins.length,
    }),
    [verified],
  );

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
      setDrawerOpen(true);
      updateSearch({ place: city.id, gap: undefined });
    },
    [updateSearch],
  );

  const selectGap = useCallback(
    (city: UnavailableRatPressureGeo) => {
      setSelectedAhs(null);
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
      label: "Civic conditions",
      description: "Restaurant violations, vacancy, sanitation pressure.",
      icon: Globe2,
      color: "#34d399",
    },
    {
      id: "seasonality",
      label: "Seasonality",
      description: "Winter / precip anomaly context for trend reading.",
      icon: Snowflake,
      color: "#38bdf8",
    },
  ];
  const modeledLayers: LayerCardItem[] = [
    {
      id: "colony-growth",
      label: "Colony growth",
      description: "Modeled replacement cycle. Interpretive, not observed.",
      icon: BarChart3,
      color: "#c084fc",
      gated: true,
      gatedDisclaimer:
        "Colony growth is modeled from official activity — it interprets the replacement cycle behind sightings. It is not a rat population count and not a city-published figure.",
    },
  ];
  const guidanceLayers: LayerCardItem[] = [
    {
      id: "exposure-safety",
      label: "Exposure safety",
      description: "CDC-backed cleanup guidance overlay.",
      icon: ShieldCheck,
      color: "#fb7185",
    },
  ];

  // Filter the AtlasMap's input arrays by the coverage toggle so hidden
  // classes truly disappear from the canvas.
  const mapVerified = showCoverage.live ? verified : [];
  const mapGaps = showCoverage.gaps ? unavailableRatPressureGeos : [];
  const mapAhs = showCoverage.estimates ? ahsEstimatePins : [];

  return (
    <div className="h-screen overflow-hidden bg-[#05080d] text-slate-100">
      <AtlasMap
        verified={mapVerified}
        unavailable={mapGaps}
        ahsPins={mapAhs}
        selected={selected}
        selectedGap={selectedGap}
        selectedAhs={selectedAhs}
        activeLayers={activeSet as Set<AtlasLayerId>}
        mode={mode}
        metric={metric}
        onSelectVerified={selectVerified}
        onSelectGap={selectGap}
        onSelectAhs={handleSelectAhs}
        mapRef={mapRef}
      />


      <AtlasSidebar
        metric={metric}
        onMetricChange={setMetric}
        verified={verified}
        gaps={unavailableRatPressureGeos}
        ahsPins={ahsEstimatePins}
        query={query}
        onQueryChange={setQuery}
        selectedVerifiedId={selected?.id}
        selectedGapId={selectedGap?.id}
        selectedAhsId={selectedAhs?.id}
        showCoverage={showCoverage}
        onShowCoverageChange={setShowCoverage}
        onSelectVerified={selectVerified}
        onSelectGap={selectGap}
        onSelectAhs={handleSelectAhs}
        markerColor={(band: ActivityBand) => markerTone(band, mode)}
        dataMix={dataMix}
      />

      <AtlasToolbar query={query} onQueryChange={setQuery} />

      {/* Bottom-left docked layer cards — OGW pattern */}
      <div
        className="pointer-events-auto absolute bottom-4 left-[316px] hidden flex-col gap-2 md:flex"
        style={{ zIndex: 35 }}
      >
        <LayerCard
          title="Official activity"
          subtitle="Always on — the map's spine"
          items={officialLayer}
          activeLayers={activeLayers}
          onToggle={toggleLayer}
        />
        <LayerCard
          title="Conditions"
          subtitle="Context, not signal"
          items={conditionLayers}
          activeLayers={activeLayers}
          onToggle={toggleLayer}
          defaultOpen={false}
        />
        <LayerCard
          title="Modeled"
          subtitle="Interpretive — confirm before enabling"
          items={modeledLayers}
          activeLayers={activeLayers}
          onToggle={toggleLayer}
          defaultOpen={false}
        />
        <LayerCard
          title="Guidance"
          subtitle="CDC-aligned overlays"
          items={guidanceLayers}
          activeLayers={activeLayers}
          onToggle={toggleLayer}
          defaultOpen={false}
        />
      </div>

      <SelectedDrawer
        open={drawerOpen}
        selected={selected}
        selectedGap={selectedGap}
        selectedAhs={selectedAhs}
        activeLayers={activeSet}
        onCloseGap={() => updateSearch({ gap: undefined })}
        onCloseAhs={() => setSelectedAhs(null)}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      />
    </div>
  );
}


function AtlasMap({
  verified,
  unavailable,
  ahsPins,
  selected,
  selectedGap,
  selectedAhs,
  activeLayers,
  mode,
  metric,
  onSelectVerified,
  onSelectGap,
  onSelectAhs,
  mapRef: externalMapRef,
}: {
  verified: RatPressureResult[];
  unavailable: UnavailableRatPressureGeo[];
  ahsPins: AhsEstimatePin[];
  selected: RatPressureResult;
  selectedGap: UnavailableRatPressureGeo | null;
  selectedAhs: AhsEstimatePin | null;
  activeLayers: Set<AtlasLayerId>;
  mode: DisplayMode;
  metric: MetricKey;
  onSelectVerified: (city: RatPressureResult) => void;
  onSelectGap: (city: UnavailableRatPressureGeo) => void;
  onSelectAhs: (city: AhsEstimatePin) => void;
  mapRef?: React.MutableRefObject<MapLibreMap | null>;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const internalMapRef = useRef<MapLibreMap | null>(null);
  const mapRef = externalMapRef ?? internalMapRef;
  const maplibreRef = useRef<MapLibreModule | null>(null);
  const [ready, setReady] = useState(false);

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
          },
          layers: [
            { id: "bg", type: "background", paint: { "background-color": "#05070d" } },
            { id: "cartoDark", type: "raster", source: "cartoDark", paint: { "raster-opacity": 0.85 } },
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

        // Outer colony-growth ring (rendered first, behind the dot)
        map.addLayer({
          id: "rodent-activity-ring",
          type: "circle",
          source: "rodent-activity",
          filter: ["==", ["get", "showRing"], true],
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              2, ["+", 14, ["*", ["get", "activityIndex"], 0.06]],
              6, ["+", 22, ["*", ["get", "activityIndex"], 0.18]],
              10, ["+", 38, ["*", ["get", "activityIndex"], 0.3]],
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
              2, ["+", 8, ["*", ["get", "activityIndex"], 0.05]],
              6, ["+", 14, ["*", ["get", "activityIndex"], 0.12]],
              10, ["+", 24, ["*", ["get", "activityIndex"], 0.22]],
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
              2, ["+", 3.2, ["*", ["get", "activityIndex"], 0.02]],
              6, ["+", 5.5, ["*", ["get", "activityIndex"], 0.045]],
              10, ["+", 9, ["*", ["get", "activityIndex"], 0.08]],
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

        // Data-gap "?" symbol — only for places where we have nothing yet.
        map.addLayer({
          id: "rodent-gaps-symbol",
          type: "symbol",
          source: "rodent-gaps",
          layout: {
            "text-field": "?",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-size": 14,
            "text-allow-overlap": true,
          },
          paint: {
            "text-color": "#cbd5e1",
            "text-halo-color": "#0b0f1a",
            "text-halo-width": 1.6,
            "text-opacity": 0.85,
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
        for (const lid of ["rodent-activity-dot", "rodent-activity-glow", "rodent-gaps-symbol", "rodent-ahs-ring", "rodent-ahs-dot"]) {
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
  }, [ahsPins, onSelectAhs, onSelectGap, onSelectVerified, unavailable, verified]);

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
  }, [activeLayers, ahsPins, mode, ready, unavailable, verified]);

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
        map.setPaintProperty("cartoDark", "raster-contrast", 0);
        map.setPaintProperty("cartoDark", "raster-opacity", 0.85);
      }
      const widen = mode === "field" ? 1.4 : 1;
      map.setPaintProperty("rodent-activity-dot", "circle-stroke-width", 1 * widen);
    } catch {
      /* layer not yet mounted */
    }
  }, [mode, ready]);

  useEffect(() => {
    if (!ready) return;
    const target = selectedAhs ?? selectedGap ?? selected;
    mapRef.current?.flyTo({
      center: [target.lng, target.lat],
      zoom: target.region === "NYC" || target.region === "NY/NJ metro" ? 8.7 : 9.25,
      essential: true,
    });
  }, [ready, selected, selectedGap, selectedAhs]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.10),transparent_35%),radial-gradient(circle_at_25%_80%,rgba(168,85,247,0.10),transparent_32%)]" />
      <SatelliteChrome />
      {activeLayers.has("conditions") ? <ConditionsOverlay /> : null}
      {activeLayers.has("seasonality") ? <SeasonalityOverlay /> : null}
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
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-[0.7rem] font-medium text-slate-400 shadow-lg backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-100"
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
          {activityBandLabels[selected.activityBand]} pressure
        </div>
        <div className="ml-auto text-[0.6rem] uppercase tracking-wider text-slate-500">
          activity index {selected.activityIndex}
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

function MapUtilityButtons({
  onLayers,
  onSources,
  onMethodology,
}: {
  onLayers: () => void;
  onSources: () => void;
  onMethodology: () => void;
}) {
  const tiles: Array<{ label: string; sub: string; icon: LucideIcon; onClick: () => void }> = [
    { label: "Layers", sub: "what's on", icon: Layers3, onClick: onLayers },
    { label: "Sources", sub: "data origins", icon: Database, onClick: onSources },
    { label: "Guide", sub: "how to read", icon: Info, onClick: onMethodology },
  ];
  return (
    <div className="absolute bottom-4 left-4 z-20 hidden gap-1.5 lg:flex">
      {tiles.map((tile) => {
        const Icon = tile.icon;
        return (
          <button
            key={tile.label}
            type="button"
            onClick={tile.onClick}
            className="group flex h-14 w-20 flex-col items-start justify-between rounded-lg border border-white/8 bg-slate-950/75 p-2 text-left shadow-lg backdrop-blur transition hover:border-cyan-300/35"
          >
            <Icon className="h-3.5 w-3.5 text-cyan-200/80" />
            <div>
              <div className="text-[0.7rem] font-semibold text-slate-100">{tile.label}</div>
              <div className="text-[0.55rem] uppercase tracking-wider text-slate-500">{tile.sub}</div>
            </div>
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
          {panel === "sources" ? "Sources" : panel === "methodology" ? "How to read this" : "Atlas controls"}
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

      {panel === "methodology" ? (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
          <p>
            <span className="font-semibold text-slate-100">Rodent Activity</span> uses official public inspections, complaints, and 311 records. It is not a rat population count.
          </p>
          <p>
            <span className="font-semibold text-slate-100">Colony Growth</span> is a modeled trajectory, separate from official city data.
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

      {panel === "settings" ? (
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

function SatelliteChrome() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none text-[0.55rem] font-medium uppercase tracking-[0.28em] text-slate-400/45">
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
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-[18%] top-[27%] h-24 w-52 -rotate-6 border border-emerald-300/20 bg-[repeating-linear-gradient(135deg,rgba(52,211,153,0.18)_0_2px,transparent_2px_12px)]" />
      <div className="absolute right-[28%] top-[42%] h-32 w-56 rotate-3 border border-yellow-300/20 bg-[repeating-linear-gradient(135deg,rgba(250,204,21,0.16)_0_2px,transparent_2px_12px)]" />
      <div className="absolute bottom-[20%] left-[45%] h-28 w-64 -rotate-2 border border-cyan-300/20 bg-[repeating-linear-gradient(135deg,rgba(103,232,249,0.16)_0_2px,transparent_2px_12px)]" />
    </div>
  );
}

function SeasonalityOverlay() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent shadow-[0_0_30px_rgba(103,232,249,0.35)]" />
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
