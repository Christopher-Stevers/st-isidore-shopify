// Virtual entry point for the app
import {storefrontRedirect} from '@shopify/hydrogen';
import {createRequestHandler} from '@react-router/node';
import {createHydrogenRouterContext} from '~/lib/context';

/**
 * Export a fetch handler in module format.
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    console.log('Server fetch called with env:', env);
    console.log('Creating Hydrogen context...');

    const hydrogenContext = await createHydrogenRouterContext(
      request,
      env,
      executionContext,
    );

    console.log('Hydrogen context created:', hydrogenContext);
    console.log('Hydrogen context keys:', Object.keys(hydrogenContext || {}));

    const handleRequest = createRequestHandler({
      build: await import('virtual:react-router/server-build'),
      mode: process.env.NODE_ENV,
      getLoadContext: () => {
        console.log('getLoadContext called, returning:', hydrogenContext);
        return hydrogenContext;
      },
    });

    const response = await handleRequest(request);

    if (hydrogenContext.session.isPending) {
      response.headers.set(
        'Set-Cookie',
        await hydrogenContext.session.commit(),
      );
    }

    if (response.status === 404) {
      /**
       * Check for redirects only when there's a 404 from the app.
       * If the redirect doesn't exist, then `storefrontRedirect`
       * will pass through the 404 response.
       */
      return storefrontRedirect({
        request,
        response,
        storefront: hydrogenContext.storefront,
      });
    }

    return response;
  },
};
