import { cn } from "@/lib/utils";
import type { Variant } from "@/data/products";

export type Plan = "oneTime" | "sub";

export function PlanSelector({
  variant,
  selected,
  onChange,
}: {
  variant: Variant;
  selected: Plan;
  onChange: (p: Plan) => void;
}) {
  if (!variant.subscription) return null;
  const sub = variant.subscription;

  return (
    <div className="flex flex-col gap-2" role="radiogroup" aria-label="Choose purchase plan">
      <PlanOption
        selected={selected === "sub"}
        onClick={() => onChange("sub")}
        title="Replenishment plan"
        priceLabel={`$${sub.price}`}
        meta={`Auto-delivered ${sub.cadenceLabel}. Cancel anytime.`}
        recommended
      />
      <PlanOption
        selected={selected === "oneTime"}
        onClick={() => onChange("oneTime")}
        title="One-time purchase"
        priceLabel={`$${variant.oneTimePrice}`}
        meta="Ships once. No commitment."
      />
    </div>
  );
}

function PlanOption({
  selected,
  onClick,
  title,
  priceLabel,
  meta,
  recommended,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  priceLabel: string;
  meta: string;
  recommended?: boolean;
}) {
  return (
    <button
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition",
        selected
          ? "border-foreground bg-foreground/[0.02]"
          : "border-border bg-background hover:border-foreground/30"
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-foreground" : "border-muted-foreground/40"
        )}
      >
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full transition",
            selected ? "bg-foreground" : "bg-transparent"
          )}
        />
      </span>
      <span className="flex flex-1 flex-col gap-1">
        <span className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{title}</span>
            {recommended && (
              <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                Recommended
              </span>
            )}
          </span>
          <span className="text-base font-bold text-foreground">{priceLabel}</span>
        </span>
        <span className="text-xs text-muted-foreground">{meta}</span>
      </span>
    </button>
  );
}
