import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
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
import { FLAT_SHIPPING_USD, sizesFor, uniquePests } from "@/data/products";

const FEATURE_BULLETS = [
  "Attacks reproduction, not just individuals",
  "FIFRA 25(b) exempt — no license required",
  "Safe for pets, kids & non-target wildlife",
  "Works where traps and poison fail",
];

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

  const hasSub = variant.subPrice !== undefined;
  const [plan, setPlan] = useState<Plan>(hasSub ? "sub" : "oneTime");

  // Reset to oneTime if switching to a variant without a sub plan
  const handleVariantChange = (id: string) => {
    const next = product.variants.find((v) => v.id === id);
    if (next && next.subPrice === undefined) setPlan("oneTime");
    onVariantChange(id);
  };

  const pests = useMemo(() => uniquePests(product.variants), [product]);
  const sizes = useMemo(() => sizesFor(product.variants, variant.pest), [product, variant.pest]);

  const onPestChange = (p: Pest) => {
    const same = product.variants.find((v) => v.pest === p && v.size === variant.size);
    const fallback = product.variants.find((v) => v.pest === p);
    const next = same ?? fallback;
    if (next) handleVariantChange(next.id);
  };

  const unitPrice = plan === "sub" && hasSub ? variant.subPrice! : variant.oneTimePrice;
  const priceLabel = `$${unitPrice}`;

  const savings = hasSub ? variant.oneTimePrice - variant.subPrice! : 0;

  const handleBuy = () => {
    navigate({
      to: "/checkout/$variantId",
      params: { variantId: variant.id },
      search: { plan },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Rating + title */}
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

      {/* Feature bullets */}
      <ul className="flex flex-col gap-2">
        {FEATURE_BULLETS.map((bullet) => (
          <li key={bullet} className="flex items-center gap-2.5 text-sm text-foreground">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
              ✓
            </span>
            {bullet}
          </li>
        ))}
      </ul>

      {/* Pest */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pest
        </span>
        <PestPills pests={pests} selected={variant.pest} onSelect={onPestChange} />
      </div>

      {/* Size */}
      {sizes.length > 1 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Size
          </span>
          <SizePills variants={sizes} selectedId={variant.id} onSelect={handleVariantChange} />
        </div>
      )}

      {/* Plan selector — only for refill variants */}
      {hasSub && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Replenishment plan:
          </span>
          <PlanSelector variant={variant} selected={plan} onChange={setPlan} />
        </div>
      )}

      {/* CTA block */}
      <div className="flex flex-col gap-3 rounded-2xl bg-surface p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">
            {plan === "sub" ? "Per shipment" : "One-time"}
          </span>
          <span className="text-3xl font-bold text-foreground">{priceLabel}</span>
        </div>
        <Button
          onClick={handleBuy}
          className="h-12 rounded-full bg-brand text-base font-bold text-brand-foreground hover:bg-brand/90"
        >
          Order Now
        </Button>
        {/* Post-CTA confirmation */}
        {plan === "sub" && hasSub ? (
          <p className="text-center text-xs font-medium text-brand">
            Replenishment plan applied ✓ You're saving ${savings} on this order
          </p>
        ) : (
          <p className="text-center text-xs text-muted-foreground">
            ${FLAT_SHIPPING_USD.toFixed(2)} flat shipping · ships in 24h from NJ
          </p>
        )}
      </div>

      {/* Trust badges */}
      <ul className="grid grid-cols-3 gap-3 border-t border-border pt-5">
        <TrustItem icon={RotateCcw} label="30-day guarantee" />
        <TrustItem icon={ShieldCheck} label="EPA 25(b)" />
        <TrustItem icon={Truck} label="Ships 24h NJ" />
      </ul>

      {/* Inline accordion */}
      <Accordion type="single" collapsible className="border-t border-border pt-2">
        <AccItem value="why" label="Why Evolve?">
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
          {product.accordion.deployment}
        </AccItem>
        <AccItem value="ship" label="Shipping & returns">
          {product.accordion.shipping}
        </AccItem>
      </Accordion>

      {/* Sticky bar (mobile) */}
      <StickyMobileBar
        priceLabel={priceLabel}
        ctaLabel={plan === "sub" ? "Start plan" : "Order Now"}
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
    <li className="flex flex-col items-center gap-1.5 text-center">
      <Icon className="h-5 w-5 text-brand" />
      <span className="text-[11px] font-medium leading-tight text-muted-foreground">{label}</span>
    </li>
  );
}
