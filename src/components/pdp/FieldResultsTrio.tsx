import { FIELD_RESULTS } from "@/data/products";

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
    </section>
  );
}
