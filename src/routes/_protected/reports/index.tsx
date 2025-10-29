import { createFileRoute } from '@tanstack/react-router';
import { Fragment } from 'react';
import { useQueryAuthenticatedUser } from '../../../features/authentication/state/server';
import { Box } from '@mui/material';

const RouteComponent = () => {
  const { isLoading, error, data } = useQueryAuthenticatedUser();

  if (isLoading)
    return <Box>Loading...</Box>;

  if (isLoading)
    return <Box>{JSON.stringify(error)}</Box>;

  if (data) {
    return (
      <Box >
        Reports
      </Box>
    );
  }

  return (
    <Fragment>
      Nothing
    </Fragment>
  );
};


export const Route = createFileRoute('/_protected/reports/')({
  component: RouteComponent,
});
