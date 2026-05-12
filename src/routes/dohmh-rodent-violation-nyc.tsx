import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import heroImg from "@/assets/compliance-dohmh-nyc.jpg";
import {
  ClosingCta,
  FieldDataTrio,
  SectionHeader,
  SolutionHero,
  StatCard,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE =
  "DOHMH rodent violation NYC: codes 04K & 04L explained | Cloakd";
const DESCRIPTION =
  "What a DOHMH 04K or 04L rodent violation means for your NYC restaurant — points, fines, B-grade exposure, and what actually closes the citation for good.";

export const Route = createFileRoute("/dohmh-rodent-violation-nyc")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: DohmhPage,
});

const CODES = [
  {
    code: "04K",
    title: "Rats — live or evidence",
    body: "Live rats, dead rats, fresh droppings, gnaw marks, burrows, or active rat signs in food or non-food areas.",
  },
  {
    code: "04L",
    title: "Mice — live or evidence",
    body: "Same standard for mice. Evidence of live mice or mouse activity in food handling or storage areas.",
  },
];

const SIGNS = [
  {
    title: "Live rats",
    body: "Anywhere in the premises — kitchen, storage, dining, or non-food areas.",
  },
  {
    title: "Dead rats",
    body: "Found during the inspection. Evidence of prior activity even if currently inactive.",
  },
  {
    title: "Fresh droppings",
    body: "Along baseboards, in storage areas, near food or waste. Fresh droppings indicate recent activity.",
  },
  {
    title: "Gnaw marks",
    body: "On food packaging, structural wood, or utility penetrations. Signs of active feeding.",
  },
  {
    title: "Burrows",
    body: "Exterior burrow holes near building foundation or trash storage areas.",
  },
  {
    title: "Grease marks",
    body: "Smear marks along walls or pipes from repeated rat travel along the same path — evidence of harborage and established activity.",
  },
];

const STANDARD = [
  "Cleared active population at the time of treatment",
  "Service receipt documenting the visit",
  "Licensed pest management professional (PMP) compliance documentation",
  "4 to 8 weeks before replacement pressure builds back",
];

const PROGRAM = [
  "Documented declining trend — not just point-in-time treatment",
  "Monthly track count comparisons against Week 1 baseline",
  "Population that decreases rather than cycling back",
  "A record that shows active, continuous, measured management",
  "Your existing vendor stays — this adds a layer, not a replacement",
];

function DohmhPage() {
  return (
    <>
      <SolutionHero
        eyebrow="DOHMH rodent violations NYC"
        headline="You got a DOHMH rodent violation."
        highlight="Here's what it means for your NYC restaurant — and what actually closes it."
        lede="Codes 04K and 04L are critical violations — each worth at least 5 points, fines up to $2,000, and a B in your window if you hit 14 points combined. Standard treatment clears the violation this cycle. It doesn't stop the same citation from appearing at the next unannounced visit. Here's what changes that math."
        image={heroImg}
      />

      {/* CODES + STAT TRIO */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What the codes mean"
            title="Codes 04K and 04L: critical violations, immediate points, fines at OATH."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {CODES.map((c) => (
              <div
                key={c.code}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  {c.code}
                </div>
                <h3 className="mt-3 text-xl font-extrabold leading-tight">
                  {c.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <StatCard
              value="5+"
              label="points minimum per critical"
              sub="Each critical violation adds a minimum of 5 points to your inspection score. Multiple critical findings compound."
            />
            <StatCard
              value="14"
              label="points = B grade"
              sub="A B letter grade in your window. One rodent violation plus any other critical puts most restaurants past that threshold."
            />
            <StatCard
              value="$300–$2,000"
              label="per citation, set at OATH"
              sub="Settle before hearing for a typical reduction. Repeat violations within a short window are treated as a pattern and carry higher fines."
            />
          </div>

          <div className="mt-10 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Rodent violations carry fines from $300 to $2,000 per citation,
              set at an OATH hearing. You can settle before the hearing by
              admitting to the violation, typically at a reduced amount.
              Repeat violations within a short period are treated as a pattern
              and typically carry higher fines and increased inspection
              frequency. At 14 to 27 points you receive a B grade or Grade
              Pending during re-inspection. At 28 points, the grade drops to C
              and DOHMH can issue a correction order or temporary closure of
              the food service establishment.
            </p>
          </div>
        </div>
      </section>

      {/* INSPECTION TRIGGER NARRATIVE */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="How inspections are triggered"
            title="You can't prepare for the inspection date. Either you have it under control or you don't."
            intro={
              <>
                <p>
                  DOHMH conducts unannounced inspections of food service
                  establishments on a cycle based on your current grade —
                  across Manhattan, Brooklyn, Queens, the Bronx, and Staten
                  Island. A 311 rodent complaint can also trigger an
                  out-of-cycle visit. You cannot prepare for the inspection
                  date — you either have the problem under control or you
                  don't when they walk in.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* SIGNS GRID */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What triggers the citation"
            title="Inspectors don't need to see a live rat. Evidence is enough."
            intro={
              <>
                <p>
                  An inspector who finds fresh droppings, gnaw marks on
                  packaging, burrows near the exterior, or any sign of active
                  rodent movement will issue a critical health code violation.
                  Live rodents are the most serious finding, but evidence of
                  recent activity is sufficient.
                </p>
                <p>
                  The timing problem: standard treatment clears the active
                  colony. Within four to eight weeks, a new group moves in
                  from the surrounding block. If the inspector arrives during
                  week two after your treatment, you're clean. Week six,
                  you're exposed to the same violation again.
                </p>
                <p>
                  There's no version of standard pest control — regardless of
                  how frequently your licensed exterminator or pest control
                  operator visits — that removes that variable. The inspection
                  cycle and the replacement cycle run on similar timelines.
                  What changes the math is reducing how fast the replacement
                  population forms.
                </p>
              </>
            }
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {SIGNS.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-extrabold leading-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What changes the outcome"
            title="Closing the violation is different from closing the vulnerability."
            intro={
              <p>
                Treatment closes the violation by clearing the active
                population. It doesn't reduce how fast the replacement forms.
                Inspectors increasingly want to see active management
                documentation, not just a service receipt.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                What standard treatment gives you
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {STANDARD.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-7 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold leading-tight">
                What the 90-day program adds
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {PROGRAM.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            A 90-day record showing declining track counts is a different
            conversation with an inspector than "we called the exterminator
            last month." It shows the problem is trending down, not just
            treated and waiting to return.
          </p>
        </div>
      </section>

      <FieldDataTrio
        intro="What a two-phase managed program produces over 90 days."
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
        title="Start before the next unannounced visit."
        body="The 90-day program takes time to produce a documented trend. The sooner it starts, the more distance you have between your kitchen and the next inspection."
        secondary={{ label: "How it works", to: "/how-it-works" }}
      />

      {/* CROSS-LINK BAND */}
      <section className="bg-background py-12">
        <div className="container-site flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>
            Operating across the river? See our{" "}
            <Link
              to="/nj-rodent-violation"
              className="font-semibold text-brand hover:underline"
            >
              NJ rodent violation guide
            </Link>
            .
          </span>
          <Link
            to="/solutions/restaurants"
            className="font-semibold text-brand hover:underline"
          >
            Restaurant program details →
          </Link>
        </div>
      </section>
    </>
  );
}
