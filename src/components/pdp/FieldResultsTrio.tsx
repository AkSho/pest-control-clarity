const STATS = [
  {
    stat: "79%",
    label: "Reduction in active rodent tracking",
    context:
      "Measured across two independently monitored urban sites over a 5-month field study.",
  },
  {
    stat: "88%",
    label: "Drop in rodent sightings",
    context:
      "Drop in track density at Location A. Tracks per monitoring plate at stations with residual activity after 5 months.",
  },
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

        {/* Stats grid — 2 stats */}
        <div className="mx-auto mt-12 grid max-w-2xl gap-6 md:grid-cols-2">
          {STATS.map((r) => (
            <div
              key={r.label}
              className="flex flex-col gap-3 rounded-2xl border border-brand/20 bg-card p-8 text-center"
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
      </div>
    </section>
  );
}
