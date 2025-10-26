import type {MarketingConfig} from './marketingConfig';
import {DEFAULT_MARKETING_CONFIG} from './marketingConfig';

interface Metafield {
  key: string;
  value: string;
  namespace: string;
}

/**
 * Parse metafields into MarketingConfig format
 */
export function parseMarketingMetafields(metafields: Metafield[]): MarketingConfig {
  const metafieldMap = new Map<string, string>();
  
  
  // Handle case where metafields might be null or undefined
  if (!metafields || metafields.length === 0) {
    console.log('No metafields found, using default configuration');
    return DEFAULT_MARKETING_CONFIG;
  }
  
  // Create a map for easy lookup
  for (const metafield of metafields) {
    if (metafield && metafield.namespace === 'app--289113440257--custom') {
      metafieldMap.set(metafield.key, metafield.value);
    }
  }
  
 

  // Helper function to get metafield value with fallback
  const getValue = (key: string, fallback?: string): string | undefined => {
    return metafieldMap.get(key) || fallback;
  };

  // Helper function to get boolean value
  const getBoolean = (key: string, fallback: boolean = false): boolean => {
    const value = metafieldMap.get(key);
    if (value === null || value === undefined) return fallback;
    return value === 'true' || value === '1';
  };

  // Helper function to get number value
  const getNumber = (key: string, fallback: number): number => {
    const value = metafieldMap.get(key);
    if (value === null || value === undefined) return fallback;
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  // Helper function to parse JSON array
  const getArray = (key: string, fallback: string[] = []): string[] => {
    const value = metafieldMap.get(key);
    if (!value) return fallback;
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed as string[] : fallback;
    } catch {
      return fallback;
    }
  };

  // Helper function to parse JSON object
  const getObject = (key: string, fallback: any = null): any => {
    const value = metafieldMap.get(key);
    if (!value) return fallback;
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  };

  // Build sections array from individual metafields
  const sections = [
    {
      id: 'hero',
      enabled: getBoolean('section_hero_enabled', true),
      position: getNumber('section_hero_position', 1),
    },
    {
      id: 'cuts',
      enabled: getBoolean('section_cuts_enabled', true),
      position: getNumber('section_cuts_position', 2),
    },
    {
      id: 'delivery',
      enabled: getBoolean('section_delivery_enabled', true),
      position: getNumber('section_delivery_position', 3),
    },
    {
      id: 'promise',
      enabled: getBoolean('section_promise_enabled', true),
      position: getNumber('section_promise_position', 4),
    },
    {
      id: 'howItWorks',
      enabled: getBoolean('section_how_it_works_enabled', true),
      position: getNumber('section_how_it_works_position', 5),
    },
    {
      id: 'claims',
      enabled: getBoolean('claims_enabled', true),
      position: getNumber('section_claims_position', 6),
    },
    {
      id: 'testimonials',
      enabled: getBoolean('testimonials_enabled', true),
      position: getNumber('section_testimonials_position', 7),
    },
    {
      id: 'faq',
      enabled: getBoolean('faq_enabled', true),
      position: getNumber('section_faq_position', 8),
    },
    {
      id: 'whyChooseUs',
      enabled: getBoolean('why_choose_us_enabled', true),
      position: getNumber('section_why_choose_us_position', 9),
    },
    {
      id: 'story',
      enabled: getBoolean('story_enabled', true),
      position: getNumber('section_story_position', 10),
    },
    {
      id: 'newsletter',
      enabled: getBoolean('newsletter_enabled', true),
      position: getNumber('section_newsletter_position', 11),
    },
  ];

  return {
    sections,
    hero: {
      title: getValue('hero_title', 'Premium Grass-Fed Beef'),
      subtitle: getValue('hero_subtitle', '~15 lb local, grass-finished beef perfect for family meals'),
      ctaText: getValue('hero_cta_text', 'Get yours →'),
      ctaUrl: getValue('hero_cta_url'),
      bullets: getArray('hero_bullets', ['Grass-Finished', 'Local', 'Perfect Family Portions']),
    },
    cuts: {
      title: getValue('cuts_title', "What's Inside Your Box"),
      items: getArray('cuts_items'),
      showImages: getBoolean('cuts_show_images', true),
    },
    delivery: {
      title: getValue('delivery_title', 'Pickup & Delivery'),
      content: getValue('delivery_content', 'Ships weekly from Stratford to KW & Toronto'),
      icon: getValue('delivery_icon', '🚚'),
    },
    promise: {
      title: getValue('promise_title', 'Our Promise'),
      content: getValue('promise_content', "We guarantee the quality and freshness of every cut. If you're not completely satisfied, we'll make it right."),
      guarantee: getValue('promise_guarantee', "Satisfaction guaranteed — or we'll make it right."),
    },
    howItWorks: {
      title: getValue('how_it_works_title', 'How It Works'),
      steps: getObject('how_it_works_steps', [
        {
          icon: '🛒',
          title: 'Order Your Box',
          description: 'Select your beef sampler and complete your purchase.',
        },
        {
          icon: '🚚',
          title: 'We Prepare & Ship',
          description: 'We carefully package your fresh beef and ship it to your door',
        },
        {
          icon: '😊',
          title: 'Enjoy Premium Beef',
          description: 'Receive your order and enjoy the finest grass-fed beef',
        },
      ]),
    },
    testimonials: {
      enabled: getBoolean('testimonials_enabled', true),
      title: getValue('testimonials_title', 'What Our Customers Say'),
    },
    claims: {
      enabled: getBoolean('claims_enabled', true),
      title: getValue('claims_title', 'Why Choose Our Beef'),
    },
    faq: {
      enabled: getBoolean('faq_enabled', true),
      title: getValue('faq_title', 'Frequently Asked Questions'),
    },
    whyChooseUs: {
      enabled: getBoolean('why_choose_us_enabled', true),
      title: getValue('why_choose_us_title', 'Why Choose St. Isidore Ranch'),
    },
    story: {
      enabled: getBoolean('story_enabled', true),
      title: getValue('story_title', 'Our Story'),
      content: getValue('story_content'),
    },
    newsletter: {
      enabled: getBoolean('newsletter_enabled', true),
      title: getValue('newsletter_title', 'Not ready to buy yet?'),
      subtitle: getValue('newsletter_subtitle', 'Join our email list for recipes and exclusive subscriber offers.'),
      ctaText: getValue('newsletter_cta_text', 'Join'),
    },
  };
}

/**
 * Get a specific metafield value by key
 */
export function getMetafieldValue(metafields: Metafield[], key: string, namespace: string = '$app:custom'): string | undefined {
  const metafield = metafields.find(m => m.key === key && m.namespace === namespace);
  return metafield?.value;
}

/**
 * Get a boolean metafield value
 */
export function getMetafieldBoolean(metafields: Metafield[], key: string, namespace: string = '$app:custom', fallback: boolean = false): boolean {
  const value = getMetafieldValue(metafields, key, namespace);
  if (value === null || value === undefined) return fallback;
  return value === 'true' || value === '1';
}

/**
 * Get a number metafield value
 */
export function getMetafieldNumber(metafields: Metafield[], key: string, namespace: string = '$app:custom', fallback: number = 0): number {
  const value = getMetafieldValue(metafields, key, namespace);
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}
