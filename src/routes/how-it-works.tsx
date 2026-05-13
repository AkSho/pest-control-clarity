import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import heroImg from "@/assets/program-how-it-works.jpg";
// import { SplitFigure } from "@/components/site/SplitFigure";
import snapTrap from "@/assets/inline/snap-trap.jpg";
import evolveSoftBait from "@/assets/inline/evolve-soft-bait.jpg";
import pcoOperator from "@/assets/inline/pco-operator-field.jpg";
import monitoringReport from "@/assets/inline/monitoring-report.jpg";
import {
  ClosingCta,
  PhaseCards,
  SectionHeader,
  SolutionHero,
  TimelineStrip,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE = "How it works — 90-day rodent fertility management | Cloakd";
const DESCRIPTION =
  "You keep paying for treatment. The rats keep coming back. Here's how the 90-day rodent fertility management program breaks that cycle.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HowItWorksPage,
});

const CYCLE = [
  {
    title: "Treatment week",
    body: "Colony cleared. Active population removed. Site is clean.",
  },
  {
    title: "Week 2",
    body: "Territory sits empty. Surrounding rats start detecting that it's open.",
  },
  {
    title: "Week 3–4",
    body: "Rats from the surrounding block test the space. No resistance. Food is still there.",
  },
  {
    title: "Week 5–6",
    body: "New group moves in. Breeding starts at full rate immediately.",
  },
  {
    title: "Week 7–8 → next treatment",
    body: "Colony re-established. Population back near where it started. Cycle resets — same cost, same outcome, same timeline.",
  },
];

const MECHANISM = [
  {
    title: "In males",
    body: "Male rats that eat the bait regularly produce significantly less working sperm. Their contribution to the next generation drops. The effect builds over several weeks.",
  },
  {
    title: "In females",
    body: "Females have fewer litters, and smaller ones. Pups born during the program period are less likely to survive. Across the whole colony, more rats are dying than being born.",
  },
  {
    title: "Over 90 days",
    body: "Within 8 to 12 weeks, the population stops replacing itself at its normal rate. The territory is still occupied, so surrounding rats don't flood back in. The colony just gets smaller. Track count monitoring shows the decline over time.",
  },
];

const HANDLES = [
  "The replacement cycle — the rats that move in after treatment",
  "Population fertility across the 90-day period",
  "Documented activity decline between scheduled PCO visits",
  "The gap between \"we treated it\" and \"it stays gone\"",
];

const DOESNT = [
  "Immediate treatment of the current infestation — that's Phase 1, your existing vendor",
  "Sealing entry points — that's structural exclusion work, handled separately",
  "Your existing pest control contract",
  "Compliance documentation required from a licensed exterminator",
];

