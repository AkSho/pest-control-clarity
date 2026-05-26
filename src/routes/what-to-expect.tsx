import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/program-what-to-expect.jpg";
import { canonicalLink } from "@/lib/seo";
import {
  ClosingCta,
  SectionHeader,
  SolutionHero,
} from "@/components/site/solutions/SolutionPrimitives";

const TITLE = "What to expect — every step of the 90-day program | Cloakd";
const DESCRIPTION =
  "From the first conversation to the final monitoring report. What happens, when it happens, what you receive, and what we need from you at each stage.";

export const Route = createFileRoute("/what-to-expect")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImg },
    ],
    links: canonicalLink("/what-to-expect"),
  }),
  component: WhatToExpectPage,
});

const STAGES: {
  when: string;
  title: string;
  body: string;
  you: string;
  us: string;
}[] = [
  {
    when: "Week 1",
    title: "Intake call and site walk",
    body: "We start with a 20–30 minute call: building type, current pest control vendor, infestation history, any active DOHMH or HPD citations, and access logistics. That's followed by a site walk to confirm entry points, travel paths, and bait station placement before anything goes in. You can't map rat routes over the phone.",
    you: "Provide property details and schedule access for the site walk.",
    us: "Conduct site walk, map entry points and travel paths, draft station placement plan.",
  },
  {
    when: "Weeks 1–3",
    title: "Phase 1 — knockdown through your existing vendor",
    body: "Phase 1 is handled by your existing pest control vendor, not us. We coordinate with them to confirm a knockdown treatment is completed before the Evolve layer goes in. If you don't have an active vendor, we help you source one. The fertility management layer needs to start from a documented clean baseline — that's what Phase 1 creates.",
    you: "Confirm scheduled treatment with your exterminator.",
    us: "Coordinate timing, confirm completion, set baseline tracking plates.",
  },
  {
    when: "Week 3–4",
    title: "Phase 2 — Evolve deployment and baseline tracking",
    body: "Evolve soft bait stations go in along confirmed rat travel paths and near entry points. Baseline tracking plates are placed at each station location. These record initial activity before the fertility management program begins reducing the population — your Week 1 baseline is what every monthly comparison is measured against.",
    you: "Provide access for station installation.",
    us: "Install bait stations, place tracking plates, document baseline counts.",
  },
  {
    when: "Monthly — months 2 and 3",
    title: "Monthly monitoring visits",
    body: "Each monthly visit: tracking plates collected and read, new plates placed, bait stations checked and replenished, notes on any new activity or access changes. The track count at each station is recorded and compared against baseline. By month 3, you have three data points showing the trend direction.",
    you: "Provide access for monthly visits.",
    us: "Collect data, replenish bait, deliver written monitoring report.",
  },
];

const REPORTS = [
  {
    when: "End of Week 3–4",
    title: "Baseline report",
    body: "Station locations, travel paths documented, baseline track counts at each station. This is what every future comparison is measured against. It's also the record that shows active management started on a specific date.",
  },
  {
    when: "End of Month 2",
    title: "Month 2 monitoring report",
    body: "Track count comparison against baseline at every station. Notes on bait consumption, station condition, and any new activity detected. First data point on the trend direction.",
  },
  {
    when: "End of Month 3",
    title: "90-day summary report",
    body: "Full three-point trend line: baseline, month 2, month 3. Track presence percentage, density comparison, station-by-station breakdown. This is the document you hand to an inspector, property owner, or board as evidence of active, consistent, documented management.",
  },
];

const REQUIREMENTS = [
  {
    title: "An existing pest control vendor",
    body: "Phase 1 knockdown runs through whoever already has your account. We coordinate with them — we don't replace them. If you don't have an active vendor, we can point you toward one. Either way, Phase 1 needs to complete before Phase 2 starts.",
  },
  {
    title: "Access for monthly visits",
    body: "Each monthly visit takes 30–45 minutes. We need access to the areas where stations are placed — utility areas, basement, loading dock, kitchen perimeter, or wherever the travel paths are. Advance scheduling, one day's notice.",
  },
  {
    title: "Compliance history if you have it",
    body: "Any active DOHMH violations, HPD complaints, or prior inspection reports help us place stations correctly and frame the monitoring record in a way that's useful for your next inspector interaction. Not required — helpful.",
  },
];

const FAQS = [
  {
    q: "Is this covered by my existing pest control contract?",
    a: "No. This is a separate engagement on top of your existing vendor relationship. Your vendor stays — they handle Phase 1 knockdown. Cloakd handles the Evolve fertility layer and monthly monitoring.",
  },
  {
    q: "What happens after 90 days?",
    a: "At the end of the 90-day period, you have a documented trend line and a complete monitoring record. If activity has declined to the target level, many properties shift to a maintenance schedule. We discuss continuation options at the 90-day report delivery.",
  },
  {
    q: "What if the building has multiple units or floors?",
    a: "Station count and placement plan scale with the building. Multi-unit buildings and multi-floor properties are quoted based on confirmed travel paths and access logistics. The intake conversation covers your building layout so the station plan is specific to your footprint before anything goes in.",
  },
];

function WhatToExpectPage() {
  return (
    <>
      <SolutionHero
        eyebrow="What to expect"
        headline="You've been pitched before and it looked different once it started."
        highlight="Here is every step of the 90-day rodent program before you commit to anything."
        lede="From the first conversation to the final monitoring report. What happens, when it happens, what you receive, and what we need from you at each stage."
        image={heroImg}
      />

      {/* PROGRAM TIMELINE */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="Program timeline"
            title="The program runs in four stages over 90 days. At the end, you have a documented trend line."
          />
          <div className="mt-10 space-y-5">
            {STAGES.map((s, i) => (
              <div
                key={s.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
              >
                <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                  <div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground text-sm font-extrabold">
                      {i + 1}
                    </div>
                    <div className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                      {s.when}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold leading-tight md:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-border bg-surface p-4">
                        <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          You
                        </div>
                        <p className="mt-2 text-sm leading-relaxed">{s.you}</p>
                      </div>
                      <div className="rounded-xl border border-border bg-surface p-4">
                        <div className="text-xs font-semibold uppercase tracking-widest text-brand">
                          Us
                        </div>
                        <p className="mt-2 text-sm leading-relaxed">{s.us}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What you receive"
            title="Three monitoring reports and a documented trend line."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {REPORTS.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  {r.when}
                </div>
                <h3 className="mt-3 text-lg font-extrabold leading-tight">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE NEED FROM YOU */}
      <section className="bg-background py-20">
        <div className="container-site">
          <SectionHeader
            eyebrow="What we need from you"
            title="What we need from you before the first station goes in."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {REQUIREMENTS.map((r, i) => (
              <div
                key={r.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground text-sm font-extrabold">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-base font-bold leading-tight">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING + FAQ */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <div className="rounded-2xl border border-brand/30 bg-brand-soft p-7 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Pricing
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight md:text-4xl">
              Flat program fee, billed once. All visits and materials included.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                The 90-day program is priced as a flat engagement — three
                monthly monitoring visits, all bait and station materials,
                and the full reporting package. Pricing is based on property
                size and number of stations required.
              </p>
              <p>
                Tell us about your property in the intake form and we'll send
                a specific outline within one business day.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {FAQS.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-base font-bold leading-tight">{f.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        title="Ready to start?"
        body="Fill out the intake form. Tell us about your property and current pest control setup. We'll send a program outline — specific to your building, not a generic proposal — within one business day."
        secondary={{ label: "Back to how it works", to: "/how-it-works" }}
      />
    </>
  );
}
