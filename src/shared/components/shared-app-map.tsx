import { ControlPosition, Map as GoogleMap, type MapProps } from '@vis.gl/react-google-maps';
import { memo, type PropsWithChildren } from 'react';
import { config } from '../../core/config/config.ts';

export const SharedAppMap = memo(function Map(props: Omit<PropsWithChildren<MapProps>, 'mapId'>) {
  return (
    <GoogleMap
      mapId={config.googleMapsApi.vectorMapId}
      reuseMaps={true}
      disableDefaultUI={true}
      mapTypeControl={true}
      zoomControl={true}
      mapTypeControlOptions={{ position: ControlPosition.TOP_RIGHT }}
      {...props}
    >
      {props.children}
    </GoogleMap>
  );
});
