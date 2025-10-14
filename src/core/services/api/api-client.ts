import { getToken } from '../../../shared/services/firebase-services.ts';
import { config } from '../../config/config.ts';
import { OrganizationUtil } from '../../../shared/utils/organization-util.ts';

// only allow the headers property to be passed in the RequestOptions
type RequestOptions = Pick<RequestInit, 'headers' | 'mode'>;

// only expose the relevant parts of the Response object
export type ApiResponse<T> = Pick<Response, 'headers'> & { data: T };

class ApiClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = config.api.gatewayUrl;
    this.apiKey = config.api.gatewayApiKey;
  }

  private async getHeaders(isFormData = false): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'X-Api-Key': this.apiKey,
    };

    const organizationId = OrganizationUtil.getCurrentOrganization();
    if (organizationId) {
      headers['X-Organization-Id'] = organizationId;
    }

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const token = await getToken();
    if (token && token.length > 0) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async _request(endpoint: string, options: RequestInit | any = {}): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = await this.getHeaders(options.body instanceof FormData);

    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw {
        status: response.status,
        message: 'An error occurred while fetching the data.',
        info: response.headers.get('content-type') === 'application/json'
          ? await response.json()
          : {},
      };
    }

    return response;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const response = await this._request(endpoint, options);
    const data: T = await response.json();

    // Preserve headers & other response properties
    return Object.assign(response, { data });
  }

  private async requestBlob(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<Blob>> {
    const response = await this._request(endpoint, options);
    const data: Blob = await response.blob();

    // Preserve headers & other response properties
    return Object.assign(response, { data });
  }

  private formatBody(body: any): FormData | string {
    return body instanceof FormData ? body : JSON.stringify(body);
  }

  getBlob(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<Blob>> {
    return this.requestBlob(endpoint, { ...options, method: 'GET' });
  }

  get<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body: this.formatBody(body) });
  }

  put<T>(endpoint: string, body: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body: this.formatBody(body) });
  }

  patch<T>(endpoint: string, body: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body: this.formatBody(body) });
  }

  delete<T>(endpoint: string, body: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE', body: this.formatBody(body) });
  }
}

export const apiClient = new ApiClient();

export const _get = async (path: string, options: RequestOptions = {}) => {
  const response = await apiClient.get<any>(path, options);
  return response.data;
};

export const _post = async (path: string, data: any, options: RequestOptions = {}) => {
  const response = await apiClient.post<any>(path, data, options);
  return response.data;
};

export const _put = async (path: string, data: any, options: RequestOptions = {}) => {
  const response = await apiClient.put<any>(path, data, options);
  return response.data;
};

export const _patch = async (path: string, data: any, options: RequestOptions = {}) => {
  const response = await apiClient.patch<any>(path, data, options);
  return response.data;
};

export const _delete = async (path: string, data: any = undefined, options: RequestOptions = {}) => {
  const response = await apiClient.delete<any>(path, data, options);
  return response.data;
};
