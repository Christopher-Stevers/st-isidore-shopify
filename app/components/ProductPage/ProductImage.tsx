import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

const ProductImage = ({image}: {image: ProductVariantFragment['image']}) => {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div>
      <Image
        className="w-full object-cover"
        alt={image.altText || 'Product Image'}
        data={image}
        key={image.id}
        sizes="720px"
      />
    </div>
  );
};

export default ProductImage;
