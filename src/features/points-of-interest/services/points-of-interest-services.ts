import { _delete, _get, _patch, _post, _put } from '../../../core/services/api/api-client.ts';
import { PointOfInterestModel } from './models/responses.tsx';
import type { EnablePointOfInterestRequest, PointOfInterestRequest } from './models/requests.tsx';

export class PointsOfInterestServices {
  createPointOfInterest = async (request: PointOfInterestRequest): Promise<PointOfInterestModel> => {
    const response = await _post('/biosecurity/v1/points-of-interest}', request);
    return PointOfInterestModel.parse(response['data']);
  };

  getPointsOfInterest = async (): Promise<PointOfInterestModel[]> => {
    const response = await _get('/biosecurity/v1/points-of-interest');
    return response['data'].map((value: any) => PointOfInterestModel.parse(value));
  };

  getPointOfInterest = async (pointOfInterestId: string): Promise<PointOfInterestModel> => {
    const response = await _get(`/biosecurity/v1/points-of-interest/${pointOfInterestId}`);
    return PointOfInterestModel.parse(response['data']);
  };

  editPointOfInterest = async (pointOfInterestId: string, request: PointOfInterestRequest): Promise<PointOfInterestModel> => {
    const response = await _put(`/biosecurity/v1/points-of-interest${pointOfInterestId}`, request);
    return PointOfInterestModel.parse(response['data']);
  };

  enablePointOfInterest = async (pointOfInterestId: string, request: EnablePointOfInterestRequest): Promise<PointOfInterestModel> => {
    const response = await _patch(`/biosecurity/v1/points-of-interest${pointOfInterestId}`, request);
    return PointOfInterestModel.parse(response['data']);
  };

  deletePointOfInterest = async (pointOfInterestId: string): Promise<PointOfInterestModel> => {
    const response = await _delete(`/biosecurity/v1/points-of-interest${pointOfInterestId}`);
    return PointOfInterestModel.parse(response['data']);
  };
}
