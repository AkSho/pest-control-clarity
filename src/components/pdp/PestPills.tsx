import { cn } from "@/lib/utils";
import type { Pest } from "@/data/products";

const PEST_META: Record<Pest, { label: string; sub: string }> = {
  rat: { label: "Rats", sub: "Norway rat · Roof rat" },
  mouse: { label: "Mice", sub: "House mouse · Deer mouse" },
};

export function PestPills({
  pests,
  selected,
  onSelect,
  images,
}: {
  pests: Pest[];
  selected: Pest;
  onSelect: (p: Pest) => void;
  images?: Partial<Record<Pest, string>>;
}) {
  return (
    <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Choose pest">
      {pests.map((p) => {
        const isSel = p === selected;
        const meta = PEST_META[p];
        const img = images?.[p];

        return (
          <button
            key={p}
            role="radio"
            aria-checked={isSel}
            onClick={() => onSelect(p)}
            className={cn(
              "flex flex-col overflow-hidden rounded-xl border-2 text-left transition",
              "w-[140px]",
              isSel
                ? "border-brand shadow-sm"
                : "border-border hover:border-foreground/30",
            )}
          >
            {/* Product image */}
            <div className="flex h-[110px] w-full items-center justify-center bg-white p-2">
              {img ? (
                <img
                  src={img}
                  alt={meta.label}
                  width={90}
                  height={90}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl">
                  {p === "rat" ? "🐀" : "🐭"}
                </div>
              )}
            </div>

            {/* Label bar */}
            <div className={cn(
              "px-3 py-2.5 transition",
              isSel ? "bg-brand text-brand-foreground" : "bg-surface text-foreground",
            )}>
              <div className="text-sm font-bold">{meta.label}</div>
              <div className={cn("mt-0.5 text-[10px] leading-tight", isSel ? "text-brand-foreground/70" : "text-muted-foreground")}>
                {meta.sub}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
