# 🚀 Offer Config System Guide

## Overview

The Offer Config System is a comprehensive deployment pipeline that automates the creation and management of marketing campaigns across multiple platforms. It takes a single configuration file and generates everything needed to launch a complete marketing campaign.

## System Architecture

```
Input: offerConfig.ts + AdSet_Template.csv
  ↓
Processing Pipeline:
  ├── Shopify Integration (Product + Metafields)
  ├── AdSet Processing (3 ad types per AdSet)
  └── Output Generation
  ↓
Output: Ready-to-deploy campaign assets
```

## Core Components

### 1. **Offer Configuration** (`config.ts`)
The central configuration file that defines all campaign parameters.

### 2. **AdSet Template** (`AdSet_Template.csv`)
A single CSV file containing all AdSets for the campaign.

### 3. **Deployment Script** (`offer-deploy.ts`)
The main orchestration script that processes everything.

## File Structure

```
scripts/campaigns/
├── [campaign-name]/
│   ├── config.ts                    # Main offer configuration
│   └── adsets/
│       └── AdSet_Template.csv       # AdSet definitions
├── OFFER_CONFIG_SYSTEM_GUIDE.md     # This guide
└── CHATGPT_PROMPT_TEMPLATE.md       # ChatGPT generation template
```

## How It Works

### Step 1: Configuration
- Define your offer in `config.ts`
- Create AdSets in `AdSet_Template.csv`
- Run deployment script

### Step 2: Processing
- **Shopify**: Creates/updates product with metafields
- **AdSets**: Generates 3 ad types per AdSet (Carousel, Video, Static)
- **Output**: Single consolidated CSV ready for Meta Ads Manager

### Step 3: Deployment
- Upload consolidated CSV to Meta Ads Manager
- Campaign is ready to launch

## Offer Configuration Schema

```typescript
interface OfferConfig {
  // Basic Info
  title: string;                    // "Fall Comfort Box"
  handle: string;                   // "fall-comfort-box"
  description: string;              // Product description
  price: number;                    // 199.00
  compareAtPrice: number;           // 239.00
  
  // Campaign Info
  campaignName: string;             // "Fall Family Freezer Fill-Up"
  
  // Marketing Content
  headline: string;                 // "Warm Up with the Fall Comfort Box"
  primaryText: string;              // "Perfect for cozy fall meals"
  
  // Product Details
  highlights: string[];             // Key selling points
  features: string[];               // Product features
  ingredients: string[];            // What's included
  
  // Marketing Configuration
  marketingConfig: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    highlights: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    // ... more marketing elements
  };
  
  // SEO & Social
  seoTitle: string;
  seoDescription: string;
  socialImage: string;
  
  // URLs
  url: string;                      // Final offer URL
}
```

## AdSet Template Format

```csv
Campaign Name,Ad Set Name,Ad Name,Headline,Description,Primary Text,Website URL
Fall Family Freezer Fill-Up,Tier1_Retargeting_SocialProof,Ad 1,Headline 1,Description 1,Primary Text 1,https://example.com
Fall Family Freezer Fill-Up,Tier1_Retargeting_SocialProof,Ad 2,Headline 2,Description 2,Primary Text 2,https://example.com
Fall Family Freezer Fill-Up,Tier1_Retargeting_Hypertarget,Ad 1,Headline 1,Description 1,Primary Text 1,https://example.com
```

## Generated Output

### Shopify Integration
- Product created/updated with all metafields
- Pricing configured
- Marketing content uploaded
- SEO metadata set

### AdSet Processing
- **Input**: 1 CSV with 11 AdSets
- **Output**: 1 consolidated CSV with 33 ads (11 × 3 ad types)
- **Ad Types**: Carousel, Video, Static Image for each AdSet

## Usage

```bash
npx tsx scripts/offer-deploy.ts \
  --config=./scripts/campaigns/[campaign-name]/config.ts \
  --adsets=./scripts/campaigns/[campaign-name]/adsets/
```

## ChatGPT Generation Instructions

### For Offer Config Generation

