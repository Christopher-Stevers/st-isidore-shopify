import BuyBoxCTA from './BuyBoxFolder/BuyBoxCTA';
import BuyBoxTitle from './BuyBoxFolder/BuyBoxTitle';
import BuyBoxPrice from './BuyBoxFolder/BuyBoxPrice';
import BuyBoxSocialProof from './BuyBoxFolder/BuyBoxSocialProof';
import BuyBoxDescription from './BuyBoxFolder/BuyBoxDescription';
import {VariantSelector} from '@shopify/hydrogen';
import ProductOptions from './ProductOptions';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import BuyBoxImages from './BuyBoxFolder/BuyBoxImages';

export type BuyBoxProps = {
  product: {
    images: {
      nodes: {
        url: string;
      }[];
    };
    options: {
      name: string;
      values: string[];
    }[];
    descriptionHtml: string;
    title: string;
    handle: string;
    selectedVariant: ProductVariant;
    metafields: {
      key: string;
      value: string;
    }[];
  };
  variants: {
    product: {
      variants: {
        nodes: ProductVariant[];
      };
    };
  };
};

const BuyBox = ({product, variants}: BuyBoxProps) => {
  const onlyDefaultVariant =
    variants.product?.variants.nodes[0]?.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    );
  return (
    <div
      className="mx-auto 
    flex flex-col md:flex-row w-[1080px] max-w-[75%] py-8  justify-start justify-items-stretch items-stretch
     gap-16  md:px-8"
    >
      <BuyBoxImages product={product} />
      <div className="flex flex-col gap-4 flex-1 order-1">
        <BuyBoxTitle title={product.title} />
        <BuyBoxSocialProof />
        <BuyBoxPrice
          selectedVariant={product.selectedVariant as ProductVariant}
        />

        {!onlyDefaultVariant && (
          <VariantSelector
            handle={product.handle}
            selectedVariant={product.selectedVariant}
            options={product.options}
            variants={variants.product?.variants.nodes ?? []}
          >
            {({option}) => <ProductOptions key={option.name} option={option} />}
          </VariantSelector>
        )}

        <BuyBoxDescription description={product.descriptionHtml} />
        <BuyBoxCTA
          selectedVariant={product.selectedVariant as ProductVariant}
          cta={
            product.metafields.find((metafield) => metafield?.key === 'cta')
              ?.value || 'Fill my Freezer Now!'
          }
        />
      </div>
    </div>
  );
};

export default BuyBox;
