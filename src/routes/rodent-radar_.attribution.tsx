import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { atlasDatasets, atlasSources } from "@/lib/rodentRadarAtlas";
import { canonicalLink } from "@/lib/seo";

const TITLE = "Rodent Radar Attribution & Data Rights";
const DESCRIPTION =
  "Source attribution, license context, and data-rights notes for the Rodent Radar activity atlas.";

const mapSources = [
  {
    source: "CARTO",
    data: "Dark Matter basemap tiles used in the atlas interface.",
    license: "CARTO attribution and terms apply.",
    url: "https://carto.com/attributions",
  },
  {
    source: "OpenStreetMap contributors",
    data: "Basemap reference data used through CARTO tiles.",
    license: "OpenStreetMap data is available under the Open Database License.",
    url: "https://www.openstreetmap.org/copyright",
  },
];

export const Route = createFileRoute("/rodent-radar_/attribution")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: canonicalLink("/rodent-radar/attribution"),
  }),
  component: AttributionPage,
});

function AttributionPage() {
  return (
    <main className="min-h-screen bg-[#05080d] px-5 py-14 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <Link to="/rodent-radar/rat-pressure-map" className="text-sm font-black text-cyan-200 hover:underline">
          Back to Rodent Radar
        </Link>
        <div className="mt-10">
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            <span className="text-cyan-300">Rodent Radar</span> Attribution
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-semibold leading-relaxed text-slate-400">
            Rodent Radar uses official public datasets, public-health guidance, and third-party map components. This page lists the source context for the atlas.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-black">Data Sources</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.16em] text-slate-400">
                <tr>
                  <th className="p-4">Source</th>
                  <th className="p-4">Data</th>
                  <th className="p-4">Use</th>
                </tr>
              </thead>
              <tbody>
                {atlasSources.map((source) => (
                  <tr key={source.id} className="border-t border-white/10 align-top">
                    <td className="p-4 font-bold">
                      <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-200 hover:underline">
                        {source.name} <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <div className="mt-1 text-xs font-semibold text-slate-500">{source.owner}</div>
                    </td>
                    <td className="p-4 text-slate-300">
                      {atlasDatasets.filter((dataset) => dataset.sourceId === source.id).map((dataset) => (
                        <div key={dataset.id}>
                          {dataset.name}: {dataset.filterNote}
                        </div>
                      ))}
                      {!atlasDatasets.some((dataset) => dataset.sourceId === source.id) ? "Public guidance or source review context." : null}
                    </td>
                    <td className="p-4 text-slate-400">{source.sourceType.replaceAll("-", " ")}</td>
                  </tr>
                ))}
                {mapSources.map((source) => (
                  <tr key={source.source} className="border-t border-white/10 align-top">
                    <td className="p-4 font-bold">
                      <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-200 hover:underline">
                        {source.source} <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </td>
                    <td className="p-4 text-slate-300">{source.data}</td>
                    <td className="p-4 text-slate-400">{source.license}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm leading-relaxed text-slate-300">
          <h2 className="text-xl font-black text-slate-100">Notes</h2>
          <p className="mt-3">
            Official Rodent Activity is based on public reporting and inspection signals. It is not an official rat population count. Colony Growth is a separate modeled layer and does not change official activity records.
          </p>
          <p className="mt-3">
            Third-party rights remain with their original owners or licensors. Preserve required attribution when reusing screenshots or outputs.
          </p>
        </section>
      </div>
    </main>
  );
}
