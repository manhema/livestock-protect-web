import type { IAccessProtect, IApiConfig, IFirebaseConfig, IGoogleMapsApi, IW3wApi } from './config.contracts.ts';

export const api: IApiConfig = {
  gatewayUrl: 'https://lt-api-gateway-gateway-dev-ce5jg4nr.nw.gateway.dev',
  gatewayApiKey: 'AIzaSyAyC1CDCu_8tAHNDUp14-CN9ecb-zRMQ6w',
};

export const googleMapsApi: IGoogleMapsApi = {
  apiKey: 'AIzaSyBf73HLr3mnI4LGlO3FBNAbdd3I02GCmWA',
  vectorMapId: '136b5de4a6559c37',
  rasterMapId: '89b7724b39d4fe08',
};

export const w3wApi: IW3wApi = {
  apiKey: 'EKXSLHFS',
};

export const firebase: IFirebaseConfig = {
  apiKey: 'AIzaSyAnvxFsN1UVWMebyIJLKBYPake7DcDdPi8',
  authDomain: 'livetec-dev.firebaseapp.com',
  projectId: 'livetec-dev',
  storageBucket: 'livetec-dev.appspot.com',
  messagingSenderId: '971179917975',
  appId: '1:971179917975:web:fea1ec1242a4b6ed1c9fd2',
  measurementId: 'G-Q18JL2LKSK',
  pushNotificationToken: 'BAsjmbXmy69jSpvRtEFWu9jCI80J1IU6ZGPgFduk9bTIspPyvnZ66JuUjrDqDhbRAOTo8ixe-G5LBPkLhVhZh3w',
};

export const accessProtect: IAccessProtect = {
  selfServicePortalUrl: 'https://accessprotect-dev.livetecsystems.co.uk',
};
