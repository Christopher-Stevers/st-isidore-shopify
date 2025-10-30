#!/usr/bin/env node
/**
 * Comprehensive Offer Deploy System
 * 
 * Handles:
 * 1. Shopify offer upload with metafields
 * 2. Drip workflow creation
 * 3. Multiple AdSet CSV processing for Meta Ads Manager
 * 
 * Usage:
 *   npm run offer:deploy -- --json=./scripts/meta/campaigns/sample.json --md=./scripts/campaigns/CHATGPT_CAMPAIGN_GENERATOR.md --template="./scripts/meta/DTC Rancher_Value Ladder_Meta Ads Template.csv"
 */

const irrelevantColumns=[]/* = [
  'Billing Event',
  'Optimization Goal',
  'Additional Call To Action 5',
  'Additional Call To Action 6',
  'Additional Call To Action 7',
  'Additional Call To Action 8',
  'Additional Call To Action 9',
  'Call to Action Link',
  'Call to Action WhatsApp Number',
  'Additional Custom Tracking Specs',
  'Video Retargeting',
  'Lead Form ID',
  'Permalink',
  'Force Single Link',
  'Format Option',
  'Dynamic Ad Voice',
  'Creative Optimization',
  'Template URL',
  'Android App Name',
  'Android Package Name',
  'Deep Link For Android',
  'Facebook App ID',
  'iOS App Name',
  'iOS App Store ID',
  'Deep Link For iOS',
  'iPad App Name',
  'iPad App Store ID',
  'Deep Link For iPad',
  'iPhone App Name',
  'iPhone App Store ID',
  'Deep Link For iPhone',
  'Deep link to website',
  'Windows Store ID',
  'Windows App Name',
  'Deep Link For Windows Phone',
  'Add End Card',
  'Dynamic Ads Ad Context',
  'Page Welcome Message',
  'App Destination',
  'App Destination Page ID',
  'Use Page as Actor',
  'Image Overlay Template',
  'Image Overlay Text Type',
  'Image Overlay Text Font',
  'Image Overlay Position',
  'Image Overlay Theme Color',
  'Image Overlay Float With Margin',
  'Image Layer 1 - layer_type',
  'Image Layer 1 - image_source',
  'Image Layer 1 - overlay_shape',
  'Image Layer 1 - text_font',
  'Image Layer 1 - shape_color',
  'Image Layer 1 - text_color',
  'Image Layer 1 - content_type',
  'Image Layer 1 - price',
  'Image Layer 1 - low_price',
  'Image Layer 1 - high_price',
  'Image Layer 1 - frame_source',
  'Image Layer 1 - frame_image_hash',
  'Image Layer 1 - scale',
  'Image Layer 1 - blending_mode',
  "Campaign Start Time",
  "Campaign Stop Time",
  "",
 
 'Zip', 'Addresses', 'Geo Markets (DMA)', 'Global Regions', 'Large Geo Areas', 'Medium Geo Areas',
 'Small Geo Areas', 'Metro Areas', 'Neighborhoods', 'Subneighborhoods', 'Subcities', 'Location Types',
 'Location Cluster IDs', 'Location Set IDs', 'Excluded Countries', 'Excluded Cities', 'Excluded Large Geo Areas',
 'Excluded Medium Geo Areas', 'Excluded Metro Areas', 'Excluded Small Geo Areas', 'Excluded Subcities',
 'Excluded Neighborhoods', 'Excluded Subneighborhoods', 'Excluded Regions', 'Excluded Electoral Districts',
 'Excluded Zip', 'Excluded Addresses', 'Excluded Geo Markets (DMA)', 'Excluded Global Regions',
 'Excluded Location Cluster IDs', 'Gender', 'Age Min', 'Age Max', 'Education Status', 'Fields of Study',
 'Education Schools', 'Work Job Titles', 'Work Employers', 'College Start Year', 'College End Year',
 'Interested In', 'Relationship', 'Family Statuses', 'Industries', 'Life Events', 'Income',
 'Multicultural Affinity', 'Household Composition', 'Behaviors', 'Connections', 'Excluded Connections',
 'Friends of Connections', 'Locales', 'Site Category', 'Unified Interests', 'Excluded User AdClusters',
 'Broad Category Clusters', 'Targeting Categories - ALL OF', 'Custom Audiences', 'Excluded Custom Audiences',
 'Flexible Inclusions', 'Flexible Exclusions', 'Advantage Audience', 'Age Range', 'Targeting Optimization',
 'Targeting Relaxation', 'Product Audience Specs', 'Excluded Product Audience Specs', 'Targeted Business Locations',
 'Dynamic Audiences', 'Excluded Dynamic Audiences', 'Beneficiary', 'Payer', 'Publisher Platforms',
 'Facebook Positions', 'Instagram Positions', 'Audience Network Positions', 'Oculus Positions', 'Device Platforms',
 'User Device', 'Excluded User Device', 'User Operating System', 'User OS Version', 'Wireless Carrier',
 'Excluded Publisher Categories', 'Brand Safety Inventory Filtering Levels', 'Attribution Spec', 'Bid Amount',
 'Ad Set Bid Strategy', 'Regional Regulated Categories',
 'Beneficiary (financial ads in Australia)', 'Payer (financial ads in Australia)',
 'Beneficiary (financial ads in Taiwan)', 'Payer (financial ads in Taiwan)',
 'Beneficiary (Taiwan)', 'Payer (Taiwan)', 'Beneficiary (Singapore)', 'Payer (Singapore)',
 'Beneficiary (securities ads in India)', 'Payer (securities ads in India)',
 'Beneficiary (selected locations)', 'Payer (selected locations)', 'Story ID', 'Ad ID', 'Ad Status',
  // 'Preview Link', 'Instagram Preview Link'
];*/

