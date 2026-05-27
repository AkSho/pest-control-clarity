import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/solutions-ghost-kitchens.jpg";
import { canonicalLink } from "@/lib/seo";
import {
  ClosingCta,
  FieldDataTrio,
  OtherSolutions,
  PhaseCards,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE = "Ghost Kitchens & Shared Food Facilities — Cloakd Removals";
const DESCRIPTION =
  "24/7 prep, courier traffic, multiple brands: the highest rodent pressure environment on any block. The 90-day program keeps the building compliant.";

export const Route = createFileRoute("/solutions/ghost-kitchens")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/solutions/ghost-kitchens"),
  }),
  component: GhostKitchensPage,
});

const PRESSURE_REASONS = [
  {
    t: "24/7 food preparation",
    b: "Continuous operations mean persistent heat, smell, and food scraps around the clock. There's no overnight window that reduces the attractant.",
  },
  {
    t: "High delivery traffic",
    b: "Constant courier pickup means doors opening and closing throughout the day and night — more entry opportunities per hour than a standard restaurant.",
  },
  {
    t: "Older building stock",
    b: "Most ghost kitchen facilities operate in converted industrial or older commercial buildings. More structural gaps, more utility penetrations, more established rat travel paths.",
  },
  {
    t: "Multiple cuisine types",
    b: "Multiple brands running different menus creates a more varied food waste profile. A broader attractant than any single restaurant would generate on its own.",
  },
];

function GhostKitchensPage() {
  return (
    <>
      <SolutionHero
        eyebrow="Ghost Kitchens & Shared Food Facilities"
        headline="You run the facility."
        highlight="One DOHMH citation shuts down every brand inside it."
        lede="24/7 food prep, constant courier traffic, and multiple brands in an older building — this is the highest rodent pressure environment on any block. One inspection finding affects every operator. The 90-day program keeps the building compliant regardless of which brands are running inside."
        image={heroImg}
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Why shared facilities face higher pressure"
            title="Every brand shares the same inspection outcome."
            intro={
              <p>
                Ghost kitchens concentrate the conditions that attract rats
                and distribute the consequences of a citation across every
                operator at once. Individual brand diligence doesn't change
                that.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PRESSURE_REASONS.map((r) => (
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
            Under NYC DOHMH, a rodent violation at the facility address
            applies to the permitted space — not to any individual operator.
            A critical violation affects the building's inspection record
            and every brand using that address for their health department
            permit.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="The cycle problem in a ghost kitchen"
            title="The food never goes away. The vendor leaves. The rats come back."
            intro={
              <>
                <p>
                  A ghost kitchen facility is a permanent food source in an
                  urban block. Treatment removes the current colony. The
                  building's attractant profile doesn't change — and within
                  four to eight weeks, rats from the surrounding block detect
                  the open territory and move back in. The cycle resets every
                  treatment cycle.
                </p>
                <p>
                  For a shared facility, this timing problem is compounded.
                  The facility operator is responsible for compliance, but
                  the food source comes from every brand in the building.
                  Standard treatment manages the symptom one cycle at a time.
                </p>
              </>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                t: "No brand owns the building problem",
                b: "Individual operators focus on their own stations. Facility-wide rodent pressure doesn't belong to any one brand's exterminator.",
              },
              {
                t: "Brands cycle in and out",
                b: "Operator turnover means changing food profiles and inconsistent cleaning standards. The facility program has to be independent of who's operating inside.",
              },
              {
                t: "Doors keep moving",
                b: "Constant delivery pickup means entry points are harder to control than a restaurant that can lock up at night.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-bold">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="How it works for ghost kitchens"
            title="No existing vendor contract required."
            intro={
              <p>
                If the facility has an existing exterminator, Evolve deploys
                on top of their program. If not, arrange knockdown first —
                the fertility management layer goes in after a clean baseline
                is established, independent of which brands are operating.
              </p>
            }
          />
          <PhaseCards
            phase1={{
              tag: "Your existing exterminator",
              title: "Clear the facility baseline",
              body: (
                <>
                  <p>
                    Initial treatment covers the whole building — not just
                    individual operator stations. Your existing exterminator
                    handles this. Evolve deploys after a clean baseline is
                    established.
                  </p>
                  <p>
                    If there's no exterminator currently in place, arrange
                    one-time or contract treatment before deploying the kit.
                  </p>
                </>
              ),
            }}
            phase2={{
              tag: "Cloakd — facility fertility layer",
              title: "Stop the replacement from forming",
              body: (
                <>
                  <p>
                    Evolve bait stations go in throughout the facility —
                    utility corridors, loading areas, exterior perimeter,
                    back-of-house in each operator zone. Evolve is made from
                    cottonseed, EPA minimum risk, cleared for active
                    food-handling environments. Deployment continues
                    regardless of which brands are running.
                  </p>
                  <p>
                    No secondary kill risk. Safe for 24/7 occupied
                    facilities.
                  </p>
                </>
              ),
            }}
          />
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Evolve bait stations run continuously throughout the facility —
            independent of which brands are operating inside. EPA 25(b)
            minimum risk means no special permits for food-handling
            environments.
          </p>
        </div>
      </section>

      <FieldDataTrio />

      <OtherSolutions current="ghost-kitchens" />

      <ClosingCta
        title="The facility stays compliant. Whatever brands are in it."
        body="Evolve starter kits include locking bait stations and a deployment guide covering station placement throughout a facility. Refills ship on a replenishment plan so stations stay stocked."
      />
    </>
  );
}
