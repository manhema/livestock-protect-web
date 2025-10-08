import type {
  MovementPathModel,
  TrackAndTraceSite,
  TrackAndTraceVisitor,
} from '../services/models/movement-report-model.ts';

export const getSiteVisits = (siteId: string, areas: TrackAndTraceSite[], users: TrackAndTraceVisitor[]): any[] => {
  return users
    .filter((user) => areas.some((area) => area.id === user.siteId))
    .map((user) => {
      const userArea = areas.find((area) => area.id === user.siteId)!;
      return {
        dateTime: user.dateTime,
        farmSite: userArea.id,
        person: user.name,
        purpose: user.reason,
      };
    })
    .filter((visit) => visit.farmSite === siteId)
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
};

export const getSiteById = (siteId: string, areas: TrackAndTraceSite[]): TrackAndTraceSite | undefined => {
  return areas.find((area) => area.id === siteId);
};

export const computeBounds = (sites: TrackAndTraceSite[], movementPaths: MovementPathModel[]): google.maps.LatLngBoundsLiteral => {
  const allPoints = [
    ...sites.map((site) => ({
      lat: site.location.latitude,
      lng: site.location.longitude,
    })),
    ...movementPaths.flatMap((path) => path.path),
  ];

  if (allPoints.length === 0) {
    return {
      north: 54.00366,
      south: 54.00366,
      east: -2.547855,
      west: -2.547855,
    };
  }

  let north = allPoints[0].lat;
  let south = allPoints[0].lat;
  let east = allPoints[0].lng;
  let west = allPoints[0].lng;

  allPoints.forEach((point) => {
    if (point.lat > north) north = point.lat;
    if (point.lat < south) south = point.lat;
    if (point.lng > east) east = point.lng;
    if (point.lng < west) west = point.lng;
  });

  return { north, south, east, west };
};

export const calculateAreasCenter = (sites: TrackAndTraceSite[]) => {
  if (!sites || sites.length === 0) {
    return { lat: 54.00366, lng: -2.547855 }; // Default center if no areas
  }

  // Calculate the average latitude and longitude
  const sumLat = sites.reduce((sum, site) => sum + site.location.latitude, 0);
  const sumLng = sites.reduce((sum, site) => sum + site.location.longitude, 0);

  return {
    lat: sumLat / sites.length,
    lng: sumLng / sites.length,
  };
};

export const getPointAtPercentage = (
  path: Array<{ lat: number; lng: number }>,
  percentage: number,
): { lat: number; lng: number } => {
  if (path.length < 2) {
    return path[0] || { lat: 0, lng: 0 };
  }

  // Ensure the percentage is between 0 and 1
  const pct = Math.max(0, Math.min(1, percentage));

  // For simple cases, return the point at the index
  if (pct === 0) return path[0];
  if (pct === 1) return path[path.length - 1];

  // Calculate the index in the path array
  const index = Math.floor(pct * (path.length - 1));

  return path[index];
};
