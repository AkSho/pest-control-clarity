import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/solutions-mouse-violations.jpg";
import { canonicalLink } from "@/lib/seo";
import {
  ClosingCta,
  FieldDataTrio,
  OtherSolutions,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE = "Mouse Violations (NYC DOHMH 04L) — Cloakd Removals";
const DESCRIPTION =
  "DOHMH code 04L covers evidence of mice — a critical violation with the same fine structure as 04K. The 90-day program addresses both species in one record.";

export const Route = createFileRoute("/solutions/mouse-violations")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/solutions/mouse-violations"),
  }),
  component: MouseViolationsPage,
});

const VIOLATION_DETAILS = [
  {
    t: "Code 04L",
    b: "Mice or evidence of mice — including live mice, dead mice, droppings, gnaw marks, or nesting material anywhere in the food service establishment.",
  },
  {
    t: "Critical violation",
    b: "Minimum 5 points per citation. Critical violations are weighted more heavily in scoring and trigger mandatory re-inspection cycles when uncorrected.",
  },
  {
    t: "Fine structure",
    b: "Fines range from $300 to $2,000 per violation depending on prior citation history and whether the violation is corrected at the time of inspection. Repeat violations carry higher penalties.",
  },
  {
    t: "Re-inspection cycle",
    b: "A critical violation triggers a follow-up inspection within a defined window. If the violation is still present at re-inspection, the point total is locked in and the grade reflects the full score.",
  },
];

const EVIDENCE = [
  {
    t: "Droppings",
    b: "Small rod-shaped droppings, typically 3–6mm, found along walls, behind equipment, in storage areas, and inside cabinets. A single mouse produces 50–75 droppings per day. NYC DOHMH health inspectors check corners, shelf edges, and floor gaps.",
  },
  {
    t: "Gnaw marks",
    b: "Mice gnaw continuously to keep their teeth in check. Look for gnaw marks on food packaging, wood baseboards, cardboard, and wiring. Marks are typically at lower heights than rat gnaw damage. Gnaw marks also indicate harborage points nearby.",
  },
  {
    t: "Nesting material",
    b: "Shredded paper, fabric, insulation, or soft material gathered in concealed areas — behind equipment, inside wall voids, in rarely moved storage. Nesting presence indicates established activity, not just transient rodents.",
  },
  {
    t: "Grease/rub marks",
    b: "Mice leave faint smear marks along regularly traveled paths — wall edges, pipe runs, and entry points. Less pronounced than rat grease marks but visible on close inspection.",
  },
  {
    t: "Live or dead mice",
    b: "Direct sighting of live or dead mice anywhere in the establishment. This is an automatic 04L citation regardless of other conditions.",
  },
  {
    t: "Entry points",
    b: "Gaps as small as 6mm (the diameter of a pencil) are sufficient entry for a mouse. Inspectors note unsealed pipe penetrations, gaps under doors, and cracks at wall junctions as contributing conditions.",
  },
];

const POINT_MATH = [
  { label: "Code 04K — rats or evidence of rats", value: "5+ pts" },
  { label: "Code 04L — mice or evidence of mice", value: "5+ pts" },
  { label: "Subtotal — rodent violations alone", value: "10+ pts" },
  { label: "Typical sanitation violations (2–3)", value: "6–9 pts" },
  { label: "Total — realistic inspection score", value: "16–19+ pts" },
  { label: "Grade B threshold", value: "14–27 pts" },
  { label: "Grade C / potential closure", value: "28+ pts" },
];

const PROGRAM_STEPS = [
  {
    t: "Phase 1 knockdown — both species",
    b: "Your existing pest control vendor treats for both rats and mice. Standard treatment methods work for both. The fertility layer goes in after a clean baseline is established for both species.",
  },
  {
    t: "Evolve Mouse deployment",
    b: "Evolve Mouse is a separate SenesTech product using the same gossypol-based mechanism as Evolve Rat. Stations are placed along mouse travel paths — typically at lower heights, along wall edges, and near food storage. The deployment guide covers station spacing for mice.",
  },
  {
    t: "Species-specific placement",
    b: "Mouse stations and rat stations are placed separately — mice travel shorter distances and nest closer to food sources. The deployment guide covers placement for each species so consumption stays consistent.",
  },
  {
    t: "Consistent replenishment",
    b: "Fertility control requires consistent consumption over 60 to 120 days. Cloakd's replenishment plan ships refills automatically every 60 or 90 days so stations stay stocked for both formulas.",
  },
];

function MouseViolationsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="Mouse Violations — NYC"
        headline="DOHMH code 04L is a mouse violation —"
        highlight="and ignoring it while you manage the rats is how you end up with 10 critical points on one inspection."
        lede="DOHMH violation code 04L covers evidence of mice. It's a critical violation carrying the same minimum point value as 04K, triggering the same re-inspection cycle, with an identical fine structure. Most operators don't find this out until an inspector does."
        image={heroImg}
      />

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What the violation means"
            title="04L: mice or evidence of mice in a food service establishment."
            intro={
              <>
                <p>
                  Code 04L is cited whenever an inspector finds evidence of
                  mice anywhere in the food service establishment: prep
                  areas, storage, front of house, or anywhere food is
                  handled or stored. Evidence includes droppings, gnaw
                  marks, nesting material, or live or dead rodents.
                </p>
                <p>
                  At 5 critical points minimum, a single 04L citation
                  combined with one other critical violation puts a
                  restaurant above 9 points — triggering a B or C grade
                  depending on total score. The 28-point threshold for a C
                  grade and potential closure can be crossed with a handful
                  of rodent and sanitation citations on a single visit.
                </p>
                <p>
                  NYC restaurant closures for rodent violations are publicly
                  reported. A mouse-related closure carries the same
                  reputational damage as a rat closure — the distinction
                  between 04K and 04L doesn't register with customers or
                  local media.
                </p>
              </>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {VIOLATION_DETAILS.map((v) => (
              <div
                key={v.t}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-bold">{v.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {v.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What inspectors look for"
            title="Mouse evidence is harder to clear than most operators expect."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {EVIDENCE.map((e) => (
              <div
                key={e.t}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-bold">{e.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {e.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="When both are present"
            title="04K and 04L can be cited at the same inspection."
            intro={
              <>
                <p>
                  Rats and mice rarely share territory — rats dominate and
                  displace mice when both are present in the same space. But
                  in a commercial building with multiple floors,
                  compartments, or adjacent units, rats and mice can occupy
                  separate areas simultaneously.
                </p>
                <p>
                  A single DOHMH inspection at a NYC restaurant that cites
                  both 04K and 04L produces a minimum of 10 critical points
                  from rodent violations alone. Combined with routine
                  sanitation citations, crossing the 28-point closure
                  threshold becomes straightforward.
                </p>
                <p>
                  Most pest control programs address rats and mice as
                  separate problems with separate treatments. The 90-day
                  fertility management program addresses both
                  simultaneously — Evolve Rat and Evolve Mouse deployed in
                  the same two-phase structure.
                </p>
              </>
            }
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="bg-brand-soft px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Point math — combined rodent violations
              </p>
            </div>
            <ul className="divide-y divide-border">
              {POINT_MATH.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between gap-6 px-6 py-4"
                >
                  <span className="text-sm md:text-base">{row.label}</span>
                  <span className="text-base font-extrabold text-brand md:text-xl">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="How the program addresses it"
            title="Same two-phase structure. Separate fertility management for each species."
          />
          <ol className="mt-10 grid gap-5 md:grid-cols-2">
            {PROGRAM_STEPS.map((s, i) => (
              <li
                key={s.t}
                className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground font-extrabold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-base font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FieldDataTrio />

      <OtherSolutions current="mouse-violations" />

      <ClosingCta
        title="Rats and mice. Separate formulas. One starter kit each."
        body="Evolve Rat and Evolve Mouse are separate SenesTech products. Cloakd sells both as starter kits and refills. Order the formula that matches the pressure you're managing."
      />
    </>
  );
}
