import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Check } from "lucide-react";
import { RatingsRow } from "./RatingsRow";

export function LeadForm({
  compact = false,
  extended = false,
}: {
  compact?: boolean;
  extended?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [propertyType, setPropertyType] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lead = {
      name: fd.get("name") as string,
      business: fd.get("business") as string,
      property_type: propertyType,
      address: fd.get("address") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      notes: fd.get("notes") as string,
      ts: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem("cloakd_lead", JSON.stringify(lead));
    } catch {
      // sessionStorage unavailable — continue anyway
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-card p-8 text-center shadow-[var(--shadow-elevated)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-bold">Request received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {extended
            ? "We'll be in touch within one business day."
            : "We'll reach out within one business day to schedule a site walkthrough."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-card p-6 shadow-[var(--shadow-elevated)] md:p-8"
    >
      <div className="text-center">
        {extended ? (
          <>
            <p className="text-sm text-ink/70">Tell us about your property</p>
            <h3 className="mt-1 text-xl font-extrabold leading-tight text-ink md:text-2xl">
              Start the program
            </h3>
          </>
        ) : (
          <>
            <p className="text-sm text-ink/70">
              Schedule your{" "}
              <span className="font-bold underline underline-offset-2 text-ink">FREE</span>
            </p>
            <h3 className="mt-1 text-xl font-extrabold leading-tight text-ink md:text-2xl">
              Site Walkthrough &amp; Program Estimate
            </h3>
          </>
        )}
      </div>

      <div className="mt-5 space-y-3">
        <Input name="name" required placeholder="Your name*" className="h-11 bg-secondary" />
        {extended && (
          <Input name="business" placeholder="Business name" className="h-11 bg-secondary" />
        )}
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className="h-11 bg-secondary">
            <SelectValue placeholder="Property type*" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="restaurant">Restaurant</SelectItem>
            <SelectItem value="property-mgr">Property manager</SelectItem>
            <SelectItem value="ghost-kitchen">Ghost kitchen</SelectItem>
            <SelectItem value="cold-chain">Food storage / cold chain</SelectItem>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="hoa">HOA or co-op</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Input name="address" required placeholder="Property address*" className="h-11 bg-secondary" />
        {(!compact || extended) && (
          <Input name="email" type="email" placeholder="Email" className="h-11 bg-secondary" />
        )}
        <Input name="phone" required type="tel" placeholder="Phone number*" className="h-11 bg-secondary" />
        {extended && (
          <Textarea
            name="notes"
            placeholder="Anything we should know"
            className="min-h-[88px] bg-secondary"
          />
        )}
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
        {extended
          ? "Submit — we'll be in touch within one business day"
          : "Schedule Free Walkthrough"}{" "}
        <ArrowRight className="h-4 w-4" />
      </Button>

      {extended ? (
        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          NYC, NJ, &amp; Bay Area. No commitment required to submit.
        </p>
      ) : (
        <div className="mt-5">
          <RatingsRow />
        </div>
      )}
    </form>
  );
}
