import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/program-bryant-park.jpg";
import { canonicalLink } from "@/lib/seo";
import {
  ClosingCta,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";
// import { SplitFigure } from "@/components/site/SplitFigure";
import pcoOperator from "@/assets/inline/pco-operator-field.jpg";

const TITLE =
  "DIY Rat Birth Control: What You Need for It to Work | Cloakd";
const DESCRIPTION =
  "Evolve is available without a commercial applicator license. The bait is the same wherever you buy it — but four structural factors determine whether a self-managed deployment produces a measurable population decline.";

export const Route = createFileRoute("/vs/diy-rat-birth-control")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/vs/diy-rat-birth-control"),
  }),
  component: DiyComparePage,
});

const DIY_GAPS = [
  {
    title: "No Phase 1 knockdown",
    body: "Putting bait into an at-density active population doesn't reduce numbers — fertility suppression is designed to stop the replacement colony from forming after a knockdown clears the existing one.",
  },
  {
    title: "Ad-hoc placement",
    body: "Stations placed where you can reach them, not where rats actually travel. Without confirmed travel paths, consumption is inconsistent and the bait competes with everything else in the environment.",
  },
  {
    title: "No monitoring",
    body: "Without tracking plates and monthly counts, there's no way to confirm consumption is happening at effective levels — or to adjust placement when it isn't.",
  },
  {
    title: "Inconsistent replenishment",
    body: "The mechanism requires consistent consumption over weeks. Empty stations stop the program in place. A monthly maintenance cadence is the structural baseline.",
  },
];

function DiyComparePage() {
  return (
    <>
      <SolutionHero
        eyebrow="DIY rat birth control"
        headline="DIY Rat Birth Control: What You Need for It to Work"
        lede="Evolve is available without a commercial applicator license. The bait is the same wherever you buy it. Four structural factors — knockdown sequence, station placement, replenishment, and formula selection — determine whether your deployment produces a measurable population decline."
        image={heroImg}
        ctaLabel="Shop the starter kit"
      />

      {/* WHAT YOU CAN BUY RETAIL */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What you can buy retail"
            title="The bait is genuinely available to consumers."
            intro={
              <>
                <p>
                  <Link
                    to="/evolve-rodent-birth-control"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    Evolve
                  </Link>{" "}
                  is sold at Lowe's, Home Depot, Amazon, and through
                  Cloakd. Starter kits include bait stations and the
                  soft bait itself. The retail product is not a different
                  formulation — it's the same Evolve.
                </p>
                <p>
                  EPA 25(b) minimum risk classification means consumers can
                  buy and place it without a license, including in food
                  environments. No permit, no contractor required.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* WHAT CHANGES */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What to look for when buying"
            title="Same bait. Different structure around it."
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    &nbsp;
                  </th>
                  <th className="px-5 py-4 font-extrabold">Retail without guidance</th>
                  <th className="px-5 py-4 font-extrabold text-brand">
                    Cloakd starter kit
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "Formula selection",
                    a: "Rat and mouse formulas easy to confuse",
                    b: "Rat and mouse formulas clearly separated — pick the right one",
                  },
                  {
                    label: "Stations",
                    a: "Sold separately",
                    b: "Locking tamper-resistant stations included",
                  },
                  {
                    label: "Placement guidance",
                    a: "None",
                    b: "Deployment guide: travel paths, station spacing, replenishment schedule",
                  },
                  {
                    label: "Replenishment",
                    a: "Manual reorder when you remember",
                    b: "Replenishment plan — ships automatically every 60 or 90 days",
                  },
                  {
                    label: "Price (6 lb bait)",
                    a: "$99.99–$129.99 (SenesTech retail)",
                    b: "$179 starter kit / $149 refill",
                  },
                ].map((r) => (
                  <tr
                    key={r.label}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-5 py-4 align-top text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {r.label}
                    </td>
                    <td className="px-5 py-4 align-top text-muted-foreground">
                      {r.a}
                    </td>
                    <td className="px-5 py-4 align-top text-foreground">
                      {r.b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <SplitFigure imageSide="right"
            image={pcoOperator}
            alt="Professional pest control operator servicing an outdoor bait station"
            caption="Scheduled professional service — placement, dosing, and reporting."
          /> */}
        </div>
      </section>

      {/* WHERE DIY FAILS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What determines whether your deployment works"
            title="Four structural factors. Each one matters."
            intro={
              <p>
                The same gaps that broke the Bryant Park pilot — at city
                scale, with a different product — show up in scaled-down
                form in building deployments.{" "}
                <Link
                  to="/does-rat-birth-control-work"
                  className="text-brand underline-offset-2 hover:underline"
                >
                  Why Bryant Park failed →
                </Link>
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {DIY_GAPS.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-bold leading-tight">{g.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {g.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHEN DIY IS FINE */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Who the Cloakd kit is for"
            title="Match the kit to the pressure."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                Start with the starter kit if
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>
                  You don't have bait stations yet — the kit includes locking
                  tamper-resistant stations plus the bait.
                </li>
                <li>
                  You want the deployment guide for station placement and
                  replenishment schedule.
                </li>
                <li>
                  You're treating rat pressure — use Evolve Rat. Mouse pressure
                  — use Evolve Mouse. The kit is formula-specific.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                Order a refill if
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>
                  You already have bait stations in place.
                </li>
                <li>
                  You want to keep stations stocked on a 60 or 90-day
                  replenishment plan without manual reorders.
                </li>
                <li>
                  You're running both rat and mouse pressure — refills are
                  available for both formulas separately.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        title="The starter kit includes everything you need to deploy Evolve correctly."
        body="Locking bait stations, the right formula, and a deployment guide covering station placement, travel path identification, and replenishment schedule."
        primary={{ label: "Shop the starter kit", to: "/products/starter-kit" }}
        secondary={{
          label: "How Evolve works",
          to: "/evolve-rodent-birth-control",
        }}
      />
    </>
  );
}
