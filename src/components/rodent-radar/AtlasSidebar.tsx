// OGW-style left sidebar — a persistent legend and layer control surface.

import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { type UnavailableRatPressureGeo } from "@/lib/ratPressureMap";
import { HERO_CITIES, type AddressGroup } from "@/lib/rodent-radar/reports";
import { RECENCY_RAMP } from "@/lib/rodent-radar/encoding";
import { AtlasSection } from "./AtlasSection";

export type MetricKey = "reports" | "recent90" | "recurring" | "housing" | "index" | "trend12mo" | "absolute12mo";

interface AtlasSidebarProps {
  metric: MetricKey;
  onMetricChange: (m: MetricKey) => void;
  gaps: UnavailableRatPressureGeo[];
  query: string;
  onQueryChange: (q: string) => void;
  selectedGapId?: string;
  showCoverage: { live: boolean; gaps: boolean; estimates: boolean };
  onShowCoverageChange: (next: { live: boolean; gaps: boolean; estimates: boolean }) => void;
  onSelectGap: (gap: UnavailableRatPressureGeo) => void;
  onSelectVerifiedPlace: (placeId: string) => void;
  selectedPlaceId?: string;
  dataMix: { live: number; gaps: number; estimates: number };
  recurringGroups?: AddressGroup[];
  verifiedPlaceCounts?: Record<string, number>;
}

export function AtlasSidebar({
  gaps,
  query,
  onQueryChange,
  selectedGapId,
  showCoverage,
  onShowCoverageChange,
  onSelectGap,
  onSelectVerifiedPlace,
  selectedPlaceId,
  dataMix,
  recurringGroups = [],
  verifiedPlaceCounts = {},
}: AtlasSidebarProps) {
  return (
    <aside className="atlas-sidebar absolute left-0 top-0 z-40 hidden h-full w-[300px] flex-col border-r border-white/[0.06] bg-slate-950/90 text-slate-200 shadow-2xl shadow-black/40 backdrop-blur-xl md:flex">
      <AtlasSidebarBody
        gaps={gaps}
        query={query}
        onQueryChange={onQueryChange}
        selectedGapId={selectedGapId}
        showCoverage={showCoverage}
        onShowCoverageChange={onShowCoverageChange}
        onSelectGap={onSelectGap}
        onSelectVerifiedPlace={onSelectVerifiedPlace}
        selectedPlaceId={selectedPlaceId}
        dataMix={dataMix}
        recurringGroups={recurringGroups}
        verifiedPlaceCounts={verifiedPlaceCounts}
      />
    </aside>
  );
}

