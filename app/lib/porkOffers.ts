import {DEFAULT_MARKETING_CONFIG, type MarketingConfig} from './marketingConfig';

export function porkOfferConfig(handle: string): MarketingConfig | undefined {
  const half = handle === 'half-pig-pork-from-certified-organic-pigs';
  if (!half && handle !== 'garlic-pork-sausage-1-lb') return undefined;
  return {
    ...DEFAULT_MARKETING_CONFIG,
    sections: (half ? ['hero', 'cuts', 'promise', 'delivery', 'howItWorks', 'faq', 'story', 'questions', 'order'] : ['hero', 'cuts', 'delivery', 'howItWorks', 'faq', 'story', 'questions', 'order']).map((id, position) => ({id, position, enabled: true})),
    hero: {
      title: half ? 'Organic raised half pig' : 'Organic raised garlic sausage',
      subtitle: half ? 'Stock up on pork! Get sausage, bacon, ham, roasts, ribs and chops in one order. Approximately 86 lbs of pork from certified organic pigs.' : 'My personal favourite (aside from steak). 1 lb pack of garlic pork sausage, made with pork from certified organic pigs.',
      ctaText: 'Get yours →',
      bullets: half ? ['From certified organic pigs', 'Approx. 86 lbs of pork', 'Delivered to your door'] : ['From certified organic pigs', '1 lb pack', 'Delivered to your door'],
    },
    cuts: {
      title: half ? 'Your half pig includes' : 'What’s in a pack?',
      showImages: false,
      items: half ? ['Sausage — approx. 43 lb', 'Bacon — approx. 13 lb', 'Ham — approx. 9.6 lb', 'Shoulder roast — approx. 6.6 lb', 'Spare ribs — approx. 5 lb', 'Fresh pork chops — approx. 4.4 lb', 'Smoked pork chops — approx. 4.4 lb'] : ['1 lb of garlic pork sausage', 'Made with pork from certified organic pigs', 'Order one pack or add a few to your beef order'],
    },
    promise: {
      title: 'A note on the weights',
      content: 'Expect about 86 lbs of packaged pork from a 120 lb hanging half. The amounts above are estimates. They will vary with cutting, trimming and curing.',
      guarantee: 'The picture is a butcher’s diagram. Your order includes the cuts listed above, not every part shown in the picture.',
    },
    howItWorks: {
      title: 'How ordering works',
      steps: [
        {icon: 'shopping-cart', title: 'Place your order', description: half ? 'Order your half pig for $650. That is the price of the half pig, not a deposit.' : 'Choose how many 1 lb packs you would like and place your order online.'},
        {icon: 'package', title: 'Watch for your ETA', description: 'Indie Food will send you an estimated arrival time on Wednesday before your delivery.'},
        {icon: 'truck', title: 'Get your delivery', description: 'Indie Food delivers on Thursday or Friday, depending on where you live.'},
      ],
    },
    faq: {
      enabled: true,
      title: 'Frequently asked questions',
      items: [
        {question: 'What does organic raised mean?', answer: 'The pork comes from certified organic pigs.'},
        ...(half ? [
          {question: 'How much pork will I get?', answer: 'Approximately 86 lbs of packaged pork from a 120 lb hanging half. The cut weights above are estimates and vary with cutting, trimming and curing.'},
          {question: 'Is the $650 a deposit?', answer: 'No. $650 CAD is the price for the half pig.'},
          {question: 'Does the picture show everything included?', answer: 'The picture shows where cuts come from on a pig. Your half pig includes the seven cuts listed above; head and other unlisted parts are not included.'},
        ] : [
          {question: 'How much is in a pack?', answer: 'Each pack is 1 lb of garlic pork sausage and costs $6.87 CAD.'},
          {question: 'Do I have to buy a box?', answer: 'No. You can order one 1 lb pack or add more packs to your order.'},
        ]),
        {question: 'When will my order be delivered?', answer: 'Indie Food delivers on Thursdays or Fridays, depending on your location. They will send you your estimated arrival time (ETA) on Wednesday before your delivery.'},
      ],
    },
    story: {
      enabled: true,
      title: half ? 'Pork is back!' : 'My personal favourite (aside from steak)',
      content: half ? '<p>We have pork available again, alongside our beef. If you like to stock up, a half pig gives you a mix of the cuts listed above in one order.</p><p>Want to try the pork first? You can also order our garlic sausage by the 1 lb pack.</p>' : '<p>I’m glad to have pork available again. Garlic sausage is my personal favourite (aside from steak), so this is a good place to start.</p><p>Try a 1 lb pack, add it to your beef order, or get a few for the freezer.</p>',
    },
    delivery: {title: 'How delivery works', content: 'Our delivery partner, Indie Food, delivers on Thursdays or Fridays, depending on where you live. They will send you an estimated arrival time (ETA) on Wednesday before your delivery, so you know when to expect your order. Questions? Email us at info@stisidoreranch.com.'},
  };
}
