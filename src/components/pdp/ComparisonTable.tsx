import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ROWS: { label: string; evolve: boolean; poison: boolean; traps: boolean }[] = [
  { label: "Stops the colony from replacing itself", evolve: true, poison: false, traps: false },
  { label: "Safe around pets, kids, and wildlife", evolve: true, poison: false, traps: false },
  { label: "Works on resistant populations", evolve: true, poison: false, traps: true },
  { label: "No restricted-use license needed", evolve: true, poison: false, traps: true },
  { label: "Doesn't require constant re-checking", evolve: true, poison: false, traps: false },
  { label: "Reduces secondary poisoning risk", evolve: true, poison: false, traps: true },
];

export function ComparisonTable() {
  return (
    <section className="container-site py-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        {/* Heading side */}
        <div className="flex flex-col gap-3 md:max-w-[380px] md:basis-[36%] md:pt-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Evolve vs. alternatives
          </span>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why fertility control beats the alternatives
          </h2>
          <p className="text-base text-muted-foreground">
            Most rodent control attacks individuals. Evolve attacks the supply.
          </p>
        </div>

        {/* Table side — swap for <picture> once us-vs-them-desktop.png is ready */}
        <div className="overflow-x-auto rounded-2xl border border-border bg-card md:grow">
          <div className="min-w-[480px]">
          <div className="grid grid-cols-4 border-b border-border bg-surface text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <div className="p-4 text-left">&nbsp;</div>
            <div className="p-4 bg-brand/5 text-brand">Evolve</div>
            <div className="p-4">Poison</div>
            <div className="p-4">Snap traps</div>
          </div>
          {ROWS.map((r, i) => (
            <div
              key={r.label}
              className={cn(
                "grid grid-cols-4 items-center border-b border-border last:border-b-0 text-sm",
                i % 2 === 1 && "bg-surface/40"
              )}
            >
              <div className="p-4 text-left font-medium text-foreground">{r.label}</div>
              <Cell yes={r.evolve} highlight />
              <Cell yes={r.poison} />
              <Cell yes={r.traps} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cell({ yes, highlight }: { yes: boolean; highlight?: boolean }) {
  return (
    <div className={cn("flex items-center justify-center p-4", highlight && "bg-brand/5")}>
      {yes ? (
        <Check className={cn("h-5 w-5", highlight ? "text-brand" : "text-foreground")} />
      ) : (
        <X className="h-5 w-5 text-muted-foreground/50" />
      )}
    </div>
  );
}
