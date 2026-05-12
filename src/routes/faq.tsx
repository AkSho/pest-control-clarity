import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TITLE = "FAQ — Cloakd Removals";
const DESCRIPTION =
  "Answers to the questions operators ask before starting a rodent fertility control program — safety, contracts, results timing, cost, and how it works alongside your existing pest contract.";

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

const GROUPS: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: "How the program works",
    items: [
      {
        q: "Why doesn't standard pest control solve this on its own?",
        a: "Knockdown clears the territory. In a food-dense urban block, surrounding colonies detect the empty space and move in within 4 to 8 weeks at full breeding capacity. The number returns to baseline indefinitely.",
      },
      {
        q: "Do you replace my current pest control vendor?",
        a: "No. We layer fertility control on top of your existing program. Knockdown and fertility control do different jobs — neither one alone solves the cycle.",
      },
      {
        q: "What's covered in the first visit?",
        a: "Site walkthrough, harborage and pressure mapping, station placement plan aligned with your existing pest deployment, and the first round of fertility-control bait stations installed.",
      },
      {
        q: "How often do you visit after that?",
        a: "Monthly. Every visit includes station service, track-plate review, and a written log delivered to you.",
      },
    ],
  },
  {
    heading: "Safety & compliance",
    items: [
      {
        q: "Is the bait safe around food, staff, pets, and wildlife?",
        a: "Yes. The active ingredient is EPA-designated minimum risk and derived from cottonseed plant compounds. There is no secondary kill risk to pets or wildlife and it is cleared for food-handling environments.",
      },
      {
        q: "Will it affect a DOHMH or third-party audit?",
        a: "Positively. The program adds documented per-cycle reporting that auditors and health inspectors can review directly. It does not change the pesticide profile of your facility because the active ingredient sits in the EPA minimum-risk category.",
      },
      {
        q: "Can it be deployed in commercial kitchens and food storage?",
        a: "Yes — the formulation is cleared for use in food-handling environments. Station placement follows the same protocol your existing pest provider already uses.",
      },
    ],
  },
  {
    heading: "Results & timing",
    items: [
      {
        q: "How long until I see results?",
        a: "Knockdown is immediate. Fertility-driven reductions compound across breeding cycles — measurable drops typically appear within 60 to 120 days. Field studies showed 79% activity reduction over 5 months.",
      },
      {
        q: "How do you measure whether it's working?",
        a: "Numbered track plates at every station, scored on the same rubric every visit. Track density is comparable cycle-to-cycle, so the trend is a measurement, not an opinion.",
      },
      {
        q: "What if pressure spikes mid-program?",
        a: "Spikes happen — construction next door, garbage strikes, seasonal shifts. We adjust station density and reporting cadence without restructuring the contract.",
      },
    ],
  },
  {
    heading: "Pricing & contracts",
    items: [
      {
        q: "Is this a long contract?",
        a: "No. The program runs month-to-month with documented reporting every cycle.",
      },
      {
        q: "What does it cost?",
        a: "Pricing depends on property type, square footage, and pressure level — most properties are within the same monthly range as their existing pest control spend. Request a walkthrough for an exact estimate.",
      },
      {
        q: "Do you bill per building or per portfolio?",
        a: "Either. Multi-building property managers usually consolidate to one invoice with per-building reporting; single-property operators are billed per address.",
      },
    ],
  },
];

function FAQPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative ink-section">
        <div className="container-site py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-warm">
              FAQ
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              Questions operators ask{" "}
              <span className="text-accent-warm">before starting.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/85 md:text-lg">
              Don't see yours? Call us at{" "}
              <a href="tel:+18005550199" className="font-semibold text-white underline">
                (800) 555-0199
              </a>{" "}
              or{" "}
              <Link
                to="/get-started"
                className="font-semibold text-white underline"
              >
                schedule a walkthrough
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* GROUPS */}
      <section className="bg-background py-20">
        <div className="container-site grid gap-12 md:grid-cols-1">
          {GROUPS.map((group) => (
            <div key={group.heading}>
              <h2 className="text-2xl font-extrabold md:text-3xl">
                {group.heading}
              </h2>
              <Accordion type="single" collapsible className="mt-4 w-full">
                {group.items.map((f, i) => (
                  <AccordionItem
                    key={f.q}
                    value={`${group.heading}-${i}`}
                    className="border-border"
                  >
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
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="ink-section">
        <div className="container-site py-16 text-center md:py-20">
          <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
            Still have questions?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-ink-muted md:text-lg">
            We'll walk your site, answer the rest, and write up an estimate.
            Month-to-month, no commitment.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link to="/get-started">
                Schedule a walkthrough <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
