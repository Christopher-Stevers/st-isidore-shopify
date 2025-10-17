import { Await, useRouteLoaderData } from "react-router";
import { Suspense, useEffect, useMemo } from "react";
import { CartForm } from "@shopify/hydrogen";

import { type LayoutQuery } from "storefrontapi.generated";
import { Cart } from "~/components/Cart";
import { CartLoading } from "~/components/CartLoading";
import { Drawer, useDrawer } from "~/components/Drawer";
import { Header } from "~/components/Header";
import { type EnhancedMenu } from "~/lib/utils";
import { useCartFetchers } from "~/hooks/useCartFetchers";
import type { RootLoader } from "~/root";
import { Footer } from "./shared/Footer";
import EmailGrabber from "~/Marketing/EmailGrabber";
import { useIsHydrated } from "~/hooks/useIsHydrated";
import { Link } from "~/components/Link";

export type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function PageLayout({ children, layout }: LayoutProps) {
  const { headerMenu } = layout || {};

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <div
        className={`inset-0 pointer-events-none fixed opacity-[0.075] bg-[url('https://cdn.shopify.com/s/files/1/0626/1991/0197/files/4002470.jpg?v=1720557749')]`}
      ></div>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        {headerMenu && layout?.shop.name && (
          <Header
            menu={headerMenu}
            primaryDomainUrl={layout.shop.primaryDomain.url}
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
      <CartCount openCart={openCart} />
      <Footer />
      {/*<EmailGrabber />*/}
    </>
  );
}
function CartCount({ openCart }: { openCart: () => void }) {
  const rootData = useRouteLoaderData<RootLoader>("root");
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
function Badge({ openCart, count }: { count: number; openCart: () => void }) {
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
    [count]
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}

function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const rootData = useRouteLoaderData<RootLoader>("root");
  if (!rootData) return null;

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}
