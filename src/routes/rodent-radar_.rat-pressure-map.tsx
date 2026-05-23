import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  BarChart3,
  CircleDot,
  Crosshair,
  Database,
  ExternalLink,
  Globe2,
  Info,
  Layers3,
  Map,
  RefreshCcw,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Tags,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { activityBandLabels, type ActivityBand } from "@/lib/rodentRadar";
import {
  exposureGuidance,
  formatCount,
  getAtlasLayerDefinitions,
  getAtlasSourceCards,
  getColonyGrowthProjection,
  getRatPressureResults,
  unavailableRatPressureGeos,
  type AtlasLayerDefinition,
  type RatPressureResult,
  type UnavailableRatPressureGeo,
} from "@/lib/ratPressureMap";

type MapLibreModule = typeof import("maplibre-gl");
type MapLibreMap = import("maplibre-gl").Map;
type MapLibreMarker = import("maplibre-gl").Marker;

type AtlasLayerId =
  | "rodent-activity"
  | "colony-growth"
  | "recent-reports"
  | "seasonality"
  | "conditions"
  | "data-gaps"
  | "exposure-safety";

type UtilityPanel = "sources" | "methodology" | "settings" | null;

const TITLE = "Rodent Radar: Rodent Activity Atlas";
const DESCRIPTION =
  "Explore official rodent activity, colony growth modeling, civic conditions, data gaps, and exposure-safety guidance in a dark interactive atlas.";
const CANONICAL_URL = "https://cloakd-removals.cloud/rodent-radar/rat-pressure-map";
const DEFAULT_LAYERS: AtlasLayerId[] = ["rodent-activity", "recent-reports", "seasonality", "data-gaps"];
const SOURCES = getAtlasSourceCards();

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

function parseLayers(value: string | null): AtlasLayerId[] {
  const allowed = new Set(getAtlasLayerDefinitions().map((layer) => layer.id));
  if (!value) return DEFAULT_LAYERS;
  const parsed = value.split(",").filter((id): id is AtlasLayerId => allowed.has(id));
  return parsed.length ? parsed : DEFAULT_LAYERS;
}

function getShareUrl(city: RatPressureResult | UnavailableRatPressureGeo) {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  if ("last12MonthsCount" in city) {
    url.searchParams.set("city", city.id);
    url.searchParams.delete("watchlist");
  } else {
    url.searchParams.set("watchlist", city.id);
    url.searchParams.delete("city");
  }
  return url.toString();
}

function bandTone(band: ActivityBand) {
  const tones: Record<ActivityBand, string> = {
    low: "text-emerald-200 border-emerald-300/40 bg-emerald-400/10",
    moderate: "text-yellow-200 border-yellow-300/40 bg-yellow-400/10",
    high: "text-orange-200 border-orange-300/40 bg-orange-400/10",
    severe: "text-rose-200 border-rose-300/40 bg-rose-400/10",
  };
  return tones[band];
}

function markerTone(band: ActivityBand) {
  const tones: Record<ActivityBand, string> = {
    low: "#34d399",
    moderate: "#facc15",
    high: "#fb923c",
    severe: "#fb7185",
  };
  return tones[band];
}

