import { z } from 'zod';

export const SiteModel = z.object({
  type: z.string(),
  property: z.object({
    id: z.string(),
    name: z.string(),
    cph: z.string().optional(),
    riskLevel: z.string(),
    whatThreeWords: z.string(),
    location: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    address: z.object({
      streetNumber: z.string().optional(),
      streetName: z.string().optional(),
      city: z.string().optional(),
      county: z.string().optional(),
      postalCode: z.string().optional(),
      countryName: z.string().optional(),
      countryCode: z.string().optional(),
    }),
  }),
  unit: z.object({
    id: z.string(),
    name: z.string(),
    riskLevel: z.string(),
    whatThreeWords: z.string().optional(),
    location: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }).optional(),
  }).optional(),
  area: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    questionnaire: z.boolean(),
    whatThreeWords: z.string().optional(),
    location: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }).optional(),
  }).optional(),
});


export type SiteModel = z.infer<typeof SiteModel>;
