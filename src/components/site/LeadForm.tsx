import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Star } from "lucide-react";

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl bg-card p-8 text-center shadow-[var(--shadow-elevated)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-bold">Request received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll reach out within one business day to schedule a site walkthrough.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-2xl bg-card p-6 shadow-[var(--shadow-elevated)] md:p-7"
    >
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Schedule your <span className="font-bold underline underline-offset-2 text-foreground">FREE</span>
        </p>
        <h3 className="mt-1 text-lg font-bold leading-tight md:text-xl">
          Site Walkthrough & Program Estimate Today!
        </h3>
      </div>

      <div className="mt-5 space-y-3">
        <Select defaultValue="">
          <SelectTrigger className="h-11 bg-secondary">
            <SelectValue placeholder="Choose property type*" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="restaurant">Restaurant</SelectItem>
            <SelectItem value="property-mgr">Property manager</SelectItem>
            <SelectItem value="ghost-kitchen">Ghost kitchen</SelectItem>
            <SelectItem value="cold-chain">Food storage / cold chain</SelectItem>
            <SelectItem value="hoa">HOA / co-op</SelectItem>
            <SelectItem value="residential">Residential</SelectItem>
          </SelectContent>
        </Select>
        <Input required placeholder="Enter Full Address*" className="h-11 bg-secondary" />
        <Input required placeholder="Name*" className="h-11 bg-secondary" />
        <Input type="email" placeholder="Email" className="h-11 bg-secondary" />
        <Input required type="tel" placeholder="Phone Number*" className="h-11 bg-secondary" />
      </div>

      <label className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--brand)]"
          required
        />
        <span>
          By checking, you authorize Cloakd Removals to contact you via text and call about
          scheduling, program details, and follow-up. Messaging rates may apply. Reply STOP
          to opt out. Consent is not a condition of purchase. See our{" "}
          <a href="#" className="underline">Terms</a> and{" "}
          <a href="#" className="underline">Privacy Policy</a>.
        </span>
      </label>

      <Button type="submit" className="mt-4 h-12 w-full text-base">
        Schedule FREE Estimate
      </Button>

      <div className="mt-5 flex items-center justify-around gap-3 border-t border-border pt-4 text-[11px]">
        <ReviewBadge label="Google" rating="4.9" />
        <ReviewBadge label="Facebook" rating="4.9" />
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[9px] font-extrabold text-ink-foreground">
            BBB
          </div>
          <div className="leading-tight">
            <div className="font-bold uppercase">Rated A</div>
            <div className="text-muted-foreground">Trusted</div>
          </div>
        </div>
      </div>
    </form>
  );
}

function ReviewBadge({ label, rating }: { label: string; rating: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[10px] font-extrabold text-ink-foreground">
        {label[0]}
      </div>
      <div className="leading-tight">
        <div className="flex gap-0.5 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-2.5 w-2.5 fill-current" />
          ))}
        </div>
        <div className="font-semibold text-muted-foreground">{rating} RATING</div>
      </div>
    </div>
  );
}
