import { loadStripe, type Stripe } from "@stripe/stripe-js";

// Publishable key — safe to ship in client bundle.
const PUBLISHABLE_KEY = "pk_live_I19Ma0w4zbjLIhM2054LFoR700Gu18CSCf";

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    stripePromise = loadStripe(PUBLISHABLE_KEY);
  }
  return stripePromise;
}
