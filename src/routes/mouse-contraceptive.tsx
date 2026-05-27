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
  "Mouse Contraceptive: What It Is, How It Works, and What Products Exist | Cloakd";
const DESCRIPTION =
  "A mouse contraceptive reduces how fast a mouse population replaces itself. Evolve Mouse is a cottonseed-derived EPA 25(b) minimum-risk soft bait — the only retail mouse contraceptive available without a commercial applicator license.";

export const Route = createFileRoute("/mouse-contraceptive")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/mouse-contraceptive"),
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Mouse Contraceptive", path: "/mouse-contraceptive" },
        ]),
      ),
      jsonLdScript(faqJsonLd(QA)),
    ],
  }),
  component: MouseContraceptivePage,
});

const HOW_IT_WORKS = [
  {
    title: "Reduces reproduction, not the active colony",
    body: "Mice that consume the bait regularly produce fewer offspring. Males produce less viable sperm. Females have fewer litters and smaller litter sizes. The colony doesn't die off — it stops growing.",
  },
  {
    title: "Works on the replacement cycle",
    body: "Standard pest control removes the active population. Within 4 to 6 weeks, surrounding mice fill the open territory. A mouse contraceptive deployed after knockdown reduces how fast that replacement colony forms.",
  },
  {
    title: "Builds over multiple weeks",
    body: "The effect is cumulative. Consistent consumption over 4 to 8 weeks is what produces a measurable population decline. House mice reproduce faster than rats — fertility control has more leverage at each breeding cycle.",
  },
];

const PRODUCTS = [
  {
    name: "Evolve Mouse (solid soft bait)",
    maker: "SenesTech",
    status: "EPA 25(b) minimum risk",
    delivery: "Standard tamper-resistant bait stations",
    availability: "Starter kits and refills available from Cloakd",
    highlight: true,
  },
  {
    name: "ContraPest (liquid)",
    maker: "SenesTech",
    status: "EPA-registered pesticide",
    delivery: "Specialized liquid dispensers",
    availability: "Commercial applicators; also available in some retail channels",
    highlight: false,
  },
];

const QA = [
  {
    q: "What is a mouse contraceptive?",
    a: "A mouse contraceptive is a product that reduces house mouse reproduction rates. Mice that consume it regularly produce fewer viable offspring. The population can't replace itself at its normal rate after a knockdown clears the active colony.",
  },
  {
    q: "What mouse contraceptives are available?",
    a: "SenesTech makes two products: ContraPest (liquid, EPA-registered) and Evolve Mouse (solid soft bait, EPA 25(b) minimum risk). Evolve Mouse is the only one available as a retail starter kit without a commercial applicator license.",
  },
  {
    q: "Does a mouse contraceptive kill mice?",
    a: "No. Neither Evolve Mouse nor ContraPest kills mice. They reduce reproduction rates. The existing colony is cleared by standard knockdown — the contraceptive handles what comes next.",
  },
  {
    q: "Where can I buy a mouse contraceptive?",
    a: "Evolve Mouse starter kits and refills are available from Cloakd. The starter kit includes Evolve Mouse soft bait and locking bait stations. Refills ship on a 60-day replenishment plan.",
  },
  {
    q: "Is a mouse contraceptive safe around food?",
    a: "Evolve Mouse is EPA 25(b) minimum risk — the same category as products derived from cloves or citronella. No special permits required for food-handling environments. No secondary kill risk to pets or wildlife.",
  },
  {
    q: "Is Evolve Mouse different from Evolve Rat?",
    a: "Yes. SenesTech makes separate formulations for rats and mice. Both use a gossypol mechanism, but the mouse formula is calibrated for Mus musculus. Use the formula that matches your target species.",
  },
];

function MouseContraceptivePage() {
  return (
    <>
      <SolutionHero
        eyebrow="Mouse contraceptive"
        headline="Mouse Contraceptive: What It Is, How It Works, and What Products Are Available"
        lede="A mouse contraceptive reduces how fast a mouse population replaces itself after a knockdown. Evolve Mouse is the cottonseed-derived EPA 25(b) minimum-risk soft bait designed for this — available without a commercial applicator license."
        image={heroImg}
        ctaLabel="Shop the mouse starter kit"
      />

      {/* HOW IT WORKS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="How a mouse contraceptive works"
            title="It stops the replacement colony from forming at full size."
            intro={
              <p>
                Standard knockdown clears the mice that are active. The
                territory empties, and surrounding colonies fill it within
                4 to 6 weeks at full breeding rate. A mouse contraceptive
                targets that window — not the active population, but the
                one that comes next.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {HOW_IT_WORKS.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-bold leading-tight">{h.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Available products"
            title="Two mouse contraceptives on the market. Both from SenesTech."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PRODUCTS.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-7 shadow-[var(--shadow-card)] ${
                  p.highlight
                    ? "border-brand/40 bg-brand-soft"
                    : "border-border bg-card"
                }`}
              >
                <h3 className="text-xl font-extrabold leading-tight">
                  {p.name}
                </h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  <li>
                    <span className="font-semibold text-foreground">
                      Maker:
                    </span>{" "}
                    {p.maker}
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">
                      EPA status:
                    </span>{" "}
                    {p.status}
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">
                      Delivery:
                    </span>{" "}
                    {p.delivery}
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">
                      Available:
                    </span>{" "}
                    {p.availability}
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm">
            <Link
              to="/contrapest-vs-evolve"
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              Full comparison: ContraPest vs. Evolve →
            </Link>
          </p>
        </div>
      </section>

      {/* QA */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Questions about mouse contraceptives"
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
        title="Evolve Mouse is the only retail mouse contraceptive available without a commercial applicator license."
        body="Cloakd sells Evolve Mouse starter kits and refills. The starter kit includes bait and locking stations. Refills keep stations stocked through the next cycle."
        primary={{ label: "Shop the mouse starter kit", to: "/products/starter-kit" }}
        secondary={{
          label: "How Evolve Mouse works",
          to: "/evolve-mouse-birth-control",
        }}
      />
    </>
  );
}
