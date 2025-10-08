import { type FC, Fragment } from 'react';
import { MovementPath } from './movement-path.tsx';
import { MovementEdgeCounters } from './movement-edge-counters.tsx';
import {
  MovementPathModel,
  type SourceDestCount,
  type TrackAndTraceSite,
} from '../../../../services/models/movement-report-model.ts';

interface MovementPathsProps {
  movementPaths: MovementPathModel[];
  sites: TrackAndTraceSite[];
  onClick: (sourceDestCount: SourceDestCount, pathData: MovementPathModel) => void;
}

export const MovementPaths: FC<MovementPathsProps> = ({ movementPaths, sites ,onClick }) => {

  return (
    <Fragment>
      {movementPaths.map((pathData, index) => (
        <Fragment key={`path-${index}`}>
          <MovementPath
            pathData={pathData}
            onClickPolyline={(sourceDestCount) => {
              onClick(sourceDestCount, pathData);
            }}
          />

          <MovementEdgeCounters
            index={index}
            pathData={pathData}
            sites={sites}
            onClickCounter={(sourceDestCount) => {
              onClick(sourceDestCount, pathData);
            }}
          />
        </Fragment>
      ))}
    </Fragment>
  );
};