import 'dotenv/config';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
// Import modules
import { upsertOffer, type OfferConfig } from './shopify/upsertOffer';
import { validateConfig, type UnifiedConfig } from './meta/schema';
import { readTemplateHeader, writeCsv } from './meta/csv';
import { mapToCsvRows } from './meta/map';

interface DeployOptions {
  json: string; // unified config json path
  md?: string; // optional md brief to copy
  template?: string; // csv header template path
}

// No-op retained to keep structure; CSV is generated directly from unified config
async function cleanupAdSetDirectory(): Promise<void> { return; }

interface DeployResult {
  shopify: {
    success: boolean;
    productId?: string;
    url?: string;
  };
  csv: {
    success: boolean;
    outputFile?: string;
  };
}

async function parseArguments(): Promise<DeployOptions> {
  // Support both --flag=value and --flag value
  const argv = process.argv.slice(2);
  const options: Partial<DeployOptions> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--json=')) options.json = arg.split('=')[1];
    else if (arg === '--json') options.json = argv[++i];
    else if (arg.startsWith('--md=')) options.md = arg.split('=')[1];
    else if (arg === '--md') options.md = argv[++i];
    else if (arg.startsWith('--template=')) options.template = arg.split('=')[1];
    else if (arg === '--template') options.template = argv[++i];
  }

  if (!options.json) {
    console.error('❌ Missing required arguments');
    console.log('Usage: npx tsx scripts/offer-deploy.ts --json ./scripts/meta/campaigns/sample.json [--md ./scripts/campaigns/campaign.md] [--template "./scripts/meta/DTC Rancher_Value Ladder_Meta Ads Template.csv"]');
    process.exit(1);
  }

  return options as DeployOptions;
}

function toOfferConfig(unified: UnifiedConfig): OfferConfig {
  return {
    handle: unified.shopify.productHandle || unified.campaign.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: unified.campaign.name,
    description: unified.ads?.[0]?.primaryText || unified.campaign.name,
    price: String(unified.shopify.price ?? '0.00'),
    compareAtPrice: undefined,
    campaignName: unified.campaign.name,
    startDate: unified.campaign.startTime?.slice(0,10),
    endDate: unified.campaign.stopTime?.slice(0,10),
    targetAudience: unified.adsets?.[0]?.audience ? JSON.stringify(unified.adsets[0].audience) : undefined,
    highlights: unified.shopify.images?.length ? ['Includes curated selection','Ships fast'] : undefined,
    marketingConfig: {
      hero: {
        title: unified.ads?.[0]?.headline,
        subtitle: unified.ads?.[0]?.primaryText,
        ctaText: unified.ads?.[0]?.callToAction || 'Shop Now',
        ctaUrl: unified.shopify.landingUrl,
      },
      cuts: { title: "What's Inside", items: [], showImages: true },
    },
  };
}


