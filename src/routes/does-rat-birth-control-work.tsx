import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/program-bryant-park.jpg";
import { InlineFigure } from "@/components/site/InlineFigure";
import basementAudit from "@/assets/inline/basement-pipe-audit.jpg";
import monitoringReport from "@/assets/inline/monitoring-report.jpg";
import {
  ClosingCta,
  SectionHeader,
  SolutionHero,
  StatCard,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE =
  "Does rat birth control work? Bryant Park failed — here's why | Cloakd";
const DESCRIPTION =
  "NYC tried rat birth control in Bryant Park. It failed. Here's why — and what's different about a managed Evolve deployment that produced 79% reduction.";

export const Route = createFileRoute("/does-rat-birth-control-work")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: BirthControlPage,
});

const BRYANT_FAILURES = [
  {
    title: "No Phase 1 knockdown",
    body: "The existing population was at full density when the bait went in. Fertility management is designed to stop the replacement colony from forming — not to reduce a population that's already established at baseline.",
  },
  {
    title: "Open outdoor environment",
    body: "Bryant Park is an open space with unrestricted food access from surrounding streets, trash, and visitor activity. Managed bait stations in enclosed urban buildings produce a fundamentally different consumption pattern.",
  },
  {
    title: "Competing attractants",
    body: "NYC rats had abundant alternatives to the bait. Without containerized waste, the bait competed with the city's normal food supply rather than being the primary available option.",
  },
  {
    title: "No monitoring",
    body: "Without track count monitoring, there was no way to confirm whether consumption was occurring at the levels needed, or to adjust placement and replenishment.",
  },
];

const SUCCESS_FACTORS = [
  {
    title: "Phase 1 knockdown first",
    body: "The fertility management layer starts from a documented clean baseline after a knockdown clears the active population. This is what gives the bait a role: stop the replacement from forming, not reduce what's already at full density.",
  },
  {
    title: "Managed bait stations",
    body: "Stations placed along confirmed travel paths and near entry points, checked and replenished monthly. Rats are creatures of habit — managed stations along their established routes produce reliable consumption. Scattered bait in an open environment doesn't.",
  },
  {
    title: "Urban enclosed environment",
    body: "A building or property perimeter limits competing food sources to a manageable level. An open city park or outdoor space with unrestricted food access is a structurally different problem.",
  },
  {
    title: "Monthly track count monitoring",
    body: "Tracking plates at each station confirm activity is declining month over month. Monitoring shows whether the program is working and documents the trend — which is also the record you hand to an inspector.",
  },
];

