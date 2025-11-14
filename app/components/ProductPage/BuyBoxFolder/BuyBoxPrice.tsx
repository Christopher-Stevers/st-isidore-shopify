import {ProductPrice} from '~/components/ProductPrice';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import type {SellingPlanFragment} from 'storefrontapi.generated';

const BuyBoxPrice = ({
  selectedVariant,
  selectedSellingPlan,
}: {
  selectedVariant: ProductVariant;
  selectedSellingPlan?: SellingPlanFragment | null;
}) => {
  return (
    <div className="text-2xl font-bold">
      <ProductPrice
        price={selectedVariant?.price}
        compareAtPrice={selectedVariant?.compareAtPrice}
        selectedSellingPlan={selectedSellingPlan}
        selectedVariant={selectedVariant}
      />
    </div>
  );
};

export default BuyBoxPrice;
