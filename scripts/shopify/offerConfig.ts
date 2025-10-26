const offerConfig = {
    handle: "fall-comfort-box",
    title: "Fall Comfort Box",
    description: "A cozy fall assortment featuring ground beef, stew beef, and roasts — perfect for family dinners and slow-cooked meals all season long.",
    price: "199.00",
    compareAtPrice: "239.00",
    campaignName: "Fall Family Freezer Fill-Up",
    startDate: "2025-10-01",
    endDate: "2025-12-15",
    targetAudience: "Families and meal preppers who want healthy, hearty meals for fall and winter.",
    highlights: [
      "Perfect for cozy fall meals",
      "Slow-cooker friendly roasts & stew beef",
      "Locally raised & 100% grass-fed",
      "Delivered freezer-ready to your door"
    ],
    marketingConfig: {
      hero: {
        title: "Warm Up with the Fall Comfort Box",
        subtitle: "Ground beef, stew beef, and roasts — everything you need for cozy, nourishing meals all season long.",
        ctaText: "Reserve Your Box",
        ctaUrl: "/cart",
        bullets: [
          "15+ lbs of local beef",
          "Perfect for soups, stews & slow cooking",
          "Freezer-ready — limited fall run"
        ]
      },
      cuts: {
        title: "What's Inside",
        items: [
          "10 lbs Ground Beef (1 lb packs)",
          "3 lbs Stew Beef",
          "1 × Pot Roast (~2.5 lbs)",
          "1 × Chuck Roast (~2.5 lbs)",
          "1 × Rump Roast (~2.5 lbs)"
        ],
        showImages: true
      },
      delivery: {
        title: "Ontario-Wide Delivery",
        content:
          "Delivered direct from St. Isidore Ranch — frozen, vacuum-sealed, and ready for your freezer. Free delivery for most of Southwestern Ontario.",
        icon: "truck"
      },
      promise: {
        title: "Our Promise",
        content:
          "Raised on pasture and finished on grass and hay. No antibiotics, no hormones — just clean, honest beef from our family ranch.",
        guarantee: "Satisfaction guaranteed or your money back."
      },
      howItWorks: {
        title: "How It Works",
        steps: [
          {
            icon: "shopping-cart",
            title: "Reserve Your Box",
            description: "Place your order online to secure your Fall Comfort Box before it sells out."
          },
          {
            icon: "package",
            title: "We Hand-Pack & Freeze",
            description: "We carefully pack and freeze your cuts at peak freshness, ready for delivery."
          },
          {
            icon: "truck",
            title: "Delivered to Your Doorstep",
            description: "Your beef arrives frozen and vacuum-sealed — ready to stock your freezer."
          }
        ]
      },
      testimonials: {
        enabled: true,
        title: "What Families Are Saying"
      },
      story: {
        enabled: false
      },
      newsletter: {
        enabled: true,
        title: "Stay in the Loop",
        subtitle: "Be the first to hear about upcoming seasonal boxes and special offers.",
        ctaText: "Join Our Ranch Newsletter"
      },
      claims: {
        enabled: false
      },
      faq: {
        enabled: false
      },
      whyChooseUs: {
        enabled: false
      },
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
  