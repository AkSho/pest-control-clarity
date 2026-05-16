
export function ComparisonTable() {
  return (
    <section className="container-site py-4 md:py-6">
      <div className="rounded-2xl border border-border/50 bg-card p-8 md:p-14">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        {/* Heading side */}
        <div className="flex flex-col gap-3 md:max-w-[380px] md:basis-[36%] md:pt-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Evolve vs. alternatives
          </span>
          <h2 className="pdp-h2 text-foreground">
            Why everything else keeps failing
          </h2>
          <p className="text-base text-muted-foreground">
            Every tool you've tried kills the rodents that are there — not the ones being born right now.
            Evolve closes that gap.
          </p>
        </div>

        {/* Comparison image */}
        <div className="overflow-hidden rounded-2xl border border-border/50 md:grow">
          <img
            src="/products/evolve-vs-alternatives.png"
            alt="Evolve vs poison vs snap traps comparison"
            width={900}
            height={600}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      </div>
    </section>
  );
}
