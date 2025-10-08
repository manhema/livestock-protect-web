import { type Dispatch, type FC, Fragment } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { getSiteVisits } from '../../../../utils/maths.ts';
import { SiteMarker } from './site-marker.tsx';
import { MovementReport, type TrackAndTraceSite } from '../../../../services/models/movement-report-model.ts';


interface SiteMarkersProps {
  sites: TrackAndTraceSite[];
  siteVisitCounts?: Record<string, number>;
  visitors: MovementReport['visitors'];
  setSelectedSite:  Dispatch<any>;
}
export const SiteMarkers: FC<SiteMarkersProps> = ({ sites, siteVisitCounts, visitors, setSelectedSite }) => {
  return (
    <Fragment>
      {sites.map((site) => {
        let visitCount = 0;

        if (siteVisitCounts) {
          visitCount = siteVisitCounts[site.id] || 0;
        }

        return(
          <AdvancedMarker
            key={site.id}
            position={{ lat: site.location.latitude, lng: site.location.longitude }}
            onClick={() => setSelectedSite({
              ...site,
              visits: getSiteVisits(site.id, sites, visitors),
              totalVisits: visitCount,
            })}
          >
            <SiteMarker site={site} visitCount={visitCount} />
          </AdvancedMarker>
        );
      })}
    </Fragment>
  );
};
