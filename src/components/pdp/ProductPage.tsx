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
import { PdpAnchorNav } from "./PdpAnchorNav";
import { WorksOnMarquee } from "./WorksOnMarquee";
import { ReboundExplainer } from "./ReboundExplainer";
import { MechanismTrio } from "./MechanismTrio";
import { FieldResultsTrio } from "./FieldResultsTrio";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { TrustRow } from "./TrustRow";
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

      <WorksOnMarquee />

      <div id="how-it-works">
        <ReboundExplainer />
        <MechanismTrio />
      </div>

      <div id="results">
        <FieldResultsTrio />
      </div>

      <PressStrip />

      <div id="compare">
        <ComparisonTable />
      </div>

      <ReviewsCarousel avgRating={product.rating.avg} count={product.rating.count} />

      <TrustRow />

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

      {/* Closing CTA band */}
      <section className="border-t border-border bg-surface">
        <div className="container-site py-16 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            Stop reacting. Start collapsing the population.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            Flat $12.95 shipping. Ships in 24 hours from NJ. Cancel your replenishment plan
            anytime.
          </p>
          <a
            href="#overview"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-brand px-8 text-base font-bold text-brand-foreground transition hover:bg-brand/90"
          >
            Pick your variant ↑
          </a>
        </div>
      </section>
    </div>
  );
}
