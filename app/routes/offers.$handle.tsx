import {
  type LoaderFunctionArgs,
  type MetaFunction,
  useLoaderData,
} from 'react-router';
import {OFFER_QUERY} from '~/lib/offerQuery';
import {MarketingSystem} from '~/components/marketing/MarketingSystem';

export const meta: MetaFunction<typeof loader> = ({matches}) => {
  const data = matches.find((match) => match.id === 'routes/offers.$handle')
    ?.data as Awaited<ReturnType<typeof loader>> | undefined;

  const offer = data?.offer;
  const title = offer?.title
    ? `${offer.title} - St. Isidore Ranch`
    : 'Special Offer - St. Isidore Ranch';
  const description =
    offer?.description ||
    'Premium grass-fed beef from St. Isidore Ranch. Local, sustainable, and perfect for your family.';

  return [
    {title},
    {name: 'description', content: description},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:type', content: 'product'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Response('Not found', {status: 404});
  }

  // Query Shopify for the product with offer metafields using Storefront API
  const {product} = await storefront.query(OFFER_QUERY, {
    variables: {
      handle,
    },
  });

  if (!product) {
    throw new Response('Offer not found', {status: 404});
  }

  // Extract offer data from product
  const allVariantsWithProduct = {
    nodes: product.variants.nodes.map((variant) => ({
      ...variant,
      product: {
        title: product.title,
        handle: product.handle,
        featuredImage: product.featuredImage,
        priceRange: product.priceRange,
      },
    })),
  };
  const offerData = {
    handle: product.handle,
    title: product.title,
    description: product.description,
    featuredImage: product.featuredImage,
    priceRange: product.priceRange,
    variants: allVariantsWithProduct,
    images: product.images,
  };

  // Pass metafields directly to MarketingSystem
  return {offer: offerData, metafields: product.metafields || []};
}

export default function OfferPage() {
  const {offer, metafields} = useLoaderData<typeof loader>();

  return <MarketingSystem offer={offer} metafields={metafields} />;
}
