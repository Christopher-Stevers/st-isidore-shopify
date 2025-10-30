import {z} from 'zod';

export const CreativeSchema = z.object({
  name: z.string(),
  primaryText: z.string(),
  headline: z.string(),
  description: z.string().nullable().optional().default(''),
  link: z.string().url(),
  displayLink: z.string().nullable().optional().default(''),
  callToAction: z.string().nullable().optional().default('SHOP_NOW'),
  urlTags: z.string().nullable().optional().default(''),
  image: z
    .object({
      source: z.string(), // local path or URL
      hash: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  video: z
    .object({
      source: z.string(),
      id: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
});

export const AudienceSchema = z.object({
  countries: z.array(z.string()).nullable().optional().default(['CA']),
  customAudiences: z.array(z.string()).nullable().optional().default([]),
  interests: z.array(z.string()).nullable().optional().default([]),
  genders: z.array(z.enum(['male', 'female'])).nullable().optional().default([]),
  ageMin: z.number().nullable().optional(),
  ageMax: z.number().nullable().optional(),
});

export const PlacementSchema = z.object({
  publisherPlatforms: z.array(z.string()).nullable().optional().default(['facebook', 'instagram']),
  facebookPositions: z.array(z.string()).nullable().optional().default([]),
  instagramPositions: z.array(z.string()).nullable().optional().default([]),
  devicePlatforms: z.array(z.string()).nullable().optional().default(['mobile', 'desktop']),
});

export const AdSetSchema = z.object({
  name: z.string(),
  dailyBudget: z.number().nullable().optional(),
  lifetimeBudget: z.number().nullable().optional(),
  timeStart: z.string().nullable().optional(), // ISO8601
  timeStop: z.string().nullable().optional(),
  optimizationGoal: z.string().nullable().optional().default('LINK_CLICKS'),
  billingEvent: z.string().nullable().optional().default('IMPRESSIONS'),
  bidAmount: z.number().nullable().optional(),
  attributionSpec: z.string().nullable().optional().default('7d_click'),
  audience: AudienceSchema,
  placements: PlacementSchema.nullable().optional().default({
    publisherPlatforms: ['facebook', 'instagram'],
    facebookPositions: [],
    instagramPositions: [],
    devicePlatforms: ['mobile', 'desktop'],
  }),
});

export const CampaignSchema = z.object({
  name: z.string(),
  tier: z.enum(['T0', 'T1', 'T2', 'T3', 'T4', 'T5']),
  objective: z.enum(['TRAFFIC', 'LEADS', 'CONVERSIONS']),
  dailyBudget: z.number().nullable().optional(),
  lifetimeBudget: z.number().nullable().optional(),
  spendLimit: z.number().nullable().optional(),
  startTime: z.string().nullable().optional(),
  stopTime: z.string().nullable().optional(),
  pageId: z.string().nullable().optional(),
  pixelId: z.string().nullable().optional(),
  tags: z.array(z.string()).nullable().optional().default([]),
});

export const ShopifyBindingSchema = z.object({
  productHandle: z.string().nullable().optional(),
  productId: z.string().nullable().optional(),
  collectionHandle: z.string().nullable().optional(),
  landingUrl: z.string().url(),
  price: z.string().nullable().optional(),
  images: z.array(z.string()).nullable().optional().default([]),
});

export const UnifiedConfigSchema = z.object({
  campaign: CampaignSchema,
  adsets: z.array(AdSetSchema).min(1),
  ads: z.array(CreativeSchema).min(1),
  shopify: ShopifyBindingSchema,
  utm: z
    .object({
      source: z.string().default('meta'),
      medium: z.string().default('paid'),
      campaign: z.string().default(''),
      content: z.string().optional().default(''),
      term: z.string().optional().default(''),
    })
    .default({ source: 'meta', medium: 'paid', campaign: '' }),
});

export type UnifiedConfig = z.infer<typeof UnifiedConfigSchema>;

export function validateConfig(raw: unknown): UnifiedConfig {
  return UnifiedConfigSchema.parse(raw);
}


