import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { Flag, Bird, ShieldCheck, Leaf } from "@phosphor-icons/react";
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
import { cn } from "@/lib/utils";
import { AccordionSectionContent } from "./AccordionSectionContent";
import type { Pest, Product, Variant } from "@/data/products";
import { FLAT_SHIPPING_USD, sizesFor, uniquePests } from "@/data/products";

type BundleType = "home" | "property";

type BundleItem = { label: string; desc?: string; starterOnly?: boolean };

const HOME_BUNDLE: BundleItem[] = [
  { label: "Evolve soft bait" },
  { label: "2× locking bait stations + keys", starterOnly: true },
  { label: "Home Deployment Guide" },
  { label: "30-day deployment support" },
  { label: "Neighbor Strategy Note" },
  { label: "Pet Safety Card" },
  { label: "Consumption tracking log" },
];

const PROPERTY_BUNDLE: BundleItem[] = [
  { label: "Evolve soft bait" },
  { label: "2× locking bait stations + keys", starterOnly: true },
  { label: "Business Deployment Guide" },
  { label: "Compliance Documentation Template" },
  { label: "30-day deployment support" },
  { label: "Consumption tracking log" },
];

const BUNDLE_ITEMS: Record<BundleType, BundleItem[]> = {
  home: HOME_BUNDLE,
  property: PROPERTY_BUNDLE,
};

