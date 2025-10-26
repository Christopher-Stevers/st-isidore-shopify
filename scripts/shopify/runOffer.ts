#!/usr/bin/env node
/**
 * Easy offer runner - allows you to specify which offer to run
 * 
 * Usage:
 *   npm run shopify:run-offer -- fall
 *   npm run shopify:run-offer -- summer
 *   npm run shopify:run-offer -- holiday
 */

import 'dotenv/config';
import { upsertOffer } from './upsertOffer';
import offerConfig from './offerConfig';

// Get the offer type from command line arguments



if (!offerConfig) {
  console.error('❌ Error: Invalid offer type');
  console.log('Usage: npm run shopify:run-offer -- [offer-type]');
  process.exit(1);
}

console.log(`🚀 Running ${offerConfig.handle} offer...`);
console.log(`📦 Product: ${offerConfig.title}`);
console.log(`🔗 Handle: ${offerConfig.handle}`);
console.log(`💰 Price: $${offerConfig.price}`);

// Run the offer
upsertOffer(offerConfig)
  .then(() => {
    console.log('✅ Offer upserted successfully!');
    console.log(`\nView at: https://${process.env.PUBLIC_STORE_DOMAIN}/offers/${offerConfig.handle}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
