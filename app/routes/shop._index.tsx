import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {getPaginationVariables} from '@shopify/hydrogen';
import {COLLECTION_QUERY} from './collections.$handle';
import CollectionDisplay from '~/components/CollectionPage/CollectionDisplay';
export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: `St Isidore Ranch | ${data?.collection.title ?? ''} Collection`},
  ];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const handle = 'bundles';
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 50,
  });

  if (!handle) {
    return redirect('/collections');
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  return json({collection});
}

export default function Shop() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <div className="collection">
      <h1 className="hidden">Shop</h1>
      <CollectionDisplay collection={collection} />
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
