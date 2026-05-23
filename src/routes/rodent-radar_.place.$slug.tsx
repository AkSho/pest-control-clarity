import { createFileRoute, Link, notFound, retainSearchParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { ArrowLeft, Download, ExternalLink, Link as LinkIcon } from "lucide-react";
import { useMemo } from "react";
import {
  atlasDatasets,
  atlasSources,
  exposureGuidance,
  formatCount,
  getColonyGrowthProjection,
  getRatPressureResults,
  pressureMetricSnapshots,
  type PressureMetricSnapshot,
} from "@/lib/rodentRadarAtlas";
import { placeSearchSchema } from "@/lib/rodentRadarSearch";

const SITE_ORIGIN = "https://opengridworks.example"; // canonical origin placeholder; replaced by hosting domain in head meta
function buildCanonical(slug: string) {
  return `/rodent-radar/place/${slug}`;
}

export const Route = createFileRoute("/rodent-radar_/place/$slug")({
  validateSearch: zodValidator(placeSearchSchema),
  search: { middlewares: [retainSearchParams(["mode"])] },
  loader: ({ params }) => {
    const results = getRatPressureResults();
    const place = results.find((r) => r.id === params.slug);
    if (!place) throw notFound();
    const snapshots = pressureMetricSnapshots.filter((s) => s.placeId === place.id);
    return { place, snapshots };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Place not found — Rodent Radar" }] };
    const { place } = loaderData;
    const title = `${place.name} rat pressure — Rodent Radar`;
    const desc = `${formatCount(place.last12MonthsCount)} official rodent records in ${place.name} over the last 12 months. Source: ${place.sourceName}. Public data, citeable, updated ${place.snapshotDate}.`;
    const canonical = buildCanonical(place.id);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { rel: "canonical", href: canonical } as never,
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: `${place.name} rodent activity snapshot`,
            description: desc,
            url: canonical,
            keywords: ["rodent", "rat", "311", "public health", place.name, place.region],
            isAccessibleForFree: true,
            license: place.sourceUrl,
            creator: { "@type": "Organization", name: "Rodent Radar" },
            distribution: [
              { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${canonical}#csv` },
              { "@type": "DataDownload", encodingFormat: "text/html", contentUrl: place.sourceUrl },
            ],
            spatialCoverage: { "@type": "Place", name: place.name, geo: { "@type": "GeoCoordinates", latitude: place.lat, longitude: place.lng } },
            temporalCoverage: place.queryWindow,
            dateModified: place.snapshotDate,
          }),
        },
      ],
    };
  },
  component: PlacePage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-8">
      <div className="text-center">
        <p className="text-sm text-slate-400">Place not in the atlas yet.</p>
        <Link to="/rodent-radar/rat-pressure-map" className="mt-3 inline-block text-cyan-200 hover:underline">Back to the map →</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <p className="text-sm text-rose-300">Could not load this place.</p>
        <p className="mt-2 text-xs text-slate-500">{error.message}</p>
        <button onClick={() => reset()} className="mt-3 text-cyan-200 hover:underline">Retry</button>
      </div>
    </div>
  ),
});

