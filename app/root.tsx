import {
  defer,
  type LoaderFunctionArgs,
  type AppLoadContext,
  type SerializeFrom,
} from '@shopify/remix-oxygen';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  useRouteError,
  type ShouldRevalidateFunction,
  useMatches,
} from '@remix-run/react';
import {
  useNonce,
  Analytics,
  getShopAnalytics,
  getSelectedProductOptions,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

import {PageLayout} from '~/components/PageLayout';
import {GenericError} from '~/components/GenericError';
import {NotFound} from '~/components/NotFound';
import favicon from '~/assets/favicon.svg';
import {seoPayload} from '~/lib/seo.server';

import resetStyles from './styles/reset.css?url';
import appStyles from './styles/app.css?url';
import stylesheet from './styles/tailwind.css?url';

import {DEFAULT_LOCALE, parseMenu} from './lib/utils';
import {
  PRODUCT_FRAGMENT,
  VARIANTS_QUERY,
} from './components/ProductPage/productLoader';
import type {SelectedOptionInput} from '@shopify/hydrogen/storefront-api-types';
export type RootLoader = typeof loader;

export const useRootLoaderData = () => {
  const [root] = useMatches();
  return root?.data as SerializeFrom<typeof loader>;
};

// This is important to avoid re-fetching root queries on sub-navigations
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }

  return false;
};

/**
 * The link to the main stylesheet is purposely not in this list. Instead, it is added
 * in the Layout function.
 *
 * This is to avoid a development bug where after an edit/save, navigating to another
 * link will cause page rendering error "failed to execute 'insertBefore' on 'Node'".
 *
 * This is a workaround until this is fixed in the foundational library.
 */

