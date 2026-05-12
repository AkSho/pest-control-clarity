import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LeadForm } from "@/components/site/LeadForm";
import heroFaq from "@/assets/hero-faq.jpg";
import { Eyebrow } from "@/components/site/Eyebrow";

const TITLE = "Common questions — Cloakd Removals";
const DESCRIPTION =
  "Why standalone deployments fail, what the two-phase managed program does differently, and direct answers to every question operators ask before starting.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: FAQPage,
});

const SOURCE_FEB =
  "https://www.prnewswire.com/news-releases/senestech-reports-significant-reductions-in-rodent-activity-following-evolve-deployments-in-urban-field-studies-302691116.html";

const SUB_BLOCKS = [
  {
    t: "What PCOs have seen fail",
    b: "Standalone deployment without a knockdown phase. Active infestation still present when the bait goes in. No monitoring to track whether activity is declining. The product being blamed for a structural problem in how it was deployed.",
  },
  {
    t: "What the two-phase program does differently",
    b: "Phase 1 handles the current colony through your existing vendor. Fertility management starts from a documented clean baseline. Monthly track counts confirm whether the population is declining. The record shows the decline, not just the assumption of it.",
  },
  {
    t: "Who's running it at scale",
    b: "Baltimore's city-run rodent program adopted Evolve in 2025. NYC began deploying ContraPest (same maker, SenesTech) in designated rat mitigation zones in April 2025. These are city-funded programs with public health departments behind them, not vendor pilot tests.",
  },
];

const FAQS = [
  {
    q: "This doesn't kill anything. I have rats right now. How does this help?",
    a: "It doesn't help with the rats that are there today. That's what Phase 1 is for — your existing exterminator clears the active colony first. Fertility management starts from that clean baseline and prevents the replacement colony from forming at full size. The 90-day program addresses two separate problems: the current infestation and the cycle that brings them back. Phase 1 handles the first. Phase 2 handles the second.",
  },
  {
    q: "I've read about people trying this for months with the population actually getting worse.",
    a: "The reports that follow that pattern share a common profile: outdoor sites, standalone deployment, competing attractants. One documented case was a large open field where squirrels and chipmunks were consuming the bait alongside rats. At an outdoor site with multiple species sharing bait, the rats aren't getting the dose the product is designed to deliver, and the territory dynamics are completely different from a managed urban property. Managed bait stations in enclosed urban environments, deployed after Phase 1 knockdown, are a different context.",
  },
  {
    q: "Doesn't cottonseed need to make up a large percentage of their diet to work?",
    a: "The 40% figure that circulates online comes from 1982 cattle and rabbit studies using raw unprocessed cottonseed, not the commercial formulation. Evolve is a concentrated commercial product developed specifically for rodent fertility management. The dosing works at the consumption rates rats eat from bait stations in their normal foraging patterns. SenesTech's field data, and the urban deployments in Baltimore and NYC, reflect Evolve as formulated — not the raw cottonseed research.",
  },
  {
    q: "I've read that the fertility effects are reversible. Won't the population bounce back?",
    a: "Reversibility is a safety feature, not a design flaw. It means the bait can't permanently sterilize a rat population that might later need to be left alone. In the context of a 90-day managed program, reversibility doesn't matter — the goal is a documented declining population trend over that period, not permanent biological change. The field data shows 79% reduction in track presence over five months. When the program ends, the population at a managed site is at a fraction of its previous density. That's the outcome.",
  },
  {
    q: "Some cities tested the SenesTech liquid product and reportedly dropped it. Why trust this?",
    a: "The ContraPest liquid product (a different formulation from Evolve) had mixed results in some early municipal pilots, partly due to bait station maintenance requirements and competing liquid sources. Baltimore, NYC, and Chicago have all run programs using SenesTech products with documented positive outcomes. The track record of a product matters, but so does the deployment structure. Evolve as a solid bait, in maintained stations, with Phase 1 and monitoring, is a different setup from a standalone liquid pilot.",
  },
  {
    q: "How is this different from just buying Evolve on Amazon and putting it out myself?",
    a: "Buying the bait standalone and deploying it without Phase 1 is the exact failure mode that produces the negative reports. You'd be adding fertility management on top of an active infestation, without a clean baseline, without monthly monitoring to confirm it's working, and without the track count documentation that gives you something to show an inspector. The program structure is what produces the outcome. The bait is one component of it.",
  },
  {
    q: "Is this safe around food? We're a restaurant.",
    a: "Yes. The EPA classifies Evolve as minimum risk under 25b — the same category as products made from cloves or citronella. The active ingredient comes from cottonseed, not synthetic chemicals. It doesn't build up in the environment and produces no secondary kill risk. EPA minimum risk clearance means no special permit is required to deploy it in or around food-handling spaces. It's cleared for continuous use in restaurants, food storage, and occupied residential buildings.",
  },
  {
    q: "90 days feels like a long time to wait with an active problem.",
    a: "90 days is the documentation period, not the waiting period. Phase 1 addresses the active infestation in week 1 through your existing exterminator. The fertility management layer starts producing measurable decline in track count data around weeks 6 to 8, and continues building through the full 90 days. By the end of the program, you have a documented record showing declining population trend that you can hand to an inspector or property owner. The rats are declining by week 6. The 90-day record is what proves it.",
  },
];

