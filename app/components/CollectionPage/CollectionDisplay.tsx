import type {ProductItemFragment} from 'storefrontapi.generated';
import {Seperator} from './Seperator';
import {Pagination} from '@shopify/hydrogen';
import {CollectionGrid} from './CollectionGrid';
import type {Maybe} from '@shopify/hydrogen/storefront-api-types';

const CollectionDisplay = ({
  collection,
}: {
  collection: {
    id: string;
    title: string;
    products: {
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: Maybe<string> | undefined;
        endCursor?: Maybe<string> | undefined;
      };
      nodes: ProductItemFragment[];
    };
  };
}) => {
  return (
    <div key={collection.id} className="container mx-auto px-8">
      <div className="flex items-center justify-between">
        <Seperator />
        <h2 id={`#${collection.title}`} className="text-2xl font-bold">
          {collection.title}
        </h2>
        <Seperator />
      </div>
      <div className="py-12">
        <Pagination connection={collection.products}>
          {({nodes, isLoading, PreviousLink, NextLink}) => (
            <>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
              </PreviousLink>
              <CollectionGrid products={nodes} />
              <br />
              <NextLink>
                {isLoading ? 'Loading...' : <span>Load more ↓</span>}
              </NextLink>
            </>
          )}
        </Pagination>
      </div>
    </div>
  );
};

export default CollectionDisplay;
