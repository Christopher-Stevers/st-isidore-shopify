import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {COLLECTION_QUERY} from './collections.$handle';
import {seoPayload} from '~/lib/seo.server';
import {FeaturedBundle} from '~/components/CollectionPage/FeaturedBundle';
import {PRODUCT_QUERY} from '~/components/ProductPage/productLoader';
import type {SelectedOptionInput} from '@shopify/hydrogen/storefront-api-types';
import CollectionDisplay from '~/components/CollectionPage/CollectionDisplay';
export const meta: MetaFunction<typeof loader> = () => {
  return [{title: `St Isidore Ranch | Bulk & Bundles`}];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 50,
  });

  const bulkHandle = 'bulk';
  const bundleHandle = 'bundles';

  const featuredProductHandle = '1-2-beef-deposit-free-freezer-400-value';
  const selectedOptions: SelectedOptionInput[] = [];
  const {product: featuredProduct} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle: featuredProductHandle, selectedOptions},
  });

  const {collection: bundleCollection} = await storefront.query(
    COLLECTION_QUERY,
    {
      variables: {handle: bundleHandle, ...paginationVariables},
    },
  );

  const {collection: bulkCollection} = await storefront.query(
    COLLECTION_QUERY,
    {
      variables: {handle: bulkHandle, ...paginationVariables},
    },
  );

  if (!bulkCollection || !bundleCollection) {
    throw new Response(
      `Collection ${bulkHandle} or ${bundleHandle} not found`,
      {
        status: 404,
      },
    );
  }

  const filteredCollections = {nodes: [bulkCollection, bundleCollection]};

  const seo = seoPayload.listCollections({
    collections: {
      nodes: [
        {
          ...bulkCollection,
          seo: {
            title: bulkCollection.title,
            description: bulkCollection.description,
          },
        },
        {
          ...bundleCollection,
          seo: {
            title: bundleCollection.title,
            description: bundleCollection.description,
          },
        },
      ],
    },
    url: request.url,
  });

  return json({collections: filteredCollections, seo, featuredProduct});
}

export default function Collection() {
  const {collections, featuredProduct} = useLoaderData<typeof loader>();
  return (
    <div className="collection">
      <h1 className="hidden">Shop</h1>
      <FeaturedBundle featuredProduct={featuredProduct} />
      {collections.nodes.map((elem) => {
        return <CollectionDisplay key={elem.id} collection={elem} />;
      })}
    </div>
  );
}
