import {CollectionItem} from './CollectionItem';
import type {ProductItemFragment} from 'storefrontapi.generated';

export function CollectionGrid({products}: {products: ProductItemFragment[]}) {
  return (
    <div className="grid grid-cols-[320px] content-center justify-center justify-items-center gap-16 gap-y-4 pb-4 lg:grid-cols-[repeat(2,_320px)] xl:grid-cols-[repeat(3,_320px)] ">
      {products.map((product, index) => {
        return (
          <CollectionItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        );
      })}
    </div>
  );
}
