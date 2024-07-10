import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  Link,
  type MetaFunction,
  useLocation,
} from '@remix-run/react';
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
import {AddToCartButton} from './products.$handle';
import {FunnelIcon} from '@heroicons/react/24/solid';
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
  const categories = [
    {to: '/collections/main', name: 'All', rounded: true},
    {to: '/shop', name: 'Bundles'},
    {to: '/collections/steak', name: 'Steaks'},
    {to: '/collections/roast', name: 'Roasts'},
    {
      to: '/collections/ground-and-stewing',
      name: 'Other',
      last: true,
    },
  ];
  const currentPath = useLocation().pathname;

  return (
    <>
      <div className="grid grid-cols-[320px] content-center justify-center justify-items-center gap-16 gap-y-4 pb-4 lg:grid-cols-[repeat(2,_320px)] xl:grid-cols-[repeat(3,_320px)] ">
        <div className="flex w-full justify-between gap-4 justify-self-start pt-6 lg:col-span-2  xl:col-span-3">
          <Search searchState={[search, setSearch]} />
        </div>
        <div className=" w-full bg-primary-500 font-bold rounded-md text-white lg:col-span-2 xl:col-span-3 text-xl">
          <div className=" flex flex-col justify-items-stretch justify-between lg:flex-row">
            {categories.map((category, index) => {
              return (
                <Link
                  key={category.to}
                  className={`flex-1 px-4 py-4  border-4 border-primary-500  ${
                    category.to === currentPath
                      ? 'bg-backdrop-700 text-black hover:bg-backdrop-500 py-2'
                      : 'hover:bg-black'
                  } ${category.rounded ? 'rounded-l-md' : ''} ${
                    index === categories.length - 1 ? 'rounded-r-md' : ''
                  }`}
                  to={category.to}
                >
                  {category.name}
                </Link>
              );
            })}
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
    <div
      className="grid w-80 grid-rows-[356px] gap-x-16 gap-y-4 bg-backdrop-500 hover:translate-y-[-2px] transition-transform duration-250"
      key={product.id}
    >
      <Link
        className="grid grid-rows-[320px_48px]"
        prefetch="intent"
        to={variantUrl}
      >
        {product.featuredImage && (
          <Image
            className="h-[320px] w-[320px] object-cover"
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
      </Link>
      <div className="text-lg px-4">
        {product.description !== '' && (
          <div
            className="product-item"
            dangerouslySetInnerHTML={{
              __html: (product.descriptionHtml || '')
                .replace(/<ul[^>]*>(.*?)<\/ul>/gs, '')
                .replace(/<br><br>[\s\S]*/g, '')
                .replace(
                  "Note, I can't guarantee the individual weights of the cuts, however overall weight should be the same.",
                  '',
                ),
            }}
          />
        )}
        <Link className="underline items-start" to={`${variantUrl}`}>
          more info
        </Link>
      </div>
      <Money
        className="px-4 self-end"
        data={product.priceRange.minVariantPrice}
      />
      <div className="content-end">
        <AddToCartButton
          disabled={!variant || !variant.availableForSale}
          onClick={() => {
            window.location.href = window.location.href + '#cart-aside';
          }}
          lines={
            product
              ? [
                  {
                    merchandiseId: variant.id,
                    quantity: 1,
                  },
                ]
              : []
          }
        >
          {variant?.availableForSale ? 'Add to cart' : 'Sold out'}
        </AddToCartButton>
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
