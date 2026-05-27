import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-bait-station.jpg";
import { breadcrumbJsonLd, canonicalLink, jsonLdScript } from "@/lib/seo";
import {
  ClosingCta,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TITLE = "Where to Buy Evolve Rodent Birth Control | Cloakd";
const DESCRIPTION =
  "Evolve soft bait is available at Lowe's, Home Depot, Amazon, and through Cloakd. Cloakd carries rat and mouse starter kits, refills, and a replenishment plan — with a deployment guide in every order.";

export const Route = createFileRoute("/where-to-buy-evolve")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/where-to-buy-evolve"),
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Where to Buy Evolve", path: "/where-to-buy-evolve" },
        ]),
      ),
    ],
  }),
  component: WhereToBuyPage,
});

const STARTER_KITS: {
  name: string;
  size: string;
  price: string;
  sub: string | null;
  desc: string;
}[] = [
  {
    name: "Starter Kit — Rat",
    size: "6 lb",
    price: "$179",
    sub: null,
    desc: "Evolve Rat soft bait and locking bait stations. For Norway rats and roof rats.",
  },
  {
    name: "Starter Kit — Mouse",
    size: "6 lb",
    price: "$179",
    sub: null,
    desc: "Evolve Mouse soft bait and locking bait stations. For house mice.",
  },
];

const REFILLS: {
  name: string;
  size: string;
  price: string;
  sub: string | null;
  desc: string;
}[] = [
  {
    name: "Refill — Rat",
    size: "6 lb",
    price: "$149",
    sub: "$129 every 60 days on replenishment plan",
    desc: "Evolve Rat refill for existing stations. Covers a standard 60-day cycle.",
  },
  {
    name: "Refill — Mouse",
    size: "6 lb",
    price: "$149",
    sub: "$129 every 60 days on replenishment plan",
    desc: "Evolve Mouse refill for existing stations. Covers a standard 60-day cycle.",
  },
  {
    name: "Refill — Rat",
    size: "12 lb",
    price: "$249",
    sub: "$219 every 90 days on replenishment plan",
    desc: "For higher-pressure sites or multi-building coverage. 90-day supply.",
  },
];

const CLOAKD_DIFF = [
  {
    title: "Rat and mouse formulas, clearly separated",
    body: "Evolve has separate formulas for rats and mice. Choosing the wrong one reduces feeding consistency. Cloakd carries both with clear product pages for each pressure type.",
  },
  {
    title: "Locking stations included in the starter kit",
    body: "Each starter kit includes tamper-resistant locking bait stations. If you already have stations, order a refill instead.",
  },
  {
    title: "Deployment guide with every order",
    body: "Placement is what determines whether Evolve produces results. Every Cloakd order ships with a guide covering station placement along travel paths, spacing, and replenishment schedule.",
  },
  {
    title: "Replenishment plan",
    body: "Evolve works through repeated feeding across multiple weeks. The replenishment plan ships automatically every 60 or 90 days so stations stay stocked without a manual reorder.",
  },
];

function SkuCard({
  name,
  size,
  price,
  sub,
  desc,
  to,
}: {
  name: string;
  size: string;
  price: string;
  sub: string | null;
  desc: string;
  to: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold leading-tight">{name}</h3>
        <span className="shrink-0 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          {size}
        </span>
      </div>
      <p className="mt-2 grow text-sm leading-relaxed text-muted-foreground">
        {desc}
      </p>
      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <div className="text-2xl font-extrabold">{price}</div>
          {sub && (
            <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>
          )}
        </div>
        <Button asChild size="sm">
          <Link to={to}>
            Buy <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function WhereToBuyPage() {
  return (
    <>
      <SolutionHero
        eyebrow="Where to buy Evolve"
        headline="Cloakd sells Evolve starter kits and refills for rats and mice."
        lede="Evolve soft bait is available at Lowe's, Home Depot, and Amazon. Cloakd carries rat and mouse starter kits, 6 lb and 12 lb refills, and a replenishment plan. Every order ships with a deployment guide."
        image={heroImg}
        ctaLabel="Shop starter kits"
      />

      {/* STARTER KITS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Starter kits"
            title="Includes Evolve soft bait and locking bait stations."
            intro={
              <p>
                Start here if you don't have bait stations. Rat and mouse
                formulas are sold separately. Pick the one that matches the
                pressure you're dealing with.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {STARTER_KITS.map((s) => (
              <SkuCard key={s.name} {...s} to="/products/starter-kit" />
            ))}
          </div>
        </div>
      </section>

      {/* REFILLS */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Refills"
            title="For existing stations. Available in 6 lb and 12 lb."
            intro={
              <p>
                If you have bait stations already, order refills. The 6 lb
                covers standard pressure at 60-day intervals. The 12 lb rat
                refill is better for higher-pressure sites or multiple
                buildings.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REFILLS.map((r) => (
              <SkuCard
                key={`${r.name}-${r.size}`}
                {...r}
                to="/products/refill"
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHAT CLOAKD ADDS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What's different about ordering from Cloakd"
            title="Same product. Here's what comes with it."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {CLOAKD_DIFF.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-bold leading-tight">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        title="Start with the kit that matches your pressure type."
        body="Rat or mouse starter kit for new deployments. Refills for existing stations. Replenishment plan to keep stations stocked automatically."
        primary={{ label: "Shop starter kits", to: "/products/starter-kit" }}
        secondary={{ label: "Shop refills", to: "/products/refill" }}
      />
    </>
  );
}
