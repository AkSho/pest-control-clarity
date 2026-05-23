import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Rodent Radar Terms of Use";
const DESCRIPTION = "Terms, disclaimers, and permitted-use notes for the Rodent Radar atlas.";

export const Route = createFileRoute("/rodent-radar_/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="min-h-screen bg-[#05080d] px-5 py-14 text-slate-100">
      <article className="mx-auto max-w-3xl">
        <Link to="/rodent-radar/rat-pressure-map" className="text-sm font-black text-cyan-200 hover:underline">
          Back to Rodent Radar
        </Link>
        <h1 className="mt-10 text-4xl font-black tracking-tight md:text-6xl">Terms of Use</h1>
        <p className="mt-4 text-sm font-semibold text-slate-500">Effective date: May 22, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-300">
          <section>
            <h2 className="text-xl font-black text-slate-100">1. What This Is</h2>
            <p className="mt-3">
              Rodent Radar provides interactive maps and visualizations of official public rodent reports, inspection records, modeled colony context, public-health guidance, and civic data gaps for informational, educational, and journalistic use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-100">2. Not Advice</h2>
            <p className="mt-3">
              Rodent Radar is not medical, legal, public-health, engineering, pest-control, or government advice. Do not make health, safety, operational, or property decisions based only on the atlas. Verify information with authoritative sources and qualified professionals.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-100">3. Data Accuracy</h2>
            <p className="mt-3">
              Data may be incomplete, delayed, revised, filtered differently by source agencies, or unavailable. Official Rodent Activity reflects public reports or inspection records where available. It is not a rat population count.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-100">4. Modeled Layers</h2>
            <p className="mt-3">
              Colony Growth and condition layers are explanatory models or context layers. They are separate from official public datasets and should not be treated as official findings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-100">5. Third-Party Sources</h2>
            <p className="mt-3">
              The atlas includes third-party data, public datasets, government works, and map components that may be subject to their own licenses and attribution requirements. See the attribution page for source details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-100">6. Permitted Use</h2>
            <p className="mt-3">
              You may use the atlas for personal, educational, journalistic, and internal research purposes. Do not misrepresent the data as an official rat census or disease-risk prediction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-100">7. Contact</h2>
            <p className="mt-3">
              For questions about Rodent Radar, contact Cloakd Removals through the main site.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
