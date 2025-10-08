import { useQuery } from '@tanstack/react-query';
import { AccessProtectServices, type IMovementsFilter } from '../../services/access-protect-services.ts';
import type { DateTimeRange } from '../../types';

const datasource = new AccessProtectServices();

export const useQueryAccessProtectProperties = (organizationId: string) => {
  return useQuery({
    queryKey: ['queryAccessProtectProperties', organizationId],
    queryFn: async () => {
      return await datasource.getAccessProtectProperties(organizationId);
    },
  });
};

export const useQueryOrganizationMovements = (range: DateTimeRange, filter?: IMovementsFilter) => {
  return useQuery({
    queryKey: ['queryOrganizationMovements', range, filter],
    queryFn: async () => {
      return await datasource.getOrganizationMovements(range, filter);
    },
  });
};

export const useQueryOrganizationMovementsByPropertyId = (propertyId: string, range: DateTimeRange, filter?: IMovementsFilter) => {
  return useQuery({
    queryKey: ['queryOrganizationMovementsByPropertyId', propertyId, range, filter],
    queryFn: async () => {
      return await datasource.getOrganizationMovementsByPropertyId(propertyId, range, filter);
    },
  });
};

export const useQueryVisitsByPropertyId = (organizationId: string, propertyId: string) => {
  return useQuery({
    queryKey: ['queryVisitsByPropertyId',organizationId, propertyId],
    queryFn: async () => {
      return await datasource.getVisitsByPropertyId(organizationId, propertyId);
    },
  });
};

export const useQueryVisit = (organizationId: string, propertyId: string, visitId: string) => {
  return useQuery({
    queryKey: ['queryVisit',organizationId, propertyId, visitId],
    queryFn: async () => {
      return await datasource.getVisit(organizationId, propertyId, visitId);
    },
  });
};