const FEATURE_BULLETS = [
  "Removes the rodent's ability to reproduce and the colony's ability to rebuild.",
  "Safe for dogs, cats, hawks, owls, and other animals.",
  "Works on populations that have built resistance to conventional poison.",
  "Rodents choose it over other food sources even in food-rich environments.",
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
  const [bundleType, setBundleType] = useState<BundleType>("home");
  const isStarterKit = variant.productSlug === "starter-kit";

  // Reset to oneTime if switching to a variant without a sub plan
  const handleVariantChange = (id: string) => {
    const next = product.variants.find((v) => v.id === id);
    if (next && next.subPrice === undefined) setPlan("oneTime");
    onVariantChange(id);
  };

  const pests = useMemo(() => uniquePests(product.variants), [product]);
  const sizes = useMemo(() => sizesFor(product.variants, variant.pest), [product, variant.pest]);

  const pestImages = useMemo(() => {
    const imgs: Partial<Record<Pest, string>> = {};
    for (const p of pests) {
      const v = product.variants.find((v) => v.pest === p);
      if (v) imgs[p] = v.image;
    }
    return imgs;
  }, [pests, product.variants]);

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
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {product.title}
        </h1>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border-2 border-brand/40 bg-brand/10 px-4 py-1.5 text-sm font-bold tracking-wide text-brand">
            {variant.size.replace(/(\d+)(lb)/i, "$1 lb")}
          </span>
        </div>
        <p className="mt-3 text-base text-foreground/80 md:text-lg">{product.subtitle}</p>
      </div>

      {/* Feature bullets */}
      <ul className="flex flex-col gap-2">
        {FEATURE_BULLETS.map((bullet) => (
          <li key={bullet} className="flex items-center gap-2.5 text-base text-foreground">
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
        <PestPills pests={pests} selected={variant.pest} onSelect={onPestChange} images={pestImages} />
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

      {/* Bundle selector — T05 */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          What's included:
        </span>
        <div className="flex gap-2">
          {(["home", "property"] as BundleType[]).map((t) => (
            <button
              key={t}
              onClick={() => setBundleType(t)}
              className={cn(
                "flex-1 rounded-full border-2 py-2.5 text-sm font-semibold transition",
                bundleType === t
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-background text-foreground hover:border-foreground/30",
              )}
            >
              {t === "home" ? "For my home" : "For my business"}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Packed with
          </p>
          <ul className="flex flex-col gap-3">
            {BUNDLE_ITEMS[bundleType]
              .filter((item) => !item.starterOnly || isStarterKit)
              .map((item) => (
                <li key={item.label} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
                    ✓
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-foreground">{item.label}</span>
                    {item.desc && (
                      <span className="text-xs leading-snug text-muted-foreground">{item.desc}</span>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* CTA block */}
      <div className="flex flex-col gap-3 rounded-2xl bg-surface p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">
            {plan === "sub" ? "Per shipment" : "One-time"}
          </span>
          <span className="text-3xl font-bold text-foreground">{priceLabel}</span>
        </div>
        <button onClick={handleBuy} className="pdp-btn-primary">
          Order Now
        </button>
        {/* Post-CTA confirmation */}
        {plan === "sub" && hasSub ? (
          <p className="text-center text-xs font-medium text-brand">
            Replenishment plan applied ✓ You're saving ${savings} on this order
          </p>
        ) : (
          <p className="text-center text-xs text-muted-foreground">
            ${FLAT_SHIPPING_USD.toFixed(2)} flat shipping · ships within 24 hours
          </p>
        )}
      </div>

      {/* Trust badges */}
      <ul className="grid grid-cols-2 gap-3 border-t border-border pt-5 sm:grid-cols-4">
        <TrustItem icon={Flag} label="Made in USA" />
        <TrustItem icon={Bird} label="No secondary kill" />
        <TrustItem icon={ShieldCheck} label="EPA minimum-risk" />
        <TrustItem icon={Leaf} label="Non-anticoagulant" />
      </ul>

      {/* Inline accordion */}
      <Accordion type="single" collapsible className="border-t border-border pt-2">
        <AccItem value="why" label="Why Evolve?">
          <AccordionSectionContent section={product.accordion.description} />
        </AccItem>
        <AccItem value="how" label="How it works">
          <AccordionSectionContent section={product.accordion.howItWorks} />
        </AccItem>
        <AccItem value="inside" label="What's inside">
          <AccordionSectionContent section={product.accordion.whatsInside} />
        </AccItem>
        <AccItem value="ing" label="Ingredients & safety">
          <AccordionSectionContent section={product.accordion.ingredients} />
        </AccItem>
        <AccItem value="dep" label="Deployment guide">
          <AccordionSectionContent section={product.accordion.deployment} />
        </AccItem>
        <AccItem value="ship" label="Shipping & returns">
          <AccordionSectionContent section={product.accordion.shipping} />
        </AccItem>
      </Accordion>

      {/* Active ingredients section (Gruns "Tastes Like" equivalent) */}
      <ActiveIngredients />

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

function TrustItem({ icon: Icon, label }: { icon: typeof Flag; label: string }) {
  return (
    <li className="flex flex-col items-center gap-2 text-center">
      <Icon size={28} weight="fill" className="text-brand" />
      <span className="text-[13px] font-semibold leading-tight text-foreground">{label}</span>
    </li>
  );
}

const PRIMARY_BADGES = [
  { emoji: "🌿", label: "Cottonseed oil", sub: "Active ingredient" },
  { emoji: "🔬", label: "Targets reproduction", sub: "Not single rodents" },
  { emoji: "🦅", label: "Safe for predators", sub: "No secondary kill" },
];

const SECONDARY_BADGES = [
  { emoji: "✅", label: "No anticoagulants" },
  { emoji: "✅", label: "No neurotoxins" },
  { emoji: "✅", label: "Food-grade formula" },
  { emoji: "✅", label: "EPA 25(b) exempt" },
  { emoji: "✅", label: "No license required" },
  { emoji: "✅", label: "Indoor & outdoor" },
];

function ActiveIngredients() {
  return (
    <div className="flex flex-col gap-4 border-t border-border pt-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        What makes it work
      </p>

      {/* Primary — 3 large circles */}
      <div className="flex flex-wrap gap-3">
        {PRIMARY_BADGES.map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-1.5 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/8 text-3xl">
              {b.emoji}
            </div>
            <div className="text-[11px] font-bold leading-tight text-foreground">{b.label}</div>
            <div className="text-[10px] leading-tight text-muted-foreground">{b.sub}</div>
          </div>
        ))}
      </div>

      {/* Secondary — smaller badges */}
      <div className="flex flex-wrap gap-2">
        {SECONDARY_BADGES.map((b) => (
          <span
            key={b.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground"
          >
            <span>{b.emoji}</span>
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}
