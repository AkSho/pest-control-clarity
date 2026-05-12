import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/solutions-food-storage.jpg";
import {
  ClosingCta,
  FieldDataTrio,
  OtherSolutions,
  PhaseCards,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE = "Food Storage & Cold Chain — Cloakd Removals";
const DESCRIPTION =
  "Federal food safety law requires documented pest management. The 90-day program builds that record before an inspector shows up.";

export const Route = createFileRoute("/solutions/food-storage")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: FoodStoragePage,
});

const RISKS = [
  {
    t: "Federal food safety violation",
    b: "Federal law requires documented pest management programs for food storage. A rodent finding during an FDA inspection can trigger a written observation or Warning Letter.",
  },
  {
    t: "Product contamination recall",
    b: "Evidence of rat activity in a storage area requires quarantine and testing of potentially affected product. A confirmed contamination triggers recall procedures.",
  },
  {
    t: "Customer contract review",
    b: "Large retail and food service customers audit suppliers and require compliance documentation. A rodent citation or FDA action triggers contract review at the account level.",
  },
  {
    t: "Insulation and wiring damage",
    b: "Cold chain facilities face a structural risk that restaurants don't: rats gnaw through refrigeration insulation and electrical wiring, creating equipment failure and fire exposure.",
  },
];

const PRESSURE = [
  {
    t: "Year-round operation",
    b: "Food storage runs continuously. Consistent heat, waste, and product exposure makes the facility a permanent anchor for surrounding rat populations.",
  },
  {
    t: "Loading dock exposure",
    b: "Truck traffic means loading dock doors open and close dozens of times a day. Standard exclusion controls are harder to maintain with active dock operations.",
  },
  {
    t: "Multiple storage zones",
    b: "Facilities with dry storage, refrigerated areas, and freezer sections create different environments. Rat pressure concentrates around warm areas adjacent to cold zones — a pattern that's invisible without monitoring.",
  },
  {
    t: "Harder to detect early",
    b: "High racking density and limited visibility in warehouse storage means activity can go undetected longer than in a restaurant kitchen. By the time it's visible, the colony is already established.",
  },
];

function FoodStoragePage() {
  return (
    <>
      <SolutionHero
        eyebrow="Food Storage & Cold Chain"
        headline="The FDA doesn't schedule a second warning."
        highlight="Neither do your customers."
        lede="One contamination finding triggers multiple consequences at once — a federal violation on record, product quarantine, and customer audit. Federal food safety law requires documented pest management. The 90-day program builds that record before an inspector shows up."
        image={heroImg}
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What a contamination event actually costs"
            title="Food storage sits at the intersection of federal law and customer contracts. A rodent finding triggers both at once."
            intro={
              <p>
                Rodent activity in a food storage facility creates exposure
                at the federal, state, customer, and liability level
                simultaneously.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {RISKS.map((r) => (
              <div
                key={r.t}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-lg font-bold">{r.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {r.b}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            NJ food storage operators face equivalent exposure under state
            health code in addition to federal requirements. A municipal
            health department finding layers onto the federal record rather
            than replacing it.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Why food storage faces higher replacement pressure"
            title="The facility is a permanent, year-round food source for every rat in a three-block radius."
            intro={
              <>
                <p>
                  A restaurant attracts rats from within its block. A food
                  storage facility attracts them from across multiple blocks.
                  The density of stored product — dry goods, refrigerated
                  ingredients, packaged inventory — makes it one of the
                  highest-value rat territories in any urban area.
                </p>
                <p>
                  Treatment clears the current colony. The food source
                  doesn't change. The block pressure around a large food
                  storage facility is higher than around a single restaurant,
                  so the replacement timeline after treatment can be shorter.
                  The cycle a restaurant experiences over six to eight weeks
                  can compress further here.
                </p>
              </>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PRESSURE.map((p) => (
              <div
                key={p.t}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-lg font-bold">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="How it works for food storage"
            title="EPA minimum risk. Safe for active food environments."
            intro={
              <p>
                The same compliance requirements that make rodent management
                critical in food storage also govern what can be deployed
                there. Evolve is made from cottonseed and carries EPA
                minimum risk classification — cleared for use in and around
                food storage without special permits.
              </p>
            }
          />
          <PhaseCards
            phase1={{
              tag: "Your existing vendor",
              title: "Treatment and facility assessment",
              body: (
                <>
                  <p>
                    Your current exterminator handles immediate treatment
                    and generates the compliance documentation federal food
                    safety law requires. We coordinate with them to get a
                    documented baseline across the full facility before
                    Phase 2 starts.
                  </p>
                  <p>
                    Produces the FDA-required treatment records your
                    compliance program needs.
                  </p>
                </>
              ),
            }}
            phase2={{
              tag: "Cloakd — fertility management",
              title: "Stop the replacement at the facility perimeter",
              body: (
                <>
                  <p>
                    Evolve bait stations go in at loading dock perimeters,
                    utility entry points, exterior walls, interior travel
                    paths, and known activity areas. Rats that eat the bait
                    reproduce significantly less. The replacement colony
                    can't form at full size.
                  </p>
                  <p>
                    No secondary kill risk. No contamination pathway. Safe
                    for continuous deployment in active storage
                    environments.
                  </p>
                </>
              ),
            }}
          />
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The 90-day monitoring record — track counts per station, monthly
            comparisons against baseline, documented declining trend —
            becomes part of your pest management compliance documentation.
            It shows active, continuous, measured management rather than a
            reactive response to a finding.
          </p>
        </div>
      </section>

      <FieldDataTrio />

      <OtherSolutions current="food-storage" />

      <ClosingCta
        title="Build the compliance record before the inspection."
        body="Tell us about the facility — what you store, current pest control setup, and any open compliance items. We'll put together a program outline covering the full footprint."
      />
    </>
  );
}
