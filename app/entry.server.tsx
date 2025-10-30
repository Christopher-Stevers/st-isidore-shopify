import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';
import type {EntryContext} from 'react-router';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },

    connectSrc: ["'self'", "https://api.emailjs.com", "https://fonts.googleapis.com"],
    
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }
  

  responseHeaders.set('Content-Type', 'text/html');
  // Extend CSP to explicitly allow Google Fonts CSS and font files, and ensure nonce-based scripts/styles work
  const addOrAppend = (csp: string, directive: string, value: string) => {
    const re = new RegExp(`(^|;\\s*)${directive}([^;]*)`);
    if (re.test(csp)) {
      return csp.replace(re, (_m, p1, p2) => `${p1}${directive}${p2} ${value}`);
    }
    return `${csp}; ${directive} ${value}`;
  };

  let csp = header;
  const nonceToken = `'nonce-${nonce}'`;
  // Scripts
  csp = addOrAppend(csp, 'script-src', `'self' ${nonceToken} https://cdn.shopify.com https://shopify.com http://localhost:*`);
  csp = addOrAppend(csp, 'script-src-elem', `'self' ${nonceToken} https://cdn.shopify.com https://shopify.com http://localhost:*`);
  // Styles
  csp = addOrAppend(csp, 'style-src', `'self' 'unsafe-inline' https://cdn.shopify.com https://fonts.googleapis.com http://localhost:*`);
  csp = addOrAppend(csp, 'style-src-elem', `'self' 'unsafe-inline' https://cdn.shopify.com https://fonts.googleapis.com http://localhost:*`);
  // Fonts
  csp = addOrAppend(csp, 'font-src', `'self' https://fonts.gstatic.com data:`);

  responseHeaders.set('Content-Security-Policy', csp);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
