# 🤖 ChatGPT Campaign Generator Prompts

## Quick Start

Copy and paste these prompts into ChatGPT to generate complete campaign configurations.

---

## 🎯 **Complete Campaign Generation Prompt (Only: Offer Config JSON + 6-Email MD)**

```
I need a single campaign package. Only produce:
- campaign.json (offer config for Shopify + ads creative fields)
- emails.md (6-email marketing series)

1) Output a JSON config (campaign.json) with this EXACT shape. Important: Do NOT invent fields that are controlled by the CSV template (Campaign/Ad Set naming, placements, budgets). Leave them empty or omit them. Only include what’s necessary for creatives and landing URL.
{
    "campaign": {
      "name": "Fall Family Beef Sampler",
      "tier": "T1",
      "objective": "CONVERSIONS",
      "dailyBudget": null,
      "startTime": "2025-10-29",
      "stopTime": "2025-12-15",
      "pageId": "",
      "pixelId": "",
      "tags": ["fall", "sampler", "tier1", "stisidoreranch"]
    },
    "adsets": [
      {
        "name": "",
        "dailyBudget": null,
        "optimizationGoal": "",
        "billingEvent": "",
        "attributionSpec": "",
        "audience": {
          "countries": ["CA"],
          "customAudiences": [],
          "interests": [],
          "genders": [],
          "ageMin": null,
          "ageMax": null
        },
        "placements": {
          "publisherPlatforms": [],
          "facebookPositions": [],
          "instagramPositions": [],
          "devicePlatforms": []
        }
      }
    ],
    "ads": [
      {
        "name": "FallFamilyBeefSampler_Primary",
        "primaryText": "Taste the difference of Ontario grass-fed beef. 15 lb of steaks, roasts & ground beef raised right here on pasture — ready for your freezer.",
        "headline": "Fall Family Beef Sampler – $199",
        "description": "Feed your family better this fall with clean, local beef. Limited boxes left – save ~25 %.",
        "link": "https://stisidoreranch.com/offers/fall-family-beef-sampler",
        "displayLink": "stisidoreranch.com",
        "callToAction": "SHOP_NOW",
        "urlTags": "utm_source=meta&utm_medium=paid&utm_campaign=fall_family_beef_sampler",
        "image": { "source": "./assets/fall_family_sampler.jpg" }
      }
    ],
    "shopify": {
      "landingUrl": "https://stisidoreranch.com/offers/fall-family-beef-sampler",
      "productHandle": "fall-family-beef-sampler",
      "price": "199.00"
    },
    "utm": {
      "source": "meta",
      "medium": "paid",
      "campaign": "fall_family_beef_sampler",
      "content": ""
    },
    "offerConfig": {
      "handle": "fall-family-beef-sampler",
      "title": "Fall Family Beef Sampler",
      "description": "<p>Feed your family better this fall with 15 lb of Ontario grass-fed beef — a balanced mix of steaks, roasts, and ground beef. Honest, local, nutrient-dense food for families who care where their beef comes from.</p>",
      "price": "199.00",
      "compareAtPrice": "265.00",
      "campaignName": "Fall Family Beef Sampler",
      "startDate": "2025-10-29",
      "endDate": "2025-12-15",
      "targetAudience": "Ontario families who value health, transparency, and quality local food.",
      "highlights": [
        "15 lb of 100 % grass-fed Ontario beef",
        "Includes steaks, roasts, ground beef & stew cuts",
        "Raised without hormones or antibiotics",
        "Save ~25 % vs retail"
      ],
      "marketingConfig": {
        "hero": {
          "title": "Taste the Difference in Local Beef",
          "subtitle": "Ontario-raised, grass-fed, family-farmed beef that feeds your family better this fall.",
          "ctaText": "Shop the Sampler",
          "ctaUrl": "/cart",
          "bullets": [
            "Freezer-friendly 15 lb box",
            "Perfect for family meals",
            "Limited fall availability"
          ]
        },
        "cuts": {
          "title": "What's Inside",
          "items": [
            "6 lb Ground Beef",
            "NY Strip Steaks (2 × 5 oz)",
            "Sirloin Steak (12 oz)",
            "Sirloin Tip Steak (12 oz)",
            "2.5 lb Cross Rib Roast",
            "2.5 lb Blade Roast",
            "2 lb Stew Meat",
            "0.5 lb Shank Bones"
          ],
          "showImages": true
        },
        "delivery": {
          "title": "Delivery",
          "content": "Delivered direct from our Ontario ranch to your freezer — vacuum-sealed & frozen solid.",
          "icon": "truck"
        },
        "promise": {
          "title": "Our Promise",
          "content": "We raise every animal with care and transparency — no feedlots, no shortcuts, just real beef.",
          "guarantee": "Love your beef or we’ll make it right."
        },
        "howItWorks": {
          "title": "How It Works",
          "steps": [
            { "icon": "shopping-cart", "title": "Order Online", "description": "Reserve your sampler from our ranch." },
            { "icon": "package", "title": "We Pack Fresh", "description": "Cuts are vacuum-sealed and flash-frozen at peak freshness." },
            { "icon": "truck", "title": "Delivered to You", "description": "Arrives frozen solid and ready for your freezer." }
          ]
        },
        "testimonials": { "enabled": true, "title": "What Families Are Saying" },
        "story": {
          "enabled": true,
          "title": "Our Story",
          "content": "At St Isidore Ranch, we believe families deserve to know their farmer. We raise cattle on pasture and deliver food you can trust."
        },
        "newsletter": { "enabled": false, "title": "", "subtitle": "", "ctaText": "" },
        "claims": { "enabled": false, "title": "" },
        "faq": { "enabled": false, "title": "" },
        "whyChooseUs": { "enabled": false, "title": "" },
        "sections": [
          { "id": "hero", "enabled": true, "position": 1 },
          { "id": "cuts", "enabled": true, "position": 2 },
          { "id": "delivery", "enabled": true, "position": 3 },
          { "id": "promise", "enabled": true, "position": 4 },
          { "id": "how_it_works", "enabled": true, "position": 5 },
          { "id": "testimonials", "enabled": true, "position": 6 },
          { "id": "story", "enabled": true, "position": 7 }
        ]
      }
    }
  }
  

Rules:
- Do NOT populate template-controlled fields (Campaign/Ad Set naming, placements, budgets) unless explicitly provided.
- Ad creative should match the tier intent (per the Value Ladder PDF).

2) Output a 6-email marketing series (emails.md) with sections:
   - Email 1: Welcome & What’s Inside
   - Email 2: Preparation + Storage Tips
   - Email 3: Delivery Day + What to Expect
   - Email 4: First Recipe (detailed)
   - Email 5: Social Proof + FAQs
   - Email 6: Final Reminder + Offer Close
Each email should include subject, preview line, body with headings, and a clear CTA linking to the landing URL.

3) Keep campaigns limited to those in the DTC Rancher CSV template. No extra archetypes.

Return BOTH files: campaign.json and emails.md.
```

