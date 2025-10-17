import {Link, Await} from 'react-router';
import {Suspense} from 'react';
import type {FooterQuery} from 'storefrontapi.generated';
import {useRootLoaderData} from '~/root';

export function Footer() {
  const {footer} = useRootLoaderData();

  return (
    <footer className="footer">
      <Suspense fallback={<FooterFallback />}>
        <Await resolve={footer}>
          {(footerData) => {
            if (!footerData?.menu) return <FooterFallback />;
            return <FooterMenu menu={footerData.menu} />;
          }}
        </Await>
      </Suspense>
    </footer>
  );
}

function FooterFallback() {
  return (
    <nav className="footer-menu" role="navigation">
      {FALLBACK_FOOTER_MENU.items.map((item) => {
        const isExternal = !item.url.startsWith('/');
        return isExternal ? (
          <a
            href={item.url}
            key={item.id}
            rel="noopener noreferrer"
            target="_blank"
          >
            {item.title}
          </a>
        ) : (
          <Link key={item.id} prefetch="intent" to={item.url}>
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

function FooterMenu({menu}: Readonly<{menu: FooterQuery['menu']}>) {
  const {publicStoreDomain} = useRootLoaderData();

  if (!menu?.items) return <FooterFallback />;

  return (
    <nav className="footer-menu" role="navigation">
      {menu.items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <Link key={item.id} prefetch="intent" to={url}>
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};
