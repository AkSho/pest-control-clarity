type Logo = {
  name: string;
  // Tailwind classes that approximate the brand's wordmark vibe
  className: string;
  // optional bottom mini-line
  sub?: string;
  style?: React.CSSProperties;
};

const LOGOS: Logo[] = [
  {
    name: "Pest Management Professional",
    className: "font-display italic font-black tracking-tight",
    sub: "MAGAZINE",
  },
  {
    name: "PCT",
    className: "font-display font-black tracking-tighter",
    sub: "Pest Control Technology",
  },
  {
    name: "FOX 32",
    className: "font-display font-black tracking-tight",
    sub: "CHICAGO",
  },
  {
    name: "NEW YORK POST",
    className: "font-display italic font-black tracking-tight",
    style: { transform: "skewX(-8deg)" },
  },
  {
    name: "Successful Farming",
    className: "font-display font-bold tracking-tight",
    sub: "EST. 1902",
  },
];

export function PressStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-site py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          As seen on
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
          {LOGOS.map((l) => (
            <div
              key={l.name}
              className="flex flex-col items-center text-center text-foreground/45 transition hover:text-foreground/80"
            >
              <span
                className={`text-base md:text-lg ${l.className}`}
                style={l.style}
              >
                {l.name}
              </span>
              {l.sub && (
                <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em]">
                  {l.sub}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
