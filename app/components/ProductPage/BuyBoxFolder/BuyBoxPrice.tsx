import {Money} from '@shopify/hydrogen';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
const BuyBoxPrice = ({selectedVariant}: {selectedVariant: ProductVariant}) => {
  return (
    <div className="text-2xl font-bold">
      {selectedVariant?.compareAtPrice &&
      (selectedVariant?.compareAtPrice?.amount ?? 0) >
        (selectedVariant?.price?.amount ?? 0) ? (
        <>
          <p>Sale!</p>
          <div className="product-price-on-sale">
            {selectedVariant ? (
              <>
                $
                <Money
                  data={selectedVariant.price}
                  as="span"
                  withoutCurrency={true}
                />
              </>
            ) : null}
            <s>
              $
              <Money
                data={selectedVariant.compareAtPrice}
                withoutCurrency={true}
                as="span"
              />
            </s>
          </div>
        </>
      ) : (
        selectedVariant?.price && (
          <span>
            $
            <Money
              withoutCurrency={true}
              data={selectedVariant?.price}
              as="span"
            />
          </span>
        )
      )}
    </div>
  );
};

export default BuyBoxPrice;
