import { PointsOfInterestServices } from '../../services/points-of-interest-services.ts';
import { useMutation } from '@tanstack/react-query';
import type { EnablePointOfInterestRequest, PointOfInterestRequest } from '../../services/models/requests.tsx';
import { queryClient } from '../../../../core/query-client.tsx';

const datasource = new PointsOfInterestServices();

export const useMutationCreatePointOfInterest = () => {
  return useMutation({
    mutationFn: async (request: PointOfInterestRequest) => {
      return await datasource.createPointOfInterest(request);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['queryPointsOfInterest'],
        refetchType: 'active',
      });
    },
  });
};

export const useMutationEditPointOfInterest = (pointOfInterestId: string) => {
  return useMutation({
    mutationFn: async (request: PointOfInterestRequest) => {
      return await datasource.editPointOfInterest(pointOfInterestId, request);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['queryPointsOfInterest'],
        refetchType: 'active',
      });

      await queryClient.invalidateQueries({
        queryKey: ['queryPointOfInterest', pointOfInterestId],
        refetchType: 'active',
      });
    },
  });
};

export const useMutationEnablePointOfInterest = (pointOfInterestId: string) => {
  return useMutation({
    mutationFn: async (request: EnablePointOfInterestRequest) => {
      return await datasource.enablePointOfInterest(pointOfInterestId, request);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['queryPointsOfInterest'],
        refetchType: 'active',
      });

      await queryClient.invalidateQueries({
        queryKey: ['queryPointOfInterest', pointOfInterestId],
        refetchType: 'active',
      });
    },
  });
};

export const useMutationDeletePointOfInterest = (pointOfInterestId: string) => {
  return useMutation({
    mutationFn: async () => {
      return await datasource.deletePointOfInterest(pointOfInterestId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['queryPointsOfInterest'],
        refetchType: 'active',
      });

      await queryClient.invalidateQueries({
        queryKey: ['queryPointOfInterest', pointOfInterestId],
        refetchType: 'active',
      });
    },
  });
};
