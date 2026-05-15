import { cn } from "@/lib/utils";
import type { Variant } from "@/data/products";

export function SizePills({
  variants,
  selectedId,
  onSelect,
}: {
  variants: Variant[];
  selectedId: string;
  onSelect: (id: string) => void;
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
              "flex flex-col items-start gap-0.5 rounded-xl border-2 px-4 py-2.5 text-left transition",
              selected
                ? "border-foreground bg-foreground/[0.03]"
                : "border-border bg-background hover:border-foreground/40",
            )}
          >
            <span className="text-sm font-semibold text-foreground">{v.label}</span>
            <span className="text-xs text-muted-foreground">${v.oneTimePrice}</span>
          </button>
        );
      })}
    </div>
  );
}
