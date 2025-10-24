import { useQuery } from '@tanstack/react-query';
import { AccessProtectServices, type IMovementsFilter } from '../../services/access-protect-services.ts';
import type { DateTimeRange } from '../../types';
import type { IVisitsFilter } from '../../services/filters';

const datasource = new AccessProtectServices();

export const useQueryAccessProtectProperties = (organizationId: string) => {
  return useQuery({
    queryKey: ['queryAccessProtectProperties', organizationId],
    queryFn: async () => {
      return await datasource.getAccessProtectProperties(organizationId);
    },
  });
};

export const useQueryOrganizationMovements = (range: DateTimeRange, filter?: IMovementsFilter, options?: { propertyId?: string }) => {
  return useQuery({
    queryKey: ['queryOrganizationMovements', range, filter, options],
    queryFn: async () => {
      if (options?.propertyId) {
        return await datasource.getOrganizationMovementsByPropertyId(options.propertyId, range, filter);
      }

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

export const useQueryVisitsByPropertyId = (propertyId: string, range: DateTimeRange, filter?: IVisitsFilter) => {
  return useQuery({
    queryKey: ['queryVisitsByPropertyId', propertyId, range, filter],
    queryFn: async () => {
      return await datasource.getVisitsByPropertyId(propertyId, range, filter);
    },
  });
};

export const useQueryVisit = (propertyId: string, visitId: string) => {
  return useQuery({
    queryKey: ['queryVisit', propertyId, visitId],
    queryFn: async () => {
      return await datasource.getVisit(propertyId, visitId);
    },
  });
};

export const useQuerySitesByPropertyId = (propertyId: string) => {
  return useQuery({
    queryKey: ['querySitesByPropertyId', propertyId],
    queryFn: async () => {
      return await datasource.getSitesByPropertyId( propertyId);
    },
  });
};

