import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ArrowLeft, Lock } from "lucide-react";
import { findVariant, FLAT_SHIPPING_USD } from "@/data/products";

const searchSchema = z.object({
  plan: fallback(z.enum(["oneTime", "sub"]), "oneTime").default("oneTime"),
  qty: fallback(z.number().int().min(1).max(10), 1).default(1),
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
  const { plan, qty } = Route.useSearch();

  const usingSub = plan === "sub" && variant.subscription;
  const unitPrice = usingSub ? variant.subscription!.price : variant.oneTimePrice;
  const subtotal = unitPrice * qty;
  const total = subtotal + FLAT_SHIPPING_USD;
  const backTo =
    product.slug === "starter-kit" ? "/products/starter-kit" : "/products/refill";

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
          {/* Form */}
          <div className="md:col-span-3">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Checkout</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Express checkout. Tell us where to ship — we'll send a payment link to confirm.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="mt-6 flex flex-col gap-5 rounded-2xl border border-border bg-card p-6"
            >
              <Field label="Email" type="email" placeholder="you@business.com" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" required />
                <Field label="Last name" required />
              </div>
              <Field label="Company (optional)" />
              <Field label="Street address" required />
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="City" required />
                <Field label="State" required />
                <Field label="ZIP" required />
              </div>
              <Field label="Phone" type="tel" />

              <button
                type="submit"
                disabled
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground/30 px-6 text-base font-bold text-background"
              >
                <Lock className="h-4 w-4" /> Place order — payments coming online soon
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Stripe checkout is wiring up. Submit your details and we'll reach out with a
                payment link within one business day.
              </p>
            </form>
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
                  <span className="text-xs text-muted-foreground">Qty {qty}</span>
                  {usingSub && (
                    <span className="mt-1 inline-flex w-fit rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                      Auto-deliver {variant.subscription!.cadenceLabel}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 border-t border-border pt-4 text-sm">
                <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                <Row label="Shipping" value={`$${FLAT_SHIPPING_USD.toFixed(2)}`} />
                <Row label="Tax" value="—" muted />
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-sm font-semibold text-foreground">Total today</span>
                <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
              </div>
              {usingSub && (
                <p className="text-xs text-muted-foreground">
                  Then ${variant.subscription!.price.toFixed(2)} +{" "}
                  ${FLAT_SHIPPING_USD.toFixed(2)} shipping {variant.subscription!.cadenceLabel}.
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

function Field({
  label,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </label>
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
