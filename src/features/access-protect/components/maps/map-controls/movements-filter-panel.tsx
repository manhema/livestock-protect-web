import { VisitorFilter } from './filters/visitor-filter/visitor-filter.tsx';
import { VehicleFilter } from './filters/vehicle-filter/vehicle-filter.tsx';
import { type FC, Fragment, useState } from 'react';
import { TrackAndTraceSite, type TrackAndTraceVisitor } from '../../../services/models/movement-report-model.ts';
import { Box, Button } from '@mui/material';
import type { IMovementsFilter, IVisitorFilter } from '../../../services/access-protect-services.ts';
import { SelectedEntitiesPanel } from './selected-entities/selected-entities-panel.tsx';
import { useToggleSelection } from './hooks/use-toggle-selection.ts';
import { SiteFilter } from './filters/site-filter/site-filter.tsx';

interface ISelectedEntities {
  visitors: TrackAndTraceVisitor[];
  vehicles: TrackAndTraceVisitor[];
  sites: TrackAndTraceSite[];
}

interface FilterPanelProps {
  visitors: TrackAndTraceVisitor[];
  sites: TrackAndTraceSite[];
  filter: IMovementsFilter | undefined;
  onFilterChange: (filter: IMovementsFilter | undefined) => void;
}

export const MovementsFilterPanel: FC<FilterPanelProps> = ({ visitors, sites, filter, onFilterChange }) => {
  const [selectedEntities, setSelectedEntities] = useState<ISelectedEntities | undefined>();

  const [selectedVisitors, toggleVisitor, setSelectedVisitors] = useToggleSelection([]);
  const [selectedVehicles, toggleVehicle, setSelectedVehicles] = useToggleSelection(filter?.vehicles ?? []);
  const [selectedSites, toggleSite, setSelectedSites] = useToggleSelection(filter?.sites ??[]);

  const applyFilter = () => {
    const _visitors = visitors.filter((x) => selectedVisitors.includes(x.logId));

    const _visitorsFilter: IVisitorFilter[] = _visitors.map((visitor) => {
      return({
        name: visitor.name,
        email: visitor.email,
        phone: `${visitor.contact?.countryCode}${visitor.contact?.phoneNumber}`,
      });
    });


    const _vehicles = visitors.filter((x) => selectedVehicles.includes(x.logId));

    const vehicles: string[] = _vehicles.map((visitor) => visitor.vehicleRegNo).filter((vehicle): vehicle is string => vehicle !== undefined);

    const _sites = sites.filter((x) => selectedSites.includes(x.id));
    const sitesIds: string[] = _sites.map((site) => site.id);

    setSelectedEntities({
      visitors: _visitors,
      vehicles: _vehicles,
      sites: _sites,
    });

    onFilterChange({
      visitors: _visitorsFilter,
      vehicles,
      sites: sitesIds,
    });
  };

  if (selectedEntities) {
    return (
      <Box>
        <SelectedEntitiesPanel
          visitors={selectedEntities.visitors}
          vehicles={selectedEntities.vehicles}
          sites={selectedEntities.sites}
        />

        <Button
          sx={{ mt: 2 }}
          size={'large'}
          fullWidth
          variant="outlined"
          disabled={[...selectedVisitors, ...selectedVehicles, ...selectedSites].length === 0}
          onClick={() => {
            setSelectedVisitors([]);
            setSelectedVehicles([]);
            setSelectedSites([]);

            setSelectedEntities(undefined);

            onFilterChange(undefined);
          }}
        >
          Clear Filters
        </Button>
      </Box>
    );
  }

  return (
    <Fragment>
      <VisitorFilter
        visitors={visitors}
        selected={selectedVisitors}
        onToggle={toggleVisitor}
      />

      <VehicleFilter
        visitors={
          visitors
            .filter((x) => (x.vehicleRegNo ?? '').length > 0)
            .filter((visitor, index, self) =>
              index === self.findIndex((v) => v.vehicleRegNo === visitor.vehicleRegNo),
            )
        }
        selected={selectedVehicles}
        onToggle={toggleVehicle }
      />

      <SiteFilter
        sites={sites}
        selected={selectedSites}
        onToggle={toggleSite}
      />

      <Box>
        <Button
          size={'large'}
          sx={{ mt: 2 }}
          fullWidth
          variant="contained"
          disabled={[...selectedVisitors, ...selectedVehicles, ...selectedSites].length === 0}
          onClick={() => applyFilter()}
        >
          Apply Filters
        </Button>
      </Box>
    </Fragment>
  );
};
