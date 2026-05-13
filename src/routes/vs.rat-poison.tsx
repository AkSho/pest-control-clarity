import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-bait-station.jpg";
import {
  ClosingCta,
  FieldDataTrio,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";
// import { SplitFigure } from "@/components/site/SplitFigure";
import evolveSoftBait from "@/assets/inline/evolve-soft-bait.jpg";

const TITLE =
  "Rat Poison vs. Fertility Management: What Each Layer Actually Does | Cloakd";
const DESCRIPTION =
  "Rodent poison kills the colony that's there. It doesn't change how fast the next colony fills the territory. Here's how the two layers compare and where each one fits.";

export const Route = createFileRoute("/vs/rat-poison")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: RatPoisonVsPage,
});

const OTHER_ISSUES = [
  {
    title: "Secondary kill risk",
    body: "Hawks, owls, and foxes that eat poisoned rats absorb the toxicant. The strongest anticoagulant rodenticides carry the highest secondary risk and have been under increasing EPA restrictions for consumer use.",
  },
  {
    title: "NYC restrictions",
    body: "In 2021, NYC restricted commercial use of the strongest class of anticoagulant rodenticide. What was standard practice a few years ago is no longer on the approved list, and the list keeps changing.",
  },
  {
    title: "It produces dead rats",
    body: "Poison creates visible evidence — dead rodents in food storage, near prep surfaces, or where tenants find them. For restaurants, that's its own inspection and liability exposure even when the treatment is technically working.",
  },
];

const ROWS = [
  {
    label: "Kills the current colony",
    poison: "Yes",
    evolve: "Phase 1 of the program handles this with your existing vendor",
  },
  {
    label: "Reduces reproduction rate over time",
    poison: "No",
    evolve: "Yes — that's the mechanism",
  },
  {
    label: "Stops the replacement colony from forming",
    poison: "No",
    evolve: "Reduces the rate at which it forms",
  },
  {
    label: "Secondary kill risk",
    poison: "Yes — anticoagulants in particular",
    evolve: "No — EPA-designated minimum risk",
  },
  {
    label: "Safe for continuous food-environment use",
    poison: "Restricted",
    evolve: "Yes",
  },
  {
    label: "90-day declining trend documentation",
    poison: "No",
    evolve: "Monthly track count plates and written report",
  },
];

function RatPoisonVsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="vs. Rat poison"
        headline="Poison kills the rats that eat it. It doesn't stop the ones that come next."
        lede="Poison does its job. The problem is what happens four to six weeks after the colony clears. Empty territory in a food-rich urban block fills from the surrounding population — at full breeding rate — before your next scheduled treatment."
        image={heroImg}
        ctaLabel="Start the program"
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Where it works"
            title="It kills what's there. That part works."
            intro={
              <>
                <p>
                  Rodent poison placed along travel paths and near entry
                  points will kill the rats that eat it. The colony that's
                  currently active goes down. For light infestations or
                  one-off incidents, it's often the right first tool.
                </p>
                <p>
                  The problem isn't what it does. The problem is what
                  happens four to six weeks after it does it.
                </p>
              </>
            }
          />
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Where it falls short"
            title="Killing the colony makes the territory available."
            intro={
              <>
                <p>
                  Rats are territorial. When a colony is present, their
                  scent markers keep other groups out. Remove that colony
                  with poison and those marks fade within days. The food
                  source didn't move. The building didn't move. Rats from
                  the surrounding block detect the open territory and fill
                  it within weeks.
                </p>
                <p>
                  The replacement colony comes in at full reproduction
                  rate. You're back to baseline before the next scheduled
                  visit.
                </p>
              </>
            }
          />
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Other problems with rodent poison"
            title="The cycle isn't the only issue."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {OTHER_ISSUES.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-bold leading-tight">
                  {g.title}
                </h3>
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
            eyebrow="How they compare"
            title="Poison and fertility management solve different parts of the problem."
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    &nbsp;
                  </th>
                  <th className="px-5 py-4 font-extrabold">Rat poison</th>
                  <th className="px-5 py-4 font-extrabold text-brand">
                    Fertility management ({" "}
                    <Link
                      to="/evolve-rodent-birth-control"
                      className="underline-offset-2 hover:underline"
                    >
                      Evolve
                    </Link>
                    )
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr
                    key={r.label}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-5 py-4 align-top text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {r.label}
                    </td>
                    <td className="px-5 py-4 align-top text-muted-foreground">
                      {r.poison}
                    </td>
                    <td className="px-5 py-4 align-top text-foreground">
                      {r.evolve}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <SplitFigure imageSide="right"
            image={evolveSoftBait}
            alt="Evolve soft bait pieces beside their tub packaging"
            caption="Evolve is a contraceptive soft bait — non-lethal, no anticoagulants."
          /> */}
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            The 90-day program uses both. Phase 1 clears the current
            colony with whatever treatment is already in place. Phase 2
            adds Evolve on top to prevent the replacement from forming
            at the same rate. Together they produce a declining trend.
            Separately, neither does.
          </p>
        </div>
      </section>

      <FieldDataTrio
        intro="What a combined program produces over 90 days."
        footnote={
          <>
            Source:{" "}
            <a
              className="underline underline-offset-2 hover:text-brand"
              href="https://www.prnewswire.com/news-releases/senestech-reports-significant-reductions-in-rodent-activity-following-evolve-deployments-in-urban-field-studies-302691116.html"
              target="_blank"
              rel="noreferrer"
            >
              SenesTech, Inc. — February 18, 2026
            </a>
          </>
        }
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="More comparisons"
            title="See the layer next to the other tools you already use."
            intro={
              <p className="flex flex-wrap gap-x-4 gap-y-2">
                <Link to="/vs/traditional-pest-control" className="text-brand underline-offset-2 hover:underline">Traditional pest control →</Link>
                <Link to="/vs/snap-traps" className="text-brand underline-offset-2 hover:underline">Snap traps →</Link>
                <Link to="/vs/diy-rat-birth-control" className="text-brand underline-offset-2 hover:underline">DIY rat birth control →</Link>
                <Link to="/contrapest-vs-evolve" className="text-brand underline-offset-2 hover:underline">ContraPest vs. Evolve →</Link>
              </p>
            }
          />
        </div>
      </section>

      <ClosingCta
        title="Keep the poison. Add the layer that stops the cycle."
        body="The program works with whatever treatment is already running. Your vendor stays. We add the fertility layer on top."
        primary={{ label: "Start the program", to: "/get-started" }}
        secondary={{ label: "How Evolve works", to: "/evolve-rodent-birth-control" }}
      />
    </>
  );
}
