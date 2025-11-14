import { type FetcherWithComponents } from "react-router";
import { CartForm } from "@shopify/hydrogen";
import type { ProductVariant } from "@shopify/hydrogen/storefront-api-types";
import type { SellingPlanFragment } from "storefrontapi.generated";
import { useAside } from "~/components/Aside";
import { useEffect } from "react";
import React from "react";

// Component to handle cart opening after successful add
function CartButton({
  fetcher,
  disabled,
  children,
}: {
  fetcher: FetcherWithComponents<any>;
  disabled: boolean;
  children: React.ReactNode;
}) {
  const {open, type} = useAside();
  const prevStateRef = React.useRef<string | undefined>(fetcher.state);
  const hasOpenedRef = React.useRef(false);

  useEffect(() => {
    const currentState = fetcher.state as string;
    const prevState = prevStateRef.current;
    const fetcherData = (fetcher as any).data;
    
    // Open cart when fetcher completes successfully (transitions from active to idle with data)
    const wasActive = prevState === 'submitting' || prevState === 'loading';
    const isNowIdle = currentState === 'idle';
    const hasData = !!fetcherData;
    
    // Debug logging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      if (isNowIdle && hasData) {
        console.log('[BuyBoxCTA CartButton] Fetcher state:', {
          prevState,
          currentState,
          hasData,
          data: fetcherData,
          cartInData: fetcherData?.cart,
          type,
          hasOpened: hasOpenedRef.current,
        });
      }
    }
    
    // Open cart when item is successfully added
    // Always try to open if we have successful data, regardless of current type
    // (calling open('cart') when already open is safe - it just ensures it's open)
    if (isNowIdle && hasData && !hasOpenedRef.current) {
      // Additional check: make sure the data has a cart (successful add)
      if (fetcherData?.cart) {
        console.log('[BuyBoxCTA CartButton] Opening cart - cart data present');
        // Use setTimeout to ensure React has updated the DOM
        setTimeout(() => {
          open('cart');
        }, 0);
        hasOpenedRef.current = true;
      } else if (wasActive) {
        // Fallback: if it was active and now idle with any data, try opening
        console.log('[BuyBoxCTA CartButton] Opening cart - fallback (was active, now idle with data)');
        setTimeout(() => {
          open('cart');
        }, 0);
        hasOpenedRef.current = true;
      }
    }
    
    // Reset the opened flag when fetcher starts a new submission
    if (currentState === 'submitting' || currentState === 'loading') {
      hasOpenedRef.current = false;
    }
    
    prevStateRef.current = currentState;
  }, [fetcher.state, fetcher.data, open, type]);

  const isDisabled = disabled ?? fetcher.state !== "idle";
  return (
    <button
      className={`w-full ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      type="submit"
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

const BuyBoxCTA = ({
  selectedVariant,
  selectedSellingPlan,
  cta,
}: {
  selectedVariant: ProductVariant;
  selectedSellingPlan?: SellingPlanFragment | null;
  cta: string;
}) => {
  const disabled = !selectedVariant || !selectedVariant.availableForSale;

  // If there are selling plans available, show subscription button
  if (selectedSellingPlan) {
    return (
      <CartForm
        route="/cart"
        inputs={{
          lines: selectedSellingPlan && selectedVariant
            ? [
                {
                  quantity: 1,
                  selectedVariant,
                  sellingPlanId: selectedSellingPlan.id,
                  merchandiseId: selectedVariant.id,
                },
              ]
            : [],
        }}
        action={CartForm.ACTIONS.LinesAdd}
      >
        {(fetcher: FetcherWithComponents<any>) => (
          <CartButton fetcher={fetcher} disabled={disabled}>
            <div className="w-full flex items-center justify-center h-24 font-bold text-2xl bg-blue-500 text-white">
              Subscribe
            </div>
          </CartButton>
        )}
      </CartForm>
    );
  }

  // Regular one-time purchase
  const lines = selectedVariant
    ? [
        {
          merchandiseId: selectedVariant.id,
          quantity: 1,
          selectedVariant,
        },
      ]
    : [];
  return (
    <CartForm
      route="/cart"
      inputs={{
        lines,
      }}
      action={CartForm.ACTIONS.LinesAdd}
    >
      {(fetcher: FetcherWithComponents<any>) => (
        <CartButton fetcher={fetcher} disabled={disabled}>
          <div className="w-full flex items-center justify-center h-24 font-bold text-2xl bg-blue-500 text-white">
            {selectedVariant?.availableForSale
              ? cta || "Add To Cart!"
              : "Sold out"}
          </div>
        </CartButton>
      )}
    </CartForm>
  );
};

export default BuyBoxCTA;
