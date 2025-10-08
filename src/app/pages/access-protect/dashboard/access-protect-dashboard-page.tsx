import { Fragment } from 'react';
import { Box } from '@mui/material';
import { useQueryAuthenticatedUser } from '../../../../features/authentication/state/server';

export const AccessProtectDashboardPage = () => {
  const { isLoading, error, data } = useQueryAuthenticatedUser();

  if (isLoading)
    return <Box>Loading...</Box>;

  if (isLoading)
    return <Box>{JSON.stringify(error)}</Box>;

  if (data) {
    return (
      <Box >
        DashBoard
      </Box>
    );
  }

  return (
    <Fragment>
      Nothing
    </Fragment>
  );
};
