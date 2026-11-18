import {DEFAULT_MARKETING_CONFIG, type MarketingConfig} from './marketingConfig';

export function porkOfferConfig(handle: string): MarketingConfig | undefined {
  const half = handle === 'half-pig-pork-from-certified-organic-pigs';
  if (!half && handle !== 'garlic-pork-sausage-1-lb') return undefined;
  return {
    ...DEFAULT_MARKETING_CONFIG,
    sections: (half ? ['hero', 'cuts', 'promise', 'delivery'] : ['hero', 'delivery']).map((id, position) => ({id, position, enabled: true})),
    hero: {
      title: half ? 'Stock up on pork!' : 'My personal favourite (aside from steak)',
      subtitle: half ? 'Sausage and bacon for breakfast, chops for dinner AND roasts for the weekend. Get a half pig with approximately 86 lbs of pork from certified organic pigs.' : 'Garlic pork sausage. Great with breakfast, in a bun, or with potatoes for dinner. Also makes a great casserole. 1 lb pack, made with pork from certified organic pigs.',
      ctaText: 'Get yours →',
      bullets: half ? ['From certified organic pigs', 'Approx. 86 lbs of pork', 'Half pig — $650'] : ['From certified organic pigs', '1 lb pack', '$6.87 per pack'],
    },
    cuts: {
      title: half ? 'Your half pig includes' : 'How to eat it',
      showImages: false,
      items: half ? ['Sausage — approx. 43 lb', 'Bacon — approx. 13 lb', 'Ham — approx. 9.6 lb', 'Shoulder roast — approx. 6.6 lb', 'Spare ribs — approx. 5 lb', 'Fresh pork chops — approx. 4.4 lb', 'Smoked pork chops — approx. 4.4 lb'] : ['Breakfast — with eggs and toast', 'Lunch — in a bun with mustard or your favourite toppings', 'Dinner — with potatoes and vegetables', 'Casserole — cut it up and mix it in'],
    },
    promise: {
      title: 'A note on the weights',
      content: 'Expect about 86 lbs of packaged pork from a 120 lb hanging half. The amounts above are estimates. They will vary with cutting, trimming and curing.',
      guarantee: 'The picture is a butcher’s diagram. Your order includes the cuts listed above, not every part shown in the picture.',
    },
    delivery: {title: 'Pickup & Delivery', content: 'Have a question about pickup, delivery or availability? Email us at info@stisidoreranch.com before ordering.'},
  };
}
