import { type FC, Fragment, type ReactNode, useEffect, useRef, useState } from 'react';
import { Box, IconButton, LinearProgress, Paper, useMediaQuery, useTheme } from '@mui/material';
import { SharedAppMap } from '../../../../shared/components/shared-app-map.tsx';
import type {
  MovementPathModel,
  MovementReport,
  TrackAndTraceSite,
} from '../../services/models/movement-report-model.ts';
import { computeBounds, getSiteById } from '../../utils/maths.ts';
import { MovementsLegend } from './map-content/map-legend/movements-legend.tsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { InfoWindows } from './map-content/info-windows/info-windows.tsx';
import { SiteMarkers } from './map-content/site-markers/site-markers.tsx';
import { MovementPaths } from './map-content/movement-paths/movement-paths.tsx';
import { useNavigate } from '@tanstack/react-router';
import { ControlPosition, MapControl } from '@vis.gl/react-google-maps';
import { useFullscreen } from '../../../../shared/utils/hooks/use-fullscreen-hook.ts';
import { MapPortalContext } from '../../utils/context/portal-context.tsx';
import { MapFitBounds } from '../../../../shared/components/map-fit-bounds.tsx';

interface AccessProtectMovementsMapProps {
  isLoading: boolean;
  propertyId?: string;
  movements?: MovementReport;
  controls?: ReactNode;
}
export const AccessProtectMovementsMap: FC<AccessProtectMovementsMapProps> = ({ isLoading, movements, propertyId, controls }) => {
  const navigate = useNavigate();
  const controlsPortalRef = useRef<HTMLDivElement>(null);
  const fullscreen = useFullscreen();

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
      {isLoading && (<LinearProgress variant="indeterminate" sx={{ width: '100%' }} />)}
      <Box style={{ width: '100%', height: '100%' }}>
        <SharedAppMap
          // key={`map-${JSON.stringify(mapBounds)}`}
          //   key={fullscreen.isFullscreen ? 'map-stable' : `map-${JSON.stringify(mapBounds)}`}
          key={'map-stable' }
          defaultBounds={computeBounds(movements?.sites ?? [], movements?.movementPaths ?? [])}
          onBoundsChanged={() => {}}
          mapTypeId="terrain"
          zoomControl={!matches}
          style={{ width: '100%', height: '100%' }}
          fullscreenControl={true}
          mapTypeControlOptions={{ position: ControlPosition.LEFT_TOP }}
        >
          <MapFitBounds bounds={mapBounds} />

          <div ref={controlsPortalRef}>
            {fullscreen.isFullscreen && (
              <MapControl position={ControlPosition.RIGHT_TOP}>
                <MapPortalContext.Provider value={controlsPortalRef.current}>
                  <Box sx={{ mx:'10px' }}>

                    {isLoading && (<LinearProgress variant="indeterminate" sx={{ width: '100%' }} />)}
                    <Paper elevation={3}
                      sx={{
                        px: 2,
                        py:1,
                        background: 'none rgb(255, 255, 255)',
                      }}
                    >
                      {controls}
                    </Paper>
                  </Box>

                </MapPortalContext.Provider>

              </MapControl>

            )}
          </div>
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

              <MapControl position={ControlPosition.LEFT_TOP}>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  mt={1}
                  ml={1}
                >
                  {propertyId && (
                    <IconButton
                      // href="/access-control/dashboard"
                      onClick={
                        () => navigate({ to: '/access/protect' })
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
              </MapControl>
            </Fragment>
          )}
        </SharedAppMap>
      </Box>
    </Fragment>
  );
};

