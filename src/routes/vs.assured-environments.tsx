import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-urban.jpg";
import {
  ClosingCta,
  FieldDataTrio,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";
import { InlineFigure } from "@/components/site/InlineFigure";
import operatorStation from "@/assets/inline/operator-contrapest-station.jpg";

const TITLE = "Assured Environments vs. Cloakd: The Layer Added On Top | Cloakd";
const DESCRIPTION =
  "Assured Environments runs a long-standing commercial pest program in NYC. The replacement cycle that fills empty territory weeks after treatment is a biology problem standard programs aren't designed to solve. That's the layer Cloakd adds.";

export const Route = createFileRoute("/vs/assured-environments")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: AssuredVsPage,
});

const ROWS = [
  { label: "Treatment method", a: "Exclusion, sanitation, licensed knockdown", b: "Fertility management via Evolve bait stations — runs on top of your existing program" },
  { label: "Monitoring", a: "Service reports per scheduled visit", b: "Monthly track count plates at every station — documented declining trend over 90 days" },
  { label: "Replacement cycle", a: "Cleared at treatment, rebuilds 4–8 weeks later", b: "Reduces how fast the replacement colony forms — population declines between treatment visits" },
  { label: "DOHMH compliance record", a: "Licensed PMP service documentation", b: "Written monitoring report every 30 days — 90-day trend line to hand an inspector" },
  { label: "Re-inspection risk", a: "Dependent on inspection timing relative to treatment", b: "Reduced — population density declining continuously, not cycling" },
  { label: "Works with existing vendor", a: "Is your existing vendor", b: "Yes — Cloakd adds a layer on top of your current contract" },
];

function AssuredVsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="vs. Assured Environments"
        headline="Assured Environments runs a long-standing NYC pest program. Here's the one variable it isn't designed to address."
        lede="Assured Environments is one of the largest commercial pest control providers in New York. Their program — exclusion, sanitation, licensed treatment — is executed correctly. The replacement cycle that fills empty territory four to eight weeks after treatment is a biology problem that standard pest control is not designed to solve. That's what the fertility management layer addresses."
        image={heroImg}
        ctaLabel="Start the program"
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What standard treatment covers"
            title="Exclusion, sanitation, and knockdown — done correctly. Still not enough to stop the cycle."
            intro={
              <>
                <p>
                  The standard approach — exclusion to block entry
                  points, sanitation assessment, licensed treatment to
                  remove the active colony — is the correct foundation
                  for any rodent management program. Decades of
                  commercial NYC experience and a sizeable field team
                  produce execution that's as good as it gets.
                </p>
                <p>
                  The problem isn't execution. It's what happens after
                  the colony is removed. Empty territory in a dense
                  urban block is detected by surrounding Norway rats
                  within days. Four to eight weeks later, a new group
                  has moved in and established harborage. The food
                  source hasn't changed. The next treatment cycle
                  starts.
                </p>
                <p>
                  Standard pest control — regardless of how well it's
                  done — has no mechanism to slow down how fast the
                  replacement population forms. That's what fertility
                  management adds.
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
            title="Assured Environments vs. Cloakd 90-day program."
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">&nbsp;</th>
                  <th className="px-5 py-4 font-extrabold">Assured Environments</th>
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
          <InlineFigure
            src={operatorStation}
            alt="Cloakd operator servicing an Evolve block inside an existing pest-control station"
            caption="Cloakd deploys as an additive layer inside your existing vendor's program."
          />
          <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
            Assured Environments is a registered trademark of its
            respective owner. Comparison is for informational purposes;
            Cloakd is not affiliated with or endorsed by Assured
            Environments.
          </p>
        </div>
      </section>

      <FieldDataTrio
        intro="Same knockdown foundation. Different outcome over 90 days."
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
            title="These are not competing programs. They solve different parts of the same problem."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">Keep Assured Environments if</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>You need licensed PMP compliance documentation for DOHMH</li>
                <li>You have an active infestation requiring immediate knockdown</li>
                <li>Your lease or property management requires a named pest control contractor</li>
                <li>You need exclusion and structural work assessed by an experienced team</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">Add Cloakd on top if</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>You have a recurring violation despite consistent treatment — the cycle keeps resetting</li>
                <li>You need a documented 90-day declining trend to show a DOHMH inspector</li>
                <li>You've been cited for 04K or 04L and need more than a service receipt for re-inspection</li>
                <li>Your current program handles the colony but not the replacement population</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        title="Your current exterminator stays. The fertility layer goes on top."
        body="Tell us who handles your current pest control and what the recurring problem looks like. We'll outline what the 90-day program adds and what the monitoring record will document."
        primary={{ label: "Start the program", to: "/get-started" }}
        secondary={{ label: "DOHMH violations", to: "/dohmh-rodent-violation-nyc" }}
      />
    </>
  );
}
