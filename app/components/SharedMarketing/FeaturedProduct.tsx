import {useRootLoaderData} from '~/root';
import BuyBox, {type BuyBoxProps} from '../ProductPage/BuyBox';
const FeaturedProduct = () => {
  const {layout} = useRootLoaderData();
  const product = layout.product;
  const variants = layout.variants;
  if (!product) {
    return null;
  }
  console.log(product.selectedVariant, 'selected variant');
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-6xl font-display text-center py-8 ">
        🔥 Featured Product 🔥
      </h2>
      <BuyBox
        product={product as unknown as BuyBoxProps['product']}
        variants={variants as unknown as BuyBoxProps['variants']}
      />
    </div>
  );
};

export default FeaturedProduct;
