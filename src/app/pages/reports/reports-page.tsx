import { Fragment } from 'react';
import { useQueryAuthenticatedUser } from '../../../features/authentication/state/server';
import { Box } from '@mui/material';

export const ReportsPage = () => {
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
