
import { useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

type BoundsLiteral = google.maps.LatLngBoundsLiteral;

export function MapFitBounds({
  bounds,
  padding = { top: 32, right: 32, bottom: 32, left: 32 },
}: {
  bounds?: BoundsLiteral | null;
  padding?: Partial<google.maps.Padding> | number;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !bounds) return;
    // Defer to ensure map is fully ready/layout settled
    const id = window.setTimeout(() => {
      try {
        map.fitBounds(bounds, padding as any);
      } catch {
        // ignore if bounds invalid
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, [map, bounds, padding]);

  return null;
}
