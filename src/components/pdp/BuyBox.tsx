import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, Truck, ShieldCheck, RotateCcw, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VariantPills } from "./VariantPills";
import { PlanSelector, type Plan } from "./PlanSelector";
import { StickyMobileBar } from "./StickyMobileBar";
import type { Product, Variant } from "@/data/products";
import { FLAT_SHIPPING_USD } from "@/data/products";

export function BuyBox({
  product,
  variant,
  onVariantChange,
}: {
  product: Product;
  variant: Variant;
  onVariantChange: (id: string) => void;
}) {
  const navigate = useNavigate();
  const hasSub = !!variant.subscription;
  const [plan, setPlan] = useState<Plan>(hasSub ? "sub" : "oneTime");
  const [qty, setQty] = useState(1);

  const effectivePlan: Plan = hasSub ? plan : "oneTime";
  const unitPrice =
    effectivePlan === "sub" && variant.subscription
      ? variant.subscription.price
      : variant.oneTimePrice;
  const totalPrice = unitPrice * qty;

  const priceLabel = useMemo(() => {
    if (effectivePlan === "sub" && variant.subscription) {
      return `$${variant.subscription.price} ${variant.subscription.cadenceLabel}`;
    }
    return `$${variant.oneTimePrice}`;
  }, [effectivePlan, variant]);

  const handleBuy = () => {
    navigate({
      to: "/checkout/$variantId",
      params: { variantId: variant.id },
      search: { plan: effectivePlan, qty },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title + rating */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {product.title}
        </h1>
        <p className="mt-2 text-base text-muted-foreground">{product.subtitle}</p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-accent-warm text-accent-warm" />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">4.8</span>
          <span className="text-sm text-muted-foreground">· based on operator reviews</span>
        </div>
      </div>

      {/* Variant pills */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {product.slug === "starter-kit" ? "Pest type" : "Size & pest"}
        </span>
        <VariantPills
          variants={product.variants}
          selectedId={variant.id}
          onSelect={onVariantChange}
        />
      </div>

      {/* Plan */}
      {hasSub ? (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Purchase option
          </span>
          <PlanSelector variant={variant} selected={plan} onChange={setPlan} />
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                One-time purchase
              </div>
              <div className="text-xs text-muted-foreground">Ships once. No commitment.</div>
            </div>
            <div className="text-2xl font-bold text-foreground">${variant.oneTimePrice}</div>
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-foreground">Quantity</span>
        <div className="flex items-center rounded-full border border-border">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center text-foreground transition hover:bg-surface"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-semibold tabular-nums">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="flex h-10 w-10 items-center justify-center text-foreground transition hover:bg-surface"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Total + CTA */}
      <div className="flex flex-col gap-3 rounded-2xl bg-surface p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">{priceLabel}</span>
          <span className="text-3xl font-bold text-foreground">${totalPrice}</span>
        </div>
        <Button
          onClick={handleBuy}
          className="h-12 rounded-full bg-brand text-base font-bold text-brand-foreground hover:bg-brand/90"
        >
          {effectivePlan === "sub" ? "Start replenishment plan" : "Add to order"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          ${FLAT_SHIPPING_USD.toFixed(2)} flat shipping · ships in 24 hours
        </p>
      </div>

      {/* Trust row */}
      <ul className="grid grid-cols-1 gap-3 border-t border-border pt-5 sm:grid-cols-3">
        <TrustItem icon={Truck} label="Ships in 24h" />
        <TrustItem icon={ShieldCheck} label="EPA-recognized 25(b)" />
        <TrustItem icon={RotateCcw} label="Cancel anytime" />
      </ul>

      {/* Sticky bar (mobile) */}
      <StickyMobileBar
        priceLabel={`$${totalPrice}`}
        ctaLabel={effectivePlan === "sub" ? "Start plan" : "Add to order"}
        onClick={handleBuy}
      />
    </div>
  );
}

function TrustItem({ icon: Icon, label }: { icon: typeof Truck; label: string }) {
  return (
    <li className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
      <Icon className="h-4 w-4 text-brand" />
      {label}
    </li>
  );
}
