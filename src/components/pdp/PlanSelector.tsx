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
  const hasSub = variant.subPrice !== undefined && variant.subDays !== undefined;
  const savings = hasSub ? variant.oneTimePrice - variant.subPrice! : 0;
  const cadenceLabel = variant.subDays === 60 ? "ships every 60 days" : "ships every 90 days";

  return (
    <div className="flex flex-col gap-3" role="radiogroup" aria-label="Choose purchase plan">
      {/* Replenishment plan (subscribe) — only shown if variant supports it */}
      {hasSub && (
        <button
          role="radio"
          aria-checked={selected === "sub"}
          onClick={() => onChange("sub")}
          className={cn(
            "relative flex w-full flex-col overflow-hidden rounded-2xl border-2 text-left transition",
            selected === "sub"
              ? "border-brand shadow-[2px_2px_0_0_var(--color-brand)]"
              : "border-border bg-background hover:border-foreground/30",
          )}
        >
          {/* Colored header strip */}
          <div className="flex items-center justify-between bg-brand px-5 py-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-foreground">
              Replenishment plan
            </span>
            <span className="rounded-full bg-brand-foreground/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-foreground">
              Most Popular
            </span>
          </div>

          <div className="flex flex-col gap-3 p-5">
            <div className="flex items-start gap-3">
              <Radio checked={selected === "sub"} />
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm text-muted-foreground line-through">
                    ${variant.oneTimePrice}
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    ${variant.subPrice!}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {cadenceLabel} · auto-delivered
                </span>
              </div>
            </div>

            <ul className="ml-8 flex flex-col gap-1.5">
              <BenefitLine checked={true}>Save ${savings} per shipment</BenefitLine>
              <BenefitLine checked={true}>Pause or cancel anytime</BenefitLine>
            </ul>
          </div>
        </button>
      )}

      {/* One-time */}
      <button
        role="radio"
        aria-checked={selected === "oneTime"}
        onClick={() => onChange("oneTime")}
        className={cn(
          "flex w-full flex-col gap-3 rounded-2xl border-2 p-5 text-left transition",
          selected === "oneTime"
            ? "border-foreground bg-foreground/[0.02]"
            : "border-border bg-background hover:border-foreground/30",
        )}
      >
        <div className="flex items-start gap-3">
          <Radio checked={selected === "oneTime"} />
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-bold text-foreground">One-time purchase</span>
              <span className="text-lg font-bold text-foreground">${variant.oneTimePrice}</span>
            </div>
            <span className="text-xs text-muted-foreground">Ships once. No commitment.</span>
          </div>
        </div>

        {/* Drawback bullets — shown when one-time is selected and sub is available */}
        {selected === "oneTime" && hasSub && (
          <ul className="ml-8 flex flex-col gap-1.5">
            <BenefitLine checked={false}>No scheduled delivery</BenefitLine>
            <BenefitLine checked={false}>No per-shipment savings</BenefitLine>
          </ul>
        )}
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

function BenefitLine({ checked, children }: { checked: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-xs text-muted-foreground">
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
          checked
            ? "bg-brand/10 text-brand"
            : "bg-destructive/10 text-destructive",
        )}
      >
        {checked ? "✓" : "✗"}
      </span>
      {children}
    </li>
  );
}
