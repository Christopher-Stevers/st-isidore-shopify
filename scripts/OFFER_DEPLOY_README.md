# Offer Deploy System

A comprehensive automation system for deploying offers across Shopify, Drip, and Meta Ads Manager.

## Overview

The Offer Deploy system handles:
1. **Shopify**: Upload offer products with metafields
2. **Drip**: Create email workflows and campaigns
3. **Meta Ads Manager**: Process multiple AdSet CSV files with auto-injected campaign data

## Usage

```bash
# Direct execution (recommended)
npx tsx scripts/offer-deploy.ts \
  --config=./scripts/shopify/configs/fall-comfort-box.ts \
  --emails=./campaigns/fall-comfort-box-emails.md \
  --adsets=./exports/adsets/

# Or using npm script (if arguments pass through correctly)
npm run offer:deploy -- \
  --config=./scripts/shopify/configs/fall-comfort-box.ts \
  --emails=./campaigns/fall-comfort-box-emails.md \
  --adsets=./exports/adsets/
```

## Required Environment Variables

### Shopify
```bash
PRODUCT_ADMIN_API_TOKEN=your_shopify_admin_token
PUBLIC_STORE_DOMAIN=stisidoreranch.myshopify.com
PRIVATE_ADMIN_API_VERSION=2024-10
```

### Drip
```bash
DRIP_API_KEY=your_drip_api_key
DRIP_ACCOUNT_ID=your_drip_account_id
DRIP_SEGMENT_ID=your_drip_segment_id  # optional
```

### Meta (Future Expansion)
```bash
FB_AD_ACCOUNT_ID=your_fb_ad_account_id  # optional
```

## File Structure

```
scripts/
├── offer-deploy.ts              # Main deployment script
├── shopify/
│   ├── upsertOffer.ts          # Shopify product management
│   └── configs/
│       └── fall-comfort-box.ts # Example offer configuration
├── drip/
│   └── uploadWorkflow.ts       # Drip workflow management
└── meta/
    └── generateAdCsv.ts        # Meta AdSet CSV processing

campaigns/
└── fall-comfort-box-emails.md  # Email content with frontmatter

exports/
└── adsets/                     # AdSet CSV files
    ├── Tier1_Retargeting_SocialProof.csv
    ├── Tier1_Retargeting_Hypertarget.csv
    ├── Tier1_Sales_Warm.csv
    └── Tier1_Sales_Cold.csv
```

## Offer Configuration

Create offer configurations in `scripts/shopify/configs/`:

```typescript
const offerConfig = {
  handle: "fall-comfort-box",
  title: "Fall Comfort Box",
  description: "A cozy fall assortment...",
  price: "199.00",
  compareAtPrice: "239.00",
  campaignName: "Fall Family Freezer Fill-Up",
  startDate: "2025-10-01",
  endDate: "2025-12-15",
  targetAudience: "Families and meal preppers...",
  highlights: [
    "Perfect for cozy fall meals",
    "Slow-cooker friendly roasts & stew beef",
    "Locally raised & 100% grass-fed",
    "Delivered freezer-ready to your door"
  ],
  marketingConfig: {
    hero: {
      title: "Warm Up with the Fall Comfort Box",
      subtitle: "Ground beef, stew beef, and roasts...",
      ctaText: "Reserve Your Box",
      ctaUrl: "/cart",
      bullets: [
        "15+ lbs of local beef",
        "Perfect for soups, stews & slow cooking",
        "Freezer-ready — limited fall run"
      ]
    },
    // ... additional marketing configuration
  }
};

export default offerConfig;
```

## Email Content

Create email campaigns in `campaigns/` using Markdown with frontmatter:

```markdown
---
title: "Fall Comfort Box Email Campaign"
description: "Email sequence for the Fall Comfort Box offer"
---

# Fall Comfort Box Email Campaign

## Email 1 - Welcome & Introduction

Subject: Welcome to the Fall Comfort Box! 🍂

Welcome to the Fall Comfort Box family! 

We're thrilled you've joined us for this special seasonal offering...

---

## Email 2 - Preparation Tips

Subject: Getting Ready for Your Fall Comfort Box 📦

Your Fall Comfort Box is being prepared! Here are some tips...
```

## AdSet CSV Processing

Place your AdSet CSV files in `exports/adsets/`. The system will:

1. **Auto-inject campaign data**:
   - Campaign Name → `offerConfig.campaignName`
   - Ad Set Name → filename stem (e.g., "Tier1_Retargeting_SocialProof")
   - Ad Name → `${offerConfig.title} | ${AdSetName}`
   - Website URL → `https://stisidoreranch.com/offers/${offerConfig.handle}`

2. **Auto-inject ad content**:
   - Headline → `offerConfig.marketingConfig.hero.title`
   - Description → `offerConfig.marketingConfig.hero.subtitle`
   - Primary Text → first entry of `offerConfig.highlights`

3. **Generate prepared files**:
   - Input: `Tier1_Retargeting_SocialProof.csv`
   - Output: `Tier1_Retargeting_SocialProof-prepared.csv`

## Example Output

```
🚀 Starting comprehensive offer deployment...

📋 Loading offer configuration...
✅ Loaded: Fall Comfort Box (fall-comfort-box)

🛒 Uploading offer to Shopify...
✅ Shopify product created: Fall Comfort Box

📧 Uploading workflow to Drip...
✅ Drip workflow created: "Fall Family Freezer Fill-Up"

📊 Processing AdSet CSVs...
📊 Found 4 CSV files to process
✅ Processed: Tier1_Retargeting_SocialProof.csv → Tier1_Retargeting_SocialProof-prepared.csv
✅ Processed: Tier1_Retargeting_Hypertarget.csv → Tier1_Retargeting_Hypertarget-prepared.csv
✅ Processed: Tier1_Sales_Warm.csv → Tier1_Sales_Warm-prepared.csv
✅ Processed: Tier1_Sales_Cold.csv → Tier1_Sales_Cold-prepared.csv
✅ AdSet CSVs processed successfully

============================================================
📋 DEPLOYMENT SUMMARY
============================================================

🛒 Shopify: ✅ Success
   View at: https://stisidoreranch.myshopify.com/offers/fall-comfort-box

📧 Drip: ✅ Success
   Workflow ID: 12345

📊 AdSets: ✅ Success
   Processed Files:
   • Tier1_Retargeting_SocialProof.csv → Tier1_Retargeting_SocialProof-prepared.csv
   • Tier1_Retargeting_Hypertarget.csv → Tier1_Retargeting_Hypertarget-prepared.csv
   • Tier1_Sales_Warm.csv → Tier1_Sales_Warm-prepared.csv
   • Tier1_Sales_Cold.csv → Tier1_Sales_Cold-prepared.csv

   All files linked under campaign: "Fall Family Freezer Fill-Up"
   Ready for import into Ads Manager!

============================================================
```

## Dependencies

The system requires these additional packages:
- `gray-matter` - Parse frontmatter from email content
- `csv-parse` - Parse CSV files
- `node-fetch` - HTTP requests for Drip API

## Error Handling

The system includes comprehensive error handling:
- Individual module failures don't stop the entire deployment
- Detailed error messages for troubleshooting
- Graceful fallbacks for missing configuration
- Validation of required environment variables

## Future Enhancements

- Meta Ads Manager API integration
- Automated CSV upload to Facebook
- Campaign performance tracking
- A/B testing support
- Multi-language support
