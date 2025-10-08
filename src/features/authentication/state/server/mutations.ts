import { FirebaseServices } from '../../../../shared/services/firebase-services.ts';
import { useMutation } from '@tanstack/react-query';
import type { LoginRequest } from '../../types/request.ts';

import { queryClient } from '../../../../core/query-client.tsx';

const datasource = new FirebaseServices();

export const useMutationSignInWithEmailAndPassword = () => {
  return useMutation({
    mutationFn: async (request: LoginRequest) => {
      return await datasource.signInWithEmailAndPassword(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['queryAuthenticatedUser'],
        refetchType: 'active',
      });
    },
  });
};
