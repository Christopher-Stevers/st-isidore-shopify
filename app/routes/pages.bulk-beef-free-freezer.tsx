import Testimonials from '~/components/SharedMarketing/Testimonials';
import {getSelectedProductOptions} from '@shopify/hydrogen';
import {type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {PRODUCT_QUERY} from '~/components/ProductPage/productLoader';
import IntroOffer from '~/components/SharedMarketing/IntroOffer';
import HowItWorks from '~/components/SharedMarketing/HowItWorks';
import FreeFreezerCallToAction from '~/components/SharedMarketing/FreeFreezer/FreeFreezerCallToAction';
import WhyChooseUs from '~/components/SharedMarketing/WhyChooseUs';
import FreeFreezerFaq from '~/components/SharedMarketing/FreeFreezer/FreeFreezerFaq';
import {freeFreezerContentsections} from '~/components/SharedMarketing/constants';
import GenericContentSection from '~/components/SharedMarketing/GenericContentSection';

import FreeFreezerBuyBoxes from '~/components/SharedMarketing/FreeFreezer/FreeFreezerBuyBoxes';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {storefront} = context;

  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      // Filter out Shopify predictive search query params
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v') &&
      // Filter out third party tracking params
      !option.name.startsWith('fbclid'),
  );

  const firstProductHandle = '1-2-beef-deposit-free-freezer-400-value';
  const secondProductHandle = 'whole-beef-deposit-free-freezer-800-value';
  // await the query for the critical product data
  const {product: firstProduct} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle: firstProductHandle, selectedOptions},
  });
  const {product: secondProduct} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle: secondProductHandle, selectedOptions},
  });

  if (!firstProduct?.id) {
    throw new Response(null, {status: 404});
  }
  if (!secondProduct?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariantOfFirstProduct = firstProduct.variants.nodes[0];
  const firstVariantOfSecondProduct = secondProduct.variants.nodes[0];
  firstProduct.selectedVariant = firstVariantOfFirstProduct!;
  secondProduct.selectedVariant = firstVariantOfSecondProduct!;
  if (!firstVariantOfFirstProduct) {
    throw new Response(null, {status: 404});
  }
  if (!firstVariantOfSecondProduct) {
    throw new Response(null, {status: 404});
  }

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.

  return defer({firstProduct, secondProduct});
};

// Main App Component
export default function FreeFreezerFunnel() {
  return (
    <div className="font-sans antialiased text-gray-800 ">
      <main className="flex flex-col px-4">
        <IntroOffer />
        {freeFreezerContentsections.map((div, index) => (
          <GenericContentSection key={index} {...div} />
        ))}
        <FreeFreezerBuyBoxes />
        <HowItWorks /> <Testimonials />
        <FreeFreezerCallToAction />
        <FreeFreezerFaq />
        <WhyChooseUs /> {/* */}
      </main>
    </div>
  );
}
