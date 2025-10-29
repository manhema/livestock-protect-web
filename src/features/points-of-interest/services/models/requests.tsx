import { z } from 'zod';

export const PointOfInterestRequest = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string().optional(),
  whatThreeWords: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  livestockGroup: z.string(),
});

export type PointOfInterestRequest = z.infer<typeof PointOfInterestRequest>;

export const EnablePointOfInterestRequest = z.object({
  enabled: z.boolean(),
});

export type EnablePointOfInterestRequest = z.infer<typeof EnablePointOfInterestRequest>;
