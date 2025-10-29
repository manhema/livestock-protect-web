import { Cluster, ClusterStats, type Marker, MarkerClusterer, type Renderer } from '@googlemaps/markerclusterer';
import { useMap } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PointOfInterestMarker } from './point-of-interest-marker.tsx';
import type { PointOfInterestModel } from '../../services/models/responses.tsx';
import { createClusterMarker } from '../../utils/cluster-pin-factory.ts';


export type ClusteredPoiMarkersProps = {
  pois: PointOfInterestModel[];
  onItemSelected: (poi: PointOfInterestModel) => void;
};

export const ClusteredPoiMarkers = ({ pois, onItemSelected }: ClusteredPoiMarkersProps) => {
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});

  const map = useMap();
  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({ map, renderer: new PoiRenderer() });
  }, [map]);

  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    setMarkers((markers) => {
      if ((marker && markers[key]) || (!marker && !markers[key]))
        return markers;

      if (marker) {
        return { ...markers, [key]: marker };
      } else {
        const { [key]: _, ...newMarkers } = markers;
        return newMarkers;
      }
    });
  }, []);

  return (
    pois.map((poi) => (
      <PointOfInterestMarker
        key={poi.id}
        poi={poi}
        onClick={(p) => onItemSelected(p)}
        setMarkerRef={setMarkerRef}
      />
    ))
  );
};

class PoiRenderer implements Renderer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public render({ count, position }: Cluster, _stats: ClusterStats, _map: google.maps.Map): Marker {
    return createClusterMarker({ position, background: '#edb00d', label: String(count), zIndex: count });
  }
}
