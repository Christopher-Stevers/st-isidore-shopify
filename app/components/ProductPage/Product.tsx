import {useLoaderData} from '@remix-run/react';
import type {ProductLoaderType} from './productLoader';
import BuyBox from './BuyBox';
const Product = () => {
  const {product, variants} = useLoaderData<ProductLoaderType>();
  const {selectedVariant} = product;
  return (
    /*    <div className="mx-auto grid w-[1364px] max-w-fit justify-start justify-items-stretch gap-4  gap-y-16 px-8 lg:grid-cols-[2fr_3fr] lg:gap-24 lg:px-16"></div>    <ProductMain
        selectedVariant={selectedVariant}
        product={product}
        variants={variants}
      />
      <ProductImage image={selectedVariant?.image} />  </div>*/
    <BuyBox />
  );
};

export default Product;
