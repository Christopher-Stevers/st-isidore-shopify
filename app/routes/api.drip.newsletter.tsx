import {type ActionFunctionArgs} from 'react-router';

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string;

  if (!email) {
    return new Response('Email is required', {status: 400});
  }

  // TODO: Integrate with actual email service (Drip, Mailchimp, etc.)
  console.log('Newsletter signup:', email);

  // Return success response
  return new Response(JSON.stringify({success: true}), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// This route doesn't render anything
export default function NewsletterAPI() {
  return null;
}
