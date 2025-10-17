import FreeFreezerCallToAction from './FreeFreezer/FreeFreezerCallToAction';

import {CheckCircle} from 'lucide-react';

import SectionWrapper from './SectionWrapper';
import {Image} from '@shopify/hydrogen';

const WhyChooseUs = () => {
  const benefits: string[] = [
    '100% Grass-Fed & Finished',
    'No Hormones or Antibiotics',
    'Ethically Pasture-Raised',
    'Supports Regenerative Agriculture',
    'Aged for Flavor & Tenderness',
    'Vacuum Sealed to Preserve Quality',
    'Conveniently Delivered To Your Door',
  ];
  return (
    <SectionWrapper bgColor="bg-transparent">
      <div className="flex flex-col w-full gap-8 content-center items-center justify-center">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full overflow-hidden">
          <div className="md:w-1/2 w-full">
            <Image
              src="https://cdn.shopify.com/s/files/1/0626/1991/0197/files/grilledBeef_a9794579-2131-434a-9b18-f3d7c9cb0863.webp?v=1746565177"
              width={600}
              height={450}
              alt="Appetizing Beef Dish"
              className="w-full h-auto shadow-xl rounded-xl"
            />
          </div>
          <div className="md:w-1/2 w-full text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
              Why St Isidore Ranch?
            </h2>
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-center text-lg text-gray-700"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <FreeFreezerCallToAction />
      </div>
    </SectionWrapper>
  );
};

export default WhyChooseUs;
