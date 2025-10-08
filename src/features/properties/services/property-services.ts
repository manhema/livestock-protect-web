import { _get } from '../../../core/services/api/api-client.ts';
import { PropertyModel } from './models/property-model.ts';

export class PropertyServices {
  getProperties = async (): Promise<PropertyModel[]> => {
    const response = await _get('/biosecurity/v1/properties');
    return response['data'].map((value: any) => PropertyModel.parse(value));
  };
}
