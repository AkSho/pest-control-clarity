import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/program-how-it-works.jpg";
import {
  breadcrumbJsonLd,
  canonicalLink,
  faqJsonLd,
  jsonLdScript,
} from "@/lib/seo";
import {
  ClosingCta,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE =
  "Evolve Mouse Birth Control: How It Works and How to Deploy It | Cloakd";
const DESCRIPTION =
  "Evolve Mouse is a cottonseed-derived soft bait that reduces house mouse reproduction rates. EPA 25(b) minimum risk. Available from Cloakd as a 6 lb starter kit or refill — sold separately from the rat formula.";

export const Route = createFileRoute("/evolve-mouse-birth-control")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/evolve-mouse-birth-control"),
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          {
            name: "Evolve Mouse Birth Control",
            path: "/evolve-mouse-birth-control",
          },
        ]),
      ),
      jsonLdScript(faqJsonLd(QA)),
    ],
  }),
  component: EvolveMousePage,
});

const MECHANISM = [
  {
    title: "In males",
    body: "Regular consumption reduces viable sperm production over several weeks. Their contribution to the next generation drops.",
  },
  {
    title: "In females",
    body: "Fewer litters, smaller litter sizes, and lower pup survival rates across the colony. House mice can produce up to 10 litters per year — fertility control has significant leverage at each cycle.",
  },
  {
    title: "Cumulative effect",
    body: "Builds over 4 to 8 weeks of consistent consumption. Mice do not develop aversion — they continue eating it after initial exposure.",
  },
];

const MOUSE_VS_RAT = [
  {
    title: "Shorter travel distances",
    body: "House mice typically travel 10 to 30 feet from their nest. Bait stations should be placed every 8 to 12 feet along active runways — closer spacing than for rats, which travel farther.",
  },
  {
    title: "Indoor nesting patterns",
    body: "Mice nest inside walls, behind appliances, and in stored goods. Stations placed indoors along wall junctions and behind equipment see more consistent feeding than outdoor placements.",
  },
  {
    title: "Higher reproduction rate",
    body: "House mice reproduce faster than rats. More breeding cycles per year means fertility control has more leverage — the replacement colony takes longer to form at full capacity.",
  },
  {
    title: "Separate formula required",
    body: "Evolve Mouse and Evolve Rat are different formulations from SenesTech. The mouse formula is calibrated for Mus musculus. Using the wrong formula reduces effectiveness.",
  },
];

const EPA_BULLETS = [
  "EPA 25(b) minimum risk — same classification as Evolve Rat.",
  "No synthetic chemicals. No secondary kill risk to pets, birds of prey, or wildlife.",
  "No special permit required for food-handling environments.",
  "Derived from gossypol, a naturally occurring compound in cottonseed.",
  "Safe for continuous use alongside other pest control methods.",
];

const QA = [
  {
    q: "Is Evolve Mouse different from Evolve Rat?",
    a: "Yes. SenesTech makes separate formulations for rats and mice. Both use the same gossypol mechanism, but the mouse formula is calibrated for Mus musculus. Use the formula that matches your target species.",
  },
  {
    q: "Can I use Evolve Rat for mice?",
    a: "No. Use the formula that matches your target species. Evolve Rat is for Norway rats and roof rats. Evolve Mouse is for house mice.",
  },
  {
    q: "How is mouse station placement different from rat placement?",
    a: "Mice travel shorter distances from their nest — typically 10 to 30 feet. Place stations every 8 to 12 feet along active runways, close to walls and behind appliances. Rat stations can be spaced further apart.",
  },
  {
    q: "Is Evolve Mouse safe in a restaurant kitchen?",
    a: "Yes. EPA 25(b) minimum risk classification means no synthetic chemicals and no special permits required for food-handling environments.",
  },
  {
    q: "How long until I see results with Evolve Mouse?",
    a: "The same mechanism applies as with the rat formula — effects build over 4 to 8 weeks of consistent consumption as the colony's reproduction rate drops.",
  },
];

function EvolveMousePage() {
  return (
    <>
      <SolutionHero
        eyebrow="Evolve mouse birth control"
        headline="Evolve Mouse Birth Control: What It Is, How It Works, and How to Deploy It"
        lede="Evolve Mouse is a soft bait rodent fertility control product made by SenesTech. The active ingredient is gossypol, derived from cottonseed. It does not kill mice. It reduces how fast they reproduce."
        image={heroImg}
        ctaLabel="Shop the mouse starter kit"
      />

      {/* MECHANISM */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="How Evolve Mouse works"
            title="A cottonseed-derived bait that suppresses mouse fertility. It does not kill."
            intro={
              <p>
                Evolve Mouse doesn't kill mice. It changes how many they can
                produce. The effect builds across a colony over 4 to 8 weeks
                of consistent consumption, and the population stops replacing
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

      {/* EPA */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="EPA 25(b) minimum risk"
            title="Same classification as Evolve Rat."
            intro={
              <p>
                Evolve Mouse carries the same EPA 25(b) minimum-risk status
                as the rat formula. That has the same practical consequences
                for deployment in food-handling environments.
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

      {/* MOUSE VS RAT DEPLOYMENT */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Mouse deployment vs. rat deployment"
            title="Mice travel differently. Placement adjusts accordingly."
            intro={
              <p>
                The same principles apply — Phase 1 knockdown first, stations
                on confirmed travel paths, consistent replenishment — but the
                specifics of placement are different for mice.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {MOUSE_VS_RAT.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-bold leading-tight">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE TO BUY */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Where to buy Evolve Mouse"
            title="Cloakd sells the mouse starter kit and 6 lb refill."
            intro={
              <>
                <p>
                  The starter kit includes Evolve Mouse soft bait and locking
                  bait stations. The 6 lb refill covers a standard 60-day
                  cycle and is available on a replenishment plan.
                </p>
                <p>
                  <Link
                    to="/products/starter-kit"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    Shop the mouse starter kit →
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
            eyebrow="Common questions about Evolve Mouse"
            title="What buyers ask before ordering."
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
        title="Mouse starter kit or refill — pick what fits your situation."
        body="New to Evolve Mouse? Start with the kit. Already have stations? Order a refill and keep them stocked."
        primary={{
          label: "Shop the mouse starter kit",
          to: "/products/starter-kit",
        }}
        secondary={{
          label: "See the rat formula",
          to: "/evolve-rodent-birth-control",
        }}
      />
    </>
  );
}
