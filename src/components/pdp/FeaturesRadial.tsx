import { TrendingDown, ShieldCheck, BadgeCheck, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const BENEFITS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: TrendingDown,
    title: "Collapses Reproduction",
    body: "Targets the egg-laying cycle, not just individuals. The colony can't replace what it loses.",
  },
  {
    icon: ShieldCheck,
    title: "No Secondary Kill",
    body: "Cottonseed oil. Safe for hawks, owls, pets, and all non-target wildlife.",
  },
  {
    icon: BadgeCheck,
    title: "EPA Exempt",
    body: "FIFRA 25(b) minimum-risk formula. No restricted-use license required.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Suppression",
    body: "Population pressure drops each 60–90 day cycle. Every refill builds on the last.",
  },
];

function Tile({ icon: Icon, title, body }: (typeof BENEFITS)[0]) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10">
        <Icon className="h-5 w-5 text-brand" />
      </div>
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

export function FeaturesRadial() {
  return (
    <section className="container-site py-16">
      <div className="mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          Why Evolve works
        </span>
        <h2 className="mx-auto mt-2 max-w-xs text-3xl font-bold tracking-tight md:text-4xl">
          Attack the source, not the symptom
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground">
          Two independent urban field studies. 79% average population reduction. Measurable in 90 days.
        </p>
      </div>

      {/* Mobile: image top, 2×2 tiles below */}
      <div className="mt-10 sm:hidden">
        <div className="flex justify-center">
          <img
            src="/products/starter-kit-rat.png"
            alt="Evolve rodent fertility control bait"
            width={220}
            height={220}
            loading="lazy"
            className="h-auto w-[220px] object-contain"
          />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5">
          {BENEFITS.map((b) => (
            <Tile key={b.title} {...b} />
          ))}
        </div>
      </div>

      {/* Desktop: left tiles | center image | right tiles */}
      <div className="mt-10 hidden sm:grid sm:grid-cols-[1fr_260px_1fr] sm:items-center sm:gap-10 lg:grid-cols-[1fr_340px_1fr] lg:gap-14">
        <div className="flex flex-col gap-10">
          <Tile {...BENEFITS[0]} />
          <Tile {...BENEFITS[2]} />
        </div>
        <img
          src="/products/starter-kit-rat.png"
          alt="Evolve rodent fertility control bait"
          width={400}
          height={400}
          loading="lazy"
          className="h-auto w-full object-contain"
        />
        <div className="flex flex-col gap-10">
          <Tile {...BENEFITS[1]} />
          <Tile {...BENEFITS[3]} />
        </div>
      </div>

      {/* Why traps fail + How Evolve fixes it */}
      <div className="mt-16 grid gap-0 overflow-hidden rounded-2xl border border-border md:grid-cols-2">
        {/* Left — The problem */}
        <div className="flex flex-col gap-4 border-b border-border bg-surface p-8 md:border-b-0 md:border-r">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            The problem
          </span>
          <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
            Why pest control keeps failing you
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Trap a rat today. Two survivors breed tonight. A single pair produces up to 12 pups
            every 21 days — and they reach breeding age in 5 weeks. By spring you're back where you
            started, or worse.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "Traps and poison remove individuals — not the colony's ability to rebuild",
              "Survivors breed faster under pressure. The colony compensates for every removal.",
              "Anticoagulant resistance is now widespread. Poison gets less effective each generation.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-[11px] font-bold text-destructive">
                  ✗
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — The fix */}
        <div className="flex flex-col gap-4 bg-card p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            The fix
          </span>
          <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
            Evolve cuts off the supply
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The cottonseed oil active ingredient interrupts reproduction in both males and females.
            No new pups means no replacements. The colony shrinks on its own timeline — no die-off,
            no carcasses, no cleanup.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "Males: sperm production suppressed within days of consistent feeding",
              "Females: litter sizes shrink, then stop entirely after the first breeding cycle",
              "Both sexes: effects compound over 60–90 days — no resistance possible",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
