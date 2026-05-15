import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductGallery } from "./ProductGallery";
import { BuyBox } from "./BuyBox";
import { ComparisonTable } from "./ComparisonTable";
import { FeaturesRadial } from "./FeaturesRadial";
import { FindYourFit } from "./FindYourFit";
import { HowToVideo } from "./HowToVideo";
import { OperatorQuote } from "./OperatorQuote";
import { PdpAnchorNav } from "./PdpAnchorNav";
import { FieldResultsTrio } from "./FieldResultsTrio";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { PressStrip } from "@/components/site/PressStrip";
import type { Product } from "@/data/products";

export function ProductPage({ product, routePath }: { product: Product; routePath: string }) {
  const navigate = useNavigate();
  const search = useSearch({ from: routePath as "/products/starter-kit" }) as {
    variant?: string;
  };

  const variant = useMemo(() => {
    const found = product.variants.find((v) => v.id === search.variant);
    return found ?? product.variants.find((v) => v.id === product.defaultVariantId)!;
  }, [product, search.variant]);

  const onVariantChange = (id: string) => {
    navigate({
      to: routePath as "/products/starter-kit",
      search: { variant: id },
      replace: true,
    });
  };

  return (
    <div className="bg-background pb-32 md:pb-12">
      <PdpAnchorNav />

      {/* Hero: gallery + buy box */}
      <section
        id="overview"
        className="container-site grid gap-8 py-8 md:grid-cols-2 md:gap-12 md:py-12 lg:gap-16"
      >
        <div className="md:sticky md:top-5 md:self-start">
          <ProductGallery images={variant.galleryImages} alt={variant.shortName} />
        </div>
        <BuyBox product={product} variant={variant} onVariantChange={onVariantChange} />
      </section>

      <PressStrip />

      <FeaturesRadial />

      {/* 50/50 lifestyle — station deployed in context */}
      <section className="container-site py-4 md:py-6">
        <div className="rounded-2xl border border-border/50 bg-card p-8 md:p-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
            {/* Text side */}
            <div className="flex flex-col gap-6 md:basis-1/2">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                  How deployment works
                </span>
                <h2 className="pdp-h2 mt-2 text-foreground">
                  The only job is keeping it stocked.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Evolve works as long as bait is available. Place the station where rodents already
                  travel. Check for consumption. Keep it stocked. The colony declines on its own
                  schedule.
                </p>
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  "Place where rodents travel: along walls, fence lines, or near burrow openings.",
                  "Check for consumption. If bait is being eaten, the station is in the right spot.",
                  "Refill before it runs empty. Frequency depends on site activity.",
                  "Each refill cycle builds on the last. The colony declines without a die-off.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-base text-foreground"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#overview"
                className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-brand px-7 text-sm font-bold text-brand-foreground shadow-[2px_2px_0_0_oklch(0.15_0.06_262)] transition hover:shadow-[1px_1px_0_0_oklch(0.15_0.06_262)] hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                Shop now →
              </a>
            </div>
            {/* Image side */}
            <div className="overflow-hidden rounded-2xl border-2 border-brand/20 shadow-[2px_2px_0_0_var(--color-brand)] md:basis-1/2 md:self-stretch">
              <img
                src="/products/station-closed.png"
                alt="Evolve XL locking bait station"
                width={800}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div id="results">
        <FieldResultsTrio />
      </div>

      <ReviewsCarousel avgRating={product.rating.avg} count={product.rating.count} />

      <HowToVideo />

      <div id="compare">
        <ComparisonTable />
      </div>

      <OperatorQuote />

      <FindYourFit currentSlug={product.slug} />

      {/* FAQ — full version */}
      <section id="faq" className="container-site py-4 md:py-6">
        <div className="rounded-2xl border border-border/50 bg-card p-8 md:p-14">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                FAQ
              </span>
              <h2 className="pdp-h2 mt-2 text-foreground">
                Quick answers
              </h2>
            </div>
            <Accordion type="single" collapsible className="mt-8">
              {product.faq.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-[1.125rem] font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="border-t border-border bg-brand">
        <div className="container-site py-20 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-brand-foreground md:text-5xl" style={{ letterSpacing: "-0.05em", lineHeight: 1.1 }}>
            You've been managing a symptom.
            <br className="hidden md:block" /> This addresses the cause.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-brand-foreground/80">
            $12.95 flat shipping. Ships within 24 hours.
          </p>
          <a
            href="#overview"
            className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-background px-10 text-base font-bold text-foreground shadow-[2px_2px_0_0_oklch(0.15_0.06_262)] transition hover:shadow-[1px_1px_0_0_oklch(0.15_0.06_262)] hover:translate-x-[1px] hover:translate-y-[1px]"
          >
            Order now ↑
          </a>
        </div>
      </section>
    </div>
  );
}
