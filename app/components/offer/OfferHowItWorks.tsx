import {ShoppingCart, Truck, Smile, Package} from 'lucide-react';

interface OfferHowItWorksProps {
  title?: string;
  steps?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

const dynamicIcons = {
  'shopping-cart': <ShoppingCart className="w-12 h-12 text-red-600 mb-4" />,
  truck: <Truck className="w-12 h-12 text-red-600 mb-4" />,
  smile: <Smile className="w-12 h-12 text-red-600 mb-4" />,
  package: <Package className="w-12 h-12 text-red-600 mb-4" />,
};

export const getIcon = (icon: string) => {
  if (icon in dynamicIcons) {
    return dynamicIcons[icon as keyof typeof dynamicIcons];
  }
  return <Package className="w-12 h-12 text-red-600 mb-4" />;
};

export function OfferHowItWorks({
  title = 'How It Works',
  steps = [
    {
      icon: 'shopping-cart',
      title: 'Order Your Box',
      description: 'Choose your beef sampler and place your order online',
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
  ],
}: OfferHowItWorksProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        {title}
      </h2>
      <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center">
        {steps.map((step, index) => (
          <div
            key={`step-${step.title}-${index}`}
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg"
          >
            {getIcon(step.icon)}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
