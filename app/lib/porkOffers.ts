import {DEFAULT_MARKETING_CONFIG, type MarketingConfig} from './marketingConfig';

export function porkOfferConfig(handle: string): MarketingConfig | undefined {
  const half = handle === 'half-pig-pork-from-certified-organic-pigs';
  if (!half && handle !== 'garlic-pork-sausage-1-lb') return undefined;
  return {
    ...DEFAULT_MARKETING_CONFIG,
    sections: ['hero', 'cuts', 'promise', 'delivery'].map((id, position) => ({id, position, enabled: true})),
    hero: {
      title: half ? 'A freezer full of possibilities.' : 'Garlic sausage. Supper sorted.',
      subtitle: half ? 'A half-pig share for roasts, sizzling chops and easy sausage suppers. Pork from certified organic pigs.' : 'Big garlic flavour in a convenient 1 lb pack. Made with pork from certified organic pigs. Ready for your next family supper.',
      ctaText: half ? 'Add a half pig →' : 'Add a 1 lb pack →',
      bullets: half ? ['From certified organic pigs', 'Approx. 86 lb packaged pork', 'One-time purchase'] : ['From certified organic pigs', '1 lb pack', 'One-time purchase'],
    },
    cuts: {
      title: half ? 'Your half-pig share' : 'One pack. Plenty of possibilities.',
      showImages: false,
      items: half ? ['Sausage — approx. 43 lb', 'Bacon — approx. 13 lb', 'Ham — approx. 9.6 lb', 'Shoulder roast — approx. 6.6 lb', 'Spare ribs — approx. 5 lb', 'Fresh pork chops — approx. 4.4 lb', 'Smoked pork chops — approx. 4.4 lb'] : ['One 1 lb pack of garlic pork sausage', 'Serve with roasted vegetables for a simple supper', 'Enjoy in a bun or alongside your favourite sides'],
    },
    promise: {
      title: half ? 'Know what you’re ordering' : 'Good food starts with the source',
      content: half ? 'The cut mix above follows our half-pig plan, including a generous sausage allocation. Approximately 86 lb packaged from an estimated 120 lb hanging half. These are planning estimates; final weights vary with butchering, trimming and curing.' : 'Our garlic sausage is made with pork from certified organic pigs. The photo shows our packaged sausage.',
      guarantee: half ? 'The vintage diagram shows the main pork regions, not a packing list. Loin becomes fresh and smoked chops; belly becomes bacon. Sausage uses allocated cuts and trimmings. Head and other unlisted parts are not included.' : 'One pound of garlic pork sausage, ready to make your next meal.',
    },
    delivery: {title: 'Plan your pickup or delivery', content: 'Contact info@stisidoreranch.com to confirm availability and pickup or delivery arrangements before ordering.'},
  };
}
