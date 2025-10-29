import { useQuery } from '@tanstack/react-query';
import { PointsOfInterestServices } from '../../services/points-of-interest-services.ts';

const datasource = new PointsOfInterestServices();

export const useQueryPointsOfInterest = () => {
  return useQuery({
    queryKey: ['queryPointsOfInterest'],
    queryFn: async () => {
      return await datasource.getPointsOfInterest();
    },
  });
};

export const useQueryPointOfInterest = (pointOfInterestId: string) => {
  return useQuery({
    queryKey: ['queryPointsOfInterest', pointOfInterestId],
    queryFn: async () => {
      return await datasource.getPointOfInterest(pointOfInterestId);
    },
  });
};
