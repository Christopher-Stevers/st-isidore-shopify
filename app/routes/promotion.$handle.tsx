import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  type FetcherWithComponents,
  type MetaFunction,
} from '@remix-run/react';
import {useEffect, useRef, useState} from 'react';
import {CartForm} from '@shopify/hydrogen';
import HeroButton from '~/components/base/FancyButton';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `St Isidore Ranch`}];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const handle = params.handle;

  if (!handle) {
    return redirect('/');
  }

  return json({params, context});
}

export default function Promotion() {
  const [isSubscribed, setIsSubscribed] = useState(true);
  const {params} = useLoaderData<typeof loader>();

  //only set open first time, use local storage to track if user has subscribed
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const hasSubscribed = localStorage.getItem('subscribed') === 'true';
    if (!hasSubscribed) {
      setIsSubscribed(true);
    }
  }, []);

  const handleSubscribe = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (!formRef.current) return;
    try {
      // Perform your form submission logic here, for example using fetch or an API call
      const response = await fetch('/email', {
        method: 'POST',
        body: new FormData(formRef.current),
      });

      if (response.ok && formRef.current) {
        console.log('success');
        // Handle successful submission
        formRef.current.reset();
        localStorage.setItem('subscribed', 'true');
        setIsSubscribed(true);

        // Redirect back to the current page
      } else {
        // Handle submission errors
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }

    window.location.href = window.location.href.split('#')[0] + '#cart-aside';
  };
  return (
    <div className="flex flex-col gap-12 mx-auto max-w-[800px]  text-xl">
      {isSubscribed ? (
        <div className="flex flex-col content-center items-center gap-6 text-center w-full">
          <h1 className="font-display text-4xl w-full ">
            Thanks For Subscribing!
          </h1>
          <p>Want to learn how and why we ranch?</p>
          <HeroButton
            className="flex items-center justify-center font-sans font-bold min-w-[200px] justify-self-center bg-primary-700 text-white md:row-start-3 md:justify-self-end h-12 w-16 text-2xl md:h-16"
            text="Store"
            link="/blogs/news/grass-the-missing-piece"
          />

          <p>Or make the most of your order in our store</p>

          <HeroButton
            className="flex items-center justify-center font-sans font-bold min-w-[200px] justify-self-center bg-primary-700 text-white md:row-start-3 md:justify-self-end h-12 w-16 text-2xl md:h-16"
            text="Blog"
            link="/shop"
          />
          <p>Questions about shipping?</p>
          <HeroButton
            className="flex items-center justify-center font-sans font-bold min-w-[200px] justify-self-center bg-primary-700 text-white md:row-start-3 md:justify-self-end h-12 w-16 text-2xl md:h-16"
            text="Delivery"
            link="/blogs/news/how-we-deliver-your-meat"
          />
        </div>
      ) : (
        <div className="px-8 flex flex-col gap-4">
          <h1 className="font-display text-4xl w-full ">
            Welcome to St. Isidore Ranch
          </h1>
          <p>
            Do you want beef raised on grass, the way nature intended it?
            Disappointed by Canadian grocery stores? Are you looking for an
            Ontario rancher you can rely on?
          </p>

          <p>
            I{"'"}m Chris Stevers, and I{"'"}d like to deliver my ranch{"'"}s
            100% grass-fed and grass-finished beef to your door.
          </p>
          <p>
            Ready to get started? Subscribe to our newsletter to get 2 free
            packs of our premium ground beef plus exclusive sales and stories
            from the ranch.
          </p>
          <p className="text-lg"></p>
          <form
            ref={formRef}
            method="post"
            action="/email"
            id="subscribe-form-footer"
            className="flex flex-col space-y-4"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              placeholder="Email address"
              name="email"
              id="email"
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Name"
              name={params.handle}
              id="name"
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Source of email"
              name={params.handle}
              id="emailSource"
              className="p-2 border border-gray-300 rounded hidden"
            />
          </form>
          <CartForm
            route="/cart"
            inputs={{
              lines: [
                {
                  merchandiseId: 'gid://shopify/ProductVariant/43831597137973',
                  quantity: 2,
                },
              ],
            }}
            action={CartForm.ACTIONS.LinesAdd}
          >
            {(fetcher: FetcherWithComponents<any>) => (
              <>
                <input
                  name="analytics"
                  type="hidden"
                  value={JSON.stringify({
                    action: 'add',
                    label: '2lb Ground Beef',
                  })}
                />
                <button
                  className="bg-primary-500 py-2 px-4 text-center font-semibold leading-loose w-full text-white rounded-md"
                  type="submit"
                  disabled={fetcher.state !== 'idle'}
                  onClick={() => {
                    handleSubscribe();
                    window.location.href = window.location.href + '#cart-aside';
                  }}
                >
                  Get Your Beef!
                </button>
              </>
            )}
          </CartForm>
        </div>
      )}

      <div className="flex flex-col gap-6 px-8">
        <h2 className="font-display text-4xl center">
          What our customers are saying
        </h2>
        <div className="flex flex-col gap-8">
          <p>
            "The beef was excellent. Has more taste than any beef I've tried in
            the last 20 years at least."
            <span className="font-bold">- Brendan</span>
          </p>

          <p>
            The kids love your ground beef!
            <span className="font-bold">- Dawn</span>
          </p>
        </div>
      </div>
    </div>
  );
}
