import Claims from '~/components/SharedMarketing/Claims';
import Testimonials from '~/components/SharedMarketing/Testimonials';
import FAQ from '~/components/SharedMarketing/FAQ';

interface OfferDetailsProps {
  offer: {
    title: string;
    targetAudience?: string;
    highlights?: string;
    variants: {
      nodes: Array<{
        id: string;
        title: string;
        availableForSale: boolean;
      }>;
    };
  };
}

export function OfferDetails({offer}: Readonly<OfferDetailsProps>) {
  // Parse highlights if it's a JSON string or comma-separated list
  const parseHighlights = (highlights?: string): string[] => {
    if (!highlights) return [];

    try {
      // Try parsing as JSON array
      const parsed = JSON.parse(highlights);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item): item is string => typeof item === 'string',
        );
      }
    } catch {
      // Fall back to splitting by comma or newline
      return highlights
        .split(/[,\n]/)
        .map((h) => h.trim())
        .filter((h) => h.length > 0);
    }

    return [];
  };

  const highlightsList = parseHighlights(offer.highlights);

  return (
    <div className="offer-details bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Target Audience */}
          {offer.targetAudience && (
            <section className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Perfect For
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-gray-700 leading-relaxed">
                  {offer.targetAudience}
                </p>
              </div>
            </section>
          )}

          {/* Highlights */}
          {highlightsList.length > 0 && (
            <section>
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                What's Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {highlightsList.map((highlight, index) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-4 p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-lg text-gray-900 font-semibold">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Variants/Options */}
          {offer.variants.nodes.length > 1 && (
            <section>
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                Available Options
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offer.variants.nodes.map((variant) => (
                  <div
                    key={variant.id}
                    className={`p-6 border-2 rounded-xl shadow-lg transition-all duration-300 ${
                      variant.availableForSale
                        ? 'border-primary-300 bg-white hover:shadow-xl'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <p className="font-bold text-lg text-gray-900 mb-2">
                      {variant.title}
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        variant.availableForSale
                          ? 'text-green-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {variant.availableForSale
                        ? '✅ In Stock'
                        : '❌ Out of Stock'}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Claims Section */}
          <section>
            <Claims />
          </section>

          {/* Testimonials Section */}
          <section>
            <Testimonials />
          </section>

          {/* FAQ Section */}
          <section>
            <FAQ />
          </section>
        </div>
      </div>
    </div>
  );
}
