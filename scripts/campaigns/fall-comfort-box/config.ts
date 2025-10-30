const offerConfig = {
  // Basic Product Info
  handle: "fall-family-beef-sampler",
  title: "Fall Family Beef Sampler Box",
  description:
    "A 15 lb assortment of Ontario grass-fed beef — perfect for family dinners this fall. Enjoy premium steaks, hearty roasts, and convenient ground beef, all raised with integrity on open pasture.",
  price: "199.00",
  compareAtPrice: "265.00",

  // Campaign Details
  campaignName: "Fall Family Beef Sampler",
  startDate: "2025-10-29",
  endDate: "2025-12-15",
  targetAudience:
    "Ontario families who value health, convenience, and transparency — seeking local, nutrient-dense, pasture-raised beef for their tables.",

  // Product Highlights
  highlights: [
    "15 lb family-friendly bundle",
    "Ontario grass-fed and finished beef",
    "Balanced mix of steaks, roasts, and ground",
    "Save ~25 % vs buying individually"
  ],

  // Marketing Configuration Object
  marketingConfig: {
    hero: {
      title: "Feed Your Family Better This Fall",
      subtitle:
        "Taste the difference in local, grass-fed beef — convenient, delicious, and raised with care right here in Ontario.",
      ctaText: "Reserve Your Box",
      ctaUrl: "/cart",
      bullets: [
        "100 % Grass-Fed • Pasture-Raised",
        "Perfect 15 lb Family Sampler",
        "Limited Fall Availability"
      ]
    },
    cuts: {
      title: "What's Inside",
      items: [
        "6 lb Ground Beef",
        "0.625 lb NY Strip Steaks (2 × 5 oz)",
        "0.75 lb Sirloin Steak",
        "0.75 lb Sirloin Tip Steak",
        "2.5 lb Pot Roast (Cross Rib)",
        "2.5 lb Blade Roast",
        "2 lb Stew Meat",
        "0.5 lb Shank Bones (optional)"
      ],
      showImages: true
    },
    delivery: {
      title: "Local Delivery & Pickup",
      content:
        "Delivered fresh-frozen across Southwestern Ontario or available for easy farm pickup. We coordinate directly after checkout to confirm delivery timing.",
      icon: "truck"
    },
    promise: {
      title: "Our Promise",
      content:
        "We raise every animal on open pasture without grain, growth hormones, or feedlot stress — just clean, nutrient-dense beef you can feel good about feeding your family.",
      guarantee: "Satisfaction guaranteed or we’ll make it right."
    },
    howItWorks: {
      title: "How It Works",
      steps: [
        {
          icon: "shopping-cart",
          title: "Reserve Online",
          description:
            "Secure your Fall Family Beef Sampler today — quantities are limited for the season."
        },
        {
          icon: "package",
          title: "We Prepare Your Box",
          description:
            "Our butcher carefully packs each order with your steaks, roasts, and ground beef."
        },
        {
          icon: "truck",
          title: "Delivery or Pickup",
          description:
            "We deliver across Ontario or schedule a convenient local pickup."
        }
      ]
    },
    testimonials: {
      enabled: true,
      title: "What Ontario Families Are Saying"
    },
    story: { enabled: false },
    newsletter: {
      enabled: true,
      title: "Stay in the Loop",
      subtitle:
        "Get recipes, cooking tips, and early access to new beef shares.",
      ctaText: "Join the Farm Rebel List"
    },
    claims: { enabled: false },
    faq: { enabled: false },
    whyChooseUs: { enabled: false },
    sections: [
      { id: "hero", enabled: true, position: 1 },
      { id: "cuts", enabled: true, position: 2 },
      { id: "delivery", enabled: true, position: 3 },
      { id: "promise", enabled: true, position: 4 },
      { id: "how_it_works", enabled: true, position: 5 },
      { id: "testimonials", enabled: true, position: 6 },
      { id: "newsletter", enabled: true, position: 7 }
    ]
  }
};



export default offerConfig;
