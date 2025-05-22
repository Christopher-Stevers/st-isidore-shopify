import type {ProductItemFragment} from 'storefrontapi.generated';

import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
export const CollectionItem = ({
  product,
  loading,
}: {
  product: ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) => {
  const variant =
    product.variants.nodes.find((variant) => variant.availableForSale) ??
    product.variants.nodes[0];

  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  const freeFreezerText = 'Free Freezer';
  const titleWithoutFreeFreezerText = product.title.replace(
    freeFreezerText,
    '',
  );
  return (
    <div
      className="grid w-80 gap-x-16 gap-y-4 bg-backdrop-500"
      key={product.id}
    >
      <Link
        className="grid w-80 grid-rows-[356px] gap-x-16 gap-y-4"
        prefetch="intent"
        to={variantUrl}
      >
        <div className="grid grid-rows-[320px_48px]">
          {product.featuredImage && (
            <Image
              className="h-[320px] w-[320px] object-cover"
              alt={product.featuredImage.altText || product.title}
              data={product.featuredImage}
              loading={loading}
              sizes="320px"
            />
          )}
          <div className="flex items-center text-center justify-between px-4">
            <h3 className="whitespace-pre text-xl font-semibold w-full">
              {titleWithoutFreeFreezerText}
            </h3>
          </div>
        </div>
        <div className="px-2 w-full">
          <button className="text-lg  bg-amber-600 rounded-md hover:bg-amber-500 text-white px-8 w-full py-4">
            Get Yours now!
          </button>
        </div>
      </Link>
    </div>
  );
};
