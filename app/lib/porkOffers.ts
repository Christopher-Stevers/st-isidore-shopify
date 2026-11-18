import {DEFAULT_MARKETING_CONFIG, type MarketingConfig} from './marketingConfig';

export function porkOfferConfig(handle: string): MarketingConfig | undefined {
  const half = handle === 'half-pig-pork-from-certified-organic-pigs';
  if (!half && handle !== 'garlic-pork-sausage-1-lb') return undefined;
  return {
    ...DEFAULT_MARKETING_CONFIG,
    sections: (half ? ['hero', 'cuts', 'promise', 'howItWorks', 'delivery', 'faq', 'order'] : ['hero', 'howItWorks', 'delivery', 'faq', 'order']).map((id, position) => ({id, position, enabled: true})),
    hero: {
      title: half ? 'Organic raised half pig' : 'Organic raised garlic sausage',
      subtitle: half ? 'Sausage and bacon for breakfast, chops for dinner AND roasts for the weekend. Get a half pig with approximately 86 lbs of pork from certified organic pigs.' : 'My personal favourite (aside from steak). Great with breakfast, in a bun, or with potatoes for dinner. Also makes a great casserole. 1 lb pack of garlic pork sausage, made with pork from certified organic pigs.',
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
    howItWorks: {
      title: half ? 'What to cook with your half pig' : 'From breakfast to dinner',
      steps: half ? [
        {icon: 'smile', title: 'Breakfast', description: 'Bacon or sausage with eggs. Keep some on hand for a weekend breakfast.'},
        {icon: 'smile', title: 'Dinner', description: 'Fresh or smoked chops with potatoes and vegetables. Ribs when you have a little more time.'},
        {icon: 'smile', title: 'Feed the family', description: 'A shoulder roast or ham for a family meal, with leftovers for the next day.'},
      ] : [
        {icon: 'smile', title: 'Keep breakfast simple', description: 'Cook some sausage to go with eggs and toast.'},
        {icon: 'smile', title: 'Put it in a bun', description: 'Add mustard, onions, or whatever you like on your sausage.'},
        {icon: 'smile', title: 'Make dinner', description: 'Serve with potatoes and vegetables, or cut it up for a casserole.'},
      ],
    },
    faq: {
      enabled: true,
      title: 'A few questions you might have',
      items: [
        {question: 'What does organic raised mean?', answer: 'The pork comes from certified organic pigs.'},
        ...(half ? [
          {question: 'How much pork will I get?', answer: 'Approximately 86 lbs of packaged pork from a 120 lb hanging half. The cut weights above are estimates and vary with cutting, trimming and curing.'},
          {question: 'Is the $650 a deposit?', answer: 'No. $650 CAD is the price for the half-pig share.'},
          {question: 'Does the picture show everything included?', answer: 'The picture shows where cuts come from on a pig. Your share includes the seven cuts listed above; head and other unlisted parts are not included.'},
        ] : [
          {question: 'How much is in a pack?', answer: 'Each pack is 1 lb of garlic pork sausage and costs $6.87 CAD.'},
          {question: 'Do I have to buy a box?', answer: 'No. You can order one 1 lb pack or add more packs to your order.'},
        ]),
        {question: 'When will my order be delivered?', answer: 'Indie Food delivers on Thursdays or Fridays, depending on your location. They will send you your estimated arrival time (ETA) on Wednesday before your delivery.'},
      ],
    },
    delivery: {title: 'How delivery works', content: 'Our delivery partner, Indie Food, delivers on Thursdays or Fridays, depending on where you live. They will send you an estimated arrival time (ETA) on Wednesday before your delivery, so you know when to expect your order. Questions? Email us at info@stisidoreranch.com.'},
  };
}
