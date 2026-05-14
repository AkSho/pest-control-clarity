export function ReboundExplainer() {
  return (
    <section className="container-site py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          The rebound problem
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Two surviving rats can become 15,000 in a year
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          That's why poison and traps stop working. They reduce the count — they don't touch the
          replacement rate.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.title}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
          >
            <div className="text-3xl font-black tracking-tight text-brand">{s.figure}</div>
            <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  {
    figure: "Step 1",
    title: "You remove some",
    body: "Snap traps, glue, anticoagulants — they all work on the visible individuals. Population drops, briefly.",
  },
  {
    figure: "Step 2",
    title: "Survivors breed",
    body: "Rats reach sexual maturity in 5 weeks and produce litters of 8–12 every 21 days. The breeding pair you missed is doing the math.",
  },
  {
    figure: "Step 3",
    title: "It comes back — bigger",
    body: "Within months you're past where you started, paying for another round, and the resistant survivors are the new normal.",
  },
];
