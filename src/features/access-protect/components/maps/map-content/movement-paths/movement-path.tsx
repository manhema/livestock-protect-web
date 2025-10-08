import { type FC, Fragment } from 'react';
import { Polyline } from '../../../../../../shared/components/map/polyline.tsx';
import { MovementPathModel, type SourceDestCount } from '../../../../services/models/movement-report-model.ts';

interface MovementPathProps {
  pathData: MovementPathModel;
  onClickPolyline: (sourceDestCount: SourceDestCount) => void;
}

export const MovementPath: FC<MovementPathProps> = ({ pathData, onClickPolyline  }) => {

  return (
    <Fragment>
      <Polyline
        path={pathData.path}
        strokeColor={pathData.color}
        strokeWeight={4}
        strokeOpacity={0.7}
        icons={[
          {
            icon: {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              scale: 3.5,
              strokeColor: pathData.color,
              fillColor: pathData.color,
              fillOpacity: 1,
            },
            offset: '90%', // Places arrow at the end of the line
            repeat: '0px',   // Only show one arrow
          },
          {
            icon: {
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, // Changed to backward arrow
              scale: 3.5,
              strokeColor: pathData.color,
              fillColor: pathData.color,
              fillOpacity: 1,
            },
            offset: '10%', // Places arrow near the beginning of the line
            repeat: '0px',  // Only show one arrow
          },
        ]}
        onClick={() => {
          const sourceDestCount = pathData.sourceDestCounts[0];
          onClickPolyline(sourceDestCount);
        }}
      />
    </Fragment>
  );
};
