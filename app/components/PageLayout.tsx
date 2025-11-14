import {Await, useRouteLoaderData} from 'react-router';
import {Suspense, useMemo, useEffect, useRef} from 'react';
import React from 'react';
import {CartForm} from '@shopify/hydrogen';
import type {CartApiQueryFragment, LayoutQuery} from 'storefrontapi.generated';
import {Header} from '~/components/Header';
import {type EnhancedMenu} from '~/lib/utils';
import type {RootLoader} from '~/root';
import {Footer} from './shared/Footer';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {Link} from '~/components/Link';
import {useRootLoaderData} from '~/root';
import { Aside, useAside } from './Aside';
import { CartMain } from './CartMain';
import {useCartFetchers} from '~/hooks/useCartFetchers';

export type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};
export function PageLayout({children, layout}: LayoutProps) {
  const {headerMenu} = layout || {};
  const {header, cart} = useRootLoaderData();

  // Component to auto-open cart when items are added (skeleton template pattern)
  function CartAutoOpen() {
    const {open, type} = useAside();
    const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);
    const prevFetchersRef = useRef(addToCartFetchers);
    const openedFetcherIdsRef = useRef<Set<string>>(new Set());

    useEffect(() => {
      // Check if any fetcher just completed successfully
      addToCartFetchers.forEach((fetcher) => {
        const fetcherKey = fetcher.key || String(fetcher.formData?.get('action') || Math.random());
        const state = fetcher.state as string;
        const prevFetcher = prevFetchersRef.current.find(
          (prev) => (prev.key || String(prev.formData?.get('action') || '')) === fetcherKey
        );
        const prevState = prevFetcher?.state as string;
        
        const wasActive = prevState === 'submitting' || prevState === 'loading';
        const isNowIdle = state === 'idle';
        const hasData = !!(fetcher as any).data;
        const alreadyOpened = openedFetcherIdsRef.current.has(fetcherKey);
        
        // Debug logging (remove in production)
        if (process.env.NODE_ENV === 'development') {
          if (wasActive && isNowIdle) {
            console.log('[CartAutoOpen] Fetcher completed:', {
              fetcherKey,
              state,
              prevState,
              hasData,
              alreadyOpened,
              type,
            });
          }
        }
        
        // Open cart if fetcher just completed successfully and we haven't opened for this fetcher yet
        // Always try to open if we have successful data (calling open('cart') when already open is safe)
        if (wasActive && isNowIdle && hasData && !alreadyOpened) {
          console.log('[CartAutoOpen] Opening cart for fetcher:', fetcherKey);
          // Use setTimeout to ensure React has updated the DOM
          setTimeout(() => {
            open('cart');
          }, 0);
          openedFetcherIdsRef.current.add(fetcherKey);
        }
      });

      // Clean up old fetcher IDs that are no longer in the list
      const currentFetcherKeys = new Set(
        addToCartFetchers.map(f => f.key || String(f.formData?.get('action') || ''))
      );
      openedFetcherIdsRef.current.forEach((key) => {
        if (!currentFetcherKeys.has(key)) {
          openedFetcherIdsRef.current.delete(key);
        }
      });

      prevFetchersRef.current = addToCartFetchers;
    }, [addToCartFetchers, open, type]);

    return null;
  }

  function CartCountButton() {
    const {open} = useAside();
    return <CartCount openCart={() => open('cart')} />;
  }

  return (
    <>
    <Aside.Provider>
      <CartAutoOpen />
      <CartAside cart={cart} />
      <div
        className={`inset-0 pointer-events-none fixed opacity-[0.075] bg-[url('https://cdn.shopify.com/s/files/1/0626/1991/0197/files/4002470.jpg?v=1720557749')]`}
      ></div>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        {header && (
          <Header
            menu={header}
            primaryDomainUrl={'https://stisidoreranch.com'}
            viewport="desktop"
          />
        )}
        <main
          role="main"
          id="mainContent"
          className="flex-grow pt-8 pb-48 md:pt-16 relative z-10"
        >
          {children}
        </main>
      </div>
      <CartCountButton />
      <Footer />
      {/*<EmailGrabber />*/}
    </Aside.Provider>
    </>
  );
}
function CartCount({openCart}: {openCart: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Suspense fallback={<Badge count={0} openCart={openCart} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <Badge openCart={openCart} count={cart?.totalQuantity || 0} />
        )}
      </Await>
    </Suspense>
  );
}
function Badge({openCart, count}: {count: number; openCart: () => void}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <div className="fixed bottom-6 z-40 right-6 rounded-full border-4 border-primary-500  bg-backdrop-700 p-3 text-primary-500">
          <div className="absolute  inset-x-7 top-2 bg-backdrop-700 font-sans font-bold">
            {count}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-10 w-10 z-40"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            ></path>
          </svg>
        </div>
      </>
    ),
    [count],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5 cursor-pointer"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5 cursor-pointer"
    >
      {BadgeCounter}
    </Link>
  );
}

function CartAside({cart}: {cart:  Promise<CartApiQueryFragment | null>}) {
  return (
    <Aside type="cart" heading="Cart">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}