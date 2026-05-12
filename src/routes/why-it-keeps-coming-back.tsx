import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Train, Wrench, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LeadForm } from "@/components/site/LeadForm";
import { HeroTrustBadges } from "@/components/site/TrustBadges";
import heroProblem from "@/assets/hero-problem.jpg";
import { Eyebrow } from "@/components/site/Eyebrow";

const TITLE =
  "Why it keeps coming back — Cloakd Removals";
const DESCRIPTION =
  "City rats are territorial. Treatment removes the occupant; the territory stays. Here's the biology behind the replacement cycle and what actually breaks it.";

export const Route = createFileRoute("/why-it-keeps-coming-back")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ProblemPage,
});

const CYCLE = [
  {
    n: "1",
    title: "Treatment applied",
    body: "Exterminator clears the active colony. Site is clean.",
  },
  {
    n: "2",
    title: "Territory empties",
    body: "Scent markers fade. Surrounding rats start detecting the vacancy.",
  },
  {
    n: "3",
    title: "New group moves in",
    body: "Rats from the block test the territory. No resistance. Food still there.",
  },
  {
    n: "4",
    title: "Colony rebuilds",
    body: "New colony at full reproduction. Population back near baseline within weeks.",
  },
  {
    n: "5",
    title: "Cycle resets",
    body: "Next treatment removes the new colony. Same cost. Same result. Starts over.",
  },
];

const NYC_NJ_CARDS = [
  {
    icon: Train,
    title: "The subway",
    body: "NYC's subway gives rats year-round warmth, food from passenger waste, and corridors connecting every part of the city. They move between underground infrastructure and surface buildings constantly.",
  },
  {
    icon: Wrench,
    title: "Underground utilities",
    body: "Steam tunnels, sewer lines, and utility corridors throughout NYC and NJ are rat habitat. You can't seal those pathways from a single building.",
  },
  {
    icon: Building2,
    title: "Shared foundations",
    body: "Older buildings in both cities often share basement walls and utility penetrations with their neighbors. Treating your building doesn't address what's moving through the one next door.",
  },
];

const STATS = [
  { v: "79%", l: "reduction in rodent track presence", s: "5-month urban deployment, Location A" },
  { v: "88%", l: "drop in track density at the same site", s: "Tracks per monitoring plate declined throughout the program" },
  { v: "90%", l: "fertility reduction potential", s: "When Evolve runs alongside an active pest control program" },
];

const FAQS = [
  {
    q: "Doesn't sealing entry points solve it?",
    a: "Sealing gaps helps and is worth doing. But in a dense city block with shared foundations, subway tunnels, and connected sewer infrastructure, you can slow inbound pressure but not stop it. Exclusion doesn't reduce how fast the replacement colony reproduces once it's inside.",
  },
  {
    q: "Why does the problem come back faster in some buildings?",
    a: "A few things speed it up: being close to subway lines or underground utilities, older building stock with more structural gaps, and having a high-density food source nearby like a restaurant. The more attractive the territory, the faster it fills after treatment.",
  },
  {
    q: "Does the fertility bait work without treatment first?",
    a: "It works best as a second layer on top of knockdown, not on its own. Phase 1 clears the current colony and gets you to a clean baseline. Phase 2 prevents the replacement from forming at full size. The 90-day results come from both phases running together.",
  },
  {
    q: "Do I need to change my current exterminator?",
    a: "No. The program is designed to run alongside your existing vendor. We coordinate with them on Phase 1 and add the fertility management layer on top. Your vendor keeps their contract.",
  },
  {
    q: "Is the bait safe around food?",
    a: "Yes. The EPA classifies Evolve as minimum risk — same category as products made from cloves or citronella. It's made from cottonseed, not synthetic chemicals. It's cleared for continuous use in and around food-handling facilities.",
  },
  {
    q: "How long before the population actually starts going down?",
    a: "The effect builds over several weeks. Most deployments show measurable decline in track count data around the 6 to 8 week mark, then it continues through the full 90 days.",
  },
];

function ProblemPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative ink-section overflow-hidden">
        <img
          src={heroProblem}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
          width={1536}
          height={1024}
        />
        <div className="relative container-site grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div>
            <HeroTrustBadges />
            <Eyebrow tone="dark" className="text-accent-warm mt-7">
              Why it keeps coming back
            </Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              You paid for the treatment.{" "}
              <span className="text-accent-warm">
                Six weeks later, they were back.
              </span>{" "}
              Here's what actually stops that.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              The exterminator didn't fail. Standard pest control removes
              what's there. The problem is what fills in after they leave —
              and it's not something any standard treatment is designed to
              stop. Once you see why, the fix is obvious.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/get-started">
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Link
                to="/results"
                className="text-sm font-medium text-ink-foreground/85 hover:text-ink-foreground"
              >
                See the field data →
              </Link>
            </div>
          </div>
          <div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* WHAT'S HAPPENING */}
      <section className="bg-background py-20">
        <div className="container-site grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <Eyebrow>
              What's actually happening
            </Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              City rats are territorial. Treatment removes the occupant. The
              territory stays.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              When a rat colony lives in your block, they mark it. Scent signals
              along their travel paths tell every other rat the space is
              claimed. That marking is what keeps competing groups out. The
              territory has a current occupant, and other rats know it.
            </p>
            <p>
              When treatment clears that colony, those signals fade within days.
              The food source is still there. The building is still there. Rats
              from the surrounding block start testing the space almost
              immediately. No resistance, no competing group. They move in.
            </p>
            <p>
              That's where the new infestation comes from. Not from far away.
              From the same three-block area that was always the source.
              Standard treatment removes the current group but doesn't slow down
              the one filling in after it. The cycle runs on schedule.
            </p>
          </div>
        </div>
      </section>

      {/* THREE-CARD ROW */}
      <section className="bg-surface py-20">
        <div className="container-site grid gap-5 md:grid-cols-3">
          {[
            {
              t: "How they know the territory is open",
              b: "Rats mark travel paths with scent. A living colony refreshes those marks continuously. Treatment removes the colony — the marks break down within days. Other rats in the block detect the absence and start moving in almost immediately.",
            },
            {
              t: "Why food makes it faster",
              b: "Empty territory fills on its own. Empty territory with a persistent food source — a restaurant, an apartment trash area, a food warehouse — fills faster. In a dense urban block, the replacement usually takes four to eight weeks.",
            },
            {
              t: "Why inspections are a timing problem",
              b: "If an inspector comes in week two after a treatment, you're clean. Week six, you're exposed. Standard pest control doesn't change that math. Every inspection with standard treatment is a timing bet.",
            },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
            >
              <h3 className="text-xl font-bold">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {c.b}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY NYC AND NJ HIT HARDER */}
      <section className="bg-background py-20">
        <div className="container-site grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div className="space-y-5">
            {NYC_NJ_CARDS.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{c.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <Eyebrow>
              Why NYC and NJ hit harder
            </Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              A single city block can sustain hundreds of rats. Treatment at
              one address doesn't touch that.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Dense cities concentrate both the food and the source
                population. The subway system, underground utility corridors,
                and connected building foundations give rats year-round
                habitat across the entire block. Every building on that block
                draws from the same surrounding population.
              </p>
              <p>
                A suburban property dealing with rats has a localized problem
                that can usually be controlled with treatment. A building in a
                high-density NYC or NJ neighborhood is competing with the
                whole block's background population. Clearing one address
                doesn't reduce that number at all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE FULL CYCLE */}
      <section className="ink-section py-20">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="dark" className="text-accent-warm">
              The full cycle
            </Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Standard treatment every six weeks. The cycle runs every six
              weeks.
            </h2>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-5">
            {CYCLE.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-ink-border bg-white/5 p-6 backdrop-blur"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-warm text-ink font-extrabold">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHAT BREAKS THE CYCLE */}
      <section className="bg-background py-20">
        <div className="container-site grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <Eyebrow>
              What actually breaks the cycle
            </Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Reduce how many rats the colony produces. The replacement can't
              form at full size.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              The cycle runs because the replacement colony forms at full rate
              within weeks of treatment. Fertility management targets exactly
              that — not the current colony, but the reproduction rate of what
              comes next.
            </p>
            <p>
              Evolve is a bait made from cottonseed that reduces how many
              babies rats can have. Males produce less working sperm. Females
              have fewer litters and smaller ones. Over 8 to 12 weeks, more
              rats are dying than being born. The population shrinks without
              another treatment.
            </p>
            <p>
              It doesn't replace the initial knockdown. Phase 1 still clears
              the current colony. Phase 2 adds the fertility layer on top of
              it, running continuously for 90 days. The track count data shows
              a declining population rather than the same cycle repeating.
            </p>
            <p>
              NYC deployed a similar approach in Bryant Park — and it failed.{" "}
              <Link to="/resources" className="font-semibold text-brand hover:underline">
                The full breakdown explains why, and what the urban building
                deployments that produced 79% reduction did differently.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="bg-surface py-16">
        <div className="container-site">
          <Eyebrow align="center">
            What the field data shows
          </Eyebrow>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]"
              >
                <div className="text-5xl font-extrabold tracking-tight text-brand md:text-6xl">
                  {s.v}
                </div>
                <div className="mt-3 text-base font-semibold">{s.l}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-20">
        <div className="container-site max-w-3xl">
          <Eyebrow>
            Common questions
          </Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
            Questions we hear a lot.
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`f-${i}`} className="border-border">
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

      {/* CTA */}
      <section className="ink-section">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Start the program that breaks the cycle.
            </h2>
            <p className="mt-5 max-w-xl text-ink-muted md:text-lg">
              The 90-day program runs alongside your existing pest control
              vendor. Tell us about your property and we'll put together the
              outline.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/get-started">
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Link
                to="/results"
                className="text-base font-semibold text-ink-foreground hover:text-brand"
              >
                See real numbers →
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-ink-border bg-white/5 p-6 backdrop-blur">
            <ul className="space-y-3 text-sm text-ink-foreground">
              {[
                "Layered onto your existing pest program",
                "EPA-designated minimum-risk bait",
                "Documented monthly reporting",
                "Month-to-month, no long contracts",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-brand" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
