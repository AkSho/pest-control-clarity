import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/compliance-nj-violation.jpg";
import {
  ClosingCta,
  FieldDataTrio,
  PhaseCards,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE =
  "NJ rodent violation: local health enforcement & what closes it | Cloakd";
const DESCRIPTION =
  "No letter grade in the window — but NJ rodent citations carry permit suspension authority, reinspection fees, and a public record. Here's the program that breaks the cycle in NJ.";

export const Route = createFileRoute("/nj-rodent-violation")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: NjPage,
});

const ENFORCEMENT = [
  {
    title: "Inspection trigger",
    body: "NJ health departments conduct both routine scheduled inspections and complaint-driven visits. A tenant complaint, customer 311-equivalent report, or anonymous tip can trigger an out-of-cycle inspection at any time.",
  },
  {
    title: "Violation classification",
    body: "Rodent evidence — droppings, gnaw marks, live or dead rodents, burrows — in food preparation or storage areas is typically classified as a significant or imminent hazard violation under NJ code. Imminent hazard findings can result in an emergency closure order, suspension of the food service permit, and fines up to $1,000 per day until corrected.",
  },
  {
    title: "Reinspection requirement",
    body: "After a violation, the operator must document corrective action and pass a reinspection before the case is closed. Reinspection fees are charged to the operator. Failing the reinspection restarts the clock and adds to the citation record.",
  },
  {
    title: "Public record",
    body: "NJ inspection results are reported to the state and accessible through local health department records requests. There's no letter grade to post, but the violation history is there for anyone who asks.",
  },
];

const NYC_BULLETS = [
  "Single centralized agency (DOHMH)",
  "Public letter grade posted in window",
  "Specific violation codes (04K/04L)",
  "Fines $300–$2,000 per citation",
  "HPD housing violations logged publicly by address",
  "311 complaint triggers immediate inspection",
];

const NJ_BULLETS = [
  "Municipal health departments (varies by town)",
  "No letter grade — but inspection reports are public record",
  "NJ State Sanitary Code Part IV governs food safety",
  "Reinspection fees + remediation costs on the operator",
  "Permit suspension authority for imminent hazard findings",
  "Tenant complaints route to local health or housing authority",
];

