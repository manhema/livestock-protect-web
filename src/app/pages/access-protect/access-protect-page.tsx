import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import { Alert, Box, Container, Stack, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import dayjs, { Dayjs } from 'dayjs';
import { type FC, Fragment, useState } from 'react';
import { LocationStatsCard } from '../../../features/access-protect/components/dashboard/cards/location-stats-card.tsx';
import { ReasonStatsCard } from '../../../features/access-protect/components/dashboard/cards/reason-stats-card.tsx';
import { SummaryStatistics } from '../../../features/access-protect/components/dashboard/summary-statistics.tsx';
import { DateRangePicker } from '../../../features/access-protect/components/date-range-picker.tsx';
import {
  AccessProtectMovementsMap,
} from '../../../features/access-protect/components/maps/access-protect-movements-map.tsx';
import {
  MovementsFilterPanel,
} from '../../../features/access-protect/components/maps/map-controls/movements-filter-panel.tsx';
import type { IMovementsFilter } from '../../../features/access-protect/services/access-protect-services.ts';
import {
  useQueryAccessProtectProperties,
  useQueryOrganizationMovements,
} from '../../../features/access-protect/state/server';
import {
  DailyTrafficStatsCard,
} from '../../../features/access-protect/components/dashboard/cards/traffic/daily-traffic-stats-card.tsx';
import {
  HourlyTrafficStatsCard,
} from '../../../features/access-protect/components/dashboard/cards/traffic/hourly-traffic-stats-card.tsx';
import { useOrganizationStore } from '../../../features/user-management/state/client/store.ts';
import type { PropertyModel } from '../../../features/properties/services/models/property-model.ts';
import {
  type IPropertyOptionsFilter,
  PropertyDrillDownFilter,
} from '../../../features/access-protect/components/visits/forms/property-drill-down-filter.tsx';
import {
  AccessProtectFullScreenMapControls,
} from '../../../features/access-protect/components/maps/map-controls/access-protect-fullscreen-map-controls.tsx';
import { AlertsStatistics } from '../../../features/access-protect/components/dashboard/alerts-statistics.tsx';

interface AccessProtectDashboardProps {
  properties: PropertyModel[];
}
const AccessProtectDashboard: FC<AccessProtectDashboardProps> = ({ properties }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([dayjs().subtract(30, 'day').startOf('day'), dayjs().endOf('day')]);
  const [filter, setFilter] = useState<IMovementsFilter | undefined>();
  const [options, setOptions] = useState<IPropertyOptionsFilter | undefined>();

  const { isLoading, error, data: movements } = useQueryOrganizationMovements(range, filter, options);

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
              <Grid
                size={{ sm: 9, md: 9 }}
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                <PropertyDrillDownFilter
                  properties={properties}
                  options={options}
                  onDrillDownFilter={(value) => {
                    setOptions(value);
                    setFilter(undefined);
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
              </Grid>
            </Grid>
            {/* end: Date & Filter Panel  */}
            <Divider sx={{ my:2 }} />
            {/*<Stats*/}
            {/*  isLoading={isLoading}*/}
            {/*  movements={movements}*/}
            {/*/>*/}
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
                    }}
                  >
                    <AccessProtectMovementsMap
                      isLoading={isLoading}
                      // propertyId={options?.propertyId}
                      movements={movements}
                      controls={(
                        <Box >
                          <AccessProtectFullScreenMapControls
                            isLoading={isLoading}
                            properties={properties}
                            options={options}
                            onOptionsChange={(_options) => {
                              setOptions(_options);
                              setFilter(undefined);
                            }}
                            range={range}
                            onRangeChange={(_range) => {
                              setRange(_range);
                            }}
                            filter={filter}
                            onFilterChange={(_filter) => {
                              setFilter(_filter);
                            }}
                            movements={movements}
                          />
                        </Box>
                      )}
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

              <AlertsStatistics isLoading={isLoading} movements={movements} />
            </Box>

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
                <MovementsFilterPanel
                  visitors={movements?.visitors ?? []}
                  sites={movements?.sites ?? []}
                  filter={filter}
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

export const AccessProtectPage = () => {
  const { organizationId } = useOrganizationStore();

  const { isLoading, error, data: properties } = useQueryAccessProtectProperties(organizationId!);

  if (isLoading)
    return <Box>Loading...</Box>;

  if (error)
    return <Box>{JSON.stringify(error)}</Box>;

  if (properties) {
    return (
      <Box>
        <AccessProtectDashboard properties={properties}/>
      </Box>
    );
  }

  return (
    <Fragment>
      Nothing
    </Fragment>
  );
};