async function deployOffer(options: DeployOptions): Promise<DeployResult> {
  console.log('🚀 Starting comprehensive offer deployment...\n');

  const result: DeployResult = {
    shopify: { success: false },
    csv: { success: false }
  };

  try {
    // 1. Load unified JSON
    console.log('📋 Loading unified campaign JSON...');
    const unifiedRaw = await fs.readFile(path.resolve(options.json), 'utf8');
    const unified = validateConfig(JSON.parse(unifiedRaw));
    console.log(`✅ Loaded: ${unified.campaign.name}`);

    // 2. Upload to Shopify
  //  console.log('\n🛒 Uploading offer to Shopify...');
  //  try {
  //    const offerConfig = toOfferConfig(unified);
  //    await upsertOffer(offerConfig);
  //    result.shopify.success = true;
  //    result.shopify.url = `https://${process.env.PUBLIC_STORE_DOMAIN}/offers/${offerConfig.handle}`;
  //    console.log(`✅ Shopify product created: ${offerConfig.title}`);
  //  } catch (error) {
  //    console.error('❌ Shopify upload failed:', error);
  //    result.shopify.success = false;
  //  }

    // 3. Generate Meta CSV from unified config
    console.log('\n📊 Generating Meta CSV...');
    try {
      // Prefer template at scripts/ root; fallback to scripts/meta/
      const rootTemplate = path.resolve(path.join('scripts', 'DTC Rancher_Value Ladder_Meta Ads Template.csv'));
      const metaTemplate = path.resolve(path.join('scripts','meta','DTC Rancher_Value Ladder_Meta Ads Template.csv'));
      const chosenTemplate = options.template
        ? path.resolve(options.template)
        : (await fs.stat(rootTemplate).then(() => rootTemplate).catch(() => metaTemplate));
      const rawHeader = readTemplateHeader(chosenTemplate);
      const header = rawHeader.filter((h) => !irrelevantColumns.includes(h));
      const rows = mapToCsvRows(header, unified, chosenTemplate);
      const outDir = path.resolve('scripts');
      await fs.mkdir(outDir, { recursive: true });
      const outCsv = path.join(outDir, 'import.csv');
      writeCsv(header, rows, outCsv);
      result.csv.success = true;
      result.csv.outputFile = outCsv;
      console.log(`✅ CSV written: ${outCsv}`);
    } catch (error) {
      console.error('❌ CSV generation failed:', error);
      result.csv.success = false;
    }

    // 4. Copy JSON and MD to top-level scripts
    const scriptsRoot = path.resolve('scripts');
    await fs.mkdir(scriptsRoot, { recursive: true });
    const destJson = path.join(scriptsRoot, 'campaign.json');
    await fs.copyFile(path.resolve(options.json), destJson);
    if (options.md) {
      const destMd = path.join(scriptsRoot, 'campaign.md');
      await fs.copyFile(path.resolve(options.md), destMd);
    }

    return result;

  } catch (error) {
    console.error('❌ Deployment failed:', error);
    throw error;
  }
}

function printSummary(result: DeployResult) {
  console.log('\n' + '='.repeat(60));
  console.log('📋 DEPLOYMENT SUMMARY');
  console.log('='.repeat(60));

  // Shopify status
  console.log(`\n🛒 Shopify: ${result.shopify.success ? '✅ Success' : '❌ Failed'}`);
  if (result.shopify.success && result.shopify.url) {
    console.log(`   View at: ${result.shopify.url}`);
  }


  // CSV status
  console.log(`\n📊 Meta CSV: ${result.csv.success ? '✅ Success' : '❌ Failed'}`);
  if (result.csv.success && result.csv.outputFile) {
    console.log(`   File: ${result.csv.outputFile}`);
    console.log('   Import in Meta Ads Manager → Create → Import From File');
  }

  console.log('\n' + '='.repeat(60));
}

async function main() {
  try {
    const options = await parseArguments();
    const result = await deployOffer(options);
    printSummary(result);

    // Exit with appropriate code
    const allSuccessful = result.shopify.success && result.csv.success;
    process.exit(allSuccessful ? 0 : 1);

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (process.argv[1] && process.argv[1].endsWith('offer-deploy.ts')) {
  main().catch(console.error);
}

export { deployOffer, type DeployOptions, type DeployResult };
