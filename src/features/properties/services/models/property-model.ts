import { z } from 'zod';

export type LivestockType = 'Poultry' | 'Cattle' | 'Pigs' | string;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export enum RiskLevel {
  None = 'None',
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}


export const PropertyModel = z.object({
  id: z.string(),
  name: z.string(),
  cph: z.string().optional().nullable(),
  livestockTypes: z.array(z.string()),
  riskLevel: z.nativeEnum(RiskLevel),
  enabled: z.boolean(),
  whatThreeWords: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  address: z.object({
    streetNumber: z.string().optional().nullable(),
    streetName: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    county: z.string().optional().nullable(),
    postalCode: z.string().optional().nullable(),
    countryName: z.string(),
    countryCode: z.string(),
  }),
});

export type PropertyModel = z.infer<typeof PropertyModel>;
