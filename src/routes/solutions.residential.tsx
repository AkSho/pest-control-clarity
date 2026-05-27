import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/solutions-residential.jpg";
import { canonicalLink } from "@/lib/seo";
import {
  ClosingCta,
  FieldDataTrio,
  OtherSolutions,
  PhaseCards,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE = "Residential Properties — Cloakd Removals";
const DESCRIPTION =
  "Standard treatment removes the colony. The territory refills from the surrounding block. Fertility management reduces how many move back in until the cycle stops.";

export const Route = createFileRoute("/solutions/residential")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/solutions/residential"),
  }),
  component: ResidentialPage,
});

const PRESSURE = [
  {
    t: "Older building stock",
    b: "Much of NYC and NJ's housing was built before modern construction standards. Foundation gaps, shared basement walls, and aging plumbing create entry pathways that are difficult to fully seal.",
  },
  {
    t: "Subway and underground access",
    b: "Buildings near subway lines or dense underground utility infrastructure face the highest replacement pressure. Rats use those corridors to move between buildings constantly.",
  },
  {
    t: "Shared waste areas",
    b: "Multi-unit buildings with shared trash areas create a persistent food attractant. Individual unit cleanliness doesn't offset a building-wide waste management gap.",
  },
  {
    t: "Adjacent properties",
    b: "A restaurant or empty lot on the same block elevates the local rat population for every building nearby. Your building's problem is partly a function of what's next door.",
  },
];

function ResidentialPage() {
  return (
    <>
      <SolutionHero
        eyebrow="Residential Properties"
        headline="They treated the apartment."
        highlight="Three months later, you're hearing them in the walls again."
        lede="Standard treatment removes the colony that's there. Within weeks, rats from the surrounding block fill the same space again — because the food source didn't change and the territory is now open. Fertility management reduces how many move back in, until the cycle stops."
        image={heroImg}
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Why residential properties in NYC and NJ face persistent pressure"
            title="Your building shares its block with the same population that keeps coming in."
            intro={
              <p>
                A treated building in a dense city doesn't exist in
                isolation. The rats that come back after treatment aren't
                traveling from far away — they're already in the surrounding
                block.
              </p>
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

      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="NYC tenant and landlord context"
            title="A rodent condition is an HPD violation. It stays open until a re-inspection confirms it's resolved."
            intro={
              <>
                <p>
                  NYC landlords are required to maintain buildings free of
                  rodent infestation. A tenant 311 complaint triggers an HPD
                  inspection. The violation stays open until a follow-up
                  confirms it's been resolved — which means the standard
                  treatment timeline matters. If the follow-up comes during
                  a replacement cycle, the violation stays on the record.
                </p>
                <p>
                  For tenants: your landlord is responsible for rodent-free
                  conditions. A documented pattern of complaints supports
                  your right to a habitable unit.
                </p>
              </>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                t: "NYC HPD Class B violation",
                b: "Rodent infestation in a residential building is a Class B (hazardous) violation. The owner has 30 days to fix and certify. Multiple open violations affect the building's housing court record.",
              },
              {
                t: "NYC 311 complaint history",
                b: "Every 311 rodent complaint is logged against the building's address in NYC open data. Patterns of repeat complaints are visible to prospective tenants, housing court, and city enforcement.",
              },
              {
                t: "New Jersey",
                b: "NJ residential properties fall under local municipal housing codes. Tenant complaints route to local health departments. The obligation to maintain pest-free conditions is consistent across municipalities.",
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
            eyebrow="How the program works for residential"
            title="Two phases. Your existing exterminator stays."
            intro={
              <p>
                The 90-day program adds a fertility management layer on top
                of whatever pest control is already running. Phase 1 clears
                the current colony. Phase 2 slows down what comes next.
              </p>
            }
          />
          <PhaseCards
            phase1={{
              tag: "Your existing exterminator",
              title: "Clear the current colony",
              body: (
                <p>
                  Your current exterminator handles treatment. If a landlord
                  doesn't have a vendor in place, arrange treatment before
                  deploying Evolve. Treatment records from this phase
                  address the HPD violation documentation requirement.
                </p>
              ),
            }}
            phase2={{
              tag: "Cloakd — fertility management",
              title: "Slow down the replacement",
              body: (
                <p>
                  Evolve bait stations go in at entry corridors, basement
                  areas, the exterior perimeter, and known travel paths.
                  Made from cottonseed — EPA minimum risk, no secondary
                  kill risk, safe for occupied residential buildings with
                  children and pets.
                </p>
              ),
            }}
          />
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Evolve is EPA 25(b) minimum risk — no secondary kill risk, safe
            for occupied residential buildings with children and pets. The
            replacement colony forms at a reduced rate, and the population
            declines instead of cycling between treatment visits.
          </p>
        </div>
      </section>

      <FieldDataTrio />

      <OtherSolutions current="residential" />

      <ClosingCta
        title="Add the layer that slows down the cycle."
        body="Evolve starter kits include locking bait stations and a deployment guide. Deploy after knockdown — rat or mouse formula depending on the pressure."
        secondary={{
          label: "Why it keeps coming back",
          to: "/why-it-keeps-coming-back",
        }}
      />
    </>
  );
}
