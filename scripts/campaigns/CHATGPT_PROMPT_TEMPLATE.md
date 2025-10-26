# ChatGPT Prompt Template for Creating New Campaign Configs

Use this prompt template to generate new offer configurations and email campaigns for St. Isidore Ranch.

## Prompt Template

```
You are an expert marketing copywriter and campaign strategist for St. Isidore Ranch, a premium grass-fed beef ranch in Ontario, Canada. 

Create a complete campaign package for: [CAMPAIGN_NAME]

**Campaign Details:**
- Product: [PRODUCT_NAME]
- Season: [SEASON]
- Target Audience: [TARGET_AUDIENCE]
- Price: $[PRICE]
- Compare At Price: $[COMPARE_PRICE]
- Campaign Duration: [START_DATE] to [END_DATE]

**Product Description:**
[PRODUCT_DESCRIPTION]

**Key Selling Points:**
- [POINT_1]
- [POINT_2]
- [POINT_3]
- [POINT_4]

**Cuts/Contents:**
- [CUT_1]
- [CUT_2]
- [CUT_3]
- [CUT_4]
- [CUT_5]

Please create:

1. **config.ts** - Complete TypeScript configuration file with:
   - All product details
   - Marketing configuration with hero, cuts, delivery, promise, howItWorks sections
   - Proper section ordering and enabled/disabled states
   - Seasonal messaging and CTAs

2. **emails.md** - Email campaign sequence with:
   - 5-6 email sequence with proper subjects
   - Frontmatter with campaign metadata
   - Welcome, preparation, delivery, recipe, and follow-up emails
   - Seasonal and product-specific content
   - Clear call-to-actions

3. **adsets/** folder with 4 CSV files:
   - Tier1_Retargeting_SocialProof.csv
   - Tier1_Retargeting_Hypertarget.csv  
   - Tier1_Sales_Warm.csv
   - Tier1_Sales_Cold.csv

**Brand Guidelines:**
- Tone: Warm, family-focused, authentic ranch life
- Values: Grass-fed, local, sustainable, family-owned
- Messaging: Emphasize quality, freshness, convenience, family meals
- CTAs: "Reserve Your Box", "Order Now", "Join Our Ranch Family"
- Delivery: Ontario-wide, frozen, vacuum-sealed
- Guarantee: Satisfaction guaranteed or money back

**Technical Requirements:**
- Handle: kebab-case version of product name
- Campaign Name: [SEASON] [THEME] [PRODUCT_TYPE]
- All prices as strings with 2 decimal places
- Proper TypeScript syntax and exports
- CSV files with proper headers and sample ad data
- Email subjects under 50 characters
- Seasonal and product-specific content throughout

Generate the complete file structure with all three components.
```

## Example Usage

```
You are an expert marketing copywriter and campaign strategist for St. Isidore Ranch, a premium grass-fed beef ranch in Ontario, Canada. 

Create a complete campaign package for: Winter Holiday Beef Box

**Campaign Details:**
- Product: Winter Holiday Beef Box
- Season: Winter/Holiday
- Target Audience: Holiday meal planners and gift buyers
- Price: $249.00
- Compare At Price: $299.00
- Campaign Duration: 2025-11-15 to 2025-12-31

**Product Description:**
A premium holiday beef collection featuring prime cuts perfect for festive gatherings, special dinners, and holiday entertaining. Includes premium steaks, roasts, and ground beef for all your holiday celebrations.

**Key Selling Points:**
- Premium holiday cuts for special occasions
- Perfect for entertaining and gift-giving
- Locally raised & 100% grass-fed
- Delivered frozen and ready for your holiday table

**Cuts/Contents:**
- 4 × Ribeye Steaks (8 oz each)
- 2 × Prime Rib Roasts (~3 lbs each)
- 5 lbs Ground Beef (1 lb packs)
- 2 × Tenderloin Steaks (6 oz each)
- 1 × Beef Wellington Kit

[Continue with the full prompt...]
```

## File Structure Generated

Each campaign will create this structure:
```
scripts/campaigns/[campaign-name]/
├── config.ts
├── emails.md
└── adsets/
    ├── Tier1_Retargeting_SocialProof.csv
    ├── Tier1_Retargeting_Hypertarget.csv
    ├── Tier1_Sales_Warm.csv
    └── Tier1_Sales_Cold.csv
```

## Deployment Command

After generating the files, deploy with:
```bash
npx tsx scripts/offer-deploy.ts \
  --config=./scripts/campaigns/[campaign-name]/config.ts \
  --emails=./scripts/campaigns/[campaign-name]/emails.md \
  --adsets=./scripts/campaigns/[campaign-name]/adsets/
```
