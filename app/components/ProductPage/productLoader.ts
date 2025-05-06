import {defer, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {type MetaFunction} from '@remix-run/react';
import type {ProductVariantsQuery} from 'storefrontapi.generated';
import {getSelectedProductOptions} from '@shopify/hydrogen';
import type {SelectedOption} from '@shopify/hydrogen/storefront-api-types';
import {getVariantUrl} from '~/lib/variants';

export const meta: MetaFunction<typeof productLoader> = ({data}) => {
  return [{title: `St Isidore Ranch | ${data?.product.title ?? ''}`}];
};

export const redirectToFirstVariant = ({
  data,
  request,
  handle,
}: {
  data: ProductVariantsQuery;
  request: Request;
  handle: string;
}) => {
  const url = new URL(request.url);
  const firstAvailableVariant = data?.product?.variants.nodes.find((variant) =>
    variant.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    ),
  );
  const firstVariant =
    firstAvailableVariant ?? data?.product?.variants.nodes[0];
  const targetVariant = firstAvailableVariant ?? firstVariant;
  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle,
      selectedOptions: targetVariant?.selectedOptions ?? [],
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
};

export const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

export const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    
    metafields(identifiers:[{
        namespace: "custom",
        key: "cta"
      }]){
      value    
      key
    }
    images(first:6) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

export const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

export const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

export const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
` as const;

export const productLoader = async ({
  params,
  request,
  context,
}: LoaderFunctionArgs) => {
  const {handle} = params;
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

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // await the query for the critical product data
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option: SelectedOption) =>
        option.name === 'Title' && option.value === 'Default Title',
    ),
  );
  const variants = await storefront.query(VARIANTS_QUERY, {
    variables: {handle},
  });
  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else if (!product.selectedVariant) {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied

    throw redirectToFirstVariant({data: variants, request, handle});
  }

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.

  console.log(product.selectedVariant, 'selectedVariant');
  return defer({product, variants});
};

export type ProductLoaderType = typeof productLoader;
