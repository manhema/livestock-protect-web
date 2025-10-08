import { type FC } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { CountMarker } from './counter-marker.tsx';

interface DirectionalCounterProps {
  position: any;
  count: any;
  onClick: any;
}

export const DirectionalCounter: FC<DirectionalCounterProps> = ({
  position,
  count,
  onClick,
}) => {
  return (
    <AdvancedMarker
      position={position}
      onClick={() => {
        onClick();
      }}
      clickable={true}>

      <CountMarker count={count} />

    </AdvancedMarker>
  );
};
