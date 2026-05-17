import { useMemo, useState } from "react";
import { Elements, ExpressCheckoutElement } from "@stripe/react-stripe-js";
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
  const createIntent = useServerFn(createPaymentIntent);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const amountCents = Math.round(
    (variant.oneTimePrice + FLAT_SHIPPING_USD) * 100,
  );

  const handleReady = (event: StripeExpressCheckoutElementReadyEvent) => {
    const methods = event.availablePaymentMethods;
    const any =
      !!methods &&
      Object.values(methods).some((v) => v === true);
    setAvailable(any);
  };

  const handleConfirm = async (
    event: StripeExpressCheckoutElementConfirmEvent,
  ) => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");
      const { clientSecret } = await createIntent({
        data: { variantId: variant.id },
      });

      const { error: confirmError } = await stripe.confirmPayment({
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
    <div
      className={
        available === false
          ? "hidden"
          : "flex flex-col gap-3"
      }
    >
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: amountCents,
          currency: "usd",
          paymentMethodCreation: "manual",
        }}
      >
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
      </Elements>
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
