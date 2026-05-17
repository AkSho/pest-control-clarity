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

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      variantId: z.string(),
      plan: z.enum(["oneTime", "sub"]),
      origin: z.string().url(),
    }),
  )
  .handler(async ({ data }: { data: { variantId: string; plan: "oneTime" | "sub"; origin: string } }) => {
    const found = findVariant(data.variantId);
    if (!found) throw new Error("Variant not found");
    const { variant } = found;

    const usingSub = data.plan === "sub" && variant.subPrice !== undefined;
    const stripe = getStripe();

    const shippingRate = await stripe.shippingRates.create({
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
    });

    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = usingSub
      ? {
          price_data: {
            currency: "usd",
            product_data: { name: variant.shortName },
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
            product_data: { name: variant.shortName },
            unit_amount: Math.round(variant.oneTimePrice * 100),
          },
          quantity: 1,
        };

    const session = await stripe.checkout.sessions.create({
      mode: usingSub ? "subscription" : "payment",
      line_items: [lineItem],
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: [{ shipping_rate: shippingRate.id }],
      success_url: `${data.origin}/payment-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${data.origin}/checkout/${data.variantId}?plan=${data.plan}`,
      metadata: {
        variantId: data.variantId,
        plan: data.plan,
      },
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL");
    return { url: session.url };
  });
