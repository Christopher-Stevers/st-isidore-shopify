import {Await, useLocation} from 'react-router';
import {Suspense} from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {Cart} from './Cart';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';
import {useRootLoaderData} from '~/root';

export type LayoutProps = {
  cart: Promise<CartApiQueryFragment | null>;
  children?: React.ReactNode;
  footer: Promise<FooterQuery>;
  header?: HeaderQuery;
  isLoggedIn?: Promise<boolean>;
};

export function Layout({children}: {children: React.ReactNode}) {
  const location = useLocation();
  const {
    layout: {headerMenu, shop},
    cart,
  } = useRootLoaderData();
  return (
    <>
      <CartAside cart={cart} />
      <SearchAside />
      {headerMenu && <MobileMenuAside menu={headerMenu} shop={shop} />}
      {headerMenu && (
        <Header
          menu={headerMenu as any}
          primaryDomainUrl={shop?.primaryDomain?.url}
          viewport="desktop"
        />
      )}
      <main
        className={`min-h-[calc(100vh-128px)] ${
          location.pathname !== '/' && 'lg:p-32 p-8'
        }`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}

function CartAside({cart}: {cart: LayoutProps['cart']}) {
  return (
    <Aside id="cart-aside" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return (
              <Cart cart={cart as any} layout="drawer" onClose={() => {}} />
            );
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

function MobileMenuAside({menu, shop}: {menu: any; shop: any}) {
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
