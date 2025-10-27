import { MovementReport } from './models/movement-report-model.ts';
import { _get, _post } from '../../../core/services/api/api-client.ts';
import { MovementFilterRequest, VisitFilterRequest } from '../types/requests.ts';
import type { DateTimeRange } from '../types';
import { VisitModel } from './models/visit-model.ts';
import { PropertyModel } from '../../properties/services/models/property-model.ts';
import { SiteModel } from './models/site-model.ts';
import dayjs from 'dayjs';
import { apiInstance } from '../../../core/services/api/api-instance.ts';
import type { IMovementsFilter, IPagination, IVisitsFilter } from './filters';
import dateFormat from 'dateformat';

export function formatDate(
  date: string | number | Date | undefined,
  options: { format: string } = { format: 'dS mmmm yyyy' }) {
  return dateFormat(date, options.format);
}



export class AccessProtectServices {
  private api = apiInstance;

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

  getVisitsByPropertyId = async (propertyId: string, range: DateTimeRange, pagination: IPagination, filter?: IVisitsFilter) : Promise<VisitModel[]> => {
    const constructWithFilters  = (): MovementFilterRequest => {
      const [start, end] = range;
      const data: any = {
        startDate: start?.toDate(),
        endDate: end?.toDate(),
      };

      const sites = filter?.sites.map((id) =>
        id.replace(/^(property:|unit:|area:)/, ''),
      );

      if (filter) {
        return VisitFilterRequest.parse({
          ...data,
          ...filter,
          sites,
        });
      }

      return VisitFilterRequest.parse(data);
    };

    const request = constructWithFilters();
    const params = new URLSearchParams();

    params.append('page', pagination.offset.toString());
    params.append('size', pagination.limit.toString());

    const response = await this.api.post(
      `/accessprotect/api/v1/properties/${propertyId}/visits/search?${params.toString()}`,
      request,
    );
    return response['data'].map((value: any) => VisitModel.parse(value));
  };

  getVisit = async (propertyId: string, visitId: string) : Promise<VisitModel> => {
    const response = await this.api.get(`/accessprotect/api/v1/properties/${propertyId}/visits/${visitId}`);

    return VisitModel.parse(response['data']);
  };

  getSitesByPropertyId = async (propertyId: string) : Promise<SiteModel[]> => {
    const response = await _get(`/accessprotect/api/v1/properties/${propertyId}/sites`);
    return response['data'].map((value: any) => SiteModel.parse(value));
  };

  async checkOutVisitor(propertyId: string, visitId: string, datetime: dayjs.Dayjs): Promise<void> {
    const response = await this.api.put(`/accessprotect/api/v1/properties/${propertyId}/visits/${visitId}/checkout`,
      {
        leftAt: datetime.toISOString(),
      },
      {
        headers: {
          'x-api-key': 'AIzaSyBei7EHtYe2HSHpekR6x3F_1phGuNktF_I',
        },
      },
    );

    console.log(response);
  }

  exportVisitsByPropertyId = async (propertyId: string, range: DateTimeRange, pagination: IPagination, filter?: IVisitsFilter) : Promise<any> => {
    const response = await this.api.get(`/accessprotect/api/v1/properties/${propertyId}/access-logs/export`,{
      responseType: 'blob',
    });

    const filename = `Visitor Logs [${formatDate(Date(), { format: 'yyyy/mm/dd' })}].csv`;

    return { blob: response.data as Blob, filename: filename };
  };
}


