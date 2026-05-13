import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/program-bryant-park.jpg";
import { SplitFigure } from "@/components/site/SplitFigure";
import nycMitigationMap from "@/assets/inline/nyc-mitigation-zone-map.jpg";
import contrapestVsEvolve from "@/assets/inline/contrapest-vs-evolve.jpg";
import operatorStation from "@/assets/inline/operator-contrapest-station.jpg";
import {
  ClosingCta,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE =
  "ContraPest: NYC's Rat Birth Control Program, How It Works, and What Commercial Operators Need to Know | Cloakd";
const DESCRIPTION =
  "ContraPest is the only EPA-registered rat contraceptive for both males and females. NYC's mitigation zone program deploys it. What commercial building operators need to know — and how it differs from Evolve.";

export const Route = createFileRoute("/contrapest")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: ContraPestPage,
});

const WHAT_IT_IS = [
  "Mechanism: targets ovarian function in females (reducing viable eggs) and disrupts sperm production in males.",
  "Active compounds: 4-vinylcyclohexene diepoxide (VCD) and triptolide.",
  "Delivered as a liquid bait — rats encounter it as a water source.",
  "Acts as a contraceptive, not a sterilant — rats must continue consuming for ongoing suppression.",
  "Received EPA registration in August 2016 — the first commercial approval of its kind.",
  "Approved for General Use by the New York State DEC, expanding commercial availability.",
];

const NYC_BULLETS = [
  "City-funded and city-operated, run through DOHMH and DSNY.",
  "Runs in designated geographic zones — does not proactively cover private commercial buildings.",
  "Uses ContraPest pellets (updated formulation), not the original liquid in specialized dispensers.",
  "If your building is in a rat mitigation zone, you may benefit indirectly — but you are not enrolled unless you specifically engaged DOHMH.",
];

const BRYANT_REASONS = [
  "Open outdoor environment with unrestricted competing food sources.",
  "No Phase 1 knockdown — the active population was already at full density.",
  "No monitoring to confirm consumption was occurring at necessary levels.",
  "No container trash management to reduce food competition.",
];

const QA = [
  {
    q: "Is ContraPest available commercially?",
    a: "Yes. SenesTech sells direct and through distributors, including Bug Off Pest Control in NYC.",
  },
  {
    q: "Does ContraPest require a license to use?",
    a: "The full commercial liquid system does. Retail starter kits are available to consumers.",
  },
  {
    q: "Is ContraPest the same as rat birth control pills?",
    a: "No — it's a liquid bait consumed voluntarily, not administered directly to individual rats.",
  },
  {
    q: "Does NYC's program protect my building?",
    a: "Only if you're in a designated rat mitigation zone, and even then only indirectly. The city program does not enroll private buildings.",
  },
  {
    q: "What's the difference between ContraPest and Evolve?",
    a: "Different formulations from the same maker. See the full comparison page below.",
  },
];

