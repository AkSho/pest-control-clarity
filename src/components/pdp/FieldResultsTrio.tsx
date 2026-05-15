const STATS = [
  {
    stat: "79%",
    label: "Reduction in active rodent tracking",
    context:
      "Measured across two independently monitored urban sites over a 5-month field study. Active tracking dropped from baseline to near-zero with consistent bait deployment.",
  },
  {
    stat: "88%",
    label: "Drop in rodent sightings",
    context:
      "Reported by pest management professionals running Evolve across active commercial and residential sites in conjunction with existing control programs.",
  },
  {
    stat: "79%+",
    label: "Trap-catch reduction",
    context:
      "Compared to pre-deployment baseline trapping at a second monitored urban site. Fewer animals being caught means fewer are in circulation.",
  },
  {
    stat: "90%+",
    label: "Population reduction in IPM studies",
    context:
      "Achieved in Integrated Pest Management deployments pairing Evolve with active lethal control. Fertility suppression plus culling accelerates population collapse.",
  },
];

const NOT_EVOLVE = [
  "Doesn't kill — no carcasses to find or smell",
  "No secondary poisoning risk for hawks, owls, or pets",
  "No anticoagulants, no neurotoxins",
  "No restricted-use license required",
  "No one-and-done treatment cycle",
];

export function FieldResultsTrio() {
  return (
    <section className="container-site py-4 md:py-6">
      <div className="rounded-2xl border border-border/50 bg-surface p-8 md:p-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            Field results
          </span>
          <h2 className="pdp-h2 mt-2 text-foreground">
            What the field data shows
          </h2>
        </div>

        {/* Stats grid */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((r) => (
            <div
              key={r.label}
              className="flex flex-col gap-3 rounded-2xl border border-brand/20 bg-card p-6 text-center"
            >
              <p className="pdp-stat">{r.stat}</p>
              <p className="text-base font-semibold leading-snug text-foreground">
                {r.label}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {r.context}
              </p>
            </div>
          ))}
        </div>

        {/* What Evolve doesn't do */}
        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-border bg-card p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            What Evolve doesn't do
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {NOT_EVOLVE.map((item) => (
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
      </div>
    </section>
  );
}