export function AtlasSidebarBody({
  gaps,
  query,
  onQueryChange,
  selectedGapId,
  showCoverage,
  onShowCoverageChange,
  onSelectGap,
  onSelectVerifiedPlace,
  selectedPlaceId,
  dataMix,
  recurringGroups = [],
  verifiedPlaceCounts = {},
}: Omit<AtlasSidebarProps, "metric" | "onMetricChange">) {
  const filterQ = query.trim().toLowerCase();
  const matchesQ = (text: string) => !filterQ || text.toLowerCase().includes(filterQ);
  const visibleGaps = showCoverage.gaps ? gaps.filter((c) => matchesQ(`${c.name} ${c.region}`)) : [];
  const visibleCities = HERO_CITIES.filter((city) => city.hasOfficialReports);

  return (
    <>

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
          Every dot is a real public report. Repeated activity nearby may show a pattern.
        </p>
        <p className="mt-1.5 text-[0.58rem] uppercase tracking-[0.14em] text-slate-500">
          {dataMix.live.toLocaleString()} reports · {visibleCities.length} verified places · {dataMix.gaps} reviewed gaps
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <AtlasSection title="Rodent Activity" subtitle="Official report records">
          <div className="grid gap-1">
            <LayerToggle
              label="Official reports"
              meta={`${dataMix.live.toLocaleString()} records`}
              active={showCoverage.live}
              onToggle={() => onShowCoverageChange({ ...showCoverage, live: !showCoverage.live })}
              swatch={<span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,.8)]" />}
            />
            <LayerToggle
              label="Reviewed data gaps"
              meta={`${dataMix.gaps} places`}
              active={showCoverage.gaps}
              onToggle={() => onShowCoverageChange({ ...showCoverage, gaps: !showCoverage.gaps })}
              swatch={<span className="h-2.5 w-2.5 rounded-full border border-slate-400/80" />}
            />
          </div>
        </AtlasSection>

        <AtlasSection title="Recency" subtitle="Color of each report dot">
          <div className="grid gap-1">
            <LegendRow swatch={<span className="h-2.5 w-2.5 rounded-full" style={{ background: RECENCY_RAMP.recent }} />} label="Last 30 days" meta="bright" />
            <LegendRow swatch={<span className="h-2.5 w-2.5 rounded-full" style={{ background: RECENCY_RAMP.warm }} />} label="31-180 days" meta="active" />
            <LegendRow swatch={<span className="h-2.5 w-2.5 rounded-full" style={{ background: RECENCY_RAMP.cool }} />} label="181 days-24 months" meta="older" />
            <LegendRow swatch={<span className="h-2.5 w-2.5 rounded-full" style={{ background: RECENCY_RAMP.ghost }} />} label="Older than 24 months" meta="hidden in V1" />
          </div>
        </AtlasSection>

        <AtlasSection title="Cluster size" subtitle="Real report count">
          <div className="flex items-end gap-3 py-1">
            {[8, 14, 22, 32].map((r, i) => (
              <div key={r} className="flex flex-col items-center gap-1">
                <span
                  className="rounded-full border border-cyan-200/80 bg-cyan-300/20"
                  style={{ width: r, height: r }}
                />
                <span className="text-[0.55rem] uppercase tracking-wider text-slate-500">
                  {["2", "10", "50", "200+"][i]}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-1 text-[0.6rem] leading-snug text-slate-500">
            Cluster bubbles scale from the number of official reports inside the area.
          </p>
        </AtlasSection>

        <AtlasSection title="Recurring activity" subtitle="Pattern signal, not proof">
          <div className="rounded-lg border border-cyan-300/15 bg-cyan-300/[0.04] p-3">
            <div className="text-lg font-semibold tabular-nums text-cyan-100">{recurringGroups.length}</div>
            <p className="mt-1 text-[0.65rem] leading-relaxed text-slate-400">
              Places with at least 3 reports across 6+ months. This can point to repeated activity, not a confirmed nest or population count.
            </p>
          </div>
        </AtlasSection>

        <AtlasSection title="Verified places" subtitle="Current deep snapshots">
          <div className="grid gap-px">
            {visibleCities.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => onSelectVerifiedPlace(city.id)}
                className={`flex items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-[0.7rem] transition ${
                  selectedPlaceId === city.id ? "bg-cyan-300/10 text-cyan-100" : "text-slate-300 hover:bg-white/[0.03] hover:text-slate-100"
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span className="truncate">{city.name}</span>
                </span>
                <span className="shrink-0 text-[0.58rem] uppercase tracking-wider text-slate-500">
                  {(verifiedPlaceCounts[city.id] ?? 0).toLocaleString()} reports
                </span>
              </button>
            ))}
          </div>
        </AtlasSection>

        <AtlasSection title={`Data gaps (${visibleGaps.length})`} subtitle="Reviewed but not mapped">
          <label className="mb-2 flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Filter gaps or places"
              className="w-full bg-transparent text-[0.7rem] text-slate-100 placeholder-slate-500 focus:outline-none"
            />
          </label>
          <div className="grid gap-px">
            {visibleGaps.map((gap) => (
              <button
                key={gap.id}
                type="button"
                onClick={() => onSelectGap(gap)}
                className={`flex items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-[0.7rem] transition ${
                  selectedGapId === gap.id ? "bg-cyan-300/10 text-cyan-100" : "text-slate-500 hover:bg-white/[0.03]"
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <span className="h-2.5 w-2.5 rounded-full border border-slate-500/70" />
                  <span className="truncate">{gap.shortName}</span>
                </span>
                <span className="shrink-0 text-[0.58rem] uppercase tracking-wider text-slate-500">gap</span>
              </button>
            ))}
          </div>
        </AtlasSection>
      </div>

      <div className="border-t border-white/[0.06] bg-slate-950/95 px-4 py-3 text-[0.6rem] leading-snug text-slate-500">
        <div className="font-semibold uppercase tracking-[0.14em] text-slate-400">About the data</div>
        <p className="mt-1">
          Official records show reported rodent activity. They are not a rat population count, and reporting behavior varies by city.
        </p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          <Link to="/rodent-radar/attribution" className="text-slate-400 hover:text-slate-200">Sources</Link>
          <Link to="/rodent-radar/terms" className="text-slate-400 hover:text-slate-200">Terms</Link>
          <Link to="/rodent-radar" className="text-slate-400 hover:text-slate-200">Back</Link>
        </div>
      </div>
    </>
  );
}


function LegendRow({ swatch, label, meta }: { swatch: ReactNode; label: string; meta: string }) {
  return (
    <div className="flex items-center gap-2">
      {swatch}
      <span className="text-[0.7rem] font-medium text-slate-200">{label}</span>
      <span className="ml-auto text-[0.58rem] uppercase tracking-wider text-slate-500">{meta}</span>
    </div>
  );
}

function LayerToggle({
  swatch,
  label,
  meta,
  active,
  onToggle,
}: {
  swatch: ReactNode;
  label: string;
  meta: string;
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
      <span className={`grid h-3 w-3 shrink-0 place-items-center rounded-sm border ${active ? "border-cyan-300/70 bg-cyan-300/20" : "border-slate-600"}`}>
        {active ? <span className="h-1.5 w-1.5 rounded-sm bg-cyan-300" /> : null}
      </span>
      {swatch}
      <span className="flex-1 truncate text-[0.7rem] font-medium">{label}</span>
      <span className="text-[0.58rem] uppercase tracking-wider text-slate-500">{meta}</span>
    </button>
  );
}
