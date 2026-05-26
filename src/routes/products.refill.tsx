import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ProductPage } from "@/components/pdp/ProductPage";
import { getProduct } from "@/data/products";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

const product = getProduct("refill");
const CANONICAL_URL = "https://cloakd-removals.cloud/products/refill";

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
          "Keep your stations stocked. Evolve soft-bait refills in 6 lb and 12 lb sizes. Replenishment plan from $129, shipped on a 30–60 day cadence.",
      },
      { property: "og:title", content: "Evolve Refill | Cloakd" },
      {
        property: "og:description",
        content:
          "Continuous baiting is what makes fertility control actually work. Refill pouches and pails for ongoing deployment.",
      },
      { property: "og:type", content: "product" },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: product.variants[0].image },
    ],
    links: [
      {
        rel: "canonical",
        href: CANONICAL_URL,
      },
    ],
    scripts: [
      jsonLdScript({
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
            url: `${CANONICAL_URL}?variant=${v.id}`,
          })),
      }),
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Refill", path: "/products/refill" },
        ]),
      ),
    ],
  }),
});

function RefillPage() {
  return <ProductPage product={product} routePath="/products/refill" />;
}
