import { useMemo, useState } from "react";
import {
  Elements,
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type {
  StripeExpressCheckoutElementConfirmEvent,
  StripeExpressCheckoutElementReadyEvent,
} from "@stripe/stripe-js";
import { useServerFn } from "@tanstack/react-start";
import { getStripe } from "@/lib/stripe-client";
import { createPaymentIntent } from "@/server-functions/stripe";
import type { Variant } from "@/data/products";
import { FLAT_SHIPPING_USD } from "@/data/products";

export function ExpressCheckoutBlock({ variant }: { variant: Variant }) {
  const stripePromise = useMemo(() => getStripe(), []);
  const amountCents = Math.round(
    (variant.oneTimePrice + FLAT_SHIPPING_USD) * 100,
  );

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: amountCents,
        currency: "usd",
      }}
    >
      <Inner variant={variant} />
    </Elements>
  );
}

function Inner({ variant }: { variant: Variant }) {
  const stripe = useStripe();
  const elements = useElements();
  const createIntent = useServerFn(createPaymentIntent);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReady = (event: StripeExpressCheckoutElementReadyEvent) => {
    const methods = event.availablePaymentMethods;
    const any = !!methods && Object.values(methods).some((v) => v === true);
    setAvailable(any);
  };

  const handleConfirm = async (
    _event: StripeExpressCheckoutElementConfirmEvent,
  ) => {
    try {
      if (!stripe || !elements) throw new Error("Stripe not ready");

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message ?? "Payment failed");
        return;
      }

      const { clientSecret } = await createIntent({
        data: { variantId: variant.id },
      });

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmed`,
        },
      });

      if (confirmError) {
        setError(confirmError.message ?? "Payment failed");
      }
    } catch (err) {
      console.error("express checkout failed", err);
      setError("Could not start express checkout. Please use the button below.");
    }
  };

  return (
    <div className={available === false ? "hidden" : "flex flex-col gap-3"}>
      <ExpressCheckoutElement
        onReady={handleReady}
        onConfirm={handleConfirm}
        options={{
          buttonHeight: 48,
          paymentMethods: {
            applePay: "always",
            googlePay: "always",
            link: "auto",
          },
        }}
      />
      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-center text-xs font-medium text-destructive">
          {error}
        </p>
      )}
      {available && (
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>
      )}
    </div>
  );
}