const STATS = [
  { v: "79%", l: "reduction in rodent track presence", s: "Location A — 5-month urban field study, Aug 2025 to Jan 2026" },
  { v: "88%", l: "drop in track density at the same site", s: "Tracks per monitoring plate declined even where some activity remained" },
  { v: "90%", l: "fertility reduction potential", s: "When Evolve runs alongside an active pest control program" },
];

function FAQPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative ink-section overflow-hidden">
        <img
          src={heroFaq}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          width={1536}
          height={1024}
        />
        <div className="relative container-site py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="dark" className="text-accent-warm">
              Common questions
            </Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              Your exterminator has probably seen this fail.{" "}
              <span className="text-accent-warm">Here's what went wrong.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/85 md:text-lg">
              Professional pest control operators are skeptical of rat
              fertility management for a reason. Most of what they've seen is
              the product deployed alone, outdoors, without a Phase 1
              knockdown and without monitoring. That setup fails. The
              two-phase managed program is built around avoiding exactly that.
            </p>
          </div>
        </div>
      </section>

      {/* LEAD QUESTION */}
      <section className="bg-background py-20">
        <div className="container-site max-w-4xl">
          <Eyebrow>
            Professional skepticism
          </Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
            My pest control company told me rat birth control doesn't work.
            Are they right?
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Pest control operators are right about what they've seen. The
              failed deployments they're describing are real. Most involve the
              product dropped in standalone — no knockdown first, no Phase 1
              to clear the current population, no structured monitoring to
              confirm it's working. In that setup, you're asking fertility
              management to do something it isn't designed to do: clear an
              active infestation.
            </p>
            <p>
              Fertility management doesn't kill anything. It changes how many
              rats the colony produces over the next 8 to 12 weeks. If you
              haven't cleared the current colony first, you have a population
              that's still at full size, still under full territorial
              pressure, and still producing at a declining but not-yet-reduced
              rate. Nothing visible changes in weeks 1 through 4. The
              conclusion from that experience: it didn't work.
            </p>
            <p>
              The two-phase program is structured differently. Phase 1 clears
              the current colony through your existing exterminator. Phase 2
              adds Evolve on top of that baseline. The fertility management is
              stopping the replacement from forming at full size, not trying
              to eliminate what's already there. That's what produces the
              field data — 79% reduction in track presence over five months.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {SUB_BLOCKS.map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-bold">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MORE QUESTIONS */}
      <section className="bg-surface py-20">
        <div className="container-site max-w-3xl">
          <Eyebrow>
            More questions
          </Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
            Every question we get, answered directly.
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

      {/* FIELD DATA */}
      <section className="bg-background py-16">
        <div className="container-site">
          <Eyebrow>
            Field data
          </Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
            What the two-phase program produced in monitored urban
            deployments.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Two independent urban sites. Five months each. Monthly track count
            comparisons against a Week 1 baseline.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <div className="text-5xl font-extrabold tracking-tight text-brand md:text-6xl">
                  {s.v}
                </div>
                <div className="mt-3 text-base font-semibold">{s.l}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.s}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Source:{" "}
            <a
              href={SOURCE_FEB}
              target="_blank"
              rel="noopener"
              className="font-semibold text-brand hover:underline"
            >
              SenesTech, Inc. — February 18, 2026
            </a>
            . Full breakdown on the{" "}
            <Link to="/results" className="font-semibold text-brand hover:underline">
              field results page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="ink-section">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Still have questions? Tell us about your property.
            </h2>
            <p className="mt-5 max-w-xl text-ink-muted md:text-lg">
              We'll review your situation and put together a program outline.
              If it isn't the right fit, we'll tell you that too.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/get-started">
                  Schedule a walkthrough <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
