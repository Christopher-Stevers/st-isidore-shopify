#!/usr/bin/env node
/**
 * Script to create metafield definitions in Shopify for offer products
 * This needs to be run once before creating offer products with metafields
 */

import 'dotenv/config';

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
    description: 'Description of target audience for the offer',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Highlights',
    namespace: 'custom',
    key: 'highlights',
    type: 'multi_line_text_field',
    description: 'JSON array of offer highlights',
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
            namespace: definition.namespace,
            key: definition.key,
            type: definition.type,
            description: definition.description,
            ownerType: definition.ownerType,
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

