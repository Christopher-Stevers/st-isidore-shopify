import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import type {
  ProductFragment,
  ProductVariantsQuery,
} from 'storefrontapi.generated';
import ProductPrice from './ProductPrice';
import ProductForm from './ProductForm';
import BuyBox from './BuyBox';

const ProductMain = ({
  selectedVariant,
  product,
  variants,
}: {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedVariant'];
  variants: Promise<ProductVariantsQuery>;
}) => {
  const {title, descriptionHtml} = product;
  return (
    <div className="flex flex-col gap-y-3 text-2xl md:gap-y-6">
      <h1 className="whitespace-pre font-display text-2xl lg:text-4xl">
        {title}
      </h1>
      <div
        className="product-item"
        dangerouslySetInnerHTML={{__html: descriptionHtml}}
      />

      <ProductPrice selectedVariant={selectedVariant} />
      <br />
      <Suspense
        fallback={
          <ProductForm
            product={product}
            selectedVariant={selectedVariant}
            variants={[]}
          />
        }
      >
        <Await
          errorElement="There was a problem loading product variants"
          resolve={variants}
        >
          {(data) => (
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={data.product?.variants.nodes || []}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default ProductMain;
