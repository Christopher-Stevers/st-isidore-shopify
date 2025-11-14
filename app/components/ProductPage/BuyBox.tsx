import BuyBoxCTA from './BuyBoxFolder/BuyBoxCTA';
import BuyBoxTitle from './BuyBoxFolder/BuyBoxTitle';
import BuyBoxPrice from './BuyBoxFolder/BuyBoxPrice';
import BuyBoxSocialProof from './BuyBoxFolder/BuyBoxSocialProof';
import BuyBoxDescription from './BuyBoxFolder/BuyBoxDescription';
import {VariantSelector} from '@shopify/hydrogen';
import ProductOptions from './ProductOptions';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import BuyBoxImages from './BuyBoxFolder/BuyBoxImages';
import type {SellingPlanFragment} from 'storefrontapi.generated';
import {SellingPlanSelector, type SellingPlanGroup} from '~/components/SellingPlanSelector';
import {Link} from 'react-router';
import sellingPlanStyle from '~/styles/selling-plan.css?url';

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
    sellingPlanGroups?: {
      nodes: SellingPlanGroup[];
    };
  };
  variants: {
    product: {
      variants: {
        nodes: ProductVariant[];
      };
    };
  };
  selectedSellingPlan?: SellingPlanFragment | null;
};

const BuyBox = ({product, variants, selectedSellingPlan}: BuyBoxProps) => {
  const onlyDefaultVariant =
    variants.product?.variants.nodes[0]?.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    );
  const hasSellingPlans = product.sellingPlanGroups?.nodes && product.sellingPlanGroups.nodes.length > 0;
  
  return (
    <>
      <link rel="stylesheet" href={sellingPlanStyle} />
      <div
        className="mx-auto 
    flex flex-col md:flex-row w-[1080px] max-w-[75%] py-8  justify-start justify-items-stretch items-stretch
     gap-16  md:px-8"
      >
        <BuyBoxImages className="flex-1 order-2" product={product} />
        <div className="flex flex-col gap-4 flex-1 order-1">
          <BuyBoxTitle title={product.title} />
          <BuyBoxSocialProof />
          <BuyBoxPrice
            selectedVariant={product.selectedVariant as ProductVariant}
            selectedSellingPlan={selectedSellingPlan}
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

          {hasSellingPlans && (
            <>
              <br />
              <hr />
              <br />
              <h3>Subscription Options</h3>
              <SellingPlanSelector
                sellingPlanGroups={product.sellingPlanGroups as any}
                selectedSellingPlan={selectedSellingPlan}
                selectedVariant={product.selectedVariant as any}
              >
                {({sellingPlanGroup}) => (
                  <SellingPlanGroupComponent
                    key={sellingPlanGroup.name}
                    sellingPlanGroup={sellingPlanGroup}
                  />
                )}
              </SellingPlanSelector>
              <br />
            </>
          )}

          <BuyBoxDescription description={product.descriptionHtml} />
          <BuyBoxCTA
            selectedVariant={product.selectedVariant as ProductVariant}
            selectedSellingPlan={selectedSellingPlan}
            cta={
              product.metafields.find((metafield) => metafield?.key === 'cta')
                ?.value || 'Add To Cart!'
            }
          />
        </div>
      </div>
    </>
  );
};

// Update as you see fit to match your design and requirements
function SellingPlanGroupComponent({
  sellingPlanGroup,
}: {
  sellingPlanGroup: SellingPlanGroup;
}) {
  return (
    <div className="selling-plan-group" key={sellingPlanGroup.name}>
      <p className="selling-plan-group-title">
        <strong>{sellingPlanGroup.name}:</strong>
      </p>
      {sellingPlanGroup.sellingPlans.nodes.map((sellingPlan) => {
        return (
          <Link
            key={sellingPlan.id}
            prefetch="intent"
            to={sellingPlan.url}
            className={`selling-plan ${
              sellingPlan.isSelected ? 'selected' : 'unselected'
            }`}
            preventScrollReset
            replace
          >
            <p>
              {sellingPlan.options.map(
                (option) => `${option.name} ${option.value}`,
              )}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export default BuyBox;
