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

const TITLE = "Viking Pest Control vs. Cloakd: The Fertility Layer for NJ Properties | Cloakd";
const DESCRIPTION =
  "Viking Pest Control monitors and treats NJ rodent activity. Monitoring shows what's there. Fertility management reduces how much comes back. Here's how the two layers fit together.";

export const Route = createFileRoute("/vs/viking-pest-control")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: VikingVsPage,
});

const ROWS = [
  { label: "Treatment method", a: "Licensed treatment + digital monitoring technology", b: "Evolve fertility management — gossypol-based soft bait that reduces reproductive output" },
  { label: "Monitoring", a: "Digital sensors transmitting activity data continuously", b: "Monthly track count plates — documented declining trend specific to 90-day compliance record" },
  { label: "Replacement cycle", a: "Cleared at treatment, rebuilds 4–8 weeks later", b: "Replacement population forms at reduced rate — density declines between visits" },
  { label: "NJ compliance record", a: "Licensed PMP documentation for NJ health department inspections", b: "Written monthly monitoring reports — 90-day trend line for municipal health officer" },
  { label: "Re-inspection risk", a: "Dependent on timing of next NJ health inspection vs. last treatment", b: "Reduced — documented declining population, not cycling" },
  { label: "Works with existing vendor", a: "Is your existing NJ vendor", b: "Yes — your vendor handles Phase 1, Cloakd adds the fertility layer" },
];

function VikingVsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="vs. Viking Pest Control"
        headline="Viking monitors NJ rodent activity around the clock. Here's the layer that reduces how fast it comes back."
        lede="Viking Pest Control is one of the dominant commercial pest operators in New Jersey — state-certified licensed pest management professionals and digital monitoring technology that tracks rodent activity year-round. Their program is well-executed. It doesn't reduce the fertility of the replacement colony that forms after each treatment cycle. That's what the fertility management layer addresses."
        image={heroImg}
        ctaLabel="Start the program"
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What Viking's program covers"
            title="Digital monitoring tracks the population. It doesn't change how fast it rebuilds."
            intro={
              <>
                <p>
                  Viking's monitoring uses digital sensors that track
                  rodent activity continuously — transmitting data
                  year-round to flag population presence and density.
                  Combined with state-certified licensed pest management
                  professionals and flexible scheduling, it's one of the
                  most technologically advanced standard rodent control
                  programs operating in NJ.
                </p>
                <p>
                  Digital monitoring tracks what's there. Treatment
                  removes it. Neither changes the underlying biology:
                  Norway rats in NJ commercial and residential areas
                  detect empty territory within days of a colony being
                  cleared. The food source remains, the harborage points
                  remain, and the replacement population moves in on the
                  same timeline regardless of how accurately the
                  previous population was monitored.
                </p>
                <p>
                  For NJ restaurant operators under the NJ Food Code (NJ
                  Administrative Code 8:24), the compliance risk is the
                  same: a municipal health department inspector who
                  arrives during week six after a treatment cycle will
                  find active signs. Reducing how fast the replacement
                  colony reaches detectable density is what changes that
                  outcome.
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
            title="Viking Pest Control vs. Cloakd 90-day program."
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">&nbsp;</th>
                  <th className="px-5 py-4 font-extrabold">Viking Pest Control</th>
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
            Viking Pest Control is a registered trademark of its
            respective owner. Comparison is for informational purposes;
            Cloakd is not affiliated with or endorsed by Viking Pest
            Control.
          </p>
        </div>
      </section>

      <FieldDataTrio
        intro="Monitoring shows what's there. Fertility management reduces how much comes back."
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
            title="Viking tracks and treats. Cloakd reduces what keeps rebuilding."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">Viking alone is sufficient if</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>You have a single active infestation with no recurring NJ violation history</li>
                <li>Your NJ municipal health inspection timing has been consistently favorable</li>
                <li>You need licensed treatment and digital monitoring documentation</li>
                <li>Your property doesn't have the surrounding density pressure driving fast replacement</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">Add Cloakd if</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>You've had recurring NJ rodent violations despite consistent service</li>
                <li>You need a documented 90-day trend line for a NJ municipal health re-inspection</li>
                <li>The replacement cycle keeps resetting between treatment visits</li>
                <li>Your NJ health officer wants evidence of population decline, not just treatment records</li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Related: <Link to="/vs/western-pest-services" className="text-brand underline-offset-2 hover:underline">vs. Western Pest Services</Link> ·{" "}
            <Link to="/nj-rodent-violation" className="text-brand underline-offset-2 hover:underline">NJ rodent violation</Link>
          </p>
        </div>
      </section>

      <ClosingCta
        title="Viking stays. The fertility layer goes on top."
        body="Tell us about your NJ property and what the recurring problem looks like. We'll outline what the 90-day program adds on top of your current service."
        primary={{ label: "Start the program", to: "/get-started" }}
        secondary={{ label: "How Evolve works", to: "/evolve-rodent-birth-control" }}
      />
    </>
  );
}
