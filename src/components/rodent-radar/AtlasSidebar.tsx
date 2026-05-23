// OGW-style left sidebar — the only persistent UI anchor.
// Order: brand → metric → legend (band + size) → confidence key → coverage
// filter → place list → "About the data" footer. The map fills the rest of
// the viewport; toggles live in the docked bottom-left LayerCards.

import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { activityBandLabels, type ActivityBand } from "@/lib/rodentRadar";
import {
  PRESSURE_BAND_THRESHOLDS,
  type AhsEstimatePin,
  type RatPressureResult,
  type UnavailableRatPressureGeo,
} from "@/lib/ratPressureMap";
import { AtlasSection } from "./AtlasSection";
import { ConfidenceKey } from "./ConfidenceKey";

export type MetricKey = "index" | "per10kResidents" | "per1kHousing" | "perSqMile" | "recent90";

interface MetricDef {
  id: MetricKey;
  label: string;
  hint: string;
}

const METRICS: MetricDef[] = [
  { id: "index", label: "Activity index", hint: "Combined signal — default" },
  { id: "per10kResidents", label: "Per 10k residents", hint: "Normalized for population" },
  { id: "per1kHousing", label: "Per 1k housing units", hint: "Normalized for housing stock" },
  { id: "perSqMile", label: "Per sq mile", hint: "Density of reports" },
  { id: "recent90", label: "Recent 90 days", hint: "Heat in the last quarter" },
];

interface AtlasSidebarProps {
  metric: MetricKey;
  onMetricChange: (m: MetricKey) => void;
  verified: RatPressureResult[];
  gaps: UnavailableRatPressureGeo[];
  ahsPins: AhsEstimatePin[];
  query: string;
  onQueryChange: (q: string) => void;
  selectedVerifiedId?: string;
  selectedGapId?: string;
  selectedAhsId?: string;
  showCoverage: { live: boolean; gaps: boolean; estimates: boolean };
  onShowCoverageChange: (next: { live: boolean; gaps: boolean; estimates: boolean }) => void;
  onSelectVerified: (city: RatPressureResult) => void;
  onSelectGap: (gap: UnavailableRatPressureGeo) => void;
  onSelectAhs: (pin: AhsEstimatePin) => void;
  markerColor: (band: ActivityBand) => string;
  dataMix: { live: number; gaps: number; estimates: number };
}

