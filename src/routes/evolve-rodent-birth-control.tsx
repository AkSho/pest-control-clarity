import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/program-how-it-works.jpg";
import {
  ClosingCta,
  FieldDataTrio,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE =
  "Evolve Rat Birth Control: How It Works, Deployment Requirements, and Field Results | Cloakd";
const DESCRIPTION =
  "Evolve is a cottonseed-derived EPA minimum risk fertility control bait for rats. What the mechanism is, what deployment structure produces results, and what the 79% urban field data actually shows.";

export const Route = createFileRoute("/evolve-rodent-birth-control")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: EvolvePage,
});

const SOURCE_FEB =
  "https://www.prnewswire.com/news-releases/senestech-reports-significant-reductions-in-rodent-activity-following-evolve-deployments-in-urban-field-studies-302691116.html";
const SOURCE_JUN =
  "https://www.prnewswire.com/news-releases/senestechs-evolve-rodent-birth-control-proven-in-urban-rodent-hotspots-from-hong-kong-to-san-francisco-302491716.html";

const MECHANISM = [
  {
    title: "In males",
    body: "Regular consumption reduces working sperm production over several weeks. Their contribution to the next generation drops.",
  },
  {
    title: "In females",
    body: "Fewer litters, smaller litter sizes, and lower pup survival rates across the colony.",
  },
  {
    title: "Cumulative effect",
    body: "Builds over 4–8 weeks of consistent consumption. Rats do not develop aversion — they continue eating it after initial exposure.",
  },
];

const EPA_BULLETS = [
  "Not a registered pesticide in the traditional sense — exempt from registration as a minimum-risk product.",
  "No synthetic chemicals. No secondary kill risk to pets, birds of prey, or wildlife.",
  "No special permit required for deployment in food-handling environments.",
  "Safe for continuous use in and adjacent to occupied spaces.",
  "Distinct from ContraPest (liquid, EPA-registered) — Evolve is the solid soft bait formulation.",
];

const CITIES = [
  {
    name: "New York City",
    body: "ContraPest pellets in designated rat mitigation zones since April 2025. Note: the city program uses ContraPest, not Evolve solid bait.",
    link: { to: "/contrapest", label: "NYC ContraPest program →" } as const,
  },
  {
    name: "Baltimore",
    body: "Adopted Evolve for its city-run rodent control program in 2025, run through the public health department.",
  },
  {
    name: "Chicago",
    body: "Wicker Park corridor deployment showed positive early results in March 2026.",
  },
  {
    name: "Hong Kong & San Francisco",
    body: "Independent field deployments, June 2025: sightings fell within three months, no new litters detected.",
  },
];

const QA = [
  {
    q: "Is Evolve the same as ContraPest?",
    a: "No — both are made by SenesTech, but ContraPest is a liquid EPA-registered contraceptive and Evolve is a solid soft bait classified EPA 25(b) minimum risk. Different formulations, different deployment contexts.",
  },
  {
    q: "Can I buy Evolve myself?",
    a: "Yes — retail kits are available at Lowe's, Home Depot, and Amazon. Whether you get results depends on deployment structure, not product access.",
  },
  {
    q: "How long does Evolve take to work?",
    a: "Measurable population decline typically appears at 4–8 weeks of consistent consumption. The 5-month urban field studies showed continued reduction through month 5.",
  },
  {
    q: "Is Evolve safe in a restaurant?",
    a: "Yes. EPA 25(b) minimum risk classification means no synthetic chemicals and no special permits required for food-handling spaces.",
  },
  {
    q: "Does Evolve work for mice?",
    a: "SenesTech makes a separate mouse formulation. Evolve Rat is specifically for Norway rats (Rattus norvegicus).",
  },
];