function HowItWorksPage() {
  return (
    <>
      <SolutionHero
        eyebrow="How it works"
        headline="You keep paying for treatment. The rats keep coming back."
        highlight="Here's how the 90-day rodent fertility management program breaks that cycle."
        lede="Your pest control vendor is doing their job correctly. Standard treatment removes the rats that are there. The problem is what happens to that territory in the weeks after it empties."
        image={heroImg}
      />

      {/* WHY THE CYCLE DOESN'T STOP */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Why the cycle doesn't stop"
            title="Treatment clears the rats that are there. It doesn't change anything for the ones coming next."
            intro={
              <>
                <p>
                  City rats — primarily Norway rats (Rattus norvegicus) in
                  urban buildings — are territorial. When a colony establishes
                  harborage in your block, they mark it with scent signals
                  that tell every other rat the space is taken. As long as
                  that colony is there, other groups stay out.
                </p>
                <p>
                  Remove that colony with treatment, and those signals fade
                  within days. The food source is still there. The building is
                  still there. Every rat in the surrounding block can now tell
                  the territory is open. They move in. That's where the new
                  infestation comes from — not from far away. From the same
                  block, within four to eight weeks.
                </p>
                <p>
                  This isn't the vendor's fault. Standard pest control removes
                  what's present on the visit. The industry runs on a
                  scheduled cycle because that's what the biology produces:
                  clear it, wait, clear it again. The cycle doesn't end
                  because nothing changes the rate at which new rats fill in.
                </p>
              </>
            }
          />
          <TimelineStrip steps={CYCLE} />
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="container-site max-w-4xl space-y-2">
          {/* <SplitFigure imageSide="right"
            image={snapTrap}
            alt="Close-up of a black plastic snap trap"
            caption="Lethal snap trap — removes one rat per trigger."
          /> */}
          {/* <SplitFigure imageSide="left"
            image={evolveSoftBait}
            alt="Evolve soft bait pieces beside their tub packaging"
            caption="Evolve soft bait — reduces the next generation by suppressing fertility."
          /> */}
        </div>
      </section>

      {/* MECHANISM */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="The fertility management mechanism"
            title="Fewer babies. The population shrinks on its own."
            intro={
              <p>
                <Link
                  to="/evolve-rodent-birth-control"
                  className="text-brand underline-offset-2 hover:underline"
                >
                  Evolve
                </Link>{" "}
                is a bait made from cottonseed, developed by SenesTech.
                It doesn't kill rats. It changes how many babies they can
                have — which is what actually stops the cycle.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {MECHANISM.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  {m.title}
                </div>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {m.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-brand/30 bg-brand-soft p-7 md:p-9">
            <h3 className="text-xl font-extrabold leading-tight md:text-2xl">
              Why it's safe for food environments
            </h3>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                The active ingredient in Evolve comes from cottonseed — the
                same plant. The EPA classifies it as minimum risk, the same
                category as products made from cloves or citronella. It's not
                a synthetic chemical. It doesn't build up in the environment.
              </p>
              <p>
                It produces no secondary kill risk. If a hawk or a fox
                encounters a rat that's been consuming the bait, the predator
                is not exposed to anything harmful. That's what makes it safe
                for continuous use in restaurants, food storage, and occupied
                residential buildings.
              </p>
              <p className="font-semibold text-foreground">
                EPA minimum risk clearance means no special permit is needed
                to deploy Evolve in or around food-handling spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface pb-12">
        <div className="container-site max-w-4xl">
          {/* <SplitFigure imageSide="right"
            image={pcoOperator}
            alt="Pest control operator kneeling at a bait station with tools and clipboard"
            caption="Scheduled service: inspect, document, replenish."
          /> */}
        </div>
      </section>

      {/* THE 90-DAY PROGRAM */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="The 90-day program"
            title="Two phases. Your existing vendor stays."
            intro={
              <p>
                Phase 1 clears the current population through your existing
                pest control operator. Phase 2 prevents the next one from
                forming at full size. Both run together as a single integrated
                pest management program for 90 days.
              </p>
            }
          />
          <PhaseCards
            phase1={{
              tag: "Week 1–2 · handled by your current vendor",
              title: "Clear the current colony",
              body: (
                <p>
                  Your existing pest control vendor handles treatment. We
                  coordinate with them to get a clean, documented baseline
                  before the fertility management starts. No contract changes.
                  Your vendor keeps their relationship.
                </p>
              ),
            }}
            phase2={{
              tag: "Weeks 1–12 · handled by Cloakd",
              title: "Deploy fertility management",
              body: (
                <>
                  <p>
                    Evolve bait stations go in along travel paths, near entry
                    points, and around the property perimeter. Stations are
                    checked and refilled each month. The bait runs
                    continuously through the full 90 days.
                  </p>
                  <p>
                    Monitoring (baseline + monthly): small tracking plates sit
                    at each station. Rats walking across them leave
                    footprints. We count the tracks each month and compare
                    against the Week 1 baseline. The count goes down over
                    time. That's the documented record — the 90-day declining
                    trend you can show an inspector.
                  </p>
                </>
              ),
            }}
          />
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            At 90 days, you get a full comparison: track counts per location,
            how the numbers moved, the documented trend. That record goes with
            you into any inspection or any conversation where proof of active
            management matters.
          </p>
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="container-site max-w-4xl">
          {/* <SplitFigure imageSide="left"
            image={monitoringReport}
            alt="Floor-plan monitoring report with bait stations and activity hotspots labeled"
            caption="Every visit produces a structured monitoring report."
          /> */}
        </div>
      </section>

      {/* WHAT IT IS / ISN'T */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What the program is and isn't"
            title="It's a second layer. It runs on top of what you already have."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                What it handles
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {HANDLES.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                What it doesn't replace
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {DOESNT.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        title="Start before the next treatment visit."
        body="Tell us about your property and who handles pest control now. We'll coordinate Phase 1 with your vendor and run the fertility management layer through the full 90 days."
        secondary={{ label: "See the full walkthrough", to: "/what-to-expect" }}
      />
    </>
  );
}
