import { type FC, Fragment } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import type { MovementReport } from '../../services/models/movement-report-model.ts';
import { DateRangePicker } from '../date-range-picker.tsx';
import type { DateTimeRange } from '../../types';
import { FilterPanel } from './map-controls/filter-panel.tsx';
import type { IMovementsFilter } from '../../services/access-protect-services.ts';
import Divider from '@mui/material/Divider';
import { AccessProtectMovementsMap } from './access-protect-movements-map.tsx';

interface AccessProtectProps {
  range: DateTimeRange;
  setRange: (range: DateTimeRange) => void;
  onFilterChange: (filter: IMovementsFilter | undefined) => void;
  isLoading: boolean;
  propertyId?: string;
  movements?: MovementReport;
}
export const AccessProtectMovements: FC<AccessProtectProps> = ({  range, setRange, onFilterChange, isLoading, movements, propertyId }) => {
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid size={{ sm: 8, md: 8, lg: 9, xl: 9 }}>
          <Box
            sx={(theme) => ({
              // Calculate height by subtracting AppBar height
              height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 8px)`,
              width: '100%',
              overflow: 'hidden', // Prevent scrolling
            })}
          >
            <AccessProtectMovementsMap
              propertyId={propertyId}
              isLoading={isLoading}
              movements={movements}
              // range={range}
              // setRange={setRange}
              // onFilterChange={onFilterChange}
            />
          </Box>
        </Grid>

        <Grid size={{ sm: 4, md: 4, lg: 3, xl: 3 }}>
          <Box sx={{ my: 2, mr:2 }}>
            <Paper elevation={3} sx={{ p: 2, my:2 }}>
              <Box sx={{ mb: 2 }}>
                <DateRangePicker value={range} onChange={setRange} />
              </Box>

              <Divider/>
              <Box sx={{ mt: 2 }}>
                <FilterPanel
                  visitors={movements?.visitors ?? []}
                  sites={movements?.sites ?? []}
                  onFilterChange={(filter) => {
                    onFilterChange(filter);
                  }}
                />
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

