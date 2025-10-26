# Offer Configuration System Documentation

## Overview

The Offer Configuration System is a comprehensive marketing framework that allows for dynamic, metafield-driven marketing pages for Shopify products. The system uses Shopify metafields to store marketing configuration data, enabling flexible and customizable marketing experiences without requiring code changes.

## Architecture

### Core Components

1. **Metafield Definitions** - Schema definitions for all marketing data
2. **GraphQL Queries** - Data fetching from Shopify Storefront API
3. **Parser Functions** - Convert raw metafields to structured configuration
4. **React Components** - Render marketing sections based on configuration
5. **Upsert Scripts** - Create/update products with marketing data

### Namespace Structure

All marketing metafields use the namespace: `app--289113440257--custom`

This ensures proper app scoping and access control in Shopify.

## Marketing Configuration Structure

### Core Offer Metafields

| Metafield | Type | Purpose | Example |
|-----------|------|---------|---------|
| `offer_type` | single_line_text_field | Type of offer (tier1, tier2, etc.) | "tier1" |
| `campaign_name` | single_line_text_field | Marketing campaign name | "Fall Family Beef Sampler" |
| `start_date` | date | Offer start date | "2024-10-01" |
| `end_date` | date | Offer end date | "2024-12-31" |
| `target_audience` | multi_line_text_field | Target audience description | "Families looking for premium beef" |
| `highlights` | multi_line_text_field | Key highlights (JSON array) | ["Premium cuts", "Free shipping"] |

### Hero Section

The hero section is the main banner/header of the marketing page.

| Metafield | Type | Purpose | Example |
|-----------|------|---------|---------|
| `hero_title` | single_line_text_field | Main headline | "Premium Fall Family Beef Sampler" |
| `hero_subtitle` | multi_line_text_field | Supporting text | "Hand-selected cuts for your family" |
| `hero_cta_text` | single_line_text_field | Call-to-action button text | "Order Now" |
| `hero_cta_url` | url | CTA button destination | "/cart" |
| `hero_bullets` | multi_line_text_field | Bullet points (JSON array) | ["Free shipping", "30-day guarantee"] |

### Cuts Section

Displays information about the meat cuts included in the offer.

| Metafield | Type | Purpose | Example |
|-----------|------|---------|---------|
| `cuts_title` | single_line_text_field | Section title | "What's Included" |
| `cuts_items` | multi_line_text_field | List of cuts (JSON array) | ["Ribeye Steaks", "Ground Beef", "Chuck Roast"] |
| `cuts_show_images` | boolean | Whether to display cut images | true |

### Delivery Section

Information about shipping and delivery.

| Metafield | Type | Purpose | Example |
|-----------|------|---------|---------|
| `delivery_title` | single_line_text_field | Section title | "Free Delivery" |
| `delivery_content` | multi_line_text_field | Delivery information | "Free shipping on orders over $100" |
| `delivery_icon` | single_line_text_field | Icon identifier | "truck" |

### Promise Section

Quality guarantees and promises.

| Metafield | Type | Purpose | Example |
|-----------|------|---------|---------|
| `promise_title` | single_line_text_field | Section title | "Our Promise" |
| `promise_content` | multi_line_text_field | Promise description | "100% grass-fed, hormone-free beef" |
| `promise_guarantee` | multi_line_text_field | Guarantee text | "30-day money-back guarantee" |

### How It Works Section

Step-by-step process explanation.

| Metafield | Type | Purpose | Example |
|-----------|------|---------|---------|
| `how_it_works_title` | single_line_text_field | Section title | "How It Works" |
| `how_it_works_steps` | multi_line_text_field | Steps (JSON array) | ["Order online", "We prepare", "Fresh delivery"] |

### Optional Sections

These sections can be enabled/disabled and positioned dynamically.

#### Testimonials Section
- `testimonials_enabled` (boolean) - Whether section is active
- `testimonials_title` (single_line_text_field) - Section title

#### Story Section
- `story_enabled` (boolean) - Whether section is active
- `story_title` (single_line_text_field) - Section title
- `story_content` (multi_line_text_field) - Story content

#### Newsletter Section
- `newsletter_enabled` (boolean) - Whether section is active
- `newsletter_title` (single_line_text_field) - Section title
- `newsletter_subtitle` (multi_line_text_field) - Supporting text
- `newsletter_cta_text` (single_line_text_field) - CTA button text

#### Claims Section
- `claims_enabled` (boolean) - Whether section is active
- `claims_title` (single_line_text_field) - Section title

#### FAQ Section
- `faq_enabled` (boolean) - Whether section is active
- `faq_title` (single_line_text_field) - Section title

#### Why Choose Us Section
- `why_choose_us_enabled` (boolean) - Whether section is active
- `why_choose_us_title` (single_line_text_field) - Section title

### Section Configuration

Each section can be individually controlled for visibility and positioning.

| Metafield Pattern | Type | Purpose | Example |
|-------------------|------|---------|---------|
| `section_{id}_enabled` | boolean | Whether section is visible | `section_hero_enabled` |
| `section_{id}_position` | number_integer | Display order | `section_hero_position` |

**Available Section IDs:**
- `hero` - Hero section
- `cuts` - Cuts section
- `delivery` - Delivery section
- `promise` - Promise section
- `how_it_works` - How it works section
- `testimonials` - Testimonials section
- `story` - Story section
- `newsletter` - Newsletter section
- `claims` - Claims section
- `faq` - FAQ section
- `why_choose_us` - Why choose us section

