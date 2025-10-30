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
 *   npm run offer:deploy -- --config=./scripts/shopify/configs/fall-comfort-box.ts --emails=./campaigns/fall-comfort-box-emails.md --adsets=./exports/adsets/
 */

import 'dotenv/config';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
// Import modules
import { upsertOffer, type OfferConfig } from './shopify/upsertOffer';
import { processAdSetCsvs } from './meta/generateAdCsv';

interface DeployOptions {
  config: string;
  adsets?: string;
  tier?: string; // e.g., "Tier1", "Tier2"
}

async function cleanupAdSetDirectory(adsetsPath: string): Promise<void> {
  try {
    console.log('🧹 Performing comprehensive cleanup of AdSet directory...');
    const allFiles = await fs.readdir(adsetsPath);
    
    // Find all files that should be deleted (only generated files, not original templates)
    const filesToDelete = allFiles.filter(file => 
      file.includes('-prepared') || 
      file.includes('-generated') ||
      file.includes('-processed')
    );
    
    for (const fileToDelete of filesToDelete) {
      try {
        await fs.unlink(path.join(adsetsPath, fileToDelete));
        console.log(`🗑️  Removed: ${fileToDelete}`);
      } catch (error) {
        console.log(`⚠️  Could not remove ${fileToDelete}:`, error);
      }
    }
    
    if (filesToDelete.length > 0) {
      console.log(`✅ Cleaned up ${filesToDelete.length} previously generated files`);
    } else {
      console.log('✅ No files to clean up');
    }
  } catch (error) {
    console.log('⚠️  Error during cleanup:', error);
  }
}

interface DeployResult {
  shopify: {
    success: boolean;
    productId?: string;
    url?: string;
  };
  adsets: {
    success: boolean;
    processedFiles: Array<{
      inputFile: string;
      outputFile: string;
      campaignName: string;
      adSetName: string;
    }>;
  };
}

async function parseArguments(): Promise<DeployOptions> {
  // Get all arguments after the script name
  const allArgs = process.argv.slice(1);
  const options: Partial<DeployOptions> = {};

  for (const arg of allArgs) {
    if (arg.startsWith('--config=')) {
      options.config = arg.split('=')[1];
    } else if (arg.startsWith('--adsets=')) {
      options.adsets = arg.split('=')[1];
    } else if (arg.startsWith('--tier=')) {
      options.tier = arg.split('=')[1];
    }
  }

  if (!options.config) {
    console.error('❌ Missing required arguments');
    console.log('Usage: npx tsx scripts/offer-deploy.ts --config=./path/to/config.ts [--adsets=./path/to/adsets/]');
    process.exit(1);
  }

  return options as DeployOptions;
}

async function loadOfferConfig(configPath: string): Promise<OfferConfig> {
  try {
    const fullPath = path.resolve(configPath);
    // Convert Windows path to file:// URL for dynamic import
    const fileUrl = `file://${fullPath.replace(/\\/g, '/')}`;
    const configModule = await import(fileUrl);
    return configModule.default;
  } catch (error) {
    console.error(`❌ Error loading config from ${configPath}:`, error);
    throw error;
  }
}


async function deployOffer(options: DeployOptions): Promise<DeployResult> {
  console.log('🚀 Starting comprehensive offer deployment...\n');

  const result: DeployResult = {
    shopify: { success: false },
    adsets: { success: false, processedFiles: [] }
  };

  try {
    // 1. Load offer configuration
    console.log('📋 Loading offer configuration...');
    const offerConfig = await loadOfferConfig(options.config);
    console.log(`✅ Loaded: ${offerConfig.title} (${offerConfig.handle})`);

    // 2. Upload to Shopify
    console.log('\n🛒 Uploading offer to Shopify...');
    try {
      await upsertOffer(offerConfig);
      result.shopify.success = true;
      result.shopify.url = `https://${process.env.PUBLIC_STORE_DOMAIN}/offers/${offerConfig.handle}`;
      console.log(`✅ Shopify product created: ${offerConfig.title}`);
    } catch (error) {
      console.error('❌ Shopify upload failed:', error);
      result.shopify.success = false;
    }

    // 3. Process AdSet CSVs
    console.log('\n📊 Processing AdSet CSVs...');
    try {
      // Determine adsets directory: use provided or default to sibling "adsets" next to config
      const configDir = path.dirname(path.resolve(options.config));
      const adsetsDir = path.resolve(options.adsets ?? path.join(configDir, 'adsets'));

      // Ensure directory exists
      await fs.mkdir(adsetsDir, { recursive: true });

      // Clean up any existing generated files first
      await cleanupAdSetDirectory(adsetsDir);
      
      const processedFiles = await processAdSetCsvs(adsetsDir, offerConfig, options.tier);
      result.adsets.success = true;
      result.adsets.processedFiles = processedFiles;
      console.log('✅ AdSet CSVs processed successfully');
    } catch (error) {
      console.error('❌ AdSet CSV processing failed:', error);
      result.adsets.success = false;
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


  // AdSets status
  console.log(`\n📊 AdSets: ${result.adsets.success ? '✅ Success' : '❌ Failed'}`);
  if (result.adsets.success && result.adsets.processedFiles.length > 0) {
    console.log('   Processed Files:');
    for (const file of result.adsets.processedFiles) {
      console.log(`   • ${path.basename(file.inputFile)} → ${path.basename(file.outputFile)}`);
    }
    
    // Show campaign linkage info
    const campaignName = result.adsets.processedFiles[0]?.campaignName;
    if (campaignName) {
      console.log(`\n   All files linked under campaign: "${campaignName}"`);
      console.log('   Ready for import into Ads Manager!');
    }
  }

  console.log('\n' + '='.repeat(60));
}

async function main() {
  try {
    const options = await parseArguments();
    const result = await deployOffer(options);
    printSummary(result);

    // Exit with appropriate code
    const allSuccessful = result.shopify.success && result.adsets.success;
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
