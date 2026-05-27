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
  "Rodent Fertility Control: How Evolve Works and Where to Buy It | Cloakd";
const DESCRIPTION =
  "Rodent fertility control suppresses reproduction so the replacement colony can't form at full size. Evolve is the EPA 25(b) minimum-risk soft bait that does this. Cloakd sells starter kits and refills.";

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
  "Evolve soft bait — EPA 25(b) minimum risk, no synthetic chemicals, no secondary kill risk.",
  "Locking tamper-resistant bait stations — included in the starter kit.",
  "Rat and mouse formulas — available separately for the animal type causing pressure.",
  "Deployment guide — covers station placement, travel path identification, and replenishment schedule.",
  "Refill supply — 6 lb and 12 lb sizes, with a replenishment plan that ships every 60 or 90 days.",
];

const QA = [
  {
    q: "What is rodent fertility control?",
    a: "It's a category of rodent management that suppresses reproduction instead of killing existing rats. The point is to stop the replacement colony from forming after a knockdown, so the population doesn't refill the cleared territory at full breeding rate.",
  },
  {
    q: "Does Evolve replace my exterminator?",
    a: "No. Evolve is designed to work alongside knockdown and exclusion. Your existing pest control vendor handles what's already active. Evolve handles the replacement cycle.",
  },
  {
    q: "What product does the program use?",
    a: "Evolve bait, made by SenesTech. EPA 25(b) minimum risk, deployed in standard tamper-resistant bait stations.",
  },
  {
    q: "How long until results show up?",
    a: "Measurable population reduction typically begins at 4 to 8 weeks of consistent consumption. Field studies showed 79% reduction in track presence over five months.",
  },
];

function ProgramPage() {
  return (
    <>
      <SolutionHero
        eyebrow="Rodent fertility control"
        headline="Rodent Fertility Control: What It Is, How Evolve Works, and Where to Buy It"
        lede="Rodent fertility control suppresses reproduction so the replacement colony can't form at full size after a knockdown. Evolve is the EPA 25(b) minimum-risk soft bait designed for this. Cloakd sells starter kits and refills."
        image={heroImg}
        ctaLabel="Shop the starter kit"
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
            eyebrow="What determines results"
            title="Same product. Deployment structure determines the outcome."
            intro={
              <p>
                Whether Evolve produces a measurable population reduction
                depends on how it's deployed — Phase 1 knockdown first,
                stations placed on confirmed travel paths, and consistent
                replenishment. Cloakd ships a deployment guide with every
                order.{" "}
                <Link
                  to="/does-rat-birth-control-work"
                  className="text-brand underline-offset-2 hover:underline"
                >
                  Why Bryant Park failed and what's different →
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
            title="Everything in the Cloakd Evolve product lineup."
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
        title="The cycle ends when you stop the replacement from forming."
        body="Cloakd sells Evolve starter kits and refills for rats and mice. Start with the kit that matches your pressure type."
        primary={{ label: "Shop the starter kit", to: "/products/starter-kit" }}
        secondary={{ label: "How Evolve works", to: "/evolve-rodent-birth-control" }}
      />
    </>
  );
}
