import { z } from 'zod';

export const MovementFilterRequest = z.object({
  visitors: z.array(z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
  })).optional(),
  vehicles: z.array(z.string()).optional(),
  sites: z.array(z.string()).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});


export type MovementFilterRequest = z.infer<typeof MovementFilterRequest>;

export const VisitFilterRequest = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  keywords: z.string().optional(),
  visitors: z.array(z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
  })).optional(),
  vehicles: z.array(z.string()).optional(),
  sites: z.array(z.string()).optional(),
});


export type VisitFilterRequest = z.infer<typeof VisitFilterRequest>;
