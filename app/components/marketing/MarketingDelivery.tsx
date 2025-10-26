import type {MarketingConfig} from '~/lib/marketingConfig';

interface MarketingDeliveryProps {
  readonly offer: any;
  readonly config: MarketingConfig['delivery'];
}

export function MarketingDelivery({offer, config}: MarketingDeliveryProps) {
  return (
    <section className="w-full px-4 py-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">{'🚚'}</span>
            </div>
            <h2 className="text-3xl font-display">
              {config?.title || 'Pickup & Delivery'}
            </h2>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {config?.content || offer.pickupDelivery}
          </p>
        </div>
      </div>
    </section>
  );
}
