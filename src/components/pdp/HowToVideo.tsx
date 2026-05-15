// TODO: Replace YOUTUBE_ID with the actual YouTube short ID when ready.
// The video should show: open station, place bait, close + secure, check at 30 days.
const YOUTUBE_ID = "";

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
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            How to deploy
          </span>
          <h2 className="mx-auto mt-2 max-w-sm text-3xl font-bold tracking-tight md:text-4xl">
            Set it up in under 10 minutes
          </h2>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          {/* Video left */}
          <div className="w-full overflow-hidden rounded-2xl bg-border/20 md:basis-1/2">
            {YOUTUBE_ID ? (
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
                  title="How to deploy Evolve rodent fertility control"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full rounded-2xl"
                />
              </div>
            ) : (
              /* Placeholder until video is ready */
              <div className="flex aspect-video items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-border">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">Deployment video coming soon</p>
                </div>
              </div>
            )}
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
