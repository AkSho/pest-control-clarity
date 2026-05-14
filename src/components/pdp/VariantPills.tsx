import { cn } from "@/lib/utils";
import type { Variant } from "@/data/products";

export function VariantPills({
  variants,
  selectedId,
  onSelect,
}: {
  variants: Variant[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Choose variant">
      {variants.map((v) => {
        const selected = v.id === selectedId;
        return (
          <button
            key={v.id}
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(v.id)}
            className={cn(
              "rounded-full border-2 px-4 py-2 text-sm font-semibold transition",
              selected
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground hover:border-foreground/40"
            )}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}
