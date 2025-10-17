import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData, Link } from "react-router";
import { Pagination, getPaginationVariables, Image } from "@shopify/hydrogen";
import type { SelectedOptionInput } from "@shopify/hydrogen/storefront-api-types";
import { PRODUCT_QUERY } from "~/components/ProductPage/productLoader";
import { COLLECTION_QUERY } from "./collections.$handle";
import { seoPayload } from "~/lib/seo.server";
import CollectionDisplay from "~/components/CollectionPage/CollectionDisplay";
import { FeaturedBundle } from "~/components/CollectionPage/FeaturedBundle";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const { storefront } = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 50,
  });

  const bulkHandle = "bulk";
  const bundleHandle = "bundles";
  const individualHandle = "main";

  const featuredProductHandle = "1-2-beef-deposit-free-freezer-400-value";
  const selectedOptions: SelectedOptionInput[] = [];
  const { product: featuredProduct } = await storefront.query(PRODUCT_QUERY, {
    variables: { handle: featuredProductHandle, selectedOptions },
  });

  const { collection: bundleCollection } = await storefront.query(
    COLLECTION_QUERY,
    {
      variables: { handle: bundleHandle, ...paginationVariables },
    }
  );

  const { collection: bulkCollection } = await storefront.query(
    COLLECTION_QUERY,
    {
      variables: { handle: bulkHandle, ...paginationVariables },
    }
  );

  const { collection: individualCollection } = await storefront.query(
    COLLECTION_QUERY,
    {
      variables: { handle: individualHandle, ...paginationVariables },
    }
  );
  if (!bulkCollection || !bundleCollection || !individualCollection) {
    throw new Response(
      `Collection ${bulkHandle} or ${bundleHandle} or ${individualHandle} not found`,
      {
        status: 404,
      }
    );
  }

  const filteredCollections = {
    nodes: [bulkCollection, bundleCollection, individualCollection],
  };

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
        {
          ...individualCollection,
          seo: {
            title: individualCollection.title,
            description: individualCollection.description,
          },
        },
      ],
    },
    url: request.url,
  });

  return { collections: filteredCollections, seo, featuredProduct };
}

export default function Collection() {
  const { collections, featuredProduct } = useLoaderData<typeof loader>();
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
