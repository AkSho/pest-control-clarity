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

const TITLE = "Western Pest Services vs. Cloakd: Adding Fertility Management to IPM | Cloakd";
const DESCRIPTION =
  "Western Pest Services runs an integrated pest management program across NJ and NYC. IPM treats the colony. Fertility management addresses the layer IPM doesn't reach. Here's how they fit together.";

export const Route = createFileRoute("/vs/western-pest-services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/vs/western-pest-services"),
  }),
  component: WesternVsPage,
});

const ROWS = [
  { label: "Treatment method", a: "IPM — exclusion, harborage elimination, targeted treatment with minimum pesticide use", b: "Evolve fertility management — gossypol-based bait that reduces reproductive output alongside existing IPM" },
  { label: "Expert backing", a: "Board Certified Entomologists", b: "SenesTech field data — 79% reduction in track presence over 5 months in urban building deployments" },
  { label: "Mechanism", a: "Removes active population via IPM protocol", b: "Reduces reproduction rate — replacement colony can't form at full size" },
  { label: "Replacement cycle", a: "Cleared at treatment, rebuilds 4–8 weeks later", b: "Replacement population forms at reduced rate — density declines continuously" },
  { label: "EPA status", a: "Licensed PMP program", b: "EPA 25(b) minimum risk — no special permits, safe for food environments" },
  { label: "Works with existing vendor", a: "Is your existing vendor", b: "Yes — Western handles the IPM foundation, Evolve adds fertility management on top" },
];

function WesternVsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="vs. Western Pest Services"
        headline="Western runs an IPM program across NJ and NYC. Here's the one layer integrated pest management doesn't include."
        lede="Western Pest Services — backed by Board Certified Entomologists and operating across NJ, NY, PA, DE, MD, and CT — runs one of the most technically rigorous standard pest management programs in the region. Their integrated pest management approach reduces pesticide use and addresses structural conditions. It doesn't reduce the fertility of the replacement colony that forms after each treatment. Fertility management is what addresses that layer."
        image={heroImg}
        ctaLabel="Shop the starter kit"
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What Western's IPM program covers"
            title="Decades of pest management. One biology problem standard IPM can't solve."
            intro={
              <>
                <p>
                  Western Pest Services' integrated pest management
                  approach uses the minimum necessary pesticide
                  intervention — relying on structural exclusion,
                  harborage elimination, and targeted treatment to reduce
                  rodent populations across NJ and NYC. Board Certified
                  Entomologists back the program. Technicians are
                  licensed and certified. For NJ operators under the NJ
                  Food Code (NJ Administrative Code 8:24), their
                  documentation satisfies municipal health department
                  requirements.
                </p>
                <p>
                  IPM reduces pesticide use by relying on the
                  environment working against the pest. The problem:
                  empty territory in a dense urban or suburban block is
                  itself an environmental signal. Norway rats from
                  surrounding harborage detect vacancy and move in. The
                  IPM approach removes what's there — it doesn't change
                  the fertility of what comes next.
                </p>
                <p>
                  Fertility management is a layer that IPM programs
                  haven't traditionally included because the product
                  category is relatively new. It doesn't replace the IPM
                  foundation — it adds the one mechanism that reduces
                  how fast the replacement population reaches detectable
                  density.
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
            title="Western Pest Services vs. Evolve fertility management."
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">&nbsp;</th>
                  <th className="px-5 py-4 font-extrabold">Western Pest Services</th>
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
            Western Pest Services is a registered trademark of its
            respective owner. Comparison is for informational purposes;
            Cloakd is not affiliated with or endorsed by Western Pest
            Services.
          </p>
        </div>
      </section>

      <FieldDataTrio
        intro="IPM foundation plus fertility management. A different 90-day outcome."
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
            title="Western handles the IPM foundation. Cloakd handles the replacement cycle."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">Western alone is sufficient if</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>You have a single active infestation with no recurring NJ or NYC violation history</li>
                <li>Your property responds well to standard IPM — no persistent replacement pressure</li>
                <li>You need licensed treatment and entomologist-backed compliance documentation</li>
                <li>Inspection timing has consistently been favorable post-treatment</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">Add Evolve if</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>You have recurring rodent violations in NJ or NYC despite consistent service</li>
                <li>The replacement cycle keeps resetting between scheduled IPM visits</li>
                <li>Your building has surrounding density pressure that drives fast replacement</li>
                <li>You want the replacement population to form slower between each IPM treatment</li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Related: <Link to="/vs/viking-pest-control" className="text-brand underline-offset-2 hover:underline">vs. Viking Pest Control</Link> ·{" "}
            <Link to="/vs/orkin" className="text-brand underline-offset-2 hover:underline">vs. Orkin</Link>
          </p>
        </div>
      </section>

      <ClosingCta
        title="Western stays. Evolve adds the fertility management layer on top."
        body="Evolve deploys on top of whatever knockdown program is already running. Add it after the colony clears and the replacement population has nowhere to build."
        primary={{ label: "Shop the starter kit", to: "/products/starter-kit" }}
        secondary={{ label: "How Evolve works", to: "/evolve-rodent-birth-control" }}
      />
    </>
  );
}
