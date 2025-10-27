import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AccessProtectServices } from '../../services/access-protect-services.ts';
import type { DateTimeRange } from '../../types';
import type { IMovementsFilter, IVisitsFilter } from '../../services/filters';

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

export const useQueryVisitsByPropertyId = (propertyId: string, range: DateTimeRange, limit: number, filter?: IVisitsFilter) => {
  return useInfiniteQuery({
    queryKey: ['queryVisitsByPropertyId', propertyId, range, filter],
    initialPageParam: 1, // Initial page offset/page number
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const pagination = { offset: pageParam, limit: limit };
      return await datasource.getVisitsByPropertyId(propertyId, range, pagination, filter);
    },
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage.length === limit;
      const nextPage = allPages.length; // offset starts at 1, so we can use allPages.length instead of allPages.length + 1
      return morePagesExist ? nextPage : undefined; // Return next offset if more pages exist
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

