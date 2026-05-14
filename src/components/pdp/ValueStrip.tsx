import { Shield, Sprout, Target, FlaskConical } from "lucide-react";

const ITEMS = [
  { icon: Shield, label: "FIFRA 25(b) exempt" },
  { icon: Sprout, label: "No anticoagulants" },
  { icon: Target, label: "Targets reproduction" },
  { icon: FlaskConical, label: "Beats resistant rodents" },
];

export function ValueStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-site grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
