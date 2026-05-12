import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Check } from "lucide-react";
import { RatingsRow } from "./RatingsRow";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

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
      className="rounded-2xl bg-card p-6 shadow-[var(--shadow-elevated)] md:p-8"
    >
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Schedule your{" "}
          <span className="font-bold underline underline-offset-2 text-foreground">FREE</span>
        </p>
        <h3 className="mt-1 text-xl font-extrabold leading-tight md:text-2xl">
          Site Walkthrough &amp; Program Estimate
        </h3>
      </div>

      <div className="mt-5 space-y-3">
        <Select defaultValue="">
          <SelectTrigger className="h-11 bg-secondary">
            <SelectValue placeholder="Property type*" />
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
        <Input required placeholder="Property address*" className="h-11 bg-secondary" />
        <Input required placeholder="Name*" className="h-11 bg-secondary" />
        {!compact && <Input type="email" placeholder="Email" className="h-11 bg-secondary" />}
        <Input required type="tel" placeholder="Phone number*" className="h-11 bg-secondary" />
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
        By submitting, you authorize Cloakd Removals to contact you about
        scheduling and program details. We never share your information. Reply
        STOP to opt out at any time.
      </p>

      <Button
        type="submit"
        className="mt-4 h-12 w-full bg-brand text-base font-bold text-white hover:bg-brand/90"
      >
        Schedule Free Walkthrough <ArrowRight className="h-4 w-4" />
      </Button>

      <div className="mt-5">
        <RatingsRow />
      </div>
    </form>
  );
}
