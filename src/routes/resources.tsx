import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroResources from "@/assets/hero-resources.jpg";

const TITLE = "Resources — Cloakd Removals";
const DESCRIPTION =
  "Field data, plain-language explanations, and compliance guides for restaurants, property managers, and building operators in NYC and NJ.";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ResourcesPage,
});

type Featured = {
  category: string;
  title: string;
  body: string;
  href?: string;
  comingSoon?: boolean;
};

const FEATURED: Featured[] = [
  {
    category: "Biology & Mechanism",
    title: "Why rodents keep coming back after treatment",
    body: "The exterminator didn't fail. The biology of how rats claim territory is what keeps the cycle running. Standard treatment has no way to interrupt it. Here's what actually happens after treatment ends, and what changes the outcome.",
    href: "/why-it-keeps-coming-back",
  },
  {
    category: "Program Mechanics",
    title: "How the 90-day fertility management program works",
    body: "How Evolve changes the replacement math. The two-phase program and what each phase does. How track count monitoring shows the population is actually declining over 90 days.",
    comingSoon: true,
  },
  {
    category: "Common Questions",
    title: "Your exterminator has probably seen this fail. Here's why.",
    body: "PCOs are skeptical of rat fertility management for a reason. Most failed deployments share the same structure. Every question we hear about whether this actually works, answered directly.",
    href: "/faq",
  },
];

type Topic = {
  category: string;
  title: string;
  body: string;
  href?: string;
  comingSoon?: boolean;
};

const TOPICS: Topic[] = [
  {
    category: "Field Data",
    title: "Numbers from monitored urban deployments",
    body: "79% reduction in track presence. 88% drop in track density. Five months, two independent sites. The monitoring methodology and what the data shows.",
    href: "/results",
  },
  {
    category: "Restaurants",
    title: "DOHMH rodent violations: what the codes actually mean",
    body: "Codes 04K and 04L, critical violation points, the math on fines and temporary closure costs, and why every inspection is a timing game with standard treatment.",
    href: "/solutions/restaurants" as const,
  },
  {
    category: "Property Management",
    title: "Why treating one building increases pressure on the next",
    body: "Treating buildings one at a time keeps the problem moving across every address you manage. Here's why that happens and what actually stops it.",
    href: "/solutions/property-managers" as const,
  },
  {
    category: "Ghost Kitchens",
    title: "Shared food facilities and shared compliance exposure",
    body: "One rodent sighting in a ghost kitchen puts every brand operating under that roof at risk. Why shared food facilities are harder to protect.",
    href: "/solutions/ghost-kitchens" as const,
  },
  {
    category: "Comparisons",
    title: "What standard pest control doesn't address",
    body: "Your pest control vendor is doing their job correctly. The cycle keeps running anyway. Here's what standard treatment can't fix and why.",
    comingSoon: true,
  },
  {
    category: "Comparisons",
    title: "Rat poison and the replacement cycle",
    body: "Poison kills what's there. The replacement colony forms just as reliably. NYC restrictions on the strongest rat poisons, and why the cycle runs regardless.",
    comingSoon: true,
  },
  {
    category: "Research",
    title: "Does rat birth control work? NYC field data and deployment context",
    body: "NYC's Bryant Park pilot failed. Two independent urban building deployments showed 79% reduction over 5 months. What made the difference — and what it means for your property.",
    comingSoon: true,
  },
  {
    category: "Compliance",
    title: "DOHMH rodent violation NYC: codes 04K and 04L explained",
    body: "What the violation codes mean, how many points they carry, what inspectors look for, and what actually closes the vulnerability — not just the current citation.",
    comingSoon: true,
  },
  {
    category: "Compliance",
    title: "NJ rodent violations: how enforcement works without a letter grade",
    body: "NJ has no DOHMH equivalent. Municipal health departments enforce rodent violations under State Sanitary Code Part IV — permit suspension, imminent hazard classification, and fines up to $1,000/day.",
    comingSoon: true,
  },
  {
    category: "Compliance",
    title: "DOHMH code 04L: mouse violations carry the same weight as rat violations",
    body: "Code 04L is a critical violation — minimum 5 points, same as 04K. What inspectors look for, how 04K and 04L can be cited together, and how the two-phase program covers both species.",
    comingSoon: true,
  },
  {
    category: "Comparisons",
    title: "Snap traps vs. Cloakd: mechanical removal and the replacement cycle",
    body: "Snap traps catch what's there. The replacement colony forms on the same timeline regardless of how many traps are set. What the fertility layer adds to a trapping program.",
    comingSoon: true,
  },
  {
    category: "Comparisons",
    title: "DIY Evolve vs. managed program: why the product isn't the variable",
    body: "You can buy Evolve for $99. The deployments that failed — Bryant Park included — used the same mechanism. Here's what the DIY approach skips and why structure determines the outcome.",
    comingSoon: true,
  },
  {
    category: "Comparisons",
    title: "Assured Environments vs. Cloakd: the largest NYC pest control provider",
    body: "Assured Environments has 90 years of NYC commercial experience. Their exclusion, sanitation, and knockdown program is correct. The replacement cycle that refills treated territory is outside what any standard program covers.",
    comingSoon: true,
  },
  {
    category: "Comparisons",
    title: "Orkin Restaurant Precision Protection vs. Cloakd: the replacement cycle gap",
    body: "Orkin's Restaurant Precision Protection handles the active colony correctly. The biology that keeps refilling that territory four weeks later is what the fertility management layer addresses.",
    comingSoon: true,
  },
  {
    category: "Comparisons",
    title: "Bell Environmental vs. Cloakd: the Zero-Pest Zone System",
    body: "Bell Environmental's perimeter defense and mechanical trapping program has been running NYC commercial properties since 1963. The replacement colony that forms after elimination is the gap it can't close.",
    comingSoon: true,
  },
  {
    category: "Comparisons",
    title: "Viking Pest Control vs. Cloakd: SMART monitoring and replacement",
    body: "Viking's SMART digital monitoring is the most technologically advanced standard rodent program in NJ. Tracking the replacement population is one layer. Reducing its fertility is a different mechanism.",
    comingSoon: true,
  },
  {
    category: "Comparisons",
    title: "Western Pest Services vs. Cloakd: integrated pest management",
    body: "Western Pest Services has been running IPM programs across NJ and NYC since 1928. Board Certified Entomologists, minimum pesticide use, structural intervention. The fertility of the replacement colony is the one variable IPM isn't designed to address.",
    comingSoon: true,
  },
  {
    category: "Program",
    title: "What the 90-day program actually looks like: intake to final report",
    body: "Phase 1 coordination, Evolve deployment, three monthly monitoring visits, and what you receive at the end. Every step, what we need from you, and what you hand to an inspector.",
    comingSoon: true,
  },
];

