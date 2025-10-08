import { z } from 'zod';

export const VisitModel = z.object({
  id: z.string(),
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    contact: z.object({
      countryCode: z.string(),
      phoneNumber: z.string(),
    }),
  }),
  reason: z.string(),
  vehicleRegNo: z.string().optional().nullable(),
  employee: z.boolean().optional().nullable().default(false),
  company: z.string().optional().nullable(),
  questionnaire: z.object({
    field: z.string(),
    question: z.string(),
    answer: z.string(),
  }).array().default([]),
  property: z.object({
    id: z.string(),
    name: z.string(),
    cph: z.string().optional().nullable(),
    riskLevel: z.enum(['High', 'Medium', 'Low', 'None']).optional().nullable(),
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
    qrCode: z.object({
      name: z.string(),
      whatThreeWords: z.string().optional().nullable(),
      location: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }).optional().nullable(),
    }).optional().nullable(),
  }),
  visitedAt: z.string(),
  leftAt: z.string().optional().nullable(),

});

export type VisitModel = z.infer<typeof VisitModel>;
