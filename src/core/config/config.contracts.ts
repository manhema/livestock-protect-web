export interface IApiConfig {
  gatewayUrl: string;
  gatewayApiKey: string;
}

export interface IGoogleMapsApi {
  apiKey: string;
  vectorMapId: string;
  rasterMapId: string;
}

export interface IW3wApi {
  apiKey: string;
}

export interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
  pushNotificationToken: string;
}

export interface IAccessProtect {
  selfServicePortalUrl: string;
}
