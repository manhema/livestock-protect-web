import type { IAccessProtect, IApiConfig, IFirebaseConfig, IGoogleMapsApi, IW3wApi } from './config.contracts.ts';
import * as dev from './config.dev.ts';

type ProtectConfig = {
  api: IApiConfig;
  firebase: IFirebaseConfig;
  googleMapsApi: IGoogleMapsApi;
  w3wApi: IW3wApi;
  accessProtect: IAccessProtect;
};

const rawEnv = import.meta.env.VITE_APP_ENV || 'dev';
export const env = rawEnv as 'dev' | 'stg' | 'prd';

const get = (env: string): ProtectConfig => {
  switch (env) {

    case 'dev':
    default:
      return {
        api: dev.api,
        firebase: dev.firebase,
        googleMapsApi: dev.googleMapsApi,
        w3wApi: dev.w3wApi,
        accessProtect: dev.accessProtect,
      };
  }
};

export const config = get(env);