---

## 📋 **Individual Component Prompts (Updated for Unified Config + Emails)**

### **Offer + Ads Unified Config Generator**

```
Generate:
1) campaign.json (machine config matching the schema above)
2) emails.md (6-email series as specified)

Inputs you can assume:
- Product: [PRODUCT_NAME], Price: $[PRICE], Compare At: $[COMPARE_PRICE]
- Tier: T0/T1/T23/T45, Objective: TRAFFIC/LEADS/CONVERSIONS
- Audience: [AUDIENCE_DESCRIPTION]
- Landing page URL: https://example.com/pages/[handle]

Ensure creative fields (primary text, headline, description), landing URL, and CTA are complete. Keep campaigns limited to those in the DTC Rancher CSV template. Include strong CTAs and links in emails.

### Shopify section requirements (must be present in campaign.json)
- shopify.landingUrl: Full URL to the offer landing page (https://...)
- shopify.productHandle: URL-safe handle for the product (used as SKU/handle)
- shopify.price: Price (number or string, e.g., 199 or "199.00")
- Do NOT include images here (images are handled separately)

Also include the full OfferConfig shape (except images) to drive Shopify upload:
- handle (string) – same as shopify.productHandle
- title (string) – product title
- description (string) – rich product description (HTML allowed)
- price (string) – e.g., "199.00"
- compareAtPrice (string, optional)
- campaignName (string, optional)
- startDate, endDate (YYYY-MM-DD, optional)
- targetAudience (string, optional)
- highlights (string[], optional)

- marketingConfig (object, optional):
  - hero: { title, subtitle, ctaText, ctaUrl, bullets[] }
  - cuts: { title, items[], showImages }
  - delivery: { title, content, icon }
  - promise: { title, content, guarantee }
  - howItWorks: { title, steps[{ icon, title, description }] }
  - testimonials: { enabled, title }
  - story: { enabled, title, content }
  - newsletter: { enabled, title, subtitle, ctaText }
  - claims: { enabled, title }
  - faq: { enabled, title }
  - whyChooseUs: { enabled, title }
  - sections: [{ id, enabled, position }]

These fields map directly to Shopify product fields and metafields used by the uploader. If any are unknown, include the key with an empty string or reasonable default (e.g., enabled: false).
```

### Example minimal compliant campaign.json (copy-paste ready)

