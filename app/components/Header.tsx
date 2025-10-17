import { Await, Link, useLocation } from "react-router";
import { Suspense } from "react";
import type { HeaderQuery } from "storefrontapi.generated";
import type { LayoutProps } from "./Layout";
import { useRootLoaderData } from "~/root";

import { Image } from "@shopify/hydrogen";
import type { EnhancedMenu } from "~/lib/utils";

export const Logo =
  "https://cdn.shopify.com/s/files/1/0626/1991/0197/files/canvas_image.png?v=1715807518";

type HeaderProps = {
  header: {
    menu: EnhancedMenu;
    shop: {
      primaryDomain: {
        url: string;
      };
    };
  };
  cart?: unknown;
  isLoggedIn?: boolean;
};

type Viewport = "desktop" | "mobile";

type HeaderMenuProps = {
  menu: EnhancedMenu;
  primaryDomainUrl: string;
  viewport: Viewport;
};
export function Header({ menu, primaryDomainUrl }: HeaderMenuProps) {
  return (
    <header className="header">
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={primaryDomainUrl}
      />
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
}: HeaderMenuProps) {
  function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
    if (viewport === "mobile") {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  const location = useLocation();

  return (
    <nav
      className={`flex relative w-full py-4 z-20 content-center md:px-0 px-4 items-center font-display justify-between text-2xl ${
        location.pathname !== "/" && "bg-primary-700"
      }`}
      role="navigation"
    >
      <Link className="w-8 md:w-auto" to="/">
        <Image
          className="object-fit w-16  rounded-full md:w-auto md:px-6 "
          alt="products"
          src={Logo}
          sizes="128px"
        />
      </Link>
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;
        const currentUrl =
          item.url === "/collections/all" ? "/collections" : item.url;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes("myshopify.com") ||
          item.url.includes(primaryDomainUrl)
            ? new URL(currentUrl).pathname
            : currentUrl;
        return (
          <Link
            className={`text-white ${
              url !== location?.pathname ? "opacity-70" : ""
            } ${url === "/" ? "hidden md:block" : ""}`}
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            to={url}
          >
            {item.title}
          </Link>
        );
      })}
      <Link className="hidden md:block" to="/">
        <Image
          className="object-fit w-16 rounded-full px-2  md:w-auto md:px-6"
          alt="products"
          src={Logo}
          sizes="128px"
        />
      </Link>
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return <a href="#search-aside">Search</a>;
}

const FALLBACK_HEADER_MENU = {
  id: "gid://shopify/Menu/199655587896",
  items: [
    {
      id: "gid://shopify/MenuItem/461609500728",
      resourceId: null,
      tags: [],
      title: "Home",
      type: "HTTP",
      url: "/",
      items: [],
    },
    {
      id: "gid://shopify/MenuItem/461609533496",
      resourceId: null,
      tags: [],
      title: "Blog",
      type: "HTTP",
      url: "/blogs",
      items: [],
    },
    {
      id: "gid://shopify/MenuItem/461609566264",
      resourceId: null,
      tags: [],
      title: "Contact",
      type: "HTTP",
      url: "/contact",
      items: [],
    },
    {
      id: "gid://shopify/MenuItem/461609599032",
      resourceId: "gid://shopify/Page/92591030328",
      tags: [],
      title: "Shop",
      type: "PAGE",
      url: "/collections",
      items: [],
    },
    {
      id: "gid://shopify/MenuItem/461609599032",
      resourceId: "gid://shopify/Page/92591030328",
      tags: [],
      title: "About us",
      type: "PAGE",
      url: "/pages/our-story",
      items: [],
    },
  ],
};
