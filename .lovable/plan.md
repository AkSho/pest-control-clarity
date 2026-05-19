Change the drawer's checkout button label from `Checkout securely · $XX.XX` to `Secure Checkout` with a lock icon to the right of the text (matching the Gruns reference).

## Changes

**File: `src/components/pdp/OrderReviewDrawer.tsx`**

1. Update the `lucide-react` import on line 2 to add `Lock`:
   ```ts
   import { Loader2, ShieldCheck, Truck, RotateCcw, Lock } from "lucide-react";
   ```
2. Replace the idle label on line 163:
   ```tsx
   <>Secure Checkout <Lock className="h-4 w-4" /></>
   ```

No other CTAs are touched. Price total still shows in the order summary above the button, so it isn't lost. Loading state and disabled styles unchanged.