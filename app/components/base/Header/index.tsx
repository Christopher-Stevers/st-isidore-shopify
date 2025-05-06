import React from 'react';
import HeroButton from '../FancyButton';

import {Image} from '@shopify/hydrogen';
const Steak =
  'https://cdn.shopify.com/s/files/1/0626/1991/0197/files/steakBeef.webp?v=1714279884';

export const HeaderMain: React.FC = () => {
  return (
    <header className="relative h-screen w-full z-10  -mt-[240px]  ">
      <Image
        className="absolute top-0 object-cover w-full h-full"
        alt="image of cows grazing"
        sizes="95vw"
        src={Steak}
      />
      <div className="absolute top-0 z-20  flex flex-col h-screen w-full items-center justify-center justify-items-center gap-16 bg-black/70 font-display text-white lg:grid-cols-2 lg:p-32">
        <div className="pt-16"></div>
        <div className=" relative  flex flex-col h-min gap-8 md:col-span-2 lg:col-span-1 lg:col-start-1 lg:self-start">
          <h1 className="flex w-full lg:text-left lg:justify-start flex-wrap justify-center gap-x-4 gap-y-4 whitespace-nowrap font-display text-3xl text-white md:text-4xl   lg:text-5xl ">
            <span className="inline">Ranch Direct.</span>
            <span className="inline">Peak Nutrition.</span>
            <span className="inline">Unrivaled Beef.</span>
          </h1>
          <div className="text-center font-accent text-2xl text-white lg:text-left lg:text-3xl font-bold">
            For Those Who Demand More From Their Food - Discover the Grassfed
            difference.
          </div>
        </div>
        <HeroButton
          text="Get Your Beef"
          link="/collections"
          className="flex items-center justify-center font-sans font-bold row-start-3 min-w-[200px] border-4 border-white bg-amber-600 hover:bg-amber-500 text-white md:row-start-3 md:justify-self-start h-16 w-32 text-2xl md:h-20 md:w-40 md:text-3xl lg:h-24 lg:w-60"
        />
      </div>
    </header>
  );
};
export default HeaderMain;
