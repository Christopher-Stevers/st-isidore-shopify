# Tier 1 Offer Implementation - Fall Family Beef Sampler

This document describes the implementation of dynamic offer pages in the Hydrogen storefront.

## Overview

The offer system allows you to create special landing pages for marketing campaigns that showcase products with custom messaging, pricing, and timeline information using Shopify product metafields.

## Architecture

### Routes
- **`app/routes/offers.$handle.tsx`**: Dynamic route for offer pages
  - Accessible at `/offers/[product-handle]`
  - Example: `/offers/fall-family-beef-sampler`

### Components
- **`app/components/offer/OfferHero.tsx`**: Hero section with image, title, pricing, and CTA
- **`app/components/offer/OfferDetails.tsx`**: Detailed information, highlights, and trust badges

### GraphQL
- **`app/lib/offerQuery.ts`**: Query for fetching product data with offer metafields

## Shopify Setup

### Required Metafields

Set up the following custom metafields in your Shopify admin for products that will be used as offers:

| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| `custom` | `offer_type` | Single line text | Type of offer (e.g., "tier1") |
| `custom` | `campaign_name` | Single line text | Marketing campaign name |
| `custom` | `start_date` | Date | Offer start date (ISO format) |
| `custom` | `end_date` | Date | Offer end date (ISO format) |
| `custom` | `target_audience` | Multi-line text | Description of target audience |
| `custom` | `highlights` | Multi-line text | JSON array or comma-separated list of highlights |

### Creating an Offer

1. **Create or select a product** in Shopify admin
2. **Set the product handle** to match your desired URL (e.g., `fall-family-beef-sampler`)
3. **Add offer metafields**:
   ```
   offer_type: tier1
   campaign_name: Fall Family Special
   start_date: 2025-10-15T09:00:00-04:00
   end_date: 2025-11-30T23:59:59-05:00
   target_audience: Perfect for families looking to stock their freezer with premium grass-fed beef
   highlights: ["10 lbs ground beef", "5 lbs ribeye steaks", "3 lbs chuck roast", "Free shipping"]
   ```

4. **Set up pricing**:
   - Set the regular price as the variant price
   - Set the compare at price to show savings

5. **Add a featured image** that will display in the hero section

## Usage

### Creating a New Offer

1. Create the product in Shopify with all required metafields
2. The offer will automatically be available at `/offers/[product-handle]`
3. No code changes needed!

### Marketing Campaign Integration

The offer URL can be used in:
- Meta Ads campaigns
- Email marketing
- Social media posts
- Direct links

Example URL structure:
```
https://your-domain.com/offers/fall-family-beef-sampler
```

### Campaign Tracking

Add UTM parameters for tracking:
```
https://your-domain.com/offers/fall-family-beef-sampler?utm_source=facebook&utm_medium=cpc&utm_campaign=tier1_fall_sampler
```

## Example: Fall Family Beef Sampler

### Product Setup
- **Handle**: `fall-family-beef-sampler`
- **Price**: $150.00
- **Compare at Price**: $200.00 (25% savings)
- **Campaign Name**: "Fall Family Special"
- **Target Audience**: "Perfect for families looking to stock their freezer with premium grass-fed beef for the fall season"
- **Highlights**:
  ```json
  [
    "10 lbs Premium Ground Beef",
    "5 lbs Ribeye Steaks",
    "3 lbs Chuck Roast",
    "2 lbs Stew Meat",
    "Free Shipping (valued at $50)",
    "100% Grass Fed & Grass Finished"
  ]
  ```

### Meta Ads Campaign
- **Campaign Name**: Tier1 – Fall Family Beef Sampler
- **Objective**: Sales/Conversions
- **Daily Budget**: $25
- **Target**: Toronto area, families interested in healthy eating
- **Landing Page**: `/offers/fall-family-beef-sampler`

## Customization

### Styling
- Components use Tailwind CSS classes
- Primary color uses `primary-*` utility classes
- Modify `app/components/offer/*.tsx` for custom layouts

### Additional Fields
To add more metafields:
1. Add to `OFFER_QUERY` in `app/lib/offerQuery.ts`
2. Extract in loader in `app/routes/offers.$handle.tsx`
3. Display in components

### Trust Badges
Edit the trust badges section in `OfferDetails.tsx` to match your brand messaging.

## SEO

The offer pages include:
- Dynamic meta titles and descriptions from product data
- Structured product information
- Proper heading hierarchy
- Semantic HTML

## Performance

- Images are optimized using Shopify's Image CDN
- Data is fetched server-side for fast initial load
- Responsive design for all devices

## Testing

Test your offer pages:
1. Create a test product with offer metafields
2. Visit `/offers/[test-product-handle]`
3. Verify all information displays correctly
4. Test add to cart functionality
5. Check responsive design on mobile

## Troubleshooting

### Offer page returns 404
- Verify the product exists in Shopify
- Check that the product handle matches the URL
- Ensure the product is published and available

### Metafields not displaying
- Verify metafields are set in Shopify admin
- Check namespace is "custom"
- Ensure GraphQL query includes the metafield keys

### Images not loading
- Verify product has a featured image
- Check image URL is accessible
- Test Shopify CDN connectivity

