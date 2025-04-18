import {type MetaFunction} from '@remix-run/react';
import type {
  ProductFragment,
  ProductVariantFragment,
} from 'storefrontapi.generated';
import {VariantSelector} from '@shopify/hydrogen';
import type {ProductLoaderType} from './productLoader';
import ProductOptions from './ProductOptions';
import AddToCartButton from './CallToAction';

export const meta: MetaFunction<ProductLoaderType> = ({data}) => {
  return [{title: `St Isidore Ranch | ${data?.product.title ?? ''}`}];
};

const ProductForm = ({
  product,
  selectedVariant,
  variants,
}: {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedVariant'];
  variants: Array<ProductVariantFragment>;
}) => {
  return (
    <>
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      <br />
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          window.location.href = window.location.href + '#cart-aside';
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
    </>
  );
};

export default ProductForm;
