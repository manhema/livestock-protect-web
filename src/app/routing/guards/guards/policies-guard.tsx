import { type FC, Fragment, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { useQueryPolicyInformation } from '../../../../features/user-management/state/server';
import { useOrganizationStore } from '../../../../features/user-management/state/client/store.ts';
import type { UserModel } from '../../../../features/user-management/services/models/user-model.ts';


interface PoliciesGuardInitializerProps {
  organizationId: string;
  user: UserModel;
  children: ReactNode;
}
const PoliciesGuardInitializer: FC<PoliciesGuardInitializerProps> = ({ organizationId, user, children }) => {

  const { isLoading, error, data } = useQueryPolicyInformation(organizationId, user.id);

  if (!organizationId) {
    return <Fragment>organization not set</Fragment>;
  }

  if (!user) {
    return <Fragment>organization not set</Fragment>;
  }

  if (isLoading)
    return <Box>Loading...</Box>;

  if (isLoading)
    return <Box>{JSON.stringify(error)}</Box>;

  if (data) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Fragment>
      Policies Guard Initializer
    </Fragment>
  );
};

interface OrganizationsGuardProps {
  children: ReactNode;
}
export const PoliciesGuard: FC<OrganizationsGuardProps> = ({ children }) => {

  const { organizationId, user } = useOrganizationStore();

  if (organizationId && user) {
    return (
      <PoliciesGuardInitializer organizationId={organizationId} user={user} >
        {children}
      </PoliciesGuardInitializer>
    );
  }

  if (!organizationId) {
    return <Fragment>organization not set</Fragment>;
  }

  if (!user) {
    return <Fragment>organization not set</Fragment>;
  }

  return (
    <Fragment>
      Policies Guard Fallback
    </Fragment>
  );
};


