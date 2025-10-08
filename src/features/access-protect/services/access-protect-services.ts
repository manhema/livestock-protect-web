import { MovementReport } from './models/movement-report-model.ts';
import { _get, _post } from '../../../core/services/api/api-client.ts';
import { MovementFilterRequest } from '../types/requests.ts';
import type { DateTimeRange } from '../types';
import { VisitModel } from './models/visit-model.ts';
import { PropertyModel } from '../../properties/services/models/property-model.ts';

export interface IVisitorFilter {
  name: string;
  email: string;
  phone: string;
}
export interface IMovementsFilter {
  visitors: IVisitorFilter[];
  vehicles: string[];
  sites: string[];
}

export class AccessProtectServices {
  private constructFilters = (range: DateTimeRange, filter?: IMovementsFilter): MovementFilterRequest => {
    const [start, end] = range;
    const data: any = {
      startDate: start?.toDate(),
      endDate: end?.toDate(),
    };

    if (filter) {
      return MovementFilterRequest.parse({
        ...data,
        ...filter,
      });
    }

    return MovementFilterRequest.parse(data);
  };

  getAccessProtectProperties = async (organizationId: string): Promise<PropertyModel[]> => {
    const response = await _get(`/accessprotect/api/v1/organizations/${organizationId}/properties`);
    return response['data'].map((value: any) => PropertyModel.parse(value));
  };

  getOrganizationMovements = async (range: DateTimeRange, filter?: IMovementsFilter) : Promise<MovementReport> => {
    const request = this.constructFilters(range, filter);
    const response = await _post('/accessprotect/api/v1/movements', request);
    return MovementReport.parse(response['data']);

  };

  getOrganizationMovementsByPropertyId = async (propertyId: string, range: DateTimeRange, filter?: IMovementsFilter) : Promise<MovementReport> => {
    const request = this.constructFilters(range, filter);


    const response = await _post(`/accessprotect/api/v1/properties/${propertyId}/movements`, request);
    return MovementReport.parse(response['data']);

  };

  getVisitsByPropertyId = async (organizationId: string, propertyId: string) : Promise<VisitModel[]> => {
    const response = await _get(
      `/accessprotect/api/v1/organizations/${organizationId}/properties/${propertyId}/access-logs`,
      {
        headers: {
          'x-organization-id': organizationId,
        },
      });
    return response['data'].map((value: any) => VisitModel.parse(value));
  };

  getVisit = async (organizationId: string, propertyId: string, visitId: string) : Promise<VisitModel> => {
    const response = await _get(
      `/accessprotect/api/v1/organizations/${organizationId}/properties/${propertyId}/access-logs/${visitId}`,
      {
        headers: {
          'x-organization-id': organizationId,
        },
      });

    return VisitModel.parse(response['data']);
  };
}
