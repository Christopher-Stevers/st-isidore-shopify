import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {getPaginationVariables} from '@shopify/hydrogen';
import {COLLECTION_QUERY} from './collections.$handle';
import {seoPayload} from '~/lib/seo.server';
import CollectionDisplay from '~/components/CollectionPage/CollectionDisplay';

export const meta: MetaFunction<typeof loader> = () => {
  return [{title: `St Isidore Ranch | Bulk & Bundles`}];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const handle = 'shop';
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 50,
  });

  if (!handle) {
    return redirect('/collections');
  }
  const bulkHandle = 'bulk';
  const bundleHandle = 'bundles';

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
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
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

  return json({collections: filteredCollections, seo});
}

export default function Collection() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="collection">
      <h1 className="hidden">Shop</h1>
      {collections.nodes.map((elem) => {
        return <CollectionDisplay key={elem.id} collection={elem} />;
      })}
    </div>
  );
}
