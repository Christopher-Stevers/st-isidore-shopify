import {
  Analytics,
  getSelectedProductOptions,
  getShopAnalytics,
  useNonce,
} from '@shopify/hydrogen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useMatches,
  useRouteError,
  useRouteLoaderData,
  ScrollRestoration,
  isRouteErrorResponse,
  type LoaderFunctionArgs,
  type ShouldRevalidateFunction,
} from 'react-router';
import '~/tailwind.css';
import favicon from './assets/favicon.svg';
import resetStyles from './styles/reset.css?url';
import appStyles from './styles/app.css?url';
import {PageLayout} from '~/components/PageLayout';
import {
  PRODUCT_FRAGMENT,
  VARIANTS_QUERY,
} from './components/ProductPage/productLoader';
import type {SelectedOptionInput} from '@shopify/hydrogen/storefront-api-types';

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
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

/**
 * Access the result of the root loader from a React component.
 */
export const useRootLoaderData = () => {
  const [root] = useMatches();
  return root?.loaderData as Awaited<ReturnType<typeof loader>>;
};

export async function loader({context, request}: LoaderFunctionArgs) {
  const {storefront, cart, env} = context;

  // Load footer data (deferred)
  const footer = storefront.query(FOOTER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      footerMenuHandle: 'footer',
    },
  });
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

  const layout = await storefront.query(LAYOUT_QUERY, {
    variables: {
      headerMenuHandle: 'main-menu',
      footerMenuHandle: 'footer',
      language: storefront.i18n.language,
      featuredProductHandle: featuredHandle,
      selectedOptions,
    },
  });

  // Load cart data
  const cartPromise = cart.get();

  const bestSellers = layout?.bestSellers;
  const featuredProduct = layout?.product;
  if (featuredProduct) {
    featuredProduct.selectedVariant =
      featuredProduct.selectedVariant ?? firstAvailableVariant;
  }

  return {
    footer,
    layout: {
      headerMenu: layout.headerMenu,
      footerMenu: layout.footerMenu,
      shop: layout.shop,
      bestSellers,
      product: featuredProduct,
    },
    header: layout.headerMenu,
    cart: cartPromise,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  };
}

export type RootLoader = typeof loader;

export function Layout({children}: {readonly children?: React.ReactNode}) {
  const nonce = useNonce();
  const data = useRouteLoaderData<typeof loader>('root');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links /> {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: ` !function(f,b,e,v,n,t,s)
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
            __html: `<img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=718040284049560&ev=PageView&noscript=1"
        />`,
          }}
        />
        {/* End Meta Pixel Code */}
      </head>
      <body>
        {data ? (
          <Analytics.Provider
            cart={data.cart}
            shop={data.shop}
            consent={data.consent}
          >
            <PageLayout>{children}</PageLayout>
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
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="route-error">
      <h1>Oops</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}

const MENU_FRAGMENT = `#graphql
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
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
` as const;

const HEADER_QUERY = `#graphql
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
  query Header(
    $country: CountryCode
    $headerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    shop {
      ...Shop
    }
    menu(handle: $headerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
` as const;

const FOOTER_QUERY = `#graphql
  query Footer(
    $country: CountryCode
    $footerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    menu(handle: $footerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
` as const;

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
