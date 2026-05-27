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

const TITLE = "Bell Environmental vs. Cloakd: Adding Fertility Management on Top | Cloakd";
const DESCRIPTION =
  "Bell Environmental's perimeter and mechanical trapping program eliminates the active population. The replacement cycle that follows is outside what mechanical programs address. Here's the layer Cloakd adds.";

export const Route = createFileRoute("/vs/bell-environmental")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/vs/bell-environmental"),
  }),
  component: BellVsPage,
});

const ROWS = [
  { label: "Treatment method", a: "Perimeter defense + internal mechanical trapping", b: "Evolve fertility management bait stations — reduces replacement colony formation" },
  { label: "Mechanism", a: "Removes active population", b: "Reduces reproduction rate — replacement colony can't form at full size" },
  { label: "Replacement cycle", a: "Cleared by trapping, rebuilds 4–8 weeks later", b: "Replacement population forms at reduced rate — density declines continuously" },
  { label: "EPA status", a: "Licensed program", b: "EPA 25(b) minimum risk — no special permits, safe for food environments" },
  { label: "Secondary kill risk", a: "Depends on method used", b: "None" },
  { label: "Works with existing vendor", a: "Is your existing vendor", b: "Yes — Bell Environmental stays, Evolve adds fertility management on top" },
];

function BellVsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="vs. Bell Environmental"
        headline="Bell Environmental's program removes the active population. Here's the layer that addresses what comes back."
        lede="Bell Environmental has served NYC metro commercial clients for decades. Their multilayer program — perimeter protection plus internal mechanical trapping — is a sound approach to eliminating active rodent populations. The replacement cycle that refills empty territory after elimination is outside what any mechanical trapping program addresses. That's the gap fertility management closes."
        image={heroImg}
        ctaLabel="Shop the starter kit"
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What Bell Environmental's program covers"
            title="Long-running NYC commercial pest control. Same biological limitation as every standard program."
            intro={
              <>
                <p>
                  Bell Environmental's perimeter system covers the
                  exterior of a commercial building — outside protection
                  combined with internal mechanical trapping to eliminate
                  Norway rats and mice across the five NYC boroughs and
                  NJ. Their licensed pest management professionals serve
                  restaurants, hotels, hospitals, and commercial
                  properties across the metro.
                </p>
                <p>
                  The issue isn't the program — it's what happens after
                  the population is removed. Mechanical trapping reduces
                  the active colony. It doesn't reduce the fertility of
                  the replacement population moving in from surrounding
                  harborage once the territory goes empty. Four to eight
                  weeks after a successful elimination, the same travel
                  paths, the same entry points, the same food sources
                  produce the same infestation.
                </p>
                <p>
                  For NYC restaurant operators on a recurring DOHMH
                  inspection cycle, that replacement timeline is the
                  exposure. Fertility management doesn't replace Bell's
                  mechanical program — it addresses the one variable
                  that program isn't designed to reach.
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
            title="Bell Environmental vs. Evolve fertility management."
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">&nbsp;</th>
                  <th className="px-5 py-4 font-extrabold">Bell Environmental</th>
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
            Bell Environmental is a registered trademark of its
            respective owner. Comparison is for informational purposes;
            Cloakd is not affiliated with or endorsed by Bell
            Environmental.
          </p>
        </div>
      </section>

      <FieldDataTrio
        intro="Mechanical elimination plus fertility management. Different trajectory."
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
            title="Bell handles elimination. Cloakd handles what comes after."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">Bell Environmental alone is sufficient if</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>You have a one-time infestation with no recurring citation history</li>
                <li>Your building doesn't have the surrounding density pressure driving fast replacement</li>
                <li>You need immediate elimination and licensed compliance documentation</li>
                <li>DOHMH inspection timing has consistently been favorable post-treatment</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">Add Evolve if</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>You've had repeat 04K or 04L citations despite consistent service</li>
                <li>The replacement cycle keeps resetting between scheduled visits</li>
                <li>Your building has surrounding density pressure that drives fast replacement</li>
                <li>You want the replacement population to form slower between each elimination</li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Related: <Link to="/vs/orkin" className="text-brand underline-offset-2 hover:underline">vs. Orkin</Link> ·{" "}
            <Link to="/vs/assured-environments" className="text-brand underline-offset-2 hover:underline">vs. Assured Environments</Link> ·{" "}
            <Link to="/vs/snap-traps" className="text-brand underline-offset-2 hover:underline">vs. snap traps</Link>
          </p>
        </div>
      </section>

      <ClosingCta
        title="Bell Environmental handles elimination. Evolve handles what comes back."
        body="Evolve deploys on top of whatever knockdown program is already running. Add it after the colony clears and the replacement population has nowhere to build."
        primary={{ label: "Shop the starter kit", to: "/products/starter-kit" }}
        secondary={{ label: "How Evolve works", to: "/evolve-rodent-birth-control" }}
      />
    </>
  );
}
