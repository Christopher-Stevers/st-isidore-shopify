#!/usr/bin/env node
/**
 * Script to create metafield definitions in Shopify for offer products
 * This needs to be run once before creating offer products with metafields
 */

import 'dotenv/config';
import { AdminApiClient } from '@shopify/admin-api-client';
const SHOPIFY_ADMIN_API_TOKEN = process.env.PRODUCT_ADMIN_API_TOKEN;
const SHOPIFY_STORE_DOMAIN = process.env.PUBLIC_STORE_DOMAIN;
const SHOPIFY_API_VERSION = process.env.PRIVATE_ADMIN_API_VERSION || '2024-10';

interface MetafieldDefinition {
  name: string;
  namespace: string;
  key: string;
  type: string;
  description: string;
  ownerType: string;
}

const METAFIELD_DEFINITIONS: MetafieldDefinition[] = [
  // Core offer metafields
  {
    name: 'Offer Type',
    namespace: 'custom',
    key: 'offer_type',
    type: 'single_line_text_field',
    description: 'Type of offer (e.g., tier1, tier2)',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Campaign Name',
    namespace: 'custom',
    key: 'campaign_name',
    type: 'single_line_text_field',
    description: 'Marketing campaign name',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Start Date',
    namespace: 'custom',
    key: 'start_date',
    type: 'date',
    description: 'Offer start date',
    ownerType: 'PRODUCT',
  },
  {
    name: 'End Date',
    namespace: 'custom',
    key: 'end_date',
    type: 'date',
    description: 'Offer end date',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Target Audience',
    namespace: 'custom',
    key: 'target_audience',
    type: 'multi_line_text_field',
    description: 'Target audience description',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Highlights',
    namespace: 'custom',
    key: 'highlights',
    type: 'multi_line_text_field',
    description: 'Key highlights of the offer',
    ownerType: 'PRODUCT',
  },
  // Hero section
  {
    name: 'Hero Title',
    namespace: 'custom',
    key: 'hero_title',
    type: 'single_line_text_field',
    description: 'Main hero section title',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Hero Subtitle',
    namespace: 'custom',
    key: 'hero_subtitle',
    type: 'multi_line_text_field',
    description: 'Hero section subtitle',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Hero CTA Text',
    namespace: 'custom',
    key: 'hero_cta_text',
    type: 'single_line_text_field',
    description: 'Hero call-to-action text',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Hero CTA URL',
    namespace: 'custom',
    key: 'hero_cta_url',
    type: 'url',
    description: 'Hero call-to-action URL',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Hero Bullets',
    namespace: 'custom',
    key: 'hero_bullets',
    type: 'multi_line_text_field',
    description: 'Hero section bullet points',
    ownerType: 'PRODUCT',
  },
  // Cuts section
  {
    name: 'Cuts Title',
    namespace: 'custom',
    key: 'cuts_title',
    type: 'single_line_text_field',
    description: 'Cuts section title',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Cuts Items',
    namespace: 'custom',
    key: 'cuts_items',
    type: 'multi_line_text_field',
    description: 'List of cuts included',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Cuts Show Images',
    namespace: 'custom',
    key: 'cuts_show_images',
    type: 'boolean',
    description: 'Whether to show cut images',
    ownerType: 'PRODUCT',
  },
  // Delivery section
  {
    name: 'Delivery Title',
    namespace: 'custom',
    key: 'delivery_title',
    type: 'single_line_text_field',
    description: 'Delivery section title',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Delivery Content',
    namespace: 'custom',
    key: 'delivery_content',
    type: 'multi_line_text_field',
    description: 'Delivery section content',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Delivery Icon',
    namespace: 'custom',
    key: 'delivery_icon',
    type: 'single_line_text_field',
    description: 'Delivery section icon',
    ownerType: 'PRODUCT',
  },
  // Promise section
  {
    name: 'Promise Title',
    namespace: 'custom',
    key: 'promise_title',
    type: 'single_line_text_field',
    description: 'Promise section title',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Promise Content',
    namespace: 'custom',
    key: 'promise_content',
    type: 'multi_line_text_field',
    description: 'Promise section content',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Promise Guarantee',
    namespace: 'custom',
    key: 'promise_guarantee',
    type: 'multi_line_text_field',
    description: 'Promise guarantee text',
    ownerType: 'PRODUCT',
  },
  // How It Works section
  {
    name: 'How It Works Title',
    namespace: 'custom',
    key: 'how_it_works_title',
    type: 'single_line_text_field',
    description: 'How it works section title',
    ownerType: 'PRODUCT',
  },
  {
    name: 'How It Works Steps',
    namespace: 'custom',
    key: 'how_it_works_steps',
    type: 'multi_line_text_field',
    description: 'How it works steps',
    ownerType: 'PRODUCT',
  },
  // Testimonials section
  {
    name: 'Testimonials Enabled',
    namespace: 'custom',
    key: 'testimonials_enabled',
    type: 'boolean',
    description: 'Whether testimonials section is enabled',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Testimonials Title',
    namespace: 'custom',
    key: 'testimonials_title',
    type: 'single_line_text_field',
    description: 'Testimonials section title',
    ownerType: 'PRODUCT',
  },
  // Story section
  {
    name: 'Story Enabled',
    namespace: 'custom',
    key: 'story_enabled',
    type: 'boolean',
    description: 'Whether story section is enabled',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Story Title',
    namespace: 'custom',
    key: 'story_title',
    type: 'single_line_text_field',
    description: 'Story section title',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Story Content',
    namespace: 'custom',
    key: 'story_content',
    type: 'multi_line_text_field',
    description: 'Story section content',
    ownerType: 'PRODUCT',
  },
  // Newsletter section
  {
    name: 'Newsletter Enabled',
    namespace: 'custom',
    key: 'newsletter_enabled',
    type: 'boolean',
    description: 'Whether newsletter section is enabled',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Newsletter Title',
    namespace: 'custom',
    key: 'newsletter_title',
    type: 'single_line_text_field',
    description: 'Newsletter section title',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Newsletter Subtitle',
    namespace: 'custom',
    key: 'newsletter_subtitle',
    type: 'multi_line_text_field',
    description: 'Newsletter section subtitle',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Newsletter CTA Text',
    namespace: 'custom',
    key: 'newsletter_cta_text',
    type: 'single_line_text_field',
    description: 'Newsletter call-to-action text',
    ownerType: 'PRODUCT',
  },
  // Claims section
  {
    name: 'Claims Enabled',
    namespace: 'custom',
    key: 'claims_enabled',
    type: 'boolean',
    description: 'Whether claims section is enabled',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Claims Title',
    namespace: 'custom',
    key: 'claims_title',
    type: 'single_line_text_field',
    description: 'Claims section title',
    ownerType: 'PRODUCT',
  },
  // FAQ section
  {
    name: 'FAQ Enabled',
    namespace: 'custom',
    key: 'faq_enabled',
    type: 'boolean',
    description: 'Whether FAQ section is enabled',
    ownerType: 'PRODUCT',
  },
  {
    name: 'FAQ Title',
    namespace: 'custom',
    key: 'faq_title',
    type: 'single_line_text_field',
    description: 'FAQ section title',
    ownerType: 'PRODUCT',
  },
  // Why Choose Us section
  {
    name: 'Why Choose Us Enabled',
    namespace: 'custom',
    key: 'why_choose_us_enabled',
    type: 'boolean',
    description: 'Whether why choose us section is enabled',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Why Choose Us Title',
    namespace: 'custom',
    key: 'why_choose_us_title',
    type: 'single_line_text_field',
    description: 'Why choose us section title',
    ownerType: 'PRODUCT',
  },
  // Section configuration
  {
    name: 'Hero Section Enabled',
    namespace: 'custom',
    key: 'section_hero_enabled',
    type: 'boolean',
    description: 'Whether hero section is enabled',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Hero Section Position',
    namespace: 'custom',
    key: 'section_hero_position',
    type: 'number_integer',
    description: 'Hero section position',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Cuts Section Enabled',
    namespace: 'custom',
    key: 'section_cuts_enabled',
    type: 'boolean',
    description: 'Whether cuts section is enabled',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Cuts Section Position',
    namespace: 'custom',
    key: 'section_cuts_position',
    type: 'number_integer',
    description: 'Cuts section position',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Delivery Section Enabled',
    namespace: 'custom',
    key: 'section_delivery_enabled',
    type: 'boolean',
    description: 'Whether delivery section is enabled',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Delivery Section Position',
    namespace: 'custom',
    key: 'section_delivery_position',
    type: 'number_integer',
    description: 'Delivery section position',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Promise Section Enabled',
    namespace: 'custom',
    key: 'section_promise_enabled',
    type: 'boolean',
    description: 'Whether promise section is enabled',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Promise Section Position',
    namespace: 'custom',
    key: 'section_promise_position',
    type: 'number_integer',
    description: 'Promise section position',
    ownerType: 'PRODUCT',
  },
  {
    name: 'How It Works Section Enabled',
    namespace: 'custom',
    key: 'section_how_it_works_enabled',
    type: 'boolean',
    description: 'Whether how it works section is enabled',
    ownerType: 'PRODUCT',
  },
  {
    name: 'How It Works Section Position',
    namespace: 'custom',
    key: 'section_how_it_works_position',
    type: 'number_integer',
    description: 'How it works section position',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Testimonials Section Position',
    namespace: 'custom',
    key: 'section_testimonials_position',
    type: 'number_integer',
    description: 'Testimonials section position',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Claims Section Position',
    namespace: 'custom',
    key: 'section_claims_position',
    type: 'number_integer',
    description: 'Claims section position',
    ownerType: 'PRODUCT',
  },
  {
    name: 'FAQ Section Position',
    namespace: 'custom',
    key: 'section_faq_position',
    type: 'number_integer',
    description: 'FAQ section position',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Why Choose Us Section Position',
    namespace: 'custom',
    key: 'section_why_choose_us_position',
    type: 'number_integer',
    description: 'Why choose us section position',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Story Section Position',
    namespace: 'custom',
    key: 'section_story_position',
    type: 'number_integer',
    description: 'Story section position',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Newsletter Section Position',
    namespace: 'custom',
    key: 'section_newsletter_position',
    type: 'number_integer',
    description: 'Newsletter section position',
    ownerType: 'PRODUCT',
  },
];

