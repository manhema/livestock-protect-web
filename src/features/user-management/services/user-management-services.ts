import { _get } from '../../../core/services/api/api-client.ts';
import { PolicyInformationModel } from './models/policy-information-model.ts';
import { OrganizationModel } from './models/organization-model.ts';
import { UserModel } from './models/user-model.ts';

export class UserManagementServices {
  getUser = async () : Promise<UserModel> => {
    const response = await _get('/api/v1.1/users/account');
    return UserModel.parse(response['data']);
  };

  getOrganizations = async () : Promise<OrganizationModel[]> => {
    const response = await _get('/eisodos/api/v1/organizations');
    return response['data'].map((value: any) => OrganizationModel.parse(value));
  };

  getPolicyInformation = async (organizationId: string,  userId: string) : Promise<PolicyInformationModel> => {
    const response = await _get(`/eisodos/api/v1/organizations/${organizationId}/users/${userId}/policy/information`);
    return PolicyInformationModel.parse(response['data']);
  };
}
