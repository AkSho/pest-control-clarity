import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ProductPage } from "@/components/pdp/ProductPage";
import { getProduct } from "@/data/products";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

const product = getProduct("starter-kit");
const CANONICAL_URL = "https://cloakd-removals.cloud/products/starter-kit";

const searchSchema = z.object({
  variant: fallback(z.string(), product.defaultVariantId).default(product.defaultVariantId),
});

export const Route = createFileRoute("/products/starter-kit")({
  validateSearch: zodValidator(searchSchema),
  component: StarterKitPage,
  head: () => ({
    meta: [
      { title: "Evolve XL Starter Kit — Rodent Fertility Control | Cloakd" },
      {
        name: "description",
        content:
          "Start a rodent fertility-control program. Two locked bait stations, keys, and a 6 lb pouch of Evolve soft bait. Ships in 24 hours. $179.",
      },
      { property: "og:title", content: "Evolve XL Starter Kit | Cloakd" },
      {
        property: "og:description",
        content:
          "Stop replacing rodents you remove. The XL Starter Kit gives you the full first-deployment setup — stations, keys, and 6 lb of Evolve soft bait.",
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
          { name: "Starter Kit", path: "/products/starter-kit" },
        ]),
      ),
    ],
  }),
});

function StarterKitPage() {
  return <ProductPage product={product} routePath="/products/starter-kit" />;
}
