import {type FetcherWithComponents} from '@remix-run/react';
import {CartForm} from '@shopify/hydrogen';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
const BuyBoxCTA = ({
  selectedVariant,
  cta,
}: {
  selectedVariant: ProductVariant;
  cta: string;
}) => {
  const disabled = !selectedVariant || !selectedVariant.availableForSale;

  const lines = selectedVariant
    ? [
        {
          merchandiseId: selectedVariant.id,
          quantity: 1,
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
      {(fetcher: FetcherWithComponents<any>) => {
        return (
          <>
            <>
              <button
                className="w-full"
                type="submit"
                disabled={disabled ?? fetcher.state !== 'idle'}
              >
                <div className="w-full flex items-center justify-center h-24 font-bold text-2xl bg-blue-500 text-white">
                  {selectedVariant?.availableForSale
                    ? cta || 'Add To Cart!'
                    : 'Sold out'}
                </div>
              </button>
            </>
          </>
        );
      }}
    </CartForm>
  );
};

export default BuyBoxCTA;