function RodentRadarAtlasPage() {
  const verified = useMemo(() => getRatPressureResults(), []);
  const layers = useMemo(
    () => getAtlasLayerDefinitions().filter((layer): layer is AtlasLayerDefinition & { id: AtlasLayerId } =>
      DEFAULT_LAYERS.includes(layer.id as AtlasLayerId) ||
      ["colony-growth", "conditions", "exposure-safety"].includes(layer.id),
    ),
    [],
  );
  const [selectedId, setSelectedId] = useState(verified[0]?.id ?? "");
  const [selectedGapId, setSelectedGapId] = useState("");
  const [query, setQuery] = useState("");
  const [activeLayers, setActiveLayers] = useState<AtlasLayerId[]>(DEFAULT_LAYERS);
  const [utilityPanel, setUtilityPanel] = useState<UtilityPanel>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const selected = verified.find((city) => city.id === selectedId) ?? verified[0];
  const selectedGap = unavailableRatPressureGeos.find((city) => city.id === selectedGapId) ?? null;
  const activeSet = useMemo(() => new Set(activeLayers), [activeLayers]);
  const filteredPlaces = [...verified, ...unavailableRatPressureGeos].filter((place) =>
    `${place.name} ${place.region}`.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const city = params.get("city");
    const watchlist = params.get("watchlist");
    if (city && verified.some((place) => place.id === city)) setSelectedId(city);
    if (watchlist && unavailableRatPressureGeos.some((place) => place.id === watchlist)) {
      setSelectedGapId(watchlist);
    }
    setActiveLayers(parseLayers(params.get("layers")));
  }, [verified]);

  function setUrl(nextLayers = activeLayers, cityId = selectedId, gapId = selectedGapId) {
    const url = new URL(window.location.href);
    if (gapId) {
      url.searchParams.set("watchlist", gapId);
      url.searchParams.delete("city");
    } else {
      url.searchParams.set("city", cityId);
      url.searchParams.delete("watchlist");
    }
    url.searchParams.set("layers", nextLayers.join(","));
    window.history.replaceState({}, "", url);
  }

  function selectVerified(city: RatPressureResult) {
    setSelectedId(city.id);
    setSelectedGapId("");
    setDrawerOpen(true);
    setUrl(activeLayers, city.id, "");
  }

  function selectGap(city: UnavailableRatPressureGeo) {
    setSelectedGapId(city.id);
    setDrawerOpen(true);
    setUrl(activeLayers, selectedId, city.id);
  }

  function toggleLayer(layerId: AtlasLayerId) {
    const next = activeLayers.includes(layerId)
      ? activeLayers.filter((id) => id !== layerId)
      : [...activeLayers, layerId];
    const normalized: AtlasLayerId[] = next.includes("rodent-activity") ? next : ["rodent-activity", ...next];
    setActiveLayers(normalized);
    if (!normalized.includes("data-gaps")) {
      setSelectedGapId("");
      setUrl(normalized, selectedId, "");
    } else {
      setUrl(normalized);
    }
  }

  async function copyShare() {
    const place = selectedGap ?? selected;
    const label = "last12MonthsCount" in place
      ? `${place.name}: ${formatCount(place.last12MonthsCount)} official rodent records, ${activityBandLabels[place.activityBand]} activity. ${getShareUrl(place)}`
      : `${place.name}: data gap, source reviewed. ${getShareUrl(place)}`;
    await navigator.clipboard?.writeText(label);
  }

  return (
    <div className="h-screen overflow-hidden bg-[#05080d] text-slate-100">
      <AtlasMap
        verified={verified}
        unavailable={unavailableRatPressureGeos}
        selected={selected}
        selectedGap={selectedGap}
        activeLayers={activeSet}
        onSelectVerified={selectVerified}
        onSelectGap={selectGap}
      />

      <aside className="absolute left-4 top-4 z-20 hidden max-h-[calc(100vh-2rem)] w-[300px] overflow-hidden rounded-2xl border border-white/8 bg-slate-950/82 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl lg:block">
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
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
              Public rodent data, for people who live with the consequences.
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Layers</div>
            <div className="mt-2 grid gap-px">
              {layers.map((layer) => (
                <LayerRow
                  key={layer.id}
                  layer={layer}
                  active={activeLayers.includes(layer.id)}
                  onToggle={() => toggleLayer(layer.id)}
                />
              ))}
            </div>

            <div className="mt-6 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Places</div>
            <div className="mt-2 grid gap-px">
              {filteredPlaces.map((place) =>
                "last12MonthsCount" in place ? (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => selectVerified(place)}
                    className={`flex items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-xs transition ${
                      selected.id === place.id && !selectedGap
                        ? "bg-cyan-300/10 text-cyan-100"
                        : "text-slate-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: markerTone(place.activityBand) }}
                      />
                      <span className="truncate">{place.shortName}</span>
                    </span>
                    <span className="shrink-0 text-[0.6rem] uppercase tracking-wider text-slate-500">
                      {activityBandLabels[place.activityBand]}
                    </span>
                  </button>
                ) : (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => selectGap(place)}
                    className={`flex items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-xs transition ${
                      selectedGap?.id === place.id
                        ? "bg-slate-300/10 text-slate-100"
                        : "text-slate-400 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="grid h-3 w-3 shrink-0 place-items-center rounded-full border border-slate-500/60 text-[0.55rem] font-bold text-slate-400">?</span>
                      <span className="truncate">{place.shortName}</span>
                    </span>
                    <span className="shrink-0 text-[0.6rem] uppercase tracking-wider text-slate-500">gap</span>
                  </button>
                ),
              )}
            </div>
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

      <TopTools
        onShare={copyShare}
        onSources={() => setUtilityPanel(utilityPanel === "sources" ? null : "sources")}
        onMethodology={() => setUtilityPanel(utilityPanel === "methodology" ? null : "methodology")}
        onSettings={() => setUtilityPanel(utilityPanel === "settings" ? null : "settings")}
      />

      <MapUtilityButtons
        onLayers={() => setUtilityPanel(utilityPanel === "settings" ? null : "settings")}
        onSources={() => setUtilityPanel(utilityPanel === "sources" ? null : "sources")}
      />

      <SelectedDrawer
        selected={selected}
        selectedGap={selectedGap}
        activeLayers={activeSet}
        onCloseGap={() => setSelectedGapId("")}
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
  selected,
  selectedGap,
  activeLayers,
  onSelectVerified,
  onSelectGap,
}: {
  verified: RatPressureResult[];
  unavailable: UnavailableRatPressureGeo[];
  selected: RatPressureResult;
  selectedGap: UnavailableRatPressureGeo | null;
  activeLayers: Set<AtlasLayerId>;
  onSelectVerified: (city: RatPressureResult) => void;
  onSelectGap: (city: UnavailableRatPressureGeo) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<MapLibreMarker[]>([]);
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
      mapRef.current = new maplibre.Map({
        container: containerRef.current,
        style: {
          version: 8,
          sources: {
            cartoDark: {
              type: "raster",
              tiles: ["https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "© CARTO © OpenStreetMap contributors",
            },
          },
          layers: [{ id: "cartoDark", type: "raster", source: "cartoDark" }],
        },
        center: [-88, 39],
        zoom: 3.2,
        attributionControl: false,
      });
      mapRef.current.addControl(new maplibre.AttributionControl({ compact: true }), "bottom-right");
      setReady(true);
    }

    void loadMap();
    return () => {
      cancelled = true;
      markersRef.current.forEach((marker) => marker.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const maplibre = maplibreRef.current;
    if (!map || !maplibre || !ready) return;

    markersRef.current.forEach((marker) => marker.remove());
    const markers: MapLibreMarker[] = [];

    if (activeLayers.has("rodent-activity")) {
      for (const city of verified) {
        const el = document.createElement("button");
        const color = markerTone(city.activityBand);
        const size = 30 + Math.min(26, Math.max(0, city.activityIndex - 40) * 0.7);
        el.type = "button";
        el.className = "rodent-atlas-marker";
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.background = color;
        el.style.boxShadow = `0 0 0 7px ${color}26, 0 0 28px ${color}aa`;
        el.setAttribute(
          "aria-label",
          `${city.name}: ${activityBandLabels[city.activityBand]} rodent activity, ${formatCount(city.last12MonthsCount)} official records`,
        );
        el.addEventListener("click", (event) => {
          event.stopPropagation();
          onSelectVerified(city);
        });
        markers.push(new maplibre.Marker({ element: el, anchor: "center" }).setLngLat([city.lng, city.lat]).addTo(map));

        if (activeLayers.has("colony-growth")) {
          const ring = document.createElement("div");
          ring.className = "rodent-atlas-colony-ring";
          ring.style.width = `${size + 32}px`;
          ring.style.height = `${size + 32}px`;
          ring.style.borderColor = `${layerColors["colony-growth"]}88`;
          markers.push(new maplibre.Marker({ element: ring, anchor: "center" }).setLngLat([city.lng, city.lat]).addTo(map));
        }
      }
    }

    if (activeLayers.has("data-gaps")) {
      for (const city of unavailable) {
        const el = document.createElement("button");
        el.type = "button";
        el.className = `rodent-atlas-gap-marker ${selectedGap?.id === city.id ? "rodent-atlas-gap-marker-selected" : ""}`;
        el.textContent = "?";
        el.setAttribute("aria-label", `${city.name}: official rodent activity data gap`);
        el.addEventListener("click", (event) => {
          event.stopPropagation();
          onSelectGap(city);
        });
        markers.push(new maplibre.Marker({ element: el, anchor: "center" }).setLngLat([city.lng, city.lat]).addTo(map));
      }
    }

    markersRef.current = markers;
  }, [activeLayers, onSelectGap, onSelectVerified, ready, selectedGap, unavailable, verified]);

  useEffect(() => {
    const target = selectedGap ?? selected;
    mapRef.current?.flyTo({
      center: [target.lng, target.lat],
      zoom: target.region === "NYC" || target.region === "NY/NJ metro" ? 8.7 : 9.25,
      essential: true,
    });
  }, [ready, selected, selectedGap]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_25%_80%,rgba(168,85,247,0.14),transparent_28%)]" />
      {activeLayers.has("conditions") ? <ConditionsOverlay /> : null}
      {activeLayers.has("seasonality") ? <SeasonalityOverlay /> : null}
      {!ready ? (
        <div className="absolute inset-0 grid place-items-center bg-[#05080d]">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_40px_rgba(103,232,249,0.25)]" />
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Loading atlas</p>
          </div>
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
  const Icon = layerIcons[layer.id];
  const status = layer.status === "available" ? "on" : layer.status;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group rounded-xl border p-3 text-left transition ${
        active ? "border-cyan-300/40 bg-cyan-300/10" : "border-white/10 bg-white/[0.035] hover:border-cyan-300/25"
      }`}
      aria-pressed={active}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-slate-950/80">
          <Icon className="h-4 w-4" style={{ color: layerColors[layer.id] }} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-black text-slate-100">{layer.name}</span>
          <span className="block truncate text-xs font-semibold text-slate-500">{layer.description}</span>
        </span>
        <span className={`text-xs font-black uppercase tracking-[0.12em] ${active ? "text-cyan-200" : "text-slate-500"}`}>
          {active ? status : "off"}
        </span>
      </div>
    </button>
  );
}

function SelectedDrawer({
  selected,
  selectedGap,
  activeLayers,
  onCloseGap,
}: {
  selected: RatPressureResult;
  selectedGap: UnavailableRatPressureGeo | null;
  activeLayers: Set<AtlasLayerId>;
  onCloseGap: () => void;
}) {
  if (selectedGap) {
    return (
      <aside className="absolute bottom-4 right-4 z-20 w-[min(420px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-slate-950/88 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Data gap</div>
            <h2 className="mt-1 text-3xl font-black tracking-tight">{selectedGap.name}</h2>
            <p className="mt-1 text-sm font-semibold text-slate-400">{selectedGap.region}</p>
          </div>
          <button type="button" onClick={onCloseGap} className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-300">{selectedGap.reason}</p>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Source reviewed</div>
          <div className="mt-2 font-bold">{selectedGap.reviewedSourceName ?? "Source review needed"}</div>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{selectedGap.reviewNote}</p>
          {selectedGap.reviewedSourceUrl ? (
            <a href={selectedGap.reviewedSourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-black text-cyan-200 hover:underline">
              View source <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </aside>
    );
  }

  const colony = getColonyGrowthProjection(selected);

  return (
    <aside className="absolute bottom-4 right-4 z-20 w-[min(440px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-slate-950/88 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Selected area</div>
          <h2 className="mt-1 text-3xl font-black tracking-tight">{selected.name}</h2>
          <p className="mt-1 text-sm font-semibold text-slate-400">
            {selected.geo} · snapshot {selected.snapshotDate}
          </p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${bandTone(selected.activityBand)}`}>
          {activityBandLabels[selected.activityBand]}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Metric label="Official records" value={formatCount(selected.last12MonthsCount)} />
        <Metric label="Recent activity" value={formatCount(selected.recent90DayCount)} />
        <Metric label="Change" value={`${selected.trendPercent > 0 ? "+" : ""}${selected.trendPercent}%`} />
      </div>

      {activeLayers.has("colony-growth") ? (
        <div className="mt-4 rounded-xl border border-purple-300/20 bg-purple-300/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-black text-purple-100">Colony Growth</div>
            <div className="rounded-full bg-purple-300/15 px-2 py-0.5 text-xs font-black uppercase text-purple-100">
              modeled
            </div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {selected.shortName} is showing a {colony.estimateRange} trajectory.
          </p>
          <div className="mt-3 grid gap-2 text-xs font-semibold text-slate-300">
            <div>30 days: {colony.days30}</div>
            <div>60 days: {colony.days60}</div>
            <div>90 days: {colony.days90}</div>
          </div>
          <p className="mt-3 text-xs font-semibold leading-relaxed text-slate-500">{colony.disclaimer}</p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Data confidence</div>
          <div className="mt-1 text-sm font-bold text-slate-200">{selected.confidence} · {selected.confidenceNote}</div>
        </div>
        <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-cyan-200/25 px-3 py-1.5 text-sm font-black text-cyan-200 hover:bg-cyan-200/10">
          Source <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </aside>
  );
}

function TopTools({
  onShare,
  onSources,
  onMethodology,
  onSettings,
}: {
  onShare: () => void;
  onSources: () => void;
  onMethodology: () => void;
  onSettings: () => void;
}) {
  const tools = [
    { label: "Search", icon: Search, action: onSettings },
    { label: "Share", icon: Share2, action: onShare },
    { label: "Reset", icon: RefreshCcw, action: () => window.location.assign("/rodent-radar/rat-pressure-map") },
    { label: "Labels", icon: Tags, action: onSettings },
    { label: "Map style", icon: Map, action: onSettings },
    { label: "Sources", icon: Database, action: onSources },
    { label: "Info", icon: Info, action: onMethodology },
  ];

  return (
    <div className="absolute right-4 top-4 z-20 hidden flex-wrap justify-end gap-2 md:flex">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.label}
            type="button"
            onClick={tool.action}
            className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-slate-950/75 text-slate-300 shadow-lg backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-100"
            aria-label={tool.label}
            title={tool.label}
          >
            <Icon className="h-5 w-5" />
          </button>
        );
      })}
    </div>
  );
}

