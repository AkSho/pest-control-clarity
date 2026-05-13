import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/program-bryant-park.jpg";
import {
  ClosingCta,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";
// import { SplitFigure } from "@/components/site/SplitFigure";
import pcoOperator from "@/assets/inline/pco-operator-field.jpg";

const TITLE =
  "DIY Rat Birth Control vs. a Managed Evolve Program: What Changes | Cloakd";
const DESCRIPTION =
  "Retail Evolve kits are sold at Lowe's, Home Depot, and Amazon. Same active product as a managed deployment — but the structure around it is what determines whether you get results. Here's the difference.";

export const Route = createFileRoute("/vs/diy-rat-birth-control")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
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
        eyebrow="DIY vs. managed program"
        headline="DIY Rat Birth Control vs. a Managed Evolve Program: What Actually Changes"
        lede="Retail Evolve kits exist. You can buy them. The active product is the same one used in managed deployments. The deployment structure around it is what determines whether the population actually shrinks."
        image={heroImg}
        ctaLabel="Start the program"
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
                  specialty pest-control retailers. Starter kits include
                  bait stations and refill blocks. The retail product is
                  not a different formulation — it's the same Evolve.
                </p>
                <p>
                  EPA 25(b) minimum risk classification means consumers can
                  buy and place it without a license, including in food
                  environments.
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
            eyebrow="What changes between DIY and managed"
            title="Same product. Different structure around it."
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    &nbsp;
                  </th>
                  <th className="px-5 py-4 font-extrabold">DIY retail kit</th>
                  <th className="px-5 py-4 font-extrabold text-brand">
                    Managed program
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "Phase 1 knockdown",
                    a: "Not included",
                    b: "Coordinated with your existing PCO",
                  },
                  {
                    label: "Station placement",
                    a: "Wherever you can reach",
                    b: "Confirmed travel paths and entry points",
                  },
                  {
                    label: "Replenishment",
                    a: "When you remember",
                    b: "Monthly site visit",
                  },
                  {
                    label: "Monitoring",
                    a: "Visual only",
                    b: "Track count plates against a Week 1 baseline",
                  },
                  {
                    label: "Documentation",
                    a: "None",
                    b: "Monthly written record for inspectors",
                  },
                  {
                    label: "Cost structure",
                    a: "Bait + your time",
                    b: "Managed monthly program",
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
            eyebrow="Where DIY tends to fail"
            title="Four structural gaps that determine whether the bait can do its job."
            intro={
              <p>
                The same gaps that broke the Bryant Park pilot — at city
                scale, with a different product — show up in scaled-down
                form in DIY building deployments.{" "}
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
            eyebrow="When DIY is fine — and when it isn't"
            title="Match the structure to the problem."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                DIY is fine for
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>
                  Single-family residential with low to moderate pressure.
                </li>
                <li>
                  Owner-occupied properties with no compliance documentation
                  requirement.
                </li>
                <li>
                  Sites where you can realistically maintain monthly
                  replenishment yourself.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                Managed makes sense for
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>
                  Restaurants, ghost kitchens, and other food-handling
                  operators.
                </li>
                <li>
                  Property managers and HOAs with multi-unit buildings.
                </li>
                <li>
                  Anyone with an open DOHMH or NJ rodent violation that
                  requires documented active management.
                </li>
                <li>
                  Sites where a recurring exterminator is already on
                  contract — managed fertility control runs alongside that.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        title="Get the structure that produces results."
        body="If your building needs documented active management or you can't reliably maintain monthly station upkeep yourself, the managed program is the deployment context that fits."
        primary={{ label: "Start the program", to: "/get-started" }}
        secondary={{
          label: "How Evolve works",
          to: "/evolve-rodent-birth-control",
        }}
      />
    </>
  );
}
