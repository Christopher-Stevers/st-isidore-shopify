import {Await, useLocation} from '@remix-run/react';
import {Suspense} from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import Footer from './shared/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/Cart';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';
import DismissableBanner from '../Marketing/DismissableBanner';
import EmailGrabber from '~/Marketing/EmailGrabber';

export type LayoutProps = {
  cart: Promise<CartApiQueryFragment | null>;
  children?: React.ReactNode;

  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
};

function CartBadge({count}: {count: number}) {
  return (
    <a
      href="#cart-aside"
      className="fixed bottom-6 z-40 right-6 rounded-full border-4 border-primary-500  bg-backdrop-700 p-3 text-primary-500"
    >
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
    </a>
  );
}

function CartToggle({cart}: Pick<LayoutProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}
export function Layout({
  cart,
  children = null,
  header,
  isLoggedIn,
}: LayoutProps) {
  return (
    <>
      <div
        className={`inset-0 fixed opacity-[0.075] bg-[url('https://cdn.shopify.com/s/files/1/0626/1991/0197/files/4002470.jpg?v=1720557749')]`}
      ></div>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside menu={header?.menu} shop={header?.shop} />
      {header && <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />}
      <main
        className={`min-h-[calc(100vh-340px)] pt-8 pb-48 md:pt-16 relative z-10`}
      >
        {children}
      </main>

      <CartToggle cart={cart} />
      <Footer />
      {/*}  <DismissableBanner />*/}
      <EmailGrabber />
    </>
  );
}

function CartAside({cart}: {cart: LayoutProps['cart']}) {
  return (
    <Aside id="cart-aside" heading="Cart">
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

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button
                onClick={() => {
                  window.location.href = inputRef?.current?.value
                    ? `/search?q=${inputRef.current.value}`
                    : `/search`;
                }}
              >
                Search
              </button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

function MobileMenuAside({
  menu,
  shop,
}: {
  menu: HeaderQuery['menu'];
  shop: HeaderQuery['shop'];
}) {
  return (
    menu &&
    shop?.primaryDomain?.url && (
      <Aside id="mobile-menu-aside" heading="MENU">
        <HeaderMenu
          menu={menu}
          viewport="mobile"
          primaryDomainUrl={shop.primaryDomain.url}
        />
      </Aside>
    )
  );
}
export const Attributions = () => (
  <>
    Image by{' '}
    <a href="https://www.freepik.com/free-vector/topographic-map-background_8967819.htm#page=2&query=topographic%20background&position=0&from_view=keyword&track=ais_hybrid&uuid=b2300715-cfe1-472b-812d-f1e92e5b96e8">
      Freepik
    </a>
  </>
);
