import { type FC, Fragment } from 'react';
import { getPointAtPercentage, getSiteById } from '../../../../utils/maths.ts';
import { DirectionalCounter } from './directional-counter.tsx';
import {
  MovementPathModel,
  type SourceDestCount,
  type TrackAndTraceSite,
} from '../../../../services/models/movement-report-model.ts';

interface MovementEdgeCountersProps {
  index: number;
  pathData: MovementPathModel;
  sites: TrackAndTraceSite[];
  onClickCounter: (sourceDestCount: SourceDestCount) => void;
}

export const MovementEdgeCounters: FC<MovementEdgeCountersProps> = ({
  pathData,
  sites,
  index,
  onClickCounter,
}) => {

  return (
    <Fragment>
      {pathData.sourceDestCounts.map((sourceDestCount, countIdx) => {
        const fromSite = getSiteById(sourceDestCount.sourceId, sites);
        const toSite = getSiteById(sourceDestCount.destId, sites);

        if (fromSite && toSite) {
          // Get path points for markers
          const startPoint = pathData.path[0];
          const endPoint = pathData.path[pathData.path.length - 1];

          const distToSourceStart = Math.hypot(
            startPoint.lat - fromSite.location.latitude,
            startPoint.lng - fromSite.location.longitude,
          );
          const distToSourceEnd = Math.hypot(
            endPoint.lat - fromSite.location.latitude,
            endPoint.lng - fromSite.location.longitude,
          );
          const sourceIsStart = distToSourceStart < distToSourceEnd;

          const fromToPosition = getPointAtPercentage(
            pathData.path,
            sourceIsStart ? 0.8 : 0.2,
          );
          const toFromPosition = getPointAtPercentage(
            pathData.path,
            sourceIsStart ? 0.2 : 0.8,
          );

          return (
            <Fragment key={`edge-count-${index}-${countIdx}`}>
              {/* Source to Destination Counter */}
              {sourceDestCount.sourceToDestCount > -1 && (
                <DirectionalCounter
                  position={fromToPosition}
                  count={sourceDestCount.sourceToDestCount}
                  onClick={() => {
                    onClickCounter(sourceDestCount);
                  }}
                />
              )}

              {/* Destination to Source Counter */}
              {sourceDestCount.destToSourceCount > -1 && (
                <DirectionalCounter
                  position={toFromPosition}
                  count={sourceDestCount.destToSourceCount}
                  onClick={() => {
                    onClickCounter(sourceDestCount);
                  }}
                />
              )}
            </Fragment>
          );
        }

        return null;
      })}
    </Fragment>
  );
};