function ContraPestPage() {
  return (
    <>
      <SolutionHero
        eyebrow="ContraPest"
        headline="ContraPest: What NYC's Rat Birth Control Program Uses — And What It Means for Your Building"
        lede="ContraPest is a liquid rodent contraceptive made by SenesTech. It's the first and only EPA-registered contraceptive for both male and female rats. Unlike poison rodenticides, it does not kill — it reduces reproductive capacity."
        image={heroImg}
        ctaLabel="Start the program"
      />

      {/* WHAT CONTRAPEST IS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What ContraPest is"
            title="The first EPA-registered rat contraceptive."
          />
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {WHAT_IT_IS.map((b) => (
              <li
                key={b}
                className="rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="container-site max-w-4xl">
          <SplitFigure imageSide="right"
            image={nycMitigationMap}
            alt="Map of NYC Rat Mitigation Zones across Manhattan and the Bronx"
            caption="NYC Rat Mitigation Zones — where fertility control delivers the most leverage."
          />
        </div>
      </section>

      {/* NYC PROGRAM */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="NYC's ContraPest program"
            title="Designated mitigation zones, run by the city."
            intro={
              <p>
                The New York City Council passed a rat contraceptive pilot
                bill in October 2024. Deployment in designated rat mitigation
                zones began in April 2025.
              </p>
            }
          />
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {NYC_BULLETS.map((b) => (
              <li
                key={b}
                className="rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BRYANT PARK */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Why the Bryant Park pilot failed"
            title="Structural failure, not pharmacological."
            intro={
              <>
                <p>
                  NYC tried ContraPest in Bryant Park. It did not produce
                  measurable results. This is widely reported and frequently
                  misread as meaning ContraPest — or fertility control
                  generally — does not work. The mechanism is sound. The
                  deployment structure failed.
                </p>
                <p>
                  Managed programs in controlled urban building environments
                  have produced 79% reduction in monitored activity over five
                  months using the same biological mechanism, just a
                  different deployment structure.{" "}
                  <Link
                    to="/does-rat-birth-control-work"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    Full analysis →
                  </Link>
                </p>
              </>
            }
          />
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {BRYANT_REASONS.map((b) => (
              <li
                key={b}
                className="rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="container-site max-w-4xl">
          <SplitFigure imageSide="left"
            image={contrapestVsEvolve}
            alt="ContraPest dispenser system beside Evolve soft-bait packaging"
            caption="ContraPest liquid bait alongside Evolve soft bait — both EPA-registered contraceptives."
          />
        </div>
      </section>

      {/* CONTRAPEST VS EVOLVE */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="ContraPest vs. Evolve"
            title="Different formulations from the same maker."
            intro={
              <p>
                ContraPest is liquid, EPA-registered, uses specialized
                dispensers, and powers city infrastructure programs.{" "}
                <Link
                  to="/evolve-rodent-birth-control"
                  className="text-brand underline-offset-2 hover:underline"
                >
                  Evolve
                </Link>{" "}
                is solid soft bait, EPA 25(b) minimum risk, designed for
                standard bait stations in building deployments. NYC's city
                program uses ContraPest. Cloakd's managed program deploys
                Evolve.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                ContraPest
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>Liquid, EPA-registered.</li>
                <li>Specialized dispensers required.</li>
                <li>City infrastructure programs (NYC, subway trials).</li>
                <li>Original commercial product (2016).</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">Evolve</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>Solid soft bait, EPA 25(b) minimum risk.</li>
                <li>Standard tamper-resistant bait stations.</li>
                <li>Managed building deployment programs.</li>
                <li>No special permits in food-handling spaces.</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            <Link
              to="/contrapest-vs-evolve"
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              See the full comparison →
            </Link>
          </p>
        </div>
      </section>

      {/* COMMERCIAL OPERATORS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What ContraPest means for commercial operators"
            title="The city program raised awareness. It doesn't cover your building."
            intro={
              <>
                <p>
                  NYC's program and ContraPest's EPA registration created
                  general awareness that fertility control is a real
                  category. But the practical reality for most commercial
                  operators is narrower than the headlines suggest.
                </p>
              </>
            }
          />
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {[
              "The city program covers designated zones, not individual properties on request.",
              "ContraPest liquid requires commercial applicator licensing and specialized equipment.",
              "Most commercial operators are better served by a managed Evolve program.",
              "Standard Pest Management offers rodent fertility control as a service. So does Cloakd.",
            ].map((b) => (
              <li
                key={b}
                className="rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="container-site max-w-4xl">
          <SplitFigure imageSide="right"
            image={operatorStation}
            alt="Gloved operator opening a ContraPest bait station during a service visit"
            caption="Operator servicing a ContraPest station during a scheduled visit."
          />
        </div>
      </section>

      {/* CLOAKD VS STANDARD */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Cloakd's program"
            title="Cloakd deploys Evolve, not ContraPest liquid."
            intro={
              <>
                <p>
                  The differences that matter for operators: standard bait
                  stations (no specialized equipment), EPA minimum risk (no
                  special permits in food-handling spaces), monthly site
                  visits with track count documentation, and no requirement
                  to drop your existing exterminator.
                </p>
                <p>
                  Managed monthly program — Cloakd handles deployment and
                  tracking.{" "}
                  <Link
                    to="/rodent-fertility-control"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    Program details →
                  </Link>
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* QA */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Common questions about ContraPest"
            title="What operators ask after they hear about NYC's program."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {QA.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-bold leading-tight">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        title="Get fertility control deployed in your building."
        body="Cloakd runs a managed Evolve program in NYC, NJ, and the Bay Area. Tell us about your property and we'll put together the deployment outline."
        primary={{ label: "Start the program", to: "/get-started" }}
        secondary={{
          label: "ContraPest vs. Evolve",
          to: "/contrapest-vs-evolve",
        }}
      />
    </>
  );
}
