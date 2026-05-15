// TODO: Replace placeholder with a real operator/PCO photo.
// The photo should show the operator in a work context (crawl space, loading dock,
// restaurant kitchen, multi-unit property exterior).
// Permission to feature them: ask directly or reach out via SenesTech reviewer contact.

export function OperatorQuote() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-site py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
          {/* Photo */}
          <div className="overflow-hidden rounded-2xl md:basis-[45%] md:self-stretch">
            {/* Placeholder — swap img tag below once photo is ready */}
            <div className="flex min-h-[320px] w-full items-center justify-center bg-border/30 md:h-full">
              <div className="flex flex-col items-center gap-3 p-8 text-center text-muted-foreground">
                <div className="h-24 w-24 rounded-full bg-border" />
                <p className="text-xs font-medium">
                  Operator photo
                  <br />
                  (400 × 500 px minimum)
                </p>
              </div>
            </div>
            {/* Replace the div above with this once you have the photo:
            <img
              src="/products/operator-don-s.jpg"
              alt="Don S., multi-unit property manager"
              width={600}
              height={700}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            */}
          </div>

          {/* Quote */}
          <div className="flex flex-col gap-6 md:basis-[55%]">
            <blockquote className="text-2xl font-bold leading-snug tracking-tight text-foreground md:text-3xl">
              "We'd been fighting the same building for two years. Three months on Evolve and the
              sightings stopped. The difference is you stop replacing what you remove."
            </blockquote>
            <div>
              <p className="font-bold text-foreground">Don S.</p>
              <p className="text-sm text-muted-foreground">
                Multi-unit Property Manager — New Jersey
              </p>
            </div>
            <a
              href="#overview"
              className="inline-flex h-11 w-fit items-center justify-center rounded-full bg-brand px-7 text-sm font-bold text-brand-foreground transition hover:bg-brand/90"
            >
              Shop the Starter Kit →
            </a>
            <p className="text-xs text-muted-foreground">
              Don S. is an independent property manager and verified Evolve customer. Testimonial
              reflects his individual experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
