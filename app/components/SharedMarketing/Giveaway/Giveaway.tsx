import {ArrowDown} from 'lucide-react';
import Testimonials from '../Testimonials';
import Features from './Features';
import GiveawayForm from './GiveawayForm';
import BundleIncludes, {bundleItems} from './BundleIncludes';

const giveAwayDate = new Date('October 15, 2025');

export default function GiveawayPage() {
  return (
    <div className="bg-white font-sans">
      {/* Hero Section */}
      <header className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Image Column */}
          <div>
            {/* TODO: Replace with your actual giveaway image */}
            <img
              src="https://cdn.shopify.com/s/files/1/0626/1991/0197/files/Rectangle_202.png?v=1758203498" // Using the image from the screenshot
              alt="Chris Stevers Family Farm Beef Giveaway"
              className="rounded-lg object-fill"
            />
          </div>

          {/* Form Column */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              $400 of Grass Finished Beef: You Could Win It!
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Ontario grassfed beef raised on our small family farm.
            </p>
            <GiveawayForm giveAwayDate={giveAwayDate} />
          </div>
        </div>
      </header>
      <Testimonials />
      {/*
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Who doesn't Love Free Lamb?
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          
            <div className="flex flex-col items-center text-center">
          
              <img
                className="h-40 w-40 rounded-full border-4 border-teal-400 object-cover"
                src="https://i.imgur.com/8Qp5y4g.png"
                alt="Winner Sheila"
              />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Winner!</h3>
              <p className="text-sm text-gray-500">
                Sheila And Paul From Kemptville Ontario - Fall 2022 Winner
              </p>
              <div className="mt-2 flex text-yellow-500">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <blockquote className="mt-4 text-gray-700">
                "We were so excited to be the winners of this awesome giveaway! We made lamb burgers on the BBQ last night. They were the best we’ve ever had. So juicy and flavourful. We can’t wait to try all the other cuts. Thank you, Ewing Family!"
              </blockquote>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                className="h-40 w-40 rounded-full border-4 border-teal-400 object-cover"
                src="https://i.imgur.com/8G0N3wA.png"
                alt="Winner Edward"
              />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Winner!</h3>
              <p className="text-sm text-gray-500">
                Edward And Page From Arnprior Ontario - Fall 2022 Winner
              </p>
              <div className="mt-2 flex text-yellow-500">
                <Star />
                <Star />
                <Star />
                <Star />
                            <Star />
              </div>
              <blockquote className="mt-4 text-gray-700">
                "We had the lamb chops for supper with rosemary, white wine sauce and leftover fresh veggies from the summer. Seared on the cast iron pan and then finished in the oven. It was so flavourful and so tender! It was a real treat to have something different for supper. Thank you so much for the amazing quality product! Cannot wait to cook the rest!"
              </blockquote>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                className="h-40 w-40 rounded-full border-4 border-teal-400 object-cover"
                src="https://i.imgur.com/k2e4kGv.png"
                alt="Winner Chris"
              />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Winner!</h3>
              <p className="text-sm text-gray-500">
                Chris Fletcher - Farrellton Quebec
              </p>
              <div className="mt-2 flex text-yellow-500">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <blockquote className="mt-4 text-gray-700">
                "Thanks for a beautiful leg of lamb. The aroma was wonderful. The taste of the meat was even better. Everybody commented on how good the lamb was, even the kids. We have only ever had store-bought lamb before and there's no comparison. You can taste the quality and the freshness."
              </blockquote>
            </div>
          </div>
        </div>
      </section>
*/}
      {/* Bundle Includes Section */}
      <BundleIncludes items={bundleItems} />

      {/* Features Section */}
      <Features />

      {/* Final CTA Section */}
      <section className="bg-primary-500 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            $400 of Grass Finished Beef: You Could Win It!
          </h2>
          <p className="mt-4 text-lg text-gray-200">
            And it only takes a few seconds to enter... so why wait!
          </p>
          <p className="mt-2 text-sm text-gray-300">
            We&apos;ll be choosing a random winner{' '}
            {giveAwayDate.toLocaleDateString()}.
          </p>
          <div className="my-6 flex justify-center">
            <ArrowDown className="h-8 w-8 animate-bounce" />
          </div>
          <GiveawayForm giveAwayDate={giveAwayDate} />
        </div>
      </section>
    </div>
  );
}
