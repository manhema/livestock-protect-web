import { createFileRoute } from '@tanstack/react-router';

import { Fragment } from 'react';
import { useQueryAuthenticatedUser } from '../../features/authentication/state/server';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { SharedAppMap } from '../../shared/components/shared-app-map.tsx';

const RouteComponent = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const { isLoading, error, data } = useQueryAuthenticatedUser();

  if (isLoading)
    return <Box>Loading...</Box>;

  if (isLoading)
    return <Box>{JSON.stringify(error)}</Box>;

  if (data) {
    const _center = { lat: 54.00366, lng: -2.547855 };
    const _zoom = 6;

    return (
      <Fragment>
        <Box
          sx={(theme) => ({
            // Calculate height by subtracting AppBar height
            height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 8px)`,
            width: '100%',
            overflow: 'hidden', // Prevent scrolling
          })}
        >
          <SharedAppMap defaultZoom={_zoom} defaultCenter={_center} mapTypeId="terrain" zoomControl={!matches} style={{ width: '100%', height: '100%' }}>
            {/*<>Home</>        */}
          </SharedAppMap>
        </Box>
      </Fragment>
    );
  }

  return (
    <Fragment>
      Nothing
    </Fragment>
  );
};

export const Route = createFileRoute('/_protected/')({
  component: RouteComponent,
});
