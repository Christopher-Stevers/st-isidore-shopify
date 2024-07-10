import EmailGrabber from '~/Marketing/EmailGrabber';

import {type ActionFunctionArgs} from '@remix-run/node'; // or cloudflare/deno

// Note the "action" export name, this will handle our form POST
export const action = async ({request, context}: ActionFunctionArgs) => {
  try {
    const email = (await request.formData()).get('email');

    const response = await fetch(
      `https://us14.api.mailchimp.com/3.0/lists/${'1e39a5fddd'}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${'0fb570c64959ed90f05d3061d68a7daa-us14'}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      },
    );
    await response.json();

    return {redirect: '/', status: 303};
    // throw new Error('test error');
    // return redirect(request.url, {status: 303});
  } catch (error) {
    console.error('Error during form submission:', error);
    return {error: true, status: 500};
  }
};

export default EmailGrabber;
