import Claims from '../SharedMarketing/Claims';
import BuyBox, {type BuyBoxProps} from './BuyBox';
import Testimonials from '../SharedMarketing/Testimonials';
import type {ProductLoaderType} from './productLoader';
import {useLoaderData} from '@remix-run/react';
const Product = () => {
  const {product, variants} = useLoaderData<ProductLoaderType>();
  return (
    <div>
      <BuyBox
        product={product as unknown as BuyBoxProps['product']}
        variants={variants as unknown as BuyBoxProps['variants']}
      />
      <Claims />
      <Testimonials />
    </div>
  );
};

export default Product;
