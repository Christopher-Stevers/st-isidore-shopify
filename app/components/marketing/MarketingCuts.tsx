import {Image} from '@shopify/hydrogen';
import type {MarketingConfig} from '~/lib/marketingConfig';

interface MarketingCutsProps {
  readonly offer: any;
  readonly config: MarketingConfig['cuts'];
}

export function MarketingCuts({offer, config}: MarketingCutsProps) {
  const cuts = config?.items || offer.cuts || [];
  const showImages = config?.showImages !== false;

  return (
    <section className="w-full px-4 py-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-display text-center mb-12">
          {config?.title || "What's Inside Your Box"}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Cuts List */}
          <div className="space-y-4">
            {cuts.map((cut: string, index: number) => (
              <div
                key={`cut-${cut.slice(0, 10)}-${index}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
              >
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold text-sm">
                    {index + 1}
                  </span>
                </div>
                <span className="text-lg font-medium">{cut}</span>
              </div>
            ))}
          </div>

          {/* Right: Image Grid */}
          {showImages && (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={`image-${i}`}
                  className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden"
                >
                  {(() => {
                    if (offer.images?.nodes?.[i - 1]) {
                      return (
                        <Image
                          data={offer.images.nodes[i - 1]}
                          sizes="(min-width: 768px) 25vw, 50vw"
                          className="w-full h-full object-cover"
                        />
                      );
                    }
                    if (offer.featuredImage && i === 1) {
                      return (
                        <Image
                          data={offer.featuredImage}
                          sizes="(min-width: 768px) 25vw, 50vw"
                          className="w-full h-full object-cover"
                        />
                      );
                    }
                    return (
                      <span className="text-gray-500 text-sm">
                        Beef Cut {i}
                      </span>
                    );
                  })()}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
