const LOGOS = [
  "NYC DOHMH",
  "Eater",
  "Crain's",
  "Time Out",
  "BBB Accredited",
];

export function PressStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-site py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          As seen on
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
          {LOGOS.map((label) => (
            <span
              key={label}
              className="font-display text-base font-bold uppercase tracking-wider text-foreground/40 transition hover:text-foreground/70 md:text-lg"
              style={{ fontVariant: "small-caps" }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
