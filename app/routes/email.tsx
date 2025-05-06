import EmailGrabber from '~/Marketing/EmailGrabber';

import {type ActionFunctionArgs} from '@remix-run/node'; // or cloudflare/deno
import createDripSubscriber from '~/lib/email';

// Note the "action" export name, this will handle our form POST
export const action = async ({request, context}: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const result = await createDripSubscriber({
      apiKey: context.env.DRIP_API_KEY as string,
      accountId: context.env.DRIP_ACCOUNT_ID as string,
      email,
      firstName: name,
      tag: '5 lbs of ground beef',
    });

    return {redirect: '/', status: 303};
    // throw new Error('test error');
    // return redirect(request.url, {status: 303});
  } catch (error) {
    return {error: true, status: 500};
  }
};

export default EmailGrabber;