function BirthControlPage() {
  return (
    <>
      <SolutionHero
        eyebrow="Does rat birth control work?"
        headline="NYC tried it in Bryant Park. It failed."
        highlight="Here's why — and what's different."
        lede="The Gothamist headline was accurate: the Bryant Park rat birth control pilot didn't work. The same mechanism deployed in two independent urban buildings over five months produced 79% reduction in rodent track presence. The mechanism isn't what failed. The deployment structure failed. Here's exactly what the difference is."
        image={heroImg}
      />

      {/* WHY BRYANT PARK FAILED */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Why Bryant Park failed"
            title="The deployment structure was wrong before the bait went in."
            intro={
              <>
                <p>
                  The Bryant Park pilot used liquid{" "}
                  <Link
                    to="/contrapest"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    ContraPest
                  </Link>{" "}
                  in an open public space. NYC Norway rats (Rattus
                  norvegicus) have arguably the most abundant competing
                  food supply of any urban rat population on earth. Without
                  containerized trash and a prior knockdown reducing the
                  existing population, the rats had no reason to consume
                  the bait at the concentration needed to affect
                  reproduction.
                </p>
                <p>
                  This is the same failure pattern across every documented
                  negative result: standalone deployment, outdoor or open
                  environment, active population still present, competing
                  attractants, no monitoring to confirm the bait was even
                  being consumed. In that structure, the product can't do
                  what it's designed to do.
                </p>
                <p>
                  The mechanism — reproductive suppression so the population
                  can't replace itself at the rate it's removed — is sound
                  biology. What it requires is a controlled enough environment
                  for rats to consume the bait consistently. A managed bait
                  station program inside an urban building, deployed after a
                  knockdown phase by a licensed pest control operator, is
                  that environment.
                </p>
              </>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {BRYANT_FAILURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-bold leading-tight">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="container-site max-w-4xl">
          <InlineFigure
            src={basementAudit}
            alt="Pest control technician inspecting basement plumbing with a flashlight"
            caption="Placement starts with the audit — finding entry points, runways, and harborage."
          />
        </div>
      </section>

      {/* FIELD DATA */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What the field data shows"
            title="Two independent urban building deployments. Five months. Both produced positive results."
            intro={
              <p>
                SenesTech published field results from two independent urban
                deployments in February 2026. Both used{" "}
                <Link
                  to="/evolve-rodent-birth-control"
                  className="text-brand underline-offset-2 hover:underline"
                >
                  Evolve
                </Link>{" "}
                in managed bait stations, deployed after a Phase 1
                knockdown, with monthly track count monitoring.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <StatCard
              value="79%"
              label="reduction in rodent track presence"
              sub="Location A — percentage of monitored stations showing zero activity by month 5"
            />
            <StatCard
              value="88%"
              label="drop in track density"
              sub="Location A — tracks per monitoring plate declined even at stations with residual activity"
            />
            <StatCard
              value="50%+"
              label="reduction in track presence"
              sub="Location B — independent urban site, same 5-month period, different site profile"
            />
          </div>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Two independent sites producing positive outcomes over the same
            period gives the data more weight than a single result. The
            mechanism isn't site-specific. The biology is consistent across
            urban environments — what matters is deployment structure.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Source:{" "}
            <a
              href="https://www.prnewswire.com/news-releases/senestech-reports-significant-reductions-in-rodent-activity-following-evolve-deployments-in-urban-field-studies-302691116.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline-offset-2 hover:underline"
            >
              SenesTech, Inc. — February 18, 2026
            </a>
          </p>

          <div className="mt-10 rounded-2xl border border-border bg-card p-7">
            <h3 className="text-lg font-extrabold leading-tight">
              Additional deployments — June 2025
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Independent deployments in Hong Kong and San Francisco produced
              consistent results: sightings fell within three months, bait
              consumption declined as the population shrank, and no new
              litters were detected. Different cities, different building
              types, same deployment structure, same direction of outcome.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Source:{" "}
              <a
                href="https://www.prnewswire.com/news-releases/senestechs-evolve-rodent-birth-control-proven-in-urban-rodent-hotspots-from-hong-kong-to-san-francisco-302491716.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline-offset-2 hover:underline"
              >
                SenesTech, Inc. — June 26, 2025
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface pb-12">
        <div className="container-site max-w-4xl">
          <InlineFigure
            src={monitoringReport}
            alt="Floor-plan monitoring report showing bait stations, monitoring points, and activity hotspots"
            caption="Monitoring data: bait stations, inspection points, and activity hotspots tracked per visit."
          />
        </div>
      </section>

      {/* WHAT MAKES DEPLOYMENT SUCCEED */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What makes deployment succeed"
            title="Four things that separate the programs that work from the ones that don't."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {SUCCESS_FACTORS.map((f, i) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground text-sm font-extrabold">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-base font-bold leading-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTRAPEST VS EVOLVE */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="ContraPest vs. Evolve"
            title="Same maker. Different formulations. Different deployment contexts."
            intro={
              <p>
                Both ContraPest and Evolve are made by SenesTech. The Bryant
                Park pilot and NYC's current city program use ContraPest
                liquid. The program Cloakd deploys uses Evolve solid soft
                bait.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-xl font-extrabold leading-tight">
                ContraPest (liquid)
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>Liquid formulation requiring specialized dispensers</li>
                <li>
                  Used in Bryant Park pilot (failed) and NYC's current Harlem
                  program
                </li>
                <li>
                  More susceptible to competing liquid attractants in open
                  environments
                </li>
                <li>Better suited to city-scale infrastructure programs</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-xl font-extrabold leading-tight">
                Evolve (solid soft bait)
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>
                  Solid soft bait derived from gossypol in cottonseed, EPA
                  minimum risk (25b)
                </li>
                <li>
                  Deployed in standard bait stations along rat travel paths
                </li>
                <li>
                  Used in the two urban deployments that produced the 79%/88%
                  data
                </li>
                <li>
                  Adopted by Baltimore for citywide rodent program (2025)
                </li>
                <li>
                  Available on consumer market — but deployment structure is
                  what produces results
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm">
            <Link
              to="/contrapest-vs-evolve"
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              See the full comparison →
            </Link>
          </p>
        </div>
      </section>

      <ClosingCta
        title="The structure is what makes it work."
        body="The 90-day integrated pest management program runs Phase 1 knockdown through your existing exterminator, then deploys Evolve with monthly monitoring. Tell us about your property and we'll put together the outline."
        secondary={{ label: "How it works", to: "/how-it-works" }}
      />
    </>
  );
}
