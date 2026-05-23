import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Map,
  Microscope,
  Radar,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroUrban from "@/assets/hero-urban.jpg";

const TITLE = "Rodent Radar: Rat Birth Control Calculator & Rodent Activity Map | Cloakd";
const DESCRIPTION =
  "Use Rodent Radar to estimate rodent pressure, check local rat activity, and learn how fertility control fits into a practical rodent plan.";

export const Route = createFileRoute("/rodent-radar")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroUrban },
    ],
    links: [{ rel: "canonical", href: "https://cloakd-removals.cloud/rodent-radar" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Rodent Radar",
          applicationCategory: "UtilitiesApplication",
          description: DESCRIPTION,
          provider: {
            "@type": "Organization",
            name: "Cloakd",
          },
        }),
      },
    ],
  }),
  component: RodentRadarHub,
});

const TOOLS = [
  {
    icon: BarChart3,
    title: "Colony Calculator",
    body: "Saw one mouse or rat? Estimate what the signs may point to.",
    cta: "Estimate activity",
    to: "/rodent-radar/rodent-population-calculator",
  },
  {
    icon: Map,
    title: "Rat Pressure Map",
    body: "See where complaints, seasonality, and city signals are rising.",
    cta: "View map",
    to: "/rodent-radar/rat-pressure-map",
  },
  {
    icon: ShieldCheck,
    title: "Droppings & Exposure Checker",
    body: "Found rodent droppings? Get calm, CDC-based cleanup guidance.",
    cta: "Check exposure",
    to: "/rodent-radar/hantavirus-risk-checker",
  },
];

const SIGNALS = [
  {
    title: "Food access",
    body: "Trash, pet food, bird seed, restaurant waste, compost, and pantry access can raise pressure.",
  },
  {
    title: "Shelter",
    body: "Gaps, clutter, crawlspaces, burrows, sheds, garages, and shared walls give rodents cover.",
  },
  {
    title: "Weather",
    body: "Cold snaps, heavy rain, heat, construction, and trash disruption can move activity fast.",
  },
];

function RodentRadarHub() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-surface">
        <div className="container-site grid gap-8 py-8 md:grid-cols-[1fr_0.9fr] md:py-14 lg:gap-14">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand">
              <Radar className="h-3.5 w-3.5" />
              Rodent intelligence
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Rodent Radar
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Check local rodent pressure, estimate colony growth, and learn what to do next.
            </p>

            <div className="mt-7 rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="text-sm font-bold text-foreground">What are you dealing with?</div>
              <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Choose rodent">
                {["Rats", "Mice", "Not sure"].map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                      index === 0
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border bg-background text-foreground hover:border-brand/50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <label className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="h-12 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm font-semibold outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
                    placeholder="ZIP code or city"
                  />
                </label>
                <Button asChild className="h-12 rounded-xl px-4">
                  <Link to="/rodent-radar/rodent-population-calculator">Check</Link>
                </Button>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Built for homeowners, renters, property managers, and reporters tracking rodent activity.
              </p>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-border bg-card">
            <img
              src={heroUrban}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/15 via-ink/20 to-ink/80" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-white/90 p-4 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                    Current preview
                  </div>
                  <div className="mt-1 text-2xl font-bold leading-tight text-foreground">
                    Pressure changes by place and season.
                  </div>
                </div>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
                  <Activity className="h-7 w-7" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["Food", "Shelter", "Weather"].map((label) => (
                  <div key={label} className="rounded-xl bg-surface px-3 py-2 text-center">
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      {label}
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-brand/20">
                      <div className="h-full w-2/3 rounded-full bg-brand" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-site">
          <div className="grid gap-4 md:grid-cols-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.title}
                to={tool.to}
                className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <tool.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-bold tracking-tight text-foreground">
                  {tool.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tool.body}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">
                  {tool.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-site grid gap-10 md:grid-cols-[0.8fr_1fr]">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Why it changes
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Rodent pressure follows food, shelter, weather, and open territory.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              That is why activity can spike after cold snaps, heavy rain, construction,
              trash issues, or repeat trapping. Rodent Radar helps separate a one-off
              sighting from signs of a larger pattern.
            </p>
          </div>
          <div className="grid gap-3">
            {SIGNALS.map((signal) => (
              <div key={signal.title} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-bold text-foreground">{signal.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {signal.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-site">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand">
                  <Microscope className="h-4 w-4" />
                  Methodology
                </div>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Scores are useful, not magic.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Rodent Radar uses visible signs, timing, setting, seasonality, and
                  local data where available. When city complaint data is limited, we
                  say so clearly.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/why-it-keeps-coming-back">Why problems return</Link>
                </Button>
                <Button asChild className="rounded-full">
                  <Link to="/rodent-fertility-control">Learn fertility control</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
