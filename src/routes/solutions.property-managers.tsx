import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/solutions-property-managers.jpg";
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

const TITLE = "Property Managers — Cloakd Removals";
const DESCRIPTION =
  "Tenant complaints don't stop until the population does. One coordinated 90-day program across every address in your portfolio.";

export const Route = createFileRoute("/solutions/property-managers")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: PropertyManagersPage,
});

const PRESSURE = [
  {
    title: "Building treated",
    body: "Active population removed. Building clears the next inspection.",
  },
  {
    title: "Territory empties",
    body: "Surrounding rats detect the open space. Pressure starts shifting.",
  },
  {
    title: "Adjacent building gets pressure",
    body: "Tenant complaint filed next door. 311 logged. Inspection scheduled.",
  },
  {
    title: "Second treatment paid for",
    body: "The first building is already rebuilding. Cycle now runs across both addresses.",
  },
  {
    title: "Cycle repeats, doesn't resolve",
    body: "Active complaint moves building to building. Spend accumulates. Problem doesn't decline.",
  },
];

function PropertyManagersPage() {
  return (
    <>
      <SolutionHero
        eyebrow="Property Managers"
        headline="Treated building four in March."
        highlight="By June, building seven was calling."
        lede="Treating one address creates open territory that the surrounding block fills. Sometimes that pressure moves into the building next door — which you also manage. The 90-day program reduces how many rats fill back in across every address, not just the one that complained last."
        image={heroImg}
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What reactive treatment actually costs"
            title="You're paying per building. The problem doesn't stay per building."
            intro={
              <p>
                Reactive treatment works as a single-building expense when the
                problem is isolated to one building. Once it cycles across
                multiple buildings, the math changes.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              value="6–8"
              label="visits/yr per building on a standard schedule"
              sub="Typical commercial pest control contract: monthly or bi-monthly service visits per address"
            />
            <StatCard
              value="4–8 wks"
              label="before replacement colony forms"
              sub="Empty urban territory fills from surrounding blocks within a single treatment cycle"
            />
            <StatCard
              value="Class B"
              label="violation — NYC HPD rodent condition"
              sub="Each 311 complaint triggers an HPD inspection. A pattern of open violations compounds enforcement risk"
            />
            <StatCard
              value="311"
              label="logged — every tenant complaint on record"
              sub="NYC open data tracks rodent complaints by address. Repeat complaints follow the building"
            />
          </div>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            NJ property managers face equivalent exposure under municipal
            health codes. Tenant complaints route to local health
            departments, and a complaint creates a record that persists even
            after treatment.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Why treating one building creates pressure on the next"
            title="When you treat one building, the surrounding population detects the empty territory."
            intro={
              <>
                <p>
                  When a treatment clears a building, it creates open
                  territory in a dense urban block. Rats from surrounding
                  buildings — including other properties you manage — detect
                  the vacancy and start filling it. The treatment you paid
                  for in building four effectively pulls the problem toward
                  building seven.
                </p>
                <p>
                  When you manage multiple buildings and treat each one
                  separately, there's always an active complaint somewhere
                  in the rotation. The buildings share the same block
                  pressure. Treating them one at a time keeps that pressure
                  moving, not declining.
                </p>
              </>
            }
          />
          <TimelineStrip steps={PRESSURE} />
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="How it works for property managers"
            title="One program across every address. Your existing vendors stay."
            intro={
              <p>
                We layer fertility management on top of whatever pest control
                is already running at each building. Your per-building vendor
                contracts don't change. Every address gets a single
                coordinating layer that addresses what individual treatments
                can't.
              </p>
            }
          />
          <PhaseCards
            phase1={{
              tag: "Your existing vendors",
              title: "Knockdown at each address",
              body: (
                <>
                  <p>
                    Your per-building exterminators handle treatment. We
                    coordinate with them to get a clean documented baseline
                    at each address before the fertility management starts.
                    No contract disruption, no new vendor relationships
                    required.
                  </p>
                  <p>
                    Produces the treatment records and compliance
                    documentation for HPD and municipal health requirements.
                  </p>
                </>
              ),
            }}
            phase2={{
              tag: "Cloakd — fertility layer across every address",
              title: "Slow the replacement across every address",
              body: (
                <>
                  <p>
                    Evolve bait stations go into common areas, utility
                    corridors, exterior perimeters, and known rat travel
                    paths at each property. Evolve is made from cottonseed —
                    EPA minimum risk, cleared for residential and mixed-use
                    buildings. Rats that consume it have significantly fewer
                    pups. The replacement population can't form at full
                    size.
                  </p>
                  <p>
                    No secondary kill risk. Safe for continuous deployment
                    in occupied buildings.
                  </p>
                </>
              ),
            }}
          />
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Monthly reports document track count activity per address across
            every building in the program. That shows a declining trend over
            90 days — which is the record you want in front of a housing
            inspector or a tenant attorney.
          </p>
        </div>
      </section>

      {/* COMPLIANCE LAYER */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="The compliance layer"
            title="Documentation that holds up in an inspection."
            intro={
              <>
                <p>
                  Inspectors aren't just looking for the absence of rats.
                  They want evidence of active management. A 90-day record
                  showing declining track counts is a different conversation
                  than "we called the exterminator last month."
                </p>
                <p>
                  Every address gets a monitoring record. If a complaint
                  comes in, you have a paper trail showing consistent,
                  proactive management — not a reactive call made after a
                  311 report.
                </p>
              </>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                t: "NYC HPD",
                b: "Class B violations for rodent conditions. Each 311 complaint triggers an inspection and creates a logged record attached to the building. Repeat violations are treated differently than isolated incidents.",
              },
              {
                t: "NYC DOHMH",
                b: "Restaurants and food businesses in the building face additional exposure under DOHMH codes 04K and 04L — critical violations with fines up to $2,000 per citation.",
              },
              {
                t: "New Jersey",
                b: "NJ municipal health departments conduct complaint-driven and scheduled inspections under state housing and health codes. Rodent citations carry remediation costs, reinspection fees, and tenant legal exposure.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-lg font-bold">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FieldDataTrio />

      <OtherSolutions current="property-managers" />

      <ClosingCta
        title="Stop managing the complaint rotation."
        body="Tell us how many buildings you manage and where the active pressure is. We'll put together a program outline covering Phase 1 coordination and a 90-day monitoring schedule."
      />
    </>
  );
}
