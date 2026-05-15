import { FIELD_RESULTS } from "@/data/products";

const NOT_EVOLVE = [
  "Doesn't kill — no carcasses to find or smell",
  "No secondary poisoning risk for hawks, owls, or pets",
  "No anticoagulants, no neurotoxins",
  "No restricted-use license required",
  "No one-and-done treatment cycle",
];

export function FieldResultsTrio() {
  return (
    <section className="container-site py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          Field results
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          What operators measure on real sites
        </h2>
      </div>

      {/* Stats trio */}
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {FIELD_RESULTS.map((r) => (
          <div
            key={r.label}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-8 text-center"
          >
            <div className="text-5xl font-black tracking-tight text-brand md:text-6xl">
              {r.stat}
            </div>
            <div className="text-base font-semibold text-foreground">{r.label}</div>
            <div className="text-xs text-muted-foreground">{r.note}</div>
          </div>
        ))}
      </div>

      {/* ✗ pattern — what Evolve doesn't do */}
      <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-border bg-surface p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          What Evolve doesn't do
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NOT_EVOLVE.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-[11px] font-bold text-destructive">
                ✗
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
