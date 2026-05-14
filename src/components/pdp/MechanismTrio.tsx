import { MECHANISM } from "@/data/products";

export function MechanismTrio() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-site py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            How Evolve works
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Suppress reproduction at the source
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Cottonseed oil interferes with rodent fertility. Both sexes. No die-off, no carcasses,
            no resistance arms race.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {MECHANISM.map((m) => (
            <div
              key={m.title}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-lg font-bold text-foreground">{m.title}</h3>
              <p className="text-sm text-muted-foreground">{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
