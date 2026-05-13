import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Check } from "lucide-react";

const STRIPE_LINK = "https://buy.stripe.com/cNifZgdjd6kg65FgYz9AA00";

type Status = "idle" | "redirecting";

export function CheckoutForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [propertyType, setPropertyType] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const lead = {
      name: fd.get("name") as string,
      property_type: propertyType,
      address: fd.get("address") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      ts: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem("cloakd_lead", JSON.stringify(lead));
    } catch {
      // sessionStorage unavailable — continue anyway
    }

    setStatus("redirecting");

    const dest = lead.email
      ? `${STRIPE_LINK}?prefilled_email=${encodeURIComponent(lead.email)}`
      : STRIPE_LINK;

    setTimeout(() => {
      window.location.href = dest;
    }, 800);
  }

  if (status === "redirecting") {
    return (
      <div className="rounded-2xl bg-card p-8 text-center shadow-[var(--shadow-elevated)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-bold">Redirecting to checkout…</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You'll complete your subscription on the next page.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-card p-6 shadow-[var(--shadow-elevated)] md:p-8"
    >
      <div className="border-b border-border pb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Monthly subscription
        </p>
        <div className="mt-2 flex items-baseline justify-center gap-1">
          <span className="text-4xl font-black">$349</span>
          <span className="text-base text-muted-foreground">/month</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          3-month minimum · month-to-month after · cancel with 30 days notice
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <Input
          name="name"
          required
          placeholder="Your name*"
          className="h-11 bg-secondary"
        />
        <Select value={propertyType} onValueChange={setPropertyType} required>
          <SelectTrigger className="h-11 bg-secondary">
            <SelectValue placeholder="Property type*" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="restaurant">Restaurant</SelectItem>
            <SelectItem value="property-mgr">Property manager</SelectItem>
            <SelectItem value="ghost-kitchen">Ghost kitchen</SelectItem>
            <SelectItem value="cold-chain">Food storage / cold chain</SelectItem>
            <SelectItem value="residential">Residential building</SelectItem>
            <SelectItem value="hoa">HOA or co-op</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Input
          name="address"
          required
          placeholder="Property address*"
          className="h-11 bg-secondary"
        />
        <Input
          name="email"
          type="email"
          required
          placeholder="Email*"
          className="h-11 bg-secondary"
        />
        <Input
          name="phone"
          type="tel"
          required
          placeholder="Phone number*"
          className="h-11 bg-secondary"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-5 h-12 w-full text-base font-bold"
      >
        Start the program — $349/mo <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Secure checkout via Stripe. Cancel anytime after month 3.
      </p>
    </form>
  );
}
