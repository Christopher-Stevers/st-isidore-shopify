import {ShoppingCart, Truck, Smile} from 'lucide-react';

import SectionWrapper from './SectionWrapper';
import {Image} from '@shopify/hydrogen';
interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const HowItWorks = () => {
  const steps: Step[] = [
    {
      icon: <ShoppingCart className="w-12 h-12 text-amber-500 mb-4" />,
      title: 'Place Your Deposit',
      description: 'Choose your beef share and pay your 50% deposit',
    },
    {
      icon: <Truck className="w-12 h-12 text-amber-500 mb-4" />,
      title: 'Get Your Beef and Freezer',
      description: "We will ship your share and free freezer when it's ready",
    },
    {
      icon: <Smile className="w-12 h-12 text-amber-500 mb-4" />,
      title: 'Enjoy The Best Farm-Raised Meats',
      description:
        'Pay the remaining balance and enjoy your incredible grass-fed beef!',
    },
  ];

  return (
    <div className="">
      <SectionWrapper bgColor="bg-transparent">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-12">
          How Beef Shares Work
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12 text-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg"
            >
              {step.icon}
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper bgColor="bg-transparent">
        {/* Satisfaction guarantee badge */}
        <div className="flex  items-center bg-white p-6 rounded-xl shadow-xl border-2 border-amber-400">
          <div>
            <Image
              src="https://cdn.shopify.com/s/files/1/0626/1991/0197/files/image.webp?v=1747175142"
              alt="Satisfaction Guaranteed"
              className="w-[413px] h-[341px] rounded-full mr-6 flex-1 md:block hidden"
              width={418}
              height={341}
            />
          </div>
          <div className="flex-1 flex flex-col justify-center gap-y-2 text-xl">
            <h3 className="text-2xl font-bold  mb-2">
              Our 100% No-Risk Guarantee
            </h3>
            <p className="text-gray-700 max-w-lg">
              I, Chris Stevers am proud to be your rancher and I stand behind
              the quality, taste, and impact of my beef. If it doesn’t live up
              to your standards for any reason, just let me know—we’ll make it
              right or give you <strong>your money back.</strong> No hoops, no
              hassle. Got questions about our guarantee? Call me directly at{' '}
              <strong>519-703-6780</strong>.
            </p>
            <p className="text-gray-700 max-w-lg">
              Your satisfaction isn’t just a nice-to-have—it’s the standard I
              live by. Order with confidence knowing{' '}
              <strong>
                I’ve got your back—with beef built for people who care what goes
                in their body.
              </strong>
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default HowItWorks;
