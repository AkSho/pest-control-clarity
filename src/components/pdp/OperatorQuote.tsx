// Photo placeholder: swap the grey box below with an <img> tag once you have a photo of Larry B.
// Suggested shot: Larry in the field — crawl space, loading dock, or property exterior.
// Minimum size: 600×700px. File path: /public/products/operator-larry-b.jpg

export function OperatorQuote() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-site py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
          {/* Photo */}
          <div className="overflow-hidden rounded-2xl md:basis-[45%] md:self-stretch">
            {/* Swap this placeholder once photo is ready */}
            <div className="flex min-h-[320px] w-full items-center justify-center bg-border/30 md:h-full">
              <div className="flex flex-col items-center gap-3 p-8 text-center text-muted-foreground">
                <div className="h-24 w-24 rounded-full bg-border" />
                <p className="text-xs font-medium">
                  Larry B.
                  <br />
                  (400 × 500 px minimum)
                </p>
              </div>
            </div>
            {/*
            <img
              src="/products/operator-larry-b.jpg"
              alt="Larry B., South County Pest Control"
              width={600}
              height={700}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            */}
          </div>

          {/* Quote */}
          <div className="flex flex-col gap-6 md:basis-[55%]">
            <blockquote className="pdp-h3 leading-snug text-foreground">
              "At the start of June, we were trapping 60–70 rats per week. By end of July, 1 per
              week. In 30 years I haven't seen anything like this."
            </blockquote>
            <div>
              <p className="text-base font-bold text-foreground">Larry B.</p>
              <p className="text-sm text-muted-foreground">South County Pest Control</p>
            </div>
            <a
              href="#overview"
              className="inline-flex h-11 w-fit items-center justify-center rounded-full bg-brand px-7 text-sm font-bold text-brand-foreground transition hover:bg-brand/90"
            >
              Shop the Starter Kit →
            </a>
            <p className="text-xs text-muted-foreground">
              Larry B. is an independent pest control operator and verified Evolve customer.
              Testimonial reflects his individual experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