```json
{
  "campaign": {
    "name": "Starter Bundle",
    "tier": "T1",
    "objective": "CONVERSIONS",
    "dailyBudget": 50,
    "startTime": "2025-11-01T08:00:00Z",
    "stopTime": "",
    "pageId": "",
    "pixelId": "",
    "tags": []
  },
  "adsets": [
    {
      "name": "Default",
      "dailyBudget": null,
      "lifetimeBudget": null,
      "timeStart": "",
      "timeStop": "",
      "optimizationGoal": "",
      "billingEvent": "",
      "bidAmount": null,
      "attributionSpec": "",
      "audience": {
        "countries": ["CA"],
        "customAudiences": [],
        "interests": [],
        "genders": [],
        "ageMin": null,
        "ageMax": null
      },
      "placements": {
        "publisherPlatforms": [],
        "facebookPositions": [],
        "instagramPositions": [],
        "devicePlatforms": []
      }
    }
  ],
  "ads": [
    {
      "name": "Primary",
      "primaryText": "Taste the difference of Ontario grass-fed beef. Fresh, local, and raised right.",
      "headline": "Starter Bundle – Limited Spots",
      "description": "Farm-to-table quality. Perfect for busy weeknights.",
      "link": "https://example.com/pages/starter-bundle",
      "displayLink": "",
      "callToAction": "SHOP_NOW",
      "urlTags": "",
      "image": { "source": "https://cdn.example.com/creative/starter-01.jpg" }
    }
  ],
  "shopify": {
    "landingUrl": "https://example.com/pages/starter-bundle",
    "productHandle": "starter-bundle",
    "price": 199
  },
  "utm": {
    "source": "meta",
    "medium": "paid",
    "campaign": "Starter_Bundle",
    "content": ""
  }
}
```

### **Meta CSV Generator Prompt (DTC Rancher Template)**

```
Using the campaign.json, produce rows that match the headers and structure of our template at scripts/meta/DTC Rancher_Value Ladder_Meta Ads Template.csv. Only include campaign archetypes present in the template. Do not invent new columns.
```

### **Drip Email Campaign Generator**

```
Create a 6-email marketing sequence for [CAMPAIGN_NAME] that nurtures leads toward purchase (not fulfillment). Include soft storytelling hooks about the ranch where appropriate.

General rules:
- Each email must include: Subject, Preview line, Body with 3–5 short sections, 1 primary CTA linking to the landing URL, and a P.S. (optional).
- Keep copy skimmable with short paragraphs, bullets, and bold key phrases.
- Include optional placeholders for farm storytelling blocks where noted.

Email structure:
**Email 1: Welcome + Brand Story (Top-of-Funnel)**
- Subject: [Warm welcome + curiosity]
- Preview: [Promise of value + what’s coming]
- Content:
  - Who we are and what we stand for (grass-fed, local, transparent)
  - Placeholder: [FARM_STORY_SNIPPET – origin story, family values]
  - Core benefit to reader (taste, health, trust)
  - CTA: Discover the offer

**Email 2: Problem → Solution (Education/Authority)**
- Subject: [Common problem your beef solves]
- Preview: [Benefit-led teaser]
- Content: 
  - Identify 1–2 pain points (quality, sourcing, price predictability)
  - Your method: pasture-based, no hormones/antibiotics
  - Placeholder: [FARM_PRACTICES_BLOCK – grazing, stewardship]
  - CTA: See how the bundle works

**Email 3: Social Proof + Proof of Quality**
- Subject: [Customer results/testimonials]
- Preview: [Highlight a specific win]
- Content:
  - 2–3 short testimonials or reviews
  - Quality/process proof (butcher, quick-freeze, vacuum seal)
  - Placeholder: [PHOTO_CALLOUT – family on ranch or herd]
  - CTA: Browse the starter bundle

**Email 4: Education + Light Recipe Inspiration**
- Subject: [Quick dinner wins / simple cooking approach]
- Preview: [Ease + taste]
- Content:
  - 1 simple versatile recipe concept (no fulfillment steps)
  - Storage/meal-planning tip for busy families
  - Reiterate value of the bundle (variety + savings)
  - CTA: Start with the entry bundle

**Email 5: Offer Breakdown + Objection Handling**
- Subject: [What you get + why it’s worth it]
- Preview: [Savings + convenience]
- Content:
  - Bullet list of inclusions/benefits
  - Tackle 2–3 common objections (cost, delivery, cooking skill)
  - Placeholder: [RANCHER_NOTE – personal note from Chris]
  - CTA: Reserve your box

**Email 6: Urgency + Last Chance**
- Subject: [Deadline or limited spots]
- Preview: [Don’t miss out]
- Content:
  - Restate key benefits quickly
  - Reason to act now (limited inventory/seasonal)
  - Risk reversal (guarantee/quality promise)
  - CTA: Claim your spot today

Tone: [FRIENDLY/CONFIDENT/DOWN-TO-EARTH]
Brand Voice: [AUTHENTIC_RANCHER]
CTAs: Clear, single action per email

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
