import { useState } from "react";
import { Loader2, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { createCheckoutSession } from "@/server-functions/stripe";
import type { Product, Variant } from "@/data/products";
import { FLAT_SHIPPING_USD } from "@/data/products";
import type { Plan } from "./PlanSelector";

export function OrderReviewDrawer({
  open,
  onOpenChange,
  product,
  variant,
  plan,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  product: Product;
  variant: Variant;
  plan: Plan;
}) {
  const createCheckout = useServerFn(createCheckoutSession);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasSub = variant.subPrice !== undefined;
  const isSub = plan === "sub" && hasSub;
  const unitPrice = isSub ? variant.subPrice! : variant.oneTimePrice;
  const savings = hasSub ? variant.oneTimePrice - variant.subPrice! : 0;
  const total = unitPrice + FLAT_SHIPPING_USD;

  const sizeLabel = variant.size.replace(/(\d+)(lb)/i, "$1 lb");
  const pestLabel = variant.pest === "rat" ? "Rats" : "Mice";

  const handleCheckout = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const { url } = await createCheckout({
        data: {
          variantId: variant.id,
          plan,
          origin: window.location.origin,
        },
      });
      window.location.href = url;
    } catch (err) {
      console.error("checkout failed", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-6 py-4 text-left">
          <SheetTitle className="text-base font-bold tracking-tight">
            Review your order
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Line item */}
          <div className="flex gap-4 rounded-2xl border border-border bg-surface p-4">
            <img
              src={variant.image}
              alt={product.title}
              loading="lazy"
              width={96}
              height={96}
              className="h-24 w-24 shrink-0 rounded-xl object-cover"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="text-sm font-bold leading-tight text-foreground">
                {product.title}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Pill>{pestLabel}</Pill>
                <Pill>{sizeLabel}</Pill>
                {isSub && <Pill highlight>Replenish &amp; save</Pill>}
              </div>
              <div className="mt-auto text-sm text-muted-foreground">
                Qty 1 ·{" "}
                <span className="font-semibold text-foreground">
                  ${unitPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Totals */}
          <dl className="mt-5 flex flex-col gap-2 text-sm">
            <Row label="Subtotal" value={`$${unitPrice.toFixed(2)}`} />
            <Row label="Shipping" value={`$${FLAT_SHIPPING_USD.toFixed(2)}`} />
            {isSub && savings > 0 && (
              <Row
                label="Replenishment savings"
                value={`−$${savings.toFixed(2)}`}
                accent
              />
            )}
            <div className="my-1 border-t border-border" />
            <Row
              label={isSub ? "Total per shipment" : "Total"}
              value={`$${total.toFixed(2)}`}
              bold
            />
            {isSub && (
              <p className="text-xs text-muted-foreground">
                Recurs automatically. Cancel anytime.
              </p>
            )}
          </dl>

          {/* Trust bullets */}
          <ul className="mt-6 flex flex-col gap-3 rounded-2xl bg-surface p-4">
            <TrustRow
              icon={Truck}
              label="Ships within 24 hours from the US"
            />
            <TrustRow
              icon={ShieldCheck}
              label="Secure checkout — 256-bit encrypted"
            />
            <TrustRow
              icon={RotateCcw}
              label="30-day deployment support included"
            />
          </ul>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-border bg-background px-6 py-4">
          {error && (
            <p className="mb-2 rounded-lg bg-destructive/10 px-3 py-2 text-center text-xs font-medium text-destructive">
              {error}
            </p>
          )}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-bold text-brand-foreground transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting to secure checkout…
              </>
            ) : (
              <>Checkout securely · ${total.toFixed(2)}</>
            )}
          </button>
          <button
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="mt-2 w-full py-2 text-center text-xs font-semibold text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            Keep shopping
          </button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            By continuing you agree to our{" "}
            <Link to="/" className="underline hover:text-foreground">
              terms
            </Link>
            .
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Pill({
  children,
  highlight = false,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <span
      className={
        highlight
          ? "inline-flex items-center rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand"
          : "inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
      }
    >
      {children}
    </span>
  );
}

function Row({
  label,
  value,
  bold = false,
  accent = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt
        className={
          bold
            ? "text-base font-bold text-foreground"
            : "text-sm text-muted-foreground"
        }
      >
        {label}
      </dt>
      <dd
        className={
          bold
            ? "text-base font-bold text-foreground"
            : accent
              ? "text-sm font-semibold text-brand"
              : "text-sm font-semibold text-foreground"
        }
      >
        {value}
      </dd>
    </div>
  );
}

function TrustRow({
  icon: Icon,
  label,
}: {
  icon: typeof ShieldCheck;
  label: string;
}) {
  return (
    <li className="flex items-center gap-3 text-sm text-foreground">
      <Icon className="h-4 w-4 shrink-0 text-brand" />
      {label}
    </li>
  );
}
