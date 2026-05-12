import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/program-how-it-works.jpg";
import {
  ClosingCta,
  FieldDataTrio,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE =
  "Traditional Pest Control vs. Fertility Management: What's Missing | Cloakd";
const DESCRIPTION =
  "Standard treatment removes the rats that are there. It has no way to reduce how fast new ones fill the space after each visit. The 90-day program adds that layer on top of whatever exterminator you already use.";

export const Route = createFileRoute("/vs/traditional-pest-control")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: TradPestVsPage,
});

const STRENGTHS = [
  {
    title: "Licensed and insured",
    body: "Exterminators carry the licensing, chemical certifications, and liability insurance required for commercial treatment.",
  },
  {
    title: "Compliance documentation",
    body: "Treatment records from a licensed exterminator satisfy health department requirements and provide the paper trail inspectors recognize.",
  },
  {
    title: "Entry point assessment",
    body: "Experienced technicians find structural gaps and entry points that building owners miss.",
  },
  {
    title: "Works with your existing vendor",
    body: "Most properties already have an exterminator. The 90-day program is designed to run alongside them, not replace them.",
  },
];

const CYCLE = [
  { title: "Treatment visit", body: "Exterminator treats the active colony. Documentation issued. Clean site." },
  { title: "Week 2–3", body: "Territory sits empty. Surrounding rats start detecting the vacancy." },
  { title: "Week 4–5", body: "New group moves in. Breeding starts at full rate." },
  { title: "Week 6–8", body: "Colony re-established. Population rebuilding toward baseline." },
  { title: "Next visit", body: "Exterminator returns. Removes the replacement colony. Resets." },
];

function TradPestVsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="vs. Traditional pest control"
        headline="Your exterminator is doing their job. The rats keep coming back anyway."
        lede="Standard treatment removes the rats that are there. It has no way to reduce how fast new ones fill the space after each visit. That's not a vendor problem. It's a missing layer — and the 90-day program adds it on top of whatever you already have."
        image={heroImg}
        ctaLabel="Start the program"
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What traditional pest control does well"
            title="It clears the active colony and produces the compliance record."
            intro={
              <>
                <p>
                  A licensed exterminator brings the training, products,
                  and inspection documentation to clear an active
                  infestation. They find entry points, assess travel
                  paths, treat the active colony, and leave a paper
                  trail. For a restaurant, property manager, or building
                  owner, that documentation is the first line of
                  compliance.
                </p>
                <p>
                  Traditional pest control isn't broken. For isolated or
                  newer infestations, it produces consistent control. The
                  limitation shows up in dense urban areas where new rats
                  from the surrounding block continuously fill back in
                  after treatment.
                </p>
              </>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STRENGTHS.map((g) => (
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

      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="The gap standard treatment leaves"
            title="Treatment removes the colony. Nothing slows down the replacement."
            intro={
              <>
                <p>
                  When treatment clears a colony, it opens up the
                  territory. The scent markers that kept other rats away
                  fade within days. Rats from the same block detect the
                  vacancy and start moving in. The same food source, the
                  same building, the same block pressure. The new group
                  arrives within four to eight weeks.
                </p>
                <p>
                  This is not the exterminator's fault. The industry
                  standard is treatment on a scheduled visit cycle. That
                  schedule exists because the biology produces a
                  predictable cycle. Monthly visits aligned with a four
                  to six week replacement timeline keep the problem
                  managed. They don't reduce it.
                </p>
              </>
            }
          />
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {CYCLE.map((s, i) => (
              <div
                key={s.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground text-sm font-extrabold">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-base font-bold leading-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="How they work together"
            title="Your exterminator stays. We add what their treatment can't do."
            intro={
              <p>
                Cloakd doesn't replace your pest control vendor. Phase 1
                of the program is your existing exterminator doing what
                they already do. Phase 2 adds{" "}
                <Link to="/evolve-rodent-birth-control" className="text-brand underline-offset-2 hover:underline">Evolve fertility management</Link>{" "}
                on top — reducing how fast the replacement colony forms
                after each treatment.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">What it adds</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>Reduced reproduction rate between treatment visits</li>
                <li>Population that declines instead of cycling</li>
                <li>90-day documented activity decline</li>
                <li>Active management record for inspectors</li>
                <li>No change to your existing vendor or contract</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">What doesn't change</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>Your existing pest control vendor and contract</li>
                <li>Treatment schedule and visit frequency</li>
                <li>Compliance documentation from your licensed exterminator</li>
                <li>Entry point assessment and structural recommendations</li>
                <li>Your vendor relationship and pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FieldDataTrio
        footnote={
          <>
            NYC began deploying ContraPest in designated rat mitigation
            zones in April 2025. Baltimore adopted Evolve for citywide
            pest management the same year. It works at the building
            level for the same reason it works at city scale.
          </>
        }
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="More comparisons"
            title="Comparing the layer to other named programs."
            intro={
              <p className="flex flex-wrap gap-x-4 gap-y-2">
                <Link to="/vs/orkin" className="text-brand underline-offset-2 hover:underline">vs. Orkin →</Link>
                <Link to="/vs/assured-environments" className="text-brand underline-offset-2 hover:underline">vs. Assured Environments →</Link>
                <Link to="/vs/bell-environmental" className="text-brand underline-offset-2 hover:underline">vs. Bell Environmental →</Link>
                <Link to="/vs/viking-pest-control" className="text-brand underline-offset-2 hover:underline">vs. Viking Pest Control →</Link>
                <Link to="/vs/western-pest-services" className="text-brand underline-offset-2 hover:underline">vs. Western Pest Services →</Link>
              </p>
            }
          />
        </div>
      </section>

      <ClosingCta
        title="Your exterminator keeps their contract."
        body="Tell us about your property and who handles pest control now. We'll coordinate Phase 1 with your existing vendor and run the fertility management layer for 90 days."
        primary={{ label: "Start the program", to: "/get-started" }}
        secondary={{ label: "How it works", to: "/how-it-works" }}
      />
    </>
  );
}
