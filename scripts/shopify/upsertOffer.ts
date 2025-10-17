#!/usr/bin/env node
/**
 * Script to create or update an offer product in Shopify with metafields
 * 
 * Usage:
 *   npm run shopify:upsert-offer -- --handle=fall-family-beef-sampler --title="Fall Family Beef Sampler"
 * 
 * Or create a .env file with SHOPIFY_ADMIN_API_TOKEN and SHOPIFY_STORE_DOMAIN
 */

import 'dotenv/config';

interface OfferConfig {
  handle: string;
  title: string;
  description?: string;
  price: string;
  compareAtPrice?: string;
  campaignName?: string;
  startDate?: string;
  endDate?: string;
  targetAudience?: string;
  highlights?: string[];
}

const SHOPIFY_ADMIN_API_TOKEN = process.env.PRODUCT_ADMIN_API_TOKEN;
const SHOPIFY_STORE_DOMAIN = process.env.PUBLIC_STORE_DOMAIN;
const SHOPIFY_API_VERSION = process.env.PRIVATE_ADMIN_API_VERSION || '2024-10';

async function upsertOffer(config: OfferConfig) {
  if (!SHOPIFY_ADMIN_API_TOKEN || !SHOPIFY_STORE_DOMAIN) {
    throw new Error(
      'Missing required environment variables: PRIVATE_ADMIN_API_TOKEN and PUBLIC_STORE_DOMAIN'
    );
  }

  const shopifyGraphQLUrl = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

  // First, check if product exists
  const productQuery = `
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
      }
    }
  `;

  const checkResponse = await fetch(shopifyGraphQLUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN,
    },
    body: JSON.stringify({
      query: productQuery,
      variables: {handle: config.handle},
    }),
  });

  const checkData = await checkResponse.json();
  const existingProductId = checkData.data?.productByHandle?.id;

  // Prepare metafields
  const metafields = [
    {
      namespace: 'custom',
      key: 'offer_type',
      value: 'tier1',
      type: 'single_line_text_field',
    },
  ];

  if (config.campaignName) {
    metafields.push({
      namespace: 'custom',
      key: 'campaign_name',
      value: config.campaignName,
      type: 'single_line_text_field',
    });
  }

  if (config.startDate) {
    metafields.push({
      namespace: 'custom',
      key: 'start_date',
      value: config.startDate,
      type: 'date',
    });
  }

  if (config.endDate) {
    metafields.push({
      namespace: 'custom',
      key: 'end_date',
      value: config.endDate,
      type: 'date',
    });
  }

  if (config.targetAudience) {
    metafields.push({
      namespace: 'custom',
      key: 'target_audience',
      value: config.targetAudience,
      type: 'multi_line_text_field',
    });
  }

  if (config.highlights) {
    metafields.push({
      namespace: 'custom',
      key: 'highlights',
      value: JSON.stringify(config.highlights),
      type: 'multi_line_text_field',
    });
  }

  if (existingProductId) {
    // Update existing product
    console.log(`Updating existing product: ${existingProductId}`);

    // First, get the variant ID
    const getVariantQuery = `
      query GetProduct($id: ID!) {
        product(id: $id) {
          id
          variants(first: 1) {
            nodes {
              id
            }
          }
        }
      }
    `;

    const variantQueryResponse = await fetch(shopifyGraphQLUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN,
      },
      body: JSON.stringify({
        query: getVariantQuery,
        variables: {id: existingProductId},
      }),
    });

    const variantQueryData = await variantQueryResponse.json();
    const variantId = variantQueryData.data?.product?.variants?.nodes?.[0]?.id;

    // Update product details and metafields
    const updateMutation = `
      mutation UpdateProduct($input: ProductInput!) {
        productUpdate(input: $input) {
          product {
            id
            handle
            title
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const updateResponse = await fetch(shopifyGraphQLUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN,
      },
      body: JSON.stringify({
        query: updateMutation,
        variables: {
          input: {
            id: existingProductId,
            title: config.title,
            descriptionHtml: config.description || '',
            metafields: metafields,
          },
        },
      }),
    });

    const updateData = await updateResponse.json();

    if (updateData.data?.productUpdate?.userErrors?.length > 0) {
      console.error('Errors:', updateData.data.productUpdate.userErrors);
      throw new Error('Failed to update product');
    }

    console.log('Product updated successfully:', updateData.data?.productUpdate?.product);

    // Now update the variant pricing using REST API
    if (variantId) {
      console.log('Updating variant pricing...');

      // Extract variant ID from GraphQL ID format
      const variantIdNumber = variantId.split('/').pop();
      const restUrl = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/variants/${variantIdNumber}.json`;

      const variantData = {
        variant: {
          id: variantIdNumber,
          price: config.price,
          compare_at_price: config.compareAtPrice,
        },
      };

      const variantUpdateResponse = await fetch(restUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN,
        },
        body: JSON.stringify(variantData),
      });

      const variantUpdateData = await variantUpdateResponse.json();

      if (variantUpdateResponse.ok) {
        console.log('Variant pricing updated successfully:', variantUpdateData.variant);
      } else {
        console.error('Variant Update Errors:', variantUpdateData);
      }
    }
  } else {
    // Create new product
    console.log(`Creating new product with handle: ${config.handle}`);

    const createMutation = `
      mutation CreateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            handle
            title
            variants(first: 1) {
              nodes {
                id
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const createResponse = await fetch(shopifyGraphQLUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN,
      },
      body: JSON.stringify({
        query: createMutation,
        variables: {
          input: {
            handle: config.handle,
            title: config.title,
            descriptionHtml: config.description || '',
            productType: 'Offer',
            vendor: 'St. Isidore Ranch',
            metafields: metafields,
          },
        },
      }),
    });

    const createData = await createResponse.json();

    if (createData.errors) {
      console.error('GraphQL Errors:', createData.errors);
      throw new Error('GraphQL request failed');
    }

    if (createData.data?.productCreate?.userErrors?.length > 0) {
      console.error('User Errors:', createData.data.productCreate.userErrors);
      throw new Error('Failed to create product');
    }

    const createdProduct = createData.data?.productCreate?.product;
    console.log('Product created successfully:', createdProduct);

    // Now update the default variant with pricing
    if (createdProduct?.variants?.nodes?.[0]?.id) {
      const variantId = createdProduct.variants.nodes[0].id;
      console.log('Updating variant pricing...');

      const updateVariantMutation = `
        mutation UpdateVariant($input: ProductVariantInput!) {
          productVariantUpdate(input: $input) {
            productVariant {
              id
              price
              compareAtPrice
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const variantResponse = await fetch(shopifyGraphQLUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN,
        },
        body: JSON.stringify({
          query: updateVariantMutation,
          variables: {
            input: {
              id: variantId,
              price: config.price,
              compareAtPrice: config.compareAtPrice,
              inventoryPolicy: 'CONTINUE',
            },
          },
        }),
      });

      const variantData = await variantResponse.json();

      if (variantData.data?.productVariantUpdate?.userErrors?.length > 0) {
        console.error('Variant Update Errors:', variantData.data.productVariantUpdate.userErrors);
      } else {
        console.log('Variant updated successfully with pricing');
      }
    }
  }
}

// Example usage
const exampleOffer: OfferConfig = {
  handle: 'fall-family-beef-sampler',
  title: 'Fall Family Beef Sampler',
  description:
    '<p>Perfect for families looking to stock their freezer with premium grass-fed beef for the fall season. This curated selection includes our most popular cuts at an incredible value.</p>',
  price: '150.00',
  compareAtPrice: '200.00',
  campaignName: 'Fall Family Special',
  startDate: '2025-10-15',
  endDate: '2025-11-30',
  targetAudience:
    'Perfect for families of 4-6 looking to stock their freezer with premium grass-fed beef for the fall season. Ideal for meal prep and batch cooking.',
  highlights: [
    '10 lbs Premium Ground Beef',
    '5 lbs Ribeye Steaks',
    '3 lbs Chuck Roast',
    '2 lbs Stew Meat',
    'Free Shipping (valued at $50)',
    '100% Grass Fed & Grass Finished',
  ],
};

// Auto-run when executed directly
upsertOffer(exampleOffer)
  .then(() => {
    console.log('✅ Offer upserted successfully!');
    console.log(`\nView at: https://${SHOPIFY_STORE_DOMAIN}/offers/${exampleOffer.handle}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });

export {upsertOffer, type OfferConfig};

