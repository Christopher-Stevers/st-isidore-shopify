import type {MarketingConfig} from '~/lib/marketingConfig';

interface MarketingPromiseProps {
  readonly offer: any;
  readonly config: MarketingConfig['promise'];
}

export function MarketingPromise({offer, config}: MarketingPromiseProps) {
  return (
    <section className="w-full px-4 py-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-display mb-6 text-center">
          {config?.title || 'Our Promise'}
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            {config?.content || offer.substitutionPolicy}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-semibold">
            {config?.guarantee ||
              "Satisfaction guaranteed — or we'll make it right."}
          </p>
        </div>
      </div>
    </section>
  );
}
