import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-urban.jpg";
import { canonicalLink } from "@/lib/seo";
import {
  ClosingCta,
  FieldDataTrio,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";
// import { SplitFigure } from "@/components/site/SplitFigure";
import operatorStation from "@/assets/inline/operator-contrapest-station.jpg";

const TITLE = "Orkin vs. Cloakd: Adding the Fertility Layer to Standard Treatment | Cloakd";
const DESCRIPTION =
  "Orkin's commercial rodent program clears the active colony. The replacement population that fills the territory weeks later is a separate problem. Here's what the fertility management layer adds on top.";

export const Route = createFileRoute("/vs/orkin")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/vs/orkin"),
  }),
  component: OrkinVsPage,
});

const ROWS = [
  { label: "Treatment method", a: "Licensed knockdown, exclusion, scheduled visits", b: "Evolve fertility management on top of existing treatment — reduces replacement colony formation" },
  { label: "Mechanism", a: "Removes active population", b: "Reduces reproduction rate — replacement colony can't form at full size" },
  { label: "Replacement cycle", a: "Cleared at treatment, rebuilds 4–8 weeks later", b: "Replacement population forms at reduced rate — density declines between visits" },
  { label: "EPA status", a: "Licensed pesticide", b: "EPA 25(b) minimum risk — no special permits, safe for food environments" },
  { label: "Secondary kill risk", a: "Depends on product used", b: "None" },
  { label: "Works with existing vendor", a: "Is your existing vendor", b: "Yes — your exterminator handles knockdown, Evolve adds fertility management on top" },
];

function OrkinVsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="vs. Orkin"
        headline="Orkin's commercial program clears the active colony. The replacement that follows is a different problem."
        lede="Orkin is one of the longest-operating commercial rodent control providers in the country. Their program — licensed treatment, entry point sealing, preventive protocol — removes what's present. It doesn't change how fast the replacement population forms after the colony is gone. That's not a failure of execution. It's a structural limitation of what standard pest control is designed to address."
        image={heroImg}
        ctaLabel="Shop the starter kit"
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What standard commercial treatment covers"
            title="A century of commercial rodent control. Still bounded by the same biology."
            intro={
              <>
                <p>
                  Standard commercial programs for foodservice — Orkin
                  included — are built around licensed pest management
                  treatment, DOHMH documentation, sealing gaps down to a
                  quarter-inch for rats and dime-sized for mice, and a
                  scheduled treatment program. For restaurants with
                  active infestations, that handles the immediate
                  problem correctly.
                </p>
                <p>
                  The cycle that keeps the problem recurring is not
                  about how the treatment is executed. Norway rats in
                  NYC detect empty territory within days of a colony
                  being removed. A new group moves in along the same
                  travel paths, exploits the same entry points, and
                  establishes harborage in the same locations. Treatment
                  happens again. The cycle resets.
                </p>
                <p>
                  For NYC restaurant operators with recurring DOHMH
                  citation history, passing one inspection doesn't
                  change the timing risk for the next unannounced visit.
                  What changes that risk is slowing how fast the
                  replacement population builds.
                </p>
              </>
            }
          />
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Side-by-side comparison"
            title="Orkin's commercial program vs. Evolve fertility management."
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">&nbsp;</th>
                  <th className="px-5 py-4 font-extrabold">Orkin (existing vendor)</th>
                  <th className="px-5 py-4 font-extrabold text-brand">Cloakd (added layer)</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 align-top text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{r.label}</td>
                    <td className="px-5 py-4 align-top text-muted-foreground">{r.a}</td>
                    <td className="px-5 py-4 align-top text-foreground">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <SplitFigure imageSide="right"
            image={operatorStation}
            alt="Cloakd operator servicing an Evolve block inside an existing pest-control station"
            caption="Cloakd deploys as an additive layer inside your existing vendor's program."
          /> */}
          <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
            Orkin is a registered trademark of its respective owner.
            Comparison is for informational purposes; Cloakd is not
            affiliated with or endorsed by Orkin.
          </p>
        </div>
      </section>

      <FieldDataTrio
        intro="What the fertility management layer produces alongside an existing licensed treatment program."
        footnote={
          <>
            Source:{" "}
            <a className="underline underline-offset-2 hover:text-brand" href="https://www.prnewswire.com/news-releases/senestech-reports-significant-reductions-in-rodent-activity-following-evolve-deployments-in-urban-field-studies-302691116.html" target="_blank" rel="noreferrer">
              SenesTech, Inc. — February 18, 2026
            </a>
          </>
        }
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="How to think about it"
            title="Your existing vendor handles the treatment. Cloakd handles the replacement cycle."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">Standard treatment alone is sufficient if</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>You have a single active infestation with no recurring citation history</li>
                <li>Your DOHMH inspection timing has been consistently favorable post-treatment</li>
                <li>You need immediate licensed treatment and service documentation</li>
                <li>Your building doesn't have the density pressure that drives fast replacement</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">Add Evolve if</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>You've been cited for 04K or 04L more than once in 24 months</li>
                <li>The replacement cycle keeps resetting between scheduled treatment visits</li>
                <li>Your inspection risk is tied to treatment timing — the window problem</li>
                <li>You want the replacement population to form slower between each knockdown</li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            More: <Link to="/vs/traditional-pest-control" className="text-brand underline-offset-2 hover:underline">vs. traditional pest control</Link> ·{" "}
            <Link to="/vs/assured-environments" className="text-brand underline-offset-2 hover:underline">vs. Assured Environments</Link> ·{" "}
            <Link to="/vs/bell-environmental" className="text-brand underline-offset-2 hover:underline">vs. Bell Environmental</Link>
          </p>
        </div>
      </section>

      <ClosingCta
        title="Keep your vendor. Add the layer that addresses the replacement cycle."
        body="Evolve deploys on top of whatever knockdown program is already running. Add it after the colony clears and the replacement population has nowhere to build."
        primary={{ label: "Shop the starter kit", to: "/products/starter-kit" }}
        secondary={{ label: "How Evolve works", to: "/evolve-rodent-birth-control" }}
      />
    </>
  );
}
