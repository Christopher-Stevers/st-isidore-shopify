import {Image} from '@shopify/hydrogen';
import type {MarketingConfig} from '~/lib/marketingConfig';
import {AddToCartButton} from '~/components/AddToCartButton';
import { useAside } from '../Aside';

interface MarketingHeroProps {
  readonly offer: any;
  readonly config: MarketingConfig['hero'];
}

export function MarketingHero({offer, config}: MarketingHeroProps) {
  const { open } = useAside();
  const price = Number.parseFloat(offer.priceRange.minVariantPrice.amount);
  const compareAtPrice = offer.variants.nodes[0]?.compareAtPrice
    ? Number.parseFloat(offer.variants.nodes[0].compareAtPrice.amount)
    : null;
  const savings = compareAtPrice ? compareAtPrice - price : null;
  const savingsPercent = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;

  return (
    <section className="w-full px-4 py-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
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
            <h1 className="text-4xl md:text-5xl font-display leading-tight">
              {config?.title || offer.title}
            </h1>

            <p className="text-xl text-gray-700 leading-relaxed">
              {config?.subtitle || offer.heroCopy}
            </p>

            {/* Bullet Row */}
            <div className="flex flex-wrap gap-4 text-sm">
              {(
                config?.bullets || [
                  'Grass-Finished',
                  'Local',
                  'Perfect Family Portions',
                ]
              ).map((bullet, index) => (
                <span
                  key={`bullet-${bullet}-${index}`}
                  className="flex items-center gap-2"
                >
                  <span className="text-green-600">✅</span>
                  {bullet}
                </span>
              ))}
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
            {offer.variants?.nodes?.[0]?.id ? (
              <AddToCartButton onClick={() => {
                open('cart');
              }}
                lines={[
                  {
                    merchandiseId: offer.variants.nodes[0].id,
                    quantity: 1,
                    selectedVariant: offer.variants.nodes[0],
                  },
                ]}
                className="inline-block cursor-pointer bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-neutral-800 transition-colors duration-200"
           
              >
                {config?.ctaText || 'Get yours →'}
              </AddToCartButton>
            ) : (
              <a
                href={config?.ctaUrl || `/products/${offer.handle}`}
                className="inline-block bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-neutral-800 transition-colors duration-200"
              >
                {config?.ctaText || 'Get yours →'}
              </a>
            )}

            {/* Sub-text */}
            <p className="text-sm text-gray-600">{offer.pickupDelivery}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
