import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/solutions-restaurants.jpg";
import { canonicalLink } from "@/lib/seo";
import {
  ClosingCta,
  FieldDataTrio,
  OtherSolutions,
  PhaseCards,
  SectionHeader,
  SolutionHero,
  StatCard,
  TimelineStrip,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE = "Restaurants & Food Service — Cloakd Removals";
const DESCRIPTION =
  "One rat sighting is a critical DOHMH rodent violation. The 90-day fertility-control program closes the timing window standard pest control leaves open.";

export const Route = createFileRoute("/solutions/restaurants")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/solutions/restaurants"),
  }),
  component: RestaurantsPage,
});

const TIMELINE = [
  {
    title: "Week 1–2",
    body: "Treatment complete. Active population removed. Clean kitchen.",
  },
  {
    title: "Week 3–4",
    body: "Territory sits empty. Surrounding colonies detect vacancy.",
  },
  {
    title: "Week 5–6",
    body: "New group moves in. Population rebuilding at full fertility.",
  },
  {
    title: "Week 7–8",
    body: "New colony established. Back to the same baseline.",
  },
  {
    title: "Week 9+",
    body: "Next treatment visit. Cycle resets. Same problem, same cost.",
  },
];

function RestaurantsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="Restaurants & Food Service"
        headline="Paid for pest control last month."
        highlight="Whether your NYC restaurant passes the next inspection depends on the timing."
        lede="One rat sighting is a critical DOHMH rodent violation — 5 points minimum, up to $2,000 in fines, and a B in your window. If that visit falls in week six after your last treatment, the new colony is already rebuilding. The 90-day program closes that window."
        image={heroImg}
      />

      {/* COST GRID */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What a violation actually costs"
            title="One sighting. One inspection. The math gets bad fast."
            intro={
              <p>
                NYC DOHMH conducts unannounced inspections. Each inspection
                produces a score that determines your restaurant's letter
                grade. You do not get to prepare for the visit. You either
                have the problem under control or you don't.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              value="5+ pts"
              label="minimum per rodent violation"
              sub="Codes 04K (rats) and 04L (mice) are critical violations under NYC DOHMH"
            />
            <StatCard
              value="14 pts"
              label="is all it takes for a B grade"
              sub="One rodent violation combined with any other critical puts a Grade Pending or B in your window"
            />
            <StatCard
              value="$2,000"
              label="max fine per rodent violation"
              sub="NYC rodent violations carry fines from $300 to $2,000 per citation"
            />
            <StatCard
              value="$50K"
              label="lost revenue from one closure"
              sub="A temporary closure in NYC costs $15,000 to $50,000 in lost revenue"
            />
          </div>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            NJ restaurants face equivalent exposure under state health code.
            The inspection system differs from NYC's letter grading, but the
            financial consequences of a rodent citation — remediation costs,
            reinspection fees, public record, and reputational damage — are
            comparable.
          </p>
        </div>
      </section>

      {/* THE REAL PROBLEM */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="The real problem"
            title="Your exterminator treats what's there. The problem is what moves in after they leave."
            intro={
              <>
                <p>
                  Standard treatment removes the colony that's present. The
                  kitchen goes clean. The vendor leaves. Within 4 to 8 weeks,
                  surrounding rats detect the empty territory and a new group
                  moves in. The food source hasn't changed. The entry points
                  haven't changed. The cycle resets before your next scheduled
                  visit.
                </p>
                <p>
                  For a restaurant, this means every inspection is a timing
                  game. If the health inspector arrives in week two after a
                  treatment, you're fine. Week six, you're exposed. There's
                  no version of standard pest control that removes that
                  variable.
                </p>
              </>
            }
          />
          <TimelineStrip steps={TIMELINE} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="How it works for restaurants"
            title="Two layers. Your existing vendor stays in place."
            intro={
              <p>
                Your existing pest control handles knockdown. Evolve adds
                fertility management on top — addressing what knockdown alone
                cannot.
              </p>
            }
          />
          <PhaseCards
            phase1={{
              tag: "Handled by your existing vendor",
              title: "Remove what's there",
              body: (
                <>
                  <p>
                    Your current pest control vendor handles treatment.
                    Evolve is designed to deploy after the colony clears —
                    not into an at-density active population. No contract
                    changes, no displacement.
                  </p>
                  <p>
                    Treatment produces the visible evidence — dead rodents
                    removed, harborage conditions addressed, entry points
                    assessed — that satisfies your licensed pest management
                    professional and inspection requirements.
                  </p>
                </>
              ),
            }}
            phase2={{
              tag: "Cloakd — fertility management",
              title: "Stop the replacement colony",
              body: (
                <>
                  <p>
                    Evolve bait stations are placed in back-of-house, storage
                    areas, and along known travel paths. Evolve is derived
                    from cottonseed and carries EPA minimum risk designation —
                    cleared for use in food-handling environments. Rats that
                    consume it reproduce at a fraction of their normal rate,
                    and over a single breeding cycle the replacement
                    population can't form at full size.
                  </p>
                  <p>
                    No secondary kill risk to staff, customers, or wildlife.
                    Safe for continuous deployment in active kitchens.
                  </p>
                </>
              ),
            }}
          />
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Phase 1 removes the current population. Phase 2 — Evolve bait
            stations deployed per the deployment guide — prevents the next
            colony from forming at full capacity. The population declines
            instead of cycling.
          </p>
        </div>
      </section>

      <FieldDataTrio
        intro="Field studies across two independent urban deployment sites. At the city level: NYC began deploying ContraPest in rat mitigation zones in April 2025. Baltimore adopted Evolve for its city rodent control program the same year."
      />

      <OtherSolutions current="restaurants" />

      <ClosingCta
        title="Start before the next inspection."
        body="Evolve takes 60 to 120 days to produce measurable results. Deploy it after knockdown and the replacement colony can't form at the same rate."
      />
    </>
  );
}
