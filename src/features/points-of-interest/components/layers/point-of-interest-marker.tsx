import type { Marker } from '@googlemaps/markerclusterer';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { type FC, useCallback } from 'react';
import type { PointOfInterestModel } from '../../services/models/responses.tsx';

export type PointOfInterestMarkerProps = {
  poi: PointOfInterestModel;
  onClick: (poi: PointOfInterestModel) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
};

export const PointOfInterestMarker: FC<PointOfInterestMarkerProps> = ({ poi, onClick, setMarkerRef }) => {
  const handleClick = useCallback(() => onClick(poi), [onClick, poi]);
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) => setMarkerRef(marker, poi.id),
    [setMarkerRef, poi.id],
  );

  return (
    <AdvancedMarker
      key={poi.id}
      ref={ref}
      position={{ lat: poi.location.latitude, lng: poi.location.longitude }}
      onClick={handleClick}>
      {poi.enabled ? <Pin background="#edb00d" borderColor="#e6692e" glyphColor="#e6692e" /> : <Pin background="#808080" borderColor="#5a5a5a" glyphColor="#5a5a5a" />}
    </AdvancedMarker>
  );
};
