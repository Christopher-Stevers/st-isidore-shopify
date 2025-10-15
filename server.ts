// @ts-ignore
// Virtual entry point for the app
import * as remixBuild from 'virtual:react-router/server-build';
import {storefrontRedirect} from '@shopify/hydrogen';
import {createRequestHandler} from '@shopify/hydrogen/oxygen';
import {createHydrogenRouterContext} from '~/lib/context';

/**
 * Export a fetch handler in module format.
 */
export default {
  async fetch(request: Request, env: Env, executionContext: ExecutionContext): Promise<Response> {
    const hydrogenContext = await createHydrogenRouterContext(
      request,
      env,
      executionContext,
    );

    const handleRequest = createRequestHandler({
      build: await import('virtual:react-router/server-build'),
      mode: process.env.NODE_ENV,
      getLoadContext: () => hydrogenContext,
    });

    const response = await handleRequest(request);

    if (hydrogenContext.session.isPending) {
      response.headers.set('Set-Cookie', await hydrogenContext.session.commit());
    }

    if (response.status === 404) {
      /**
       * Check for redirects only when there's a 404 from the app.
       * If the redirect doesn't exist, then `storefrontRedirect`
       * will pass through the 404 response.
       */
      return storefrontRedirect({request, response, storefront: hydrogenContext.storefront});
    }

    return response;
  }
};
