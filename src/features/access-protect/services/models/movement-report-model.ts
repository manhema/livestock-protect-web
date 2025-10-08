import { z } from 'zod';
import { getRandomColor } from '../../../../core/utils/colors.ts';

export const Location = z.object({
  latitude: z.number(),
  longitude: z.number(),
});


export type Location = z.infer<typeof Location>;

export const TrackAndTraceSite = z.object({
  id: z.string(),
  name: z.string(),
  location: Location,
  color: z.string().optional().nullable(),
}).transform((site) => ({
  ...site,
  color: getRandomColor(),
}));


export type TrackAndTraceSite = z.infer<typeof TrackAndTraceSite>;

export const TrackAndTraceVisitor = z.object({
  logId: z.string(),
  siteId: z.string(),
  name: z.string(),
  email: z.string(),
  contact: z.object({
    countryCode: z.string(),
    phoneNumber: z.string(),
  }).optional().nullable(),
  vehicleRegNo: z.string().optional(),
  reason: z.string(),
  dateTime: z.string(),
});


export type TrackAndTraceVisitor = z.infer<typeof TrackAndTraceVisitor>;

export const Movement = z.object({
  from: z.string(),
  to: z.string(),
  fromTime: z.string(),
  toTime: z.string(),
  person: z.string(),
  duration: z.string(),
});


export type Movement = z.infer<typeof Movement>;

export const SourceDestCount = z.object({
  sourceId: z.string(),
  destId: z.string(),
  sourceToDestCount: z.number(),
  destToSourceCount: z.number(),
  midpoint: Location,
});


export type SourceDestCount = z.infer<typeof SourceDestCount>;

export const PathPoint = z.object({
  latitude: z.number(),
  longitude: z.number(),
}).transform((p) => ({
  lat: p.latitude,
  lng: p.longitude,
}));


export type PathPoint = z.infer<typeof PathPoint>;

export const MovementPathModel = z.object({
  path: z.array(PathPoint),
  color: z.string(),
  sourceDestCounts: z.array(SourceDestCount),
});


export type MovementPathModel = z.infer<typeof MovementPathModel>;

export const MovementReport = z.object({
  sites: z.array(TrackAndTraceSite),
  visitors: z.array(TrackAndTraceVisitor),
  siteVisitCounts: z.record(z.string(), z.number()),
  inferredMovements: z.array(Movement),
  movementPaths: z.array(MovementPathModel),
  totalVisits: z.number(),
  totalPeople: z.number(),
  busiestPerson: z.string().optional(),
  mostVisitedSite: z.string().optional(),
});


export type MovementReport = z.infer<typeof MovementReport>;
