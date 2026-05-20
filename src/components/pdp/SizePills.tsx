import { cn } from "@/lib/utils";
import type { Variant } from "@/data/products";

export function SizePills({
  variants,
  selectedId,
  onSelect,
  showPrice = true,
}: {
  variants: Variant[];
  selectedId: string;
  onSelect: (id: string) => void;
  showPrice?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Choose size">
      {variants.map((v) => {
        const selected = v.id === selectedId;
        return (
          <button
            key={v.id}
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(v.id)}
            className={cn(
              "flex flex-col items-start gap-0.5 rounded-xl border-2 px-4 py-3 text-left transition",
              selected
                ? "border-brand bg-brand/[0.03] shadow-[2px_2px_0_0_var(--color-brand)]"
                : "border-border bg-background hover:border-foreground/40",
            )}
          >
            <span className="text-base font-bold text-foreground">{v.label}</span>
            <span className="text-xs text-muted-foreground">
              {v.size === "6lb" ? "~2 stations · 30–60 day supply" : "~4 stations · 60–120 day supply"}
            </span>
            {showPrice && (
              <span className="text-sm font-semibold text-brand">${v.oneTimePrice}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
