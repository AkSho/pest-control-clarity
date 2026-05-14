import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, Truck, ShieldCheck, RotateCcw, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PestPills } from "./PestPills";
import { SizePills } from "./SizePills";
import { PlanSelector, type Plan } from "./PlanSelector";
import { StickyMobileBar } from "./StickyMobileBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Pest, Product, Variant } from "@/data/products";
import {
  FLAT_SHIPPING_USD,
  FREE_SHIPPING_THRESHOLD_USD,
  sizesFor,
  subscriptionPrice,
  uniquePests,
} from "@/data/products";

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
  const [plan, setPlan] = useState<Plan>("sub");
  const [qty, setQty] = useState(1);
  const [cadence, setCadence] = useState(product.subscription.defaultMonths);

  const pests = useMemo(() => uniquePests(product.variants), [product]);
  const sizes = useMemo(() => sizesFor(product.variants, variant.pest), [product, variant.pest]);

  const onPestChange = (p: Pest) => {
    // try to keep same size; fall back to first available
    const same = product.variants.find((v) => v.pest === p && v.size === variant.size);
    const fallback = product.variants.find((v) => v.pest === p);
    const next = same ?? fallback;
    if (next) onVariantChange(next.id);
  };

  const unitPrice =
    plan === "sub"
      ? subscriptionPrice(variant.oneTimePrice, product.subscription.discountPct)
      : variant.oneTimePrice;
  const totalPrice = unitPrice * qty;
  const totalLabel = `$${totalPrice.toFixed(2)}`;
  const freeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD_USD;

  const handleBuy = () => {
    navigate({
      to: "/checkout/$variantId",
      params: { variantId: variant.id },
      search: { plan, qty, cadence },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title + rating */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className={
                  i < Math.round(product.rating.avg)
                    ? "h-4 w-4 fill-accent-warm text-accent-warm"
                    : "h-4 w-4 text-muted-foreground"
                }
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">
            {product.rating.avg.toFixed(1)}
          </span>
          <a href="#reviews" className="text-sm text-muted-foreground hover:text-foreground">
            ({product.rating.count} reviews)
          </a>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {product.title}
        </h1>
        <p className="mt-2 text-base text-muted-foreground">{product.subtitle}</p>
      </div>

      {/* Pest */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pest
        </span>
        <PestPills pests={pests} selected={variant.pest} onSelect={onPestChange} />
      </div>

      {/* Size */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Size
        </span>
        <SizePills variants={sizes} selectedId={variant.id} onSelect={onVariantChange} />
      </div>

      {/* Plan */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Purchase option
        </span>
        <PlanSelector
          product={product}
          variant={variant}
          selected={plan}
          onChange={setPlan}
          cadenceMonths={cadence}
          onCadenceChange={setCadence}
        />
      </div>

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
          <span className="text-sm text-muted-foreground">
            {plan === "sub" ? "Per shipment" : "One-time"}
          </span>
          <span className="text-3xl font-bold text-foreground">{totalLabel}</span>
        </div>
        <Button
          onClick={handleBuy}
          className="h-12 rounded-full bg-brand text-base font-bold text-brand-foreground hover:bg-brand/90"
        >
          {plan === "sub" ? "Start replenishment plan" : "Add to order"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          {freeShipping
            ? "✓ Free shipping unlocked · ships in 24h"
            : `$${FLAT_SHIPPING_USD.toFixed(2)} flat shipping · free over $${FREE_SHIPPING_THRESHOLD_USD}`}
        </p>
      </div>

      {/* Trust row */}
      <ul className="grid grid-cols-1 gap-3 border-t border-border pt-5 sm:grid-cols-3">
        <TrustItem icon={Truck} label="Ships in 24h" />
        <TrustItem icon={ShieldCheck} label="EPA 25(b) exempt" />
        <TrustItem icon={RotateCcw} label="Cancel anytime" />
      </ul>

      {/* Inline accordion (Gruns 1:1) */}
      <Accordion type="single" collapsible className="border-t border-border pt-2">
        <AccItem value="desc" label="Description">
          {product.accordion.description}
        </AccItem>
        <AccItem value="how" label="How it works">
          {product.accordion.howItWorks}
        </AccItem>
        <AccItem value="inside" label="What's inside">
          {product.accordion.whatsInside}
        </AccItem>
        <AccItem value="ing" label="Ingredients & safety">
          {product.accordion.ingredients}
        </AccItem>
        <AccItem value="dep" label="Deployment guide">
          {product.accordion.deployment}{" "}
          <a
            href="https://senestech.com/evolve-deployment-guide"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-brand underline-offset-4 hover:underline"
          >
            Download PDF
          </a>
        </AccItem>
        <AccItem value="ship" label="Shipping & returns">
          {product.accordion.shipping}
        </AccItem>
      </Accordion>

      {/* Sticky bar (mobile) */}
      <StickyMobileBar
        priceLabel={totalLabel}
        ctaLabel={plan === "sub" ? "Start plan" : "Add to order"}
        onClick={handleBuy}
      />
    </div>
  );
}

function AccItem({
  value,
  label,
  children,
}: {
  value: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem value={value} className="border-b border-border">
      <AccordionTrigger className="py-3 text-sm font-bold uppercase tracking-wider text-foreground hover:no-underline">
        {label}
      </AccordionTrigger>
      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
        {children}
      </AccordionContent>
    </AccordionItem>
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

// silence unused import in some bundlers
void ChevronDown;
