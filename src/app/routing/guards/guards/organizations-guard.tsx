import { type FC, Fragment, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { useQueryOrganizations } from '../../../../features/user-management/state/server';

interface OrganizationsGuardProps {
  children: ReactNode;
}
export const OrganizationsGuard: FC<OrganizationsGuardProps> = ({ children }) => {

  const { isLoading, error, data } = useQueryOrganizations();

  if (isLoading)
    return <Box>Loading...</Box>;

  if (error)
    return <Box>{JSON.stringify(error)}</Box>;

  if (data) {
    return (<Fragment >{children}</Fragment>);
  }

  return (
    <Fragment>
      Organizations Guard Fallback
    </Fragment>
  );
};
