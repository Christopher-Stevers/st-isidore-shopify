import {UnifiedConfig} from './schema';
import {CsvRow, emptyRow, fmtTime, buildUrlWithUtm, readTemplateRows} from './csv';


// Minimal mapping focused on fields typically required by the OG template.
// Keep keys matching the header in `scripts/meta/DTC Rancher_Value Ladder_Meta Ads Template.csv`.

export function mapToCsvRows(
  header: string[],
  config: UnifiedConfig,
  chosenTemplate: string,
): CsvRow[] {
  const rows: CsvRow[] = [];
  const parsedTemplate = readTemplateRows(chosenTemplate);
  const hasCreativeType = header.includes('Creative Type');

  // Get all unique campaign names from the parsedTemplate
const monthYear = new Date().toLocaleString('en-US', {month: 'long', year: 'numeric'});
  const allCampaignsInTemplate = Array.from(
    new Set(
      parsedTemplate
        .map((r) => {return {...r,['Campaign Name']: r['Campaign Name'].replace('(Offer Name)', config.campaign?.name).replace('(Month Year)', monthYear),}})
        .filter((n) => typeof n['Campaign Name'] === 'string' && n['Campaign Name'].trim() !== '')
    )
  ).filter((n) => {
    const campaignName = (n as any)['Campaign Name'];
    switch (config.campaign?.tier) {
      case 'T0':
        return campaignName.includes('Lead Magnet') || campaignName.includes('Giveaway');
      case 'T1':
        return campaignName.startsWith('Tier 1:');
      case 'T2':
        return campaignName.startsWith('Tier 2:');
      case 'T3':
        return campaignName.startsWith('Tier 3:');
      case 'T4':
        return campaignName.startsWith('Tier 4:');
      case 'T5':
        return campaignName.startsWith('Tier 5:');
    }
  });




  
  // Build campaign/adset plan from template rows for the selected tier
  const now = new Date();
  const handleRaw = config.shopify?.productHandle || new URL(config.shopify.landingUrl).pathname.split('/').filter(Boolean).pop() || 'Offer';
  const offerName = handleRaw
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());

  type PlannedAdset = {campaignName: string; adsetName: string};
  const planned: PlannedAdset[] = [];

  // allCampaignsInTemplate computed earlier in the file by the user; recompute robustly here
  const tierMap: Record<string, string> = { T0: 'Lead Magnet', T1: 'Tier 1:', T23: 'Tier 2:', T45: 'Tier 4:' };
  const tierPrefix = tierMap[config.campaign?.tier || 'T1'] || 'Tier 1:';
  const allCampaigns = allCampaignsInTemplate.map((n) => {return {...n,['Campaign Name']: n['Campaign Name'].replace('(Offer Name)', offerName).replace('(Month Year)', monthYear),}});

  if (allCampaigns.length > 0) {
    for (const camp of allCampaigns) {
      if (camp['Campaign Name'].toLowerCase().includes('sales')) {
        planned.push({...camp, campaignName: camp['Campaign Name'], adsetName: 'Sales_Warm'});
        planned.push({...camp, campaignName: camp['Campaign Name'], adsetName: 'Sales_Cold'});
      } else if (camp['Campaign Name'].toLowerCase().includes('retargeting')) {
        planned.push({...camp, campaignName: camp['Campaign Name'], adsetName: 'Retargeting_Warm'});
        planned.push({...camp, campaignName: camp['Campaign Name'], adsetName: 'Retargeting_Cold'});
      } else {
        planned.push({...camp, campaignName: camp['Campaign Name']   , adsetName: 'Warm'});
        planned.push({...camp, campaignName: camp['Campaign Name'], adsetName: 'Cold'});
      }
    }
  } else {
    console.log("Using fallback campaign")
    // Fallback: use provided adsets under a single derived/default campaign name
    const fallbackCampaign = config.campaign?.name || ((): string => {
      const tier = config.campaign?.tier || 'T1';
      const countries = (config.adsets?.[0]?.audience?.countries || []).join('-') || 'Broad';
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      return `${tier}_${handleRaw.replace(/[^a-z0-9]+/gi, '_')}_${countries}_${mm}${dd}`;
    })();
    for (const adset of config.adsets) {
      planned.push({campaignName: fallbackCampaign || '', adsetName: adset.name || 'AdSet'});
    }
  }

  // Campaign row (template expects flattened rows; we repeat campaign-level fields for each ad set/ad)
  for (const plan of planned) {
    const adset = config.adsets[0] || ({} as any);
    // Ensure at least three creatives: Static, Carousel, Video
    const sourceAds = config.ads && config.ads.length > 0 ? config.ads : [];
    const baseAd = sourceAds[0];
    const adsForSet = (() => {
      if (sourceAds.length >= 3) return sourceAds.map((a) => ({ad: a, variant: 'original' as const}));
      const variants: Array<{ad: typeof baseAd; variant: 'static' | 'carousel' | 'video'}> = [];
      if (baseAd) {
        variants.push({ad: baseAd, variant: 'static'});
        variants.push({ad: baseAd, variant: 'carousel'});
        variants.push({ad: baseAd, variant: 'video'});
      }
      return variants;
    })();

    for (const entry of adsForSet) {
      const variant = (entry as any).variant as 'original' | 'static' | 'carousel' | 'video' | undefined;
      const ad = (entry as any).ad ?? entry;
      const r = emptyRow(header);
      // Campaign-level: populate from plan (parsed template)
      // Names
      r['Campaign Name'] = plan.campaignName || plan['Campaign Name'] || '';
      // Copy selected campaign-level fields from plan when present
      const planCampaignCols = [
        'Special Ad Categories',
        'Special Ad Category Country',
        'Campaign Status',
        'Campaign Objective',
        'Buying Type',
        'Campaign Spend Limit',
        'Campaign Daily Budget',
        'Campaign Lifetime Budget',
        'Campaign Bid Strategy',
        'Tags',
        'Campaign Is Using L3 Schedule',
        'Product Catalog ID',
        'Campaign Page ID',
        'New Objective',
      ];

      for (const col of planCampaignCols) {
        const v = (plan as any)[col];
        if (v !== undefined && v !== null && String(v).length) {
          (r as any)[col] = v as any;
        }
      }
      // Copy irrelevant/targeting and metadata columns straight from plan/template when present
      const irrelevantCols = [
        'Application ID','Product Set ID','Place Page Set ID','Object Store URL','Offer ID','Offline Event Data Set ID','Countries','Cities','Regions','Electoral Districts','Zip','Addresses','Geo Markets (DMA)','Global Regions','Large Geo Areas','Medium Geo Areas','Small Geo Areas','Metro Areas','Neighborhoods','Subneighborhoods','Subcities','Location Types','Location Cluster IDs','Location Set IDs','Excluded Countries','Excluded Cities','Excluded Large Geo Areas','Excluded Medium Geo Areas','Excluded Metro Areas','Excluded Small Geo Areas','Excluded Subcities','Excluded Neighborhoods','Excluded Subneighborhoods','Excluded Regions','Excluded Electoral Districts','Excluded Zip','Excluded Addresses','Excluded Geo Markets (DMA)','Excluded Global Regions','Excluded Location Cluster IDs','Gender','Age Min','Age Max','Education Status','Fields of Study','Education Schools','Work Job Titles','Work Employers','College Start Year','College End Year','Interested In','Relationship','Family Statuses','Industries','Life Events','Income','Multicultural Affinity','Household Composition','Behaviors','Connections','Excluded Connections','Friends of Connections','Locales','Site Category','Unified Interests','Excluded User AdClusters','Broad Category Clusters','Targeting Categories - ALL OF','Custom Audiences','Excluded Custom Audiences','Flexible Inclusions','Flexible Exclusions','Advantage Audience','Age Range','Targeting Optimization','Targeting Relaxation','Product Audience Specs','Excluded Product Audience Specs','Targeted Business Locations','Dynamic Audiences','Excluded Dynamic Audiences','Beneficiary','Payer','Publisher Platforms','Facebook Positions','Instagram Positions','Audience Network Positions','Oculus Positions','Device Platforms','User Device','Excluded User Device','User Operating System','User OS Version','Wireless Carrier','Excluded Publisher Categories','Brand Safety Inventory Filtering Levels','Attribution Spec','Bid Amount','Ad Set Bid Strategy','Regional Regulated Categories','Beneficiary (financial ads in Australia)','Payer (financial ads in Australia)','Beneficiary (financial ads in Taiwan)','Payer (financial ads in Taiwan)','Beneficiary (Taiwan)','Payer (Taiwan)','Beneficiary (Singapore)','Payer (Singapore)','Beneficiary (securities ads in India)','Payer (securities ads in India)','Beneficiary (selected locations)','Payer (selected locations)','Story ID','Ad ID','Ad Status','Preview Link','Instagram Preview Link'
      ];
      for (const col of irrelevantCols) {
        if (!header.includes(col)) continue;
        const v = (plan as any)[col];
        if (v !== undefined && v !== null && String(v).length) {
          (r as any)[col] = v as any;
        }
      }
      // Objective/New Objective fallbacks
      if (r['Campaign Objective'] && !r['New Objective']) {
        r['New Objective'] = r['Campaign Objective'];
      }
      // Times: prefer values from plan, otherwise set default window (today → +1 month)
      r['Ad Set Name'] = plan['Campaign Name'] + '_' + plan.adsetName
      r['Ad Name'] = plan['Campaign Name'] + '_' + plan.adsetName + '_' + variant;
   
        const today = new Date();
        const end = new Date(today);
        end.setMonth(end.getMonth() + 1);
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
     
      

      // Ad Set-level: only populate if present in offer config; otherwise let template drive
    

      // Ad-level creative
      const variantSuffix = variant && variant !== 'original' ? `_${variant.toUpperCase()}` : '';
      r['Ad Name'] = `${ad.name || 'Ad'}${variantSuffix}`;
      r['Title'] = ad.headline;
      r['Body'] = ad.primaryText;
      r['Display Link'] = ad.displayLink || new URL(config.shopify.landingUrl).host;
      const linkWithUtm = buildUrlWithUtm(ad.link || config.shopify.landingUrl, config.utm, {
        campaign: config.campaign.name.replace(/\s+/g, '_'),
        content: ad.name.replace(/\s+/g, '_'),
      });
      r['Link'] = linkWithUtm;
      r['URL Tags'] = ad.urlTags || '';
      r['Call to Action'] = ad.callToAction || 'SHOP_NOW';
      if (hasCreativeType) {
        if (variant === 'video') r['Creative Type'] = 'Standard';
        else if (variant === 'carousel') r['Creative Type'] = 'Standard';
        else r['Creative Type'] = 'Standard';
      }
      if (r['Campaign Objective'] === 'Traffic') {
        r['Billing Event'] = 'LINK_CLICKS';
        r['Optimization Goal'] = 'LINK_CLICKS';
      } 
      if (r['Campaign Objective'] === 'Outcome Sales') {
        r['Billing Event'] = 'LINK_CLICKS';
        r['Optimization Goal'] = 'LINK_CLICKS';
      }
      console.log(r['Campaign Objective'], "campaign objective")
      if (r['Campaign Objective'] === 'Leads') {
        r['Billing Event'] = 'LINK_CLICKS';
        r['Optimization Goal'] = 'LINK_CLICKS';
      }

      

      // Asset mapping
  
      rows.push(r);
    }
  }

  return rows;
}