export function links() {
  return [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      crossOrigin: 'anonymous',
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Rye&family=Cantarell&family=Tangerine&display=swap',
    },
    {rel: 'stylesheet', href: stylesheet},
    {rel: 'stylesheet', href: resetStyles},
    {rel: 'stylesheet', href: appStyles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
}

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({
    ...deferredData,
    ...criticalData,
  });
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({request, context}: LoaderFunctionArgs) {
  const [layout] = await Promise.all([
    getLayoutData(context, request),
    // Add other queries here, so that they are loaded in parallel
  ]);

  const seo = seoPayload.root({shop: layout.shop, url: request.url});

  const {storefront, env} = context;
  return {
    layout,
    seo,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: true,
    },
    selectedLocale: storefront.i18n as {
      pathPrefix: string;
      language: string;
      country: string;
      label: string;
    },
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const {cart, customerAccount} = context;

  return {
    isLoggedIn: customerAccount.isLoggedIn(),
    cart: cart.get(),
  };
}

function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const data = useRouteLoaderData<typeof loader>('root');
  const locale = data?.selectedLocale ?? DEFAULT_LOCALE;

  return (
    <html lang={locale.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="msvalidate.01" content="A352E6A0AF9A652267361BBB572B8468" />

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '718040284049560');
            fbq('track', 'PageView');`,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img
            height="1"
            width="1"
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=718040284049560&ev=PageView&noscript=1"
            alt=""
          />`,
          }}
        />
        {/* End Meta Pixel Code */}
        <Meta />
        <Links />
      </head>
      <body>
        {data ? (
          <Analytics.Provider
            cart={data.cart}
            shop={data.shop}
            consent={data.consent}
          >
            <PageLayout
              key={`${locale.language}-${locale.country}`}
              layout={data.layout}
            >
              {children}
            </PageLayout>
          </Analytics.Provider>
        ) : (
          children
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export function ErrorBoundary({error}: {error: Error}) {
  const routeError = useRouteError();
  const isRouteError = isRouteErrorResponse(routeError);

  let pageType = 'page';

  if (isRouteError) {
    if (routeError.status === 404) pageType = routeError.data || pageType;
  }

  return (
    <Layout>
      {isRouteError ? (
        <>
          {routeError.status === 404 ? (
            <NotFound type={pageType} />
          ) : (
            <GenericError
              error={{message: `${routeError.status} ${routeError.data}`}}
            />
          )}
        </>
      ) : (
        <GenericError error={error instanceof Error ? error : undefined} />
      )}
    </Layout>
  );
}

const LAYOUT_QUERY = `#graphql
   query layout(
   $language: LanguageCode
   $headerMenuHandle: String!
   $footerMenuHandle: String!
   $featuredProductHandle: String!   
    $selectedOptions: [SelectedOptionInput!]!
 ) @inContext(language: $language) {
   shop {
     ...Shop
   }
   headerMenu: menu(handle: $headerMenuHandle) {
     ...Menu
   }
   footerMenu: menu(handle: $footerMenuHandle) {
     ...Menu
   }
   bestSellers: products(first: 3, query: "tag:bestseller", sortKey: BEST_SELLING) {
     ...BestSellerConnection # Renamed for clarity, defined on ProductConnection
   }
   product: product(handle: $featuredProductHandle) {
     ...Product
   }
 }

 fragment BestSellerConnection on ProductConnection {
   nodes {
     id
     title
     handle
     priceRange {
       minVariantPrice {
         amount
       }
     }
       
     featuredImage {
       url
     }
   }
 }

 fragment Shop on Shop {
   id
   name
   description
   primaryDomain {
     url
   }
   brand {
     logo {
       image {
         url
       }
     }
   }
 }

 fragment MenuItem on MenuItem {
   id
   resourceId
   tags
   title
   type
   url
 }

 fragment ChildMenuItem on MenuItem {
   ...MenuItem
 }

 fragment ParentMenuItem on MenuItem {
   ...MenuItem
   items { # This refers to child menu items
     ...ChildMenuItem
   }
 }

 fragment Menu on Menu {
   id
   items {
     ...ParentMenuItem
   }
 }
 ${PRODUCT_FRAGMENT}
` as const;

async function getLayoutData(
  {storefront, env}: AppLoadContext,
  request: Request,
) {
  const featuredHandle = 'eighth-beef';
  const variants = await storefront.query(VARIANTS_QUERY, {
    variables: {handle: featuredHandle},
  });
  const firstVariant = variants.product?.variants.nodes[0];
  const firstAvailableVariant = variants.product?.variants.nodes.find(
    (variant) => variant.availableForSale,
  );
  const defaultVariant = firstVariant;
  let selectedOptions = getSelectedProductOptions(request);
  if (selectedOptions.length > 0) {
    selectedOptions = (defaultVariant?.selectedOptions ??
      []) as SelectedOptionInput[];
  }

  const data = await storefront.query(LAYOUT_QUERY, {
    variables: {
      headerMenuHandle: 'main-menu',
      footerMenuHandle: 'footer',
      language: storefront.i18n.language,
      featuredProductHandle: featuredHandle,
      selectedOptions,
    },
  });

  invariant(data, 'No data returned from Shopify API');

  /*
    Modify specific links/routes (optional)
    @see: https://shopify.dev/api/storefront/unstable/enums/MenuItemType
    e.g here we map:
      - /blogs/news -> /news
      - /blog/news/blog-post -> /news/blog-post
      - /collections/all -> /products
  */
  const customPrefixes = {BLOG: '', CATALOG: 'products'};

  const headerMenu = data?.headerMenu
    ? parseMenu(
        data.headerMenu,
        data.shop.primaryDomain.url,
        env,
        customPrefixes,
      )
    : undefined;

  const footerMenu = data?.footerMenu
    ? parseMenu(
        data.footerMenu,
        data.shop.primaryDomain.url,
        env,
        customPrefixes,
      )
    : undefined;
  const bestSellers = data?.bestSellers;
  const featuredProduct = data?.product;
  if (featuredProduct) {
    featuredProduct.selectedVariant =
      featuredProduct.selectedVariant ?? firstAvailableVariant;
  }

  return {
    shop: data.shop,
    headerMenu,
    footerMenu,
    bestSellers,
    product: featuredProduct,
    variants,
  };
}
