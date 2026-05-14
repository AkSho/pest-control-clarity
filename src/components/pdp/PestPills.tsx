import { cn } from "@/lib/utils";
import type { Pest } from "@/data/products";

export function PestPills({
  pests,
  selected,
  onSelect,
}: {
  pests: Pest[];
  selected: Pest;
  onSelect: (p: Pest) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Choose pest">
      {pests.map((p) => {
        const isSel = p === selected;
        return (
          <button
            key={p}
            role="radio"
            aria-checked={isSel}
            onClick={() => onSelect(p)}
            className={cn(
              "rounded-full border-2 px-4 py-2 text-sm font-semibold capitalize transition",
              isSel
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground hover:border-foreground/40",
            )}
          >
            {p === "rat" ? "Rats" : "Mice"}
          </button>
        );
      })}
    </div>
  );
}
