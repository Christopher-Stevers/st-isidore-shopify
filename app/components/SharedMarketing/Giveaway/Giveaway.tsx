import {useState} from 'react';
import {ZapIcon, ArrowDown} from 'lucide-react';
import Testimonials from '../Testimonials';

// Helper component for the form to avoid repetition
const GiveawayForm = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !email.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', firstName.trim());
      formData.append('email', email.trim());
      formData.append('contest', '$500-giveaway-entry');

      const response = await fetch('/email', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Failed to submit entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mt-6 rounded-md bg-green-50 p-4 text-center">
        <p className="text-green-800 font-medium">
          🎉 You're entered! Good luck!
        </p>
        <p className="text-xs text-green-600 mt-2">
          We'll be choosing a random winner October 1, 2025.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 text-black space-y-4">
      <div>
        <label htmlFor="firstName" className="sr-only">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full rounded-md border-gray-300 p-3 text-sm shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border-gray-300 p-3 text-sm shadow-sm"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !firstName.trim() || !email.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-yellow-500 px-6 py-4 text-lg font-bold text-white transition hover:bg-yellow-600  disabled:cursor-not-allowed"
      >
        <ZapIcon className="h-4 w-4" />
        {isSubmitting ? 'Entering...' : 'Enter Me To Win Now'}
      </button>
      <p className="text-center text-xs text-gray-300">
        We'll be choosing a random winner October 1, 2025.
      </p>
    </form>
  );
};

export default function GiveawayPage() {
  return (
    <div className="bg-white font-sans">
      {/* Hero Section */}
      <header className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Image Column */}
          <div>
            {/* TODO: Replace with your actual giveaway image */}
            <img
              src="https://cdn.shopify.com/s/files/1/0626/1991/0197/files/IMG_20240729_162846.png?v=1746534671" // Using the image from the screenshot
              alt="Chris Stevers Family Farm Beef Giveaway"
              className="rounded-lg object-cover"
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
            <GiveawayForm />
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
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            The Winning Everyday Steak Bundle includes...
          </h2>
          <ul className="mt-12 space-y-5">
            <li className="flex items-start">
              <p className="ml-3 text-base text-gray-700">
                🥩 <strong>6 NY Strip Steaks (6–8 oz each).</strong> Classic
                steakhouse cut — sear hot for a perfect crust.
              </p>
            </li>

            <li className="flex items-start">
              <p className="ml-3 text-base text-gray-700">
                🥩 <strong>2 Tenderloin Medallions (3.5–4 oz each).</strong>{' '}
                Buttery-tender special-occasion bites.
              </p>
            </li>

            <li className="flex items-start">
              <p className="ml-3 text-base text-gray-700">
                🥩 <strong>2 Petite Shoulder Filets (6 oz each).</strong>{' '}
                Weeknight-friendly — great grilled or pan-seared.
              </p>
            </li>

            <li className="flex items-start">
              <p className="ml-3 text-base text-gray-700">
                🥩 <strong>10 Sirloin Tip Steaks (~10–12 oz each).</strong>{' '}
                Lean, flavorful marinating steaks — ideal for grills, fajitas,
                or stir-fries.
              </p>
            </li>

            <li className="flex items-start">
              <p className="ml-3 text-base text-gray-700">
                🥩 <strong>2 Round Steaks (~10–12 oz each).</strong> Versatile —
                quick skillet sear or braise low and slow for tenderness.
              </p>
            </li>

            <li className="flex items-start">
              <p className="ml-3 text-base text-gray-700">
                🍖 <strong>2 Cross Rib Roasts (~5.5 lbs total).</strong>{' '}
                Sunday-style pot roast — set it and forget it in the oven or
                crockpot.
              </p>
            </li>

            <li className="flex items-start">
              <p className="ml-3 text-base text-gray-700">
                🍖 <strong>2 Blade Roasts (~2.5 lbs).</strong> Rich and beefy —
                perfect for braising with onions and herbs.
              </p>
            </li>

            <li className="flex items-start">
              <p className="ml-3 text-base text-gray-700">
                🎁 <strong>Free Shipping to your door in Ontario.</strong>
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="text-center">
              {/* TODO: Replace with your image */}
              <img
                src="https://cdn.shopify.com/s/files/1/0626/1991/0197/files/IMG_20240729_162846.png?v=1746534671"
                alt="Sheep in a grassy field"
                className="mx-auto h-56 w-full rounded-lg object-cover shadow-lg"
              />
              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Pure and Natural
              </h3>
              <p className="mt-2 text-gray-600">
                Our beef is raised without hormones or antibiotics. They graze
                on our organic pastures enjoying their days in the grass, the
                way God intended it.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="text-center">
              {/* TODO: Replace with your image */}
              <img
                src="https://cdn.shopify.com/s/files/1/0626/1991/0197/files/IMG_20240729_162846.png?v=1746534671"
                alt="Sheep in a barn"
                className="mx-auto h-56 w-full rounded-lg object-cover shadow-lg"
              />
              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Ontario Beef
              </h3>
              <p className="mt-2 text-gray-600">
                Your beef comes directly from our Ontario ranch so you can know
                for sure it's 100% Canadian grassfed and finished.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="text-center">
              {/* TODO: Replace with your image */}
              <img
                src="https://cdn.shopify.com/s/files/1/0626/1991/0197/files/IMG_20240729_162846.png?v=1746534671"
                alt="Cooked lamb chops"
                className="mx-auto h-56 w-full rounded-lg object-cover shadow-lg"
              />
              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Fresh Ontario Beef
              </h3>
              <p className="mt-2 text-gray-600">
                Locally processed in Huron County and quickly vacuum sealed to
                lock in fresh flavour. It's truly a farm-to-table experience.
              </p>
            </div>
          </div>
        </div>
      </section>

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
            We'll be choosing a random winner Nov 1, 2025.
          </p>
          <div className="my-6 flex justify-center">
            <ArrowDown className="h-8 w-8 animate-bounce" />
          </div>
          <GiveawayForm />
        </div>
      </section>
    </div>
  );
}
