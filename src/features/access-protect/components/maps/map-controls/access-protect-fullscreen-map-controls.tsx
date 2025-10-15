import { type FC, Fragment, useState } from 'react';
import { Box, GlobalStyles, IconButton } from '@mui/material';
import type { MovementReport } from '../../../services/models/movement-report-model.ts';
import type { DateTimeRange } from '../../../types';
import type { IMovementsFilter } from '../../../services/access-protect-services.ts';
import type { PropertyModel } from '../../../../properties/services/models/property-model.ts';
import { type IPropertyOptionsFilter, PropertyDrillDownFilter } from '../../visits/forms/property-drill-down-filter.tsx';
import { DateRangePicker } from '../../date-range-picker.tsx';
import Divider from '@mui/material/Divider';
import TuneIcon from '@mui/icons-material/Tune';
import { MovementsFilterPanel } from './movements-filter-panel.tsx';
import Grid from '@mui/material/Grid';

interface AccessProtectFullScreenMapControlsProps {
  properties: PropertyModel[];
  options?: IPropertyOptionsFilter;
  onOptionsChange: (options: IPropertyOptionsFilter | undefined) => void;
  range: DateTimeRange;
  onRangeChange: (range: DateTimeRange) => void;
  filter?: IMovementsFilter;
  onFilterChange: (filter: IMovementsFilter | undefined) => void;
  isLoading: boolean;
  movements?: MovementReport;
}

export const AccessProtectFullScreenMapControls: FC<AccessProtectFullScreenMapControlsProps> = ({ properties, options, onOptionsChange, range, onRangeChange, movements, filter, onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <Box >
      <GlobalStyles
        styles={{
          '.MuiPopover-root, .MuiModal-root, .MuiPopper-root': {
            zIndex: '2147483647 !important',
          },
          '.MuiPopover-root': {
            zIndex: '2147483647 !important',
          },
        }}
      />
      {/*  Date & Filter Panel  */}


      <Grid container spacing={2} sx={{ my:2 }}>
        <Grid size={{ sm: 8, md: 8 }}>
          <DateRangePicker value={range} onChange={onRangeChange} />

        </Grid>
        <Grid size={{ sm: 4, md: 4 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
          >
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <PropertyDrillDownFilter
              properties={properties}
              options={options}
              onDrillDownFilter={(value) => {
                onOptionsChange(value);
              }}
            />
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <IconButton
              onClick={() => {
                setIsFilterOpen((prev) => !prev);
              }}
            >
              <TuneIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>


      {/* end: Date & Filter Panel  */}

      {isFilterOpen && (
        <Fragment>
          <Divider sx={{ my:2 }} />
          <MovementsFilterPanel
            visitors={movements?.visitors ?? []}
            sites={movements?.sites ?? []}
            filter={filter}
            onFilterChange={onFilterChange}
          />
        </Fragment>
      )}
    </Box>
  );
};

