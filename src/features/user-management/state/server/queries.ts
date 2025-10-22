import { useQuery } from '@tanstack/react-query';
import { UserManagementServices } from '../../services/user-management-services.ts';
import { useOrganizationStore } from '../client/store.ts';
import { OrganizationUtil } from '../../../../shared/utils/organization-util.ts';

const datasource = new UserManagementServices();

export const useQueryOrganizations = () => {
  const { setOrganizationId,  setOrganizations, setUser } = useOrganizationStore();

  return useQuery({
    queryKey: ['queryOrganizations'],
    queryFn: async () => {
      const user = await datasource.getUser();
      const organizations =  await datasource.getOrganizations();

      const organizationId = OrganizationUtil.getCurrentOrganization();

      if (organizationId) {
        const  exists = organizations.find((org) => org.id === organizationId);
        if (exists) {
          setOrganizationId(organizationId);
        }else {

          const defaultOrganizationId = organizations[0].id;

          setOrganizationId(defaultOrganizationId);
          OrganizationUtil.setCurrentOrganization(defaultOrganizationId);
        }
      } else {
        const defaultOrganizationId = organizations[0].id;

        setOrganizationId(defaultOrganizationId);
        OrganizationUtil.setCurrentOrganization(defaultOrganizationId);
      }

      setOrganizations(organizations);
      setUser(user);

      return organizations;
    },
  });
};

export const useQueryPolicyInformation = (organizationId: string,  userId: string) => {
  const { setPolicies } = useOrganizationStore();

  return useQuery({
    queryKey: ['queryPolicyInformation', organizationId, userId],
    queryFn: async () => {
      const policies = await datasource.getPolicyInformation(organizationId, userId);
      setPolicies(policies);
      return policies;
    },
  });
};
