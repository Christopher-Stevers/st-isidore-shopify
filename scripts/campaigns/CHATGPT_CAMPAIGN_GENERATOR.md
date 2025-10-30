# 🤖 ChatGPT Campaign Generator Prompts

## Quick Start

Copy and paste these prompts into ChatGPT to generate complete campaign configurations.

---

## 🎯 **Complete Campaign Generation Prompt**

```
I need you to create a complete marketing campaign configuration for [CAMPAIGN_NAME]. 

**Campaign Details:**
- Product: [PRODUCT_NAME]
- Price: $[PRICE]
- Compare At: $[COMPARE_PRICE]
- Season/Occasion: [SEASON/OCCASION]
- Target Audience: [AUDIENCE_DESCRIPTION]

**What I need:**
1. Complete TypeScript offer configuration (config.ts)
2. AdSet CSV template with 4 AdSets
3. 5-email drip campaign (emails.md)

**AdSets needed:**
- Tier1_Retargeting_SocialProof (3 ads)
- Tier1_Retargeting_Hypertarget (2 ads)
- Tier1_Sales_Warm (4 ads)
- Tier1_Sales_Cold (2 ads)

**Email sequence:**
- Email 1: Welcome & What's Inside
- Email 2: Preparation Tips
- Email 3: Delivery Day
- Email 4: First Recipe
- Email 5: Thank You & Feedback

Generate all three files with complete, production-ready content.
```

---

## 📋 **Individual Component Prompts**

### **Offer Configuration Generator**

