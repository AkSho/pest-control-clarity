import { createFileRoute, Link } from "@tanstack/react-router";
import { canonicalLink } from "@/lib/seo";
import {
  Check,
  ArrowRight,
  Building2,
  UtensilsCrossed,
  Warehouse,
  Home as HomeIcon,
  ChefHat,
  Users,
  Beaker,
  Lock,
  Layers,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LeadForm } from "@/components/site/LeadForm";
import { HeroTrustBadges } from "@/components/site/TrustBadges";
import { PressStrip } from "@/components/site/PressStrip";
import { AboutSection } from "@/components/site/AboutSection";
import { ReviewsGrid } from "@/components/site/ReviewsGrid";
import { WhoWeServeGrid } from "@/components/site/WhoWeServeGrid";
import heroImg from "@/assets/hero-bait-station.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Evolve Rodent Birth Control for Returning Rats & Mice | Cloakd" },
      {
        name: "description",
        content:
          "Rodents keep coming back when standard treatment clears the territory but not the replacement cycle. Cloakd sells Evolve starter kits and refills with placement guidance for rats and mice.",
      },
      { property: "og:title", content: "Evolve Rodent Birth Control for Returning Rats & Mice | Cloakd" },
      {
        property: "og:description",
        content:
          "Rodents keep coming back when standard treatment clears the territory but not the replacement cycle. Cloakd sells Evolve starter kits and refills with placement guidance for rats and mice.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    links: canonicalLink("/"),
  }),
  component: HomePage,
});

const STATS = [
  {
    value: "79%",
    label: "reduction in rodent track presence",
    sub: "Location A — 5-month urban field study, Aug 2025 to Jan 2026",
  },
  {
    value: "88%",
    label: "drop in track density",
    sub: "Same location — tracks per plate declined even where rodents still present",
  },
  {
    value: "79%+",
    label: "reduction at second monitored site",
    sub: "Location B — independent deployment, 5-month monitoring window",
  },
];

const SERVICES = [
  {
    icon: Beaker,
    title: "Evolve soft bait",
    body: "EPA-designated minimum-risk soft bait. Rats and mice that feed regularly reproduce at a fraction of their normal rate. The replacement population can't form at full size.",
  },
  {
    icon: Lock,
    title: "Locking bait stations",
    body: "Included in the starter kit. Stations lock so Evolve stays accessible to rodents and protected from children and pets. Placement along travel paths drives feeding consistency.",
  },
  {
    icon: Layers,
    title: "Rat and mouse formulas",
    body: "Evolve has separate formulas for rats and mice. Both are available in the starter kit and as 6 lb refills. The 12 lb rat refill covers higher-pressure sites.",
  },
  {
    icon: RefreshCw,
    title: "Replenishment supply",
    body: "Evolve works through repeated feeding. Refills are available in 6 lb and 12 lb sizes. A replenishment plan ships automatically every 60 or 90 days so stations stay stocked without reordering.",
  },
];

const WHO = [
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    desc: "One rodent sighting is a critical NYC violation (04K / 04L). One temporary closure costs $15K–$50K in lost revenue.",
    badge: "$300–$2,000 per violation",
  },
  {
    icon: Building2,
    title: "Property Managers",
    desc: "Tenant complaints don't stop until the population does. One program across every address you manage.",
    badge: "Multi-building coverage",
  },
  {
    icon: ChefHat,
    title: "Ghost Kitchens",
    desc: "High-density buildings, constant food cycling, no locked-in pest contracts. We work directly with operators.",
    badge: "No vendor displacement",
  },
  {
    icon: Warehouse,
    title: "Food Storage & Cold Chain",
    desc: "Continuous product flow makes traditional knockdown a treadmill. Fertility control compounds reductions across cycles.",
    badge: "Compliance documentation",
  },
  {
    icon: Users,
    title: "HOAs & Co-ops",
    desc: "Board-friendly reporting, predictable monthly billing, shared visibility across the property.",
    badge: "Board-ready reports",
  },
  {
    icon: HomeIcon,
    title: "Residential",
    desc: "Brownstones, townhouses, and managed residential blocks where standard exterminators keep coming back.",
    badge: "Month-to-month",
  },
];

