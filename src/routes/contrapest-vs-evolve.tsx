import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/program-how-it-works.jpg";
import { SplitFigure } from "@/components/site/SplitFigure";
import contrapestVsEvolve from "@/assets/inline/contrapest-vs-evolve.jpg";
import operatorStation from "@/assets/inline/operator-contrapest-station.jpg";
import {
  ClosingCta,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE =
  "ContraPest vs. Evolve: Same Maker, Different Products. Which One Works for Urban Buildings? | Cloakd";
const DESCRIPTION =
  "Both made by SenesTech. ContraPest is liquid, EPA-registered. Evolve is solid soft bait, EPA minimum risk. Formulation differences, deployment differences, and which one makes sense for a managed commercial building program.";

export const Route = createFileRoute("/contrapest-vs-evolve")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: ComparePage,
});

const SOURCE_FEB =
  "https://www.prnewswire.com/news-releases/senestech-reports-significant-reductions-in-rodent-activity-following-evolve-deployments-in-urban-field-studies-302691116.html";
const SOURCE_JUN =
  "https://www.prnewswire.com/news-releases/senestechs-evolve-rodent-birth-control-proven-in-urban-rodent-hotspots-from-hong-kong-to-san-francisco-302491716.html";

const ROWS: { label: string; contrapest: string; evolve: string }[] = [
  { label: "Formulation", contrapest: "Liquid", evolve: "Solid soft bait" },
  {
    label: "Active compounds",
    contrapest: "4-VCD + triptolide",
    evolve: "Gossypol (cottonseed)",
  },
  {
    label: "EPA status",
    contrapest: "Registered pesticide",
    evolve: "25(b) minimum risk, exempt",
  },
  {
    label: "Delivery method",
    contrapest: "Liquid dispensers / bait stations",
    evolve: "Standard bait stations",
  },
  {
    label: "Food environment permits",
    contrapest: "Compliance review",
    evolve: "No special permits",
  },
  {
    label: "City-scale use",
    contrapest: "NYC, subway trials",
    evolve: "Baltimore, Chicago, Hong Kong, SF",
  },
  {
    label: "Retail availability",
    contrapest: "Yes (starter kits)",
    evolve: "Yes (Lowe's, Home Depot, Amazon)",
  },
  {
    label: "Commercial deployment",
    contrapest: "Licensed applicators, Standard Pest",
    evolve: "Cloakd managed program",
  },
  {
    label: "Best suited for",
    contrapest: "City infrastructure programs, liquid delivery systems",
    evolve: "Managed building programs, standard bait stations",
  },
];

