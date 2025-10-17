import {
  type LoaderFunctionArgs,
  type MetaFunction,
  useLoaderData,
  Link,
} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {OFFER_QUERY} from '~/lib/offerQuery';
import {NewsletterSignup} from '~/components/offer/NewsletterSignup';
import {OfferCuts} from '~/components/offer/OfferCuts';
import {OfferHowItWorks} from '~/components/offer/OfferHowItWorks';
import OurStory from '~/components/SharedMarketing/OurStory';
import Testimonials from '~/components/SharedMarketing/Testimonials';

export const meta: MetaFunction<typeof loader> = ({matches}) => {
  const data = matches.find((match) => match.id === 'routes/offers.$handle')
    ?.data as Awaited<ReturnType<typeof loader>> | undefined;

  const offer = data?.offer;
  const title = offer?.title
    ? `${offer.title} - St. Isidore Ranch`
    : 'Special Offer - St. Isidore Ranch';
  const description =
    offer?.heroCopy ||
    offer?.description ||
    'Premium grass-fed beef from St. Isidore Ranch. Local, sustainable, and perfect for your family.';

  return [
    {title},
    {name: 'description', content: description},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:type', content: 'product'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Response('Not found', {status: 404});
  }

  // Query Shopify for the product with offer metafields
  const {product} = await storefront.query(OFFER_QUERY, {
    variables: {
      handle,
    },
  });
  if (!product) {
    throw new Response('Offer not found', {status: 404});
  }

  // Extract offer metafield
  const offerMetafield = product.metafields?.find(
    (m: any) => m?.namespace === 'farmrebel' && m?.key === 'offer',
  );
  let offerJson = null;

  if (offerMetafield?.value) {
    try {
      offerJson = JSON.parse(offerMetafield.value);
    } catch (e) {
      console.warn('Failed to parse offer metafield:', e);
    }
  }

  // Debug: Log the offer JSON to console
  if (globalThis.window !== undefined) {
    console.log('Offer JSON:', offerJson);
  }

  // Extract offer data from metafields with fallbacks
  const offerData = {
    handle: product.handle,
    title: product.title,
    description: product.description,
    featuredImage: product.featuredImage,
    priceRange: product.priceRange,
    variants: product.variants,
    images: product.images,
    // Offer data
    heroCopy:
      (offerJson as any)?.heroCopy ||
      '~15 lb local, grass-finished beef perfect for family meals',
    cuts: (offerJson as any)?.cuts || [
      '10 lbs Premium Ground Beef',
      '5 lbs Ribeye Steaks',
      '3 lbs Chuck Roast',
      '2 lbs Stew Meat',
    ],
    pickupDelivery:
      (offerJson as any)?.pickupDelivery ||
      'Ships or delivers weekly from Stratford to KW & Toronto',
    substitutionPolicy:
      (offerJson as any)?.substitutionPolicy ||
      "We guarantee the quality and freshness of every cut. If you're not completely satisfied, we'll make it right.",
    // Legacy metafields for backward compatibility
    offerType:
      product.metafields?.find((m: any) => m?.key === 'offer_type')?.value ||
      'tier1',
    campaignName:
      product.metafields?.find((m: any) => m?.key === 'campaign_name')?.value ||
      'Fall Family Special',
    startDate:
      product.metafields?.find((m: any) => m?.key === 'start_date')?.value ||
      '2025-10-15',
    endDate:
      product.metafields?.find((m: any) => m?.key === 'end_date')?.value ||
      '2025-11-30',
    targetAudience:
      product.metafields?.find((m: any) => m?.key === 'target_audience')
        ?.value ||
      'Perfect for families of 4-6 looking to stock their freezer with premium grass-fed beef for the fall season.',
    highlights:
      product.metafields?.find((m: any) => m?.key === 'highlights')?.value ||
      JSON.stringify([
        '10 lbs Premium Ground Beef',
        '5 lbs Ribeye Steaks',
        '3 lbs Chuck Roast',
        '2 lbs Stew Meat',
        'Free Shipping (valued at $50)',
        '100% Grass Fed & Grass Finished',
      ]),
  };

  return {offer: offerData};
}

export default function OfferPage() {
  const {offer} = useLoaderData<typeof loader>();

  const price = Number.parseFloat(offer.priceRange.minVariantPrice.amount);
  const compareAtPrice = offer.variants.nodes[0]?.compareAtPrice
    ? Number.parseFloat(offer.variants.nodes[0].compareAtPrice.amount)
    : null;
  const savings = compareAtPrice ? compareAtPrice - price : null;
  const savingsPercent = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-[#f9f7f3] text-[#1b1b1b]">
      {/* Section 1 - Hero */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image Left */}
          <div className="order-2 md:order-1">
            {offer.featuredImage && (
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  data={offer.featuredImage}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>

          {/* Content Right */}
          <div className="order-1 md:order-2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {offer.title}
            </h1>

            <p className="text-xl text-gray-700 leading-relaxed">
              {offer.heroCopy}
            </p>

            {/* Bullet Row */}
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                Grass-Finished
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                Local
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                Perfect Family Portions
              </span>
            </div>

            {/* Price Display */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-red-600">
                  ${price.toFixed(2)}
                </span>
                {compareAtPrice && (
                  <span className="text-2xl text-gray-500 line-through">
                    ${compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {savings && savingsPercent && (
                <p className="text-lg text-green-600 font-semibold">
                  Save ${savings.toFixed(2)} ({savingsPercent}% OFF)
                </p>
              )}
            </div>

            {/* CTA Button */}
            <Link
              to={`/products/${offer.handle}`}
              className="inline-block bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-neutral-800 transition-colors duration-200"
            >
              Reserve Your Box →
            </Link>

            {/* Sub-text */}
            <p className="text-sm text-gray-600">{offer.pickupDelivery}</p>
          </div>
        </div>
      </section>

      {/* Section 2 - What's Inside */}
      <OfferCuts cuts={offer.cuts} productImages={offer.images?.nodes} />

      {/* Section 3 - Pickup & Delivery */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚚</span>
            </div>
            <h2 className="text-3xl font-bold">Pickup & Delivery</h2>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {offer.pickupDelivery}
          </p>
        </div>
      </section>

      {/* Section 4 - Substitution & Guarantee */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Promise</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              {offer.substitutionPolicy}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-semibold">
              Satisfaction guaranteed — or we'll make it right.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 - How It Works */}
      <OfferHowItWorks />

      {/* Section 6 - Testimonials */}
      <Testimonials />

      {/* Section 7 - Our Story */}
      <OurStory />

      {/* Section 8 - Email Capture / Lead Form */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <NewsletterSignup />
      </section>
    </div>
  );
}
