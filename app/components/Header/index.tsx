import React from 'react';
import HeroButton from './HeroButton';

import {Link} from '@remix-run/react';

const HeaderShared = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  const headerLinks = [
    {name: 'Home', link: '/'},
    {name: 'Shop', link: '/shop'},
    {name: 'Contact', link: '/contact'},
    {name: 'Blog', link: '/blog'},
  ];

  return (
    <div className={`w-full bg-primary-700 ${className}`}>
      <div className="py-4 font-display text-2xl text-white lg:text-4xl">
        <div className="flex w-full content-center items-center justify-between ">
          <Link to="/">
            {' '}
            <img
              className="object-fit w-16 rounded-full px-2  sm:w-auto sm:px-6"
              alt="products"
              src="/logo_white_transparent.png"
              width={100}
              height={100}
            />
          </Link>
          {headerLinks.slice(0, 3).map((link) => {
            return (
              <Link
                key={link.name}
                className={`px-2  ${
                  title.toLowerCase() === link.name.toLowerCase()
                    ? 'text-white'
                    : 'text-white/70'
                } hover:underline`}
                to={link.link}
              >
                {link.name}
              </Link>
            );
          })}
          <Link to="/">
            <Image
              className="object-fit w-16 rounded-full px-2  sm:w-auto sm:px-6"
              alt="products"
              src="/logo_white_transparent.png"
              width={100}
              height={100}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

const HeaderMain: React.FC = () => {
  return (
    <>
      <header className="relative h-screen w-full ">
        <Image
          className="absolute top-0 object-cover"
          alt="image of cows grazing"
          fill={true}
          src={'/boxPics/steakBeef.jpg'}
        />
        <div
          className=" absolute top-0 z-20 
          grid h-screen w-full
          items-center
          justify-center
          justify-items-center
        gap-16
        bg-black/70 font-display
        text-white
        lg:grid-cols-2 lg:grid-rows-[1fr_1fr_0.5fr_0.5fr] lg:justify-end lg:p-32"
        >
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
            className="min-w-[200px] justify-self-center bg-white text-primary-500 md:row-start-3 md:justify-self-end"
          />

          <HeroButton
            text="Shop"
            link="/shop"
            className="row-start-3 min-w-[200px] border-4 border-white bg-primary-500 text-white md:row-start-3 md:justify-self-start"
          />
        </div>
        <HeaderShared
          title={'home'}
          className="absolute top-0 z-20 bg-transparent"
        />
      </header>
    </>
  );
};
export default HeaderMain;
