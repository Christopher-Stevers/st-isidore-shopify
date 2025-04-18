import type {ProductFragment} from 'storefrontapi.generated';
import {Money} from '@shopify/hydrogen';
const ProductPrice = ({
  selectedVariant,
}: {
  selectedVariant: ProductFragment['selectedVariant'];
}) => {
  return (
    <div className="product-price">
      {selectedVariant?.compareAtPrice &&
      (selectedVariant?.compareAtPrice?.amount ?? 0) >
        (selectedVariant?.price?.amount ?? 0) ? (
        <>
          <p>Sale</p>
          <br />
          <div className="product-price-on-sale">
            {selectedVariant ? <Money data={selectedVariant.price} /> : null}
            <s>
              <Money data={selectedVariant.compareAtPrice} />
            </s>
          </div>
        </>
      ) : (
        selectedVariant?.price && <Money data={selectedVariant?.price} />
      )}
    </div>
  );
};

export default ProductPrice;
