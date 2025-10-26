/**
 * Meta AdSet CSV Processing Module
 * 
 * Handles processing multiple AdSet CSV files for Meta Ads Manager
 * Auto-injects campaign, adset, and URL information from offer configuration
 */

import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import type { OfferConfig } from '../shopify/upsertOffer';

interface AdSetRow {
  'Campaign Name': string;
  'Ad Set Name': string;
  'Ad Name': string;
  'Headline': string;
  'Description': string;
  'Primary Text': string;
  'Website URL': string;
  [key: string]: string; // Allow for additional columns
}

interface ProcessedAdSet {
  inputFile: string;
  outputFile: string;
  campaignName: string;
  adSetName: string;
}

async function processAdSetCsvs(adsetsPath: string, offerConfig: OfferConfig): Promise<ProcessedAdSet[]> {
  console.log(`📊 Processing AdSet CSVs from: ${adsetsPath}`);

  // Check if path is a directory
  const stats = await fs.stat(adsetsPath);
  if (!stats.isDirectory()) {
    throw new Error(`Path ${adsetsPath} is not a directory`);
  }

  // Find all CSV files in the directory
  const files = await fs.readdir(adsetsPath);
  const csvFiles = files.filter(file => file.toLowerCase().endsWith('.csv'));

  if (csvFiles.length === 0) {
    throw new Error(`No CSV files found in ${adsetsPath}`);
  }

  // Clean up any remaining prepared files (backup cleanup)
  console.log('🧹 Final cleanup of prepared files...');
  const allFiles = await fs.readdir(adsetsPath);
  const preparedFiles = allFiles.filter(file => file.includes('-prepared'));
  
  for (const preparedFile of preparedFiles) {
    try {
      await fs.unlink(path.join(adsetsPath, preparedFile));
      console.log(`🗑️  Removed: ${preparedFile}`);
    } catch (error) {
      console.log(`⚠️  Could not remove ${preparedFile}:`, error);
    }
  }

  console.log(`📊 Found ${csvFiles.length} CSV files to process`);

  // Process all CSV files and create only one consolidated file
  const allRows: any[] = [];
  const processedFiles: ProcessedAdSet[] = [];

  for (const csvFile of csvFiles) {
    try {
      // Read and parse the CSV file directly (don't create individual prepared files)
      const inputPath = path.join(adsetsPath, csvFile);
      const csvContent = await fs.readFile(inputPath, 'utf-8');
      const records = await parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      });

      if (records.length === 0) {
        console.log(`⚠️  No data found in ${csvFile}, skipping...`);
        continue;
      }

      // Generate ad set name from filename (remove .csv extension)
      const adSetName = path.basename(csvFile, '.csv');

      // Process each row to create 3 ad types for each AdSet
      for (const row of records) {
        const currentAdSetName = row['Ad Set Name'] || adSetName;
        
        // Create 3 different ad types for each AdSet
        const adTypes = [
          { type: 'Carousel', suffix: ' | Carousel' },
          { type: 'Video', suffix: ' | Video' },
          { type: 'Static', suffix: ' | Static Image' }
        ];
        
        for (const adType of adTypes) {
          const processedRow: any = { ...row };

          // Inject offer configuration data
          processedRow['Campaign Name'] = offerConfig.campaignName || offerConfig.title;
          processedRow['Ad Set Name'] = currentAdSetName;
          processedRow['Ad Name'] = `${offerConfig.title} | ${currentAdSetName}${adType.suffix}`;
          processedRow['Ad Type'] = adType.type;
          processedRow['Website URL'] = `https://stisidoreranch.com/offers/${offerConfig.handle}`;
          
          // Use marketing config for ad content
          if (offerConfig.marketingConfig?.hero) {
            processedRow['Headline'] = offerConfig.marketingConfig.hero.title || offerConfig.title;
            processedRow['Description'] = offerConfig.marketingConfig.hero.subtitle || offerConfig.description || '';
          } else {
            processedRow['Headline'] = offerConfig.title;
            processedRow['Description'] = offerConfig.description || '';
          }

          // Use first highlight as primary text
          if (offerConfig.highlights && offerConfig.highlights.length > 0) {
            processedRow['Primary Text'] = offerConfig.highlights[0];
          } else {
            processedRow['Primary Text'] = offerConfig.description || '';
          }

          allRows.push(processedRow);
        }
      }
      
      console.log(`✅ Processed: ${csvFile} (${records.length} AdSets → ${records.length * 3} ads)`);
    } catch (error) {
      console.error(`❌ Error processing ${csvFile}:`, error);
      // Continue with other files even if one fails
    }
  }

  // Create one consolidated CSV file
  if (allRows.length > 0) {
    const consolidatedContent = stringify(allRows, { header: true });
    const consolidatedFile = path.join(adsetsPath, 'All_AdSets_Consolidated.csv');
    await fs.writeFile(consolidatedFile, consolidatedContent);
    
    console.log(`📊 Created consolidated file: All_AdSets_Consolidated.csv (${allRows.length} rows)`);
    
    // Add the consolidated file to processed files
    processedFiles.push({
      inputFile: 'Template files',
      outputFile: consolidatedFile,
      campaignName: offerConfig.campaignName || offerConfig.title,
      adSetName: 'All AdSets'
    });
  }

  return processedFiles;
}

