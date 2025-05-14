import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import {type BuyBoxProps} from '~/components/ProductPage/BuyBox';
import {useLoaderData} from '@remix-run/react';
import BuyBoxCTA from '~/components/ProductPage/BuyBoxFolder/BuyBoxCTA';
import BuyBoxPrice from '~/components/ProductPage/BuyBoxFolder/BuyBoxPrice';
import BuyBoxImages from '~/components/ProductPage/BuyBoxFolder/BuyBoxImages';
import BuyBoxTitle from '~/components/ProductPage/BuyBoxFolder/BuyBoxTitle';
import BuyBoxSocialProof from '~/components/ProductPage/BuyBoxFolder/BuyBoxSocialProof';
import BuyBoxDescription from '~/components/ProductPage/BuyBoxFolder/BuyBoxDescription';
import SectionWrapper from '~/components/SharedMarketing/SectionWrapper';
import type {loader} from '~/routes/pages.bulk-beef-free-freezer';

const FunnelBuyBox = ({product}: {product: BuyBoxProps['product']}) => {
  return (
    <div className="@container flex-1">
      <div
        className="
    flex flex-col  py-8  justify-start justify-items-stretch items-stretch
     gap-16  px-8"
      >
        <BuyBoxImages product={product} />
        <div className="flex flex-col gap-4 flex-1">
          <BuyBoxTitle title={product.title} />
          <BuyBoxSocialProof />
          <BuyBoxPrice
            selectedVariant={product.selectedVariant as ProductVariant}
          />
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
    </div>
  );
};

const BuyBoxes = () => {
  const {firstProduct, secondProduct} = useLoaderData<typeof loader>();

  return (
    <SectionWrapper bgColor="bg-transparent">
      <div
        id="buybox-content"
        className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 w-full "
      >
        <FunnelBuyBox
          product={firstProduct as unknown as BuyBoxProps['product']}
        />
        <FunnelBuyBox
          product={secondProduct as unknown as BuyBoxProps['product']}
        />
      </div>
    </SectionWrapper>
  );
};

export default BuyBoxes;