function MapUtilityButtons({ onLayers, onSources }: { onLayers: () => void; onSources: () => void }) {
  return (
    <div className="absolute bottom-4 left-4 z-20 hidden gap-3 lg:flex">
      <button type="button" onClick={onLayers} className="h-20 w-24 rounded-2xl border border-cyan-200/20 bg-slate-950/75 text-sm font-black text-slate-100 shadow-xl backdrop-blur hover:border-cyan-200/50">
        <Layers3 className="mx-auto mb-1 h-5 w-5 text-cyan-200" />
        Layers
      </button>
      <button type="button" onClick={onSources} className="h-20 w-24 rounded-2xl border border-cyan-200/20 bg-slate-950/75 text-sm font-black text-slate-100 shadow-xl backdrop-blur hover:border-cyan-200/50">
        <Database className="mx-auto mb-1 h-5 w-5 text-cyan-200" />
        Sources
      </button>
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
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-300">
          <p>
            Rodent Activity uses official public rodent inspections, complaints, or auditable rodent/vermin 311 records. It is not a rat population count.
          </p>
          <p>
            Colony Growth is a modeled layer that explains possible trajectory from the selected activity band. It is separate from official city data.
          </p>
          <p>
            Conditions, exposure safety, and data gaps help explain the map. They do not change official Rodent Activity.
          </p>
          <div className="grid gap-2">
            <Link to="/rodent-radar/terms" className="font-black text-cyan-200 hover:underline">Terms of use</Link>
            <Link to="/rodent-radar/attribution" className="font-black text-cyan-200 hover:underline">Attribution and data rights</Link>
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

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="text-lg font-black text-slate-100">{value}</div>
      <div className="mt-0.5 text-[0.62rem] font-black uppercase tracking-[0.14em] text-slate-500">{label}</div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="text-base font-black text-slate-100">{value}</div>
      <div className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.14em] text-slate-500">{label}</div>
    </div>
  );
}

function compactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
