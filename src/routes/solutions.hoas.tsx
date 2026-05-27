import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/solutions-hoas.jpg";
import { canonicalLink } from "@/lib/seo";
import {
  ClosingCta,
  FieldDataTrio,
  OtherSolutions,
  PhaseCards,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE = "HOAs & Co-ops — Cloakd Removals";
const DESCRIPTION =
  "Evolve adds fertility management on top of your current pest control — reducing how fast the replacement colony forms and giving the board something to show residents.";

export const Route = createFileRoute("/solutions/hoas")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/solutions/hoas"),
  }),
  component: HoasPage,
});

function HoasPage() {
  return (
    <>
      <SolutionHero
        eyebrow="HOAs & Co-ops"
        headline="Residents keep raising the rat problem at board meetings."
        highlight="The 90-day program gives you something to show them."
        lede="Standard treatment clears the problem and it comes back. When residents ask again next month, you need more than a service receipt. Evolve reduces how fast the replacement colony forms — which changes what the board can say at the next meeting."
        image={heroImg}
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Why HOAs and co-ops face a different version of this"
            title="The board controls the common areas. The rat pressure comes in through the common areas."
            intro={
              <>
                <p>
                  In an HOA or co-op, the board controls common areas and
                  shared infrastructure — and that's almost always where the
                  rodent pressure enters. Individual unit owners can keep
                  their apartments clean. They can't control the basement,
                  the trash room, the courtyard, or the exterior perimeter.
                </p>
                <p>
                  Standard treatment clears what's active. Within weeks the
                  same pressure fills back in through the same pathways. The
                  board pays for treatment again. Residents see no change. It
                  becomes a pattern — and patterns come up at board meetings.
                </p>
                <p>
                  The 90-day program gives the board something the pest
                  control contract alone doesn't: a documented declining
                  trend. That changes the board meeting conversation from
                  "why is this still happening" to "here's what we put in
                  place and here's the data."
                </p>
              </>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                t: "Common area accountability",
                b: "Boards are responsible for common area maintenance under governing documents. A persistent rodent problem in shared spaces is a board-level failure by definition.",
              },
              {
                t: "Property value exposure",
                b: "Persistent rodent problems become visible in disclosure requirements and word-of-mouth among prospective buyers. An open HPD rodent violation on a building's record affects resale and refinancing.",
              },
              {
                t: "Legal exposure",
                b: "NYC and NJ housing codes place pest management obligations on building owners. In a co-op, the corporation owns the structure. Persistent infestation creates actionable liability.",
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

      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="How it works for HOAs and co-ops"
            title="Your existing exterminator stays. We add what changes the outcome."
            intro={
              <p>
                Evolve runs alongside whatever pest control contract is in
                place. Phase 1 handles treatment. Phase 2 adds Evolve
                fertility management across common areas, the building
                perimeter, and known rat travel paths.
              </p>
            }
          />
          <PhaseCards
            phase1={{
              tag: "Your existing exterminator",
              title: "Treatment and documentation",
              body: (
                <p>
                  Your current exterminator handles treatment across common
                  areas and produces the compliance documentation. Evolve
                  deploys after a clean baseline is established across the
                  building. No vendor change required.
                </p>
              ),
            }}
            phase2={{
              tag: "Cloakd — fertility layer",
              title: "Fertility management across the building",
              body: (
                <p>
                  Evolve bait stations go in at basement corridors, trash
                  areas, the exterior perimeter, and utility access points.
                  Made from cottonseed — EPA minimum risk, no secondary
                  kill risk, safe for occupied residential buildings with
                  residents and pets.
                </p>
              ),
            }}
          />
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Evolve runs continuously in common areas — basement corridors,
            trash areas, exterior perimeter, utility access. EPA 25(b)
            minimum risk means no secondary kill risk and no special permits
            for occupied residential buildings.
          </p>
        </div>
      </section>

      <FieldDataTrio />

      <OtherSolutions current="hoas" />

      <ClosingCta
        title="Give the board a documented answer."
        body="Evolve starter kits include locking bait stations and a deployment guide covering common area placement. Refills ship on a replenishment plan so stations stay stocked between treatment cycles."
      />
    </>
  );
}
