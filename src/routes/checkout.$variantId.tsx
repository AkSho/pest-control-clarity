import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useState } from "react";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { findVariant, FLAT_SHIPPING_USD } from "@/data/products";
import { createCheckoutSession } from "@/server-functions/stripe";

const searchSchema = z.object({
  plan: fallback(z.enum(["oneTime", "sub"]), "oneTime").default("oneTime"),
});

export const Route = createFileRoute("/checkout/$variantId")({
  validateSearch: zodValidator(searchSchema),
  loader: ({ params }) => {
    const found = findVariant(params.variantId);
    if (!found) throw notFound();
    return found;
  },
  component: CheckoutPage,
  head: ({ params }) => ({
    meta: [
      { title: "Checkout | Cloakd" },
      { name: "description", content: "Complete your Evolve order." },
      { name: "robots", content: "noindex" },
      {
        property: "og:url",
        content: `https://pest-pro-rebrand.lovable.app/checkout/${params.variantId}`,
      },
    ],
  }),
});

function CheckoutPage() {
  const { product, variant } = Route.useLoaderData();
  const { plan } = Route.useSearch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const usingSub = plan === "sub" && variant.subPrice !== undefined;
  const unitPrice = usingSub ? variant.subPrice! : variant.oneTimePrice;
  const total = unitPrice + FLAT_SHIPPING_USD;
  const cadenceLabel =
    variant.subDays === 60
      ? "every 60 days"
      : variant.subDays
        ? `every ${variant.subDays} days`
        : "";
  const backTo =
    product.slug === "starter-kit" ? "/products/starter-kit" : "/products/refill";

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const { url } = await createCheckoutSession({
        data: {
          variantId: variant.id,
          plan,
          origin: window.location.origin,
        },
      });
      window.location.href = url;
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="container-site py-8 md:py-12">
        <Link
          to={backTo}
          search={{ variant: variant.id }}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to product
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-5 md:gap-12">
          {/* Checkout action */}
          <div className="md:col-span-3">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Checkout</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              You'll enter your shipping and payment details on the next page.
            </p>

            <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-brand" />
                  Shipping and payment collected securely via Stripe
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-brand" />
                  Ships within 24 hours · $12.95 flat shipping to the US
                </div>
                {usingSub && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-brand" />
                    Replenishment plan auto-renews {cadenceLabel}. Cancel anytime.
                  </div>
                )}
              </div>

              {error && (
                <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </p>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="pdp-btn-primary mt-2 flex w-full items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  "Redirecting…"
                ) : (
                  <>
                    <Lock className="h-4 w-4" /> Proceed to secure checkout
                  </>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Powered by Stripe. Your card details are never stored by Cloakd.
              </p>
            </div>
          </div>

          {/* Summary */}
          <aside className="md:col-span-2">
            <div className="sticky top-24 flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Order summary
              </h2>
              <div className="flex gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-white">
                  <img
                    src={variant.image}
                    alt={variant.shortName}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">{variant.shortName}</span>
                  {usingSub && (
                    <span className="mt-1 inline-flex w-fit rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                      Auto-deliver {cadenceLabel}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 border-t border-border pt-4 text-sm">
                <Row label="Subtotal" value={`$${unitPrice}`} />
                <Row label="Shipping" value={`$${FLAT_SHIPPING_USD.toFixed(2)}`} />
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-sm font-semibold text-foreground">Total today</span>
                <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
              </div>
              {usingSub && cadenceLabel && (
                <p className="text-xs text-muted-foreground">
                  Then ${unitPrice} + ${FLAT_SHIPPING_USD.toFixed(2)} shipping {cadenceLabel}.
                  Cancel anytime.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}


function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={muted ? "text-muted-foreground" : "font-medium text-foreground"}>
        {value}
      </span>
    </div>
  );
}
