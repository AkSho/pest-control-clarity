import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ProductPage } from "@/components/pdp/ProductPage";
import { getProduct } from "@/data/products";

const product = getProduct("refill");

const searchSchema = z.object({
  variant: fallback(z.string(), product.defaultVariantId).default(product.defaultVariantId),
});

export const Route = createFileRoute("/products/refill")({
  validateSearch: zodValidator(searchSchema),
  component: RefillPage,
  head: () => ({
    meta: [
      { title: "Evolve Refill — Rat & Mouse Soft Bait | Cloakd" },
      {
        name: "description",
        content:
          "Keep your stations stocked. Evolve soft-bait refills in 6 lb and 12 lb sizes. Replenishment plan from $129 every 60 days.",
      },
      { property: "og:title", content: "Evolve Refill | Cloakd" },
      {
        property: "og:description",
        content:
          "Continuous baiting is what makes fertility control actually work. Refill pouches and pails for ongoing deployment.",
      },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "https://pest-pro-rebrand.lovable.app/products/refill" },
      { property: "og:image", content: product.variants[0].image },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://pest-pro-rebrand.lovable.app/products/refill",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.subtitle,
          image: product.variants.map((v) => v.image),
          brand: { "@type": "Brand", name: "Evolve" },
          offers: product.variants.map((v) => ({
            "@type": "Offer",
            sku: v.id,
            price: v.oneTimePrice,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `https://pest-pro-rebrand.lovable.app/products/refill?variant=${v.id}`,
          })),
        }),
      },
    ],
  }),
});

function RefillPage() {
  return <ProductPage product={product} routePath="/products/refill" />;
}
