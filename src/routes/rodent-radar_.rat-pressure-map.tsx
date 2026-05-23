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

  const layers = useMemo(
    () => getAtlasLayerDefinitions().filter((layer): layer is AtlasLayerDefinition & { id: AtlasLayerId } =>
      DEFAULT_LAYERS.includes(layer.id as AtlasLayerId) ||
      ["colony-growth", "conditions", "exposure-safety"].includes(layer.id),
    ),
    [],
  );

  const activeLayers = search.layers;
  const mode = search.mode;
  const activePreset = search.preset;
  const [query, setQuery] = useState("");
  const [utilityPanel, setUtilityPanel] = useState<UtilityPanel>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [zipNotice, setZipNotice] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedAhs, setSelectedAhs] = useState<AhsEstimatePin | null>(null);
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
  const filteredPlaces = [...verified, ...ahsEstimatePins, ...unavailableRatPressureGeos].filter((place) =>
    `${place.name} ${place.region}`.toLowerCase().includes(query.toLowerCase()),
  );

  // Honest count for rail header: split by what kind of data backs each pin.
  const dataMix = useMemo(() => {
    const live = verified.filter((v) => v.provenance === "live").length;
    const seeded = verified.filter((v) => v.provenance === "seeded").length;
    const estimates = ahsEstimatePins.length;
    const gaps = unavailableRatPressureGeos.length;
    return { live, seeded, estimates, gaps };
  }, [verified]);

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
      setDrawerOpen(true);
      updateSearch({ place: city.id, gap: undefined, preset: undefined });
    },
    [updateSearch],
  );

  const selectGap = useCallback(
    (city: UnavailableRatPressureGeo) => {
      setDrawerOpen(true);
      updateSearch({ gap: city.id, preset: undefined });
    },
    [updateSearch],
  );

  const toggleLayer = useCallback(
    (layerId: AtlasLayerId) => {
      const next = activeLayers.includes(layerId)
        ? activeLayers.filter((id: AtlasLayerId) => id !== layerId)
        : [...activeLayers, layerId];
      const normalized: AtlasLayerId[] = next.includes("rodent-activity")
        ? next
        : ["rodent-activity", ...next];
      const dropGap = !normalized.includes("data-gaps");
      updateSearch({
        layers: normalized,
        gap: dropGap ? undefined : search.gap,
        preset: undefined,
      });
    },
    [activeLayers, search.gap, updateSearch],
  );

  const applyPreset = useCallback(
    (presetId: PresetId, override?: PresetApply) => {
      const recipe: Record<PresetId, PresetApply> = {
        winning: (() => {
          const top = [...verified].sort((a, b) => b.activityIndex - a.activityIndex).slice(0, 5);
          const avgLng = top.reduce((s, c) => s + c.lng, 0) / top.length;
          const avgLat = top.reduce((s, c) => s + c.lat, 0) / top.length;
          return {
            layers: ["rodent-activity"] as AtlasLayerId[],
            window: "12mo",
            center: [avgLng, avgLat] as [number, number],
            zoom: 3.6,
            place: top[0]?.id,
          };
        })(),
        seasonal: {
          layers: ["rodent-activity", "seasonality"],
          window: "90d",
          center: [-96, 38],
          zoom: 3.2,
        },
        gaps: {
          layers: ["data-gaps"],
          window: "12mo",
          center: [-40, 28],
          zoom: 1.6,
        },
        "your-block": override ?? {
          layers: ["rodent-activity"],
          window: "12mo",
        },
      };
      const apply = override ?? recipe[presetId];
      setZipNotice(null);
      updateSearch({
        layers: apply.layers,
        window: apply.window,
        zoom: apply.zoom,
        center: apply.center,
        place: apply.place ?? search.place,
        gap: presetId === "gaps" ? search.gap : undefined,
        preset: presetId,
      });
    },
    [search.gap, search.place, updateSearch, verified],
  );

  const handleYourBlockGeo = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setZipNotice("Geolocation unavailable. Enter a US ZIP.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const nearest = nearestPlaceByCoord(latitude, longitude, verified);
        applyPreset("your-block", {
          layers: ["rodent-activity"],
          window: "12mo",
          center: [longitude, latitude],
          zoom: 10,
          place: nearest?.id,
        });
        setZipNotice(`Nearest covered place: ${nearest?.shortName}`);
      },
      () => {
        setZipNotice("Location denied. Enter a US ZIP.");
      },
      { timeout: 7000 },
    );
  }, [applyPreset, verified]);

  const handleZipSubmit = useCallback(
    (zip: string) => {
      const clean = zip.trim().slice(0, 5);
      const placeId = ZIP_TO_PLACE[clean];
      if (placeId) {
        const place = verified.find((p) => p.id === placeId);
        if (place) {
          applyPreset("your-block", {
            layers: ["rodent-activity"],
            window: "12mo",
            center: [place.lng, place.lat],
            zoom: 10,
            place: place.id,
          });
          setZipNotice(`Covered: ${place.shortName}`);
          return;
        }
      }
      setZipNotice("ZIP not in coverage. Try a NYC, Chicago, Boston, DC, or SF ZIP.");
    },
    [applyPreset, verified],
  );

  const copyShare = useCallback(async () => {
    if (typeof window === "undefined") return;
    await navigator.clipboard?.writeText(window.location.href);
  }, []);

  const downloadMapPng = useCallback(async () => {
    const map = mapRef.current;
    if (!map) return;
    const canvas = map.getCanvas();
    // Composite a watermark onto a clone so the source canvas is untouched
    const w = canvas.width;
    const h = canvas.height;
    const out = document.createElement("canvas");
    out.width = w;
    out.height = h;
    const ctx = out.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(canvas, 0, 0);
    ctx.fillStyle = "rgba(110, 231, 183, 0.85)";
    ctx.font = `${Math.max(12, Math.round(w / 110))}px "Inter", system-ui, sans-serif`;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 6;
    ctx.fillText("Rodent Radar · cloakd-removals.cloud", w - 16, h - 16);
    out.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const label = search.preset ?? search.place ?? "atlas";
      a.href = url;
      a.download = `rodent-radar-${label}-${stamp}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [search.preset, search.place]);


  return (
    <div
      className="h-screen overflow-hidden bg-[#05080d] text-slate-100"
      data-display-mode={mode}
    >
      <AtlasMap
        verified={verified}
        unavailable={unavailableRatPressureGeos}
        ahsPins={ahsEstimatePins}
        selected={selected}
        selectedGap={selectedGap}
        selectedAhs={selectedAhs}
        activeLayers={activeSet as Set<AtlasLayerId>}
        mode={mode}
        onSelectVerified={handleSelectVerified}
        onSelectGap={handleSelectGap}
        onSelectAhs={handleSelectAhs}
        mapRef={mapRef}
      />

      {mode === "field" ? (
        <FieldBottomSheet
          selected={selected}
          selectedGap={selectedGap}
          onClose={() => updateSearch({ mode: "standard" })}
        />
      ) : null}

      {mode === "field" ? (
        <button
          type="button"
          onClick={() => updateSearch({ mode: "standard" })}
          style={{ zIndex: Z.fieldChip }}
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-cyan-100 shadow-2xl backdrop-blur transition hover:bg-cyan-300/15"
        >
          <X className="h-3.5 w-3.5" />
          Exit field view
        </button>
      ) : null}

      <aside
        style={{ zIndex: Z.rail }}
        className={`atlas-rail absolute left-4 top-4 hidden max-h-[calc(100vh-2rem)] w-[320px] overflow-hidden rounded-2xl border border-white/8 bg-slate-950/82 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl lg:block ${
          mode === "field" ? "lg:hidden" : ""
        }`}
      >
        <div className="flex max-h-[calc(100vh-2rem)] flex-col">
          <div className="border-b border-white/8 px-5 py-4">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold tracking-tight">
                <span className="text-cyan-300">Rodent</span> Radar
              </span>
              <span className="rounded-sm border border-yellow-300/40 px-1.5 py-px text-[0.55rem] font-bold uppercase tracking-[0.14em] text-yellow-200/90">
                beta
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
              {LEDE_BY_PRESET[(activePreset ?? "default") as PresetId | "default"]}
            </p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-slate-500">
              {dataMix.live} live · {dataMix.seeded} sample · {dataMix.estimates} estimate · {dataMix.gaps} gap
            </p>
            <p className="mt-1 text-[0.6rem] leading-relaxed text-slate-500">
              Live = official city open data. Sample = published figure being re-verified. Estimate = U.S. household survey. Gap = no clean dataset yet.
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            {/* Legend: pressure bands (the colored dots on the map) */}
            <LegendSection title="Pressure band" subtitle="Color of each dot on the map">
              {PRESSURE_BAND_THRESHOLDS.map((band) => (
                <div key={band.band} className="flex items-center gap-2 py-1">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      background: markerTone(band.band, mode),
                      boxShadow: `0 0 8px ${markerTone(band.band, mode)}66`,
                    }}
                  />
                  <span className="text-xs font-semibold text-slate-200">{band.label}</span>
                  <span className="ml-auto text-[0.6rem] uppercase tracking-wider text-slate-500">
                    index ≥ {band.minIndex}
                  </span>
                </div>
              ))}
              <p className="mt-1 text-[0.65rem] leading-relaxed text-slate-500">
                Activity index combines inspections, complaints, and recent share — not a population count.
              </p>
            </LegendSection>

            <LegendSection title="Dot size" subtitle="How loud the area is">
              <div className="flex items-end gap-3 py-1">
                {[5, 9, 14].map((r, i) => (
                  <div key={r} className="flex flex-col items-center gap-1">
                    <span
                      className="rounded-full"
                      style={{
                        width: r * 2,
                        height: r * 2,
                        background: markerTone("high", mode),
                        opacity: 0.85,
                      }}
                    />
                    <span className="text-[0.55rem] uppercase tracking-wider text-slate-500">
                      {["small", "mid", "loud"][i]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-1 text-[0.65rem] leading-relaxed text-slate-500">
                Bigger dot = higher activity index. Halo opacity = data confidence.
              </p>
            </LegendSection>

            {/* Preset views — collapsible "lenses" matching OGW pattern */}
            <LegendSection title="Preset views" subtitle="Switch the story this map tells">
              <div className="mt-1 grid gap-1">
                {PRESETS.map((p) => {
                  const Icon = p.icon;
                  const isActive = activePreset === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        if (p.id === "your-block") handleYourBlockGeo();
                        else applyPreset(p.id);
                      }}
                      className={`flex items-center gap-2 rounded px-2 py-1.5 text-left text-xs transition ${
                        isActive
                          ? "bg-cyan-300/10 text-cyan-100"
                          : "text-slate-300 hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-200/70" />
                      <span className="flex-1 truncate font-medium">{p.label}</span>
                      <span className="shrink-0 text-[0.55rem] uppercase tracking-wider text-slate-500">
                        {p.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
              {activePreset === "your-block" ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const zip = (e.currentTarget.elements.namedItem("zip") as HTMLInputElement)?.value ?? "";
                    handleZipSubmit(zip);
                  }}
                  className="mt-2 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs"
                >
                  <input
                    name="zip"
                    placeholder="US ZIP"
                    inputMode="numeric"
                    maxLength={5}
                    className="w-20 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none"
                  />
                  <button type="submit" className="rounded-full bg-cyan-300/20 px-2 py-0.5 text-cyan-100">Go</button>
                  {zipNotice ? <span className="truncate text-[0.65rem] text-slate-400">{zipNotice}</span> : null}
                </form>
              ) : null}
            </LegendSection>

            {/* Context overlays — secondary, optional */}
            <LegendSection title="Show on map" subtitle="Optional overlays">
              <div className="mt-1 grid gap-px">
                {layers.map((layer) => (
                  <LayerRow
                    key={layer.id}
                    layer={layer}
                    active={activeLayers.includes(layer.id)}
                    onToggle={() => toggleLayer(layer.id)}
                  />
                ))}
              </div>
            </LegendSection>

            {/* Display mode — last, since it's about how, not what */}
            <LegendSection title="Display mode" subtitle="Adjust for context, not data">
              <DisplayModePicker mode={mode} onChange={(m) => updateSearch({ mode: m, preset: undefined })} />
            </LegendSection>

            {/* Place list at the bottom, scrolls within the rail */}
            <LegendSection title={`All areas (${filteredPlaces.length})`} subtitle="Click to focus">
              <div className="mt-1 grid gap-px">
                {filteredPlaces.map((place) => {
                  if ("last12MonthsCount" in place) {
                    return (
                      <button
                        key={place.id}
                        type="button"
                        onClick={() => selectVerified(place)}
                        className={`flex items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-xs transition ${
                          selected.id === place.id && !selectedGap && !selectedAhs
                            ? "bg-cyan-300/10 text-cyan-100"
                            : "text-slate-300 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: markerTone(place.activityBand, mode) }}
                          />
                          <span className="truncate">{place.shortName}</span>
                        </span>
                        <span className="shrink-0 text-[0.6rem] uppercase tracking-wider text-slate-500">
                          {place.provenance === "seeded" ? "sample" : activityBandLabels[place.activityBand]}
                        </span>
                      </button>
                    );
                  }
                  if ("rodentEvidencePercent" in place) {
                    return (
                      <button
                        key={place.id}
                        type="button"
                        onClick={() => {
                          setSelectedAhs(place);
                          setDrawerOpen(true);
                          updateSearch({ gap: undefined, preset: undefined });
                        }}
                        className={`flex items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-xs transition ${
                          selectedAhs?.id === place.id
                            ? "bg-slate-300/10 text-slate-100"
                            : "text-slate-300 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span className="h-2 w-2 shrink-0 rounded-full border border-slate-300/70" />
                          <span className="truncate">{place.shortName}</span>
                        </span>
                        <span className="shrink-0 text-[0.6rem] uppercase tracking-wider text-slate-500">
                          ~{place.rodentEvidencePercent}% survey
                        </span>
                      </button>
                    );
                  }
                  const gap = place as UnavailableRatPressureGeo;
                  return (
                    <button
                      key={gap.id}
                      type="button"
                      onClick={() => { setSelectedAhs(null); selectGap(gap); }}
                      className={`flex items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-xs transition ${
                        selectedGap?.id === gap.id
                          ? "bg-slate-300/10 text-slate-100"
                          : "text-slate-400 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="grid h-3 w-3 shrink-0 place-items-center rounded-full border border-slate-500/60 text-[0.55rem] font-bold text-slate-400">?</span>
                        <span className="truncate">{gap.shortName}</span>
                      </span>
                      <span className="shrink-0 text-[0.6rem] uppercase tracking-wider text-slate-500">no data</span>
                    </button>
                  );
                })}
              </div>
            </LegendSection>
          </div>
        </div>
      </aside>

      <MobileTopBar
        activeLayers={activeLayers}
        layers={layers}
        onToggle={toggleLayer}
        query={query}
        setQuery={setQuery}
      />

      {/* PresetBar moved into the legend rail. Suppress duplicate top-center chrome. */}

      <TopTools
        query={query}
        setQuery={setQuery}
        onShare={() => setShareOpen((s) => !s)}
        onSources={() => setUtilityPanel(utilityPanel === "sources" ? null : "sources")}
        onMethodology={() => setUtilityPanel(utilityPanel === "methodology" ? null : "methodology")}
        onSettings={() => setUtilityPanel(utilityPanel === "settings" ? null : "settings")}
      />

      {shareOpen ? (
        <SharePopover
          onCopy={async () => {
            await copyShare();
            setShareOpen(false);
          }}
          onDownload={async () => {
            await downloadMapPng();
            setShareOpen(false);
          }}
          onClose={() => setShareOpen(false)}
        />
      ) : null}

      <MapUtilityButtons
        onLayers={() => setUtilityPanel(utilityPanel === "settings" ? null : "settings")}
        onSources={() => setUtilityPanel(utilityPanel === "sources" ? null : "sources")}
        onMethodology={() => setUtilityPanel(utilityPanel === "methodology" ? null : "methodology")}
      />

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

      {utilityPanel ? (
        <UtilityDrawer
          panel={utilityPanel}
          layers={layers}
          activeLayers={activeLayers}
          onToggle={toggleLayer}
          onClose={() => setUtilityPanel(null)}
        />
      ) : null}
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
