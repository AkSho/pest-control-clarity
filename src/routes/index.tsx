import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  ArrowRight,
  Building2,
  UtensilsCrossed,
  Warehouse,
  Home as HomeIcon,
  ChefHat,
  Users,
  TrendingDown,
  ClipboardCheck,
  Beaker,
  FileBarChart,
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
      { title: "Cloakd Removals — NYC & NJ Rodent Fertility Control" },
      {
        name: "description",
        content:
          "Standard pest control empties rodent territory. Surrounding colonies move back in within weeks. We layer EPA-designated minimum-risk fertility control on top of your existing program to break the replacement cycle. Serving NYC & NJ.",
      },
      { property: "og:title", content: "Cloakd Removals — Rodent Fertility Control for NYC & NJ" },
      {
        property: "og:description",
        content:
          "Break the rodent replacement cycle. EPA-designated minimum-risk fertility control, layered onto your existing pest program. Documented monthly reporting.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
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
    title: "Fertility Control Program",
    body: "EPA-designated minimum-risk soft bait. Rats that consume it reproduce at a fraction of normal rate. The replacement population can't form at full size.",
  },
  {
    icon: ClipboardCheck,
    title: "Site Inspection & Mapping",
    body: "We walk the property, identify pressure points and harborage, and map every bait station against your existing pest control deployment.",
  },
  {
    icon: TrendingDown,
    title: "Monthly Population Management",
    body: "Stations serviced and rebaited monthly. Track plates and activity monitored every cycle. The cycle stays broken instead of resetting.",
  },
  {
    icon: FileBarChart,
    title: "Documented Reporting",
    body: "Every visit is logged with track-density data and photos. The reports go to you. Show DOHMH, ownership, or franchise corporate any time.",
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
    title: "Walkthrough",
    body: "We assess pressure, map harborage, and align with whatever pest program you already run.",
  },
  {
    n: "2",
    title: "Phase 1 — Knockdown",
    body: "Your existing exterminator (or ours) clears the active population. Standard treatment does this correctly.",
  },
  {
    n: "3",
    title: "Phase 2 — Fertility Control",
    body: "We layer in EPA-designated minimum-risk soft bait. Reproduction rate drops within one breeding cycle.",
  },
  {
    n: "4",
    title: "Monthly Management",
    body: "Stations serviced, data captured, reports delivered. The replacement cycle never reforms at full size.",
  },
];

const FAQS = [
  {
    q: "Why doesn't standard pest control solve this on its own?",
    a: "Knockdown clears the territory. In a food-dense urban block, surrounding colonies detect the empty space and move in within 4 to 8 weeks at full breeding capacity. The number returns to baseline indefinitely.",
  },
  {
    q: "Do you replace my current pest control vendor?",
    a: "No. We layer fertility control on top of your existing program. Knockdown and fertility control do different jobs — neither one alone solves the cycle.",
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
    q: "Is this a long contract?",
    a: "No. The program runs month-to-month with documented reporting every cycle.",
  },
  {
    q: "What does it cost?",
    a: "Pricing depends on property type, square footage, and pressure level — most properties are within the same monthly range as their existing pest control spend. Request a walkthrough for an exact estimate.",
  },
];

function HeroPills() {
  const pills = ["Fertility Control", "Site Inspection", "Monthly Reporting"];
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
              <span className="text-accent-warm">We end that cycle.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Standard treatment clears the colony, and within weeks the
              territory fills again. Rodent fertility control suppresses the
              birth rate — the front standard treatment never touches. Run both
              and the replacement cycle breaks.
            </p>

            <HeroPills />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <a href="#contact">
                  Get started <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
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
                Neither one works without the other. Knockdown handles what's
                already there. Fertility control handles what comes next.
              </p>
              <Button asChild className="mt-8 h-11 px-6">
                <a href="#contact">Schedule a walkthrough</a>
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
              The Program · what's included
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              A complete rodent fertility control program for urban operators
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
              <a href="#contact">
                Get my program estimate <ArrowRight className="h-4 w-4" />
              </a>
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
                Month-to-month coverage, documented every cycle. Pick your area
                for local pressure data and program details.
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
              Start the program. Break the cycle.
            </h2>
            <p className="mt-5 max-w-xl text-ink-muted md:text-lg">
              The first visit covers setup, with monthly management and
              documented reporting running from there. The numbers are yours to
              show any regulator or property owner who asks.
            </p>
            <p className="mt-4 max-w-xl text-ink-muted md:text-lg">
              Serving food service operators and property managers across NYC
              and NJ, month-to-month, with results documented every cycle.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <a href="#contact">
                  Get started <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-ink-border bg-white/5 p-6 backdrop-blur">
            <ul className="space-y-3 text-sm text-ink-foreground">
              {[
                "Layered onto your existing pest program",
                "EPA-designated minimum-risk bait",
                "Documented monthly reporting",
                "Month-to-month, no long contracts",
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
