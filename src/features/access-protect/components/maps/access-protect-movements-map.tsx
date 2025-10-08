import { type FC, Fragment, useEffect, useState } from 'react';
import { Box, Grid, IconButton, LinearProgress, Paper, useMediaQuery, useTheme } from '@mui/material';
import { SharedAppMap } from '../../../../shared/components/shared-app-map.tsx';
import type {
  MovementPathModel,
  MovementReport,
  TrackAndTraceSite,
} from '../../services/models/movement-report-model.ts';
import { DateRangePicker } from '../date-range-picker.tsx';
import type { DateTimeRange } from '../../types';
import { computeBounds, getSiteById } from '../../utils/maths.ts';
import { MovementsLegend } from './map-content/map-legend/movements-legend.tsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { InfoWindows } from './map-content/info-windows/info-windows.tsx';
import { SiteMarkers } from './map-content/site-markers/site-markers.tsx';
import { MovementPaths } from './map-content/movement-paths/movement-paths.tsx';
import { FilterPanel } from './map-controls/filter-panel.tsx';
import type { IMovementsFilter } from '../../services/access-protect-services.ts';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router';

interface AccessProtectProps {
  range: DateTimeRange;
  setRange: (range: DateTimeRange) => void;
  onFilterChange: (filter: IMovementsFilter | undefined) => void;
  isLoading: boolean;
  propertyId?: string;
  movements?: MovementReport;
}
export const AccessProtectMovementsMap: FC<AccessProtectProps> = ({  range, setRange, onFilterChange, isLoading, movements, propertyId }) => {
  const navigate = useNavigate();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const [selectedMovement, setSelectedMovement] = useState<any>(null);
  const [selectedSite, setSelectedSite] = useState<TrackAndTraceSite | null>(null);

  const handleMovementClick = (
    sourceDestCount: MovementPathModel['sourceDestCounts'][0],
    pathData: MovementPathModel,
    movements: MovementReport,
    setSelectedMovement: (movement: any) => void,
  ) => {
    if (!sourceDestCount) return;

    const fromSite = getSiteById(sourceDestCount.sourceId, movements.sites);
    const toSite = getSiteById(sourceDestCount.destId, movements.sites);
    if (!fromSite || !toSite) return;

    const midpoint = {
      lat: (fromSite.location.latitude + toSite.location.latitude) / 2,
      lng: (fromSite.location.longitude + toSite.location.longitude) / 2,
    };

    setSelectedMovement({
      sites: [fromSite.name, toSite.name],
      counts: {
        fromTo: sourceDestCount.sourceToDestCount,
        toFrom: sourceDestCount.destToSourceCount,
      },
      color: pathData.color,
      totalMovements: sourceDestCount.sourceToDestCount + sourceDestCount.destToSourceCount,
      midpoint,
    });
  };


  const [mapBounds, setMapBounds] = useState(
    computeBounds(movements?.sites ?? [], movements?.movementPaths ?? []),
  );

  useEffect(() => {
    setMapBounds(computeBounds(movements?.sites ?? [], movements?.movementPaths ?? []));
  }, [movements]);


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
            {isLoading && (<LinearProgress variant="indeterminate" sx={{ width: '100%' }} />)}
            <Box style={{ width: '100%', height: '100%' }}>
              <SharedAppMap
                key={`map-${JSON.stringify(mapBounds)}`}
                defaultBounds={computeBounds(movements?.sites ?? [], movements?.movementPaths ?? [])}
                onBoundsChanged={() => {}}
                mapTypeId="terrain"
                zoomControl={!matches}
                style={{ width: '100%', height: '100%' }}
              >

                {/*
                <Box
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    // Ensure it stays centered within the map container
                    width: 'auto',
                    maxWidth: '24rem',
                  }}
                >
                  <Paper elevation={3} sx={{ p: 2, my:2 }}>
                    <Box sx={{ mb: 2 }}>
                      <DateRangePicker value={range} onChange={setRange} />
                    </Box>

                    <Divider/>
                    <Box sx={{ mt: 2 }}>
                      <SearchFilters
                        visitors={movements?.visitors ?? []}
                        onFilterChange={(filter) => {
                          onFilterChange(filter);
                        }}
                      />
                    </Box>
                  </Paper>
                </Box>
                */}


                {movements && (
                  <Fragment>
                    {/* Movement Paths */}
                    <MovementPaths
                      movementPaths={movements?.movementPaths ?? []}
                      sites={movements?.sites ?? []}
                      onClick={(sourceDestCount, pathData) => {
                        handleMovementClick(sourceDestCount, pathData, movements, setSelectedMovement);
                      }}
                    />


                    {/* Site Markers */}
                    <SiteMarkers
                      sites={movements?.sites ?? []}
                      siteVisitCounts={movements?.siteVisitCounts}
                      visitors={movements?.visitors ?? []}
                      setSelectedSite={setSelectedSite}
                    />

                    {/* Info Windows */}
                    <InfoWindows
                      selectedMovement={selectedMovement}
                      setSelectedMovement={setSelectedMovement}
                      selectedSite={selectedSite}
                      setSelectedSite={setSelectedSite}
                      sites={movements?.sites ?? []}
                      propertyId={propertyId}
                    />


                    <Box
                      position="absolute"
                      top="10px"
                      left="10px"
                      zIndex={10}
                      display="flex"
                      alignItems="flex-start">
                      {propertyId && (
                        <IconButton
                          // href="/access-control/dashboard"
                          onClick={
                            () => navigate('/access/protect')
                          }
                          sx={{
                            'bgcolor': 'white',
                            'borderRadius': '50%',
                            'width': 32,
                            'height': 32,
                            'boxShadow': 1,
                            'mr': 1,
                            '&:hover': {
                              bgcolor: 'grey.100',
                            },
                          }}>
                          <ArrowBackIcon sx={{ fontSize: '18px', color: 'black' }} />
                        </IconButton>
                      )}
                      <MovementsLegend />

                    </Box>

                  </Fragment>
                )}
              </SharedAppMap>
            </Box>
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

