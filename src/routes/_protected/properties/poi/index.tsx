import { createFileRoute } from '@tanstack/react-router';
import { useQueryPointsOfInterest } from '../../../../features/points-of-interest/state/server';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { type FC, Fragment } from 'react';
import { BasicBreadcrumbs } from '../../../../shared/components/breadcrumbs/basic-breadcrumbs.tsx';
import type { PointOfInterestModel } from '../../../../features/points-of-interest/services/models/responses.tsx';
import Container from '@mui/material/Container';
import { SharedAppMap } from '../../../../shared/components/shared-app-map.tsx';
import Card from '@mui/material/Card';
import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Divider from '@mui/material/Divider';
import TuneIcon from '@mui/icons-material/Tune';
import { SortSelectionFilter } from '../../../../features/points-of-interest/components/filters/sort-down-filter.tsx';

interface ContentProps {
  poi: PointOfInterestModel[];
}
const Content: FC<ContentProps> = ({ poi }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  if (poi.length === 0) {
    return     (
      <Box textAlign="center">
        <Alert data-testid="error-message" severity="info">No points of interest found</Alert>
      </Box>
    );
  }

  return (
    <Fragment>
      <Card
        sx={{
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: '#fff',
          height: '25rem',
          width: '100%',
        }}
      >
        <SharedAppMap
          defaultZoom={5}
          defaultCenter={{ lat: 54.00366, lng: -2.547855 }}
          mapTypeId="terrain"
          zoomControl={!matches}
          style={{ width: '100%', height: '100%' }}
          fullscreenControl={true}
        >
          {/*<>Home</>        */}
        </SharedAppMap>
      </Card>
      POI
      {JSON.stringify(poi)}
    </Fragment>
  );

};

export const RouteComponent = () => {
  const { isLoading, error, data } = useQueryPointsOfInterest();

  if (isLoading) {
    return (
      <Box sx={{ my: 2 }} textAlign="center">
        <CircularProgress/>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mx: 2, my: 2 }} textAlign="center">
        <Alert data-testid="error-message" severity="error">Something went wrong</Alert>
      </Box>
    );
  }

  if (data) {
    return (
      <Fragment>
        <BasicBreadcrumbs
          label={'Points of Interest'}
          links={[{
            name: 'Properties',
            href: '/properties',
          }]}
        />
        <Container
          disableGutters={true}
          maxWidth={false}
          sx={{ p: 2 }}
        >

          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
          >
            <Button
              type="button"
              size="medium"
              variant="contained"
              sx={{ my: 0, mx: 1, fontSize: '75%' }}
              // onClick={handleOpen}
            >
              <small>Point Of Interest</small>
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              type="button"
              size="medium"
              variant="contained"
              sx={{ my: 0, mx: 1, fontSize: '75%' }}
              // onClick={handleOpen}
            >
              <small>Export</small>
            </Button>
            <IconButton
              onClick={() => {
                // setSidecar((prev) => {
                //   const open = !(prev.open && prev.toolbox === 'sites');
                //   return { open, toolbox: 'sites' };
                // });
              }}
            >
              <SettingsOutlinedIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <IconButton
              onClick={() => {
                // setSidecar((prev) => {
                //   const open = !(prev.open && prev.toolbox === 'filters');
                //   return { open, toolbox: 'filters' };
                // });
              }}
            >
              <TuneIcon />
            </IconButton>
            <SortSelectionFilter onDrillDownFilter={(value) => {}} />
          </Box>

          <Divider sx={{ my:2 }} />

          <Content poi={data} />
        </Container>
      </Fragment>
    );
  }

  return <Fragment/>;
};


export const Route = createFileRoute('/_protected/properties/poi/')({
  component: RouteComponent,
});