Use this prompt structure with ChatGPT:

```
Create a complete offer configuration for [CAMPAIGN_NAME] following this structure:

1. **Campaign Details**:
   - Title: [Product Name]
   - Handle: [URL-friendly-name]
   - Campaign Name: [Marketing Campaign Name]
   - Price: $[X]
   - Compare At Price: $[Y]

2. **Product Description**:
   - [2-3 sentence product description]
   - Focus on: [key benefits/features]

3. **Marketing Content**:
   - Headline: [Compelling headline]
   - Primary Text: [Supporting text]
   - Highlights: [3-5 key selling points]
   - Features: [Product features list]

4. **Target Audience**:
   - [Primary audience description]
   - [Secondary audience description]

5. **Seasonal Context**:
   - [Season/occasion context]
   - [Why this timing matters]

Generate the complete TypeScript configuration file with all required fields.
```

### For AdSet Template Generation

```
Create an AdSet CSV template for [CAMPAIGN_NAME] with these AdSets:

1. **Tier1_Retargeting_SocialProof** (3 ads)
2. **Tier1_Retargeting_Hypertarget** (2 ads)  
3. **Tier1_Sales_Warm** (4 ads)
4. **Tier1_Sales_Cold** (2 ads)

Each AdSet should have:
- Campaign Name: [CAMPAIGN_NAME]
- Ad Set Name: [AdSet Name]
- Ad Name: Ad 1, Ad 2, etc.
- Headline: [Varied headlines for each ad]
- Description: [Varied descriptions]
- Primary Text: [Varied primary text]
- Website URL: https://example.com (will be replaced)

Generate the complete CSV with proper headers.
```

### For Drip Email Campaign

```
Create a 5-email drip campaign for [CAMPAIGN_NAME] with this structure:

**Email 1: Welcome & What's Inside**
- Subject: [Welcome subject]
- Content: Welcome message + product details + what's included

**Email 2: Preparation Tips**  
- Subject: [Preparation subject]
- Content: Storage tips + cooking suggestions + recipe ideas

**Email 3: Delivery Day**
- Subject: [Delivery subject] 
- Content: Delivery details + what to expect + next steps

**Email 4: First Recipe**
- Subject: [Recipe subject]
- Content: Featured recipe + cooking instructions + tips

**Email 5: Thank You & Feedback**
- Subject: [Thank you subject]
- Content: Feedback request + future offerings + appreciation

Each email should be 2-3 paragraphs with clear value and next steps.
```

## Best Practices

### Offer Configuration
- **Keep titles concise** but descriptive
- **Use compelling headlines** that focus on benefits
- **Include seasonal context** when relevant
- **Highlight unique selling propositions**
- **Use action-oriented language**

### AdSet Creation
- **Vary headlines** across ads in the same AdSet
- **Test different angles** (benefits, features, social proof)
- **Keep descriptions concise** but informative
- **Use emotional triggers** in primary text
- **Include clear calls-to-action**

### Email Campaigns
- **Maintain consistent tone** throughout
- **Provide immediate value** in each email
- **Use storytelling** to engage readers
- **Include clear next steps** in each email
- **End with appreciation** and future value

## Troubleshooting

### Common Issues
1. **Missing required fields** - Check all required properties are present
2. **Invalid URLs** - Ensure URLs are properly formatted
3. **CSV formatting** - Verify proper comma separation and quotes
4. **File paths** - Use correct relative paths for imports

### Validation
- Run the deployment script to validate configuration
- Check console output for any errors
- Verify generated files before uploading to platforms

## Next Steps

1. **Generate Configuration** - Use ChatGPT prompts above
2. **Create Campaign Folder** - Set up directory structure
3. **Add Files** - Place config.ts and AdSet_Template.csv
4. **Deploy** - Run the deployment script
5. **Upload** - Import consolidated CSV to Meta Ads Manager
6. **Launch** - Start your campaign!

---

*This system automates the entire campaign setup process, from configuration to deployment-ready assets. Use the ChatGPT prompts to generate new campaigns quickly and consistently.*
