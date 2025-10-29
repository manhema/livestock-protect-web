import { createFileRoute } from '@tanstack/react-router';

import { Fragment } from 'react';
import { Box } from '@mui/material';
import { useQueryAuthenticatedUser } from '../../../../../features/authentication/state/server';

const RouteComponent = () => {
  const { isLoading, error, data } = useQueryAuthenticatedUser();

  if (isLoading)
    return <Box>Loading...</Box>;

  if (isLoading)
    return <Box>{JSON.stringify(error)}</Box>;

  if (data) {
    return (
      <Box >
        e-BAS
      </Box>
    );
  }

  return (
    <Fragment>
      Nothing
    </Fragment>
  );
};

export const Route = createFileRoute('/_protected/contingency/planning/ebas/')({
  component: RouteComponent,
});