function PlacePage() {
  const { place, snapshots } = Route.useLoaderData();
  const dataset = atlasDatasets.find((d) => d.id === place.sourceDatasetId);
  const source = atlasSources.find((s) => s.id === dataset?.sourceId);
  const colony = useMemo(() => getColonyGrowthProjection(place), [place]);

  const csvHref = useMemo(() => {
    const header = "snapshot_id,place,snapshot_date,query_window,source_filter,last_12_months,prev_12_months,recent_90_days,confidence,methodology,source_name,source_url\n";
    const rows = snapshots.map((s: PressureMetricSnapshot) => [
      s.id,
      place.name,
      s.snapshotDate,
      s.queryWindow,
      s.sourceFilter.replace(/"/g, "'"),
      s.last12MonthsCount,
      s.previous12MonthsCount,
      s.recent90DayCount,
      s.confidence,
      s.methodologyNote.replace(/"/g, "'"),
      source?.name ?? "",
      source?.url ?? "",
    ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    return `data:text/csv;charset=utf-8,${encodeURIComponent(header + rows)}`;
  }, [snapshots, place, source]);

  const citation = `Rodent Radar (${place.snapshotDate}). ${place.name} rodent activity snapshot. Source: ${place.sourceName}, ${place.sourceUrl}. Retrieved from ${buildCanonical(place.id)}.`;
  const trendSign = place.trendPercent > 0 ? "+" : "";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
        <Link
          to="/rodent-radar/rat-pressure-map"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-200"
        >
          <ArrowLeft className="h-3 w-3" /> Rodent Radar map
        </Link>

        {/* 1. Header */}
        <header className="mt-6 border-b border-white/10 pb-6">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">
            {place.region} · {place.geo}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{place.name}</h1>
          <p className="mt-2 text-xs text-slate-500">
            Snapshot {place.snapshotDate} · window {place.queryWindow}
          </p>
        </header>

        {/* 2. Headline numbers */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Metric label="Official records (12 mo)" value={formatCount(place.last12MonthsCount)} note={`band: ${place.activityBand}`} />
          <Metric label="Recent activity (90 d)" value={formatCount(place.recent90DayCount)} note={`${place.recentSharePercent}% of 12-mo total`} />
          <Metric
            label="Year-over-year change"
            value={`${trendSign}${place.trendPercent}%`}
            note={`vs ${formatCount(place.previous12MonthsCount)} prior`}
            tone={place.trendPercent > 0 ? "warn" : "ok"}
          />
        </section>

        {/* 3. Read the data */}
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">Read the data</h2>
          <div className="mt-3 overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-slate-400">
                <tr>
                  <th className="px-3 py-2 font-medium">Snapshot</th>
                  <th className="px-3 py-2 font-medium">12 mo</th>
                  <th className="px-3 py-2 font-medium">Prior 12 mo</th>
                  <th className="px-3 py-2 font-medium">90 d</th>
                  <th className="px-3 py-2 font-medium">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {snapshots.map((s: PressureMetricSnapshot) => (
                  <tr key={s.id} className="text-slate-200">
                    <td className="px-3 py-2 text-slate-400">{s.snapshotDate}</td>
                    <td className="px-3 py-2 tabular-nums">{formatCount(s.last12MonthsCount)}</td>
                    <td className="px-3 py-2 tabular-nums text-slate-400">{formatCount(s.previous12MonthsCount)}</td>
                    <td className="px-3 py-2 tabular-nums text-slate-400">{formatCount(s.recent90DayCount)}</td>
                    <td className="px-3 py-2">
                      <a href={source?.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-200 hover:underline">
                        {source?.name ?? "source"} <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {dataset ? (
            <p className="mt-3 text-[0.7rem] text-slate-500">
              Dataset filter: <span className="text-slate-400">{dataset.filterNote}</span> · Cadence: {dataset.updateCadence}
            </p>
          ) : null}
        </section>

        {/* 4. Cite this page */}
        <section className="mt-12" id="csv">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">Cite this page</h2>
          <pre className="mt-3 whitespace-pre-wrap break-words rounded-lg border border-white/10 bg-black/40 p-4 text-xs text-slate-200">{citation}</pre>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={csvHref}
              download={`rodent-radar-${place.id}-${place.snapshotDate}.csv`}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 text-xs text-slate-100 hover:bg-white/5"
            >
              <Download className="h-3 w-3" /> Download CSV
            </a>
            <a
              href={buildCanonical(place.id)}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 text-xs text-slate-100 hover:bg-white/5"
            >
              <LinkIcon className="h-3 w-3" /> Permalink
            </a>
          </div>
        </section>

        {/* 5. What this means on the ground */}
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">What this means on the ground</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Activity in {place.name} reads as a {colony.label} pattern: {colony.estimateRange}. Over the next 30 days, {colony.days30.toLowerCase()} Over 60 days, {colony.days60.toLowerCase()} Over 90 days, {colony.days90.toLowerCase()}
          </p>
          <p className="mt-3 text-[0.7rem] text-slate-500">{colony.disclaimer}</p>
        </section>

        {/* 6. Your exposure safety */}
        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">{exposureGuidance.name}</h2>
          <p className="mt-3 text-sm text-slate-400">{exposureGuidance.description}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            {exposureGuidance.guidance.map((line) => (
              <li key={line} className="flex gap-2"><span className="text-slate-600">·</span> {line}</li>
            ))}
          </ul>
          <p className="mt-3 text-[0.7rem] text-slate-500">{exposureGuidance.disclaimer}</p>
        </section>

        <footer className="mt-12 border-t border-white/10 pt-6 text-[0.7rem] text-slate-500">
          <Link to="/rodent-radar/attribution" className="hover:text-cyan-200 hover:underline">Attribution</Link>
          {" · "}
          <Link to="/rodent-radar/terms" className="hover:text-cyan-200 hover:underline">Terms</Link>
        </footer>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "ok" | "warn";
}) {
  const toneClass = tone === "warn" ? "text-amber-300" : tone === "ok" ? "text-emerald-300" : "text-slate-100";
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
      <p className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-semibold tabular-nums ${toneClass}`}>{value}</p>
      {note ? <p className="mt-1 text-[0.7rem] text-slate-500">{note}</p> : null}
    </div>
  );
}

// `SITE_ORIGIN` is reserved for future absolute-URL canonicalization in og:url.
void SITE_ORIGIN;
