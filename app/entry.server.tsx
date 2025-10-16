import type {EntryContext} from 'react-router';
import {ServerRouter} from 'react-router';
import isbot from 'isbot';
import {renderToString} from 'react-dom/server';
import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy();

  const body = renderToString(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
