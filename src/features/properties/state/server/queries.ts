import { useQuery } from '@tanstack/react-query';
import { PropertyServices } from '../../services/property-services.ts';

const datasource = new PropertyServices();

export const useQueryProperties = () => {
  return useQuery({
    queryKey: ['queryProperties'],
    queryFn: async () => {
      return await datasource.getProperties();
    },
  });
};