async function setupMetafieldDefinitions() {
  if (!SHOPIFY_ADMIN_API_TOKEN || !SHOPIFY_STORE_DOMAIN) {
    throw new Error(
      'Missing required environment variables: PRODUCT_ADMIN_API_TOKEN and PUBLIC_STORE_DOMAIN'
    );
  }

  const shopifyGraphQLUrl = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

  console.log('Creating metafield definitions...\n');

  for (const definition of METAFIELD_DEFINITIONS) {
    console.log(`Creating: ${definition.name} (${definition.namespace}.${definition.key})`);

    const mutation = `
      mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
        metafieldDefinitionCreate(definition: $definition) {
          createdDefinition {
            id
            name
            namespace
            key
            type {
              name
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;


    
    const response = await fetch(shopifyGraphQLUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          definition: {
            name: definition.name,
            namespace: `$app:${definition.namespace}`,
            key: definition.key,
            type: definition.type,
            description: definition.description,
            ownerType: definition.ownerType,
            access: {
              storefront: "PUBLIC_READ",
              admin: "MERCHANT_READ_WRITE",
            },
          },
        },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('  ❌ GraphQL Errors:', data.errors[0]?.message);
      continue;
    }

    if (data.data?.metafieldDefinitionCreate?.userErrors?.length > 0) {
      const error = data.data.metafieldDefinitionCreate.userErrors[0];
      if (error.message.includes('taken')) {
        console.log('  ✓ Already exists');
      } else {
        console.error('  ❌ Error:', error.message);
      }
    } else {
      console.log('  ✅ Created successfully');
    }
  }

  console.log('\n✅ Metafield definitions setup complete!');
}

// Auto-run
setupMetafieldDefinitions()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });

export {setupMetafieldDefinitions};

