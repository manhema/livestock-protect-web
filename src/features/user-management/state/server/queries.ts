import { useQuery } from '@tanstack/react-query';
import { UserManagementServices } from '../../services/user-management-services.ts';

const datasource = new UserManagementServices();

export const useQueryPolicyInformation = (organizationId: string,  userId: string) => {
  return useQuery({
    queryKey: ['queryPolicyInformation', organizationId, userId],
    queryFn: async () => {
      return await datasource.getPolicyInformation(organizationId, userId);
    },
  });
};