function EvolvePage() {
  return (
    <>
      <SolutionHero
        eyebrow="Evolve rat birth control"
        headline="Evolve Rat Birth Control: What It Is, What It Requires, and What the Data Shows"
        lede="Evolve is a soft bait rodent fertility control product made by SenesTech. The active ingredient is gossypol — a naturally occurring compound from cottonseed. It does not kill rats. It reduces their ability to reproduce."
        image={heroImg}
        ctaLabel="Start the program"
      />

      {/* WHAT EVOLVE IS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What Evolve is"
            title="A cottonseed-derived bait that suppresses rat fertility — not a poison."
            intro={
              <p>
                Evolve doesn't kill rats. It changes how many babies they can
                have. The effect is cumulative across a colony, and over 4–8
                weeks of consistent consumption the population stops replacing
                itself at its normal rate.
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
        </div>
      </section>

      {/* EPA 25(b) */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="EPA 25(b) minimum risk"
            title="What that classification actually means."
            intro={
              <p>
                Evolve is in the same EPA category as products made from
                cloves or citronella. That has practical consequences for
                where and how it can be deployed.
              </p>
            }
          />
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {EPA_BULLETS.map((b) => (
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

      {/* DEPLOYMENT STRUCTURE */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Deployment structure determines the outcome"
            title="Same product. Different structure. Different results."
            intro={
              <>
                <p>
                  This is the part that retail product listings don't cover.
                  Whether Evolve produces a measurable population reduction
                  depends almost entirely on how it's deployed — not on the
                  bait itself.
                </p>
                <p>
                  The Bryant Park pilot used a similar mechanism in an open
                  outdoor environment with no Phase 1 knockdown, unrestricted
                  competing food sources, and no monitoring. It failed.{" "}
                  <Link
                    to="/does-rat-birth-control-work"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    Full breakdown of why →
                  </Link>
                </p>
              </>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                What managed deployment requires
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <li>Phase 1 knockdown through a licensed PCO first.</li>
                <li>
                  Stations placed on confirmed travel paths, near entry
                  points, around the perimeter.
                </li>
                <li>Monthly station checks and bait replenishment.</li>
                <li>Track count monitoring against a documented baseline.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                The bait's role inside that structure
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                Stop the replacement colony from forming after knockdown.
                Evolve is not designed to reduce an active at-density
                population on its own — it's designed to keep the cleared
                territory from refilling at full breeding rate.{" "}
                <Link
                  to="/vs/diy-rat-birth-control"
                  className="text-brand underline-offset-2 hover:underline"
                >
                  DIY retail kit vs. managed program →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FIELD DATA */}
      <FieldDataTrio
        intro="Two independent urban building deployments over five months, plus consistent results across San Francisco and Hong Kong sites the prior year."
        footnote={
          <>
            Source:{" "}
            <a
              href={SOURCE_FEB}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline-offset-2 hover:underline"
            >
              SenesTech, Inc. — February 18, 2026
            </a>{" "}
            · additional 2025 results:{" "}
            <a
              href={SOURCE_JUN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline-offset-2 hover:underline"
            >
              SenesTech, Inc. — June 26, 2025
            </a>
          </>
        }
      />

      {/* CITY SCALE */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Where Evolve is deployed at city scale"
            title="Municipal and independent urban deployments, 2025–2026."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {CITIES.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-lg font-extrabold leading-tight">
                  {c.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {c.body}
                </p>
                {c.link && (
                  <Link
                    to={c.link.to}
                    className="mt-4 inline-block text-sm font-semibold text-brand underline-offset-2 hover:underline"
                  >
                    {c.link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVOLVE VS CONTRAPEST */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Evolve vs. ContraPest"
            title="Same maker. Different formulations."
            intro={
              <p>
                Both are made by SenesTech. ContraPest is liquid,
                EPA-registered, and used in city infrastructure programs.
                Evolve is solid soft bait, EPA 25(b) minimum risk, designed
                for managed bait station deployment in buildings.{" "}
                <Link
                  to="/contrapest-vs-evolve"
                  className="text-brand underline-offset-2 hover:underline"
                >
                  Full side-by-side comparison →
                </Link>
              </p>
            }
          />
        </div>
      </section>

      {/* CLOAKD SECTION */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Who deploys Evolve in NYC, NJ, and the Bay Area"
            title="Cloakd is a managed rodent fertility control program."
            intro={
              <>
                <p>
                  Cloakd handles deployment and tracking of Evolve as a
                  managed monthly program. Monthly site visits, bait station
                  maintenance, and track count documentation. Your existing
                  exterminator keeps their contract — Cloakd runs the
                  fertility management layer alongside it.
                </p>
                <p>
                  <Link
                    to="/rodent-fertility-control"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    See full program details →
                  </Link>
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* QA */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Common questions about Evolve"
            title="What people ask before they deploy it."
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
        title="Deploy Evolve as a managed program."
        body="Tell us about your property. We'll coordinate with your existing exterminator and run the fertility management layer with monthly station maintenance and track count documentation."
        primary={{ label: "Start the program", to: "/get-started" }}
        secondary={{
          label: "Compare to ContraPest",
          to: "/contrapest-vs-evolve",
        }}
      />
    </>
  );
}
