import { z } from 'zod';
import { RiskLevel } from '../../../properties/services/models/property-model.ts';

export const PointOfInterestModel = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  description: z.string().optional().nullable(),
  livestockGroup: z.string().optional().nullable(),
  whatThreeWords: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  enabled: z.boolean(),
  riskLevel: z.nativeEnum(RiskLevel).optional(),
});


export type PointOfInterestModel = z.infer<typeof PointOfInterestModel>;
