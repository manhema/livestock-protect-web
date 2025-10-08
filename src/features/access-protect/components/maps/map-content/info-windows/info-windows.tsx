import { MovementInfoWindow } from './movement-info-window.tsx';
import { type Dispatch, type FC, Fragment } from 'react';
import { SiteInfoWindow } from './site-info-window.tsx';
import type { TrackAndTraceSite } from '../../../../services/models/movement-report-model.ts';

interface InfoWindowsProps {
  selectedMovement?: any;
  setSelectedMovement: Dispatch<any>;

  selectedSite?: any;
  setSelectedSite: Dispatch<any>;

  sites: TrackAndTraceSite[];

  propertyId?: string;
}
export const InfoWindows: FC<InfoWindowsProps> = ({
  selectedMovement,
  setSelectedMovement,
  selectedSite,
  setSelectedSite,
  sites,
  propertyId,
}) => {
  return (
    <Fragment>
      {/* Movement Details Popup */}
      {selectedMovement && (
        <MovementInfoWindow
          selectedMovement={selectedMovement}
          sites={sites}
          onClose={() => {
            setSelectedMovement(null);
          }}
        />
      )}

      {/* Site Details Popup */}
      {selectedSite && (
        <SiteInfoWindow
          selectedSite={selectedSite}
          propertyId={propertyId}
          onClose={() => {
            setSelectedSite(null);
          }}
        />
      )}
    </Fragment>
  );
};
