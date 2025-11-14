import {Image} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import { useAside } from '../Aside';

interface OfferHeroProps {
  offer: {
    title: string;
    description: string;
    featuredImage?: {
      url: string;
      altText?: string;
      width?: number;
      height?: number;
    };
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    variants: {
      nodes: Array<{
        id: string;
        title: string;
        availableForSale: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        } | null;
      }>;
    };
    campaignName?: string;
    startDate?: string;
    endDate?: string;
  };
}

export function OfferHero({offer}: Readonly<OfferHeroProps>) {
  const price = Number.parseFloat(offer.priceRange.minVariantPrice.amount);
  const compareAtPrice = offer.variants.nodes[0]?.compareAtPrice
    ? Number.parseFloat(offer.variants.nodes[0].compareAtPrice.amount)
    : null;
  const savings = compareAtPrice ? compareAtPrice - price : null;
  const savingsPercent = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;
  const { open } = useAside();
  // Format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="offer-hero bg-gradient-to-br from-primary-50 to-primary-100 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="order-2 lg:order-1">
            {offer.featuredImage && (
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    data={offer.featuredImage}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="w-full h-auto"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-300 rounded-full opacity-10"></div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Campaign Badge */}
            {offer.campaignName && (
              <div className="inline-block">
                <span className="bg-primary-700 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                  {offer.campaignName}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {offer.title}
            </h1>

            {/* Description */}
            {offer.description && (
              <div className="text-xl text-gray-800 leading-relaxed">
                <div dangerouslySetInnerHTML={{__html: offer.description}} />
              </div>
            )}

            {/* Price Section */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold text-primary-600">
                  ${price.toFixed(2)}
                </span>
                {compareAtPrice && (
                  <span className="text-3xl text-gray-500 line-through">
                    ${compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {savings && savingsPercent && (
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-lg font-bold">
                    Save ${savings.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-lg font-bold">
                    {savingsPercent}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Offer Timeline */}
            {(offer.startDate || offer.endDate) && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border-2 border-primary-200 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-900 font-semibold">
                    {(() => {
                      if (offer.startDate && offer.endDate) {
                        return (
                          <>
                            Offer valid from {formatDate(offer.startDate)} to{' '}
                            {formatDate(offer.endDate)}
                          </>
                        );
                      }
                      if (offer.endDate) {
                        return <>Offer ends {formatDate(offer.endDate)}</>;
                      }
                      return <>Offer starts {formatDate(offer.startDate)}</>;
                    })()}
                  </p>
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="pt-6 cursor-pointer">
              {offer.variants.nodes[0] && (
                <AddToCartButton
                onClick={() => {
                  open('cart');
                }}
                  lines={[
                    {
                      merchandiseId: offer.variants.nodes[0].id,
                      quantity: 1,
                      selectedVariant: offer.variants.nodes[0],
                    },
                  ]}
                  disabled={!offer.variants.nodes[0].availableForSale}
                  className="w-full lg:w-auto bg-primary-700 hover:bg-primary-700 text-white font-bold py-6 px-12 rounded-xl text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  {offer.variants.nodes[0].availableForSale
                    ? 'Add to Cart - Special Offer!'
                    : 'Out of Stock'}
                </AddToCartButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
