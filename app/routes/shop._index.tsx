import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {
  Pagination,
  getPaginationVariables,
  Image,
  Money,
} from '@shopify/hydrogen';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {useState} from 'react';

import Search from '~/components/base/Search';
import {COLLECTION_QUERY} from './collections.$handle';
export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: `St Isidore Ranch | ${data?.collection.title ?? ''} Collection`},
  ];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const handle = 'bundles';
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
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
      <Pagination connection={collection.products}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
            </PreviousLink>
            <ProductsGrid products={nodes} />
            <br />
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more ↓</span>}
            </NextLink>
          </>
        )}
      </Pagination>
    </div>
  );
}

export function ProductsGrid({products}: {products: ProductItemFragment[]}) {
  const [search, setSearch] = useState('');
  return (
    <>
      <div className="grid grid-cols-[320px] content-center justify-center justify-items-center gap-16 gap-y-4 pb-4 lg:grid-cols-[repeat(2,_320px)] xl:grid-cols-[repeat(3,_320px)] ">
        <div className="flex w-full justify-between gap-4 justify-self-start pt-6 lg:col-span-2  xl:col-span-3">
          <Search searchState={[search, setSearch]} />
        </div>
        <div className=" w-full bg-primary-500 px-4 font-bold text-white lg:col-span-2 xl:col-span-3">
          <div className=" flex flex-col justify-between py-4 lg:flex-row">
            <div className="flex gap-4">
              <Link to="/shop">All</Link>
            </div>
            <div className="flex gap-4">
              <Link to="/collections/steak">Steaks</Link>
            </div>
            <div className="flex gap-4">
              <Link to="/collections/roast">Roasts</Link>
            </div>
            <div className="flex gap-4">
              <Link to="/collections/ground-and-stewing">Ground & Stewing</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[320px] content-center justify-center justify-items-center gap-16 gap-y-4 pb-4 lg:grid-cols-[repeat(2,_320px)] xl:grid-cols-[repeat(3,_320px)] ">
        {products
          .filter((product) => {
            const lowerSearch = search.toLowerCase();
            const lowerDescription = product.description?.toLowerCase();
            const lowerTitle = product.title.toLowerCase();
            return (
              !lowerSearch ||
              lowerDescription?.includes(search) ||
              lowerTitle.includes(search)
            );
          })
          .map((product, index) => {
            return (
              <ProductItem
                key={product.id}
                product={product}
                loading={index < 8 ? 'eager' : undefined}
              />
            );
          })}
      </div>
    </>
  );
}

function ProductItem({
  product,
  loading,
}: {
  product: ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <Link
      className="grid w-80 grid-rows-[180px_36px_120px]  gap-x-16 gap-y-4 bg-backdrop-500 pb-8"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {product.featuredImage && (
        <Image
          className="h-[180px] w-[320px]  "
          alt={product.featuredImage.altText || product.title}
          data={product.featuredImage}
          loading={loading}
          sizes="320px"
        />
      )}
      <div className="flex items-center justify-between px-4">
        <h3 className="whitespace-pre text-3xl font-semibold">
          {product.title}
        </h3>
      </div>
      <div className="text-lg px-4">
        <div
          className="product-item"
          dangerouslySetInnerHTML={{
            __html: (product.descriptionHtml || '').replace(
              /<ul[^>]*>(.*?)<\/ul>/gs,
              '',
            ),
          }}
        />
      </div>
      <Link className="underline px-4" to={`${variantUrl}`}>
        more info
      </Link>
      <Money className="px-4" data={product.priceRange.minVariantPrice} />
    </Link>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