function ArticleCard({
  category,
  title,
  body,
  href,
  comingSoon,
  large,
}: {
  category: string;
  title: string;
  body: string;
  href?: string;
  comingSoon?: boolean;
  large?: boolean;
}) {
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          {category}
        </p>
        {comingSoon && (
          <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
            Coming soon
          </Badge>
        )}
      </div>
      <h3
        className={`mt-3 font-extrabold leading-snug ${large ? "text-2xl md:text-3xl" : "text-lg"}`}
      >
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
      {!comingSoon && (
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          Read more <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </>
  );

  const className = `group flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition ${
    comingSoon
      ? "opacity-60 cursor-not-allowed"
      : "hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
  }`;

  if (comingSoon || !href) {
    return (
      <div className={className} aria-disabled="true">
        {inner}
      </div>
    );
  }
  // Use plain anchor to avoid TS complaints about dynamic typed routes
  return (
    <Link to={href} className={className}>
      {inner}
    </Link>
  );
}

function ResourcesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative ink-section overflow-hidden">
        <img
          src={heroResources}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
          width={1536}
          height={1024}
        />
        <div className="relative container-site py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-warm">
              Resources
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              How urban rodent control{" "}
              <span className="text-accent-warm">actually works.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/85 md:text-lg">
              Field data, plain-language explanations, and compliance guides
              for restaurants, property managers, and building operators in
              NYC and NJ. Starting with the questions that matter most.
            </p>
          </div>
        </div>
      </section>

      {/* START HERE */}
      <section className="bg-background py-20">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Start here
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
            The three reads that explain the program.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {FEATURED.map((r) => (
              <ArticleCard key={r.title} {...r} large />
            ))}
          </div>
        </div>
      </section>

      {/* BY TOPIC */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            By topic
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
            Field data, comparisons, compliance.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((r) => (
              <ArticleCard key={r.title} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ink-section">
        <div className="container-site py-16 text-center md:py-20">
          <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
            Ready to start the program?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-ink-muted md:text-lg">
            NYC and NJ. Tell us about your property and current pest control
            setup. First response within one business day.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link to="/get-started">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
