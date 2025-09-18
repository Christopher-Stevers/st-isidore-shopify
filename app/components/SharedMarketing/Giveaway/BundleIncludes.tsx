import React from 'react';

type BundleItem = {
  emoji: string;
  title: string;
  description: string;
};

type BundleIncludesProps = {
  items: BundleItem[];
};

const BundleIncludes: React.FC<BundleIncludesProps> = ({items}) => (
  <section className="py-16 sm:py-24">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        The Winning Everyday Steak Bundle includes...
      </h2>
      <ul className="mt-12 space-y-5">
        {items.map((item) => (
          <li className="flex items-start" key={item.title}>
            <p className="ml-3 text-base text-gray-700">
              {item.emoji} <strong>{item.title}</strong> {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export const bundleItems: BundleItem[] = [
  {
    emoji: '🥩',
    title: '6 NY Strip Steaks (6–8 oz each).',
    description: 'Classic steakhouse cut — sear hot for a perfect crust.',
  },
  {
    emoji: '🥩',
    title: '2 Tenderloin Medallions (3.5–4 oz each).',
    description: 'Buttery-tender special-occasion bites.',
  },
  {
    emoji: '🥩',
    title: '2 Petite Shoulder Filets (6 oz each).',
    description: 'Weeknight-friendly — great grilled or pan-seared.',
  },
  {
    emoji: '🥩',
    title: '10 Sirloin Tip Steaks (~10–12 oz each).',
    description:
      'Lean, flavorful marinating steaks — ideal for grills, fajitas, or stir-fries.',
  },
  {
    emoji: '🥩',
    title: '2 Round Steaks (~10–12 oz each).',
    description:
      'Versatile — quick skillet sear or braise low and slow for tenderness.',
  },
  {
    emoji: '🍖',
    title: '2 Cross Rib Roasts (~5.5 lbs total).',
    description:
      'Sunday-style pot roast — set it and forget it in the oven or crockpot.',
  },
  {
    emoji: '🍖',
    title: '2 Blade Roasts (~2.5 lbs).',
    description: 'Rich and beefy — perfect for braising with onions and herbs.',
  },
  {
    emoji: '🎁',
    title: 'Free Shipping to your door in Ontario.',
    description: '',
  },
];

export default BundleIncludes;
