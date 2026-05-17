import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import Stripe from "stripe";
import { getRequestContext } from "cloudflare:workers";
import { findVariant, FLAT_SHIPPING_USD } from "@/data/products";

type CloudflareEnv = { STRIPE_SECRET_KEY: string };

function getStripe(): Stripe {
  const { env } = getRequestContext<CloudflareEnv>();
  if (!env?.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }
  return new Stripe(env.STRIPE_SECRET_KEY);
}

// Cache the shipping rate id per worker instance so we don't leak a new
// Stripe shipping rate on every checkout attempt.
let cachedShippingRateId: string | null = null;

async function getOrCreateShippingRate(stripe: Stripe): Promise<string> {
  if (cachedShippingRateId) return cachedShippingRateId;
  const rate = await stripe.shippingRates.create({
    display_name: "Standard Shipping",
    type: "fixed_amount",
    fixed_amount: {
      amount: Math.round(FLAT_SHIPPING_USD * 100),
      currency: "usd",
    },
    delivery_estimate: {
      minimum: { unit: "business_day", value: 2 },
      maximum: { unit: "business_day", value: 5 },
    },
    metadata: { key: "cloakd_flat_v1" },
  });
  cachedShippingRateId = rate.id;
  return rate.id;
}

function absoluteImage(origin: string, image: string): string {
  if (/^https?:\/\//i.test(image)) return image;
  return `${origin}${image.startsWith("/") ? "" : "/"}${image}`;
}

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      variantId: z.string(),
      plan: z.enum(["oneTime", "sub"]),
      origin: z.string().url(),
    }),
  )
  .handler(
    async ({
      data,
    }: {
      data: { variantId: string; plan: "oneTime" | "sub"; origin: string };
    }) => {
      const found = findVariant(data.variantId);
      if (!found) throw new Error("Variant not found");
      const { product, variant } = found;

      const usingSub = data.plan === "sub" && variant.subPrice !== undefined;
      const stripe = getStripe();

      const shippingRateId = await getOrCreateShippingRate(stripe);

      const productData = {
        name: variant.shortName,
        description:
          product.subtitle ??
          "Evolve rodent fertility control — ships within 24 hours.",
        images: [absoluteImage(data.origin, variant.image)],
        metadata: {
          variantId: variant.id,
          productSlug: variant.productSlug,
        },
      };

      const lineItem: any = usingSub
        ? {
            price_data: {
              currency: "usd",
              product_data: productData,
              unit_amount: Math.round(variant.subPrice! * 100),
              recurring: {
                interval: "day",
                interval_count: variant.subDays!,
              },
            },
            quantity: 1,
          }
        : {
            price_data: {
              currency: "usd",
              product_data: productData,
              unit_amount: Math.round(variant.oneTimePrice * 100),
            },
            quantity: 1,
          };

      const cancelPath =
        variant.productSlug === "starter-kit"
          ? `/products/starter-kit?variant=${variant.id}`
          : `/products/refill?variant=${variant.id}`;

      const session = await stripe.checkout.sessions.create({
        mode: usingSub ? "subscription" : "payment",
        line_items: [lineItem],
        shipping_address_collection: { allowed_countries: ["US"] },
        shipping_options: [{ shipping_rate: shippingRateId }],
        phone_number_collection: { enabled: true },
        billing_address_collection: "auto",
        allow_promotion_codes: true,
        payment_method_types: ["card", "link"],
        custom_text: {
          submit: {
            message:
              "Ships within 24 hours · 30-day deployment support included.",
          },
        },
        ...(usingSub
          ? {
              subscription_data: {
                description: `${variant.shortName} — auto-renews every ${variant.subDays} days. Cancel anytime.`,
                metadata: {
                  variantId: variant.id,
                  productSlug: variant.productSlug,
                },
              },
            }
          : {}),
        success_url: `${data.origin}/payment-confirmed?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${data.origin}${cancelPath}`,
        metadata: {
          variantId: data.variantId,
          plan: data.plan,
          productSlug: variant.productSlug,
        },
      });

      if (!session.url) throw new Error("Stripe did not return a checkout URL");
      return { url: session.url };
    },
  );

// One-time PaymentIntent for the Express Checkout Element (Apple Pay / Google
// Pay / Link). Subscriptions still go through hosted Checkout.
export const createPaymentIntent = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      variantId: z.string(),
    }),
  )
  .handler(async ({ data }: { data: { variantId: string } }) => {
    const found = findVariant(data.variantId);
    if (!found) throw new Error("Variant not found");
    const { variant } = found;

    const stripe = getStripe();
    const amount = Math.round(
      (variant.oneTimePrice + FLAT_SHIPPING_USD) * 100,
    );

    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      description: `${variant.shortName} (one-time)`,
      shipping: undefined,
      metadata: {
        variantId: variant.id,
        productSlug: variant.productSlug,
        plan: "oneTime",
      },
    });

    if (!intent.client_secret) {
      throw new Error("Stripe did not return a client secret");
    }
    return { clientSecret: intent.client_secret, amount };
  });
