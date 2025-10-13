import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import { Alert, Box, Container, Stack, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import dayjs, { Dayjs } from 'dayjs';
import { type FC, useState } from 'react';
import {
  LocationStatsCard,
} from '../../../../features/access-protect/components/dashboard/cards/location-stats-card.tsx';
import { ReasonStatsCard } from '../../../../features/access-protect/components/dashboard/cards/reason-stats-card.tsx';
import { SummaryStatistics } from '../../../../features/access-protect/components/dashboard/summary-statistics.tsx';
import { DateRangePicker } from '../../../../features/access-protect/components/date-range-picker.tsx';
import {
  AccessProtectMovementsMap,
} from '../../../../features/access-protect/components/maps/access-protect-movements-map.tsx';
import { FilterPanel } from '../../../../features/access-protect/components/maps/map-controls/filter-panel.tsx';
import type { IMovementsFilter } from '../../../../features/access-protect/services/access-protect-services.ts';
import type { MovementReport } from '../../../../features/access-protect/services/models/movement-report-model.ts';
import { useQueryOrganizationMovements } from '../../../../features/access-protect/state/server';
import {
  DailyTrafficStatsCard,
} from '../../../../features/access-protect/components/dashboard/cards/traffic/daily-traffic-stats-card.tsx';
import {
  HourlyTrafficStatsCard,
} from '../../../../features/access-protect/components/dashboard/cards/traffic/hourly-traffic-stats-card.tsx';


export const AccessProtectDashboardPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([dayjs().subtract(30, 'day').startOf('day'), dayjs().endOf('day')]);
  const [filter, setFilter] = useState<IMovementsFilter | undefined>();

  const { isLoading, error, data: movements } = useQueryOrganizationMovements(range, filter);

  return (
    <Box>
      <Container
        disableGutters={true}
        maxWidth={false}
        sx={{ p:2 }}
      >
        {error && <Alert sx={{ mb: 2 }} data-testid="error-message" severity="error">Something went wrong</Alert>}
        <Grid container spacing={2}
          sx={{
            my:1,
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          <Grid
            size={{
              xs: 12,
              ...(isFilterOpen ? { md: 8, lg: 9 } : { md: 12 }),
            }}
          >
            {/*  Date & Filter Panel  */}
            <Grid container spacing={2} sx={{ my:0 }}>
              <Grid size={{ sm: 3, md: 3 }}>
                <DateRangePicker value={range} onChange={setRange} />
              </Grid>
              <Grid size={{ sm: 5, md: 5 }}>
              </Grid>
              <Grid
                size={{ sm: 4, md: 4 }}
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <IconButton
                  onClick={() => {
                    setIsFilterOpen((prev) => !prev);
                  }}
                >
                  <TuneIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Divider sx={{ my:2 }} />
            <Stats
              isLoading={isLoading}
              movements={movements}
            />
          </Grid>

          {isFilterOpen && (
            <>
              <Grid
                size={{ xs: 12, md: 'auto' }}
                sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'stretch', justifyContent: 'center' }}
              >
                <Divider orientation="vertical" flexItem />
              </Grid>

              <Grid size={{ md: 3.8, lg: 2.9 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1">Filters</Typography>
                  <IconButton
                    onClick={() => {
                      setIsFilterOpen(false);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <Divider sx={{ my:2 }} />
                <FilterPanel
                  visitors={movements?.visitors ?? []}
                  sites={movements?.sites ?? []}
                  onFilterChange={(filter) => {
                    setFilter(filter);
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>

      </Container>
    </Box>
  );
};



interface StatsProps {
  isLoading: boolean;
  movements?: MovementReport;
}
const Stats: FC<StatsProps> = ({ isLoading ,  movements }) => {
  return (
    <Box>
      <SummaryStatistics isLoading={isLoading} movements={movements} />
      <Grid container spacing={2} sx={{ my:2 }}>
        <Grid size={{ sm: 6, md: 8 }}>
          {/*start locations*/}
          <LocationStatsCard isLoading={isLoading} movements={movements} />
          {/*end locations*/}

          {/*start reasons*/}
          <ReasonStatsCard isLoading={isLoading} movements={movements} />
          {/*end reasons*/}
        </Grid>
        <Grid size={{ sm: 6, md: 4 }}>
          <Card
            sx={{
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: '#fff',

              height: '100%',
              width: '100%',
              overflow: 'hidden', // Prevent scrolling
            }}
          >
            <AccessProtectMovementsMap
              isLoading={isLoading}
              movements={movements}
            />
          </Card>
        </Grid>
      </Grid>
      {/*start traffic*/}
      <Grid container spacing={2} sx={{ mt:2 }}>
        <Grid size={{ sm: 6, md: 8 }}>
          <HourlyTrafficStatsCard isLoading={isLoading} movements={movements} />
        </Grid>
        <Grid size={{ sm: 6, md: 4 }}>
          <DailyTrafficStatsCard isLoading={isLoading} movements={movements} />
        </Grid>
      </Grid>
      {/*end traffic*/}

    </Box>
  );
};
