import { cn } from "@/lib/utils";
import type { Product, Variant } from "@/data/products";
import { subscriptionPrice } from "@/data/products";

export type Plan = "oneTime" | "sub";

export function PlanSelector({
  product,
  variant,
  selected,
  onChange,
  cadenceMonths,
  onCadenceChange,
}: {
  product: Product;
  variant: Variant;
  selected: Plan;
  onChange: (p: Plan) => void;
  cadenceMonths: number;
  onCadenceChange: (m: number) => void;
}) {
  const sub = product.subscription;
  const subPrice = subscriptionPrice(variant.oneTimePrice, sub.discountPct);
  const savings = (variant.oneTimePrice - subPrice).toFixed(2);

  return (
    <div className="flex flex-col gap-3" role="radiogroup" aria-label="Choose purchase plan">
      {/* Subscribe & Save */}
      <button
        role="radio"
        aria-checked={selected === "sub"}
        onClick={() => onChange("sub")}
        className={cn(
          "relative flex w-full flex-col gap-3 rounded-2xl border-2 p-5 text-left transition",
          selected === "sub"
            ? "border-brand bg-brand/[0.04] shadow-sm"
            : "border-border bg-background hover:border-foreground/30",
        )}
      >
        <span className="absolute -top-2.5 left-4 rounded-full bg-brand px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-foreground">
          Save {sub.discountPct}%
        </span>
        <div className="flex items-start gap-3">
          <Radio checked={selected === "sub"} />
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-bold text-foreground">Subscribe & save</span>
              <span className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground line-through">
                  ${variant.oneTimePrice.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-foreground">${subPrice.toFixed(2)}</span>
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Auto-delivered. Cancel or skip anytime. Save ${savings} per shipment.
            </span>
          </div>
        </div>

        {selected === "sub" && (
          <div className="ml-8 flex items-center gap-2">
            <label
              htmlFor="cadence-select"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Delivery
            </label>
            <select
              id="cadence-select"
              value={cadenceMonths}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => onCadenceChange(Number(e.target.value))}
              className="rounded-md border border-border bg-background px-2 py-1.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
            >
              {sub.cadences.map((c) => (
                <option key={c.months} value={c.months}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </button>

      {/* One-time */}
      <button
        role="radio"
        aria-checked={selected === "oneTime"}
        onClick={() => onChange("oneTime")}
        className={cn(
          "flex w-full items-start gap-3 rounded-2xl border-2 p-5 text-left transition",
          selected === "oneTime"
            ? "border-foreground bg-foreground/[0.02]"
            : "border-border bg-background hover:border-foreground/30",
        )}
      >
        <Radio checked={selected === "oneTime"} />
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-sm font-bold text-foreground">One-time purchase</span>
            <span className="text-lg font-bold text-foreground">
              ${variant.oneTimePrice.toFixed(2)}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">Ships once. No commitment.</span>
        </div>
      </button>
    </div>
  );
}

function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
        checked ? "border-brand" : "border-muted-foreground/40",
      )}
    >
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full transition",
          checked ? "bg-brand" : "bg-transparent",
        )}
      />
    </span>
  );
}