const PROCESS = [
  {
    n: "1",
    title: "Identify pressure points",
    body: "Walk the property and mark where rodents travel, feed, and shelter. Bait station placement along those paths drives how consistently rodents encounter Evolve.",
  },
  {
    n: "2",
    title: "Phase 1 — Knockdown",
    body: "Your existing exterminator clears the active population. Standard treatment does this correctly.",
  },
  {
    n: "3",
    title: "Phase 2 — Keep Evolve available",
    body: "Evolve soft bait sits in locked stations along rodent travel paths. Repeated feeding matters, so placement and refills are part of the plan.",
  },
  {
    n: "4",
    title: "Keep stations stocked",
    body: "Check and refill stations on a regular schedule. Activity drops across breeding cycles as the replacement population can't form at full size.",
  },
];

const FAQS = [
  {
    q: "Why doesn't standard pest control solve this on its own?",
    a: "Knockdown clears the territory. In a food-dense urban block, surrounding colonies detect the empty space and move in within 4 to 8 weeks at full breeding capacity. The number returns to baseline indefinitely.",
  },
  {
    q: "Do you replace my current pest control vendor?",
    a: "No. Evolve is designed to work alongside knockdown and exclusion. Both handle different parts of the problem and neither is redundant.",
  },
  {
    q: "Is the bait safe around food, staff, pets, and wildlife?",
    a: "Yes. The active ingredient is EPA-designated minimum risk and derived from cottonseed plant compounds. There is no secondary kill risk to pets or wildlife and it is cleared for food-handling environments.",
  },
  {
    q: "How long until I see results?",
    a: "Knockdown is immediate. Fertility-driven reductions compound across breeding cycles — measurable drops typically appear within 60 to 120 days. Field studies showed 79% activity reduction over 5 months.",
  },
  {
    q: "Is there a long-term commitment on the replenishment plan?",
    a: "No. The replenishment plan ships every 60 or 90 days with no minimum commitment. Pause or cancel any time.",
  },
  {
    q: "What does it cost?",
    a: "The starter kit is $179 and includes Evolve soft bait and locking bait stations. Refills run $149 for 6 lb and $249 for the 12 lb rat size. The replenishment plan brings the 6 lb refill to $129 every 60 days.",
  },
];