async function processSingleCsv(
  directory: string, 
  filename: string, 
  offerConfig: OfferConfig
): Promise<ProcessedAdSet> {
  const inputPath = path.join(directory, filename);
  const outputFilename = filename.replace('.csv', '-prepared.csv');
  const outputPath = path.join(directory, outputFilename);

  // Read and parse CSV
  const csvContent = await fs.readFile(inputPath, 'utf-8');
  const records: AdSetRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  if (records.length === 0) {
    throw new Error(`No data found in ${filename}`);
  }

  // Generate ad set name from filename (remove .csv extension)
  const adSetName = path.basename(filename, '.csv');

  // Process each row to create 3 ad types for each AdSet
  const processedRecords: any[] = [];
  
  for (const row of records) {
    const adSetName = row['Ad Set Name'] || adSetName;
    
    // Create 3 different ad types for each AdSet
    const adTypes = [
      { type: 'Carousel', suffix: ' | Carousel' },
      { type: 'Video', suffix: ' | Video' },
      { type: 'Static', suffix: ' | Static Image' }
    ];
    
    for (const adType of adTypes) {
      const processedRow: any = { ...row };

      // Inject offer configuration data
      processedRow['Campaign Name'] = offerConfig.campaignName || offerConfig.title;
      processedRow['Ad Set Name'] = adSetName;
      processedRow['Ad Name'] = `${offerConfig.title} | ${adSetName}${adType.suffix}`;
      processedRow['Ad Type'] = adType.type;
      processedRow['Website URL'] = `https://stisidoreranch.com/offers/${offerConfig.handle}`;
      
      // Use marketing config for ad content
      if (offerConfig.marketingConfig?.hero) {
        processedRow['Headline'] = offerConfig.marketingConfig.hero.title || offerConfig.title;
        processedRow['Description'] = offerConfig.marketingConfig.hero.subtitle || offerConfig.description || '';
      } else {
        processedRow['Headline'] = offerConfig.title;
        processedRow['Description'] = offerConfig.description || '';
      }

      // Use first highlight as primary text
      if (offerConfig.highlights && offerConfig.highlights.length > 0) {
        processedRow['Primary Text'] = offerConfig.highlights[0];
      } else {
        processedRow['Primary Text'] = offerConfig.description || '';
      }

      processedRecords.push(processedRow);
    }
  }

  // Convert back to CSV
  const outputCsv = stringify(processedRecords, {
    header: true,
    columns: Object.keys(processedRecords[0])
  });

  // Write prepared CSV
  await fs.writeFile(outputPath, outputCsv, 'utf-8');

  return {
    inputFile: inputPath,
    outputFile: outputPath,
    campaignName: offerConfig.campaignName || offerConfig.title,
    adSetName: adSetName
  };
}

/**
 * Utility function to validate CSV structure
 */
function validateCsvStructure(records: any[]): boolean {
  if (records.length === 0) return false;

  const firstRecord = records[0];
  const requiredColumns = ['Campaign Name', 'Ad Set Name', 'Ad Name', 'Headline', 'Description'];
  
  return requiredColumns.every(column => column in firstRecord);
}

/**
 * Utility function to detect CSV column mapping
 */
function detectColumnMapping(records: any[]): Record<string, string> {
  if (records.length === 0) return {};

  const firstRecord = records[0];
  const columnMapping: Record<string, string> = {};

  // Common variations of column names
  const columnVariations: Record<string, string[]> = {
    'Campaign Name': ['Campaign Name', 'Campaign', 'campaign_name', 'CampaignName'],
    'Ad Set Name': ['Ad Set Name', 'AdSet Name', 'Ad Set', 'adset_name', 'AdSetName'],
    'Ad Name': ['Ad Name', 'Ad', 'ad_name', 'AdName'],
    'Headline': ['Headline', 'headline', 'Headline 1', 'Headline1'],
    'Description': ['Description', 'description', 'Ad Description', 'AdDescription'],
    'Primary Text': ['Primary Text', 'PrimaryText', 'primary_text', 'Body', 'body'],
    'Website URL': ['Website URL', 'WebsiteURL', 'website_url', 'URL', 'url', 'Link', 'link']
  };

  // Map actual columns to standard names
  for (const [standardName, variations] of Object.entries(columnVariations)) {
    for (const variation of variations) {
      if (variation in firstRecord) {
        columnMapping[variation] = standardName;
        break;
      }
    }
  }

  return columnMapping;
}

export { processAdSetCsvs, processSingleCsv, type ProcessedAdSet, type AdSetRow };
