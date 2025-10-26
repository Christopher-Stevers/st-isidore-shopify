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
import offerConfig from './offerConfig';

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
  // Marketing configuration
  marketingConfig?: {
    hero?: {
      title?: string;
      subtitle?: string;
      ctaText?: string;
      ctaUrl?: string;
      bullets?: string[];
    };
    cuts?: {
      title?: string;
      items?: string[];
      showImages?: boolean;
    };
    delivery?: {
      title?: string;
      content?: string;
      icon?: string;
    };
    promise?: {
      title?: string;
      content?: string;
      guarantee?: string;
    };
    howItWorks?: {
      title?: string;
      steps?: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
    };
    testimonials?: {
      enabled: boolean;
      title?: string;
    };
    story?: {
      enabled: boolean;
      title?: string;
      content?: string;
    };
    newsletter?: {
      enabled: boolean;
      title?: string;
      subtitle?: string;
      ctaText?: string;
    };
    claims?: {
      enabled: boolean;
      title?: string;
    };
    faq?: {
      enabled: boolean;
      title?: string;
    };
    whyChooseUs?: {
      enabled: boolean;
      title?: string;
    };
    sections?: Array<{
      id: string;
      enabled: boolean;
      position: number;
    }>;
  };
}

const SHOPIFY_ADMIN_API_TOKEN = process.env.PRODUCT_ADMIN_API_TOKEN;
const SHOPIFY_STORE_DOMAIN = process.env.PUBLIC_STORE_DOMAIN;
const SHOPIFY_API_VERSION = process.env.PRIVATE_ADMIN_API_VERSION || '2024-10';

