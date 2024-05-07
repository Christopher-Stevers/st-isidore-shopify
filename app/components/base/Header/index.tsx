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
      <div className="absolute top-0 z-20  grid h-screen w-full items-center justify-center justify-items-center gap-16 bg-black/70 font-display text-white lg:grid-cols-2 lg:grid-rows-[1fr_1fr_0.5fr_0.5fr] lg:justify-end lg:p-32">
        <div className="pt-16"></div>
        <div className="-md:left-20 relative mx-auto grid h-min gap-8 md:col-span-2 lg:col-span-1 lg:col-start-1 lg:self-start">
          <h1 className="flex w-min  flex-wrap justify-center gap-x-4 gap-y-4 whitespace-nowrap font-display text-6xl text-white md:text-7xl lg:flex-nowrap lg:justify-start lg:text-8xl">
            <span className="inline"> St. Isidore </span>
            <span className="inline">Ranch</span>
          </h1>
          <div className="text-center font-accent text-5xl text-white lg:text-left lg:text-6xl">
            Pasture to Plate
          </div>
        </div>

        <HeroButton
          text="About"
          link="#about"
          className="flex items-center justify-center font-sans font-bold min-w-[200px] justify-self-center bg-white text-primary-500 md:row-start-3 md:justify-self-end h-16 w-32 text-2xl md:h-20 md:w-40 md:text-3xl lg:h-24 lg:w-60"
        />

        <HeroButton
          text="Shop"
          link="/shop"
          className="flex items-center justify-center font-sans font-bold row-start-3 min-w-[200px] border-4 border-white bg-primary-500 text-white md:row-start-3 md:justify-self-start h-16 w-32 text-2xl md:h-20 md:w-40 md:text-3xl lg:h-24 lg:w-60"
        />
      </div>
    </header>
  );
};
export default HeaderMain;
