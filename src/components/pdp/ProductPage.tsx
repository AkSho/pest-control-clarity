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
      <section className="container-site py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          {/* Text side */}
          <div className="flex flex-col gap-6 md:basis-1/2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Field-deployed
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                Designed for real properties. Built to run quietly.
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                The XL locking bait station keeps bait secure from kids, pets,
                and non-target animals while giving rodents reliable access. Set
                it, monitor it monthly, and let the biology do the rest.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                "Tamper-resistant — key-locked, bolt-mountable",
                "Works in crawl spaces, wall voids, outdoor runs",
                "No permit required · FIFRA 25(b) exempt",
                "Check every 30 days — refill every 60–90",
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
              className="inline-flex h-11 w-fit items-center justify-center rounded-full bg-brand px-7 text-sm font-bold text-brand-foreground transition hover:bg-brand/90"
            >
              Shop the Starter Kit →
            </a>
          </div>
          {/* Image side */}
          <div className="overflow-hidden rounded-2xl md:basis-1/2 md:self-stretch">
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
      <section id="faq" className="container-site py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              FAQ
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Quick answers
            </h2>
          </div>
          <Accordion type="single" collapsible className="mt-8">
            {product.faq.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* TODO: full reviews widget here (Junip/Okendo) once platform is wired */}

      {/* Closing CTA band — T15 */}
      <section className="border-t border-border bg-brand">
        <div className="container-site py-20 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-brand-foreground md:text-5xl">
            You've been managing a symptom.
            <br className="hidden md:block" /> This addresses the cause.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-brand-foreground/80">
            $12.95 flat shipping. Ships within 24 hours. 30-day guarantee if it doesn't work.
          </p>
          <a
            href="#overview"
            className="mt-8 inline-flex h-13 items-center justify-center rounded-full bg-background px-10 text-base font-bold text-foreground transition hover:bg-background/90"
          >
            Order now ↑
          </a>
        </div>
      </section>
    </div>
  );
}