function HeroPills() {
  const pills = ["Evolve starter kits", "Rat and mouse refills", "Placement guidance"];
  return (
    <div className="mt-7 flex flex-wrap gap-2">
      {pills.map((p) => (
        <span
          key={p}
          className="inline-flex items-center gap-2 rounded-full border border-ink-border bg-white/5 px-4 py-2 text-sm font-semibold text-ink-foreground"
        >
          <Check className="h-4 w-4 text-brand" />
          {p}
        </span>
      ))}
    </div>
  );
}

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden ink-section">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/70 to-ink/40" />
        <div className="container-site relative grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div>
            <HeroTrustBadges />

            <h1 className="mt-7 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              Every six weeks, the rodents are back.{" "}
              <span className="text-accent-warm">Evolve helps break that cycle.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Standard treatment clears the rodents you can see. The territory
              stays open, and nearby colonies move back in. Evolve rodent birth
              control works on the part standard treatment leaves alone:
              reproduction. Use it alongside traps, exclusion, or your current
              pest control so the next group does not rebuild at the same speed.
            </p>

            <HeroPills />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/products/starter-kit">
                  Shop Starter Kit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="h-12 px-6 text-base">
                <Link to="/products/refill">Shop Refills</Link>
              </Button>
              <a
                href="#contact"
                className="text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                Need help choosing?
              </a>
            </div>
          </div>

          <div id="contact">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* PRESS STRIP */}
      <PressStrip />

      {/* STATS */}
      <section id="data" className="bg-background py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Field data
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Real numbers from monitored deployments
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
              >
                <div className="text-5xl font-extrabold tracking-tight text-brand">
                  {s.value}
                </div>
                <div className="mt-3 text-base font-semibold">{s.label}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-surface py-20">
        <div className="container-site">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                How it works
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
                Two things have to happen for this to end
              </h2>
              <p className="mt-5 text-muted-foreground">
                Knockdown handles what is already active. Evolve handles what
                comes next. When stations stay stocked, the replacement cycle
                has less room to rebuild.
              </p>
              <Button asChild className="mt-8 h-11 px-6">
                <Link to="/products/starter-kit">Shop the starter kit</Link>
              </Button>
            </div>

            <ol className="space-y-4">
              {PROCESS.map((p) => (
                <li
                  key={p.n}
                  className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold">
                    {p.n}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <AboutSection />

      {/* SERVICES */}
      <section className="bg-background py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              The product · what's included
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Everything you need to start and maintain a fertility-control program
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" className="h-12 px-7">
              <Link to="/products/starter-kit">
                Shop the starter kit <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section id="who" className="bg-surface py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Who we serve
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Built for operators who can't afford another violation
            </h2>
          </div>

          <WhoWeServeGrid />
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Service areas
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
                Serving food-service operators and managed properties across NYC, NJ, &amp; CA
              </h2>
              <p className="mt-5 text-muted-foreground">
                Pick your area for local rodent pressure data and deployment notes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: "Manhattan, NY", slug: "manhattan-ny" },
                { label: "Brooklyn, NY", slug: "brooklyn-ny" },
                { label: "Queens, NY", slug: "queens-ny" },
                { label: "Bronx, NY", slug: "bronx-ny" },
                { label: "Staten Island, NY", slug: "staten-island-ny" },
                { label: "Jersey City, NJ", slug: "jersey-city-nj" },
                { label: "Newark, NJ", slug: "newark-nj" },
                { label: "Hoboken, NJ", slug: "hoboken-nj" },
                { label: "Elizabeth, NJ", slug: "elizabeth-nj" },
                { label: "San Francisco, CA", slug: "san-francisco-ca" },
                { label: "Oakland, CA", slug: "oakland-ca" },
                { label: "San Jose, CA", slug: "san-jose-ca" },
              ].map(({ label, slug }) => (
                <Link
                  key={label}
                  to="/areas/$areaSlug"
                  params={{ areaSlug: slug }}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold transition hover:border-brand hover:bg-brand-soft"
                >
                  {label}
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-brand" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Operator reviews
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              See why operators stay on the program
            </h2>
          </div>

          <ReviewsGrid />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background py-20">
        <div className="container-site grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Questions operators ask before starting
            </h2>
            <p className="mt-5 text-muted-foreground">
              Don't see yours?{" "}
              <a href="mailto:hello@cloakd-removals.cloud" className="font-semibold text-foreground underline">
                Email us
              </a>
              .
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="ink-section">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
              Start stocked. Keep the cycle from restarting.
            </h2>
            <p className="mt-5 max-w-xl text-ink-muted md:text-lg">
              Begin with the starter kit if you need locked stations. Use
              refills to keep Evolve available through the next feeding cycle.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/products/starter-kit">
                  Shop Starter Kit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="h-12 px-6 text-base">
                <Link to="/products/refill">Shop Refills</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-ink-border bg-white/5 p-6 backdrop-blur">
            <ul className="space-y-3 text-sm text-ink-foreground">
              {[
                "EPA-designated minimum-risk bait, safe for food-handling environments",
                "Separate rat and mouse formulas",
                "Starter kits include bait and locking stations",
                "Refills available on a 60 or 90-day replenishment plan",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
