import FAQ from '../FAQ';
import FarmToTableSection from './FarmToTableSection';
import Testimonials from '../Testimonials';
import BuyBoxCTA from '~/components/ProductPage/BuyBoxFolder/BuyBoxCTA';
import {useLoaderData} from '@remix-run/react';
import type {loader} from '~/routes/pages.giveaway-thank-you';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import React from 'react';
import BuyBoxImages from '~/components/ProductPage/BuyBoxFolder/BuyBoxImages';
// SVG components for better readability and reuse

const ThankYou = () => {
  const [activeTab, setActiveTab] = React.useState('description');
  const loaderData = useLoaderData<typeof loader>();
  const firstProduct = loaderData.firstProduct;

  return (
    <body className="bg-white font-sans text-gray-800">
      <main>
        {/* Hero Section */}
        <section className="text-center py-12 px-4 bg-gray-50">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            🌟Congratulations on your entry! 🌟
          </h2>
          <h3 className="mt-2 text-2xl font-semibold text-gray-800">
            The draw is on October 31st 2025
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
              <BuyBoxImages className="flex-1 order-2" product={firstProduct} />
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
                          <br />I can&apos;t guarantee the individual weights of
                          the cuts, however overall weight should be the same.
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
                          you&apos;re not completely satisfied, we&apos;ll
                          refund your order
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
