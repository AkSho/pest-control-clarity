import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/program-how-it-works.jpg";
import { breadcrumbJsonLd, canonicalLink, faqJsonLd, jsonLdScript } from "@/lib/seo";
import {
  ClosingCta,
  FieldDataTrio,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE =
  "Rodent Fertility Control: Managed Evolve Deployment in NYC, NJ & the Bay Area | Cloakd";
const DESCRIPTION =
  "Cloakd's managed rodent fertility control program. Monthly Evolve bait station deployment, track count monitoring, and a documented record — layered onto your existing pest control vendor.";

export const Route = createFileRoute("/rodent-fertility-control")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/rodent-fertility-control"),
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          {
            name: "Rodent Fertility Control",
            path: "/rodent-fertility-control",
          },
        ]),
      ),
      jsonLdScript(faqJsonLd(QA)),
    ],
  }),
  component: ProgramPage,
});

const INCLUDED = [
  "Monthly site visits with bait station checks and replenishment.",
  "Tracking plates at each station — track counts recorded against a Week 1 baseline.",
  "Coordination with your existing licensed PCO for Phase 1 knockdown.",
  "Documented monthly record — the trend line you can hand to an inspector.",
  "Month-to-month agreement. No long-term contract.",
];

const QA = [
  {
    q: "What is rodent fertility control?",
    a: "It's a category of rodent management that suppresses reproduction instead of killing existing rats. The point is to stop the replacement colony from forming after a knockdown, so the population doesn't refill the cleared territory at full breeding rate.",
  },
  {
    q: "Does Cloakd replace my exterminator?",
    a: "No. Your existing pest control vendor handles Phase 1 knockdown and ongoing treatment. Cloakd runs the fertility management layer alongside that contract.",
  },
  {
    q: "What product does the program use?",
    a: "Evolve bait, made by SenesTech. EPA 25(b) minimum risk, deployed in standard tamper-resistant bait stations.",
  },
  {
    q: "How long until results show up?",
    a: "The 90-day program produces a documented trend line. Measurable population reduction typically begins at 4–8 weeks of consistent consumption.",
  },
];

function ProgramPage() {
  return (
    <>
      <SolutionHero
        eyebrow="Rodent fertility control"
        headline="A managed monthly fertility control program — layered onto your existing exterminator."
        lede="Cloakd handles deployment and tracking of Evolve bait stations across your property. Monthly maintenance, track count monitoring, documented record. Your current pest control vendor keeps their contract."
        image={heroImg}
        ctaLabel="Start the program"
      />

      {/* WHAT IT IS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What rodent fertility control is"
            title="Stop the replacement colony before it forms."
            intro={
              <>
                <p>
                  Standard pest treatment removes the rats that are there.
                  Within four to eight weeks, surrounding rats detect the
                  open territory and move in. Fertility management changes
                  what happens during that window — the new group can't
                  breed at full rate, so the colony doesn't re-establish at
                  full size.{" "}
                  <Link
                    to="/how-it-works"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    Full mechanism →
                  </Link>
                </p>
                <p>
                  The program uses{" "}
                  <Link
                    to="/evolve-rodent-birth-control"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    Evolve bait
                  </Link>{" "}
                  in standard bait stations, deployed after a Phase 1
                  knockdown handled by your existing pest control vendor.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* MANAGED VS DIY */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Managed vs. DIY"
            title="Same product. Different structure. Different outcome."
            intro={
              <p>
                Retail Evolve kits are available at Lowe's, Home Depot, and
                Amazon. Whether you get results depends on deployment
                structure — Phase 1 knockdown, station placement on travel
                paths, monthly replenishment, and track count monitoring.{" "}
                <Link
                  to="/vs/diy-rat-birth-control"
                  className="text-brand underline-offset-2 hover:underline"
                >
                  DIY vs. managed program →
                </Link>
              </p>
            }
          />
        </div>
      </section>

      {/* FIELD DATA */}
      <FieldDataTrio
        intro="Field data from two independent urban building deployments running the same managed structure used by Cloakd's program."
        footnote={
          <>
            <Link
              to="/results"
              className="text-brand underline-offset-2 hover:underline"
            >
              Full field results →
            </Link>
          </>
        }
      />

      {/* WHAT'S INCLUDED */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What's included"
            title="Managed monthly program — deployment and tracking handled."
          />
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {INCLUDED.map((b) => (
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

      {/* QA */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Common questions"
            title="What operators ask before they enroll."
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
        title="The cycle ends when you hit it from both ends."
        body="Evolve bait station deployment for NYC, NJ, and Bay Area commercial properties. EPA 25(b) minimum-risk product. Documented track count monitoring every cycle."
        primary={{ label: "Get started", to: "/get-started" }}
        secondary={{ label: "See how it works", to: "/how-it-works" }}
      />
    </>
  );
}
