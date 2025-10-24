import axios, { type InternalAxiosRequestConfig } from 'axios';
import { config } from '../../config/config.ts';
import { OrganizationUtil } from '../../../shared/utils/organization-util.ts';
import { getToken } from '../../../shared/services/firebase-services.ts';


const apiInstance = axios.create({
  baseURL: `${config.api.gatewayUrl}`,
  headers: {
    'x-api-key': config.api.gatewayApiKey,
  },
});

apiInstance.interceptors.request.use(
  async function (req: InternalAxiosRequestConfig) {
    // if (!isConnected()) {
    //   return Promise.reject(
    //     new NoInternetConnectionException('No internet connection!'),
    //   );
    // }

    const organizationId = OrganizationUtil.getCurrentOrganization();
    if (organizationId) {
      req.headers['x-organization-id'] = organizationId;
    }

    const token = await getToken();
    if (token && token.length > 0) {
      req.headers['Authorization'] = `Bearer ${token}`;
    }

    req.headers['x-api-key'] = String(config.api.gatewayApiKey);
    req.headers!['x-timezone-id'] = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return req;
  },
  (err) => {
    return Promise.reject(err);
  },
);

apiInstance.interceptors.response.use(
  (response) => response.data,
);

export { apiInstance };
