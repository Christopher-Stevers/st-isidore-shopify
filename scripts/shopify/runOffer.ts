#!/usr/bin/env node
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { upsertOffer, type OfferConfig } from './upsertOffer';

function parseArgs() {
  const args = process.argv.slice(2);
  const out: { json?: string } = {};
  for (const a of args) {
    if (a.startsWith('--json=')) out.json = a.split('=')[1];
  }
  return out;
}

function fromUnifiedJson(p: string): OfferConfig {
  const full = path.resolve(p);
  const raw = JSON.parse(fs.readFileSync(full, 'utf8')) as any;
  
  // If offerConfig exists, use it directly (it has the full marketing config)
  if (raw.offerConfig) {
    return raw.offerConfig as OfferConfig;
  }
  
  // Otherwise, build from unified config structure
  const cfg: OfferConfig = {
    handle: raw.shopify?.productHandle || raw.campaign?.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: raw.campaign?.name || 'Offer',
    description: raw.ads?.[0]?.primaryText || 'Offer',
    price: String(raw.shopify?.price ?? '0.00'),
    compareAtPrice: raw.offerConfig?.compareAtPrice || undefined,
    campaignName: raw.campaign?.name,
    startDate: raw.campaign?.startTime?.slice(0, 10),
    endDate: raw.campaign?.stopTime?.slice(0, 10),
    targetAudience: raw.adsets?.[0]?.audience ? JSON.stringify(raw.adsets[0].audience) : undefined,
    highlights: raw.shopify?.images ? ['Includes curated selection', 'Ships fast'] : undefined,
    marketingConfig: {
      hero: {
        title: raw.ads?.[0]?.headline,
        subtitle: raw.ads?.[0]?.primaryText,
        ctaText: raw.ads?.[0]?.callToAction || 'Shop Now',
        ctaUrl: raw.shopify?.landingUrl || '/',
        bullets: undefined,
      },
      cuts: {
        title: 'What\'s Inside',
        items: [],
        showImages: true,
      },
    },
  };
  return cfg;
}

async function main() {
  const { json } = parseArgs();
  if (!json) {
    console.error('Usage: npx ts-node scripts/shopify/runOffer.ts --json scripts/meta/campaigns/sample.json');
    process.exit(1);
  }
  const offer = fromUnifiedJson(json);
  console.log(`🚀 Running ${offer.handle} offer...`);
  await upsertOffer(offer);
  console.log('✅ Offer upserted successfully!');
  if (process.env.PUBLIC_STORE_DOMAIN) {
    console.log(`View at: https://${process.env.PUBLIC_STORE_DOMAIN}/offers/${offer.handle}`);
  }
}

main().catch((e) => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});


