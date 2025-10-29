import { darken } from '@mui/material/styles';

type ClusterPinOptions = {
  background: string;
  label: string;
};

type ClusterMarkerOptions = {
  position: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined;
  zIndex?: number;
};

export function createClusterPin(options: ClusterPinOptions): google.maps.marker.PinElement {
  const { background, label } = options;

  const glyphEl = document.createElement('span');
  glyphEl.textContent = String(label);
  glyphEl.style.fontSize = '.75rem';
  glyphEl.style.fontWeight = '500';

  return new google.maps.marker.PinElement({ background, borderColor: darken(background, 0.3), glyphColor: 'white', glyph: glyphEl });
}

export function createClusterMarker({ position, zIndex, ...options }: ClusterPinOptions & ClusterMarkerOptions): google.maps.marker.AdvancedMarkerElement {
  const pin = createClusterPin({ ...options });

  return new google.maps.marker.AdvancedMarkerElement({
    position,
    content: pin.element,
    zIndex: Number(google.maps.Marker.MAX_ZINDEX) + (zIndex ?? 0),
  });
}
