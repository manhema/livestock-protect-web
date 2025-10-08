import { FirebaseServices } from '../../../../shared/services/firebase-services.ts';
import { useQuery } from '@tanstack/react-query';

const datasource = new FirebaseServices();

export const useQueryAuthenticatedUser = () => {
  return useQuery({
    queryKey: ['queryAuthenticatedUser'],
    queryFn: async () => {
      return await datasource.listenForAuthenticated();
    },
  });
};
