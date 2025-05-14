import SectionWrapper from './SectionWrapper';
import {Image} from '@shopify/hydrogen';
import {CheckCircle} from 'lucide-react';
import {freeFreezerBenefits} from './constants';
import FreeFreezerCallToAction from './FreeFreezer/FreeFreezerCallToAction';

const IntroOffer = () => {
  return (
    <SectionWrapper bgColor="bg-transparent">
      <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32">
        <div className="md:w-1/2 w-full">
          {/* Placeholder image for the offer. Consider replacing with an actual image of a freezer or beef products. */}
          <Image
            src="https://cdn.shopify.com/s/files/1/0626/1991/0197/files/free_freezer.png?v=1747172996"
            alt="Freezer Offer"
            width={600}
            height={600}
          />
        </div>
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-3">
            Buy A Half Or Whole Cow <br /> And Get A{' '}
            <span className="text-amber-500">FREE Freezer!</span>
          </h1>
          <p className="text-2xl text-green-700 font-semibold mb-3">
            ($300 Value)
          </p>
          {/* "Only available..." line - corrected text size and styling */}
          <p className="text-base text-gray-600 mb-6 italic border-b-2 border-amber-400 pb-2 inline-block">
            Only available while supplies last. Claim yours today!
          </p>
          {/* Benefits list - updated text size for items */}
          <ul className="space-y-2 mb-8 text-left">
            {freeFreezerBenefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-start text-lg text-gray-700"
              >
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <FreeFreezerCallToAction />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default IntroOffer;
