import type {MarketingConfig} from '~/lib/marketingConfig';
import {getIcon} from '../offer/OfferHowItWorks';
interface MarketingHowItWorksProps {
  readonly config: MarketingConfig['howItWorks'];
}

export function MarketingHowItWorks({config}: MarketingHowItWorksProps) {
  const steps = config?.steps || [
    {
      icon: 'shopping-cart',
      title: 'Order Your Box',
      description: 'Select your beef sampler and complete your purchase.',
    },
    {
      icon: 'truck',
      title: 'We Prepare & Ship',
      description:
        'We carefully package your fresh beef and ship it to your door',
    },
    {
      icon: 'smile',
      title: 'Enjoy Premium Beef',
      description: 'Receive your order and enjoy the finest grass-fed beef',
    },
  ];

  return (
    <section className="w-full px-4 py-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-display text-center mb-12">
          {config?.title || 'How It Works'}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center">
          {steps.map((step, index) => (
            <div
              key={`step-${step.title}-${index}`}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">{getIcon(step.icon)}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