function ComparePage() {
  return (
    <>
      <SolutionHero
        eyebrow="ContraPest vs. Evolve"
        headline="ContraPest vs. Evolve: Same Company, Different Products, Different Deployment Contexts"
        lede="Both ContraPest and Evolve are made by SenesTech. Both target rodent fertility. Both have produced documented population reductions in real urban programs. Neither is a poison. The differences that matter are in formulation, EPA status, and where each one fits."
        image={heroImg}
        ctaLabel="Start the program"
      />

      {/* WHAT THEY HAVE IN COMMON */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What they have in common"
            title="Same maker. Same target. Same biology."
            intro={
              <>
                <p>
                  Both products are made by SenesTech, Inc. Both target rat
                  fertility rather than killing rats. Both have been deployed
                  in real urban programs and produced documented population
                  reductions.
                </p>
                <p>
                  Neither produces secondary kill risk to wildlife. Both
                  require rats to consume them voluntarily and consistently
                  over multiple weeks for the fertility suppression to take
                  effect.
                </p>
              </>
            }
          />
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="container-site max-w-4xl">
          <SplitFigure imageSide="right"
            src={contrapestVsEvolve}
            alt="ContraPest dispenser system on the left and Evolve soft-bait packaging on the right"
            caption="Side-by-side: ContraPest dispenser system vs. Evolve soft-bait packaging."
          />
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Side-by-side comparison"
            title="The differences that matter for deployment."
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    &nbsp;
                  </th>
                  <th className="px-5 py-4 font-extrabold">ContraPest</th>
                  <th className="px-5 py-4 font-extrabold text-brand">
                    Evolve
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
                      {r.contrapest}
                    </td>
                    <td className="px-5 py-4 align-top text-foreground">
                      {r.evolve}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FORMULATION DIFFERENCE */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="The formulation difference that matters in buildings"
            title="Liquid bait competes with everything liquid in a city."
            intro={
              <>
                <p>
                  ContraPest liquid requires specialized dispensers and is
                  more susceptible to competition from liquid food sources —
                  standing water, food residue — in urban environments. This
                  is partly what failed in Bryant Park: competing liquid
                  attractants meant the bait wasn't consumed at effective
                  concentrations.
                </p>
                <p>
                  Evolve's solid soft bait sits in standard tamper-resistant
                  stations along rat travel paths. Rats encounter it as a
                  food source, not a water source. In an urban building with
                  managed stations on confirmed travel routes, consumption is
                  more predictable and more consistent.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* DEPLOYMENT DATA */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What the deployment data shows for each"
            title="Field results, sourced."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                ContraPest
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>
                  NYC subway trials: suggested efficacy in reducing brown
                  rat populations.
                </li>
                <li>
                  Bryant Park pilot: failed (open environment, no knockdown,
                  competing food sources).
                </li>
                <li>
                  NYC mitigation zone program (2025–present): city-scale
                  deployment ongoing, results pending.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">Evolve</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>
                  Urban buildings, Aug 2025–Jan 2026: 79% reduction in
                  monitored track presence at Location A; 50%+ at Location
                  B.
                </li>
                <li>
                  Hong Kong (June 2025): sightings fell within 3 months, no
                  new litters detected.
                </li>
                <li>
                  San Francisco (June 2025): clear reduction in visible
                  activity, reduced poison usage.
                </li>
                <li>Baltimore city program (2025): adopted citywide.</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Sources:{" "}
            <a
              href={SOURCE_FEB}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline-offset-2 hover:underline"
            >
              SenesTech, Inc. — February 18, 2026
            </a>{" "}
            ·{" "}
            <a
              href={SOURCE_JUN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline-offset-2 hover:underline"
            >
              SenesTech, Inc. — June 26, 2025
            </a>
          </p>
        </div>
      </section>

      <section className="bg-surface pb-12">
        <div className="container-site max-w-4xl">
          <SplitFigure imageSide="left"
            src={operatorStation}
            alt="Operator servicing a ContraPest station outdoors in NYC"
            caption="Field service in NYC outdoor conditions."
          />
        </div>
      </section>

      {/* WHICH ONE IS RIGHT */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Which one is right for a commercial building program"
            title="For most NYC, NJ, and Bay Area operators, the answer is Evolve."
            intro={
              <p>
                Restaurants, property managers, building owners — the
                deployment context that matches your building is a managed
                bait station program, not a liquid infrastructure program.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                Evolve fits when
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>
                  Standard bait stations work in any building without
                  infrastructure changes.
                </li>
                <li>
                  EPA 25(b) means no special permits in food-handling
                  spaces.
                </li>
                <li>
                  Available through Cloakd's managed program without a full
                  licensed commercial pesticide applicator on staff.
                </li>
                <li>
                  The 79% urban field data is specifically from managed
                  building programs using Evolve.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                ContraPest fits when
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>
                  City-scale infrastructure programs with existing liquid
                  delivery systems.
                </li>
                <li>
                  Subways and transit systems where liquid bait stations
                  are already in place.
                </li>
                <li>
                  Operators with existing licensed applicators who prefer
                  the registered-pesticide regulatory path.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CLOAKD */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Cloakd deploys Evolve"
            title="Managed monthly program — deployment and tracking handled."
            intro={
              <p>
                Monthly site visits, station maintenance, track count
                monitoring, and a documented monthly record. Your existing
                exterminator stays.{" "}
                <Link
                  to="/rodent-fertility-control"
                  className="text-brand underline-offset-2 hover:underline"
                >
                  Program details →
                </Link>
              </p>
            }
          />
        </div>
      </section>

      <ClosingCta
        title="Pick the deployment context that matches your building."
        body="Most commercial operators in NYC, NJ, and the Bay Area are better served by a managed Evolve program. Tell us about your property and we'll outline what deployment looks like."
        primary={{ label: "Start the program", to: "/get-started" }}
        secondary={{
          label: "How Evolve works",
          to: "/evolve-rodent-birth-control",
        }}
      />
    </>
  );
}
