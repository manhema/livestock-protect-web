import { _get } from '../../../core/services/api/api-client.ts';
import { PolicyInformationModel } from './models/policy-information-model.ts';

export class UserManagementServices {
  getPolicyInformation = async (organizationId: string,  userId: string) : Promise<PolicyInformationModel> => {
    const response = await _get(`/eisodos/api/v1/organizations/${organizationId}/users/${userId}/policy/information`);
    return PolicyInformationModel.parse(response['data']);
  };
}
