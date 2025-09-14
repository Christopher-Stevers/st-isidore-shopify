import {defer} from '@shopify/remix-oxygen';
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {getSelectedProductOptions} from '@shopify/hydrogen';
import {PRODUCT_QUERY} from '~/components/ProductPage/productLoader';
import ThankYou from '~/components/SharedMarketing/Giveaway/ThankYou';

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

  const firstProductHandle = 'everyday-steaks-family-price-copy';
  const secondProductHandle = 'whole-beef-deposit-free-freezer-800-value';
  const thirdProductHandle = '1-4-beef';
  // await the query for the critical product data
  const {product: firstProduct} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle: firstProductHandle, selectedOptions},
  });
  const {product: secondProduct} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle: secondProductHandle, selectedOptions},
  });
  const {product: thirdProduct} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle: thirdProductHandle, selectedOptions},
  });

  if (!firstProduct?.id) {
    throw new Response(null, {status: 404});
  }
  if (!secondProduct?.id) {
    throw new Response(null, {status: 404});
  }
  if (!thirdProduct?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariantOfFirstProduct = firstProduct.variants.nodes[0];
  const firstVariantOfSecondProduct = secondProduct.variants.nodes[0];
  const firstVariantOfThirdProduct = thirdProduct.variants.nodes[0];
  firstProduct.selectedVariant = firstVariantOfFirstProduct!;
  secondProduct.selectedVariant = firstVariantOfSecondProduct!;
  thirdProduct.selectedVariant = firstVariantOfThirdProduct!;

  if (!firstVariantOfFirstProduct) {
    throw new Response(null, {status: 404});
  }
  if (!firstVariantOfSecondProduct) {
    throw new Response(null, {status: 404});
  }
  if (!firstVariantOfThirdProduct) {
    throw new Response(null, {status: 404});
  }

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.

  return defer({firstProduct, secondProduct, thirdProduct});
};

const GiveawayThankYou = () => {
  return <ThankYou />;
};

export default GiveawayThankYou;