// Helper function to create metafields with proper access settings
function createMetafield(namespace: string, key: string, value: string, type: string) {
  return {
    namespace,
    key,
    value,
    type,
  };
}

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

  // Prepare metafields - always set core offer metafields
  const metafields = [
    createMetafield('$app:custom', 'offer_type', 'tier1', 'single_line_text_field'),
  ];

  // Always set campaign metafields (use provided values or defaults)
  metafields.push(createMetafield('$app:custom', 'campaign_name', config.campaignName || '', 'single_line_text_field'));
  metafields.push(createMetafield('$app:custom', 'start_date', config.startDate || '', 'date'));
  metafields.push(createMetafield('$app:custom', 'end_date', config.endDate || '', 'date'));
  metafields.push(createMetafield('$app:custom', 'target_audience', config.targetAudience || '', 'multi_line_text_field'));
  metafields.push(createMetafield('$app:custom', 'highlights', config.highlights ? JSON.stringify(config.highlights) : '[]', 'multi_line_text_field'));

  // Marketing configuration metafields - always set all marketing metafields
  if (config.marketingConfig) {
    const marketing = config.marketingConfig;

    // Hero section - always set all hero metafields
    metafields.push(createMetafield('$app:custom', 'hero_title', marketing.hero?.title || '', 'single_line_text_field'));
    metafields.push(createMetafield('$app:custom', 'hero_subtitle', marketing.hero?.subtitle || '', 'multi_line_text_field'));
    metafields.push(createMetafield('$app:custom', 'hero_cta_text', marketing.hero?.ctaText || '', 'single_line_text_field'));
    metafields.push(createMetafield('$app:custom', 'hero_cta_url', marketing.hero?.ctaUrl ? (marketing.hero.ctaUrl.startsWith('http') ? marketing.hero.ctaUrl : `https://${process.env.PUBLIC_STORE_DOMAIN}${marketing.hero.ctaUrl}`) : 'https://example.com', 'url'));
    metafields.push(createMetafield('$app:custom', 'hero_bullets', marketing.hero?.bullets ? JSON.stringify(marketing.hero.bullets) : '[]', 'multi_line_text_field'));

    // Cuts section - always set all cuts metafields
    metafields.push(createMetafield('$app:custom', 'cuts_title', marketing.cuts?.title || '', 'single_line_text_field'));
    metafields.push(createMetafield('$app:custom', 'cuts_items', marketing.cuts?.items ? JSON.stringify(marketing.cuts.items) : '[]', 'multi_line_text_field'));
    metafields.push(createMetafield('$app:custom', 'cuts_show_images', marketing.cuts?.showImages ? 'true' : 'false', 'boolean'));

    // Delivery section - always set all delivery metafields
    metafields.push(createMetafield('$app:custom', 'delivery_title', marketing.delivery?.title || '', 'single_line_text_field'));
    metafields.push(createMetafield('$app:custom', 'delivery_content', marketing.delivery?.content || '', 'multi_line_text_field'));
    metafields.push(createMetafield('$app:custom', 'delivery_icon', marketing.delivery?.icon || '', 'single_line_text_field'));

    // Promise section - always set all promise metafields
    metafields.push(createMetafield('$app:custom', 'promise_title', marketing.promise?.title || '', 'single_line_text_field'));
    metafields.push(createMetafield('$app:custom', 'promise_content', marketing.promise?.content || '', 'multi_line_text_field'));
    metafields.push(createMetafield('$app:custom', 'promise_guarantee', marketing.promise?.guarantee || '', 'multi_line_text_field'));

    // How It Works section - always set all how it works metafields
    metafields.push(createMetafield('$app:custom', 'how_it_works_title', marketing.howItWorks?.title || '', 'single_line_text_field'));
    metafields.push(createMetafield('$app:custom', 'how_it_works_steps', marketing.howItWorks?.steps ? JSON.stringify(marketing.howItWorks.steps) : '[]', 'multi_line_text_field'));

    // Testimonials section - always set all testimonials metafields
    metafields.push(createMetafield('$app:custom', 'testimonials_enabled', marketing.testimonials?.enabled ? 'true' : 'false', 'boolean'));
    metafields.push(createMetafield('$app:custom', 'testimonials_title', marketing.testimonials?.title || '', 'single_line_text_field'));

    // Story section - always set all story metafields
    metafields.push(createMetafield('$app:custom', 'story_enabled', marketing.story?.enabled ? 'true' : 'false', 'boolean'));
    metafields.push(createMetafield('$app:custom', 'story_title', marketing.story?.title || '', 'single_line_text_field'));
    metafields.push(createMetafield('$app:custom', 'story_content', marketing.story?.content || '', 'multi_line_text_field'));

    // Newsletter section - always set all newsletter metafields
    metafields.push(createMetafield('$app:custom', 'newsletter_enabled', marketing.newsletter?.enabled ? 'true' : 'false', 'boolean'));
    metafields.push(createMetafield('$app:custom', 'newsletter_title', marketing.newsletter?.title || '', 'single_line_text_field'));
    metafields.push(createMetafield('$app:custom', 'newsletter_subtitle', marketing.newsletter?.subtitle || '', 'multi_line_text_field'));
    metafields.push(createMetafield('$app:custom', 'newsletter_cta_text', marketing.newsletter?.ctaText || '', 'single_line_text_field'));

    // Section configuration - always set section metafields
    if (marketing.sections) {
      // Set individual section enabled/position metafields
      for (const section of marketing.sections) {
        metafields.push(createMetafield('$app:custom', `section_${section.id}_enabled`, section.enabled ? 'true' : 'false', 'boolean'));
        metafields.push(createMetafield('$app:custom', `section_${section.id}_position`, section.position.toString(), 'number_integer'));
      }
    }

    // Always set claims, FAQ, and whyChooseUs metafields
    metafields.push(createMetafield('$app:custom', 'claims_enabled', marketing.claims?.enabled ? 'true' : 'false', 'boolean'));
    metafields.push(createMetafield('$app:custom', 'claims_title', marketing.claims?.title || '', 'single_line_text_field'));

    metafields.push(createMetafield('$app:custom', 'faq_enabled', marketing.faq?.enabled ? 'true' : 'false', 'boolean'));
    metafields.push(createMetafield('$app:custom', 'faq_title', marketing.faq?.title || '', 'single_line_text_field'));

    metafields.push(createMetafield('$app:custom', 'why_choose_us_enabled', marketing.whyChooseUs?.enabled ? 'true' : 'false', 'boolean'));
    metafields.push(createMetafield('$app:custom', 'why_choose_us_title', marketing.whyChooseUs?.title || '', 'single_line_text_field'));
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


// Auto-run when executed directly
if (process.argv[1] && process.argv[1].endsWith('upsertOffer.ts')) {
  upsertOffer(offerConfig)
    .then(() => {
      console.log('✅ Offer upserted successfully!');
      console.log(`\nView at: https://${SHOPIFY_STORE_DOMAIN}/offers/${offerConfig.handle}`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error:', error.message);
      process.exit(1);
    });
}

export {upsertOffer, type OfferConfig};

