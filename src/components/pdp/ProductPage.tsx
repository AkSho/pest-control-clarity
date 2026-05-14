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
import { ValueStrip } from "./ValueStrip";
import { ComparisonTable } from "./ComparisonTable";
import { ReviewsGrid } from "@/components/site/ReviewsGrid";
import type { Product } from "@/data/products";

export function ProductPage({ product, routePath }: { product: Product; routePath: string }) {
  const navigate = useNavigate();
  // routePath is "/products/starter-kit" | "/products/refill"
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
      {/* Hero: gallery + buy box */}
      <section className="container-site grid gap-8 py-8 md:grid-cols-2 md:gap-12 md:py-12 lg:gap-16">
        <ProductGallery images={variant.galleryImages} alt={variant.shortName} />
        <BuyBox product={product} variant={variant} onVariantChange={onVariantChange} />
      </section>

      <ValueStrip />

      {/* Description */}
      <section className="container-site grid gap-10 py-16 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Why this exists
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{product.intro}</h2>
        </div>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:col-span-3">
          {product.longDescription.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-surface">
        <div className="container-site py-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              How it works
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Three steps. One mechanism the alternatives don't have.
            </h2>
          </div>
          <ol className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {product.howItWorks.map((s) => (
              <li
                key={s.step}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
              >
                <span className="text-xs font-bold tracking-wider text-brand">{s.step}</span>
                <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features */}
      <section className="container-site py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What you're getting</h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
          {product.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-base font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="border-y border-border bg-surface">
        <div className="container-site py-16">
          <div className="mx-auto max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {product.slug === "starter-kit" ? "What's in the box" : "What ships"}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              {product.slug === "starter-kit"
                ? "Everything for first deployment"
                : "Pure refill, ready to drop in"}
            </h2>
            <ul className="mt-6 space-y-3">
              {product.whatsIncluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ComparisonTable />

      {/* Reviews */}
      <section className="border-y border-border bg-surface">
        <div className="container-site py-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Operators in the field
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              From people who actually deploy this
            </h2>
          </div>
          <div className="mt-10">
            <ReviewsGrid />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-site py-16">
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
    </div>
  );
}
