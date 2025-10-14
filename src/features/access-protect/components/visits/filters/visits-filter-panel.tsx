import { type FC, Fragment, useState } from 'react';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import type { VisitModel } from '../../../services/models/visit-model.ts';
import type { SiteModel } from '../../../services/models/site-model.ts';
import { VisitsSiteFilter } from './visits-site-filter/visits-site-filter.tsx';
import type { IVisitorFilter } from '../../../services/access-protect-services.ts';
import { useToggleSelection } from '../../maps/map-controls/hooks/use-toggle-selection.ts';
import { VisitsSelectedEntitiesPanel } from './visits-selected-entities/visits-selected-entities-panel.tsx';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import Divider from '@mui/material/Divider';


export interface IVisitsFilter {
  keywords: string;
  visitors: IVisitorFilter[];
  vehicles: string[];
  sites: string[];
}

interface ISelectedEntities {
  visitors: VisitModel[];
  vehicles: VisitModel[];
  sites: SiteModel[];
}

interface VisitsFilterPanel {
  visits: VisitModel[];
  sites: SiteModel[];
  filter: IVisitsFilter | undefined;
  onFilterChange: (filter: IVisitsFilter | undefined) => void;
}

export const VisitsFilterPanel: FC<VisitsFilterPanel> = ({ visits, sites, filter, onFilterChange }) => {
  const [inputValue, setInputValue] = useState('');

  const [selectedEntities, setSelectedEntities] = useState<ISelectedEntities | undefined>();

  const [selectedVisitors, toggleVisitor, setSelectedVisitors] = useToggleSelection([]);
  const [selectedVehicles, toggleVehicle, setSelectedVehicles] = useToggleSelection([]);
  const [selectedSites, toggleSite, setSelectedSites] = useToggleSelection(filter?.sites ?? []);

  const applyFilter = () => {
    const _visitors = visits.filter((x) => selectedVisitors.includes(x.id));

    const _visitorsFilter: IVisitorFilter[] = _visitors.map((visitor) => {
      return({
        name: `${visitor.user.firstName} ${visitor.user.lastName}`,
        email: visitor.user.email,
        phone: `${visitor.user.contact?.countryCode}${visitor.user.contact?.phoneNumber}`,
      });
    });


    const _vehicles = visits.filter((x) => selectedVehicles.includes(x.id));

    const vehicles: string[] = _vehicles.map((visitor) => visitor.vehicleRegNo).filter((vehicle): vehicle is string => vehicle !== undefined);

    const _sites = sites.filter((x) => selectedSites.includes(x.id));
    const sitesIds: string[] = _sites.map((site) => site.id);

    setSelectedEntities({
      visitors: _visitors,
      vehicles: _vehicles,
      sites: _sites,
    });

    onFilterChange({
      keywords: inputValue,
      visitors: _visitorsFilter,
      vehicles,
      sites: sitesIds,
    });
  };

  if (selectedEntities) {
    return (
      <Box>
        <VisitsSelectedEntitiesPanel
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
      <TextField
        variant="outlined"
        size="small"
        // label="Controlled"
        placeholder="Keywords..."
        value={inputValue}
        fullWidth
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(event.target.value);
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {/*{params.InputProps.endAdornment}*/}
              </React.Fragment>
            ),
          },
        }}
      />
      <Divider sx={{ my:2 }} />

      {/*<VisitorFilter*/}
      {/*  visitors={visitors}*/}
      {/*  selected={selectedVisitors}*/}
      {/*  onToggle={toggleVisitor}*/}
      {/*/>*/}

      {/*<VehicleFilter*/}
      {/*  visitors={*/}
      {/*    visitors*/}
      {/*      .filter((x) => (x.vehicleRegNo ?? '').length > 0)*/}
      {/*      .filter((visitor, index, self) =>*/}
      {/*        index === self.findIndex((v) => v.vehicleRegNo === visitor.vehicleRegNo),*/}
      {/*      )*/}
      {/*  }*/}
      {/*  selected={selectedVehicles}*/}
      {/*  onToggle={toggleVehicle }*/}
      {/*/>*/}

      <VisitsSiteFilter
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