export function AtlasSidebar({
  metric,
  onMetricChange,
  verified,
  gaps,
  ahsPins,
  query,
  onQueryChange,
  selectedVerifiedId,
  selectedGapId,
  selectedAhsId,
  showCoverage,
  onShowCoverageChange,
  onSelectVerified,
  onSelectGap,
  onSelectAhs,
  markerColor,
  dataMix,
}: AtlasSidebarProps) {
  const filterQ = query.trim().toLowerCase();
  const matchesQ = (text: string) => !filterQ || text.toLowerCase().includes(filterQ);

  const visibleVerified = showCoverage.live
    ? verified.filter((c) => matchesQ(`${c.name} ${c.region}`))
    : [];
  const visibleGaps = showCoverage.gaps
    ? gaps.filter((c) => matchesQ(`${c.name} ${c.region}`))
    : [];
  const visibleAhs = showCoverage.estimates
    ? ahsPins.filter((c) => matchesQ(`${c.name} ${c.region}`))
    : [];

  const totalShown = visibleVerified.length + visibleGaps.length + visibleAhs.length;

  return (
    <aside
      className="atlas-sidebar absolute left-0 top-0 z-40 flex h-full w-[300px] flex-col border-r border-white/[0.06] bg-slate-950/90 text-slate-200 shadow-2xl shadow-black/40 backdrop-blur-xl"
    >
      {/* Brand */}
      <div className="border-b border-white/[0.06] px-4 py-3.5">
        <Link to="/rodent-radar" className="flex items-baseline gap-2">
          <span className="text-[0.95rem] font-semibold tracking-tight text-slate-100">
            <span className="text-cyan-300">Rodent</span> Radar
          </span>
          <span className="rounded-sm border border-amber-300/40 px-1 py-px text-[0.5rem] font-bold uppercase tracking-[0.14em] text-amber-200/90">
            beta
          </span>
        </Link>
        <p className="mt-1.5 text-[0.68rem] leading-snug text-slate-400">
          Where official rodent activity is being reported, how recent it is, and where city data is missing.
        </p>
        <p className="mt-1.5 text-[0.58rem] uppercase tracking-[0.14em] text-slate-500">
          {dataMix.live} live · {dataMix.estimates} estimate · {dataMix.gaps} reviewed gap
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Metric — primary control */}
        <AtlasSection title="Metric" subtitle="How dots are colored & sized">
          <div className="grid gap-px">
            {METRICS.map((m) => {
              const active = metric === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onMetricChange(m.id)}
                  className={`flex items-baseline justify-between gap-2 rounded px-2 py-1.5 text-left text-[0.7rem] transition ${
                    active ? "bg-cyan-300/10 text-cyan-100" : "text-slate-300 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="font-medium">{m.label}</span>
                  <span className="text-[0.58rem] text-slate-500">{m.hint}</span>
                </button>
              );
            })}
          </div>
        </AtlasSection>

        {/* Legend — pressure bands */}
        <AtlasSection title="Pressure band" subtitle="Color of each dot">
          <div className="grid gap-1">
            {PRESSURE_BAND_THRESHOLDS.map((band) => (
              <LegendRow
                key={band.band}
                swatch={
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      background: markerColor(band.band),
                      boxShadow: `0 0 8px ${markerColor(band.band)}66`,
                    }}
                  />
                }
                label={band.label}
                meta={`index ≥ ${band.minIndex}`}
              />
            ))}
          </div>
        </AtlasSection>

        <AtlasSection title="Dot size" subtitle="How loud the area is" defaultOpen={false}>
          <div className="flex items-end gap-3 py-1">
            {[5, 9, 14].map((r, i) => (
              <div key={r} className="flex flex-col items-center gap-1">
                <span
                  className="rounded-full"
                  style={{
                    width: r * 2,
                    height: r * 2,
                    background: markerColor("high"),
                    opacity: 0.85,
                  }}
                />
                <span className="text-[0.55rem] uppercase tracking-wider text-slate-500">
                  {["small", "mid", "loud"][i]}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-1 text-[0.6rem] leading-snug text-slate-500">
            Bigger dot = higher activity. Stroke = trend direction.
          </p>
        </AtlasSection>

        <AtlasSection title="Confidence key" subtitle="Why some dots look different">
          <ConfidenceKey />
        </AtlasSection>

        {/* Coverage filter — controls which pin types render */}
        <AtlasSection title="Coverage" subtitle="What appears on the map">
          <div className="grid gap-1">
            <CoverageToggle
              label="Live official data"
              count={dataMix.live}
              active={showCoverage.live}
              onToggle={() => onShowCoverageChange({ ...showCoverage, live: !showCoverage.live })}
              swatch={<span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />}
            />
            <CoverageToggle
              label="Reviewed data gaps"
              count={dataMix.gaps}
              active={showCoverage.gaps}
              onToggle={() => onShowCoverageChange({ ...showCoverage, gaps: !showCoverage.gaps })}
              swatch={<span className="h-2.5 w-2.5 rounded-full border border-slate-400/80" />}
            />
            <CoverageToggle
              label="Household-survey estimates"
              count={dataMix.estimates}
              active={showCoverage.estimates}
              onToggle={() => onShowCoverageChange({ ...showCoverage, estimates: !showCoverage.estimates })}
              swatch={<span className="h-2.5 w-2.5 rounded-full bg-slate-400/60" />}
            />
          </div>
          <p className="mt-2 text-[0.6rem] leading-snug text-slate-500">
            Reviewed gaps are cities we audited and confirmed have no clean rodent dataset published yet.
          </p>
        </AtlasSection>

        {/* Filter / search */}
        <AtlasSection title={`Places (${totalShown})`} subtitle="Click any pin to open the city panel">
          <label className="mb-2 flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Filter list"
              className="w-full bg-transparent text-[0.7rem] text-slate-100 placeholder-slate-500 focus:outline-none"
            />
          </label>
          <div className="grid gap-px">
            {visibleVerified.map((place) => (
              <PlaceRow
                key={place.id}
                active={selectedVerifiedId === place.id}
                onClick={() => onSelectVerified(place)}
                swatch={
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: markerColor(place.activityBand) }}
                  />
                }
                label={place.shortName}
                meta={activityBandLabels[place.activityBand]}
              />
            ))}
            {visibleAhs.map((pin) => (
              <PlaceRow
                key={pin.id}
                active={selectedAhsId === pin.id}
                onClick={() => onSelectAhs(pin)}
                swatch={<span className="h-1.5 w-1.5 rounded-full bg-slate-400/70" />}
                label={pin.shortName}
                meta={`~${pin.rodentEvidencePercent}% survey`}
              />
            ))}
            {visibleGaps.map((gap) => (
              <PlaceRow
                key={gap.id}
                active={selectedGapId === gap.id}
                onClick={() => onSelectGap(gap)}
                swatch={
                  <span className="grid h-3 w-3 place-items-center rounded-full border border-slate-500/60 text-[0.5rem] font-bold text-slate-400">
                    ?
                  </span>
                }
                label={gap.shortName}
                meta="reviewed gap"
                muted
              />
            ))}
          </div>
        </AtlasSection>
      </div>

      {/* Footer — about the data */}
      <div className="border-t border-white/[0.06] bg-slate-950/95 px-4 py-3 text-[0.6rem] leading-snug text-slate-500">
        <div className="font-semibold uppercase tracking-[0.14em] text-slate-400">About the data</div>
        <p className="mt-1">
          Every pin is a real city dataset or a reviewed gap. Activity ≠ rat population — it's the public-data trail rodents leave.
        </p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          <Link to="/rodent-radar/attribution" className="text-slate-400 hover:text-slate-200">
            Sources
          </Link>
          <Link to="/rodent-radar/terms" className="text-slate-400 hover:text-slate-200">
            Terms
          </Link>
          <Link to="/rodent-radar" className="text-slate-400 hover:text-slate-200">
            ← Back to Rodent Radar
          </Link>
        </div>
      </div>
    </aside>
  );
}

function LegendRow({
  swatch,
  label,
  meta,
}: {
  swatch: ReactNode;
  label: string;
  meta: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {swatch}
      <span className="text-[0.7rem] font-medium text-slate-200">{label}</span>
      <span className="ml-auto text-[0.58rem] uppercase tracking-wider text-slate-500">{meta}</span>
    </div>
  );
}

function CoverageToggle({
  swatch,
  label,
  count,
  active,
  onToggle,
}: {
  swatch: ReactNode;
  label: string;
  count: number;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-2 rounded px-2 py-1.5 text-left transition ${
        active ? "bg-white/[0.04] text-slate-100" : "text-slate-500 hover:bg-white/[0.03]"
      }`}
      aria-pressed={active}
    >
      <span
        className={`grid h-3 w-3 shrink-0 place-items-center rounded-sm border ${
          active ? "border-cyan-300/70 bg-cyan-300/20" : "border-slate-600"
        }`}
      >
        {active ? <span className="h-1.5 w-1.5 rounded-sm bg-cyan-300" /> : null}
      </span>
      {swatch}
      <span className="flex-1 truncate text-[0.7rem] font-medium">{label}</span>
      <span className="text-[0.58rem] uppercase tracking-wider text-slate-500">{count}</span>
    </button>
  );
}

function PlaceRow({
  swatch,
  label,
  meta,
  active,
  muted,
  onClick,
}: {
  swatch: ReactNode;
  label: string;
  meta: string;
  active: boolean;
  muted?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-[0.7rem] transition ${
        active
          ? "bg-cyan-300/10 text-cyan-100"
          : muted
            ? "text-slate-500 hover:bg-white/[0.03]"
            : "text-slate-300 hover:bg-white/[0.04]"
      }`}
    >
      <span className="flex items-center gap-2 truncate">
        {swatch}
        <span className="truncate">{label}</span>
      </span>
      <span className="shrink-0 text-[0.58rem] uppercase tracking-wider text-slate-500">{meta}</span>
    </button>
  );
}