function NjPage() {
  return (
    <>
      <SolutionHero
        eyebrow="NJ rodent violations"
        headline="An NJ rodent violation has no letter grade in the window."
        highlight="The exposure is still real."
        lede="New Jersey food service and property operators don't face NYC's letter grade system, but a rodent citation from a local health department triggers reinspection, remediation costs, and a public record attached to the address. The replacement cycle that keeps the violation coming back is the same. Here's what the exposure looks like in NJ — and what breaks the cycle."
        image={heroImg}
      />

      {/* HOW NJ WORKS + 4 CARDS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="How NJ enforcement works"
            title="Local health departments. State sanitary code. No central agency to appeal to."
            intro={
              <>
                <p>
                  NJ food service inspections run through local municipal
                  health departments, not a single centralized agency like
                  NYC's DOHMH. Every municipality enforces under the NJ State
                  Sanitary Code Part IV and NJ Food Code (NJ Administrative
                  Code 8:24), but the specific process, reinspection timeline,
                  and enforcement culture varies by county and town.
                </p>
                <p>
                  What doesn't vary: a rodent finding is treated as a
                  significant violation or imminent hazard requiring immediate
                  corrective action and a documented follow-up. The absence of
                  a letter grade system doesn't reduce the financial or
                  operational exposure — it just means the consequences come
                  through a different channel.
                </p>
                <p>
                  Inspection reports in NJ are public record. For a restaurant
                  operator, a pattern of rodent citations attached to your
                  address is visible to prospective customers, future
                  landlords, and insurance carriers even without a B in the
                  window.
                </p>
              </>
            }
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {ENFORCEMENT.map((e) => (
              <div
                key={e.title}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-lg font-extrabold leading-tight">
                  {e.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {e.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESTAURANTS NARRATIVE */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="NJ restaurants"
            title="Closure authority without the grade system warning."
            intro={
              <>
                <p>
                  NYC restaurants get a letter grade posted publicly — which
                  creates visible pressure before a closure. NJ doesn't work
                  that way. A NJ health inspector who finds active rodent
                  signs can suspend your food service permit on the spot and
                  require you to close until a passing reinspection is
                  completed.
                </p>
                <p>
                  The financial math is the same: a mid-service closure costs
                  $15,000 to $50,000 in lost revenue depending on volume, plus
                  reinspection fees, remediation costs, and the staff
                  disruption of an unplanned shutdown. It's just triggered
                  differently.
                </p>
                <p>
                  The underlying problem — the replacement colony forming
                  between treatment visits — is identical to what NYC
                  operators face. Dense urban and suburban NJ blocks — from
                  Jersey City and Newark to Hoboken and Hackensack — have the
                  same pressure dynamics. Treatment clears. The cycle resets.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* PROPERTY MANAGERS NARRATIVE */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="NJ property managers"
            title="Tenant complaints route to local health. The record follows the address."
            intro={
              <p>
                NJ landlords are required to maintain properties free of
                rodent infestation under the NJ Landlord-Tenant Act and
                municipal housing codes. A tenant complaint routes to the
                local health department or housing authority, triggering an
                inspection. Unlike NYC's HPD violation system — which logs
                everything publicly by address — NJ doesn't have a single
                searchable database. But violations require documented
                remediation, create a code enforcement record, and can support
                tenant rent escrow claims and legal action in housing court if
                the problem isn't resolved. For property managers with
                multiple NJ addresses, the exposure compounds when the
                treatment cycle just keeps resetting.
              </p>
            }
          />
        </div>
      </section>

      {/* NJ vs NYC COMPARISON */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="NJ vs NYC enforcement"
            title="Different systems. Same underlying problem."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                New York City
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {NYC_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                New Jersey
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {NJ_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The structural problem is the same in both states. Treatment
            clears the colony. Within four to eight weeks, rats from the
            surrounding block fill the same territory. The next inspection —
            whether it's DOHMH or a NJ municipal health officer — finds active
            signs again. Reducing the replacement rate is what breaks that
            cycle.
          </p>
        </div>
      </section>

      {/* PROGRAM PHASES */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="The program for NJ operators"
            title="Same two-phase structure. Your existing NJ vendor stays."
            intro={
              <p>
                The 90-day program works the same way in NJ as in NYC. Phase
                1 runs through your existing exterminator — whoever handles
                compliance documentation for your local health department.
                Phase 2 adds the fertility management layer on top.
              </p>
            }
          />
          <PhaseCards
            phase1={{
              tag: "Your existing NJ exterminator",
              title: "Treatment and documentation",
              body: (
                <>
                  <p>
                    Your current licensed pest management professional (PMP)
                    handles treatment and generates the compliance
                    documentation your local health department requires. The
                    NJ DEP licenses pest control operators in New Jersey —
                    confirm your vendor is current. We coordinate with them to
                    get a documented clean baseline before Phase 2 starts. No
                    vendor change.
                  </p>
                  <p className="font-semibold text-foreground">
                    Satisfies the remediation record requirement for
                    reinspection and produces the paper trail that closes the
                    current violation.
                  </p>
                </>
              ),
            }}
            phase2={{
              tag: "Cloakd — fertility management",
              title: "Stop the replacement from forming",
              body: (
                <>
                  <p>
                    Evolve bait stations go in along travel paths, near entry
                    points, and around the property perimeter. Made from
                    cottonseed — EPA minimum risk, no special permit required,
                    cleared for food-handling environments and occupied
                    residential buildings. Rats that consume it reproduce
                    significantly less.
                  </p>
                  <p>
                    Monthly track counts document declining activity over 90
                    days. That record goes into any reinspection or complaint
                    response.
                  </p>
                </>
              ),
            }}
          />
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The 90-day monitoring record — track counts per location, monthly
            comparisons against baseline, documented declining trend — is the
            difference between "we treated it last month" and "here's the data
            showing the population has been declining for three months." In NJ
            as in NYC, active management documentation changes the
            conversation with a health officer.
          </p>
        </div>
      </section>

      <FieldDataTrio
        intro="Numbers from monitored urban deployments."
        footnote={
          <>
            Source:{" "}
            <a
              href="https://www.prnewswire.com/news-releases/senestech-reports-significant-reductions-in-rodent-activity-following-evolve-deployments-in-urban-field-studies-302691116.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand"
            >
              SenesTech, Inc. — February 18, 2026
            </a>
            .
          </>
        }
      />

      <ClosingCta
        title="NJ operators: tell us about your property."
        body="We work with restaurants, property managers, and building operators across NJ. Tell us your situation and we'll put together a program outline including Phase 1 coordination with your existing vendor."
        secondary={{ label: "How it works", to: "/how-it-works" }}
      />

      {/* CROSS-LINK BAND */}
      <section className="bg-background py-12">
        <div className="container-site flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>
            Operating in the five boroughs?{" "}
            <Link
              to="/dohmh-rodent-violation-nyc"
              className="font-semibold text-brand hover:underline"
            >
              NYC DOHMH violation guide →
            </Link>
          </span>
          <Link
            to="/solutions/property-managers"
            className="font-semibold text-brand hover:underline"
          >
            Property manager program →
          </Link>
        </div>
      </section>
    </>
  );
}
