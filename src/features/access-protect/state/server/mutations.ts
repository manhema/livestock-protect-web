import { AccessProtectServices } from '../../services/access-protect-services.ts';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { queryClient } from '../../../../core/query-client.tsx';

const datasource = new AccessProtectServices();

export const useMutationCheckoutVisitor = (propertyId: string, visitId: string) => {
  return useMutation({
    mutationFn: async (datetime: dayjs.Dayjs) => {
      await datasource.checkOutVisitor(propertyId, visitId, datetime);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['queryVisit', propertyId, visitId],
        refetchType: 'active',
      });
      await queryClient.invalidateQueries({
        queryKey: ['queryVisitsByPropertyId', propertyId],
        refetchType: 'active',
      });
    },
  });
};
