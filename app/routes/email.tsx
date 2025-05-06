import EmailGrabber from '~/Marketing/EmailGrabber';

import {type ActionFunctionArgs} from '@remix-run/node'; // or cloudflare/deno

// Note the "action" export name, this will handle our form POST
export const action = async ({request, context}: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;

    const response = await fetch(
      `https://us14.api.mailchimp.com/3.0/lists/${'1e39a5fddd'}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${'6ec565744f5cf1ce45f8fc6870e1d9ce-us14'}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          name,
          status: 'subscribed',
        }),
      },
    );
    await response.json();

    return {redirect: '/', status: 303};
    // throw new Error('test error');
    // return redirect(request.url, {status: 303});
  } catch (error) {
    return {error: true, status: 500};
  }
};

export default EmailGrabber;
