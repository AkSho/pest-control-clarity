import { Play } from "lucide-react";

// TODO: wire real Vimeo/YouTube URLs and poster images per testimonial.
const SLOTS = [
  { who: "HOA board chair", env: "120-unit complex" },
  { who: "Pest-control operator", env: "Commercial accounts" },
  { who: "Restaurant owner", env: "Brooklyn, NY" },
];

export function VideoTestimonialsRow() {
  return (
    <section className="container-site py-12">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          Video testimonials
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Operators on camera
        </h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {SLOTS.map((s, i) => (
          <div
            key={i}
            className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border-2 border-dashed border-border bg-surface p-5"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background/80 ring-1 ring-border">
                <Play className="h-5 w-5 fill-foreground text-foreground" />
              </div>
            </div>
            <div className="absolute left-3 top-3 rounded-full bg-background/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              TODO · video
            </div>
            <div className="relative z-10">
              <div className="text-sm font-bold text-foreground">{s.who}</div>
              <div className="text-xs text-muted-foreground">{s.env}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
