import FAQ from '../FAQ';
import FarmToTableSection from './FarmToTableSection';
import Testimonials from '../Testimonials';
import BuyBoxCTA from '~/components/ProductPage/BuyBoxFolder/BuyBoxCTA';
import {useLoaderData} from '@remix-run/react';
import {loader} from '~/routes/pages.giveaway-thank-you';
import {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import React from 'react';

// SVG components for better readability and reuse
const ArrowIcon = () => (
  <svg
    viewBox="0 0 14 10"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className="inline-block w-3.5 h-2.5 ml-1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
      fill="currentColor"
    ></path>
  </svg>
);

const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 18 16"
  >
    <path
      d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z"
      fill="currentColor"
    ></path>
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 18 17"
  >
    <path
      d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
      fill="currentColor"
    ></path>
  </svg>
);

const PlusIcon = () => (
  <svg width="16px" height="16px" viewBox="0 0 12 12">
    <path
      fill="currentColor"
      d="M11.1 4.7H7.3V.9c0-.5-.4-.9-.9-.9h-.8c-.5 0-.9.4-.9.9v3.9H.9c-.5-.1-.9.3-.9.8v.9c0 .5.4.9.9.9h3.9v3.9c0 .5.4.9.9.9h.9c.5 0 .9-.4.9-.9v-4h3.9c.5 0 .9-.4.9-.9v-.8c-.3-.5-.7-.9-1.2-.9z"
    />
  </svg>
);

const MinusIcon = () => (
  <svg width="16px" height="16px" viewBox="0 0 12 12">
    <path
      fill="currentColor"
      d="M11.14 4.8H.86c-.48 0-.86.36-.86.8v.8c0 .44.38.8.86.8h10.28c.48 0 .86-.36.86-.8v-.8c0-.44-.38-.8-.86-.8z"
    />
  </svg>
);

