
const STEPS = [
  {
    n: "01",
    title: "Choose your placement",
    body: "Along walls, near burrow entrances, or inside crawl spaces. Rodents run edges — place the station where they already travel.",
  },
  {
    n: "02",
    title: "Load and lock",
    body: "Open with the key, place the bait pouch inside, close and bolt down if needed. The lock keeps kids and pets out.",
  },
  {
    n: "03",
    title: "Check at 30 days",
    body: "If bait is being consumed, the station is in the right spot. Refill and leave it. Consumption is your proof of activity.",
  },
  {
    n: "04",
    title: "Refill every 60–90 days",
    body: "Each cycle reduces the breeding population further. Most sites see measurable drop-off by month three.",
  },
];

export function HowToVideo() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-site py-16">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            How to deploy
          </span>
          <h2 className="pdp-h2 mx-auto mt-2 max-w-sm text-foreground">
            Set it up in under 10 minutes
          </h2>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          {/* Video left */}
          <div className="w-full overflow-hidden rounded-2xl bg-border/20 md:basis-1/2">
            <video
              src="/how-to-deploy.mp4"
              controls
              playsInline
              className="w-full rounded-2xl"
              aria-label="How to deploy Evolve rodent fertility control"
            />
          </div>

          {/* Steps right */}
          <div className="flex flex-col gap-6 md:basis-1/2">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-black text-brand">
                  {s.n}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold text-foreground">{s.title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
