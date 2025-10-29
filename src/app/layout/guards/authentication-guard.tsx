import { type FC, Fragment, type ReactNode } from 'react';
import { useQueryAuthenticatedUser } from '../../../features/authentication/state/server';
import { Box } from '@mui/material';


interface AuthenticationGuardProps {
  fallback: ReactNode;
  children: ReactNode;
}
export const AuthenticationGuard: FC<AuthenticationGuardProps> = ({ fallback, children }) => {
  const { isLoading, error, data } = useQueryAuthenticatedUser();

  if (isLoading)
    return <Box>Loading...</Box>;

  if (error)
    return <Box>{JSON.stringify(error)}</Box>;

  if (data) {
    return (<Fragment>{children}</Fragment>);
  }

  return (<Fragment>{fallback}</Fragment>);
};