const ThankYou = () => {
  const [activeTab, setActiveTab] = React.useState('description');
  const loaderData = useLoaderData<typeof loader>();
  const firstProduct = loaderData.firstProduct;
  const placeholderImg =
    'https://cdn.shopify.com/s/files/1/0626/1991/0197/files/IMG_20240729_162846.png?v=1746534671';

  return (
    <body className="bg-white font-sans text-gray-800">
      <main>
        {/* Hero Section */}
        <section className="text-center py-12 px-4 bg-gray-50">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            🌟 Congratulations on entry! 🌟
          </h2>
          <h3 className="mt-2 text-2xl font-semibold text-gray-800">
            The draw is on Nov 1st 2025
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            I’m Chris, my family and I raise premium beef right here in Ontario.
          </p>
          <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-600">
            Glad you’re here! As a welcome, we have a special offer for you
          </p>
          <p className="mt-4 text-xl font-medium text-gray-700">
            <span className="text-green-600">💲25 off</span> -{' '}
            <span className="text-yellow-600">🎁 Free beef burgers</span> -{' '}
            <span className="text-blue-600">🚚 Free Fast Delivery</span>
          </p>
        </section>

        {/* Main Product Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              {/* Image gallery */}
              <div>
                <img
                  src={placeholderImg}
                  alt="Beef bundle"
                  className="w-full h-full object-center object-cover rounded-lg shadow-lg"
                />
                <div className="mt-4 grid grid-cols-5 gap-4">
                  {/* Thumbnails would be mapped here */}
                  <img
                    src={placeholderImg}
                    alt="thumbnail"
                    className="rounded-lg cursor-pointer border-2 border-transparent hover:border-indigo-500"
                  />
                  <img
                    src={placeholderImg}
                    alt="thumbnail"
                    className="rounded-lg cursor-pointer border-2 border-transparent hover:border-indigo-500"
                  />
                  <img
                    src={placeholderImg}
                    alt="thumbnail"
                    className="rounded-lg cursor-pointer border-2 border-transparent hover:border-indigo-500"
                  />
                  <img
                    src={placeholderImg}
                    alt="thumbnail"
                    className="rounded-lg cursor-pointer border-2 border-transparent hover:border-indigo-500"
                  />
                  <img
                    src={placeholderImg}
                    alt="thumbnail"
                    className="rounded-lg cursor-pointer border-2 border-transparent hover:border-indigo-500"
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Everyday Steak Welcome Bundle
                </h1>
                <div className="mt-3">
                  <p className="text-3xl text-gray-900">
                    $225.00{' '}
                    <span className="ml-4 line-through text-gray-500">
                      $250.00
                    </span>
                  </p>
                </div>

                {/* Tabs */}
                <div className="mt-8">
                  {/* Tab Navigation */}
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                      <button
                        onClick={() => setActiveTab('description')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'description'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        Description
                      </button>
                      <button
                        onClick={() => setActiveTab('shipping')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'shipping'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        Shipping
                      </button>
                      <button
                        onClick={() => setActiveTab('guarantee')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'guarantee'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        Our Guarantee
                      </button>
                    </nav>
                  </div>

                  {/* Tab Panels */}
                  <div className="mt-6 space-y-6 text-base text-gray-700">
                    {activeTab === 'description' && (
                      <div>
                        <p>
                          ✅ Know &amp; Trust Your Farmer – Raised with care by
                          Chris
                        </p>
                        <p>
                          ✅ Skip the Wait – Delivers to your door within two
                          weeks.
                        </p>
                        <p>
                          ✅ A Warm Welcome Gift – Free ground beef and $25 Off
                          for first-time customers
                        </p>
                        <p className="mt-4">
                          Steaks for everyday - pan steaks, stirfry and kebab.
                          <br />
                          <br />I can't guarantee the individual weights of the
                          cuts, however overall weight should be the same.
                          <br />
                        </p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <ul>
                          <li>
                            <strong>
                              6 Sirloin Steak @ ~16 oz. each (6 lb total)&nbsp;
                            </strong>
                          </li>
                          <li>
                            <strong>
                              6 Round Steak @ ~12 oz. each (4.5 lb total)&nbsp;
                            </strong>
                          </li>
                          <li>
                            <strong>
                              6 Sirloin Tip Steak @ ~12 oz. each (4.5 lb total)
                            </strong>
                            <p dir="ltr">
                              <span id="docs-internal-guid-1c3f59a2-7fff-0c85-26a0-df6c821d0648"></span>
                            </p>
                            <p dir="ltr">
                              <span id="docs-internal-guid-1c3f59a2-7fff-0c85-26a0-df6c821d0648"></span>
                            </p>
                          </li>
                        </ul>
                        <span className="font-bold">
                          2 Free 1lb Ground Beef packs
                        </span>
                      </div>
                    )}

                    {activeTab === 'shipping' && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Shipping Information
                        </h3>
                        <p>
                          🚚 <strong>Free Fast Delivery</strong> - Your order
                          ships within 2 weeks
                        </p>
                        <p>
                          📦 <strong>Frozen Shipping</strong> - Your beef
                          arrives frozen and ready to store
                        </p>
                        <p>
                          🏠 <strong>Door-to-Door</strong> - Direct delivery to
                          your home
                        </p>
                        <p>
                          ❄️ <strong>Temperature Controlled</strong> -
                          Maintained at optimal freezing temperature
                        </p>
                        <p className="mt-4">
                          <strong>Shipping Areas:</strong> Ontario, Quebec, and
                          select areas in Eastern Canada
                        </p>
                      </div>
                    )}

                    {activeTab === 'guarantee' && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Our Guarantee
                        </h3>
                        <p>
                          💯 <strong>100% Money Back Guarantee</strong> - If
                          you're not completely satisfied, we'll refund your
                          order
                        </p>
                        <p>
                          🥩 <strong>Quality Promise</strong> - Premium beef
                          raised with care and attention
                        </p>
                        <p>
                          👨‍🌾 <strong>Farmer Direct</strong> - Know exactly where
                          your beef comes from
                        </p>
                        <p>
                          📞 <strong>Customer Support</strong> - Direct line to
                          Chris for any questions or concerns
                        </p>
                        <p className="mt-4">
                          <strong>Contact:</strong> Reach out anytime with
                          questions about your order or our beef to Chris at{' '}
                          <a
                            href="tel:+15197036780"
                            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                          >
                            📞 519-703-6780
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10">
                  {firstProduct?.selectedVariant && (
                    <BuyBoxCTA
                      cta="Claim My Welcome Bundle Now 👉"
                      selectedVariant={
                        firstProduct?.selectedVariant as ProductVariant
                      }
                    />
                  )}

                  <p className="text-center mt-4 text-sm text-gray-500">
                    100% Money Back Guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FarmToTableSection
          placeholderImg={
            'https://cdn.shopify.com/s/files/1/0626/1991/0197/files/photo_2025-06-05_11-22-26.jpg?v=1749137134&width=800&height=800&crop=center'
          }
        />

        <Testimonials />

        {/* FAQ Section */}
        <FAQ />
      </main>
    </body>
  );
};

export default ThankYou;