## Data Types and Formats

### JSON Array Fields

Several fields store JSON arrays for structured data:

- `hero_bullets` - Array of strings for bullet points
- `cuts_items` - Array of strings for cut names
- `how_it_works_steps` - Array of strings for process steps
- `highlights` - Array of strings for key highlights

### Boolean Fields

Boolean fields use string values "true" or "false":
- All `*_enabled` fields
- `cuts_show_images`

### Date Fields

Date fields use ISO format (YYYY-MM-DD):
- `start_date`
- `end_date`

## Usage Examples

### Creating a New Offer

1. **Define the offer configuration** in `scripts/shopify/configs/` directory
2. **Run the metafield definitions setup** (if not already done)
3. **Use the upsert script** to create/update the product with marketing data

### Example Configuration Structure

```typescript
const offerConfig = {
  handle: "fall-family-beef-sampler",
  title: "Fall Family Beef Sampler",
  price: "150.00",
  compareAtPrice: "200.00",
  campaignName: "Fall Family Special",
  startDate: "2024-10-01",
  endDate: "2024-12-31",
  targetAudience: "Families seeking premium beef",
  highlights: ["Premium cuts", "Free shipping", "30-day guarantee"],
  marketingConfig: {
    hero: {
      title: "Premium Fall Family Beef Sampler",
      subtitle: "Hand-selected cuts for your family's table",
      ctaText: "Order Now",
      ctaUrl: "/cart",
      bullets: ["Free shipping", "30-day guarantee", "Premium quality"]
    },
    cuts: {
      title: "What's Included",
      items: ["Ribeye Steaks", "Ground Beef", "Chuck Roast"],
      showImages: true
    },
    delivery: {
      title: "Free Delivery",
      content: "Free shipping on orders over $100",
      icon: "truck"
    },
    promise: {
      title: "Our Promise",
      content: "100% grass-fed, hormone-free beef from local farms",
      guarantee: "30-day money-back guarantee"
    },
    howItWorks: {
      title: "How It Works",
      steps: ["Order online", "We prepare your cuts", "Fresh delivery to your door"]
    },
    sections: [
      { id: "hero", enabled: true, position: 1 },
      { id: "cuts", enabled: true, position: 2 },
      { id: "delivery", enabled: true, position: 3 },
      { id: "promise", enabled: true, position: 4 },
      { id: "how_it_works", enabled: true, position: 5 }
    ]
  }
};
```

## LLM Prompt Template

When using this system with an LLM to generate marketing pages, use this prompt structure:

```
You are a marketing content generator for a beef/meat subscription service. 

Based on the offer configuration data provided, generate a comprehensive marketing page that includes:

1. **Hero Section**: Compelling headline, subtitle, and call-to-action
2. **Cuts Section**: Detailed description of included cuts with benefits
3. **Delivery Section**: Shipping information and guarantees
4. **Promise Section**: Quality guarantees and trust signals
5. **How It Works**: Clear step-by-step process
6. **Optional Sections**: Testimonials, story, newsletter signup, claims, FAQ, why choose us

Use the metafield data to:
- Create engaging, benefit-focused copy
- Maintain consistent brand voice
- Include all specified sections in the correct order
- Use the provided titles and content as foundation
- Expand on bullet points and steps with compelling descriptions
- Create persuasive calls-to-action

Focus on:
- Family-oriented messaging
- Quality and freshness
- Convenience and value
- Trust and reliability
- Local/sustainable farming (if applicable)

Generate HTML structure with appropriate semantic elements and CSS classes for styling.
```

## Technical Implementation

### GraphQL Query Structure

The system fetches metafields using identifiers:

```graphql
metafields(identifiers: [
  {namespace: "app--289113440257--custom", key: "hero_title"},
  {namespace: "app--289113440257--custom", key: "hero_subtitle"},
  # ... all other metafields
]) {
  key
  value
  namespace
}
```

### Parser Function

The `parseMarketingMetafields` function converts raw metafield data into a structured configuration object that React components can consume.

### Component Integration

The `MarketingSystem` component renders sections based on the parsed configuration, respecting enabled/disabled states and positioning.

## Best Practices

1. **Always set all metafields** - Even if empty, to maintain consistent data structure
2. **Use meaningful section positioning** - Start from 1 and increment logically
3. **Keep JSON arrays valid** - Ensure proper JSON formatting for array fields
4. **Test with real data** - Verify metafields are accessible from Storefront API
5. **Maintain fallbacks** - Use default values when metafields are missing
6. **Version control configurations** - Keep offer configs in version control for reproducibility

## Troubleshooting

### Common Issues

1. **Metafields not accessible** - Check namespace format and access permissions
2. **JSON parsing errors** - Validate JSON format in array fields
3. **Missing sections** - Ensure section metafields are properly set
4. **Position conflicts** - Use unique position numbers for sections

### Debug Steps

1. Check browser console for metafield data
2. Verify GraphQL query includes all required metafields
3. Confirm namespace format matches between definition and query
4. Test with minimal configuration first
5. Validate JSON format in array fields

This system provides a flexible, scalable approach to creating dynamic marketing pages that can be easily updated through Shopify's admin interface without requiring code changes.