import { Award, ShieldCheck, Beaker, BirdIcon } from "lucide-react";
import { TRUST_ROW } from "@/data/products";

const ICONS = [Award, ShieldCheck, Beaker, BirdIcon];

export function TrustRow() {
  return (
    <section className="container-site py-12">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {TRUST_ROW.map((t, i) => {
          const Icon = ICONS[i] ?? ShieldCheck;
          return (
            <div
              key={t.label}
              className="flex flex-col items-start gap-2 rounded-2xl border border-border bg-card p-5"
            >
              <Icon className="h-6 w-6 text-brand" />
              <div className="text-sm font-bold text-foreground">{t.label}</div>
              <div className="text-xs text-muted-foreground">{t.body}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
