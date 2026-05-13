import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-problem.jpg";
import {
  ClosingCta,
  FieldDataTrio,
  SectionHeader,
  SolutionHero,
  StatCard,
} from "@/components/site/solutions/SolutionPrimitives";
import { SplitFigure } from "@/components/site/SplitFigure";
import restaurantSnapTrap from "@/assets/inline/restaurant-snap-trap.jpg";

const TITLE =
  "Snap Traps vs. Fertility Management: Why Trapping Can't Win Alone | Cloakd";
const DESCRIPTION =
  "Snap traps remove individual rats. They have no effect on how fast the colony makes new ones. Here's the reproduction math, where traps actually fit, and what fertility management adds.";

export const Route = createFileRoute("/vs/snap-traps")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: SnapTrapsVsPage,
});

const FALLS_SHORT = [
  {
    title: "Needs daily checking and resetting",
    body: "A trap that catches a rat and sits for three days creates a hygiene problem and stops catching new ones. Effective trap programs are time-intensive at any significant scale.",
  },
  {
    title: "Can't keep up with a full colony",
    body: "Catching two or three rats a night in an active colony of 20 to 40 animals running at full reproduction produces no measurable population decline.",
  },
  {
    title: "Doesn't slow down breeding",
    body: "Trapping removes individuals. It has no effect on reproduction. A colony that loses a third of its members will replace them within weeks at full fertility.",
  },
  {
    title: "Creates visible dead rodents",
    body: "For restaurants and food businesses, a dead rat near food prep or in a storage area is a health department finding — even when the trapping is technically working.",
  },
];

const ROWS = [
  { label: "Removes individual rodents", a: "Yes", b: "Phase 1 of the program handles this" },
  { label: "Reduces colony reproduction rate", a: "No", b: "Yes — that's the mechanism" },
  { label: "Scales to established colony size", a: "No", b: "Yes — passive, monthly cadence" },
  { label: "Works passively between visits", a: "No — manual reset required", b: "Yes" },
  { label: "Breaks the replacement cycle", a: "No", b: "Reduces how fast it forms" },
  { label: "Visible dead rodents", a: "Yes", b: "No — fertility, not lethality" },
  { label: "90-day declining trend documentation", a: "No", b: "Monthly track count plates and written report" },
];

function SnapTrapsVsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="vs. Snap traps"
        headline="The traps keep catching rats. The population isn't going down."
        lede="Snap traps remove individual rats. They have no effect on how fast the colony makes new ones. In a dense urban block with constant inbound pressure from the surrounding area, catching rats one at a time can't win."
        image={heroImg}
        ctaLabel="Start the program"
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="The reproduction math"
            title="Trapping removes rats. The colony keeps making more."
            intro={<p>City rats reproduce fast. Here's what you're actually competing against.</p>}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <StatCard value="21–23 days" label="gestation period" sub="A female rat can produce a new litter roughly every three weeks" />
            <StatCard value="5–8 pups" label="per litter" sub="Average litter size for the city rat species found in NYC and NJ" />
            <StatCard value="5–6 litters/yr" label="per breeding female" sub="With a consistent food source, females can produce litters year-round" />
            <StatCard value="~6 weeks" label="to maturity" sub="New females begin reproducing about six weeks after birth, compounding within a single season" />
          </div>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            To hold population steady through trapping alone, you'd need
            to catch rats faster than they're being born. In a dense
            urban block with constant inbound pressure, that's not a
            realistic target. Trapping manages the problem. It doesn't
            reduce it.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Where snap traps work"
            title="Traps work when the problem is small and contained."
            intro={
              <>
                <p>
                  For a small number of individual rodents coming in
                  from a known point — a gap under a door you just
                  found, a utility penetration you're sealing next week
                  — traps placed correctly will catch them. They're
                  also a useful option when chemical treatments aren't
                  appropriate for a particular space.
                </p>
                <p>
                  Most exterminators include snap traps as part of a
                  broader program. They work as one tool within a
                  larger approach, not as the main strategy for an
                  established colony.
                </p>
              </>
            }
          />
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Where snap traps fall short"
            title="The bigger the colony, the more the math works against you."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {FALLS_SHORT.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-bold leading-tight">{g.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="How they compare"
            title="Trapping removes individuals. Fertility management shrinks the colony."
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">&nbsp;</th>
                  <th className="px-5 py-4 font-extrabold">Snap traps</th>
                  <th className="px-5 py-4 font-extrabold text-brand">
                    Fertility management ({" "}
                    <Link to="/evolve-rodent-birth-control" className="underline-offset-2 hover:underline">Evolve</Link>
                    )
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 align-top text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{r.label}</td>
                    <td className="px-5 py-4 align-top text-muted-foreground">{r.a}</td>
                    <td className="px-5 py-4 align-top text-foreground">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SplitFigure imageSide="right"
            src={restaurantSnapTrap}
            alt="Snap trap placed on a restaurant back-of-house floor mat"
            caption="Snap traps remove individuals one at a time; fertility control reduces the next generation."
          />
        </div>
      </section>

      <FieldDataTrio
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

      <ClosingCta
        title="Work on the colony, not one rat at a time."
        body="The 90-day program combines Phase 1 knockdown with continuous fertility management. The population doesn't cycle back. The 90-day trend is documented and declining."
        primary={{ label: "Start the program", to: "/get-started" }}
        secondary={{ label: "How Evolve works", to: "/evolve-rodent-birth-control" }}
      />
    </>
  );
}
