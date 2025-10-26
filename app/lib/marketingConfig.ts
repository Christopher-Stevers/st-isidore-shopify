export interface MarketingSection {
  id: string;
  enabled: boolean;
  position: number;
  title?: string;
  subtitle?: string;
  content?: string;
  customData?: Record<string, any>;
}

export interface MarketingConfig {
  sections: MarketingSection[];
  hero: {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaUrl?: string;
    bullets?: string[];
  };
  cuts: {
    title?: string;
    items?: string[];
    showImages?: boolean;
  };
  delivery: {
    title?: string;
    content?: string;
    icon?: string;
  };
  promise: {
    title?: string;
    content?: string;
    guarantee?: string;
  };
  howItWorks: {
    title?: string;
    steps?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  testimonials: {
    enabled: boolean;
    title?: string;
  };
  claims: {
    enabled: boolean;
    title?: string;
  };
  faq: {
    enabled: boolean;
    title?: string;
  };
  whyChooseUs: {
    enabled: boolean;
    title?: string;
  };
  story: {
    enabled: boolean;
    title?: string;
    content?: string;
  };
  newsletter: {
    enabled: boolean;
    title?: string;
    subtitle?: string;
    ctaText?: string;
  };
}

export const DEFAULT_MARKETING_CONFIG: MarketingConfig = {
  sections: [
    { id: 'hero', enabled: true, position: 1 },
    { id: 'cuts', enabled: true, position: 2 },
    { id: 'delivery', enabled: true, position: 3 },
    { id: 'promise', enabled: true, position: 4 },
    { id: 'howItWorks', enabled: true, position: 5 },
    { id: 'claims', enabled: true, position: 6 },
    { id: 'testimonials', enabled: true, position: 7 },
    { id: 'faq', enabled: true, position: 8 },
    { id: 'whyChooseUs', enabled: true, position: 9 },
    { id: 'story', enabled: true, position: 10 },
    { id: 'newsletter', enabled: true, position: 11 },
  ],
  hero: {
    title: 'Premium Grass-Fed Beef',
    subtitle: '~15 lb local, grass-finished beef perfect for family meals',
    ctaText: 'Get yours →',
    bullets: ['Grass-Finished', 'Local', 'Perfect Family Portions'],
  },
  cuts: {
    title: "What's Inside Your Box",
    showImages: true,
  },
  delivery: {
    title: 'Pickup & Delivery',
    content: 'Ships weekly from Stratford to KW & Toronto',
    icon: '🚚',
  },
  promise: {
    title: 'Our Promise',
    content: "We guarantee the quality and freshness of every cut. If you're not completely satisfied, we'll make it right.",
    guarantee: "Satisfaction guaranteed — or we'll make it right.",
  },
  howItWorks: {
    title: 'How It Works',
    steps: [
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
    ],
  },
  testimonials: {
    enabled: true,
    title: 'What Our Customers Say',
  },
  claims: {
    enabled: true,
    title: 'Why Choose Our Beef',
  },
  faq: {
    enabled: true,
    title: 'Frequently Asked Questions',
  },
  whyChooseUs: {
    enabled: true,
    title: 'Why Choose St. Isidore Ranch',
  },
  story: {
    enabled: true,
    title: 'Our Story',
  },
  newsletter: {
    enabled: true,
    title: 'Not ready to buy yet?',
    subtitle: 'Join our email list for recipes and exclusive subscriber offers.',
    ctaText: 'Join',
  },
};
