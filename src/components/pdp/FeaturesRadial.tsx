import { TrendingDown, ShieldCheck, SealCheck, ArrowsClockwise } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

const BENEFITS: { icon: Icon; title: string; body: string }[] = [
  {
    icon: TrendingDown,
    title: "Collapses the colony",
    body: "Targets the breeding cycle, not individuals. The population shrinks each generation because there aren't enough pups to replace what's lost.",
  },
  {
    icon: ShieldCheck,
    title: "Safe for predators and pets",
    body: "Cottonseed oil active. Hawks, owls, dogs, cats — none of them are at risk from rodents that fed on Evolve.",
  },
  {
    icon: SealCheck,
    title: "No license, no permit",
    body: "The EPA puts it in the minimum-risk category. Homeowners and property managers can buy and deploy it directly.",
  },
  {
    icon: ArrowsClockwise,
    title: "Gets stronger every cycle",
    body: "Each 60–90 day refill builds on the last. Population pressure drops continuously — no resistance possible.",
  },
];

function Tile({ icon: Icon, title, body }: (typeof BENEFITS)[0]) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10">
        <Icon size={24} weight="fill" className="text-brand" />
      </div>
      <h3 className="pdp-h5 text-foreground">{title}</h3>
      <p className="text-base leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

export function FeaturesRadial() {
  return (
    <section className="container-site py-4 md:py-6">
      <div className="rounded-2xl border border-border/50 bg-card p-8 md:p-14">
        {/* Section header */}
        <div className="mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            The root cause
          </span>
          <h2 className="pdp-h2 mx-auto mt-2 max-w-lg text-foreground">
            Every rat you remove gets replaced.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Two independent urban field studies. 79% average population reduction.
            Measurable within 90 days of consistent deployment.
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
          <div className="mt-8 grid grid-cols-2 gap-6">
            {BENEFITS.map((b) => (
              <Tile key={b.title} {...b} />
            ))}
          </div>
        </div>

        {/* Desktop: left tiles | center image | right tiles */}
        <div className="mt-10 hidden sm:grid sm:grid-cols-[1fr_260px_1fr] sm:items-center sm:gap-10 lg:grid-cols-[1fr_320px_1fr] lg:gap-14">
          <div className="flex flex-col gap-12">
            <Tile {...BENEFITS[0]} />
            <Tile {...BENEFITS[2]} />
          </div>
          <img
            src="/products/starter-kit-rat.png"
            alt="Evolve rodent fertility control bait"
            width={400}
            height={400}
            loading="lazy"
            className="h-auto w-full rounded-2xl border-2 border-brand/20 object-contain shadow-[2px_2px_0_0_var(--color-brand)]"
          />
          <div className="flex flex-col gap-12">
            <Tile {...BENEFITS[1]} />
            <Tile {...BENEFITS[3]} />
          </div>
        </div>

        {/* 15,000 typographic moment */}
        <div className="mt-14 rounded-2xl border border-brand/20 bg-brand/5 px-8 py-12 text-center md:px-16">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            Why removal alone never ends it
          </span>
          <p className="pdp-stat mt-4">15,000</p>
          <p className="mt-3 text-lg font-semibold text-foreground">
            offspring a single breeding pair can produce in one year
          </p>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Oklahoma State University Extension. Every rat you trap or poison gets replaced by the
            next generation already in progress.
          </p>
        </div>

        {/* Why pest control keeps failing + how Evolve fixes it */}
        <div className="mt-10 grid gap-0 overflow-hidden rounded-2xl border border-border md:grid-cols-2">
          {/* Left — The problem */}
          <div className="flex flex-col gap-4 border-b border-border bg-surface p-8 md:border-b-0 md:border-r">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              The problem
            </span>
            <h3 className="pdp-h4 text-foreground">
              Why pest control keeps failing you
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Trap a rat today. Two survivors breed tonight. A single pair produces up to 12 pups
              every 21 days and they reach breeding age in 5 weeks. By spring you're back where you
              started, or worse.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Traps and poison remove individuals. The colony rebuilds from the survivors you didn't see.",
                "Survivors breed faster under pressure. The colony compensates for every removal.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-base text-foreground"
                >
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
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              The fix
            </span>
            <h3 className="pdp-h4 text-foreground">
              Evolve cuts off the supply
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              The cottonseed oil active ingredient interrupts reproduction in both males and females.
              No new pups means no replacements. The colony shrinks on its own timeline, with no
              die-off and no cleanup.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Males: sperm production suppressed within days of consistent feeding.",
                "Females: litter sizes shrink, then stop entirely after the first breeding cycle.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-base text-foreground"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