```
Create a TypeScript offer configuration for [CAMPAIGN_NAME] following this EXACT structure:

```typescript
const offerConfig = {
  // Basic Product Info
  handle: "[URL_FRIENDLY_NAME]",                    // e.g., "fall-comfort-box"
  title: "[PRODUCT_NAME]",                          // e.g., "Fall Comfort Box"
  description: "[2-3 sentence product description]",
  price: "[PRICE]",                                 // e.g., "199.00"
  compareAtPrice: "[COMPARE_PRICE]",                // e.g., "239.00"
  
  // Campaign Details
  campaignName: "[MARKETING_CAMPAIGN_NAME]",        // e.g., "Fall Family Freezer Fill-Up"
  startDate: "[START_DATE]",                        // e.g., "2025-10-01"
  endDate: "[END_DATE]",                            // e.g., "2025-12-15"
  targetAudience: "[AUDIENCE_DESCRIPTION]",
  
  // Product Highlights
  highlights: [
    "[Key selling point 1]",
    "[Key selling point 2]",
    "[Key selling point 3]",
    "[Key selling point 4]"
  ],
  
  // Marketing Configuration Object
  marketingConfig: {
    hero: {
      title: "[MAIN_HEADLINE]",
      subtitle: "[SUPPORTING_SUBTITLE]",
      ctaText: "[CALL_TO_ACTION_TEXT]",
      ctaUrl: "/cart",
      bullets: [
        "[Bullet point 1]",
        "[Bullet point 2]",
        "[Bullet point 3]"
      ]
    },
    cuts: {
      title: "What's Inside",
      items: [
        "[Item 1 with quantity]",
        "[Item 2 with quantity]",
        "[Item 3 with quantity]",
        "[Item 4 with quantity]",
        "[Item 5 with quantity]"
      ],
      showImages: true
    },
    delivery: {
      title: "[DELIVERY_TITLE]",
      content: "[Delivery description and details]",
      icon: "truck"
    },
    promise: {
      title: "Our Promise",
      content: "[Quality promise and guarantees]",
      guarantee: "[Satisfaction guarantee text]"
    },
    howItWorks: {
      title: "How It Works",
      steps: [
        {
          icon: "shopping-cart",
          title: "[Step 1 Title]",
          description: "[Step 1 description]"
        },
        {
          icon: "package",
          title: "[Step 2 Title]",
          description: "[Step 2 description]"
        },
        {
          icon: "truck",
          title: "[Step 3 Title]",
          description: "[Step 3 description]"
        }
      ]
    },
    testimonials: {
      enabled: true,
      title: "What [CUSTOMERS] Are Saying"
    },
    story: {
      enabled: false
    },
    newsletter: {
      enabled: true,
      title: "Stay in the Loop",
      subtitle: "[Newsletter signup subtitle]",
      ctaText: "[Newsletter CTA text]"
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
```

**Campaign Details:**
- Product: [PRODUCT_NAME]
- Price: $[PRICE] / Compare At: $[COMPARE_PRICE]
- Season/Occasion: [SEASON/OCCASION]
- Target Audience: [AUDIENCE_DESCRIPTION]

**Required Content:**
- Compelling hero section with title, subtitle, and CTA
- Detailed "What's Inside" section with specific items
- Delivery information and promises
- 3-step "How It Works" process
- Appropriate section enablement for your campaign type

Generate the complete config.ts file with all placeholders filled in with campaign-specific content.
```

### **AdSet Template Generator**

```
Create an AdSet CSV template for [CAMPAIGN_NAME] with these specifications:

**Campaign Name:** [CAMPAIGN_NAME]
**Website URL:** https://example.com (will be replaced)

**AdSets needed:**
1. **Tier1_Retargeting_SocialProof** (3 ads)
   - Focus: Social proof, testimonials, reviews
   - Headlines: Benefit-focused, trust-building
   
2. **Tier1_Retargeting_Hypertarget** (2 ads)
   - Focus: Specific targeting, personalization
   - Headlines: Personalized, targeted messaging
   
3. **Tier1_Sales_Warm** (4 ads)
   - Focus: Warm audience, product benefits
   - Headlines: Feature-focused, value-driven
   
4. **Tier1_Sales_Cold** (2 ads)
   - Focus: Cold audience, broad appeal
   - Headlines: Problem-solving, attention-grabbing

**For each ad, provide:**
- Varied headlines (different angles)
- Compelling descriptions
- Engaging primary text
- Clear value propositions

Generate the complete CSV with proper headers and varied content for each ad.
```

### **Drip Email Campaign Generator**

```
Create a 5-email drip campaign for [CAMPAIGN_NAME] with this structure:

**Email 1: Welcome & What's Inside**
- Subject: [Welcome subject line]
- Content: 
  - Welcome message and excitement
  - Detailed product breakdown
  - What's included in the box
  - Next steps and timeline

**Email 2: Preparation Tips**
- Subject: [Preparation subject line]
- Content:
  - Storage and handling tips
  - Cooking suggestions and ideas
  - Recipe recommendations
  - Preparation timeline

**Email 3: Delivery Day**
- Subject: [Delivery subject line]
- Content:
  - Delivery confirmation and details
  - What to expect when it arrives
  - Immediate next steps
  - Contact information for questions

**Email 4: First Recipe**
- Subject: [Recipe subject line]
- Content:
  - Featured recipe with full instructions
  - Cooking tips and techniques
  - Serving suggestions
  - Additional recipe ideas

**Email 5: Thank You & Feedback**
- Subject: [Thank you subject line]
- Content:
  - Appreciation and gratitude
  - Feedback request
  - Future offerings preview
  - Community and social sharing

**Tone:** [FRIENDLY/PROFESSIONAL/CASUAL]
**Brand Voice:** [BRAND_PERSONALITY]
**Call-to-Actions:** Clear and specific

Generate the complete emails.md file with frontmatter and all email content.
```

---

## 🎨 **Customization Prompts**

### **For Different Industries**

**Food/Meal Kits:**
```
Focus on: Freshness, convenience, family meals, health benefits
Tone: Warm, family-oriented, health-conscious
Keywords: Fresh, convenient, family, healthy, delicious
```

**Beauty/Wellness:**
```
Focus on: Self-care, luxury, results, ingredients
Tone: Empowering, luxurious, results-driven
Keywords: Glowing, radiant, self-care, premium, results
```

**Fitness/Health:**
```
Focus on: Performance, results, motivation, community
Tone: Motivational, energetic, supportive
Keywords: Strong, fit, energy, performance, community
```

### **For Different Seasons**

**Holiday Campaigns:**
```
Focus on: Gifting, celebration, limited time, special occasions
Tone: Festive, exclusive, urgent
Keywords: Gift, holiday, limited, special, celebration
```

**Summer Campaigns:**
```
Focus on: Fresh, light, outdoor, seasonal
Tone: Energetic, fresh, outdoor-focused
Keywords: Fresh, summer, light, outdoor, seasonal
```

**Fall/Winter Campaigns:**
```
Focus on: Comfort, warmth, cozy, seasonal
Tone: Warm, comforting, cozy
Keywords: Comfort, warm, cozy, seasonal, hearty
```

---

## 🔧 **Technical Requirements**

### **File Naming Conventions**
- Config: `config.ts`
- AdSets: `AdSet_Template.csv`
- Emails: `emails.md`

### **Required Fields**
- All TypeScript interfaces must be complete
- CSV must have proper headers
- Emails must have frontmatter

### **Content Guidelines**
- Headlines: 25-40 characters
- Descriptions: 90-125 characters
- Primary Text: 125-150 characters
- Email Subject: 30-50 characters

---

## 📝 **Example Usage**

1. **Copy the main prompt**
2. **Replace bracketed placeholders** with your campaign details
3. **Paste into ChatGPT**
4. **Request all three files**
5. **Save files** in your campaign folder
6. **Run deployment script**

---

*Use these prompts to generate complete, production-ready campaign configurations in minutes!*
